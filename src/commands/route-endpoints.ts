import { join } from "path";
import { GlueStackPlugin } from "src";
import { execute } from "../helpers/spawn";
import { fileExists } from "@gluestack/helpers";
import { routesEndpoints } from "../helpers/route-endpoints";

export const routeEndpoints = async (program: any, glueStackPlugin: GlueStackPlugin) => {
	program
		.command("route:endpoints")
		.description("Gets route endpoints list")
		.action(() => runner(glueStackPlugin));
};

export async function runner(
	glueStackPlugin: GlueStackPlugin,
) {
	const instance = glueStackPlugin.getInstances()[0];
	const name = instance.getName();

	const filepath = join(process.cwd(), 'meta', 'router', name, 'routes.json');
	if (!await fileExists(filepath)) {
		await generateRoute();
	}

	await routesEndpoints(glueStackPlugin.app, require(filepath));
}

const generateRoute = async (): Promise<void> => {
	await execute('node', ['glue', 'route:generate'], { cwd: process.cwd() });
};
