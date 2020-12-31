Ext.define('Regardz.view.company.GlobalDistributionSystem', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.globaldistributionsystem',
    itemid: 'globaldistributionsystem',
    store: 'company.GlobalDistributionSystemStore',
    loadMask: true,
    cls: 'gridwhitebackground',

    initComponent: function () {

        var me = this;
        me.id = 'gds';
        //var sm = Ext.create('Ext.selection.CheckboxModel');

        height = 400;
        autoScroll = true;

        me.title = "Global Distribution System".l('SC61100'),
        me.frame = false;

        me.columns = [
            { header: 'Name'.l('SC61300'), dataIndex: 'Name', flex: 1 },
            { dataIndex: 'Checked', align: 'center', width: 25, renderer: this.checkboxRender, name: 'addGDS' },
            { hidden: true, dataIndex: 'GlobalDistributionId' }
        ];
        me.callParent();
    },

    checkboxRender: function (value, meta, record, rowIdx, col_idx, store) {
        var chkText = '';
        //return '<input ' + (record.data.Checked == true ? 'checked=checked' : '') + ' onclick="setDefaultPropertyFeatures(this,' + rowIdx + ',\'' + store.storeId + '\')" type=checkbox>' 
        if (value != null && value > 0) {
            chkText = '<input type=checkbox ' + 'checked=checked onclick="setDefaultPropertyFeatures(this,' + rowIdx + ',\'' + store.storeId + '\')">';
        }
        else {
            chkText = '<input type=checkbox ' + 'onclick="setDefaultPropertyFeatures(this,' + rowIdx + ',\'' + store.storeId + '\')">';
        }
        return chkText;
    }
});