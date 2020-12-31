Ext.define('Regardz.controller.layout.Dashboard', {
    extend: 'Ext.app.Controller',
    views: ['layout.Dashboard'],
    thisController: false,
    init: function () {
        var me = this;
        this.control({
            'dashboard tabpanel tab': {
                activate: function (t, eo, c) {//t => this, e => event, eo => Eoptional                    
                    if (t.card.itemid == "dashboard") {
                        me.loadDashboard();
                    }
                }
            }
        });
    },
    loadDashboard: function () {
        var me = this;
        var c = me.getController('dashboard.DashboardItem');
        // var dashboard = me.getView('dashboard.Dashboarditem');
        var dashboard = Ext.create('widget.dashboarditem');        
        if (c.thisController == false) {
            c.init();
            c.thisController = true;
        }
        var cv = Ext.ComponentQuery.query('tabpanel [itemid=dashboard]')[0];
        cv.removeAll(true);
        cv.add(dashboard);
        cv.doLayout();
    },
    index: function () {        
        this.loadDashboard();
    }
});