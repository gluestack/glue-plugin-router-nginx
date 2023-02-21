import { join } from 'path';
import { endsWith, startsWith, setServer } from './nginx-literals';
import { writeFile, fileExists, createFolder, removeSpecialChars } from '@gluestack/helpers';
import { IRoutes } from '@gluestack/framework/types/plugin/interface/IContainerController';

/**
 * Nginx Conf
 *
 * This class is responsible for generating the nginx.conf file
 * in your backend instance's engine/router folder.
 */
export default class NginxConf {
  public upstreams: any[];

  private filename: string = 'nginx.conf';
  private subdirectory: string = join('meta', 'router');

  constructor() {
    this.upstreams = [];
  }

  // Generates the dev nginx.conf file
  public async generate(subdirectory: string, build: 'prod' | 'dev'): Promise<void> {
    try {
      const conf: string = build === 'dev' ? await this.toConf() : await this.toProdConf();
      const filepath: string = join(process.cwd(), this.subdirectory, subdirectory, this.filename);

      await createFolder(join(process.cwd(), this.subdirectory));
      await writeFile(filepath, conf);

    } catch (err) {
      console.log('> NGINX file creation failed due to following reasons -');
      console.log(err);
    }
  }

  // Adds router.js data to the nginx conf data
  // if and only if the given path exists
  public async addRouter(
    packageName: string, instance: string, port: number, string: string, routes: IRoutes[]
  ): Promise<boolean> {
    const upstreams: any[] = this.upstreams;

    const exist = await fileExists(string);
    if (!exist) return Promise.resolve(false);

    upstreams.push({
      locations: [...require(string)()],
      port,
      instance: removeSpecialChars(instance),
      packageName,
      routes
    });

    return Promise.resolve(true);
  }

  // Converts the nginx conf data to a string
  private async toConf(): Promise<string> {
    let content: string = '';
    const upstreams: any[] = this.upstreams;
    const mainStreams: any[] = [];

    // Add upstreams with server_name
    for await (const upstream of upstreams) {
      if (!await this.hasServerName(upstream.locations)) {
        mainStreams.push({
          locations: [...upstream.locations],
          port: upstream.port,
          packageName: upstream.packageName,
          instance: upstream.instance,
          routes: upstream.routes
        });
        continue;
      }

      let locations: {}[] = [];
      let server_name: string = '';

      for await (const location of upstream.locations) {
        if (location.hasOwnProperty('server_name') && location.server_name !== '') {
          server_name = location.server_name;
        }

        if (location.hasOwnProperty('path')) {
          locations.push({
            path: location.path,
            proxy_instance: `host.docker.internal:${upstream.port}`,
            proxy_path: location.proxy.path,
            host: location.host,
            size_in_mb: location.size_in_mb || 50,
            packageName: upstream.packageName,
            instance: upstream.instance,
            routes: upstream.routes
          });
        }
      }

      content += await setServer(`${server_name}.local.gluestack.app`, locations);
    }

    // Add main-streams ie. streams without server_name into project name as server_name
    const locations: {}[] = [];
    for await (const mainStream of mainStreams) {
      for await (const location of mainStream.locations) {
        if (location.hasOwnProperty('path')) {
          locations.push({
            path: location.path,
            proxy_instance: `host.docker.internal:${mainStream.port}`,
            proxy_path: location.proxy.path,
            host: location.host,
            size_in_mb: location.size_in_mb || 50,
            packageName: mainStream.packageName,
            instance: mainStream.instance,
            routes: mainStream.routes
          });
        }
      }
    }

    if (locations.length > 0) {
      const server_name: string = process
        .cwd().split('/')[process.cwd().split('/').length - 1];

      content += await setServer(`${server_name}.local.gluestack.app`, locations);
    }

    return Promise.resolve(startsWith + content + endsWith);
  }

  // Converts the nginx conf data to a string
  private async toProdConf(): Promise<string> {
    let content: string = '';
    const upstreams: any[] = this.upstreams;
    const mainStreams: any[] = [];

    // If HAS SERVER_NAME : Add upstreams with server_name
    for await (const upstream of upstreams) {
      if (!await this.hasServerName(upstream.locations)) {
        mainStreams.push({
          locations: [...upstream.locations],
          port: upstream.port,
          packageName: upstream.packageName,
          instance: upstream.instance,
          routes: upstream.routes
        });
        continue;
      }

      let locations: {}[] = [];
      let server_name: string = '';

      for await (const location of upstream.locations) {
        if (location.hasOwnProperty('server_name') && location.server_name !== '') {
          server_name = location.server_name;
        }

        let port: any = upstream.port;
        switch (upstream.packageName) {
          case "@gluestack/glue-plugin-web":
            port = 3000;
            break;
          case "@gluestack/glue-plugin-backend-engine":
            port = 3500;
            break;
          default:
            port = upstream.port;
            break;
        }

        if (location.hasOwnProperty('path')) {
          locations.push({
            path: location.path,
            proxy_instance:`${upstream.instance}:${port}`,
            proxy_path: location.proxy.path,
            host: location.host,
            size_in_mb: location.size_in_mb || 50,
            routes: upstream.routes
          });
        }
      }

      content += await setServer(`${server_name}.local.gluestack.app`, locations);
    }

    // IF DOES NOT HAS SERVER_NAME : Add main-streams ie. streams without server_name into project name as server_name
    const locations: {}[] = [];
    for await (const mainStream of mainStreams) {
      for await (const location of mainStream.locations) {
        let port: any = mainStream.port;
        switch (mainStream.packageName) {
          case "@gluestack/glue-plugin-web":
            port = 3000;
            break;
          case "@gluestack/glue-plugin-backend-engine":
            port = 3500;
            break;
          default:
            port = mainStream.port;
            break;
        }

        if (location.hasOwnProperty('path')) {
          locations.push({
            path: location.path,
            proxy_instance:`${mainStream.instance}:${port}`,
            proxy_path: location.proxy.path,
            host: location.host,
            size_in_mb: location.size_in_mb || 50,
            routes: mainStream.routes
          });
        }
      }
    }

    if (locations.length > 0) {
      const server_name: string = process
        .cwd().split('/')[process.cwd().split('/').length - 1];

      content += await setServer(`${server_name}.local.gluestack.app`, locations);
    }

    return Promise.resolve(startsWith + content + endsWith);
  }

  // Checks if the given router (Array of Nginx Objects) has a server_name
  private async hasServerName(router: any[]) {
    for await (const route of router) {
      if (route.hasOwnProperty("server_name") && route.server_name !== '') {
        return true;
      }
    }
    return false;
  }
}
