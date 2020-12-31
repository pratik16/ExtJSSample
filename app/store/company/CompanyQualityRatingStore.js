Ext.define('Regardz.store.company.CompanyQualityRatingStore', {
    extend: 'Ext.data.Store',
    fields: ['QualityRatingId', 'Rating', 'LanguageId','Description'],
    autoLoad: false,

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