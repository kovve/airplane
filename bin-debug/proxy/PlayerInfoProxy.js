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
    var GlobalData = Model.GlobalData;
    var PlayerInfoProxy = (function () {
        function PlayerInfoProxy() {
        }
        PlayerInfoProxy.getInstance = function () {
            if (this.instance == null) {
                this.instance = new PlayerInfoProxy();
            }
            return this.instance;
        };
        PlayerInfoProxy.prototype.getMyInfo = function () {
            //判断APP是IOS还是Android
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (false) {
                GlobalData.gameDomainURL = window.location.host;
            }
            if (true) {
                GlobalData.gameDomainURL = "csb.chinashadt.com";
            }
            GlobalData.isIOS = isiOS;
            //声明一个用户信息对象变量
            var uInfo;
            var josnStr;
            // alert(window.location.href);
            //临时处理  已经注册过的 域名会没有onapp
            if (window.location.href.indexOf("onapp") > -1) {
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
                    }
                    catch (error) {
                        console.log("调用失败");
                        this.getInfoFail();
                    }
                }
                else if (isiOS) {
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
                    }
                    catch (error) {
                        console.log("调用失败");
                        this.getInfoFail();
                    }
                }
            }
            else {
                console.log("非APP中");
                // alert("非APP中");
                GlobalData.isInAPP = false;
                this.getInfoFail();
            }
        };
        PlayerInfoProxy.prototype.getInfoSucess = function (uInfo) {
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
        };
        PlayerInfoProxy.prototype.getInfoFail = function () {
            // GlobalData.isInAPP = false;
            // GlobalData.userID = 0;
        };
        return PlayerInfoProxy;
    }());
    proxy.PlayerInfoProxy = PlayerInfoProxy;
    __reflect(PlayerInfoProxy.prototype, "proxy.PlayerInfoProxy");
})(proxy || (proxy = {}));
