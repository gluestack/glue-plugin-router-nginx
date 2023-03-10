import { join } from "path";
import { GlueStackPlugin } from "src";
import { execute } from "../helpers/spawn";
import { fileExists } from "@gluestack/helpers";
import { routesList } from "../helpers/route-list";

export const routeList = async (program: any, glueStackPlugin: GlueStackPlugin) => {
	program
		.command("route:list")
		.description("Gets routes list")
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

	await routesList(glueStackPlugin.app, require(filepath));
}

const generateRoute = async (): Promise<void> => {
	await execute('node', ['glue', 'route:generate'], { cwd: process.cwd() });
};
