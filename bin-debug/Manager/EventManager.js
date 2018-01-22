var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var Manager;
(function (Manager) {
    var EventManager = (function () {
        function EventManager() {
        }
        EventManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new egret.EventDispatcher();
            }
            return this.instance;
        };
        EventManager.addEventListener = function (type, listener, thisobject, usecapture, priority) {
            if (usecapture === void 0) { usecapture = false; }
            if (priority === void 0) { priority = 1; }
            this.getInstance().addEventListener(type, listener, thisobject, usecapture, priority);
        };
        EventManager.removeEventListener = function (type, listener, thisObject, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            this.getInstance().removeEventListener(type, listener, thisObject, useCapture);
        };
        EventManager.dispatchEvent = function (event) {
            this.getInstance().dispatchEvent(event);
        };
        return EventManager;
    }());
    Manager.EventManager = EventManager;
    __reflect(EventManager.prototype, "Manager.EventManager");
})(Manager || (Manager = {}));
