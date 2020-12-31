Ext.define('Regardz.store.bookingwizard.infopanel.CompeditorStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.infopanel.Compeditor',
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        //url: webAPI_path + 'api/Booking/GetFixedPriceDetailforBooking',
		url: PHPPATHTEMP + 'CompeditorStore.php',
		
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