Ext.define('Regardz.store.company.BuyingReasonListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.company.BuyingReason',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/company/BuyingReasonsPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language, id1: 0
        }
    },
    pageSize: page_size
});