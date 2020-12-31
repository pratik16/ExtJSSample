Ext.define('Regardz.view.configuration.FixedPriceEventItem', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.fixedpriceeventitem',

	store : 'configuration.FixedPriceEventItemAddStore',

	loadMask : true,

	initComponent : function () {

		var me = this;
		// me.autoHeight = true;
		//minHeight = 300;
		me.height = 300;
		//autoScroll = true;
		//me.title = "Manage Items";
		me.columns = [{
				header : 'Item Name',
				dataIndex : 'ItemName',
				flex : 1
			}, {
				header : 'Add',
				dataIndex : 'ItemId',
				renderer : this.addItem,
				align : 'center',
				width : 50,
				name : 'addItem',
				hideable : false
			},
		];

		me.bbar = {
			xtype : 'pagingtoolbar',
			store : this.store,
			displayInfo : true,
			emptyMsg : "No data to display".l('g')
		};
		me.callParent();
	},
	addItem : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Add Item"; //.l('RAP-A05-06');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-add-menu';
	}
});