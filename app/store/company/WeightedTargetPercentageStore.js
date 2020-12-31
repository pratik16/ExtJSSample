Ext.define('Regardz.store.company.WeightedTargetPercentageStore', {
	extend : 'Ext.data.Store',
	fields: ['Year', 'Id', 'Percentage'],
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/CompanySales/GetAllWeightedTargetPercentage',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});