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
var component;
(function (component) {
    var Layout = Manager.Layout;
    var UIManager = Manager.UIManager;
    var ModuleManager = Manager.ModuleManager;
    var ViewUtil = utils.ViewUtil;
    var BaseView = (function (_super) {
        __extends(BaseView, _super);
        /**
         *
         * 面板基类
         * */
        function BaseView() {
            var _this = _super.call(this) || this;
            _this.addBlackBg = true;
            _this.fullScreen = false;
            _this.verticalCenter = _this.horizontalCenter = 0;
            return _this;
        }
        BaseView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /*添加到舞台初始化数据*/
        BaseView.prototype.init = function (data) {
            if (data === void 0) { data = null; }
        };
        BaseView.prototype.show = function () {
            if (this.addBlackBg) {
                this.addBg();
            }
            if (this.fullScreen) {
                this.width = Layout.getInstance().stage.stageWidth;
                this.height = Layout.getInstance().stage.stageHeight;
            }
            // this.x = (Layout.getInstance().stage.stageWidth - this.width)>>2;
            // this.y = (Layout.getInstance().stage.stageHeight - this.height)>>2;
            UIManager.getInstance().appLevel.addChild(this);
        };
        BaseView.prototype.addBg = function () {
            this.bg = ViewUtil.getShape(Layout.getInstance().stage.stageWidth, Layout.getInstance().stage.stageHeight, 0x000000, 0.5);
            UIManager.getInstance().appLevel.addChild(this.bg);
            this.bg.touchEnabled = true;
        };
        BaseView.prototype.hide = function () {
            ModuleManager.getInstance().destroyForInstance(this);
        };
        BaseView.prototype.dispose = function () {
            UIManager.getInstance().appLevel.removeChild(this);
            if (this.bg && this.bg.parent) {
                this.bg.parent.removeChild(this.bg);
            }
            this.bg = null;
        };
        return BaseView;
    }(eui.Component));
    component.BaseView = BaseView;
    __reflect(BaseView.prototype, "component.BaseView");
})(component || (component = {}));
