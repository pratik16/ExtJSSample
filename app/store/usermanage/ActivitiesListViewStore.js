Ext.define('Regardz.store.usermanage.ActivitiesListViewStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.usermanage.ActivitiesListView',
    autoLoad: false,
    
    proxy: {
        type: 'jsonp',
        //url: PHPPATHTEMP+'activitieslist.php',
        url: webAPI_path + 'api/roleright/GetAssignedActivitiesToUserByRoleId',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    baseParams: {
        limit: page_size, 
        start: 0
    },
    pageSize: page_size
});