Ext.define('Regardz.view.Windesk', {
    extend: 'Ext.ux.desktop.App',
    alias: 'widget.windesk',
    title: 'My Desktop',
    renderTo: Ext.getBody(),
    requires: [
				   'Ext.window.MessageBox',
				   'Ext.ux.desktop.ShortcutModel',
                   'Regardz.AdministrationWindow',
    //'Regardz.YieldWindow',
                   'Regardz.ConfigurationWindow',
                   'Regardz.BookingWizardWindow',
                   'Regardz.CustomerWindow',
                   'Regardz.OperationsWindow',
                   'Regardz.TempmoduleWindow',
                   'Ext.ux.window.Notification',
                   'Regardz.DashboardWindow',
                   'Regardz.ChangePasswordWindow'//,
    //'Regardz.AfasLogWindow'
    //   'Regardz.ReportsWindow'
    // 'Regardz.DemoWindow',
    //  'Regardz.DummyWindow',

    ],

    init: function () {
        this.callParent();
    },

    getModules: function () {
        /* return [
        new Regardz.AdministrationWindow(),
        new Regardz.ConfigurationWindow(),
        new Regardz.BookingWizardWindow(),
        new Regardz.CustomerWindow(),
        new Regardz.OperationsWindow(),
        new Regardz.TempmoduleWindow(),
        new Regardz.DashboardWindow()//,
        //    new Regardz.AfasLogWindow()
        //    new Regardz.ChangePasswordWindow(),
        // new Regardz.ReportsWindow()//,
        //    new Regardz.DemoWindow(),
        //    new Regardz.DummyWindow(),
        ]*/
        return RoleRights.ModuleRoleRightsForDesktopStartMenu()
    },

    getDesktopConfig: function () {
        ret = this.callParent();

        return Ext.apply(ret, {
            /*
            contextMenuItems: [
            { text: 'Change Settings', handler: this.onSettings, scope: this }
            ],
            */
            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: RoleRights.ModuleRoleRightsForDesktopShortcuts()
            }),
            //Wallpaper load from here
            wallpaper: 'wallpapers/desk.jpg',
            wallpaperStretch: true
        });
    },

    // config for the start menu
    getStartConfig: function () {
        //return true;
        ret = this.callParent();

        return Ext.apply(ret, {
            title: CurrentSessionUser + ' - ' + user_languageCode.l('g'),
            iconCls: 'user',
            height: 225,
            //margin: '200px 0 0 0',
            toolConfig: {
                width: 125,
                items: [
            {
                xtype: 'tbspacer',
                height: 138
            },
            {
                text: 'Change password'.l('SC_ChangePassword'),
                iconCls: 'icon-resetPass',
                handler: this.onChangePassword,
                scope: this
                //margin: '0 0 2 0',
                //style: 'text-align: right;border-bottom: 1px solid white !important;',
            },
            {
                xtype: 'tbspacer',
                height: 2,
                style: 'text-align: right;border-bottom: 2px solid white !important; font-weight: bold'
            },
            {
                text: 'Logout',
                iconCls: 'logout',
                align: 'left',
                handler: this.onLogout,
                scope: this
            }]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: RoleRights.ModuleRoleRightsForDesktopTaskBar()
        ,
            trayItems: [{
                xtype: 'trayclock',
                timeFormat: usr_dateformat + ' g:i A',
                flex: 1
            },
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('Logout'.l('g'), 'Are you sure you want to logout?'.l('g'),
        function (btn) {
            if (btn == 'yes') {
                window.location.href = "Login.aspx";
            }
            else { }
        });
    },

    onChangePassword: function () {
        var dlg = new Regardz.ChangePasswordWindow({
            // desktop: this.desktop
        });
        dlg.show();
    },

    onSettings: function () {
        var dlg = new Regardz.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});