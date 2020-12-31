Ext.define('Regardz.view.company.ChildCompanyList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.childcompanylist',
    itemid: 'childcompanylistgrid',
    store: 'company.ChildCompanyStore',
    loadMask: true,
    cls: 'gridwhitebackground',

    initComponent: function () {

        var me = this;
        //me.autoHeight = true;
        //alert(this.store);
        height = 400;
        me.title = "Child Company List".l('SC61100');
        me.frame = false;

        me.columns = [
        { header: 'Name'.l('SC61300'), dataIndex: 'CompanyName', flex: 1 },
        { header: 'City'.l('SC61300'), dataIndex: 'City', flex: 1 },
        { dataIndex: 'CompanyId', align: 'center', width: 25, renderer: this.ChildCompanyDelete, name: 'ChildCompanyDelete', hideable: false },
        { hidden: true, dataIndex: 'CompanyId', align: 'center', hideable: false}];

        me.tbar = [{
            xtype: 'button',
            text: 'Add New'.l('SC61100'),
            tooltip: 'AddChildCompany'.l('SC61100'),
            action: 'AddChildCompany',
            iconCls: 'new'
        }];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            emptyMsg: "No data to display".l("g")
        };

        me.callParent();
    },

    ContractBREdit: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Update Bedroom".l('SC61200');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';
    },

    ManageChild: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value == true)
            return "Yes".l("g");
        else
            return "No".l("g");
    },

    ChildCompanyDelete: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "ChildCompanyDelete".l('SC61100');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-delete';
    }
});