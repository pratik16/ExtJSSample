Ext.define('Regardz.view.customer.ContractManageList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.contractmanagelist',
	store : 'customer.ContractManageStore',
	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.title = 'Contract List_Title'.l('SC60000');
		me.columns = [{
				header : 'Contract Name'.l('SC60000'),
				dataIndex : 'ContractName',
				flex : 1
			}, {
				header : 'Company Name'.l('SC60000'),
				dataIndex : 'CompanyName',
				flex : 1
			}, {
				header : 'Effective From'.l('SC60000'),
				dataIndex : 'StartDate',
				align : 'center',
				renderer : this.dateRenderer,
				flex : 1
			}, {
				header : 'To'.l('SC60000'),
				dataIndex : 'EndDate',
				renderer : this.dateRenderer,
				align : 'center',
				flex : 1
			}, {
				header : 'Status'.l('SC60000'),
				dataIndex : 'Status',
				align : 'center',
				flex : 1
			}, {
				header : 'Applicable to child'.l('SC60000'),
				dataIndex : 'IsApplicableToChild',
				align : 'center',
				renderer : this.ManageChild
			}, {
				dataIndex : 'ContractId',
				renderer : this.ManageContractCriteria,
				name : 'ManageContracts',
				align : 'center',
				width : 25,
				hideable : false
			}, {
				dataIndex : 'ContractId',
				align : 'center',
				width : 25,
				renderer : this.ContractEdit,
				name : 'ContractEdit',
				hideable : false
			}, {
				dataIndex : 'ContractId',
				align : 'center',
				width : 25,
				renderer : this.ContractDelete,
				name : 'ContractDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'ContractId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addContract',
				iconCls : 'new',
				text : 'Add New'.l('SC60000'),
				tooltip : 'Add Contract'.l('SC60000'),
				handler : function () {
					var addContract = Ext.create('widget.contractmanage', {
							contractId : 0
						});
				}
			}
			//                , {
			//                    xtype: 'button',
			//                    //action: 'addCompany',
			//                    iconCls: 'new',
			//                    text: 'Edit', //.l('SC61200'),
			//                    tooltip: 'Edit', //.l('SC61200'),
			//                    handler: function () {
			//                        var addContract = Ext.create('widget.edit', { contractId: 0 });
			//                    }
			//                }
			//                ,
			//                 {
			//                    xtype: 'button',
			//
			//                    iconCls: 'new',
			//                    text: 'Overview',
			//                    tooltip: 'Overview',
			//                    handler: function () {
			//                        //var addContract = Ext.create('widget.overview', { contractId: 0 });
			//                        var addContract = Ext.create('widget.overview_I', { contractId: 0 });
			//                    }
			//                }, {
			//                    xtype: 'button',
			//                    //action: 'addCompany',
			//                    iconCls: 'new',
			//                    text: 'CompanyOverview', //.l('SC61200'),
			//                    tooltip: 'CompanyOverview', //.l('SC61200'),
			//                    handler: function () {
			//                        //var addContract = Ext.create('widget.overview', { contractId: 0 });
			//                        var addContract = Ext.create('widget.companyoverview', { contractId: 0 });
			//                    }
			//                }, { xtype: 'button',
			//                    text: 'generalinfo',
			//                    handler: function () {
			//                        var generalinfo = Ext.create('widget.generalinfo', { contractId: 0 });
			//                        //var generalinfo = Ext.create('widget.AddChildCompanyWin');
			//                    }
			//                }
		];

		me.bbar = {
			xtype : 'pagingtoolbar',
			store : this.store,
			displayInfo : true,
			emptyMsg: "No data to display".l("g")
		};

		me.callParent();
	},
	dateRenderer : function (value, metadata, record, rowIndex, colIndex, store) {

		var d = Ext.Date.parse(value, 'c');

		return Ext.util.Format.date(d, usr_dateformat);
	},
	ManageContractCriteria : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Manage Contract Criteria".l('SC60000');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-document';
	},
	ContractEdit : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Contract".l('SC60000'); //.l('RAP-A05-06');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';

	},
	ManageChild : function (value, metadata, record, rowIndex, colIndex, store) {
		if (value == true)
			return "Yes";
		else
			return "No";
	},

	ContractDelete : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Contract".l('SC60000'); //.l('RAP-A05-06');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}

});
