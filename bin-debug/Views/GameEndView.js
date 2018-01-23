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
    var ModuleManager = Manager.ModuleManager;
    var CommonEvent = Events.CommonEvent;
    var EventManager = Manager.EventManager;
    var GlobalData = Model.GlobalData;
    var HttpCommand = proxy.HttpCommand;
    var PlayerInfoProxy = proxy.PlayerInfoProxy;
    var Layout = Manager.Layout;
    var ViewUtil = utils.ViewUtil;
    var BaseView = component.BaseView;
    var GameEndView = (function (_super) {
        __extends(GameEndView, _super);
        function GameEndView() {
            var _this = _super.call(this) || this;
            _this.fullScreen = true;
            _this.skinName = "resource/eui_skins/GameEndSkin.exml";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onshow, _this);
            return _this;
        }
        GameEndView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            // this.width = Layout.getInstance().stage.stageWidth;
            this.verticalCenter = this.horizontalCenter = 0;
            this.addChildAt(ViewUtil.getShape(Layout.getInstance().stage.stageWidth, Layout.getInstance().stage.stageHeight, 0, 0.5), 0);
            // this.init();
        };
        GameEndView.prototype.onshow = function () {
            if (!GlobalData.isInAPP) {
                //再次查询下 预防新用户首次登陆出现的 没有信息的情况
                // alert("不在App中！");
                PlayerInfoProxy.getInstance().getMyInfo(); //查询用户信息
                if (!GlobalData.isInAPP) {
                    //  alert("不在App中！");
                    this.myscore.text = "" + GlobalData.score;
                    this.topScore.text = "";
                    this.initEvent();
                    this.notIngameText.visible = true;
                    return;
                }
                //  alert("获取信息成功！");
            }
            this.notIngameText.visible = false;
            EventManager.addEventListener(CommonEvent.UP_SOCRE_SUCESS, this.onUpSocre, this);
            HttpCommand.getInstance().reportResult(GlobalData.userID, GlobalData.score);
        };
        GameEndView.prototype.initEvent = function () {
            this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.allRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRank, this);
        };
        GameEndView.prototype.onUpSocre = function (e) {
            this.initEvent();
            console.log("开始请求");
            EventManager.removeEventListener(CommonEvent.UP_SOCRE_SUCESS, this.onUpSocre, this);
            EventManager.addEventListener(CommonEvent.GET_USERRANK_SUCESS, this.onGetUserRank, this);
            HttpCommand.getInstance().getUserRank(GlobalData.userID);
        };
        GameEndView.prototype.onGetUserRank = function (e) {
            var obj = e.data;
            var myObj = obj["0"];
            var rankArr = [];
            if (obj["prevMember"] && obj["prevMember"]["userid"]) {
                rankArr.push(obj["prevMember"]);
            }
            if (obj["0"]) {
                obj["0"]["self"] = true;
                rankArr.push(obj["0"]);
            }
            if (obj["nextMember"] && obj["nextMember"]["userid"]) {
                rankArr.push(obj["nextMember"]);
            }
            this.myscore.text = "" + GlobalData.score;
            this.topScore.text = "\u5386\u53F2\u6700\u9AD8\u5206\uFF1A" + myObj["userScore"];
            for (var i = 0; i < rankArr.length; i++) {
                var data = rankArr[i];
                var item = new Views.EndRankItem(data);
                this.subGroup.addChild(item);
                item.x = 196 * i;
            }
            EventManager.removeEventListener(CommonEvent.GET_USERRANK_SUCESS, this.onGetUserRank, this);
        };
        GameEndView.prototype.onRestart = function (event) {
            this.onClose(null);
        };
        GameEndView.prototype.onClose = function (e) {
            // EventManager.dispatchEvent(new MyUIEvent(MyUIEvent.restart_Status));
            ModuleManager.getInstance().destroyForInstance(this);
            // EventManager.dispatchEvent(new MyUIEvent(MyUIEvent.goHome_Status));
        };
        /**
         * 打开排行榜
         */
        GameEndView.prototype.onRank = function (e) {
            // this.onClose(null);
            ModuleManager.getInstance().openModule("RankListView");
            // EventManager.dispatchEvent(new MyUIEvent(MyUIEvent.goHome_Status));
        };
        GameEndView.prototype.hide = function () {
            EventManager.removeEventListener(CommonEvent.UP_SOCRE_SUCESS, this.onUpSocre, this);
            EventManager.removeEventListener(CommonEvent.GET_USERRANK_SUCESS, this.onGetUserRank, this);
            this.restartBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.restartBtn = null;
            this.closeBtn = null;
            this.allRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRank, this);
            this.allRank = null;
            _super.prototype.hide.call(this);
        };
        return GameEndView;
    }(BaseView));
    Views.GameEndView = GameEndView;
    __reflect(GameEndView.prototype, "Views.GameEndView");
})(Views || (Views = {}));
