Ext.define('Regardz.store.bookingwizard.infopanel.CopyReservationStore', {
    extend: 'Ext.data.TreeStore',
   // model: 'Regardz.model.bookingwizard.infopanel.CopyReservation',
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        //url: webAPI_path + 'api/Booking/GetFixedPriceDetailforBooking',
		url: PHPPATHTEMP + 'CopyReservationStore.php',
		defaultRootId: 'data'
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});	