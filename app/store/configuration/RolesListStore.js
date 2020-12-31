Ext.define('Regardz.store.configuration.RolesListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.RolesList',
    autoLoad: false,
    remoteSort: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/roleright/RolesPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language, searchString: ''
        }
    },
    baseParams: {
        limit: 10, start: 0
    },
    sorters: { property: 'RoleName', direction: 'ASC' },
    pageSize: 10
});