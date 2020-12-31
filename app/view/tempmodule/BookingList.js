Ext.define('Regardz.view.tempmodule.BookingList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.bookinglist',
	border : false,
	title : 'Booking List',
	store : 'tempmodule.BookingListStore',
	requires : ['Ext.ux.form.SearchField'],
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
				header : "Number",
				width : 75,
				sortable : true,
				dataIndex : 'BookingNumber'
			}, {
				header : "Name",
				flex : 1,
				sortable : true,
				dataIndex : 'BookingName',
				name : 'name'
			}, {
				header : 'Date',
				sortable : true,
				dataIndex : 'BookingDate',
				name : 'date',
				renderer : this.dateRenderer,
				align : 'center',
				width : 100
			}, {
				header : 'Company',
				sortable : true,
				dataIndex : 'CompanyName',
				name : 'date',
				flex : 1
			}, {
				header : 'Contact',
				sortable : true,
				dataIndex : 'IndividualName',
				name : 'date',
				flex : 1
			}, {
				header : 'Location',
				sortable : true,
				dataIndex : 'PropertyName',
				name : 'name',
				flex : 1
			}, {
				header : 'Status',
				hideable : false,
				dataIndex : 'Status',
				width : 100
			}, {
				dataIndex : 'BookingId',
				align : 'center',
				width : 25,
				renderer : this.cancelBooking,
				name : 'cancelbooking',
				hideable : false
			}
		];
		me.tbar = ['->', {
				xtype : 'button',
				iconCls : 'filter',
				disabled : true
			}, {
				xtype : 'searchfield',
				store : Ext.getStore('tempmodule.BookingListStore'),
				iconCls : 'filter',
				paramName : 'searchString'
			}
		];
		me.bbar = {
			xtype : 'pagingtoolbar',
			store : this.store,
			displayInfo : true,
			displayMsg : 'Displaying topics {0} - {1} of {2}',
			emptyMsg : "No topics to display"
		};
		me.callParent()
	},
	cancelBooking : function (value, metadata, record, rowIndex, colIndex, store) {
		if (record.data.StatusId == 7) {
			metadata.tdCls = 'icon-stop-disable';
			var tooltipText = "Cancelled";
			metadata.tdAttr = 'data-qtip="' + tooltipText + '"'
		} else {
			metadata.tdCls = 'icon-stop';
			var tooltipText = "Cancel booking";
			metadata.tdAttr = 'data-qtip="' + tooltipText + '"'
		}
	},
	dateRenderer : function (value, metadata, record, rowIndex, colIndex, store) {
		var d = Ext.Date.parse(value, 'c');
		return Ext.util.Format.date(d, usr_dateformat)
	}
});