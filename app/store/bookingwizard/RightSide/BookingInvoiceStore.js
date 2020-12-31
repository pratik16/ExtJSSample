Ext.define('Regardz.store.bookingwizard.RightSide.BookingInvoiceStore', {
    extend: 'Ext.data.Store',
    fields: ['BookingCreditDebitInvoiceId', 'BookingId', 'ReservationId', 'CreatedDate', 'AFASInvoiceId', 'BookingNumber', 'InvoiceFileName'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Invoice/GetBookingInvoicesByReservationId',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0
        }
    }
});