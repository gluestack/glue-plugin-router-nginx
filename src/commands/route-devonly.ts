import { join } from "path";
import { GlueStackPlugin } from "src";
import { ConsoleTable } from "@gluestack/helpers";
import { captureEnvs } from "../helpers/capture-envs";
import IApp from "@gluestack/framework/types/app/interface/IApp";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import IHasContainerController from "@gluestack/framework/types/plugin/interface/IHasContainerController";

export const routeDevonly = async (program: any, glueStackPlugin: GlueStackPlugin) => {
  program
    .command("route:devonly")
    .description("Shows list of routings against 'devonly' plugins")
    .action(() => runner(glueStackPlugin));
};

export const runner = async (glueStackPlugin: GlueStackPlugin) => {
	const rows: any = [];
  const app: IApp = glueStackPlugin.app;
  const head: string[] = ['Plugin Name (Dev-Only)', 'Instance Name', 'Domain Mapping'];


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
      type === 'devonly'
    ) {
      const instancename: string = instance.getName();
      const port: number = await instance.getContainerController().getPortNumber();
      const domain: string = await getDomainName(instance.getInstallationPath(), port, name);

      rows.push([name, instancename, domain]);
    }
  }

  if (rows.length > 0) ConsoleTable.print(head, rows);
};

const getDomainName = async (
  installationPath: string, port: number, name: string
): Promise<string> => {
  let domain: string = `localhost:${port}/`;

  if (name === '@gluestack/glue-plugin-pg-admin') {
    const env = await captureEnvs(installationPath);
    if (env?.SCRIPT_NAME) {
      domain = join(`localhost:${port}`, env.SCRIPT_NAME);
    }
  }

  return domain;
};
