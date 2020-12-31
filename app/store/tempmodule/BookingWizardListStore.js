Ext.define('Regardz.store.tempmodule.BookingWizardListStore', {
    extend: 'Ext.data.Store',
    fields: ['PropertyId',
        'BookingTrackingId',
       'ReservationId',
       'BookingName',
       'BookingDate',
       'FromTime',
       'ToTime'],
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Planboard/BookingWizardList',
        reader: {
            type: 'json',
            root: 'data'
        },

    }
});