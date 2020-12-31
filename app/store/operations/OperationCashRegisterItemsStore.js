Ext.define('Regardz.store.operations.OperationCashRegisterItemsStore', {
    extend: 'Ext.data.Store',
    fields: ['OperationDirectSalesId', 'CreatedDate', 'Receipt', 'Price', 'Quantity', 'TotalPrice', 'ItemName', 'Initial', 'Name'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/OperationDirectSales/GetCashRegisterClosureList',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            cashRegisterId: -1, propertyId: -1, isClosed: false, isTotal: false, date: new Date(), languageId: user_language
        }
    }
});