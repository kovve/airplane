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
var Events;
(function (Events) {
    var CommonEvent = (function (_super) {
        __extends(CommonEvent, _super);
        function CommonEvent(type, data, bubbles, cancelable) {
            if (data === void 0) { data = null; }
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            var _this = _super.call(this, type, bubbles, cancelable) || this;
            _this.data = null;
            _this.data = data;
            return _this;
        }
        /*获取信息成功*/
        CommonEvent.GET_INFO_SUCESS = "GET_INFO_SUCESS";
        /*获取排行榜成功*/
        CommonEvent.GET_RANK_SUCESS = "GET_RANK_SUCESS";
        /*上报分数成功*/
        CommonEvent.UP_SOCRE_SUCESS = "UP_SOCRE_SUCESS";
        /*获取分数成功*/
        CommonEvent.GET_USERRANK_SUCESS = "GET_USERRANK_SUCESS";
        return CommonEvent;
    }(egret.Event));
    Events.CommonEvent = CommonEvent;
    __reflect(CommonEvent.prototype, "Events.CommonEvent");
})(Events || (Events = {}));
