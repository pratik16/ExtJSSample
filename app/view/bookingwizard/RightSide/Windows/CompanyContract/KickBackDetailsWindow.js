Ext.define('Regardz.view.bookingwizard.RightSide.Windows.CompanyContract.KickBackDetailsWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.kickbackdetailswindow',
    modal: true,
    border: false,
    title: 'Kick Back Details_Title'.l('SC50320'),
    iconCls: 'contract',
    width: '40%',
    companyName: null,
    initComponent: function () {

        var me = this;

        me.itemid = 'kickbackdetailsitems';
        me.PropertyId = me.propertyId;
        me.width = '40%';

        me.PurchaseConditions = {};
        me.kickbackDetails = Ext.create('Ext.grid.Panel', {
            store: 'bookingwizard.RightSide.Windows.CompanyContract.KickBackStore',
            itemid: "purchaseConditionsGrid",
            title: "Kick Back".l("SC50320"),
            height: 200,
            width: '97%',
            margin: '10',
            noResize: true,
            columns: [
                { baseCls: '', width: 150, header: 'From'.l('SC50320'), dataIndex: 'RevenueFrom', flex: 1, align: 'right', renderer: this.renderFormat },
                { baseCls: '', header: 'To'.l('SC50320'), dataIndex: 'RevenueTo', flex: 1, renderer: this.renderRevenueTo, align: 'right' },
                { baseCls: '', header: 'Percentage'.l('SC50320'), dataIndex: 'Value', flex: 1, align: 'right', renderer: this.renderFormat },
                { hidden: true, dataIndex: 'ContractId', hideable: false }
            ]
        });

        me.items = [me.kickbackDetails];

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
    renderRevenueTo: function (value, metadata, record, rowIndex, colIndex, store) {
        if (rowIndex == (store.data.items.length - 1))
            return '...';
        else
            return Ext.util.Format.number(value, '0,000.00'); ;
    },
    renderFormat: function (value, metadata, record, rowIndex, colIndex, store) {
        return Ext.util.Format.number(value, '0,000.00'); ;
    }
});