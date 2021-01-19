const moment = require("moment")

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
            obj.value = moment().format("YYYY-MM-DD H:mm")
        }

        return obj
    }


    save() {
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


        this.query = `INSERT INTO ${this.constructor.tableName} ${query}`
        console.log('this.query',this.query)
        console.log('ConnectDB',ConnectDB)
    }

    static where(conditionals) {
        let wh = "WHERE "
        for (const attr in conditionals) {
            wh += (wh === '') ? '' : ' AND '
            wh += attr + " = " + conditionals[attr]
        }

        this.query = `SELECT * FROM ${this.tableName} ${wh};`;
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