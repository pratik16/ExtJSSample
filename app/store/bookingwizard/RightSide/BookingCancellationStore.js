Ext.define('Regardz.store.bookingwizard.RightSide.BookingCancellationStore', {
    extend: 'Ext.data.TreeStore',    
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/BookingCancellation/GetCancellationCost',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0, id1: 0, id2: 0, id3: 0
        }
    }
});

