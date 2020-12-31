Ext.apply(Ext.form.field.VTypes, {
	//  vtype validation function
	decimalPercentageValue : function (val, field) {
		//var value = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/i;
		var value = /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/i;
		return value.test(val);
	},
	// vtype Text property to display error Text
	// when the validation function returns false
	decimalPercentageValueText : "Insert proper value",
	// vtype Mask property for keystroke filter mask
	decimalPercentageValueMask : /[\d\.]/i
});
Ext.define('DiscountType', {
	extend : 'Ext.data.Model',
	fields : [{
			type : 'int',
			name : 'DiscountTypeId'
		}, {
			type : 'string',
			name : 'DiscountTypeName'
		}
	]
});
Ext.apply(Ext.form.field.VTypes, {
	//  vtype validation function
	decimalValue : function (val, field) {
		var value = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/i;
		return value.test(val);
	},
	// vtype Text property to display error Text
	// when the validation function returns false
	decimalValueText : "Insert proper value",
	// vtype Mask property for keystroke filter mask
	decimalValueMask : /[\d\.]/i
});
var typeData = [{
		"DiscountTypeId" : "3",
		"DiscountTypeName" : "Discount on Invoice"
	}, {
		"DiscountTypeId" : "2",
		"DiscountTypeName" : "Discount on Room Hire"
	}, {
		"DiscountTypeId" : "1",
		"DiscountTypeName" : "Discount on Items"
	}
];
var typeStore = Ext.create('Ext.data.Store', {
		model : 'DiscountType',
		data : typeData
	});
var propertyStore = Ext.create('Ext.data.Store', {
		fields : ['PropertyId', 'PropertyName'],
		autoLoad : false, //load from controller
		proxy : {
			type : 'jsonp',
			url : webAPI_path + 'api/property/PropertyPaging',
			reader : {
				type : 'json',
				root : 'data'
			},
			extraParams : {
				languageId : user_language,
				limit : 0
			},
			baseParams : {
				start : 0
			}

		}
	});
Ext.define('Regardz.view.customer.ContractDiscount', {
	extend : 'Ext.window.Window',
	alias : 'widget.contractdiscount',
	modal : true,
	width : 600,
	border : false,
	//title: 'Add Fixed Price'.l('RAP-A05-06'),
	title : 'Add Discount_Title'.l('SC61210'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addContractDiscount'))
			Ext.getCmp('addContractDiscount').destroy();

		var me = this;

		me.items = [{
				xtype : 'form',
				id : 'addContractDiscount',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",

				fileUpload : true,
				items : [{
						xtype : 'hidden',
						name : 'ContractDiscountId',
						value : 0
					}, {
						xtype : 'hidden',
						name : 'ContractId',
						value : me.contractId
					}, {
						xtype : 'combo',
						fieldLabel : 'Property'.l('SC61210'),
						emptyText : 'Select Property',
						labelWidth : 120,
						allowBlank : false,
						displayField : 'PropertyName',
						valueField : 'PropertyId',
						store : propertyStore,
						name : 'PropertyId'

					}, {
						xtype : 'combo',
						fieldLabel : 'Discount Type'.l('SC61210'),
						emptyText : 'Select Discount Type',
						labelWidth : 120,
						allowBlank : false,
						displayField : 'DiscountTypeName',
						valueField : 'DiscountTypeId',
						store : typeStore,
						name : 'DiscountTypeId'
					}, {
						xtype : 'textfield',
						fieldLabel : 'Value(%)'.l('SC61210'),
						name : 'Value',

						vtype : 'decimalPercentageValue',
						maxValue : 100,
						//width: 170,
						labelWidth : 120,
						maxLenth : 9,
						allowBlank : false,
						selectOnFocus : true
					}, {
						xtype : 'textfield',
						fieldLabel : 'Revenue'.l('SC61210'),
						name : 'Revenue',
						vtype : 'decimalValue',
						maxLenth : 9,
						//allowBlank: false,
						labelWidth : 120,
						allowBlank : false,
						selectOnFocus : true
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
						action : 'saveContractDiscount'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});