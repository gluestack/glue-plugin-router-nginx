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
        this.mainStreams = [];
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
    NginxConf.prototype.addRouter = function (packageName, instance, port, string, routes, instancePath) {
        return __awaiter(this, void 0, void 0, function () {
            var exist, locations, server_name, stream;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, helpers_1.fileExists)(string)];
                    case 1:
                        exist = _a.sent();
                        if (!exist)
                            return [2, Promise.resolve(false)];
                        locations = __spreadArray([], require(string)(), true);
                        return [4, this.hasServerName(locations)];
                    case 2:
                        server_name = _a.sent();
                        stream = {
                            locations: locations,
                            port: port,
                            instance: (0, helpers_1.removeSpecialChars)(instance),
                            packageName: packageName,
                            routes: routes,
                            instancePath: instancePath
                        };
                        if (!server_name) {
                            this.mainStreams.push(stream);
                        }
                        else {
                            if (!this.upstreams[server_name]) {
                                this.upstreams[server_name] = [];
                            }
                            this.upstreams[server_name].push(stream);
                        }
                        return [2, Promise.resolve(true)];
                }
            });
        });
    };
    NginxConf.prototype.toConf = function () {
        var _a, e_1, _b, _c, _d, e_2, _e, _f, _g, e_3, _h, _j, _k, e_4, _l, _m, _o, e_5, _p, _q;
        return __awaiter(this, void 0, void 0, function () {
            var content, upstreams, mainStreams, _r, _s, _t, server_name, streams, locations_1, _u, streams_1, streams_1_1, upstream, _v, _w, _x, location_1, e_3_1, e_2_1, _y, e_1_1, locations, _z, mainStreams_1, mainStreams_1_1, mainStream, _0, _1, _2, location_2, e_5_1, e_4_1, server_name, _3;
            return __generator(this, function (_4) {
                switch (_4.label) {
                    case 0:
                        content = '';
                        upstreams = this.upstreams;
                        mainStreams = this.mainStreams;
                        _4.label = 1;
                    case 1:
                        _4.trys.push([1, 35, 36, 41]);
                        _r = true, _s = __asyncValues(Object.keys(upstreams));
                        _4.label = 2;
                    case 2: return [4, _s.next()];
                    case 3:
                        if (!(_t = _4.sent(), _a = _t.done, !_a)) return [3, 34];
                        _c = _t.value;
                        _r = false;
                        _4.label = 4;
                    case 4:
                        _4.trys.push([4, , 32, 33]);
                        server_name = _c;
                        streams = upstreams[server_name];
                        locations_1 = [];
                        _4.label = 5;
                    case 5:
                        _4.trys.push([5, 24, 25, 30]);
                        _u = true, streams_1 = (e_2 = void 0, __asyncValues(streams));
                        _4.label = 6;
                    case 6: return [4, streams_1.next()];
                    case 7:
                        if (!(streams_1_1 = _4.sent(), _d = streams_1_1.done, !_d)) return [3, 23];
                        _f = streams_1_1.value;
                        _u = false;
                        _4.label = 8;
                    case 8:
                        _4.trys.push([8, , 21, 22]);
                        upstream = _f;
                        _4.label = 9;
                    case 9:
                        _4.trys.push([9, 14, 15, 20]);
                        _v = true, _w = (e_3 = void 0, __asyncValues(upstream.locations));
                        _4.label = 10;
                    case 10: return [4, _w.next()];
                    case 11:
                        if (!(_x = _4.sent(), _g = _x.done, !_g)) return [3, 13];
                        _j = _x.value;
                        _v = false;
                        try {
                            location_1 = _j;
                            if (location_1.hasOwnProperty('path')) {
                                locations_1.push({
                                    path: location_1.path,
                                    proxy_instance: location_1.proxy.instance || "".concat(upstream.instance, ":").concat(upstream.port),
                                    proxy_path: location_1.proxy.path,
                                    host: location_1.host,
                                    size_in_mb: location_1.size_in_mb || 50,
                                    packageName: upstream.packageName,
                                    instance: upstream.instance,
                                    routes: upstream.routes,
                                    instancePath: upstream.instancePath
                                });
                            }
                        }
                        finally {
                            _v = true;
                        }
                        _4.label = 12;
                    case 12: return [3, 10];
                    case 13: return [3, 20];
                    case 14:
                        e_3_1 = _4.sent();
                        e_3 = { error: e_3_1 };
                        return [3, 20];
                    case 15:
                        _4.trys.push([15, , 18, 19]);
                        if (!(!_v && !_g && (_h = _w["return"]))) return [3, 17];
                        return [4, _h.call(_w)];
                    case 16:
                        _4.sent();
                        _4.label = 17;
                    case 17: return [3, 19];
                    case 18:
                        if (e_3) throw e_3.error;
                        return [7];
                    case 19: return [7];
                    case 20: return [3, 22];
                    case 21:
                        _u = true;
                        return [7];
                    case 22: return [3, 6];
                    case 23: return [3, 30];
                    case 24:
                        e_2_1 = _4.sent();
                        e_2 = { error: e_2_1 };
                        return [3, 30];
                    case 25:
                        _4.trys.push([25, , 28, 29]);
                        if (!(!_u && !_d && (_e = streams_1["return"]))) return [3, 27];
                        return [4, _e.call(streams_1)];
                    case 26:
                        _4.sent();
                        _4.label = 27;
                    case 27: return [3, 29];
                    case 28:
                        if (e_2) throw e_2.error;
                        return [7];
                    case 29: return [7];
                    case 30:
                        _y = content;
                        return [4, (0, nginx_literals_1.setServer)("".concat(server_name, ".local.gluestack.app"), locations_1)];
                    case 31:
                        content = _y + _4.sent();
                        return [3, 33];
                    case 32:
                        _r = true;
                        return [7];
                    case 33: return [3, 2];
                    case 34: return [3, 41];
                    case 35:
                        e_1_1 = _4.sent();
                        e_1 = { error: e_1_1 };
                        return [3, 41];
                    case 36:
                        _4.trys.push([36, , 39, 40]);
                        if (!(!_r && !_a && (_b = _s["return"]))) return [3, 38];
                        return [4, _b.call(_s)];
                    case 37:
                        _4.sent();
                        _4.label = 38;
                    case 38: return [3, 40];
                    case 39:
                        if (e_1) throw e_1.error;
                        return [7];
                    case 40: return [7];
                    case 41:
                        locations = [];
                        _4.label = 42;
                    case 42:
                        _4.trys.push([42, 61, 62, 67]);
                        _z = true, mainStreams_1 = __asyncValues(mainStreams);
                        _4.label = 43;
                    case 43: return [4, mainStreams_1.next()];
                    case 44:
                        if (!(mainStreams_1_1 = _4.sent(), _k = mainStreams_1_1.done, !_k)) return [3, 60];
                        _m = mainStreams_1_1.value;
                        _z = false;
                        _4.label = 45;
                    case 45:
                        _4.trys.push([45, , 58, 59]);
                        mainStream = _m;
                        _4.label = 46;
                    case 46:
                        _4.trys.push([46, 51, 52, 57]);
                        _0 = true, _1 = (e_5 = void 0, __asyncValues(mainStream.locations));
                        _4.label = 47;
                    case 47: return [4, _1.next()];
                    case 48:
                        if (!(_2 = _4.sent(), _o = _2.done, !_o)) return [3, 50];
                        _q = _2.value;
                        _0 = false;
                        try {
                            location_2 = _q;
                            if (location_2.hasOwnProperty('path')) {
                                locations.push({
                                    path: location_2.path,
                                    proxy_instance: location_2.proxy.instance || "".concat(mainStream.instance, ":").concat(mainStream.port),
                                    proxy_path: location_2.proxy.path,
                                    host: location_2.host,
                                    size_in_mb: location_2.size_in_mb || 50,
                                    packageName: mainStream.packageName,
                                    instance: mainStream.instance,
                                    routes: mainStream.routes,
                                    instancePath: mainStream.instancePath
                                });
                            }
                        }
                        finally {
                            _0 = true;
                        }
                        _4.label = 49;
                    case 49: return [3, 47];
                    case 50: return [3, 57];
                    case 51:
                        e_5_1 = _4.sent();
                        e_5 = { error: e_5_1 };
                        return [3, 57];
                    case 52:
                        _4.trys.push([52, , 55, 56]);
                        if (!(!_0 && !_o && (_p = _1["return"]))) return [3, 54];
                        return [4, _p.call(_1)];
                    case 53:
                        _4.sent();
                        _4.label = 54;
                    case 54: return [3, 56];
                    case 55:
                        if (e_5) throw e_5.error;
                        return [7];
                    case 56: return [7];
                    case 57: return [3, 59];
                    case 58:
                        _z = true;
                        return [7];
                    case 59: return [3, 43];
                    case 60: return [3, 67];
                    case 61:
                        e_4_1 = _4.sent();
                        e_4 = { error: e_4_1 };
                        return [3, 67];
                    case 62:
                        _4.trys.push([62, , 65, 66]);
                        if (!(!_z && !_k && (_l = mainStreams_1["return"]))) return [3, 64];
                        return [4, _l.call(mainStreams_1)];
                    case 63:
                        _4.sent();
                        _4.label = 64;
                    case 64: return [3, 66];
                    case 65:
                        if (e_4) throw e_4.error;
                        return [7];
                    case 66: return [7];
                    case 67:
                        if (!(locations.length > 0)) return [3, 69];
                        server_name = process
                            .cwd().split('/')[process.cwd().split('/').length - 1];
                        _3 = content;
                        return [4, (0, nginx_literals_1.setServer)("".concat(server_name, ".local.gluestack.app"), locations)];
                    case 68:
                        content = _3 + _4.sent();
                        _4.label = 69;
                    case 69: return [2, Promise.resolve(nginx_literals_1.startsWith + content + nginx_literals_1.endsWith)];
                }
            });
        });
    };
    NginxConf.prototype.toProdConf = function () {
        var _a, e_6, _b, _c, _d, e_7, _e, _f, _g, e_8, _h, _j, _k, e_9, _l, _m, _o, e_10, _p, _q;
        return __awaiter(this, void 0, void 0, function () {
            var content, upstreams, mainStreams, _r, _s, _t, server_name, streams, locations_2, _u, streams_2, streams_2_1, upstream, _v, _w, _x, location_3, e_8_1, e_7_1, _y, e_6_1, locations, _z, mainStreams_2, mainStreams_2_1, mainStream, _0, _1, _2, location_4, e_10_1, e_9_1, server_name, _3;
            return __generator(this, function (_4) {
                switch (_4.label) {
                    case 0:
                        content = '';
                        upstreams = this.upstreams;
                        mainStreams = this.mainStreams;
                        _4.label = 1;
                    case 1:
                        _4.trys.push([1, 35, 36, 41]);
                        _r = true, _s = __asyncValues(Object.keys(upstreams));
                        _4.label = 2;
                    case 2: return [4, _s.next()];
                    case 3:
                        if (!(_t = _4.sent(), _a = _t.done, !_a)) return [3, 34];
                        _c = _t.value;
                        _r = false;
                        _4.label = 4;
                    case 4:
                        _4.trys.push([4, , 32, 33]);
                        server_name = _c;
                        streams = upstreams[server_name];
                        locations_2 = [];
                        _4.label = 5;
                    case 5:
                        _4.trys.push([5, 24, 25, 30]);
                        _u = true, streams_2 = (e_7 = void 0, __asyncValues(streams));
                        _4.label = 6;
                    case 6: return [4, streams_2.next()];
                    case 7:
                        if (!(streams_2_1 = _4.sent(), _d = streams_2_1.done, !_d)) return [3, 23];
                        _f = streams_2_1.value;
                        _u = false;
                        _4.label = 8;
                    case 8:
                        _4.trys.push([8, , 21, 22]);
                        upstream = _f;
                        _4.label = 9;
                    case 9:
                        _4.trys.push([9, 14, 15, 20]);
                        _v = true, _w = (e_8 = void 0, __asyncValues(upstream.locations));
                        _4.label = 10;
                    case 10: return [4, _w.next()];
                    case 11:
                        if (!(_x = _4.sent(), _g = _x.done, !_g)) return [3, 13];
                        _j = _x.value;
                        _v = false;
                        try {
                            location_3 = _j;
                            if (location_3.hasOwnProperty('path')) {
                                locations_2.push({
                                    path: location_3.path,
                                    proxy_instance: location_3.proxy.instance || "".concat(upstream.instance, ":").concat(upstream.port),
                                    proxy_path: location_3.proxy.path,
                                    host: location_3.host,
                                    size_in_mb: location_3.size_in_mb || 50,
                                    routes: upstream.routes,
                                    instancePath: upstream.instancePath
                                });
                            }
                        }
                        finally {
                            _v = true;
                        }
                        _4.label = 12;
                    case 12: return [3, 10];
                    case 13: return [3, 20];
                    case 14:
                        e_8_1 = _4.sent();
                        e_8 = { error: e_8_1 };
                        return [3, 20];
                    case 15:
                        _4.trys.push([15, , 18, 19]);
                        if (!(!_v && !_g && (_h = _w["return"]))) return [3, 17];
                        return [4, _h.call(_w)];
                    case 16:
                        _4.sent();
                        _4.label = 17;
                    case 17: return [3, 19];
                    case 18:
                        if (e_8) throw e_8.error;
                        return [7];
                    case 19: return [7];
                    case 20: return [3, 22];
                    case 21:
                        _u = true;
                        return [7];
                    case 22: return [3, 6];
                    case 23: return [3, 30];
                    case 24:
                        e_7_1 = _4.sent();
                        e_7 = { error: e_7_1 };
                        return [3, 30];
                    case 25:
                        _4.trys.push([25, , 28, 29]);
                        if (!(!_u && !_d && (_e = streams_2["return"]))) return [3, 27];
                        return [4, _e.call(streams_2)];
                    case 26:
                        _4.sent();
                        _4.label = 27;
                    case 27: return [3, 29];
                    case 28:
                        if (e_7) throw e_7.error;
                        return [7];
                    case 29: return [7];
                    case 30:
                        _y = content;
                        return [4, (0, nginx_literals_1.setServer)("".concat(server_name, ".local.gluestack.app"), locations_2)];
                    case 31:
                        content = _y + _4.sent();
                        return [3, 33];
                    case 32:
                        _r = true;
                        return [7];
                    case 33: return [3, 2];
                    case 34: return [3, 41];
                    case 35:
                        e_6_1 = _4.sent();
                        e_6 = { error: e_6_1 };
                        return [3, 41];
                    case 36:
                        _4.trys.push([36, , 39, 40]);
                        if (!(!_r && !_a && (_b = _s["return"]))) return [3, 38];
                        return [4, _b.call(_s)];
                    case 37:
                        _4.sent();
                        _4.label = 38;
                    case 38: return [3, 40];
                    case 39:
                        if (e_6) throw e_6.error;
                        return [7];
                    case 40: return [7];
                    case 41:
                        locations = [];
                        _4.label = 42;
                    case 42:
                        _4.trys.push([42, 61, 62, 67]);
                        _z = true, mainStreams_2 = __asyncValues(mainStreams);
                        _4.label = 43;
                    case 43: return [4, mainStreams_2.next()];
                    case 44:
                        if (!(mainStreams_2_1 = _4.sent(), _k = mainStreams_2_1.done, !_k)) return [3, 60];
                        _m = mainStreams_2_1.value;
                        _z = false;
                        _4.label = 45;
                    case 45:
                        _4.trys.push([45, , 58, 59]);
                        mainStream = _m;
                        _4.label = 46;
                    case 46:
                        _4.trys.push([46, 51, 52, 57]);
                        _0 = true, _1 = (e_10 = void 0, __asyncValues(mainStream.locations));
                        _4.label = 47;
                    case 47: return [4, _1.next()];
                    case 48:
                        if (!(_2 = _4.sent(), _o = _2.done, !_o)) return [3, 50];
                        _q = _2.value;
                        _0 = false;
                        try {
                            location_4 = _q;
                            if (location_4.hasOwnProperty('path')) {
                                locations.push({
                                    path: location_4.path,
                                    proxy_instance: location_4.proxy.instance || "".concat(mainStream.instance, ":").concat(mainStream.port),
                                    proxy_path: location_4.proxy.path,
                                    host: location_4.host,
                                    size_in_mb: location_4.size_in_mb || 50,
                                    routes: mainStream.routes,
                                    instancePath: mainStream.instancePath
                                });
                            }
                        }
                        finally {
                            _0 = true;
                        }
                        _4.label = 49;
                    case 49: return [3, 47];
                    case 50: return [3, 57];
                    case 51:
                        e_10_1 = _4.sent();
                        e_10 = { error: e_10_1 };
                        return [3, 57];
                    case 52:
                        _4.trys.push([52, , 55, 56]);
                        if (!(!_0 && !_o && (_p = _1["return"]))) return [3, 54];
                        return [4, _p.call(_1)];
                    case 53:
                        _4.sent();
                        _4.label = 54;
                    case 54: return [3, 56];
                    case 55:
                        if (e_10) throw e_10.error;
                        return [7];
                    case 56: return [7];
                    case 57: return [3, 59];
                    case 58:
                        _z = true;
                        return [7];
                    case 59: return [3, 43];
                    case 60: return [3, 67];
                    case 61:
                        e_9_1 = _4.sent();
                        e_9 = { error: e_9_1 };
                        return [3, 67];
                    case 62:
                        _4.trys.push([62, , 65, 66]);
                        if (!(!_z && !_k && (_l = mainStreams_2["return"]))) return [3, 64];
                        return [4, _l.call(mainStreams_2)];
                    case 63:
                        _4.sent();
                        _4.label = 64;
                    case 64: return [3, 66];
                    case 65:
                        if (e_9) throw e_9.error;
                        return [7];
                    case 66: return [7];
                    case 67:
                        if (!(locations.length > 0)) return [3, 69];
                        server_name = process
                            .cwd().split('/')[process.cwd().split('/').length - 1];
                        _3 = content;
                        return [4, (0, nginx_literals_1.setServer)("".concat(server_name, ".local.gluestack.app"), locations)];
                    case 68:
                        content = _3 + _4.sent();
                        _4.label = 69;
                    case 69: return [2, Promise.resolve(nginx_literals_1.startsWith + content + nginx_literals_1.endsWith)];
                }
            });
        });
    };
    NginxConf.prototype.hasServerName = function (router) {
        var _a, router_1, router_1_1;
        var _b, e_11, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var route, e_11_1;
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
                                return [2, route.server_name];
                            }
                        }
                        finally {
                            _a = true;
                        }
                        _e.label = 3;
                    case 3: return [3, 1];
                    case 4: return [3, 11];
                    case 5:
                        e_11_1 = _e.sent();
                        e_11 = { error: e_11_1 };
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
                        if (e_11) throw e_11.error;
                        return [7];
                    case 10: return [7];
                    case 11: return [2, false];
                }
            });
        });
    };
    NginxConf.prototype.getBuildPort = function (packageName, port) {
        switch (packageName) {
            default:
                return port;
        }
    };
    return NginxConf;
}());
exports["default"] = NginxConf;
//# sourceMappingURL=nginx-conf.js.map