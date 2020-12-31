Ext.define('Regardz.store.common.TimeSlotStore', {
    extend: 'Ext.data.Store',
    fields: ['TimeSlotId', 'TimeSlotCode'],

    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/configProgramDefinition/GetStartSlotsByDuration',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});