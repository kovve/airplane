var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SoundManager = (function (_super) {
    __extends(SoundManager, _super);
    function SoundManager() {
        var _this = _super.call(this) || this;
        _this.sounds = {};
        _this.channels = {};
        _this.volumeBg = 1;
        _this.volumeEffect = 1;
        _this.isNoVolume = 1;
        _this._activated = true;
        Layout.getInstance().stage.addEventListener(egret.Event.ACTIVATE, _this.stage_activateHandler, _this);
        Layout.getInstance().stage.addEventListener(egret.Event.DEACTIVATE, _this.stage_activateHandler, _this);
        return _this;
    }
    SoundManager.getIns = function () {
        if (this.instance == null) {
            this.instance = new SoundManager();
        }
        return this.instance;
    };
    SoundManager.prototype.stage_activateHandler = function (event) {
        this._activated = event.type == egret.Event.ACTIVATE;
        if (this._activated) {
            var bgVo = parseInt(egret.localStorage.getItem("sound.bgVol"));
            console.log("bgVo:" + bgVo + ":" + egret.localStorage.getItem("sound.bgVol"));
            this.setBgVolume(bgVo);
        }
        else {
            egret.localStorage.setItem("sound.bgVol", "" + this.volumeBg);
            this.setBgVolume(0);
        }
    };
    /**
     * 判断是否为背景声音
     * @param data 声音容器
     * @param name 声音名字
     */
    SoundManager.prototype.checkSoundIsBg = function (data, name) {
        return data[name + "-bg"];
    };
    /**
     * 声音必须是预先已经加载好的
     * @param name 声音名字
     * @param isBgSound 是不是背景声音
     */
    SoundManager.prototype.addItem = function (name, sound, isBgSound) {
        if (sound === void 0) { sound = null; }
        if (isBgSound === void 0) { isBgSound = false; }
        var soundName = name;
        if (isBgSound) {
            soundName = name + "-bg";
        }
        if (sound) {
            this.sounds[soundName] = sound;
        }
        else if (!this.sounds[soundName]) {
            sound = RES.getRes(name);
            this.sounds[soundName] = sound;
        }
    };
    SoundManager.prototype.addBgMusic = function (name) {
        if (name.indexOf("http") > 0) {
            this.addItem(name, null, true);
        }
        else {
            this.loadBgSound(name);
        }
    };
    /**
     * 声音必须是预先已经加载好的  背景音乐必须先addItem()
     * @param name 声音名字
     * @param start 开始播放的地方，默认从头开始播放
     * @param loop 循环播放次数，默认是1次
     */
    SoundManager.prototype.play = function (name, start, loop) {
        if (start === void 0) { start = 0; }
        if (loop === void 0) { loop = 1; }
        if (this.sounds[name] == null) {
            this.addItem(name);
        }
        var volume = this.volumeEffect;
        if (this.checkSoundIsBg(this.sounds, name)) {
            name = name + "-bg";
            volume = this.volumeBg;
        }
        if (this.sounds[name]) {
            var sound = this.sounds[name];
            this.channels[name] = sound.play(start, loop);
            if (this.isNoVolume == 0) {
                this.channels[name].volume = 0;
            }
            else {
                this.channels[name].volume = volume;
            }
        }
    };
    /**
     * 声音必须是预先已经加载好的
     * @param name 声音名字
     */
    SoundManager.prototype.stop = function (name) {
        if (this.checkSoundIsBg(this.channels, name)) {
            name = name + "-bg";
        }
        if (this.channels[name]) {
            var channel = this.channels[name];
            channel.stop();
        }
    };
    /**
     * 设置某个声音的音量
     *  @param name 声音名字
     *  @param volume 音量0－1
     */
    SoundManager.prototype.setVolume = function (name, volume) {
        if (this.checkSoundIsBg(this.channels, name)) {
            name = name + "-bg";
        }
        if (this.channels[name]) {
            var channel = this.channels[name];
            channel.volume = volume;
        }
    };
    /**
     * 设置所有背景声音音量
     * @param volume 音量0－1
     */
    SoundManager.prototype.setBgVolume = function (volume) {
        for (var name in this.channels) {
            if (name.split("-bg").length == 2) {
                var channel = this.channels[name];
                this.volumeBg = volume;
                if (channel.position != 0) {
                    channel.volume = volume;
                }
            }
        }
    };
    /**
     * 设置所有特效声音音量
     * @param volume 音量0－1
     */
    SoundManager.prototype.setEffectVolume = function (volume) {
        for (var name in this.channels) {
            if (name.split("-bg").length == 1) {
                var channel = this.channels[name];
                this.volumeEffect = volume;
                if (channel.position != 0) {
                    channel.volume = volume;
                }
            }
        }
    };
    /**设置是否静音
     * @param volume 是否静音0为无音1为有音
     */
    SoundManager.prototype.setIsNoVolume = function (volume) {
        this.isNoVolume = volume;
        for (var name in this.channels) {
            var channel = this.channels[name];
            if (volume == 0) {
                channel.volume = 0;
            }
            else if (channel.position != 0) {
                if (this.checkSoundIsBg(this.sounds, name)) {
                    channel.volume = this.volumeBg;
                }
                else {
                    channel.volume = this.volumeEffect;
                }
            }
        }
    };
    SoundManager.prototype.loadBgSound = function (url) {
        //新建一个URLLoader
        this.loader = new egret.URLLoader();
        this.loader.addEventListener(egret.Event.COMPLETE, this.soundPlayComplete, this);
        this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.soundLoadFail, this);
        //新建一个数据表单
        this.loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        //将声音添加进去
        this.loader.load(new egret.URLRequest(url));
    };
    SoundManager.prototype.soundPlayComplete = function (event) {
        //取得表单数据
        var sound = this.loader.data;
        this.addItem("bgMusic", sound, true);
        // sound.play();
        // alert("声音播放完毕");
        this.play("bgMusic", 0, 0);
    };
    SoundManager.prototype.soundLoadFail = function (e) {
        alert("声音加载失败");
    };
    SoundManager.bgMusic = "bgMusic";
    return SoundManager;
}(egret.HashObject));
__reflect(SoundManager.prototype, "SoundManager");
