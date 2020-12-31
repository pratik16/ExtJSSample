Ext.define('Regardz.view.bookingwizard.RightSide.Windows.Invoice.ChangeInvoice', {
    extend: 'Ext.window.Window',
    alias: 'widget.invoicechangeinvoice',
    modal: true,
    border: false,
    title: 'Change Invoice Header'.l('SC55600'),
    width: 700,
    iconCls: ' icon-refresh',
    initComponent: function () {
        var me = this;
        me.topPanel = {
            border: false,
            frame: false,
            xtype: 'form',
            itemid: 'changebookinginvoicedet',
            layout: 'column',
            items: [{
                border: false,
                columnWidth: .50,
                items: [{
                    xtype: 'fieldset',
                    title: 'Invoice information'.l('SC55600'),
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Comapany name'.l('SC55600'),
                            name: 'CompanyName1',
                            itemid: 'companyName1',
                            labelWidth: 120
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Address'.l('SC55600'),
                            name: 'CompanyAddress1',
                            itemid: 'companyAddress1',
                            labelWidth: 120
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Postal code'.l('SC55600'),
                            name: 'CompanyPincode1',
                            itemid: 'companyPincode1',
                            labelWidth: 120
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'City'.l('SC55600'),
                            name: 'CompanyCity1',
                            itemid: 'companyCity1',
                            labelWidth: 120
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Country'.l('SC55600'),
                            name: 'CompanyCountryId1',
                            itemid: 'companyCountryId1',
                            labelWidth: 120
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Purchase number'.l('SC55600'),
                            name: 'PurchaseOrderNumber1',
                            itemid: 'purchaseOrderNumber1',
                            labelWidth: 120
                        }, {
                            xtype: 'hidden',
                            itemid: 'bookingCreditDebitInvoiceId',
                            value: me.BookingCreditDebitInvoiceId,
                            name: 'BookingCreditDebitInvoiceId'
                        }
                    ]
                }
                ]
            }, {
                border: false,
                columnWidth: .50,
                items: [{
                    // Fieldset in Column 1 - collapsible via toggle button
                    xtype: 'fieldset',
                    margin: '0 0 0 10',
                    title: 'Profile/Booking information',
                    defaultType: 'textfield',
                    defaults: { anchor: '100%' },
                    layout: 'anchor',
                    items: [{
                        fieldLabel: 'Comapany name'.l('SC55600') + "*",
                        name: 'CompanyName',
                        itemid: 'companyName',
                        allowBlank: false
                    }, {
                        xtype: 'textarea',
                        fieldLabel: 'Address'.l('SC55600') + "*",
                        name: 'CompanyAddress',
                        itemid: 'companyAddress',
                        maxLength: 60,
                        allowBlank: false
                    }, {
                        fieldLabel: 'Postal code'.l('SC55600') + "*",
                        name: 'CompanyPincode',
                        itemid: 'companyPincode',
                        maxLength: 50,
                        allowBlank: false
                    }, {
                        fieldLabel: 'City'.l('SC55600'),
                        name: 'CompanyCity',
                        maxLength: 100,
                        itemid: 'companyCity'
                    }, {
                        xtype: 'combo',
                        store: 'common.CountryStore',
                        queryMode: 'local',
                        displayField: 'CountryName',
                        valueField: 'CountryId',
                        name: 'CompanyCountryId',
                        itemid: 'companyCountryId',
                        fieldLabel: 'Country'.l('SC55600') + "*",
                        allowBlank: false
                    }, {
                        fieldLabel: 'Purchase number'.l('SC55600'),
                        name: 'PurchaseOrderNumber',
                        itemid: 'purchaseOrderNumber'
                    }]
                }]
            }]
        }
        me.bigPanel = {
            xtype: 'panel',
            border: false,
            frame: false,
            margin: 10,
            items: [me.topPanel],
            buttons: [{
                text: 'Close'.l('w'),
                handler: function () {
                    me.close();
                }
            }, {
                text: 'Process'.l('w'),
                action: 'saveCompanyAddressInvoiceHeader'
            }]
        }
        me.items = [me.bigPanel];
        me.callParent();
    }
});
