Ext.define('Regardz.store.bookingwizard.RoomSetupStore', {
    extend: 'Ext.data.Store',
    fields: ['RoomSetupId', 'Arrangement', 'IsMatchWithCapacity'],

    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetRoomSetupListForEvent',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language //languageId
        }
    }
});