Ext.define('Regardz.view.mastervalues.CcardTypeManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.ccardtypemanage',
    modal: true,
    width: 400,
    border: false,
    title: 'Add Ccard_Title'.l('SC20910'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('addCcardType'))
            Ext.getCmp('addCcardType').destroy();

        var me = this;

        me.disableitems = true;
        if (me.ccardTypeId > 0) {
            me.disableitems = false;
        }

        me.items = [{
            xtype: 'form',
            id: 'addCcardType',
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
                name: 'CcardTypeId',
                value: me.ccardTypeId
            }, {
                xtype: 'textfield',
                fieldLabel: 'Ccard Name'.l('SC20900'),
                name: 'Name',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 50
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Description'.l('SC20910'),
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
                action: 'saveCcardType'
            }
				]
        }
		];
        me.callParent(arguments);
    }
});