Ext.define('Regardz.store.bookingwizard.EventListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.EventList',
    autoLoad: false,
    //async: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetFixedPriceDetailforBooking',
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