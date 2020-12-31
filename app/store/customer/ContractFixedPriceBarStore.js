Ext.define('Regardz.store.customer.ContractFixedPriceBarStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.customer.ContractFixedPriceBar',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Contract/ContractFixedPriceBarPaging',
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
 