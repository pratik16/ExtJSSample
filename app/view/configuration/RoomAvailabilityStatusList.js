Ext.define('Regardz.view.configuration.RoomAvailabilityStatusList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.roomavailabilitystatuslist',
	store : 'configuration.RoomAvailabilityStatusStore',
	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.title = "Room AvailabilityStatus List_Title".l('SC20200');
		me.columns = [{
				header : 'Display Name'.l('SC20200'),
				dataIndex : 'DisplayName',
				flex : 1
			}, {
				header : 'Status'.l('SC20200'),
				dataIndex : 'AvailabilityStatus',
				align : 'center',
				width : 100
			}, {
				dataIndex : 'PropertyId',
				renderer : this.editRoomAvail,
				align : 'center',
				width : 25,
				name : 'RoomAvailEdit',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'RoomAvailabilityId',
				align : 'center',
				hideable : false
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

	editRoomAvail : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Room Availability Status".l('SC20200');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
		metadata.tdCls = 'icon-edit';
	}

});