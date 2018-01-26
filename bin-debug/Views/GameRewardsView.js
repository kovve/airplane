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
var GameRewardsView = (function (_super) {
    __extends(GameRewardsView, _super);
    function GameRewardsView() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/RewardsSkin.exml";
        return _this;
    }
    GameRewardsView.prototype.init = function (data) {
        if (data === void 0) { data = null; }
        this.initData = data;
    };
    GameRewardsView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.verticalCenter = this.horizontalCenter = 0;
        this.desc.text = this.initData.desc;
        this.title.source = this.initData.titleUrl;
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        // this.linkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLink, this);
        this.gameBtn.visible = this.initData.showBtn;
        this.linkBtn.visible = this.initData.showBtn;
        if (this.initData.showBtn) {
            this.gameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
            this.linkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLink, this);
        }
    };
    GameRewardsView.prototype.onClose = function (event) {
        _super.prototype.hide.call(this);
        if (this.initData.showBtn) {
            ModuleManager.getInstance().openModule("GameStartView");
        }
    };
    GameRewardsView.prototype.onLink = function (event) {
        window.open(GameConfig.downloadUrl);
        // window.open("http://hnly.chinashadt.com:8010/syncott/Modile/Detailed/download/index.html");
    };
    GameRewardsView.prototype.gameStart = function (event) {
        _super.prototype.hide.call(this);
        ModuleManager.getInstance().openModule("GameStartView");
    };
    return GameRewardsView;
}(component.BaseView));
__reflect(GameRewardsView.prototype, "GameRewardsView");
