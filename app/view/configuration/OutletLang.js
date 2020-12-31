Ext.define('Regardz.view.configuration.OutletLang', {
	extend : 'Ext.window.Window',
	alias : 'widget.outletlang',
	modal : false,
	width : 400,
	border : false,
	title : 'Lang Outlet_Title'.l('SC20820'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('outletLang'))
			Ext.getCmp('outletLang').destroy();

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'outletLang',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				items : [{
						xtype : 'combo',
						name : 'LanguageId',
						fieldLabel: 'Lang. for content'.l('SC20820'),
						displayField : 'Name',
						valueField : 'LanguageId',
						emptyText: "Select language for content".l('SC20820'),
						anchor : '100%',
						allowBlank : false,
						store : Ext.getStore('common.LanguageListStore')
					}, {
						xtype : 'hidden',
						name : 'OutletId',
						value : me.outletId
					}, {
						xtype : 'hidden',
						name : 'LangOutletId',
						value : me.langOutletId
					}, {
						xtype : 'textfield',
						fieldLabel : 'Outlet Name'.l('SC20800'),
						name : 'OutletName',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 50
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
						action : 'saveOutletLang'
					}
				]
			}
		];

		me.callParent(arguments);
	}
});