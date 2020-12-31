Ext.define('Regardz.view.bookingwizard.RightSide.Windows.CompanyContract.PaymentConditionsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.paymentconditionslist',
    store: 'bookingwizard.RightSide.Windows.CompanyContract.PaymentConditionsStore',
    loadMask: true,

    initComponent: function () {

        var me = this;
        me.autoHeight = true;

        me.itemid = "paymentConditionsGrid";
        me.title = "Payment Conditions".l("SC50300"),
        me.height = 200;
        me.width = '50%';
        me.margin = '10';
        me.noResize = true;

        me.columns = [
         { baseCls: '', align: 'center', width: 150, header: 'Description'.l('SC50300'), renderer: this.renderDescription, dataIndex: 'Description', flex: 1 },
                { baseCls: '', align: 'center', header: 'Condition'.l('SC50300'), renderer: this.renderPaymentCondi, dataIndex: 'Condition', flex: 1 }
		];

        me.callParent();
    },
    renderPaymentCondi: function (value, metadata, record, rowIndex, colIndex, store) {
        log('render payment', record.data);
        if (record.data.IsDay == true) {
            return record.data.Condition + " Days";
        }
        else {
            if (record.data.Condition == 1) {
                return "Free".l('SC50300');
            } else {
                return "Paid".l('SC50300');
            }
        }
    },
    renderDescription: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value.substring(0, 4) == "SPC_")
            value = value.l("SP_DynamicCode");
        return value;
    }
});