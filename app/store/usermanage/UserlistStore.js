Ext.define('Regardz.store.usermanage.UserlistStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.usermanage.Userlist',
    autoLoad: false,
    remoteFilter: true,
    remoteSort: true,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/User/GetUsers',
        reader: {
            type: 'json',
            root: 'data'
        },
        baseParams: {
            limit: page_size
        },
        extraParams: { searchString: "" }
    },
    sorters: { property: 'FirstName', direction: 'ASC' },
    pageSize: page_size
});