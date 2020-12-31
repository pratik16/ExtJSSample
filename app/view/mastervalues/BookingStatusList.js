Ext.define('Regardz.view.mastervalues.BookingStatusList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.bookingstatuslist',

	store : 'mastervalues.BookingStatusStore',

	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.title = "Booking Status List_Title".l('SC21300');
		me.columns = [{
				header : 'Booking Status'.l('SC21300'),
				dataIndex : 'Status',
				flex : 1
			}, {
				dataIndex : 'BookingStatusId',
				renderer : this.editBookingStatus,
				align : 'center',
				width : 25,
				name : 'BookingStatusEdit',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'BookingStatusId',
				align : 'center',
				hideable : false
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

	editBookingStatus : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Booking Status".l('SC21300');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	}
});