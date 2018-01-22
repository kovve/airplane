var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Manager;
(function (Manager) {
    var GameVo = Model.GameVo;
    var DataManager = (function () {
        function DataManager() {
            this.gameVO = new GameVo();
        }
        DataManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new DataManager();
            }
            return this.instance;
        };
        DataManager.prototype.localRankList = function (e) {
            this.localSortList = e;
            if (this.localSortList.length > 1) {
                this.localSortList.sort(this.compare);
            }
            this.localGet = true;
        };
        DataManager.prototype.nationRankList = function (e) {
            this.nationSortList = e;
            if (this.nationSortList.length > 1) {
                this.nationSortList.sort(this.compare);
            }
            this.nationGet = true;
        };
        DataManager.prototype.compare = function (a, b) {
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
        DataManager.prototype.updateGameVo = function (obj) {
            this.gameVO = GameVo.createVo(obj);
            console.log(this.gameVO);
        };
        return DataManager;
    }());
    Manager.DataManager = DataManager;
    __reflect(DataManager.prototype, "Manager.DataManager");
})(Manager || (Manager = {}));
