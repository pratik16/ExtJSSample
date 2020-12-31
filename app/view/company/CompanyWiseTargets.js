Ext.define('Regardz.view.company.CompanyWiseTargets', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.salesandmarketing',
    //store: 'configuration.ItemCategoryStore',
    loadMask: true,

    initComponent: function () {

        //if (Ext.getCmp('additemcategory'))
        //Ext.getCmp('additemcategory').destroy();

        var me = this;
        me.generic = Ext.create('widget.companySMgeneric', { CompanyId: me.CompanyId });

        Ext.apply(me, {
            autoShow: true,
            layout: 'fit',
            //width: 600,
            //height: 250,
            //alert(me.CompanyId);
            //frame : true,
            bodyStyle: 'background: none',
            //closable: true,
            //resizable: true,
            buttonAlign: 'right',
            border: false,
            items: [{
                xtype: 'tabpanel',
                activeTab: 0,
                //width: me.windowWidth - 20,
                //autoScroll: true,
                //horizontalScroll: true,
                plain: false,
                border: false,
                //frame: true,
                bodyPadding: 1,
                //padding: 5,                
                style: 'background:none; border:0px;',
                items: [{
                    title: 'Generic'.l('SC61100'),
                    name: 'generic',
                    items: me.generic
                }, {
                    title: 'Financials'.l('SC61100'),
                    name: 'overview'
                    //items: me.overview
                }, {
                    title: 'Company wise'.l('SC61100'),
                    name: 'overview'
                    //items: me.overview
                }]
            }]
        });
        //me.dockedItems = [{
        //    dock: 'bottom',
        //    align: 'right',
        //    buttonAlign: 'right',
        //    buttons: [{
        //        text: 'Cancel'.l('w'),
        //        action: 'cancel'                
        //    }, {
        //        text: 'Save'.l('w'),
        //        action: 'saveCompanyProfile'
        //    }]
        //}];

        me.callParent();
    }
});