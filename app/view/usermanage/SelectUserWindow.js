Ext.define('Regardz.view.usermanage.SelectUserWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.selectuserwindow',
    modal: true,
    width: 650,
    height: 400,
    border: false,
    title: 'Select User_Title'.l('SC61140'),
    layout: 'fit',
    viewConfig: {
        forceFit: true
    },
    autoShow: true,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'selectfromuserlist'
        }, {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: none',
            items: [{
                xtype: 'hidden',
                name: 'UserId',
                value: me.userId
            }, {
                xtype: 'hidden',
                name: 'UserIdentity',
                value: me.userIdentity
            }, {
                xtype: 'hidden',
                name: 'ModuleIdentity',
                itemid: 'ModuleIdentity',
                value: me.ModuleIdentity
            }]
        }];
        me.callParent(arguments);
    }
});