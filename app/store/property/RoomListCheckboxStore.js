Ext.define('Regardz.store.property.RoomListCheckboxStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.RoomListCheckbox',
    autoLoad: false,
	mode: 'local',
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Room/GetBlockedLinkedRoomDetail',
       // url: PHPPATHTEMP+'RoomTypeComboStore.php',
        reader: {
            type: 'json',
			root: 'data'
        }
    },
    extraParams: {
      languageId: user_language
    }
});