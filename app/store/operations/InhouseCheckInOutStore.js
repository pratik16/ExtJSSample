Ext.define("Regardz.store.operations.InhouseCheckInOutStore", {
    extend: 'Ext.data.Store',
    autoLoad: false,
    fields: ["RoomName", "FromTime", "ToTime", "EventName", "CheckInDateTime", "CheckOutDateTime", "BookingEventId", "EventId"],
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/InHouse/GetEventForCheckInOut',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
