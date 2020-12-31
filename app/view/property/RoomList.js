Ext.define('Regardz.view.property.RoomList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.roomlist',
    store: 'property.RoomListStore',
    noResize: true,
    requires: [
		'Ext.ux.form.SearchField'
	],

    initComponent: function () {
        var me = this;
        me.resizable = false;
        me.noResize = true;
        me.title = "Room List_Title".l('SC33000');
        me.width = '100%';
        me.layout = 'fit';
        me.frame = true;

        me.viewConfig = {
            forceFit: true,
            plugins: {
                ptype: 'gridviewdragdrop'
            },
            listeners: {
                drop: function (node, data, dropRec, dropPosition) {

                    //console.log("start = " + data.records[0].data.Sequence + "\n end=" + dropRec.data.Sequence);

                    var PropertyId = data.records[0].data.PropertyId;
                    var RoomId = data.records[0].data.RoomId;
                    var startSequence = data.records[0].data.Sequence;
                    var endSequence = dropRec.data.Sequence;

                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/room/UpdateRoomSequance',
                        type: "GET",
                        params: {
                            id: RoomId,
                            id1: PropertyId,
                            id2: startSequence,
                            languageId: endSequence

                        },
                        success: function (r) {
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            // var r = jsonDecode(response);
                            if (r.success == true) {
                                
                                Ext.getStore('property.RoomListStore').reload();
                            } else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function () { }
                    })
                }
            }
        };
        me.autoExpandColumn = 'RoomName';
        me.columns = [{
            dataIndex: 'IsOverBookedRoom',
            width: 50,
            align: 'center',
            name: 'IsSharable',
            renderer: this.isStatusTrue
        }, {
            header: 'Room Name'.l('SC33000'),
            dataIndex: 'RoomName',
            flex: 1,
            name: 'roomname'
        }, {
            header: 'Room Type'.l('SC33000'),
            dataIndex: 'RoomTypeName',
            width: 100,
            align: 'center',
            name: 'roomtype'
        }, {
            header: 'Floor'.l('SC33000'),
            dataIndex: 'FloorName',
            width: 60,
            align: 'center',
            name: 'FloorName'
        }, {
            header: 'Outlet'.l('SC33000'),
            dataIndex: 'OutletName',
            width: 50,
            align: 'center',
            name: 'OutletName'
        }, {
            header: 'Shareble'.l('SC33000'),
            dataIndex: 'IsSharable',
            width: 75,
            align: 'center',
            name: 'IsSharable',
            renderer: this.isStatusTrue
        }, {
            header: 'Combination'.l('SC33000'),
            dataIndex: 'IsVirtual',
            width: 75,
            align: 'center',
            name: 'IsVirtual',
            renderer: this.isStatusTrue
        }, {
            header: 'Width'.l('SC33000'),
            dataIndex: 'Width',
            width: 50,
            align: 'center',
            name: 'Width',
            renderer: this.decimalComma
        }, {
            header: 'Length'.l('SC33000'),
            dataIndex: 'Length',
            width: 50,
            align: 'center',
            name: 'Length',
            renderer: this.decimalComma
        }, {
            header: 'Height'.l('SC33000'),
            dataIndex: 'Height',
            width: 60,
            align: 'center',
            name: 'Height',
            renderer: this.decimalComma
        }, {
            header: 'Surface'.l('SC33000'),
            dataIndex: 'Surface',
            width: 50,
            align: 'center',
            name: 'Surface',
            renderer: this.decimalComma
        }, {
            dataIndex: 'RoomId',
            align: 'center',
            width: 25,
            name: 'cloneRoom',
            renderer: this.cloneRoomIcon
        }, {
            dataIndex: 'RoomId',
            align: 'center',
            width: 25,
            name: 'editRoom',
            renderer: this.editRoomIcon
        }, {
            dataIndex: 'RoomId',
            align: 'center',
            width: 25,
            name: 'deleteRoom',
            renderer: this.deleteRoomIcon
        }, {
            hidden: true,
            dataIndex: 'RoomId'
        }, {
            hidden: true,
            dataIndex: 'Sequence'
        }];

        me.tbar = [{
            xtype: 'button',
            iconCls: 'new',
            action: 'add_room',
            tooltip: 'Add Room'.l('SC33000'),
            text: 'Add new'.l('SC33000')
        }, '->', {
            xtype: 'checkbox',
            name: 'InVirtual',
            labelWidth: 120,
            boxLabel: 'Combination Rooms'.l('SC33000'),
            itemid: 'combinedRoom',
            inputValue: 'true'
        }, {
            xtype: 'tbspacer',
            width: 20
        }, {
            xtype: 'combo',
            name: 'RoomTypeId',
            displayField: 'RoomTypeName',
            valueField: 'RoomTypeId',
            //emptyText: "All Categories".l('SC33000'),
            padding: 0,
            anchor: '100%',
            itemid: 'roomTypeId',
            value: 0,
            store: Ext.getStore('property.RoomTypeComboStore')
        }, {
            xtype: 'tbspacer',
            width: 10
        }, {
            xtype: 'combo',
            name: 'FloorId',
            displayField: 'FloorName',
            valueField: 'FloorId',
            //emptyText: "All Floors".l('SC33000'),
            padding: 0,
            anchor: '100%',
            itemid: 'floorid',
            value: 0,
            store: Ext.getStore('operations.PlanboardFloorsStore')
        }, {
            xtype: 'tbspacer',
            width: 10
        }, {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'textfield',
            name: 'searchString',
            itemid: 'searchString',
            enableKeyEvents: true
        },
         {
             xtype: 'button',
             iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
             action: 'clearRoomFilter',
             hidden: true
         },
            {
                xtype: 'button',
                action: 'searchRooms',
                iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
            }
        ];

        me.height = parseInt(Ext.getBody().getViewSize().height * (0.85));

        //        me.bbar = {
        //            xtype: 'pagingtoolbar',
        //            store: this.store,
        //            //pageSize: 5,
        //            displayInfo: true,
        //            displayMsg: 'Displaying topics {0} - {1} of {2}',
        //            emptyMsg: "No topics to display".l('g')
        //        };

        me.callParent();
    },

    decimalComma: function (value, metadata, record, rowIndex, colIndex, store) {
        return String(value).replace('.', Ext.util.Format.decimalSeparator);
        //    return 1;
    },

    editRoomIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Edit Room".l('SC33000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';
    },

    //blockLinkedRoomIcon: function (value, metadata, record, rowIndex, colIndex, store) {
    //    if (value == true) {
    //        var tooltipText = "Blocked Link Room".l('SC33000');
    //        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
    //        metadata.tdCls = 'icon-gear';
    //    }
    //},
    isStatusTrue: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value == true) {
            metadata.tdCls = 'icon-yes';
        }
    },
    cloneRoomIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Clone Room".l('SC33000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-copy';
    },

    deleteRoomIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Delete Room".l('SC33000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-delete';
    },

    changeStatusRoomIcon: function (value, metadata, record, rowIndex, colIndex, store) {
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