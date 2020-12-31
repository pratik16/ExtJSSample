Ext.define('Regardz.view.bookingwizard.SalesResponsibleUserWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.salesresponsibleuserwindow',
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

        if (Ext.getCmp('SalesResponsibleUserWindow'))
            Ext.getCmp('SalesResponsibleUserWindow').destroy();

        var me = this;
        me.items = [{
            xtype: 'salesresponsibleuserlist'
        }, {
            xtype: 'form',
            id: 'SalesResponsibleUserWindow',
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