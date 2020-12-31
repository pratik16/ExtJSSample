Ext.define('Regardz.view.extraz.ExtrazCategoriesManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.extrazcategoriesmanage',
    modal: true,
    layout: 'fit',
    width: 300,
    border: false,
    title: 'Extraaz Category Edit_Title'.l('SC37111'),
    autoShow: true,
    initComponent: function () {

        if (Ext.getCmp('addwebshopcategroy'))
            Ext.getCmp('addwebshopcategroy').destroy();

        var me = this;
        me.disableitems = true;
        me.langClass = 'languagebutton-disable';
        if (me.webShopCategoryId > 0) {
            me.disableitems = false;
            me.langClass = 'languagebutton';
        }

        me.tbar = ['->', {
            xtype: 'button',
            itemid: 'langButton',
            tooltip: 'Update multilingual contents'.l('g'),
            cls: me.langClass,
            action: 'LanguageContent',
            disabled: me.disableitems
        }];

        me.items = [{
            xtype: 'form',
            id: 'addwebshopcategroy',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            items: [{
                xtype: 'hidden',
                name: 'LanguageId',
                value: user_language
            }, {
                xtype: 'hidden',
                name: 'WebShopCategoryId',
                value: me.webShopCategoryId
            }, {
                xtype: 'textfield',
                fieldLabel: 'Category'.l('SC37111') + '*',
                name: 'Name',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 400
            }
				],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close()
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveWebshopCategory'
            }
				]
        }
		];
        me.callParent(arguments);
    }
});