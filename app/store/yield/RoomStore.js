Ext.define('Regardz.store.yield.RoomStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.yield.Room',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        autoLoad: false,
        url: webAPI_path + 'api/Room/GetRoomsByRoomTypeId',
		
        method: 'GET',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});