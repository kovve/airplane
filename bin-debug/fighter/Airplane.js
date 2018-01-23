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
/**
 * Created by shaorui on 14-6-7.
 */
var fighter;
(function (fighter) {
    /**
     * 飞机，利用对象池
     */
    var Airplane = (function (_super) {
        __extends(Airplane, _super);
        function Airplane(texture, fireDelay, textureName) {
            var _this = _super.call(this) || this;
            /**飞机生命值*/
            _this._blo = 10;
            _this.fireDelay = fireDelay;
            _this.bmp = new egret.Bitmap(texture);
            _this.textureName = textureName;
            _this.addChild(_this.bmp);
            //测试代码
            /*var sp:egret.Sprite = new egret.Sprite();
            sp.graphics.beginFill(0,0.5);
            var rect = utils.GameUtil.createSelfBound(this,0.6);
            sp.graphics.drawRect(rect.x,rect.y,rect.width,rect.height);
            sp.graphics.endFill();
            this.addChild(sp);*/
            _this.addBloodProcess();
            _this.fireTimer = new egret.Timer(fireDelay);
            _this.fireTimer.addEventListener(egret.TimerEvent.TIMER, _this.createBullet, _this);
            return _this;
        }
        /**
        /**生产*/
        Airplane.produce = function (textureName, fireDelay) {
            if (fighter.Airplane.cacheDict[textureName] == null)
                fighter.Airplane.cacheDict[textureName] = [];
            var dict = fighter.Airplane.cacheDict[textureName];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new fighter.Airplane(RES.getRes(textureName), fireDelay, textureName);
            }
            theFighter.blood = 10;
            return theFighter;
        };
        /**回收*/
        Airplane.reclaim = function (theFighter) {
            var textureName = theFighter.textureName;
            if (fighter.Airplane.cacheDict[textureName] == null)
                fighter.Airplane.cacheDict[textureName] = [];
            var dict = fighter.Airplane.cacheDict[textureName];
            if (dict.indexOf(theFighter) == -1)
                dict.push(theFighter);
        };
        Object.defineProperty(Airplane.prototype, "blood", {
            get: function () {
                return this._blo;
            },
            set: function (value) {
                this.myPro.value = value;
                this._blo = value;
            },
            enumerable: true,
            configurable: true
        });
        Airplane.prototype.addBloodProcess = function () {
            this.myPro = new eui.ProgressBar();
            this.myPro.skinName = "resource/eui_skins/bloodProcess.exml";
            this.myPro.minimum = 0;
            this.myPro.maximum = this._blo;
            this.myPro.width = this.bmp.width * 0.7; //
            this.myPro.x = (this.bmp.width - this.myPro.width) / 2;
            this.myPro.y = this.textureName == "f2_png" ? this.bmp.y - this.myPro.height :
                this.bmp.y + this.bmp.height;
            this.addChild(this.myPro);
        };
        /**开火*/
        Airplane.prototype.fire = function () {
            this.fireTimer.start();
        };
        /**停火*/
        Airplane.prototype.stopFire = function () {
            this.fireTimer.stop();
        };
        /**创建子弹*/
        Airplane.prototype.createBullet = function (evt) {
            this.dispatchEventWith("createBullet");
        };
        Airplane.cacheDict = {};
        return Airplane;
    }(egret.DisplayObjectContainer));
    fighter.Airplane = Airplane;
    __reflect(Airplane.prototype, "fighter.Airplane");
})(fighter || (fighter = {}));
