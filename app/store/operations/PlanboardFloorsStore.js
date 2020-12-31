Ext.define('Regardz.store.operations.PlanboardFloorsStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.operations.PlanboardFloors',
	autoLoad: false,
    proxy: {
        type: 'jsonp',
        autoLoad: false,
        // url: PHPPATHTEMP + 'PlanboardRoomType.php',
        url: webAPI_path + 'api/ConfigFloor/GetFloorsforProperty',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

