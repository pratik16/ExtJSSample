Ext.define('Regardz.store.configuration.EventsListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.Events',
	//id: 'EventsList',
    autoLoad: false,
    // Load data from server
     
     proxy: {
        type: 'jsonp',

        url: webAPI_path + 'api/ConfigEvents/GetEventList',
		filterParam: 'filter',
		extraParams: {
			id: 0,
			languageId: 0
		},
        reader: {
            type: 'json'
        }
    }
});