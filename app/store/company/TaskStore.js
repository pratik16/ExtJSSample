Ext.define('Regardz.store.company.TaskStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.company.Task',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Task/GetTasksForCustomer',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0, id1: 0, languageId: user_language, searchString: ''
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});	