module Model
{
    export class RankData {
		public constructor()
		{

		}

		private static instance: RankData;
		public static getInstance(): RankData {
			if (this.instance == null) {
				this.instance = new RankData();
			}
			return this.instance;
		}

		public localSortList: Object[];
		public nationSortList: Object[];

		public localGet:boolean;
		public nationGet:boolean;


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
	}
}