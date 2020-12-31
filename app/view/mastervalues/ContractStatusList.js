Ext.define('Regardz.view.mastervalues.ContractStatusList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.contractstatuslist',

	store : 'mastervalues.ContractStatusStore',

	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.title = "Contract Status List_Title".l('SC21800');
		me.columns = [{
				header : 'Contract Status'.l('SC21800'),
				dataIndex : 'Status',
				flex : 1
			}, {
				dataIndex : 'ContractStatusId',
				renderer : this.editContractStatus,
				align : 'center',
				width : 50,
				name : 'ContractStatusEdit',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'ContractStatusId',
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

	editContractStatus : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Contract Status".l('SC21800');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	}
});