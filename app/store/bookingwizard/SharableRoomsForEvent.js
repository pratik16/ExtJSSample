Ext.define('Regardz.store.bookingwizard.SharableRoomsForEvent', {
    extend: 'Ext.data.Store',
    fields: ['RoomId', 'RoomName', 'MaxSharingCapacity', 'IsChecked', 'PersonCount'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetAllSharableRooms',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {

        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});