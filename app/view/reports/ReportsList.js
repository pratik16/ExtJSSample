Ext.define('Regardz.view.reports.ReportsList', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.reportslist',
    //store: 'configuration.ReportsCategoryStructureStore',
    loadMask: true,
    border: true,
    frame: false,
    rootVisible: false,
    autoScroll: true,
    expanded: true,
    store: 'reports.ReportsListStore',
    itemid: 'categoryStructurePanelId',
    title: 'Reports_Title'.l('SC91000'),
    initComponent: function () {
        var me = this;
        me.columns = [{
            xtype: 'treecolumn', //this is so we know which column will show the tree
            header: 'Name'.l('SC91000'),
            width: 200,
            flex: 2,
            sortable: true,
            dataIndex: 'ReportCategoryName'
        },
        { align: 'center', width: 25, renderer: this.iconsRenderer, name: 'reportCreate' }
        ];
        me.tbar = ['->', {
            xtype: 'textfield',
            id: 'searchStringReports',
            itemid: 'searchStringReports',
            name: 'searchStringReports',
            enableKeyEvents: false
        }, {
            xtype: 'button',
            iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
            action: 'clearReportFilter',
            tooltip: 'Clear filter'.l('SC91000'),
            hidden: true
        },
            {
                xtype: 'button',
                action: 'searchReport',
                tooltip: 'Search'.l('SC91000'),
                iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
            }
        ];

        me.callParent();
    },

    iconsRenderer: function (value, metaData, record, row, col, store, gridView) {        
        if (record.data.leaf == true) {
            var tooltipText = "View Report".l('SC91000');
            metaData.tdAttr = 'data-qtip="' + tooltipText + '"';
            metaData.tdCls = 'icon-reports';
        }
    }
});