Ext.define('Regardz.controller.operations.DirectSalesController', {
    extend: 'Ext.app.Controller',
    views: ['operations.DirectSales', 'operations.windows.directsales.LeftItemList', 'operations.windows.directsales.RightItemList'],
    stores: ['configuration.ItemCategoryStore', 'bookingwizard.RightSide.BookingInvoiceStore', 'bookingwizard.BookingInvoiceItemsStore',
            'bookingwizard.BookingInvoiceItemsTotalStore', 'bookingwizard.BookingComboStore', 'property.PropertyListByUserIdStore', 'mastervalues.CcardTypeStore',
            'operations.OperationDirectSalesItemsStore', 'property.CashRegisterStore', 'property.PropertyListByUserIdStore'],
    thisController: false,
    init: function () {
        var me = this;
        this.control(
        {
            'directsales': {
                afterrender: function () {
                    this.BindControls();
                }
            },
            'directsalesleftitemlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'AddItemToRightGrid')
                        this.AddItemToRightGrid(zRec);
                }
            },
            'directsalesrightitemlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'deleteItem')
                        this.DeleteItem(zRec);
                }
            },
            'directsalesleftitemlist combo[action="ItemCategoryChange"]': {
                select: function (combo, records, Opts) {
                    var propertyId = Ext.ComponentQuery.query('directsales [itemid="referenceCombo"]')[0].value;
                    var filterText = Ext.ComponentQuery.query('[itemid="filteredText"]')[0].value;
                    Ext.getStore('operations.OperationDirectSalesItemsStore').load({
                        params: { 'itemCategoryId': combo.getValue(), 'propertyId': propertyId, 'filterText': filterText == null ? '' : filterText, 'languageId': user_language }
                    });
                }
            },
            'directsales combo[action="DSPropertyChange"]': {
                select: function (combo, records, Opts) {
                    //var cashRegisterCombo = Ext.ComponentQuery.query('[itemid="CashRegisterCombo"]')[0];
                    Ext.getStore('property.CashRegisterStore').proxy.setExtraParam('id', combo.getValue());
                    Ext.getStore('property.CashRegisterStore').proxy.setExtraParam('limit', 500);
                    Ext.getStore('property.CashRegisterStore').load();
                    //////////////////////////////////////////////////
                    var itemCatId = Ext.ComponentQuery.query('directsalesleftitemlist [itemid="ItemCategoryCombo"]')[0].getValue();
                    var filterText = Ext.ComponentQuery.query('[itemid="filteredText"]')[0].value;
                    Ext.getStore('operations.OperationDirectSalesItemsStore').load({
                        params: { 'itemCategoryId': (itemCatId == null ? 0 : itemCatId), 'propertyId': combo.getValue(), 'filterText': filterText == null ? '' : filterText, 'languageId': user_language }
                    });
                    //////////////////////////////////////////////////
                    this.RemoveAll();
                }
            },
            'directsalesleftitemlist button[action="searchItemsWithFilterText"]': {
                click: function (t, e, o) {
                    var propertyId = Ext.ComponentQuery.query('directsales [itemid="referenceCombo"]')[0].value;
                    var itemCatId = Ext.ComponentQuery.query('directsalesleftitemlist [itemid="ItemCategoryCombo"]')[0].getValue();
                    var filterText = Ext.ComponentQuery.query('[itemid="filteredText"]')[0].value;

                    Ext.getStore('operations.OperationDirectSalesItemsStore').load({
                        params: { 'itemCategoryId': (itemCatId == null ? 0 : itemCatId), 'propertyId': propertyId, 'filterText': filterText == null ? '' : filterText, 'languageId': user_language }
                    });
                }
            },
            'directsales button[action="SaveDirectSales"]': {
                click: function (t, e, o) {
                    if (Ext.ComponentQuery.query('[itemid="directsalesform"]')[0].getForm().isValid()) {
                        var salesObj = new Object();
                        salesObj.PropertyId = Ext.ComponentQuery.query('directsales [itemid="referenceCombo"]')[0].value;

                        var cashRCombo = Ext.ComponentQuery.query('directsales [itemid="CashRegisterCombo"]')[0];
                        if (cashRCombo == undefined || cashRCombo == null || cashRCombo.value == undefined || cashRCombo.value == null) {
                            Ext.Msg.alert('Error'.l('g'), "Please select Cash Register".l('SC71500'));
                            return;
                        }

                        var paymentMCombo = Ext.ComponentQuery.query('directsales [itemid="PaymentMethodCombo"]')[0];
                        if (paymentMCombo == undefined || paymentMCombo == null || paymentMCombo.value == undefined || paymentMCombo.value == null) {
                            Ext.Msg.alert('Error'.l('g'), "Please select payment method".l('SC71500'));
                            return;
                        }

                        salesObj.CashRegisterId = cashRCombo.value;
                        salesObj.PaymentMethodId = paymentMCombo.value;
                        salesObj.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                        salesObj.CreatedBy = CurrentSessionUserId;
                        //////////////////////////////////////////////
                        var ids = ''; var summaryRecord = null;
                        var itemList = new Array(); var item = new Object();
                        var obj = Ext.ComponentQuery.query('directsales [itemid="invoicerightitemlist"]')[0];
                        var store = obj.getStore();

                        if (store != null && store.data.items.length > 0) {
                            for (var i = 0; i < store.data.items.length; i++) {
                                summaryRecord = store.getAt(i);
                                if (summaryRecord.data.Reduction != -1) {
                                    item = new Object();
                                    item.ItemId = summaryRecord.data.ItemId;
                                    item.Price = summaryRecord.data.Price;
                                    item.Quantity = summaryRecord.data.Quantity;
                                    item.DiscountValue = summaryRecord.data.Quantity * summaryRecord.data.Price / 100;
                                    item.VatValue = summaryRecord.data.Quantity * summaryRecord.data.Vat;
                                    item.VatRateValue = summaryRecord.data.VatRateValue;
                                    item.IsItemGroup = summaryRecord.data.IsItemGroup;
                                    item.BarId = summaryRecord.data.BarId;
                                    item.Reduction = summaryRecord.data.Reduction;
                                    itemList[i] = item;
                                }
                            }
                        }
                        if (itemList.length == 0) {
                            Ext.Msg.alert('Error'.l('g'), 'Please select any item'.l('SC75000'));
                            return;
                        }
                        salesObj.ItemsList = Ext.encode(itemList);
                        //////////////////////////////////////////////
                        var SaveDirectSalesCombo = Ext.ComponentQuery.query('directsales [itemid="directsalesform"]')[0];
                        SaveDirectSalesCombo.setDisabled(true);

                        Ext.Ajax.request({
                            url: webAPI_path + 'api/OperationDirectSales/ManageDirectSales',
                            type: 'POST',
                            timeout: 180000,
                            params: salesObj,
                            success: function (response) {
                                var r = Ext.decode(response.responseText);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == true) {
                                    window.open(ResultText);
                                    SaveDirectSalesCombo.setDisabled(false);
                                    me.BindControls();
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function (form, response) {
                                r = response.result;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == false) {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                }
                            }
                        });

                    }
                }
            }
            //////////////////
        })
    },
    AddItemToRightGrid: function (r) {
        var obj = Ext.ComponentQuery.query('directsales [itemid="invoicerightitemlist"]')[0];
        var store = obj.getStore();
        var index = store.findExact('ItemId', r.data.ItemId);
        var exStore = store.getAt(index);
        ///////////////////////////////////////////
        if (exStore == null) {
            store.add({
                ItemId: r.data.ItemId,
                ItemName: r.data.ItemName,
                Price: r.data.NetPrice,
                PriceWOVat: r.data.PriceWOVat,
                Quantity: 1,
                Reduction: 0,
                Total: r.data.NetPrice,
                TotalWOVat: r.data.TotalWOVat,
                SortOrder: r.data.ItemId,
                Vat: r.data.Vat,
                VatRateBreakDownId: r.data.VatRateBreakDownId,
                VatRateValue: r.data.VatRateValue,
                IsItemGroup: r.data.IsItemGroup,
                BarId: r.data.BarId
            });
            store.commitChanges();
            //update total store
            this.UpdateTotalStore(store);
        } else {
            //exStore.set('ItemName', '100');
            //store.data.items[index].data.Vat += store.data.items[index].data.Vat;
            store.data.items[index].data.Quantity += 1;
            store.data.items[index].data.Total = exStore.data.Price * exStore.data.Quantity;
            store.data.items[index].data.TotalWOVat = exStore.data.PriceWOVat * exStore.data.Quantity;
            store.commitChanges();
            store.loadData(store.data.items);
            //update total store    
            this.UpdateTotalStore(store);
        }
    },
    RemoveAll: function () {
        var obj = Ext.ComponentQuery.query('directsales [itemid="invoicerightitemlist"]')[0];
        var store = obj.getStore();
        store.removeAll();
        store.commitChanges();
        store.loadData(store.data.items);
        this.UpdateTotalStore(store);
    },
    DeleteItem: function (r) {
        var obj = Ext.ComponentQuery.query('directsales [itemid="invoicerightitemlist"]')[0];
        var store = obj.getStore();
        var index = store.findExact('SortOrder', r.data.SortOrder);
        store.removeAt(index);
        store.commitChanges();
        store.loadData(store.data.items);
        this.UpdateTotalStore(store);
    },
    UpdateTotalStore: function (store) {
        var totalGrid = Ext.ComponentQuery.query('directsales [itemid="invoiceTotalGrid"]')[0];
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
            totalStore.data.items[totalStore.data.items.length - 1].data.Value = total; // +finalVat;

            totalStore.commitChanges();
            totalStore.loadData(totalStore.data.items);
        } else {
            Ext.getStore('bookingwizard.BookingInvoiceItemsTotalStore').load();
        }
    },
    BindControls: function () {
        //Bind Property Combo
        //        var referenceCombo = Ext.ComponentQuery.query('directsales [itemid="referenceCombo"]')[0];
        //        var propertyStore = Ext.getStore('property.PropertyListByUserIdStore');
        //        propertyStore.on('load', function (store) {
        //            var propertyId = store.getAt(0).get('PropertyId');
        //            //Set first value of Property Combo
        //            referenceCombo.setValue(propertyId);
        //            //Bind CashRegister combo
        //            var cashRegisterCombo = Ext.ComponentQuery.query('[itemid="CashRegisterCombo"]')[0];
        //            Ext.getStore('property.CashRegisterStore').proxy.setExtraParam('id', propertyId);
        //            Ext.getStore('property.CashRegisterStore').proxy.setExtraParam('limit', 500);
        //            Ext.getStore('property.CashRegisterStore').load();
        //            //cashRegisterCombo.setValue('0');
        //        });

        //propertyStore.load({ params: { 'userId': CurrentSessionUserId, 'languageId': user_language} });

        var propertyStore = Ext.getStore('property.PropertyListByUserIdStore');
        /*Property list callback*/
        propertyStore.load({
            params: {
                'userId': CurrentSessionUserId,
                'languageId': user_language,
                'activityCode': 'OPER004'
            },
            callback: function (records, o, success) {
                if (typeof o.response.data != 'undefined') {
                    var data = o.response.data;
                    var referenceCombo = Ext.ComponentQuery.query('directsales [itemid="referenceCombo"]')[0];
                    referenceCombo.setValue(data[0].PropertyId); //data

                    var itemCategoryCombo = Ext.ComponentQuery.query('directsalesleftitemlist [itemid="ItemCategoryCombo"]')[0];
                    itemCategoryCombo.getStore().load({
                        params: {
                            'limit': 500
                        },
                        callback: function (records, o, success) {
                            if (typeof o.response.data != 'undefined') {
                                var idata = o.response.data;
                                itemCategoryCombo.setValue(idata[0].ItemCategoryId);

                                //Bind left item grid
                                Ext.getStore('operations.OperationDirectSalesItemsStore').load({
                                    params: { 'itemCategoryId': idata[0].ItemCategoryId, 'propertyId': data[0].PropertyId, 'filterText': '', 'languageId': user_language }
                                });

                                Ext.getStore('bookingwizard.BookingInvoiceItemsTotalStore').load();
                            }
                        }
                    });

                    Ext.getStore('bookingwizard.BookingInvoiceItemsStore').load({
                        params: { 'id': -1, 'id2': -1, 'languageId': user_language }
                    });

                    var PaymentMethodCombo = Ext.ComponentQuery.query('[itemid="PaymentMethodCombo"]')[0];
                    PaymentMethodCombo.setValue(null);

                    var cashRegisterCombo = Ext.ComponentQuery.query('[itemid="CashRegisterCombo"]')[0];
                    cashRegisterCombo.getStore().load({
                        params: {
                            id: data[0].PropertyId,
                            limit: 500
                        },
                        callback: function (records, o, success) {
                            cashRegisterCombo.setValue(null);
                        }
                    });
                }
            }
        })
    }
});