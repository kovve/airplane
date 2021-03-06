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
var GameInfoView = (function (_super) {
    __extends(GameInfoView, _super);
    function GameInfoView() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/GameInfo.exml";
        return _this;
    }
    GameInfoView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.verticalCenter = this.horizontalCenter = 0;
        // this.width = Layout.getInstance().stage.stageWidth;
        this.desc.text = GameConfig.gameIntro;
        this.goBackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    };
    GameInfoView.prototype.onClose = function (event) {
        _super.prototype.hide.call(this);
    };
    return GameInfoView;
}(component.BaseView));
__reflect(GameInfoView.prototype, "GameInfoView");
