Ext.define('Regardz.store.configuration.RightsPerRoleStore', {
    extend: 'Ext.data.TreeStore',
    model: 'Regardz.model.configuration.RightsPerRole',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/RoleRight/GetRightsPerRoles',
        defaultRootId: 'data'
    },
    root: {
        text: 'Rights for Selected Role',
        expanded: true
    }
});