Ext.define('Regardz.view.company.AddressManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.addressmanage',
    modal: true,
    layout: 'fit',
    width: 400,
    border: false,
    title: 'Address Edit_Title'.l('SC61110'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('addressManage'))
            Ext.getCmp('addressManage').destroy();

        if (Ext.getCmp('invoiceById'))
            Ext.getCmp('invoiceById').destroy();

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'addressManage',
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
                fieldLabel: 'Address'.l('SC61110') + '*',
                maxLength: 60,
                allowBlank: false,
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
            }, {
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
                fieldLabel: 'Main address'.l('SC61110'),
                name: 'IsMainAddress',
                action: 'MainAddress',
                itemid: 'IsMainAddress',
                inputValue: 'true'
            }
       ],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveCompanyAddress'
            }]
        }];
        me.callParent(arguments);
    }
});