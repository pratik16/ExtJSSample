Ext.define('Regardz.controller.bookingwizard.BookingInvoiceSettings', {
    extend: 'Ext.app.Controller',
    views: ['bookingwizard.InvoiceSettings', 'bookingwizard.InvoiceSettingsList', 'bookingwizard.InvoiceSettingsList2', 'bookingwizard.InvoiceSettingsList3',
    /////////////////////////////////////////////////////////
            'bookingwizard.RightSide.Windows.Invoice.InvoiceLeftItemList', 'bookingwizard.RightSide.Windows.Invoice.InvoiceRightItemList', 'bookingwizard.RightSide.Invoices'],
    stores: ['bookingwizard.BookingInvoiceSettingsStore', 'bookingwizard.BookingInvoiceSettings2Store', 'bookingwizard.BookingInvoiceSettings3Store', 'bookingwizard.BookingInvoiceSettingsBasicStore',
            'bookingwizard.BookingInvoiceSettingsOtherSectionsStore',
    /////////////////////////////////////////////////////////
            'configuration.ItemCategoryStore', 'common.BarStore', 'bookingwizard.BookingInvoiceSearchItemsStore', 'bookingwizard.RightSide.BookingInvoiceStore', 'bookingwizard.BookingInvoiceItemsStore',
            'bookingwizard.BookingComboStore', 'common.CountryStore', 'bookingwizard.BookingInvoiceItemsTotalStore', 'operations.InhouseBarListStore'],
    thisController: false,
    init: function () {
        var me = this;
        var bookingId = 0, bookingTrackingId = 0;
        //var companyContactArr = new Array();

        this.control(
        {
            'invoicesettings': {
                afterrender: function () {
                    me.companyContactArr = new Array();
                    for (var i = 0; i < 3; i++) {
                        var obj = new Object();
                        me.companyContactArr[i] = obj;
                    }

                    me.BookingId = Ext.ComponentQuery.query('[itemid="ISBookingId"]')[0].value;
                    me.BookingTrackingId = Ext.ComponentQuery.query('[itemid="ISBookingTrackingId"]')[0].value;
                    console.log(me.BookingId);
                    console.log(me.BookingTrackingId);
                    if (!Utils.isValid(me.BookingId)) {
                        me.BookingId = 0;
                    }

                    Ext.getStore('bookingwizard.BookingInvoiceSettingsBasicStore').load({
                        params: { 'id': me.BookingId, 'id2': me.BookingTrackingId, 'languageId': user_language },
                        callback: function (records, o, success) {
                            try {
                                log('records are', records);
                                Ext.ComponentQuery.query('[itemid="CompanyId1"]')[0].setValue(records[0].data.CompanyId);
                                Ext.ComponentQuery.query('[itemid="ContactId1"]')[0].setValue(records[0].data.IndividualId);
                                Ext.ComponentQuery.query('[itemid="ContactName1"]')[0].setValue(records[0].data.IndividualName);
                                Ext.ComponentQuery.query('[itemid="CompanyName1"]')[0].setValue(records[0].data.CompanyName);
                                //me.SetCompanyContactArray(records[0].data.CompanyId, records[0].data.IndividualId, records[0].data.CompanyName, records[0].data.IndividualName, 0);
                            }
                            catch (e) { }
                        }
                    });

                    Ext.getStore('bookingwizard.BookingInvoiceSettingsOtherSectionsStore').load({
                        params: { 'id': me.BookingId, 'id2': me.BookingTrackingId, 'no': 2 },
                        callback: function (records, o, success) {
                            try {
                                Ext.ComponentQuery.query('[itemid="CompanyId2"]')[0].setValue(records[0].data.CompanyId);
                                Ext.ComponentQuery.query('[itemid="InvoiceSettingsSaveButton"]')[0].enable();
                                Ext.ComponentQuery.query('[itemid="ContactId2"]')[0].setValue(records[0].data.IndividualId);
                                Ext.ComponentQuery.query('[itemid="ContactName2"]')[0].setValue(records[0].data.IndividualName);
                                Ext.ComponentQuery.query('[itemid="CompanyName2"]')[0].setValue(records[0].data.CompanyName);
                                Ext.ComponentQuery.query('[itemid="invoicesettingslist2"]')[0].enable();
                                //me.SetCompanyContactArray(records[0].data.CompanyId, records[0].data.IndividualId, records[0].data.CompanyName, records[0].data.IndividualName, 1);
                            }
                            catch (e) { }
                        }
                    });

                    Ext.getStore('bookingwizard.BookingInvoiceSettingsOtherSectionsStore').load({
                        params: { 'id': me.BookingId, 'id2': me.BookingTrackingId, 'no': 3 },
                        callback: function (records, o, success) {
                            try {
                                Ext.ComponentQuery.query('[itemid="CompanyId3"]')[0].setValue(records[0].data.CompanyId);
                                Ext.ComponentQuery.query('[itemid="InvoiceSettingsSaveButton"]')[0].enable();
                                Ext.ComponentQuery.query('[itemid="ContactId3"]')[0].setValue(records[0].data.IndividualId);
                                Ext.ComponentQuery.query('[itemid="ContactName3"]')[0].setValue(records[0].data.IndividualName);
                                Ext.ComponentQuery.query('[itemid="CompanyName3"]')[0].setValue(records[0].data.CompanyName);
                                Ext.ComponentQuery.query('[itemid="invoicesettingslist3"]')[0].enable();
                                //me.SetCompanyContactArray(records[0].data.CompanyId, records[0].data.IndividualId, records[0].data.CompanyName, records[0].data.IndividualName, 2);
                            }
                            catch (e) { }
                        }
                    });

                    Ext.getStore('bookingwizard.BookingInvoiceSettingsStore').load({
                        params: { 'id': me.BookingId, 'id2': me.BookingTrackingId, 'languageId': user_language, 'no': 1 },
                        callback: function (records, o, success) {
                            if (records != null) {
                                var total = 0;
                                for (var i = 0; i < records.length; i++)
                                    total += records[i].data.TotalSum;
                                Ext.ComponentQuery.query('[itemid="total1"]')[0].setValue(Ext.util.Format.number(total, '0.00'));
                            }
                        }
                    });

                    Ext.getStore('bookingwizard.BookingInvoiceSettings2Store').load({
                        params: { 'id': me.BookingId, 'id2': me.BookingTrackingId, 'languageId': user_language, 'no': 2 },
                        callback: function (records, o, success) {
                            if (records != null) {
                                var total = 0;
                                for (var i = 0; i < records.length; i++)
                                    total += records[i].data.TotalSum;
                                Ext.ComponentQuery.query('[itemid="total2"]')[0].setValue(Ext.util.Format.number(total, '0.00'));
                            }
                        }
                    });

                    Ext.getStore('bookingwizard.BookingInvoiceSettings3Store').load({
                        params: { 'id': me.BookingId, 'id2': me.BookingTrackingId, 'languageId': user_language, 'no': 3 },
                        callback: function (records, o, success) {
                            if (records != null) {
                                var total = 0;
                                for (var i = 0; i < records.length; i++)
                                    total += records[i].data.TotalSum;
                                Ext.ComponentQuery.query('[itemid="total3"]')[0].setValue(Ext.util.Format.number(total, '0.00'));
                            }
                        }
                    });
                }
            },
            'invoiceaddinvoice': {
                afterrender: function () {
                    var reservationId = Ext.ComponentQuery.query('invoiceaddinvoice [itemid="reservationId"]')[0].getValue();
                    var bookingId = Ext.ComponentQuery.query('invoiceaddinvoice [itemid="bookingId"]')[0].getValue();
                    //bar store
                    var barCombo = Ext.ComponentQuery.query('[itemid="BarCombo"]')[0];
                    var barStore = Ext.getStore('operations.InhouseBarListStore');
                    barStore.load();
                    //booking store - get set
                    var referenceCombo = Ext.ComponentQuery.query('[itemid="referenceCombo"]')[0];
                    var bookingStore = Ext.getStore('bookingwizard.BookingComboStore');
                    bookingStore.load({
                        params: { 'id': reservationId },
                        callback: function (records, o, success) {
                            referenceCombo.setValue(bookingStore.getAt(0).get('BookingId'));
                        }
                    });
                    ////////
                    var itemCategoryCombo = Ext.ComponentQuery.query('[itemid="ItemCategoryCombo"]')[0];
                    var itemCategoryStore = Ext.getStore('configuration.ItemCategoryStore');
                    itemCategoryStore.load({ params: { 'limit': 100} });
                    //////
                    Ext.getStore('bookingwizard.BookingInvoiceSearchItemsStore').load({
                        params: { 'bookingId': bookingId, 'bookingTrackingId': bookingTrackingId, 'itemCategoryId': itemCategoryCombo.value, 'barId': barCombo.value, 'filterText': '', 'languageId': user_language }
                    });
                    Ext.getStore('bookingwizard.BookingInvoiceItemsStore').load({
                        params: { 'id': -1, 'id2': -1, 'languageId': user_language }
                    });
                    Ext.getStore('bookingwizard.BookingInvoiceItemsTotalStore').load();
                }
            },
            'invoiceleftitemlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'AddItemToRightGrid')
                        this.AddItemToRightGrid(zRec);
                }
            },
            'invoicerightitemlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'deleteItem')
                        this.DeleteItem(zRec);
                }
            },
            'invoicechangeinvoice': {
                afterrender: function () {
                    var bookingCreditDebitInvoiceId = Ext.ComponentQuery.query('[itemid="bookingCreditDebitInvoiceId"]')[0].getValue();
                    Ext.ComponentQuery.query('[itemid="changebookinginvoicedet"]')[0].getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/Invoice/GetCompanyInfoByBookingCreditDebitInvoiceId',
                        params: { id: bookingCreditDebitInvoiceId }
                    });
                }
            },
            'combo[action="ItemCategoryChange"]': {
                select: function (combo, records, Opts) {
                    var bookingId = Ext.ComponentQuery.query('[itemid="referenceCombo"]')[0].value;
                    var filterText = Ext.ComponentQuery.query('[itemid="filteredText"]')[0].value;
                    var barId = Ext.ComponentQuery.query('[itemid="BarCombo"]')[0].getValue();
                    Ext.getStore('bookingwizard.BookingInvoiceSearchItemsStore').load({
                        params: { 'bookingId': bookingId, 'bookingTrackingId': 0, 'itemCategoryId': combo.getValue(), 'barId': (barId == null ? 0 : barId), 'filterText': filterText == null ? '' : filterText, 'languageId': user_language }
                    });
                }
            },
            'combo[action="BarChange"]': {
                select: function (combo, records, Opts) {
                    var bookingId = Ext.ComponentQuery.query('[itemid="referenceCombo"]')[0].value;
                    var itemCatId = Ext.ComponentQuery.query('[itemid="ItemCategoryCombo"]')[0].getValue();
                    var filterText = Ext.ComponentQuery.query('[itemid="filteredText"]')[0].value;
                    var barId = Ext.ComponentQuery.query('[itemid="BarCombo"]')[0].getValue();
                    Ext.getStore('bookingwizard.BookingInvoiceSearchItemsStore').load({
                        params: { 'bookingId': bookingId, 'bookingTrackingId': 0, 'itemCategoryId': (itemCatId == null ? 0 : itemCatId), 'barId': combo.getValue(), 'filterText': filterText == null ? '' : filterText, 'languageId': user_language }
                    });
                }
            },
            'button[action="searchItemsWithFilterText"]': {
                click: function (t, e, o) {
                    var bookingId = Ext.ComponentQuery.query('[itemid="referenceCombo"]')[0].value;
                    var itemCatId = Ext.ComponentQuery.query('[itemid="ItemCategoryCombo"]')[0].getValue();
                    var filterText = Ext.ComponentQuery.query('[itemid="filteredText"]')[0].value;
                    var barId = Ext.ComponentQuery.query('[itemid="BarCombo"]')[0].getValue();

                    Ext.getStore('bookingwizard.BookingInvoiceSearchItemsStore').load({
                        params: { 'bookingId': bookingId, 'bookingTrackingId': 0, 'itemCategoryId': (itemCatId == null ? 0 : itemCatId), 'barId': (barId == null ? 0 : barId), 'filterText': filterText == null ? '' : filterText, 'languageId': user_language }
                    });
                }
            },
            'button[action="btnCompanySelect2"]': {
                click: function (t, e, o) {
                    var c = me.getController('bookingwizard.BookingCompanySearchContact');
                    if (c.thisController == false) {
                        c.init();
                        c.thisController = true;
                    }
                    //                    Ext.getStore('bookingwizard.CompanySearchListStore').proxy.setExtraParam('filter', '');
                    //                    Ext.getStore('bookingwizard.CompanySearchListStore').load();
                    Ext.create('widget.bookcompanysearchcontactlistwindow', { ItemNo: 2 }).center();
                    Ext.getStore('bookingwizard.CompanyContactListStore').removeAll();
                    me.ManageCompanyContactWindow(1);
                }
            },
            'button[action="btnCompanySelect3"]': {
                click: function (t, e, o) {
                    var c = me.getController('bookingwizard.BookingCompanySearchContact');
                    if (c.thisController == false) {
                        c.init();
                        c.thisController = true;
                    }
                    //                    Ext.getStore('bookingwizard.CompanySearchListStore').proxy.setExtraParam('filter', '');
                    //                    Ext.getStore('bookingwizard.CompanySearchListStore').load();
                    Ext.create('widget.bookcompanysearchcontactlistwindow', { ItemNo: 3 }).center();
                    Ext.getStore('bookingwizard.CompanyContactListStore').removeAll();
                    me.ManageCompanyContactWindow(2);
                }
            },
            'button[action="btnContactSelect2"]': {
                click: function (t, e, o) {//t => this, e => event, eo => Eoptional
                    var c = me.getController('bookingwizard.BookingCompanySearchContact');
                    this.FilterApplied = true;
                    if (c.thisController == false) {
                        c.init();
                        c.thisController = true;
                    }
                    //                    Ext.getStore('bookingwizard.CompanyContactListStore').proxy.setExtraParam('id', 0);
                    //                    var store = Ext.getStore('bookingwizard.CompanyContactListStore').load();
                    Ext.create('widget.bookingcontactlistwindow', { ItemNo: 2 }).center();
                    me.ManageContactWindow(1);
                }
            },
            'button[action="btnContactSelect3"]': {
                click: function (t, e, o) {//t => this, e => event, eo => Eoptional
                    var c = me.getController('bookingwizard.BookingCompanySearchContact');
                    this.FilterApplied = true;
                    if (c.companyController == false) {
                        c.init();
                        c.companyController = true;
                    }
                    //                    Ext.getStore('bookingwizard.CompanyContactListStore').proxy.setExtraParam('id', 0);
                    //                    var store = Ext.getStore('bookingwizard.CompanyContactListStore').load();
                    Ext.create('widget.bookingcontactlistwindow', { ItemNo: 3 }).center();
                    me.ManageContactWindow(2);
                }
            },
            'button[action="SaveInvoiceSettings"]': {
                click: function (t, e, o) {
                    var invoiceObj = new Object();
                    invoiceObj.BookingId = Ext.ComponentQuery.query('[itemid="ISBookingId"]')[0].value;
                    invoiceObj.BookingTrackingId = Ext.ComponentQuery.query('[itemid="ISBookingTrackingId"]')[0].value;
                    invoiceObj.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                    invoiceObj.CreatedBy = CurrentSessionUserId;
                    ////////
                    invoiceObj.CompanyId1 = Ext.ComponentQuery.query('[itemid="CompanyId1"]')[0].value;
                    invoiceObj.CompanyId2 = Ext.ComponentQuery.query('[itemid="CompanyId2"]')[0].value;
                    invoiceObj.CompanyId3 = Ext.ComponentQuery.query('[itemid="CompanyId3"]')[0].value;
                    ////////
                    invoiceObj.IndividualId1 = Ext.ComponentQuery.query('[itemid="ContactId1"]')[0].value;
                    invoiceObj.IndividualId2 = Ext.ComponentQuery.query('[itemid="ContactId2"]')[0].value;
                    invoiceObj.IndividualId3 = Ext.ComponentQuery.query('[itemid="ContactId3"]')[0].value;
                    //////////////////////////////////////////////
                    var ids = ''; var summaryRecord = null;
                    var obj = Ext.ComponentQuery.query('[itemid="invoicesettingslist"]')[0];
                    var store = obj.getStore();
                    if (store != null && store.data.items.length > 0) {
                        for (var i = 0; i < store.data.items.length; i++) {
                            summaryRecord = store.getAt(i);
                            if (summaryRecord.data.DataType == 1)
                                ids += summaryRecord.data.DetailIds;
                            //ids += summaryRecord.data.FixedPriceId + '|' + summaryRecord.data.ItemGroupId + '|' + summaryRecord.data.ItemId + ',';
                        }
                    }
                    invoiceObj.ListIds1 = ids.replace(/\,$/, '');
                    //////////////////////////////////////////////
                    ids = '';
                    obj = Ext.ComponentQuery.query('[itemid="invoicesettingslist2"]')[0];
                    store = obj.getStore();
                    if (store != null && store.data.items.length > 0) {
                        for (var i = 0; i < store.data.items.length; i++) {
                            summaryRecord = store.getAt(i);
                            if (summaryRecord.data.DataType == 1)
                                ids += summaryRecord.data.DetailIds;
                            //ids += summaryRecord.data.FixedPriceId + '|' + summaryRecord.data.ItemGroupId + '|' + summaryRecord.data.ItemId + ',';
                        }
                    }
                    invoiceObj.ListIds2 = ids.replace(/\,$/, '');
                    //////////////////////////////////////////////
                    ids = '';
                    obj = Ext.ComponentQuery.query('[itemid="invoicesettingslist3"]')[0];
                    store = obj.getStore();
                    if (store != null && store.data.items.length > 0) {
                        for (var i = 0; i < store.data.items.length; i++) {
                            summaryRecord = store.getAt(i);
                            if (summaryRecord.data.DataType == 1)
                                ids += summaryRecord.data.DetailIds;
                            //ids += summaryRecord.data.FixedPriceId + '|' + summaryRecord.data.ItemGroupId + '|' + summaryRecord.data.ItemId + ',';
                        }
                    }
                    invoiceObj.ListIds3 = ids.replace(/\,$/, '');
                    log('invoiceObj', invoiceObj);
                    //////////////////////////////////////////////
                    Ext.Ajax.request({
                        url: webAPI_path + 'api/Invoice/AddDetails',
                        type: 'POST',
                        params: invoiceObj,
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            if (r.success == true) {
                                log('succes', r.success);
                                var w = Ext.ComponentQuery.query('[itemid="invoiceSettingWindow"]')[0];
                                if (Utils.isValid(w)) {
                                    w.close();
                                }

                                var invoiceset = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="invoiceSettingStatusLabel"]')[0];
                                if ((invoiceObj.ListIds2 != '' && invoiceObj.ListIds2 != 'null') || (invoiceObj.ListIds3 != '' && invoiceObj.ListIds3 != 'null'))
                                    invoiceset.setText('Multiple'.l('SC55000'));
                                else
                                    invoiceset.setText('Single'.l('SC55000'));

                                //load STEP 5 grid again
                                var store = Ext.getStore('bookingwizard.BookingItemsListStepFiveStore');
                                var panelDetails = Ext.ComponentQuery.query('panel[itemid="meetingdetailstable"]')[0];
                                store.proxy.setExtraParam('id', user_language);
                                store.proxy.setExtraParam('id1', me.BookingId);
                                store.proxy.setExtraParam('id2', me.BookingTrackingId);
                                store.load({
                                    callback: function (records, o, success) {
                                        panelDetails.reconfigure(store);
                                    }
                                });
                            }
                        },
                        failure: function (form, response) {
                            r = response.result;
                            if (r.success == false) {
                                //Ext.Msg.alert('Error'.l('g'), r.result);
                                log('succes', r.success);
                                var w = Ext.ComponentQuery.query('[itemid="invoiceSettingWindow"]')[0];
                                if (Utils.isValid(w)) {
                                    w.close();
                                }
                            }
                            else {
                                display_alert('MG51011');
                                //Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                            }
                        }
                    });
                }
            },
            'button[action="SaveBookingCreditDebitInvoice"]': {
                click: function (t, e, o) {
                    var invoiceObj = new Object();
                    invoiceObj.BookingId = Ext.ComponentQuery.query('[itemid="referenceCombo"]')[0].value;

                    if (invoiceObj.BookingId == null || invoiceObj.BookingId == 0) {
                        display_alert('MG51010');
                      //  Ext.Msg.alert('Error'.l('g'), 'Please select any booking.'.l('g'));
                        return;
                    }

                    invoiceObj.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                    invoiceObj.CreatedBy = CurrentSessionUserId;
                    //////////////////////////////////////////////
                    var ids = ''; var summaryRecord = null;
                    var itemList = new Array(); var item = new Object();
                    var obj = Ext.ComponentQuery.query('[itemid="invoicerightitemlist"]')[0];
                    var store = obj.getStore();

                    if (store != null && store.data.items.length > 0) {
                        for (var i = 0; i < store.data.items.length; i++) {
                            summaryRecord = store.getAt(i);
                            if (summaryRecord.data.Reduction != -1) {
                                item = new Object();
                                item.ItemId = summaryRecord.data.ItemId;
                                item.Price = summaryRecord.data.Price;
                                item.Quantity = summaryRecord.data.Quantity;
                                //item.DiscountValue = summaryRecord.data.Reduction * summaryRecord.data.Quantity * summaryRecord.data.Price / 100;
                                item.DiscountValue = summaryRecord.data.Reduction * summaryRecord.data.Price / 100;
                                item.VatValue = summaryRecord.data.Vat;
                                //item.VatValue = summaryRecord.data.Quantity * summaryRecord.data.Vat;
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
                    ///////////////
                    var finalItemList = new Array(), j = 0;
                    if (itemList != null && itemList.length > 0) {
                        for (var i = 0; i < itemList.length; i++) {
                            if (itemList[i] == null)
                                continue;
                            else {
                                finalItemList[j] = itemList[i];
                                j++;
                            }
                        }
                    }
                    invoiceObj.ItemsList = Ext.encode(finalItemList);
                    //////////////////////////////////////////////
                    var createBtn = Ext.ComponentQuery.query('invoiceaddinvoice [action="SaveBookingCreditDebitInvoice"]')[0];
                    if (createBtn != undefined && createBtn != null)
                        createBtn.disable();
                    //////////////////////////////////////////////
                    Ext.Ajax.request({
                        url: webAPI_path + 'api/Invoice/ManageBookingCreditDebitInvoice',
                        type: 'POST',
                        params: invoiceObj,
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    try {
                                        var reservationId = Ext.ComponentQuery.query('invoiceaddinvoice [itemid="reservationId"]')[0].getValue();
                                        Ext.getStore('bookingwizard.RightSide.BookingInvoiceStore').load({
                                            params: { 'id': reservationId }
                                        });

                                        win.close();
                                    } catch (e) {
                                        if (createBtn != undefined && createBtn != null)
                                            createBtn.enable();
                                    }
                                }
                            }
                            else {
                                if (createBtn != undefined && createBtn != null)
                                    createBtn.enable();

                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function (form, response) {
                            if (createBtn != undefined && createBtn != null)
                                createBtn.enable();

                            r = response.result;
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == false) {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                            else {
                                display_alert('MG51011');
                               // Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                            }
                        }
                    });
                }
            },
            'button[action="saveCompanyAddressInvoiceHeader"]': {
                click: function () {
                    var Form = Ext.ComponentQuery.query('[itemid="changebookinginvoicedet"]')[0].getForm();
                    if (Form.isValid()) {
                        var Pincode = Form.findField('CompanyPincode').getValue();
                        var CountryId = Form.findField('CompanyCountryId').getValue();
                        if (!Utils.ValidatePostCodeFormate(CountryId, Pincode)) {
                            return false;
                        }
                        var invoiceObj = new Object();
                        invoiceObj.BookingCreditDebitInvoiceId = Ext.ComponentQuery.query('[itemid="bookingCreditDebitInvoiceId"]')[0].value;
                        invoiceObj.CompanyName = Ext.ComponentQuery.query('[itemid="companyName"]')[0].value;
                        invoiceObj.CompanyAddress = Ext.ComponentQuery.query('[itemid="companyAddress"]')[0].value;
                        invoiceObj.CompanyPincode = Ext.ComponentQuery.query('[itemid="companyPincode"]')[0].value;
                        invoiceObj.CompanyCity = Ext.ComponentQuery.query('[itemid="companyCity"]')[0].value;
                        invoiceObj.CompanyCountryId = Ext.ComponentQuery.query('[itemid="companyCountryId"]')[0].value;
                        invoiceObj.PurchaseOrderNumber = Ext.ComponentQuery.query('[itemid="purchaseOrderNumber"]')[0].value;
                        invoiceObj.UpdatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                        invoiceObj.UpdatedBy = CurrentSessionUserId;
                        //////////////////////////////////////////////
                        Ext.Ajax.request({
                            url: webAPI_path + 'api/Invoice/ManageBookingCreditDebitInvoiceHeader',
                            type: 'POST',
                            params: invoiceObj,
                            success: function (response) {
                                var r = Ext.decode(response.responseText);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == true) {
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        win.close();
                                    }
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
                                    display_alert('MG51011');
                                  //  Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                }
                            }
                        });
                    }
                }
            }
            //////////////////
        })
    },
    DownloadInvoiceItem: function (id) {
        Ext.Ajax.request({
            url: webAPI_path + 'api/Invoice/DownloadInvoice',
            type: 'POST',
            params: { BookingCreditDebitInvoiceId: id },
            success: function (response) {
                var r = Ext.decode(response.responseText);
                var ResultText = r.result;
                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                    ResultText = ResultText.l("SP_DynamicCode");
                if (r.success == true) {
                    var win = Ext.WindowManager.getActive();
                    if (win) {
                        win.close();
                    }
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
                    display_alert('MG51011');
                    //Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                }
            }
        });
    },
    AddItemToRightGrid: function (r) {
        var obj = Ext.ComponentQuery.query('[itemid="invoicerightitemlist"]')[0];
        var store = obj.getStore();
        var index = store.findExact('ItemId', r.data.ItemId);
        var exStore = store.getAt(index);

        if (exStore == null) {
            store.add({
                ItemId: r.data.ItemId,
                ItemName: r.data.ItemName,
                Price: r.data.NetPrice,
                Quantity: 1,
                Reduction: 0,
                Total: r.data.NetPrice,
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
            store.commitChanges();
            store.loadData(store.data.items);
            //update total store    
            this.UpdateTotalStore(store);
        }
    },
    DeleteItem: function (r) {
        var obj = Ext.ComponentQuery.query('invoiceaddinvoice [itemid="invoicerightitemlist"]')[0];
        var store = obj.getStore();

        var index = store.findExact('SortOrder', r.data.SortOrder);
        store.removeAt(index);

        if (r.data.SortOrder == r.data.ItemId) {
            index = store.findExact('ItemId', r.data.ItemId);
            store.removeAt(index);
        } else {
            index = store.findExact('ItemId', r.data.ItemId);
            store.data.items[index].data.Reduction = 0;
            store.commitChanges();
            store.loadData(store.data.items);
        }

        store.commitChanges();
        store.loadData(store.data.items);
        this.UpdateTotalStore(store);
    },
    UpdateTotalStore: function (store) {
        var totalGrid = Ext.ComponentQuery.query('invoiceaddinvoice [itemid="invoiceTotalGrid"]')[0];
        var totalStore = totalGrid.getStore();
        var total = 0, totalVat = 0, finalVat = 0;

        if (store.data.items.length > 0) {
            for (var j = 1; j < totalStore.data.items.length - 1; j++) {
                totalVat = 0;
                for (var i = 0; i < store.data.items.length; i++) {
                    if (j == 1) total += store.data.items[i].data.Total;

                    if (store.data.items[i].data.VatRateBreakDownId == totalStore.data.items[j].data.Id) {
                        totalVat += store.data.items[i].data.Vat * store.data.items[i].data.Quantity;
                    }

                    finalVat += totalVat;
                }
                totalStore.data.items[j].data.Value = totalVat;
            }

            totalStore.data.items[0].data.Value = total;
            totalStore.data.items[totalStore.data.items.length - 1].data.Value = total + finalVat;

            totalStore.commitChanges();
            totalStore.loadData(totalStore.data.items);
        } else {
            Ext.getStore('bookingwizard.BookingInvoiceItemsTotalStore').load();
        }
    },
    SetCompanyContactArray: function (companyId, indivId, companyName, indivName, index) {
        if (this.companyContactArr[index] == undefined || this.companyContactArr[index] != null) {
            this.companyContactArr[index].CompanyId = companyId;
            this.companyContactArr[index].IndividualId = indivId;
            this.companyContactArr[index].CompanyName = companyName;
            this.companyContactArr[index].IndividualName = indivName;
        }
    },
    ManageCompanyContactWindow: function (index) {
        this.SetFilterTextbox(index);

        Utils.MangageCompanyContact(1, this.companyContactArr[index].CompanyId, this.companyContactArr[index].CompanyName,
                this.companyContactArr[index].IndividualId, this.companyContactArr[index].IndividualName);
    },
    ManageContactWindow: function (index) {
        this.SetFilterTextbox(index);

        Utils.ManageContact(1, 0, '', this.companyContactArr[index].IndividualId, this.companyContactArr[index].IndividualName);
    },
    SetFilterTextbox: function (index) {
        if (index == 1) {
            this.SetCompanyContactArray(Ext.ComponentQuery.query('[itemid="CompanyId2"]')[0].value, Ext.ComponentQuery.query('[itemid="ContactId2"]')[0].value,
                    Ext.ComponentQuery.query('[itemid="CompanyName2"]')[0].value, Ext.ComponentQuery.query('[itemid="ContactName2"]')[0].value, index);
        }
        else {
            this.SetCompanyContactArray(Ext.ComponentQuery.query('[itemid="CompanyId3"]')[0].value, Ext.ComponentQuery.query('[itemid="ContactId3"]')[0].value,
                    Ext.ComponentQuery.query('[itemid="CompanyName3"]')[0].value, Ext.ComponentQuery.query('[itemid="ContactName3"]')[0].value, index);
        }

        var formType = Ext.ComponentQuery.query('bookcompanysearchcontactlistwindow [itemid="FormType"]')[0];
        if (formType == undefined || formType == null)
            formType = Ext.ComponentQuery.query('bookingcontactlistwindow [itemid="FormType"]')[0];
        formType.setValue(11);

        var filterCompanyNameObj = Ext.ComponentQuery.query('textfield[itemid="fieldFilterCompanies"]');
        var filterCompanyName = ((filterCompanyNameObj.length > 0) ? filterCompanyNameObj[0] : null);
        if (filterCompanyName != null) {
            filterCompanyName.setValue(this.companyContactArr[index].CompanyName);

            if (filterCompanyName.value == undefined || filterCompanyName.value == null || filterCompanyName.value == '') {
                var fieldFilterIndividualObj1 = Ext.ComponentQuery.query('bookingcompanycontactlist textfield[itemid="fieldFilterIndividual"]');
                fieldFilterIndividualObj1 = ((fieldFilterIndividualObj1.length > 0) ? fieldFilterIndividualObj1[0] : null);
                fieldFilterIndividualObj1.setValue("");
                return;
            }            
        }

        var fieldFilterIndividualObj = Ext.ComponentQuery.query('bookingcompanycontactlist textfield[itemid="fieldFilterIndividual"]');
        var fieldFilterIndividual = ((fieldFilterIndividualObj.length > 0) ? fieldFilterIndividualObj[0] : null);

        if (fieldFilterIndividual == null) {
            fieldFilterIndividualObj = Ext.ComponentQuery.query('bookingcompanysearchcontactlist textfield[itemid="fieldFilterIndividual"]');
            fieldFilterIndividual = ((fieldFilterIndividualObj.length > 0) ? fieldFilterIndividualObj[0] : null);
        }

        if (fieldFilterIndividual != null)
            fieldFilterIndividual.setValue(this.companyContactArr[index].IndividualName);
    }
});