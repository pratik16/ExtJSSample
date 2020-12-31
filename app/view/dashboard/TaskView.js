Ext.define('Regardz.view.dashboard.TaskView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.taskview',
    modal: true,
    width: 1120,
    border: false,
    autoShow: true,
    
    initComponent: function () {

        var me = this;
        me.items = [{
            xtype: 'form',
            itemid: 'taskviewid',
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
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Subject'.l('SC61300'),
                    name: 'Subject'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Date & Time'.l('SC61100'),
                    name: 'DueDate',
                    itemid: 'duedate'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Owner'.l('SC61100'),
                    name: 'AssignedUserName'
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        xtype: 'displayfield',
                        fieldLabel: 'Company'.l('SC61100'),
                        name: 'CompanyName',
                        align: 'left',
                        width: 500
                    }, {
                        xtype: 'button',
                        action: 'viewCompany',
                        itemid: 'btnViewCompany',
                        iconCls: 'icon-edit',
                        tooltip: 'Edit Company'.l('SC61100')
                    }
                    ]
                }, { xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        xtype: 'displayfield',
                        fieldLabel: 'Contact'.l('SC61100'),
                        name: 'ContactName',
                        width: 500
                    }, {
                        xtype: 'button',
                        action: 'viewContact',
                        itemid: 'btnViewContact',
                        iconCls: 'icon-edit',
                        tooltip: 'Edit Contact'.l('SC61100')
                    }]
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Content'.l('SC61100'),
                    name: 'Description'
                }, {
                    xtype: 'hidden',
                    name: 'CompanyId'

                }, {
                    xtype: 'hidden',
                    name: 'IndividualId'
                }, {
                    xtype: 'hidden',
                    name: 'HasParent'
                }, {
                    xtype: 'hidden',
                    name: 'HasChild'
                }]
            }]
        }];
        me.callParent(arguments);
    }
});