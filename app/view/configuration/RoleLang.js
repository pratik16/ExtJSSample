Ext.define('Regardz.view.configuration.RoleLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.rolelang',
    //layout: 'absolute',
    modal: false,
    width: 400,
    border: false,
    title: 'Lang Role',
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('roleLang'))
            Ext.getCmp('roleLang').destroy();

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'roleLang',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            fileUpload: true,
            items: [{
                xtype: 'combo',
                name: 'LanguageId',
                fieldLabel: 'Lang. for content',
                displayField: 'Name',
                valueField: 'LanguageId',
                anchor: '100%',
                allowBlank: false,
                store: Ext.getStore('common.LanguageListStore')
            }, {
                xtype: 'hidden',
                name: 'RoleId',
                value: me.roleId
            }, {
                xtype: 'hidden',
                name: 'LangRoleId',
                value: 0
            }, {
                xtype: 'textfield',
                fieldLabel: 'Name',
                name: 'RoleName',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 512
            }],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveRoleLang'
            }]
        }];
        me.callParent(arguments);
    }
});