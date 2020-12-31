Ext.define('Regardz.store.property.MinimumRevenueStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.MinimumRevenue',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/roomprice/RevenueBreakdownPaging',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});