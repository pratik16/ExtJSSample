Ext.define('Regardz.view.bookingwizard.InvoiceSettings', {
    extend: 'Ext.window.Window',
    alias: 'widget.invoicesettings',
    modal: true,
    autoShow: false,
    border: false,
    title: 'Invoice settings'.l('SC55100'),
    //    store: 'bookingwizard.RoomDetailsStore',
    width: '60%',
    itemid:'invoiceSettingWindow',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'panel',
            bodyStyle: 'background:none;',
            frame: false,
            border: false,
            layout: 'column',
            margin: 10,
            items: [{
                columnWidth: .33,
                margin: 10,
                border: false,
                bodyStyle: 'background:none;',
                items: [
                            {
                                xtype: 'fieldset',
                                bodyStyle: 'background:none;',
                                title: 'Invoice 1 (booker)'.l('SC55100'),
                                height: 100,
                                items: [
                                    {
                                        xtype: 'fieldcontainer',
                                        layout: 'vbox',
                                        items: [{
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Company'.l('SC55100'),
                                            items: [{ xtype: 'displayfield', itemid: 'CompanyName1', flex: 1 }, { xtype: 'hidden', itemid: 'CompanyId1'}]
                                        }, {
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Contact'.l('SC55100'),
                                            items: [{ xtype: 'displayfield', itemid: 'ContactName1', flex: 1 }, { xtype: 'hidden', itemid: 'ContactId1' },
                                                    { xtype: 'hidden', itemid: 'ISBookingId', value: me.BookingId }, { xtype: 'hidden', itemid: 'ISBookingTrackingId', value: me.BookingTrackingId }]
                                        }]
                                    }]
                                },
                            { xtype: 'invoicesettingslist', itemid: 'invoicesettingslist' }
                        ]
                    },
                    {
                        columnWidth: .33,
                        margin: 10,
                        border: false,
                        bodyStyle: 'background:none;',
                        items: [
                        {
                            xtype: 'fieldset',
                            title: 'Invoice 2'.l('SC55100'),
                            height: 100,
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'vbox',
                                    items: [{
                                        xtype: 'fieldcontainer',
                                        fieldLabel: 'Company'.l('SC55100'),
                                        layout: 'hbox',
                                        items: [{ xtype: 'displayfield', itemid: 'CompanyName2', flex: 1 }, { xtype: 'hidden', itemid: 'CompanyId2' },
                                                { xtype: 'button', action: 'btnCompanySelect2', iconCls: 'icon-company', margin: '0 0 0 10'}]
                                    }, {
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        fieldLabel: 'Contact'.l('SC55100'),
                                        items: [{ xtype: 'displayfield', itemid: 'ContactName2', flex: 1 }, { xtype: 'hidden', itemid: 'ContactId2' },
                                                { xtype: 'button', action: 'btnContactSelect2', iconCls: 'icon-contact', margin: '0 0 0 10'}]
                                    }]
                                }]
                            },
                            { xtype: 'invoicesettingslist2', itemid: 'invoicesettingslist2', disabled: true }
                        ]
                    },
                    {
                        columnWidth: .33,
                        margin: 10,
                        border: false,
                        bodyStyle: 'background:none;',
                        items: [
                        {
                            xtype: 'fieldset',
                            title: 'Invoice 3'.l('SC55100'),
                            height: 100,
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'vbox',
                                    items: [{
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        fieldLabel: 'Company'.l('SC55100'),
                                        items: [{ xtype: 'displayfield', itemid: 'CompanyName3', flex: 1 }, { xtype: 'hidden', itemid: 'CompanyId3' },
                                                { xtype: 'button', action: 'btnCompanySelect3', iconCls: 'icon-company', margin: '0 0 0 10'}]
                                    }, {
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        fieldLabel: 'Contact'.l('SC55100'),
                                        items: [{ xtype: 'displayfield', itemid: 'ContactName3', flex: 1 }, { xtype: 'hidden', itemid: 'ContactId3' },
                                                { xtype: 'button', action: 'btnContactSelect3', iconCls: 'icon-contact', margin: '0 0 0 10'}]
                                    }]
                                }
                            ]
                        },
                        { xtype: 'invoicesettingslist3', itemid: 'invoicesettingslist3', disabled: true }
                        ]
                    }],
            buttons: [{
                text: 'Close'.l('g'),
                handler: function () {
                    me.close();
                }
            }, {
                text: 'Save'.l('g'),
                itemid: 'InvoiceSettingsSaveButton',
                action: 'SaveInvoiceSettings',
                disabled: true
            }]
        }];

        me.callParent(arguments);
    }
});