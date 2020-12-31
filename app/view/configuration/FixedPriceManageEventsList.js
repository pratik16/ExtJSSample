Ext.define('Regardz.view.configuration.FixedPriceManageEventsList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.fixedpricemanageeventslist',
	store : 'configuration.FixedPriceManageEventsStore',
	loadMask : true,

	initComponent : function () {

		var me = this;
		//me.autoHeight = true;
		//minHeight
		me.height = 300;

		//me.title = "FixedPrice Events List_Title".l('SC22200');
		me.columns = [{
				header : 'Event Name'.l('SC22200'),
				dataIndex : 'EventName',
				flex : 1
			}, {
				header : 'Start Time'.l('SC22200'),
				dataIndex : 'StartTime',
				align : 'center',
				flex : 1
			}, // renderer: this.ManageTime,renderer: Ext.util.Format.dateRenderer('H:i'),format : 'H:i'
			{
				header : 'End Time'.l('SC22200'),
				dataIndex : 'EndTime',
				align : 'center',
				flex : 1
			}, //renderer: this.ManageTime,
			{
				dataIndex : 'FixedPriceEventId',
				align : 'center',
				width : 25,
				renderer : this.ManageItems,
				name : 'ManageItems',
				hideable : false
			}, {
				dataIndex : 'FixedPriceEventId',
				align : 'center',
				width : 25,
				renderer : this.EventEdit,
				name : 'EventEdit',
				hideable : false
			}, {
				dataIndex : 'FixedPriceEventId',
				align : 'center',
				width : 25,
				renderer : this.FixedPriceEventDelete,
				name : 'FixedPriceEventDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'FixedPriceEventId',
				align : 'center',
				hideable : false
			}
		];

		//        me.tbar = [
		//        {
		//            xtype: 'button',
		//            action: 'addfixedpriceEvent',
		//            iconCls: 'new',
		//            text: 'Add New', //.l('RAP-A05-06'),
		//            tooltip: 'Add Event'//.l('RAP-A05-06')
		//        }
		//        ];

		me.bbar = {
			xtype : 'pagingtoolbar',
			store : this.store,
			displayInfo : true,
			emptyMsg : "No data to display".l('g')
		};

		me.callParent();
	},

	ManageItems : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Manage FixedPrice Items".l('SC22200');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-document';
	},

	EventEdit : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update FixedPrice Event".l('SC22200');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';

	},

	FixedPriceEventDelete : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete FixedPrice Event".l('SC22200');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}
});