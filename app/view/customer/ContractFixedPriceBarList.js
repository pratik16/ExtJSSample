Ext.define('Regardz.view.customer.ContractFixedPriceBarList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.contractfixedpricebarlist',
	store : 'customer.ContractFixedPriceBarStore',
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
				header : 'Bar'.l('SC61200'),
				dataIndex : 'BarName',
				align : 'center',
				flex : 1
			}, {
				header : 'Revenue'.l('SC61200'),
				dataIndex : 'RevenueRange',
				align : 'right',
				flex : 1
			}, {
				dataIndex : 'ContractFixedPriceBarId',
				align : 'center',
				width : 25,
				renderer : this.ContractFPBEdit,
				name : 'ContractFPBEdit',
				hideable : false
			}, {
				dataIndex : 'ContractFixedPriceBarId',
				align : 'center',
				width : 25,
				renderer : this.ContractFPBarDelete,
				name : 'ContractFPBarDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'ContractFixedPriceBarId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addContractFixedPriceBar',
				iconCls : 'new',
				text : 'Add New'.l('SC61200'),
				tooltip : 'Add FixedPriceBar'.l('SC61200'),
				handler : function () {
					Ext.create('widget.contractfixedpricebar', {
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

	ContractFPBEdit : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update FixedPriceBar".l('SC61200');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';

	},
	ManageChild : function (value, metadata, record, rowIndex, colIndex, store) {
		if (value == true)
			return "Yes";
		else
			return "No";
	},

	ContractFPBarDelete : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete FixedPriceBar".l('SC61200');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}

});
