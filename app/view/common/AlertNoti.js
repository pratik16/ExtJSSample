Ext.define('Regardz.view.common.AlertNoti', {
    extend: 'Ext.ux.window.Notification',
    alias: 'widget.alertnoti',
    title: 'Alerts'.l('g'),
    position: 'br',
    manager: 'demo1',
    autoClose: false,
    autoShow: false,
    iconCls: 'ux-notification-icon-alerts',
    //autoCloseDelay: 10000,
    paddingX: 10,
    paddingY: 40,
    itemid: 'alertNotificationsId',
    spacing: 10,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
});
