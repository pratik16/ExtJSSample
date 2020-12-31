Ext.define('Regardz.view.bookingwizard.AddNewEvent', {
    extend: 'Ext.window.Window',
    alias: 'widget.addnewevent',
    modal: true,
    border: false,
    title: 'Add Event_Title'.l('SC54100'),
    NoOfPerson: null,
    //stores: ['bookingwizard.EventsCombo'],
    initComponent: function () {
        var me = this;

        //        var forms = Ext.ComponentQuery.query('[itemid="formAddEvent"]');
        //        if (forms.length > 0) {
        //            for (var i = 0; i < forms.length - 1; i++) {
        //                forms[i].destroy();
        //            }
        //        }


        me.itemid = 'addnewevent';
        me.items = [{
            xtype: 'form',
            width: 400,
            defaults: { anchor: '100%' },
            frame: true,
            cls: 'propertyEdit',
            itemid: 'formAddEvent',
            bodyStyle: 'padding:5px 5px 0',
            defaultType: 'textfield',
            items: [
                  {
                      xtype: 'hidden',
                      itemid: 'selectedRoomId',
                      name: "RoomId2",
                      value: 0,
                      allowBlank: true
                  },
				{
				    xtype: 'combo',
				    emptyText: 'Select Event type'.l('SC54100'),
				    allowBlank: false,
				    fieldLabel: 'Event Type'.l('SC54100') + '*',
				    name: 'EventId',
				    store: Ext.getStore('bookingwizard.EventsComboStore'),
				    displayField: 'EventName',
				    valueField: 'EventId',
				    forceSelection: true,
				    listeners: {
				        select: function (combo, records, Opts) {
				            Ext.ComponentQuery.query('[itemid="neweventnameid"]')[0].setValue(records[0].data.EventName);
				        },
				        blur: function (t, e, o) {
				            Ext.ComponentQuery.query('[itemid="neweventnameid"]')[0].setValue(t.getDisplayValue());
				        }
				    }

				},
				{
				    fieldLabel: 'Event Name'.l('SC54100') + '*',
				    name: 'EventName',
				    allowBlank: false,
				    itemid: 'neweventnameid'
				},

                 {
                     xtype: 'combo',
                     emptyText: 'Select day'.l('SC54100'),
                     fieldLabel: 'Day'.l('SC54100'),
                     itemid: 'itemComboDaysList',
                     store: Ext.getStore('bookingwizard.MultipleDaysListEvent'),
                     name: 'EventDay',
                     displayField: 'DateString',
                     forceSelection: true,
                     valueField: 'Date',
                     noResize: true,
                     hidden: false
                 },
				{
				    xtype: 'timefield',
				    fieldLabel: 'Start Time'.l('SC54100') + '*',
				    name: 'StartTime',
				    selectOnFocus: true,
				    minValue: '00:00',
				    maxValue: '24:00',
				    value: '08:30',
				    format: "H:i",
				    increment: 05,
				    allowBlank: false,
				    //valueField: 'value',
				    //displayField: 'Name',
				    itemid: 'startTimeAddEvent'
				    //vtype: 'timeValue'
				},
				{
				    xtype: 'timefield',
				    fieldLabel: 'End Time'.l('SC54100') + '*',
				    name: 'EndTime',
				    selectOnFocus: true,
				    minValue: '00:00',
				    maxValue: '24:00',
				    format: "H:i",
				    value: '09:30',
				    increment: 05,
				    allowBlank: false,
				    //valueField: 'value',
				    //displayField: 'Name',
				    itemid: 'endTimeAddEvent'
				    //vtype: 'timeValue'
				},
				{
				    fieldLabel: 'Persons'.l('SC54100') + '*',
				    name: 'NoOfPerson',
				    value: me.NoOfPerson,
				    allowBlank: false
				},
				{
				    xtype: 'combo',
				    emptyText: 'Select Shape'.l('SC54100'),
				    fieldLabel: 'Shape'.l('SC54100') + '*',
				    name: 'RoomSetupId',
				    store: Ext.create('Regardz.store.common.RoomSetupStore'),
				    displayField: 'Arrangement',
				    valueField: 'RoomSetupId',
				    itemid: 'roomsetupidaddevent',
				    forceSelection: true,
				    allowBlank: false

				},
				{
				    xtype: 'panel',
				    layout: 'hbox',
				    items: [
						{
						    xtype: 'radiofield',
						    fieldLabel: 'Room'.l('SC54100') + '*',
						    itemid: 'addNewEventRoomSelection',
						    value: 1,
						    name: 'Room'
						},
						{
						    xtype: 'displayfield',
						    width: 15
						},
						{
						    xtype: 'combo',
						    emptyText: 'Select Room'.l('SC54100'),
						    name: 'RoomId',
						    store: 'bookingwizard.SharableRoomsForProperty',
						    displayField: 'RoomName',
						    valueField: 'RoomId'
						}
				    ]
				},
				{
				    xtype: 'displayfield',
				    height: 10
				},
				{
				    xtype: 'panel',
				    layout: 'hbox',
				    items: [
                        {
                            xtype: 'radiofield',
                            name: 'Room',
                            value: 2,
                            padding: '0 0 0 104'
                        },
						{
						    xtype: 'label',
						    hideEmptyLabel: false,
						    padding: '0 10 0 10',
						    itemid: 'selectedRoomName'
						},
						{
						    xtype: 'displayfield',
						    name: 'selectedRoomFromPlanboard',
						    width: '40%'
						},
                        {
                            xtype: 'hidden',
                            itemid: 'selectedRoomIdFromPlanboard'
                        },
						{
						    xtype: 'button',
						    text: 'Select'.l('SC54100'),
						    width: 100,
						    action: 'selectplanboard'
						}
				    ]
				},
				{
				    xtype: 'displayfield',
				    height: 10
				},
				{
				    xtype: 'combo',
				    emptyText: 'Select Group'.l('SC54100'),
				    fieldLabel: 'Group Name'.l('SC54100'),
				    name: 'GroupName',
				    itemid: 'groupnamecomboid',
				    allowBlank: true,
				    store: Ext.data.StoreManager.lookup("bookingwizard.GroupStore"),
				    displayField: 'GroupName',
				    valueField: 'GroupName'
				}

            ],
            buttons: [{
                text: 'Cancel'.l('g'),
                handler: function () {
                    me.close();
                }
            }, {
                text: 'Save'.l('g'),
                action: 'addEventAction'
            }]
        }];
        me.callParent(arguments);
    }
});
