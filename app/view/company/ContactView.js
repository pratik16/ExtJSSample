Ext.define('Regardz.view.company.ContactView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.contactview',
    modal: true,
    width: 1120,
    border: false,
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('contactview'))
            Ext.getCmp('contactview').destroy();

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'contactview',
            border: false,
            bodyStyle: 'padding:5px 5px 0',            
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
                items: [{ xtype: 'displayfield', fieldLabel: 'Name'.l('SC61120'), name: 'IndividualName' },
                            { xtype: 'displayfield', fieldLabel: 'First name'.l('SC61120'), name: 'FirstName' },
                            { xtype: 'displayfield', fieldLabel: 'Function'.l('SC61120'), name: 'Function' },
                            { xtype: 'displayfield', fieldLabel: 'E-mail'.l('SC61120'), name: 'Email' },
                            { xtype: 'displayfield', fieldLabel: 'Phone'.l('SC61120'), name: 'Phone' },
                            { xtype: 'displayfield', fieldLabel: 'Direct'.l('SC61120'), name: 'Direct' },
                            { xtype: 'displayfield', fieldLabel: 'Mobile'.l('SC61120'), name: 'Mobile'}]
            }]
        }];
        me.callParent(arguments);
    }
});