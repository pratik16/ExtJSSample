Ext.define('Regardz.view.company.SalesUserWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.salesuserwindow',
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

        if (Ext.getCmp('SalesUserWindow'))
            Ext.getCmp('SalesUserWindow').destroy();

        var me = this;
        me.items = [{
            xtype: 'salesuserlist'
        }, {
            xtype: 'form',
            id: 'SalesUserWindow',
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
            }]
        }];
        me.callParent(arguments);
    }
});