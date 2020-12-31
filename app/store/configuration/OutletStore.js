Ext.define('Regardz.store.configuration.OutletStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.Outlet',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigOutlet/OutletPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});	