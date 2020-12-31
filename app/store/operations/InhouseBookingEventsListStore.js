Ext.define("Regardz.store.operations.InhouseBookingEventsListStore", {
    extend: 'Ext.data.Store',
    autoLoad: false,
    fields: ["BookingEventId", "EventId", "EventName", "RoomName", "EventRoomName"],
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/InHouse/GetBookingEventsList',
        extraParams: {
            id1: user_language
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
