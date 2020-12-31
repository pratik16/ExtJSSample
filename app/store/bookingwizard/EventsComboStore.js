Ext.define('Regardz.store.bookingwizard.EventsComboStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.EventsCombo',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetEventsByBookingId',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language
        }
    }
});	