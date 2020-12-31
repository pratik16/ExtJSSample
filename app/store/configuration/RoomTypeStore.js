Ext.define('Regardz.store.configuration.RoomTypeStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.RoomType',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigRoomType/GetRoomTypePaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: 
            { languageId: user_language, searchParam: ''}
        
    },
    baseParams: {
        limit: page_size, start: 0
    },

    pageSize: page_size
});	