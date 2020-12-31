Ext.define('Regardz.view.mastervalues.CcardTypeList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.ccardtypelist',

	store : 'mastervalues.CcardTypeStore',

	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.title = "Ccard Type List_Title".l('SC20900');
		me.columns = [{
				header : 'Ccard Name'.l('SC20900'),
				dataIndex : 'Name',
				flex : 1
			}, {
				dataIndex : 'CcardTypeId',
				renderer : this.editCcardType,
				align : 'center',
				width : 25,
				name : 'CcardTypeEdit',
				hideable : false
			}, {
				dataIndex : 'CcardTypeId',
				renderer : this.deteleCcardType,
				align : 'center',
				width : 25,
				name : 'CcardTypeDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'CcardTypeId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addCcardType',
				iconCls : 'new',
				text : 'Add New'.l('SC20900'),
				tooltip : 'Add Ccard Type'.l('SC20900'),
				height : 21
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

	editCcardType : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update CcardType".l('SC20900');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	},

	deteleCcardType : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete CcardType".l('SC20900');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}

});