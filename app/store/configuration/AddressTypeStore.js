
Ext.define('Regardz.store.configuration.AddressTypeStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.customer.AddressType',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/MasterValue/AddressTypePaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            //languageId: user_language
        }
    },
    baseParams: {
        limit: 0, start: 0
    },
    pageSize: page_size
});
 