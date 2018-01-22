module Views {


    import StringUtil = utils.StringUtil;

    export class EndRankItem extends eui.Component {
        private userPic: eui.Image;
        private rank: eui.Label;
        private nameText: eui.Label;
        private score: eui.BitmapLabel;
        private bg: eui.Image
        private data: any;

        public constructor(item: any) {
            super();
            this.data = item;
            this.skinName = "resource/eui_skins/EndRankItemSkin.exml";
        }

        protected createChildren(): void {
            super.createChildren();

            this.init();
        }

        protected init(): void {
            var isSelf: boolean = !!this.data["self"];
            this.nameText.text = StringUtil.getChar(this.data.userName, 6 * 3);
            this.rank.textColor = isSelf ?
                0x3979fc : 0xddddde;
            // this.rank.textColor = 0x3979fc;
            this.bg.visible = isSelf;

            this.userPic.source = "" + this.data.userPic;

            this.rank.text = "" + this.data.userNumber1;

            this.score.text = "" + this.data.userScore;

            // this.scaleX = Layout.getInstance().scaleX;
            // this.scaleY = Layout.getInstance().scaleY;
            // this.userPic.source = "http://game.hslmnews.com/resource/assets/player.png";
        }
    }
}