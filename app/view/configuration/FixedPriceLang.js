var langStore = Ext.create('Ext.data.Store', {
		fields : ['LanguageId', 'Name'],
		autoLoad : false, //load from controller
		proxy : {
			type : 'jsonp',
			url : webAPI_path + 'api/property/GetLanguages',
			reader : {
				type : 'json'
			}
		}
	});

Ext.define('Regardz.view.configuration.FixedPriceLang', {
	extend : 'Ext.window.Window',
	alias : 'widget.fixedpricelang',
	modal : false,
	width : 400,
	border : false,
	title : 'Lang Fixed Price_Title'.l('SC22000'),
	autoShow : true,

	initComponent : function () {

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'fixedPriceLang',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				items : [{
						xtype : 'combo',
						name : 'LanguageId',
						fieldLabel : 'Lang. for content'.l('SC22000'),
						displayField : 'Name',
						allowBlank : false,
						valueField : 'LanguageId',
						emptyText : "Select language for content".l('SC22000'),
						anchor : '100%',
						store : langStore,
						listeners : {
							scope : this,
							'select' : function () {
								var FixedPriceId = Ext.getCmp('addFixedPrice').getForm().findField('FixedPriceId').getValue();
								var languageId = Ext.getCmp('fixedPriceLang').getForm().findField('LanguageId').getValue();
								Ext.getCmp('fixedPriceLang').getForm().load({
									method : 'GET',
									url : webAPI_path + 'api/FixedPrice/GetFixedPriceMultiLang',
									params : {
										id : FixedPriceId,
										languageId : languageId
									}
								});
							}
						}
					}, {
						xtype : 'hidden',
						name : 'FixedPriceId',
						value : me.FixedPriceId
					}, {
						xtype : 'hidden',
						name : 'LangFixedPriceId',
						value : me.LangFixedPriceId
					}, {
						xtype : 'textfield',
						fieldLabel : 'Name'.l('SC22000'),
						name : 'Name',
						allowBlank : false,
						maxLength : 200,
						selectOnFocus : true,
						anchor : '100%'
					}, {
						xtype : 'textfield',
						fieldLabel : 'Description'.l('SC22000'),
						name : 'Description',
						maxLength : 400,
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
						action : 'saveFPLang'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});