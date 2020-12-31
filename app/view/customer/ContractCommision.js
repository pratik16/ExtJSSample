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
Ext.define('Regardz.view.customer.ContractCommision', {
	extend : 'Ext.window.Window',
	alias : 'widget.contractcommision',
	modal : true,
	width : 600,
	border : false,
	//title: 'Add Fixed Price'.l('RAP-A05-06'),
	title : 'Add Commission_Title'.l('SC61220'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addContractCommision'))
			Ext.getCmp('addContractCommision').destroy();

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'addContractCommision',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",

				fileUpload : true,
				items : [
					{
						xtype : 'hidden',
						name : 'IsKickback',
						value : false
					}, {
						xtype : 'hidden',
						name : 'ContractCommissionId',
						value : 0
					}, {
						xtype : 'hidden',
						name : 'ContractId',
						value : me.contractId
					}, {
						xtype : 'combo',
						fieldLabel : 'Property'.l('SC61220'),
						emptyText : 'Select Property',
						labelWidth : 120,
						allowBlank : false,
						displayField : 'PropertyName',
						valueField : 'PropertyId',
						store : propertyStore,
						name : 'PropertyId'
					}, {
						xtype : 'textfield',
						fieldLabel : 'Commission (%)'.l('SC61220'),
						name : 'Commission',
						vtype : 'decimalPercentageValue',
						//width: 200,
						labelWidth : 120,
						maxLength : 9,
						allowBlank : false,
						selectOnFocus : true
					}, {
						xtype : 'textfield',
						fieldLabel : 'Revenue Range'.l('SC61220'),
						name : 'RevenueFrom',
						allowBlank : false,
						maxLength : 9,
						labelWidth : 120,
						vtype : 'decimalValue',
						selectOnFocus : true
					}, {
						xtype : 'textfield',
						filedSeparator : false,
						hideEmptyLabel : false,
						maxLength : 9,
						name : 'RevenueTo',
						vtype : 'decimalValue',
						allowBlank : false,
						labelWidth : 120,
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
						action : 'saveContractCommision'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});