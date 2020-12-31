Ext.define('Regardz.store.bookingwizard.infopanel.BookingHistoryStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.infopanel.BookingHistory',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/WizardRightPanel/GetBookingHistoryData',        
//      url: webAPI_path + 'api/Booking/GetFixedPriceDetailforBooking',
//		url: PHPPATHTEMP + 'BookingHistoryStore.php',		
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