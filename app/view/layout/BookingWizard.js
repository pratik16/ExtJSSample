/*Administration screen code: SC30000*/
Ext.define('Regardz.view.layout.BookingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bookingwizard',
    config: {},

    initComponent: function () {

        var me = this;

        me.layout = 'fit';

        me.items = {
            plain: true,
            border: false,
            layout: 'border',
            id: 'main-regionWizard',
            items: [{
                region: 'center',
                layout: 'fit',
                itemid: 'center-regionBookingWizard',
                xtype: 'bookingwizardpanel'
            }, {
                region: 'east',
                itemid: 'east-regionBookingWizard',
                collapsible: true,
                layout: 'fit',
                width: '25%',
                xtype: 'bookingwizardinfopanel'
            }, {
                region: 'west',
                collapsible: true,
                layout: 'fit',
                itemid: 'west-regionBookingWizard',
                width: 145,
                hidden: true

            }

            ]
        };

        me.callParent();
    }

});