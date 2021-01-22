const moment = require("moment")
const {v4: uuidv4} = require("uuid")

const ConnectDB = require("./ConnectDB")

class QueryBuilder {
    constructor() {
        this.query = ""
    }

    Column(type, value) {
        let obj = { type: type };
        if (value !== undefined) {
            obj.value = value
        }

        if (type === 'datetime') {
            obj.value = moment().format("YYYY-MM-DD HH:mm:ss")
        }

        if (type === 'uuid') {
            obj.value = `{${uuidv4()}}`
        }

        return obj
    }


    async save() {
    
        let query = '('
        let values = '('
        for (const attr in this) {
            if(attr!=='query'){
                let { value, type } = this[attr]
                
                if (value !== undefined) {
                    query += (query === '(') ? '' : ','
                    query += attr
                    values += (values === '(') ? '' : ','
                    values += (type === 'integer') ? this[attr].value : `'${this[attr].value}'`
                }else{
                    if(type===undefined){
                        query += (query === '(') ? '' : ','
                        query += attr
                        values += (values === '(') ? '' : ','
                        values +=  `'${this[attr]}'`
                    }
                }
            }
        
        }

        query += ") "
        values += ") "
        query += 'values ' + values

        this.query = `INSERT INTO ${this.constructor.tableName} ${query};`
        const result = await ConnectDB.connection.execute(this.query,"SELECT @@Identity as id")
        .catch(err=>{
            console.log('err',err);
        })

        return result[0].id
    }

    static async where(conditionals) {
        let wh = "WHERE "
        for (const attr in conditionals) {
            wh += (wh === 'WHERE ') ? '' : ' AND '
            wh += attr + " = " + conditionals[attr]
        }

        this.query = `SELECT * FROM ${this.tableName} ${wh};`;
        return await ConnectDB.connection.query(this.query)
        .catch(err=>{
            console.log('err',err);
        })
    }

    static async whereRaw(conditionals) {
        let wh = `WHERE ${conditionals}`

        this.query = `SELECT * FROM ${this.tableName} ${wh};`;
        return await ConnectDB.connection.query(this.query)
        .catch(err=>{
            console.log('err',err);
        })
    }

    static async whereBetween(conditionals,order_by=[]) {
        
        let field = Object.keys(conditionals)[0];

        let orderBy=''

        if(order_by.length>0){
            orderBy = ""
            for(const order of order_by){
                let key= Object.keys(order)[0]
                orderBy+=(orderBy=='')?'':','
                orderBy+=`${key} ${order[key]}` 
            }
            orderBy=`ORDER BY ${orderBy}` 
            
        }        

        let wh = `WHERE ${field} >= #${conditionals[field].start}# and ${field}<=#${conditionals[field].end}#`
    
        this.query = `SELECT * FROM ${this.tableName} ${wh} ${orderBy};`;

        return await ConnectDB.connection.query(this.query)
        .catch(err=>{
            console.log('err',err);
        })
    }

    static async find(conditionals) {
        let wh = "WHERE "
        for (const attr in conditionals) {
            wh += (wh === 'WHERE ') ? '' : ' AND '
            wh += attr + " = " + conditionals[attr]
        }

        this.query = `SELECT * FROM ${this.tableName} ${wh};`;
        let result = await ConnectDB.connection.query(this.query)
        .catch(err=>{
            console.log('err',err);
        })

        return result[0]
    }

    static async update(values, where) {
        let { tableName } = this
    

        let wh = "WHERE ", setValues = ''

        for (const attr in where) {
            wh += (wh === 'WHERE ') ? '' : ' AND '
            wh += attr + " = " + where[attr]
        }

        for (const attr in values) {
            let val = (typeof values[attr]==='string')?`'${values[attr]}'`:values[attr]
            
            setValues += (setValues === '') ? '' : ', '
            setValues += attr + " = " + val
        }

        this.query = `UPDATE ${tableName} SET ${setValues} ${wh}`
        await ConnectDB.connection.execute(this.query)
        .catch(err=>{
            console.log('err',err);
        })
        
        return where
    }

    static toSql() {
        return this.query
    }

}

module.exports = QueryBuilder