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
    var GameRewardsView = (function (_super) {
        __extends(GameRewardsView, _super);
        function GameRewardsView() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/eui_skins/RewardsSkin.exml";
            return _this;
        }
        GameRewardsView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.verticalCenter = this.horizontalCenter = 0;
            // this.width = Layout.getInstance().stage.stageWidth;
            this.desc.text = "    \u5468\u699C\u7B2C\u4E00\u540D\uFF0C\u53EF\u83B7\u5F97\u4EF7\u503C\u4E94\u767E\u5143\u7684\u65B0\u5E74\u5927\u793C\u5305\u4E00\u4EFD\uFF0C\u5956\u54C1\u7531\u6D4F\u9633\u5E7F\u64AD\u7535\u89C6\u53F0\u63D0\u4F9B\u3002\n\t\t\t\t\u5468\u699C\u7B2C\u4E8C\u540D\uFF0C\u53EF\u83B7\u5F97\u4EF7\u503C\u4E09\u767E\u5143\u7684\u65B0\u5E74\u793C\u5305\u4E00\u4EFD\uFF0C\u5956\u54C1\u7531\u5343\u57CE\u667A\u8054\uFF08\u4E0A\u6D77\uFF09\u7F51\u7EDC\u79D1\u6280\u6709\u9650\u516C\u53F8\u63D0\u4F9B\u3002 \n\t\t\t\t\u5468\u699C\u7B2C\u4E09\u540D\uFF0C\u53EF\u83B7\u5F97\u4EF7\u503C\u4E00\u767E\u5143\u7684\u65B0\u5E74\u5956\u5238\u4E00\u4EFD\uFF0C\u5956\u54C1\u7531\u6D4F\u9633\u98DF\u54C1\u516C\u53F8\u63D0\u4F9B\u3002\n\t\t\t\t\n\t\t\t\t\u901A\u5173\u7528\u6237\u5C06\u6709\u673A\u4F1A\u83B7\u5F97\u6700\u9AD8\u4E00\u5343\u5143\u73B0\u91D1\u7EA2\u5305\u5956\u52B1\u3002\n\t\t\t\t\u5468\u699C\u5956\u52B1\u4F1A\u5728\u6BCF\u5468\u65E5\u768420:00\u8FDB\u884C\u7EDF\u8BA1\uFF0C\u83B7\u5956\u7528\u6237\u53EF\u51ED\u501F\u5E10\u53F7\u6392\u540D\uFF0C\u524D\u5F80\u6D4F\u9633\u5E7F\u64AD\u7535\u89C6\u53F0\u8FDB\u884C\u5151\u6362\u3002\n\t\t\t\t\u672C\u6D3B\u52A8\u6392\u540D\u4EE5\u201C\u638C\u4E0A\u6D4F\u9633\u201D\u5BA2\u6237\u7AEF\u6392\u4F4D\u4E3A\u51C6\u3002\n\t\t\t\t\u672C\u6B21\u6D3B\u52A8\u6700\u7EC8\u89E3\u91CA\u6743\u5F52\u6D4F\u9633\u5E7F\u64AD\u7535\u89C6\u53F0\u6240\u6709\u3002";
            this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            // this.linkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLink, this);
        };
        GameRewardsView.prototype.onClose = function (event) {
            _super.prototype.hide.call(this);
        };
        return GameRewardsView;
    }(BaseView));
    Views.GameRewardsView = GameRewardsView;
    __reflect(GameRewardsView.prototype, "Views.GameRewardsView");
})(Views || (Views = {}));
