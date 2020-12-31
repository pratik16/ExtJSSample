Ext.define('Regardz.store.common.ItemCategoryStore', {
    extend: 'Ext.data.Store',
    fields: ['ItemCategoryId', 'ItemCategoryName'],

    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigItem/GetItemCategoryForName',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language //languageId
        }
    }
});