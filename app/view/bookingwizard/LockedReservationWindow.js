Ext.define('Regardz.view.bookingwizard.LockedReservationWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.lockedreservationwindow',
    modal: true,
    border: false,
    title: 'Override Reservation'.l('SC50000'),
    //stores: ['bookingwizard.AllAttendeesStore', 'bookingwizard.AllAttendeesRoleStore'],
    width: 500,
    autoShow: true,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemid: 'lockedReservationWindow',
            frame: false,
            layout: 'vbox',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:20px;",
            width: '100%',
            items: [{
                xtype: 'panel',
                border: false,
                width: '100%',
                items: [{
                    xtype: 'hidden',
                    name: 'ReservationId',
                    value: me.ReservationId
                }, {
                    xtype: 'hidden',
                    name: 'OverrideDate',
                    value: me.OverrideDate
                }, {
                    xtype: 'hidden',
                    name: 'OverrideBy',
                    value: me.CurrentSessionUserId
                }, {
                    xtype: 'label',
                    forId: 'myFieldId',
                    text: me.APIMessage
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    padding: '5 0 5 180',
                    width: '100%',
                    flex: 1,
                    items: [{
                        xtype: 'button',
                        width: 75,
                        text: 'YES'.l('SC50000'),
                        margin: '0 5 0 5',
                        handler: function () {
                            var OverRideReason = Ext.ComponentQuery.query('textareafield[itemid="OverRideReason"]')[0];
                            OverRideReason.enable();
                            btnOverrideReservation
                            var btnOverrideReservation = Ext.ComponentQuery.query('button[itemid="btnOverrideReservation"]')[0];
                            btnOverrideReservation.enable();
                        }
                    }, {
                        xtype: 'button',
                        width: 75,
                        text: 'NO'.l('SC50000'),
                        margin: '0 5 0 5',
                        handler: function () {
                            me.close();
                        }
                    }]
                }, {
                    xtype: 'tbspacer',
                    height: 25
                }, {
                    xtype: 'textareafield',
                    grow: true,
                    fieldLabel: 'Reason'.l('SC50000'),
                    labelWidth: 25,
                    name: 'OverRideReason',
                    itemid: 'OverRideReason',
                    height: 100,
                    anchor: '100%',
                    disabled: true,
                    width: '100%'
                }]
            }],
            buttons: [{
                text: 'Close'.l('g'),
                handler: function () {
                    me.close();
                }
            }, {
                text: 'Override'.l('SC50000'),
                disabled: true,
                itemid: 'btnOverrideReservation',
                action: 'overrideReservation'
            }]
        }, {
            xtype: 'hidden',
            name: 'BookingTrackingId',
            itemid: 'LRBookingTrackingId',
            value: me.BookingTrackingId
        }, {
            xtype: 'hidden',
            name: 'BookingId',
            itemid: 'LRBookingId',
            value: me.BookingId
        }, {
            xtype: 'hidden',
            name: 'StepNumber',
            itemid: 'LRStepNumber',
            value: me.StepNumber
        }, {
            xtype: 'hidden',
            name: 'Status',
            itemid: 'LRStatus',
            value: me.Status
        }];
        me.callParent(arguments);
    }
});