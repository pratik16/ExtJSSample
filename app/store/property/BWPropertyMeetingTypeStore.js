Ext.define('Regardz.store.property.BWPropertyMeetingTypeStore', {
    extend: 'Ext.data.Store',
    fields: ['PropertyFeatureId', 'PropertyFeatureName', 'PropertyFeatureDescription'],
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