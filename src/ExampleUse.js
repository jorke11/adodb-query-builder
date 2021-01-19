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

async function where(){
    let order = await OrderHeaders.whereBetween(
        {OrderDateTime:{start:'2021-01-19',end:'2021-01-20'}},[{"OrderId":"DESC"}]);
    //console.log('order',order);
}


async function create(){
    let order = new OrderHeaders();
    order.CustomerName="test customer name"
    order.DeliveryAddress="adddress"
    order.save()
    console.log('order',order);
}

(async()=>{
    await where()
})()



