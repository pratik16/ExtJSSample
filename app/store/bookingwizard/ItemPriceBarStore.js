Ext.define('Regardz.store.bookingwizard.ItemPriceBarStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.ItemPriceBarModel',

    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetItemOrITemGroupPriceDetail',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});