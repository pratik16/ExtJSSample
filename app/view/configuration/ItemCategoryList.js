Ext.define('Regardz.view.configuration.ItemCategoryList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.itemcategorylist',
	store : 'configuration.ItemCategoryStore',
	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.title = 'Item Category List_Title'.l('SC20400');
		me.columns = [{
				header : 'Item Category Name'.l('SC20400'),
				dataIndex : 'ItemCategoryName',
				flex : 1
			}, {
				header : 'Description'.l('SC20400'),
				dataIndex : 'Description',
				flex : 1
			}, {
				dataIndex : 'ItemCategoryId',
				align : 'center',
				width : 25,
				renderer : this.editItemCategory,
				name : 'ItemCategoryEdit',
				hideable : false
			}, {
				dataIndex : 'ItemCategoryId',
				align : 'center',
				width : 25,
				renderer : this.deteleItemCategory,
				name : 'ItemCategoryDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'ItemCategoryId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addItemCategory',
				iconCls : 'new',
				text : 'Add New'.l('SC20400'),
				tooltip : 'Add Item Category'.l('SC20400')
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

	editItemCategory : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Item Category".l('SC20400');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	},

	deteleItemCategory : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Item Category".l('SC20400');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}

});