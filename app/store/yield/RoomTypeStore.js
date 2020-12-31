Ext.define('Regardz.store.yield.RoomTypeStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.yield.RoomType',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        autoLoad: false,
        url: webAPI_path + 'api/ConfigRoomType/GetRoomTypePaging',
		
        method: 'GET',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams:
            { languageId: user_language, searchParam: '' },
    baseParams: {
        limit: page_size, start: 0
    },

    pageSize: page_size
    }
});