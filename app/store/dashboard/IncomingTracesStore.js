Ext.define('Regardz.store.dashboard.IncomingTracesStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.dashboard.IncomingTraces',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Trace/GetIncomingTracesForUser',
        reader: {
            type: 'json',
            root: 'data'
        },
		 extraParams: {
            id: user_language
        }
    }
});