Ext.define('Regardz.view.configuration.MenuItemManage', {
	extend : 'Ext.window.Window',
	alias : 'widget.menuitemmanage',
	modal : true,
	width : 400,
	border : false,
	title : 'Add Menu Item'.l('SC21900'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addmenuitem'))
			Ext.getCmp('addmenuitem').destroy();

		var me = this;

		me.disableitems = true;
		if (me.menuItemId > 0) {
			me.disableitems = false;
		}

		me.items = [{
				xtype : 'form',
				id : 'addmenuitem',
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
						value : user_language //default lang Id
					}, {
						xtype : 'hidden',
						name : 'MenuItemId',
						value : me.menuItemId
					}, {
						xtype : 'hidden',
						name : 'ItemId',
						value : me.itemId
					}, {
						xtype : 'textfield',
						fieldLabel : 'Menu Item Name'.l('SC21900'),
						name : 'MenuItemName',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%'
					}, {
						xtype : 'displayfield',
						fieldLabel : 'Item Name'.l('SC21900'),
						value : me.itemName
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
						action : 'saveMenuItem'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});