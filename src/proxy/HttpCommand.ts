/**
 *
 * @author
 *
 */

module proxy {
    import GameConfig = config.GameConfig;
    import GlobalData = Model.GlobalData;
    import RankData = Model.RankData;

    export class HttpCommand {
        public constructor() {
        }

        private static GameConfigID: number = 1;
        private static reportResultID: number = 2;
        private static rankInfoID: number = 3;
        private static userRank: number = 4;


        private static instance: HttpCommand;

        // private testUrl:string = "http://csb.chinashadt.com";
        public static getInstance(): HttpCommand {
            if (this.instance == null) {
                this.instance = new HttpCommand();
            }
            return this.instance;
        }

        public getGameConfig(gameId: number = 1): void {

            let curURL: string = `http://${GlobalData.gameDomainURL}/index.php?m=content&c=litAppBlock&a=index&mobileDomain=${GlobalData.gameDomainURL}&gameID=${GameConfig.gameId}&requstID=${HttpCommand.GameConfigID}`;
            console.log("curURL:" + curURL);
            this.postRequset(curURL);

        }

        public reportResult(userId: string, score: number, bonus: number = 0): void {
            // alert("userId:"+userId)
            // http://chinashadt.com/index.php?m=content&c=acceptResult&a=add&domain=chinashadt.com&userId=599&appId=1&score=10&bonus=22&requstID=1
            let curURL: string = `http://${GlobalData.gameDomainURL}/index.php?m=content&c=acceptResult&a=add&domain=${GlobalData.gameDomainURL}&userId=${userId}&appId=${GameConfig.gameId}&score=${score}&bonus=${bonus}&requstID=${HttpCommand.reportResultID}`;
            this.postRequset(curURL);
        }

        //排序方式（1本地排行，2全国排行，3预留）
        public getRankList(sort: number = 0): void {
            let curURL: string =
                `http://${GlobalData.gameDomainURL}/index.php?m=content&c=userRankingList&a=showList&domain=${GlobalData.gameDomainURL}&appId=${GameConfig.gameId}&sort=${sort}&requstID=${HttpCommand.rankInfoID}`;
            this.postRequset(curURL);
        }

        //获取当前用户排名(1本地排行，2全国排行，3预留）
        public getUserRank(useID: string): void {
            let curURL: string =
                `http://${GlobalData.gameDomainURL}/index.php?m=content&c=currentUserNumber&a=showIndex&userId=${useID}&gameId=${GameConfig.gameId}&requstID=${HttpCommand.userRank}`;
            this.postRequset(curURL);

        }

        private postRequset(url: string): void {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;

            request.open(url, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        }

        private onGetComplete(e: egret.Event): void {
            //
            var request = <egret.HttpRequest>e.currentTarget;
            this.removeEvent(request);
            var result = JSON.parse(request.response);

            if (parseInt(result["StatusCode"]) > 0)//成功
            {
                var objs: any[] = result["retData"];
                var requsetID: number = parseInt(objs["requstID"] || objs[0]["requstID"]);
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
            else//失败
            {
                alert(result["retMessage"]);
            }

        }

        private onGetIOError(e: egret.Event): void {
            console.log("postError:" + e);
            this.removeEvent(<egret.HttpRequest>e.currentTarget);
        }

        private onGetProgress(e: egret.Event): void {

            // console.log("get data : ",request.response);
        }

        private removeEvent(request: egret.HttpRequest): void {
            request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        }

        /**
         * qq5采用json数据
         */
        public getString(data: string): string {

            return "0000";
        }

    }
}
