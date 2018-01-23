/**
 *
 * @author
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var proxy;
(function (proxy) {
    var GameConfig = config.GameConfig;
    var GlobalData = Model.GlobalData;
    var RankData = Model.RankData;
    var HttpCommand = (function () {
        function HttpCommand() {
        }
        // private testUrl:string = "http://csb.chinashadt.com";
        HttpCommand.getInstance = function () {
            if (this.instance == null) {
                this.instance = new HttpCommand();
            }
            return this.instance;
        };
        HttpCommand.prototype.getGameConfig = function (gameId) {
            if (gameId === void 0) { gameId = 1; }
            var curURL = "http://" + GlobalData.gameDomainURL + "/index.php?m=content&c=litAppBlock&a=index&mobileDomain=" + GlobalData.gameDomainURL + "&gameID=" + GameConfig.gameId + "&requstID=" + HttpCommand.GameConfigID;
            console.log("curURL:" + curURL);
            this.postRequset(curURL);
        };
        HttpCommand.prototype.reportResult = function (userId, score, bonus) {
            if (bonus === void 0) { bonus = 0; }
            // alert("userId:"+userId)
            // http://chinashadt.com/index.php?m=content&c=acceptResult&a=add&domain=chinashadt.com&userId=599&appId=1&score=10&bonus=22&requstID=1
            var curURL = "http://" + GlobalData.gameDomainURL + "/index.php?m=content&c=acceptResult&a=add&domain=" + GlobalData.gameDomainURL + "&userId=" + userId + "&appId=" + GameConfig.gameId + "&score=" + score + "&bonus=" + bonus + "&requstID=" + HttpCommand.reportResultID;
            this.postRequset(curURL);
        };
        //排序方式（1本地排行，2全国排行，3预留）
        HttpCommand.prototype.getRankList = function (sort) {
            if (sort === void 0) { sort = 0; }
            var curURL = "http://" + GlobalData.gameDomainURL + "/index.php?m=content&c=userRankingList&a=showList&domain=" + GlobalData.gameDomainURL + "&appId=" + GameConfig.gameId + "&sort=" + sort + "&requstID=" + HttpCommand.rankInfoID;
            this.postRequset(curURL);
        };
        //获取当前用户排名(1本地排行，2全国排行，3预留）
        HttpCommand.prototype.getUserRank = function (useID) {
            var curURL = "http://" + GlobalData.gameDomainURL + "/index.php?m=content&c=currentUserNumber&a=showIndex&userId=" + useID + "&gameId=" + GameConfig.gameId + "&requstID=" + HttpCommand.userRank;
            this.postRequset(curURL);
        };
        HttpCommand.prototype.postRequset = function (url) {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(url, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        };
        HttpCommand.prototype.onGetComplete = function (e) {
            //
            var request = e.currentTarget;
            this.removeEvent(request);
            var result = JSON.parse(request.response);
            if (parseInt(result["StatusCode"]) > 0) {
                var objs = result["retData"];
                var requsetID = parseInt(objs["requstID"] || objs[0]["requstID"]);
                switch (requsetID) {
                    case HttpCommand.GameConfigID:
                        GameConfig.paserJosn(objs[0]);
                        EventManager.dispatchEvent(new Events.CommonEvent(Events.CommonEvent.GET_INFO_SUCESS));
                        break;
                    case HttpCommand.rankInfoID:
                        if (objs.length <= 0) {
                            EventManager.dispatchEvent(new Events.CommonEvent(Events.CommonEvent.GET_RANK_SUCESS, 0));
                            return;
                        }
                        if (parseInt(objs[0]["sort"]) == 1) {
                            RankData.getInstance().localRankList(objs);
                        }
                        else {
                            RankData.getInstance().nationRankList(objs);
                        }
                        EventManager.dispatchEvent(new Events.CommonEvent(Events.CommonEvent.GET_RANK_SUCESS, parseInt(objs[0]["sort"])));
                        break;
                    case HttpCommand.reportResultID:
                        console.log("上报成功！！");
                        EventManager.dispatchEvent(new Events.CommonEvent(Events.CommonEvent.UP_SOCRE_SUCESS));
                        break;
                    case HttpCommand.userRank:
                        // alert("userRank:"+objs);
                        if (objs) {
                            EventManager.dispatchEvent(new Events.CommonEvent(Events.CommonEvent.GET_USERRANK_SUCESS, objs));
                        }
                        else {
                            alert("数据为空！");
                        }
                        break;
                }
            }
            else {
                alert(result["retMessage"]);
            }
        };
        HttpCommand.prototype.onGetIOError = function (e) {
            console.log("postError:" + e);
            this.removeEvent(e.currentTarget);
        };
        HttpCommand.prototype.onGetProgress = function (e) {
            // console.log("get data : ",request.response);
        };
        HttpCommand.prototype.removeEvent = function (request) {
            request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        };
        /**
         * qq5采用json数据
         */
        HttpCommand.prototype.getString = function (data) {
            return "0000";
        };
        HttpCommand.GameConfigID = 1;
        HttpCommand.reportResultID = 2;
        HttpCommand.rankInfoID = 3;
        HttpCommand.userRank = 4;
        return HttpCommand;
    }());
    proxy.HttpCommand = HttpCommand;
    __reflect(HttpCommand.prototype, "proxy.HttpCommand");
})(proxy || (proxy = {}));
