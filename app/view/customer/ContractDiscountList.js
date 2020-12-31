Ext.define('Regardz.view.customer.ContractDiscountList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.contractdiscountlist',
	store : 'customer.ContractDiscountStore',
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
				header : 'Discount Type'.l('SC61200'),
				dataIndex : 'DiscountTypeName',
				flex : 1
			}, {
				header : 'Value(%)'.l('SC61200'),
				dataIndex : 'Value',
				align : 'right',
				flex : 1
			}, {
				header : 'Revenue'.l('SC61200'),
				dataIndex : 'Revenue',
				align : 'center',
				align : 'right',
				flex : 1
			}, {
				dataIndex : 'ContractDiscountId',
				align : 'center',
				width : 25,
				renderer : this.ContractDiscountEdit,
				name : 'ContractDiscountEdit',
				hideable : false
			}, {
				dataIndex : 'ContractDiscountId',
				align : 'center',
				width : 25,
				renderer : this.ContractDiscountDelete,
				name : 'ContractDiscountDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'ContractId',
				align : 'center',
				hideable : false
			}
		];
		//GetContractDiscountbyId
		me.tbar = [{
				xtype : 'button',
				action : 'addContractDiscount',
				iconCls : 'new',
				text : 'Add New'.l('SC61200'),
				tooltip : 'Add Discount'.l('SC61200'),
				handler : function () {
					Ext.create('widget.contractdiscount', {
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
	ContractDiscountEdit : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Discount".l('SC61200');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';

	},
	ManageChild : function (value, metadata, record, rowIndex, colIndex, store) {
		if (value == true)
			return "Yes";
		else
			return "No";
	},

	ContractDiscountDelete : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Discount".l('SC61200');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}

});
