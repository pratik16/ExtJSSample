Ext.apply(Ext.form.field.VTypes, {
	//  vtype validation function
	decimalPercentageValue : function (val, field) {
		//var value = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/i;
		var value = /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/i;
		return value.test(val);
	},
	// vtype Text property to display error Text
	// when the validation function returns false
	valueText : "Insert proper value",
	// vtype Mask property for keystroke filter mask
	valueMask : /[\d\.]/i
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
var propertyStore = Ext.create('Ext.data.Store', {
		fields : ['PropertyId', 'PropertyName'],
		autoLoad : false,
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
var barStore = Ext.create('Ext.data.Store', {
		fields : ['BarId', 'BarName'],
		autoLoad : true,
		proxy : {
			type : 'jsonp',
			url : webAPI_path + 'api/Contract/GetAllBARs',
			reader : {
				type : 'json',
				root : 'data'
			}

		}
	});

Ext.define('Regardz.view.customer.ContractFixedPriceBar', {
	extend : 'Ext.window.Window',
	alias : 'widget.contractfixedpricebar',
	modal : true,
	width : 600,
	border : false,
	//title: 'Add Fixed Price'.l('RAP-A05-06'),
	title : 'Add Fixed Price Bar_Title'.l('SC61240'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addContractFixedPriceBar'))
			Ext.getCmp('addContractFixedPriceBar').destroy();

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'addContractFixedPriceBar',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",

				fileUpload : true,
				items : [
					{
						xtype : 'hidden',
						name : 'ContractFixedPriceBarId',
						value : 0
					}, {
						xtype : 'hidden',
						name : 'ContractId',
						value : me.contractId
					}, {
						xtype : 'combo',
						fieldLabel : 'Property'.l('SC61240'),
						emptyText : 'Select Property',
						labelWidth : 120,
						allowBlank : false,
						displayField : 'PropertyName',
						valueField : 'PropertyId',
						store : propertyStore,
						name : 'PropertyId'
					}, {
						xtype : 'combo',
						fieldLabel : 'Bar'.l('SC61240'),
						emptyText : 'Select Bar',
						labelWidth : 120,
						allowBlank : false,
						displayField : 'BarName',
						valueField : 'BarId',
						store : barStore,
						name : 'BarId'
					}, {
						xtype : 'textfield',
						fieldLabel : 'Revenue Range'.l('SC61240'),
						name : 'RevenueRange',
						allowBlank : false,
						maxLength : 9,
						labelWidth : 120,
						vtype : 'decimalValue',
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
						action : 'saveContractFixedPriceBar'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});