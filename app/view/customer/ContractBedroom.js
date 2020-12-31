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

Ext.apply(Ext.form.VTypes, {
	numeric : function (v, field) {
		var customRegEX = /^[0-9]/i;
		return customRegEX.test(v);
	},
	numericText : "Text must be numeric",
	numericMask : /^[0-9]/i
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
Ext.define('Regardz.view.customer.ContractBedroom', {
	extend : 'Ext.window.Window',
	alias : 'widget.contractbedroom',
	modal : true,
	width : 600,
	border : false,
	//title: 'Add Fixed Price'.l('RAP-A05-06'),
	title : 'Add Bedroom_Title'.l('SC61260'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addContractBedroom'))
			Ext.getCmp('addContractBedroom').destroy();

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'addContractBedroom',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",

				fileUpload : true,
				items : [
					{
						xtype : 'hidden',
						name : 'ContractBedroomId',
						value : 0
					}, {
						xtype : 'hidden',
						name : 'ContractId',
						value : me.contractId
					}, {
						xtype : 'combo',
						fieldLabel : 'Property'.l('SC61260'),
						emptyText : 'Select Property',
						labelWidth : 120,
						allowBlank : false,
						displayField : 'PropertyName',
						valueField : 'PropertyId',
						store : propertyStore,
						name : 'PropertyId'
					}, {
						xtype : 'textfield',
						fieldLabel : 'No. Of Nights'.l('SC61260'),
						name : 'NoofNight',
						// width: 200,
						labelWidth : 120,
						maxLength : 4,
						vtype : 'numeric',
						allowBlank : false,
						selectOnFocus : true
					}, {
						xtype : 'textfield',
						fieldLabel : 'Price'.l('SC61260'),
						name : 'Price',
						allowBlank : false,

						//width: 170,
						labelWidth : 120,
						maxLength : 9,
						vtype : 'decimalValue',
						selectOnFocus : true
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
						action : 'saveContractBedroom'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});