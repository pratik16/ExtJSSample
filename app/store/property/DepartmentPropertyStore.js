Ext.define('Regardz.store.property.DepartmentPropertyStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.DepartmentProperty',
    autoLoad: false,
    // Load data from server

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigDepartment/GetSubDepartmentListforProperty',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    pageSize: page_size
});