Ext.define('Regardz.store.property.CashRegisterStore', {
    extend: 'Ext.data.Store',
    //fields: ['CashRegisterId', 'CashRegisterName', 'PropertyId', 'CreatedDate', 'CreatedBy', 'UpdatedDate', 'UpdatedBy'],
    model: 'Regardz.model.property.CashRegister',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/CashRegister/GetCashRegisterList',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0, limit: page_size, start: 0, searchString: ''
        }
    },
    pageSize: page_size
});	