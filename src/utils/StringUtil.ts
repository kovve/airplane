module utils {
    export class StringUtil {

        public constructor() {
        }

        public static getChar(_str: string, _len: number): string {

            var _ba: egret.ByteArray = new egret.ByteArray;

            _ba.writeUTFBytes(_str);


            if (_ba.length <= _len) return _str;

            _ba.position = 0;

            return _ba.readUTFBytes(_len) + "...";

        }
        /**
         *
         *转换成格式字符串
         *_str中“|”表示换行
         *
         * **/
        public static formatStr(_str:string):string
        {
            return _str.replace(/\|/g, '\r\t');
        }
    }
}