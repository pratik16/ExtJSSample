Ext.define('Regardz.view.mastervalues.MarketSourceManage', {
	extend : 'Ext.window.Window',
	alias : 'widget.marketsourcemanage',
	modal : true,
	width : 400,
	border : false,
	title : 'Add Market Source_Title'.l('SC21210'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addMarketSource'))
			Ext.getCmp('addMarketSource').destroy();

		var me = this;

		me.disableitems = true;
		if (me.marketSourceId > 0) {
			me.disableitems = false;
		}

		me.items = [{
				xtype : 'form',
				id : 'addMarketSource',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				tbar : ['->', {
						xtype : 'button',
						text: 'Language'.l('g'),
						action : 'LanguageContent',
						disabled : me.disableitems
					}
				],
				items : [{
						xtype : 'hidden',
						name : 'LanguageId',
						value : user_language
					}, {
						xtype : 'hidden',
						name : 'MarketSourceId',
						value : me.marketSourceId
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
					}, {
						xtype : 'hidden',
						name : 'CreatedDate'
					}, {
						xtype : 'hidden',
						name : 'CreatedBy'
					}, {
						xtype : 'hidden',
						name : 'UpdatedDate'
					}, {
						xtype : 'hidden',
						name : 'UpdatedBy'
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
						action : 'saveMarketSource'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});