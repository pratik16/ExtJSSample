Ext.define('Regardz.view.configuration.ReportsMainCategoriesList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.reportsmaincategorieslist',
    store: 'configuration.ReportsMainCategoriesStore',
    id: 'reportsmaincategorieslist',
    loadMask: true,
    columnLines: false,
    //selType: 'rowmodel',
    viewConfig: {
        forceFit: true
    },
    title: 'Reports Main Categories List_Title'.l('SC20120'),

    initComponent: function () {

        var me = this;
        //me.localStore = new Ext.data.SimpleStore({
        //    fields: ['CategoryName', 'CategoryId']
        //   , data: me.bookingData.children
        //});
        if (Ext.getCmp('reportsmaincategorieslist')) {
            Ext.getCmp('reportsmaincategorieslist').destroy();
        }

        //if (Ext.getCmp('subdeptComboid')) {
        //    Ext.getCmp('subdeptComboid').destroy();
        //}

        me.autoHeight = true;
        me.columns = [{
            header: 'Name'.l('SC20120'),
            dataIndex: 'ReportCategoryName',
            flex: 1
        }, {
            width: 25,
            name: 'deleteCategory',
            tdCls: 'icon-delete-item',
            tooltip: "Delete main category".l('SC20120'),
            hideable: false
        }, {
            width: 25,
            tdCls: 'icon-edit',
            tooltip: "Edit main category".l('SC20120'),
            name: 'editCategory',
            hideable: false
        }];


        me.tbar = [{
            xtype: 'button',
            action: 'addmaincategoryaction',
            iconCls: 'new',
            text: 'Add new category'.l('SC20120'),
            tooltip: 'Add new category'.l('SC20120')
        }];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: me.store,
            displayInfo: true,
            emptyMsg: "No data to display".l("g")
        };

        me.callParent();
    }
});