Ext.define('Regardz.view.mastervalues.AddressTypeManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.addresstypemanage',
    modal: true,
    width: 400,
    border: false,
    title: 'Add AddressType_Title'.l('SC21510'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('addAddressType'))
            Ext.getCmp('addAddressType').destroy();

        var me = this;

        me.disableitems = true;
        if (me.addressTypeId > 0) {
            me.disableitems = false;
        }

        me.items = [{
            xtype: 'form',
            id: 'addAddressType',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            fileUpload: true,
            tbar: ['->', {
                xtype: 'button',
                text: 'Language'.l('g'),
                action: 'LanguageContent',
                disabled: me.disableitems
            }
				],
            items: [{
                xtype: 'hidden',
                name: 'LanguageId',
                value: user_language
            }, {
                xtype: 'hidden',
                name: 'AddressTypeId',
                value: me.addressTypeId
            }, {
                xtype: 'textfield',
                fieldLabel: 'AddressType Name'.l('SC21500'),
                name: 'Name',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 50
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Description'.l('SC21510'),
                name: 'Description',
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 500
            }, {
                xtype: 'hidden',
                name: 'CreatedDate'
            }, {
                xtype: 'hidden',
                name: 'CreatedBy'
            }, {
                xtype: 'hidden',
                name: 'UpdatedDate'
            }, {
                xtype: 'hidden',
                name: 'UpdatedBy'
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
                action: 'saveAddressType'
            }
				]
        }
		];
        me.callParent(arguments);
    }
});