Ext.define('Regardz.view.property.SetBarForYieldCalendar', {
    extend: 'Ext.window.Window',
    alias: 'widget.setbarforyieldcalendar',
    modal: true,
    layout: 'fit',
    width: 550,
    border: false,
    title: 'Set BAR_Title_SCCODE'.l('SC31167'),
    autoShow: true,
    initComponent: function () {

        var me = this;

        if (Ext.getCmp('setBarForYieldCalendar'))
            Ext.getCmp('setBarForYieldCalendar').destroy();       

        me.slotCombo = new Ext.data.SimpleStore({
            fields: ["BarId", "BarName"],
            data: [
			[1, "A"],
			[2, "B"],
			[3, "C"],
			[4, "D"],
            [5, "X"]
            ]
        });

        me.items = [{
            xtype: 'form',
            id: 'setBarForYieldCalendar',
            itemId: 'setBarForYieldCalendar',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:15px;",
            items: [{
                xtype: 'panel',
                frame: true,
                border: false,
                style: 'background:none; border:0px;',
                layout: 'hbox',
                flex: 1,
                items: [{
                    xtype: 'panel',
                    width: '50%',
                    frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    items: [{
                        xtype: 'form',
                        width: '100%',
                        frame: true,
                        border: false,
                        style: 'background:none; border:0px;',
                        id: 'dayList',
                        items: [{
                            xtype: 'checkboxgroup',
                            fieldLabel: 'Applies to'.l('SC31167') + '*',
                            labelWidth: 100,
                            width: '100%',
                            allowBlank: false,
                            columns: 1,
                            vertical: false,
                            items: [{ boxLabel: 'Monday'.l('g'), name: 'day', inputValue: '1' },
                                { boxLabel: 'Tuesday'.l('g'), name: 'day', inputValue: '2' },
                                { boxLabel: 'Wednesday'.l('g'), name: 'day', inputValue: '3' },
                                { boxLabel: 'Thursday'.l('g'), name: 'day', inputValue: '4' },
                                { boxLabel: 'Friday'.l('g'), name: 'day', inputValue: '5' },
                                { boxLabel: 'Saturday'.l('g'), name: 'day', inputValue: '6' },
                                { boxLabel: 'Sunday'.l('g'), name: 'day', inputValue: '7'}]
                        }
                        ]
                    }]
                }, {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: '50%',
                    frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    padding: '0 0 25px 0',
                    items: [{
                        xtype: 'datefield',
                        name: 'StartDate',
                        fieldLabel: 'Start date'.l('SC31167') + '*',
                        format: usr_dateformat,
                        allowBlank: false,
                        submitFormat: 'Y-m-d',
                        minDate: new Date(),
                        anchor: '100%'
                    }, {
                        xtype: 'datefield',
                        name: 'EndDate',
                        fieldLabel: 'End date'.l('SC31167') + '*',
                        format: usr_dateformat,
                        allowBlank: false,
                        submitFormat: 'Y-m-d',
                        minDate: new Date(),
                        anchor: '100%'
                    }, {
                        xtype: 'combo',
                        name: 'RoomTypeId',
                        itemId: 'setBarRoomType',
                        emptyText: 'Select room type',
                        displayField: 'RoomTypeName',
                        valueField: 'RoomTypeId',
                        forceSelection: true,
                        fieldLabel: 'Room type'.l('SC31167'),
                        padding: 0,
                        anchor: '100%',
                        itemid: 'roomType',
                        store: Ext.getStore('common.RoomTypeComboSetBarStore')
                    }, {
                        xtype: 'combo',
                        name: 'RoomId',
                        itemId: 'setBarRoomList',
                        emptyText: '(empty)',
                        fieldLabel: 'Room'.l('SC31167'),
                        displayField: 'RoomName',
                        valueField: 'RoomId',
                        forceSelection:true,
                        disabled: true,
                        store: Ext.getStore('common.RoomListComboSetBarStore')
                    }, {
                        xtype: 'combo',
                        name: 'Slot1Bar',
                        fieldLabel: 'Slot 1'.l('SC31167'),
                        displayField: 'BarName',
                        valueField: 'BarId',
                        forceSelection: true,
                        store: me.slotCombo
                    }, {
                        xtype: 'combo',
                        name: 'Slot2Bar',
                        fieldLabel: 'Slot 2'.l('SC31167'),
                        displayField: 'BarName',
                        valueField: 'BarId',
                        forceSelection: true,
                        store: me.slotCombo
                    }, {
                        xtype: 'combo',
                        name: 'Slot3Bar',
                        fieldLabel: 'Slot 3'.l('SC31167'),
                        displayField: 'BarName',
                        valueField: 'BarId',
                        forceSelection: true,
                        store: me.slotCombo
                    }, {
                        xtype: 'hidden',
                        name: 'PropertyId',
                        value: me.PropertyId
                    }, {
                        xtype: 'hidden',
                        name: 'UserId',
                        value: me.userId
                    }, {
                        xtype: 'hidden',
                        name: 'WeekDays'
                    }]
                }]
            }, {
                xtype: 'textareafield',
                name: 'Reason',
                height: 75,
                allowBlank: false,
                grow: true,
                fieldLabel: 'Reason'.l('SC31167') + '*',
                maxLength: 2000,
                anchor: '100%'
            }],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close()
                }
            }, {
                text: 'Execute'.l('w'),
                action: 'exeBarForYieldCalendar'
            }]
        }
		];
        me.callParent(arguments);
    }
});