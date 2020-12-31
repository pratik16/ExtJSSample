Ext.define('Regardz.store.bookingwizard.RightSide.CostOfCancelationStore', {
    extend: 'Ext.data.TreeStore',
    fields: ['ReservationId', 'text', 'Status', 'CancelCost', 'TotalPrice', 'children'],
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/BookingCancellation/GetCancellationCost',             
        reader: {
            type: 'json',
            root: 'children'
        },
        extraParams: {
            id: 0, id1: 0, id2: 0, id3: 0
        }
    }
});