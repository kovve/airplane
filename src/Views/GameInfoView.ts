class GameInfoView extends component.BaseView {
    private desc:eui.Label;
    private goBackBtn:eui.Image;

	public constructor() {
        super();
        this.skinName = "resource/eui_skins/GameInfo.exml";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.verticalCenter = this.horizontalCenter = 0;
         // this.width = Layout.getInstance().stage.stageWidth;
        this.desc.text = GameConfig.gameIntro;

        this.goBackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    }

    private onClose (event: egret.TouchEvent):void
    {
        super.hide();

    }

}