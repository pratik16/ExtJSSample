Ext.define('Regardz.store.configuration.BusinessAlertRAPRoleStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.BusinessAlertRAPRole',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/roleRight/GetRolesForCombo',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language
        }
    }
});
 