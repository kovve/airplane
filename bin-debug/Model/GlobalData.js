var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var Model;
(function (Model) {
    var GlobalData = (function () {
        function GlobalData() {
        }
        GlobalData.isNotFirstLogin = false;
        // public static josnStr:string;
        GlobalData.version = 2018013001;
        //游戏得分
        GlobalData.score = 0;
        /*是否在App中玩这个游戏*/
        GlobalData.isInAPP = false;
        /*用户ID*/
        GlobalData.userID = "1000308962M4GU";
        /*appID*/
        GlobalData.appID = 1;
        GlobalData.postJosn = {
            "domain": "",
            "appId": 0,
            "sort": 0
        };
        return GlobalData;
    }());
    Model.GlobalData = GlobalData;
    __reflect(GlobalData.prototype, "Model.GlobalData");
})(Model || (Model = {}));
