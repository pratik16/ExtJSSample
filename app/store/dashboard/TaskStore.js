Ext.define('Regardz.store.dashboard.TaskStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.dashboard.Task',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Task/GetTaskListForDeshboard',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});