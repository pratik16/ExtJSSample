Ext.define('Regardz.view.company.MergeAddress', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mergeaddress',
    modal: true,
    border: false,
    autoShow: true,
    width: parseInt(Ext.getBody().getViewSize().width * (0.95)),
    layout: 'hbox',
    initComponent: function () {

        if (Ext.getCmp('MergeAddress'))
            Ext.getCmp('MergeAddress').destroy();

        if (Ext.getCmp('MergeAddress2'))
            Ext.getCmp('MergeAddress2').destroy();

        var me = this;
        me.items = [
        {
            xtype: 'form',
            id: 'MergeAddress',
            itemid: 'MergeAddress',
            border: false,
            bodyStyle: 'padding:5px 5px 0',
            fieldDefaults: { msgTarget: 'side', labelWidth: 100 },
            defaults: { anchor: '100%' },
            //width: '57%',
            layout: { type: 'table', columns: 6 },
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Invoice address'.l('SC61140'),
                    width: parseInt(me.width * (0.40)),
                    layout: 'anchor',
                    defaults: { anchor: '100%', height: 22 },
                    items:
                    [{
                        xtype: 'panel', border: false, layout: 'hbox',
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Address'.l('SC61140'),
                            name: 'InvoiceAddress',
                            itemid: 'InvoiceAddressL', 
                            labelWidth: 155,
                            width: parseInt(me.width * 0.36)
                        }, {
                            xtype: 'button',
                            action: 'addInvoAddrMerge',
                            iconCls: 'icon-edit',
                            margin: '0',
                            itemid: 'addInvoAddrMerge',
                            labelWidth: 25
                        }]
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Postal code'.l('SC61140'),
                        name: 'InvoicePostalCode',
                        itemid: 'InvoicePostalCodeL',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'City'.l('SC61140'),
                        name: 'InvoiceCity',
                        itemid: 'InvoiceCityL',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Country'.l('SC61140'),
                        name: 'InvoiceCountry',
                        itemid: 'InvoiceCountryL',
                        labelWidth: 155
                    }, { xtype: 'hidden', itemid: 'InvoiceAddressId1', name: 'InvoiceAddressId'}]
                }, { xtype: 'tbspacer', width: 40 }, {
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    //padding: '0 0 20px 0',
                    items:
                        [{ xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "Address1"}]
                }, { xtype: 'tbspacer', width: 5 }, {
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    //padding: '0 0 20px 0',
                    items:
                        [{ xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "Address1"}]
                }, { xtype: 'tbspacer', width: 40 }, {
                    xtype: 'fieldset',
                    title: 'Visiting address'.l('SC61140'),
                    width: parseInt(me.width * (0.40)),
                    layout: 'anchor',
                    defaults: { anchor: '100%', height: 22 },
                    items:
                    [{
                        xtype: 'panel', border: false, layout: 'hbox',
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Address'.l('SC61140'),
                            name: 'VisitingAddress',
                            itemid: 'VisitingAddressL',
                            labelWidth: 155,
                            width: parseInt(me.width * 0.36)
                        }, {
                            xtype: 'button',
                            action: 'addVisitAddrMerge',
                            iconCls: 'icon-edit',
                            margin: '0',
                            itemid: 'addVisitAddrMerge',
                            labelWidth: 25
                        }]
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Postal code'.l('SC61140'),
                        name: 'VisitingPostalCode',
                        itemid: 'VisitingPostalCodeL',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'City'.l('SC61140'),
                        name: 'VisitingCity',
                        itemid: 'VisitingCityL',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Country'.l('SC61140'),
                        name: 'VisitingCountry',
                        itemid: 'VisitingCountryL',
                        labelWidth: 155
                    }, { xtype: 'hidden', itemid: 'VisitingAddressId1', name: 'VisitingAddressId'}]
                }, { xtype: 'tbspacer', width: 40 }, {
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    //padding: '0 0 5 0',
                    items:
                        [{ xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "Address2"}]
                }, { xtype: 'tbspacer', width: 5 }, {
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    //padding: '0 0 5 0',
                    items:
                        [{ xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "Address2"}]
                }, { xtype: 'tbspacer', width: 40 }, {
                    xtype: 'fieldset',
                    title: 'Postal address'.l('SC61140'),
                    width: parseInt(me.width * (0.40)),
                    layout: 'anchor',
                    defaults: { anchor: '100%', height: 22 },
                    items:
                    [{
                        xtype: 'panel', border: false, layout: 'hbox',
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Address'.l('SC61140'),
                            name: 'PostalAddress',
                            itemid: 'PostalAddressL',
                            labelWidth: 155,
                            width: parseInt(me.width * 0.36)
                        }, {
                            xtype: 'button',
                            action: 'addPostAddrMerge',
                            iconCls: 'icon-edit',
                            margin: '0',
                            itemid: 'addPostAddrMerge',
                            labelWidth: 25
                        }]
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Postal code'.l('SC61140'),
                        name: 'PostalPostalCode',
                        itemid: 'PostalPostalCodeL',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'City'.l('SC61140'),
                        name: 'PostalCity',
                        itemid: 'PostalCityL',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Country'.l('SC61140'),
                        name: 'PostalCountry',
                        itemid: 'PostalCountryL',
                        labelWidth: 155
                    }, { xtype: 'hidden', itemid: 'PostalAddressId1', name: 'PostalAddressId'}]
                }, { xtype: 'tbspacer', width: 40 }, {
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    //padding: '0 0 5 0',
                    items:
                        [{ xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "Address3"}]
                }, { xtype: 'tbspacer', width: 5 }, {
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    //padding: '0 0 5 0',
                    items:
                        [{ xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "Address3"}]
                }, { xtype: 'tbspacer', width: 40}]
        }, {
            xtype: 'form',
            id: 'MergeAddress2',
            border: false,
            bodyStyle: 'padding:5px 5px 0',
            fieldDefaults: { msgTarget: 'side', labelWidth: 100 },
            defaults: { anchor: '100%' },
            //width: '43%',
            fileUpload: true,
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Invoice address'.l('SC61140'),
                    width: parseInt(me.width * (0.40)),
                    layout: 'anchor',
                    defaults: { anchor: '100%', height: 22 },
                    items:
                    [{
                        xtype: 'displayfield',
                        fieldLabel: 'Address'.l('SC61140'),
                        name: 'InvoiceAddress',
                        itemid: 'InvoiceAddressR',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Postal code'.l('SC61140'),
                        name: 'InvoicePostalCode',
                        itemid: 'InvoicePostalCodeR',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'City'.l('SC61140'),
                        name: 'InvoiceCity',
                        itemid: 'InvoiceCityR',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Country'.l('SC61140'),
                        name: 'InvoiceCountry',
                        itemid: 'InvoiceCountryR',
                        labelWidth: 155
                    }, { xtype: 'hidden', itemid: 'InvoiceAddressId2', name: 'InvoiceAddressId'}]
                }, {
                    xtype: 'fieldset',
                    title: 'Visiting address'.l('SC61140'),
                    width: parseInt(me.width * (0.40)),
                    layout: 'anchor',
                    defaults: { anchor: '100%', height: 22 },
                    items:
                    [{
                        xtype: 'displayfield',
                        fieldLabel: 'Address'.l('SC61140'),
                        name: 'VisitingAddress',
                        itemid: 'VisitingAddressR',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Postal code'.l('SC61140'),
                        name: 'VisitingPostalCode',
                        itemid: 'VisitingPostalCodeR',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'City'.l('SC61140'),
                        name: 'VisitingCity',
                        itemid: 'VisitingCityR',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Country'.l('SC61140'),
                        name: 'VisitingCountry',
                        itemid: 'VisitingCountryR',
                        labelWidth: 155
                    }, { xtype: 'hidden', itemid: 'VisitingAddressId2', name: 'VisitingAddressId'}]
                }, {
                    xtype: 'fieldset',
                    title: 'Postal address'.l('SC61140'),
                    width: parseInt(me.width * (0.40)),
                    layout: 'anchor',
                    defaults: { anchor: '100%', height: 22 },
                    items:
                    [{
                        xtype: 'displayfield',
                        fieldLabel: 'Address'.l('SC61140'),
                        name: 'PostalAddress',
                        itemid: 'PostalAddressR',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Postal code'.l('SC61140'),
                        name: 'PostalPostalCode',
                        itemid: 'PostalPostalCodeR',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'City'.l('SC61140'),
                        name: 'PostalCity',
                        itemid: 'PostalCityR',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Country'.l('SC61140'),
                        name: 'PostalCountry',
                        itemid: 'PostalCountryR',
                        labelWidth: 155
                    }, { xtype: 'hidden', itemid: 'PostalAddressId2', name: 'PostalAddressId'}]
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Accept'.l('SC61140'),
                    itemid: 'addressTabAccept',
                    inputValue: true,
                    width: parseInt(me.width * (0.40))
                }

                ]
        }, { xtype: 'hidden', itemid: 'MergeAddressBtn1', value: 1 }, { xtype: 'hidden', itemid: 'MergeAddressBtn2', value: 1 }, { xtype: 'hidden', itemid: 'MergeAddressBtn3', value: 1 }

            ];

        me.callParent(arguments);
    }
});
