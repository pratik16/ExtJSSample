Ext.define('Regardz.store.property.RoomTypeComboStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.RoomTypeCombo',
    autoLoad: false,
    //mode: 'local',
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigRoomType/GetRoomTypeList',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

 