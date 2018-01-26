/**
 * Created by Administrator
 */
module config
{
    /**
     *游戏配置信息
     */
    export class GameConfig
    {
        // 状态码(后台判断站点是否开启该应用，应用时间是否过期)
        public static StatusCode: number;
        //返回消息（站点未开通该应用的情况下，状态码为0，消息为“暂未开通”）
        public static retMessage: string;
        // 数据内容
        // public retData:string;
        //应用名称
        public static appName: string;

        /**背景音乐*/
        public static bgMusic: string;
        /**背景图片*/
        public static bgImage: string;

        //广告标语
        public static adSlogan: string;
        //应用说明
        public static appExplain: string;
        //游戏介绍说明
        public static gameIntro: string;
        /**上线时间*/
        public static startTime: string;
        /**结束时间 */
        public static endTime: string;

        /**缩略图（分享或列表页使用）*/
        public static thumb: string;
        /**开始前提醒*/
        public static beginMessage: string;
        /**结束后提醒*/
        public static endMessage: string;

        public static awardExplain:string;

        public static downloadUrl:string;

        /**本小游戏相关的数值*/

        /**我的子弹速度*/
        public static myBulletSpeed:number;
        /**我的子弹伤害*/
        public static myBulletHurt:number;
        /**敌人子弹速度*/
        public static enemyBulletSpeed:number;
        /**敌人子弹伤害*/
        public static enemyBulletHurt:number;
        /**我的飞机总血量*/
        public static myPlaneBlood:number;
        /**敌人飞机总血量*/
        public static enmeyPanelBlood:number;
        /**飞机碰撞伤害*/
        public static hitHurt:number;


        public static gameId: number = 3;//小游戏固定ID  每个小游戏拥有独有ID不可变

        public static noInAppNotic:string = "下载并登录官方APP参加趣味游戏，可参与好友排行，还有丰厚奖励等你拿哦！";
        public static paserJosn(obj:any):void
        {
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

        }

        private static setGameContend(obj:any):void
        {
            this.myBulletSpeed = parseInt(obj['myBulletSpeed']) || 12;

            this.myBulletHurt = parseInt(obj['myBulletHurt']) || 2;

            this.enemyBulletSpeed = parseInt(obj['enemyBulletSpeed']) || 8;

            this.enemyBulletHurt = parseInt(obj['enemyBulletHurt']) || 1;

            this.myPlaneBlood = parseInt(obj['myPlaneBlood']) || 12;

            this.enmeyPanelBlood = parseInt(obj['enmeyPanelBlood']) || 10;

            this.hitHurt = parseInt(obj['hitHurt']) || 12;

        }
    }
}