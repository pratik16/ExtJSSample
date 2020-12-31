Ext.define('Regardz.store.configuration.ReportParameterListStore', {
    extend: 'Ext.data.Store',
    fields: ['ReportId', 'ReportParameterId', 'ReportParameterTypeId', 'Code', 'Length', 'IsMandatory', 'DefaultValue', 'Description', 'Name', 'TypeName'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Reports/GetReportParameters',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language,
            reportId: 0
        }
    }
});

