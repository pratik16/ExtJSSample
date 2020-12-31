Ext.define('Regardz.view.configuration.FixedPriceManageList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.fixedpricemanagelist',
	store : 'configuration.FixedPriceManageStore',
	requires : ['Ext.ux.form.SearchField'],
	loadMask : true,

	initComponent : function () {

		var me = this;
		//me.autoHeight = true;
		me.title = 'Fixed Price List_Title'.l('SC22000');
		me.columns = [{
				header : 'Name'.l('SC22000'),
				dataIndex : 'Name',
				flex : 1
			}, {
				header : 'Description'.l('SC22000'),
				dataIndex : 'Description',
				flex : 1
			}, {
				header : 'Starting Slot'.l('SC22000'),
				dataIndex : 'TimeSlotcode',
				align : 'center',
				flex : 1
			}, {
				header : 'Type'.l('SC22000'),
				dataIndex : 'TypeId',
				renderer : this.encryptType,
				align : 'center',
				flex : 1
			}, {
				header : 'Duration'.l('SC22000'),
				dataIndex : 'Duration',
				align : 'right',
				flex : 1
			}, {
				dataIndex : 'FixedPriceId',
				align : 'center',
				width : 25,
				renderer : this.ManageEvents,
				name : 'ManageEvents',
				hideable : false
			}, {
				dataIndex : 'FixedPriceId',
				align : 'center',
				width : 25,
				renderer : this.FixedPriceEdit,
				name : 'FixedPriceEdit',
				hideable : false
			}, {
				dataIndex : 'FixedPriceId',
				align : 'center',
				width : 25,
				renderer : this.FixedPriceDelete,
				name : 'FixedPriceDelete',
				hideable : false
			}, {
				dataIndex : 'IsActive',
				renderer : this.FixedPriceStatus,
				align : 'center',
				width : 25,
				name : 'FixedPriceStatus',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'FixedPriceId',
				align : 'center',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'PropertyId',
				align : 'center',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'StartingSlotId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addfixedprice',
				iconCls : 'new',
				text : 'Add New'.l('SC22000'), //.l('RAP-A05-06'),
				tooltip : 'Add Fixed Price'.l('SC22000') //.l('RAP-A05-06')
			}
		];

		me.bbar = {
			xtype : 'pagingtoolbar',
			store : this.store,
			displayInfo : true,
			emptyMsg : "No data to display".l('g')
		};
		me.layout = 'fit';
		me.autoScroll = true;

		//me.autoExpandColumn = 'PropertyName';
		me.height = 250;
		me.viewConfig = {
			forceFit : true
		};
		me.callParent();
	},
	encryptType : function (value, metadata, record, rowIndex, colIndex, store) {		
		if (value == 0)
			return "Meeting Package".l('SC22000');
		else
			return "Catering Package".l('SC22000');
	},
	ManageEvents : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Manage Events".l('SC22000');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-document';
	},

	FixedPriceEdit : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Fixed Price".l('SC22000'); //.l('RAP-A05-06');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';

	},

	FixedPriceDelete : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Fixedprice".l('SC22000'); //.l('RAP-A05-06');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	},
	FixedPriceStatus : function (value, metadata, r, rowIndex, colIndex, store) {
		if (value == true) {
			var tooltipText = 'De Activate'.l('SC22000'); //.l('RAP-A03-01');
			metadata.tdCls = 'icon-active';
		} else {
			var tooltipText = 'Activate'.l('SC22000'); //.l('RAP-A03-01');
			metadata.tdCls = 'icon-deactive';
		}

		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';

	}
});