Ext.define('Regardz.store.bookingwizard.BookingConfirmationStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.BookingConfirmation',
    autoLoad: true,
	groupField: 'item',
    proxy: {
        type: 'jsonp',
        //url: webAPI_path + 'api/Booking/GetFixedPriceDetailforBooking',
		url: PHPPATHTEMP + 'BookingConfirmation.php',
		
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