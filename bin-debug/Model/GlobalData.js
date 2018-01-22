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
        GlobalData.isFirstLog = false;
        // public static josnStr:string;
        GlobalData.version = 201605241700;
        //游戏得分
        GlobalData.score = 0;
        /*是否在App中玩这个游戏*/
        GlobalData.isInAPP = false;
        /*用户ID*/
        GlobalData.userID = "599";
        /*appID*/
        GlobalData.appID = 1;
        GlobalData.gameId = 1; //小游戏固定ID  每个小游戏拥有独有ID不可变
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
