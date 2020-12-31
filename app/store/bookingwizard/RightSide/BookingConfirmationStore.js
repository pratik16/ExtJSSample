Ext.define('Regardz.store.bookingwizard.RightSide.BookingConfirmationStore', {
    extend: 'Ext.data.Store',
    fields: ['BookingConfirmationId', 'ReservationId', 'Version', 'SelectedBookings', 'DocumentPath', 'DocumentDescription', 'CreatedDate', 'PrintBookings', 'TotalBookings', 'VersionNo'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/BookingConfirmation/GetBookingConfirmations',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0
        }
    }
});