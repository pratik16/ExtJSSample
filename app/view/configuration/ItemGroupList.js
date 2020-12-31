Ext.define('Regardz.view.configuration.ItemGroupList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.itemgrouplist',
	store : 'configuration.ItemGroupStore',
	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.title = 'Item Group List_Title'.l('SC23500');
		me.columns = [{
				header : 'Item Group Name'.l('SC23500'),
				dataIndex : 'ItemGroupName',
				flex : 1
			}, {
				header : 'Description'.l('SC23500'),
				dataIndex : 'Description',
				flex : 1
			}, {
				dataIndex : 'ItemGroupId',
				renderer : this.editItemGroup,
				align : 'center',
				width : 25,
				name : 'ItemGroupEdit',
				hideable : false
			}, {
				dataIndex : 'ItemGroupId',
				renderer : this.deteleItemGroup,
				align : 'center',
				width : 25,
				name : 'ItemGroupDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'ItemGroupId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addItemGroup',
				iconCls : 'new',
				text : 'Add New'.l('SC23500'),
				tooltip : 'Add Item Group'.l('SC23500')
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

	editItemGroup : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Item Group".l('SC23500');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	},

	deteleItemGroup : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Item Group".l('SC23500');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-dele';
	}

});