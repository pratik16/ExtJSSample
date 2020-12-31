Ext.define('Regardz.store.customer.ContractDiscountStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.customer.ContractDiscount',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Contract/ContractDiscountPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});
 