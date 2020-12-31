Ext.define('Regardz.store.company.MergeCompanyContactListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.company.CompanyContactList',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Individual/GetIndividualByCompany',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0, languageId: user_language
        }
   },
   baseParams: {
       limit: page_size, start: 0
   },
   pageSize: page_size
});	