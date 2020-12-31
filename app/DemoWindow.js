/*PV: not in used*/
Ext.define('Regardz.DemoWindow', {
    extend: 'Ext.ux.desktop.Module',
    id: 'demo-win',
    requires: ['Regardz.view.layout.DemoLayout'],
    init: function () {
       
    }, createWindow: function () {

        var desktop = this.app.getDesktop();
      
        if (Ext.getCmp('demo-win'))
            Ext.getCmp('demo-win').destroy();
        tempwin = desktop.createWindow({
            id: 'demo-win',
            title: 'Demo dummy',
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
            items: [{
                layout: 'fit' //,
            }
            ],

            listeners: {
                resize: function (t, w, h, ow, oh) { },
                beforerender: function (t) {
                    Ext.getCmp('demo-win').maximize();

                },

                afterrender: function () {
                    var task = new Ext.util.DelayedTask(function () {
                        var ws = Ext.getCmp('demo-win');
                        ws.removeAll();

                        ws.add({
                            xtype: 'demolayout'
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
