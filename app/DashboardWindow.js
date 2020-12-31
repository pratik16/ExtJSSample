Ext.define('Regardz.DashboardWindow', {
    extend: 'Ext.ux.desktop.Module',
    id: 'dashboard-win',
    requires: ['Regardz.view.layout.Dashboard'],
    init: function () {
        if (Ext.getCmp('dashboard-win'))
            Ext.getCmp('dashboard-win').destroy();
        this.launcher = {
            text: 'Dashboard'.l('SC80000'),
            iconCls: 'icon-dashboard'
        };
        this.callParent(arguments);
    },
    createWindow: function () {
        var desktop = this.app.getDesktop();
        // var win = desktop.getWindow('bookingWiz-grid');		

        if (Ext.getCmp('dashboard-win'))
            Ext.getCmp('dashboard-win').destroy();

        var dashObj = new Object();
        dashObj.moduleName = 'DASH001';

        if (!Utils.ValidateUserAccess(dashObj)) {
            Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.');
            return false;
        }        

        dwin = desktop.createWindow({
            id: 'dashboard-win',
            title: 'Dashboard'.l('SC80000'),
            maximized: true,
            //modal: true,
            width: 740,
            height: 480,
            border: false,
            y: 0,
            autoHeight: true,
            resizable: true,
            iconCls: 'icon-dashboard',
            //animCollapse: false,
            //constrainHeader: true,
            layout: 'fit',
            items: [{
                layout: 'fit' //,
                //xtype: 'bookingwizard'
            }
				],

            listeners: {
                resize: function (t, w, h, ow, oh) { },
                beforerender: function (t) {
                    //  debugger;
                    Ext.getCmp('dashboard-win').maximize();

                },

                afterrender: function () {
                    var task = new Ext.util.DelayedTask(function () {
                        var ws = Ext.getCmp('dashboard-win');
                        ws.removeAll();

                        ws.add({
                            xtype: 'dashboard'
                        });
                        ws.doLayout();

                    });

                    task.delay(500);
                    //  debugger;
                    /**/
                }
            }
        });

        return dwin;

    },
    setController: function () {

        var me = this;
        try { }
        catch (e) { }
    }
});