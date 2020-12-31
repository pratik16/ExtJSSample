Ext.define('Regardz.store.bookingwizard.SchedulerEventStore', {
    extend: 'Sch.data.EventStore',
    model: 'Regardz.model.bookingwizard.SchedulerEventModel',
    proxy: {
        type: 'jsonp',
        autoLoad: false,
        url: webAPI_path + 'api/Planboard/GetAllRoomsForScheduler',
        method: 'POST',
        extraParams: {
            'start': 0,
            'limit': 0,
            'languageId': 0,
            'filter': {}
        },
        reader: {
            type: 'json',
            root: 'data'
        }

    }
});

