Ext.define('Regardz.view.property.ItemMenuManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.itemmenumanage',
    modal: true,
    initComponent: function () {
        var me = this;

        me.height = parseInt(Ext.getBody().getViewSize().height * (0.52));
        me.width = parseInt(Ext.getBody().getViewSize().width * (0.4));

        me.MenuItemId = (me.MenuItemId > 0) ? me.MenuItemId : 0;
        me.itemGroupId = (me.itemGroupId > 0) ? me.itemGroupId : 0;

        me.disableitems = true;
        me.allowBlank = false;
        me.langClass = 'languagebutton-disable';

        if (me.MenuItemId > 0) {
            me.disableitems = false;
            me.allowBlank = true;
            me.langClass = 'languagebutton';
        } 

        me.autoShow = true;
        Ext.apply(me, {
            title: 'Manage Property Group Item Menu Edit_Title'.l('SC31149'),
            items: {
                xtype: 'form',
                itemid: 'itemMenuManage',
                border: false,
                padding: 5,
                buttonAlign: 'right',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Menu Title*'.l('SC31149'),
                    name: 'MenuItemName',
                    labelWidth: 90,
                    anchor: '100%',
                    padding: '20 5 0 5',
                    allowBlank: false,
                    maxLength: 500
                }, {
                    xtype: 'textarea',
                    fieldLabel: 'Description*'.l('SC31149'),
                    name: 'Description',
                    anchor: '100%',
                    labelWidth: 90,
                    height: 205,
                    padding: '10 5 0 5',
                    allowBlank: false,
                    maxLength: 2000
                }, {
                    xtype: 'hidden',
                    name: 'MenuItemId',
                    value: me.MenuItemId
                }, {
                    xtype: 'hidden',
                    name: 'ItemGroupId',
                    value: me.itemGroupId
                }, {
                    xtype: 'hidden',
                    name: 'PropertyId'                    
                }, {
                    xtype: 'hidden',
                    name: 'IsActive'
                }, {
                    xtype: 'hidden',
                    name: 'LanguageId'
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
                }],
                buttons: [{
                    text: 'Cancel'.l('w'),
                    scope: me,
                    handler: function () {
                        this.close()
                    }
                }, {
                    text: 'Save'.l('w'),
                    action: 'saveItemMenu'
                }],
                tbar: ['->', {
                    xtype: 'button',
                    itemid: 'menuItemLanguage',
                    action: 'saveMenuItemLang',
                    tooltip: 'Update multilingual contents'.l('g'),
                    disabled: me.disableitems,
                    iconCls: me.langClass
                }]
            }

        });
        me.callParent();
    }
});