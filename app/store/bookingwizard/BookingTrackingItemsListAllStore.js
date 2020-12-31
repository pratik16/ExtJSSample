Ext.define('Regardz.store.bookingwizard.BookingTrackingItemsListAllStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.BookingTrackingEventItems',
    autoLoad: false,
    //async: false,
    proxy: {
        type: 'jsonp',
       // type: 'memory',
        url: webAPI_path + 'api/Booking/GetItemListForBookingByEventId',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    baseParams: {
        limit: 10, start: 0
    },
    pageSize: 10
});