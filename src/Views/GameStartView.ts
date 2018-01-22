module Views {

    import BaseView = component.BaseView;
    import GlobalData = Model.GlobalData;
    import ModuleManager = Manager.ModuleManager;

    export class GameStartView extends BaseView {
        public constructor() {
            super();
            this.fullScreen = true;
            this.addBlackBg = false;
            this.skinName = "resource/eui_skins/GameStartSkin.exml";
        }

        public show(): void {

            super.show();
            if (!GlobalData.isInAPP) {
                ModuleManager.getInstance().openModule("GameInfoVGameNoInAppViewiew");
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this)
        }

        private onRestart(event: egret.TouchEvent): void {
            GlobalData.score = 0;
            // SoundManager.getIns().addItem("hitSound_mp3");
            // SoundManager.getIns().addItem("gameFail_mp3");
            // SoundManager.getIns().addItem("startSound_mp3");

            // SoundManager.getIns().play("startSound_mp3");


            ModuleManager.getInstance().destroyForInstance(this);
            ModuleManager.getInstance().openModule("GameLogic");
        }

    }
}