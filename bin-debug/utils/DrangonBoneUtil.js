var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DrangonBoneUtil = (function () {
    function DrangonBoneUtil() {
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
    DrangonBoneUtil.createIdelDrangonBone = function (name) {
        if (name === void 0) { name = "F_zhanshen20"; }
        var dragonbonesData = RES.getRes(name + "_ske_json");
        var textureData = RES.getRes(name + "_tex_json");
        var texture = RES.getRes(name + "_tex_png");
        var egretFactory = dragonBones.EgretFactory.factory;
        egretFactory.parseDragonBonesData(dragonbonesData);
        egretFactory.parseTextureAtlasData(textureData, texture);
        var armatureDisplay = egretFactory.buildArmatureDisplay(name);
        // Manager.UIManager.getInstance().appLevel.addChild(armatureDisplay);
        armatureDisplay.animation.play("idle");
        return armatureDisplay;
    };
    return DrangonBoneUtil;
}());
__reflect(DrangonBoneUtil.prototype, "DrangonBoneUtil");
