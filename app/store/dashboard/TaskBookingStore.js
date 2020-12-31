Ext.define('Regardz.store.dashboard.TaskBookingStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.dashboard.TaskBooking',
    autoLoad: false,
    remoteSort: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Task/GetBookingForTask',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0, languageId: user_language, searchParam: ''
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    sorters: { property: 'BookingName', direction: 'ASC' },
    pageSize: page_size
});	