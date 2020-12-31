Ext.define('Regardz.view.configuration.OutletList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.outletlist',

	store : 'configuration.OutletStore',

	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.title = 'Outlet List_Title'.l('SC20800');
		me.columns = [{
				header : 'Outlet Name'.l('SC20800'),
				dataIndex : 'OutletName',
				flex : 1
			}, {
				dataIndex : 'OutletId',
				renderer : this.editOutlet,
				align : 'center',
				width : 25,
				name : 'OutletEdit',
				hideable : false
			}, {
				dataIndex : 'OutletId',
				renderer : this.deteleOutlet,
				align : 'center',
				width : 25,
				name : 'OutletDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'OutletId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addOutlet',
				iconCls : 'new',
				text : 'Add New'.l('SC20800'),
				tooltip : 'Add Outlet'.l('SC20800')
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

	editOutlet : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Outlet".l('SC20800');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	},

	deteleOutlet : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Outlet".l('SC20800');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-dele';
	}

});