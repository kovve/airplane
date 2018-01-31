var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Administrator
 */
var config;
(function (config) {
    /**
     *游戏配置信息
     */
    var GameConfig = (function () {
        function GameConfig() {
        }
        GameConfig.paserJosn = function (obj) {
            this.appName = obj['appName'];
            this.bgMusic = obj['bgMusic'];
            this.bgImage = obj['bgImage'];
            this.adSlogan = obj['adSlogan'];
            this.appExplain = obj['appExplain'];
            this.awardExplain = obj['awardExplain'];
            this.gameIntro = obj['gameIntro'];
            this.startTime = obj['startTime'];
            this.endTime = obj['endTime'];
            this.thumb = obj['thumb'];
            this.beginMessage = obj['beginMessage'];
            this.endMessage = obj['endMessage'];
            this.downloadUrl = obj["downloadUrl"];
            this.setGameContend(obj['blockContent']);
        };
        GameConfig.setGameContend = function (obj) {
            this.myBulletSpeed = parseInt(obj['myBulletSpeed']) || 12;
            this.myBulletHurt = parseInt(obj['myBulletHurt']) || 2;
            this.enemyBulletSpeed = parseInt(obj['enemyBulletSpeed']) || 8;
            this.enemyBulletHurt = parseInt(obj['enemyBulletHurt']) || 1;
            this.myPlaneBlood = parseInt(obj['myPlaneBlood']) || 12;
            this.enmeyPanelBlood = parseInt(obj['enmeyPanelBlood']) || 10;
            this.hitHurt = parseInt(obj['hitHurt']) || 12;
        };
        GameConfig.gameId = 3; //小游戏固定ID  每个小游戏拥有独有ID不可变
        GameConfig.noInAppNotic = "下载并登录官方APP参加趣味游戏，可参与好友排行， 还有丰厚奖励等你拿哦！";
        return GameConfig;
    }());
    config.GameConfig = GameConfig;
    __reflect(GameConfig.prototype, "config.GameConfig");
})(config || (config = {}));
