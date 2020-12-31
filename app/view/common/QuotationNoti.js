Ext.define('Regardz.view.common.QuotationNoti', {
    extend: 'Ext.ux.window.Notification',
    alias: 'widget.quotationnoti',
    title: 'Quotations'.l('g'),
    position: 'br',
    manager: 'demo1',
    autoClose: false,
    autoShow: false,
    iconCls: 'ux-notification-icon-quots',
    //autoCloseDelay: 10000,
    paddingX: 10,
    paddingY: 40,
    itemid: 'quotNotificationsId',
    spacing: 10,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
});
