Ext.define('Regardz.store.configuration.ReportParametersTypeListStore', {
    extend: 'Ext.data.Store',
    fields: ['ReportParameterTypeId', 'TypeName', 'TypeCode'],
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Reports/GetParameterTypes',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
