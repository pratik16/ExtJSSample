Ext.define('Regardz.view.mastervalues.CcardTypeLang', {
	extend : 'Ext.window.Window',
	alias : 'widget.ccardtypelang',
	modal : false,
	width : 400,
	border : false,
	title: 'Lang Ccard_Title'.l('SC20920'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('ccardTypeLang'))
			Ext.getCmp('ccardTypeLang').destroy();

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'ccardTypeLang',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				items : [{
						xtype : 'combo',
						name : 'LanguageId',
						fieldLabel: 'Lang. for content'.l('SC20920'),
						//queryMode: 'local',
						displayField : 'Name',
						valueField : 'LanguageId',
						emptyText: "Select language for content".l('SC20920'),
						anchor : '100%',
						allowBlank : false,
						store : Ext.getStore('common.LanguageListStore')
					}, {
						xtype : 'hidden',
						name : 'CcardTypeId',
						value : me.ccardTypeId
					}, {
						xtype : 'hidden',
						name : 'LangCcardTypeId',
						value : me.langCcardTypeId
					}, {
						xtype : 'textfield',
						fieldLabel : 'Ccard Name'.l('SC20900'),
						name : 'Name',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 50
					}, {
						xtype : 'textareafield',
						fieldLabel : 'Description'.l('SC20910'),
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
						action : 'saveCcardTypeLang'
					}
				]
			}
		];

		me.callParent(arguments);
	}
});