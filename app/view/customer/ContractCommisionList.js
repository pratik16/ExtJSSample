Ext.define('Regardz.view.customer.ContractCommisionList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.contractcommisionlist',
	store : 'customer.ContractCommisionStore',
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
				header : 'Commission (%)'.l('SC61200'),
				dataIndex : 'Commission',
				align : 'right',
				flex : 1
			}, {
				header : 'Revenue From'.l('SC61200'),
				dataIndex : 'RevenueFrom',
				align : 'right',
				flex : 1
			}, {
				header : 'Revenue To'.l('SC61200'),
				dataIndex : 'RevenueTo',
				align : 'right',
				flex : 1
			}, {
				dataIndex : 'ContractCommissionId',
				align : 'center',
				width : 25,
				renderer : this.ContractCommissionEdit,
				name : 'ContractCommissionEdit',
				hideable : false
			}, {
				dataIndex : 'ContractCommissionId',
				align : 'center',
				width : 25,
				renderer : this.ContractCommisionDelete,
				name : 'ContractCommisionDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'ContractCommissionId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addContractCommision',
				iconCls : 'new',
				text : 'Add New'.l('SC61200'),
				tooltip : 'Add Commission'.l('SC61200'),
				handler : function () {
					Ext.create('widget.contractcommision', {
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

	ContractCommissionEdit : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Commission".l('SC61200');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';

	},
	ManageChild : function (value, metadata, record, rowIndex, colIndex, store) {
		if (value == true)
			return "Yes";
		else
			return "No";
	},

	ContractCommisionDelete : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Commission".l('SC61200');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}

});
