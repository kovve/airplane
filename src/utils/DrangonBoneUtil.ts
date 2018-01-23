class DrangonBoneUtil
{
    public constructor()
    {

    }

    /**
     *name 动画名称 armatureName
     *创建idle动画，格式
     * dragonbonesData key为 name+"_ske_json"
     * textureData  key为name+"_tex_json"
     * texture key为name+"_tex_png"
     * 文件命名按上面规范
     * 测试F_zhanshen20
     * */
    public static createIdelDrangonBone(name:string = "F_zhanshen20"):dragonBones.EgretArmatureDisplay
    {
        var dragonbonesData = RES.getRes( name+"_ske_json" );
        var textureData = RES.getRes( name+"_tex_json" );
        var texture = RES.getRes( name+"_tex_png" );

        let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
        egretFactory.parseDragonBonesData(dragonbonesData);
        egretFactory.parseTextureAtlasData(textureData, texture);

        let armatureDisplay: dragonBones.EgretArmatureDisplay = egretFactory.buildArmatureDisplay(name);

        // Manager.UIManager.getInstance().appLevel.addChild(armatureDisplay);

        armatureDisplay.animation.play("idle");
        return armatureDisplay;
    }
}