Ext.define('Regardz.controller.bookingwizard.BookingWizardStep4', {
    extend: 'Ext.app.Controller',
    views: ['bookingwizard.BookingWizardStep4', 'bookingwizard.MeetingItems', 'bookingwizard.MeetingSharableRoomsItems', 'bookingwizard.SetNewReduction', 'bookingwizard.AddNewEvent', 'bookingwizard.AddItems', 'bookingwizard.AddRemarks', 'bookingwizard.EditEvent', 'bookingwizard.MeetingSharableRoomsOccupation', 'bookingwizard.EditMenu', 'bookingwizard.AddNewEventScheduler', 'common.ExpandedRow'],
    stores: ['configuration.ItemTypeStore', 'bookingwizard.ReservationDetails', 'bookingwizard.ReductionStore', 'bookingwizard.EventsComboStore', 'bookingwizard.EventWithItemsStore', 'property.ItemGlobalListStore', 'bookingwizard.BookingTrackingEventListStore', 'bookingwizard.MultipleDaysList', 'bookingwizard.SharableRoomsForProperty', 'bookingwizard.BookingTrackingItemsListAllStore', 'bookingwizard.BookingTrackingItemsListStore', 'configuration.ItemStore', 'configuration.MenuItemStore', 'bookingwizard.SharableRoomsForEvent', 'bookingwizard.BookingMenuListStore', 'bookingwizard.ItemPriceBarStore', 'bookingwizard.SchedulerEventStore', 'configuration.ItemCategoryStore', 'bookingwizard.GroupStore', 'common.RoomSetupStore', 'bookingwizard.MultipleDaysListEvent', 'bookingwizard.RoomSetupStore'],
    stepFourObject: {},
    thisController: false,
    //externalBookingTrackingId: null,
    //externalBookingId: null,
    bookingTrackingId: null,
    openDiscountWindow: false,
    stepThreeObj: [],

    refs: [{
        ref: 'editevent',
        selector: 'editevent'
    }, {
        ref: 'setnewreduction',
        selector: 'setnewreduction'
    }, {
        ref: 'meetingsharableroomsoccupation',
        selector: 'meetingsharableroomsoccupation'
    }, {
        ref: 'addremarks',
        selector: 'addremarks'
    },
    {
        ref: 'editmenu',
        selector: 'editmenu'
    },
    {
        ref: 'tabeventpanel',
        selector: 'tabpanel[itemid=tabeventpanel]'
    }
    ],
    init: function () {
        /*Store used in itemedit window, but loaded here as it was not set the value on 2nd time*/
        Ext.getStore('common.RoomSetupStore').load();

        var me = this;
        try {
            Ext.getCmp('move-prev').show();
            Ext.getCmp('move-prev').getEl().show();
            Ext.getCmp('move-prev').setDisabled(false);
        } catch (e) {

        }
        this.control({

            'panel [itemid="stepfour"]': {
                activate: function (t, e) {                
                    me.loadStepFourObject(me);
                    //                    Ext.getCmp('move-next').setText("Next");
                    //                    Ext.getCmp('skip-button').hide();
                }
                //@Sergiu
                //Pratik reported an issue when load step didn't work. Once issue found please add comment here
                ,
                afterrender: function (t, e) {

                    //Ext.getCmp('move-next').setText("Next");

                }

            },
            'button[action="addDiscountButtonAction"]': {
                click: function (t, e, o) {//t => this, e => event, eo => Eoptional    
                    //var store = Ext.getStore('bookingwizard.ReductionStore').load();
                    var localBookingTrackingId = me.stepFourObject.BookingTrackingId;
                    var localBookingId = me.stepFourObject.BookingId;
                    var store = Ext.getStore('bookingwizard.ReductionStore');
                    store.proxy.setExtraParam('id', localBookingId);
                    store.proxy.setExtraParam('id1', localBookingTrackingId);
                    store.proxy.setExtraParam('languageId', user_language);
                    store.load();

                    var window = Ext.WindowManager.get('idSetReduction');
                    if (!Utils.isValid(window)) {
                        window = Ext.create('widget.setnewreduction');
                    }
                    window.show();
                    window.center();
                    log('loadStepFourObject', me.stepFourObject);
                }

            },
            'button[action="setReductionAction"]': {
                click: function (t, e, o) {
                    var itemIds = new Array();
                    var betIds = new Array();
                    var reducionValue = Ext.ComponentQuery.query('[itemid="reductionText"]')[0].getValue();
                    log('reduction value', reducionValue);
                    var items = $('[id^="reductionItem_"]');

                    var gridReduction = Ext.ComponentQuery.query('[itemid="gridReduction"]')[0];


                    var forServerarray = new Array();
                    items.each(function (i) {
                        var el = $(items[i]);
                        if (el.is(':checked')) {
                            var selectedItemId = el.attr('data-itemid');
                            Utils.push(itemIds, selectedItemId);
                            Utils.push(betIds, el.attr('data-id'));
                        }
                    });



                    urlItem = webAPI_path + 'api/booking/SetReduction';

                    reducionValue = (reducionValue == null || reducionValue == 'undefined') ? 0 : reducionValue;
                    $.get(urlItem, { value: reducionValue, TrackingIds: betIds, DetailsIds: itemIds, userId: CurrentSessionUserId },
                           function (response) {

                               if (response.success == true) {
                                   me.getSetnewreduction().close();
                                   /*Update tabpanel*/
                                   var tabeventPanel = Ext.ComponentQuery.query('tabpanel[itemid=tabeventpanel]')[0];
                                   var tabActivate = tabeventPanel.getActiveTab();
                                   me.loadBookingTrackingEvents(me, tabActivate);
                                   /*----*/
                                   Utils.LoadBookingInformationForRightPane(me.stepFourObject.BookingId, me.stepFourObject.BookingTrackingId, user_language);

                               } else {
                                   Ext.Msg.alert('Error'.l('g'), response.Message);
                               }
                           });


                    //$.ajax({
                    //    url: urlItem,
                    //    type: 'POST',
                    //    data:,
                    //    success: function (form, response) {
                    //        if (response == "success") {
                    //            var win = Ext.WindowManager.getActive();
                    //            if (win) {
                    //                win.close();
                    //            }
                    //        } else {
                    //            Ext.Msg.alert('Error'.l('g'), response.Message);
                    //            success = false;
                    //        }
                    //    },
                    //    failure: function (form, response) {
                    //        Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                    //        success = false;
                    //    }
                    //});


                }
            },
            'bookingwizardstep4 button[action="addEventButtonAction"]': {
                click: function (t, e, o) {//t => this, e => event, eo => Eoptional                        
                    /*Varification for API is valid then call window-Commneted as now its not required at RAP level(TRELLO 1036)*/
                    //                    if (me.stepFourObject.BookingId > 0) {
                    //                        //Validate24HoursForBooking
                    //                        Ext.Ajax.request({
                    //                            url: webAPI_path + 'api/BookingCancellation/Validate24HoursForBooking',
                    //                            method: 'Get',
                    //                            params: { id: me.stepFourObject.BookingId, id1: 0 },
                    //                            success: function (response) {
                    //                                var r = Ext.decode(response.responseText);
                    //                                if (r.success == true) {
                    //                                    me.callEventFunction(t)
                    //                                }
                    //                                else {
                    //                                    if (r.result.substring(0, 4) == "SPC_") {
                    //                                        Ext.Msg.alert('Error'.l('g'), r.result.l("SP_DynamicCode"));
                    //                                    }
                    //                                    else {
                    //                                        Ext.Msg.alert('Error'.l('g'), r.result);
                    //                                    }

                    //                                }
                    //                            },
                    //                            failure: function (form, response) {

                    //                            }
                    //                        });
                    //                    }
                    //                    else {
                    me.callEventFunction(t)
                    // }
                    /*end*/

                }
            },
            'panel[itemid="menuItemGrid"]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //if (iColIdx != 2) {              
                    var menuDescription = Ext.ComponentQuery.query('displayfield[itemid="menuDescriptionId"]');
                    for (var i = 0; i < menuDescription.length; i++) {
                        menuDescription[i].setValue(iRecord.data.Description);
                    }
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    if (fieldName == 'ItemSelected')
                        this.GetSelectItem(iRecord.data.Description);
                    //}

                }
            },
            'button[action="SaveItemMenu"]': {
                click: function (t, e, o) {//t => this, e => event, eo => Eoptional  
                    var BEventTrackingId = Ext.ComponentQuery.query('[itemid="BEventTrackingId"]')[0].getValue();
                    var BEventId = Ext.ComponentQuery.query('[itemid="BEventId"]')[0].getValue();
                    var ItemGroupId = Ext.ComponentQuery.query('[itemid="IGroupId"]')[0].getValue();
                    var GetCMD = Ext.ComponentQuery.query('textareafield[itemid="CurrentMenuDescriptionId"]')[0].getValue();
                    var newObj = new Object();
                    newObj.BookingEventTrackingId = BEventTrackingId;
                    newObj.BookingEventId = BEventId;
                    newObj.ItemGroupId = ItemGroupId;
                    newObj.ItemMenuDiscription = GetCMD;
                    Ext.Ajax.request({
                        url: webAPI_path + 'api/Booking/SaveItemMenu',
                        method: 'POST',
                        params: newObj,
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                me.getEditmenu().close();
                                //                                var win = Ext.WindowManager.getActive();
                                //                                if (win) {
                                //                                    win.close();
                                //                                }
                                // me.callEventFunction(t)
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function (form, response) {

                        }
                    });

                }
            },

            'addnewevent': {
                afterrender: function (t, e, o) {
                    var roomsetupidaddeventObj = Ext.ComponentQuery.query('addnewevent combo[itemid="roomsetupidaddevent"]')[0];
                    if (roomsetupidaddeventObj) {
                        roomsetupidaddeventObj.getStore().load();
                    }
                }
            },

            'button[action="addEventAction"]': {
                click: function (t, e, o) {
                    //Get the form
                    var formAddEvent = Ext.ComponentQuery.query('[itemid="formAddEvent"]')[0];
                    var form = formAddEvent.getForm();


                    if (form.isValid()) {
                        var values = form.getValues();
                        var betObj = jQuery.extend(true, {}, values);
                        // var betObj = {};
                        betObj.BookingTrackingId = me.stepFourObject.BookingTrackingId;
                        betObj.BookingId = me.stepFourObject.BookingId;
                        betObj.RoomSetupId = values.RoomSetupId;

                        var evDay = values.EventDay;

                        if (Utils.isValid(evDay)) {
                            var date = Ext.Date.format(new Date(evDay), 'Y-m-d');
                            betObj.BookingEventDate = date;
                        }
                        else {
                            betObj.BookingEventDate = Ext.Date.format(new Date(me.stepFourObject.StartDate), 'Y-m-d');
                        }

                        betObj.FromTime = values.StartTime;
                        betObj.CreatedBy = CurrentSessionUserId;
                        betObj.CreatedDate = new Date();
                        betObj.Quantity = values.NoOfPerson;
                        betObj.ToTime = values.EndTime;

                        betObj.EventName = values.EventName;
                        betObj.EventId = values.EventId;
                        betObj.LanguageId = user_language;

                        betObj.GroupName = Ext.ComponentQuery.query('addnewevent combo[name="GroupName"]')[0].getValue();

                        var roomSelection = Ext.ComponentQuery.query('[itemid="addNewEventRoomSelection"]')[0].getValue();
                        if (roomSelection == true) {
                            betObj.RoomId = values.RoomId
                        }
                        else {
                            var roomId = Ext.ComponentQuery.query('[itemid="selectedRoomIdFromPlanboard"]')[0].getValue();
                            betObj.RoomId = roomId;
                        }

                        if (Utils.isValid(values.RoomId) || Utils.isValid(values.RoomId2)) {

                            if (Utils.isValid(values.RoomId2)) {
                                values.RoomId = values.RoomId2;
                                form.findField('RoomId').setValue(values.RoomId2);
                            }
                            //first time pass it FALSE
                            betObj.IsExcludeMinimumRevenueCheck = false;
                            var url = webAPI_path + 'api/Booking/CreateBookingEventTracking';
                            if (form.isValid() && betObj.RoomId > 0) {

                                Ext.Ajax.request({
                                    url: url,
                                    type: 'POST',
                                    params: betObj,
                                    success: function (response) {
                                        var r = Ext.decode(response.responseText);
                                        // var r = Ext.decode(response);
                                        // var r = response.response.responseText;

                                        //if confirm=TRUE then call method again with flag value TRUE
                                        if (r.confirm == true) {
                                            if (confirm(r.result)) {
                                                //value TRUE
                                                betObj.IsExcludeMinimumRevenueCheck = true;
                                                //call again
                                                Ext.Ajax.request({
                                                    url: url,
                                                    type: 'POST',
                                                    params: betObj,
                                                    success: function (response) {

                                                        var r = Ext.decode(response.responseText);
                                                        if (r.success == true) {
                                                            var win = Ext.WindowManager.getActive();
                                                            if (win) {
                                                                win.close();
                                                            }

                                                            //me.loadBookingTrackingEvents(me);
                                                            me.stepFourObject.BookingTrackingId = r.BookingTrackingId;
                                                            Utils.StepFourObj.BookingTrackingId = r.BookingTrackingId;
                                                            me.externalBookingTrackingId = r.BookingTrackingId;

                                                            me.loadBookingTrackingEventsTab(me, betObj.BookingEventDate);

                                                            Utils.LoadBookingInformationForRightPane(me.stepFourObject.BookingId, me.stepFourObject.BookingTrackingId, user_language);

                                                        }
                                                        else {
                                                            var MSGResult = r.result
                                                            var cTurnOver = 0;
                                                            var cPrice = 0;
                                                            if (typeof (response.Price) != "undefined") {
                                                                cPrice = response.Price;
                                                            }
                                                            cPrice = "€ " + Ext.util.Format.number(cPrice, '0,000.00');
                                                            if (typeof (response.TurnOver) != "undefined") {
                                                                cTurnOver = response.TurnOver;
                                                            }
                                                            cTurnOver = "€ " + Ext.util.Format.number(cTurnOver, '0,000.00');
                                                            if (MSGResult.substring(0, 4) == "SPC_") {
                                                                MSGResult = MSGResult.l("SP_DynamicCode", cPrice, cTurnOver);
                                                            }
                                                            Ext.Msg.alert('Error'.l('g'), MSGResult);
                                                        }
                                                    },
                                                    failure: function (form, response) {
                                                        var r = response.response.responseText;
                                                        r = Ext.decode(r);

                                                        var MSGResult = r.result
                                                        var cTurnOver = 0;
                                                        var cPrice = 0;
                                                        if (typeof (response.Price) != "undefined") {
                                                            cPrice = response.Price;
                                                        }
                                                        cPrice = "€ " + Ext.util.Format.number(cPrice, '0,000.00');
                                                        if (typeof (response.TurnOver) != "undefined") {
                                                            cTurnOver = response.TurnOver;
                                                        }
                                                        cTurnOver = "€ " + Ext.util.Format.number(cTurnOver, '0,000.00');
                                                        if (MSGResult.substring(0, 4) == "SPC_") {
                                                            MSGResult = MSGResult.l("SP_DynamicCode", cPrice, cTurnOver);
                                                        }
                                                        Ext.Msg.alert('Error'.l('g'), MSGResult); // 'Information not saved.');
                                                    }
                                                });
                                            }
                                        } else if (r.success == true) {

                                            var win = Ext.WindowManager.getActive();
                                            if (win) {
                                                win.close();
                                            }

                                            me.stepFourObject.BookingTrackingId = r.BookingTrackingId;
                                            Utils.StepFourObj.BookingTrackingId = r.BookingTrackingId;
                                            me.externalBookingTrackingId = r.BookingTrackingId;

                                            /*start date and end date*/
                                            me.stepFourObject.StartDate = r.stepFourObject.StartDate
                                            me.stepFourObject.EndDate = r.stepFourObject.EndDate

                                            //me.loadBookingTrackingEvents(me);
                                            me.loadBookingTrackingEventsTab(me, betObj.BookingEventDate);
                                            /*@PV: commented because of tabpanel*/
                                            //                                            var eventsPanel = Ext.ComponentQuery.query('bookingwizardstep4 [itemid="eventsPanel"]')[0];
                                            //                                            eventsPanel.removeAll();
                                            //                                            var store = Ext.data.StoreManager.lookup('bookingwizard.BookingTrackingEventListStore');
                                            //                                            store.removeAll();
                                            //                                            store.proxy.setExtraParam('id', me.stepFourObject.BookingId);
                                            //                                            store.proxy.setExtraParam('id1', me.stepFourObject.BookingTrackingId);
                                            //                                            store.proxy.setExtraParam('languageId', user_language);
                                            //                                            store.reload();
                                            /* To uncomment this */
                                            //display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully');

                                            Utils.LoadBookingInformationForRightPane(me.stepFourObject.BookingId, me.stepFourObject.BookingTrackingId, user_language);
                                        }
                                        else {
                                            var MSGResult = r.result
                                            var cTurnOver = 0;
                                            var cPrice = 0;
                                            if (typeof (response.Price) != "undefined") {
                                                cPrice = response.Price;
                                            }
                                            cPrice = "€ " + Ext.util.Format.number(cPrice, '0,000.00');
                                            if (typeof (response.TurnOver) != "undefined") {
                                                cTurnOver = response.TurnOver;
                                            }
                                            cTurnOver = "€ " + Ext.util.Format.number(cTurnOver, '0,000.00');
                                            if (MSGResult.substring(0, 4) == "SPC_") {
                                                MSGResult = MSGResult.l("SP_DynamicCode", cPrice, cTurnOver);
                                            }
                                            Ext.Msg.alert('Error'.l('g'), MSGResult);
                                        }
                                    },
                                    failure: function (form, response) {

                                        var r = response.response.responseText;
                                        r = Ext.decode(r);
                                        var MSGResult = r.result
                                        var cTurnOver = 0;
                                        var cPrice = 0;
                                        if (typeof (response.Price) != "undefined") {
                                            cPrice = response.Price;
                                        }
                                        cPrice = "€ " + Ext.util.Format.number(cPrice, '0,000.00');
                                        if (typeof (response.TurnOver) != "undefined") {
                                            cTurnOver = response.TurnOver;
                                        }
                                        cTurnOver = "€ " + Ext.util.Format.number(cTurnOver, '0,000.00');
                                        if (MSGResult.substring(0, 4) == "SPC_") {
                                            MSGResult = MSGResult.l("SP_DynamicCode", cPrice, cTurnOver);
                                        }
                                        Ext.Msg.alert('Error'.l('g'), MSGResult); // 'Information not saved.');
                                    }
                                });
                            }
                            else {
                                Ext.Msg.alert('Alert', 'Please fill the required "*"  informations');
                            }
                            //var url = webAPI_path + 'api/Booking/CreateBookingEventTracking';
                            //$.get(url, betObj,
                            //       function (response) {
                            //           log('response', response);
                            //       });
                        }
                        else {
                            Ext.Msg.alert('Alert', 'Please select a room');
                        }
                    }
                    else {
                        Ext.Msg.alert('Alert', 'Please fill the required "*"  informations');
                    }
                }
            },
            'button[action="selectplanboard"]': {
                click: function (t, e, o) {
                    var ctrl = _currentApp.getController('bookingwizard.AddNewEventScheduler');

                    var eventName = "";
                    try {
                        eventName = Ext.ComponentQuery.query('[itemid="neweventnameid"]')[0].getValue();

                    } catch (e) {

                    }
                    var startDate = Ext.ComponentQuery.query('[itemid="itemComboDaysList"]')[0].getValue();
                    if (startDate == undefined) {
                        Ext.Msg.alert('Error', 'Select a day.');
                        return;
                    }
                    var st = Ext.ComponentQuery.query('addnewevent timefield[name="StartTime"]')[0].getValue();
                    var et = Ext.ComponentQuery.query('addnewevent timefield[name="EndTime"]')[0].getValue();

                    var np = Ext.ComponentQuery.query('addnewevent textfield[name="NoOfPerson"]')[0].getValue();
                    if (!Utils.isValid(np)) {
                        Ext.Msg.alert('Error', 'Add a number of persons.');
                        return;
                    }

                    var roomSetupId = Ext.ComponentQuery.query('addnewevent combo[name="RoomSetupId"]')[0].getValue();
                    if (!Utils.isValid(roomSetupId)) {
                        Ext.Msg.alert('Error', 'Select a room shape.');
                        return;
                    }

                    var obj = new Object();
                    obj.eventName = eventName;
                    obj.startDate = startDate;
                    obj.startTime = st;
                    obj.endTime = et;
                    obj.noOfPersons = np;
                    obj.roomSetupId = roomSetupId;
                    obj.bookingTrackingId = me.stepFourObject.BookingTrackingId;

                    //var roomId = Ext.ComponentQuery.query('[itemid="selectedRoomId"]')[0].getValue();

                    if (ctrl.thisController == false) {
                        ctrl.thisController = true;
                        ctrl.init(obj);
                        ctrl.BWObj = obj;
                    }

                    ctrl.openPlanboardWindow();



                }
            },
            'button[action="addItemButtonAction"]': {
                click: function (t, e, o) {//t => this, e => event, eo => Eoptional   
                    console.log(t);

                    /*Varification for API is valid then call window-Commneted as now its not required at RAP level(TRELLO 1036)*/
                    //                    if (me.stepFourObject.BookingId > 0 && t.BookingEventId > 0) {
                    //                        //Validate24HoursForBooking
                    //                        Ext.Ajax.request({
                    //                            url: webAPI_path + 'api/BookingCancellation/Validate24HoursForBooking',
                    //                            method: 'Get',
                    //                            params: { id: me.stepFourObject.BookingId, id1: t.BookingEventId },
                    //                            success: function (response) {

                    //                                var r = Ext.decode(response.responseText);
                    //                                if (r.success == true) {
                    //                                    me.callEventItemFunction(t)
                    //                                }
                    //                                else {
                    //                                    if (r.result.substring(0, 4) == "SPC_") {
                    //                                        Ext.Msg.alert('Error'.l('g'), r.result.l("SP_DynamicCode"));
                    //                                    }
                    //                                    else {
                    //                                        Ext.Msg.alert('Error'.l('g'), r.result);
                    //                                    }

                    //                                }
                    //                            },
                    //                            failure: function (form, response) {

                    //                            }
                    //                        });
                    //                    }
                    //                    else {
                    me.callEventItemFunction(t)
                    //   }
                    /*end*/
                }
            },
            'button[action="editRemarkButtonAction"]': {
                click: function (t, e, o) {//t => this, e => event, eo => Eoptional                     
                    var typeId = t.typeId;
                    var itemId = t.itemId;

                    if (t.bookingEventId > 0) {
                        typeId = 2;
                        itemId = t.bookingEventId
                    }

                    Utils.ShowWindow('widget.addremarks', null);
                    urlItem = webAPI_path + 'api/booking/GetEntityRemarkById';
                    Ext.data.JsonP.request({
                        url: urlItem,
                        type: 'GET',
                        params: {
                            id: typeId,
                            id1: itemId
                        },

                        success: function (response) {
                            log("response", response);
                            if (response.success == true) {
                                Ext.ComponentQuery.query('textfield[itemid="internalRemarkTextField"]')[0].setValue(response.data.InternalNoteText);
                                Ext.ComponentQuery.query('textfield[itemid="externalRemarkTextField"]')[0].setValue(response.data.ExternalNoteText);
                                Ext.ComponentQuery.query('[itemid="internalRemarkId"]')[0].setValue(response.data.NoteId);
                            }
                        },
                        failure: function (response) {
                            //Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        }
                    });
                    Ext.ComponentQuery.query('[itemid="itemId"]')[0].setValue(itemId);
                    Ext.ComponentQuery.query('[itemid="typeId"]')[0].setValue(typeId);

                }
            },
            'button[action="saveRemarkButtonAction"]': {
                click: function (t, e, o) {//t => this, e => event, eo => Eoptional    

                    var external = Ext.ComponentQuery.query('textfield[itemid="externalRemarkTextField"]')[0].getValue();
                    var internal = Ext.ComponentQuery.query('textfield[itemid="internalRemarkTextField"]')[0].getValue();
                    var intId = Ext.ComponentQuery.query('[itemid="internalRemarkId"]')[0].getValue();
                    var itemId = Ext.ComponentQuery.query('[itemid="itemId"]')[0].getValue();
                    var typeId = Ext.ComponentQuery.query('[itemid="typeId"]')[0].getValue();

                    var urlItem = webAPI_path + 'api/booking/AddEntityRemark';

                    //Create external call
                    var itemObj = {};
                    if (Utils.isValid(intId)) {
                        if (intId > 0) {
                            urlItem = webAPI_path + 'api/booking/EditEntityRemark';
                            itemObj.NoteId = intId;
                        }
                    }

                    itemObj.EntityTypeId = typeId;
                    itemObj.EntityId = itemId;
                    itemObj.ExternalNoteText = external;
                    itemObj.InternalNoteText = internal;
                    itemObj.UpdatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                    itemObj.UpdatedBy = CurrentSessionUserId;
                    itemObj.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                    itemObj.CreatedBy = CurrentSessionUserId;
                    itemObj.IsMigrated = false;

                    $.ajax({
                        url: urlItem,
                        type: 'POST',
                        data: itemObj,
                        success: function (form, response) {
                            var ResultText = response.Message;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (response == "success") {
                                me.getAddremarks().close();
                            } else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                                success = false;
                            }
                        },
                        failure: function (form, response) {
                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                            success = false;
                        }
                    });
                }
            },
            'button[action="editEventButtonAction"]': {
                click: function (t, e, o) {//t => this, e => event, eo => Eoptional  
                    var bookingEventTrackingId = (t.bookingEventTrackingId == null) ? 0 : t.bookingEventTrackingId;
                    var bookingEventId = (t.bookingEventId == null) ? 0 : t.bookingEventId;
                    var RoomSetupId = (t.RoomSetupId == null) ? 0 : t.RoomSetupId;

                    Ext.create('widget.editevent', { bookingEventTrackingId: bookingEventTrackingId, bookingEventTitle: t.bookingEventTitle,
                        bookingEventId: bookingEventId, RoomSetupId: RoomSetupId, uniqueid: t.uniqueid, Quantity: t.Quantity, RoomId: t.RoomId, IsSharable: t.IsSharable,
                        NoOfPeople: t.NoOfPeople, IsPartOfPackage: t.IsPartOfPackage
                    }).show();

                }
            },
            'editevent': {
                afterrender: function (t) {

                    var c = Ext.ComponentQuery.query('combo[itemid="roomsetupidstep4"]')[0];

                    var partOfPackageObj = Ext.ComponentQuery.query('editevent hidden[itemid="IsPartOfPackage"]')[0];
                    var noOfPplObj = Ext.ComponentQuery.query('editevent numberfield[name="NoOfPeople]')[0];

                    if (partOfPackageObj && partOfPackageObj.getValue() == "true") {
                        noOfPplObj.setDisabled(true);
                    }
                    else {
                        noOfPplObj.setDisabled(false);
                    }

                    // if (c) {
                    var combo = Ext.ComponentQuery.query('editevent combo[itemid="roomsetupidstep4]')[0];
                    var store = combo.getStore();
                    store.load({
                        params: { 'id': t.RoomId, 'id1': t.Quantity, 'languageId': user_language },
                        callback: function (records, o, success) {

                            //                            if (t.IsSharable) {
                            //                                combo.setValue(20);
                            //                            }
                            //                            else {
                            //                                combo.setValue(t.RoomSetupId);
                            //                            }
                            combo.setValue(t.RoomSetupId);
                            var rIndex = store.findExact('RoomSetupId', t.RoomSetupId);
                            var r = store.getAt(rIndex);
                            var submitButtonObj = Ext.ComponentQuery.query('editevent [action="saveNewEventName]')[0];
                            if (r.data.IsMatchWithCapacity == false) {
                                submitButtonObj.setDisabled(true);
                            }
                            else
                                submitButtonObj.setDisabled(false);

                        }
                    })
                    //    }

                    /*PV: completly wrong code, textfield has trackingid at postfix and here added title, setupid is for combo and here added*/
                    //                    var c1 = Ext.ComponentQuery.query('editevent textfield[itemid="editeventnameinput_"' + t.bookingEventTitle + ']')[0];
                    //                    if (c1)
                    //                        c1.setValue(t.RoomSetupId);
                }
            },

            'editevent numberfield[name=NoOfPeople]': {
                blur: function (t, eObj, eOpts) {//this, new, old
                    // alert(t.getValue())

                    /*roomId*/
                    var roomIdObj = Ext.ComponentQuery.query('editevent hidden[itemid="RoomId]')[0];

                    var roomId = roomIdObj.getValue();

                    var combo = Ext.ComponentQuery.query('editevent combo[itemid="roomsetupidstep4]')[0];
                    var store = combo.getStore();
                    store.proxy.setExtraParam('id', roomId);
                    store.proxy.setExtraParam('id1', t.getValue()); //Quantity
                    store.proxy.setExtraParam('languageId', user_language); //Quantity                    
                    store.load();
                    //roomsetupidstep4
                },
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        /*roomId*/
                        var roomIdObj = Ext.ComponentQuery.query('editevent hidden[itemid="RoomId]')[0];

                        var roomId = roomIdObj.getValue();

                        var combo = Ext.ComponentQuery.query('editevent combo[itemid="roomsetupidstep4]')[0];
                        var store = combo.getStore();
                        store.proxy.setExtraParam('id', roomId);
                        store.proxy.setExtraParam('id1', t.getValue()); //Quantity
                        store.proxy.setExtraParam('languageId', user_language); //Quantity                    
                        store.load();
                    }
                }

            },
            'editevent combo[itemid=roomsetupidstep4]': {
                select: function (el, record, eopts) {
                    // me.thisRoomId = record.data.ResourceId;
                    // me.thisRoomName = record.data.RoomName;                                                            
                    var submitButtonObj = Ext.ComponentQuery.query('editevent [action="saveNewEventName]')[0];
                    if (record[0].data.IsMatchWithCapacity == false) {
                        submitButtonObj.setDisabled(true);
                    }
                    else {
                        submitButtonObj.setDisabled(false);
                    }
                }
            },
            'button[action="shareRoomButtonAction"]': {
                click: function (t, e, o) {//t => this, e => event, eo => Eoptional  
                    var bookingEventId = t.bookingEventId;
                    if (!Utils.isValid(bookingEventId)) {
                        bookingEventId = 0;
                    }

                    var outletId = t.outletId;
                    if (!Utils.isValid(outletId)) {
                        outletId = 0;
                    }

                    var trackingId = t.bookingEventTrackingId;
                    if (!Utils.isValid(trackingId)) {
                        trackingId = 0;
                    }
                    var store = Ext.getStore('bookingwizard.SharableRoomsForEvent');
                    store.proxy.setExtraParam('id', trackingId);
                    store.proxy.setExtraParam('id1', bookingEventId);
                    store.proxy.setExtraParam('id2', outletId);
                    store.proxy.setExtraParam('id3', me.stepFourObject.PropertyId);
                    store.proxy.setExtraParam('id4', user_language);
                    store.load();
                    Ext.create('widget.meetingsharableroomsoccupation', { bookingEventTrackingId: t.bookingEventTrackingId, bookingEventId: bookingEventId, outletId: outletId, outletName: t.outletName, startTime: t.startTime, endTime: t.endTime, Persons: t.Persons }).show();
                }
            },
            'button[action="saveSharableRoomButtonAction"]': {
                click: function (t, e, o) {//t => this, e => event, eo => Eoptional  
                    log("Utils.SelectedSharableRoomId", Utils.SelectedSharableRoomId);
                    var urlItem = webAPI_path + 'api/booking/UpdateEventSharableRoom';
                    var bookingEventId = t.bookingEventId;
                    if (!Utils.isValid(bookingEventId)) {
                        bookingEventId = 0;
                    }

                    var bookingEventTrackingId = t.bookingEventTrackingId;
                    if (!Utils.isValid(bookingEventTrackingId)) {
                        bookingEventTrackingId = 0;
                    }
                    Ext.data.JsonP.request({
                        url: urlItem,
                        type: 'GET',
                        params: {
                            id: bookingEventTrackingId,
                            id1: bookingEventId,
                            id2: Utils.SelectedSharableRoomId,
                            languageId: user_language,
                            updatedBy: CurrentSessionUserId
                        },

                        success: function (response) {
                            //log("response", response);
                            if (response.success == true) {
                                me.getMeetingsharableroomsoccupation().close();

                                var storeid = (bookingEventTrackingId > 0) ? bookingEventTrackingId : bookingEventId;

                                var grid = Ext.ComponentQuery.query('[itemid=' + storeid + '_grid]')[0];
                                var localStore = Ext.create('Regardz.store.bookingwizard.BookingTrackingItemsListStore');
                                localStore.proxy.setExtraParam('id', bookingEventId);
                                localStore.proxy.setExtraParam('id1', bookingEventTrackingId);
                                localStore.proxy.setExtraParam('languageId', user_language);
                                localStore.load();
                                grid.getStore().load(localStore);
                                Utils.MeetingDefaultRecord = null;
                                Utils.LoadBookingInformationForRightPane(me.stepFourObject.BookingId, me.stepFourObject.BookingTrackingId, user_language);
                            }
                        },
                        failure: function (response) {
                            //Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        }
                    });
                }
            },
            'editevent button[action="saveNewEventName"]': {
                click: function (t, e, o) {//t => this, e => event, eo => Eoptional   


                    /*if red item selected in setup combo then do not submit*/
                    var RoomSetupId = Ext.ComponentQuery.query('editevent combo[itemid=roomsetupidstep4]')[0];
                    //var RoomSetupId = Ext.ComponentQuery.query('editevent combo[name="roomSetupId_' + t.bookingEventTrackingId + '"]')[0];
                    var store = RoomSetupId.getStore();
//                    var rIndex = store.findExact('RoomSetupId', RoomSetupId.getValue());
                    //                    var r = store.getAt(rIndex);
                    var r = store.findRecord('RoomSetupId', RoomSetupId.getValue());
////                    log("store", store);
//                    log("RoomSetupId.getValue()", RoomSetupId.getValue());
//                    log("rIndex=", rIndex);
//                    log("r=", r)
                    var submitButtonObj = Ext.ComponentQuery.query('editevent [action="saveNewEventName]')[0];

                    if (r.data.IsMatchWithCapacity == false) {
                        var task = new Ext.util.DelayedTask(function () {
                            submitButtonObj.setDisabled(true);
                        });
                        task.delay(disableBtnTime + 100);
                        return false;
                    }
                    else
                        submitButtonObj.setDisabled(false);
                    /*end of condn*/

                    var partOfPackageObj = Ext.ComponentQuery.query('editevent hidden[itemid="IsPartOfPackage"]')[0];
                    var noOfPplObj = Ext.ComponentQuery.query('editevent numberfield[name="NoOfPeople]')[0];
                    var noOfPerson = null;
                    if (partOfPackageObj && partOfPackageObj.getValue() == 'true') {
                        noOfPerson = null;
                    }
                    else
                        noOfPerson = noOfPplObj.getValue();

                    // var newName = Ext.ComponentQuery.query('textfield[itemid="editeventnameinput_' + t.bookingEventTrackingId + '"]')[0];
                    var newName = Ext.ComponentQuery.query('editevent textfield[name=eventname]')[0];
                    // var roomSetupId = Ext.ComponentQuery.query('editevent combo[name="roomSetupId_' + t.bookingEventTrackingId + '"]')[0];
                    var roomSetupId = Ext.ComponentQuery.query('editevent combo[itemid=roomsetupidstep4]')[0];

                    t.bookingEventId = (t.bookingEventId > 0) ? t.bookingEventId : 0;
                    t.bookingEventTrackingId = (t.bookingEventTrackingId > 0) ? t.bookingEventTrackingId : 0;

                    var urlItem = webAPI_path + 'api/booking/UpdateEventName';

                    var param = {
                        id: t.bookingEventId,
                        id1: t.bookingEventTrackingId,
                        eventName: newName.getValue(),
                        updatedBy: CurrentSessionUserId,
                        setupid: roomSetupId.getValue(),
                        noofperson: noOfPerson,
                        isConfirmed: false
                    };

                    Ext.data.JsonP.request({
                        url: urlItem,
                        type: 'GET',
                        params: param,
                        success: function (r) {
                            if (r.success == true) {
                                var ResultText = r.result;
                                var CancelPer = 0;
                                var TotalCancellation = 0;
                                if (typeof (r.CancelPer) != "undefined") {
                                    CancelPer = r.CancelPer;
                                }
                                if (typeof (r.TotalCancellation) != "undefined") {
                                    TotalCancellation = r.TotalCancellation;
                                }
                                TotalCancellation = "€ " + Ext.util.Format.number(TotalCancellation, '0,000.00');

                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode", TotalCancellation, CancelPer);
                                if (r.confirm == true) {
                                    Ext.Msg.confirm('Warning'.l('g'), ResultText,
                                             function (btn) {
                                                 if (btn === 'yes') {
                                                     param.isConfirmed = true;
                                                     Ext.data.JsonP.request({
                                                         url: urlItem,
                                                         type: 'GET',
                                                         params: param,
                                                         success: function (r) {
                                                             // var MSGResult = r.result
                                                             var ResultText = r.result;
                                                             var CancelPer = 0;
                                                             var TotalCancellation = 0;
                                                             if (typeof (r.CancelPer) != "undefined") {
                                                                 CancelPer = r.CancelPer;
                                                             }
                                                             if (typeof (response.TotalCancellation) != "undefined") {
                                                                 TotalCancellation = response.TotalCancellation;
                                                             }
                                                             TotalCancellation = "€ " + Ext.util.Format.number(TotalCancellation, '0,000.00');

                                                             if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                                                 ResultText = ResultText.l("SP_DynamicCode", TotalCancellation, CancelPer);
                                                             if (r.success == true) {
                                                                 me.stepFourObject.BookingTrackingId = r.BookingTrackingId;
                                                                 /*Update tabpanel*/
                                                                 var tabeventPanel = Ext.ComponentQuery.query('tabpanel[itemid=tabeventpanel]')[0];
                                                                 var tabActivate = tabeventPanel.getActiveTab();
                                                                 me.loadBookingTrackingEvents(me, tabActivate);
                                                                 /*-----*/
                                                                 me.getEditevent().close();
                                                                 // Ext.data.StoreManager.lookup('bookingwizard.BookingTrackingEventListStore').reload();
                                                                 // var grid = $("#span_" + t.bookingEventTrackingId).html(newName);
                                                             } else {
                                                                 me.getEditevent().close();
                                                                 Ext.Msg.alert('Error'.l('g'), ResultText);
                                                                 //  Ext.data.StoreManager.lookup('bookingwizard.BookingTrackingEventListStore').reload();
                                                                 //  var grid = $("#span_" + t.bookingEventTrackingId).html(newName);
                                                             }
                                                         }
                                                     });
                                                 }
                                             }
                                    );
                                }
                                else {
                                    me.stepFourObject.BookingTrackingId = r.BookingTrackingId;
                                    /*Update tabpanel*/
                                    var tabeventPanel = Ext.ComponentQuery.query('tabpanel[itemid=tabeventpanel]')[0];
                                    var tabActivate = tabeventPanel.getActiveTab();
                                    me.loadBookingTrackingEvents(me, tabActivate);
                                    /*-----*/
                                    me.getEditevent().close();
                                }
                            }
                            else {
                                var ResultText = r.result;
                                var CancelPer = 0;
                                var TotalCancellation = 0;
                                if (typeof (r.CancelPer) != "undefined") {
                                    CancelPer = r.CancelPer;
                                }
                                if (typeof (response.TotalCancellation) != "undefined") {
                                    TotalCancellation = response.TotalCancellation;
                                }
                                TotalCancellation = "€ " + Ext.util.Format.number(TotalCancellation, '0,000.00');

                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode", TotalCancellation, CancelPer);
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                                me.getEditevent().close();
                            }
                            //grid.setTitle(newName);
                        },
                        failure: function (form, response) {
                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        }
                    });
                }
            },
            'bookingwizardstep4': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    ////var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    //var fieldName = iView.getGridColumns()[iColIdx].name;

                    //var zRec = iView.getRecord(iRowEl);

                    //var selectedData = new Object();

                    //selectedData.FixedPriceId = zRec.data.FixedPriceId;
                    //selectedData.bar = zRec.data.Selected;

                    ///*get view section*/
                    //var step3 = Ext.ComponentQuery.query('panel [itemid="bookingwizardstep3"]')[0];
                    //step3.selectedData = selectedData;

                }
            },
            'meetingitems': {
                afterrender: function (t) {
                    var t2 = t.getStore();

                    //                    t2.load({
                    //                        callback: function (records, o, success) {                            
                    //                            if (o.response && typeof o.response != 'undefined') {
                    //                                var rootnode = t.getRootNode();
                    //                                rootnode.appendChild(o.response);
                    //                            }
                    //                        }
                    //                    });
                }
            },
            'tabpanel[itemid=tabeventpanel] tab': {
                click: function (t, eop) {
                    //  beforetabchange: function (t, n, o) {                    
                    //me.loadBookingTrackingEvents(me, n);
                    me.loadBookingTrackingEvents(me, t.card);
                }
            },
            'additems': {
                resize: function (t, w, h, eOpts) {
                    var allItemsGrid = Ext.ComponentQuery.query('additems [itemid="allItemsGrid"]')[0];
                    //selectfromuserlist.noResize = false;
                    var newHeight = h - parseInt(h * 0.2);
                    allItemsGrid.setHeight(newHeight);
                    resizeWindow(allItemsGrid, newHeight)
                }
            },
            'editevent button[action="deleteEventButtonAction"]': {
                click: function (t, a, l) {//t => this, e => event, eo => Eoptional                     
                    var bId = (t.BookingEventId > 0) ? t.BookingEventId : 0;
                    var bTrackingId = (t.BookingEventTrackingId > 0) ? t.BookingEventTrackingId : 0;
                    log(" BookingTrackingId-bookingid", t.BookingTrackingId + " - " + t.BookingId);

                    var urlItem = webAPI_path + 'api/booking/ValidateEventForDeletion';
                    Ext.data.JsonP.request({
                        url: urlItem,
                        type: 'GET',
                        params: { "id": t.BookingTrackingId, "id1": t.BookingId, "id2": bTrackingId, "id3": bId },
                        //data: BIobj,
                        success: function (response) {
                            if (response.success == true) {
                                Ext.MessageBox.confirm('Delete'.l('g'), 'Are you sure you want to delete?'.l('g'), function (btn) {
                                    if (btn === 'yes') {
                                        var urlItem = webAPI_path + 'api/booking/DeleteBookingEventTracking';
                                        Ext.data.JsonP.request({
                                            url: urlItem,
                                            type: 'GET',
                                            params: { "id": bId, "id1": bTrackingId, "id2": CurrentSessionUserId, "id3": t.BookingTrackingId, "id4": t.BookingId },
                                            //data: BIobj,                            
                                            success: function (response) {
                                                if (response.success == true) {
                                                    /*Update tabpanel*/
                                                    var tabeventPanel = Ext.ComponentQuery.query('tabpanel[itemid=tabeventpanel]')[0];
                                                    var tabActivate = tabeventPanel.getActiveTab();
                                                    me.loadBookingTrackingEvents(me, tabActivate);
                                                    /*----*/
                                                    Utils.LoadBookingInformationForRightPane(t.BookingId, t.BookingTrackingId, user_language);
                                                } else {
                                                    var ResultText = response.result;
                                                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                                        ResultText = ResultText.l("SP_DynamicCode");
                                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                                    return false;
                                                }
                                                log("Utils.StepOneObj", Utils.StepOneObj);
                                            },
                                            failure: function (form, response) {
                                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                                return false;
                                            }
                                        });
                                    }
                                });
                            } else {
                                var ResultText = response.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                                return false;
                            }
                        }
                    });
                }
            }

        });
    },
    GetSelectItem: function (Description) {
        var CurrentMenuDescription = Ext.ComponentQuery.query('textareafield[itemid="CurrentMenuDescriptionId"]');
        for (var i = 0; i < CurrentMenuDescription.length; i++) {
            CurrentMenuDescription[i].setValue(Description);
        }
    },
    loadStepFourObject: function (me) {
        if (!Utils.isEmpty(Utils.StepThreeObj)) {
            // log("Utils object", Utils.StepThreeObj);
            me.stepFourObject = Utils.StepThreeObj;
            me.checkIfObjectValid(me);
        }
        else {

            if (me.externalBookingTrackingId > 0 || me.externalBookingId > 0) {
                urlItem = webAPI_path + 'api/booking/GetStepData';
                Ext.data.JsonP.request({
                    url: urlItem,
                    type: 'GET',
                    params: {
                        id: 0,
                        id1: me.externalBookingTrackingId,
                        id2: me.externalBookingId,
                        id3: 4
                    },

                    success: function (response) {
                        me.stepFourObject = response.data;
                        Utils.RightPanObj.StatusId = response.data.StatusId;                        
                        log("loaded step object PV", me.stepFourObject);
                        me.checkIfObjectValid(me);
                    },
                    failure: function (response) {
                        //Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                    }
                });


            }
        }
    },

    checkIfObjectValid: function (me) {

        if (!Utils.isEmpty(me.stepFourObject)) {

            /*Start Update rightpanel*/
            var obj = new Object;
            obj.BookingTrackingId = me.stepFourObject.BookingTrackingId;
            obj.BookingId = me.stepFourObject.BookingId;
            obj.ReservationId = me.stepFourObject.ReservationId;

            Utils.UpdateRightPanObj(obj, 4);
            /*End of update rightpanel*/

            me.loadReservationDetails(me);
            // me.loadBookingTrackingEvents(me); //for tabevent
            me.loadBookingTrackingEventsTab(me, 0);
            setTimeout(function () {
                Ext.getCmp('move-next').setDisabled(false);
            }, disableBtnTimeIncreased);

            //   Utils.UpdateRightPanObj(me.stepFourObject, 2); //Update R;panel - PV-MM
        }
    },
    loadReservationDetails: function (me) {
        var title = 'Customize Package_Title'.l('SC54000');
        var sd = Ext.Date.format(new Date(me.stepFourObject.StartDate), 'Y-m-d');
        if (Utils.isValid(sd)) {
            title += " - " + sd + " : ";
        }
        var bn = me.stepFourObject.BookingName; ;
        if (Utils.isValid(bn)) {
            title += " " + bn;
        }

        var reservationId = me.stepFourObject.ReservationId;
        if (Utils.isValid(me.stepFourObject.BookingNumber)) {
            //title += " <span style='float:right'><span id='spReservationId'>" + me.stepFourObject.BookingNumber + "</span><span>." + "1</span>" + "</div>";
            title += " <span style='float:right'><span id='spReservationId'>" + me.stepFourObject.BookingNumber + "</span></div>";
        }
        var panel = Ext.ComponentQuery.query('panel[itemid="bookingwizardstep4"]')[0];
        panel.setTitle(title);
        var propertyID = Ext.ComponentQuery.query('[itemid="PropertyId"]')[0];
        propertyID.setValue(me.stepFourObject.PropertyId);
        //Added for select room scheduler            
        var roomSetupdField = Ext.ComponentQuery.query('[itemid="RoomSetupId"]')[0]
        roomSetupdField.setValue(me.stepFourObject.RoomSetupId);
        Ext.ComponentQuery.query('[itemid="NumberOfPeople"]')[0].setValue(me.stepFourObject.NumberOfPeople);

        //Utils.PropertyListIDs = Utils.push(Utils.PropertyListIDs, me.stepFourObject.PropertyId);
        //viewObject.getController().applyFilters();
        //bookingwizardstep4

    },

    loadBookingTrackingEvents: function (me, renderTo) {
        var localThis = this;
        var localObj = me.stepFourObject;
        //var eventsPanel = Ext.ComponentQuery.query('bookingwizardstep4 [itemid="eventsPanel"]')[0];
        var eventsPanel = renderTo;
        var store = Ext.data.StoreManager.lookup('bookingwizard.BookingTrackingEventListStore');

        var d = Ext.Date.parse(renderTo.itemid, 'c');
        var tabDate = Ext.util.Format.date(d, 'Y-m-d');

        var tabeventPanel = Ext.ComponentQuery.query('tabpanel[itemid=tabeventpanel]')[0];
        var tabActivate = tabeventPanel.getActiveTab();
        var panelMask = new Ext.LoadMask(tabActivate, { msg: "Loading..." });
        panelMask.show();

        store.proxy.setExtraParam('id', localObj.BookingId);
        store.proxy.setExtraParam('id1', localObj.BookingTrackingId);
        store.proxy.setExtraParam('languageId', user_language);
        store.proxy.setExtraParam('edate', tabDate);

        store.load({
            callback: function (records, o, success) {
                panelMask.hide();
                var itemsA = [];
                var tmpArr = [];
                var i = 0;

                // var dynamicEvent = Ext.ComponentQuery.query('[itemid=eventsPanel]')[0];
                var dynamicEvent = renderTo;
                dynamicEvent.removeAll(true);

                Ext.each(records, function (r) {

                    var item = r.data;

                    var eventName = item.EventName;
                    var bookingEventTrackingId = item.BookingEventTrackingId;
                    var isLoud = item.IsLoud;
                    var doNotMove = item.DoNotMove;
                    var bookingEventDate = Ext.Date.format(new Date(item.BookingEventDate), 'Y-m-d');
                    var IsSharable = item.IsSharable;
                    var IsMainEvent = item.IsMainEvent;
                    var internalRemarkId = 0;
                    var internalRemarkText = 'test ' + i;
                    var externalRemarkId = 0;
                    var externalRemarkText = 'test 2 ' + i;
                    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                        clicksToMoveEditor: 1,
                        autoCancel: false
                    });

                    var BookingEventId = (item.BookingEventId > 0) ? item.BookingEventId : 0;
                    var BookingEventTrackingId = (item.BookingEventTrackingId > 0) ? item.BookingEventTrackingId : 0;

                    var localStore = Ext.create('Regardz.store.bookingwizard.BookingTrackingItemsListStore');
                    // localStore.proxy.setExtraParam('id', 0); // As DS instructions
                    localStore.proxy.setExtraParam('id', BookingEventId);
                    localStore.proxy.setExtraParam('id1', BookingEventTrackingId);
                    localStore.proxy.setExtraParam('languageId', user_language);

                    /*Edit booking we have BookingEventID, and current booking we have bookingtrackingid*/
                    var storeitemid = (BookingEventTrackingId > 0) ? BookingEventTrackingId : BookingEventId;

                    var itemsA = {
                        xtype: 'meetingitems',
                        loadMask: false,
                        title: item.EventName,
                        itemid: storeitemid + '_grid',
                        // itemid: 'meetingitem_grid',
                        customViewName: "Event" + item.BookingEventTrackingId,
                        BookingEventTrackingId: item.BookingEventTrackingId,
                        disableSharable: false,
                        disableDeleteEventButton: (BookingEventTrackingId > 0 && (BookingEventId == 0 || BookingEventId == null)) ? false : true,
                        dayNumber: item.DayNumber, //@Sergiu - Once API is done can be changed
                        date: bookingEventDate,
                        doNotMove: doNotMove,
                        isLoud: isLoud,
                        store: localStore,
                        statusName: item.Status,
                        StartTime: item.FromTime,
                        EndTime: item.ToTime,
                        Persons: item.Quantity,
                        IsPartOfPackage: item.IsPartOfPackage,
                        OutletId: item.OutletId,
                        OutletName: item.OutletName,
                        disableSharable: !IsSharable,
                        IsMainEvent: IsMainEvent,
                        BookingEventId: item.BookingEventId,
                        EventId: item.EventId,
                        BookingTrackingId: me.stepFourObject.BookingTrackingId,
                        //PropertyId: stepThreeObj.PropertyId,
                        //BarId: item.BarId,
                        internalRemarkId: internalRemarkId,
                        internalRemarkText: internalRemarkText,
                        externalRemarkId: externalRemarkId,
                        externalRemarkText: externalRemarkText,
                        statusId: item.StatusId,
                        RoomSetupId: item.RoomSetupId,
                        plugins: [rowEditing],
                        cls: 'tree-panel-custom',
                        BookingId: localObj.BookingId,
                        // OriginalStatusId: localObj.OriginalStatusId
                        OriginalStatusId: item.OriginalStatusId,
                        Quantity: item.Quantity,
                        RoomId: item.RoomId,
                        uniqueid: storeitemid,
                        IsSharable: IsSharable,
                        NoOfPeople: item.Quantity
                    };

                    dynamicEvent.add(itemsA);
                    dynamicEvent.doLayout();
                    tmpArr[i] = new Object;
                    tmpArr[i].grid = Ext.ComponentQuery.query('[itemid=' + storeitemid + '_grid]')[0];
                    tmpArr[i].myMask = new Ext.LoadMask(tmpArr[i].grid, { msg: "Please wait..." }).show();

                    localThis.setLoading(localThis, tmpArr[i].grid, tmpArr[i].myMask);

                    i = i + 1;
                });

            }
        });
    },
    loadBookingTrackingEventsTab: function (me, activateTab) {
        var localThis = this;
        var localObj = me.stepFourObject;

        var d = Ext.Date.parse(localObj.StartDate, 'c');
        localObj.StartDate = Ext.util.Format.date(d, 'Y-m-d');

        var d1 = Ext.Date.parse(localObj.EndDate, 'c');
        localObj.EndDate = Ext.util.Format.date(d1, 'Y-m-d');

        Ext.data.JsonP.request({
            url: webAPI_path + 'api/Booking/GetBookingDateRange',
            //url: PHPPATHTEMP + 'GetBookingDateRange',
            type: 'GET',
            params: {
                date1: localObj.StartDate,
                date2: localObj.EndDate,
                NeedExtraDate: false
            },
            success: function (response) {

                if (response && response.data && response.data.length > 0) {
                    var tabeventPanel = Ext.ComponentQuery.query('tabpanel[itemid=tabeventpanel]')[0];
                    tabeventPanel.removeAll();
                    Ext.each(response.data, function (data) {

                        var d = Ext.Date.parse(data.Date, 'c');
                        var tabDate = Ext.util.Format.date(d, usr_dateformat);
                        //  var tabDate = new Date(data.Date, usr_dateformat);
                        tabeventPanel.add({
                            title: tabDate,
                            itemid: data.Date,
                            autoScroll: true
                        })
                    });
                    tabeventPanel.doLayout();
                    if (activateTab != 0) {
                        var tabActivate = Ext.ComponentQuery.query('tabpanel > [itemid=' + activateTab + ']')[0];
                        //tabActivate.fireEvent('ac');
                        tabeventPanel.setActiveTab(tabActivate);
                        me.loadBookingTrackingEvents(me, tabActivate);
                    }
                    else {
                        tabeventPanel.setActiveTab(0);
                        var tabActivate = tabeventPanel.getActiveTab();
                        me.loadBookingTrackingEvents(me, tabActivate);
                    }

                    // tabeventPanel.setActiveTab(0);
                }
            }
        });
    },

    setLoading: function (t, grid, myMask) {
        //setLoading: function (t, grid) {
        var localThis = this;

        var d = grid.getRootNode();
        if (d.childNodes.length > 0) {
            myMask.hide();
        }
        else {
            setTimeout(function () {
                localThis.setLoading(t, grid, myMask);
            }, 5);
        }
    },
    callEventFunction: function (t) {
        var me = this;

        Ext.getStore('bookingwizard.EventsComboStore').load();
        var roomSetupStore = Ext.getStore('common.RoomSetupStore');
        roomSetupStore.on("load", function () {
            var selectedEventIndex = roomSetupStore.findExact('roomsetupid', me.stepFourObject.RoomSetupID);
            var selectedEvent = roomSetupStore.getAt(selectedEventIndex);
            var roomsetupidaddevent = Ext.ComponentQuery.query('[itemid="roomsetupidaddevent"]')[0]; //.setValue(selectedEvent);
            if (roomsetupidaddevent) {
                roomsetupidaddevent.setValue(selectedEvent);
            }
            //            Ext.ComponentQuery.query('[itemid="roomsetupidaddevent"]')[0].setReadOnly(1);
            //            Ext.ComponentQuery.query('[itemid="roomsetupidaddevent"]')[0].addClass('x-item-disabled');
        });
        roomSetupStore.load();

        var bookingId = me.stepFourObject.BookingId;
        if (!Utils.isValid(bookingId)) {
            bookingId = 0;
        }

        var rooms = Ext.getStore('bookingwizard.SharableRoomsForProperty');
        rooms.proxy.setExtraParam('id', me.stepFourObject.BookingTrackingId);
        rooms.proxy.setExtraParam('id1', bookingId);
        rooms.proxy.setExtraParam('languageId', user_language);
        rooms.load();


        var storeDays = Ext.getStore('bookingwizard.MultipleDaysListEvent');
        storeDays.proxy.setExtraParam('date1', new Date(me.stepFourObject.StartDate));
        storeDays.proxy.setExtraParam('date2', new Date(me.stepFourObject.EndDate));
        storeDays.on("load", function () {
            //var daysListElement = Ext.ComponentQuery.query('[itemid="itemComboDaysList"]')[0].setValue(storeDays.getAt(0).data.Date);
        });
        storeDays.load({
            callback: function (records, o, success) {
                var daysListElement = Ext.ComponentQuery.query('[itemid="itemComboDaysList"]')[0];
                if (records[1])
                    daysListElement.setValue(records[1].data.Date);
            }
        });

        var storeGroupName = Ext.data.StoreManager.lookup("bookingwizard.GroupStore");
        storeGroupName.proxy.setExtraParam("id", me.stepFourObject.BookingTrackingId);
        storeGroupName.proxy.setExtraParam("id1", bookingId);
        storeGroupName.on("load", function () {
            log("storeGroupName", storeGroupName);
            //Ext.ComponentQuery.query('[itemid="groupnamecomboid"]')[0].setValue(storeGroupName.getAt(0));
        });
        storeGroupName.load();

        Ext.create('widget.addnewevent', { NoOfPerson: me.stepFourObject.NoOfPeople }).show();
        // Ext.create('widget.addnewevent').center();
    },
    callEventItemFunction: function (t) {
        var me = this;
        var window = Ext.WindowManager.get('idAddItems');
        if (!Utils.isValid(window)) {
            window = Ext.create('widget.additems', { bookingEventTrackingId: t.bookingEventTrackingId, bookingTrackingId: me.stepFourObject.BookingTrackingId, bookingEventId: t.BookingEventId, BookingId: me.stepFourObject.BookingId, EventId: t.EventId })
            // window = Ext.create('widget.additems', { bookingEventTrackingId:536, bookingTrackingId: 305, bookingEventId: 18 })
        }
        window.show();
        window.center();
    }
});
