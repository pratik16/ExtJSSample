Ext.define('Regardz.store.bookingwizard.AllAttendeesRoleStore', {
    extend: 'Ext.data.Store',
    fields: ['LanguageId', 'AttendeesRole', 'LangAttendeeRoleId', 'AttendeeRoleId'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/BookingAttendee/GetAllAttendeesRole',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});