Ext.define('Regardz.view.mastervalues.AddressTypeList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.addresstypelist',

	store : 'mastervalues.AddressTypeStore',

	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.title = "AddressType List_Title".l('SC21500');
		me.columns = [{
				header : 'AddressType Name'.l('SC21500'),
				dataIndex : 'Name',
				flex : 1
			}, {
				dataIndex : 'AddressTypeId',
				renderer : this.editAddressType,
				align : 'center',
				width : 25,
				name : 'AddressTypeEdit',
				hideable : false
			}, {
				dataIndex : 'AddressTypeId',
				renderer : this.deteleAddressType,
				align : 'center',
				width : 25,
				name : 'AddressTypeDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'AddressTypeId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addAddressType',
				iconCls : 'new',
				text : 'Add New'.l('SC21500'),
				tooltip : 'Add AddressType'.l('SC21500')
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

	editAddressType : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update AddressType".l('SC21500');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	},

	deteleAddressType : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete AddressType".l('SC21500');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}

});