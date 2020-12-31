/*!
* Ext JS Library 4.0
* Copyright(c) 2006-2011 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/

/**
* Module for desktop application. It will open in new window,
* For the content in this module create MVC style structure for getting the data.
**/
Ext.define('Regardz.ChangePasswordWindow', {
    extend: 'Ext.window.Window',
    id: 'changepass-win',
    requires: ['Regardz.view.usermanage.ChangePasswordWin'],
    init: function () {
        if (Ext.getCmp('changepass-win'))
            Ext.getCmp('changepass-win').destroy();
        this.launcher = {
            text: 'Change password'.l('SC_ChangePassword'),
            iconCls: 'icon-resetPass'
        };
        this.callParent(arguments);
    },
    initComponent: function () {
        var me = this;
        me.title = "Change password".l('SC_ChangePassword'); //.l('SC32210');

        if (Ext.getCmp('changepass-win'))
            Ext.getCmp('changepass-win').destroy();

        me.items = [{ xtype: 'changepasswordwin'}]
        me.callParent();
    }

});