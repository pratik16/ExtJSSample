Ext.define('Regardz.store.bookingwizard.infopanel.RequiredActionsStore', {
    extend: 'Ext.data.TreeStore',
   // model: 'Regardz.model.bookingwizard.infopanel.CopyReservation',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        //url: webAPI_path + 'api/Booking/GetFixedPriceDetailforBooking',
		url: PHPPATHTEMP + 'RequiredActionsStore.php',
		defaultRootId: 'data'
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});	