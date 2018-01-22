module Manager 
{
	import GameVo = Model.GameVo;

    export class DataManager {
		public constructor()
		{

		}

		private static instance: DataManager;
		public static getInstance(): DataManager {
			if (this.instance == null) {
				this.instance = new DataManager();
			}
			return this.instance;
		}

		public localSortList: Object[];
		public nationSortList: Object[];

		public localGet:boolean;
		public nationGet:boolean;
		public gameVO:GameVo = new GameVo();


		public localRankList(e: any): void {
			this.localSortList = e;
			if(this.localSortList.length>1)
			{
				this.localSortList.sort(this.compare)
			}
			this.localGet = true;
		}

		public nationRankList(e: any) {
			this.nationSortList = e;
			if(this.nationSortList.length>1)
			{
				this.nationSortList.sort(this.compare)
			}
			this.nationGet = true;
		}

		private compare(a:any,b:any):number
		{
			var scoreA:number = parseInt(a["userScore"]);
			var scoreB:number = parseInt(b["userScore"]);
			if(scoreA>scoreB)
			{
				return -1;
			}
			else if(scoreA<scoreB)
			{
				return 1;
			}
			return 0;
		}

		public updateGameVo(obj:any):void
		{
			this.gameVO = GameVo.createVo(obj);
			console.log(this.gameVO);
		}
	}
}