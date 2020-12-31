Ext.define('Regardz.store.bookingwizard.CompanySearchListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.CompanySearchList',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Company/CompaniesPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
           languageId: user_language
        }
   },
   baseParams: {
       limit: 10, start: 0
   },
   pageSize: 10
});	