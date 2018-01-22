var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    var GameVo = (function () {
        function GameVo() {
        }
        /**
         *  创建一个从服务器获取的GameVo
         **/
        GameVo.createVo = function (obj) {
            var vo = new GameVo();
            // vo.StatusCode = parseInt(obj['StatusCode']);
            // vo.retMessage = obj['retMessage'];
            // vo.retData = obj['retData'];
            vo.appName = obj['appName'];
            vo.bgMusic = obj['bgMusic'];
            vo.bgImage = obj['bgImage'];
            vo.normalShotScore = parseInt(obj['normalShotScore']);
            vo.specilShotScore = parseInt(obj['specilShotScore']);
            vo.pointSpeed = parseInt(obj['pointSpeed']);
            vo.adSlogan = obj['adSlogan'];
            vo.appExplain = obj['appExplain'];
            vo.gameIntro = obj['gameIntro'];
            vo.startTime = obj['startTime'];
            vo.endTime = obj['endTime'];
            vo.thumb = obj['thumb'];
            vo.beginMessage = obj['beginMessage'];
            vo.endMessage = obj['endMessage'];
            vo.specilClockURL = obj['specilClockURL'];
            vo.specilClockLimit = parseInt(obj['specilClockLimit']);
            return vo;
        };
        return GameVo;
    }());
    Model.GameVo = GameVo;
    __reflect(GameVo.prototype, "Model.GameVo");
})(Model || (Model = {}));
