Ext.define('Regardz.view.mastervalues.OriginLang', {
	extend : 'Ext.window.Window',
	alias : 'widget.originlang',
	modal : false,
	width : 300,
	border : false,
	title: 'Lang Origin_Title'.l('SC21120'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('originLang'))
			Ext.getCmp('originLang').destroy();

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'originLang',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				items : [{
						xtype : 'combo',
						name : 'LanguageId',
						fieldLabel: 'Lang. for content'.l('SC21120'),
						//queryMode: 'local',
						displayField : 'Name',
						valueField : 'LanguageId',
						emptyText: "Select language for content".l('SC21120'),
						anchor : '100%',
						allowBlank : false,
						store : Ext.getStore('common.LanguageListStore')
					}, {
						xtype : 'hidden',
						name : 'OriginId',
						value : me.originId
					}, {
						xtype : 'hidden',
						name : 'LangOriginId',
						value : me.langOriginId
					}, {
						xtype : 'textfield',
						fieldLabel : 'Origin Name'.l('SC21100'),
						name : 'Name',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 50
					}, {
						xtype : 'textareafield',
						fieldLabel : 'Description'.l('SC21110'),
						name : 'Description',
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 500
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
						action : 'saveOriginLang'
					}
				]
			}
		];

		me.callParent(arguments);
	}
});