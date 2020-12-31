Ext.define('Regardz.store.bookingwizard.infopanel.CostOfCancellationStore', {
    extend: 'Ext.data.TreeStore',
   // model: 'Regardz.model.bookingwizard.infopanel.CostOfCancellation',
	fields : [{
			name : 'Description',
			type : 'string'
		}, {
			name : 'Status',
			type : 'string'
		}, {
			name : 'Price',
			type : 'string'
		}, {
			name : 'Cost',
			type : 'string'
		}
	],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        //url: webAPI_path + 'api/Booking/GetFixedPriceDetailforBooking',
		url: PHPPATHTEMP + 'CostOfCancellationStore.php',
		defaultRootId: 'data'
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});