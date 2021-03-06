/**
 *
 * @author
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    var ViewUtil = (function () {
        function ViewUtil() {
        }
        ViewUtil.setCenter = function (view) {
            view.x = (Layout.getInstance().stage.stageWidth - view.width) / 2;
            view.y = (Layout.getInstance().stage.stageHeight - view.height) / 2;
        };
        ViewUtil.getShape = function (width, height, color, alpha) {
            if (width === void 0) { width = 640; }
            if (height === void 0) { height = 960; }
            if (color === void 0) { color = 0x000000; }
            if (alpha === void 0) { alpha = 0.7; }
            var sp = new egret.Sprite();
            var shp = new egret.Shape();
            shp.graphics.beginFill(color, alpha);
            shp.graphics.drawRect(0, 0, width, height);
            shp.graphics.endFill();
            shp.touchEnabled = false;
            sp.addChild(shp);
            return sp;
        };
        ViewUtil.getArtNum = function (art_src, src) {
            var con = new egret.Sprite();
            var i = 0;
            while (i < src.length) {
                var texture = RES.getRes(art_src + src.charAt(i));
                var bmp = new egret.Bitmap(texture);
                bmp.x = con.width + 1;
                bmp.y = -texture.textureHeight / 2;
                con.addChild(bmp);
            }
            return con;
        };
        /**检测碰撞*/
        ViewUtil.hitTest = function (obj1, obj2) {
            var rect1 = obj1.getBounds();
            var rect2 = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        };
        return ViewUtil;
    }());
    utils.ViewUtil = ViewUtil;
    __reflect(ViewUtil.prototype, "utils.ViewUtil");
})(utils || (utils = {}));
