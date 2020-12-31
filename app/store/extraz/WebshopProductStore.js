Ext.define('Regardz.store.extraz.WebshopProductStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.extraz.WebshopProduct',
    autoLoad: false,
    remoteSort: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ExtrazWebshop/WebshopProductPaging',
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
    sorters: { property: 'Item', direction: 'ASC' },
    pageSize: page_size
});