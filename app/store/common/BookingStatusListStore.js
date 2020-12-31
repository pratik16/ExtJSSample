Ext.define('Regardz.store.common.BookingStatusListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.common.BookingStatus',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetBookingStatusCombo',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language
        }
    }
});