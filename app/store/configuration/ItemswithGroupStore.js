Ext.define('Regardz.store.configuration.ItemswithGroupStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.ItemswithGroup',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/AutomatedTrace/GetItemswithGroupforAutoTrace',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language,
            searchParam: 0,
            sort: null
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});	