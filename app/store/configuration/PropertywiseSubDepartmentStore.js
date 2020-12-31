Ext.define('Regardz.store.configuration.PropertywiseSubDepartmentStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.PropertywiseSubDepartment',
    groupField: 'PropertyName',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/AutomatedTrace/PropertyWiseSubDepartment',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {            
            languageId: user_language
        }
    }
});	