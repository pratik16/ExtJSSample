Ext.define('Regardz.store.bookingwizard.RoomDetailsStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.RoomDetail',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/room/GetRoomById',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams:
            { languageId: user_language}
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});