Ext.define('Regardz.store.usermanage.ActivitiesListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.usermanage.ActivitiesList',
    autoLoad: false,
    
	 proxy: {
        type: 'jsonp',
        //url: PHPPATHTEMP+'activitieslist.php',
        url: webAPI_path + 'api/User/GetUserActivityDetail',
        reader: {
            type: 'json',  
            root: 'data'
        },
        extraParams: {searchString: ''}
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});