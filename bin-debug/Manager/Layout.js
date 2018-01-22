var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Manager;
(function (Manager) {
    /**
    *布局类
    ** **/
    var Layout = (function () {
        function Layout() {
            this._scaleY = 1;
            this._scaleX = 1;
        }
        Layout.getInstance = function () {
            if (this.instance == null) {
                this.instance = new Layout();
            }
            return this.instance;
        };
        Layout.prototype.init = function (_stage) {
            this.Mstage = _stage;
            if (!egret.Capabilities.isMobile) {
                this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
                return;
            }
            // this.Mstage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            // this.Mstage.scaleMode = egret.Capabilities.isMobile?
            // egret.StageScaleMode.SHOW_ALL:egret.StageScaleMode.SHOW_ALL;
            console.log("当前渲染模式：" + egret.Capabilities.renderMode);
            console.log("边界" + egret.Capabilities.boundingClientWidth + "*" + egret.Capabilities.boundingClientHeight);
            // console.log(""+window.screen.width+"*"+ window.screen.height);
            var screenW = egret.Capabilities.boundingClientWidth;
            var screenH = egret.Capabilities.boundingClientHeight;
            var r = screenW / screenH; //700/1280
            var designW = 720;
            var designH = 1280;
            if (r < designW / designH) {
                this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            }
            else {
                this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            }
            this._scaleX = this.stage.stageWidth / designW;
            this._scaleY = this.stage.stageHeight / designH;
            console.log("stageWidth" + this.stage.stageWidth + ";stageHeight" + this.stage.stageHeight);
            console.log("scaleX:" + this._scaleX + ";scaleY:" + this._scaleY);
        };
        Object.defineProperty(Layout.prototype, "stage", {
            get: function () {
                return this.Mstage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layout.prototype, "scaleX", {
            get: function () {
                return this._scaleX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layout.prototype, "scaleY", {
            get: function () {
                return this._scaleY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layout.prototype, "scale", {
            get: function () {
                return this._scaleX < this._scaleY ? this._scaleX : this._scaleY;
            },
            enumerable: true,
            configurable: true
        });
        Layout.firstLevel = 0;
        Layout.secondLevel = 1;
        Layout.thirdLevel = 2;
        return Layout;
    }());
    Manager.Layout = Layout;
    __reflect(Layout.prototype, "Manager.Layout");
})(Manager || (Manager = {}));
