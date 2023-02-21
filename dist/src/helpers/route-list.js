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
exports.__esModule = true;
exports.routesList = void 0;
var add_trailing_slash_1 = require("../helpers/add-trailing-slash");
var helpers_1 = require("@gluestack/helpers");
function routesList(app, upstreams) {
    return __awaiter(this, void 0, void 0, function () {
        var head, rows, _i, upstreams_1, upstream, domain, port, locations, _a, locations_1, location_1, methods, subPaths, routes, paths, _b, routes_1, route;
        return __generator(this, function (_c) {
            head = ['Domain Name', 'Plugin Prefix Route', 'URI Route', 'URI Method'];
            rows = [];
            for (_i = 0, upstreams_1 = upstreams; _i < upstreams_1.length; _i++) {
                upstream = upstreams_1[_i];
                domain = upstream.domain, port = upstream.port, locations = upstream.locations;
                for (_a = 0, locations_1 = locations; _a < locations_1.length; _a++) {
                    location_1 = locations_1[_a];
                    methods = [];
                    subPaths = [];
                    routes = location_1.routes;
                    paths = (0, add_trailing_slash_1.addTrailingSlash)(location_1.path.replaceAll('(.*)', ''));
                    for (_b = 0, routes_1 = routes; _b < routes_1.length; _b++) {
                        route = routes_1[_b];
                        subPaths.push(route.path);
                        methods.push(route.method);
                    }
                    rows.push([
                        (0, add_trailing_slash_1.addTrailingSlash)("".concat(domain, ":").concat(port)),
                        paths,
                        subPaths.length ? subPaths.join("\n") : "--",
                        methods.length ? methods.join("\n") : "--"
                    ]);
                }
            }
            helpers_1.ConsoleTable.print(head, rows);
            return [2];
        });
    });
}
exports.routesList = routesList;
//# sourceMappingURL=route-list.js.map