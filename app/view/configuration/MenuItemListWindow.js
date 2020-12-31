Ext.define('Regardz.view.configuration.MenuItemListWindow', {
	extend : 'Ext.window.Window',
	alias : 'widget.menuitemlistwindow',
	modal : true,
	width : 650,
	height : 400,
	border : false,
	title : 'Add Menu Item'.l('SC21900'),

	layout : 'fit',
	viewConfig : {
		forceFit : true
	},

	autoShow : true,

	initComponent : function () {

		var me = this;

		me.items = [{
				xtype : 'menuitemlist'
			}, {
				xtype : 'hidden',
				name : 'ItemId',
				id : 'itemID',
				value : me.itemId

			}, {
				xtype : 'hidden',
				name : 'ItemName',
				id : 'itemNAME',
				value : me.itemName

			}
		];
		me.callParent(arguments);
	}
});