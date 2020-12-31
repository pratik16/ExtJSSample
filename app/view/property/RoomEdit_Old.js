Ext.define('Regardz.view.property.RoomEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.roomedit',
    modal: false,
    width: parseInt(Ext.getBody().getViewSize().width / 2),
    border: false,
    title: 'Room Manage_Title'.l('SC33100'),

    initComponent: function () {

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
            //height: parseInt(Ext.getBody().getViewSize().height/2),
            buttonAlign: 'end',
            items: [{
                xtype: 'hidden',
                name: 'RoomId'
            }, {
                xtype: 'hidden',
                name: 'CreatedBy',
                value: 0
            }, {
                xtype: 'hidden',
                name: 'UpdatedDate'
            }, {
                xtype: 'hidden',
                name: 'UpdatedBy',
                value: 0
            }, {
                xtype: 'hidden',
                name: 'clone',
                value: false
            }, {
                xtype: 'textfield',
                fieldLabel: 'External Name',
                name: 'ExternalName',
                allowBlank: false,
                maxLength: 80
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Internal Name',
                name: 'InternalName',
                allowBlank: false,
                maxLength: 80
            }, {
                xtype: 'textareafield',
                grow: true,
                fieldLabel: 'Description'.l('SC33100'),
                name: 'Description',
                selectOnFocus: true,
                anchor: '100%',
                allowBlank: false
            }, {
                xtype: 'hidden',
                name: 'PropertyId',
                value: me.PropertyId
            }, {
                xtype: 'combo',
                name: 'RoomTypeId',
                fieldLabel: 'Room Type'.l('SC33100'),
                displayField: 'RoomTypeName',
                valueField: 'RoomTypeId',
                emptyText: "Select Room Type".l('SC33100'),
                anchor: '100%',
                store: Ext.getStore('property.RoomTypeComboStore'),
                allowBlank: false
            },
            //             {
            //                xtype: 'combo',
            //                name: 'RoomClassificationId',
            //                //fieldLabel: 'Room Clasification'.l('SC33100'),
            //                fieldLabel: 'Classification'.l('SC33100'),
            //                displayField: 'Classification',
            //                valueField: 'RoomClassificationId',
            //                emptyText: "Select Room Clasification".l('SC33100'),
            //                anchor: '100%',
            //                store: Ext.getStore('property.RoomClasificationComboStore')
            //            }, 
                {
                xtype: 'combo',
                name: 'OutletId',
                fieldLabel: 'Outlet'.l('SC33100'),
                displayField: '',
                valueField: 'OutletId',
                emptyText: "Select Outlet".l('SC33100'),
                anchor: '100%',
                store: Ext.getStore(''),
                allowBlank: false
            }, {
                xtype: 'textfield',
                fieldLabel: 'Turn time buffer',
                name: 'TurnTime',
                allowBlank: false,
                maxLength: 80
            },{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Dimensions'.l('SC33100')
                }, { xtype: 'container',
                    //layout: 'form',
                    items: [{
                        xtype: 'numberfield',
                        fieldLabel: 'Width'.l('SC33100'),
                        name: 'Width',
                        allowBlank: false,
                        action: 'room_width',
                        maxValue: 25000,
                        minValue: 0,
                        labelWidth: 120,
                        decimalPrecision: 2,
                        //decimalSeparator: ',',
                        step: 0.10
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Length'.l('SC33100'),
                        name: 'Length',
                        allowBlank: false,
                        action: 'room_length',
                        maxValue: 25000,
                        minValue: 0,
                        labelWidth: 120,
                        decimalPrecision: 2,
                        // decimalSeparator: ',',
                        step: 0.10
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Height'.l('SC33100'),
                        name: 'Height',
                        allowBlank: false,
                        action: 'room_height',
                        maxValue: 25000,
                        minValue: 0,
                        labelWidth: 120,
                        decimalPrecision: 2,
                        //decimalSeparator: ',',
                        step: 0.10
                    }, {
                        xtype: 'displayfield',
                        labelWidth: 120,
                        name: 'Surface',
                        fieldLabel: 'Surface'.l('SC33100')
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
                boxLabel: 'Online available'.l('SC33100'),
                padding: '0 0 0 105px',
                allowBlank: true,
                inputValue: true,
                checked: false
            }, {
                xtype: 'checkbox',
                name: 'IsVirtual',
                boxLabel: 'Is Virtual'.l('SC33100'),
                padding: '0 0 0 105px',
                allowBlank: true,
                inputValue: true,
                checked: false
            }, {
                xtype: 'checkbox',
                name: 'IsSharable',
                boxLabel: 'Is Sharable'.l('SC33100'),
                padding: '0 0 0 105px',
                allowBlank: true,
                action: 'is_sharable_checked',
                checked: false,
                inputValue: true
            }, {
                xtype: 'form',
                frame: true,
                cls: 'propertyEdit',
                style: 'background:none; border:0px;',
                id: 'capacities',
                autoScroll: true,
                height: parseInt(Ext.getBody().getViewSize().height * (0.25))
            }, {
                xtype: 'hidden',
                name: 'CreatedDate'
            }, {
                xtype: 'hidden',
                name: 'RoomSetupIds'
            }, {
                xtype: 'hidden',
                name: 'Capacities'
            }],
            buttons: [{
                text: 'Cancel'.l('w'),
                action: 'cancel',
                handler: function () {
                    me.destroy();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'room_save'
            }]
        }];
        //console.log('end form');
        me.callParent(arguments);
    }
});