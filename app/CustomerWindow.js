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
Ext.define('Regardz.CustomerWindow', {
    extend: 'Ext.ux.desktop.Module',
    id: 'customer-win',
    requires: ['Regardz.view.customer.CustomerSearch'],
    init: function () {
        if (Ext.getCmp('customer-win'))
            Ext.getCmp('customer-win').destroy();
        this.launcher = {
            text: 'Customer Management',
            iconCls: 'icon-customer'
        };
        this.callParent(arguments);
    },
    createWindow: function () {

        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('customer-grid');

        if (Ext.getCmp('Customer'))
            Ext.getCmp('Customer').destroy();

        if (Ext.getCmp('customer-win'))
            Ext.getCmp('customer-win').destroy();


        var custProf = new Object();
        custProf.moduleName = 'CUST001';

        if (!Utils.ValidateUserAccess(custProf)) {
            Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.'.l('g'));
            return false;
        }


        custwin = desktop.createWindow({
            id: 'customer-win',
            title: 'Customer Management',
            maximized: true,
            //modal: true,
            width: 740,
            height: 480,
            border: false,
            y: 0,
            autoHeight: true,
            resizable: true,
            iconCls: 'icon-customer',
            //animCollapse: false,
            //constrainHeader: true,
            layout: 'fit',
            items: [{
                layout: 'fit' //,
                // xtype: 'customer'
            }
				],

            listeners: {
                resize: function (t, w, h, ow, oh) { },
                beforerender: function (t) {
                    //  debugger;
                    Ext.getCmp('customer-win').maximize();

                },

                afterrender: function () {
                    var task = new Ext.util.DelayedTask(function () {
                        var ws = Ext.getCmp('customer-win');
                        ws.removeAll();

                        ws.add({
                            xtype: 'customersearch'
                        });
                        ws.doLayout();

                    });

                    task.delay(500);
                    //  debugger;
                    /**/
                }
            }
        });

        return custwin;
    },
    setController: function () {

        var me = this;
        try {
            //var c = me.getController('moduleone.samplegrid');

        } catch (e) { }
    }
});