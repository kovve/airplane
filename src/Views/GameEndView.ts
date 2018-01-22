module Views {
    import ModuleManager = Manager.ModuleManager;
    import CommonEvent = Events.CommonEvent;
    import EventManager = Manager.EventManager;
    import GlobalData = Model.GlobalData;
    import HttpCommand = proxy.HttpCommand;
    import PlayerInfoProxy = proxy.PlayerInfoProxy;
    import Layout = Manager.Layout;
    import ViewUtil = utils.ViewUtil;
    import BaseView = component.BaseView;

    export class GameEndView extends BaseView {
        private restartBtn: eui.Image;
        private closeBtn: eui.Image;
        private myscore: eui.BitmapLabel;
        private topScore: eui.Label;
        private allRank: eui.Label;
        private subGroup: eui.Group;
        private notIngameText: eui.Label;

        public constructor() {
            super();
            this.fullScreen = true;
            this.skinName = "resource/eui_skins/GameEndSkin.exml";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onshow, this);
        }

        protected childrenCreated(): void {
            super.childrenCreated();

            // this.width = Layout.getInstance().stage.stageWidth;

            this.verticalCenter = this.horizontalCenter = 0;

            this.addChildAt(ViewUtil.getShape(Layout.getInstance().stage.stageWidth, Layout.getInstance().stage.stageHeight, 0, 0.5), 0)
            // this.init();
        }

        private onshow(): void {
            if (!GlobalData.isInAPP) {
                //再次查询下 预防新用户首次登陆出现的 没有信息的情况
                // alert("不在App中！");
                PlayerInfoProxy.getInstance().getMyInfo();//查询用户信息
                if (!GlobalData.isInAPP) {
                    //  alert("不在App中！");
                    this.myscore.text = `${GlobalData.score}`;
                    this.topScore.text = "";
                    this.initEvent();
                    this.notIngameText.visible = true;
                    return;
                }
                //  alert("获取信息成功！");

            }
            this.notIngameText.visible = false;
            EventManager.addEventListener(CommonEvent.UP_SOCRE_SUCESS, this.onUpSocre, this);
            HttpCommand.getInstance().reportResult(GlobalData.gameDomainURL,
                GlobalData.userID, GlobalData.gameId, GlobalData.score);
        }

        public initEvent(): void {
            this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);

            this.allRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRank, this);
        }

        private onUpSocre(e: CommonEvent): void {
            this.initEvent();
            console.log("开始请求");
            EventManager.removeEventListener(CommonEvent.UP_SOCRE_SUCESS, this.onUpSocre, this);
            EventManager.addEventListener(CommonEvent.GET_USERRANK_SUCESS, this.onGetUserRank, this);
            HttpCommand.getInstance().getUserRank(
                GlobalData.userID);

        }

        private onGetUserRank(e: CommonEvent): void {

            var obj: any = e.data;

            var myObj: any = obj["0"];
            var rankArr: any[] = [];
            if (obj["prevMember"] && obj["prevMember"]["userid"]) {
                rankArr.push(obj["prevMember"])
            }
            if (obj["0"]) {
                obj["0"]["self"] = true;
                rankArr.push(obj["0"]);
            }

            if (obj["nextMember"] && obj["nextMember"]["userid"]) {
                rankArr.push(obj["nextMember"])
            }

            this.myscore.text = `${GlobalData.score}`;
            this.topScore.text = `历史最高分：${myObj["userScore"]}`;

            for (let i = 0; i < rankArr.length; i++) {
                var data: any = rankArr[i];
                var item: EndRankItem = new EndRankItem(data);

                this.subGroup.addChild(item);
                item.x = 196 * i;
            }

            EventManager.removeEventListener(CommonEvent.GET_USERRANK_SUCESS, this.onGetUserRank, this);

        }

        private onRestart(event: egret.TouchEvent): void {
            this.onClose(null);
        }

        private onClose(e: egret.TouchEvent): void {
            // EventManager.dispatchEvent(new MyUIEvent(MyUIEvent.restart_Status));
            ModuleManager.getInstance().destroyForInstance(this);

            // EventManager.dispatchEvent(new MyUIEvent(MyUIEvent.goHome_Status));
        }

        /**
         * 打开排行榜
         */
        private onRank(e: egret.TouchEvent): void {
            // this.onClose(null);
            ModuleManager.getInstance().openModule("RankListView");
            // EventManager.dispatchEvent(new MyUIEvent(MyUIEvent.goHome_Status));
        }


        public hide(): void {
            EventManager.removeEventListener(CommonEvent.UP_SOCRE_SUCESS, this.onUpSocre, this);

            EventManager.removeEventListener(CommonEvent.GET_USERRANK_SUCESS, this.onGetUserRank, this);

            this.restartBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.restartBtn = null;
            this.closeBtn = null;

            this.allRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRank, this);

            this.allRank = null;
            super.hide();
        }

    }
}