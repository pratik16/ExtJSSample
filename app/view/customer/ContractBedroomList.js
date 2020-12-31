Ext.define('Regardz.view.customer.ContractBedroomList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.contractbedroomlist',
	store : 'customer.ContractBedroomStore',
	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.columns = [{
				header : 'Property Name'.l('SC61200'),
				dataIndex : 'PropertyName',
				flex : 1
			}, {
				header : 'Company Name'.l('SC61200'),
				dataIndex : 'CompanyName',
				flex : 1
			}, {
				header : 'No. Of Nights'.l('SC61200'),
				dataIndex : 'NoofNight',
				align : 'right',
				flex : 1
			}, {
				header : 'Price(Euro)'.l('SC61200'),
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
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addContractBedroom',
				iconCls : 'new',
				text : 'Add New'.l('SC61200'),
				tooltip : 'Add Bedroom'.l('SC61200'),
				handler : function () {
					Ext.create('widget.contractbedroom', {
						contractId : me.contractId
					})
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
