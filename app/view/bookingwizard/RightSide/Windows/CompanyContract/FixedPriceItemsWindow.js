Ext.define('Regardz.view.bookingwizard.RightSide.Windows.CompanyContract.FixedPriceItemsWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.fixedpriceitemswindow',
    modal: true,
    border: false,
    title: 'Kick Back Details_Title'.l('SC50320'),
    iconCls: 'contract',
    width: '60%',
    companyName: null,
    initComponent: function () {

        var me = this;

        me.itemid = 'fixedpriceitems';
        me.PropertyId = me.propertyId;
        me.width = '60%';

        me.fixedpriceItems = Ext.create('Ext.grid.Panel', {
            store: 'bookingwizard.RightSide.Windows.CompanyContract.FixedPriceItemsStore',
            itemid: "purchaseConditionsGrid",
            title: "Packages".l("SC50350"),
            height: 200,
            width: '97%',
            margin: '10',
            noResize: true,
            columns: [
                { header: '', dataIndex: 'IsItemGroup', renderer: this.setItemIcon, width: 25 },
                { baseCls: '', header: 'Name'.l('SC50350'), dataIndex: 'Name', flex: 1 },
                { baseCls: '', header: 'Price'.l('SC50350'), dataIndex: 'Price', width: 100, renderer: this.renderFormat, align: 'right' }
            ]
        });

        me.items = [me.fixedpriceItems];

        me.dockedItems = [{
            dock: 'bottom',
            buttonAlign: 'right',
            buttons: [
                {
                    text: 'Close'.l('w'),
                    handler: function () {
                        me.destroy();
                    }
                }
            ]
        }];
        me.callParent(arguments);
    },
    setItemIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.tdCls = 'tree-icon-itemgroup';
        if (value == true) {
            metadata.tdCls = 'icon-item-group-contract';
        }
    },
    renderFormat: function (value, metadata, record, rowIndex, colIndex, store) {
        return Ext.util.Format.number(value, '0,000.00'); ;
    }
});