var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    var RankData = (function () {
        function RankData() {
        }
        RankData.getInstance = function () {
            if (this.instance == null) {
                this.instance = new RankData();
            }
            return this.instance;
        };
        RankData.prototype.localRankList = function (e) {
            this.localSortList = e;
            if (this.localSortList.length > 1) {
                this.localSortList.sort(this.compare);
            }
            this.localGet = true;
        };
        RankData.prototype.nationRankList = function (e) {
            this.nationSortList = e;
            if (this.nationSortList.length > 1) {
                this.nationSortList.sort(this.compare);
            }
            this.nationGet = true;
        };
        RankData.prototype.compare = function (a, b) {
            var scoreA = parseInt(a["userScore"]);
            var scoreB = parseInt(b["userScore"]);
            if (scoreA > scoreB) {
                return -1;
            }
            else if (scoreA < scoreB) {
                return 1;
            }
            return 0;
        };
        return RankData;
    }());
    Model.RankData = RankData;
    __reflect(RankData.prototype, "Model.RankData");
})(Model || (Model = {}));
