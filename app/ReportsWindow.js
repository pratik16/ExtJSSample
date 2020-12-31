/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

/**
 * Module for desktop application. It will open in new window,
 * For the content in this module create MVC style structure for getting the data.
 **/
Ext.define('Regardz.ReportsWindow', {
    extend: 'Ext.ux.desktop.Module',
    id: 'reports-win',
    requires: ['Regardz.view.layout.Reports'],
    init: function () {
        if (Ext.getCmp('reports-win'))
            Ext.getCmp('reports-win').destroy();
        this.launcher = {
            text: 'Reports'.l('SC90000'),
            iconCls: 'icon-document'
        };
        this.callParent(arguments);
    },
    createWindow: function () {

        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('config-grid');

        if (Ext.getCmp('Reports'))
            Ext.getCmp('Reports').destroy();

        if (Ext.getCmp('reports-win'))
            Ext.getCmp('reports-win').destroy();

        cwin = desktop.createWindow({
            id: 'reports-win',
            title: 'Reports'.l('SC90000'),
            maximized: true,
            //modal: true,
            width: 740,
            height: 480,
            border: false,
            y: 0,
            autoHeight: true,
            resizable: true,
            iconCls: 'icon-document',
            //animCollapse: false,
            //constrainHeader: true,
            layout: 'fit',
            items: [{
                layout: 'fit' //,
                //xtype: 'configuration'
            }
            ],

            listeners: {
                resize: function (t, w, h, ow, oh) { },
                beforerender: function (t) {
                    //  debugger;
                    Ext.getCmp('reports-win').maximize();

                },

                afterrender: function () {
                    var task = new Ext.util.DelayedTask(function () {
                        var ws = Ext.getCmp('reports-win');
                        ws.removeAll();

                        ws.add({
                            xtype: 'reports'
                        });
                        ws.doLayout();

                    });

                    task.delay(500);
                    //  debugger;
                    /**/
                }
            }
        });

        return cwin;
    },
    setController: function () {

        var me = this;
        try {
            //var c = me.getController('moduleone.samplegrid');

        } catch (e) { }
    }
});