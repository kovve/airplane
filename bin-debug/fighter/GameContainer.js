var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var fighter;
(function (fighter) {
    var BaseView = component.BaseView;
    /**
     * 主游戏容器
     */
    var GameContainer = (function (_super) {
        __extends(GameContainer, _super);
        function GameContainer() {
            var _this = _super.call(this) || this;
            /**我的子弹*/
            _this.myBullets = [];
            /**敌人的飞机*/
            _this.enemyFighters = [];
            /**触发创建敌机的间隔*/
            _this.enemyFightersTimer = new egret.Timer(1000);
            /**敌人的子弹*/
            _this.enemyBullets = [];
            /**我的成绩*/
            _this.$myScore = 0;
            /**创建敌机*/
            _this.timerCount = 0;
            _this.fullScreen = true;
            _this._lastTime = egret.getTimer();
            return _this;
            // this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }
        Object.defineProperty(GameContainer.prototype, "myScore", {
            get: function () {
                return this.$myScore;
            },
            set: function (value) {
                this.$myScore = value;
                if (this.scoreLab) {
                    this.scoreLab.text = "" + value;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**创建游戏场景*/
        GameContainer.prototype.show = function () {
            _super.prototype.show.call(this);
            this.stageW = Layout.getInstance().stage.stageWidth;
            this.stageH = Layout.getInstance().stage.stageHeight;
            //背景
            this.map = new fighter.BgMap(); //创建可滚动的背景
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
            this.myFighter = new fighter.Airplane(RES.getRes("f1_png"), 100, "f1_png");
            this.myFighter.y = this.stageH - this.myFighter.height - 50;
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
            EventManager.addEventListener(Events.CommonEvent.GAME_START, this.gameStart, this);
            if (GlobalData.isInAPP || GlobalData.isNotFirstLogin) {
                ModuleManager.getInstance().openModule("GameStartView");
            }
            else {
                GlobalData.isNotFirstLogin = true;
                ModuleManager.getInstance().openModule("GameRewardsView", { desc: GameConfig.noInAppNotic, titleUrl: "titleTips_png", showBtn: true });
            }
        };
        /**预创建一些对象，减少游戏时的创建消耗*/
        GameContainer.prototype.preCreatedInstance = function () {
            var i = 0;
            var objArr = [];
            for (i = 0; i < 20; i++) {
                var bullet = fighter.Bullet.produce("b1_png");
                objArr.push(bullet);
            }
            for (i = 0; i < 20; i++) {
                bullet = objArr.pop();
                fighter.Bullet.reclaim(bullet);
            }
            for (i = 0; i < 20; i++) {
                var bullet = fighter.Bullet.produce("b2_png");
                objArr.push(bullet);
            }
            for (i = 0; i < 20; i++) {
                bullet = objArr.pop();
                fighter.Bullet.reclaim(bullet);
            }
            for (i = 0; i < 20; i++) {
                var enemyFighter = fighter.Airplane.produce("f2_png", 1000);
                objArr.push(enemyFighter);
            }
            for (i = 0; i < 20; i++) {
                enemyFighter = objArr.pop();
                fighter.Airplane.reclaim(enemyFighter);
            }
        };
        /**游戏开始*/
        GameContainer.prototype.gameStart = function (e) {
            var _this = this;
            this.myScore = 0;
            this.timerCount = 0;
            // this.removeChild(this.btnStart);
            this.map.start();
            this.touchEnabled = true;
            this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
            this.myFighter.x = (this.stageW - this.myFighter.width) / 2;
            SoundManager.getIns().play("readygo_mp3");
            egret.setTimeout(function () {
                _this.myFighter.fire(); //开火
            }, this, 2000);
            this.myFighter.blood = GameConfig.myPlaneBlood;
            this.myFighter.addEventListener("createBullet", this.createBulletHandler, this);
            this.enemyFightersTimer.delay = 1000;
            this.enemyFightersTimer.addEventListener(egret.TimerEvent.TIMER, this.createEnemyFighter, this);
            this.enemyFightersTimer.start();
        };
        GameContainer.prototype.touchHandler = function (evt) {
            if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
                var tx = evt.localX;
                var ditance = tx - this.lastTx;
                this.lastTx = tx;
                // tx = Math.max(0,tx);
                // tx = Math.min(this.stageW-this.myFighter.width,tx);
                if (this.myFighter.x + ditance > (this.myFighter.width / 2 * -1) && this.myFighter.x + ditance < this.stageW - this.myFighter.width / 2) {
                    this.myFighter.x = this.myFighter.x + ditance;
                }
                else if (this.myFighter.x + ditance <= 0) {
                    this.myFighter.x = this.myFighter.width / 2 * -1;
                }
                else {
                    this.myFighter.x = this.stageW - this.myFighter.width / 2;
                }
            }
            else if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
                this.lastTx = evt.localX;
            }
        };
        /**创建子弹(包括我的子弹和敌机的子弹)*/
        GameContainer.prototype.createBulletHandler = function (evt) {
            var bullet;
            if (evt.target == this.myFighter) {
                for (var i = 0; i < 2; i++) {
                    bullet = fighter.Bullet.produce("b1_png");
                    bullet.x = i == 0 ? (this.myFighter.x + 30) : (this.myFighter.x + this.myFighter.width - 72);
                    bullet.y = this.myFighter.y - 50;
                    this.contentCon.addChildAt(bullet, this.numChildren - 1 - this.enemyFighters.length);
                    this.myBullets.push(bullet);
                }
            }
            else {
                var theFighter = evt.target;
                bullet = fighter.Bullet.produce("b2_png");
                bullet.x = theFighter.x + 28;
                bullet.y = theFighter.y + 10;
                this.contentCon.addChildAt(bullet, this.numChildren - 1 - this.enemyFighters.length);
                this.enemyBullets.push(bullet);
            }
        };
        GameContainer.prototype.createEnemyFighter = function (evt) {
            this.timerCount++;
            if (this.timerCount >= 20) {
                this.timerCount = 0;
                if (this.enemyFightersTimer.delay > 100) {
                    this.enemyFightersTimer.delay = this.enemyFightersTimer.delay - 100;
                    // console.log("this.enemyFightersTimer.delay:"+this.enemyFightersTimer.delay)
                }
            }
            this.realCreate();
        };
        GameContainer.prototype.realCreate = function () {
            var enemyFighter = fighter.Airplane.produce("f2_png", 1000);
            enemyFighter.x = Math.random() * (this.stageW - enemyFighter.width);
            enemyFighter.y = -enemyFighter.height - Math.random() * 300;
            enemyFighter.addEventListener("createBullet", this.createBulletHandler, this);
            enemyFighter.fire();
            this.contentCon.addChildAt(enemyFighter, this.numChildren - 1);
            this.enemyFighters.push(enemyFighter);
        };
        /**游戏画面更新*/
        GameContainer.prototype.gameViewUpdate = function (evt) {
            //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
            var nowTime = egret.getTimer();
            var fps = 1000 / (nowTime - this._lastTime);
            this._lastTime = nowTime;
            var speedOffset = 60 / fps;
            //我的子弹运动
            var i = 0;
            var bullet;
            var myBulletsCount = this.myBullets.length;
            for (; i < myBulletsCount; i++) {
                bullet = this.myBullets[i];
                if (bullet.y < -bullet.height) {
                    this.contentCon.removeChild(bullet);
                    fighter.Bullet.reclaim(bullet);
                    this.myBullets.splice(i, 1);
                    i--;
                    myBulletsCount--;
                }
                bullet.y -= GameConfig.myBulletSpeed * speedOffset;
            }
            //敌人飞机运动
            var theFighter;
            var enemyFighterCount = this.enemyFighters.length;
            for (i = 0; i < enemyFighterCount; i++) {
                theFighter = this.enemyFighters[i];
                if (theFighter.y > this.stage.stageHeight) {
                    this.contentCon.removeChild(theFighter);
                    fighter.Airplane.reclaim(theFighter);
                    theFighter.removeEventListener("createBullet", this.createBulletHandler, this);
                    theFighter.stopFire();
                    this.enemyFighters.splice(i, 1);
                    i--;
                    enemyFighterCount--;
                }
                theFighter.y += 4 * speedOffset;
            }
            //敌人子弹运动
            var enemyBulletsCount = this.enemyBullets.length;
            for (i = 0; i < enemyBulletsCount; i++) {
                bullet = this.enemyBullets[i];
                if (bullet.y > this.stage.stageHeight) {
                    this.contentCon.removeChild(bullet);
                    fighter.Bullet.reclaim(bullet);
                    this.enemyBullets.splice(i, 1);
                    i--;
                    enemyBulletsCount--; //数组长度已经改变
                }
                bullet.y += GameConfig.enemyBulletSpeed * speedOffset;
            }
            this.gameHitTest();
        };
        /**游戏碰撞检测*/
        GameContainer.prototype.gameHitTest = function () {
            var i, j;
            var bullet;
            var theFighter;
            var myBulletsCount = this.myBullets.length;
            var enemyFighterCount = this.enemyFighters.length;
            var enemyBulletsCount = this.enemyBullets.length;
            //将需消失的子弹和飞机记录
            var delBullets = [];
            var delFighters = [];
            //我的子弹可以消灭敌机
            for (i = 0; i < myBulletsCount; i++) {
                bullet = this.myBullets[i];
                for (j = 0; j < enemyFighterCount; j++) {
                    theFighter = this.enemyFighters[j];
                    if (utils.GameUtil.hitTest(theFighter, bullet)) {
                        theFighter.blood -= GameConfig.myBulletHurt;
                        if (delBullets.indexOf(bullet) == -1)
                            delBullets.push(bullet);
                        if (theFighter.blood <= 0 && delFighters.indexOf(theFighter) == -1) {
                            SoundManager.getIns().play("bomb_mp3");
                            delFighters.push(theFighter);
                        }
                    }
                }
            }
            //敌人的子弹可以减我血
            for (i = 0; i < enemyBulletsCount; i++) {
                bullet = this.enemyBullets[i];
                if (utils.GameUtil.hitTest(this.myFighter, bullet)) {
                    this.myFighter.blood -= GameConfig.enemyBulletHurt;
                    if (delBullets.indexOf(bullet) == -1)
                        delBullets.push(bullet);
                }
            }
            //敌机的撞击可以消灭我
            for (i = 0; i < enemyFighterCount; i++) {
                theFighter = this.enemyFighters[i];
                if (utils.GameUtil.hitTest(this.myFighter, theFighter)) {
                    this.myFighter.blood -= GameConfig.hitHurt;
                }
            }
            if (this.myFighter.blood <= 0) {
                this.gameStop();
            }
            else {
                while (delBullets.length > 0) {
                    bullet = delBullets.pop();
                    this.contentCon.removeChild(bullet);
                    if (bullet.textureName == "b1_png")
                        this.myBullets.splice(this.myBullets.indexOf(bullet), 1);
                    else
                        this.enemyBullets.splice(this.enemyBullets.indexOf(bullet), 1);
                    fighter.Bullet.reclaim(bullet);
                }
                this.myScore += delFighters.length;
                while (delFighters.length > 0) {
                    theFighter = delFighters.pop();
                    theFighter.stopFire();
                    theFighter.removeEventListener("createBullet", this.createBulletHandler, this);
                    this.contentCon.removeChild(theFighter);
                    this.enemyFighters.splice(this.enemyFighters.indexOf(theFighter), 1);
                    fighter.Airplane.reclaim(theFighter);
                }
            }
        };
        /**游戏结束*/
        GameContainer.prototype.gameStop = function () {
            // this.addChild(this.btnStart);
            this.map.pause();
            this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
            this.myFighter.stopFire();
            this.myFighter.removeEventListener("createBullet", this.createBulletHandler, this);
            this.enemyFightersTimer.removeEventListener(egret.TimerEvent.TIMER, this.createEnemyFighter, this);
            this.enemyFightersTimer.stop();
            //清理子弹
            var i = 0;
            var bullet;
            while (this.myBullets.length > 0) {
                bullet = this.myBullets.pop();
                this.contentCon.removeChild(bullet);
                fighter.Bullet.reclaim(bullet);
            }
            while (this.enemyBullets.length > 0) {
                bullet = this.enemyBullets.pop();
                this.contentCon.removeChild(bullet);
                fighter.Bullet.reclaim(bullet);
            }
            //清理飞机
            var theFighter;
            while (this.enemyFighters.length > 0) {
                theFighter = this.enemyFighters.pop();
                theFighter.stopFire();
                theFighter.removeEventListener("createBullet", this.createBulletHandler, this);
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
        };
        return GameContainer;
    }(BaseView));
    fighter.GameContainer = GameContainer;
    __reflect(GameContainer.prototype, "fighter.GameContainer");
})(fighter || (fighter = {}));
