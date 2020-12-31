Ext.define('Regardz.store.bookingwizard.BookingInvoiceSettings3Store', {
    extend: 'Ext.data.Store',
    fields: ['Name', 'TotalCount', 'TotalSum', 'SortOrder', 'ItemGroupId', 'FixedPriceId', 'ItemId', 'DataType', 'DetailIds'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Invoice/GetInvoiceSettingDetails',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0,
            id2: 0,
            languageId: user_language,
            no: 3
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});