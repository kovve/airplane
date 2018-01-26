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
var EndRankItem = (function (_super) {
    __extends(EndRankItem, _super);
    function EndRankItem(item) {
        var _this = _super.call(this) || this;
        _this.data = item;
        _this.skinName = "resource/eui_skins/EndRankItemSkin.exml";
        return _this;
    }
    EndRankItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.init();
    };
    EndRankItem.prototype.init = function () {
        var isSelf = !!this.data["self"];
        this.nameText.text = utils.StringUtil.getChar(this.data.userName, 3 * 6);
        this.rank.textColor = isSelf ?
            0x3979fc : 0xCC3830;
        // this.rank.textColor = 0x3979fc;
        // this.bg.visible = isSelf;
        if (!isSelf) {
            this.currentState = "unSelect";
        }
        else {
            this.currentState = "selet";
        }
        this.userPic.source = "" + this.data.userPic;
        this.rank.text = "" + this.data.userNumber1;
        this.score.text = "" + this.data.userScore;
        // this.scaleX = Layout.getInstance().scaleX;
        // this.scaleY = Layout.getInstance().scaleY;
        // this.userPic.source = "http://game.hslmnews.com/resource/assets/player.png";
    };
    return EndRankItem;
}(eui.Component));
__reflect(EndRankItem.prototype, "EndRankItem");
