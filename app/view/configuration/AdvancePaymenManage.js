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
Ext.apply(Ext.form.VTypes, {
	numeric : function (v, field) {
		var customRegEX = /^[0-9]/i;
		return customRegEX.test(v);
	},
	numericText : "Text must be numeric".l("g"),
	numericMask : /^[0-9]/i
});

Ext.define('Regardz.view.configuration.AdvancePaymenManage', {
	extend : 'Ext.window.Window',
	alias : 'widget.advancepaymenmanage',
	modal : true,
	width : 400,
	border : false,
	//title: 'Add Fixed Price'.l('RAP-A05-06'),
	title : 'Add Advance Payment_Title'.l('SC23810'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addAdvancePayment'))
			Ext.getCmp('addAdvancePayment').destroy();

		var me = this;

		me.disableitems = true;
		if (me.itemCategoryId > 0) {
			me.disableitems = false;
		}

		me.items = [
			{
				xtype : 'form',
				id : 'addAdvancePayment',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				//tbar: ['->', { xtype: 'button', text: 'Language', action: 'LanguageContent', disabled: me.disableitems}],
				items : [{
						xtype : 'hidden',
						name : 'AdvancePaymentRuleId',
						value : me.AdvancePaymentRuleId
					}, {
						xtype : 'textfield',
						//fieldLabel: 'Fixed Price Package Name'.l('RAP-A05-06'),
						fieldLabel : 'Description'.l('SC23800'),
						maxLength : 500,
						name : 'Description',
						allowBlank : false,
						selectOnFocus : true,
						width : 360,
						maxLength: 250
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
								fieldLabel : 'Min Hours'.l('SC23800'),
								name : 'MinHours',
								allowBlank : false,
								maxLength : 4,
								vtype : 'numeric',
								errorMessage : 'Enter only Digits'.l("g"),
								selectOnFocus : true,
								width : 180
							}, {
								xtype : 'textfield',
								//fieldLabel: 'Fixed Price Package Name'.l('RAP-A05-06'),
								fieldLabel : 'Max Hours'.l('SC23800'),
								name : 'MaxHours',
								maxLength : 4,
								allowBlank : false,
								vtype : 'numeric',
								errorMessage : 'Enter only Digits'.l("g"),
								labelStyle : 'padding-left:20px',
								selectOnFocus : true,
								width : 180
							}, ]
					}, {
						xtype : 'panel',
						frame : true,
						border : false,
						style : 'background:none; border:0px;',
						layout : 'hbox',
						padding : '0 0 5 0',
						items : [{
								xtype : 'checkbox',
								fieldLabel : 'Optional Allowed'.l('SC23800'),
								name : 'IsOptionalAllowed',
								inputValue : 'true',
								width : 180,
								uncheckedValue : 'false'
							}, {
								xtype : 'checkboxfield',
								fieldLabel : 'Definite Allowed'.l('SC23800'),
								name : 'IsdefiniteAllowed',
								labelStyle : 'padding-left:20px',
								labelWidth : 150,
								width : 180,
								inputValue : 'true',
								uncheckedValue : 'false'
							}
						]
					},
					{
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
						action : 'saveAdvancePayment'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});