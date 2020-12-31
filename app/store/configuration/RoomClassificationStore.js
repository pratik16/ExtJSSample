Ext.define('Regardz.store.configuration.RoomClassificationStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.RoomClassification',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigRoomClassification/GetRoomClassiPaging',
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