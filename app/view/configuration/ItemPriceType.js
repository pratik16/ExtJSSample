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

Ext.define('Regardz.view.configuration.ItemPriceType', {
	extend : 'Ext.window.Window',
	alias : 'widget.itempricetype',
	modal : true,
	width : 300,
	border : false,
	title: 'Manage Item Price Type_Title'.l('SC21920'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addItemPriceType'))
			Ext.getCmp('addItemPriceType').destroy();

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'addItemPriceType',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				items : [{
						xtype : 'hidden',
						name : 'ItemId',
						value : me.itemId
					}, {
						xtype : 'textfield',
						fieldLabel: 'A'.l('SC21920'),
						name : 'A',
						forceDecimals : true,
						allowNegative : false,
						allowBlank : false,
						vtype : 'decimalValue'

					}, {
						xtype : 'textfield',
						fieldLabel: 'B'.l('SC21920'),
						name : 'B',
						allowBlank : false,
						vtype : 'decimalValue'
					}, {
						xtype : 'textfield',
						fieldLabel: 'C'.l('SC21920'),
						name : 'C',
						allowBlank : false,
						vtype : 'decimalValue',
						decimalPrecision : 2
					}, {
						xtype : 'textfield',
						fieldLabel: 'D'.l('SC21920'),
						name : 'D',
						allowBlank : false,
						vtype : 'decimalValue',
						decimalPrecision : 2
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
						action : 'saveItemPriceType'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});