Ext.define('Regardz.view.company.MergeChildCompanyList2', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mergechildcompanylist2',
    store: 'company.MergeChildCompanyStore',
    loadMask: true,
    cls: 'gridwhitebackground',
    viewConfig: {
        markDirty: false
    },
    initComponent: function () {
        var me = this;
        //me.autoHeight = true;
        //alert(this.store);
        height = 400;
        me.title = "Children".l('SC61140');
        me.frame = false;

        me.columns = [
        { dataIndex: 'Checked', align: 'center', width: 25, renderer: this.checkboxRender },
        { header: 'Name'.l('SC61140'), dataIndex: 'CompanyName', renderer: this.colorRender, flex: 1 },
        { header: 'City'.l('SC61140'), dataIndex: 'City', flex: 1, renderer: this.colorRender },
        { header: 'Postal code'.l('SC61140'), dataIndex: 'PinCode', flex: 1, renderer: this.colorRender },
        { hidden: true, dataIndex: 'CompanyId', align: 'center', hideable: false}];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            emptyMsg: "No data to display".l("g")
        };

        me.callParent();
    },
    checkboxRender: function (value, metadata, record, rowIdx, col_idx, store) {
        var chkText = '';
        if (value != null && value > 0) {
            chkText = '<input type=checkbox ' + 'checked=checked onclick="setDefaultPropertyFeatures(this,' + rowIdx + ',\'' + store.storeId + '\')">';
        }
        else {
            chkText = '<input type=checkbox ' + 'onclick="setDefaultPropertyFeatures(this,' + rowIdx + ',\'' + store.storeId + '\')">';
        }
        //this.colorRender(value, metadata, record, rowIdx, col_idx, store);
        return chkText;
    },
    colorRender: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.style = "color: red";
        return value;
    }
});