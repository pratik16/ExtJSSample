Ext.define('Regardz.store.property.RoomPhotoListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.RoomPhotoList',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/room/RoomPhotosPaging',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    extraParams: {
        searchParam: '', languageId: user_language
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});