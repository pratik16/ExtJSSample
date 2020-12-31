Ext.define('Regardz.view.company.MergeChildCompanyList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mergechildcompanylist',
    store: 'company.MergeChildCompany1Store',
    loadMask: true,
    cls: 'gridwhitebackground',

    initComponent: function () {
        var me = this;
        //me.autoHeight = true;
        //alert(this.store);
        height = 400;
        me.title = "Children".l('SC61140');
        me.frame = false;

        me.columns = [
        { header: 'Name'.l('SC61140'), dataIndex: 'CompanyName', flex: 1 },
        { header: 'City'.l('SC61140'), dataIndex: 'City', flex: 1 },
        { header: 'Postal code'.l('SC61140'), dataIndex: 'PinCode', flex: 1 },
        //{ dataIndex: 'CompanyId', align: 'center', width: 25, renderer: this.ChildCompanyDelete, name: 'ChildCompanyDelete', hideable: false },
        { hidden: true, dataIndex: 'CompanyId', align: 'center', hideable: false}];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            emptyMsg: "No data to display".l("g")
        };

        me.callParent();
    },

    ChildCompanyDelete: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "ChildCompanyDelete".l('SC61140');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-delete';
    }
});