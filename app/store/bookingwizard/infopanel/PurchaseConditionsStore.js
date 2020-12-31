Ext.define('Regardz.store.bookingwizard.infopanel.PurchaseConditionsStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.infopanel.PurchaseConditions',	        
	fields: ['property', 'invoice', 'room', 'items', 'fixed', 'kick_back', 'commision', 'fixedbar', 'bedroom_price'],
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        //url: webAPI_path + 'api/Booking/GetFixedPriceDetailforBooking',
		url: PHPPATHTEMP + 'PurchaseConditionsStore.php',
		
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