Ext.define('Regardz.store.bookingwizard.BookingInvoiceSearchItemsStore', {
    extend: 'Ext.data.Store',
    fields: ['ItemId', 'ItemGroupId', 'ItemName', 'NetPrice', 'Vat', 'VatRateBreakDownId', 'VatRateValue', 'IsItemGroup', 'BarId','IsBedRoomItem'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Invoice/GetItemListWithPriceInvoice',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            bookingId: 0, bookingTrackingId: 0, itemCategoryId: 0, barId: 0, filterText: '', languageId: user_language
        }
    }
});