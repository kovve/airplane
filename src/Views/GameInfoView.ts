module Views {

    import DataManager = Manager.DataManager;
    import BaseView = component.BaseView;

    export class GameInfoView extends BaseView {
        private desc: eui.Label;
        private goBackBtn: eui.Image;

        public constructor() {
            super();
            this.skinName = "resource/eui_skins/GameInfo.exml";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.verticalCenter = this.horizontalCenter = 0;
            this.desc.text = DataManager.getInstance().gameVO.gameIntro;

            // this.goBackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        }

        //关闭
        private onClose(event: egret.TouchEvent): void {
            super.hide();

        }

    }
}