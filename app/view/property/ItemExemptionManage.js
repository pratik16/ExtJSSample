Ext.apply(Ext.form.field.VTypes, {
	//  vtype validation function
	decimalValue : function (val, field) {
		var value = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/i;
		return value.test(val);
	},
	// vtype Text property to display error Text
	// when the validation function returns false
	valueText : "Insert proper value",
	// vtype Mask property for keystroke filter mask
	valueMask : /[\d\.]/i
});

Ext.define('Regardz.view.property.ItemExemptionManage', {
	extend : 'Ext.window.Window',
	alias : 'widget.itemexemptionmanage',
	modal : true,
	width : 300,
	border : false,
	title : 'Item Exception Manage_Title'.l('SC31610'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('manageItemExemption'))
			Ext.getCmp('manageItemExemption').destroy();

		var me = this;

		me.items = [{
				xtype : 'form',
				id : 'manageItemExemption',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				items : [{
						xtype : 'hidden',
						name : 'ItemExemptionId',
						value : me.itemExemptionId
					}, {
						xtype : 'hidden',
						name : 'ItemId',
						value : me.itemId
					}, {
						xtype : 'hidden',
						name : 'PropertyId',
						value : me.propertyId
					}, {
						xtype : 'textfield',
						fieldLabel: 'A'.l('SC31610'),
						name : 'A',
						forceDecimals : true,
						allowNegative : false,
						allowBlank : false,
						vtype : 'decimalValue'

					}, {
						xtype : 'textfield',
						fieldLabel: 'B'.l('SC31610'),
						name : 'B',
						allowBlank : false,
						vtype : 'decimalValue'
					}, {
						xtype : 'textfield',
						fieldLabel: 'C'.l('SC31610'),
						name : 'C',
						allowBlank : false,
						vtype : 'decimalValue',
						decimalPrecision : 2
					}, {
						xtype : 'textfield',
						fieldLabel: 'D'.l('SC31610'),
						name : 'D',
						allowBlank : false,
						vtype : 'decimalValue',
						decimalPrecision : 2
					}, {
						xtype : 'hidden',
						name : 'CreatedDate'
					}, {
						xtype : 'hidden',
						name : 'CreatedBy'
					}, {
						xtype : 'hidden',
						name : 'UpdatedDate'
					}, {
						xtype : 'hidden',
						name : 'UpdatedBy'
					}
				],
				buttons : [{
						text : 'Cancel'.l('w'),
						scope : me,
						handler : function () {
							this.close();
						}
					}, {
						text : 'Save'.l('w'),
						action : 'saveItemExemption'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});