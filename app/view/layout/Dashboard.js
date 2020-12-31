Ext.define('Regardz.view.layout.Dashboard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dashboard',
    initComponent: function () {
        var me = this;
        //me.dashboard = Ext.create('widget.dashboardtab', { height: '90%', width: '90%' });

        me.disableDash = true;
        me.disableAgen = true;

        var dashObj = new Object();
        dashObj.moduleName = 'DASH001';

        if (Utils.ValidateUserAccess(dashObj)) {
            me.disableDash = false;
        }

        var dashAge = new Object();
        dashAge.moduleName = 'DASH001';

        if (Utils.ValidateUserAccess(dashAge)) {
            me.disableAgen = false;
        }

        me.layout = 'fit';
        me.items = [{
            xtype: 'tabpanel',
            activeTab: 0,
            plain: false,
            border: false,
            bodyPadding: 1,
            cls: 'propertyEdit',
            style: 'background:none; border:0px;',
            defaults: {
                layout: 'fit'
            },
            items: [{
                title: 'Dashboard'.l('SC80000'),
                itemid: 'dashboard',
                disabled: me.disableDash
                //items: me.dashboard
            }, {
                title: 'Agenda'.l('SC80000'),
                itemid: 'agenda',
                disabled: me.disableAgen
            }]
        }];
        me.callParent();
    }
});