Ext.define('Regardz.store.mastervalues.MarketSourceStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.mastervalues.MarketSource',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/MasterValue/MarketSourcePaging',
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