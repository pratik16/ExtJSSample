Ext.define('Regardz.store.usermanage.ActivitiesOnRoleStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.usermanage.ActivitiesOnRole',
    autoLoad: false,
	 proxy: {
            type: 'jsonp',
                //url: PHPPATHTEMP+'ActivitiesOnRole.php',
                url: webAPI_path + 'api/RoleRight/GetActivitiesByRoleId',
                reader: {
                    type: 'json',
                    root: 'data'
                }
	 }
});