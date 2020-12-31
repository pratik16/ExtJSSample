Ext.define('Regardz.view.company.SalesandMarketing', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.salesandmarketing',
    //store: 'configuration.ItemCategoryStore',
    loadMask: true,

    initComponent: function () {

        //if (Ext.getCmp('additemcategory'))
        //Ext.getCmp('additemcategory').destroy();
        var me = this;
        
        me.generic = Ext.create('widget.companysmgeneric', { CompanyId: me.CompanyId, height: me.height - 20 }); //me.generic.height = me.height - 100;
        me.financials = Ext.create('widget.companysmfinancials', { CompanyId: me.CompanyId, height: me.height - 30 }); //me.financials.height = me.height - 100;        
        me.companywise = Ext.create('widget.companysmcompanywide', { height: me.height - 30 });

        me.windowWidth = parseInt(Ext.getBody().getViewSize().width * (0.90));
        me.windowHeight = parseInt(Ext.getBody().getViewSize().height * (0.95));

        Ext.apply(me, {
            autoShow: true,
            layout: 'fit',
//            width: me.windowWidth,
//            height: me.windowHeight,
            bodyStyle: 'background: none',
            buttonAlign: 'right',
            border: false,
            items: [
            { xtype: 'hidden', name: 'CompanyId', value: me.CompanyId }, { xtype: 'hidden', name: 'IsHierarchy', value: me.IsHierarchy },
                {
                    xtype: 'tabpanel',
                    activeTab: 0,
                    plain: false,
                    border: false,
                    bodyPadding: 1,
                    style: 'background:none; border:0px;',
                    items: [{
                        title: 'Generic'.l('SC61100'),
                        name: 'generic',
                        items: me.generic
                    }, {
                        title: 'Financials'.l('SC61100'),
                        name: 'financials',
                        items: me.financials
                    }, {
                        title: 'Company wise'.l('SC61100'),
                        name: 'companywise',
                        items: me.companywise
                    }]
                }]
        });
        me.callParent();
    }
});
