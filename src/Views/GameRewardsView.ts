class GameRewardsView extends component.BaseView {
    // private gameBtn:eui.Button;
    private okBtn:eui.Button;
	private desc:eui.Label;
	private title:eui.Image;
	private linkBtn:eui.Button;
	private gameBtn:eui.Button;//立即试玩
	private initData:{desc:string,titleUrl:string,showBtn:boolean};//{desc:"",titleUrl:""}

	public constructor() {
        super();
        this.skinName = "resource/eui_skins/RewardsSkin.exml";
    }

    public init(data: {desc:string,titleUrl:string,showBtn:boolean} = null): void {
        this.initData = data;
    }
    protected childrenCreated(): void {
        super.childrenCreated();

        this.verticalCenter = this.horizontalCenter = 0;

        this.desc.text = utils.StringUtil.formatStr(this.initData.desc);

        this.title.source = this.initData.titleUrl;


        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);

        this.gameBtn.visible = this.initData.showBtn;
        this.linkBtn.visible = this.initData.showBtn;
        if(this.initData.showBtn)
        {
            this.gameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
            this.linkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLink, this);
        }
    }

    private onClose (event: egret.TouchEvent):void
    {
        super.hide();
        if(this.initData.showBtn)
        {
            ModuleManager.getInstance().openModule("GameStartView");
        }
    }

    private onLink (event: egret.TouchEvent):void
    {
        window.open(GameConfig.downloadUrl);
        // window.open("http://hnly.chinashadt.com:8010/syncott/Modile/Detailed/download/index.html");
    }

    private gameStart (event: egret.TouchEvent):void
    {
        super.hide();
        ModuleManager.getInstance().openModule("GameStartView");
    }
}