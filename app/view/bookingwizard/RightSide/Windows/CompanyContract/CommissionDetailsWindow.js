Ext.define('Regardz.view.bookingwizard.RightSide.Windows.CompanyContract.CommissionDetailsWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.commissiondetailswindow',
    modal: true,
    border: false,
    title: 'Commission Details_Title'.l('SC50330'),
    iconCls: 'contract',
    width: '40%',
    companyName: null,
    initComponent: function () {

        var me = this;

        me.itemid = 'commissiondetailsitems';
        me.width = '40%';

        me.commissionDetails = Ext.create('Ext.grid.Panel', {
            store: 'bookingwizard.RightSide.Windows.CompanyContract.CommissionDetailsStore',
            itemid: "purchaseConditionsGrid",
            title: "Commission".l("SC50330"),
            height: 200,
            width: '100%',
            margin: '10',
            noResize: true,
            columns: [
                { baseCls: '', width: 150, header: 'Category'.l('SC50330'), dataIndex: 'Category', renderer: this.renderCategory, flex: 1 },
                { baseCls: '', header: 'Percentage'.l('SC50330'), dataIndex: 'Percentage', renderer: this.renderPercent, flex: 1, align: 'right' },
                { hidden: true, dataIndex: 'ContractId', hideable: false}]
        });

        me.items = [me.commissionDetails];

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
    renderPercent: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value != null)
            return Ext.util.Format.number(value, '0.00') + " %";
    },
    renderCategory: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value.substring(0, 4) == "SPC_")
            value = value.l("SP_DynamicCode");
        return value;
    }
});