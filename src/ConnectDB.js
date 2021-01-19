const ADODB = require("node-adodb")
ADODB.debug = true
const {STRING_CONNECTION} = require("./Constants")
class ConnectDB {
   constructor(){
       this.connection ='' ;
   }

   static connect(string_connection){
       string_connection =  string_connection || STRING_CONNECTION
       this.connection = ADODB.open(string_connection)
   }
}

module.exports = ConnectDB;