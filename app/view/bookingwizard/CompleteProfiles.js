Ext.define('Regardz.view.bookingwizard.CompleteProfiles', {
    extend: 'Ext.window.Window',
    alias: 'widget.completeprofiles',
    modal: true,
    border: false,
    title: 'Complete Profiles_Title'.l('SC56100'),
    initComponent: function () {
        var me = this;

        me.items = [{
            xtype: 'form',
            width: parseInt(Ext.getBody().getViewSize().width * (0.45)),
            height: parseInt(Ext.getBody().getViewSize().height * (0.60)),
            autoScroll: true,
            itemid: 'completeprofilesId',
            frame: true,
            cls: 'propertyEdit',
            bodyStyle: 'padding:5px 5px 0',

            items: [{
                xtype: 'hiddenfield',
                name: 'AddressTypeId',
                value: 5
            }, {
                xtype: 'hiddenfield',
                name: 'CompanyId'
            }, {
                xtype: 'hiddenfield',
                name: 'IndividualId'
            }, {
                xtype: 'hiddenfield',
                name: 'AddressId'
            }, {
                xtype: 'fieldset',
                title: 'Invoice address'.l('SC56100'),
                items: [{
                    xtype: 'panel',
                    layout: 'form',
                    items: [{
                        xtype: 'textarea',
                        fieldLabel: 'Address'.l('SC56100') + '*',
                        width: '70%',
                        height: 100,
                        maxLength: 60,
                        allowBlank: false,
                        name: 'Address1'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Postal code'.l('SC56100') + '*',
                        allowBlank: false,
                        maxLength: 50,
                        name: 'Pincode'
                    }, {
                        xtype: 'textfield',
                        maxLength: 100,
                        fieldLabel: 'City'.l('SC56100'),
                        name: 'City'
                    }, {
                        xtype: 'combo',
                        fieldLabel: 'Country'.l('SC56100') + '*',
                        name: 'CountryId',
                        store: Ext.getStore('common.CountryStore'),
                        valueField: 'CountryId',
                        displayField: 'CountryName',
                        allowBlank: false
                    }]
                }]
            }, {
                xtype: 'fieldset',
                title: 'Contact'.l('SC56100'),
                items: [{
                    xtype: 'panel',
                    layout: 'form',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Direct phone'.l('SC56100'),
                        vtype: 'customPhoneNumber',
                        name: 'Phone'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Mobile'.l('SC56100'),
                        vtype: 'customPhoneNumber',
                        name: 'Mobile'
                    }, {
                        xtype: 'radiogroup',
                        fieldLabel: 'Invoice Pref'.l('SC61100'),
                        width: '100%',
                        itemid: 'InvoiceEmailRadioStep6',
                        columns: 2,
                        vertical: false,
                        allowBlank: true,
                        items: [{
                            boxLabel: 'Regular mail'.l('SC61110'),
                            name: 'InvoicedBy',
                            inputValue: 0
                        }, {
                            boxLabel: 'E-mail'.l('SC61110'),
                            name: 'InvoicedBy',
                            inputValue: 1,
                            padding: '0 0 0 10'
                        }],
                        listeners: {
                            change: function (field, newValue, oldValue) {
                                var InvoiceEmailTextField = Ext.ComponentQuery.query('textfield[itemid="InvoiceEmailTextFieldStep6"]')[0];

                                if (newValue.InvoicedBy == 0) {
                                    InvoiceEmailTextField.setValue(null);
                                    InvoiceEmailTextField.allowBlank = true;
                                    InvoiceEmailTextField.disable(1);
                                }
                                else {
                                    InvoiceEmailTextField.enable(1);
                                    InvoiceEmailTextField.allowBlank = false;
                                }
                            }
                        }
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'E-mail'.l('SC61110'),
                        itemid: 'InvoiceEmailTextFieldStep6',
                        vtype: 'email',
                        allowBlank: false,
                        name: 'InvoiceEmail'
                    }]
                }]
            }],
            buttons: [{
                text: 'Cancel'.l('g'),
                handler: function () { me.close(); }
            }, {
                text: 'Save'.l('g'),
                action: 'saveCompleteProfiles'
            }]
        }];
        me.callParent(arguments);
    }
});