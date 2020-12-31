Ext.define('Regardz.view.configuration.ItemTypeLang', {
	extend : 'Ext.window.Window',
	alias : 'widget.itemtypelang',
	modal : false,
	width : 400,
	border : false,
	title : 'Lang Item Type_Title'.l('SC20520'),
	autoShow : true,

	initComponent : function () {

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'itemTypeLang',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				items : [{
						xtype : 'combo',
						name : 'LanguageId',
						fieldLabel: 'Lang. for content'.l('SC20520'),
						//queryMode: 'local',
						displayField : 'Name',
						valueField : 'LanguageId',
						emptyText: "Select language for content".l('SC20520'),
						anchor : '100%',
						store : Ext.getStore('common.LanguageListStore')
					}, {
						xtype : 'hidden',
						name : 'ItemTypeId',
						value : me.itemTypeId
					}, {
						xtype : 'hidden',
						name : 'LangItemTypeId',
						value : me.langItemTypeId
					}, {
						xtype : 'textfield',
						fieldLabel: 'Item Type Name'.l('SC20520'),
						name : 'ItemTypeName',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 120
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
						action : 'saveItemTypeLang'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});