Ext.define('Regardz.store.usermanage.RolesListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.usermanage.RolesList',
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        //url: PHPPATHTEMP+'roleslist.php',
        url: webAPI_path + 'api/roleright/GetRoles',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: { languageId: user_language }
    },
    
    
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});