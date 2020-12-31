Ext.define('Regardz.store.configuration.ReportsMaintenanceListStore', {
    extend: 'Ext.data.Store',
    fields: ['ReportId', 'ReportType', 'IsHtml', 'IsExcel', 'IsWord', 'IsCSV', 'IsPDF', 'IsActive', 'ReportParameterCount', 'ReportName', 'ReportTypeText', 'ReportCategoryIds'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Reports/GetMaintenanceReports',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language,
            filter: '',
        }
    }

});
