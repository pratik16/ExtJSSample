Ext.define('Regardz.store.company.SalesUserStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.company.SalesUser',
    autoLoad: false,
    remoteSort: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/User/SalesUsersPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language, searchString: ''
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    sorters: { property: 'FirstName', direction: 'ASC' },
    pageSize: page_size
});