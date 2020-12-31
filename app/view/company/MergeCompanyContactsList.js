Ext.define('Regardz.view.company.MergeCompanyContactsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mergecompanycontactslist',
    store: 'company.MergeCompanyContactListStore',
    loadMask: true,
    viewConfig: {
        markDirty: false
    },
    initComponent: function () {
        var me = this;
        //me.autoHeight = true;
        height = 300;
        me.title = "Contacts".l('SC61100');
        me.frame = true;
        me.columns = [
                { header: 'Name'.l('SC61100'), dataIndex: 'IndividualName', flex: 1 },
                { header: 'Title'.l('SC61100'), dataIndex: 'Title', width: 120 },
//                { header: 'MergeTo Contact', dataIndex: 'MergeIndividualName', flex: 1 },
                { header: "Action".l('SC61140'), dataIndex: 'ActionName', flex: 1 },
                { hidden: true, dataIndex: 'IndividualId', hideable: false },
                { hidden: true, dataIndex: 'MergeIndividualId', hideable: false }
        ];

//        me.bbar = {
//            xtype: 'pagingtoolbar',
//            store: this.store,
//            displayInfo: true,
//            emptyMsg: "No data to display"
//        };

        me.callParent();
    }
});