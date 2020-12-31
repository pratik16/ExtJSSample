Ext.define('Regardz.store.property.OutletGlobalListPropertyStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.OutletGlobalListProperty',
    autoLoad: false,
    // Load data from server

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigOutlet/GetOutletforProperty',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
			id1: user_language
        }
    },
    pageSize: page_size
});