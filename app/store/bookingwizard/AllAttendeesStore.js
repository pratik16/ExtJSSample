Ext.define('Regardz.store.bookingwizard.AllAttendeesStore', {
    extend: 'Ext.data.Store',
    fields: ['languageId', 'AttendeesRole', 'Name', 'AttendeeID',
            {
                name: 'Attendee', mapping: 'Name',
                convert: function (v, record) {
                    return v + ' - ' + record.data.AttendeesRole;
                }
            }],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/BookingAttendee/GetAllAttendees',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});