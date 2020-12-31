Ext.define('Regardz.store.property.RoomTypePropertyStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.RoomTypeProperty',
    autoLoad: false,
    // Load data from server

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigRoomType/GetRoomTypeforProperty',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
			id1: user_language
        }
    },
    pageSize: page_size
});