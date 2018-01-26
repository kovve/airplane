class GameStartView extends component.BaseView {
    private startBtn:eui.Image;
    private rankBtn:eui.Image;
    private infoBtn:eui.Image;
    private rewardBtn:eui.Image;
    public constructor() {
        super();
        this.skinName = "resource/eui_skins/GameStartSkin.exml";
    }
    public show(): void
    {
        super.show();
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRank, this);
        this.infoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInfo, this);
        this.rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReward, this);
    }
    private onRestart (event: egret.TouchEvent):void
    {
        GlobalData.score = 0;
        ModuleManager.getInstance().destroyForInstance(this);
        EventManager.dispatchEvent(new Events.CommonEvent(Events.CommonEvent.GAME_START))
       
    }
    private onRank (event: egret.TouchEvent):void
    {

        ModuleManager.getInstance().openModule("RankListView");

    }
    private onInfo (event: egret.TouchEvent):void
    {
        //{desc:string,titleUrl:string}
        ModuleManager.getInstance().openModule("GameRewardsView",
            {desc:GameConfig.gameIntro,titleUrl:"titleInfo_png",showBtn:false});

    }
    private onReward (event: egret.TouchEvent):void
    {
        //{desc:string,titleUrl:string}
        ModuleManager.getInstance().openModule("GameRewardsView",
            {desc:GameConfig.awardExplain,titleUrl:"titleAward_png",showBtn:false});

    }

}