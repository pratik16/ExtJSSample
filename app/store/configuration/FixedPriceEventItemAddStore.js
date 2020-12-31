Ext.define('Regardz.store.configuration.FixedPriceEventItemAddStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.FixedPriceEventItemAdd',
    //autoLoad: true,
    autoLoad: false,
    //pageSize: 5,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/FixedPrice/GetItemByEventId',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            //languageId: user_language
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});	