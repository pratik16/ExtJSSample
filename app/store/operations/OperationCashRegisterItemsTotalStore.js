Ext.define('Regardz.store.operations.OperationCashRegisterItemsTotalStore', {
    extend: 'Ext.data.Store',
    fields: ['TotalPrice', 'Name', 'EnteredPrice'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/OperationDirectSales/GetCashRegisterClosureTotalList',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            cashRegisterId: 0, propertyId: 0, isClosed: false, isTotal: true, date: null, languageId: user_language
        }
    }
});