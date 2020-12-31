Ext.define('Regardz.store.customer.IndividualMailingCodeStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.customer.IndividualMailingCode',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Individual/GetIndividualMailingCode',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language, id1: 0, lang: 0
        }
    },
    pageSize: page_size
});