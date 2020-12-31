Ext.apply(Ext.form.field.VTypes, {
	//  vtype validation function
	decimalValue : function (val, field) {
		var value = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/i;
		return value.test(val);
	},
	// vtype Text property to display error Text
	// when the validation function returns false
	decimalValueText : "Insert proper value for this field".l("g"),
	// vtype Mask property for keystroke filter mask
	decimalValueMask : /[\d\.]/i
});

Ext.define('Regardz.view.configuration.FixedPriceEventItemPrice', {
	extend : 'Ext.window.Window',
	alias : 'widget.fixedpriceeventitemprice',
	modal : true,
	width : 300,
	border : false,
	title : "Add RoomRent Price_Title".l('SC22222'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addFixedPriceEventItemPrice'))
			Ext.getCmp('addFixedPriceEventItemPrice').destroy();

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'addFixedPriceEventItemPrice',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				items : [{
						xtype : 'hidden',
						name : 'flag',
						value : me.flag
					}, {
						xtype : 'hidden',
						name : 'FixedPriceDetailId',
						value : me.FixedPriceDetailId
					}, {
						xtype : 'textfield',
						fieldLabel : 'A'.l('SC22222'),
						name : 'A',
						forceDecimals : true,
						allowNegative : false,
						allowBlank : false,
						minValue : 0,
						vtype : 'decimalValue'
					}, {
						xtype : 'textfield',
						fieldLabel : 'B'.l('SC22222'),
						//name: 'BarId',
						name : 'B',
						allowBlank : false,
						minValue : 0,
						vtype : 'decimalValue'
					}, {
						xtype : 'textfield',
						fieldLabel : 'C'.l('SC22222'), //'Price',
						name : 'Price',
						name : 'C',
						allowBlank : false,
						vtype : 'decimalValue',
						minValue : 0,
						decimalPrecision : 2
					}, {
						xtype : 'textfield',
						fieldLabel : 'D'.l('SC22222'), //'GrossPrice',
						name : 'GrossPrice',
						name : 'D',
						allowBlank : false,
						vtype : 'decimalValue',
						minValue : 0,
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
						action : 'saveFixedPriceEventItemPrice'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});