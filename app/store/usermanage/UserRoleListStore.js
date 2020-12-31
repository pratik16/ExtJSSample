Ext.define('Regardz.store.usermanage.UserRoleListStore', {
    extend: 'Ext.data.TreeStore',
    fields: ['RoleId', 'RoleName', 'ActivityId', 'ActivityName', 'RoleGroupCode', 'IsGlobal', 'text', 'itemid'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/user/GetRolesByGroup',
        defaultRootId: 'data',
        extraParams: { languageId: user_language, id: 0, id2: 0 }
    },
    root: {
        text: 'Roles List',
        expanded: true
    }
});
