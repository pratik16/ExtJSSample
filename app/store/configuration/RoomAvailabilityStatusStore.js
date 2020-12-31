Ext.define('Regardz.store.configuration.RoomAvailabilityStatusStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.RoomAvailabilityStatus',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigRoomAvailability/GetAddRoomAvailabilityStatusPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            propertyid: 1
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },

    pageSize: page_size
});	