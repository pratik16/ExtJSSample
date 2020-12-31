Ext.define('Regardz.store.dashboard.OutgoingTracesStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.dashboard.IncomingTraces',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Trace/GetOutGoingTracesForUser',
        reader: {
            type: 'json',
            root: 'data'
        },
		 extraParams: {
            id: user_language
        }
    }
});