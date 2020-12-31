Ext.define('Regardz.store.dashboard.BusinessTypeStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.dashboard.BusinessType',
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