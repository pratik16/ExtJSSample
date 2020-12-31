Ext.define('Regardz.view.company.TaskView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.companytaskview',
    modal: true,
    width: 1120,
    border: false,
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('taskview'))
            Ext.getCmp('taskview').destroy();

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'taskview',
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
                items: [{ xtype: 'displayfield', fieldLabel: 'Subject'.l('SC61300'), name: 'Subject' },
                            { xtype: 'displayfield', fieldLabel: 'Date & Time'.l('SC61100'), name: 'DueDate' },
                            { xtype: 'displayfield', fieldLabel: 'Owner'.l('SC61100'), name: 'UserName' },
                            { xtype: 'displayfield', fieldLabel: 'Contact'.l('SC61100'), name: 'IndividualName' },
                            { xtype: 'displayfield', fieldLabel: 'Content'.l('SC61100'), name: 'Description'}]
            }]
        }];
        me.callParent(arguments);
    }
});