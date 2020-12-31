Ext.define('Regardz.view.tempmodule.BookingtrackingList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.bookingtrackinglist',
	border : false,
	title : 'Booking tracking List',
	store: 'tempmodule.BookingWizardListStore',
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
				header : "Property Id",
				width : 75,
				sortable : true,
				dataIndex : 'PropertyId'
			}, {
				header : "Reservation",
				flex : 1,
				sortable : true,
				dataIndex : 'ReservationId',
	
			}, {
				header : 'Booking Name',
				sortable : true,
				dataIndex : 'BookingName',
				//name : 'date',
				//renderer : this.dateRenderer,
				align : 'center',
				width : 100
			}, {
				header : 'Booking Date',
				sortable : true,
				dataIndex : 'BookingDate',
		
				flex : 1
			}, {
				header : 'Time From',
				sortable : true,
				dataIndex : 'FromTime',
		
				flex : 1
			}, {
				header : 'To Time',
				sortable : true,
				dataIndex : 'ToTime',

				flex : 1
			}
		];
		
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