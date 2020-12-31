Ext.define('Regardz.view.configuration.ItemCategoryManage', {
	extend : 'Ext.window.Window',
	alias : 'widget.itemcategorymanage',
	modal : true,
	width : 400,
	border : false,
	title : 'Add Item Category_Title'.l('SC20410'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('additemcategory'))
			Ext.getCmp('additemcategory').destroy();

		var me = this;

		me.disableitems = true;
		if (me.itemCategoryId > 0) {
			me.disableitems = false;
		}

		me.items = [{
				xtype : 'form',
				id : 'additemcategory',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				tbar : ['->', {
						xtype : 'button',
						text : 'Language'.l('g'),
						action : 'LanguageContent',
						disabled : me.disableitems
					}
				],
				items : [{
						xtype : 'hidden',
						name : 'LanguageId',
						value : user_language //default lang Id
					}, {
						xtype : 'hidden',
						name : 'ItemCategoryId',
						value : me.itemCategoryId
					}, {
						xtype : 'textfield',
						fieldLabel: 'Item Category Name'.l('SC20410'),
						name : 'ItemCategoryName',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 120
					}, {
						xtype : 'textareafield',
						fieldLabel: 'Description'.l('SC20410'),
						name : 'Description',
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 256
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
						action : 'saveItemCategory'
					}
				]
			}
		];
		//console.log('end form');
		me.callParent(arguments);
	}
});