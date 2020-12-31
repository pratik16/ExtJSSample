Ext.define('Regardz.store.operations.RoomSetupStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.operations.RoomSetup',
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        autoLoad: true,
        url: webAPI_path + 'api/Room/GetRoomSetupDetail',
        // url: PHPPATHTEMP + 'PlanboardRoomSetup.php',
        extraParams: {
            id: user_language
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    listeners: {
        load: function (store, records, options) {

            var index = store.findExact('RoomSetupId', -1);

            if (index == -1) {
                store.add({
                    RoomSetupId: -1,
                    Arrangement: "Room Setup"//.l('SC33000')
                });

                store.sort('RoomSetupId', 'ASC');
                store.commitChanges();
                store.loadData(store.data.items);
            }     
        }
    }
});

