Ext.define('Regardz.store.bookingwizard.FixedPriceEventsStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.FixedPriceEvent',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetFixedPriceEventbyId',
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