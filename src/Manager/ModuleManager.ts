
module Manager {
    import getDefinitionByName = egret.getDefinitionByName;

    /**
     * 模块控制管理类
     * @param
     *
     */
    export class ModuleManager {

        public constructor() {

        }

        private static instance: ModuleManager;

        public static getInstance(): ModuleManager {
            if (this.instance == null) {
                this.instance = new ModuleManager();
            }
            return this.instance;

        }

        private maps: { [id: string]: component.BaseView } = {};

        /**
         * 打开一个模块
         * @param  moduleName  模块名
         * @param  data  传入模块的参数
         *
         */
        public openModule(moduleName: string, data: any = null): void {
            console.log("打开模块：" + moduleName);
            let view: component.BaseView;
            if (this.maps.hasOwnProperty(moduleName)) {
                view = this.maps[moduleName];
            }
            else {
                var _class: any = getDefinitionByName(moduleName);
                view = new _class();
                this.maps[moduleName] = view;
            }
            if (data) {
                view.init(data);
            }
            view.show();

            // this.traceMap();
        }

        /**
         * 隐藏对象，在模块外部使用
         * @param
         *
         */
        public hideModel(moduleName: string = ""): void {
            let view: component.BaseView = this.maps[moduleName];
            if (view) {
                view.hide();

            }
            console.log("hide模块：" + moduleName);
        }

        /**
         * 销毁对象，在模块外部使用
         * @param o
         *
         */
        public destoryModule(moduleName: string = ""): void {
            let view: component.BaseView = this.maps[moduleName];
            if (view) {
                view.dispose();
                view = null;
                delete this.maps[moduleName];
            }
            console.log("关闭模块：" + moduleName);
            // this.traceMap();
        }

        public isContain(moduleName: string): boolean {
            if (this.maps.hasOwnProperty(moduleName)) {
                return true;
            }
            return false;
        }

        /**
         * 销毁所有的模块
         *
         */
        public destoryAll(): void {
            var key: string;
            for (key in this.maps) {
                this.destoryModule(key);
            }
            this.maps = {};

        }

        /**
         * 销毁当前对象，在模块内部使用，比如点击一个关闭按钮
         * @param o
         *
         */
        public destroyForInstance(o: Object): void {
            var url: string = egret.getQualifiedClassName(o);
            this.destoryModule(url);
        }

        private traceMap(): void {
            var key: string;
            for (key in this.maps) {
                console.log(key);
            }
        }
    }
}