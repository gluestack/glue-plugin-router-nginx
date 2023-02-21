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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var path_1 = require("path");
var nginx_literals_1 = require("./nginx-literals");
var helpers_1 = require("@gluestack/helpers");
var NginxConf = (function () {
    function NginxConf() {
        this.filename = 'nginx.conf';
        this.subdirectory = (0, path_1.join)('meta', 'router');
        this.upstreams = [];
    }
    NginxConf.prototype.generate = function (subdirectory, build) {
        return __awaiter(this, void 0, void 0, function () {
            var conf, _a, filepath, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        if (!(build === 'dev')) return [3, 2];
                        return [4, this.toConf()];
                    case 1:
                        _a = _b.sent();
                        return [3, 4];
                    case 2: return [4, this.toProdConf()];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        conf = _a;
                        filepath = (0, path_1.join)(process.cwd(), this.subdirectory, subdirectory, this.filename);
                        return [4, (0, helpers_1.createFolder)((0, path_1.join)(process.cwd(), this.subdirectory))];
                    case 5:
                        _b.sent();
                        return [4, (0, helpers_1.writeFile)(filepath, conf)];
                    case 6:
                        _b.sent();
                        return [3, 8];
                    case 7:
                        err_1 = _b.sent();
                        console.log('> NGINX file creation failed due to following reasons -');
                        console.log(err_1);
                        return [3, 8];
                    case 8: return [2];
                }
            });
        });
    };
    NginxConf.prototype.addRouter = function (packageName, instance, port, string, routes) {
        return __awaiter(this, void 0, void 0, function () {
            var upstreams, exist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        upstreams = this.upstreams;
                        return [4, (0, helpers_1.fileExists)(string)];
                    case 1:
                        exist = _a.sent();
                        if (!exist)
                            return [2, Promise.resolve(false)];
                        upstreams.push({
                            locations: __spreadArray([], require(string)(), true),
                            port: port,
                            instance: (0, helpers_1.removeSpecialChars)(instance),
                            packageName: packageName,
                            routes: routes
                        });
                        return [2, Promise.resolve(true)];
                }
            });
        });
    };
    NginxConf.prototype.toConf = function () {
        var _a, e_1, _b, _c, _d, e_2, _e, _f, _g, e_3, _h, _j, _k, e_4, _l, _m;
        return __awaiter(this, void 0, void 0, function () {
            var content, upstreams, mainStreams, _o, upstreams_1, upstreams_1_1, upstream, locations_1, server_name, _p, _q, _r, location_1, e_2_1, _s, e_1_1, locations, _t, mainStreams_1, mainStreams_1_1, mainStream, _u, _v, _w, location_2, e_4_1, e_3_1, server_name, _x;
            return __generator(this, function (_y) {
                switch (_y.label) {
                    case 0:
                        content = '';
                        upstreams = this.upstreams;
                        mainStreams = [];
                        _y.label = 1;
                    case 1:
                        _y.trys.push([1, 22, 23, 28]);
                        _o = true, upstreams_1 = __asyncValues(upstreams);
                        _y.label = 2;
                    case 2: return [4, upstreams_1.next()];
                    case 3:
                        if (!(upstreams_1_1 = _y.sent(), _a = upstreams_1_1.done, !_a)) return [3, 21];
                        _c = upstreams_1_1.value;
                        _o = false;
                        _y.label = 4;
                    case 4:
                        _y.trys.push([4, , 19, 20]);
                        upstream = _c;
                        return [4, this.hasServerName(upstream.locations)];
                    case 5:
                        if (!(_y.sent())) {
                            mainStreams.push({
                                locations: __spreadArray([], upstream.locations, true),
                                port: upstream.port,
                                packageName: upstream.packageName,
                                instance: upstream.instance,
                                routes: upstream.routes
                            });
                            return [3, 20];
                        }
                        locations_1 = [];
                        server_name = '';
                        _y.label = 6;
                    case 6:
                        _y.trys.push([6, 11, 12, 17]);
                        _p = true, _q = (e_2 = void 0, __asyncValues(upstream.locations));
                        _y.label = 7;
                    case 7: return [4, _q.next()];
                    case 8:
                        if (!(_r = _y.sent(), _d = _r.done, !_d)) return [3, 10];
                        _f = _r.value;
                        _p = false;
                        try {
                            location_1 = _f;
                            if (location_1.hasOwnProperty('server_name') && location_1.server_name !== '') {
                                server_name = location_1.server_name;
                            }
                            if (location_1.hasOwnProperty('path')) {
                                locations_1.push({
                                    path: location_1.path,
                                    proxy_instance: "host.docker.internal:".concat(upstream.port),
                                    proxy_path: location_1.proxy.path,
                                    host: location_1.host,
                                    size_in_mb: location_1.size_in_mb || 50,
                                    packageName: upstream.packageName,
                                    instance: upstream.instance,
                                    routes: upstream.routes
                                });
                            }
                        }
                        finally {
                            _p = true;
                        }
                        _y.label = 9;
                    case 9: return [3, 7];
                    case 10: return [3, 17];
                    case 11:
                        e_2_1 = _y.sent();
                        e_2 = { error: e_2_1 };
                        return [3, 17];
                    case 12:
                        _y.trys.push([12, , 15, 16]);
                        if (!(!_p && !_d && (_e = _q["return"]))) return [3, 14];
                        return [4, _e.call(_q)];
                    case 13:
                        _y.sent();
                        _y.label = 14;
                    case 14: return [3, 16];
                    case 15:
                        if (e_2) throw e_2.error;
                        return [7];
                    case 16: return [7];
                    case 17:
                        _s = content;
                        return [4, (0, nginx_literals_1.setServer)("".concat(server_name, ".local.gluestack.app"), locations_1)];
                    case 18:
                        content = _s + _y.sent();
                        return [3, 20];
                    case 19:
                        _o = true;
                        return [7];
                    case 20: return [3, 2];
                    case 21: return [3, 28];
                    case 22:
                        e_1_1 = _y.sent();
                        e_1 = { error: e_1_1 };
                        return [3, 28];
                    case 23:
                        _y.trys.push([23, , 26, 27]);
                        if (!(!_o && !_a && (_b = upstreams_1["return"]))) return [3, 25];
                        return [4, _b.call(upstreams_1)];
                    case 24:
                        _y.sent();
                        _y.label = 25;
                    case 25: return [3, 27];
                    case 26:
                        if (e_1) throw e_1.error;
                        return [7];
                    case 27: return [7];
                    case 28:
                        locations = [];
                        _y.label = 29;
                    case 29:
                        _y.trys.push([29, 48, 49, 54]);
                        _t = true, mainStreams_1 = __asyncValues(mainStreams);
                        _y.label = 30;
                    case 30: return [4, mainStreams_1.next()];
                    case 31:
                        if (!(mainStreams_1_1 = _y.sent(), _g = mainStreams_1_1.done, !_g)) return [3, 47];
                        _j = mainStreams_1_1.value;
                        _t = false;
                        _y.label = 32;
                    case 32:
                        _y.trys.push([32, , 45, 46]);
                        mainStream = _j;
                        _y.label = 33;
                    case 33:
                        _y.trys.push([33, 38, 39, 44]);
                        _u = true, _v = (e_4 = void 0, __asyncValues(mainStream.locations));
                        _y.label = 34;
                    case 34: return [4, _v.next()];
                    case 35:
                        if (!(_w = _y.sent(), _k = _w.done, !_k)) return [3, 37];
                        _m = _w.value;
                        _u = false;
                        try {
                            location_2 = _m;
                            if (location_2.hasOwnProperty('path')) {
                                locations.push({
                                    path: location_2.path,
                                    proxy_instance: "host.docker.internal:".concat(mainStream.port),
                                    proxy_path: location_2.proxy.path,
                                    host: location_2.host,
                                    size_in_mb: location_2.size_in_mb || 50,
                                    packageName: mainStream.packageName,
                                    instance: mainStream.instance,
                                    routes: mainStream.routes
                                });
                            }
                        }
                        finally {
                            _u = true;
                        }
                        _y.label = 36;
                    case 36: return [3, 34];
                    case 37: return [3, 44];
                    case 38:
                        e_4_1 = _y.sent();
                        e_4 = { error: e_4_1 };
                        return [3, 44];
                    case 39:
                        _y.trys.push([39, , 42, 43]);
                        if (!(!_u && !_k && (_l = _v["return"]))) return [3, 41];
                        return [4, _l.call(_v)];
                    case 40:
                        _y.sent();
                        _y.label = 41;
                    case 41: return [3, 43];
                    case 42:
                        if (e_4) throw e_4.error;
                        return [7];
                    case 43: return [7];
                    case 44: return [3, 46];
                    case 45:
                        _t = true;
                        return [7];
                    case 46: return [3, 30];
                    case 47: return [3, 54];
                    case 48:
                        e_3_1 = _y.sent();
                        e_3 = { error: e_3_1 };
                        return [3, 54];
                    case 49:
                        _y.trys.push([49, , 52, 53]);
                        if (!(!_t && !_g && (_h = mainStreams_1["return"]))) return [3, 51];
                        return [4, _h.call(mainStreams_1)];
                    case 50:
                        _y.sent();
                        _y.label = 51;
                    case 51: return [3, 53];
                    case 52:
                        if (e_3) throw e_3.error;
                        return [7];
                    case 53: return [7];
                    case 54:
                        if (!(locations.length > 0)) return [3, 56];
                        server_name = process
                            .cwd().split('/')[process.cwd().split('/').length - 1];
                        _x = content;
                        return [4, (0, nginx_literals_1.setServer)("".concat(server_name, ".local.gluestack.app"), locations)];
                    case 55:
                        content = _x + _y.sent();
                        _y.label = 56;
                    case 56: return [2, Promise.resolve(nginx_literals_1.startsWith + content + nginx_literals_1.endsWith)];
                }
            });
        });
    };
    NginxConf.prototype.toProdConf = function () {
        var _a, e_5, _b, _c, _d, e_6, _e, _f, _g, e_7, _h, _j, _k, e_8, _l, _m;
        return __awaiter(this, void 0, void 0, function () {
            var content, upstreams, mainStreams, _o, upstreams_2, upstreams_2_1, upstream, locations_2, server_name, _p, _q, _r, location_3, port, e_6_1, _s, e_5_1, locations, _t, mainStreams_2, mainStreams_2_1, mainStream, _u, _v, _w, location_4, port, e_8_1, e_7_1, server_name, _x;
            return __generator(this, function (_y) {
                switch (_y.label) {
                    case 0:
                        content = '';
                        upstreams = this.upstreams;
                        mainStreams = [];
                        _y.label = 1;
                    case 1:
                        _y.trys.push([1, 22, 23, 28]);
                        _o = true, upstreams_2 = __asyncValues(upstreams);
                        _y.label = 2;
                    case 2: return [4, upstreams_2.next()];
                    case 3:
                        if (!(upstreams_2_1 = _y.sent(), _a = upstreams_2_1.done, !_a)) return [3, 21];
                        _c = upstreams_2_1.value;
                        _o = false;
                        _y.label = 4;
                    case 4:
                        _y.trys.push([4, , 19, 20]);
                        upstream = _c;
                        return [4, this.hasServerName(upstream.locations)];
                    case 5:
                        if (!(_y.sent())) {
                            mainStreams.push({
                                locations: __spreadArray([], upstream.locations, true),
                                port: upstream.port,
                                packageName: upstream.packageName,
                                instance: upstream.instance,
                                routes: upstream.routes
                            });
                            return [3, 20];
                        }
                        locations_2 = [];
                        server_name = '';
                        _y.label = 6;
                    case 6:
                        _y.trys.push([6, 11, 12, 17]);
                        _p = true, _q = (e_6 = void 0, __asyncValues(upstream.locations));
                        _y.label = 7;
                    case 7: return [4, _q.next()];
                    case 8:
                        if (!(_r = _y.sent(), _d = _r.done, !_d)) return [3, 10];
                        _f = _r.value;
                        _p = false;
                        try {
                            location_3 = _f;
                            if (location_3.hasOwnProperty('server_name') && location_3.server_name !== '') {
                                server_name = location_3.server_name;
                            }
                            port = upstream.port;
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
                            if (location_3.hasOwnProperty('path')) {
                                locations_2.push({
                                    path: location_3.path,
                                    proxy_instance: "".concat(upstream.instance, ":").concat(port),
                                    proxy_path: location_3.proxy.path,
                                    host: location_3.host,
                                    size_in_mb: location_3.size_in_mb || 50,
                                    routes: upstream.routes
                                });
                            }
                        }
                        finally {
                            _p = true;
                        }
                        _y.label = 9;
                    case 9: return [3, 7];
                    case 10: return [3, 17];
                    case 11:
                        e_6_1 = _y.sent();
                        e_6 = { error: e_6_1 };
                        return [3, 17];
                    case 12:
                        _y.trys.push([12, , 15, 16]);
                        if (!(!_p && !_d && (_e = _q["return"]))) return [3, 14];
                        return [4, _e.call(_q)];
                    case 13:
                        _y.sent();
                        _y.label = 14;
                    case 14: return [3, 16];
                    case 15:
                        if (e_6) throw e_6.error;
                        return [7];
                    case 16: return [7];
                    case 17:
                        _s = content;
                        return [4, (0, nginx_literals_1.setServer)("".concat(server_name, ".local.gluestack.app"), locations_2)];
                    case 18:
                        content = _s + _y.sent();
                        return [3, 20];
                    case 19:
                        _o = true;
                        return [7];
                    case 20: return [3, 2];
                    case 21: return [3, 28];
                    case 22:
                        e_5_1 = _y.sent();
                        e_5 = { error: e_5_1 };
                        return [3, 28];
                    case 23:
                        _y.trys.push([23, , 26, 27]);
                        if (!(!_o && !_a && (_b = upstreams_2["return"]))) return [3, 25];
                        return [4, _b.call(upstreams_2)];
                    case 24:
                        _y.sent();
                        _y.label = 25;
                    case 25: return [3, 27];
                    case 26:
                        if (e_5) throw e_5.error;
                        return [7];
                    case 27: return [7];
                    case 28:
                        locations = [];
                        _y.label = 29;
                    case 29:
                        _y.trys.push([29, 48, 49, 54]);
                        _t = true, mainStreams_2 = __asyncValues(mainStreams);
                        _y.label = 30;
                    case 30: return [4, mainStreams_2.next()];
                    case 31:
                        if (!(mainStreams_2_1 = _y.sent(), _g = mainStreams_2_1.done, !_g)) return [3, 47];
                        _j = mainStreams_2_1.value;
                        _t = false;
                        _y.label = 32;
                    case 32:
                        _y.trys.push([32, , 45, 46]);
                        mainStream = _j;
                        _y.label = 33;
                    case 33:
                        _y.trys.push([33, 38, 39, 44]);
                        _u = true, _v = (e_8 = void 0, __asyncValues(mainStream.locations));
                        _y.label = 34;
                    case 34: return [4, _v.next()];
                    case 35:
                        if (!(_w = _y.sent(), _k = _w.done, !_k)) return [3, 37];
                        _m = _w.value;
                        _u = false;
                        try {
                            location_4 = _m;
                            port = mainStream.port;
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
                            if (location_4.hasOwnProperty('path')) {
                                locations.push({
                                    path: location_4.path,
                                    proxy_instance: "".concat(mainStream.instance, ":").concat(port),
                                    proxy_path: location_4.proxy.path,
                                    host: location_4.host,
                                    size_in_mb: location_4.size_in_mb || 50,
                                    routes: mainStream.routes
                                });
                            }
                        }
                        finally {
                            _u = true;
                        }
                        _y.label = 36;
                    case 36: return [3, 34];
                    case 37: return [3, 44];
                    case 38:
                        e_8_1 = _y.sent();
                        e_8 = { error: e_8_1 };
                        return [3, 44];
                    case 39:
                        _y.trys.push([39, , 42, 43]);
                        if (!(!_u && !_k && (_l = _v["return"]))) return [3, 41];
                        return [4, _l.call(_v)];
                    case 40:
                        _y.sent();
                        _y.label = 41;
                    case 41: return [3, 43];
                    case 42:
                        if (e_8) throw e_8.error;
                        return [7];
                    case 43: return [7];
                    case 44: return [3, 46];
                    case 45:
                        _t = true;
                        return [7];
                    case 46: return [3, 30];
                    case 47: return [3, 54];
                    case 48:
                        e_7_1 = _y.sent();
                        e_7 = { error: e_7_1 };
                        return [3, 54];
                    case 49:
                        _y.trys.push([49, , 52, 53]);
                        if (!(!_t && !_g && (_h = mainStreams_2["return"]))) return [3, 51];
                        return [4, _h.call(mainStreams_2)];
                    case 50:
                        _y.sent();
                        _y.label = 51;
                    case 51: return [3, 53];
                    case 52:
                        if (e_7) throw e_7.error;
                        return [7];
                    case 53: return [7];
                    case 54:
                        if (!(locations.length > 0)) return [3, 56];
                        server_name = process
                            .cwd().split('/')[process.cwd().split('/').length - 1];
                        _x = content;
                        return [4, (0, nginx_literals_1.setServer)("".concat(server_name, ".local.gluestack.app"), locations)];
                    case 55:
                        content = _x + _y.sent();
                        _y.label = 56;
                    case 56: return [2, Promise.resolve(nginx_literals_1.startsWith + content + nginx_literals_1.endsWith)];
                }
            });
        });
    };
    NginxConf.prototype.hasServerName = function (router) {
        var _a, router_1, router_1_1;
        var _b, e_9, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var route, e_9_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 5, 6, 11]);
                        _a = true, router_1 = __asyncValues(router);
                        _e.label = 1;
                    case 1: return [4, router_1.next()];
                    case 2:
                        if (!(router_1_1 = _e.sent(), _b = router_1_1.done, !_b)) return [3, 4];
                        _d = router_1_1.value;
                        _a = false;
                        try {
                            route = _d;
                            if (route.hasOwnProperty("server_name") && route.server_name !== '') {
                                return [2, true];
                            }
                        }
                        finally {
                            _a = true;
                        }
                        _e.label = 3;
                    case 3: return [3, 1];
                    case 4: return [3, 11];
                    case 5:
                        e_9_1 = _e.sent();
                        e_9 = { error: e_9_1 };
                        return [3, 11];
                    case 6:
                        _e.trys.push([6, , 9, 10]);
                        if (!(!_a && !_b && (_c = router_1["return"]))) return [3, 8];
                        return [4, _c.call(router_1)];
                    case 7:
                        _e.sent();
                        _e.label = 8;
                    case 8: return [3, 10];
                    case 9:
                        if (e_9) throw e_9.error;
                        return [7];
                    case 10: return [7];
                    case 11: return [2, false];
                }
            });
        });
    };
    return NginxConf;
}());
exports["default"] = NginxConf;
//# sourceMappingURL=nginx-conf.js.map