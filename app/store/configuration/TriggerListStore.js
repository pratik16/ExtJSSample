Ext.define('Regardz.store.configuration.TriggerListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.TriggerList',
	//id: 'EventsList',
    autoLoad: false,
	remoteSort : true,
    // Load data from server
     
     proxy: {
        type: 'jsonp',

        url: webAPI_path + 'api/Alert/GetBusinessAlertList',		
        reader: {
            type: 'json',
			 root: 'data'
        },
		extraParams : {
			id : 0,
			searchParam : '',
			languageId: user_language
		}
    },
	sorters : {
		property : 'AlertName',
		direction : 'ASC'
	},
	pageSize : page_size
});