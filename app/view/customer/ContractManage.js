var statusStore = Ext.create('Ext.data.Store', {
		fields : ['ContractStatusId', 'Status'], //, 'Status'],
		autoLoad : false, //temp store disable as module is hidden right now
		proxy : {
			type : 'jsonp',
			url : webAPI_path + 'api/Contract/GetAllContractStatus',
			reader : {
				type : 'json',
				root : 'data'
			},
			extraParams : {
				id : user_language
			}
		}
	});

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
Ext.apply(Ext.form.VTypes, {
	numeric : function (v, field) {
		var customRegEX = /^[0-9]/i;
		return customRegEX.test(v);
	},
	numericText : "Text must be numeric",
	numericMask : /^[0-9]/i
});

Ext.define('Status', {
	extend : 'Ext.data.Model',
	fields : [{
			type : 'int',
			name : 'ContractStatusId'
		}, {
			type : 'string',
			name : 'ContractStatusCode'
		}
	]
});

var companyStore = Ext.create('Ext.data.Store', {
		fields : ['CompanyId', 'CompanyName'],
		autoLoad : false, //temp store disable as module is hidden right now
		proxy : {
			type : 'jsonp',
			url : webAPI_path + 'api/Contract/GetAllCompanies',
			reader : {
				type : 'json',
				root : 'data'
			}

		}
	});

Ext.define('Regardz.view.customer.ContractManage', {
	extend : 'Ext.window.Window',
	alias : 'widget.contractmanage',
	modal : true,
	width : 600,
	border : false,
	//title: 'Add Fixed Price'.l('RAP-A05-06'),
	title: 'Contract Manage_Title'.l('SC60010'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addContract'))
			Ext.getCmp('addContract').destroy();

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'addContract',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",

				fileUpload : true,
				items : [{
						xtype : 'hidden',
						name : 'ContractId',
						value : me.contractId
					}, {
						xtype : 'hidden',
						name : 'UBR',
						value : 0
					}, {
						xtype : 'hidden',
						name : 'IndividualId',
						value : 0
					}, {
						xtype : 'panel',
						frame : true,
						border : false,
						style : 'background:none; border:0px;',
						layout : 'hbox',
						padding : '0 0 5 0',
						items : [{
								xtype : 'textfield',
								//fieldLabel: 'Fixed Price Package Name'.l('RAP-A05-06'),
								fieldLabel : 'Contract Name'.l('SC60010'),
								labelWidth : 120,
								width : 270,
								allowBlank : false,
								maxLength : 400,
								name : 'ContractName',
								allowBlank : false,
								selectOnFocus : true
							}, {
								xtype : 'combo',
								fieldLabel : 'Company Name'.l('SC60010'),
								labelStyle : 'padding-left:20px',
								allowBlank : false,
								emptyText: 'Select Company Name'.l('SC60010'),
								labelWidth : 120,
								displayField : 'CompanyName',
								valueField : 'CompanyId',
								store : companyStore,
								name : 'CompanyId'
							}
						]
					}, {
						xtype : 'panel',
						frame : true,
						border : false,
						style : 'background:none; border:0px;',
						layout : 'hbox',
						padding : '0 0 5 0',
						items : [
							{
								xtype : 'datefield',
								fieldLabel : 'Effective From'.l('SC60010'),
								labelWidth : 120,
								name : 'StartDate',
								allowBlank : false,
								format : usr_dateformat,
								submitFormat : 'Y-m-d',
								listeners : {
									'change' : function () {
										var s = Ext.getCmp('addContract').getForm().findField('StartDate').getValue();
										Ext.getCmp('addContract').getForm().findField('EndDate').setMinValue(s);
									}
								}
							}, {
								xtype : 'datefield',
								fieldLabel : 'To'.l('SC60010'),
								labelStyle : 'padding-left:20px',
								labelWidth : 120,
								allowBlank : false,
								name : 'EndDate',
								submitFormat : 'Y-m-d',
								format : usr_dateformat,
								listeners : {
									'change' : function () {
										var e = Ext.getCmp('addContract').getForm().findField('EndDate').getValue();
										Ext.getCmp('addContract').getForm().findField('StartDate').setMaxValue(e);
									}
								}
							}
						]
					}, {
						xtype : 'combo',
						fieldLabel : 'Contract Status'.l('SC60010'),
						emptyText: 'Select Contract Status'.l('SC60010'),
						labelWidth : 120,
						displayField : 'Status',
						valueField : 'ContractStatusId',
						allowBlank : false,
						store : statusStore,
						name : 'ContractStatusId'
					}, {
						xtype : 'textfield',
						fieldLabel : 'Potential Revenue'.l('SC60010'),
						name : 'ContractedNetPrice',
						allowBlank : false,
						labelWidth : 120,
						maxLength : 9,
						vtype : 'decimalValue',
						selectOnFocus : true
					}, {
						xtype : 'textfield',
						fieldLabel : 'Payment Condition'.l('SC60010'),
						name : 'PaymentCondition',
						width : 170,
						vtype : 'numeric',
						maxLength : 4,
						labelWidth : 120,
						allowBlank : false,
						selectOnFocus : true
					}, {
						xtype : 'checkbox',
						labelWidth : 120,
						hideEmptyLabel : false,
						boxLabel : 'Applicable contract to child'.l('SC60010'),
						name : 'IsApplicableToChild',
						inputValue : 'true'
					}, {
						xtype : 'checkbox',
						labelWidth : 120,
						hideEmptyLabel : false,
						boxLabel : 'Exclude Administration Fee'.l('SC60010'),
						name : 'IsExcludedAdministrationFee',
						inputValue : 'true'
					}, {
						xtype : 'checkbox',
						labelWidth : 120,
						hideEmptyLabel : false,
						boxLabel : 'Include Trainer Facility'.l('SC60010'),
						name : 'IsIncludedTrainerFacility',
						inputValue : 'true'
					}, {
						xtype : 'hidden',
						name : 'CreatedDate',
						value : Ext.Date.format(new Date(), 'Y-m-d H:i:s')
					}, {
						xtype : 'hidden',
						name : 'CreatedBy',
						value : CurrentSessionUserId
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

						handler : function () {
							me.close();
							//me.destroy();
						}
					}, {
						text : 'Save'.l('w'),
						action : 'saveContract'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});