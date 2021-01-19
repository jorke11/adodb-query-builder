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
            let { value, type } = this[attr]

            if (value !== undefined) {
                query += (query === '(') ? '' : ','
                query += attr
                values += (values === '(') ? '' : ','
                values += (type === 'integer') ? this[attr].value : `'${this[attr].value}'`
            }
        }

        query += ") "
        values += ") "
        query += 'values ' + values


        this.query = `INSERT INTO ${this.constructor.tableName} ${query};`
        console.log('this.query',this.query)
        const result = await ConnectDB.connection.execute(this.query,"SELECT @@Identity as id")
        .catch(err=>{
            console.log('err',err);
        })

        return result[0].id
        
        

    }

    static async where(conditionals) {
        let wh = "WHERE "
        for (const attr in conditionals) {
            wh += (wh === '') ? '' : ' AND '
            wh += attr + " = " + conditionals[attr]
        }

        this.query = `SELECT * FROM ${this.tableName} ${wh};`;
        console.log('this.query',this.query);
        return await conn.query(this.query)
        .catch(err=>{
            console.log('err',err);
        })
    }

    static update(values, where) {
        let { tableName } = this

        let wh = "WHERE ", setValues = ''

        for (const attr in where) {
            wh += (wh === 'WHERE ') ? '' : ' AND '
            wh += attr + " = " + where[attr]
        }

        for (const attr in values) {
            setValues += (setValues === '') ? '' : ', '
            setValues += attr + " = " + values[attr]
        }

        this.query = `UPDATE ${tableName} ${setValues} ${wh}`
        return this
    }

    static toSql() {
        return this.query
    }

}

module.exports = QueryBuilder