Ext.define('Regardz.store.configuration.RoleStore', {
	extend : 'Ext.data.Store',
	model : 'Regardz.model.configuration.Role',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/RoleRight/GetRolesById',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language
        }
    }
});