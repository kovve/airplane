module component {
    import Layout = Manager.Layout;
    import UIManager = Manager.UIManager;
    import ModuleManager = Manager.ModuleManager;
    import ViewUtil = utils.ViewUtil;

    export class BaseView extends eui.Component {

        protected addBlackBg: boolean = true;
        protected fullScreen: boolean = false;
        private bg: egret.Sprite;

        /**
         *
         * 面板基类
         * */
        public constructor() {
            super();
            this.verticalCenter = this.horizontalCenter = 0;
        }


        protected childrenCreated(): void {
            super.childrenCreated();
        }

        /*添加到舞台初始化数据*/
        public init(data: any = null): void {

        }

        public show(): void {
            if (this.addBlackBg) {
                this.addBg();
            }

            if (this.fullScreen) {
                this.width = Layout.getInstance().stage.stageWidth;
                this.height = Layout.getInstance().stage.stageHeight;

            }
            // this.x = (Layout.getInstance().stage.stageWidth - this.width)>>2;
            // this.y = (Layout.getInstance().stage.stageHeight - this.height)>>2;

            UIManager.getInstance().appLevel.addChild(this);

        }

        public addBg(): void {
            this.bg = ViewUtil.getShape(Layout.getInstance().stage.stageWidth,
                Layout.getInstance().stage.stageHeight, 0x000000, 0.5);
            UIManager.getInstance().appLevel.addChild(this.bg);
            this.bg.touchEnabled = true;
        }

        public hide(): void {
            ModuleManager.getInstance().destroyForInstance(this);
        }

        public dispose(): void {
            UIManager.getInstance().appLevel.removeChild(this);
            if (this.bg && this.bg.parent) {
                this.bg.parent.removeChild(this.bg);
            }
            this.bg = null;
        }

    }
}