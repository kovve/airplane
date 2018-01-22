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
var Views;
(function (Views) {
    var BaseView = component.BaseView;
    var GlobalData = Model.GlobalData;
    var ModuleManager = Manager.ModuleManager;
    var GameStartView = (function (_super) {
        __extends(GameStartView, _super);
        function GameStartView() {
            var _this = _super.call(this) || this;
            _this.fullScreen = true;
            _this.addBlackBg = false;
            _this.skinName = "resource/eui_skins/GameStartSkin.exml";
            return _this;
        }
        GameStartView.prototype.show = function () {
            _super.prototype.show.call(this);
            if (!GlobalData.isInAPP) {
                ModuleManager.getInstance().openModule("GameInfoVGameNoInAppViewiew");
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
        };
        GameStartView.prototype.onRestart = function (event) {
            GlobalData.score = 0;
            // SoundManager.getIns().addItem("hitSound_mp3");
            // SoundManager.getIns().addItem("gameFail_mp3");
            // SoundManager.getIns().addItem("startSound_mp3");
            // SoundManager.getIns().play("startSound_mp3");
            ModuleManager.getInstance().destroyForInstance(this);
            ModuleManager.getInstance().openModule("GameLogic");
        };
        return GameStartView;
    }(BaseView));
    Views.GameStartView = GameStartView;
    __reflect(GameStartView.prototype, "Views.GameStartView");
})(Views || (Views = {}));
