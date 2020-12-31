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

Ext.define('Regardz.view.configuration.CancellationPenaltyUpdate', {
	extend : 'Ext.window.Window',
	alias : 'widget.cancellationpenaltyupdate',
	modal : true,
	width : 400,
	border : false,
	title : 'Update Cancellation Penalty'.l('SC20600'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('updateCancellationPenalty'))
			Ext.getCmp('updateCancellationPenalty').destroy();

		var me = this;

		me.items = [{
				xtype : 'form',
				id : 'updateCancellationPenalty',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				items : [{
						xtype : 'hidden',
						name : 'CancellationRuleId',
						value : me.cancellationRuleId
					}, {
						xtype : 'hidden',
						name : 'MaxDays',
						value : me.maxDays
					}, {
						xtype : 'displayfield',
						fieldLabel : 'To Day'.l('SC20600'),
						value : me.maxDays
					}, {
						xtype : 'hidden',
						name : 'MinDays',
						value : me.minDays
					}, {
						xtype : 'displayfield',
						fieldLabel : 'From Day'.l('SC20600'),
						value : me.minDays
					},
					//             {
					//                xtype: 'textfield',
					//                fieldLabel: 'Days'.l('RAP-A05-11'),
					//                name: 'Days',
					//                allowBlank: false,
					//                selectOnFocus: true,
					//
					//            },
					{
						xtype : 'hidden',
						name : 'ContractId',
						value : null
					},
					//         {
					//             xtype: 'textfield',
					//             fieldLabel: 'Penalty'.l('RAP-A05-11'),
					//             name: 'Penalty',
					//             allowBlank: false,
					//             selectOnFocus: true,
					//             forceDecimals: true,
					//             allowNegative: false,
					//             vtype: 'decimalValue'
					//         },
					{
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
					},
					{
						xtype : 'textareafield',
						fieldLabel : 'Rules'.l('SC20600'),
						name : 'Rules',
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
						action : 'updateCancellationPenalty'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});