Ext.define('Regardz.store.usermanage.GlobalActivitiesStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.usermanage.ActivitiesListView',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/User/GetGlobalActivityDetail',
        reader: {
            type: 'json',
            root: 'data'
        }
    },    
    pageSize: page_size
});