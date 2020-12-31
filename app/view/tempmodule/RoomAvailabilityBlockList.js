/*This Screen is under development, Interface will TBD - MM*/
Ext.define('Regardz.view.tempmodule.RoomAvailabilityBlockList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.roomavailabilityblocklist',
	border : false,
	title : 'Room Availability Block List',
	store : 'tempmodule.RoomAvailabilityBlockStore',
	requires : [
		'Ext.ux.form.SearchField'
	],
	initComponent : function () {
		var me = this;
		me.layout = 'fit';
		me.autoScroll = true;

		me.autoExpandColumn = 'name';

		me.viewConfig = {
			forceFit : true
		};
		me.anchor = '100%';

			me.columns = [{
					header : "Property Name",
					flex : 1,
					sortable : true,
					dataIndex : 'PropertyName'
				}, {
					header : "Room type",
					flex : 1,
					sortable : true,
					dataIndex : 'RoomTypeName'
				}, {
					header : "Room",
					flex : 1,
					sortable : true,
					dataIndex : 'RoomName',
					name : 'RoomName'
				}, {
					header : "Start Date",
					flex : 1,
					sortable : true,
					dataIndex : 'StartDate',
					align : 'center',
					renderer : this.dateRenderer
				}, {
					header : "End Date",
					flex : 1,
					sortable : true,
					dataIndex : 'EndDate',
					align : 'center',
					renderer : this.dateRenderer
				},
				//                    { header: "Start Time", flex: 1, sortable: false, dataIndex: 'StartTime' },
				//                    { header: "End Time", flex: 1, sortable: false, dataIndex: 'EndTime' },
				//	{ header: "Blocked", dataIndex: 'IsBlocked', width: '5%', renderer: this.isBlocked },
				//{header: 'Blocked Slots', flex: 1, sortable: false, dataIndex: 'BlockedSlots' },
				{
					header : 'Comments',
					flex : 1,
					dataIndex : 'Comment'
				}, {
					dataIndex : 'RoomAvailabilityBlockId',
					renderer : this.deteleRoomAvailabilityBlock,
					align : 'center',
					width : 25,
					name : 'RoomAvailabilityBlockDelete',
					hideable : false
				},
				//{ header: 'link', renderer: this.link }
			];
		me.tbar = [{
				xtype : 'button',
				action : 'RoomAvailabilityBlock',
				iconCls : 'new',
				text : 'Add New'.l('SC31500'),
				tooltip : 'Add RoomAvailabilityBlock'
			},
			'->', {
				xtype : 'button',
				iconCls : 'filter',
				disabled : true
			}, {
				xtype : 'searchfield',
				store : Ext.getStore('tempmodule.RoomAvailabilityBlockStore'),
				iconCls : 'filter',
				paramName : 'searchString'
			}
		];

		me.bbar = {
			xtype : 'pagingtoolbar',
			store : this.store,
			//pageSize: 5,
			displayInfo : true,
			displayMsg : 'Displaying topics {0} - {1} of {2}',
			emptyMsg : "No topics to display"
		};

		me.callParent();
	},

	isBlocked : function (value, metadata, record, rowIndex, colIndex, store) {
		if (value == true)
			return "Yes";
		else
			return "No";

	},
	dateRenderer : function (value, metadata, record, rowIndex, colIndex, store) {

		var d = Ext.Date.parse(value, 'c');

		return Ext.util.Format.date(d, usr_dateformat);
	},
	deteleRoomAvailabilityBlock : function (value, metadata, record, rowIndex, colIndex, store) {

		var tooltipText = "Delete RoomAvailabilityBlock";
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	},
	link : function (value, metadata, record, rowIndex, colIndex, store) {
		return Ext.String.format('<a href="' + value + '">{0}</a>', value);
	}
});