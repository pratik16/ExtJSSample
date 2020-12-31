Ext.define('Regardz.store.property.PropertyFeatureType2Store', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.PropertyFeatureTypeStore',
	//id: 'PropertyFeatureTypeStore',
    autoLoad: false,
    // Load data from server
	
     proxy: {
        type: 'jsonp',
       
		url: webAPI_path+'api/property/PropertyFeatureWithTypes',
		extraParams: {
			id: 0,
			languageId: 0,
            propertyFeatureId: 1
		},
		filterParam: 'filter',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});