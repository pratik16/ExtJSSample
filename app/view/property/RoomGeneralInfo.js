Ext.require([
    'Ext.ux.CheckColumn'
]);
Ext.define('Regardz.view.property.RoomGeneralInfo', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.roomgeneralinfo',
    modal: true,
    width: '100%',
    height: '100%',
    autoScroll: true,
    border: false,
    //title: 'Company Overview', //.l('SC61100'),
    autoShow: true,
    viewConfig: {
        forceFit: true,
        markDirty: false
    },
    initComponent: function () {
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        });
        var me = this;

        if (Ext.getCmp('room_edit_geninfo'))
            Ext.getCmp('room_edit_geninfo').destroy();

        if (Ext.getCmp('capacities'))
            Ext.getCmp('capacities').destroy();

        me.items = [{
            xtype: 'form',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            defaultType: 'textfield',
            layout: 'form',
            id: 'room_edit_geninfo',
            width: '100%',
            height: '100%',
            buttonAlign: 'end',
            defaults: {
                layout: 'fit',
                labelWidth: 150
            },
            items: [{
                xtype: 'panel',
                //frame: true,
                border: false,
                height: '100%',
                //style: 'background:none; border:0px;',
                layout: 'hbox',
                padding: '0 0 5 0',
                items: [{
                    xtype: 'panel',
                    border: true,
                    padding: '0 5 5 0',
                    width: '33%',
                    layout: 'form',
                    items: [{
                        xtype: 'hidden',
                        name: 'RoomId'
                    }, 
                    {
                        xtype: 'hidden',
                        name: 'languageId',
                        value: user_language
                    }, 
                    {
                        xtype: 'hidden',
                        name: 'Sequence'
                    },
                    {
                        xtype: 'hidden',
                        name: 'isClone',
                        value: me.isClone
                    },
                    {
                        xtype: 'hidden',
                        name: 'PropertyId',
                        value: me.PropertyId
                    },
                    {
                        xtype: 'hidden',
                        name: 'RoomClassificationIds'
                    },
                    {
                        xtype: 'hidden',
                        name: 'ChildRoomIds'
                    },
                    {
                        xtype: 'hidden',
                        name: 'RoomSetups'
                    },
                    {
                        xtype: 'hidden',
                        name: 'CreatedBy',
                        value: 0
                    }, {
                        xtype: 'hidden',
                        name: 'CreatedDate'
                    }, {
                        xtype: 'hidden',
                        name: 'UpdatedDate'
                    }, {
                        xtype: 'hidden',
                        name: 'UpdatedBy',
                        value: 0
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'External Name'.l('SC33150')+ '*',
                        name: 'ExternalName',
                        allowBlank: false,
                        maxLength: 80,
                        anchor: '100%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Internal Name'.l('SC33150')+ '*',
                        name: 'RoomName',
                        allowBlank: false,
                        maxLength: 80,
                        anchor: '100%'
                    }, {
                        xtype: 'textareafield',
                        grow: true,
                        fieldLabel: 'Description'.l('SC33150')+ '*',
                        name: 'Description',
                        selectOnFocus: true,
                        anchor: '100%',
                        allowBlank: false
                    }, {
                        xtype: 'combo',
                        name: 'RoomTypeId',
                        fieldLabel: 'Room Type'.l('SC33150')+ '*',
                        displayField: 'RoomTypeName',
                        valueField: 'RoomTypeId',
                        emptyText: "Select Room Type".l('SC33150'),
                        anchor: '100%',
                        store: Ext.getStore('property.RoomTypeComboStore'),
                        allowBlank: false
                    },
                    {
                        xtype: 'combo',
                        name: 'FloorId',
                        fieldLabel: 'Floor'.l('SC33150')+'*',
                        displayField: 'FloorName',
                        valueField: 'FloorId',
                        emptyText: "Select Floor".l('SC33150'),
                        anchor: '100%',
                        store: Ext.getStore('operations.PlanboardFloorsStore'),
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Turn time buffer'.l('SC33150')+ '*',
                        name: 'TurnTimeBuffer',
                        allowBlank: false,
                        maxLength: 80,
                        anchor: '100%',
                        //minValue: 0,
                        vtype: 'numeric'
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Dimensions'.l('SC33150')+ '*'
                        }, {
                            xtype: 'container',
                            // layout: 'form',
                            items: [{
                                xtype: 'numberfield',
                                fieldLabel: 'Width'.l('SC33150'),
                                name: 'Width',
                                allowBlank: false,
                                action: 'room_width',
                                maxValue: 25000,
                                minValue: 0,
                                labelWidth: 80,
                                decimalPrecision: 2,
                                step: 0.10
                            }, {
                                xtype: 'numberfield',
                                fieldLabel: 'Length'.l('SC33150'),
                                name: 'Length',
                                allowBlank: false,
                                action: 'room_length',
                                maxValue: 25000,
                                minValue: 0,
                                labelWidth: 80,
                                decimalPrecision: 2,
                                step: 0.10
                            }, {
                                xtype: 'numberfield',
                                fieldLabel: 'Height'.l('SC33150'),
                                name: 'Height',
                                allowBlank: false,
                                action: 'room_height',
                                maxValue: 25000,
                                minValue: 0,
                                labelWidth: 80,
                                decimalPrecision: 2,
                                step: 0.10
                            }, {
                                xtype: 'displayfield',
                                labelWidth: 80,
                                name: 'Surface',
                                fieldLabel: 'Surface'.l('SC33150')
                            }]
                        }, {
                            xtype: 'container',
                            layout: 'vbox',
                            //padding: '5px',
                            items: [{
                                xtype: 'label',
                                margin: '5 5',
                                text: 'm'
                            }, {
                                xtype: 'label',
                                margin: '7 5',
                                text: 'm'
                            }, {
                                xtype: 'label',
                                margin: '7 5',
                                text: 'm'
                            }, {
                                xtype: 'label',
                                margin: '5 5',
                                text: 'm2'
                            }]
                        }]
                    }, {
                        xtype: 'checkbox',
                        name: 'IsOverBookedRoom',
                        fieldLabel: 'OverBook Room'.l('SC33150'),
                        padding: '5 0 0 0',
                        allowBlank: true,
                        inputValue: true,
                        checked: false,
                        labelWidth: 120
                    },
                     {
                        xtype: 'checkbox',
                        name: 'IsOnlineAvailable',
                        fieldLabel: 'Online available'.l('SC33150'),
                        padding: '5 0 0 0',
                        allowBlank: true,
                        inputValue: true,
                        checked: false,
                        labelWidth: 120
                    }]
                }, {
                    xtype: 'panel',
                    border: false,
                    style: 'background:none; border:0px;',
                    height: '100%',
                    padding: '0 5 5 9',
                    width: '33%',
                    items: [{
                        xtype: 'radiogroup',
                        fieldLabel: 'Sharable'.l('SC33150'),
                        allowBlank: false,
                        columns: 1,
                        // name: 'IsSharable',
                        action: 'is_sharable_checked',
                        items: [{
                            boxLabel: 'No'.l('SC33150'),
                            inputValue: 'false',
                            name: 'IsSharable',
                            checked: true
                        }, {
                            boxLabel: 'Yes'.l('SC33150'),
                            inputValue: 'true',
                            name: 'IsSharable'
                        }]
                    }, {
                        xtype: 'combo',
                        name: 'OutletId',
                        itemid: 'outlet',
                        fieldLabel: 'Outlet'.l('SC33150'),
                        displayField: 'OutletName',
                        valueField: 'OutletId',
                        emptyText: "Select Outlet".l('SC33150'),
                        anchor: '100%',
                        store: Ext.getStore('property.OutletsListByPropertyStore'),
                        allowBlank: true,
                        disabled: true
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Capacity'.l('SC33150')+'*',
                        name: 'MaxSharingCapacity',
                        itemid: 'capacities',
                        maxLength: 80,
                        anchor: '100%',
                        maxValue: 25000,
                        minValue: 0,
                        disabled: true,
                        allowBlank: false
                    }, {
                        xtype: 'grid',
                        title: "Setups".l('SC33150'),
                        width: '100%',
                        itemid: 'roomsetup',
                        noResize: true,
                        height: 240,
                        plugins: [
		                    Ext.create('Ext.grid.plugin.CellEditing', {
		                        clicksToEdit: 1
		                    })
	                    ],
                        store: Ext.getStore('property.RoomSetupEditPageStore'),
                        cls: 'gridwhitebackground',
                        frame: false,
                        autoScroll: true,
                        //autoExpandColumn: 'Setup',
                        columns: [{
                            header: 'Setup'.l('SC33150'),
                            dataIndex: 'Arrangement',
                            sortable: true
                        }, { width: 10,
                            dataIndex: 'Capacity',
                            flex: 1,
                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false
//                                minValue: 1,
//                                maxValue: 100
                            }
                        }, {
                            hidden: true,
                            dataIndex: 'RoomSetupId',
                            align: 'center',
                            hideable: true
                        }],

                        tbar: ['->', {
                            xtype: 'button',
                            iconCls: 'filter',
                            disabled: true
                        }, 
                        {
                            xtype: 'textfield',
                            itemid: 'searchStringRoomSetup',
                            name: 'searchStringRoomSetup',
                            enableKeyEvents: true
                        },
                        {
                            xtype: 'button',
                            iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                            action: 'clearRoomSetUp',
                            hidden: true
                        },
                            {
                            xtype: 'button',
                            action: 'searchRoomSetUp',
                            iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
                        }
                        
                        ]
                    }]
                }, {
                    xtype: 'panel',
                    border: false,
                    height: '100%',
                    style: 'background:none; border:0px;',
                    padding: '0 2 5 0',
                    width: '33%',
                    items: [{
                        xtype: 'checkbox',
                        name: 'IsVirtual',
                        fieldLabel: 'Combination room'.l('SC33150'),
                        labelWidth: 120,
                        boxLabel: 'Yes, this is an combination room'.l('SC33150'),
                        action: 'is_virtual_checked',
                        padding: '0 0 10 0',
                        allowBlank: true,
                        inputValue: 'true',
                        checked: false
                    }, {
                        xtype: 'grid',
                        title: 'Rooms'.l('SC33150'),
                        store: Ext.getStore('property.RoomListCheckboxStore'),
                        itemid: 'linkedroom',
                        cls: 'gridwhitebackground',
                        height: 300,
                        disabled: true,
                        autoScroll: true,
                        noResize: true,

                        columns: [
                        {dataIndex: 'RoomId'},
                        { header: 'Internal Name'.l('SC33150'), flex: 1, dataIndex: 'RoomName' },
                        { width: 30, dataIndex: 'IsBlocked', xtype: 'checkboxrow'}],

                        tbar: ['->', {
                            xtype: 'button',
                            iconCls: 'filter',
                            disabled: true
                        }, {
                            xtype: 'textfield',
                            name: 'searchStringLinkRoom',
                            itemid: 'searchStringLinkRoom',
                            enableKeyEvents: true
                        },
                         {
                             xtype: 'button',
                             iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                             action: 'clearLinkRoomFilter',
                             hidden: true
                         },
                            {
                                xtype: 'button',
                                action: 'searchLinkRoomFilter',
                                iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
                            }]
                    }]
                }]
            }]
        }];
        
        me.callParent(arguments);
    }
})