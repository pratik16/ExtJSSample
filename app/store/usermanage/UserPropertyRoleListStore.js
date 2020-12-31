Ext.define('Regardz.store.usermanage.UserPropertyRoleListStore', {
    extend: 'Ext.data.TreeStore',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/RoleRight/GetActivityByGroup',
        defaultRootId: 'data'
    },
    root: {
        text: 'Rights List',
        expanded: true
    }
});


//GetRolesWithActivity