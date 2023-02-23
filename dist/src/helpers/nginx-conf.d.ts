import { IRoutes } from '@gluestack/framework/types/plugin/interface/IContainerController';
export default class NginxConf {
    upstreams: any[];
    mainStreams: any[];
    private filename;
    private subdirectory;
    constructor();
    generate(subdirectory: string, build: 'prod' | 'dev'): Promise<void>;
    addRouter(packageName: string, instance: string, port: number, string: string, routes: IRoutes[]): Promise<boolean>;
    private toConf;
    private toProdConf;
    private hasServerName;
}
