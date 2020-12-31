Ext.define('Regardz.store.bookingwizard.CompanyContactListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.CompanyContactList',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Individual/IndividualPaging',
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