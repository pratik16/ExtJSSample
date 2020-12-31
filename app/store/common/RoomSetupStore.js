Ext.define('Regardz.store.common.RoomSetupStore', {
    extend: 'Ext.data.Store',
    fields: ['RoomSetupId', 'Arrangement'],

    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/room/GetRoomSetupDetail',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language //languageId
        }
    }
});