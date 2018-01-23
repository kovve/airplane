/**
 *
 * @author
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Manager;
(function (Manager) {
    var UIManager = (function (_super) {
        __extends(UIManager, _super);
        function UIManager() {
            return _super.call(this) || this;
        }
        UIManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new UIManager();
            }
            return this.instance;
        };
        UIManager.prototype.startGame = function () {
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
            this._appLevel.width = Manager.Layout.getInstance().stage.stageWidth;
            this._appLevel.height = Manager.Layout.getInstance().stage.stageHeight;
            this._appLevel.touchEnabled = false;
            this._appLevel.layout = new eui.BasicLayout();
            Manager.Layout.getInstance().stage.addChild(this._mapLevel);
            Manager.Layout.getInstance().stage.addChild(this._gameLvel);
            Manager.Layout.getInstance().stage.addChild(this._appLevel);
            Manager.Layout.getInstance().stage.addChild(this._topLevel);
            Manager.Layout.getInstance().stage.addChild(this._loadLevel);
        };
        Object.defineProperty(UIManager.prototype, "appLevel", {
            get: function () {
                return this._appLevel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIManager.prototype, "mapLevel", {
            get: function () {
                return this._mapLevel;
            },
            enumerable: true,
            configurable: true
        });
        return UIManager;
    }(egret.EventDispatcher));
    Manager.UIManager = UIManager;
    __reflect(UIManager.prototype, "Manager.UIManager");
})(Manager || (Manager = {}));
