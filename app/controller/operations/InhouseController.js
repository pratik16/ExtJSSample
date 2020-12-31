Ext.define('Regardz.controller.operations.InhouseController', {
    extend: 'Ext.app.Controller',
    views: ['operations.Inhouse', 'operations.windows.inhouse.InternalRemarkWindow', 'operations.windows.inhouse.BookingViewWindow', 'operations.windows.inhouse.AddItemsWindow',
    'operations.windows.inhouse.LocationSalesWindow', 'operations.windows.inhouse.CheckInWindow', 'operations.windows.inhouse.CheckOutWindow',
    'operations.DayClosure', 'operations.windows.inhouse.DirectPaymentWindow', 'bookingwizard.RightSide.BookingInformation'],
    stores: ['property.PropertyListStore', 'operations.OperationsInhouseEventsListStore', 'operations.OperationsInhouseBookingChanges',
    'operations.InhouseBookingEventsListStore', 'configuration.ItemCategoryStore', 'operations.InhouseBarListStore', 'operations.InhouseItemsList',
    'operations.InhouseCheckInOutStore', 'operations.OperationsDayClosureStore', 'property.PropertyListByUserIdStore', 'property.CashRegisterStore',
    'mastervalues.CcardTypeStore', 'operations.InhouseDirectPaymentDetails', 'operations.OperationsBookingEventItemStore'],
    thisController: false,
    //    refs: [{
    //        ref: 'editevent',
    //        selector: 'editevent'
    //    }],
    init: function () {
        //this.loadProperties();
        var me = this;
        this.control(
        {
            /* Cell click action on inhouse big panel */
            'inhouse [itemid="inhouseGrid"]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var currentBookingId = iRecord.get('BookingId');
                    var IsPaymentDisable = iRecord.get('IsDisable');
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    switch (fieldName) {
                        case 'checkout': // Check out                            
                            Utils.ShowWindow('widget.inhousecheckoutwindow', { BookingId: currentBookingId });
                            break;
                        case 'internalremark': // internal remark                        
                            Utils.ShowWindow('widget.inhouseinternalremark', {
                                BookingId: currentBookingId, CustomerRemark: iRecord.get('CustomerRemark'),
                                InvoiceDetails: iRecord.get('IsInvoicedetailsIssue'), Discussion: iRecord.get('IsDiscussion')
                            });
                            break;
                        case 'nopayment': // No payment reguired                        
                            log('Current index clicked ', iColIdx + ' No payment reguired ');
                            if (!IsPaymentDisable) {
                                var combo = Ext.ComponentQuery.query('inhouse combo[itemid="inhouseProperty"]')[0];
                                Utils.ShowWindow('widget.directpaymentwindow', { BookingId: currentBookingId, PropertyId: combo.value });
                            }
                            break;
                        case 'checkin': // Check-in     
                            Ext.data.JsonP.request({
                                url: webAPI_path + 'api/Booking/CheckForDownPayment',
                                type: 'GET',
                                params: {
                                    id: currentBookingId
                                },
                                success: function (r) {
                                    if (r.success == true) {
                                        Utils.ShowWindow('widget.inhousecheckinwindow', { BookingId: currentBookingId });
                                    }
                                    else {
                                        var combo = Ext.ComponentQuery.query('inhouse combo[itemid="inhouseProperty"]')[0];
                                        Utils.ShowWindow('widget.directpaymentwindow', { BookingId: currentBookingId, PropertyId: combo.value });
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
                                }
                            });
                            //Utils.ShowWindow('widget.inhousecheckinwindow', { BookingId: currentBookingId });
                            break;
                        case 'items': // Add items                                 
                            Utils.ShowWindow('widget.inhouseadditemswindow', { BookingId: currentBookingId, BarId: iRecord.get('BarId') });
                            this.DisableChangeOnLocation(iRecord.get('ExtraOptionsOnLocation'));
                            break;
                        case 'wizard': // Wizard
                            var wizObj = new Object();
                            wizObj.moduleName = 'WIZA001';
                            if (!Utils.ValidateUserAccess(wizObj)) {
                                Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'));
                            }
                            else {
                                this.OpenBookingWizard(me, iRecord.data);
                            }
                            break;
                        case 'view': // Booking View                        
                            Utils.ShowWindow('widget.inhousebookingview', { BookingId: currentBookingId, ReservationId: iRecord.get('ReservationId') });
                            var res = Utils.LoadBookingInformationForRightPane(currentBookingId, 0, user_language, 1, iRecord.get('ReservationId')); //paramType=1 for BookingView in popup
                            break;
                        default:
                    }

                },
                afterrender: function () {
                    this.reloadGrid();
                }
            },
            'dayclosure [itemid="dayclosureGrid"]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var currentBookingId = iRecord.get('BookingId');
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var rec = iView.getRecord(iRowEl);

                    switch (fieldName) {
                        case 'checkout': // Check out                            
                            Utils.ShowWindow('widget.inhousecheckoutwindow', { BookingId: currentBookingId });
                            break;
                        case 'internalremark': // internal remark                        
                            Utils.ShowWindow('widget.inhouseinternalremark', {
                                BookingId: currentBookingId, CustomerRemark: iRecord.get('CustomerRemark'),
                                InvoiceDetails: iRecord.get('IsInvoicedetailsIssue'), Discussion: iRecord.get('IsDiscussion')
                            });
                            break;
                        case 'nopayment': // No payment reguired                        
                            log('Current index clicked ', iColIdx + ' No payment reguired ');
                            break;
                        case 'checkin': // Check-in                        
                            Utils.ShowWindow('widget.inhousecheckinwindow', { BookingId: currentBookingId });
                            break;
                        case 'items': // Add items 
                            Utils.ShowWindow('widget.inhouseadditemswindow', { BookingId: currentBookingId, BarId: iRecord.get('BarId') });
                            this.DisableChangeOnLocation(iRecord.get('ExtraOptionsOnLocation'));
                            break;
                        case 'wizard': // Wizard                        
                            var wizObj = new Object();
                            wizObj.moduleName = 'WIZA001';
                            if (!Utils.ValidateUserAccess(wizObj)) {
                                Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'));
                            }
                            else {
                                this.OpenBookingWizard(me, iRecord.data);
                            }
                            break;
                        case 'view': // Booking View                        
                            Utils.ShowWindow('widget.inhousebookingview', { BookingId: currentBookingId, ReservationId: iRecord.get('ReservationId') });
                            var res = Utils.LoadBookingInformationForRightPane(currentBookingId, 0, user_language, 1, iRecord.get('ReservationId')); //paramType=1 for BookingView in popup
                            break;
                        case 'readyinvoice':
                            if (rec.data.InternalStatus == "Ok")
                                this.readytoinvoice(rec);
                            break;

                        default:
                    }
                }
            },
            'radiogroup [action="paymenttypeChange1"]': {
                change: function (a, newValue, oldValue, eOpts) {
                    if (newValue) {
                        Ext.ComponentQuery.query('[itemid="paymentProofSection"]')[0].enable();
                        Ext.ComponentQuery.query('[itemid="downPaymentSection"]')[0].disable();
                        Ext.ComponentQuery.query('[itemid="fullPaymentSection"]')[0].disable();
                    }
                }
            },
            'radiogroup [action="paymenttypeChange2"]': {
                change: function (a, newValue, oldValue, eOpts) {
                    if (newValue) {
                        Ext.ComponentQuery.query('[itemid="paymentProofSection"]')[0].disable();
                        Ext.ComponentQuery.query('[itemid="downPaymentSection"]')[0].enable();
                        Ext.ComponentQuery.query('[itemid="fullPaymentSection"]')[0].disable();
                    }
                }
            },
            'radiogroup [action="paymenttypeChange3"]': {
                change: function (a, newValue, oldValue, eOpts) {
                    if (newValue) {
                        Ext.ComponentQuery.query('[itemid="paymentProofSection"]')[0].disable();
                        Ext.ComponentQuery.query('[itemid="downPaymentSection"]')[0].disable();
                        Ext.ComponentQuery.query('[itemid="fullPaymentSection"]')[0].enable();
                    }
                }
            },
            '[itemid="inhouseCheckInGrid"]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    if (iColIdx == 4) {
                        if (!Utils.isValid(iRecord.get('CheckInDateTime'))) {
                            //Go to server and update
                            var bookingEventId = iRecord.get('BookingEventId');
                            this.CheckInOrOut(me, bookingEventId, true);
                        }
                    }
                },
                afterrender: function () {
                    this.LoadCheckInOutStore(true);
                }
            },
            '[itemid="inhouseCheckOutGrid"]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    if (iColIdx == 4) {
                        if (!Utils.isValid(iRecord.get('CheckOutDateTime'))) {
                            //Go to server and update
                            var bookingEventId = iRecord.get('BookingEventId');
                            var urlItem = webAPI_path + 'api/InHouse/UpdateCheckInOut';
                            this.CheckInOrOut(me, bookingEventId, false);
                        }
                    }
                },
                afterrender: function () {
                    this.LoadCheckInOutStore(false);
                }
            },
            '[itemid="inhouseBookingStatusGrid"]': {
                afterrender: function () {
                    this.loadBookingStatusChangesStore();
                }
            },
            /* Change actions from top filters */
            'inhouse [itemid="inhouseProperty"]': {
                change: function (c, newValue, oldValue, eOpts) {
                    this.reloadGrid();
                }
            },
            'inhouse [itemid="inhouseDateField"]': {
                change: function (c, newValue, oldValue, eOpts) {
                    this.reloadGrid();
                }
            },
            'inhouse [itemid="inhouseFilterText"]': {
                blur: function (c, newValue, oldValue, eOpts) { // Focus out
                    this.reloadGrid();
                }
            },
            /* EOF Change actions */
            /*Not used*/
            //            'button[action="inhouseOpenLocationSales"]': {
            //                click: function () {
            //                    Utils.ShowWindow('widget.inhouselocationsales', { BookingId: Ext.ComponentQuery.query('[itemid="inhouseCurrentBookingId"]')[0].getValue() });
            //                }
            //            },
            'inhouseadditemswindow [itemid="inhouseitemcategorycombo"]': {
                select: function (combo, newValue, oldValue) {
                    me.loadItemsStore();
                }
            },
            'inhouseadditemswindow [itemid="inhouseEventsCombo"]': {
                select: function (combo, newValue, oldValue) {
                    me.loadItemsStore();
                }
            },
            'inhouseadditemswindow [itemid="inhouseBarCombo"]': {
                select: function (combo, newValue, oldValue) {
                    me.loadItemsStore();
                }
            },
            'inhouseadditemswindow [itemid="inhouseItemFilterText"]': {
                change: function (el, newValue, oldValue, eOpts) {
                    me.loadItemsStore();
                }
            },
            'inhouseadditemswindow [itemid="inhouseSearchAction"]': {
                click: function () {
                    me.loadItemsStore();
                }
            },
            'inhouseadditemswindow button[action="inhouseAddItems"]': {
                click: function () {
                    this.AddItems();
                    //Reload InHouse
                    var grid = Ext.ComponentQuery.query('dayclosure grid[itemid="dayclosureGrid"]')[0];
                    if (grid == undefined || grid == null) {
                        this.reloadGrid();
                    } else {
                        //Reload DayClosure
                        grid.getStore().reload();
                    }
                }
            },
            'inhouseadditemswindow button[action="inhouseAddItemsCancel"]': {
                click: function () {
                    //this.reloadGrid();
                    var win = Ext.WindowManager.getActive();
                    if (win) {
                        win.destroy();
                    }
                }
            },
            'inhouseadditemswindow [itemid="inhouseItemsGrid"]': {
                beforeedit: function (editor, e, eOpts) {
                    var itemId = e.record.data.ItemId;
                    var price = e.record.data.Price;

                    var isItemGroup = e.record.data.IsItemGroup;
                    if (itemId != null && itemId > 0 && price == 0 && !isItemGroup)
                        editor.grid.columns[2].getEditor(e.record, e).setDisabled(false);
                    else
                        editor.grid.columns[2].getEditor(e.record, e).setDisabled(true);

                    return true;
                },
                edit: function (editor, e) {
                    //Update quantity in store
                    //var price = e.record.data.Price;
                    var store = Ext.getStore('operations.InhouseItemsList');
                    var rowItemIndex = store.findExact('ItemId', Number(e.record.get('ItemId')));

                    if (rowItemIndex > -1) {
                        var el = store.getAt(rowItemIndex).data;
                        el.Quantity = e.record.get('Quantity');
                        var totalPrice = Number(e.record.get('Quantity')) * Number(e.record.get('Price'));
                        el.TotalPrice = totalPrice;
                    }
                    //Commit change in grid
                    e.record.commit();
                },
                afterrender: function () {
                    //me.loadItemsStore();
                    this.loadBookingEventsStore(me);
                }
            },
            'inhouseadditemswindow combo[action="itemCatChangeAddItems"]': {
                select: function (combo, newValue, oldValue) {
                    me.loadItemsStore();
                }
            },
            'inhouseadditemswindow combo[action="barChangeAddItems"]': {
                select: function (combo, newValue, oldValue) {
                    me.loadItemsStore();
                }
            },
            'inhouseinternalremark button[action="inhouseSaveInternalRemark"]': {
                click: function () {
                    this.AddRemark(me);
                }
            },
            'inhouselocationsales button[action="inhouseSalesSave"]': {
                click: function () {
                    this.SetSalesOnLocation(me);
                }
            },
            'dayclosure': {
                afterrender: function () {
                    var combo = Ext.ComponentQuery.query('dayclosure combo[itemid="dayclosureProperty"]')[0];
                    combo.getStore().proxy.setExtraParam('activityCode', 'OPER006');
                    combo.getStore().load({
                        callback: function (records, o, success) {
                            combo.setValue(records[0].data.PropertyId);

                            var propertyId = Ext.ComponentQuery.query('dayclosure combo[itemid="dayclosureProperty"]')[0].getValue();
                            var currentDate = new Date();
                            var grid = Ext.ComponentQuery.query('dayclosure grid[itemid="dayclosureGrid"]')[0];
                            //  grid.getStore().proxy.setExtraParam('id', propertyId);
                            grid.getStore().proxy.setExtraParam('id', propertyId);
                            grid.getStore().proxy.setExtraParam('id1', user_language);
                            grid.getStore().proxy.setExtraParam('id2', Ext.Date.format(currentDate, 'Y-m-d'));
                            grid.getStore().proxy.setExtraParam('id3', null);
                            grid.getStore().load();

                        }
                    });

                }
            },
            'inhouse': {
                afterrender: function () {
                    var combo = Ext.ComponentQuery.query('inhouse combo[itemid="inhouseProperty"]')[0];
                    combo.getStore().proxy.setExtraParam('activityCode', 'OPER003');
                    combo.getStore().load();
                    var store = Ext.getStore('operations.OperationsInhouseEventsListStore');
                    var property = Ext.ComponentQuery.query('[itemid="inhouseProperty"]')[0];

                    if (store != null && store != undefined && store.data.items.length > 0 && property.getValue() > 0) {

                        var date = Ext.ComponentQuery.query('[itemid="inhouseDateField"]')[0];
                        var filterText = Ext.ComponentQuery.query('[itemid="inhouseFilterText"]')[0];
                        store.proxy.setExtraParam('id', property.getValue());
                        store.proxy.setExtraParam('id1', user_language);
                        store.proxy.setExtraParam('id2', date.getValue());
                        store.proxy.setExtraParam('id3', filterText.getValue());
                        store.reload();
                    }
                    else {
                        store.removeAll();
                    }


                }
            },
            //Payment Proof => Process button
            'directpaymentwindow button[action="afasPaymentProof"]': {
                click: function () {
                    var paymentObj = new Object();
                    paymentObj.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                    paymentObj.CreatedBy = CurrentSessionUserId;
                    paymentObj.BookingId = Ext.ComponentQuery.query('[itemid="directPaymentBookingId"]')[0].getValue();

                    var amount = Ext.ComponentQuery.query('[itemid="amountPF"]')[0].getValue();
                    if (amount == null || amount == undefined || amount == '') {
                        Ext.Msg.alert('Error'.l('g'), "Please enter amount".l('SC71500'));
                        return;
                    }
                    paymentObj.BookingAmount = amount;
                    var combo = Ext.ComponentQuery.query('inhouse combo[itemid="inhouseProperty"]')[0];
                    paymentObj.PropertyId = combo.value;
                    //////////////////////////////////////////////
                    Ext.ComponentQuery.query('[itemid="paymentProofSection"]')[0].disable();

                    Ext.Ajax.request({
                        url: webAPI_path + 'api/Booking/AFASPaymentProof',
                        type: 'POST',
                        timeout: 180000,
                        params: paymentObj,
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                //                                var win = Ext.WindowManager.getActive();
                                //                                if (win) win.close();
                                me.loadDirectPayment();
                                Ext.ComponentQuery.query('[itemid="amountPF"]')[0].setValue("");

                                Ext.Msg.alert('Message'.l('g'), 'Process successed'.l('g'));
                                Ext.ComponentQuery.query('[itemid="paymentProofSection"]')[0].enable();
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                                Ext.ComponentQuery.query('[itemid="paymentProofSection"]')[0].enable();
                            }
                        },
                        failure: function (form, response) {
                            r = response.result;
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == false) {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                                Ext.ComponentQuery.query('[itemid="paymentProofSection"]')[0].enable();
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                Ext.ComponentQuery.query('[itemid="paymentProofSection"]')[0].enable();
                            }
                        }
                    });
                }
            },
            //Downpayment => Generate button (Proforma Invoice)
            'directpaymentwindow button[action="afasDownPaymentGenerate"]': {
                click: function () {
                    var paymentObj = new Object();
                    paymentObj.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                    paymentObj.CreatedBy = CurrentSessionUserId;
                    paymentObj.BookingId = Ext.ComponentQuery.query('[itemid="directPaymentBookingId"]')[0].getValue();

                    var regItem = Ext.ComponentQuery.query('[itemid="CashRegisterComboDP"]')[0].getValue();
                    if (regItem == null || regItem == undefined || regItem == '') {
                        Ext.Msg.alert('Error'.l('g'), "Please select Cash Register".l('SC71500'));
                        return;
                    }
                    paymentObj.CashRegisterId = regItem;

                    var DPamount = Ext.ComponentQuery.query('directpaymentwindow [itemid="downPaymentOpenDP"]')[0].value;

                    if (DPamount == null || DPamount == undefined || DPamount == '') {
                        Ext.Msg.alert('Error'.l('g'), "Please enter amount".l('SC71500'));
                        return;
                    }
                    else {
                        //paymentObj.PaymentMethodId = 1;
                        //paymentObj.BookingAmount = DPamount;

                        var panel = Ext.ComponentQuery.query('directpaymentwindow [itemid="PaymentMethodFormDP"]')[0];

                        if (panel != null && panel.items.length > 0) {
                            var amount; var isValidAmount = false;
                            for (var i = 0; i < panel.items.length; i++) {
                                if (panel.items.items[i].items.items[0].checked) {
                                    isValidAmount = true;
                                    //amount = parseFloat(amount);
                                    paymentObj.PaymentMethodId = panel.items.items[i].items.items[0].inputValue;
                                    paymentObj.BookingAmount = DPamount;
                                }
                            }
                            if (!isValidAmount) {
                                Ext.Msg.alert('Error'.l('g'), "Please select payment method".l('SC71500'));
                                return;
                            }
                        }
                    }


                    var combo = Ext.ComponentQuery.query('inhouse combo[itemid="inhouseProperty"]')[0];
                    paymentObj.PropertyId = combo.value;
                    //////////////////////////////////////////////
                    Ext.ComponentQuery.query('[itemid="downPaymentSection"]')[0].disable();
                    Ext.Ajax.request({
                        url: webAPI_path + 'api/Booking/AFASDownPaymentProformaInvoice',
                        type: 'POST',
                        timeout: 180000,
                        params: paymentObj,
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                //                                var win = Ext.WindowManager.getActive();
                                //                                if (win) win.close();

                                window.open(ResultText);
                                me.loadDirectPayment();
                                Ext.ComponentQuery.query('[itemid="downPaymentSection"]')[0].enable();
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                                Ext.ComponentQuery.query('[itemid="downPaymentSection"]')[0].enable();
                            }
                        },
                        failure: function (form, response) {
                            r = response.result;
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == false) {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                                Ext.ComponentQuery.query('[itemid="downPaymentSection"]')[0].enable();
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                Ext.ComponentQuery.query('[itemid="downPaymentSection"]')[0].enable();
                            }
                        }
                    });
                }
            },
            //Full payment => Generate button (Proforma Invoice)
            'directpaymentwindow button[action="afasFullPaymentPIGenerate"]': {
                click: function () {
                    var paymentObj = new Object();
                    paymentObj.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                    paymentObj.CreatedBy = CurrentSessionUserId;
                    paymentObj.BookingId = Ext.ComponentQuery.query('[itemid="directPaymentBookingId"]')[0].getValue();
                    var combo = Ext.ComponentQuery.query('inhouse combo[itemid="inhouseProperty"]')[0];
                    paymentObj.PropertyId = combo.value;
                    //////////////////////////////////////////////
                    Ext.Ajax.request({
                        url: webAPI_path + 'api/Booking/AFASFullPaymentProformaInvoice',
                        type: 'POST',
                        timeout: 180000,
                        params: paymentObj,
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                //                                var win = Ext.WindowManager.getActive();
                                //                                if (win) win.close();
                                window.open(ResultText);
                                me.loadDirectPayment();
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
            },
            //Full payment => Generate button (Invoice)
            'directpaymentwindow button[action="afasFullPaymentGenerate"]': {
                click: function () {
                    var paymentObj = new Object();
                    paymentObj.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                    paymentObj.CreatedBy = CurrentSessionUserId;
                    paymentObj.BookingId = Ext.ComponentQuery.query('[itemid="directPaymentBookingId"]')[0].getValue();

                    var regItem = Ext.ComponentQuery.query('[itemid="CashRegisterComboFP"]')[0].getValue();
                    if (regItem == null || regItem == undefined || regItem == '') {
                        Ext.Msg.alert('Error'.l('g'), "Please select Cash Register".l('SC71500'));
                        return;
                    }
                    paymentObj.CashRegisterId = regItem;
                    var FDPamount = Ext.ComponentQuery.query('directpaymentwindow [itemid="downPaymentOpenFDP"]')[0].value;
                    var TBamount = Ext.ComponentQuery.query('directpaymentwindow [itemid="totalBookingAmFP"]')[0].value;
                    paymentObj.TotalBookingValue = TBamount;
                    if (FDPamount == null || FDPamount == undefined || FDPamount == '') {
                        Ext.Msg.alert('Error'.l('g'), "Please enter amount".l('SC71500'));
                        return;
                    }
                    else {
                        //paymentObj.PaymentMethodId = 1;
                        //paymentObj.BookingAmount = FDPamount;

                        var panel = Ext.ComponentQuery.query('directpaymentwindow [itemid="PaymentMethodFormFP"]')[0];
                        if (panel != null && panel.items.length > 0) {
                            var amount; var isValidAmount = false;
                            for (var i = 0; i < panel.items.length; i++) {
                                if (panel.items.items[i].items.items[0].checked) {
                                    isValidAmount = true;
                                    //amount = panel.items.items[i].items.items[1].value;
                                    //amount = parseFloat(amount);
                                    paymentObj.PaymentMethodId = panel.items.items[i].items.items[0].inputValue;
                                    paymentObj.BookingAmount = FDPamount;
                                }
                            }
                            if (!isValidAmount) {
                                Ext.Msg.alert('Error'.l('g'), "Please select payment method".l('SC71500'));
                                return;
                            }
                        }
                    }
                    var combo = Ext.ComponentQuery.query('inhouse combo[itemid="inhouseProperty"]')[0];
                    paymentObj.PropertyId = combo.value;

                    //////////////////////////////////////////////
                    Ext.ComponentQuery.query('[itemid="fullPaymentSection"]')[0].disable();
                    Ext.Ajax.request({
                        url: webAPI_path + 'api/Booking/AFASFullPaymentInvoice',
                        type: 'POST',
                        timeout: 180000,
                        params: paymentObj,
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                //                                var win = Ext.WindowManager.getActive();
                                //                                if (win) win.close();
                                window.open(ResultText);
                                me.loadDirectPayment();
                                Ext.ComponentQuery.query('[itemid="paymenttypeChange1"]')[0].setValue(true);
                                //Ext.getDom('paymenttypeChange1').checked = true; itemid
                                //var win = Ext.WindowManager.getActive();
                                //if (win) win.close();
                                //Ext.ComponentQuery.query('[itemid="fullPaymentSection"]')[0].enable();
                                //                                                                Ext.Ajax.request({
                                //                                                                    url: webAPI_path + 'api/Booking/AFASFullPaymentInvoiceDayclouser',
                                //                                                                    type: 'POST',
                                //                                                                    params: paymentObj,
                                //                                                                    success: function (response) {
                                //                                                                    }
                                //                                                                });
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                                Ext.ComponentQuery.query('[itemid="fullPaymentSection"]')[0].enable();
                            }
                        },
                        failure: function (form, response) {
                            r = response.result;
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == false) {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                                Ext.ComponentQuery.query('[itemid="fullPaymentSection"]')[0].enable();
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                Ext.ComponentQuery.query('[itemid="fullPaymentSection"]')[0].enable();
                            }
                        }
                    });
                }
            },
            //Save booking payment

            'directpaymentwindow': {
                beforeclose: function () {
                    this.reloadGrid();
                },
                afterrender: function () {
                    this.loadDirectPayment();
                }
            },
            'dayclosure combo[itemid=dayclosureProperty]': {
                select: function (combo, records, eOpt) {
                    //                    var grid = Ext.ComponentQuery.query('dayclosure grid[itemid="dayclosureGrid"]')[0];
                    //                    //  grid.getStore().proxy.setExtraParam('id', combo.getValue());
                    //                    grid.getStore().load();
                    var propertyId = Ext.ComponentQuery.query('dayclosure combo[itemid="dayclosureProperty"]')[0].getValue();
                    var currentDate = new Date();
                    var grid = Ext.ComponentQuery.query('dayclosure grid[itemid="dayclosureGrid"]')[0];

                    grid.getStore().proxy.setExtraParam('id', propertyId);
                    grid.getStore().proxy.setExtraParam('id1', user_language);
                    grid.getStore().proxy.setExtraParam('id2', Ext.Date.format(currentDate, 'Y-m-d'));
                    grid.getStore().proxy.setExtraParam('id3', null);
                    grid.getStore().load();
                }
            }

        })
    },
    loadDirectPayment: function () {
        var combo = Ext.ComponentQuery.query('inhouse combo[itemid="inhouseProperty"]')[0];
        Ext.getStore('property.CashRegisterStore').proxy.setExtraParam('id', combo.value);
        Ext.getStore('property.CashRegisterStore').proxy.setExtraParam('limit', 500);
        Ext.getStore('property.CashRegisterStore').load();

        var bookingId = Ext.ComponentQuery.query('[itemid="directPaymentBookingId"]')[0].getValue();
        Ext.getStore('operations.InhouseDirectPaymentDetails').load({
            params: {
                'bookingId': bookingId,
                'languageId': user_language
            },

            callback: function (records, o, success) {

                Ext.ComponentQuery.query('directpaymentwindow [itemid="bookingValueDP"]')[0].setValue(Ext.util.Format.number(records[0].data.BookingAmount, '0,000.00'));
                Ext.ComponentQuery.query('directpaymentwindow [itemid="downPaymentValueDP"]')[0].setValue(Ext.util.Format.number(records[0].data.DownPayment, '0,000.00'));
                Ext.ComponentQuery.query('directpaymentwindow [itemid="paymentReceivedDP"]')[0].setValue(Ext.util.Format.number(records[0].data.AmountPaid, '0,000.00'));
                Ext.ComponentQuery.query('directpaymentwindow [itemid="downPaymentOpenDP"]')[0].setValue(records[0].data.DownPaymentOpen);

                Ext.ComponentQuery.query('directpaymentwindow [itemid="totalBookingValueFP"]')[0].setValue(Ext.util.Format.number(records[0].data.BookingAmount, '0,000.00'));
                Ext.ComponentQuery.query('directpaymentwindow [itemid="totalBookingAmFP"]')[0].setValue(records[0].data.BookingAmount);
                Ext.ComponentQuery.query('directpaymentwindow [itemid="paymentReceivedFP"]')[0].setValue(Ext.util.Format.number(records[0].data.AmountPaid, '0,000.00'));
                Ext.ComponentQuery.query('directpaymentwindow [itemid="paymentOpenFP"]')[0].setValue(Ext.util.Format.number(records[0].data.PaymentOpen, '0,000.00'));
                Ext.ComponentQuery.query('directpaymentwindow [itemid="downPaymentOpenFDP"]')[0].setValue(records[0].data.PaymentOpen);

                if (records[0].data.AmountPaid >= records[0].data.BookingAmount) {
                    Ext.ComponentQuery.query('[itemid="paymenttypeChange3"]')[0].disable();
                }
            }
        });

        Ext.getStore('mastervalues.CcardTypeStore').load({
            params: {
                'languageId': user_language
            },
            callback: function (records, o, success) {
                var items = [], items2 = [];
                Ext.each(records, function (r) {
                    items.push(
                                {
                                    border: false,
                                    layout: 'hbox',
                                    items: [
                                    {
                                        xtype: 'radiofield',
                                        itemid: 'radioDP' + r.data.CcardTypeId,
                                        style: 'white-space:nowrap',
                                        name: 'paymentMethodTypesDP',
                                        inputValue: r.data.CcardTypeId,
                                        boxLabel: r.data.Name,
                                        width: 140,
                                        margin: '10 0 0 10',
                                        listeners: {
                                            change: function (field, newValue, oldValue) {
                                                if (newValue) {
                                                    var panel = Ext.ComponentQuery.query('directpaymentwindow [itemid="PaymentMethodFormDP"]')[0];
                                                    if (panel != null && panel.items.length > 0) {
                                                        for (var i = 0; i < panel.items.length; i++) {
                                                            panel.items.items[i].items.items[1].disable();
                                                        }
                                                    }

                                                    var itemId = '[itemid="' + field.itemid.replace("radio", "text") + '"]';
                                                    Ext.ComponentQuery.query(itemId)[0].enable();
                                                }
                                            }
                                        }
                                    }
                                    , {
                                        xtype: 'numberfield',
                                        decimalPrecision: 2,
                                        itemid: 'textDP' + r.data.CcardTypeId,
                                        disabled: true,
                                        hidden: true,
                                        width: 150
                                    }
                                    ]
                                });

                    items2.push(
                                {
                                    border: false,
                                    layout: 'hbox',
                                    items: [
                                    {
                                        xtype: 'radiofield',
                                        itemid: 'radioFP' + r.data.CcardTypeId,
                                        name: 'paymentMethodTypesFP',
                                        style: 'white-space:nowrap',
                                        inputValue: r.data.CcardTypeId,
                                        boxLabel: r.data.Name,
                                        margin: '10 0 0 10',
                                        width: 140,
                                        listeners: {
                                            change: function (field, newValue, oldValue) {
                                                if (newValue) {
                                                    var panel = Ext.ComponentQuery.query('directpaymentwindow [itemid="PaymentMethodFormFP"]')[0];
                                                    if (panel != null && panel.items.length > 0) {
                                                        for (var i = 0; i < panel.items.length; i++) {
                                                            panel.items.items[i].items.items[1].disable();
                                                        }
                                                    }

                                                    var itemId = '[itemid="' + field.itemid.replace("radio", "text") + '"]';
                                                    Ext.ComponentQuery.query(itemId)[0].enable();
                                                }
                                            }
                                        }
                                    }
                                    , {
                                        xtype: 'numberfield',
                                        decimalPrecision: 2,
                                        itemid: 'textFP' + r.data.CcardTypeId,
                                        disabled: true,
                                        hidden: true,
                                        width: 150
                                    }
                                    ]
                                });
                });

                Ext.getCmp('PaymentMethodFormDP').removeAll(true);
                Ext.getCmp('PaymentMethodFormDP').add(items);
                Ext.getCmp('PaymentMethodFormDP').doLayout();

                Ext.getCmp('PaymentMethodFormFP').removeAll(true);
                Ext.getCmp('PaymentMethodFormFP').add(items2);
                Ext.getCmp('PaymentMethodFormFP').doLayout();
            }
        });
    },
    //    loadProperties: function () {
    ////        var comboStore = Ext.getStore('property.PropertyListByUserIdStore');
    ////        comboStore.proxy.setExtraParam('activityCode', 'OPER003');
    //        //comboStore.load();
    //    },
    reloadGrid: function () {
        var property = Ext.ComponentQuery.query('[itemid="inhouseProperty"]')[0];
        var date = Ext.ComponentQuery.query('[itemid="inhouseDateField"]')[0];
        var filterText = Ext.ComponentQuery.query('[itemid="inhouseFilterText"]')[0];
        if (property.getValue() > 0) {
            var store = Ext.getStore('operations.OperationsInhouseEventsListStore');
            store.proxy.setExtraParam('id', property.getValue());
            store.proxy.setExtraParam('id1', user_language);
            store.proxy.setExtraParam('id2', date.getValue());
            store.proxy.setExtraParam('id3', filterText.getValue());
            store.reload();
        }
    },
    loadBookingStatusChangesStore: function () {
        var bookingId = Ext.ComponentQuery.query('[itemid="inhouseBookingViewBookingId"]')[0].getValue();
        var reservationId = Ext.ComponentQuery.query('[itemid="inhouseBookingViewReservationId"]')[0].getValue();

        var changesStore = Ext.getStore('operations.OperationsInhouseBookingChanges');
        /*@Pratik: avoid error in API*/
        if (reservationId == "")
            reservationId = 0;

        changesStore.proxy.setExtraParam('id', reservationId);
        changesStore.proxy.setExtraParam('id1', bookingId);
        changesStore.proxy.setExtraParam('LanguageId', user_language);
        changesStore.load();
    },
    loadBookingEventsStore: function (me) {
        var bookingId = Ext.ComponentQuery.query('[itemid="inhouseCurrentBookingId"]')[0].getValue();
        // var eventsStore = Ext.getStore('operations.InhouseBookingEventsListStore');
        var selectedBar = Ext.ComponentQuery.query('[itemid="inhouseSelectedbar"]')[0].getValue();
        var eventsCombo = Ext.ComponentQuery.query('inhouseadditemswindow [itemid="inhouseEventsCombo"]')[0];
        var eventsStore = eventsCombo.getStore();

        eventsStore.proxy.setExtraParam('id', bookingId);
        eventsStore.load({
            callback: function (records, o, success) {
                if (typeof o.response.data != 'undefined') {
                    var data = o.response.data;
                    eventsCombo.setValue(data[0].BookingEventId);
                    me.loadItemsStore();
                }
            }
        });

        var barStore = Ext.getStore('operations.InhouseBarListStore');
        //        barStore.on('load', function (store) {
        //            var index = store.findExact('BarId', Number(selectedBar));
        //            var barCombo = Ext.ComponentQuery.query('[itemid="inhouseBarCombo"]')[0];
        //            barCombo.setValue(1);
        //            barCombo.setValue(store.getAt(index).get('BarId'));
        //        });
        barStore.load({
            callback: function (records, o, success) {
                if (typeof o.response.data != 'undefined') {
                    var index = barStore.findExact('BarId', Number(selectedBar));
                    //barCombo.setValue(1);
                    if (index >= 0) {
                        var barCombo = Ext.ComponentQuery.query('inhouseadditemswindow [itemid="inhouseBarCombo"]')[0];
                        barCombo.setValue(barStore.getAt(index).get('BarId'));
                    }
                }

            }
        });
    },
    loadItemsStore: function () {
        var currentBookingId = Ext.ComponentQuery.query('[itemid="inhouseCurrentBookingId"]')[0].getValue();
        var grid = Ext.ComponentQuery.query('[itemid="inhouseItemsGrid"]')[0]

        var store = Ext.getStore('operations.InhouseItemsList');
        var combo = Ext.ComponentQuery.query('[itemid="inhouseitemcategorycombo"]')[0];
        var eventsCombo = Ext.ComponentQuery.query('[itemid="inhouseEventsCombo"]')[0];
        var searchtext = Ext.ComponentQuery.query('[itemid="inhouseItemFilterText"]')[0];
        var barCombo = Ext.ComponentQuery.query('[itemid="inhouseBarCombo"]')[0];
        var salesTextValue = Ext.ComponentQuery.query('[itemid="inhouseSalesOnLocationTextValue"]')[0];

        var bookingEventID = eventsCombo.getValue();
        var barID = barCombo.getValue();
        var ExtraOptionsOnLocation = salesTextValue.getValue();

        if (!Utils.isValid(bookingEventID)) {
            Ext.Msg.alert('Error'.l('g'), 'Event not selected'.l('SC70000'));
            return;
        }
        if (!Utils.isValid(barID)) {
            barID = 0;
        }
        var catId = combo.getValue();
        if (!Utils.isValid(catId)) {
            catId = 0;
        }

        obj = new Object();
        obj.EventId = 0;
        obj.PriceType = 1;
        obj.BookingId = currentBookingId;
        obj.BookingTrackingId = null;
        obj.BookingeventId = bookingEventID;
        obj.BookingEventTrackingId = null;
        obj.ItemCategoryId = catId;
        obj.LanguageId = user_language;
        obj.FilterText = searchtext.getValue();
        obj.ExtraOptionsOnLocation = ExtraOptionsOnLocation;
        obj = Ext.encode(obj);

        store.proxy.setExtraParam('param', obj);
        store.proxy.setExtraParam('Barid', barID);
        store.proxy.setExtraParam('limit', page_size);
        store.load();
    },
    AddItems: function () {
        //selected items
        var items = $('[id^="inhouseItem_"]');
        var itemIdsList = new Array();
        items.each(function (i) {
            var el = $(items[i]);
            if (el.is(':checked')) {
                Utils.push(itemIdsList, el.attr('data-id'));
            }
        });
        if (itemIdsList.length == 0) {
            Ext.Msg.alert('Error'.l('g'), 'No item selected');
            return;
        }
        var forServer = new Array();
        var store = Ext.getStore('operations.InhouseItemsList');
        for (var i = 0; i < itemIdsList.length; i++) {
            var rowItemIndex = store.findExact('ItemId', Number(itemIdsList[i]));
            if (rowItemIndex > -1) {
                forServer.push(store.getAt(rowItemIndex).data);
            }
        }
        var currentBookingId = Ext.ComponentQuery.query('[itemid="inhouseCurrentBookingId"]')[0].getValue();
        var eventsCombo = Ext.ComponentQuery.query('[itemid="inhouseEventsCombo"]')[0];

        var finalObj = new Object();
        finalObj.UserId = CurrentSessionUserId;
        finalObj.BookingEventId = eventsCombo.getValue();
        finalObj.BookingId = currentBookingId;
        finalObj.LanguageId = user_language;
        finalObj.ItemsList = Ext.encode(forServer);

        Ext.Ajax.request({
            url: webAPI_path + 'api/InHouse/AddItems',
            method: 'POST',
            params: finalObj,
            success: function (response) {
                var r = Ext.decode(response.responseText);
                var ResultText = r.result;
                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                    ResultText = ResultText.l("SP_DynamicCode");
                if (r.success == true) {
                    var win = Ext.WindowManager.getActive();
                    if (win) win.close();
                } else {
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
    },
    AddRemark: function (me) {
        var currentBookingId = Ext.ComponentQuery.query('[itemid="remarkBookingId"]')[0].getValue();
        var customerText = Ext.ComponentQuery.query('[itemid="inhouseRemarkText"]')[0].getValue();
        var invoiceDetials = Ext.getCmp('ckInhouseInvoiceDetails').getValue();
        var invoiceDiscussion = Ext.getCmp('ckInhouseInvoiceDiscussion').getValue();

        var urlItem = webAPI_path + 'api/InHouse/AddRemark';
        $.get(urlItem, { id: currentBookingId, id1: invoiceDetials, id2: invoiceDiscussion, id3: customerText },
               function (response) {
                   var ResultText = response.result;
                   if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                       ResultText = ResultText.l("SP_DynamicCode");
                   if (response.success) {
                       var win = Ext.WindowManager.getActive();
                       if (win) {
                           win.destroy();
                           //Reload InHouse
                           var grid = Ext.ComponentQuery.query('dayclosure grid[itemid="dayclosureGrid"]')[0];
                           if (grid == undefined || grid == null) {
                               me.reloadGrid();
                           } else {
                               //Reload DayClosure
                               grid.getStore().reload();
                           }
                       }
                   } else {
                       Ext.Msg.alert('Error'.l('g'), ResultText);
                   }
               });
    },
    DisableChangeOnLocation: function (extra) {
        //var buttonChange = Ext.ComponentQuery.query('[itemid="buttonChangeSales"]')[0];

        var addItem = Ext.ComponentQuery.query('[itemid="inhouseAddItemsButton"]')[0];
        //buttonChange.setDisabled(true);        
        var salesText = Ext.ComponentQuery.query('[itemid="inhouseSalesOnLocationText"]')[0];
        var salesTextValue = Ext.ComponentQuery.query('[itemid="inhouseSalesOnLocationTextValue"]')[0];
        salesTextValue.setValue(extra);
        switch (extra) {
            case 1: // Yes - Black
                salesText.removeCls(' black-text ').addCls(' red-text ');
                salesText.setValue('No'.l('SC71210'));
                break;
            case 2: // No  - Red                
                //addItem.setDisabled(true);
                salesText.removeCls(' red-text ').addCls(' black-text ');

                salesText.setValue('Yes'.l('SC71210'));
                break;
            case 3: // YesWithAgreementOfContactOnLocation - Red
                salesText.removeCls(' black-text ').addCls(' red-text ');
                salesText.setValue('Yes, agreement with contect on location'.l('SC71210'));
                break;
            case 4: // YesWithAgreementOfBooker - Red
                salesText.removeCls(' black-text ').addCls(' red-text ');
                salesText.setValue('Yes, agreement with booker'.l('SC71210'));
                break;
        }
    },
    SetSalesOnLocation: function (me) {
        var salesonLocationOptions = Ext.ComponentQuery.query('[itemid="inhouseComboSalesOnLocationOptions"]')[0];
        var selected = salesonLocationOptions.getValue();
        var currentBooking = Ext.ComponentQuery.query('[itemid="inhouseSalesCurrentBooking"]')[0].getValue();

        var urlItem = webAPI_path + 'api/InHouse/SetSalesOnLocation';
        $.get(urlItem, { id: currentBooking, id1: selected },
               function (response) {
                   if (response.success) {
                       var win = Ext.WindowManager.getActive();
                       if (win) {
                           win.destroy();
                           me.DisableChangeOnLocation(selected);
                       }
                   } else {
                       var ResultText = response.Message;
                       if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                           ResultText = ResultText.l("SP_DynamicCode");
                       Ext.Msg.alert('Error'.l('g'), ResultText);
                   }
               });
    },
    LoadCheckInOutStore: function (inOrOut) {
        var checkInStore = Ext.getStore('operations.InhouseCheckInOutStore');
        var date = Ext.ComponentQuery.query('[itemid="inhouseDateField"]')[0];

        /*for day closure*/
        if (typeof date == 'undefined') {
            var currentDate = new Date();
            date = Ext.Date.format(currentDate, 'Y-m-d')
        }
        else
            date = date.getValue();

        var currentBookingId = 0;
        if (inOrOut) { //CheckIn
            currentBookingId = Ext.ComponentQuery.query('[itemid="inhouseCheckInBookingId"]')[0].getValue();
        } else { // CheckOut
            currentBookingId = Ext.ComponentQuery.query('[itemid="inhouseCheckOutBookingId"]')[0].getValue();
        }
        checkInStore.proxy.setExtraParam('id', currentBookingId);
        checkInStore.proxy.setExtraParam('id1', date);
        checkInStore.proxy.setExtraParam('id2', user_language);
        checkInStore.proxy.setExtraParam('id3', inOrOut); //CheckIn
        checkInStore.load();
    },
    CheckInOrOut: function (me, bookingEventId, inOrOut) {
        var urlItem = webAPI_path + 'api/InHouse/UpdateCheckInOut';
        $.get(urlItem, { id: bookingEventId, id1: inOrOut, id2: CurrentSessionUserId, id3: user_language },
                   function (response) {
                       var ResultText = response.result;
                       if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                           ResultText = ResultText.l("SP_DynamicCode");
                       if (response.success) {
                           var grid = Ext.ComponentQuery.query('dayclosure grid[itemid="dayclosureGrid"]')[0];

                           if (grid == undefined || grid == null) {
                               //Reload Inhouse
                               var checkInStore = Ext.getStore('operations.InhouseCheckInOutStore');
                               checkInStore.reload();
                               me.reloadGrid();
                           } else {
                               //Reload DayClosure
                               grid.getStore().reload();
                           }
                       } else {
                           Ext.Msg.alert('Error'.l('g'), ResultText);
                       }
                   });
    },
    OpenBookingWizard: function (me, rec) {

        var obj = [];

        var stepNum = 5; // If Step number is null open with 5th STEP
        if (rec.StepNumber != null) {
            stepNum = rec.StepNumber;
        }

        if (rec.BookingTrackingId != 0 && rec.BookingTrackingId != null) {
            obj.BookingTrackingId = rec.BookingTrackingId;
        }
        if (Utils.isEmpty(rec.BookingId)) {
            obj.BookingId = rec.BookingId;
        }

        obj.ReservationId = rec.ReservationId;

        Utils.loadWizardStepsFromOutSide(me, obj, "step" + stepNum);
    },
  
    readytoinvoice: function (rec) {
        display_alert("MG76010", '', 'C', function (btn) {
            if (btn == "yes") {
                var mask = new Ext.LoadMask(Ext.ComponentQuery.query('dayclosure grid[itemid="dayclosureGrid"]')[0], { msg: "Please wait".l("g") });
                mask.show();
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/InHouse/UpdateDayClosureBookingsStatus',
                    type: "GET",
                    timeout: 500000,
                    params: {
                        id: rec.data.BookingId,
                        extraz: rec.data.Extraz,
                        userId: CurrentSessionUserId
                    },
                    success: function (r) {
                        // var r = jsonDecode(response);
                        mask.hide();
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            //display_alert('MG76020');
                            var grid = Ext.ComponentQuery.query('dayclosure grid[itemid="dayclosureGrid"]')[0];
                            grid.getStore().reload();
                        } else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function (form, response) {
                        mask.hide();
                        var r = response.response.responseText;
                        r = Ext.decode(r);
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        Ext.Msg.alert('Error'.l('g'), ResultText); // 'Information not saved.');
                    }
                })
            }
        })
    }
    
});
