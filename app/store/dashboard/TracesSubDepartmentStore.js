Ext.define('Regardz.store.dashboard.TracesSubDepartmentStore', {
    extend: 'Ext.data.Store',    
	model: 'Regardz.model.dashboard.TracesSubDepartment',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Trace/GetSubDepartmentforProperty',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});