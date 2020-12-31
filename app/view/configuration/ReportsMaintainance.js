Ext.define('Regardz.view.configuration.ReportsMaintainance', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.reportsmaintainance',
    id: 'reportsmaintainanceList',
    itemid: 'reportsMaintananceGrid',
    viewConfig: {
        forceFit: true,
        emptyText: "No data to display".l("g")
    },
    title: 'Reports',
    store: 'configuration.ReportsMaintenanceListStore',
    initComponent: function () {

        var me = this;

        var filterField = Ext.create('Ext.form.TextField', {
            xtype: 'textfield',
            itemid: 'rMTextfieldFilter',
            emptyText: ' <filter>',
            selectOnFocus: true
        });
        var buttonSearch = Ext.create('Ext.Button', {
            id: 'button_1',
            scale: 'small',
            iconCls: 'search-icon',
            width: 20,
            action: 'rMFilterAction',
            iconAlign: 'left'
        });

        if (Ext.getCmp('reportsmaintainanceList')) {
            Ext.getCmp('reportsmaintainanceList').destroy();
        }
        me.autoHeight = true;
        me.columns = [{
            header: 'Name',
            flex: 1,
            dataIndex: 'ReportName'
        },
        {
            header: 'Type',
            dataIndex: 'ReportTypeText'
        },
        {
            header: 'Parameters',
            dataIndex: 'ReportParameterCount'
        },
        {
            width: 25,
            tdCls: 'icon-delete-item',
            hideable: false
        }, {
            width: 25,
            tdCls: 'icon-edit',
            hideable: false
        }];


        me.tbar = [{
            xtype: 'button',
            action: 'maintananceAddReport',
            iconCls: 'new'
        }, { xtype: 'tbfill' }, filterField, buttonSearch];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: me.store,
            displayInfo: true,
            emptyMsg: "No data to display".l("g")
        };

        me.callParent();
    }
});