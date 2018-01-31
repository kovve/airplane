/**
 *
 * @author
 *
 */
module Manager 
{

   export class EventManager {

        public constructor() {

        }
        private static instance: egret.EventDispatcher;
        public static getInstance(): egret.EventDispatcher {
            if (this.instance == null) {
                this.instance = new egret.EventDispatcher();
            }
            return this.instance;

        }

        public static  addEventListener(type:string, listener:Function, thisobject:any,usecapture:boolean = false,priority:number = 1):void
        {
            this.getInstance().addEventListener(type, listener, thisobject, usecapture,priority);
        }

        public static removeEventListener(type:string, listener:Function, thisObject:any,useCapture:boolean = false):void
        {
            this.getInstance().removeEventListener(type, listener,thisObject,useCapture);
        }

        public static dispatchEvent(event:egret.Event):void
        {
            this.getInstance().dispatchEvent(event);
        }
    }
}