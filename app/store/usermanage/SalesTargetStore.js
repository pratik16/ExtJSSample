Ext.define('Regardz.store.usermanage.SalesTargetStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.usermanage.SalesTargetList',
    autoLoad: false,
    proxy: {
        type: 'jsonp',        
        url: webAPI_path + 'api/User/SalesTargetwithUser',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: { languageId: user_language }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});