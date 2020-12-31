Ext.define('Regardz.store.bookingwizard.BookingTrackingEventListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.BookingTrackingEvents',
    autoLoad: false,
    //async: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetBookingEventListByBookingId',
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