const {ConnectDB} = require("./index")

const OrderHeaders = require("./ModelExample")

ConnectDB.connect("Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\\Users\\aldelo\\Documents\\DB local\\AGUAPATOS72.mdb;Persist Security Info=False;")

async function list(){
    let order = new OrderHeaders()
    let id = await order.save()
    console.log('order',id);
}

async function list2(){
    let order = await OrderHeaders.find({OrderID:127068});
    
    console.log('order',order);
}

async function update(){
    let order = await OrderHeaders.update({OrderStatus:'2'},{OrderID:127068});
    
    console.log('order',order);
}

(async()=>{
    await update()
})()



