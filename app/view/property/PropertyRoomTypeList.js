Ext.define('Regardz.view.property.PropertyRoomTypeList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.propertyroomtypelist',
	store : 'property.PropertyRoomTypeListStore',
	//store: 'configuration.RoomTypeStore',
	loadMask : true,
	isButtonInGrid: true,
	initComponent : function () {

		var me = this;
		me.title = 'Room Type_Title'.l('SC31800');
		me.height = parseInt(Ext.getBody().getViewSize().height * (0.85));
		me.autoScroll = true;
		me.resizable = true;
		me.frame = true;
		me.columns = [{
		        header: 'Room Type'.l('SC31800'),
				dataIndex : 'RoomTypeName',
				flex : 1
			}, {
				dataIndex : 'Checked',
				renderer : this.IsAssociate,
				align : 'center',
				width : 25,
				hideable : false
			}, {
				dataIndex : 'Checked',
				renderer : this.approveReject,
				width : 110,
				name : 'ApproveReject',
				hideable : false
			}, {
				dataIndex : 'Checked',
				renderer : this.AddItemExemption,
				width : 25,
				name : 'AddItemExemption',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'RoomTypeId',
				align : 'center',
				hideable : false
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

	IsAssociate : function (value, metadata, record, rowIndex, colIndex, store) {
		if (value == 1) {
		    var tooltipText = "Associated".l('SC31800');
			metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
			metadata.tdCls = 'icon-active';
		} else {
            var tooltipText = "Not Associated".l('SC31800');
			metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
			metadata.tdCls = 'icon-deactive';
		}
	},
	approveReject : function (value, metadata, record, rowIndex, colIndex, store) {

		var btnText;
		btnText = '';
		cls = '';

		if (value == 1) {
		    btnText = 'Dissociate'.l('SC31800');
		} else {
		    btnText = 'Associate'.l('SC31800');
		}

        return '<div class="customButtonDiv">' + btnText + '</div>';
        /*
		var id = Ext.id();
		Ext.defer(function () {
			Ext.widget('button', {
				renderTo : id,
				text : btnText,
				width : 100,
				height : 17
			});
		}, 50);
		return Ext.String.format('<div id="{0}"></div>', id);*/

	},
	AddItemExemption : function (value, metadata, record, rowIndex, colIndex, store) {
		if (value == 1) {
		    var tooltipText = "Add Item Exemption".l('SC31800');
			metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
			metadata.tdCls = 'icon-add-menu';
		} else {
			metadata.tdCls = 'icon-add-menu-disable';
		}
	}
});