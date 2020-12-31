Ext.define('Regardz.view.dashboard.TaskBookingListWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.taskbookinglistwindow',
    modal: true,
    width : parseInt(Ext.getBody().getViewSize().width * (0.80)),
    height: 420,
    border: false,
    title: 'Booking List_Title'.l('SC81010'),

    layout: 'fit',
    viewConfig: {
        forceFit: true
    },

    autoShow: true,

    initComponent: function () {

        var me = this;
        me.items = [{
            xtype: 'taskbookinglist' //Name of the view for Listing
        }, {
            xtype: 'form',
            itemid: 'taskBookingList',
            border: false,
            bodyStyle: 'background: none'
        }];
        me.callParent(arguments);
    }
});