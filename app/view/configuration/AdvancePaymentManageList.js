Ext.define('Regardz.view.configuration.AdvancePaymentManageList', {
	extend : 'Ext.grid.Panel',
	alias: 'widget.advancepaymentmanagelist',
    itemid: 'advancepaymentmanagelistgrid',
	store : 'configuration.AdvancePaymentManageStore',
	loadMask : true,
	initComponent : function () {
		var me = this;
		me.autoHeight = true;
		me.title = "Advance Payment List_Title".l('SC23800');
		me.columns = [{
				header : 'Description'.l('SC23800'),
				dataIndex : 'Description',
				flex : 1
			}, {
				header : 'Min Hours'.l('SC23800'),
				dataIndex : 'MinHours',
				align : 'right',
				flex : 1
			}, {
				header : 'Max Hours'.l('SC23800'),
				dataIndex : 'MaxHours',
				align : 'right',
				flex : 1
			}, {
				header : 'Optional Allowed'.l('SC23800'),
				dataIndex : 'IsOptionalAllowed',
				renderer : this.EncryptAdvancePayment,
				align : 'center',
				flex : 1
			}, {
				header : 'Definite Allowed'.l('SC23800'),
				dataIndex : 'IsdefiniteAllowed',
				renderer : this.EncryptAdvancePayment,
				align : 'center',
				flex : 1
            },
             {
				dataIndex : 'AdvancePaymentRuleId',
				align : 'center',
				width : 25,
				renderer : this.AdvancePaymentEdit,
				name : 'AdvancePaymentEdit',
				hideable : false
			}, {
				dataIndex : 'AdvancePaymentRuleId',
				align : 'center',
				width : 25,
				renderer : this.AdvancePaymentDelete,
				name : 'AdvancePaymentDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'AdvancePaymentRuleId',
				align : 'center',
				hideable : false
			} //,
			//{ hidden: true, dataIndex: 'PropertyId', align: 'center', hideable: false },
			//{ hidden: true, dataIndex: 'StartingSlotId', align: 'center', hideable: false }
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addAdvancePayment',
				iconCls : 'new',
				text : 'Add New'.l('SC23800'), //.l('RAP-A05-06'),
				tooltip : 'Add Advance Payment'.l('SC23800') //.l('RAP-A05-06')
			}
		];

		me.bbar = {
			xtype : 'pagingtoolbar',
			store : this.store,
			displayInfo : true,
			emptyMsg : "No data to display".l("g")
		};

		me.callParent();
	},
	EncryptAdvancePayment : function (value, metadata, record, rowIndex, colIndex, store) {
		if (value == true)
		    return "Yes".l("g");
		else
		    return "No".l("g");
	},
	AdvancePaymentEdit : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Advance Payment".l('SC23800'); //.l('RAP-A05-06');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	},
	AdvancePaymentDelete : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Advance Payment".l('SC23800'); //.l('RAP-A05-06');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}
});