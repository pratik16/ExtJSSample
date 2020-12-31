Ext.define('Regardz.controller.bookingwizard.BookingWizardInfoPanelController', {
    extend: 'Ext.app.Controller',
    views: ['bookingwizard.RightSide.Windows.BookingNavigation.AddBookingWindow', 'bookingwizard.BookingWizardInfoPanel', 'bookingwizard.RightSide.Windows.BookingNavigation.CopyReservationBooking', 'bookingwizard.RightSide.Windows.BookingNavigation.CancelWindow', 'bookingwizard.RightSide.Windows.BookingNavigation.ChangeReservationStatus', 'bookingwizard.RightSide.CommunicationNotes', 'bookingwizard.RightSide.Windows.BookingNavigation.BookingHistory', 'bookingwizard.RightSide.Windows.BookingNavigation.EditBooking', 'bookingwizard.RightSide.Traces', 'bookingwizard.RightSide.Tasks', 'bookingwizard.RightSide.Windows.Invoice.ChangeInvoice', 'bookingwizard.RightSide.SalesInfo', 'bookingwizard.RightSide.Windows.CompetitorInfoWindow', 'bookingwizard.RightSide.Windows.Invoice.AddInvoice',
    'bookingwizard.RightSide.Windows.BookingNavigation.CostOfCancelation', 'bookingwizard.BookingContactListWindow', 'bookingwizard.RightSide.Windows.CompanyAgencyWindow', 'bookingwizard.BookingCompanyContactList', 'bookingwizard.RightSide.Windows.BookingNavigation.BookingEventItemList'],
    stores: ['common.CountryStore', 'bookingwizard.RightSide.INCompanyPreferencesStore', 'bookingwizard.RightSide.WizardNavigationListStore', 'bookingwizard.RightSide.SalesInfoCompetitorStore', 'common.CancellationReasonStore',
    'bookingwizard.ReservationStatusChangeStore', 'bookingwizard.RightSide.RequiredActionsListStore',
     'bookingwizard.infopanel.BookingHistoryStore', 'bookingwizard.RightSide.CostOfCancelationStore', 'bookingwizard.RightSide.BookingEventItemListStore', 'bookingwizard.ItemPriceBarStore', 'bookingwizard.BookingInvoiceItemsTotalStore'],

    refs: [{
        ref: 'bookingnavigationcancelwindow',
        selector: 'bookingnavigationcancelwindow'
    }, {
        ref: 'bookingnavigationaddbookingwindow',
        selector: 'bookingnavigationaddbookingwindow'
    }],

    thisController: false,
    initialTimeStore: null,

    init: function () {
        var me = this;
        this.control({
            'rightintakenotes': {
                expand: function (p, opt) {
                    Utils.loadIntakeNoteData()
                    me.enableAccording();
                },
                beforeexpand: function () {
                    me.disableAccording();
                }
            },
            'rightbookingninformation': {
                expand: function (p, opt) {
                    me.enableAccording();
                    var bookingId = 0;
                    if (Utils.isValid(Utils.RightPanObj.BookingId)) {
                        bookingId = Utils.RightPanObj.BookingId;
                    }
                    Utils.LoadBookingInformationForRightPane(bookingId, Utils.RightPanObj.BookingTrackingId, user_language);
                },
                beforeexpand: function () {
                    me.disableAccording();
                }
            },
            'rightbookingnavigation': {
                expand: function (p, opt) {
                    me.enableAccording();
                    Utils.UpdateBookingNavigationList(0);
                },
                beforeexpand: function () {
                    me.disableAccording();
                }
            },
            'invoices': {
                expand: function (p, opt) {
                    me.enableAccording();
                    Utils.LoadBookingInvoiceStore();
                },
                beforeexpand: function () {
                    me.disableAccording();
                }
            },
            'sentconfirmations': {
                expand: function (p, opt) {
                    me.enableAccording();
                    Utils.UpdateBookingConfirmationList();
                },
                beforeexpand: function () {
                    me.disableAccording();
                }
            },
            'rightrequiredactions': {
                expand: function (p, opt) {
                    me.enableAccording();
                    Ext.getStore('bookingwizard.RightSide.RequiredActionsListStore').load({
                        params: {
                            'languageId': user_language,
                            'id': Utils.RightPanObj.ReservationId
                        }
                    });

                },
                beforeexpand: function () {
                    me.disableAccording();
                }
            },
            'tasks': {
                expand: function (p, opt) {
                    me.enableAccording();
                    //Added Mihai - Disable button add task on step 6
                    var panelSteps = Ext.ComponentQuery.query('bookingwizardpanel')[0];
                    var layout = panelSteps.getLayout();
                    var btn = Ext.ComponentQuery.query('[itemid="buttonAddNewTask"]')[0];
                    if (layout.activeItem.itemid == "stepsix") {
                        btn.setDisabled(true);
                    } else {
                        btn.setDisabled(false);
                    }

                    var tasklistGrid = Ext.ComponentQuery.query('tasks grid[itemid=tasklist]')[0];
                    obj1 = new Object();

                    obj1.TaskAllOrOpen = 2;
                    var radioGrpItem = Ext.ComponentQuery.query('tasks radiogroup[itemid=is_open_all]')[0].items.items[0];
                    radioGrpItem.setValue(true);

                    obj1.searchParam = null;

                    var bookingId = Utils.StepOneObj.BookingId;
                    var bookingTrackingId = Utils.StepOneObj.BookingTrackingId;

                    if (!Utils.isValid(bookingId) || bookingId == 0)
                        bookingId = Utils.RightPanObj.BookingId;

                    if (!Utils.isValid(bookingTrackingId) || bookingTrackingId == 0)
                        bookingTrackingId = Utils.RightPanObj.BookingTrackingId;

                    obj1.BookingId = bookingId;
                    obj1.BookingTrackingId = bookingTrackingId;
                    tasklistGrid.getStore().proxy.setExtraParam('param', Ext.encode(obj1));
                    tasklistGrid.getStore().load();
                },
                beforeexpand: function () {
                    me.disableAccording();
                }
            },
            'traces': {
                expand: function (p, opt) {
                    me.enableAccording();
                    var outgoingtracelistGrid = Ext.ComponentQuery.query('traces grid[itemid=outgoingtracelist]')[0];
                    obj1 = new Object();

                    obj1.TraceType = 3;
                    obj1.TraceStatus = 2;

                    var radioGrpItem = Ext.ComponentQuery.query('traces radiogroup[itemid=is_open_all]')[0].items.items[0];
                    radioGrpItem.setValue(true);

                    var bookingId = Utils.StepOneObj.BookingId;
                    var bookingTrackingId = Utils.StepOneObj.BookingTrackingId;

                    if (!Utils.isValid(bookingId) || bookingId == 0)
                        bookingId = Utils.RightPanObj.BookingId;

                    if (!Utils.isValid(bookingTrackingId) || bookingTrackingId == 0)
                        bookingTrackingId = Utils.RightPanObj.BookingTrackingId;

                    obj1.BookingId = bookingId;
                    obj1.BookingTrackingId = bookingTrackingId;

                    obj1 = Ext.encode(obj1);
                    outgoingtracelistGrid.getStore().proxy.setExtraParam('param', obj1);
                    outgoingtracelistGrid.getStore().load();
                },
                beforeexpand: function () {
                    me.disableAccording();
                }
            },
            'requitredactionstree': {
                afterrender: function (tp, opt) {
                    // debugger;
                    //var myTreeNode = Ext.ComponentQuery.query('[itemid="P_Booking"]')[0];
                    //tp.getView().addRowCls(myTreeNode, 'highlightclass');

                },
                itemclick: function (s, rec) {

                    var obj = [];
                    if (rec.data.itemid == "C_Event") {
                        if (rec.data.BookingTrackingId != 0 && rec.data.BookingTrackingId != null) {
                            obj.BookingTrackingId = rec.data.BookingTrackingId;
                        }
                        // if (Utils.isEmpty(rec.data.BookingId)) {
                        obj.BookingId = (rec.data.BookingId > 0) ? rec.data.BookingId : 0;
                        // }

                        Utils.ActiveStepFromRightPanel(me, obj, "step" + rec.data.StepNumber);
                    }
                }
            },

            'bookingnavigationcancelwindow textfield[itemid="cancelPercentage"]': {
                blur: function (e, t, eOpts) {

                    Ext.getStore('bookingwizard.RightSide.CostOfCancelationStore').proxy.setExtraParam('id4', e.getValue());

                    Ext.getStore('bookingwizard.RightSide.CostOfCancelationStore').load({
                        callback: function (records, o, success) {

                            if (o && o.response) {
                                var cancelPercentage = Ext.ComponentQuery.query('bookingnavigationcancelwindow [itemid="cancelPercentage"]')[0];
                                cancelPercentage.setValue(o.response.CanPercentage);
                                var cancelValue = Ext.ComponentQuery.query('bookingnavigationcancelwindow [itemid="cancelValue"]')[0];
                                cancelValue.setValue(o.response.TotalCancellation);

                                var hcCanPercentage = Ext.ComponentQuery.query('bookingnavigationcancelwindow [itemid="hcCanPercentage"]')[0];
                                hcCanPercentage.setValue(o.response.hcCanPercentage);
                                var hcTotalCancellation = Ext.ComponentQuery.query('bookingnavigationcancelwindow [itemid="hcTotalCancellation"]')[0];
                                hcTotalCancellation.setValue(o.response.hcTotalCancellation);
                                var CanLevel = Ext.ComponentQuery.query('bookingnavigationcancelwindow [itemid="CanLevel"]')[0];
                                CanLevel.setValue(o.response.CanLevel);
                            }
                        }
                    });
                }
            },

            'bookingnavigationcancelwindow grid[itemid="CompetitorsList"]  [xtype="radiorow"]': {
                checkchange: function (t, rowIndex, eo) {//t => this, e => event, eo => Eoptional  

                    var grid = Ext.ComponentQuery.query('bookingnavigationcancelwindow grid[itemid="CompetitorsList"]')[0];
                    var alldata = grid.getStore().getRange();

                    if (alldata) {
                        var i = 0;
                        Ext.each(alldata, function (d) {
                            var record = d.data;
                            alldata[i].set('checked', false);
                            i++;
                        })
                    }
                    alldata[rowIndex].set('checked', true);

                }
            },

            //            'bookingnavigationcancelwindow combo[itemid="CancellationReason"]': {
            //                select: function (combo, records, eOpt) {
            //                    var OtherReason = Ext.ComponentQuery.query('bookingnavigationcancelwindow [name="OtherReason"]')[0];
            //                    if (combo.getValue() == 0) {
            //                        OtherReason.enable();
            //                    }
            //                    else
            //                        OtherReason.disable();
            //                }
            //            },

            'bookingnavigationcancelwindow button[action="saveCancellation"]': {
                click: function (t, rowIndex, eo) {//t => this, e => event, eo => Eoptional  

                    var cancelPercentage = Ext.ComponentQuery.query('bookingnavigationcancelwindow [itemid="cancelPercentage"]')[0];

                    var hcCanPercentage = Ext.ComponentQuery.query('bookingnavigationcancelwindow [itemid="hcCanPercentage"]')[0];
                    var hcTotalCancellation = Ext.ComponentQuery.query('bookingnavigationcancelwindow [itemid="hcTotalCancellation"]')[0];
                    var cancelValue = Ext.ComponentQuery.query('bookingnavigationcancelwindow [itemid="cancelValue"]')[0];


                    var CanLevel = Ext.ComponentQuery.query('bookingnavigationcancelwindow [itemid="CanLevel"]')[0];

                    var form = Ext.ComponentQuery.query('bookingnavigationcancelwindow')[0];
                    var OtherReason = Ext.ComponentQuery.query('bookingnavigationcancelwindow [name="OtherReason"]')[0];
                    var CancellationReason = Ext.ComponentQuery.query('bookingnavigationcancelwindow [itemid="CancellationReason"]')[0];

                    var grid = Ext.ComponentQuery.query('bookingnavigationcancelwindow grid[itemid="CompetitorsList"]')[0];
                    var record = grid.getStore().findRecord('checked', true);

                    if ((record == null || typeof record == 'undefined' || (trim(OtherReason.getValue()) == "" && CancellationReason.getValue() == 0)) && form.typeCancellation != "BookingEvent") {
                        //alert('Required field should not empty')
                        display_alert('MG50600');
                        return false;
                    }

                    var obj = new Object;
                    obj.CanLevel = CanLevel.value;
                    obj.ReservationId = form.ReservationId;
                    obj.BookingId = form.BookingId;
                    obj.BookingTrackingId = form.BookingTrackingId;
                    obj.BookingEventId = form.BookingEventId;
                    obj.BookingEventTrackingId = form.BookingEventTrackingId;
                    obj.UserId = CurrentSessionUserId;
                    obj.CancelPer = cancelPercentage.getValue();
                    obj.CancellationReasonId = CancellationReason.getValue();
                    obj.CompetitorId = (record && record.data && record.data.CompetitorId) ? record.data.CompetitorId : 0;
                    obj.OtherReason = OtherReason.getValue();

                    /*If reservation then bookingid=0, bookingeventid=0; if bookingcancel then bookingeventid=o;reservationid=0;
                    if reservation cancellation then bookingid=0, bookingeventid=0
                    */
                    if (form.typeCancellation == "BookingEvent") {
                        obj.ReservationId = 0;
                        obj.BookingId = 0;
                    }
                    else if (form.typeCancellation == "Booking") {
                        obj.ReservationId = 0;
                        obj.BookingEventId = 0;
                    }
                    else if (form.typeCancellation == "Reservation") {
                        obj.BookingId = 0;
                        obj.BookingEventId = 0;
                    }

                    if (form.typeCancellation == "Booking") {
                        if (parseFloat(hcTotalCancellation.value) > parseFloat(cancelValue.value)) {
                            if (confirm("First cancellation cost(" + hcTotalCancellation.value.toString() + ") is heigher than the current cancellation (" + cancelValue.value.toString() + "). are you sure you want to continue with higher cost?")) {
                                //me.CancellationAPICall(obj);
                                Ext.Ajax.request({
                                    url: webAPI_path + 'api/BookingCancellation/ApplyCancellationCost',
                                    method: 'POST',
                                    params: obj,
                                    success: function (response) {
                                        var r = Ext.decode(response.responseText);
                                        if (r.success == true) {
                                            /*if form is not booking event*/
                                            if (form.typeCancellation == "Booking") {

                                                if (r.data.NextStep == 0) r.data.bookingStep = 6;

                                                var BookingId = form.BookingId;
                                                var BookingTrackingId = r.BookingTrackingId;
                                                var StepNumber = 6;

                                                if (r.data.NextBookingTrackingId > 0 || r.data.NextBookingID > 0) {
                                                    if (r.data.NextBookingID != form.BookingId) {
                                                        BookingTrackingId = r.data.NextBookingTrackingId > 0 ? r.data.NextBookingTrackingId : 0;
                                                        BookingId = r.data.NextBookingID > 0 ? r.data.NextBookingID : 0
                                                        StepNumber = r.data.NextStep;
                                                    }
                                                }
                                                else {
                                                    StepNumber = r.data.bookingStep;
                                                }

                                                var obj = new Object;
                                                obj.BookingTrackingId = BookingTrackingId;
                                                obj.BookingId = BookingId;
                                                obj.ReservationId = r.data.ReservationId;

                                                Utils.loadSteps(me, obj, 'step' + StepNumber);

                                                Utils.UpdateBookingNavigationList(obj.ReservationId); //refresh Navigation pan
                                                Utils.LoadBookingInformationForRightPane(BookingId, BookingTrackingId, user_language); //refresh Booking Info pan


                                            }
                                            else if (form.typeCancellation == "BookingEvent") {
                                                var obj = new Object;
                                                obj.BookingTrackingId = form.BookingTrackingId;
                                                obj.BookingId = form.BookingId;
                                                isRquiredReloadStep = true;
                                                Utils.ActiveStepFromRightPanel(me, obj, 'step4');
                                            }
                                            else if (form.typeCancellation == "Reservation") {
                                                if (Ext.getCmp('bookingWiz-win'))
                                                    Ext.getCmp('bookingWiz-win').close();
                                            }

                                            me.getBookingnavigationcancelwindow().close();
                                        }
                                        else {
                                            if (r.result.substring(0, 4) == "SPC_")
                                                Ext.Msg.alert('Error'.l('g'), r.result.l("SP_DynamicCode"));
                                            else
                                                Ext.Msg.alert('Error'.l('g'), r.result);
                                        }

                                    },
                                    failure: function (form, response) {
                                        console.log(response);
                                    }
                                });
                            }
                        }
                        else {
                            //me.CancellationAPICall(obj);
                            Ext.Ajax.request({
                                url: webAPI_path + 'api/BookingCancellation/ApplyCancellationCost',
                                method: 'POST',
                                params: obj,
                                success: function (response) {
                                    var r = Ext.decode(response.responseText);
                                    if (r.success == true) {
                                        /*if form is not booking event*/
                                        if (form.typeCancellation == "Booking") {

                                            if (r.data.NextStep == 0) r.data.bookingStep = 6;

                                            var BookingId = form.BookingId;
                                            var BookingTrackingId = r.BookingTrackingId;
                                            var StepNumber = 6;

                                            if (r.data.NextBookingTrackingId > 0 || r.data.NextBookingID > 0) {
                                                if (r.data.NextBookingID != form.BookingId) {
                                                    BookingTrackingId = r.data.NextBookingTrackingId > 0 ? r.data.NextBookingTrackingId : 0;
                                                    BookingId = r.data.NextBookingID > 0 ? r.data.NextBookingID : 0
                                                    StepNumber = r.data.NextStep;
                                                }
                                            }
                                            else {
                                                StepNumber = r.data.bookingStep;
                                            }

                                            var obj = new Object;
                                            obj.BookingTrackingId = BookingTrackingId;
                                            obj.BookingId = BookingId;
                                            obj.ReservationId = r.data.ReservationId;

                                            Utils.loadSteps(me, obj, 'step' + StepNumber);

                                            Utils.UpdateBookingNavigationList(obj.ReservationId); //refresh Navigation pan
                                            Utils.LoadBookingInformationForRightPane(BookingId, BookingTrackingId, user_language); //refresh Booking Info pan


                                        }
                                        else if (form.typeCancellation == "BookingEvent") {
                                            var obj = new Object;
                                            obj.BookingTrackingId = form.BookingTrackingId;
                                            obj.BookingId = form.BookingId;
                                            isRquiredReloadStep = true;
                                            Utils.ActiveStepFromRightPanel(me, obj, 'step4');
                                        }
                                        else if (form.typeCancellation == "Reservation") {
                                            if (Ext.getCmp('bookingWiz-win'))
                                                Ext.getCmp('bookingWiz-win').close();
                                        }

                                        me.getBookingnavigationcancelwindow().close();
                                    }
                                    else {
                                        if (r.result.substring(0, 4) == "SPC_")
                                            Ext.Msg.alert('Error'.l('g'), r.result.l("SP_DynamicCode"));
                                        else
                                            Ext.Msg.alert('Error'.l('g'), r.result);
                                    }

                                },
                                failure: function (form, response) {
                                    console.log(response);
                                }
                            });
                        }
                    }
                    else {
                        //me.CancellationAPICall(obj);
                        Ext.Ajax.request({
                            url: webAPI_path + 'api/BookingCancellation/ApplyCancellationCost',
                            method: 'POST',
                            params: obj,
                            success: function (response) {
                                var r = Ext.decode(response.responseText);
                                if (r.success == true) {
                                    /*if form is not booking event*/
                                    if (form.typeCancellation == "Booking") { //r.NextBookingTrackingId

                                        if (r.data.NextStep == 0) r.data.bookingStep = 6;

                                        var BookingId = form.BookingId;
                                        var BookingTrackingId = r.BookingTrackingId;
                                        var StepNumber = 6;

                                        if (r.data.NextBookingTrackingId > 0 || r.data.NextBookingID > 0) {
                                            if (r.data.NextBookingID != form.BookingId) {
                                                BookingTrackingId = r.data.NextBookingTrackingId > 0 ? r.data.NextBookingTrackingId : 0;
                                                BookingId = r.data.NextBookingID > 0 ? r.data.NextBookingID : 0
                                                StepNumber = r.data.NextStep;
                                            }
                                        }
                                        else {
                                            StepNumber = r.data.bookingStep;
                                        }

                                        var obj = new Object;
                                        obj.BookingTrackingId = BookingTrackingId;
                                        obj.BookingId = BookingId;
                                        obj.ReservationId = r.data.ReservationId;

                                        Utils.loadSteps(me, obj, 'step' + StepNumber);

                                        Utils.UpdateBookingNavigationList(obj.ReservationId); //refresh Navigation pan
                                        Utils.LoadBookingInformationForRightPane(BookingId, BookingTrackingId, user_language); //refresh Booking Info pan


                                    }
                                    else if (form.typeCancellation == "BookingEvent") {
                                        var obj = new Object;
                                        obj.BookingTrackingId = form.BookingTrackingId;
                                        obj.BookingId = form.BookingId;
                                        isRquiredReloadStep = true;
                                        Utils.ActiveStepFromRightPanel(me, obj, 'step4');
                                    }
                                    else if (form.typeCancellation == "Reservation") {
                                        if (Ext.getCmp('bookingWiz-win'))
                                            Ext.getCmp('bookingWiz-win').close();
                                    }

                                    me.getBookingnavigationcancelwindow().close();
                                }
                                else {
                                    if (r.result.substring(0, 4) == "SPC_")
                                        Ext.Msg.alert('Error'.l('g'), r.result.l("SP_DynamicCode"));
                                    else
                                        Ext.Msg.alert('Error'.l('g'), r.result);
                                }

                            },
                            failure: function (form, response) {
                                console.log(response);
                            }
                        });
                    }
                }
            },

            'radiogroup[itemid="itemRadioGroupRightSide"]': {
                change: function (field, newValue, oldValue) {
                    var value = field.getValue().Wizard;
                    var bookingInformationForm = Ext.ComponentQuery.query('[itemid="bookingInformationRightSide"]')[0].getForm();
                    if (value == 1 || value == 2) {
                        var from = bookingInformationForm;
                        var startDate = from.findField('StartDate');
                        startDate.setValue('');
                        startDate.enable();
                        var endDate = from.findField('EndDate');
                        endDate.setValue('');
                        endDate.enable();

                        var endTime = from.findField('EndTime');
                        var endTimeStore = endTime.getStore();
                        if (typeof endTimeStore.lastOptions !== "undefined") {
                            // Grab the first value from the store
                            //endTime.setValue(endTimeStore.last().get(endTime.valueField));
                            endTime.setValue(null);
                        }
                        else {
                            // When the store loads
                            endTime.getStore().on("load", function (store, items) {
                                // Grab the first item of the newly loaded data
                                endTime.setValue(items[0].get(endTime.valueField));
                            });
                        }
                    }
                    else
                        if (value == 3) {
                            var from = bookingInformationForm;
                            var startDate = from.findField('StartDate');
                            startDate.setValue('2020-12-31');
                            var startTime = from.findField('StartTime');
                            var startTimeStore = startTime.getStore();
                            if (typeof startTimeStore.lastOptions !== "undefined") {
                                // Grab the first value from the store
                                startTime.setValue(startTimeStore.first().get(startTime.valueField));
                            }
                            else {
                                // When the store loads
                                startTime.getStore().on("load", function (store, items) {
                                    // Grab the first item of the newly loaded data
                                    startTime.setValue(items[0].get(startTime.valueField));
                                });
                            }
                            var endDate = from.findField('EndDate');
                            endDate.setValue('2020-12-31');
                            var endTime = from.findField('EndTime');
                            var endTimeStore = endTime.getStore();
                            if (typeof endTimeStore.lastOptions !== "undefined") {
                                // Grab the first value from the store
                                endTime.setValue(endTimeStore.last().get(endTime.valueField));
                            }
                            else {
                                // When the store loads
                                endTime.getStore().on("load", function (store, items) {
                                    // Grab the first item of the newly loaded data
                                    endTime.setValue(items[0].get(endTime.valueField));
                                });
                            }
                            //startDate.disable();
                            //startTime.disable();
                            //endDate.disable();
                            //endTime.disable();
                            //from.getForm().findField('Distance').disable();
                        }
                }
            },
            'button[itemid="saveEditBookingFromNav"]': {
                click: function (t, e) {
                    var formEditBookingNav = Ext.ComponentQuery.query('bookingnavigationeditbooking form[itemid="formEditBookingNav"]')[0];
                    if (formEditBookingNav.getForm().isValid()) {
                        var meetingTypeId = formEditBookingNav.getForm().findField('MeetingTypeId').getValue();
                        //  var roomSetupId = formEditBookingNav.getForm().findField('roomSetupId').getValue();
                        var noOfPeople = formEditBookingNav.getForm().findField('noofpeople').getValue();
                        var nameofbooking = formEditBookingNav.getForm().findField('BookingName').getValue();
                        var currentBookingTrackingId = formEditBookingNav.getForm().findField('BookingTrackingId').getValue();

                        if (!currentBookingTrackingId > 0) {
                            currentBookingTrackingId = 0;
                        }
                        var currentBookingId = formEditBookingNav.getForm().findField('BookingId').getValue();
                        if (!currentBookingId > 0) {
                            currentBookingId = 0;
                        }
                        var currentReservationId = formEditBookingNav.getForm().findField('ReservationId').getValue();

                        var params = {
                            id: currentBookingTrackingId,
                            id1: currentBookingId,
                            id2: noOfPeople,
                            id3: meetingTypeId,
                            // id4: roomSetupId,
                            id4: nameofbooking,
                            id5: CurrentSessionUserId,
                            id6: false
                        };

                        var params2 = {
                            id: currentBookingTrackingId,
                            id1: currentBookingId,
                            id2: noOfPeople,
                            id3: meetingTypeId,
                            // id4: roomSetupId,
                            id4: nameofbooking,
                            id5: CurrentSessionUserId,
                            id6: true
                        };
                        var localThis = this;
                        Ext.data.JsonP.request({
                            url: webAPI_path + 'api/booking/UpdateBookingFromNavigation',
                            type: "GET",
                            params: params,
                            success: function (response) {
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close()
                                }
                                if (response.confirm == true) {
                                    var CancelPer = 0;
                                    var TotalCancellation = 0;
                                    if (typeof (response.TotalCancellation) != "undefined") {
                                        TotalCancellation = response.TotalCancellation;
                                    }
                                    TotalCancellation = "€ " + Ext.util.Format.number(TotalCancellation, '0,000.00');
                                    if (typeof (response.CancelPer) != "undefined") {
                                        CancelPer = response.CancelPer;
                                    }

                                    var ResultText = response.result;
                                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                        ResultText = ResultText.l("SP_DynamicCode", TotalCancellation, CancelPer);
                                    Ext.Msg.confirm('Success'.l('g'), ResultText,
                                         function (btn) {
                                             if (btn === 'yes') {
                                                 Ext.data.JsonP.request({
                                                     url: webAPI_path + 'api/booking/UpdateBookingFromNavigation',
                                                     type: "GET",
                                                     params: params2,
                                                     success: function (response) {
                                                         localThis.callUpdateBookingAfterAPIProcess(response, me);
                                                     },
                                                     failure: function () {
                                                     }
                                                 });
                                             }
                                         });
                                }
                                else {
                                    localThis.callUpdateBookingAfterAPIProcess(response, me);
                                }

                            },
                            failure: function () {

                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close()
                                }

                                //Utils.loadWizardStepsFromOutSide(me, 734, 'step2')

                                display_alert('MG51011');
                                // Ext.Msg.alert('Error'.l('g'), 'Not saved')
                            }
                        });
                    }

                }
            },

            'button[action="bnAddBooking"]': {
                click: function (t, e, o) {
                    var companyName = "No company";
                    var st = Ext.getStore('bookingwizard.RightSide.WizardNavigationListStore');
                    if (Utils.isValid(st)) {
                        var item = st.getAt(0);
                        if (Utils.isValid(item)) {
                            companyName = item.get('CompanyName');
                        }
                    }
                    Utils.ShowWindow('widget.bookingnavigationaddbookingwindow', { companyName: companyName });
                    clearUtils();
                    me.initialTimeStore = Ext.ComponentQuery.query('[itemid="starttimeidnav"]')[0].store;
                }
            },

            'datefield[itemid="startdateidnav"]': {
                select: function (t, e, o) {//t => this, e => event, eo => Eoptional      
                    var edv = Ext.ComponentQuery.query('[itemid="enddateidnav"]');
                    for (var i = 0; i < edv.length; i++) {
                        //log("current value", e);
                        edv[i].setMinValue(e);
                        edv[i].setValue(e);
                        var addBookingForm = Ext.ComponentQuery.query('bookingnavigationaddbookingwindow form[itemid="bookingInformationRightSide"]')[0];
                        var companyId = Utils.RightPanObj.CompanyId;
                        var chkIsTrainerIncluded = addBookingForm.getForm().findField('IsTrainerIncluded');

                        if (companyId != '') {

                            var urlItem = webAPI_path + 'api/contract/GetContractTrainerInclusion';
                            Ext.data.JsonP.request({
                                url: urlItem,
                                type: 'GET',
                                params: {
                                    companyId: companyId,
                                    bookingDate: e,
                                    languageId: user_language
                                },
                                success: function (response) {

                                    if (response.success == true) {

                                        if (response.data.IsIncludedTrainerFacility == true)
                                            chkIsTrainerIncluded.setDisabled(false);
                                        else
                                            chkIsTrainerIncluded.setDisabled(true);
                                    }
                                    else
                                        chkIsTrainerIncluded.setDisabled(true);

                                },
                                failure: function (form, response) {

                                    chkIsTrainerIncluded.setDisabled(true);
                                }
                            });
                        }
                    }
                    //var ed = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="enddateid"]')[0];
                    //ed.minValue = e;
                    //ed.setValue(e);
                }
            },
            'timefield[itemid="starttimeidnav"]': {
                change: function (t, e, o) {//t => this, e => event, eo => Eoptional      
                    var edValue = new Date(Ext.ComponentQuery.query('[itemid="enddateidnav"]')[0].getValue());
                    var sdValue = new Date(Ext.ComponentQuery.query('[itemid="startdateidnav"]')[0].getValue());
                    var etObj = Ext.ComponentQuery.query('[itemid="endtimeidnav"]')[0];
                    //log("current store", etObj.getStore());
                    var difference = sdValue - edValue
                    //log("difference", difference);
                    if (difference === 0) {
                        this.loadInitialTimeStore(etObj);
                        var timeStore = etObj.store.getRange();
                        var dateToCompare = new Date(e);
                        var newStore = [];
                        for (var i = 0; i < timeStore.length; i++) {
                            var currDate = new Date(timeStore[i].data.date);
                            if (currDate > dateToCompare) {
                                newStore.push(timeStore[i]);
                            }
                        }
                        etObj.getStore().loadData(newStore);
                    }
                    else {
                        //Ext.apply(etObj, etObj.initialConfig);
                        this.loadInitialTimeStore(etObj);
                        //var min = new Date("Tue Jan 01 2008 08:30:00 GMT+0200 (GTB Standard Time)");
                        //var max = new Date("Tue Jan 01 2008 22:00:00 GMT+0200 (GTB Standard Time)");
                        ////log("initial", me.initialTimeStore.proxy.data);
                        //this.initialTimeStore.proxy.data.minValue = "08:30";
                        //this.initialTimeStore.proxy.data.maxValue = "22:00";
                        //var newStore = [];
                        //for (var i = 0; i < this.initialTimeStore.proxy.data.length; i++) {
                        //    var currDate = new Date(this.initialTimeStore.proxy.data[i].date);
                        //    if (currDate >= min && currDate <= max) {
                        //        newStore.push(this.initialTimeStore.proxy.data[i]);
                        //    }
                        //}
                        //etObj.getStore().loadData(newStore);// this.initialTimeStore.proxy.data);// this.bindStore(times, initial);
                    }
                }
            },
            'bookingnavigationaddbookingwindow': {
                beforerender: function (tp, opt) {
                    Ext.getStore('common.MeetingTypeStore').clearFilter();
                    Ext.getStore('common.MeetingTypeStore').load();
                    Ext.getStore('common.RoomSetupStore').clearFilter();
                    Ext.getStore('common.RoomSetupStore').load();

                    //                    Ext.getStore('common.PropertyForNamesStore').proxy.setExtraParam('activityCode', 'WIZA001');
                    //                    Ext.getStore('common.PropertyForNamesStore').load({});
                },
                afterrender: function (tp, opt) {
                    var combo = Ext.ComponentQuery.query('bookingnavigationaddbookingwindow combo[itemid="AddBookingFromNavigationPropCombo"]')[0];
                    combo.getStore().proxy.setExtraParam('activityCode', 'WIZA001');
                    combo.getStore().load();
                }
            },
            'bookingnavigationaddbookingwindow combo[name="LocationName"]': {
                change: function (field, newVal, oldVal) {
                    var bookingInformationForm = Ext.ComponentQuery.query('bookingnavigationaddbookingwindow [itemid="bookingInformationRightSide"]')[0].getForm();
                    bookingInformationForm.findField('Distance').setDisabled(false);
                    if (Utils.isValid(newVal)) {
                        if (newVal > 0) {
                            bookingInformationForm.findField('Distance').setDisabled(true);
                        }
                    }
                }
            },
            'button[action="addNewBookingRightSide"]': {
                click: function (t, e, o) {
                    var propertiesFound = true;
                    var propertiesList = new Array();

                    var bookingInformationForm = Ext.ComponentQuery.query('[itemid="bookingInformationRightSide"]')[0].getForm();
                    if (bookingInformationForm.isValid()) {
                        var serverObj = bookingInformationForm.getValues();
                        //log('ServerObj', serverObj);
                        //Get the store with 
                        var st = Ext.getStore('bookingwizard.RightSide.WizardNavigationListStore');
                        if (!Utils.isValid(st)) { return; }
                        //Get first el (all el has the same ReservationId)
                        var item = st.getAt(0);
                        if (!Utils.isValid(item)) { return; }

                        //log('Reservation ID', item.get('ReservationId'));
                        serverObj.ReservationId = item.get('ReservationId');
                        serverObj.CreatedBy = CurrentSessionUserId;
                        serverObj.CreatedDate = new Date();
                        serverObj.BookingName = bookingInformationForm.findField('BookingName').getValue();
                        serverObj.PropertyFeatureId = bookingInformationForm.findField('PropertyFeatureId').getValue();
                        serverObj.RoomSetupId = bookingInformationForm.findField('RoomSetupId').getValue();
                        serverObj.NumberOfPeople = bookingInformationForm.findField('NumberOfPeople').getValue();
                        serverObj.IsTrainerIncluded = bookingInformationForm.findField('IsTrainerIncluded').getValue();
                        //@Modified by Sergiu to allow Property selection and free text                        
                        var locationName = bookingInformationForm.findField('LocationName');
                        var locationValue = locationName.value;
                        if (locationValue == null) {
                            var locationRawValue = locationName.rawValue;
                            if (Utils.isValid(locationRawValue)) {
                                var distance = bookingInformationForm.findField('Distance').getValue();
                                if (distance != null) {
                                    //Means we do not have a property selected and distance is allowed
                                    serverObj.LocationName = locationRawValue;
                                    serverObj.Distance = distance;
                                    serverObj.PropertyId = null;
                                    propertiesFound = false;
                                }
                                else if (distance != null && !distance.isDisabled()) {
                                    display_alert('MG51012');
                                    // Ext.Msg.alert('Error', 'Distance is not selected');
                                    return false;
                                }
                                ////Means we do not have a property selected and distance is allowed
                                //serverObj.LocationName = locationRawValue;
                                //serverObj.Distance = bookingInformationForm.findField('Distance').getValue();
                                //serverObj.PropertyId = null;
                            }
                            else {
                                display_alert('MG51013');
                                // Ext.Msg.alert('Error', 'Property or city or postcode not selected');
                                return false;
                            }
                        }
                        else {
                            //Means we have selected a property and distance is set to null
                            serverObj.PropertyId = locationValue; //Property ID
                            serverObj.LocationName = locationName.rawValue; // Property Name
                            serverObj.Distance = null;
                            propertiesFound = true;
                            //propertiesList.push(locationValue);
                        }
                        //serverObj.PropertyId = serverObj.LocationName;
                        //serverObj.LocationName = bookingInformationForm.findField('LocationName').rawValue;



                        {//Booking type
                            var bookingTypeSelection = bookingInformationForm.findField('Wizard').getGroupValue();
                            if (bookingTypeSelection != 1 || bookingTypeSelection != 2 || bookingTypeSelection != 3) {
                                bookingTypeSelection == 1;
                            }
                            serverObj.Wizard = bookingTypeSelection;
                        }

                        {//Date time selectors
                            var stFieldValue = bookingInformationForm.findField('StartTime').getValue();
                            var etFieldValue = bookingInformationForm.findField('EndTime').getValue();
                            var sdFieldValue = bookingInformationForm.findField('StartDate').getValue();
                            var edFieldValue = bookingInformationForm.findField('EndDate').getValue();
                            var sd = Ext.Date.format(sdFieldValue, 'Y-m-d H:i:s')
                            var ed = Ext.Date.format(edFieldValue, 'Y-m-d H:i:s');
                            var startValue = new Date(stFieldValue);
                            var endValue = new Date(etFieldValue);

                            //Save date in DB only if all fields selected
                            if (stFieldValue != null && etFieldValue != null && sdFieldValue != null && edFieldValue != null) {
                                var diffHoursDate = (ed - sd) / 3600000;
                                if (diffHoursDate < 0) {
                                    display_alert('MG51014');
                                    // Ext.Msg.alert('Error', 'End date must be later than start date');
                                    return false;
                                }

                                var diffHrs = (endValue - startValue) / 3600000;
                                if (diffHrs <= 0) {
                                    display_alert('MG51015');
                                    // Ext.Msg.alert('Error', 'End time must be after start time');
                                    return false;
                                }


                                //                                if (diffHrs > 14) {
                                //                                    Ext.Msg.alert('Error', 'Time difference should be less then 12 hours.');
                                //                                    return false;
                                //                                }

                                serverObj.StartDate = sd;
                                serverObj.StartTime = Ext.Date.format(bookingInformationForm.findField('StartTime').getValue(), 'H:i');

                                serverObj.EndDate = ed;
                                serverObj.EndTime = Ext.Date.format(bookingInformationForm.findField('EndTime').getValue(), 'H:i');
                            }
                        }

                        if (!propertiesFound) {
                            var urllocationSearch = webAPI_path + 'api/booking/GetLocationsByDistanceAndOtherParams';
                            //$.when(
                            $.ajax({
                                url: urllocationSearch,
                                type: 'GET',
                                data: {
                                    distance: serverObj.Distance,
                                    languageId: user_language,
                                    locationName: serverObj.LocationName,
                                    userId: CurrentSessionUserId
                                },
                                success: function (response) {
                                    if (response.success == true) {
                                        propertiesFound = true;
                                        propertiesList = response.result;
                                        me.addBookingCall(serverObj);
                                    } else {
                                        Ext.Msg.alert('Error'.l('g'), 'Location not found'.l('g'));
                                    }
                                },
                                failure: function (form, response) {
                                    Ext.Msg.alert('Error'.l('g'), 'Location not found'.l('g'));
                                }
                            });
                        }
                        else {
                            this.addBookingCall(serverObj);
                        }

                    }
                    else {
                        // Ext.Msg.alert('Alert', 'Please, fill the required informations');
                        display_alert('MG51016');
                    }
                }
            },

            'rightintakenotes textareafield[itemid="intakeNoteSave"]': {
                blur: function () {

                    var intakeNoteComments = Ext.ComponentQuery.query('rightintakenotes textareafield[itemid="intakeNoteSave"]')[0].getValue();
                    //log('new log ', intakeNoteComments);

                    if (intakeNoteComments.length > 0) {
                        Ext.data.JsonP.request({
                            url: webAPI_path + 'api/WizardRightPanel/SaveIntakeNoteComments',
                            type: "GET",
                            params: {
                                id: Utils.RightPanObj.ReservationId, //reservation ID
                                languageId: intakeNoteComments
                            },
                            success: function (response) {
                                var r = response;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == true) {

                                } else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText)
                                }
                            },
                            failure: function () {
                                //Ext.Msg.alert('Error'.l('g'), 'Note not saved.')
                                display_alert('MG51011');

                            }
                        });
                    }
                }
            },
            'button[action="bnCopyReservationBooking"]': {
                click: function (t, e, o) {
                    Utils.ShowWindow('widget.bookingnavigationcopyreservationbooking', null);
                }
            },
            'button[action="openCompanyContract"]': {
                click: function (t, e, o) {
                    var c = me.getController('bookingwizard.BWRPCompanyContract');
                    if (c.thisController == false) {
                        c.init();
                        c.thisController = true;
                    }
                    Utils.ShowWindow('widget.companycontractwindow', null);
                }
            },
            'button[action="openCompanyContractEdit"]': {
                click: function (t, e, o) {
                    Ext.create('widget.bookingcontactlistwindow', { ItemNo: 4 }).center();


                    var c = me.getController('bookingwizard.BookingCompanySearchContact');
                    if (c.thisController == false) {
                        c.init();
                        c.thisController = true;
                    }

                    var filterBehindFieldObj = Ext.ComponentQuery.query('textfield[itemid="txtIndividualName"]');
                    var filterBehindField = ((filterBehindFieldObj.length > 0) ? filterBehindFieldObj[0] : null);

                    var fieldFilterIndividualObj = Ext.ComponentQuery.query('textfield[itemid="fieldFilterIndividual"]');
                    var fieldFilterIndividual = ((fieldFilterIndividualObj.length > 0) ? fieldFilterIndividualObj[0] : null);
                    if (fieldFilterIndividual != null)
                        fieldFilterIndividual.setValue(filterBehindField.getValue());

                    Utils.ManageContact(1, Utils.RightPanObj.CompanyId, '', Utils.RightPanObj.IndividualId, '');

                }
            },
            'bookingwizardstep6 button[action="openContactScreenForCC"]': {
                click: function (t, e, o) {
                    Ext.create('widget.bookingcontactlistwindow', { ItemNo: 5 }).center();
                    Utils.ManageContact(1, Utils.RightPanObj.CompanyId, '', 0, '');

                    var c = me.getController('bookingwizard.BookingCompanySearchContact');
                    if (c.thisController == false) {
                        c.init();
                        c.thisController = true;
                    }

                    Ext.ComponentQuery.query('bookingcompanycontactlist textfield[itemid="fieldFilterIndividual"]')[0].setValue(null);

                }
            },
            'bookingwizardstep6 button[action="openContactScreenForBCC"]': {
                click: function (t, e, o) {
                    Ext.create('widget.bookingcontactlistwindow', { ItemNo: 6 }).center();
                    Utils.ManageContact(1, Utils.RightPanObj.CompanyId, '', 0, '');

                    var c = me.getController('bookingwizard.BookingCompanySearchContact');
                    if (c.thisController == false) {
                        c.init();
                        c.thisController = true;
                    }
                    Ext.ComponentQuery.query('bookingcompanycontactlist textfield[itemid="fieldFilterIndividual"]')[0].setValue(null);
                }
            },
            //            'bookingcontactlistwindow button[action="selectIndividual"]': {
            //                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
            //                    this.SelectIndividual(me);
            //                }
            //            },
            'bookingcontactlistwindow button[action="searchIndividualButtonAction"]': {
                click: function () {
                    me.FilterIndividuals();
                }
            },
            'bookingcontactlistwindow textfield[itemid="fieldFilterIndividual"]': {
                render: function (cmp) {
                    cmp.getEl().on('keypress', function (e) {
                        if (e.getKey() == e.ENTER) {
                            me.FilterIndividuals();
                        }
                    });
                }
            },
            'companyagencywindow': {
                afterrender: function () {//t => this, e => event, eo => Eoptional                    
                    var agencyFormWin = Ext.ComponentQuery.query('companyagencywindow [itemid="agencySettingsWin"]')[0];
                    agencyFormWin.getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/WizardRightPanel/GetAgencyDetailsFromIntakeNote',
                        params: {
                            id: Utils.RightPanObj.ReservationId,
                            languageId: user_language
                        },
                        success: function (form, response) {
                            var r = response.result;
                            if (r.data.AgencyCompanyId != null) {
                                Ext.ComponentQuery.query('companyagencywindow [itemid="radioAgencySelectCompany"]')[0].setValue(true);
                                Ext.ComponentQuery.query('companyagencywindow [itemid="radioAgencySelectCompany"]')[0].boxLabelEl.update(r.data.CompanyName);
                            }
                            else {
                                Ext.ComponentQuery.query('companyagencywindow [itemid="radioAgency"]')[0].setValue(true);
                            }

                        }
                    })
                }
            },
            'button[action="openCompanyAgency"]': {
                click: function (t, e, o) {
                    Utils.ShowWindow('widget.companyagencywindow', null);
                }
            },
            'companyagencywindow radiofield[itemid="radioAgency"]': {
                change: function (t, e, o) {
                    if (e) { //Checked                        
                        var btnSearchCompanyAgency = Ext.ComponentQuery.query('companyagencywindow button[itemid="btnSearchCompanyAgency"]')[0];
                        btnSearchCompanyAgency.setDisabled(true);
                    }

                }
            },
            'companyagencywindow radiofield[itemid="radioAgencySelectCompany"]': {
                change: function (t, e, o) {
                    if (e) { //Checked

                        var btnSearchCompanyAgency = Ext.ComponentQuery.query('companyagencywindow button[itemid="btnSearchCompanyAgency"]')[0];
                        btnSearchCompanyAgency.setDisabled(false);
                    }
                }
            },
            'companyagencywindow button[action="saveAgencyDetailsFromIntakeNote"]': {
                click: function (t, e, o) {
                    var agencyFormWin = Ext.ComponentQuery.query('companyagencywindow [itemid="agencySettingsWin"]')[0];
                    var agencySelectCompany = Utils.getFirstComp(Ext.ComponentQuery.query('companyagencywindow radiofield[itemid="radioAgencySelectCompany"]'));
                    var OtherAgencyCompanyId = agencyFormWin.getForm().findField('AgencyCompanyId').getValue();
                    if (agencySelectCompany.getValue() == true && OtherAgencyCompanyId <= 0) {
                        Ext.Msg.alert('Error'.l('g'), 'Please, select the company for invoice'.l('g'));
                        return false;
                    }

                    if (agencyFormWin.getForm().isValid()) {

                        agencyFormWin.getForm().submit({
                            url: webAPI_path + 'api/WizardRightPanel/UpdateAgencyDetailsFromIntakeNote',
                            method: 'POST',
                            data: agencyFormWin,
                            success: function (form, response) {
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close()
                                }
                            },
                            failure: function (form, response) {
                                var r = response;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == false) {
                                    Ext.Msg.alert('Error'.l('g'), ResultText)
                                } else {
                                    Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'))
                                }
                            }
                        })
                    }

                }
            },

            'rightbookingnavigation button[action="bnCancelWindow"]': {
                click: function (t, e, o) {
                    Ext.create('widget.bookingnavigationcancelwindow',
                        {
                            ReservationId: Utils.RightPanObj.ReservationId,
                            BookingEventId: Utils.RightPanObj.BookingEventId,
                            BookingId: Utils.RightPanObj.BookingId,
                            typeCancellation: 'Reservation'

                        }).show();
                    //Ext.create('widget.bookingnavigationcancelwindow', { BookingId: 2 }).show();
                }
            },
            'bookingnavigationcancelwindow': {
                afterrender: function (t, e, o) {
                    //Ext.getStore('common.CancellationReasonStore').load();

                    var BookingEventId = t.BookingEventId;
                    var BookingId = t.BookingId;
                    var ReservationId = t.ReservationId;

                    var combo = Ext.ComponentQuery.query('bookingnavigationcancelwindow combo[itemid="CancellationReason"]')[0];
                    combo.getStore().load({
                        callback: function (records, o, success) {
                            combo.getStore().insert(0, { "CancellationReasonId": 0, "Reason": "Other Reason" }, true);
                        }
                    });

                    var grid = Ext.ComponentQuery.query('bookingnavigationcancelwindow grid[itemid="CompetitorsList"]')[0];
                    grid.getStore().load();

                    Ext.getStore('bookingwizard.RightSide.SalesInfoCompetitorStore').load();

                    /*Component disabled*/
                    Ext.ComponentQuery.query('bookingnavigationcancelwindow combo[itemid="CancellationReason"]')[0].enable();
                    Ext.ComponentQuery.query('bookingnavigationcancelwindow grid[itemid="CompetitorsList"]')[0].enable();
                    Ext.ComponentQuery.query('bookingnavigationcancelwindow textarea[name="OtherReason"]')[0].enable();

                    /*Cancel reservation*/
                    if (t.typeCancellation == 'Reservation') {
                        BookingEventId = 0;
                        BookingId = 0;
                    }
                    else if (t.typeCancellation == 'BookingEvent') {
                        ReservationId = 0;
                        BookingId = 0;
                        /*Component disabled*/
                        Ext.ComponentQuery.query('bookingnavigationcancelwindow combo[itemid="CancellationReason"]')[0].disable();
                        Ext.ComponentQuery.query('bookingnavigationcancelwindow grid[itemid="CompetitorsList"]')[0].disable();
                        Ext.ComponentQuery.query('bookingnavigationcancelwindow textarea[name="OtherReason"]')[0].disable();

                    }
                    else if (t.typeCancellation == 'Booking') {
                        ReservationId = 0;
                        BookingEventId = 0;
                    }

                    Ext.getStore('bookingwizard.RightSide.CostOfCancelationStore').proxy.setExtraParam('id', CurrentSessionUserId);
                    Ext.getStore('bookingwizard.RightSide.CostOfCancelationStore').proxy.setExtraParam('id1', BookingEventId);
                    Ext.getStore('bookingwizard.RightSide.CostOfCancelationStore').proxy.setExtraParam('id2', BookingId);
                    Ext.getStore('bookingwizard.RightSide.CostOfCancelationStore').proxy.setExtraParam('id3', ReservationId);
                    Ext.getStore('bookingwizard.RightSide.CostOfCancelationStore').proxy.setExtraParam('id4', 0);

                    Ext.getStore('bookingwizard.RightSide.CostOfCancelationStore').load({
                        callback: function (records, o, success) {

                            if (o && o.response) {
                                var cancelPercentage = Ext.ComponentQuery.query('bookingnavigationcancelwindow [itemid="cancelPercentage"]')[0];
                                cancelPercentage.setValue(o.response.CanPercentage);
                                var cancelValue = Ext.ComponentQuery.query('bookingnavigationcancelwindow [itemid="cancelValue"]')[0];
                                cancelValue.setValue(o.response.TotalCancellation);
                                // log('success => ', success);

                                var hcCanPercentage = Ext.ComponentQuery.query('bookingnavigationcancelwindow [itemid="hcCanPercentage"]')[0];
                                hcCanPercentage.setValue(o.response.hcCanPercentage);
                                var hcTotalCancellation = Ext.ComponentQuery.query('bookingnavigationcancelwindow [itemid="hcTotalCancellation"]')[0];
                                hcTotalCancellation.setValue(o.response.hcTotalCancellation);


                                var CanLevel = Ext.ComponentQuery.query('bookingnavigationcancelwindow [itemid="CanLevel"]')[0];
                                CanLevel.setValue(o.response.CanLevel);
                            }
                        }
                    });
                }
            },
            'bookingnavigationcancelwindow panel[itemid="costOfCancelationId"]': {
                expand: function (p, opt) {
                    //bookingId, long? , int priceType  
                    return; //by pratik not used now
                    var costOfCanStore = Ext.getStore('bookingwizard.RightSide.CostOfCancelationStore');
                    costOfCanStore.load({
                        params: {
                            'id': Utils.RightPanObj.BookingId, //bookingId
                            'id1': Utils.RightPanObj.BookingTrackingId, //bookingTrackingId
                            'id2': null,
                            'languageId': 2 // price Type
                        }
                    });

                    Ext.getStore('common.CancellationReasonStore').load();

                    Utils.ShowWindow('widget.bookingnavigationcancelwindow', null);
                }
            },
            'bookingnavigationcancelwindow textfield[itemid="txtPercentage"]': {
                blur: function (t, eOpts) {
                    return
                    if (t.getValue() > 0) {
                        var costOfCanStore = Ext.getStore('bookingwizard.RightSide.CostOfCancelationStore');
                        costOfCanStore.load({
                            params: {
                                'id': Utils.RightPanObj.BookingId, //bookingId
                                'id1': Utils.RightPanObj.BookingTrackingId, //bookingTrackingId
                                'id2': t.getValue(),
                                'languageId': 2 // price Type
                            }
                        });
                    }
                }
            },
            'button[action="bnChangeStatus"]': {
                click: function (t, e, o) {
                    Utils.ShowWindow('widget.bookingnavigationchangereservationstatus', null);
                }
            },
            //ReservationStatusChangeStore
            'bookingnavigationchangereservationstatus': {
                afterrender: function () {
                    var resStatusChange = Ext.getStore('bookingwizard.ReservationStatusChangeStore');
                    resStatusChange.proxy.setExtraParam('id', Utils.RightPanObj.ReservationId); //ReservationId        
                    resStatusChange.proxy.setExtraParam('languageId', user_language); // languageId
                    resStatusChange.load();
                }
            },
            'bookingnavigationchangereservationstatus button[action="saveReservationStatus"]': {
                click: function (t, e, o) {
                    var resStatusGrid = Ext.ComponentQuery.query('bookingnavigationchangereservationstatus grid[itemid="reservationStatusGrid"]')[0];
                    /*
                    //log('store', resStatusGrid.store.data);
                    var bookingIds = '';                    
                    var resStatus = resStatusGrid.store.data;
                    if (resStatus != null && resStatus.length > 0) {
                    for (var i = 0; i < resStatus.length; i++) {
                    //if (resStatus.items[i].data.Checked == "1")
                    bookingIds += resStatus.items[i].data.BookingId + ",";                            
                    }
                    }

                    bookingIds = bookingIds.replace(/\,$/, '');

                    //alert(bookingIds + "Res " + reservationId);
                    */

                    var recordsToSend = [];
                    var alldata = resStatusGrid.getStore().getRange();

                    var gotoStep2 = false;
                    if (alldata.length > 0) {
                        Ext.each(alldata, function (rec) {
                            if (!gotoStep2) gotoStep2 = rec.data.IsOffStatus && rec.data.StatusId > 1;
                            recordsToSend.push(rec.data);
                        });
                    }

                    //log('recordsToSend', recordsToSend);
                    var newObj = new Object();
                    newObj.UpdatedBy = CurrentSessionUserId;
                    newObj.ChangeBookingStatusList = Ext.encode(recordsToSend);
                    //log('newObj', newObj);

                    Ext.Ajax.request({
                        url: webAPI_path + 'api/booking/SaveReservationStatus',
                        method: 'POST',
                        params: newObj,
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                var panelSteps = Ext.ComponentQuery.query('bookingwizardpanel')[0];
                                var layout = panelSteps.getLayout();
                                if (gotoStep2) {
                                    var obj = {};
                                    obj.BookingTrackingId = Utils.RightPanObj.BookingTrackingId
                                    obj.BookingId = Utils.RightPanObj.BookingId
                                    Utils.ActiveStepFromRightPanel(me, obj, 'step2');
                                    var c = me.getController('bookingwizard.BookingWizardStep2');
                                    if (c.thisController == false) {
                                        c.init();
                                        c.thisController = true;
                                    }
                                    c.loadMultiDayLeftPanel();
                                }
                                else if (layout.activeItem.itemid == "stepfive") {

                                    var BookingId = Utils.RightPanObj.BookingId;
                                    var BookingTrackingId = Utils.RightPanObj.BookingTrackingId;
                                    var ReservationId = Utils.RightPanObj.ReservationId;

                                    var obj = new Object;
                                    obj.BookingTrackingId = BookingTrackingId > 0 ? BookingTrackingId : 0;
                                    obj.BookingId = BookingId > 0 ? BookingId : 0;
                                    obj.ReservationId = r.data.ReservationId;

                                    Utils.loadSteps(me, obj, 'step5');

                                    var c5 = me.getController('bookingwizard.BookingWizardStep5');
                                    if (c5.thisController == false) {
                                        c5.init();
                                        c5.thisController = true;
                                    }
                                    Ext.ComponentQuery.query('bookingwizardstep5 [itemid="DefaultStatus"]')[0].setValue(c5.stepFiveObject.DefaultStatus);
                                }
                                else if (layout.activeItem.itemid == "stepfour") {
                                    var BookingId = Utils.RightPanObj.BookingId;
                                    var BookingTrackingId = Utils.RightPanObj.BookingTrackingId;
                                    var ReservationId = Utils.RightPanObj.ReservationId;

                                    var obj = new Object;
                                    obj.BookingTrackingId = BookingTrackingId > 0 ? BookingTrackingId : 0;
                                    obj.BookingId = BookingId > 0 ? BookingId : 0;
                                    obj.ReservationId = r.data.ReservationId;

                                    Utils.loadSteps(me, obj, 'step4');
                                }
                                else if (layout.activeItem.itemid == "stepsix") {
                                    var c6 = me.getController('bookingwizard.BookingWizardStep6');
                                    c6.updateBookingListGrid(new Object);
                                }

                                Utils.UpdateBookingNavigationList(Utils.RightPanObj.ReservationId);
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function () {
                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        }
                    });

                }
            },
            'rightbookingnavigation [itemid="gridBookingNavigation"]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    //log('zRec', zRec);
                    //log('iColIdx', iColIdx);

                    var stepNum = 2;
                    if (zRec.data.StepNumber != null) {
                        stepNum = zRec.data.StepNumber;
                    }
                    var bookingId = 0;
                    var obj = [];
                    obj.BookingTrackingId = zRec.data.BookingTrackingId;
                    if (Utils.isValid(zRec.data.BookingId)) {
                        bookingId = zRec.data.BookingId;
                    }
                    obj.BookingId = bookingId;

                    switch (iColIdx) {
                        case 0:
                            //Utils.loadSteps(this, zRec.data.BookingTrackingId, "step" + stepNum);
                            Utils.ActiveStepFromRightPanel(me, obj, "step" + stepNum);
                            break;
                        case 1:
                            //Utils.loadSteps(this, zRec.data.BookingTrackingId, "step" + stepNum);
                            Utils.ActiveStepFromRightPanel(me, obj, "step" + stepNum);
                            break;
                        case 2:
                            if (zRec.data.StepNumber >= 1) {
                                //Sergiu changed from
                                //Utils.loadSteps
                                //  Utils.loadWizardStepsFromOutSide(me, obj, 'step2')
                                /*@PV: changed call,as if card is already created then only activated it*/
                                if (zRec.data.StatusId != 7 && zRec.data.StatusId != 8 && zRec.data.StatusId != 9)
                                    Utils.ActiveStepFromRightPanel(me, obj, 'step2');
                                // Utils.loadSteps(me, obj, 'step2')
                            }
                            break;
                        case 3:
                            if (zRec.data.StepNumber >= 2) {
                                //Sergiu changed from 
                                //Utils.loadSteps
                                //Utils.loadWizardStepsFromOutSide(me, obj, 'step3')
                                //Utils.loadSteps(me, obj, 'step3')
                                /*@PV: changed call,as if card is already created then only activated it*/
                                if (zRec.data.StatusId != 7 && zRec.data.StatusId != 8 && zRec.data.StatusId != 9) {
                                    obj.StatusId = zRec.data.StatusId; ;
                                    obj.Status = zRec.data.StatusId; ;
                                    var stepThreeLayout = Ext.ComponentQuery.query('bookingwizardpanel panel[itemid="stepthree"] > panel')[0];
                                    if (stepThreeLayout) {
                                        if (stepThreeLayout.StatusId == obj.StatusId) {
                                            Utils.ActiveStepFromRightPanel(me, obj, 'step3');
                                        }
                                        else {
                                            Utils.loadSteps(me, obj, 'step3')
                                        }
                                    }
                                    else {
                                        Utils.ActiveStepFromRightPanel(me, obj, 'step3');
                                    }

                                }
                            }
                            break;
                        case 4:
                            //Sergiu changed from
                            //Utils.loadSteps
                            // Utils.loadSteps(me, zRec.data.BookingTrackingId, 'step4')
                            if (zRec.data.StepNumber >= 3) {
                                //Utils.loadWizardStepsFromOutSide(me, obj, 'step4')
                                // Utils.loadSteps(me, obj, 'step4')
                                /*@PV: changed call,as if card is already created then only activated it*/
                                if (zRec.data.StatusId != 7 && zRec.data.StatusId != 8 && zRec.data.StatusId != 9)
                                    Utils.ActiveStepFromRightPanel(me, obj, 'step4');
                            }
                            break;
                        case 5:
                            //Sergiu changed from
                            //Utils.loadSteps
                            //Utils.loadSteps(me, zRec.data.BookingTrackingId, 'step5')
                            if (zRec.data.StepNumber >= 4) {
                                obj.StatusId = zRec.data.StatusId;
                                obj.Status = zRec.data.StatusId;

                                var stepFiveLayout = Ext.ComponentQuery.query('bookingwizardpanel panel[itemid="stepfive"] > panel')[0];
                                if (stepFiveLayout) {
                                    if (stepFiveLayout.StatusId == obj.StatusId) {
                                        Utils.ActiveStepFromRightPanel(me, obj, 'step5');
                                    }
                                    else {
                                        Utils.loadSteps(me, obj, 'step5')
                                    }
                                }
                                else {
                                    Utils.ActiveStepFromRightPanel(me, obj, 'step5');
                                }
                            }
                            break;
                        case 6: //Booking history                            
                            Utils.ShowWindow('widget.bookingnavigationbookinghistory', { BookingId: bookingId });
                            break;
                        case 7: //Copy reservation/boooking.

                            if (zRec.data.Step5 == true //&& (zRec.data.OriginalStatusId != 7 && zRec.data.OriginalStatusId != 8 && zRec.data.OriginalStatusId != 9)
                                ) {
                                var urlItem = webAPI_path + 'api/WizardRightPanel/GetCopyBookingData';
                                Ext.data.JsonP.request({
                                    url: urlItem,
                                    type: 'GET',
                                    params: {
                                        id: obj.BookingId,
                                        id1: obj.BookingTrackingId
                                    },
                                    success: function (response) {
                                        //log("resp", response);
                                        if (!Utils.isValid(response[0])) {
                                            Ext.Msg.alert('Error'.l('g'), "No events added to booking");
                                            return false;
                                        }
                                        response = response[0];
                                        obj.bookingName = response.BookingName;
                                        obj.bookingStartDate = Ext.Date.format(new Date(response.BookingDate), 'Y-m-d');
                                        obj.bookingEndDate = Ext.Date.format(new Date(response.BookingEndDate), 'd-m-Y');
                                        obj.bookingStartTime = response.FromTime;
                                        obj.bookingEndTime = response.ToTime;

                                        /// find the date difference for copy booking
                                        var sdJs = new Date(response.BookingDate);
                                        var edJs = new Date(response.BookingEndDate);
                                        var dayDifference = (edJs - sdJs) / (1000 * 60 * 60 * 24); //Convert into day
                                        obj.dayDifference = dayDifference;
                                        var childrenObj = new Array();
                                        var ch = response.children;
                                        for (var i = 0; i < ch.length; i++) {
                                            childrenObj.push([ch[i].text, ch[i].IsDisabled, ch[i].BookingTrackingId, ch[i].BookingId, ch[i].BookingEventId, ch[i].BookingEventTrackingId, ch[i].BookingEventDate]);
                                        }
                                        obj.children = childrenObj;
                                        Utils.ShowWindow('widget.bookingnavigationcopyreservationbooking', { bookingData: obj });

                                    },
                                    failure: function (response) {
                                        //Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                    }
                                });
                            }

                            break;
                        case 8: //Cancel reservation
                            //Utils.ShowWindow('widget.bookingnavigationcancelwindow', null);
                            me.OpenCancelBooking(zRec);
                            break;
                        case 9: //Edit booking   
                            if (zRec.data.OriginalStatusId != 7 && zRec.data.OriginalStatusId != 8 && zRec.data.OriginalStatusId != 9) {
                                me.editBookingFromNav(zRec); //Utils.ShowWindow('widget.bookingnavigationeditbooking', null);
                            }
                            break;
                        case 10: //bookingcancellation event window
                            if (zRec.data.OriginalStatusId == 7 || zRec.data.StatusId == 7)
                                me.cancelBookingEventItemList(zRec); //Utils.ShowWindow('widget.bookingnavigationeditbooking', null);
                            break;
                        default:
                            break;
                    }
                }
            },
            'bookingnavigationcopyreservationbooking datefield[itemid="copystartdateid"]': {
                change: function (dp, newValue, oldValue, eOpts) {
                    var dayDifference = Ext.ComponentQuery.query('[itemid="dayDifference"]')[0].getValue();
                    if (newValue != oldValue) {
                        var newDate = new Date(newValue.getTime() + parseInt(dayDifference) * 24 * 60 * 60 * 1000);
                        var endDateLabel = Ext.ComponentQuery.query('[itemid="EndDateLabel"]')[0];
                        //var endDate2 = Ext.ComponentQuery.query('[itemid="enddateid"]')[0];
                        endDateLabel.setValue(Ext.Date.format(newDate, 'd-m-Y'));
                        //endDate2.setValue(Ext.Date.format(newDate, 'd-m-Y'));
                    }

                }
            },
            'button[action="copyBookingAction"]': {
                click: function (t, e, o) {//t => this, e => event, eo => Eoptional                               
                    var startDate = Ext.ComponentQuery.query('[itemid="copystartdateid"]')[0].getValue();
                    //log("sd", startDate);
                    var obj = new Object();

                    var eventsChecked = new Array();
                    var eventId = "";
                    var eventTrackingId = "";
                    var items = $('[id^="eventcheck_"]');
                    var forServerarray = new Array();
                    items.each(function (i) {
                        var el = $(items[i]);
                        if (el.is(':checked')) {
                            var selectedItemId = el.attr('data-eventid');
                            Utils.push(eventsChecked, selectedItemId);
                            if (selectedItemId != null && selectedItemId != "null") {
                                eventId = eventId + selectedItemId + ',';
                            }
                            var selectedItemTrackingId = el.attr('data-eventtrackingid');
                            if (selectedItemTrackingId != null && selectedItemTrackingId != "null") {
                                eventTrackingId += selectedItemTrackingId + ",";
                            }
                        }
                    });
                    //log('eventTrackingId before replace', eventTrackingId);
                    eventId = eventId.replace(/\,$/, '');
                    eventTrackingId = eventTrackingId.replace(/\,$/, '');
                    //log('eventTrackingId after replace', eventTrackingId);
                    obj.bookingId = Ext.ComponentQuery.query('[itemid="CopyBookingId"]')[0].getValue();
                    obj.bookingTrackingId = Ext.ComponentQuery.query('[itemid="CopyBookingTrackingId"]')[0].getValue();
                    //obj.eventIds = eventsChecked; 
                    //log('obj.eventIds', eventId);
                    if (Utils.isValid(eventId) && eventId != "null" && eventId != null) {
                        obj.eventIds = eventId;
                    } else {
                        obj.eventIds = 0;
                    }

                    obj.eventsTrackingIds = eventTrackingId;
                    obj.startDate = startDate;
                    obj.priceFlag = Ext.ComponentQuery.query('[name="priceFlag"]')[0].value;
                    obj.UserId = CurrentSessionUserId;
                    obj.IsSkipContractCheck = false;
                    //log("obj", obj);
                    var urlItem = webAPI_path + 'api/WizardRightPanel/SaveCopyBookingData';
                    Ext.data.JsonP.request({
                        url: urlItem,
                        type: 'GET',
                        params: { param: Ext.encode(obj) },
                        success: function (response) {
                            if (response.confirm == false && response.success == true) {

                                //log('Case 1 ', 'Redirect to new booking');
                                var nObj = {};
                                nObj.BookingId = obj.bookingId;
                                //log('new booking trackind id', response.NewBookingTrackingId);
                                nObj.BookingTrackingId = response.NewBookingTrackingId;
                                isRquiredReloadStep = true;
                                Utils.ActiveStepFromRightPanel(me, nObj, 'step2');
                                Ext.ComponentQuery.query('[itemid="gridBookingNavigation"]')[0].getStore().reload();
                                return;
                            }
                            if (response.confirm) {
                                var ResultText = response.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.MessageBox.confirm('Alert', ResultText, function (btn) {
                                    if (btn === 'yes') {
                                        obj.IsSkipContractCheck = true;
                                        //log('Second call obj is', obj);
                                        Ext.data.JsonP.request({
                                            url: urlItem,
                                            type: 'GET',
                                            params: { param: Ext.encode(obj) },
                                            success: function (response) {

                                                if (response.success) {
                                                    var nObj = {};
                                                    nObj.BookingId = obj.bookingId;
                                                    //log('new booking trackind id', response.NewBookingTrackingId);
                                                    nObj.BookingTrackingId = response.NewBookingTrackingId;
                                                    Utils.ActiveStepFromRightPanel(me, nObj, 'step2');
                                                    Ext.ComponentQuery.query('[itemid="gridBookingNavigation"]')[0].getStore().reload();
                                                } else {
                                                    var ResultText = response.result;
                                                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                                        ResultText = ResultTest.l("SP_DynamicCode");
                                                    if (ResultText.substring(0, 4) == "SPC_")
                                                        ResultText = ResultText.l("SP_DynamicCode");
                                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                                }
                                            }
                                        }
                                        );
                                    } else {
                                        return;
                                    }
                                });
                            }


                            //log("resp", response);
                            ////        if (!Utils.isValid(response[0])) {
                            ////            Ext.Msg.alert('Error'.l('g'), "No events added to booking");
                            ////            return false;
                            ////        }
                            //response = response[0];
                            //obj.bookingName = response.BookingName;
                            //obj.bookingStartDate = Ext.Date.format(new Date(response.BookingDate), 'Y-m-d');
                            //obj.bookingEndDate = Ext.Date.format(new Date(response.BookingEndDate), 'Y-m-d');
                            //obj.bookingStartTime = response.FromTime;
                            //obj.bookingEndTime = response.ToTime;
                            //var childrenObj = new Array();
                            //var ch = response.children;
                            //for (var i = 0; i < ch.length; i++) {
                            //    log("i", i);
                            //    childrenObj.push([ch[i].text, ch[i].IsDisabled, ch[i].BookingTrackingId, ch[i].BookingId, ch[i].EventId]);
                            //    log("childrenObj", childrenObj);
                            //}
                            //obj.children = childrenObj;
                            //log("obj", obj);

                        },
                        failure: function (response) {
                            //Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        }
                    });
                }
            },
            '[itemid="gridInvoices"]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    if (iColIdx == 4) { //Change invoice header
                        //Utils.ShowWindow('widget.invoicechangeinvoice', null);
                        var obj = iView.getRecord(iRowEl);
                        Ext.create('widget.invoicechangeinvoice', { BookingCreditDebitInvoiceId: obj.data.BookingCreditDebitInvoiceId }).show();
                    }
                    else if (iColIdx == 5) { //download
                        var obj = iView.getRecord(iRowEl);
                        if (iRecord.data.InvoiceFileName == null || iRecord.data.InvoiceFileName.trim() == "") {
                            return true;
                        }
                        else {
                            me.DownloadInvoiceItem(obj.data.BookingCreditDebitInvoiceId);
                        }
                    }
                    /*Get Controller*/
                    var cr = me.getController('bookingwizard.BookingInvoiceSettings');
                    if (cr.thisController == false) {
                        cr.init();
                        cr.thisController = true;
                    }
                }
            },
            'invoices button[action="bnAddInvoice"]': {
                click: function (t, e, o) {//t => this, e => event, eo => Eoptional   
                    /*Get Controller*/
                    var me = this;
                    if (Ext.ComponentQuery.query('invoices grid[itemid="gridInvoices"]')[0].getStore().getRange().length > 0) {
                        var cr = me.getController('bookingwizard.BookingInvoiceSettings');
                        if (cr.thisController == false) {
                            cr.init();
                            cr.thisController = true;
                        }
                        /*Get container*/
                        //Ext.create('widget.invoiceaddinvoice', { ReservationId: 240, BookingId: 40, BookingTrackingId: 0 }).show();
                        Ext.create('widget.invoiceaddinvoice', { ReservationId: Utils.RightPanObj.ReservationId, BookingId: Utils.RightPanObj.BookingId, BookingTrackingId: 0 }).show();
                    }
                    else {
                        Ext.Msg.alert('Warning'.l('SC61200'), 'Main invoice is not generated yet'.l('g'));
                    }
                }
            },
            'bookingnavigationchangereservationstatus button[action="draft"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional      
                    var grid = Ext.ComponentQuery.query('bookingnavigationchangereservationstatus grid[itemid="reservationStatusGrid"]')[0];
                    var alldata = grid.getStore().getRange();

                    if (alldata) {
                        var i = 0;
                        Ext.each(alldata, function (d) {
                            var record = d.data;
                            alldata[i].set('IsDraft', true);
                            alldata[i].set('IsQuotOnOff', false);
                            alldata[i].set('IsQuotWODateOnOff', false);
                            alldata[i].set('IsOptional', false);
                            alldata[i].set('IsTentative', false);
                            alldata[i].set('IsDefinite', false);
                            alldata[i].set('IsOptional2', false);
                            record.BookingStatusCode = 'DFT';
                            alldata[i].set('StatusId', 10);
                            i++;

                        })
                    }

                }
            },
            'bookingnavigationchangereservationstatus button[action="off"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional      
                    var grid = Ext.ComponentQuery.query('bookingnavigationchangereservationstatus grid[itemid="reservationStatusGrid"]')[0];
                    var alldata = grid.getStore().getRange();

                    if (alldata) {
                        var i = 0;
                        Ext.each(alldata, function (d) {
                            var record = d.data;
                            alldata[i].set('IsDraft', false);
                            alldata[i].set('IsQuotOnOff', true);
                            alldata[i].set('IsQuotWODateOnOff', false);
                            alldata[i].set('IsOptional', false);
                            alldata[i].set('IsTentative', false);
                            alldata[i].set('IsDefinite', false);
                            alldata[i].set('StatusId', 1);
                            alldata[i].set('IsOptional2', false);
                            record.BookingStatusCode = 'OFF';
                            i++;
                        })
                    }
                }
            },
            'changebookingstatus button[action="optional2"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional      
                    var grid = Ext.ComponentQuery.query('bookingnavigationchangereservationstatus grid[itemid="reservationStatusGrid"]')[0];
                    var alldata = grid.getStore().getRange();

                    if (alldata) {
                        var i = 0;
                        Ext.each(alldata, function (d) {
                            var record = d.data;
                            alldata[i].set('IsDraft', false);
                            alldata[i].set('IsQuotOnOff', false);
                            alldata[i].set('IsQuotWODateOnOff', false);
                            alldata[i].set('IsOptional', false);
                            alldata[i].set('IsTentative', false);
                            alldata[i].set('IsDefinite', false);
                            alldata[i].set('IsOptional2', true);
                            alldata[i].set('StatusId', 4);
                            record.BookingStatusCode = 'OP2';
                            i++;
                        })
                    }
                }
            },
            'bookingnavigationchangereservationstatus button[action="onf"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional      
                    var grid = Ext.ComponentQuery.query('bookingnavigationchangereservationstatus grid[itemid="reservationStatusGrid"]')[0];
                    var alldata = grid.getStore().getRange();

                    if (alldata) {
                        var i = 0;
                        Ext.each(alldata, function (d) {
                            var record = d.data;
                            alldata[i].set('IsDraft', false);
                            alldata[i].set('IsQuotOnOff', false);
                            alldata[i].set('IsQuotWODateOnOff', true);
                            alldata[i].set('IsOptional', false);
                            alldata[i].set('IsTentative', false);
                            alldata[i].set('IsDefinite', false);
                            alldata[i].set('IsOptional2', false);
                            alldata[i].set('StatusId', 2);
                            record.BookingStatusCode = 'ONF';
                            i++;
                        })
                    }
                }
            },
            'bookingnavigationchangereservationstatus button[action="optional"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional      
                    var grid = Ext.ComponentQuery.query('bookingnavigationchangereservationstatus grid[itemid="reservationStatusGrid"]')[0];
                    var alldata = grid.getStore().getRange();

                    if (alldata) {
                        var i = 0;
                        Ext.each(alldata, function (d) {
                            var record = d.data;
                            alldata[i].set('IsDraft', false);
                            alldata[i].set('IsQuotOnOff', false);
                            alldata[i].set('IsQuotWODateOnOff', false);
                            alldata[i].set('IsOptional', true);
                            alldata[i].set('IsTentative', false);
                            alldata[i].set('IsDefinite', false);
                            alldata[i].set('IsOptional2', false);
                            alldata[i].set('StatusId', 3);
                            record.BookingStatusCode = 'OPT';
                            i++;

                        })
                    }

                }
            },
            'bookingnavigationchangereservationstatus button[action="tentitive"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                         
                    var grid = Ext.ComponentQuery.query('bookingnavigationchangereservationstatus grid[itemid="reservationStatusGrid"]')[0];
                    var alldata = grid.getStore().getRange();

                    if (alldata.length > 0) {
                        var i = 0;
                        Ext.each(alldata, function (d) {
                            var record = d.data;
                            alldata[i].set('IsDraft', false);
                            alldata[i].set('IsQuotOnOff', false);
                            alldata[i].set('IsQuotWODateOnOff', false);
                            alldata[i].set('IsOptional', false);
                            alldata[i].set('IsTentative', true);
                            alldata[i].set('IsDefinite', false);
                            alldata[i].set('IsOptional2', false);
                            alldata[i].set('StatusId', 5);
                            i++;
                            record.BookingStatusCode = 'TEN';
                            //record.ten = true;
                        });
                    }
                }
            },
            'bookingnavigationchangereservationstatus button[action="definete"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional      
                    var grid = Ext.ComponentQuery.query('bookingnavigationchangereservationstatus grid[itemid="reservationStatusGrid"]')[0];
                    var alldata = grid.getStore().getRange();

                    if (alldata) {
                        var i = 0;
                        Ext.each(alldata, function (d) {
                            var record = d.data;
                            alldata[i].set('IsDraft', false);
                            alldata[i].set('IsQuotOnOff', false);
                            alldata[i].set('IsQuotWODateOnOff', false);
                            alldata[i].set('IsOptional', false);
                            alldata[i].set('IsTentative', false);
                            alldata[i].set('IsDefinite', true);
                            alldata[i].set('StatusId', 6);
                            alldata[i].set('IsOptional2', false);
                            record.BookingStatusCode = 'DEF';
                            i++;
                        })
                    }
                }
            },
            'bookingnavigationchangereservationstatus [xtype="radiorow"]': {
                checkchange: function (t, rowIndex, eo) {//t => this, e => event, eo => Eoptional      
                    var grid = Ext.ComponentQuery.query('bookingnavigationchangereservationstatus grid[itemid="reservationStatusGrid"]')[0];
                    //log('grid', grid);
                    var alldata = grid.getStore().getRange();
                    alldata[rowIndex].set('IsDraft', false);
                    alldata[rowIndex].set('IsQuotOnOff', false);
                    alldata[rowIndex].set('IsQuotWODateOnOff', false);
                    alldata[rowIndex].set('IsOptional', false);
                    alldata[rowIndex].set('IsTentative', false);
                    alldata[rowIndex].set('IsDefinite', false);
                    alldata[rowIndex].set('IsOptional2', false);
                    alldata[rowIndex].set(t.dataIndex, true);
                }
            },
            'bookingnavigationbookinghistory': {
                afterrender: function () {
                    var BookingId = Ext.ComponentQuery.query('bookingnavigationbookinghistory hidden[itemid="bookingId"]')[0];
                    var BookingNumber = Ext.ComponentQuery.query('bookingnavigationbookinghistory displayfield[itemid="bookingnumber"]')[0];
                    var BookingDate = Ext.ComponentQuery.query('bookingnavigationbookinghistory displayfield[itemid="bookingdate"]')[0];
                    var BookingName = Ext.ComponentQuery.query('bookingnavigationbookinghistory displayfield[itemid="bookingname"]')[0];
                    var BookerName = Ext.ComponentQuery.query('bookingnavigationbookinghistory displayfield[itemid="bookername"]')[0];

                    var historygrid = Ext.ComponentQuery.query('[itemid=historygrid]')[0];
                    historygrid.getStore().proxy.setExtraParam('id', BookingId.getValue());
                    historygrid.getStore().proxy.setExtraParam('languageId', user_language);
                    historygrid.getStore().load({
                        callback: function (records, o, success) {
                            BookingNumber.setValue(records[0].data.BookingNumber);
                            BookingDate.setValue(records[0].data.BookingDate);
                            BookingName.setValue(records[0].data.BookingName);
                            BookerName.setValue(records[0].data.Name);
                        }
                    });
                    //Utils.RightPanObj.BookingId
                }
            },
            'bookingeventitemlist': {
                afterrender: function (t) {
                    var BookingId = (t.datalist.BookingId == null) ? 0 : t.datalist.BookingId;
                    var BookingTrackingId = (t.datalist.BookingTrackingId == null) ? 0 : t.datalist.BookingTrackingId;

                    var localStore = Ext.getStore('bookingwizard.RightSide.BookingEventItemListStore');
                    localStore.proxy.setExtraParam('id', BookingId); // bookingID
                    localStore.proxy.setExtraParam('id1', BookingTrackingId); //bookingTrackingId
                    localStore.proxy.setExtraParam('languageId', user_language); //langaugeId

                    localStore.load();

                    var btid = this.BookingTrackingId;

                    //                    var store = Ext.getStore('bookingwizard.ItemPriceBarStore');
                    //                    store.proxy.setExtraParam('id', BookingId);
                    //                    store.proxy.setExtraParam('id1', BookingTrackingId);
                    //                    var itemID = t.datalist.ItemId;

                    //                    if (Utils.isValid(itemID)) {
                    //                        store.proxy.setExtraParam('id2', itemID);
                    //                    } else {
                    //                        store.proxy.setExtraParam('id2', 0);
                    //                    }

                    //                    var itemGroupId = t.datalist.ItemGroupId;

                    //                    if (Utils.isValid(itemGroupId)) {
                    //                        store.proxy.setExtraParam('id3', itemGroupId);
                    //                    } else
                    //                        store.proxy.setExtraParam('id3', 0);

                    //                    store.load();
                }
            },

            'bookingnavigationcancelwindow button[action="searchCompetitors"]': {
                click: function () {

                    var r = Ext.ComponentQuery.query('[itemid="searchStringCmp"]')[0].getValue();
                    Ext.getStore('bookingwizard.RightSide.SalesInfoCompetitorStore').clearFilter();
                    var regex = new RegExp("^" + r + ".*", "i");
                    Ext.getStore('bookingwizard.RightSide.SalesInfoCompetitorStore').filter("Name", regex, true, true);

                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('bookingnavigationcancelwindow [action="clearCompetitors"]')[0];
                        clearIcon.show();
                    }
                }
            },
            'bookingnavigationcancelwindow button[action="clearCompetitors"]': {
                click: function () {

                    Ext.ComponentQuery.query('[itemid="searchStringCmp"]')[0].setValue('');
                    Ext.getStore('bookingwizard.RightSide.SalesInfoCompetitorStore').clearFilter();
                    var clearIcon = Ext.ComponentQuery.query('bookingnavigationcancelwindow [action="clearCompetitors"]')[0];
                    clearIcon.hide();

                }
            },
            'bookingeventitemlist treepanel[itemid=bookingeventitemlist]': {
                edit: function (editor, e) {
                    var selectedBar = e.record.data.BarId;
                    //                    var st = Ext.getStore('bookingwizard.ItemPriceBarStore');
                    //                    var ind = st.findExact('BarId', selectedBar);
                    //                    var el = st.getAt(ind);

                    // no need to do anything with price. From this screen only red % and amt needs to be handeled: KB
                    //                    try {
                    //                        e.record.data.BarId = selectedBar;
                    //                        e.record.data.Price = el.data.Price;
                    //                    } catch (e) {

                    //                    }
                    var percentageBefore = e.originalValues.ReductionPercentage;
                    var reductionBefore = e.originalValues.Reduction;
                    var bookingEventItemDetailTrackingId = e.record.data.BookingEventItemDetailTrackingId;
                    var newTime = e.record.data.StartTimeHHMM;
                    var endTime = e.record.data.EndTimeHHMM;
                    var reductionPercentageValue = e.record.data.ReductionPercentage;

                    var reductionValue = e.record.data.Reduction;
                    var updateTimeApi = webAPI_path + 'api/Booking/UpdateItemRowEditor';

                    var obj = {};
                    obj.BookingEventItemDetailTrackingId = bookingEventItemDetailTrackingId;
                    obj.StartTime = newTime;
                    obj.DiscountValue = reductionValue;
                    obj.Price = e.record.data.Price;
                    obj.DisplayPrice = e.record.data.Price;
                    obj.EndTime = endTime;
                    obj.GroupName = e.record.data.GroupName;
                    obj.BarId = selectedBar;
                    obj.Quantity = e.record.data.Quantity;
                    obj.ServedQuantity = e.record.data.ServedQuantity;
                    obj.ItemGroupId = e.record.data.ItemGroupId;
                    obj.CreatedBy = CurrentSessionUserId;
                    obj.ItemId = e.record.data.ItemId;
                    obj.VatPercentage = e.record.data.VatPercentage;

                    if (reductionValue > obj.Price) {
                        e.record.data.Reduction = reductionBefore;
                        //  Ext.Msg.alert('Error', 'Reduction bigger than price');
                        display_alert('MG51017');
                        return;
                    }
                    if (Utils.isValid(this.BookingTrackingId)) {
                        obj.BookingTrackingId = this.BookingTrackingId;
                    }
                    else {
                        obj.BookingTrackingId = 0;
                        //                        Ext.Msg.alert('Error', 'Booking tracking id missing');
                        //                        return;
                    }

                    obj.BookingEventTrackingId = e.record.data.BookingEventTrackingId;
                    obj.BookingEventId = e.record.data.BookingEventId;
                    var item = true;
                    if (Utils.isValid(obj.ItemGroupId)) {
                        item = false;
                        obj.BarId = 1;
                    }
                    var startDate = new Date(new Date().toDateString() + ' ' + obj.StartTime);
                    var endDate = new Date(new Date().toDateString() + ' ' + obj.EndTime);

                    if (startDate >= endDate) {
                        //Ext.Msg.alert('Error', 'End date is before start');
                        display_alert('MG51014');
                        return;
                    }
                    //User changed the percentage

                    if (percentageBefore != reductionPercentageValue && reductionPercentageValue != null && reductionPercentageValue > 0) {

                        var value = (reductionPercentageValue * obj.Price) / 100;
                        obj.DiscountValue = value;
                        obj.DiscountPercentage = reductionPercentageValue;
                        e.record.data.Reduction = value;

                        if (value == null) { value = 0; }
                        e.record.data.TotalPrice = (obj.Price - value) * obj.Quantity;

                    } else {
                        if (reductionBefore != reductionValue) { //User changed reduction

                            obj.DiscountValue = reductionValue;
                            obj.DiscountPercentage = null;
                            e.record.data.ReductionPercentage = null;
                            e.record.data.Reduction = reductionValue;
                            if (value == null) { value = 0; }
                            e.record.data.TotalPrice = (obj.Price - value) * obj.Quantity;

                        }
                    }

                    obj.DetailIds = e.record.data.DetailIds
                    obj.TrackingIds = e.record.data.TrackingIds

                    if (e.record.parentNode != null && e.record.parentNode.data != null && e.record.parentNode.data.ItemId != null && e.record.parentNode.data.ItemId != '') {

                        obj.BookingEventId = e.record.parentNode.data.BookingEventId;
                        obj.BookingEventTrackingId = e.record.parentNode.data.BookingEventTrackingId;

                        obj.DetailIds = e.record.parentNode.data.DetailIds;
                        obj.TrackingIds = e.record.parentNode.data.TrackingIds;
                    }

                    $.get(updateTimeApi, { obj: obj, isItem: item, isConfirmed: true },
                      function (response) {
                          var store = Ext.getStore('bookingwizard.RightSide.BookingEventItemListStore');
                          //store.removeAll();
                          store.reload();
                      });
                },
                beforeedit: function (editor, e, eOpts) {

                    var depth = e.record.data.depth;

                    if (e.record.data.ItemId > 0 && depth > 1) {
                        this.disableField(editor, 6, e); //Item then red amount enable and % disable
                        this.enableField(editor, 7, e);
                    }
                    else if (e.record.data.ItemGroupId > 0) {
                        this.disableField(editor, 7, e); //ItemGroup then red % enable and amount disable
                        this.enableField(editor, 6, e);
                    }
                }
            }
        })
    },
    DownloadInvoiceItem: function (id) {
        var obj = new Object();
        obj.BookingCreditDebitInvoiceId = id;
        Ext.Ajax.request({
            url: webAPI_path + 'api/Invoice/DownloadInvoice',
            type: 'POST',
            params: obj,
            success: function (response) {
                var r = Ext.decode(response.responseText);
                var ResultText = r.result;
                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                    ResultText = ResultText.l("SP_DynamicCode");
                if (r.success == true) {
                    window.open(ResultText);
                    //                    var win = Ext.WindowManager.getActive();
                    //                    if (win) {
                    //                        win.close();
                    //                    }
                }
                else {
                    Ext.Msg.alert('Error'.l('g'), ResultText);
                }
            },
            failure: function (form, response) {
                r = response;
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
    editBookingFromNav: function (rec) {
        //Utils.loadSteps(this, rec.data.BookingTrackingId, "step" + (rec.data.StepNumber + 1));

        var editView = Ext.create('widget.bookingnavigationeditbooking', {
            reservationId: rec.data.ReservationId, bookingId: rec.data.BookingId, bookingTrackingId: rec.data.BookingTrackingId,
            bookingname: rec.data.BookingName, noOfPeople: rec.data.NoOfPeople, meetingType: rec.data.MeetingType, roomSetupId: rec.data.RoomSetupId,
            meetingTypeId: rec.data.MeetingTypeId
        });
    },
    loadInitialTimeStore: function (obj) {
        var min = new Date("Tue Jan 01 2008 00:00:00");
        var max = new Date("Tue Jan 01 2008 23:55:00");
        //log("initial", me.initialTimeStore.proxy.data);
        this.initialTimeStore.proxy.data.minValue = "00:00";
        this.initialTimeStore.proxy.data.maxValue = "23:55";
        var newStore = [];
        for (var i = 0; i < this.initialTimeStore.proxy.data.length; i++) {
            var currDate = new Date(this.initialTimeStore.proxy.data[i].date);
            if (currDate >= min && currDate <= max) {
                newStore.push(this.initialTimeStore.proxy.data[i]);
            }
        }
        obj.getStore().loadData(newStore); // this.initialTimeStore.proxy.data);// this.bindStore(times, initial);
    },
    addBookingCall: function (serverObj) {
        var localThis = this;
        var urlItem = webAPI_path + 'api/booking/AddBookingWizardRightSide';
        $.get(urlItem, { bookingWizard: serverObj },
             function (response) {
                 if (response.success) {
                     localThis.getBookingnavigationaddbookingwindow().close();
                     Ext.ComponentQuery.query('[itemid="gridBookingNavigation"]')[0].getStore().reload();

                     if (response.result.Data > 0) {
                         var obj = [];
                         obj.BookingTrackingId = response.result.Data;
                         obj.BookingId = 0;

                         Utils.ActiveStepFromRightPanel(localThis, obj, 'step2');
                     }
                 }
             }
             );
    }, /*SelectIndividual: function (me) {        
        ///IDENTIFICATIONS FOR CALL FROM WHICH ITS CALLED
        ///ItemNo='' call from STEP-1
        ///ItemNo='2' call from STEP-5 -> SPLIT INVOICE Button-1
        ///ItemNo='3' call from STEP-5 -> SPLIT INVOICE Button-2
        ///ItemNo='4' call from RightPanel IntakNote
        ///ItemNo='5' call from STEP-6 CC select
        ///ItemNo='5' call from STEP-6 BCC select

        var obj;

        var fromContact = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="contactInformation"]')[0];
        fromContact.getForm().findField('CompanyId').setValue(0);

        var from = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="bookingInformation"]')[0];
        from.getForm().findField('CompanyId').setValue('');
        var itemNo = Ext.ComponentQuery.query('[itemid=ItemNo]')[0].getValue();

        var ctrl = _currentApp.getController('bookingwizard.BookingWizardStep1');
        ctrl.FilterAppliedIndividual = true;
        ctrl.FilterApplied = true;
        var selectedCompnayContact = Ext.getStore('bookingwizard.CompanyContactListStore').findRecord('Checked', true);

        if (selectedCompnayContact != null && typeof selectedCompnayContact != undefined) {
            if (itemNo == '') {
                Ext.getCmp('lblSelectedCompany').setValue('');
                Ext.getCmp('contactInformation').getForm().findField('CompanyName').setValue('');
                Ext.getCmp('lblSelectedCompanyContact').setValue(selectedCompnayContact.data.IndividualName);
                Ext.getCmp('contactInformation').getForm().findField('IndividualId').setValue(selectedCompnayContact.data.IndividualId);
                Ext.getCmp('contactInformation').getForm().findField('IndividualName').setValue(selectedCompnayContact.data.IndividualName);
                var phoneField = Ext.getCmp('contactInformation').getForm().findField('ContactPhoneNumber');

                var PhoneType = Ext.getCmp('bookingInformation').getForm().findField('PhoneType').getValue();
                ////Phone priority
                if (Utils.isValid(selectedCompnayContact.data.Phone) && Utils.isValid(phoneField) && PhoneType == 'Phone') {
                    phoneField.setValue(selectedCompnayContact.data.Phone);
                }
                else if (Utils.isValid(selectedCompnayContact.data.Direct) && Utils.isValid(phoneField) && PhoneType == 'Direct') {
                    phoneField.setValue(selectedCompnayContact.data.Direct);
                }
                else if (Utils.isValid(selectedCompnayContact.data.Mobile) && Utils.isValid(phoneField) && PhoneType == 'Mobile') {
                    phoneField.setValue(selectedCompnayContact.data.Mobile);
                } else {
                    phoneField.markInvalid('');
                    phoneField.setValue('');
                }

                Utils.loadIntakeNoteData();
                var compContactPhoneField = Ext.getCmp('contactInformation').getForm().findField('ContactPhoneNumber');
                compContactPhoneField.focus();

            } else if (itemNo == '2') {
                obj = Ext.ComponentQuery.query('[itemid=CompanyName2]')[0]; obj.setValue('');
                obj = Ext.ComponentQuery.query('[itemid=CompanyId2]')[0]; obj.setValue(0);
                obj = Ext.ComponentQuery.query('[itemid=ContactId2]')[0]; obj.setValue(selectedCompnayContact.data.IndividualId);
                obj = Ext.ComponentQuery.query('[itemid=ContactName2]')[0]; obj.setValue(selectedCompnayContact.data.IndividualName);
                Ext.ComponentQuery.query('[itemid="invoicesettingslist2"]')[0].enable();
            } else if (itemNo == '3') {
                obj = Ext.ComponentQuery.query('[itemid=CompanyName3]')[0]; obj.setValue('');
                obj = Ext.ComponentQuery.query('[itemid=CompanyId3]')[0]; obj.setValue(0);
                obj = Ext.ComponentQuery.query('[itemid=ContactId3]')[0]; obj.setValue(selectedCompnayContact.data.IndividualId);
                obj = Ext.ComponentQuery.query('[itemid=ContactName3]')[0]; obj.setValue(selectedCompnayContact.data.IndividualName);
                Ext.ComponentQuery.query('[itemid="invoicesettingslist3"]')[0].enable();
            }
            else if (itemNo == 4) {
                //log('new log', selectedCompnayContact);
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/WizardRightPanel/UpdateIndividualForReservation',
                    type: "GET",
                    params: {
                        id: Utils.RightPanObj.ReservationId, //ReservationId
                        languageId: selectedCompnayContact.data.IndividualId //new IndividualId
                    },
                    success: function (response) {
                        var r = response;
                        if (r.success == true) {
                            Utils.RightPanObj.IndividualId = selectedCompnayContact.data.IndividualId;
                            var contactInfoForm = Ext.getCmp('contactInformation');
                            var lblSelectedCompanyContact = Ext.getCmp('lblSelectedCompanyContact')
                            if (contactInfoForm != null) {
                                contactInfoForm.getForm().findField('IndividualId').setValue(selectedCompnayContact.data.IndividualId);
                                contactInfoForm.getForm().findField('IndividualName').setValue(selectedCompnayContact.data.IndividualName);
                                if (lblSelectedCompanyContact != null)
                                    lblSelectedCompanyContact.setValue(selectedCompnayContact.data.IndividualName);
                            }
                            Utils.loadIntakeNoteData();
                        } else {
                            Ext.Msg.alert('Error'.l('g'), r.result)
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Record not deleted.'.l('g'))
                    }
                })
            }
            else if (itemNo == 5 && Utils.isValid(selectedCompnayContact.data.Email)) {
                var ccInput = Ext.ComponentQuery.query('bookingwizardstep6 textareafield[itemid=ccInput]')[0];
                if (ccInput.getValue().length > 0) {
                    ccInput.setValue(ccInput.getValue() + '; ' + selectedCompnayContact.data.Email);
                }
                else
                    ccInput.setValue(selectedCompnayContact.data.Email);
            }
            else if (itemNo == 6 && Utils.isValid(selectedCompnayContact.data.Email)) {
                var bccInput = Ext.ComponentQuery.query('bookingwizardstep6 textareafield[itemid=bccInput]')[0];
                if (bccInput.getValue().length > 0) {
                    bccInput.setValue(bccInput.getValue() + '; ' + selectedCompnayContact.data.Email);
                }
                else
                    bccInput.setValue(selectedCompnayContact.data.Email);
            }
        }
        else {
            if (itemNo == '') {
                Ext.getCmp('lblSelectedCompanyContact').setValue('');
                Ext.getCmp('contactInformation').getForm().findField('IndividualId').setValue(0);
                Ext.getCmp('contactInformation').getForm().findField('IndividualName').setValue('');
            } else if (itemNo == '2') {
                obj = Ext.ComponentQuery.query('[itemid=CompanyName2]')[0]; obj.setValue('');
                obj = Ext.ComponentQuery.query('[itemid=CompanyId2]')[0]; obj.setValue(0);
                obj = Ext.ComponentQuery.query('[itemid=ContactId2]')[0]; obj.setValue(0);
                obj = Ext.ComponentQuery.query('[itemid=ContactName2]')[0]; obj.setValue('');
            } else if (itemNo == '3') {
                obj = Ext.ComponentQuery.query('[itemid=CompanyName3]')[0]; obj.setValue('');
                obj = Ext.ComponentQuery.query('[itemid=CompanyId3]')[0]; obj.setValue(0);
                obj = Ext.ComponentQuery.query('[itemid=ContactId3]')[0]; obj.setValue(0);
                obj = Ext.ComponentQuery.query('[itemid=ContactName3]')[0]; obj.setValue('');
            }
        }
        me.getBookingcontactlistwindow().close();
        
    },*/
    CancellationAPICall: function (obj) {
        ///
    },
    disableField: function (editor, colIdx, e) {
        editor.grid.columns[colIdx].getEditor(e.record, e).setDisabled(true);
    },

    enableField: function (editor, colIdx, e) {
        editor.grid.columns[colIdx].getEditor(e.record, e).setDisabled(false);

    },
    FilterIndividuals: function () {
        var fieldFilterIndividualObj = Ext.ComponentQuery.query('textfield[itemid="fieldFilterIndividual"]');
        var fieldFilterIndividual = ((fieldFilterIndividualObj.length > 0) ? fieldFilterIndividualObj[0] : null);

        if (Utils.isValid(fieldFilterIndividual)) {
            var formType = Ext.ComponentQuery.query('bookcompanysearchcontactlistwindow [itemid="FormType"]')[0];
            if (formType == undefined || formType == null) {
                formType = Ext.ComponentQuery.query('bookingcontactlistwindow [itemid="FormType"]')[0];
            }
            formType.setValue(1);

            Utils.ManageContact(1, Utils.RightPanObj.CompanyId > 0 ? Utils.RightPanObj.CompanyId : 0, '', 0, fieldFilterIndividual.getValue(), true);
        }
    },
    OpenCancelBooking: function (rec) {
        if (rec.data.BookingId > 0) {
            Ext.create('widget.bookingnavigationcancelwindow',
                {
                    ReservationId: rec.data.ReservationId,
                    BookingEventId: rec.data.BookingEventId,
                    BookingTrackingId: rec.data.BookingTrackingId,
                    BookingId: rec.data.BookingId,
                    typeCancellation: 'Booking'
                }).show();
        }
    },
    cancelBookingEventItemList: function (rec) {
        Ext.create('widget.bookingeventitemlist', { datalist: rec.data }).show();
    },
    callUpdateBookingAfterAPIProcess: function (response, me) {
        var r = response;
        var CancelPer = 0;
        var TotalCancellation = 0;
        if (typeof (r.TotalCancellation) != "undefined") {
            TotalCancellation = r.TotalCancellation;
        }
        TotalCancellation = "€ " + Ext.util.Format.number(TotalCancellation, '0,000.00');
        if (typeof (r.CancelPer) != "undefined") {
            CancelPer = r.CancelPer;
        }
        var ResultText = r.result;
        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
            ResultText = ResultText.l("SP_DynamicCode", TotalCancellation, CancelPer);
        var grid = Ext.ComponentQuery.query('rightbookingnavigation grid[itemid="gridBookingNavigation"]')[0];

        grid.getStore().reload();
        /*@Pratik: commented below line. Either it should load current step of wizard or do not do anything; or give propert guidence why this step is loaded!!*/
        //   Utils.loadSteps(me, r.bookingStep2Response.BookingTrackingId, 'step2')

        if (r.success == true) {
            //Ext.getStore('extraz.ExtrazCategoriesListStore').loadPage(1) 
            /*@Pratik: if booking is update then redirect to current step of that booking*/

            if (r.bookingStep == 1) r.bookingStep = 2; //Edit mode, if step1 is passed then again open it should open step2, as after next from step1 it will not open again    
            isRquiredReloadStep = true; // from navigation if booking is updated then current step should be reload even if same booking or differnt booking
            var obj = new Object;
            obj.BookingTrackingId = r.bookingTrackingId;
            obj.BookingId = r.bookingId;
            Utils.ActiveStepFromRightPanel(me, obj, 'step' + r.bookingStep);
        }
        else {
            Ext.Msg.alert('Error'.l('g'), ResultText)
        }
    },
    enableAccording: function () {
        var panel = Ext.ComponentQuery.query('bookingwizardinfopanel')[0];
        panel.setDisabled(false);
    },
    disableAccording: function () {
        var panel = Ext.ComponentQuery.query('bookingwizardinfopanel')[0];
        panel.setDisabled(true);

    }
});
