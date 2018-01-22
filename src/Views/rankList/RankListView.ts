/**
 *
 * 排行榜
 */


module Views {

    import Layout = Manager.Layout;
    import StringUtil = utils.StringUtil;
    import GlobalData = Model.GlobalData;
    import DataManager = Manager.DataManager;
    import CommonEvent = Events.CommonEvent;
    import HttpCommand = proxy.HttpCommand;
    import ModuleManager = Manager.ModuleManager;
    import EventManager = Manager.EventManager;
    import BaseView = component.BaseView;

    export class RankListView extends BaseView {
        private mylist: eui.List;
        private nationBtn: eui.Button;
        private localBtn: eui.Button;
        private backBtn: eui.Image;
        private curType: number;//1 为本地排行  2 为全国排行榜
        public constructor() {
            super();
            this.skinName = "resource/eui_skins/RankPanel.exml";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onshow, this);
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.width = Layout.getInstance().stage.stageWidth;
            this.height = Layout.getInstance().stage.stageHeight;

        }

        private onChange(e: egret.TouchEvent): void {
            if (e.currentTarget.name == "nationBtn") {
                this.curType = 2;
            }
            else {
                this.curType = 1;

            }
            this.changeRank();
        }

        private onshow(): void {
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
        }

        public detroy(): void {
            EventManager.removeEventListener(CommonEvent.GET_RANK_SUCESS, this.renderData, this);

            this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);

            this.nationBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
            this.localBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);

            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
        }

        private initX: number = 0;
        private initY: number = 0;

        private begin(e: egret.TouchEvent): void {
            this.initX = e.stageX;
            this.initY = e.stageY;
        }

        private end(e: egret.TouchEvent): void {
            // alert("滑动距离："+(e.stageX - this.initX));
            if ((e.stageX - this.initX > 200 || e.stageX - this.initX < -200)) {
                this.mylist.dataProvider = null;
                this.curType = this.curType == 1 ? 2 : 1;
                this.changeRank();
            }
        }

        private onBack(e: egret.TouchEvent): void {
            ModuleManager.getInstance().destroyForInstance(this);
        }

        private changeRank(): void {
            if (this.mylist) {
                this.mylist.scrollV = 0;
            }
            if (this.curType == 1) {
                this.localBtn.currentState = "down";
                this.nationBtn.currentState = "up";

                this.touchChildren = this.touchEnabled = false;
                HttpCommand.getInstance().getRankList(GlobalData.gameDomainURL,
                    GlobalData.gameId, this.curType);
            }
            else {
                this.localBtn.currentState = "up";
                this.nationBtn.currentState = "down";

                this.touchChildren = this.touchEnabled = false;
                HttpCommand.getInstance().getRankList(GlobalData.gameDomainURL,
                    GlobalData.gameId, this.curType);

            }


        }

        private renderData(e: CommonEvent = null) {
            this.touchChildren = this.touchEnabled = true;
            if (e) {
                if (parseInt(e.data) != this.curType) {
                    return;
                }
            }
            var dsListHeros: Object[];
            if (this.curType == 1) {
                dsListHeros = DataManager.getInstance().localSortList;
            }
            else {
                dsListHeros = DataManager.getInstance().nationSortList;
            }

            this.mylist.dataProvider = new eui.ArrayCollection(dsListHeros);

            this.mylist.scrollV = 0;
        }
    }

    export class RankListItemRenderer extends eui.ItemRenderer {
        private userPic: eui.Image;
        private order: eui.Label;

        public constructor() {
            super();
            this.skinName = "resource/eui_skins/RankListItem.exml";
        }

        protected createChildren(): void {
            super.createChildren();
            this.scaleX = Layout.getInstance().scaleX;
        }

        protected dataChanged(): void {
            super.dataChanged();
            this.data.userName = StringUtil.getChar(this.data.userName, 3 * 6);
            this.order.text = "" + (this.itemIndex + 1);
            // 同一个域下可以请求
            if (GlobalData.telephoneId > 0) {
                this.userPic.source = `http://${GlobalData.gameDomainURL}/statics/images/nophoto.gif`;
            }
            else {
                this.userPic.source = "" + this.data.userPic;
            }


            // this.userPic.source = "http://game.hslmnews.com/resource/assets/player.png";
        }
    }
}