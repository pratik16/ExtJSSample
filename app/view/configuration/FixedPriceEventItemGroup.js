Ext.define('Regardz.view.configuration.FixedPriceEventItemGroup', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.fixedpriceeventitemgroup',
	store : 'configuration.FixedPriceEventItemGroupStore',

	loadMask : true,

	initComponent : function () {

		var me = this;
		// me.autoHeight = true;
		minHeight = 300;
		//me.title = "Manage Items";
		me.columns = [{
				header : 'Item Group'.l("SC23500"),
				dataIndex : 'ItemGroupName',
				flex : 1
			}, {
				header : 'Add'.l("SC23500"),
				dataIndex : 'ItemGroupId',
				renderer : this.addItemGroup,
				align : 'center',
				width : 50,
				name : 'addItemGroup',
				hideable : false
			},
		];

		me.bbar = {
			xtype : 'pagingtoolbar',
			store : this.store,
			displayInfo : true,
			pageSize : 5,
			emptyMsg : "No data to display".l('g')
		};
		me.callParent();
	},
	addItemGroup : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Add Item Group".l("SC23500"); //.l('RAP-A05-06');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-add-menu';
	}
});