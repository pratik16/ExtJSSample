Ext.define('Regardz.store.property.MinimumRevenuManageStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.MinimumRevenuManage',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        //url: webAPI_path + 'api/roomprice/GetRevenueBreakdownDetails', // for test
        url: webAPI_path + 'api/roomprice/GetRevenueBreakdownDetails',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
           languageId: user_language
        }
    }
});