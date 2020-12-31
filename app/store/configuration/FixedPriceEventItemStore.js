Ext.define('Regardz.store.configuration.FixedPriceEventItemStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.FixedPriceEventItem',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/FixedPrice/FixedPriceEventItemPaging',
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
    }//,
    //pageSize: page_size
});	