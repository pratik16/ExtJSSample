Ext.define('Regardz.store.tempmodule.BookingTrackingListStore', {
    extend: 'Ext.data.Store',
    fields: ['PropertyId',
        'BookingTrackingId',
       'ReservationId',
       'BookingName',
       'StatusId',
       'BookingDate',
       'FromTime',
       'StepNumber',
       'ToTime'],
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Planboard/BookingTrackingList',
        reader: {
            type: 'json',
            root: 'data'
        }

    },
    listeners: {
        
        'load': function (t, e) {
            t.sort({
                property: 'BookingTrackingId',
                direction: "DESC"
            });
        }
    }
});