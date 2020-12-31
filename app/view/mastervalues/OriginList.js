Ext.define('Regardz.view.mastervalues.OriginList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.originlist',

	store : 'mastervalues.OriginStore',

	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.title = "Origin List_Title".l('SC21100');
		me.columns = [{
				header : 'Origin Name'.l('SC21100'),
				dataIndex : 'Name',
				flex : 1
			}, {
				dataIndex : 'OriginId',
				renderer : this.editOrigin,
				align : 'center',
				width : 25,
				name : 'OriginEdit',
				hideable : false
			}, {
				dataIndex : 'OriginId',
				renderer : this.deteleOrigin,
				align : 'center',
				width : 25,
				name : 'OriginDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'OriginId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addOrigin',
				iconCls : 'new',
				text : 'Add New'.l('SC21100'),
				tooltip : 'Add Origin'.l('SC21100'),
				height : 21
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

	editOrigin : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Origin".l('SC21100');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	},

	deteleOrigin : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Origin".l('SC21100');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}

});