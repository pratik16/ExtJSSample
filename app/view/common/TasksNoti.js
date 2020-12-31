Ext.define('Regardz.view.common.TasksNoti', {
    extend: 'Ext.ux.window.Notification',
    alias: 'widget.tasksnoti',
    title: 'Tasks'.l('g'),
    position: 'br',
    manager: 'demo1',
    autoClose: false,
    autoShow: false,
    iconCls: 'ux-notification-icon-tasks',
    //autoCloseDelay: 10000,
    paddingX: 10,
    paddingY: 40,
    itemid: 'tasksNotificationsId',
    spacing: 10,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }    
});
