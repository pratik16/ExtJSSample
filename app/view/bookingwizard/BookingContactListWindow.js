Ext.define('Regardz.view.bookingwizard.BookingContactListWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.bookingcontactlistwindow',
    modal: true,
    width: 800,
    y: 10,
    border: false,
    title: 'Individual search'.l('SC51200'),

    layout: 'fit',
    viewConfig: {
        forceFit: true
    },

    autoShow: true,

    initComponent: function () {
        if (Ext.getCmp('btnSelectBookingCompanyContact'))
            Ext.getCmp('btnSelectBookingCompanyContact').destroy();
        var me = this;

        me.padding = '25px';

        me.items = [{
            xtype: 'panel',
            border: false,
            bodyStyle: 'background: none',
            items: [{
                title: 'Individuals'.l('SC51200'),
                padding: '0',
                xtype: 'bookingcompanycontactlist'
            }, { xtype: 'hidden', itemid: 'ItemNo', name: 'ItemNo', value: me.ItemNo }, { xtype: 'hidden', itemid: 'FormType', name: 'FormType', value: me.FormType}]
        }];

        me.buttons = [{
            text: 'Cancel'.l('g'),
            scope: me,
            handler: function () {
                this.close();
            }
        }, {
            text: 'Select'.l('g'),
            action: 'selectIndividual',
            id: 'btnSelectBookingCompanyContact',

            // itemid: 'btnSelectBookingCompanyContact',
            disabled: true
        }];
        me.callParent(arguments);
    }
});