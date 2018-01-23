var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by shaorui on 14-6-6.
 */
var utils;
(function (utils) {
    var GameUtil = (function () {
        function GameUtil() {
        }
        /**基于矩形的碰撞检测*/
        GameUtil.hitTest = function (obj1, obj2) {
            var rect1;
            var rect2;
            var per = 1;
            if (obj1 instanceof fighter.Bullet) {
                per = 1;
            }
            else {
                per = 0.6;
            }
            rect1 = GameUtil.createSelfBound(obj1, per);
            if (obj2 instanceof fighter.Airplane) {
                per = 0.6;
            }
            else {
                per = 1;
            }
            rect2 = GameUtil.createSelfBound(obj2, per);
            return rect1.intersects(rect2);
        };
        /*
        * 生成obj对应的矩形 per为生成矩形相对于原来的比值
        * */
        GameUtil.createSelfBound = function (obj, per) {
            if (per === void 0) { per = 1; }
            var w = obj.width * per;
            var h = obj.height * per;
            var x = (obj.width - obj.width * per) / 2 + obj.x;
            var y = (obj.height - obj.height * per) / 2 + obj.y;
            return new egret.Rectangle(x, y, w, h);
        };
        return GameUtil;
    }());
    utils.GameUtil = GameUtil;
    __reflect(GameUtil.prototype, "utils.GameUtil");
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    utils.createBitmapByName = createBitmapByName;
})(utils || (utils = {}));
