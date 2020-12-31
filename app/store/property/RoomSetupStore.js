Ext.define('Regardz.store.property.RoomSetupStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.RoomSetup',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/room/GetRoomSetupDetail',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});