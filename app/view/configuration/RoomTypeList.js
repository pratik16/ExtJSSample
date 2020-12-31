Ext.define('Regardz.view.configuration.RoomTypeList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.roomtypelist',
	store : 'configuration.RoomTypeStore',
	loadMask : true,
	requires: [
		'Ext.ux.form.SearchField'
	],
	initComponent : function () {

		var me = this;
		me.title = 'Room Type List_Title'.l('SC20100');
		me.autoHeight = true;
		me.columns = [{
		    header: 'Room Type'.l('SC20100'),
		    dataIndex: 'RoomTypeName',
		    flex: 1
		},
                {
                    header: 'Max Pax',
                    dataIndex: 'MaxPax',
                    width: 75
                }, {
                    header: 'Min m2',
                    dataIndex: 'MinSize',
                    width: 75
                }, {
                    header: 'Max m2',
                    dataIndex: 'MaxSize',
                    width: 75
                },
			// { header: 'Property'.l('SC20100'), dataIndex: 'PropertyName', flex: 1 },
			{
				dataIndex : 'IsActive',
				renderer : this.IsActive,
				dataIndex : 'IsActive',
				align : 'center',
				width : 25,
				name : 'RoomTypeStatus',
				hideable : false
			}, {
			    dataIndex: 'RoomTypeId',
				renderer : this.editRoomType,
				align : 'center',
				width : 25,
				name : 'RoomTypeEdit',
				hideable : false
			}, {
				dataIndex : 'RoomTypeId',
				renderer : this.deteleRoomType,
				align : 'center',
				width : 25,
				name : 'RoomTypeDelete',
				hideable : false
			},
			//            { dataIndex: 'RoomTypeId', renderer: this.roomTypePrice, align: 'center', width: 25, name: 'RoomTypePrice', hideable: false },
			{
				hidden : true,
				dataIndex : 'RoomTypeId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addRoomType',
				iconCls : 'new',
				text : 'Add New'.l('SC20100'),
				tooltip : 'Add Room Type'.l('SC20100'),
				height : 21
                },'->', {
				xtype : 'button',
				iconCls : 'filter',
				disabled : true
			},
             {
                 xtype: 'searchfield',
                 store: Ext.getStore('configuration.RoomTypeStore'),
                 iconCls: 'filter',
                 paramName: 'searchParam'
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
			var tooltipText = "Click on icon for change status".l('SC20100');
			metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
			metadata.tdCls = 'icon-active';
		} else {
			var tooltipText = "Click on icon for change status".l('SC20100');
			metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
			metadata.tdCls = 'icon-deactive';
		}
	},

	editRoomType : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Room Type".l('SC20100');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	},

	deteleRoomType : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Room Type".l('SC20100');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-dele';
	},

	roomTypePrice : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Add Room Type Price".l('SC20100');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-add-menu';
	}

});