Ext.define('Regardz.view.company.MergeContacts', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mergecontacts',
    //store: 'company.MergeCompaniesStore',
    id: 'mergecontacts',
    itemid: 'mergecontacts',
    modal: true,
    border: false,
    autoShow: true,
    width: parseInt(Ext.getBody().getViewSize().width * (0.95)),
    layout: 'hbox',

    initComponent: function () {
        if (Ext.getCmp('contactviewleft'))
            Ext.getCmp('contactviewleft').destroy();

        if (Ext.getCmp('contactviewright'))
            Ext.getCmp('contactviewright').destroy();

        var me = this;
        me.layout = 'hbox';
        me.items = [
        {
            xtype: 'panel',
            id: 'MergeContacts',
            border: false,
            width: me.width,
            bodyStyle: 'padding:5px 5px 0',
            //fieldDefaults: { msgTarget: 'side', labelWidth: 100 },
            defaults: { anchor: '100%' },
            layout: { type: 'table', columns: 6 },
            fileUpload: true,
            align: top,
            items: [
                {
                    xtype: 'mergeparentcontactslist',
                    itemid: 'mergeparentcontactslistL',
                    width: parseInt(me.width * (0.30)),
                    height: 450,
                    autoScroll: true,
                    align: top
                },
                { xtype: 'tbspacer', width: 10 },
                {
                    xtype: 'panel',
                    border: false,
                    width: parseInt(me.width * (0.30)),
                    items: [
                        {
                            xtype: 'form',
                            id: 'contactviewleft',
                            border: false,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'View left'.l('SC61140'),
                                    width: '100%',
                                    layout: 'anchor',
                                    defaults: { anchor: '100%', height: 20 },
                                    items: [{
                                        xtype: 'panel', border: false, layout: 'hbox', height: 25,
                                        items: [{ xtype: 'displayfield', fieldLabel: 'Name'.l('SC61140'), name: 'IndividualName', labelWidth: 155, width: parseInt(me.width * 0.26) }, {
                                            xtype: 'button',
                                            action: 'editCompanyContact',
                                            iconCls: 'icon-edit',
                                            margin: '0',
                                            itemid: 'btnEditContact',
                                            labelWidth: 25
                                        }]
                                    },
                                        { xtype: 'displayfield', fieldLabel: 'First name'.l('SC61140'), name: 'FirstName', labelWidth: 155 },
                                        { xtype: 'displayfield', fieldLabel: 'Function'.l('SC61140'), name: 'Function', labelWidth: 155 },
                                        { xtype: 'tbspacer', height: 5 },
                                        { xtype: 'displayfield', fieldLabel: 'E-mail'.l('SC61140'), name: 'Email', labelWidth: 155 },
                                        { xtype: 'displayfield', fieldLabel: 'General'.l('SC61140'), name: 'Phone', labelWidth: 155 },
                                        { xtype: 'displayfield', fieldLabel: 'Direct'.l('SC61140'), name: 'Direct', labelWidth: 155 },
                                        { xtype: 'displayfield', fieldLabel: 'Mobile'.l('SC61140'), name: 'Mobile', labelWidth: 155 },
                                        { xtype: 'hidden', itemid: 'primarycontactid', name: 'IndividualId', labelWidth: 155 }
                                    ]
                                }]
                        },
                        {
                            xtype: 'form',
                            id: 'contactviewright',
                            border: false,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'View right'.l('SC61140'),
                                    width: '100%',
                                    layout: 'anchor',
                                    defaults: { anchor: '100%', height: 20 },
                                    items: [
                                        {
                                            xtype: 'panel', border: false, height: 35,
                                            layout: 'hbox', padding: '0',
                                            items: [
                                                {
                                                    xtype: 'radiogroup',
                                                    allowBlank: true,
                                                    vertical: false,
                                                    itemid: 'companycontactstatus',
                                                    items: [
                                                        { boxLabel: 'Move'.l('SC61140'), itemid: 'moveItem', action: 'companycontactstatusmove', name: 'actionName', inputValue: '1', width: 80 },
                                                        { boxLabel: 'Merge'.l('SC61140') + ':', itemid: 'mergeItem', name: 'actionName', action: 'companycontactstatusmerge', inputValue: '0'}]
                                                }, { xtype: 'tbspacer', width: 20 }, {
                                                    xtype: 'combo',
                                                    disabled: true,
                                                    //editable: false,
                                                    itemid: 'primarycompanycontactlist',
                                                    action: 'comboMergeContact',
                                                    emptyText: 'Select Contact'.l('SC61140'),
                                                    store: 'company.CompanyContactListStore',
                                                    queryMode: 'local',
                                                    displayField: 'IndividualName',
                                                    valueField: 'IndividualId'
                                                }]
                                        },
                                        { xtype: 'displayfield', fieldLabel: 'Name'.l('SC61140'), name: 'IndividualName', labelWidth: 155 },
                                        { xtype: 'displayfield', fieldLabel: 'First name'.l('SC61140'), name: 'FirstName', labelWidth: 155 },
                                        { xtype: 'displayfield', fieldLabel: 'Function'.l('SC61140'), name: 'Function', labelWidth: 155 },
                                        { xtype: 'tbspacer', height: 5 },
                                        { xtype: 'displayfield', fieldLabel: 'E-mail'.l('SC61140'), name: 'Email', labelWidth: 155 },
                                        { xtype: 'displayfield', fieldLabel: 'General'.l('SC61140'), name: 'Phone', labelWidth: 155 },
                                        { xtype: 'displayfield', fieldLabel: 'Direct'.l('SC61140'), name: 'Direct', labelWidth: 155 },
                                        { xtype: 'displayfield', fieldLabel: 'Mobile'.l('SC61140'), name: 'Mobile', labelWidth: 155 },
                                        { xtype: 'hidden', itemid: 'secondarycontactid', name: 'IndividualId', labelWidth: 155 }
                                    ]
                                }]
                        }
                        ]
                },
                { xtype: 'tbspacer', width: 10 },
                {
                    xtype: 'panel',
                    border: false,
                    width: parseInt(me.width * (0.30)),
                    items: [
                        {
                            itemid: 'mergecompanycontactslist',
                            xtype: 'mergecompanycontactslist',
                            width: parseInt(me.width * (0.30)),
                            height: 450,
                            autoScroll: true,
                            align: top
                        },
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Accept'.l('SC61140'),
                            itemid: 'contactsTabAccept',
                            inputValue: true,
                            width: '40%'
                        }]
                }]
        }];

        me.callParent(arguments);
    }
});
