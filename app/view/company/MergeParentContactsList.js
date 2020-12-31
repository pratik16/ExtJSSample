Ext.define('Regardz.view.company.MergeParentContactsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mergeparentcontactslist',
    store: 'company.CompanyContactListStore',
    loadMask: true,

    initComponent: function () {
        var me = this;
        //me.autoHeight = true;
        height = 300;
        me.title = "Contacts".l('SC61100');
        me.frame = true;
        me.columns = [
                { align: 'center', header: '#', renderer: this.RenderSrNo, width: 25 },
                { header: 'Name'.l('SC61100'), dataIndex: 'IndividualName', flex: 1 },
                { header: 'Title'.l('SC61100'), dataIndex: 'SalesManagerName', width: 120 },
                { hidden: true, dataIndex: 'IndividualId', hideable: false }
        ];

//        me.bbar = {
//            xtype: 'pagingtoolbar',
//            store: this.store,
//            displayInfo: true,
//            emptyMsg: "No data to display"
//        };

        me.callParent();
    },
    RenderSrNo: function (value, metadata, record, rowIndex, colIndex, store) {
        return rowIndex + 1;
    }
});