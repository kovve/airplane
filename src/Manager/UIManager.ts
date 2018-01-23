/**
 *
 * @author
 *
 */

module Manager {

    export class UIManager extends egret.EventDispatcher{
        public constructor() {
            super();
        }

        private static instance:UIManager;
        public static getInstance():UIManager
        {
            if(this.instance == null)
            {
                this.instance = new UIManager();
            }
            return this.instance;
        }
        /**底图层*/
        private _mapLevel:egret.Sprite;

        private _gameLvel:eui.Group;

        private _appLevel:eui.Group;

        private _topLevel:eui.Group;

        private _loadLevel:eui.Group;


        public bg:egret.Bitmap;

        public startGame():void
        {

            this._mapLevel = new egret.Sprite();
            this._gameLvel = new eui.Group();
            this._appLevel = new eui.Group();
            this._topLevel = new eui.Group();
            this._loadLevel = new eui.Group();

            // this._mapLevel.width = GlobalData.GameStage_width;
            // this._mapLevel.height = GlobalData.GameStage_height;
            //
            // this._gameLvel.width = Layout.getInstance().stage.stageWidth;
            // this._gameLvel.height = Layout.getInstance().stage.stageHeight;
            //
            // this._gameLvel.layout = new eui.BasicLayout();

            this._appLevel.width = Layout.getInstance().stage.stageWidth;
            this._appLevel.height = Layout.getInstance().stage.stageHeight;
            this._appLevel.touchEnabled = false;

            this._appLevel.layout = new eui.BasicLayout();

            Layout.getInstance().stage.addChild(this._mapLevel);
            Layout.getInstance().stage.addChild(this._gameLvel);
            Layout.getInstance().stage.addChild(this._appLevel);
            Layout.getInstance().stage.addChild(this._topLevel);
            Layout.getInstance().stage.addChild(this._loadLevel);
        }
        public get appLevel():eui.Group
        {
            return this._appLevel;
        }
        public get mapLevel():egret.Sprite
        {
            return this._mapLevel;
        }

    }
}
