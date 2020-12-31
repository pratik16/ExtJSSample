Ext.define('Regardz.store.usermanage.UserPropertyActivityListStore', {
    extend: 'Ext.data.TreeStore',
    model: 'Regardz.model.usermanage.UserPropertyActivityList',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/roleright/GetAvailableActivitiesForUser',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});