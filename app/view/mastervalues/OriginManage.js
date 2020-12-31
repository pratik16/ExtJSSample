Ext.define('Regardz.view.mastervalues.OriginManage', {
	extend : 'Ext.window.Window',
	alias : 'widget.originmanage',
	modal : true,
	width : 400,
	border : false,
	title : 'Add Origin_Title'.l('SC21110'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addOrigin'))
			Ext.getCmp('addOrigin').destroy();

		var me = this;

		me.disableitems = true;
		me.langClass = 'languagebutton-disable';
		if (me.originId > 0) {
			me.disableitems = false;
			me.langClass = 'languagebutton';
		}

		me.tbar = ['->', {
				xtype : 'button',
				itemid : 'langButton',
				tooltip : 'Update multilingual contents'.l('g'),
				cls : me.langClass,
				action : 'LanguageContent',
				disabled : me.disableitems
			}
		];

		me.items = [{
				xtype : 'form',
				id : 'addOrigin',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				items : [{
						xtype : 'hidden',
						name : 'LanguageId',
						value : user_language
					}, {
						xtype : 'hidden',
						name : 'OriginId',
						value : me.originId
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
						action : 'saveOrigin'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});