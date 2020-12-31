///*Minified by P*/
Ext.define('Regardz.view.configuration.ItemList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.itemlist',
	store : 'configuration.ItemStore',
	loadMask : true,
	initComponent : function () {
		var me = this;
		me.title = 'Item List_Title'.l('SC21900');
		me.autoHeight = true;
		me.columns = [{
				header : 'Item Name'.l('SC21900'),
				dataIndex : 'ItemName',
				flex : 1
			}, {
				header : 'Item Category Name'.l('SC21900'),
				dataIndex : 'ItemCategoryName',
				flex : 1
			}, {
				header : 'Item Type Name'.l('SC21900'),
				dataIndex : 'ItemTypeName',
				flex : 1
			}, {
				dataIndex : 'IsMenuItem',
				renderer : this.IsMenuItem,
				align : 'center',
				width : 25,
				hideable : false
			}, {
				dataIndex : 'ItemId',
				renderer : this.editItem,
				align : 'center',
				width : 25,
				name : 'ItemEdit',
				hideable : false
			}, {
				dataIndex : 'ItemId',
				renderer : this.deteleItem,
				align : 'center',
				width : 25,
				name : 'ItemDelete',
				hideable : false
			}, {
				dataIndex : 'ItemId',
				renderer : this.itemPricetype,
				align : 'center',
				width : 25,
				name : 'ItemPricetype',
				hideable : false
			}, /*{
			dataIndex: 'IsMenuItem',
			renderer: this.addMenu,
			align: 'center',
			width: 25,
			name: 'AddMenu',
			hideable: false
			},*/
			{
				hidden : true,
				dataIndex : 'ItemId',
				align : 'center',
				hideable : false
			}
		];
		me.tbar = [{
				xtype : 'button',
				action : 'addItem',
				iconCls : 'new',
				text : 'Add New'.l('SC21900'),
				tooltip : 'Add Item'.l('SC21900')
			}
		];
		me.bbar = {
			xtype : 'pagingtoolbar',
			store : this.store,
			displayInfo : true,
			emptyMsg : "No data to display".l('g')
		};
		me.callParent();
	},
	IsMenuItem : function (value, metadata, record, rowIndex, colIndex, store) {
		if (value == true) {
			var tooltipText = "Has Menu Item".l('SC21900');
			metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
			metadata.tdCls = 'icon-tick';
		} else {
			var tooltipText = "Hasn't Menu Item".l('SC21900');
			metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
			metadata.tdCls = 'icon-untick';
		}
	},
	editItem : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Item".l('SC21900');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	},
	deteleItem : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Item".l('SC21900');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	},
	addMenu : function (value, metadata, record, rowIndex, colIndex, store) {
		if (value == true) {
			var tooltipText = "Add Menu Item".l('SC21900');
			metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
			metadata.tdCls = 'icon-add-menu';
		} else {
			metadata.tdCls = 'icon-add-menu-disable';
		}
	},
	itemPricetype : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Add Item Price Type".l('SC21900');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-add-menu';
	}
});