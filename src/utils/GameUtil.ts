/**
 * Created by shaorui on 14-6-6.
 */
module utils
{
    export class GameUtil
    {
        /**基于矩形的碰撞检测*/
        public static hitTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject):boolean
        {
            var rect1:egret.Rectangle;
            var rect2:egret.Rectangle;
            var per:number = 1;

            if(obj1 instanceof fighter.Bullet)
            {
                per = 1;
            }
            else
            {
                per = 0.6;
            }
            rect1 = GameUtil.createSelfBound(obj1,per);
            if(obj2 instanceof fighter.Airplane)
            {
                per = 0.6;
            }
            else
            {
                per = 1;
            }
            rect2 = GameUtil.createSelfBound(obj2,per);

            return rect1.intersects(rect2);
        }
        /*
        * 生成obj对应的矩形 per为生成矩形相对于原来的比值
        * */
        public static createSelfBound(obj:egret.DisplayObject,per:number = 1):egret.Rectangle
        {
            let w:number = obj.width*per;
            let h:number = obj.height*per;
            let x:number = (obj.width - obj.width*per)/2+obj.x;
            let y:number = (obj.height - obj.height*per)/2+obj.y;
            return new egret.Rectangle(x,y,w,h);
        }
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    export function createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}