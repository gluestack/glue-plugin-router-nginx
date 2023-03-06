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
exports.__esModule = true;
exports.runner = exports.routeDevonly = void 0;
var path_1 = require("path");
var helpers_1 = require("@gluestack/helpers");
var capture_envs_1 = require("../helpers/capture-envs");
var routeDevonly = function (program, glueStackPlugin) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        program
            .command("route:devonly")
            .description("Shows list of routings against 'devonly' plugins")
            .action(function () { return (0, exports.runner)(glueStackPlugin); });
        return [2];
    });
}); };
exports.routeDevonly = routeDevonly;
var runner = function (glueStackPlugin) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, app, head, instances, _a, instances_1, instances_1_1, instance, type, name_1, instancename, port, domain, e_1_1;
    var _b, e_1, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                rows = [];
                app = glueStackPlugin.app;
                head = ['Plugin Name (Dev-Only)', 'Instance Name', 'Domain Mapping'];
                instances = app.getContainerTypePluginInstances(false);
                _e.label = 1;
            case 1:
                _e.trys.push([1, 11, 12, 17]);
                _a = true, instances_1 = __asyncValues(instances);
                _e.label = 2;
            case 2: return [4, instances_1.next()];
            case 3:
                if (!(instances_1_1 = _e.sent(), _b = instances_1_1.done, !_b)) return [3, 10];
                _d = instances_1_1.value;
                _a = false;
                _e.label = 4;
            case 4:
                _e.trys.push([4, , 8, 9]);
                instance = _d;
                type = instance === null || instance === void 0 ? void 0 : instance.callerPlugin.getType();
                name_1 = instance === null || instance === void 0 ? void 0 : instance.callerPlugin.getName();
                if (!(instance && type && name_1 &&
                    (instance === null || instance === void 0 ? void 0 : instance.containerController) &&
                    type === 'devonly')) return [3, 7];
                instancename = instance.getName();
                return [4, instance.getContainerController().getPortNumber()];
            case 5:
                port = _e.sent();
                return [4, getDomainName(instance.getInstallationPath(), port, name_1)];
            case 6:
                domain = _e.sent();
                rows.push([name_1, instancename, domain]);
                _e.label = 7;
            case 7: return [3, 9];
            case 8:
                _a = true;
                return [7];
            case 9: return [3, 2];
            case 10: return [3, 17];
            case 11:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3, 17];
            case 12:
                _e.trys.push([12, , 15, 16]);
                if (!(!_a && !_b && (_c = instances_1["return"]))) return [3, 14];
                return [4, _c.call(instances_1)];
            case 13:
                _e.sent();
                _e.label = 14;
            case 14: return [3, 16];
            case 15:
                if (e_1) throw e_1.error;
                return [7];
            case 16: return [7];
            case 17:
                helpers_1.ConsoleTable.print(head, rows);
                return [2];
        }
    });
}); };
exports.runner = runner;
var getDomainName = function (installationPath, port, name) { return __awaiter(void 0, void 0, void 0, function () {
    var domain, env;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                domain = "localhost:".concat(port, "/");
                if (!(name === '@gluestack/glue-plugin-pg-admin')) return [3, 2];
                return [4, (0, capture_envs_1.captureEnvs)(installationPath)];
            case 1:
                env = _a.sent();
                if (env === null || env === void 0 ? void 0 : env.SCRIPT_NAME) {
                    domain = (0, path_1.join)("localhost:".concat(port), env.SCRIPT_NAME);
                }
                _a.label = 2;
            case 2: return [2, domain];
        }
    });
}); };
//# sourceMappingURL=route-devonly.js.map