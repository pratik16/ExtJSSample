Ext.define('Regardz.store.usermanage.AvailableUserPropertyStore', {
    extend: 'Ext.data.TreeStore',
   // model: 'Regardz.model.usermanage.UserPropertyActivityList',
    autoLoad: true,
	 proxy: {
        type: 'jsonp',
		url: PHPPATHTEMP+'UserPropertyRoleList.php'
	 }
});