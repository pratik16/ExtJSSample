Ext.define('Regardz.view.configuration.FixedPriceEventItemList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.fixedpriceeventitemlist',

	store : 'configuration.FixedPriceEventItemStore',

	loadMask : true,

	initComponent : function () {

		var me = this;
		// me.autoHeight = true;
		//minHeight = 300;
		me.height = 300;
		//me.title = "Manage Items";
		//me.forceFit = true;
		me.columns = [
			{
				header : 'Item Name'.l('SC22220'),
				dataIndex : 'ItemName',
				flex : 1
			}, {
				header : 'Item/Room Rent'.l('SC22220'),
				dataIndex : 'IsItemOrRoomRent',
				renderer : this.encryptItem,
				align : 'center',
				flex : 1
			}, {
				dataIndex : 'IsItemOrRoomRent',
				align : 'center',
				width : 25,
				renderer : this.RoomRentPrice,
				name : 'RoomRentPrice'
			}, //, hideable: false
			{
				dataIndex : 'FixedPriceItemId',
				align : 'center',
				width : 25,
				renderer : this.FixedPriceItemDelete,
				name : 'FixedPriceItemDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'FixedPriceItemId',
				align : 'center',
				hideable : false
			}

		];

		//        me.tbar = [
		//                {
		//                    xtype: 'button',
		//                    action: 'addFixpriceEventItem',
		//                    iconCls: 'new',
		//                    text: 'Add New', //.l('RAP-A05-06'),
		//                    tooltip: 'Add Item'//.l('RAP-A05-06')
		//                }
		//                ];

		me.bbar = {
			xtype : 'pagingtoolbar',
			store : this.store,
			displayInfo : true,
			emptyMsg : "No data to display".l('g')
		};

		me.callParent();
	},
	RoomRentPrice : function (value, metadata, record, rowIndex, colIndex, store) {
		if (value == 0) {
			var tooltipText = "Manage Room Rent".l('SC22220');
			metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
			metadata.tdCls = 'icon-document';
		}
	},
	encryptItem : function (value, metadata, record, rowIndex, colIndex, store) {
		if (value == 0)
			return "RoomRent".l('SC22220');
		else
			return "Item".l('SC22220');
	},
	FixedPriceItemDelete : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete FixedPrice Item".l('SC22220');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}
});