Ext.define('Regardz.view.mastervalues.CompanyStatusList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.companystatuslist',

	store : 'mastervalues.CompanyStatusStore',

	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.title = "Company Status List_Title".l('SC21700');
		me.columns = [{
				header : 'Company Status'.l('SC21700'),
				dataIndex : 'Status',
				flex : 1
			}, {
				dataIndex : 'CompanyStatusId',
				renderer : this.editCompanyStatus,
				align : 'center',
				width : 50,
				name : 'CompanyStatusEdit',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'CompanyStatusId',
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

	editCompanyStatus : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Company Status".l('SC21700');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	}
});