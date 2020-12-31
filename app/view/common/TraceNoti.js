Ext.define('Regardz.view.common.TraceNoti', {
    extend: 'Ext.ux.window.Notification',
    alias: 'widget.tracenoti',
    title: 'Traces'.l('g'),
    position: 'br',
    manager: 'demo1',
    autoClose: false,
    autoShow: false,
    iconCls: 'ux-notification-icon-traces',
    //autoCloseDelay: 10000,
    paddingX: 10,
    paddingY: 40,
    itemid: 'traceNotificationsId',
    spacing: 10,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
});
