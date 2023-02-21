import { IRoutes } from "@gluestack/framework/types/plugin/interface/IContainerController";
import IGlueStorePlugin from "@gluestack/framework/types/store/interface/IGluePluginStore";

export interface IStatelessPlugin {
  name: string;
  type: string;
  instance: string;
  port?: number;
  path?: string;
  status?: string;
  template_folder?: string;
  is_backend?: boolean;
  routes?: IRoutes[];

  getInitDbPath?: () => string;
  gluePluginStore?: IGlueStorePlugin;
}