Ext.define('Regardz.store.configuration.SlotStore', {
    extend: 'Ext.data.Store',
    fields: ['TimeSlotId', 'TimeSlotCode'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        autoLoad: false,
        url: webAPI_path + 'api/configProgramDefinition/GetStartSlotsByDuration',
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