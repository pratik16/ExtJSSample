Ext.define('Regardz.store.common.QualityRatingStore', {
    extend: 'Ext.data.Store',
    fields: ['QualityRatingId', 'Rating', 'LanguageId','Description'],
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/MasterValue/GetQualityRating',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language //languageId
        }
    }
});