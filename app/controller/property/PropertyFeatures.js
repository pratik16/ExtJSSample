Ext.define('Regardz.controller.property.PropertyFeatures', {
    extend: 'Ext.app.Controller',
    views: ['property.MeetingTypesList', 'property.AtmosphereList'],
    stores: ['property.PropertyFeatureTypeStore', 'property.PropertyFeatureType2Store']//,

//    loadStore: function (propertyId) {
//        Ext.getStore('property.PropertyFeatureTypeStore').proxy.setExtraParam('id', propertyId)
//        Ext.getStore('property.PropertyFeatureTypeStore').proxy.setExtraParam('languageId', user_language)
//        Ext.getStore('property.PropertyFeatureTypeStore').proxy.setExtraParam('propertyFeatureId', 1)
//        Ext.getStore('property.PropertyFeatureTypeStore').load();
//    }
});