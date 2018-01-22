/**
 *
 * 排行榜
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
var Views;
(function (Views) {
    var Layout = Manager.Layout;
    var StringUtil = utils.StringUtil;
    var GlobalData = Model.GlobalData;
    var DataManager = Manager.DataManager;
    var CommonEvent = Events.CommonEvent;
    var HttpCommand = proxy.HttpCommand;
    var ModuleManager = Manager.ModuleManager;
    var EventManager = Manager.EventManager;
    var BaseView = component.BaseView;
    var RankListView = (function (_super) {
        __extends(RankListView, _super);
        function RankListView() {
            var _this = _super.call(this) || this;
            _this.initX = 0;
            _this.initY = 0;
            _this.skinName = "resource/eui_skins/RankPanel.exml";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onshow, _this);
            return _this;
        }
        RankListView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.width = Layout.getInstance().stage.stageWidth;
            this.height = Layout.getInstance().stage.stageHeight;
        };
        RankListView.prototype.onChange = function (e) {
            if (e.currentTarget.name == "nationBtn") {
                this.curType = 2;
            }
            else {
                this.curType = 1;
            }
            this.changeRank();
        };
        RankListView.prototype.onshow = function () {
            EventManager.addEventListener(CommonEvent.GET_RANK_SUCESS, this.renderData, this);
            this.curType = 1;
            this.changeRank();
            // this.mylist.dataProvider = new eui.ArrayCollection( dsListHeros );
            this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
            this.mylist.itemRenderer = RankListItemRenderer;
            this.nationBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
            this.localBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
        };
        RankListView.prototype.detroy = function () {
            EventManager.removeEventListener(CommonEvent.GET_RANK_SUCESS, this.renderData, this);
            this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
            this.nationBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
            this.localBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
        };
        RankListView.prototype.begin = function (e) {
            this.initX = e.stageX;
            this.initY = e.stageY;
        };
        RankListView.prototype.end = function (e) {
            // alert("滑动距离："+(e.stageX - this.initX));
            if ((e.stageX - this.initX > 200 || e.stageX - this.initX < -200)) {
                this.mylist.dataProvider = null;
                this.curType = this.curType == 1 ? 2 : 1;
                this.changeRank();
            }
        };
        RankListView.prototype.onBack = function (e) {
            ModuleManager.getInstance().destroyForInstance(this);
        };
        RankListView.prototype.changeRank = function () {
            if (this.mylist) {
                this.mylist.scrollV = 0;
            }
            if (this.curType == 1) {
                this.localBtn.currentState = "down";
                this.nationBtn.currentState = "up";
                this.touchChildren = this.touchEnabled = false;
                HttpCommand.getInstance().getRankList(GlobalData.gameDomainURL, GlobalData.gameId, this.curType);
            }
            else {
                this.localBtn.currentState = "up";
                this.nationBtn.currentState = "down";
                this.touchChildren = this.touchEnabled = false;
                HttpCommand.getInstance().getRankList(GlobalData.gameDomainURL, GlobalData.gameId, this.curType);
            }
        };
        RankListView.prototype.renderData = function (e) {
            if (e === void 0) { e = null; }
            this.touchChildren = this.touchEnabled = true;
            if (e) {
                if (parseInt(e.data) != this.curType) {
                    return;
                }
            }
            var dsListHeros;
            if (this.curType == 1) {
                dsListHeros = DataManager.getInstance().localSortList;
            }
            else {
                dsListHeros = DataManager.getInstance().nationSortList;
            }
            this.mylist.dataProvider = new eui.ArrayCollection(dsListHeros);
            this.mylist.scrollV = 0;
        };
        return RankListView;
    }(BaseView));
    Views.RankListView = RankListView;
    __reflect(RankListView.prototype, "Views.RankListView");
    var RankListItemRenderer = (function (_super) {
        __extends(RankListItemRenderer, _super);
        function RankListItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/eui_skins/RankListItem.exml";
            return _this;
        }
        RankListItemRenderer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.scaleX = Layout.getInstance().scaleX;
        };
        RankListItemRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.data.userName = StringUtil.getChar(this.data.userName, 3 * 6);
            this.order.text = "" + (this.itemIndex + 1);
            // 同一个域下可以请求
            if (GlobalData.telephoneId > 0) {
                this.userPic.source = "http://" + GlobalData.gameDomainURL + "/statics/images/nophoto.gif";
            }
            else {
                this.userPic.source = "" + this.data.userPic;
            }
            // this.userPic.source = "http://game.hslmnews.com/resource/assets/player.png";
        };
        return RankListItemRenderer;
    }(eui.ItemRenderer));
    Views.RankListItemRenderer = RankListItemRenderer;
    __reflect(RankListItemRenderer.prototype, "Views.RankListItemRenderer");
})(Views || (Views = {}));
