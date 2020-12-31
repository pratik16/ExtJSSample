Ext.define('Regardz.store.property.PropertyAtmosphereListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.PropertyFeatureTypeStore',
    autoLoad: false,
    reader: {
        type: 'json',
        root: 'data'
    },

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/property/PropertyFeaturesFromBookingWizard',
       
        filterParam: 'filter',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});