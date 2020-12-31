Ext.define('Regardz.store.configuration.DesignationBySubDepartmentStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.DesignationManage',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Designation/GetDesignation',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});	