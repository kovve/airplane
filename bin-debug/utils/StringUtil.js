var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    var StringUtil = (function () {
        function StringUtil() {
        }
        StringUtil.getChar = function (_str, _len) {
            var _ba = new egret.ByteArray;
            _ba.writeUTFBytes(_str);
            if (_ba.length <= _len)
                return _str;
            _ba.position = 0;
            return _ba.readUTFBytes(_len) + "...";
        };
        return StringUtil;
    }());
    utils.StringUtil = StringUtil;
    __reflect(StringUtil.prototype, "utils.StringUtil");
})(utils || (utils = {}));
