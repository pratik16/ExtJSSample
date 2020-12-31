Ext.define('Regardz.store.bookingwizard.MultipleDaysListEvent', {
    extend: 'Ext.data.Store',
    fields: ['Date', 'DateString'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/booking/GetBookingDateRange',
        reader: {
            type: 'json',
            root: 'data'
        }
    },


});