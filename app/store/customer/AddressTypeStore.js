Ext.define('Regardz.store.customer.AddressTypeStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.customer.AddressType',
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/MasterValue/AddressTypePaging',
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