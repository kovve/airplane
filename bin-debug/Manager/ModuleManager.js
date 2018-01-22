var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Manager;
(function (Manager) {
    var getDefinitionByName = egret.getDefinitionByName;
    /**
     * 模块控制管理类
     * @param
     *
     */
    var ModuleManager = (function () {
        function ModuleManager() {
            this.maps = {};
        }
        ModuleManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new ModuleManager();
            }
            return this.instance;
        };
        /**
         * 打开一个模块
         * @param  moduleName  模块名
         * @param  data  传入模块的参数
         *
         */
        ModuleManager.prototype.openModule = function (moduleName, data) {
            if (data === void 0) { data = null; }
            console.log("打开模块：" + moduleName);
            var view;
            if (this.maps.hasOwnProperty(moduleName)) {
                view = this.maps[moduleName];
            }
            else {
                var _class = getDefinitionByName(moduleName);
                view = new _class();
                this.maps[moduleName] = view;
            }
            if (data) {
                view.init(data);
            }
            view.show();
            // this.traceMap();
        };
        /**
         * 隐藏对象，在模块外部使用
         * @param
         *
         */
        ModuleManager.prototype.hideModel = function (moduleName) {
            if (moduleName === void 0) { moduleName = ""; }
            var view = this.maps[moduleName];
            if (view) {
                view.hide();
            }
            console.log("hide模块：" + moduleName);
        };
        /**
         * 销毁对象，在模块外部使用
         * @param o
         *
         */
        ModuleManager.prototype.destoryModule = function (moduleName) {
            if (moduleName === void 0) { moduleName = ""; }
            var view = this.maps[moduleName];
            if (view) {
                view.dispose();
                view = null;
                delete this.maps[moduleName];
            }
            console.log("关闭模块：" + moduleName);
            // this.traceMap();
        };
        ModuleManager.prototype.isContain = function (moduleName) {
            if (this.maps.hasOwnProperty(moduleName)) {
                return true;
            }
            return false;
        };
        /**
         * 销毁所有的模块
         *
         */
        ModuleManager.prototype.destoryAll = function () {
            var key;
            for (key in this.maps) {
                this.destoryModule(key);
            }
            this.maps = {};
        };
        /**
         * 销毁当前对象，在模块内部使用，比如点击一个关闭按钮
         * @param o
         *
         */
        ModuleManager.prototype.destroyForInstance = function (o) {
            var url = egret.getQualifiedClassName(o);
            this.destoryModule(url);
        };
        ModuleManager.prototype.traceMap = function () {
            var key;
            for (key in this.maps) {
                console.log(key);
            }
        };
        return ModuleManager;
    }());
    Manager.ModuleManager = ModuleManager;
    __reflect(ModuleManager.prototype, "Manager.ModuleManager");
})(Manager || (Manager = {}));
