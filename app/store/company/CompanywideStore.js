Ext.define('Regardz.store.company.CompanywideStore', {
    extend: 'Ext.data.TreeStore',
    //model: 'Regardz.model.company.Companywide',
    fields: ['CompanyId', 'CompanyName', 'ParentCompanyId', 'Level', 'FirstYearOwn', 'FirstYearTotal', 'SecondYearOwn', 'SecondYearTotal', 'ThirdYearOwn', 'ThirdYearTotal',
            'FirstYear', 'SecondYear', 'ThirdYear', 'FirstYearRevenueOwn', 'SecondYearRevenueOwn', 'ThirdYearRevenueOwn',
            'FirstYearRevenueTotal', 'SecondYearRevenueTotal', 'ThirdYearRevenueTotal', 'FirstYearPercentage', 'SecondYearPercentage', 'ThirdYearPercentage'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/CompanySales/GetCompanyWideDetails',
        reader: { type: 'json' },
        defaultRootId: 'data',
        extraParams: {
            id: 0, languageId: user_language
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});	