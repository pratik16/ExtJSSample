Ext.define('Regardz.store.usermanage.AddPropertyForUserStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.usermanage.AddPropertyForUser',
    autoLoad: false,
	 proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/property/GetUserAssociatedProperty'
	 }
});