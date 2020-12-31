Ext.define('Regardz.store.configuration.FixedPricePropertyFeatureStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.FixedPricePropertyFeature',
    //id: 'EventsList',
    autoLoad: false,
    // Load data from server

    proxy: {
        type: 'jsonp',

        url: webAPI_path + 'api/FixedPrice/GetPropertyFeatureList',
        filterParam: 'filter',
        extraParams: {
            id: 0,
            languageId: 0
        },
        reader: {
            type: 'json'
        }
    }
});