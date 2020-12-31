Ext.define('Regardz.view.configuration.MenuItemList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.menuitemlist',
	store : 'configuration.MenuItemStore',

	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.columns = [{
				header : 'Menu Name'.l('SC21900'),
				dataIndex : 'MenuItemName',
				flex : 1
			}, {
				header : 'Item Name'.l('SC21900'),
				dataIndex : 'ItemName',
				flex : 1
			}, {
				dataIndex : 'MenuItemId',
				renderer : this.editMenuItem,
				align : 'center',
				width : 25,
				name : 'MenuItemEdit',
				hideable : false
			}, {
				dataIndex : 'MenuItemId',
				renderer : this.deteleMenuItem,
				align : 'center',
				width : 25,
				name : 'MenuItemDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'MenuItemId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addMenuItem',
				iconCls : 'new',
				text : 'Add Menu Item'.l('SC21900'),
				tooltip : 'Add Menu Item'.l('SC21900')
			}
		];

		me.bbar = {
			xtype : 'pagingtoolbar',
			store : this.store,
			displayInfo : true,
			emptyMsg: "No data to display".l("g")
		};

		me.callParent();
	},

	editMenuItem : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Menu Item".l('SC21900');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	},

	deteleMenuItem : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Menu Item".l('SC21900');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}

});