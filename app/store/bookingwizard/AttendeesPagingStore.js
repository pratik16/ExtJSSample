Ext.define('Regardz.store.bookingwizard.AttendeesPagingStore', {
    extend: 'Ext.data.Store',    
    model: 'Regardz.model.bookingwizard.Attendees',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/BookingAttendee/AllAttendeesPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language, searchParam: ''
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },

    pageSize: page_size
});	