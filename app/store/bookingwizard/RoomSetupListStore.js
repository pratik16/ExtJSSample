Ext.define('Regardz.store.bookingwizard.RoomSetupListStore', {
    extend: 'Ext.data.Store',
    fields: ['Arrangement', 'Description'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/room/GetRoomSetupList',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0,
            languageId: user_language
        }
    }
});