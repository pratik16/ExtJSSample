Ext.apply(Ext.form.field.VTypes, {
	//  vtype validation function
	nymberOnly : function (val, field) {
		var value = /^\d+$/i;
		return value.test(val);
	},
	// vtype Text property to display error Text
	// when the validation function returns false
	nymberOnlyText : "Insert proper value for this field".l('g')
});

Ext.apply(Ext.form.field.VTypes, {
	//  vtype validation function
	decimalPercentage : function (val, field) {
		var value = /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/i;
		return value.test(val);
	},
	// vtype Text property to display error Text
	// when the validation function returns false
	decimalPercentageText : "Insert proper value for this field".l('g'),
	// vtype Mask property for keystroke filter mask
	decimalPercentageMask : /[\d\.]/i
});

Ext.define('Regardz.view.configuration.CancellationPenaltyManage', {
	extend : 'Ext.window.Window',
	alias : 'widget.cancellationpenaltymanage',
	modal : true,
	width : 400,
	border : false,
	title : 'Add Cancellation Penalty_Title'.l('SC20610'),
	autoShow : true,

	initComponent : function () {

		var me = this;

		me.items = [{
				xtype : 'form',
				id : 'manageCancellationPenalty',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				items : [{
						xtype : 'hidden',
						name : 'CancellationRuleId',
						value : me.cancellationRuleId
					}, {
						xtype : 'textfield',
						fieldLabel : 'Days'.l('SC20600'),
						name : 'Days',
						allowBlank : false,
						selectOnFocus : true,
						vtype : 'nymberOnly'

					}, {
						xtype : 'hidden',
						name : 'ContractId',
						value : null
					}, {
						xtype : 'panel',
						//autoHeight: true,
						frame : true,
						border : false,
						style : 'background:none; border:0px;',
						layout : 'hbox',
						padding : '0 0 5 0',
						items : [{
								xtype : 'textfield',
								fieldLabel : 'Penalty'.l('SC20600'),
								name : 'Penalty',
								allowBlank : false,
								selectOnFocus : true,
								forceDecimals : true,
								allowNegative : false,
								vtype : 'decimalPercentage'
							}, {
								xtype : 'label',
								//forId: 'Penalty',
								text : '% (e.g. 12.34)',
								margin : '5 0 0 0'
							}
						]
					}, {
						xtype : 'textareafield',
						fieldLabel : 'Rules'.l('SC20600'),
						name : 'Rules',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 250
					},
					//             {
					//                xtype: 'checkboxfield',
					//                name: 'IsGreaterThan',
					//                padding: '0 0 0 105px',
					//                boxLabel: 'Is Greater Than'.l('RAP-A05-11'),
					//                inputValue: 'true',
					//                uncheckedValue: 'false'
					//            },
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
						action : 'manageCancellationPenalty'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});