/*PV: not in used*/
Ext.define('Regardz.DummyWindow', {
    extend: 'Ext.ux.desktop.Module',
    id: 'dummy-win',
    requires: ['Regardz.view.layout.DummyLayout'],
    init: function () {
        if (Ext.getCmp('dummy-win'))
            Ext.getCmp('dummy-win').destroy();
        this.launcher = {
            text: 'Dummy',
            iconCls: 'icon-tick'
        };
        this.callParent(arguments);
    },
    createWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tempmodule-grid');

        if (Ext.getCmp('Tempmodule'))
            Ext.getCmp('Tempmodule').destroy();

        if (Ext.getCmp('dummy-win'))
            Ext.getCmp('dummy-win').destroy();
        tempwin = desktop.createWindow({
            id: 'dummy-win',
            title: 'Dummy window',
            maximized: true,
            //modal: true,
            width: 740,
            height: 480,
            border: false,
            y: 0,
            autoHeight: true,
            resizable: true,
            iconCls: 'icon-tick',
            layout: 'fit',


            listeners: {
                resize: function (t, w, h, ow, oh) { },
                beforerender: function (t) {
                    Ext.getCmp('dummy-win').maximize();
                },
                afterrender: function () {
                    var task = new Ext.util.DelayedTask(function () {
                        var ws = Ext.getCmp('dummy-win');
                        ws.removeAll();
                        ws.add({
                            xtype: 'dummylayout'
                        });
                        ws.doLayout();

                    });
                    task.delay(500);
                }
            }
        });

        return tempwin;
    }
});