Ext.define('Regardz.view.configuration.RoomClassificationList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.roomclassificationlist',
	store : 'configuration.RoomClassificationStore',
	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.title = 'Room Classification List_Title'.l('SC20300');
		me.columns = [{
				header : 'Classification'.l('SC20300'),
				dataIndex : 'Classification',
				flex : 1
			}, {
				dataIndex : 'IsActive',
				renderer : this.IsActive,
				align : 'center',
				width : 25,
				name : 'RoomClassStatus',
				hideable : false
			}, {
				dataIndex : 'PropertyId',
				renderer : this.editRoomClass,
				align : 'center',
				width : 25,
				name : 'RoomClassEdit',
				hideable : false
			}, {
				dataIndex : 'PropertyId',
				renderer : this.deteleRoomClass,
				align : 'center',
				width : 25,
				name : 'RoomClassDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'RoomClassificationId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addRoomClass',
				iconCls : 'new',
				text : 'Add New'.l('SC20300'),
				tooltip : 'Add Room Classification'.l('SC20300')
			}
		];

		me.bbar = {
			xtype : 'pagingtoolbar',
			store : this.store,
			displayInfo : true,
			emptyMsg : "No data to display".l('g')
		};

		me.callParent();
	},
	IsActive : function (value, metadata, record, rowIndex, colIndex, store) {
		if (value == true) {
			var tooltipText = "Click on icon for change status".l('SC20300');
			metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
			metadata.tdCls = 'icon-active';
		} else {
			var tooltipText = "Click on icon for change status".l('SC20300');
			metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
			metadata.tdCls = 'icon-deactive';
		}
	},

	editRoomClass : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Room Classification".l('SC20300');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	},

	deteleRoomClass : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Room Classification".l('SC20300');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-dele';
	}

});