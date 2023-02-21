"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.runner = exports.routeGenerate = void 0;
var path_1 = require("path");
var nginx_conf_1 = __importDefault(require("../helpers/nginx-conf"));
var configs_1 = require("../configs");
var helpers_1 = require("@gluestack/helpers");
var routeGenerate = function (program, glueStackPlugin) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        program
            .command("route:generate")
            .option("--build <build>", "Generates build based on the platform . Options: 'dev' or 'prod'", "dev")
            .description("Generates router file for all the container instances")
            .action(function (options) { return (0, exports.runner)(glueStackPlugin, options); });
        return [2];
    });
}); };
exports.routeGenerate = routeGenerate;
var runner = function (glueStackPlugin, options) { return __awaiter(void 0, void 0, void 0, function () {
    var build, statelessPlugins, app, instances, _a, instances_1, instances_1_1, instance_1, type, name_1, details, _b, _c, e_1_1, nginxConf, _d, statelessPlugins_1, statelessPlugins_1_1, plugin_1, e_2_1, plugin, instance, name, data, filepath;
    var _e, e_1, _f, _g, _h, e_2, _j, _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                build = options.build;
                statelessPlugins = [];
                app = glueStackPlugin.app;
                instances = app.getContainerTypePluginInstances(false);
                _l.label = 1;
            case 1:
                _l.trys.push([1, 13, 14, 19]);
                _a = true, instances_1 = __asyncValues(instances);
                _l.label = 2;
            case 2: return [4, instances_1.next()];
            case 3:
                if (!(instances_1_1 = _l.sent(), _e = instances_1_1.done, !_e)) return [3, 12];
                _g = instances_1_1.value;
                _a = false;
                _l.label = 4;
            case 4:
                _l.trys.push([4, , 10, 11]);
                instance_1 = _g;
                type = instance_1 === null || instance_1 === void 0 ? void 0 : instance_1.callerPlugin.getType();
                name_1 = instance_1 === null || instance_1 === void 0 ? void 0 : instance_1.callerPlugin.getName();
                if (!(instance_1 && type && name_1 &&
                    (instance_1 === null || instance_1 === void 0 ? void 0 : instance_1.containerController) &&
                    type === 'stateless')) return [3, 9];
                details = {
                    name: name_1,
                    type: type,
                    instance: instance_1.getName(),
                    is_backend: false
                };
                details.path = (0, path_1.join)(process.cwd(), instance_1.getInstallationPath());
                details.status = instance_1.getContainerController().getStatus();
                _b = details;
                return [4, instance_1.getContainerController().getPortNumber()];
            case 5:
                _b.port = _l.sent();
                if (!(typeof instance_1.containerController.getRoutes === 'function')) return [3, 7];
                _c = details;
                return [4, instance_1.containerController.getRoutes()];
            case 6:
                _c.routes = _l.sent();
                return [3, 8];
            case 7:
                details.routes = [];
                _l.label = 8;
            case 8:
                statelessPlugins.push(details);
                _l.label = 9;
            case 9: return [3, 11];
            case 10:
                _a = true;
                return [7];
            case 11: return [3, 2];
            case 12: return [3, 19];
            case 13:
                e_1_1 = _l.sent();
                e_1 = { error: e_1_1 };
                return [3, 19];
            case 14:
                _l.trys.push([14, , 17, 18]);
                if (!(!_a && !_e && (_f = instances_1["return"]))) return [3, 16];
                return [4, _f.call(instances_1)];
            case 15:
                _l.sent();
                _l.label = 16;
            case 16: return [3, 18];
            case 17:
                if (e_1) throw e_1.error;
                return [7];
            case 18: return [7];
            case 19:
                nginxConf = new nginx_conf_1["default"]();
                _l.label = 20;
            case 20:
                _l.trys.push([20, 28, 29, 34]);
                _d = true, statelessPlugins_1 = __asyncValues(statelessPlugins);
                _l.label = 21;
            case 21: return [4, statelessPlugins_1.next()];
            case 22:
                if (!(statelessPlugins_1_1 = _l.sent(), _h = statelessPlugins_1_1.done, !_h)) return [3, 27];
                _k = statelessPlugins_1_1.value;
                _d = false;
                _l.label = 23;
            case 23:
                _l.trys.push([23, , 25, 26]);
                plugin_1 = _k;
                return [4, nginxConf.addRouter(plugin_1.name, plugin_1.instance, plugin_1.port, (0, path_1.join)(plugin_1.path, 'router.js'), plugin_1.routes)];
            case 24:
                _l.sent();
                return [3, 26];
            case 25:
                _d = true;
                return [7];
            case 26: return [3, 21];
            case 27: return [3, 34];
            case 28:
                e_2_1 = _l.sent();
                e_2 = { error: e_2_1 };
                return [3, 34];
            case 29:
                _l.trys.push([29, , 32, 33]);
                if (!(!_d && !_h && (_j = statelessPlugins_1["return"]))) return [3, 31];
                return [4, _j.call(statelessPlugins_1)];
            case 30:
                _l.sent();
                _l.label = 31;
            case 31: return [3, 33];
            case 32:
                if (e_2) throw e_2.error;
                return [7];
            case 33: return [7];
            case 34:
                plugin = glueStackPlugin.app.getPluginByName('@gluestack/glue-plugin-router-nginx');
                instance = plugin.getInstances()[0];
                name = instance.getName();
                return [4, nginxConf.generate(name, build)];
            case 35:
                _l.sent();
                data = (0, configs_1.getDomainMappings)();
                filepath = (0, path_1.join)(process.cwd(), 'meta', 'router', name, 'routes.json');
                return [4, (0, helpers_1.writeFile)(filepath, JSON.stringify(data, null, 2))];
            case 36:
                _l.sent();
                return [2];
        }
    });
}); };
exports.runner = runner;
//# sourceMappingURL=route-generate.js.map