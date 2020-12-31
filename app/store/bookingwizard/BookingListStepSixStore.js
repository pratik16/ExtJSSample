Ext.define('Regardz.store.bookingwizard.BookingListStepSixStore', {
    extend: 'Ext.data.Store',
    fields: ['ReservationId', 'BookingTrackingId', 'BookingId', 'BookingDate', 'BookingName', 'Location', 'NetPrice', 'Vat', 'GrossPrice', 'Checked'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetBookingListForStep6',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
});
