Ext.define('Regardz.store.extraz.ExtrazCategoriesListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.extraz.ExtrazCategories',
    autoLoad: false,
    remoteSort: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ExtrazWebshop/WebshopCategoriesPaging',
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
    sorters: { property: 'Name', direction: 'ASC' },
    pageSize: page_size
});