Ext.define('Regardz.store.configuration.ItemStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.Item',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigItem/ItemPaging',
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