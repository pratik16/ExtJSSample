Ext.define('Regardz.BookingWizardWindow', {
    extend: 'Ext.ux.desktop.Module',
    id: 'bookingWiz-win',
    planboardObject: null,
    stepObject: null,
    requires: ['Regardz.view.layout.BookingWizard', 'Regardz.view.layout.BookingWizard',
            'Regardz.view.bookingwizard.BookingWizardPanel', 'Regardz.view.bookingwizard.RightSide.SalesInfo'],
    init: function () {
        //if (Ext.getCmp('bookingWiz-win'))
        //    Ext.getCmp('bookingWiz-win').destroy();
        if (Ext.getCmp('bookingWiz-win')) {
            Ext.getCmp('bookingWiz-win').activate();
            return true;
        }
        this.launcher = {
            text: 'Wizard'.l('SC50000'),
            iconCls: 'icon-booking'
        };
        this.callParent(arguments);
    },
    createWindow: function () {
        var desktop = this.app.getDesktop();
        // var win = desktop.getWindow('bookingWiz-grid');

        //if (Ext.getCmp('BookingWizard'))
        //    Ext.getCmp('BookingWizard').destroy();

        //if (Ext.getCmp('bookingWiz-win'))
        //    Ext.getCmp('bookingWiz-win').destroy();

        //if (Ext.getCmp('BookingWizard')) {

        //}


        var wizObj = new Object();
        wizObj.moduleName = 'WIZA001';

        if (!Utils.ValidateUserAccess(wizObj)) {
            Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.'.l('g'));
            return false;
        }
        else {

        }
        var win = Ext.getCmp('bookingWiz-win');
        if (win) {
            Ext.WindowMgr.bringToFront(win);
            win.show();
            return false;
        }
        
        bwin = desktop.createWindow({
            id: 'bookingWiz-win',
            title: 'Wizard'.l('SC50000'),
            maximized: true,
            //modal: true,
            width: 740,
            height: 480,
            border: false,
            y: 0,
            autoHeight: true,
            resizable: true,
            iconCls: 'icon-booking',
            //animCollapse: false,
            //constrainHeader: true,
            layout: 'fit',
            items: [{
                layout: 'fit' //,
                //xtype: 'bookingwizard'
            }
            ],

            listeners: {                
                beforerender: function (t) {
                    //  debugger;
                    Ext.getCmp('bookingWiz-win').maximize();

                },

                afterrender: function () {
                    var task = new Ext.util.DelayedTask(function () {
                        var ws = Ext.getCmp('bookingWiz-win');
                        var items = ws.items.items[0];
                        if (items.getXType() != 'bookingwizard') {

                            ws.removeAll();
                            ws.add({
                                xtype: 'bookingwizard'
                            });
                            ws.doLayout();
                        }

                    });

                    //Patch work Confirm wth PV
                    //Utils.StepOneObj = {};
                    //End of Patch work Confirm wth PV

                    task.delay(500);

                    //  debugger;
                    /**/
                },
                beforeclose: function (t, o) {
                    
                    isRightPanelLoaded = false;                    
                    var panelSteps = Ext.ComponentQuery.query('bookingwizardpanel')[0];
                    var layout = panelSteps.getLayout();
                    var cardPanel = Ext.ComponentQuery.query('bookingwizardpanel panel[itemid="stepone"]')[0];
                    layout.setActiveItem(cardPanel);
                    clearUtils();

                }
            }
        });

        return bwin;
    },
    setController: function () {

        var me = this;
        try { }
        catch (e) { }
    }
});