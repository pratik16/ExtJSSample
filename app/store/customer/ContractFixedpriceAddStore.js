Ext.define('Regardz.store.customer.ContractFixedPriceAddStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.customer.ContractFixedPriceAdd',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Contract/GetFixedPricePropertywise',
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