Ext.define('Regardz.store.bookingwizard.infopanel.ChangeReservationStatusStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.infopanel.ChangeReservationStatus',
    autoLoad: false,
	proxy: {
        type: 'jsonp',
        url: PHPPATHTEMP + 'ChangeReservationStatus.php',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});	