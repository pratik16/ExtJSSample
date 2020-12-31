Ext.define('Regardz.store.bookingwizard.EventWithItemsStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.EventWithItemsList',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetFixedPriceEvents',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {

        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});