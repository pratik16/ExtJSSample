Ext.define('Regardz.controller.property.PropertyFacilityIcons', {
	extend : 'Ext.app.Controller',
	views : ['property.FacilitiesList'],
	stores : ['property.PropertyFacilityIcons'],

	loadStore : function (propertyId) {
		Ext.getStore('property.PropertyFacilityIcons').proxy.setExtraParam('id', propertyId);
		Ext.getStore('property.PropertyFacilityIcons').proxy.setExtraParam('languageId', user_language);
		Ext.getStore('property.PropertyFacilityIcons').load();
	}
});