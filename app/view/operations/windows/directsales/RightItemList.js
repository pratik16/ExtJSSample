Ext.define('Regardz.view.operations.windows.directsales.RightItemList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.directsalesrightitemlist',
    store: 'bookingwizard.BookingInvoiceItemsStore',
    itemid: 'invoicerightitemlist',
    loadMask: true,
    title: 'Sales Bill'.l('SC74000'),
    height: 382,
    initComponent: function () {
        var me = this;
        me.rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        me.plugins = [me.rowEditing];
        me.columns = [
            { text: 'Article'.l('SC55500'), dataIndex: 'ItemName', flex: 1 },
            { text: 'Price'.l('SC55500'), dataIndex: 'Price', flex: 1, format: '0.00', align: 'right', decimalPrecision: 2, renderer: this.amountRender },
            { text: 'Quantity'.l('SC55500'), dataIndex: 'Quantity', flex: 1, editor: new Ext.form.NumberField(), align: 'center' },
            { text: 'Total'.l('SC55500'), dataIndex: 'Total', flex: 1, align: 'right', format: '0.00', decimalPrecision: 2, renderer: this.amountRender },
            { width: 30, renderer: this.deleteIcon, name: 'deleteItem'}];

        me.listeners = {
            edit: function (editor, e) {
                //setInvoiceItemStoresRightGridUpdate(null, e.colIdx, e.row.rowIndex, 'bookingwizard.BookingInvoiceItemsStore', e.record.data.Reduction, e.record.data.Quantity);
                e.record.commit();
                var rowIdx = e.row.rowIndex - 1;
                var rdn = e.record.data.Reduction;
                var qnt = e.record.data.Quantity;

                var obj = Ext.ComponentQuery.query('directsales [itemid="invoicerightitemlist"]')[0];
                var store = obj.getStore();
                var exStore = store.getAt(rowIdx);
                //store.data.items[rowIdx].data.Vat = store.data.items[index].data.Vat;
                store.data.items[rowIdx].data.Reduction = parseInt(rdn);
                store.data.items[rowIdx].data.Quantity = qnt;
                store.data.items[rowIdx].data.Total = exStore.data.Price * qnt;
                store.data.items[rowIdx].data.TotalWOVat = exStore.data.PriceWOVat * exStore.data.Quantity;
                store.commitChanges();
                store.loadData(store.data.items);

                if (store.data.items[rowIdx].data.Reduction > 0) {
                    var index = store.findExact('SortOrder', parseInt(store.data.items[rowIdx].data.ItemId) + 0.5);
                    store.removeAt(index);

                    store.add({
                        ItemId: store.data.items[rowIdx].data.ItemId,
                        //ItemGroupId: store.data.items[rowIdx].data.ItemGroupId,
                        ItemName: 'Reduction on ' + store.data.items[rowIdx].data.ItemName + ' (' + parseInt(rdn) + '%)',
                        Price: store.data.items[rowIdx].data.Price * parseInt(rdn) * 0.01,
                        PriceWOVat: store.data.items[rowIdx].data.Price * parseInt(rdn) * 0.01,
                        Quantity: store.data.items[rowIdx].data.Quantity,
                        Reduction: -1,
                        Total: store.data.items[rowIdx].data.Price * parseInt(rdn) * store.data.items[rowIdx].data.Quantity * -1 * 0.01,
                        TotalWOVat: store.data.items[rowIdx].data.Price * parseInt(rdn) * store.data.items[rowIdx].data.Quantity * -1 * 0.01,
                        SortOrder: parseInt(store.data.items[rowIdx].data.ItemId) + 0.5,
                        IsItemGroup: store.data.items[rowIdx].data.IsItemGroup,
                        BarId: store.data.items[rowIdx].data.BarId
                    });

                    store.sort('SortOrder', 'ASC');
                    store.commitChanges();
                    store.loadData(store.data.items);
                }

                if (store.data.items.length > 0) {
                    var totalGrid = Ext.ComponentQuery.query('[itemid="invoiceTotalGrid"]')[0];
                    var totalStore = totalGrid.getStore();
                    var total = 0, totalVat = 0, finalVat = 0, totalWOVat = 0;

                    if (store.data.items.length > 0) {
                        for (var j = 1; j < totalStore.data.items.length - 1; j++) {
                            totalVat = 0;
                            for (var i = 0; i < store.data.items.length; i++) {
                                if (j == 1) {
                                    total += store.data.items[i].data.Total;
                                    totalWOVat += store.data.items[i].data.TotalWOVat;
                                }

                                if (store.data.items[i].data.VatRateBreakDownId == totalStore.data.items[j].data.Id) {
                                    totalVat += store.data.items[i].data.Vat * store.data.items[i].data.Quantity;
                                }
                            }
                            finalVat += totalVat;
                            totalStore.data.items[j].data.Value = totalVat;
                        }

                        totalStore.data.items[0].data.Value = total - finalVat;
                        totalStore.data.items[totalStore.data.items.length - 1].data.Value = total; //  + finalVat;

                        totalStore.commitChanges();
                        totalStore.loadData(totalStore.data.items);
                    }
                }
            },
            beforeedit: function (editor, e, eOpts) {
                if (e.record.data.Reduction == -1)
                    return false;
                return true;
            }
        };

        me.callParent();
    },
    deleteIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.css = metadata.css + ' icon-delete-item';
    },
    selectRender: function (value, metadata, record, rowIndex, colIndex, store) {
        if (colIndex == 2) {
            var selHeader = '<select id=' + (colIndex == 2 ? 'ddlQnt' + rowIndex : 'ddlRed' + rowIndex) + ' onchange="setInvoiceItemStores(this,' + colIndex + ',' + rowIndex + ',\'' + store.storeId + '\')">';
            for (var i = 1; i <= 100; i++) {
                if (i == value)
                    selHeader += '<option selected="selected">' + i + '</option>';
                else
                    selHeader += '<option>' + i + '</option>';
            }
            selHeader += '</select>';
            return selHeader;
        } else {
            return value;
        }
    },
    amountRender: function (value, metadata, record, rowIndex, colIndex, store) {
        return Ext.util.Format.number(value, '0.00');
    }
});