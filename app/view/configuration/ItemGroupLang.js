Ext.define('Regardz.view.configuration.ItemGroupLang', {
	extend : 'Ext.window.Window',
	alias : 'widget.itemgrouplang',
	modal : false,
	width : 400,
	border : false,
	title : 'Lang Item Group_Title'.l('SC23520'),
	autoShow : true,

	initComponent : function () {

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'itemGroupLang',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				items : [{
						xtype : 'combo',
						name : 'LanguageId',
						fieldLabel : 'Lang. for content'.l('SC23520'),
						//queryMode: 'local',
						displayField : 'Name', /// <reference path="../../controller/property/" />
						valueField : 'LanguageId',
						emptyText : "Select language for content".l('SC23520'),
						anchor : '100%',
						allowBlank : false,
						store : Ext.getStore('common.LanguageListStore')
					}, {
						xtype : 'hidden',
						name : 'ItemGroupId',
						value : me.ItemGroupId
					}, {
						xtype : 'hidden',
						name : 'LangItemGroupId',
						value : me.langItemGroupId
					}, {
						xtype : 'textfield',
						fieldLabel : 'Item Group Name'.l('SC23520'),
						name : 'ItemGroupName',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 120
					}, {
						xtype : 'textfield',
						fieldLabel : 'Description'.l('SC23520'),
						name : 'Description',
						allowBlank : false,
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
						action : 'saveItemGroupLang'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});