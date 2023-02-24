import { GlueStackPlugin } from "src";
import IApp from "@gluestack/framework/types/app/interface/IApp";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import IHasContainerController from "@gluestack/framework/types/plugin/interface/IHasContainerController";

import { join } from "path";
import NginxConf from "../helpers/nginx-conf";
import { getDomainMappings } from "../configs";
import { writeFile } from "@gluestack/helpers";
import { IStatelessPlugin } from "../types/IStatelessPlugin";

export const routeGenerate = async (program: any, glueStackPlugin: GlueStackPlugin) => {
  program
    .command("route:generate")
    .option("--build <build>", "Generates build based on the platform . Options: 'dev' or 'prod'", "dev")
    .description("Generates router file for all the container instances")
    .action((options: any) => runner(glueStackPlugin, options));
};

export const runner = async (glueStackPlugin: GlueStackPlugin, options: any) => {
  const { build } = options;

  const statelessPlugins: IStatelessPlugin[] = [];
  const app: IApp = glueStackPlugin.app;

  // Gather all the availables plugin instances
  // @ts-ignore
  const instances: (IInstance & IHasContainerController)[] =
    app.getContainerTypePluginInstances(false);

  // Iterate over the instances
  for await (const instance of instances) {
    // Get the type of the instance
    const type: string | undefined = instance?.callerPlugin.getType();
    const name: string | undefined = instance?.callerPlugin.getName();

    // If and only if the instance is a "stateless" + "backend" plugin
    if (
      instance && type && name &&
      instance?.containerController &&
      type === 'stateless'
    ) {

      // Collects the instance details into the statelessPlugins
      const details: IStatelessPlugin = {
        name,
        type,
        instance: instance.getName()
      };

      details.path = join(process.cwd(), instance.getInstallationPath());
      details.status = instance.getContainerController().getStatus();
      details.port = await instance.getContainerController().getPortNumber();

      if (typeof instance.containerController.getRoutes === 'function') {
        details.routes = await instance.containerController.getRoutes();
		  } else {
        details.routes = [];
      }

      statelessPlugins.push(details);
    }
  }

  const nginxConf = new NginxConf();
  for await (const plugin of statelessPlugins) {
    await nginxConf.addRouter(
      plugin.name,
      plugin.instance,
      plugin.port,
      join(plugin.path, 'router.js'),
      plugin.routes,
      plugin.path
    );
  }

  // Get the instance name
  const plugin = glueStackPlugin.app.getPluginByName('@gluestack/glue-plugin-router-nginx');
  const instance = plugin.getInstances()[0];
  const name: string = instance.getName();
  await nginxConf.generate(name, build);

  // Generate the routes.json file
  const data = getDomainMappings();
  const filepath = join(process.cwd(), 'meta', 'router', name, 'routes.json');
  await writeFile(filepath, JSON.stringify(data, null, 2));
};
