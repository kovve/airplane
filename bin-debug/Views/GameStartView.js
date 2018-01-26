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
var GameStartView = (function (_super) {
    __extends(GameStartView, _super);
    function GameStartView() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/GameStartSkin.exml";
        return _this;
    }
    GameStartView.prototype.show = function () {
        _super.prototype.show.call(this);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRank, this);
        this.infoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInfo, this);
        this.rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReward, this);
    };
    GameStartView.prototype.onRestart = function (event) {
        GlobalData.score = 0;
        ModuleManager.getInstance().destroyForInstance(this);
        EventManager.dispatchEvent(new Events.CommonEvent(Events.CommonEvent.GAME_START));
    };
    GameStartView.prototype.onRank = function (event) {
        ModuleManager.getInstance().openModule("RankListView");
    };
    GameStartView.prototype.onInfo = function (event) {
        //{desc:string,titleUrl:string}
        ModuleManager.getInstance().openModule("GameRewardsView", { desc: GameConfig.gameIntro, titleUrl: "titleInfo_png", showBtn: false });
    };
    GameStartView.prototype.onReward = function (event) {
        //{desc:string,titleUrl:string}
        ModuleManager.getInstance().openModule("GameRewardsView", { desc: GameConfig.awardExplain, titleUrl: "titleAward_png", showBtn: false });
    };
    return GameStartView;
}(component.BaseView));
__reflect(GameStartView.prototype, "GameStartView");
