Ext.define('Regardz.view.layout.Reports', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reports',
    id: 'reportswindow',

    initComponent: function () {

        var me = this;

        if (Ext.getCmp('west-regionReports'))
            Ext.getCmp('west-regionReports').destroy();

        if (Ext.getCmp('right_regionReports'))
            Ext.getCmp('right_regionReports').destroy();

        if (Ext.getCmp('reportswindow'))
            Ext.getCmp('reportswindow').destroy();

        me.mainCategories = {
            xtype: 'gridpanel',
            autoScroll: true,
            autoHeight: true,
            name: 'reportcategories',
            store: 'configuration.ReportsMainCategoriesStore',
            title: 'Main categories'.l('SC90000'),
            columns: [{
                header: 'Name'.l('SC20120'),
                dataIndex: 'ReportCategoryName',
                flex: 1
            },
            {
                hidden: true,
                dataIndex: 'ReportCategoryId'
            }
            ]
        };
        me.layout = 'fit';
        me.items = {

            // width: parseInt(Ext.getBody().getViewSize().width * (0.99)),
            id: 'main-regionReports',
            // height: parseInt(Ext.getBody().getViewSize().height * (0.96)),
            plain: true,
            border: false,
            layout: 'border',
            items: [{
                region: 'west',
                collapsible: true,
                layout: 'fit',
                //split: true,
                width: 250,
                items: [{
                    xtype: 'panel',
                    id: 'west-regionReports',
                    frame: false,
                    //height: 500,
                    //autoHeight: true,
                    //layout: 'accordion',
                    items: [me.mainCategories]
                }
                ]
            }, {
                region: 'center',
                layout: 'fit',
                id: 'right_regionReports'
            }
            ]
        };

        me.callParent();
    }

});