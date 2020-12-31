Ext.define('Regardz.store.property.PropertyRoomTypeListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.PropertyRoomTypeList',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigRoomType/RoomTypeGlobalPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
           languageId: user_language
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },

    pageSize: page_size
});	