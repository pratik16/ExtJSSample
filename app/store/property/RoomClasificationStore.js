Ext.define('Regardz.store.property.RoomClasificationStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.RoomClasification',    
    mode: 'local',
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigRoomClassification/GetRoomClassificationByRoomId',
        //url: PHPPATHTEMP+'RoomClasificationComboStore.php',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {            
        }
    }
});