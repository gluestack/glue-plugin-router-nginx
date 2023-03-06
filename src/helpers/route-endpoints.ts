import { join, relative } from "node:path";
import { ConsoleTable } from "@gluestack/helpers";
import { addTrailingSlash } from "./add-trailing-slash";
import IApp from "@gluestack/framework/types/app/interface/IApp";

export async function routesEndpoints(app: IApp, upstreams: any) {
	const head: string[] = ['Domain Name (Stateless)', 'Plugin Prefix Route', 'Config Path']
	const rows: any = [];

	for (const upstream of upstreams) {
		const prefixRoute = [];
		const configPath = [];
		const { domain, port, locations } = upstream;

		for ( const location of locations) {
			const { instancePath } = location;
			const paths = addTrailingSlash(location.path.replaceAll('(.*)', ''));

			prefixRoute.push(paths);
			configPath.push(relative(process.cwd(), join(instancePath, 'router.js')));
		}

		rows.push([
			addTrailingSlash(`${domain}:${port}`),
			prefixRoute.join("\n"),
			configPath.join("\n")
		]);
	}

	ConsoleTable.print(head, rows);
}
