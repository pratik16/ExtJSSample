Ext.define('Regardz.view.operations.windows.inhouse.BufferTimeEditWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.buffertimeeditwindow',
    modal: false,
    border: false,
    title: 'Set Turn Time Buffer_Title'.l('SC73200'),
    width: parseInt(Ext.getBody().getViewSize().width * (0.30)),
    height: parseInt(Ext.getBody().getViewSize().height * (0.18)),
    autoShow: true,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemid: 'turnTimeBufferForm',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:25px;",
            layout: 'hbox',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Buffer time'.l('SC73200') + '*',
                name: 'SetupTime',
                allowBlank: false,
                selectOnFocus: true,
                vtype: 'numeric'
            }, {
                xtype: 'label',
                padding: '3 5',
                text: 'Minutes'.l('SC73200')
            }, {
                xtype: 'hidden',
                name: 'BookingEventId',
                value: me.bookingEventId
            }, {
                xtype: 'hidden',
                name: 'BookingEventTrackingId',
                value: me.bookingEventTrackingId
            }, {
                xtype: 'hidden',
                name: 'UpdatedDate'
            }, {
                xtype: 'hidden',
                name: 'UpdatedBy'
            }]
        }];

        me.buttons = [{
            text: 'Cancel'.l('g'),
            action: 'turnTimeBufferCancel',
            handler: function () {
                me.close();
            }
        }, {
            text: 'Save'.l('g'),
            action: 'turnTimeBuffer',
            itemid: 'turnTimeBufferButton'
        }];
        me.callParent();
    }
});