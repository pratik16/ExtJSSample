Ext.define('Regardz.view.company.MergeCompanies', {
    extend: 'Ext.window.Window',
    alias: 'widget.mergecompanies',
    itemid: 'mergecompanies',
    modal: true,
    noResize: true,
    initComponent: function () {

        if (Ext.getCmp('mergecompanies'))
            Ext.getCmp('mergecompanies').destroy();

        if (Ext.getCmp('MergeCompanyWinForm'))
            Ext.getCmp('MergeCompanyWinForm').destroy();

        var me = this;

        me.noResize = true;
        me.autoScroll = true;
        me.height = 650; //parseInt(Ext.getBody().getViewSize().height * (0.95));

        me.general = Ext.create('widget.mergegeneral', { CompanyId: me.CompanyId }); me.general.height = me.height - 100;
        me.address = Ext.create('widget.mergeaddress', { CompanyId: me.CompanyId }); me.address.height = me.height - 100;
        me.sales = Ext.create('widget.mergesales'); me.sales.height = me.height - 100;
        me.logo = Ext.create('widget.mergelogo'); me.logo.height = me.height - 100;
        me.relations = Ext.create('widget.mergerelations'); me.relations.height = me.height - 100;
        me.contacts = Ext.create('widget.mergecontacts'); me.contacts.height = me.height - 100;
        me.overview = Ext.create('widget.mergeoverview'); me.overview.height = me.height - 100;

        me.windowWidth = parseInt(Ext.getBody().getViewSize().width * (0.90));
        me.windowHeight = 650; //parseInt(Ext.getBody().getViewSize().height * (0.95));
        me.tabDisabled = true;

        Ext.apply(me, {
            title: 'Merge Companies'.l('SC61140'),
            autoShow: true,
            y: 0,
            bodyStyle: 'background: none',
            closable: true,
            resizable: true,
            buttonAlign: 'right',
            //layout: 'fit',
            width: me.windowWidth,
            height: me.windowHeight,
            border: false,
            items: [
            { xtype: 'form', hidde: true, name: 'MergeCompanyWinForm', id: 'MergeCompanyWinForm', items: [{ xtype: 'hidden', name: 'CompanyId', value: me.CompanyId}] },
            {
                xtype: 'panel', border: false, width: '100%',
                layout: 'hbox', padding: '0 0 5 0',
                items: [
                {
                    xtype: 'panel', border: false, width: '57%',
                    layout: 'hbox', padding: '0 0 5 0',
                    items: [
                        { xtype: 'displayfield', value: '&nbsp;&nbsp;<font face="bold" size="5">1.</font>', width: '500' },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'panel', border: false, width: '50%',
                            layout: 'vbox', padding: '0 0 5 0',
                            items: [
                                { xtype: 'displayfield',
                                    name: 'CompanyName',
                                    itemid: 'CompanyName',
                                    fieldStyle: 'font-weight:bold;width:200px'
                                }, {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Booking'.l('SC61140'),
                                    name: 'TotalBookings',
                                    itemid: 'TotalBookings'
                                }]
                        }]
                }, {
                    xtype: 'panel', border: false, width: '43%',
                    layout: 'hbox', padding: '0 0 5 0',
                    items: [
                        { xtype: 'displayfield', value: '&nbsp;&nbsp;<font face="bold" size="5">2.</font>', width: '500' },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'panel', border: false, width: '50%',
                            layout: 'vbox', padding: '0 0 5 0',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    name: 'MergedCompanyName',
                                    itemid: 'MergedCompanyName',
                                    fieldStyle: 'font-weight:bold;width:200px'
                                }, {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Booking'.l('SC61140'),
                                    name: 'TotalBookings',
                                    itemid: 'MergeTotalBookings'
                                }]
                        }, {
                            xtype: 'button',
                            labelWidth: 120,
                            itemid: 'btnMergedCompany',
                            action: 'btnMergedCompany',
                            iconCls: 'searchIcon',
                            margin: '0'
                        }, { xtype: 'hidden', name: 'MergeCompanyId', itemid: 'MergeCompanyId' }
                        ]
                }]
            }, {
                xtype: 'tabpanel',
                activeTab: 0,
                id: 'merge_overview',
                plain: false,
                border: false,
                bodyPadding: 1,
                padding: 5,
                //cls: 'icon-Company_Merge',
                layout: 'form',
                style: 'background:none; border:0px;',
                items: [
                {
                    title: 'General'.l('SC61140'),
                    itemid: 'general',
                    name: 'general',
                    activate: true,
                    items: me.general
                }, {
                    title: 'Addresses'.l('SC61140'),
                    itemid: 'addresses',
                    name: 'addresses',
                    disabled: me.tabDisabled,
                    items: me.address
                }, {
                    title: 'Contacts'.l('SC61140'),
                    itemid: 'contacts',
                    name: 'contacts',
                    disabled: me.tabDisabled,
                    items: me.contacts
                }, {
                    title: 'Sales'.l('SC61140'),
                    itemid: 'sales',
                    name: 'sales',
                    disabled: me.tabDisabled,
                    items: me.sales
                }, {
                    title: 'Relations'.l('SC61140'),
                    itemid: 'relations',
                    name: 'relations',
                    disabled: me.tabDisabled,
                    items: me.relations
                }, {
                    title: 'Logo'.l('SC61140'),
                    itemid: 'logo',
                    name: 'logo',
                    disabled: me.tabDisabled,
                    items: me.logo
                }, {
                    title: 'Overview'.l('SC61140'),
                    itemid: 'overview',
                    name: 'overview',
                    disabled: me.tabDisabled,
                    items: me.overview
                }]
            }]
        });
        me.dockedItems = [{
            dock: 'bottom',
            align: 'right',
            buttonAlign: 'right',
            buttons: [{
                text: 'Cancel'.l('w'),
                action: 'cancel',
                handler: function () {
                    me.destroy();
                }
            }, {
                text: 'Merge'.l('SC61140'),
                action: 'mergeBothCompanies'
            }]
        }];
        me.callParent();
    }
});