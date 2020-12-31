Ext.define('Regardz.view.mastervalues.AddressTypeLang', {
	extend : 'Ext.window.Window',
	alias : 'widget.addresstypelang',
	modal : false,
	width : 400,
	border : false,
	title: 'Lang AddressType_Title'.l('SC21520'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addressTypeLang'))
			Ext.getCmp('addressTypeLang').destroy();

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'addressTypeLang',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				items : [{
						xtype : 'combo',
						name : 'LanguageId',
						fieldLabel: 'Lang. for content'.l('SC21520'),
						//queryMode: 'local',
						displayField : 'Name',
						valueField : 'LanguageId',
						emptyText: "Select language for content".l('SC21520'),
						anchor : '100%',
						allowBlank : false,
						store : Ext.getStore('common.LanguageListStore')
					}, {
						xtype : 'hidden',
						name : 'AddressTypeId',
						value : me.addressTypeId
					}, {
						xtype : 'hidden',
						name : 'LangAddressTypeId',
						value : me.langAddressTypeId
					}, {
						xtype : 'textfield',
						fieldLabel : 'AddressType Name'.l('SC21500'),
						name : 'Name',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 50
					}, {
						xtype : 'textareafield',
						fieldLabel : 'Description'.l('SC21510'),
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
						action : 'saveAddressTypeLang'
					}
				]
			}
		];

		me.callParent(arguments);
	}
});