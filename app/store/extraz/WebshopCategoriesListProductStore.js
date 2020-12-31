Ext.define('Regardz.store.extraz.WebshopCategoriesListProductStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.extraz.WebshopCategoriesListProduct',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ExtrazWebshop/GetWebshopCategoriesListProduct',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            //id: user_language, id1: 0
            id: 0, languageId: user_language, searchString: ''
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});