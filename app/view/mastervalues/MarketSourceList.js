Ext.define('Regardz.view.mastervalues.MarketSourceList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.marketsourcelist',

	store : 'mastervalues.MarketSourceStore',

	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.title = "Market Source List_Title".l('SC21200');
		me.columns = [{
				header : 'Market Source Name'.l('SC21200'),
				dataIndex : 'Name',
				flex : 1
			}, {
				dataIndex : 'MarketSourceId',
				renderer : this.editMarketSource,
				align : 'center',
				width : 25,
				name : 'MarketSourceEdit',
				hideable : false
			}, {
				dataIndex : 'MarketSourceId',
				renderer : this.deteleMarketSource,
				align : 'center',
				width : 25,
				name : 'MarketSourceDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'MarketSourceId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addMarketSource',
				iconCls : 'new',
				text : 'Add New'.l('SC21200'),
				tooltip : 'Add Market Source'.l('SC21200'),
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

	editMarketSource : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Market Source".l('SC21200');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	},

	deteleMarketSource : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Market Source".l('SC21200');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}

});