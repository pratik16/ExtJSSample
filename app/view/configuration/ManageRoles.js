Ext.define('Regardz.view.configuration.ManageRoles', {
    extend: 'Ext.window.Window',
    alias: 'widget.manageroles',
    modal: true,
    width: 400,
    border: false,
    autoShow: true,
    initComponent: function () {
        if (Ext.getCmp('roleManageForm'))
            Ext.getCmp('roleManageForm').destroy();

        var me = this;
        me.title = "Add Role_Title".l('SC34100');
        me.disableitems = true;
        me.langClass = 'languagebutton-disable';

        if (me.roleId > 0) {
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
            id: 'roleManageForm',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Role Name'.l('SC34100'),
                name: 'RoleName',
                allowBlank: false,
                maxLength: 512,
                anchor: '100%'
            }, {
                xtype: 'combo',
                name: 'roleCode',
                fieldLabel: 'Role Code'.l('SC34100'),
                itemid: 'roleCodeCombo',
                displayField: 'RoleCodeName',
                valueField: 'RoleCodeName',
                emptyText: "Select Role Code".l('SC34100'),
                store: Ext.getStore('configuration.RoleCodeStore'),
                anchor: '100%'


            }, {
                xtype: 'hidden',
                name: 'RoleId',
                value: me.roleId
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
            }, {
                xtype: 'hidden',
                name: 'IsActive',
                value: true
            }, {
                xtype: 'hidden',
                name: 'LanguageId',
                value: user_language
            }],
            buttons: [{
                text: 'Cancel'.l('w'),
                action: 'cancel',
                handler: function () {
                    me.destroy();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveRole'
            }]
        }];
        me.callParent(arguments);
    }
});