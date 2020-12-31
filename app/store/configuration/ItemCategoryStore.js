Ext.define('Regardz.store.configuration.ItemCategoryStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.ItemCategory',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigItem/ItemCategoryPaging',
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