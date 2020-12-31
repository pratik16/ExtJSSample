Ext.define('Regardz.store.operations.RoomTypeStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.operations.RoomType',
	autoLoad: false,
    proxy: {
        type: 'jsonp',
        autoLoad: false,
        // url: PHPPATHTEMP + 'PlanboardRoomType.php',
        url: webAPI_path + 'api/ConfigRoomType/GetRoomTypeListforPlanboard',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

