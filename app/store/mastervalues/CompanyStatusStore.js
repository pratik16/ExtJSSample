Ext.define('Regardz.store.mastervalues.CompanyStatusStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.mastervalues.CompanyStatus',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/MasterValue/CompanyStatusPaging',
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