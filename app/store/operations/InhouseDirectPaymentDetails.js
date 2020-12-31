Ext.define("Regardz.store.operations.InhouseDirectPaymentDetails", {
    extend: 'Ext.data.Store',
    autoLoad: false,
    fields: [
        'BookingId',
        'DownPayment',
        'AmountPaid',
        'BookingAmount',
        'DownPaymentOpen',
        'PaymentOpen'
    ],
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetBookingPaymentDetails',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            bookingId: 0, languageId: user_language
        }
    }
});
