Ext.define('Regardz.store.mastervalues.TaskTypeStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.mastervalues.TaskType',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/MasterValue/TaskTypePaging',
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