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
var GameInfoVGameNoInAppViewiew = (function (_super) {
    __extends(GameInfoVGameNoInAppViewiew, _super);
    function GameInfoVGameNoInAppViewiew() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/UninAppNotic.exml";
        return _this;
    }
    GameInfoVGameNoInAppViewiew.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.verticalCenter = this.horizontalCenter = 0;
        // this.width = Layout.getInstance().stage.stageWidth;
        // this.desc.text = DataManager.getInstance().gameVO.gameIntro;
        this.gameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.linkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLink, this);
    };
    GameInfoVGameNoInAppViewiew.prototype.onClose = function (event) {
        _super.prototype.hide.call(this);
        if (!GlobalData.isNotFirstLogin) {
            GlobalData.isNotFirstLogin = true;
            ModuleManager.getInstance().openModule("GameInfoView");
        }
    };
    GameInfoVGameNoInAppViewiew.prototype.onLink = function (event) {
        window.open(GameConfig.downloadUrl);
        // window.open("http://hnly.chinashadt.com:8010/syncott/Modile/Detailed/download/index.html");
    };
    return GameInfoVGameNoInAppViewiew;
}(component.BaseView));
__reflect(GameInfoVGameNoInAppViewiew.prototype, "GameInfoVGameNoInAppViewiew");
