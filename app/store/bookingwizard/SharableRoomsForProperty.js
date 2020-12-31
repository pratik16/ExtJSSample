Ext.define('Regardz.store.bookingwizard.SharableRoomsForProperty', {
    extend: 'Ext.data.Store',
    fields: ['RoomId', 'RoomName', 'LanguageId', 'ExternalName'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/booking/GetSharableRoomsByBooking',
        reader: {
            type: 'json',
            root: 'data'
        }
    },


});