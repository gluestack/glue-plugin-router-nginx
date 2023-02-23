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
  public mainStreams: any[];

  private filename: string = 'nginx.conf';
  private subdirectory: string = join('meta', 'router');

  constructor() {
    this.upstreams = [];
    this.mainStreams = [];
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
    const exist = await fileExists(string);
    if (!exist) return Promise.resolve(false);

    const locations = [...require(string)()];
    const server_name = await this.hasServerName(locations);

    const stream = {
      locations,
      port,
      instance: removeSpecialChars(instance),
      packageName,
      routes
    };

    if (!server_name) {
      this.mainStreams.push(stream);
    } else {
      if (!this.upstreams[server_name]) {
        this.upstreams[server_name] = [];
      }
      this.upstreams[server_name].push(stream);
    }

    return Promise.resolve(true);
  }

  // Converts the nginx conf data to a string
  private async toConf(): Promise<string> {
    let content: string = '';
    const upstreams: any = this.upstreams;
    const mainStreams: any = this.mainStreams;

    // Adds upstreams with server name
    for await (const server_name of Object.keys(upstreams)) {
      const streams = upstreams[server_name];
      let locations: any = [];

      for await (const upstream of streams) {
        for await (const location of upstream.locations) {
          if (location.hasOwnProperty('path')) {
            locations.push({
              path: location.path,
              proxy_instance: location.proxy.instance || `host.docker.internal:${upstream.port}`,
              proxy_path: location.proxy.path,
              host: location.host,
              size_in_mb: location.size_in_mb || 50,
              packageName: upstream.packageName,
              instance: upstream.instance,
              routes: upstream.routes
            });
          }
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
            proxy_instance: location.proxy.instance || `host.docker.internal:${mainStream.port}`,
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
    const upstreams: any = this.upstreams;
    const mainStreams: any = this.mainStreams;

    // If HAS SERVER_NAME : Add upstreams with server_name
    for await (const server_name of Object.keys(upstreams)) {
      const streams = upstreams[server_name];
      let locations: any = [];

      for await (const upstream of streams) {
        for await (const location of upstream.locations) {
          const port: any = this.getBuildPort(upstream.packageName, upstream.port);
          if (location.hasOwnProperty('path')) {
            locations.push({
              path: location.path,
              proxy_instance: `${upstream.instance}:${port}`,
              proxy_path: location.proxy.path,
              host: location.host,
              size_in_mb: location.size_in_mb || 50,
              routes: upstream.routes
            });
          }
        }
      }

      content += await setServer(`${server_name}.local.gluestack.app`, locations);
    }

    // IF DOES NOT HAS SERVER_NAME : Add main-streams ie. streams without server_name into project name as server_name
    const locations: any = [];
    for await (const mainStream of mainStreams) {
      for await (const location of mainStream.locations) {
        const port: any = this.getBuildPort(mainStream.packageName, mainStream.port);
        if (location.hasOwnProperty('path')) {
          locations.push({
            path: location.path,
            proxy_instance: `${mainStream.instance}:${port}`,
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
        return route.server_name;
      }
    }
    return false;
  }

  private getBuildPort(packageName: string, port: string | number): string | number {
    switch (packageName) {
      case "@gluestack/glue-plugin-web":
        return 3000;
      case "@gluestack/glue-plugin-backend-engine":
        return 3500;
      case "@gluestack/glue-plugin-service-node":
        return 9000;
      case "@gluestack/glue-plugin-auth":
        return 9090;
      case "@gluestack/glue-plugin-storage":
        return 9090;
      default:
        return port;
    }
  }
}
