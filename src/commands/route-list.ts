import { join } from "path";
import { GlueStackPlugin } from "src";
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
		console.log('> routes.json file is missing. Please run node glue route:generate before listing.');
		return;
	}

	await routesList(glueStackPlugin.app, require(filepath));
}