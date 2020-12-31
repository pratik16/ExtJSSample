Ext.define('Regardz.store.configuration.SubDepartmentAllStore', {
	extend : 'Ext.data.Store',
	model : 'Regardz.model.configuration.SubDepartment',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/SubDepartment/GetSubDepartmentsList',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});