/**
 *
 * 排行榜
 */
import RankData = Model.RankData;

class RankListView extends component.BaseView{
    private mylist:eui.List;
    private nationBtn:eui.Button;
    private localBtn:eui.Button;
    private backBtn:eui.Image;
    private scroller:eui.Scroller;
    private curType:number;//1 为本地排行  2 为全国排行榜
	public constructor() {
		super();
        this.skinName = "resource/eui_skins/RankPanel.exml";
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onshow,this);
	}

    protected childrenCreated(): void {
	    super.childrenCreated();

        
    }
    private onChange(e:egret.TouchEvent):void
    {
        if(e.currentTarget.skinName == "tabBtn2Skin")
        {
            this.curType = 2;
        }
        else
        {
            this.curType = 1;

        }
        this.changeRank();
    }
    private onshow():void
    {
        EventManager.addEventListener(Events.CommonEvent.GET_RANK_SUCESS,this.renderData,this);
        this.curType = 1;
        this.changeRank();
        // this.mylist.dataProvider = new eui.ArrayCollection( dsListHeros );

        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
        this.mylist.itemRenderer = RankListItemRenderer;
        this.nationBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        this.localBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);

        // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
    }
    public detroy():void
    {
         EventManager.removeEventListener(Events.CommonEvent.GET_RANK_SUCESS,this.renderData,this);

        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
      
        this.nationBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        this.localBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);

        // this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
        // this.removeEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
    }
    private initX:number = 0;
    private initY:number =0 ;
    private begin(e:egret.TouchEvent):void
    {
        this.initX = e.stageX;
        this.initY = e.stageY;
    }

    private end(e:egret.TouchEvent):void
    {
        // alert("滑动距离："+(e.stageX - this.initX));
        if((e.stageX - this.initX > 200 || e.stageX - this.initX < -200))
        {
            this.mylist.dataProvider = null;
             this.curType = this.curType == 1?2:1;
             this.changeRank();
        }
    }

    private onBack(e:egret.TouchEvent):void
    {
        ModuleManager.getInstance().destroyForInstance(this);
    }

    private changeRank():void
    {
        if(this.scroller)
        {
            this.scroller.stopAnimation();
        }
        if(this.mylist)
        {
            this.mylist.scrollV = 0;
        }
        if(this.curType == 1)
        {
            this.localBtn.currentState = "down";
            this.nationBtn.currentState = "up";

            this.touchChildren = this.touchEnabled = false;
                HttpCommand.getInstance().getRankList(this.curType);
        }
        else
        {
            this.localBtn.currentState = "up";
            this.nationBtn.currentState = "down";
            
            this.touchChildren = this.touchEnabled = false;
                HttpCommand.getInstance().getRankList( this.curType);
            
        }


    }

    private renderData(e:Events.CommonEvent = null)
    {
        this.touchChildren = this.touchEnabled = true;
        if(e)
        {
            if(parseInt(e.data) != this.curType)
            {
                return;
            }
        }
        var dsListHeros:Object[];
        if(this.curType == 1)
        {
            dsListHeros = RankData.getInstance().localSortList;
        }
        else
        {
            dsListHeros = RankData.getInstance().nationSortList;
        }

        this.mylist.dataProvider = new eui.ArrayCollection( dsListHeros );

        this.mylist.scrollV = 0;
    }
}

class RankListItemRenderer extends eui.ItemRenderer {
    private userPic:eui.Image;
    private order:eui.Label;
    private orderPic:eui.Image;
    private scoreTxt:eui.Label;
    public constructor(){
        super();
        this.skinName = "resource/eui_skins/RankListItem.exml";
    }
    protected createChildren():void {
        super.createChildren();
        this.scaleX = Layout.getInstance().scaleX;
    }
    protected dataChanged():void
    {
        super.dataChanged();
        this.data.userName =  utils.StringUtil.getChar(this.data.userName,3*6);
        if(this.itemIndex<3)
        {
            this.scoreTxt.textColor = 0xFF0000;
            this.currentState = "order";
            this.orderPic.source = RES.getRes( "order"+(this.itemIndex+1)+"_png" )
           
        }
        else{
             this.currentState = "nomorl";
            this.order.text = ""+(this.itemIndex+1);
             this.scoreTxt.textColor = 0x333333;
        }
        
        // 同一个域下可以请求
        if(this.data.userPic.indexOf("nophoto")==-1)
        {
            this.userPic.source = ""+this.data.userPic;
        }


        var circle:egret.Shape = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(this.userPic.x+this.userPic.width/2,
            this.userPic.y+this.userPic.height/2,this.userPic.height/2);
        circle.graphics.endFill();
        this.addChild(circle);
        this.userPic.mask = circle;

        // this.userPic.source = "http://game.hslmnews.com/resource/assets/player.png";
    }
}