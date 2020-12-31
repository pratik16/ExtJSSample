Ext.define('Regardz.view.bookingwizard.RoomDetailWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.roomdetailwindow',
    modal: true,
    border: false,
    title: 'Room Informartion'.l('SC52100'),
    store: 'bookingwizard.RoomDetailsStore',
    itemid: 'itemRoomDetailWindow',
    id: 'idroomdetailwindow',
    width: '60%',
    initComponent: function () {

        var me = this;
        me.itemid = 'windowRoomInformation';



        var roomSetupGrid = Ext.create('Ext.grid.Panel', {
            store: 'bookingwizard.RoomSetupListStore',
            width: '50%',
            height: 310,
            autoScroll: true,
            margin: '18 10 10 0',
            itemid: "roomSetupGrid",
            noResize: true,
            title: 'Setups'.l('SC52100') + ':',
            columns: [
                        {
                            header: 'Setup'.l('SC52100'),
                            dataIndex: 'Arrangement',
                            width: '50%'
                        },
                        {
                            header: 'MAX'.l('SC52100'),
                            dataIndex: 'Description',
                            width: '50%'
                        }
            ]
        });

        me.TabGeneralInfo = {
            xtype: 'panel',
            border: false,
            layout: 'vbox',
            items: [
                {

                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    frame: false,
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Information'.l('SC52100') + ':',
                            margin: 10,
                            width: '50%',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'External name'.l('SC52100') + ':',
                                    itemid: 'txtExternalName'
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Internal name'.l('SC52100') + ':',
                                    itemid: 'txtInternalName'

                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Area'.l('SC52100') + ':',
                                    itemid: 'txtArea'
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Lenght'.l('SC52100') + ':',
                                    itemid: 'txtLength'
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Width'.l('SC52100') + ':',
                                    itemid: 'txtWidth'
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Height'.l('SC52100') + ':',
                                    itemid: 'txtHeight'
                                }


                            ]

                        },
                        roomSetupGrid
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Description'.l('SC52100'),
                    margin: 10,
                    width: '100%',
                    items: [{
                        xtype: 'label',
                        itemid: 'roomDescriptionLabel'
                    }
                    ]
                }
            ]
        };

        me.photosList = Ext.create('Ext.grid.Panel', {
            xtype: 'gridpanel',
            store: 'property.RoomPhotoListStore',
            itemid: "roomPhotosList",
            title: "Photos".l("SC52100"),
            hideHeaders: true,
            height: 400,
            width: '20%',
            margin: '10',
            noResize: true,
            tbar: [{
                xtype: 'button',
                //iconCls: 'scroll-up-arrow',
                cls: 'image-button-up',
                action: 'actionPropertyScrollUp',
                width: '100%',
                listeners: {
                    click: function () {
                        var row = me.photosList.getView().getNode(0);
                        if (Utils.isValid(row)) {
                            var height = Ext.get(row).getHeight()
                            me.photosList.scrollByDeltaY(-height);
                        }
                    }
                }
            }],
            bbar: [{
                xtype: 'button',
                //  iconCls: 'scroll-down-arrow',
                cls: 'image-button-down',
                action: 'actionPropertyScrollDown',
                width: '100%',
                listeners: {
                    click: function () {
                        var row = me.photosList.getView().getNode(0);
                        if (Utils.isValid(row)) {
                            var height = Ext.get(row).getHeight()
                            me.photosList.scrollByDeltaY(height);
                        }
                    }
                }
            }],
            columns: [
                { flex: 1, width: 80, header: '', dataIndex: 'OriginalThumbImagePath', renderer: this.renderIcon }, //OriginalThumbImagePath
                {hidden: true, dataIndex: 'RoomPhotosId', hideable: false }
            ]
        });

        me.TabRoomPhotos = {
            xtype: 'panel',
            border: false,
            layout: 'hbox',
            items: [me.photosList, //List
                {
                xtype: 'image',
                itemid: "roomImageHolder",
                title: "View".l("SC51200"),
                width: 382,
                height: 382,
                margin: '10',
                layout: {
                    type: 'hbox',
                    align: 'center'
                }

            }, // Big image
                {
                xtype: 'panel',
                title: "Description".l("SC52100"),
                height: 400,
                width: '20%',
                margin: '10',
                items: [{
                    xtype: 'label',
                    margin: '10',
                    itemid: "roomPhotoDescription"
                }]
            } //Description
            ]
        };

        me.TabRoomFloors = {
            xtype: 'panel',
            border: false,
            layout: 'hbox',
            items: [
                {
                    xtype: 'gridpanel',
                    store: 'bookingwizard.RoomFloorPlanStore',
                    itemid: "floorPlanList",
                    title: "Floor plans".l("SC52100"),
                    height: 400,
                    width: '25%',
                    margin: '10',
                    noResize: true,
                    hideHeaders: true,
                    columns: [
                        { baseCls: '', width: 80, header: '', dataIndex: 'DisplayName', flex: 1 },
                        { width: 30, header: 'OL', dataIndex: 'Category', renderer: this.renderFloorCategory },
                        { hidden: true, dataIndex: 'PropertyFloorPlanId', hideable: false }
                    ]
                }, //Left
                {
                xtype: 'panel',
                itemid: "mainFloor",
                height: 400,
                width: '75%',
                margin: '10',
                noResize: true

            }//Right
            ]
        };
        me.RoomInformationTabs = {
            xtype: 'tabpanel',
            activeTab: 0,
            width: '100%',
            plain: false,
            border: false,
            bodyPadding: 1,
            padding: 5,
            layout: 'form',
            style: 'background:none; border:0px !important;',
            items: [{
                title: 'General Information'.l('SC52100'),
                name: 'generalInfoContentTab',
                items: [me.TabGeneralInfo]
            }, //end tab 1
            {
            title: 'Photos'.l('SC52100'),
            name: 'photoContentTab',
            items: [{
                width: '100%',
                items: [me.TabRoomPhotos]
            }]
        }, //end tab 2
            {
            title: 'Floor maps'.l('SC52100'),
            name: 'floorContentTab',
            items: [{

                width: '100%',
                items: [me.TabRoomFloors]
            }]
        }]
    };

    me.items = [{
        xtype: 'form',
        frame: true,
        bodyStyle: 'padding:5px 5px 0',

        items: [
                me.RoomInformationTabs
            ],
        buttons: [{
            text: 'Close'.l('w'),
            handler: function () {
                me.hide();
            }
        }]
    }];
    me.callParent(arguments);
},
renderIcon: function (value, metadata, record, rowIndex, colIndex, store) {

    metadata.style = "background-color:white !important;text-align:center;";
    return '<img src="' + image_path + record.raw.OriginalThumbImagePath + '">';
},
renderFloorCategory: function (value, metadata, record, rowIndex, colIndex, store) {
    if (record.raw.Category == 'ROP') {
        metadata.css = metadata.css + ' icon-checked';
    }

}
});