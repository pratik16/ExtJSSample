Ext.define('Regardz.store.bookingwizard.MultipleDaysList', {
    extend: 'Ext.data.Store',
    fields: ['Date', 'DateString'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/booking/ProcessMultipleDates',
        reader: {
            type: 'json',
            root: 'data'
        }
    },


});