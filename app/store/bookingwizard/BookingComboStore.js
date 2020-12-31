Ext.define('Regardz.store.bookingwizard.BookingComboStore', {
    extend: 'Ext.data.Store',
    fields: ['Description', 'BookingId'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Invoice/GetBookingsByReservationId',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});