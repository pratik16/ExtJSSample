Ext.define('Regardz.store.dashboard.TaskTypeStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.dashboard.TaskType',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Task/GetTaskTypeCombo',
        reader: {
            type: 'json',
            root: 'data'
        },
		 extraParams: {
            id: user_language
        }
    }
});