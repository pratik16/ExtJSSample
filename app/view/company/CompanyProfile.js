Ext.define('Regardz.view.company.CompanyProfile', {
    extend: 'Ext.window.Window',
    alias: 'widget.companyprofile',
    modal: true,
    initComponent: function () {
        var me = this;
        me.autoScroll = true;
        me.height = parseInt(Ext.getBody().getViewSize().height * (0.95));
        me.overview = Ext.create('widget.companyoverview', { CompanyId: me.CompanyId, height: me.height - 100 }); //me.overview.height = me.height - 100;
        me.generalinfo = Ext.create('widget.generalinfo', { CompanyId: me.CompanyId, height: me.height - 100 }); //me.generalinfo.height = me.height - 100;
        me.salesmarketing = Ext.create('widget.salesandmarketing', { CompanyId: me.CompanyId, IsHierarchy: me.IsHierarchy, height: me.height - 100 }); //me.salesmarketing.height = me.height - 50;

        me.checkboxconfigs = [];
        me.windowWidth = parseInt(Ext.getBody().getViewSize().width * (0.90));
        me.windowHeight = parseInt(Ext.getBody().getViewSize().height * (0.95));

        Ext.apply(me, {
            title: 'Company Profile_title'.l('SC61100'), //.l('PropertyEdit'),            
            autoShow: true,
            y: 0,
            bodyStyle: 'background: none',
            closable: true,
            resizable: false,
            buttonAlign: 'right',
            width: me.windowWidth,
            height: me.windowHeight,
            border: false,
            items: [{
                xtype: 'tabpanel',
                id: 'tbp_cp',
                itemid: 'tbp_companyProfile',
                name: 'tbp_cp',
                plain: false,
                border: false,
                bodyPadding: 1,
                cls: 'propertyEdit',
                style: 'background:none; border:0px;',
                items: [{
                    title: 'Overview'.l('SC61100'),
                    name: 'overview',
                    //disabled: me.disableOver,
                    itemid: 'companyOverviewTab',
                    items: me.overview
                }, {
                    title: 'General Info'.l('SC61100'),
                    name: 'generalinfo',
                    //disabled: me.disableGenInfo,
                    itemid: 'companyGenInfoTab',
                    items: me.generalinfo
                }, {
                    title: 'Sales/marketing'.l('SC61100'),
                    name: 'salesmarketing',
                    itemid: 'companySalesMarkTab',
                    //disabled: me.disableSales,
                    items: me.salesmarketing
                }]
            }, {
                xtype: 'form',
                name: 'CompanyProileWinForm',
                id: 'CompanyProileWinForm',
                items: [{
                    xtype: 'hidden',
                    name: 'CompanyId',
                    value: me.CompanyId
                }, {
                    xtype: 'hidden',
                    name: 'ChildCompanyFlag'
                }, {
                    xtype: 'hidden',
                    name: 'IsHierarchy',
                    value: me.IsHierarchy
                }]
            }]
        });
        me.dockedItems = [{
            dock: 'bottom',
            align: 'right',
            buttonAlign: 'right',
            buttons: [{
                text: 'Cancel'.l('w'),
                action: 'cancel',
                handler: function () {
                    me.close();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveCompanyProfile'
            }]
        }];

        me.callParent();
    }
});

