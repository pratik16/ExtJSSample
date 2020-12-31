Ext.define('Regardz.view.dashboard.DashboardView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dashboardview',
    height: parseInt(Ext.getBody().getViewSize().height * (0.27)),
    //border: false,
    modal: true,
    initComponent: function () {
        var me = this;

        me.title = 'View'.l('SC61300');
        me.collapsible = true;
        me.noResize = true;
        //me.itemid = 'dashboardview';
        me.frame = true;
        me.autoScroll = true;
        me.items = [{
            xtype: 'container',
            layout: 'anchor',
            itemid: 'dashboardviewid',
            width: '100%',
            height: 100,
            //height: '39%',
            defaults: {
                padding: '2 5 2 5'
            },
            items: [{
                xtype: 'panel',
                hidden: true,
                itemid: 'dashboarddraftview',
                items: [{ xtype: 'draftquatationview'}]
            }, {
                xtype: 'panel',
                hidden: true,
                itemid: 'dashboardtaskview',
                items: [{ xtype: 'taskview'}]
            }, {
                xtype: 'panel',
                hidden: true,
                itemid: 'dashboardtraceview',
                items: [{ xtype: 'traceview'}]
            },
            {
                xtype: 'panel',
                hidden: true,
                itemid: 'dashboardalertview',
                items: [{ xtype: 'alertview'}]
            }
            ]
        }];
        me.callParent(arguments);
    }
});