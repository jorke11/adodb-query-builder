const ADODB = require("node-adodb")
ADODB.debug = true
const {STRING_CONNECTION} = require("./Constants")
class ConnectDB {
   constructor(){
       this.connection ='' ;
   }

   static connect(){
       this.connection = ADODB.open(STRING_CONNECTION)
   }
}

module.exports = ConnectDB;