Ext.define('Regardz.store.bookingwizard.BookingAdvancePaymentDetailsStore', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    fields: [
        'BookingId',
        'BookingTrackingId',
        'DownPayment',
        'DownPaymentPercentage',
        'ApprovalCode',
        'AdvancePaymentStatus'
    ],
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetBookingAdvancePaymentDetails',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            bookingId: 0, bookingTrackingId: 0, languageId: user_language
        }
    }
});