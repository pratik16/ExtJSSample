

Ext.define('Regardz.store.customer.CountryStore', {
    extend: 'Ext.data.Store',
    //fields: ['CountryId', 'CountryName'],
    model: 'Regardz.model.customer.Country',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Country/GetCountryList',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            //languageId: user_language
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});
 