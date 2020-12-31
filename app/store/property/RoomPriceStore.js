Ext.define('Regardz.store.property.RoomPriceStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.RoomPrice',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        //url: webAPI_path + 'api/roomprice/GetRevenueBreakdownDetails', // for test
        url: webAPI_path + 'api/roomprice/PropertyBreakDownPaging',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});