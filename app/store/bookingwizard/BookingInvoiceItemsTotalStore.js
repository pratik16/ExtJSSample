Ext.define('Regardz.store.bookingwizard.BookingInvoiceItemsTotalStore', {
    extend: 'Ext.data.Store',
    fields: ['Description', 'Value', 'Id'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Invoice/GetBookingInvoiceItemsTotal',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0,
            languageId: user_language
        }
    }
});