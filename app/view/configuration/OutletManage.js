Ext.define('Regardz.view.configuration.OutletManage', {
	extend : 'Ext.window.Window',
	alias : 'widget.outletmanage',
	modal : true,
	width : 400,
	border : false,
	title : 'Add Outlet_Title'.l('SC20810'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addOutlet'))
			Ext.getCmp('addOutlet').destroy();

		var me = this;

		me.disableitems = true;
		if (me.outletId > 0) {
			me.disableitems = false;
		}

		me.items = [{
				xtype : 'form',
				id : 'addOutlet',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				tbar : ['->', {
						xtype : 'button',
						text: 'Language'.l('g'),
						action : 'LanguageContent',
						disabled : me.disableitems
					}
				],
				items : [{
						xtype : 'hidden',
						name : 'LanguageId',
						value : user_language
					}, {
						xtype : 'hidden',
						name : 'OutletId',
						value : me.outletId
					}, {
						xtype : 'textfield',
						fieldLabel : 'Outlet Name'.l('SC20800'),
						name : 'OutletName',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 50
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
						action : 'saveOutlet'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});