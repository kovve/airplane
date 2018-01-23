/**
 *
 * @author 
 *
 */
module Model {


    export class GlobalData {

        // public static GameStage: egret.Stage;
        public static GameStage_width: number;
        public static GameStage_height: number;

        public static isFirstLog: boolean = false;

        // public static josnStr:string;
        public static version: number = 201605241700;
        //游戏得分
        public static score: number = 0;
        /*是否在App中玩这个游戏*/
        public static isInAPP: boolean = false;

        public static userName: string;

        public static userImg: string;

        public static isIOS: boolean;

        public static openId: number;

        public static unionid: number;
        /*站点ID*/
        public static sitID: number;

        /*用户ID*/
        public static userID: string = "599";

        /*appID*/
        public static appID: number = 1;
        /*用户手机号*/
        public static telephoneId: number;
        /*用户密码*/
        public static passId: number;

        /*bonus红包奖金*/
        public static bouns: number;

        /*域名*/
        public static gameDomainURL: string;


        public static postJosn: any = {
            "domain": "",
            "appId": 0,
            "sort": 0
        }
    }
}
