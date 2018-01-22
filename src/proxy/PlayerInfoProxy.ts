/**
 *
 * @author
 *
 */

module proxy {


    import GlobalData = Model.GlobalData;

    export class PlayerInfoProxy {
        public constructor() {
        }

        private static instance: PlayerInfoProxy;

        public static getInstance(): PlayerInfoProxy {
            if (this.instance == null) {
                this.instance = new PlayerInfoProxy();
            }
            return this.instance;
        }

        public getMyInfo(): void {
            //判断APP是IOS还是Android
            var u: string = navigator.userAgent;
            var isAndroid: boolean = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS: boolean = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

            if (RELEASE) {
                GlobalData.gameDomainURL = window.location.host;
            }
            if (DEBUG) {
                GlobalData.gameDomainURL = "csb.chinashadt.com";
            }


            GlobalData.isIOS = isiOS;
            //声明一个用户信息对象变量
            var uInfo;
            var josnStr: string;
            // alert(window.location.href);
            //临时处理  已经注册过的 域名会没有onapp
            if (window.location.href.indexOf("onapp") > -1) {//APP中处理方式
                GlobalData.isInAPP = true;
                if (isAndroid) {
                    // alert("is Andro")
                    try {
                        josnStr = eval("android.getUserInfo()");
                        // GlobalData.josnStr = josnStr;
                        // alert("is Andro"+josnStr)
                        uInfo = eval('(' + josnStr + ')');
                        if (uInfo == null || !uInfo["userLogin"]) {
                            // alert("uInfo.userLogin:"+uInfo["userLogin"])
                            eval("android.goLogin()");
                        }
                        else {
                            this.getInfoSucess(uInfo);
                        }

                    } catch (error) {
                        console.log("调用失败");
                        this.getInfoFail();
                    }
                } else if (isiOS) {
                    try {
                        josnStr = eval("OCModel.getUserInfo()");
                        uInfo = eval('(' + josnStr + ')');
                        //如果没有拿到用户信息弹出登陆框
                        // alert("isiOS : uInfo:"+uInfo)
                        if (uInfo == null || !uInfo["userLogin"]) {
                            eval("OCModel.getLogin()");
                        }
                        else {
                            this.getInfoSucess(uInfo);
                        }
                    } catch (error) {
                        console.log("调用失败");
                        this.getInfoFail();
                    }
                }
            } else {//非APP中处理方式
                console.log("非APP中");
                // alert("非APP中");
                GlobalData.isInAPP = false;
                this.getInfoFail();
            }

        }

        private getInfoSucess(uInfo: Object): void {
            if (uInfo) {
                GlobalData.isInAPP = true;
                GlobalData.userName = uInfo["userName"];
                GlobalData.userImg = uInfo["userImg"];
                GlobalData.appID = parseInt(uInfo["Appid"]);
                GlobalData.openId = parseInt(uInfo["openid"]);
                GlobalData.unionid = parseInt(uInfo["unionid"]);
                GlobalData.userID = uInfo["userLogin"];
                GlobalData.telephoneId = parseInt(uInfo["userPhone"]);
                GlobalData.passId = parseInt(uInfo["userPwd"]);
            }
        }

        private getInfoFail(): void {
            // GlobalData.isInAPP = false;
            // GlobalData.userID = 0;
        }
    }
}