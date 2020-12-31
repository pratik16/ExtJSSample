Ext.define('Regardz.view.bookingwizard.RightSide.Windows.BookingNavigation.CostOfCancelation', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.costofcancelation',
    store: 'bookingwizard.RightSide.CostOfCancelationStore',
    rootVisible: false,
    itemid: 'costOfCancelationId',
    initComponent: function () {
        var me = this;

        me.title = 'Cost of cancelation'.l('SC50600');
        me.layout = 'fit';

        me.columns = [{
            xtype: 'treecolumn', //this is so we know which column will show the tree            
            flex: 1,
            title: 'Description'.l('SC50600'),
            sortable: true,
            dataIndex: 'text'
        }, {
            text: 'Status'.l('SC50600'),
            title: 'Status',
            dataIndex: 'Status',
            width: 50
        }, {
            text: 'Price'.l('SC50600'),
            title: 'Price',
            xtype: 'numbercolumn',
            width: 100,
            format: '0.00',
            dataIndex: 'TotalPrice'
        }, {
            text: 'Cost'.l('SC50600'),
            title: 'Cost',
            xtype: 'numbercolumn',
            width: 100,
            format: '0.00',
            dataIndex: 'CancelCost'
        }, {
            hidden: true,
            dataIndex: 'BookingId',
            hideable: false
        }];

        me.callParent();

    }
});