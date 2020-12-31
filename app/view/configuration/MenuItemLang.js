Ext.define('Regardz.view.configuration.MenuItemLang', {
	extend : 'Ext.window.Window',
	alias : 'widget.menuitemlang',
	modal : false,
	width : 400,
	border : false,
	title : 'Lang Menu Item'.l('SC21900'),
	autoShow : true,

	initComponent : function () {

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'menuItemLang',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				items : [{
						xtype : 'combo',
						name : 'LanguageId',
						fieldLabel : 'Lang. for content'.l('SC21900'),
						//queryMode: 'local',
						displayField : 'Name',
						valueField : 'LanguageId',
						allowBlank : false,
						emptyText : "Select language for content".l('SC21900'),
						anchor : '100%',
						store : Ext.getStore('common.LanguageListStore')
					}, {
						xtype : 'hidden',
						name : 'MenuItemId',
						value : me.menuItemId
					}, {
						xtype : 'hidden',
						name : 'LangMenuItemId',
						value : me.langMenuItemId
					}, {
						xtype : 'textfield',
						fieldLabel : 'Menu Item Name'.l('SC21900'),
						name : 'MenuItemName',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%'
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
						action : 'saveMenuItemLang'
					}
				]
			}
		];
		//console.log('end form');
		me.callParent(arguments);
	}
});