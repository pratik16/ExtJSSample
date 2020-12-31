Ext.define('Regardz.store.common.EventListForProgramDefinitionStore', {
    extend: 'Ext.data.Store',
    fields: ['EventId', 'EventName'],
    autoLoad: true,
    // Load data from server

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigEvents/GetEventListForProgDefi',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language
        }
    }
});