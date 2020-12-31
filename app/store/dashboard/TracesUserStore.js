Ext.define('Regardz.store.dashboard.TracesUserStore', {
    extend: 'Ext.data.Store',    
	model: 'Regardz.model.dashboard.TracesUser',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Trace/GetUserforPropertySubDepartment',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});