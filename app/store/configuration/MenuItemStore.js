Ext.define('Regardz.store.configuration.MenuItemStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.MenuItem',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigItem/MenuItemPaging',
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