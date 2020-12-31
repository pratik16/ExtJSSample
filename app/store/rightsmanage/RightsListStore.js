Ext.define('Regardz.store.rightsmanage.RightsListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.rightsmanage.Rights',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/RoleRight/ActivitiesPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            limit: page_size, languageId: user_language, searchString: ''
        },
        baseParams: {
            start: 0
        }
    },
    pageSize: page_size
});	