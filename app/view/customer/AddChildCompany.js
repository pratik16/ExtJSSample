Ext.define('Regardz.view.customer.AddChildCompany', {
	extend : 'Ext.grid.Panel',
	alias: 'widget.addchildcompany',
    itemid: 'addNewCompanyWin',
	//store: 'customer.ContractFixedPriceStore',
	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		//me.title = "Add Fixed Price_Title".l('SC61250');
		me.columns = [{
				header : 'Company'.l('SC61300'),
				dataIndex : 'PropertyName',
				flex : 1
			}, {
				header : 'Address'.l('SC61300'),
				dataIndex : 'CompanyName',
				flex : 1
			}, {
				header : 'Postcode'.l('SC61300'),
				dataIndex : 'PropertyName',
				flex : 1
			}, {
				header : 'City'.l('SC61300'),
				dataIndex : 'CompanyName',
				flex : 1
			}, {
				dataIndex : 'ContractBedroomId',
				align : 'center',
				width : 25,
				renderer : this.ContractBRDelete,
				name : 'ContractBRDelete'
				
			}, {
				dataIndex : 'ContractBedroomId',
				align : 'center',
				width : 25,
				renderer : this.ContractBRDelete,
				name : 'ContractBRDelete'
				
			}, {
				header : 'Add'.l('SC61200'),
				dataIndex : 'ContractId',
				renderer : this.addItem,
				align : 'center',
				width : 50,
				name : 'AddFPContract'
				
			}, {
				hidden : true,
				dataIndex : 'ContractBedroomId',
				align : 'center'
				
			}
		];

		//        me.tbar = [
		//                {
		//                    xtype: 'button',
		//                    action: 'addContractFixedPrice',
		//                    iconCls: 'new',
		//                    text: 'Add New'.l('SC61200'),
		//                    tooltip: 'Add FixedPrice'.l('SC61200'),
		//                    handler: function () {
		//                        Ext.create('widget.addcontractwin', { ContractId: me.contractId }).show(); // { contractId: me.contractId, PropertyId: me.PropertyId }
		//                        Ext.getStore('customer.ContractFixedPriceAddStore').removeAll();
		//                    }
		//                }
		//                ];

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
