Ext.define('Regardz.view.configuration.DiscountManageList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.discountmanagelist',
	store : 'configuration.DiscountManageStore',
	loadMask : true,

	initComponent : function () {
		var me = this;
		me.autoHeight = true;
		me.title = 'Discount List_Title'.l('SC23400');
		me.columns = [{
				header : 'Discount Name'.l('SC23400'),
				dataIndex : 'DiscountName',
				flex : 1
			}, {
				header : 'Value'.l('SC23400'),
				dataIndex : 'DiscountValue',
				flex : 1
			}, {
				dataIndex : 'DiscountId',
				align : 'center',
				width : 25,
				renderer : this.DiscountEdit,
				name : 'DiscountEdit',
				hideable : false
			}, {
				dataIndex : 'DiscountId',
				align : 'center',
				width : 25,
				renderer : this.DiscountDelete,
				name : 'DiscountDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'DiscountId',
				align : 'center',
				hideable : false
			}

		];

		me.tbar = [{
				xtype : 'button',
				action : 'addDiscount',
				iconCls : 'new',
				text : 'Add New'.l('SC23400'),
				tooltip : 'Add New Discount'.l('SC23400')
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
	DiscountEdit : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Discount".l('SC23400');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';

	},
	DiscountDelete : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Discount".l('SC23400');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}

});