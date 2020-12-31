Ext.define('Regardz.store.property.RoomListComboStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.RoomListCombo',
    autoLoad: false,
    //mode: 'local',
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/room/GetRoomListComboForYield',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

 