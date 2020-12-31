Ext.define('Regardz.view.property.RoomList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.roomlist',
	store : 'property.RoomListStore',
	requires : [
		'Ext.ux.form.SearchField'
	],
	isButtonInGrid: true,
	initComponent : function () {
		var me = this;
		me.resizable = true;
		me.title = "Room List_Title".l('SC33000');
		me.columns = [{
				header : 'Room Name'.l('SC33000'),
				dataIndex : 'RoomName',
				flex : 1,
				name : 'roomname'
			}, {
				header : 'Room Type'.l('SC33000'),
				dataIndex : 'RoomTypeName',
				width : 200,
				align : 'left',
				name : 'roomtype'
			}, {
				dataIndex : 'RoomId',
				align : 'center',
				width : 25,
				name : 'editRoom',
				renderer : this.editRoomIcon
			}, {
				dataIndex : 'IsVirtual',
				align : 'center',
				width : 25,
				name : 'blockLinkedRoom',
				renderer : this.blockLinkedRoomIcon
			}, {
				dataIndex : 'RoomId',
				align : 'center',
				width : 25,
				name : 'cloneRoom',
				renderer : this.cloneRoomIcon
			}, {
				dataIndex : 'RoomId',
				align : 'center',
				width : 25,
				name : 'deleteRoom',
				renderer : this.deleteRoomIcon
			}, {
				dataIndex : 'IsActive',
				align : 'center',
				width : 25,
				name : 'changestatusRoom',
				renderer : this.changeStatusRoomIcon
			}, {
				hidden : true,
				dataIndex : 'RoomId'
			}
		];

		me.tbar = [{
				xtype : 'button',
				iconCls : 'new',
				action : 'add_room',
				tooltip : 'Add Room'.l('SC33000'),
				text : 'Add new'.l('SC33000')
			}
		];
		me.layout = 'fit';
		me.autoScroll = true;
		me.frame = true;
		me.height = parseInt(Ext.getBody().getViewSize().height * (0.85));
		me.viewConfig = {
			forceFit : true
		};

		me.bbar = {
			xtype : 'pagingtoolbar',
			store : this.store,
			//pageSize: 5,
			languageId : user_language,
			displayInfo : true,
			displayMsg : 'Displaying topics {0} - {1} of {2}'
		};

		me.callParent();

	},

	editRoomIcon : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Edit Room".l('SC33000');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	},

	blockLinkedRoomIcon : function (value, metadata, record, rowIndex, colIndex, store) {

		if (value == true) {
			var tooltipText = "Blocked Link Room".l('SC33000');
			metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
			metadata.tdCls = 'icon-gear';
		}
	},

	cloneRoomIcon : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Clone Room".l('SC33000');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-copy';
	},

	deleteRoomIcon : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Room".l('SC33000');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	},

	changeStatusRoomIcon : function (value, metadata, record, rowIndex, colIndex, store) {

		if (value == true) {
			var tooltipText = "DeActivate Room".l('SC33000');
			metadata.tdCls = 'icon-active';
		} else {
			var tooltipText = "Activate Room".l('SC33000');
			metadata.tdCls = 'icon-deactive';
		}

		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
	}

});