Ext.define('Regardz.view.configuration.ItemCategoryLang', {
	extend : 'Ext.window.Window',
	alias : 'widget.itemcategorylang',
	modal : false,
	width : 400,
	border : false,
	title: 'Lang Item Category_Title'.l('SC20420'),
	autoShow : true,

	initComponent : function () {

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'itemCategoryLang',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				items : [{
						xtype : 'combo',
						name : 'LanguageId',
						fieldLabel: 'Lang. for content'.l('SC20420'),
						//queryMode: 'local',
						displayField : 'Name',
						valueField : 'LanguageId',
						allowBlank : false,
						emptyText: "Select language for content".l('SC20420'),
						anchor : '100%',
						store : Ext.getStore('common.LanguageListStore')
					}, {
						xtype : 'hidden',
						name : 'ItemCategoryId',
						value : me.itemCategoryId
					}, {
						xtype : 'hidden',
						name : 'LangItemCategoryId',
						value : me.langItemCategoryId
					}, {
						xtype : 'textfield',
						fieldLabel: 'Item Category Name'.l('SC20420'),
						name : 'ItemCategoryName',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 120
					}, {
						xtype : 'textareafield',
						fieldLabel: 'Description'.l('SC20420'),
						name : 'Description',
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 256
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
						action : 'saveItemCategoryLang'
					}
				]
			}
		];
		//console.log('end form');
		me.callParent(arguments);
	}
});