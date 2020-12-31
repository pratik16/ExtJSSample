Ext.define('Regardz.view.mastervalues.MarketSourceLang', {
	extend : 'Ext.window.Window',
	alias : 'widget.marketsourcelang',
	modal : false,
	width : 400,
	border : false,
	title : 'Lang Market Source_Title'.l('SC21220'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('marketSourceLang'))
			Ext.getCmp('marketSourceLang').destroy();

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'marketSourceLang',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				items : [{
						xtype : 'combo',
						name : 'LanguageId',
						fieldLabel: 'Lang. for content'.l('SC21220'),
						//queryMode: 'local',
						displayField : 'Name',
						valueField : 'LanguageId',
						emptyText: "Select language for content".l('SC21220'),
						anchor : '100%',
						allowBlank : false,
						store : Ext.getStore('common.LanguageListStore')
					}, {
						xtype : 'hidden',
						name : 'MarketSourceId',
						value : me.marketSourceId
					}, {
						xtype : 'hidden',
						name : 'LangMarketSourceId',
						value : me.langMarketSourceId
					}, {
						xtype : 'textfield',
						fieldLabel : 'Market Source Name'.l('SC21200'),
						name : 'Name',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 50
					}, {
						xtype : 'textareafield',
						fieldLabel : 'Description'.l('SC21210'),
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
						action : 'saveMarketSourceLang'
					}
				]
			}
		];

		me.callParent(arguments);
	}
});