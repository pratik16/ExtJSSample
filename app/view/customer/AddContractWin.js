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
Ext.define('Regardz.view.customer.AddContractWin', {
	extend : 'Ext.window.Window',
	alias : 'widget.addcontractwin',
	modal : true,
	//store: 'customer.ContractManageStore',
	//alert(me.ContractId);

	requires : ['Regardz.view.customer.ContractManageListWin'],
	initComponent : function () {
		var me = this;
		me.title = "Add Fixed Price_Title".l('SC61250');
		me.width = 650;
		me.height = 400;
		Ext.apply(me, {
			items : [{
					xtype : 'form',
					id : 'contractFP',
					items : [{
							xtype : 'hidden',
							name : 'ContractId',
							value : me.ContractId
						}, {
							xtype : 'combo',
							fieldLabel : 'Property'.l('SC61250'),
							store : propertyStore,
							displayField : 'PropertyName',
							emptyText : 'Select Property',
							allowBlank : false,
							valueField : 'PropertyId',
							labelWidth : 250,
							width : 400,
							padding : 5,
							labelStyle : 'padding-left:120px',
							name : 'PropertyId',
							listeners : {
								scope : this,
								'select' : function () {
									PropertyId = Ext.getCmp('contractFP').getForm().findField('PropertyId').getValue();
									Ext.getStore('customer.ContractFixedPriceAddStore').proxy.setExtraParam('id', PropertyId); // me.PropertyId);
									Ext.getStore('customer.ContractFixedPriceAddStore').proxy.setExtraParam('id1', me.ContractId); // rec.data.ContractId);
									Ext.getStore('customer.ContractFixedPriceAddStore').proxy.setExtraParam('languageId', user_language);
									Ext.getStore('customer.ContractFixedPriceAddStore').load({});
								}
							}

						}, {
							xtype : 'textfield',
							fieldLabel : 'Revenue Range'.l('SC61250'),
							name : 'RevenueRange',
							allowBlank : false,
							vtype : 'decimalValue',
							labelWidth : 250,
							maxLength : 9,
							width : 400,
							padding : 5,
							labelStyle : 'padding-left:120px'
						}, {
							xtype : 'contractmanagelistwin'
						}
					]
				}
			]
		});
		me.dockedItems = [{
				dock : 'bottom',
				align : 'right',
				buttonAlign : 'center',
				buttons : [{
						text : 'Cancel'.l('w'),
						action : 'cancel',
						handler : function () {
							me.destroy();
						}
					}, {
						text : 'Save'.l('w'),
						handler : function () {
							Ext.Msg.alert('Success'.l('g'), 'Information saved successfully');
							me.destroy();
						}
					}
				]
			}
		];

		me.callParent();
	}
});