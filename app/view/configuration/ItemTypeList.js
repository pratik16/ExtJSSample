Ext.define('Regardz.view.configuration.ItemTypeList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.itemtypelist',
	store : 'configuration.ItemTypeStore',

	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.title = 'Item Type List_Title'.l('SC20500');
		me.columns = [{
				header : 'Item Type Name'.l('SC20500'),
				dataIndex : 'ItemTypeName',
				flex : 1
			}, {
				header : 'Department Detail'.l('SC20500'),
				dataIndex : 'DepartmentName',
				flex : 1
			}, {
				header : 'Sub Department Detail'.l('SC20500'),
				dataIndex : 'SubDepartmentName',
				flex : 1
			}, {
				dataIndex : 'ItemTypeId',
				renderer : this.editItemType,
				align : 'center',
				width : 25,
				name : 'ItemTypeEdit',
				hideable : false
			}, {
				dataIndex : 'ItemTypeId',
				renderer : this.deteleItemType,
				align : 'center',
				width : 25,
				name : 'ItemTypeDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'ItemTypeId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addItemType',
				iconCls : 'new',
				text : 'Add New'.l('SC20500'),
				tooltip : 'Add Item Type'.l('SC20500')
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

	editItemType : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Item Type".l('SC20500');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	},

	deteleItemType : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Item Type".l('SC20500');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-dele';
	}

});