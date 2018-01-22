module Views {
    import BaseView = component.BaseView;

    export class GameInfoVGameNoInAppViewiew extends BaseView {
        private gameBtn: eui.Button;
        private linkBtn: eui.Button;

        public constructor() {
            super();
            this.skinName = "resource/eui_skins/UninAppNotic.exml";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.verticalCenter = this.horizontalCenter = 0;
            // this.width = Layout.getInstance().stage.stageWidth;
            // this.desc.text = DataManager.getInstance().gameVO.gameIntro;

            this.gameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.linkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLink, this);
        }

        private onClose(event: egret.TouchEvent): void {
            super.hide();
            // if(!GlobalData.isFirstLog)
            // {

            //     GlobalData.isFirstLog = true;
            //     ModuleManager.getInstance().openModule("GameInfoView");
            // }

        }

        private onLink(event: egret.TouchEvent): void {
            window.open("http://hnly.chinashadt.com:8010/syncott/Modile/Detailed/download/index.html");
        }

    }
}