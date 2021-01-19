class ConnectDB {
   constructor(){
       this.connection = ''
   }

   static connect(connection){
       this.connection=connection
   }
}

module.exports = ConnectDB;