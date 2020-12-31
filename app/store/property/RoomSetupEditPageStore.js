Ext.define('Regardz.store.property.RoomSetupEditPageStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.RoomSetup',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/room/GetRoomCapacityDetail',
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