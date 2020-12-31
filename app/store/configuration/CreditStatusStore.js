Ext.define('Regardz.store.configuration.CreditStatusStore', {
	extend : 'Ext.data.SimpleStore',
	fields: ["CreditStatus", "Value"],
	autoLoad : true,
	data: [
    ['Prepaid', -1],
    ['Unknown', 0],
    ['Approved', 1],
    ['Rejected', 2]]
});