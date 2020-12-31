Ext.define('Regardz.store.tempmodule.SlotStore', {
    extend: 'Ext.data.Store',
    fields: ['TimeSlotId', 'TimeSlotCode'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        autoLoad: false,
        url: webAPI_path + 'api/RoomAvailabilityBlock/GetRoomAvailabilitySlotAssociation', //GetStartSlotsByDuration',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    listeners: {
        load: {
            fn: function (s, r) {

            }
        }
    }
});