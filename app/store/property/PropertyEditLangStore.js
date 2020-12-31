Ext.define('Regardz.store.property.PropertyEditLangStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.Property',
    autoLoad: false,
    
	proxy: {
        type: 'jsonp',
		url: webAPI_path + 'api/property/GetPropertyMultiLang',
			
        reader: {
            type: 'json',
            root: 'data'
        },
		extraParams: {'id': 0, 'languageId': 0}
    },
    pageSize: page_size
});