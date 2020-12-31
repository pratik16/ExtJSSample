Ext.define('Regardz.store.configuration.FixedPriceManageEventsStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.FixedPriceManageEvents',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/FixedPrice/FixedPriceEventPaging',
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