Ext.define('Regardz.store.bookingwizard.BookingInvoiceItemsStore', {
    extend: 'Ext.data.Store',
    fields: ['ItemId', 'ItemName', 'Price', 'Quantity', 'Reduction', 'Total', 'SortOrder', 'Vat', 'VatRateBreakDownId', 'VatRateValue', 'PriceWOVat', 'TotalWOVat', 'IsItemGroup', 'ItemGroupId', 'BarId'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Invoice/GetItemsByItemCategoryIdBarId',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: -1,
            id2: -1,
            languageId: user_language
        }
    }
});