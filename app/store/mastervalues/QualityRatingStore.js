Ext.define('Regardz.store.mastervalues.QualityRatingStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.mastervalues.QualityRating',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/MasterValue/QualityRatingPaging',
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