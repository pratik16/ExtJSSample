Ext.define('Regardz.store.property.PhotoGalleryListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.PhotoGallery',
    autoLoad: false,
    // Load data from server

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/PhotoGallery/PhotoGalleryPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language, searchParam: ''
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },

    pageSize: page_size
});	