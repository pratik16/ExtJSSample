Ext.define('Regardz.view.usermanage.ChangePasswordWin', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.changepasswordwin',
    itemid: 'changepasswordwin',
    border: false,
    initComponent: function () {
        var me = this;
        //me.title = "Change password".l('SC_ChangePassword'); //.l('SC32210');
        me.layout = 'fit';

        me.items = [
                {
                    xtype: 'form',
                    itemid:'frmChangePassword',
                    layout: 'vbox',
                    flex: 1,
                    margin: 20,
                    border: false,
                    items: [
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Old password'.l('SC_ChangePassword') + '*',
                        labelWidth: 120,
                        items: [{
                            xtype: 'textfield',
                            width: 170,
                            itemid: 'oldPassword',
                            allowBlank: false,
                            inputType: 'password'
                        }]
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'New password'.l('SC_ChangePassword') + '*',
                        labelWidth: 120,
                        items: [{
                            xtype: 'textfield',
                            width: 170,
                            itemid: 'newPassword',
                            allowBlank: false,
                            inputType: 'password'
                        }]
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Confirm password'.l('SC_ChangePassword') + '*',
                        labelWidth: 120,
                        items: [{
                            xtype: 'textfield',
                            width: 170,
                            itemid: 'confirmPassword',
                            allowBlank: false,
                            inputType: 'password'
                        }]
                    }]
                }];

        me.buttons = [
//            {
//                text: 'Cancel'.l('w'),
//                action: 'cancel',
//                handler: function () { me.close(); }
//            },
            {
                text: 'Save'.l('w'),
                action: 'ChangeUserPassword'
            }];

        me.callParent();
    }
});