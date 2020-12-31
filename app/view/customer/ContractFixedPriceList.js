Ext.define('Regardz.view.customer.ContractFixedPriceList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.contractfixedpricelist',
	store : 'customer.ContractFixedPriceStore',
	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		//me.title = "Add Fixed Price_Title".l('SC61250');
		me.columns = [{
				header : 'Property Name'.l('SC61200'),
				dataIndex : 'PropertyName',
				flex : 1
			}, {
				header : 'Company Name'.l('SC61200'),
				dataIndex : 'CompanyName',
				flex : 1
			}, {
				header : 'Package'.l('SC61200'),
				dataIndex : 'Name',
				flex : 1
			}, {
				header : 'Revenue'.l('SC61200'),
				dataIndex : 'RevenueRange',
				align : 'right',
				flex : 1
			}, {
				dataIndex : 'ContractFixedPriceId',
				align : 'center',
				width : 25,
				renderer : this.ContractFPDelete,
				name : 'ContractFPDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'ContractFixedPriceId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addContractFixedPrice',
				iconCls : 'new',
				text : 'Add New'.l('SC61200'),
				tooltip : 'Add FixedPrice'.l('SC61200'),
				handler : function () {
					Ext.create('widget.addcontractwin', {
						ContractId : me.contractId
					}).show(); // { contractId: me.contractId, PropertyId: me.PropertyId }
					Ext.getStore('customer.ContractFixedPriceAddStore').removeAll();
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

	ManageChild : function (value, metadata, record, rowIndex, colIndex, store) {
		if (value == true)
			return "Yes";
		else
			return "No";
	},

	ContractFPDelete : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete FixedPrice".l('SC61200');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}

});
