const {ConnectDB} = require("./index")

const OrderHeaders = require("./ModelExample")

ConnectDB.connect()

async function list(){
    let order = new OrderHeaders()
    let id = await order.save()
    console.log('order',id);
}

(async()=>{
    await list()
})()



