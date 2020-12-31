Ext.define('Regardz.view.bookingwizard.InvoiceSettingsList', {
    extend: 'Ext.grid.Panel',
    itemid: 'invoicesettingslist',
    alias: 'widget.invoicesettingslist',
    store: 'bookingwizard.BookingInvoiceSettingsStore',
    loadMask: true,
    requires: ['Ext.ux.form.SearchField'],

    initComponent: function () {
        var me = this;
        me.viewConfig = {
            forceFit: true,
            plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: 'firstGridDDGroup',
                dropGroup: 'secondGridDDGroup'
            },
            listeners: {
                beforedrop: function (node, data, dropRec, dropPosition, dropFunction, eOpt) {
                    var obj = Ext.ComponentQuery.query('[itemid="invoicesettingslist"]')[0];
                    if (obj.disabled) return false;

                    if (data.records[0].data.DataType > 1) {
                        Ext.Msg.alert('Error'.l('g'), 'Cannot move discount items'.l('g'));
                        return false;
                    }
                },
                drop: function (node, data, dropRec, dropPosition) {
                    var obj2 = Ext.ComponentQuery.query('[itemid="invoicesettingslist"]')[0];
                    var store2 = obj2.getStore(); var index = -1;
                    //var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
                    /////////////////////////////////////////////////////////////////////
                    var obj = Ext.ComponentQuery.query('[itemid="invoicesettingslist2"]')[0];
                    var summaryRecord = null;
                    var total = 0;
                    var store = obj.getStore();
                    if (store != null && store.data.items.length > 0) {
                        for (var i = 0; i < store.data.items.length; i++) {
                            summaryRecord = store.getAt(i);
                            if (data.records[0].data.FixedPriceId != null && data.records[0].data.FixedPriceId == summaryRecord.data.FixedPriceId) {
                                store2.add({
                                    Name: summaryRecord.data.Name,
                                    TotalCount: summaryRecord.data.TotalCount,
                                    TotalSum: summaryRecord.data.TotalSum,
                                    SortOrder: summaryRecord.data.SortOrder,
                                    ItemGroupId: summaryRecord.data.ItemGroupId,
                                    TotaFixedPriceIdlSum: summaryRecord.data.FixedPriceId,
                                    ItemId: summaryRecord.data.ItemId,
                                    DataType: summaryRecord.data.DataType,
                                    DetailIds: summaryRecord.data.DetailIds
                                });
                                store2.commitChanges();
                                index = store.findExact('FixedPriceId', summaryRecord.data.FixedPriceId);
                                store.removeAt(index);
                                continue;
                            } else if (data.records[0].data.ItemGroupId != null && data.records[0].data.ItemGroupId == summaryRecord.data.ItemGroupId) {
                                store2.add({
                                    Name: summaryRecord.data.Name,
                                    TotalCount: summaryRecord.data.TotalCount,
                                    TotalSum: summaryRecord.data.TotalSum,
                                    SortOrder: summaryRecord.data.SortOrder,
                                    ItemGroupId: summaryRecord.data.ItemGroupId,
                                    TotaFixedPriceIdlSum: summaryRecord.data.FixedPriceId,
                                    ItemId: summaryRecord.data.ItemId,
                                    DataType: summaryRecord.data.DataType,
                                    DetailIds: summaryRecord.data.DetailIds
                                });
                                store2.commitChanges();
                                index = store.findExact('ItemGroupId', summaryRecord.data.ItemGroupId);
                                store.removeAt(index);
                                continue;
                            }
                            else if (data.records[0].data.ItemId != null && data.records[0].data.ItemId == summaryRecord.data.ItemId) {
                                store2.add({
                                    Name: summaryRecord.data.Name,
                                    TotalCount: summaryRecord.data.TotalCount,
                                    TotalSum: summaryRecord.data.TotalSum,
                                    SortOrder: summaryRecord.data.SortOrder,
                                    ItemGroupId: summaryRecord.data.ItemGroupId,
                                    TotaFixedPriceIdlSum: summaryRecord.data.FixedPriceId,
                                    ItemId: summaryRecord.data.ItemId,
                                    DataType: summaryRecord.data.DataType,
                                    DetailIds: summaryRecord.data.DetailIds
                                });
                                store2.commitChanges();
                                index = store.findExact('ItemId', summaryRecord.data.ItemId);
                                store.removeAt(index);
                                continue;
                            }
                            total += summaryRecord.data.TotalSum;
                        }
                    }
                    //Ext.ComponentQuery.query('[itemid="total2"]')[0].setValue(Ext.util.Format.number(total, '0.00'));
                    /////////////////////////////////////////////////////////////////////
                    total = 0; var summaryRecord = null;
                    obj = Ext.ComponentQuery.query('[itemid="invoicesettingslist3"]')[0];
                    store = obj.getStore();
                    if (store != null && store.data.items.length > 0) {
                        for (var i = 0; i < store.data.items.length; i++) {
                            summaryRecord = store.getAt(i);
                            if (data.records[0].data.FixedPriceId != null && data.records[0].data.FixedPriceId == summaryRecord.data.FixedPriceId) {
                                store2.add({
                                    Name: summaryRecord.data.Name,
                                    TotalCount: summaryRecord.data.TotalCount,
                                    TotalSum: summaryRecord.data.TotalSum,
                                    SortOrder: summaryRecord.data.SortOrder,
                                    ItemGroupId: summaryRecord.data.ItemGroupId,
                                    TotaFixedPriceIdlSum: summaryRecord.data.FixedPriceId,
                                    ItemId: summaryRecord.data.ItemId,
                                    DataType: summaryRecord.data.DataType,
                                    DetailIds: summaryRecord.data.DetailIds
                                });
                                store2.commitChanges();
                                index = store.findExact('FixedPriceId', summaryRecord.data.FixedPriceId);
                                store.removeAt(index);
                                continue;
                            } else if (data.records[0].data.ItemGroupId != null && data.records[0].data.ItemGroupId == summaryRecord.data.ItemGroupId) {
                                store2.add({
                                    Name: summaryRecord.data.Name,
                                    TotalCount: summaryRecord.data.TotalCount,
                                    TotalSum: summaryRecord.data.TotalSum,
                                    SortOrder: summaryRecord.data.SortOrder,
                                    ItemGroupId: summaryRecord.data.ItemGroupId,
                                    TotaFixedPriceIdlSum: summaryRecord.data.FixedPriceId,
                                    ItemId: summaryRecord.data.ItemId,
                                    DataType: summaryRecord.data.DataType,
                                    DetailIds: summaryRecord.data.DetailIds
                                });
                                store2.commitChanges();
                                index = store.findExact('ItemGroupId', summaryRecord.data.ItemGroupId);
                                store.removeAt(index);
                                continue;
                            }
                            else if (data.records[0].data.ItemId != null && data.records[0].data.ItemId == summaryRecord.data.ItemId) {
                                store2.add({
                                    Name: summaryRecord.data.Name,
                                    TotalCount: summaryRecord.data.TotalCount,
                                    TotalSum: summaryRecord.data.TotalSum,
                                    SortOrder: summaryRecord.data.SortOrder,
                                    ItemGroupId: summaryRecord.data.ItemGroupId,
                                    TotaFixedPriceIdlSum: summaryRecord.data.FixedPriceId,
                                    ItemId: summaryRecord.data.ItemId,
                                    DataType: summaryRecord.data.DataType,
                                    DetailIds: summaryRecord.data.DetailIds
                                });
                                store2.commitChanges();
                                index = store.findExact('ItemId', summaryRecord.data.ItemId);
                                store.removeAt(index);
                                continue;
                            }
                            total += summaryRecord.data.TotalSum;
                        }
                    }
                    //Ext.ComponentQuery.query('[itemid="total3"]')[0].setValue(Ext.util.Format.number(total, '0.00'));
                    /////////////////////////////////////////////////////////////////////
                    obj = Ext.ComponentQuery.query('[itemid="invoicesettingslist"]')[0];
                    total = 0;
                    store = obj.getStore();
                    if (store != null && store.data.items.length > 0) {
                        for (var i = 0; i < store.data.items.length; i++) {
                            summaryRecord = store.getAt(i);
                            total += summaryRecord.data.TotalSum;
                        }
                    }
                    Ext.ComponentQuery.query('invoicesettingslist [itemid="total1"]')[0].setValue(Ext.util.Format.number(total, '0.00'));
                    /////////////////////////////////////////////////////////////////////
                    obj = Ext.ComponentQuery.query('[itemid="invoicesettingslist2"]')[0];
                    total = 0;
                    store = obj.getStore();
                    if (store != null && store.data.items.length > 0) {
                        for (var i = 0; i < store.data.items.length; i++) {
                            summaryRecord = store.getAt(i);
                            total += summaryRecord.data.TotalSum;
                        }
                    }
                    Ext.ComponentQuery.query('invoicesettingslist2 [itemid="total2"]')[0].setValue(Ext.util.Format.number(total, '0.00'));
                    /////////////////////////////////////////////////////////////////////
                    obj = Ext.ComponentQuery.query('[itemid="invoicesettingslist3"]')[0];
                    total = 0;
                    store = obj.getStore();
                    if (store != null && store.data.items.length > 0) {
                        for (var i = 0; i < store.data.items.length; i++) {
                            summaryRecord = store.getAt(i);
                            total += summaryRecord.data.TotalSum;
                        }
                    }
                    Ext.ComponentQuery.query('invoicesettingslist3 [itemid="total3"]')[0].setValue(Ext.util.Format.number(total, '0.00'));
                    //Ext.ComponentQuery.query('[itemid="total1"]')[0].setValue(Ext.util.Format.number(total, '0.00'));
                }
            }
        };

        me.height = 400,
        me.title = 'Items Invoice 1'.l('SC55100'),
        me.layout = "fit";
        me.noResize = true;
        me.columns =
        [
            { header: 'Description'.l('SC55100'), dataIndex: 'Name', flex: 1, renderer: this.colorRender },
            { header: 'Price'.l('SC55100'), dataIndex: 'TotalSum', align: 'right', width: 80, renderer: this.colorRender }
        ];
        me.bbar =
        [
            { xtype: 'tbfill' },
            'Total'.l('SC55100'),
            '|',
            { xtype: 'displayfield', itemid: 'total1', width: 80 }
        ];

        me.callParent();
    },
    colorRender: function (value, metadata, record, rowIndex, colIndex, store) {
        if (store.data.items[rowIndex].data.DataType > 1)
            metadata.style = "background-color: #00ff90 !important";
        return colIndex == 0 ? value : Ext.util.Format.number(value, '0.00');
    }
});