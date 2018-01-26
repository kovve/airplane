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
var GlobalData = Model.GlobalData;
var GameEndView = (function (_super) {
    __extends(GameEndView, _super);
    function GameEndView() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/GameEndSkin.exml";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onshow, _this);
        return _this;
    }
    GameEndView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // this.width = Layout.getInstance().stage.stageWidth;
        this.verticalCenter = this.horizontalCenter = 0;
        // this.addChildAt(utils.ViewUtil.getShape(Layout.getInstance().stage.stageWidth,Layout.getInstance().stage.stageHeight,0,0.5),0)
        // this.init();
    };
    GameEndView.prototype.onshow = function () {
        this.topScore.text = "";
        if (!GlobalData.isInAPP) {
            this.myscore.text = "" + GlobalData.score;
            this.topScore.text = "";
            this.initEvent();
            this.notIngameText.visible = true;
            return;
        }
        this.notIngameText.visible = false;
        EventManager.addEventListener(Events.CommonEvent.UP_SOCRE_SUCESS, this.onUpSocre, this);
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
        EventManager.removeEventListener(Events.CommonEvent.UP_SOCRE_SUCESS, this.onUpSocre, this);
        EventManager.addEventListener(Events.CommonEvent.GET_USERRANK_SUCESS, this.onGetUserRank, this);
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
        // this.topScore.text = `历史最高分：${myObj["userScore"]}`;
        for (var i = 0; i < rankArr.length; i++) {
            var data = rankArr[i];
            var item = new EndRankItem(data);
            this.subGroup.addChild(item);
            item.x = 186 * i;
        }
        EventManager.removeEventListener(Events.CommonEvent.GET_USERRANK_SUCESS, this.onGetUserRank, this);
    };
    GameEndView.prototype.onRestart = function (event) {
        this.onClose(null);
    };
    GameEndView.prototype.onClose = function (e) {
        ModuleManager.getInstance().destroyForInstance(this);
        ModuleManager.getInstance().openModule("GameStartView");
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
        EventManager.removeEventListener(Events.CommonEvent.UP_SOCRE_SUCESS, this.onUpSocre, this);
        EventManager.removeEventListener(Events.CommonEvent.GET_USERRANK_SUCESS, this.onGetUserRank, this);
        this.restartBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.restartBtn = null;
        this.closeBtn = null;
        this.allRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRank, this);
        this.allRank = null;
        _super.prototype.hide.call(this);
    };
    return GameEndView;
}(component.BaseView));
__reflect(GameEndView.prototype, "GameEndView");
