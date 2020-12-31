Ext.define('Regardz.store.configuration.ItemListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.Item',
	//id: 'EventsList',
    autoLoad: false,
    // Load data from server
     
     proxy: {
        type: 'jsonp',

        url: webAPI_path + 'api/ConfigItemGroup/GetItemListForItemGroup',
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