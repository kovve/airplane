module fighter
{
    import BaseView = component.BaseView;

    /**
     * 主游戏容器
     */
    export class GameContainer extends BaseView
    {
        /**@private*/
        private stageW:number;
        /**@private*/
        private stageH:number;
        /**开始按钮*/
        private btnStart;
        /**可滚动背景*/
        private map:fighter.BgMap;
        /**我的飞机*/
        private myFighter:fighter.Airplane;
        /**我的子弹*/
        private myBullets:fighter.Bullet[] = [];
        /**敌人的飞机*/
        private enemyFighters:fighter.Airplane[] = [];
        /**触发创建敌机的间隔*/
        private enemyFightersTimer:egret.Timer = new egret.Timer(1000);
        /**敌人的子弹*/
        private enemyBullets:fighter.Bullet[] = [];
        /**成绩显示*/
        private scorePanel:fighter.ScorePanel;
        /**我的成绩*/
        private $myScore:number = 0;

        /**@private*/
        private _lastTime:number;

        private contentCon:egret.Sprite;

        private scoreImg:eui.Image;
        private scoreLab:eui.Label;

        public constructor() {

            super();
            this.fullScreen = true;
            this._lastTime = egret.getTimer();
            // this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }

        private get myScore():number
        {
            return this.$myScore;
        }
        private set myScore(value:number)
        {
            this.$myScore = value;
            if(this.scoreLab)
            {
                this.scoreLab.text = ""+value;
            }
        }

        /**创建游戏场景*/
        public show():void{
            super.show();
            this.stageW = Layout.getInstance().stage.stageWidth;
            this.stageH = Layout.getInstance().stage.stageHeight;
            //背景
            this.map = new fighter.BgMap();//创建可滚动的背景
            this.addChild(this.map);

            this.contentCon = new egret.Sprite();
            this.addChild(this.contentCon);
            //开始按钮
            //开始按钮
            // this.btnStart =utils.createBitmapByName("btn_start_png");//开始按钮
            // this.btnStart.x = (this.stageW - this.btnStart.width) / 2;//居中定位
            // this.btnStart.y = (this.stageH - this.btnStart.height) / 2;//居中定位
            // this.btnStart.touchEnabled = true;//开启触碰
            // this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gameStart,this);//点击按钮开始游戏
            // this.addChild(this.btnStart);
            //我的飞机
            this.myFighter = new fighter.Airplane(RES.getRes("f1_png"),100,"f1_png");
            this.myFighter.y = this.stageH-this.myFighter.height-50;
            this.contentCon.addChild(this.myFighter);

            this.scoreImg = new eui.Image();
            this.scoreImg.source = "curSorce_png";

            this.scoreImg.x = 40;
            this.scoreImg.y = 60;
            this.addChild(this.scoreImg);

            this.scoreLab = new eui.Label();
            this.scoreLab.x = this.scoreImg.x + this.scoreImg.width + 30;
            this.scoreLab.y = 60;
            this.scoreLab.size = 50;
            // this.scoreLab.text = ""+100;
            this.addChild(this.scoreLab);


            //预创建
            this.preCreatedInstance();
            EventManager.addEventListener(Events.CommonEvent.GAME_START,this.gameStart,this);


            if(GlobalData.isInAPP || GlobalData.isNotFirstLogin)
            {
                ModuleManager.getInstance().openModule("GameStartView");
            }
            else
            {
                GlobalData.isNotFirstLogin = true;
                ModuleManager.getInstance().openModule("GameRewardsView",
                    {desc:GameConfig.noInAppNotic,titleUrl:"titleTips_png",showBtn:true});
            }

        }
        /**预创建一些对象，减少游戏时的创建消耗*/
        private preCreatedInstance():void {
            var i:number = 0;
            var objArr:any[] = [];
            for(i=0;i<20;i++) {
                var bullet = fighter.Bullet.produce("b1_png");
                objArr.push(bullet);
            }
            for(i=0;i<20;i++) {
                bullet = objArr.pop();
                fighter.Bullet.reclaim(bullet);
            }
            for(i=0;i<20;i++) {
                var bullet = fighter.Bullet.produce("b2_png");
                objArr.push(bullet);
            }
            for(i=0;i<20;i++) {
                bullet = objArr.pop();
                fighter.Bullet.reclaim(bullet);
            }
            for(i=0;i<20;i++) {
                var enemyFighter:fighter.Airplane = fighter.Airplane.produce("f2_png",1000);
                objArr.push(enemyFighter);
            }
            for(i=0;i<20;i++) {
                enemyFighter = objArr.pop();
                fighter.Airplane.reclaim(enemyFighter);
            }
        }
        /**游戏开始*/
        private gameStart(e:Events.CommonEvent):void{
            this.myScore = 0;
            this.timerCount = 0;
            // this.removeChild(this.btnStart);
            this.map.start();
            this.touchEnabled=true;
            this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandler,this);
            this.myFighter.x = (this.stageW-this.myFighter.width)/2;
            SoundManager.getIns().play("readygo_mp3");
            egret.setTimeout(():void=>
                {
                    this.myFighter.fire();//开火
                },this,2000);

            this.myFighter.blood = GameConfig.myPlaneBlood;
            this.myFighter.addEventListener("createBullet",this.createBulletHandler,this);
            this.enemyFightersTimer.delay = 1000;
            this.enemyFightersTimer.addEventListener(egret.TimerEvent.TIMER,this.createEnemyFighter,this);
            this.enemyFightersTimer.start();

        }
        /**响应Touch*/
        private lastTx:number ;
        private touchHandler(evt:egret.TouchEvent):void{
            if(evt.type==egret.TouchEvent.TOUCH_MOVE)
            {
                var tx:number = evt.localX;

                var ditance:number = tx - this.lastTx;

                this.lastTx = tx;

                // tx = Math.max(0,tx);
                // tx = Math.min(this.stageW-this.myFighter.width,tx);
                if(this.myFighter.x+ditance>(this.myFighter.width/2*-1) && this.myFighter.x+ditance<this.stageW-this.myFighter.width/2)
                {
                    this.myFighter.x = this.myFighter.x+ditance;
                }
                else if(this.myFighter.x+ditance<=0)
                {
                    this.myFighter.x = this.myFighter.width/2*-1;
                }
                else
                {
                    this.myFighter.x = this.stageW-this.myFighter.width/2;
                }

            }
            else if(evt.type==egret.TouchEvent.TOUCH_BEGIN)
            {
                this.lastTx = evt.localX;
            }
        }
        /**创建子弹(包括我的子弹和敌机的子弹)*/
        private createBulletHandler(evt:egret.Event):void{
            var bullet:fighter.Bullet;
            if(evt.target==this.myFighter) {
                for(var i:number=0;i<2;i++) {
                    bullet = fighter.Bullet.produce("b1_png");
                    bullet.x = i==0?(this.myFighter.x+30):(this.myFighter.x+this.myFighter.width-72);
                    bullet.y = this.myFighter.y-50;
                    this.contentCon.addChildAt(bullet,this.numChildren-1-this.enemyFighters.length);
                    this.myBullets.push(bullet);
                }
            } else {
                var theFighter:fighter.Airplane = evt.target;
                bullet = fighter.Bullet.produce("b2_png");
                bullet.x = theFighter.x+28;
                bullet.y = theFighter.y+10;
                this.contentCon.addChildAt(bullet,this.numChildren-1-this.enemyFighters.length);
                this.enemyBullets.push(bullet);
            }
        }
        /**创建敌机*/
        private timerCount = 0;
        private createEnemyFighter(evt:egret.TimerEvent):void{
            this.timerCount++;
            if(this.timerCount>=20)
            {
                this.timerCount = 0;
                if(this.enemyFightersTimer.delay>100)
                {
                    this.enemyFightersTimer.delay = this.enemyFightersTimer.delay- 100;
                    // console.log("this.enemyFightersTimer.delay:"+this.enemyFightersTimer.delay)
                }

            }
            this.realCreate();

        }
        private realCreate():void
        {
            var enemyFighter:fighter.Airplane = fighter.Airplane.produce("f2_png",1000);
            enemyFighter.x = Math.random()*(this.stageW-enemyFighter.width);
            enemyFighter.y = -enemyFighter.height-Math.random()*300;
            enemyFighter.addEventListener("createBullet",this.createBulletHandler,this);
            enemyFighter.fire();
            this.contentCon.addChildAt(enemyFighter,this.numChildren-1);
            this.enemyFighters.push(enemyFighter);
        }
        /**游戏画面更新*/
        private gameViewUpdate(evt:egret.Event):void{
            //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
            var nowTime:number = egret.getTimer();
            var fps:number = 1000/(nowTime-this._lastTime);
            this._lastTime = nowTime;
            var speedOffset:number = 60/fps;
            //我的子弹运动
            var i:number = 0;
            var bullet:fighter.Bullet;
            var myBulletsCount:number = this.myBullets.length;
            for(;i < myBulletsCount;i++){
                bullet = this.myBullets[i];
                if(bullet.y < -bullet.height){
                    this.contentCon.removeChild(bullet);
                    Bullet.reclaim(bullet);
                    this.myBullets.splice(i,1);
                    i--;
                    myBulletsCount--;
                }
                bullet.y -= GameConfig.myBulletSpeed * speedOffset;
                  
            }
            //敌人飞机运动
            var theFighter:fighter.Airplane;
            var enemyFighterCount:number = this.enemyFighters.length;
              for(i = 0;i < enemyFighterCount;i++){
                theFighter = this.enemyFighters[i];
                if(theFighter.y>this.stage.stageHeight){
                    this.contentCon.removeChild(theFighter);
                    Airplane.reclaim(theFighter);
                    theFighter.removeEventListener("createBullet",this.createBulletHandler,this);
                    theFighter.stopFire();
                    this.enemyFighters.splice(i,1);
                    i--;
                    enemyFighterCount--;
                }
                theFighter.y += 4 * speedOffset;
                
            }
            //敌人子弹运动
            var enemyBulletsCount:number = this.enemyBullets.length;
           for(i = 0;i < enemyBulletsCount;i++){
                bullet = this.enemyBullets[i];
                 if(bullet.y>this.stage.stageHeight){
                    this.contentCon.removeChild(bullet);
                    Bullet.reclaim(bullet);
                    this.enemyBullets.splice(i,1);
                    i--;
                    enemyBulletsCount--;//数组长度已经改变
                }
                
                bullet.y += GameConfig.enemyBulletSpeed * speedOffset;
               
            }
            this.gameHitTest();
        }
        /**游戏碰撞检测*/
        private gameHitTest():void {
            var i:number,j:number;
            var bullet:fighter.Bullet;
            var theFighter:fighter.Airplane;
            var myBulletsCount:number = this.myBullets.length;
            var enemyFighterCount:number = this.enemyFighters.length;
            var enemyBulletsCount:number = this.enemyBullets.length;
            //将需消失的子弹和飞机记录
            var delBullets:fighter.Bullet[] = [];
            var delFighters:fighter.Airplane[] = [];
            //我的子弹可以消灭敌机
            for(i=0;i<myBulletsCount;i++) {
                bullet = this.myBullets[i];
                for(j=0;j<enemyFighterCount;j++) {
                    theFighter = this.enemyFighters[j];
                    if(utils.GameUtil.hitTest(theFighter,bullet)) {
                        theFighter.blood -= GameConfig.myBulletHurt;
                        if(delBullets.indexOf(bullet)==-1)
                            delBullets.push(bullet);
                        if(theFighter.blood<=0 && delFighters.indexOf(theFighter)==-1)
                        {
                            SoundManager.getIns().play("bomb_mp3");
                            delFighters.push(theFighter);
                        }

                    }
                }
            }
            //敌人的子弹可以减我血
            for(i=0;i<enemyBulletsCount;i++) {
                bullet = this.enemyBullets[i];
                if(utils.GameUtil.hitTest(this.myFighter,bullet)) {
                    this.myFighter.blood -= GameConfig.enemyBulletHurt;
                    if(delBullets.indexOf(bullet)==-1)
                        delBullets.push(bullet);
                }
            }
            //敌机的撞击可以消灭我
            for(i=0;i<enemyFighterCount;i++) {
                theFighter = this.enemyFighters[i];
                if(utils.GameUtil.hitTest(this.myFighter,theFighter)) {
                    this.myFighter.blood -= GameConfig.hitHurt;
                }
            }
            if(this.myFighter.blood<=0) {
                this.gameStop();
            } else {
                while(delBullets.length>0) {
                    bullet = delBullets.pop();
                    this.contentCon.removeChild(bullet);
                    if(bullet.textureName=="b1_png")
                        this.myBullets.splice(this.myBullets.indexOf(bullet),1);
                    else
                        this.enemyBullets.splice(this.enemyBullets.indexOf(bullet),1);
                    fighter.Bullet.reclaim(bullet);
                }
                this.myScore += delFighters.length;
                while(delFighters.length>0) {
                    theFighter = delFighters.pop();
                    theFighter.stopFire();
                    theFighter.removeEventListener("createBullet",this.createBulletHandler,this);
                    this.contentCon.removeChild(theFighter);
                    this.enemyFighters.splice(this.enemyFighters.indexOf(theFighter),1);
                    fighter.Airplane.reclaim(theFighter);
                }
            }
        }
        /**游戏结束*/
        private gameStop():void{
            // this.addChild(this.btnStart);

            this.map.pause();
            this.removeEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
            this.myFighter.stopFire();
            this.myFighter.removeEventListener("createBullet",this.createBulletHandler,this);
            this.enemyFightersTimer.removeEventListener(egret.TimerEvent.TIMER,this.createEnemyFighter,this);
            this.enemyFightersTimer.stop();
            //清理子弹
            var i:number = 0;
            var bullet:fighter.Bullet;
            while(this.myBullets.length>0) {
                bullet = this.myBullets.pop();
                this.contentCon.removeChild(bullet);
                fighter.Bullet.reclaim(bullet);
            }
            while(this.enemyBullets.length>0) {
                bullet = this.enemyBullets.pop();
                this.contentCon.removeChild(bullet);
                fighter.Bullet.reclaim(bullet);
            }
            //清理飞机
            var theFighter:fighter.Airplane;
            while(this.enemyFighters.length>0) {
                theFighter = this.enemyFighters.pop();
                theFighter.stopFire();
                theFighter.removeEventListener("createBullet",this.createBulletHandler,this);
                this.contentCon.removeChild(theFighter);
                fighter.Airplane.reclaim(theFighter);
            }
            //显示成绩
            // this.scorePanel.showScore(this.myScore);
            // this.scorePanel.x = (this.stageW-this.scorePanel.width)/2;
            // this.scorePanel.y = 100;
            // this.addChild(this.scorePanel);
            SoundManager.getIns().play("gameover_mp3");
            GlobalData.score = this.myScore;
            ModuleManager.getInstance().openModule("GameEndView");
        }
    }
}
