/**
 * Created by shaorui on 14-6-7.
 */
module fighter
{
    /**
     * 飞机，利用对象池
     */
    export class Airplane extends egret.DisplayObjectContainer
    {
        private static cacheDict:Object = {};
		/**
        /**生产*/
        public static produce(textureName:string,fireDelay:number):fighter.Airplane
        {	
            if(fighter.Airplane.cacheDict[textureName]==null)
                fighter.Airplane.cacheDict[textureName] = [];
            var dict:fighter.Airplane[] = fighter.Airplane.cacheDict[textureName];
            var theFighter:fighter.Airplane;
            if(dict.length>0) {
                theFighter = dict.pop();
            } else {
                theFighter = new fighter.Airplane(RES.getRes(textureName),fireDelay,textureName);
            }
            theFighter.blood = textureName == "f2_png"?GameConfig.enmeyPanelBlood:GameConfig.myPlaneBlood;
            return theFighter;
        }
        /**回收*/
        public static reclaim(theFighter:fighter.Airplane):void
        {
			var textureName: string = theFighter.textureName;
            if(fighter.Airplane.cacheDict[textureName]==null)
                fighter.Airplane.cacheDict[textureName] = [];
            var dict:fighter.Airplane[] = fighter.Airplane.cacheDict[textureName];
            if(dict.indexOf(theFighter)==-1)
                dict.push(theFighter);
        }

        /**飞机位图*/
        private bmp:egret.Bitmap;
        /**创建子弹的时间间隔*/
        private fireDelay:number;
        /**定时射*/
        private fireTimer:egret.Timer;
        /**飞机生命值*/
        private _blo:number;

        private _dragDisplay:dragonBones.EgretArmatureDisplay;

        public set blood(value:number)
        {
            this.myPro.value= value;
            this._blo = value;
        }
        public get blood():number
        {
            return this._blo;
        }
		//可视为飞机类型名
		public textureName:string;
        public constructor(texture:egret.Texture,fireDelay:number,textureName:string) {
            super();
            this.fireDelay = fireDelay;
            this.textureName = textureName;
            if(textureName == "f2_png")
            {
                this.bmp = new egret.Bitmap(texture);

                this.addChild(this.bmp);
            }
            else
            {
                this._dragDisplay = DrangonBoneUtil.createIdelDrangonBone("F_zhanshen20");
                this._dragDisplay.anchorOffsetX = this._dragDisplay.width/2*-1;
                this._dragDisplay.anchorOffsetY = this._dragDisplay.height/2*-1;
                this.addChild(this._dragDisplay);
            }

            //测试代码
           /* var sp:egret.Sprite = new egret.Sprite();
            sp.graphics.beginFill(0,0.5);
            var rect = utils.GameUtil.createSelfBound(this,0.6);
            sp.graphics.drawRect(rect.x,rect.y,rect.width,rect.height);
            sp.graphics.endFill();
            this.addChild(sp);*/


            this.addBloodProcess();
            this.fireTimer = new egret.Timer(fireDelay);
            this.fireTimer.addEventListener(egret.TimerEvent.TIMER,this.createBullet,this);


        }
        private myPro:eui.ProgressBar;
        private addBloodProcess():void
        {
            this.myPro = new eui.ProgressBar();
            this.myPro.skinName = "resource/eui_skins/bloodProcess.exml";
            this.myPro.minimum = 0;
            this.myPro.maximum = this.textureName == "f2_png"?GameConfig.enmeyPanelBlood:GameConfig.myPlaneBlood;
            this.myPro.width = this.width*0.7;//

            this.myPro.x = (this.width - this.myPro.width)/2;

            this.myPro.y = this.textureName == "f2_png"?this.bmp.y -this.myPro.height:
                this._dragDisplay.y +this._dragDisplay.height;
            this.addChild(this.myPro)

        }
        /**开火*/
        public fire():void {
            this.fireTimer.start();
        }
        /**停火*/
        public stopFire():void {
            this.fireTimer.stop();
        }
        /**创建子弹*/
        private createBullet(evt:egret.TimerEvent):void {
            this.dispatchEventWith("createBullet");
        }
    }
}