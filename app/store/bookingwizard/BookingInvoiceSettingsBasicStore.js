Ext.define('Regardz.store.bookingwizard.BookingInvoiceSettingsBasicStore', {
    extend: 'Ext.data.Store',
    fields: ['IndividualName', 'IndividualId', 'CompanyName', 'CompanyId'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Invoice/GetInvoiceSettingSection1Details',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});