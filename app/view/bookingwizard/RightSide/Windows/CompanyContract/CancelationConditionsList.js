Ext.define('Regardz.view.bookingwizard.RightSide.Windows.CompanyContract.CancelationConditionsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.cancelationconditionslist',
    store: 'bookingwizard.RightSide.Windows.CompanyContract.CancelationConditionsStore',
    loadMask: true,

    initComponent: function () {

        var me = this;
        me.autoHeight = true;

        me.itemid = "cancelationConditionsGrid";
        me.title = "Cancelation Conditions".l("SC50300"),
        me.height = 200;
        me.width = '50%';
        me.margin = '10';
        me.noResize = true;

        me.columns = [
            { baseCls: '', width: 150, align: 'center', header: 'Period before arrival'.l("SC50300"), dataIndex: 'Period', flex: 1 },
                { baseCls: '', align: 'center', header: 'Percentage'.l("SC50300"), dataIndex: 'Penalty', flex: 1, renderer: me.renderPercent, align: 'right' },
                { hidden: true, dataIndex: 'ContractId', hideable: false }
		];

        me.callParent();
    },
    renderPercent: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value != null)
            return Ext.util.Format.number(value, '0.00') + " %";
    }
});