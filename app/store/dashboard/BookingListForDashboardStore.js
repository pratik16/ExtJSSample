Ext.define('Regardz.store.dashboard.BookingListForDashboardStore', {
    extend: 'Ext.data.Store',
    fields: ['StepNumber', 'BookingId', 'BookingTrackingId'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/DraftQuatation/GetBookingListForDashboard',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    extraParams: {
        id: 0
    }
});