const QueryBuilder = require("./QueryBuilder")

class OrdersHeaders extends QueryBuilder {
    static tableName = "OrdersHeaders"

    constructor() {
        super()
        this.OrderID = this.Column('integer')
        this.OrderDateTime = this.Column('datetime')
        this.EmployeeID = this.Column('integer', 116)
        this.StationID = this.Column('integer', 1)
        this.OrderType = this.Column('integer', 1)
        this.OrderStatus = this.Column('integer', 1)
        this.CustomerID = this.Column('integer')
        this.DiniTableID = this.Column('integer')
        this.SalesTaxRate = this.Column('integer',8)
        this.SalesTaxAmountUsed = this.Column('integer',0)
        this.DiscountID = this.Column('integer')
        this.DiscountAmount = this.Column('integer')
        this.AmountDue = this.Column('integer',0)
        this.SubTotal = this.Column('integer',0)
        this.RowGUID = this.Column('uuid')
    }

}


module.exports = OrdersHeaders