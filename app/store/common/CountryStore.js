Ext.define('Regardz.store.common.CountryStore', {
    extend: 'Ext.data.Store',
    fields: ['CountryId', 'CountryName'],
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Country/GetCountryList',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});