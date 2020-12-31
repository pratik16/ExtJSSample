Ext.define('Regardz.view.operations.windows.cashregister.CashRegisterList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.cashregisteritemlist',
    itemid: 'cashregisteritemlist',
    store: 'operations.OperationCashRegisterItemsStore',
    title: 'Search Items'.l('SC74000'),
    viewConfig: {
        forceFit: true
        //emptyText: 'No records'.l('SC70000')
    },
    loadMask: true,
    height: 400,

    autoScroll: true,
    initComponent: function () {
        var me = this;
        me.noResize = true;
        me.comboCashRegister = {
            xtype: 'combo',
            width: 200,
            margin: '0 0 0 0',
            itemid: 'CashRegisterCombo',
            displayField: 'CashRegisterName',
            action: 'CashRegisterChange',
            valueField: 'CashRegisterId',
            store: 'property.CashRegisterStore',
            emptyText: 'Select Cash Register'.l('SC74000'),
            allowBlank: true,
            margin: '0 0 0 10'
        };

        me.comboProperty = {
            xtype: 'combo',
            allowBlank: true,
            itemid: 'referenceCombo',
            emptyText: 'Select Property'.l('SC74000'),
            action: 'PropertyChange',
            store: 'property.PropertyListByUserIdStore',
            //fieldLabel: 'Property'.l('SC74000'),
            displayField: 'PropertyName',
            valueField: 'PropertyId',
            width: 250
        };

        me.radioStatus = {
            xtype: 'radiogroup',
            name: 'crstatus',
            itemid: 'crstatus',
            allowBlank: false,
            vertical: false,
            items: [{ boxLabel: 'Open'.l('SC75000'), name: 'Status', action: 'statusChange', checked: true, inputValue: '0', width: 80 },
                    { boxLabel: 'Closed'.l('SC75000'), name: 'Status', inputValue: '1', width: 100}]
        };

        me.cashRegisterDate = {
            xtype: 'datefield',
            //fieldLabel: 'Date'.l('SC75000'),
            itemid: 'cashRegisterDate',
            width: 100,
            format: usr_dateformat,
            action: 'cashRegisterDateChange',
            submitFormat: 'Y-m-d',
            maxValue: new Date(),
            value: new Date(),
            allowBlank: true,
            margin: '0 0 0 10'
        };

        me.columns = [
                { text: 'Time'.l('SC75000'), dataIndex: 'CreatedDate', flex: 1, renderer: this.dateRenderer, align: 'center' },
                { text: 'Receipt'.l('SC75000'), dataIndex: 'Receipt', flex: 3, align: 'right' },
                { text: 'Item'.l('SC75000'), dataIndex: 'ItemName', flex: 5 },
                { text: 'User'.l('SC75000'), dataIndex: 'Initial', flex: 1, align: 'center' },
                { text: 'Method'.l('SC75000'), dataIndex: 'Name', flex: 3 },
                { text: 'Price'.l('SC75000'), dataIndex: 'Price', flex: 3, renderer: this.amountRender, align: 'right' },
                { text: 'Quantity'.l('SC75000'), dataIndex: 'Quantity', flex: 2, align: 'center' },
                { text: 'Total'.l('SC75000'), dataIndex: 'TotalPrice', flex: 3, renderer: this.amountRender, align: 'right' },
                { hidden: true, dataIndex: 'OperationDirectSalesId' }
                ];

        me.tbar = [me.comboProperty, me.comboCashRegister, me.cashRegisterDate, '->', me.radioStatus];

        me.callParent();
    },
    renderIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.css = metadata.css + ' selectUser';
    },
    amountRender: function (value, metadata, record, rowIndex, colIndex, store) {
        return Ext.util.Format.number(value, '0.00');
    },
    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        var newDate = Ext.Date.parse(value, 'c');
        return Ext.Date.format(newDate, 'H:i');
    }
});