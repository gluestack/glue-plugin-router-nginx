"use strict";
exports.__esModule = true;
exports.getProjectName = void 0;
var getProjectName = function () {
    return process
        .cwd()
        .split('/')[process.cwd().split('/').length - 1];
};
exports.getProjectName = getProjectName;
//# sourceMappingURL=get-project-name.js.map