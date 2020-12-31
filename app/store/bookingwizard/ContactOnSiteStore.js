Ext.define('Regardz.store.bookingwizard.ContactOnSiteStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.ContactOnSite',
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        //url: webAPI_path + 'api/Booking/GetFixedPriceDetailforBooking',
		url: PHPPATHTEMP + 'ContactOnSiteStore.php',
		
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