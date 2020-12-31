Ext.define('Regardz.view.customer.CustomerBookingsList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.customerbookingslist',
	//store: 'customer.ContractBedroomStore',
	loadMask : true,

	initComponent : function () {

		var me = this;
		//me.autoHeight = true;
		height = 400;
		me.title = "Bookings".l('SC61300');
		me.columns = [{
				header : 'Date'.l('SC61300'),
				dataIndex : 'PropertyName',
				flex : 1
			}, {
				header : 'Booking'.l('SC61300'),
				dataIndex : 'CompanyName',
				flex : 1
			}, {
				header : 'Name'.l('SC61300'),
				dataIndex : 'NoofNight',
				align : 'right',
				flex : 1
			}, {
				header : 'Status'.l('SC61300'),
				dataIndex : 'Price',
				align : 'right',
				flex : 1
			}, {
				dataIndex : 'ContractBedroomId',
				align : 'center',
				width : 25,
				renderer : this.ContractBREdit,
				name : 'ContractBREdit',
				hideable : false
			}, {
				dataIndex : 'ContractBedroomId',
				align : 'center',
				width : 25,
				renderer : this.ContractBRDelete,
				name : 'ContractBRDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'ContractBedroomId',
				align : 'center',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'BookingId'
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addBooking',
				iconCls : 'new',
				text : 'Add New'.l('SC61300'),
				tooltip : 'Add Booking'.l('SC61300'),
				handler : function () {
					//Ext.create('widget.contractbedroom', { contractId: me.contractId })
				}
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

	ContractBREdit : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Bedroom".l('SC61200');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';

	},
	ManageChild : function (value, metadata, record, rowIndex, colIndex, store) {
		if (value == true)
			return "Yes";
		else
			return "No";
	},

	ContractBRDelete : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Bedroom".l('SC61200');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}

});
