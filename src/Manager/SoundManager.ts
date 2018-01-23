class SoundManager extends egret.HashObject {
    private static instance:SoundManager;
    public static bgMusic:string = "bgMusic";
    private sounds:{ [id: string]:egret.Sound}={};
    private channels:{ [id: string]: egret.SoundChannel}={};
    private volumeBg:number=1;
    private volumeEffect:number=1;
    private isNoVolume:number=1;
    private _activated:boolean = true;

    public constructor()
    {
        super();
        Layout.getInstance().stage.addEventListener(egret.Event.ACTIVATE, this.stage_activateHandler,this);
        Layout.getInstance().stage.addEventListener(egret.Event.DEACTIVATE, this.stage_activateHandler,this);
    }
    public static getIns():SoundManager{
        if(this.instance == null){
            this.instance = new SoundManager();

        }
        return this.instance;
    }
    private stage_activateHandler(event:egret.Event):void
    {
        this._activated = event.type == egret.Event.ACTIVATE;
        if(this._activated) {
            var bgVo:number = parseInt(egret.localStorage.getItem("sound.bgVol"));
            console.log("bgVo:"+bgVo+":"+egret.localStorage.getItem("sound.bgVol"))
            this.setBgVolume(bgVo);
        }
        else {
            egret.localStorage.setItem("sound.bgVol",""+this.volumeBg);
            this.setBgVolume(0);

        }
    }

    /**
     * 判断是否为背景声音
     * @param data 声音容器
     * @param name 声音名字
     */
    private checkSoundIsBg(data:Object,name:string):boolean
    {
        return data[name+"-bg"];
    }
    /**
     * 声音必须是预先已经加载好的
     * @param name 声音名字
     * @param isBgSound 是不是背景声音
     */
    public addItem(name:string,sound:egret.Sound = null,isBgSound:boolean=false):void
    {
        var soundName:string=name
        if(isBgSound){//如果是背景声音会在名字后面加-bg
            soundName=name+"-bg";
        }
        if(sound)
        {
            this.sounds[soundName]=sound;
        }
        else if(!this.sounds[soundName]){
            sound=RES.getRes(name);
            this.sounds[soundName]=sound;
        }
    }
    public addBgMusic(name:string):void
    {
        if(name.indexOf("http")>0)
        {
            this.addItem(name,null,true)
        }
        else
        {
            this.loadBgSound(name);
        }
    }
    /**
     * 声音必须是预先已经加载好的  背景音乐必须先addItem()
     * @param name 声音名字
     * @param start 开始播放的地方，默认从头开始播放
     * @param loop 循环播放次数，默认是1次
     */
    public play(name:string,start:number=0,loop:number=1):void
    {
        if(this.sounds[name] == null)
        {
            this.addItem(name)
        }
        var volume:number=this.volumeEffect
        if(this.checkSoundIsBg(this.sounds,name)){
            name=name+"-bg";
            volume=this.volumeBg;
        }
        if(this.sounds[name]){
            var sound:egret.Sound=this.sounds[name];
            this.channels[name]=sound.play(start,loop);

            if(this.isNoVolume==0){
                this.channels[name].volume=0;
            }else{
                this.channels[name].volume=volume;
            }
        }
    }
    /**
     * 声音必须是预先已经加载好的
     * @param name 声音名字
     */
    public stop(name):void
    {
        if(this.checkSoundIsBg(this.channels,name)){
            name=name+"-bg";
        }
        if(this.channels[name]){
            var channel:egret.SoundChannel=this.channels[name]
            channel.stop();
        }
    }
    /**
     * 设置某个声音的音量
     *  @param name 声音名字
     *  @param volume 音量0－1
     */
    public setVolume(name:string,volume:number):void
    {
        if(this.checkSoundIsBg(this.channels,name)){
            name=name+"-bg";
        }
        if(this.channels[name]){
            var channel:egret.SoundChannel=this.channels[name]
            channel.volume=volume;
        }
    }
    /**
     * 设置所有背景声音音量
     * @param volume 音量0－1
     */
    public setBgVolume(volume:number):void
    {
        for(var name in this.channels){
            if(name.split("-bg").length==2){
                var channel:egret.SoundChannel=this.channels[name];
                this.volumeBg=volume;
                if(channel.position!=0){
                    channel.volume=volume;
                }
            }
        }
    }
    /**
     * 设置所有特效声音音量
     * @param volume 音量0－1
     */
    public setEffectVolume(volume:number):void
    {
        for(var name in this.channels){
            if(name.split("-bg").length==1){
                var channel:egret.SoundChannel=this.channels[name];
                this.volumeEffect=volume;
                if(channel.position!=0){
                    channel.volume=volume;
                }
            }
        }
    }
    /**设置是否静音
     * @param volume 是否静音0为无音1为有音
     */
    public setIsNoVolume(volume:number):void
    {
        this.isNoVolume=volume;
        for(var name in this.channels){
            var channel:egret.SoundChannel=this.channels[name];
            if(volume==0){
                channel.volume=0;
            }else if(channel.position!=0){
                if(this.checkSoundIsBg(this.sounds,name)){
                    channel.volume=this.volumeBg;
                }else{
                    channel.volume=this.volumeEffect;
                }
            }
        }
    }

    private loader:egret.URLLoader;

    private loadBgSound(url:string):void{
        //新建一个URLLoader
        this.loader= new egret.URLLoader();
        this.loader.addEventListener(egret.Event.COMPLETE,this.soundPlayComplete,this);
        this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.soundLoadFail,this);
        //新建一个数据表单
        this.loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        //将声音添加进去
        this.loader.load(new egret.URLRequest(url))
    }

    private soundPlayComplete(event:egret.Event){

        //取得表单数据

        var sound:egret.Sound = this.loader.data;

        this.addItem("bgMusic",sound,true)
        // sound.play();
        // alert("声音播放完毕");
        this.play("bgMusic",0,0)
    }

    private soundLoadFail(e:egret.IOErrorEvent):void
    {
        alert("声音加载失败");
    }
}