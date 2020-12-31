Ext.define('Regardz.store.property.RoomListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.RoomList',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Room/GetRoomListByPropertyID',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});