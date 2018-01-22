module Views {

    import BaseView = component.BaseView;

    export class GameRewardsView extends BaseView {
        // private gameBtn:eui.Button;
        private okBtn: eui.Button;
        private desc: eui.Label;

        public constructor() {
            super();
            this.skinName = "resource/eui_skins/RewardsSkin.exml";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.verticalCenter = this.horizontalCenter = 0;
            // this.width = Layout.getInstance().stage.stageWidth;
            this.desc.text = `    周榜第一名，可获得价值五百元的新年大礼包一份，奖品由浏阳广播电视台提供。
				周榜第二名，可获得价值三百元的新年礼包一份，奖品由千城智联（上海）网络科技有限公司提供。 
				周榜第三名，可获得价值一百元的新年奖券一份，奖品由浏阳食品公司提供。
				
				通关用户将有机会获得最高一千元现金红包奖励。
				周榜奖励会在每周日的20:00进行统计，获奖用户可凭借帐号排名，前往浏阳广播电视台进行兑换。
				本活动排名以“掌上浏阳”客户端排位为准。
				本次活动最终解释权归浏阳广播电视台所有。`;

            this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            // this.linkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLink, this);
        }

        private onClose(event: egret.TouchEvent): void {
            super.hide();

        }
    }
}