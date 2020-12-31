Ext.define('Regardz.view.operations.CashRegister', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cashregister',
    modal: true,
    autoShow: true,
    border: false,
    title: 'Cash Register Closure [SC75000]'.l('SC75000'),
    frame: false,
    itemid: 'directSalesPanel',
    initComponent: function () {
        var me = this;

        me.invoiceTotalGrid = {
            xtype: 'gridpanel',
            hideHeader: true,
            border: true,
            width: "100%",
            autoScroll: true,
            noResize: true,
            itemid: 'totalGrid',
            store: 'operations.OperationCashRegisterItemsTotalStore',
            margin: '10 0 0 0',
            cls: 'hide-column-header',
            columns: [
                        { flex: 14 },
                        { dataIndex: 'Name', flex: 2, align: 'left', renderer: this.typeRenderer },
                        { dataIndex: 'TotalPrice', flex: 2, align: 'right', renderer: this.amountRender },
                        { markDirty: false, align: 'left', flex: 3, renderer: this.textboxRenderer, dataIndex: 'EnteredPrice', align: 'right'}]
        };

        me.bigPanel = {
            border: false,
            frame: false,
            xtype: 'form',
            itemid: 'directsalesform',
            margin: 10,
            align: top,
            items: [{
                border: false,
                columnWidth: .50,
                margin: '5 10 0 0',
                items: [
                        { xtype: 'cashregisteritemlist', margin: '10 0 0 0' },
                        me.invoiceTotalGrid
                       ]
            }],
            buttons: [{ text: 'Print'.l('w'), action: 'PrintDirectSales' }, { text: 'Close'.l('w'), itemid: 'closeDirectSales', action: 'CloseDirectSales'}]
        }
        me.items = [me.bigPanel];
        me.callParent();
    },
    typeRenderer: function (value, metadata, record, rowIdx, colIndex, store) {
        if (store.data.items.length != (rowIdx + 1))
            return value;
        else return '<b>' + value + '</b>';
    },
    amountRender: function (value, metadata, record, rowIdx, colIndex, store) {
        if (store.data.items.length != (rowIdx + 1))
            return Ext.util.Format.number(value, '0.00');
        else return '<b>' + Ext.util.Format.number(value, '0.00') + '</b>';
    },
    textboxRenderer: function (value, metadata, record, rowIdx, colIndex, store) {
        if (store.data.items.length != (rowIdx + 1)) {
            try {
                var itemvalue = Ext.getStore(store.storeId).data.items[rowIdx].data.EnteredPrice;
                itemvalue = parseFloat(itemvalue.replace(",", "."));
                var totalvalue = Ext.getStore(store.storeId).data.items[rowIdx].data.TotalPrice;

                if (itemvalue > 0 && itemvalue != totalvalue)
                    metadata.style = "background-color: pink";
            } catch (e) { }

            return '<input type="text" value="' + (value > 0 ? Ext.util.Format.number(value, '0.00') : '') + '" id="txtPrice' + rowIdx + '" name="txtPrice' + rowIdx + '" onchange="setFinalPriceStore(this, \'' + store.storeId + '\', ' + rowIdx + ')">';
        }
        else {
            try {
                var itemvalue = Ext.getStore(store.storeId).data.items[rowIdx].data.EnteredPrice;
                itemvalue = parseFloat(itemvalue);
                var totalvalue = Ext.getStore(store.storeId).data.items[rowIdx].data.TotalPrice;

                if (itemvalue > 0 && itemvalue != totalvalue)
                    metadata.style = "background-color: pink";
            } catch (e) { }

            return '<b>' + Ext.util.Format.number(value, '0.00') + '</b>';
        }
    }
});