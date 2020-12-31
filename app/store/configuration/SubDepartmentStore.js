Ext.define('Regardz.store.configuration.SubDepartmentStore', {
	extend : 'Ext.data.Store',
	model : 'Regardz.model.configuration.SubDepartment',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/SubDepartment/GetSubDepartmentsbyDepartmentId',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    listeners: {
        load: {
            fn: function (s, r) {                
               /* if (Ext.getStore('configuration.DesignationManageStore').getCount() == 0) {
                    Ext.getStore('configuration.DesignationManageStore').load();
                }*/
            }
        }
    }
});