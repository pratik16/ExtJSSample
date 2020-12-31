Ext.define('Regardz.store.configuration.RoomTypesByPropertyStore', {
    extend: 'Ext.data.Store',
    fields: ['RoomTypeId', 'RoomTypeName'],
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigRoomType/GetRoomTypeByProperyId',
        reader: {
            type: 'json',
            root: 'data'
        }

    }
});