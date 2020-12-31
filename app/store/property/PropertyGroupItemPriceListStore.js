Ext.define('Regardz.store.property.PropertyGroupItemPriceListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.PropertyGroupItemPriceList',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ItemExemption/GetItemGroupExemptionPriceDetail',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

 