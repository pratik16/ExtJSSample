Ext.define('Regardz.view.dashboard.AlertView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.alertview',
    modal: true,
    width: 1120,
    border: false,
    autoShow: true,
    
    initComponent: function () {

        var me = this;
        me.items = [{
            xtype: 'form',
            itemid: 'alertviewid',
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
            items: [{
                xtype: 'panel',
                //frame: true,
                border: false,
                style: 'background:none; border:0px;',
                layout: 'vbox',
                padding: '0 0 5 0',
                items: [
				{
                    xtype: 'displayfield',
                    fieldLabel: 'Contact'.l('SC61100'),
                    name: 'IndividualName'
                },
				{
                    xtype: 'displayfield',
                    fieldLabel: 'E-mail'.l('SC61300'),
                    name: 'Email'
                },
				
				{
                    xtype: 'displayfield',
                    fieldLabel: 'Telephone'.l('SC61300'),
                    name: 'Phone'
                },
				{
                    xtype: 'displayfield',
                    fieldLabel: 'Status'.l('SC61300'),
                    name: 'Status'
                },
				{
                    xtype: 'displayfield',
                    fieldLabel: 'Number'.l('SC61300'),
                    name: 'BookingNumber'
                },
				{
                    xtype: 'displayfield',
                    fieldLabel: 'Name'.l('SC61300'),
                    name: 'PropertyFeatureName'
                },
				{
                    xtype: 'displayfield',
                    fieldLabel: 'Start'.l('SC61300'),
                    name: 'BookingStartDate'
                },
				{
                    xtype: 'displayfield',
                    fieldLabel: 'End'.l('SC61300'),
                    name: 'BookingEndDate'
                },
				{
                    xtype: 'displayfield',
                    fieldLabel: 'Location'.l('SC61300'),
                    name: 'PropertyName'
                },
				{
                    xtype: 'displayfield',
                    fieldLabel: 'Number of people'.l('SC61300'),
                    name: 'NoOfPeople'
                },{
                    xtype: 'hidden',
                    name: 'BookingId'
                }]
            }]
        }];
        me.callParent(arguments);
    }
});