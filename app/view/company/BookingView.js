Ext.define('Regardz.view.company.BookingView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bookingview',
    modal: true,
    width: 1120,
    border: false,
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('bookingview'))
            Ext.getCmp('bookingview').destroy();

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'bookingview',
            border: false,
            bodyStyle: 'padding:5px 5px 0',
            //width: 350,
            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 100
            },
            defaults: {
                anchor: '100%'
            },
            fileUpload: true,
            items: [{
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    padding: '0 0 5 0',
                    items: [{
                               xtype: 'displayfield',
                               fieldLabel: 'Contact'.l('SC61300'),
                               name: 'IndividualName'
                           }, {
                               xtype: 'displayfield',
                               fieldLabel: 'E-mail'.l('SC61300'),
                               name: 'Email'
                           }, {
                               xtype: 'displayfield',
                               fieldLabel: 'Telephone'.l('SC61300'),
                               name: 'Phone'
                           }, { 
                                xtype: 'displayfield', 
                                fieldLabel: 'Status'.l('SC61300'),
                                name: 'Status'
                           }, {
                               xtype: 'displayfield',
                               name: 'BookingId',
                               fieldLabel: 'Number'.l('SC61300')
                           }, {
                               xtype: 'displayfield',
                               fieldLabel: 'Name'.l('SC61300'),
                               name: 'BookingName'
                           }, {
                               xtype: 'displayfield',
                               fieldLabel: 'Start'.l('SC61300'),
                               name: 'StartDate'
                           }, {
                               xtype: 'displayfield',
                               fieldLabel: 'End'.l('SC61300'),
                               name: 'EndDate'
                           }, {
                               xtype: 'displayfield',
                               fieldLabel: 'Location'.l('SC61300')
                               //name: 'Mobile'
                           }, {
                               xtype: 'displayfield',
                               fieldLabel: 'Number of people'.l('SC61300'),
                               name: 'NoOfPeople'
                           }, {
                               xtype: 'displayfield',
                               fieldLabel: 'Meeting type'.l('SC61300')
                               //name: 'Mobile'
                           }, {
                               xtype: 'hidden'
                               //name: 'BookingId'
                           }, {
                                xtype: 'panel',
                                width: '100%',
                                border: 0,
                                layout: { type: 'table', columns: 3 },
                                items: [
                                    { xtype: 'displayfield', fieldLabel: 'BAR'.l('SC61300') }, //name: 'Mobile' },
                                    { xtype: 'displayfield', fieldLabel: 'A'.l('SC61300') },//name: 'Mobile' },
                                    { xtype: 'displayfield', fieldLabel: 'C'.l('SC61300') },//name: 'Mobile' },
                                    { xtype: 'displayfield', fieldLabel: 'Package'.l('SC61300') },//name: 'Mobile' },
                                    { xtype: 'displayfield' },//name: 'Mobile' },
                                    { xtype: 'displayfield' },//name: 'Mobile' },
                                    { xtype: 'displayfield', fieldLabel: 'Room rent'.l('SC61300') },//name: 'Mobile' },
                                    { xtype: 'displayfield' },//name: 'Mobile' },
                                    { xtype: 'displayfield' },//name: 'Mobile' },
                                    { xtype: 'displayfield', fieldLabel: 'Extra Items'.l('SC61300') },//name: 'Mobile' },
                                    { xtype: 'displayfield' },//name: 'Mobile' },
                                    { xtype: 'displayfield' },//name: 'Mobile' },
                                    { xtype: 'displayfield', fieldLabel: 'Total price'.l('SC61300') },//name: 'Mobile' },
                                    { xtype: 'displayfield' },//name: 'Mobile' },
                                    { xtype: 'displayfield' }//name: 'Mobile' }
                                ]
                           }, {
                               xtype: 'displayfield',
                               fieldLabel: 'Package'.l('SC61300')
                               //name: 'Mobile'
                           }]
                    }]
        }];
        me.callParent(arguments);
    }
});