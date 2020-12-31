Ext.define('Regardz.view.bookingwizard.EditEvent', {
    extend: 'Ext.window.Window',
    alias: 'widget.editevent',
    modal: true,
    border: false,
    title: 'Edit event_Title'.l('SC54200'),
    bookingEventTrackingId: null,
    bookingEventTitle: '',
    bookingEventId: null,
    uniqueid: 0,
    RoomId: 0,
    IsPartOfPackage: false,
    initComponent: function () {

        var me = this;

        me.itemid = 'editevent';
        me.width = 400;

        me.items = [{
            xtype: 'panel',
            frame: true,
            padding: 15,
            items: [
                        {
                            xtype: 'hidden',
                            name: 'IsPartOfPackage',
                            itemid: 'IsPartOfPackage',
                            value: me.IsPartOfPackage
                        },
                        {
                            xtype: 'hidden',
                            name: 'RoomId',
                            itemid: 'RoomId',
                            value: me.RoomId
                        },

                        {
                            xtype: 'textfield',
                            grow: true,
                            fieldLabel: 'Event name'.l('SC54200'),
                            name: 'eventname',
                            itemid: 'editeventnameinput_' + me.bookingEventTrackingId,
                            anchor: '100%',
                            width: 300,
                            value: me.bookingEventTitle
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'No of People'.l('SC54200'),
                            name: 'NoOfPeople',
                            itemid: 'NoOfPeople',
                            hideTrigger: true,
                            minValue: 0,
                            value: me.NoOfPeople,
                            enableKeyEvents: true
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Setup'.l('SC50110'),
                            name: 'roomSetupId_' + me.uniqueid,
                            itemid: 'roomsetupidstep4',
                            displayField: 'Arrangement',
                            valueField: 'RoomSetupId',                            
                            store: Ext.getStore('bookingwizard.RoomSetupStore'),
                            listConfig: {
                                getInnerTpl: function () {
                                    return '<div class="list-item-{IsMatchWithCapacity}">{Arrangement}&nbsp;<\/div>';
                                }
                            }
                            
                        }
            ]
        }];

        me.dockedItems = [{
            dock: 'bottom',
            buttonAlign: 'right',
            buttons: [
                {
                    text: 'Cancel'.l('g'),
                    handler: function () {
                        me.destroy();
                    }
                },
				{
				    text: 'Save'.l('g'),
				    action: 'saveNewEventName',
				    bookingEventTrackingId: me.bookingEventTrackingId,
				    bookingEventId: me.bookingEventId
				}
            ]
        }];
        me.callParent(arguments);
    }
});