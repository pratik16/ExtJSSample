Ext.define('Regardz.store.configuration.FixedPriceEventItemGroupStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.FixedPriceEventItemGroup',
    //autoLoad: true,
    autoLoad: false,
    //pageSize: 5,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/FixedPrice/GetItemGroupByEventId',
        reader: {
            type: 'json',
            root: 'data'
        }     
    }
});	