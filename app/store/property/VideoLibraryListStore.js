Ext.define('Regardz.store.property.VideoLibraryListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.VideoLibrary',
    autoLoad: false,
    // Load data from server

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/PropertyVideoDetail/VideoLibraryPaging',
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