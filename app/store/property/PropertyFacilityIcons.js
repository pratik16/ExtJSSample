Ext.define('Regardz.store.property.PropertyFacilityIcons', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.PropertyFacilityIcons',
	id: 'PropertyFacilityIcons',
    autoLoad: false,
    // Load data from server
	
     proxy: {
        type: 'jsonp',
		
		url: webAPI_path + 'api/property/GetPropertyFacilityIcon',
		filterParam: 'filter',
		extraParams: {
			id: 0,
			languageId: user_language,
            id1: ''
		},
        reader: {
            type: 'json'
        }
    }
});