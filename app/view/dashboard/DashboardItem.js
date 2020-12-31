Ext.define('Regardz.view.dashboard.DashboardItem', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dashboarditem',
    width: '100%',
    border: false,
    initComponent: function () {
        var me = this;

        var Initial = '';
        if (CurrentSessionUserInitial.length > 0)
            Initial = ' (' + CurrentSessionUserInitial + ')';

        me.dashboardview = Ext.create('widget.dashboardview');
        me.tasklist = Ext.create('widget.tasklist');
        me.outtracelist = Ext.create('widget.outgoingtracelist');
        me.intracelist = Ext.create('widget.incomingtracelist');
        me.alertlist = Ext.create('widget.alertlist');
        me.draftlist = Ext.create('widget.draftquatationlist');

        ///Roles and Rights
        me.disableDNQ = true;
        me.disableALT = true;
        me.disableINT = true;
        me.disableOUTT = true;
        me.disableTSK = true;

        var dashDNQ = new Object();
        dashDNQ.moduleName = 'DASH002';

        if (Utils.ValidateUserAccess(dashDNQ)) {
            me.disableDNQ = false;
        }

        var dashALT = new Object();
        dashALT.moduleName = 'DASH003';

        if (Utils.ValidateUserAccess(dashALT)) {
            me.disableALT = false;
        }

        var dashINT = new Object();
        dashINT.moduleName = 'DASH006';

        if (Utils.ValidateUserAccess(dashINT)) {
            me.disableINT = false;
        }


        var dashOUTT = new Object();
        dashOUTT.moduleName = 'DASH005';

        if (Utils.ValidateUserAccess(dashOUTT)) {
            me.disableOUTT = false;
        }

        var dashTSK = new Object();
        dashTSK.moduleName = 'DASH004';

        if (Utils.ValidateUserAccess(dashTSK)) {
            me.disableTSK = false;
        }

        me.menu = new Ext.menu.Menu({
            style: {
                overflow: 'visible'
            },
            items: [{
                name: 'dashboard_view',
                text: 'View'.l("SC61300"),
                checked: true,
                checkHandler: function (item, checked) {
                    var p = Ext.ComponentQuery.query('dashboarditem container[itemid=' + item.name + ']')[0];
                    if (checked == true) {
                        p.show();
                    } else if (checked == false) {
                        p.hide();
                    }
                }
            }, { name: 'dashboard_intraces',
                text: 'Incoming Traces'.l("SC80000"),
                checked: !me.disableINT,
                hidden: me.disableINT,
                checkHandler: function (item, checked) {
                    var p = Ext.ComponentQuery.query('dashboarditem container[itemid=' + item.name + ']')[0];
                    var dashObj = new Object();
                    dashObj.moduleName = 'DASH006';

                    if (!Utils.ValidateUserAccess(dashObj)) {
                        Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.'.l('g'));
                        item.setChecked(false);
                        return false;
                    }

                    if (checked == true) {
                        p.show();

                    } else if (checked == false) {
                        p.hide();
                    }
                }
            }, { name: 'dashboard_outtraces',
                text: 'Outgoing Traces'.l("SC80000"),
                checked: !me.disableOUTT,
                hidden: me.disableOUTT,
                checkHandler: function (item, checked) {
                    var p = Ext.ComponentQuery.query('dashboarditem container[itemid=' + item.name + ']')[0];

                    var dashObj = new Object();
                    dashObj.moduleName = 'DASH005';
                    if (!Utils.ValidateUserAccess(dashObj)) {
                        Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.'.l('g'));
                        item.setChecked(false);
                        return false;
                    }

                    if (checked == true) {
                        p.show();
                    } else if (checked == false) {
                        p.hide();
                    }
                }
            }, { name: 'dashboard_alerts',
                text: 'Alert'.l("SC80000"),
                checked: !me.disableALT,
                hidden: me.disableALT,
                checkHandler: function (item, checked) {
                    var p = Ext.ComponentQuery.query('dashboarditem container[itemid=' + item.name + ']')[0];

                    var dashObj = new Object();
                    dashObj.moduleName = 'DASH003';

                    if (!Utils.ValidateUserAccess(dashObj)) {
                        Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.'.l('g'));
                        item.setChecked(false);
                        return false;
                    }
                    if (checked == true) {
                        p.show();
                    } else if (checked == false) {
                        p.hide();
                    }
                }
            }, { name: 'dashboard_tasks',
                text: 'Tasks'.l("SC80000"),
                checked: !me.disableTSK,
                hidden: me.disableTSK,
                checkHandler: function (item, checked) {
                    var p = Ext.ComponentQuery.query('dashboarditem container[itemid=' + item.name + ']')[0];

                    var dashObj = new Object();
                    dashObj.moduleName = 'DASH004';

                    if (!Utils.ValidateUserAccess(dashObj)) {
                        Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.'.l('g'));
                        item.setChecked(false);
                        return false;
                    }

                    if (checked == true) {
                        p.show();
                    } else if (checked == false) {
                        p.hide();
                    }
                }
            }, { name: 'dashboard_draftQuatation',
                text: 'Draft and Quatation'.l("SC80000"),
                checked: !me.disableDNQ,
                hidden: me.disableDNQ,
                checkHandler: function (item, checked) {
                    var p = Ext.ComponentQuery.query('dashboarditem container[itemid=' + item.name + ']')[0];
                    var dashObj = new Object();
                    dashObj.moduleName = 'DASH002';

                    if (!Utils.ValidateUserAccess(dashObj)) {
                        Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.'.l('g'));
                        item.setChecked(false);
                        return false;
                    }

                    if (checked == true) {
                        p.show();
                    } else if (checked == false) {
                        p.hide();
                    }
                }
            }]
        });

        me.tbar = [{
            xtype: 'button',
            iconCls: 'window_add',
            menu: me.menu
        }, {
            xtype: 'tbspacer',
            width: 1
        }, { xtype: 'button',
            iconCls: 'table',
            action: 'showAllTab'
        }, {
            xtype: 'tbspacer',
            width: 1
        }, {
            xtype: 'displayfield',
            itemid: 'dashboardUser',
            padding: '0 5 8 5',
            value: CurrentSessionUserFName + ' ' + CurrentSessionUserLName + Initial
        }, {
            xtype: 'button',
            action: 'searchUser',
            iconCls: 'searchIcon',
            tooltip: "Select User".l('SC81000')
        }, {
            xtype: 'hidden',
            name: 'userId',
            itemid: 'userId',
            value: CurrentSessionUserId
        }, {
            xtype: 'button',
            action: 'refreshDashboard',
            iconCls: 'refreshBtnicon',
            tooltip: "Refresh Dashboard".l('SC81000')
        }];

        me.items = [{
            xtype: 'container',
            layout: 'hbox',
            //height: '39%',
            defaults: {
                padding: '6 5 2 5'
            },
            items: [{
                xtype: "container",
                itemid: 'dashboard_draftQuatation',
                items: [me.draftlist],
                hidden: me.disableDNQ,
                width: '50%'
            }, {
                xtype: "container",
                itemid: 'dashboard_view',
                items: [me.dashboardview],
                width: '50%'
            }]
        }, { xtype: 'container',
            layout: 'hbox',
            //height: '39%',
            defaults: {
                padding: '2 5 2 5'
            },
            items: [{ xtype: "container",
                itemid: 'dashboard_alerts',
                items: [me.alertlist],
                hidden: me.disableALT,
                width: '50%'
            }, { xtype: "container",
                width: '50%',
                itemid: 'dashboard_intraces',
                hidden: me.disableINT,
                items: [me.intracelist]
            }]
        }, {
            xtype: 'container',
            layout: 'hbox',
            //height: '39%',
            defaults: {
                padding: '2 5 2 5'
            },
            items: [{ xtype: "container",
                itemid: 'dashboard_tasks',
                items: [me.tasklist],
                hidden: me.disableTSK,
                width: '50%'
            }, { xtype: "container",
                itemid: 'dashboard_outtraces',
                items: [me.outtracelist],
                hidden: me.disableOUTT,
                width: '50%'
            }]
        }];

        me.callParent(arguments);
    }
});