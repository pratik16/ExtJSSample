Ext.define('Regardz.store.configuration.BusinessAlertDepartmentStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.BusinessAlertDepartment',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/SubDepartment/GetSubDepartmentForCombo',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    baseParams: {
        limit: 0, start: 0
    },
    pageSize: page_size
});
 