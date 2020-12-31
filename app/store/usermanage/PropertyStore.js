Ext.define('Regardz.store.usermanage.PropertyStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.usermanage.Property',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/user/UserPropertyPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0, languageId: user_language, searchString: ''
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },    
    pageSize: page_size
});