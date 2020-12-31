Ext.define('Regardz.store.bookingwizard.ReservationDetails', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.BookingWizard',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetReservation',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0,
            fromTable: 0
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});