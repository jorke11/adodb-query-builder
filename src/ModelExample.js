const QueryBuilder = require("./QueryBuilder")

class OrdersHeaders extends QueryBuilder {
    static tableName = "OrdersHeaders"

    constructor() {
        super()
        this.OrderID = this.Column('integer', 2)
        this.OrderDateTime = this.Column('datetime')
        this.EmployeeID = this.Column('integer', 116)
        this.StationID = this.Column('integer', 1)
        this.OrderType = this.Column('integer', 1)
        this.CustomerID = this.Column('integer')
        this.DiniTableID = this.Column('integer')
        this.SalesTaxRate = this.Column('integer')
        this.DiscountID = this.Column('integer')
        this.DiscountAmount = this.Column('integer')
    }
}


module.exports = OrdersHeaders