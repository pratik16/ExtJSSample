Ext.define('Regardz.store.configuration.ReportsMainCategoriesStore', {
    extend: 'Ext.data.Store',
    fields: ['ReportCategoryId', 'ReportCategoryName'],
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Reports/MainCategoriesPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language
        }
    }
    //sorters: { property: 'CategoryName', direction: 'ASC' },

});