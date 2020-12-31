Ext.define('Regardz.store.configuration.EventsStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.Events',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigEvents/EventsPaging',
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