module Events {
	
	export class CommonEvent extends egret.Event{

	/*获取信息成功*/
    public static GET_INFO_SUCESS: string = "GET_INFO_SUCESS";

    /*获取排行榜成功*/
    public static GET_RANK_SUCESS:string = "GET_RANK_SUCESS";

    /*上报分数成功*/
    public static UP_SOCRE_SUCESS:string = "UP_SOCRE_SUCESS";

    /*获取分数成功*/
    public static GET_USERRANK_SUCESS:string= "GET_USERRANK_SUCESS";

    /*游戏开始*/
    public static GAME_START:string= "GAME_START";

    public constructor(type: string,data:any = null,bubbles: boolean = false,cancelable: boolean = false) {
        super(type,bubbles,cancelable);
        this.data = data;
    }

    public data:any = null;
	}
}
