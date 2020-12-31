Ext.define('Regardz.store.bookingwizard.ReservationStatusChangeStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.ReservationStatusChange',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/WizardRightPanel/GetReservationStatusForBookingNav',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    extraParams: {
        id: 0, languageId: user_language
    }
});