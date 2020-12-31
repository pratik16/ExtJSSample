Ext.define('Regardz.store.company.CompanySearchListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.company.CompanySearchList',
    autoLoad: true,

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
       limit: page_size, start: 0
   },
   pageSize: page_size
});	