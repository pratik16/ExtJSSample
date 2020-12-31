Ext.define('Regardz.store.bookingwizard.infopanel.CancelConditionsStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.infopanel.CancelConditions',
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        //url: webAPI_path + 'api/Booking/GetFixedPriceDetailforBooking',
		url: PHPPATHTEMP + 'CancelConditionsStore.php',
		
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