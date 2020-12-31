Ext.define('Regardz.store.bookingwizard.BookingTrackingItemsListStore', {
    extend: 'Ext.data.TreeStore',
    model: 'Regardz.model.bookingwizard.BookingTrackingEventItems',
    autoLoad: false,
    //async: false,
    //folderSort: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetBookingEventItemListByBookingEventId',
        reader: {
            type: 'json'            
        },
        extraParams: {

        }
    }
});