Ext.define('Regardz.store.reports.ReportsListStore', {
    extend: 'Ext.data.TreeStore',
    fields: ['ReportCategoryId', 'ReportCategoryName', 'LanguageId', 'LangReportCategoryId', 'Leaf', 'Expanded', 'LangReportCategoryId', 'ParentCategoryId', 'ReportId'],
    //root: {
    //    expanded: true,
    //    ReportCategoryName: 'Financial',//Main category root folder
    //    children: [
    //        {
    //            ReportCategoryName: 'Settings', // Subcategory folder
    //            leaf: false,
    //            expanded: true,
    //            children: [
    //                 {
    //                     ReportCategoryName: 'AdmiSett', // Sub sub category child 1 folder
    //                     leaf: false,
    //                     expanded: true,
    //                     children: []
    //                 },
    //                   {
    //                       ReportCategoryName: 'AdmiSett', // Sub sub category child 2 folder
    //                       leaf: false,
    //                       expanded: true,
    //                       children: [{
    //                           ReportCategoryName: 'Report 1',//Sub sub category child 1 child 1 report
    //                           leaf: true
    //                       }, {
    //                           ReportCategoryName: 'Report 2',//Sub sub category child 1 child 2 report
    //                           leaf: true
    //                       }]
    //                   },
    //                {
    //                    ReportCategoryName: 'Report 3',  // Subcategory folder child 1 report
    //                    leaf: true
    //                },
    //                {
    //                    ReportCategoryName: 'Report 4', // // Subcategory folder child 2 report
    //                    leaf: true
    //                }
    //            ]
    //        },
    //        {
    //            ReportCategoryName: 'Admin',
    //            leaf: false,
    //            expanded: true,
    //            children: []
    //        }
    //    ]
    //},
    //autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Reports/ReportsPaging',
        reader: {
            type: 'json',
            //root: 'root'
        },
        extraParams: {

        }
    },
});