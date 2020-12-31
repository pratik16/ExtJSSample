Ext.define('Regardz.store.bookingwizard.ReductionStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.Reduction',
    autoLoad: false,
	proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetBookinItemListForReduction',
        reader: {
            type: 'json',
            root: 'data'
        },
      
    }
});	