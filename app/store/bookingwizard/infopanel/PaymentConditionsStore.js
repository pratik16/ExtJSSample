Ext.define('Regardz.store.bookingwizard.infopanel.PaymentConditionsStore', {
    extend: 'Ext.data.Store',
    //model: 'Regardz.model.bookingwizard.infopanel.PaymentConditions',
	fields: ['description', 'condition'],
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        //url: webAPI_path + 'api/Booking/GetFixedPriceDetailforBooking',
		url: PHPPATHTEMP + 'PaymentConditionsStore.php',
		
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