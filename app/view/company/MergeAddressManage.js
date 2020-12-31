Ext.define('Regardz.view.company.MergeAddressManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.mergeaddressmanage',
    modal: true,
    layout: 'fit',
    width: 400,
    border: false,
    title: 'Address Edit_Title'.l('SC61110'),
    autoShow: false,

    initComponent: function () {

        if (Ext.getCmp('mergeAddressManage'))
            Ext.getCmp('mergeAddressManage').destroy();

        if (Ext.getCmp('invoiceById'))
            Ext.getCmp('invoiceById').destroy();

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'mergeAddressManage',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            defaultType: 'textfield',
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
                xtype: 'hidden',
                name: 'AddressId',
                value: 0
            }, {
                xtype: 'hidden',
                name: 'CompanyId',
                value: me.CompanyId
            }, {
                xtype: 'hidden',
                name: 'IndividualId',
                value: me.IndividualId
            }, { xtype: 'textarea',
                fieldLabel: 'Address'.l('SC61110')+'*',
                allowBlank: false,
                maxLength: 60,
                name: 'Address1'
            }, {
                fieldLabel: 'Postal code'.l('SC61110')+'*',
                allowBlank: false,
                maxLength: 50,
                name: 'Pincode'
            }, { fieldLabel: 'City'.l('SC61110'),
                maxLength: 100,
                name: 'City'
            }, {
                xtype: 'hidden',
                name: 'AddressTypeId',
                value: me.AddressTypeId
            }, {
                xtype: 'hidden',
                name: 'AddressType',
                value: me.AddressType
            }, {
                xtype: 'combo',
                fieldLabel: 'Country'.l('SC61110')+'*',
                name: 'CountryId',
                emptyText: 'Select Country'.l('SC61110'),
                allowBlank: false,
                store: 'common.CountryStore',
                queryMode: 'local',
                displayField: 'CountryName',
                valueField: 'CountryId'
            }, {
                xtype: 'radiogroup',
                fieldLabel: 'Type'.l('SC61110')+'*',
                itemid: 'addressTypeRadio',
                width: 250,
                columns: 1,
                allowBlank: false,
                vertical: false,
                items: [{
                    boxLabel: 'Postal address'.l('SC61110'),
                    name: 'AddressType1',
                    inputValue: 'POST'
                }, {
                    boxLabel: 'Visiting address'.l('SC61110'),
                    name: 'AddressType1',
                    inputValue: 'VISIT'
                    //checked: true
                }, {
                    boxLabel: 'Invoice address'.l('SC61110'),
                    name: 'AddressType1',
                    inputValue: 'INVOICE'
                }]
//                ,listeners: {
//                    change: function (field, newValue, oldValue) {
//                        var value = newValue.show;
//                        //                        if (Ext.isArray(value)) {
//                        //                            return;
//                        //                        }
//                        console.log(newValue);
//                        if (newValue.AddressType1 == 'INVOICE') {
//                            Ext.getCmp('invoiceById').enable();
//                        }
//                        else {
//                            Ext.getCmp('invoiceById').disable();
//                            //Ext.getCmp('invoiceById').disabled = true;
//                        }
//                    }
//                }
            },
            //            , {
            //                xtype: 'radiogroup',
            //                fieldLabel: 'Invoice by'.l('SC61110')+'*',
            //                width: 250,
            //                id: 'invoiceById',
            //                disabled: true,
            //                columns: 1,
            //                vertical: false,
            //                allowBlank: false,
            //                items: [{
            //                    boxLabel: 'Regular mail'.l('SC61110'),
            //                    name: 'InvoicedBy',
            //                    inputValue: 0
            //                }, {
            //                    boxLabel: 'E-mail'.l('SC61110'),
            //                    name: 'InvoicedBy',
            //                    inputValue: 1
            //                    //checked: true
            //                }, {
            //                    xtype: 'container',
            //                    layout: 'hbox',
            //                    //padding: '0 0 5px 0',
            //                    flex: 1,
            //                    items: [{
            //                        xtype: 'textfield',
            //                        fieldLabel: '',
            //                        //vtype: 'numeric',
            //                        name: 'Email'
            //                    }]
            //                }]
            //            },
        {
        fieldLabel: 'Attention To'.l('SC61110'),
        xtype: 'displayfield',
        itemid: 'attentiontoText',
        margin: '-5 0 0 125',
        disabled: true
    }, {
        name: 'AttentionTo',
        xtype: 'textfield',
        itemid: 'attentiontoValue',
        margin: '5 0 5 125',
        disabled: true,
        //vtype: 'email',
        maxLength: 200
    }, {
        xtype: 'checkbox',
        //hideEmptyLabel: false,
        fieldLabel: 'Main address'.l('SC61110'),
        name: 'MainAddress',
        action: 'MainAddress',
        inputValue: 'true'
    }],
            buttons: [{
                text: 'Cancel'.l('w'),
                //action: 'cancel',
                handler: function () {
                    me.destroy();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveCompanyAddressMerge'
            }]
        }];
        me.callParent(arguments);
    }
});