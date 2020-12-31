Ext.define('Regardz.store.configuration.ReportsCategoryStructureStore', {
    extend: 'Ext.data.TreeStore',
    fields: ['ReportCategoryId', 'ReportCategoryName', 'LanguageId', 'LangReportCategoryId', 'Leaf', 'Expanded', 'LangReportCategoryId', 'ParentCategoryId'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Reports/CategoryStructurePaging',
        reader: {
            type: 'json',
        },

    }
});