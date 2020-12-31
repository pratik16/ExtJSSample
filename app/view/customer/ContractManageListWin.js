Ext.define('Regardz.view.customer.ContractManageListWin', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.contractmanagelistwin',
	store : 'customer.ContractFixedPriceAddStore',
	loadMask : true,

	initComponent : function () {

		var me = this;
		me.title = 'Contract FixedPrice List_Title'.l('SC61200');
		me.autoHeight = true;
		me.columns = [{
				header : 'Name'.l('SC61200'),
				dataIndex : 'Name',
				flex : 1
			}, {
				header : 'Starting Slot'.l('SC61200'),
				dataIndex : 'TimeSlotcode',
				align : 'center',
				flex : 1
			}, {
				header : 'Type'.l('SC61200'),
				dataIndex : 'TypeId',
				flex : 1
			}, {
				header : 'Duration'.l('SC61200'),
				dataIndex : 'Duration',
				align : 'center',
				flex : 1
			}, {
				header : 'Add'.l('SC61200'),
				dataIndex : 'ContractId',
				renderer : this.addItem,
				align : 'center',
				width : 50,
				name : 'AddFPContract',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'ContractId',
				align : 'center',
				hideable : false
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
	addItem : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Add Fixed Price".l('SC61200'); //.l('RAP-A05-06');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-add-menu';
	},
	ManageContractCriteria : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Manage Contract Criteria".l('SC61200');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-document';
	},
	ContractEdit : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Contract".l('SC61200'); //.l('RAP-A05-06');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';

	},
	//    IsActive: function (value, metadata, record, rowIndex, colIndex, store) {
	//        if (value == true)
	//            return "Yes"
	//        else return "No"
	//    },

	ContractDelete : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Contract".l('SC61200'); //.l('RAP-A05-06');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}

});