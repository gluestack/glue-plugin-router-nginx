import { addTrailingSlash } from "../helpers/add-trailing-slash";

import { ConsoleTable } from "@gluestack/helpers";
import IApp from "@gluestack/framework/types/app/interface/IApp";

export async function routesList(app: IApp, upstreams: any) {
	const head: string[] = ['Domain Name (Stateless)', 'Plugin Prefix Route', 'URI Route', 'URI Method']
	const rows: any = [];

	for (const upstream of upstreams) {
		const { domain, port, locations } = upstream;
		for ( const location of locations) {
			const methods: string[] = [];
			const subPaths: string[] = [];

			const { routes } = location;
			const paths = addTrailingSlash(location.path.replaceAll('(.*)', ''));

			for (const route of routes) {
				subPaths.push(route.path);
				methods.push(route.method);
			}

			rows.push([
				addTrailingSlash(`localhost:${port}`),
				// addTrailingSlash(`${domain}:${port}`),
				paths,
				subPaths.length ? subPaths.join("\n") : "--",
				methods.length ? methods.join("\n") : "--"
			]);
		}
	}

	ConsoleTable.print(head, rows);
}
