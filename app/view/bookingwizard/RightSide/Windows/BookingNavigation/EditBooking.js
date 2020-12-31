Ext.define('Regardz.view.bookingwizard.RightSide.Windows.BookingNavigation.EditBooking', {
    extend: 'Ext.window.Window',
    alias: 'widget.bookingnavigationeditbooking',
    modal: true,
    border: false,
    maximizable: true,
    autoShow: true,
    title: 'Edit Booking'.l('SC50110'),

    initComponent: function () {
        var me = this;
        
        me.bigPanel = {
            xtype: 'form',
            itemid: 'formEditBookingNav',
            border: false,
            frame: false,
            margin: 10,
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Name'.l('SC50110') + '*',
                name: 'BookingName',
                value: me.bookingname,
                allowBlank: false  // requires a non-empty value
            }, {
                xtype: 'textfield',
                name: 'noofpeople',
                value: me.noOfPeople,
                fieldLabel: 'No. of people'.l('SC50110') + '*'
            },
            
             {
             xtype: 'combo',
             fieldLabel: 'Meeting type'.l('SC50110'),
             name: 'MeetingTypeId',
             displayField: 'PropertyFeatureName',
             valueField: 'PropertyFeatureId',
             value: me.meetingTypeId,
             store: Ext.getStore('common.MeetingTypeStore')
         },
             {
                 xtype: 'hidden',
                 name: 'ReservationId',
                 value: me.reservationId

             }, {
                 xtype: 'hidden',
                 name: 'BookingId',
                 value: me.bookingId

             }, {
                 xtype: 'hidden',
                 name: 'BookingTrackingId',
                 value: me.bookingTrackingId

             }],
            buttons: [{
                text: 'Close'.l('w'),
                handler: function () {
                    me.close();
                }
            }, {
                text: 'Save'.l('w'),
                itemid: 'saveEditBookingFromNav'
            }]

        }
        me.items = [me.bigPanel];

        me.callParent();
    }
});
