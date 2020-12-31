Ext.define('Regardz.view.extraz.ExtrazCategoriesWindow', {
	extend : 'Ext.window.Window',
	alias: 'widget.extrazcategorieswindow',
	modal : true,
	width : 650,
	height : 400,
	border : false,
	title: 'Extraz Categories_Title'.l('SC37110'),

	layout : 'fit',
	viewConfig : {
		forceFit : true
	},

	autoShow : true,

	initComponent : function () {

		var me = this;

		me.items = [{
		    xtype: 'extrazcategorieslist'
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