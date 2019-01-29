(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./tsconfig", "./cache", "./compiler_host", "./diagnostics", "./worker", "./manifest", "./plugin_api"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(require("./tsconfig"));
    __export(require("./cache"));
    __export(require("./compiler_host"));
    __export(require("./diagnostics"));
    __export(require("./worker"));
    __export(require("./manifest"));
    __export(require("./plugin_api"));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9pbnRlcm5hbC90c2Nfd3JhcHBlZC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLGdDQUEyQjtJQUMzQiw2QkFBd0I7SUFDeEIscUNBQWdDO0lBQ2hDLG1DQUE4QjtJQUM5Qiw4QkFBeUI7SUFDekIsZ0NBQTJCO0lBQzNCLGtDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gJy4vdHNjb25maWcnO1xuZXhwb3J0ICogZnJvbSAnLi9jYWNoZSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBpbGVyX2hvc3QnO1xuZXhwb3J0ICogZnJvbSAnLi9kaWFnbm9zdGljcyc7XG5leHBvcnQgKiBmcm9tICcuL3dvcmtlcic7XG5leHBvcnQgKiBmcm9tICcuL21hbmlmZXN0JztcbmV4cG9ydCAqIGZyb20gJy4vcGx1Z2luX2FwaSc7XG4iXX0=