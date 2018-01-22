
module Manager {

    /**
    *布局类
    ** **/
    export class Layout {

        public static firstLevel: number = 0;
        public static secondLevel: number = 1;
        public static thirdLevel: number = 2;

        private Mstage: egret.Stage;
        private _scaleY: number = 1;
        private _scaleX: number = 1;
        private static instance: Layout;

        public static getInstance(): Layout {
            if (this.instance == null) {
                this.instance = new Layout();
            }
            return this.instance;
        }

        public init(_stage: egret.Stage): void {
            this.Mstage = _stage;
            if (!egret.Capabilities.isMobile) {
                this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
                return;
            }
            // this.Mstage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            // this.Mstage.scaleMode = egret.Capabilities.isMobile?
            // egret.StageScaleMode.SHOW_ALL:egret.StageScaleMode.SHOW_ALL;

            console.log("当前渲染模式：" + egret.Capabilities.renderMode);
            console.log("边界" + egret.Capabilities.boundingClientWidth + "*" + egret.Capabilities.boundingClientHeight)
            // console.log(""+window.screen.width+"*"+ window.screen.height);
            let screenW: number = egret.Capabilities.boundingClientWidth;
            let screenH: number = egret.Capabilities.boundingClientHeight;
            var r: number = screenW / screenH;//700/1280
            let designW: number = 720;
            let designH: number = 1280;
            if (r < designW / designH)//FIXED_HEIGHT
            {
                this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            }
            else {
                this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;

            }
            this._scaleX = this.stage.stageWidth / designW;
            this._scaleY = this.stage.stageHeight / designH;

            console.log("stageWidth" + this.stage.stageWidth + ";stageHeight" + this.stage.stageHeight);

            console.log("scaleX:" + this._scaleX + ";scaleY:" + this._scaleY);

        }

        public get stage(): egret.Stage {
            return this.Mstage;
        }

        public get scaleX(): number {
            return this._scaleX
        }

        public get scaleY(): number {
            return this._scaleY;
        }

        public get scale(): number {
            return this._scaleX < this._scaleY ? this._scaleX : this._scaleY;
        }
    }
}