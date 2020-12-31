Ext.define('Regardz.store.configuration.RoomsByPropertyAndTypeStore', {
    extend: 'Ext.data.Store',
    fields: ['RoomId', 'RoomName'],
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Room/GetRoomsByPropertyAndType',
        reader: {
            type: 'json',
            root: 'data'
        }

    }
});