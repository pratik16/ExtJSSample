Ext.define('Regardz.store.demo.CustomDataStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.demo.CustomDataModel',
    //id: 'customList',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigEvents/CustomData',
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