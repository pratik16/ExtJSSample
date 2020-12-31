Ext.define('Regardz.view.customer.CustomerContactsList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.customercontactslist',
	//store: 'customer.ContractBedroomStore',
	loadMask : true,

	initComponent : function () {

		var me = this;
		//me.autoHeight = true;
		height = 400;
		me.title = "Contacts".l('SC61100');
		me.columns = [{
				header : 'Name'.l('SC61100'),
				dataIndex : 'PropertyName',
				flex : 1
			}, {
				header : 'Title'.l('SC61100'),
				dataIndex : 'CompanyName',
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
				action : 'addTask',
				iconCls : 'new',
				text : 'Add New'.l('SC61300'),
				tooltip : 'Add Contact'.l('SC61100'),
				handler : function () {
					//Ext.create('widget.contractbedroom', { contractId: me.contractId })
				}
			}, {
				xtype : 'tbspacer',
				width : 25
			}, {
				xtype : 'radiofield',
				boxLabel : 'Open'.l('SC61300')
			}, {
				xtype : 'tbspacer',
				width : 25
			}, {
				xtype : 'radiofield',
				boxLabel : 'All'.l('SC61300')
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
