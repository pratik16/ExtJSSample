Ext.define('Regardz.store.bookingwizard.ChangeBookingStatusStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.ChangeBookingStatus',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        //url: PHPPATHTEMP + 'CheckBookingStatus.php',
        url: webAPI_path + 'api/Booking/GetBookingStatusStep5',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {}
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});	