Ext.define('Regardz.store.configuration.ItemPriceTypeStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.ItemPriceType',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigItem/GetItemPriceTypes',
        reader: {
            type: 'json'
        },
        extraParams: {
            id: 0, languageId: user_language
        }
    },
    pageSize: page_size
});