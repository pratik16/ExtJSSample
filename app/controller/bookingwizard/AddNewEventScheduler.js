Ext.define('Regardz.controller.bookingwizard.AddNewEventScheduler', {
    extend: 'Ext.app.Controller',
    stores: ['bookingwizard.PlanboardRoomlistBWStore', 'bookingwizard.PlanboardBookinglistBWStore', 'operations.AvailabilityStore',
    'operations.RoomTypeStore', 'operations.RoomSetupStore', 'common.PropertyForNamesStore', 'common.PropertyForIdAndDistanceStore',
    'property.BWPropertyMeetingTypeStore', 'property.PropertyAtmosphereListStore', 'property.PhotoGalleryListStore',
    'property.BWPropertyFacilityIcons',
    'property.RoomPhotoListStore', 'property.VideoLibraryListStore', 'property.FloorPlanStore', 'bookingwizard.RoomFloorPlanStore', 'property.PropertyDetails', 'bookingwizard.RoomDetailsStore',
    'bookingwizard.RoomSetupListStore', 'common.PropertyForPropertyIdAndDistanceStore'],
    views: ['bookingwizard.AddNewEventScheduler', 'bookingwizard.PropertyInformation', 'bookingwizard.InfoPanelLeftView', 'bookingwizard.RoomDetailWindow'],
    BWObj: {},
    StartDate: {},
    EndDate: {},
    MultipleDays: false,
    thisController: false,
    thisRoomId: 0,
    thisRoomName: '',
    refs: [{
        ref: 'addneweventscheduler',
        selector: 'addneweventscheduler'
    }],

    init: function (obj) {
        var me = this;
        this.control({
            'addneweventscheduler': {
                afterrender: function () {

                    //                    var obj = me.BWObj;

                    //                    var formObject = Utils.getFirstComp(Ext.ComponentQuery.query('panel [itemid="planboardPanel"]'));
                    //                    var form;
                    //                    if (formObject) {
                    //                        var form = formObject.getForm();
                    //                        form.findField('bookingTrackingId').setValue(obj.bookingTrackingId);
                    //                        form.findField('eventName').setValue(obj.eventName);
                    //                        form.findField('NumberOfPeople').setValue(obj.noOfPersons);
                    //                        form.findField('roomSetupId').setValue(obj.roomSetupId);
                    //                        form.findField('PropertyId').setValue(Utils.RightPanObj.PropertyId);
                    //                        form.findField('startDate').setValue(obj.startDate);

                    //                    }
                    this.applyFilters();
                }
            },

            'addneweventscheduler [itemid="itemDisplayStartTime2"]': {
                change: function (t, e, o) {

                }
            },
            'addneweventscheduler panel > [itemid="itemschedulerroomselect"]': {
                beforeeventadd: function (scheduler1, newEventRecord, eOpts) {
                    if (newEventRecord) {
                        var startdatetime = new Date(newEventRecord.data.StartDate);
                        var enddatetime = new Date(newEventRecord.data.EndDate);
                        var diffMs = (enddatetime - startdatetime); // milliseconds between startdatetime & enddatetime           

                        var actualHours = Math.floor(diffMs / 86400000 * 24); // days                         
                        if (actualHours >= 24) {
                            // alert('Event should not longer than 24 hours');                            
                            Ext.data.JsonP.request({
                                url: webAPI_path + 'api/Designation/BlankRequest',
                                success: function () {
                                    Ext.Msg.alert('Error'.l('g'), 'Event should not longer than 24 hours'.l('SC50400'));
                                }
                            });
                            return false;
                        }
                        else {
                            newEventRecord.setResizable(true);
                            newEventRecord.newEvent = true;
                            newEventRecord.data.EventName = "New".l('g');
                        }
                    }
                }
            },
            'addneweventscheduler [itemid="itemschedulerroomselect"]': {

                select: function (el, record, eopts) {

                    me.thisRoomId = record.data.ResourceId;
                    me.thisRoomName = record.data.RoomName;
                }
            },
            'addneweventscheduler combo[itemid="itemDisplayStartTime2"]': {
                select: function (combo, records, eOpt) {

                    try {
                        var schedGrid = Ext.ComponentQuery.query('addneweventscheduler [itemid=itemschedulerroomselect]')[0];
                        var d = schedGrid.getStart();
                        var displayStartTime = combo;

                        var endDate = new Date(d);
                        endDate.setDate(endDate.getDate() + 1);

                        schedGrid.switchViewPreset('hourAndDay', new Date(d.getFullYear(), d.getMonth(), d.getDate(), displayStartTime.getValue()), new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 24));

                        var step2ZoomSliderObj = Ext.ComponentQuery.query('addneweventscheduler [itemid="step4roomZoomSlider"]')[0];

                        if (step2ZoomSliderObj) {
                            var v = step2ZoomSliderObj.getValue();

                            schedGrid.setTimeColumnWidth(v);
                        }

                    } catch (e) {

                    }
                }
            },
            'addneweventscheduler button[action="selectRoomAction"]': {
                click: function (t, e, o) {//t => this, e => event, eo => Eoptional
                    var formAddEvent = Ext.ComponentQuery.query('addnewevent [itemid="formAddEvent"]')[0];
                    var form = formAddEvent.getForm();
                    form.findField('selectedRoomFromPlanboard').setValue(me.thisRoomName);

                    var v = Ext.ComponentQuery.query('addnewevent [itemid="selectedRoomIdFromPlanboard"]')[0];
                    v.setValue(me.thisRoomId);


                    /*Time if changed from planboard of room selection*/
                    var startime = Ext.ComponentQuery.query('addnewevent [itemid="startTimeAddEvent"]')[0];
                    var endtime = Ext.ComponentQuery.query('addnewevent [itemid="endTimeAddEvent"]')[0];
                    var s = startime.getValue();
                    var e = endtime.getValue();

                    /*get the field from schedular form*/
                    var shour = Ext.ComponentQuery.query('[itemid="startTimeHour"]')[0].getValue();
                    var smin = Ext.ComponentQuery.query('[itemid="startTimeMin"]')[0].getValue();
                    var ehour = Ext.ComponentQuery.query('[itemid="endTimeHour"]')[0].getValue();
                    var emin = Ext.ComponentQuery.query('[itemid="endTimeMin"]')[0].getValue();

                    startime.setValue(('0' + shour).slice(-2) + ":" + ('0' + smin).slice(-2));
                    endtime.setValue(('0' + ehour).slice(-2) + ":" + ('0' + emin).slice(-2));

                    var panel = Ext.ComponentQuery.query('addneweventscheduler form[itemid="addeventplanboardPanel"]')[0];
                    var formSched = panel.getForm();
                    var roomid = formSched.findField('roomid').getValue();
                    var roomname = formSched.findField('roomname').getValue();
                    form.findField('selectedRoomFromPlanboard').setValue(roomname);

                    var v = Ext.ComponentQuery.query('addnewevent [itemid="selectedRoomIdFromPlanboard"]')[0];
                    v.setValue(roomid);

                    /*End of it*/
                    me.getAddneweventscheduler().close();
                }
            },


            /* Chnage actions for filters */
            'addneweventscheduler combo[itemid="itemRoomTypeCombo"]': {
                select: function (t, newValue, oldValue, eOpts) {
                    this.applyFilters();
                }
            },

            'addneweventscheduler textfield[name="min_area"]': {
                specialkey: function (f, e) {
                    if (e.getKey() == e.ENTER || e.getKey() == e.TAB) {
                        this.applyFilters();
                    }
                }
            },

            'addneweventscheduler checkbox[itemid="itemCombinedCheck"]': {
                change: function (t, newValue, oldValue, eOpts) {
                    this.applyFilters();
                }
            },
            'addneweventscheduler checkbox[itemid="itemIndividualCheck"]': {
                change: function (t, newValue, oldValue, eOpts) {
                    this.applyFilters();
                }
            },
            'addneweventscheduler checkbox[itemid="itemSharableCheck"]': {
                change: function (t, newValue, oldValue, eOpts) {
                    t.setValue(newValue);
                    this.applyFilters();
                }
            },
            'addneweventscheduler [itemid="itemRadioGroupPositions"]': {
                change: function (t, newValue, oldValue, eOpts) {
                    this.applyFilters();
                }
            },
            'addneweventscheduler radiofield[itemid="rdAll2id"]': {
                dirtychange: function (t, newValue, oldValue, eOpts) {

                    this.applyFilters();
                }
            },

            'addneweventscheduler combo[itemid="itemSortByCombo"]': {
                select: function (t, newValue, oldValue, eOpts) {
                    this.applyFilters();

                    //                    var scheduler = Ext.getCmp('sch-grid-event');
                    //                    var rs = scheduler.resourceStore;
                    //                    switch (newValue) {

                    //                        case 1: //RoomName
                    //                            rs.sort('RoomName', 'ASC');
                    //                            break;
                    //                        case 2: //Capacity max
                    //                            rs.sort('Capacity', 'DESC');
                    //                            break;
                    //                        case 3: //Divisable
                    //                            rs.sort('IsSharable', 'ASC');
                    //                            break;
                    //                        case 4: //Capacity min
                    //                            rs.sort('Capacity', 'ASC');
                    //                            break;

                    //                        default:
                    //                            break;
                    //                    }
                    //                    //Move the special event to index 0
                    //                    var specialEventIndex = rs.nodeStore.findExact('Id', -1);
                    //                    var specialEvent = rs.nodeStore.getAt(specialEventIndex);
                    //                    rs.nodeStore.removeAt(specialEventIndex);
                    //                    rs.nodeStore.insert(0, specialEvent);
                }
            },
            'addneweventscheduler combo[itemid="itemDescriptionCombo"]': {
                select: function (t, newValue, oldValue, eOpts) {
                    this.applyFilters();

                }
            },
            'addneweventscheduler fieldcontainer[itemid="itemFieldsBar"]': {
                afterrender: function (component) {
                    component.down('radiofield').on('change', function () {
                    });
                }
            },

            'addneweventscheduler fieldcontainer[itemid="itemFieldsStatus"]': {
                afterrender: function (component) {
                    component.down('radiofield').on('change', function () {
                    });
                }
            },
            'addneweventscheduler radiofield[itemid="BarHide"]': {
                change: function (t, newValue, oldValue, eOpts) {

                    this.applyFilters();
                }
            },

            'addneweventscheduler multislider[itemid="itemHoursSlider"]': {
                change: function (s, v) {

                    var start = Ext.ComponentQuery.query('addneweventscheduler [itemid="itemHourStart"]')[0];
                    var end = Ext.ComponentQuery.query('addneweventscheduler [itemid="itemHourEnd"]')[0];
                    values = s.getValues();
                    var firstSlider = "00:00";
                    var secondSlider = "00:00";

                    /*First slider value calculate*/
                    if (values[0]) {
                        var modular = parseInt(values[0]) % (12);
                        var newValue = parseInt(values[0]) - modular;
                        var startHour = parseInt(newValue) / 12;
                        var startMinute = parseInt(modular) * 5;

                        // firstSlider = startHour + ":" + startMinute;
                        firstSlider = ('0' + startHour).slice(-2) + ":" + ('0' + startMinute).slice(-2);

                    }
                    else
                        firstSlider = "00:00";

                    /*Second Slider value calculate*/
                    if (values[1]) {
                        var modular = parseInt(values[1]) % (12);
                        var newValue = parseInt(values[1]) - modular;
                        var endHour = parseInt(newValue) / 12;
                        var endMinute = parseInt(modular) * 5;
                        secondSlider = ('0' + endHour).slice(-2) + ":" + ('0' + endMinute).slice(-2);
                    }
                    else
                        secondSlider = "00:00";
                        
                    start.setText(firstSlider);
                    end.setText(secondSlider);


                    me.setVerticleLine();

                }
            }
        })
    },
    applyFilters: function () {
        
        var form = Utils.getFirstComp(Ext.ComponentQuery.query('addnewevent form[itemid="formAddEvent"]'));
        var formObject = form.getForm().getValues();

        var description = Ext.ComponentQuery.query('addneweventscheduler [name=description]')[0];
        description = null; // description.getValue();

        var RoomTypeName = Ext.ComponentQuery.query('addneweventscheduler combo[name=RoomTypeName]')[0].getValue();
        var min_area = Ext.ComponentQuery.query('addneweventscheduler textfield[name=min_area]')[0].getValue();

        /*Individual, Sharable, Combined checkbox*/
        var IndividualCheckboxId = Ext.ComponentQuery.query('addneweventscheduler checkbox[name=IndividualCheckboxId]')[0].getValue();
        var CombinedCheckboxId = Ext.ComponentQuery.query('addneweventscheduler checkbox[name=CombinedCheckboxId]')[0].getValue();
        var SharableCheckboxId = Ext.ComponentQuery.query('addneweventscheduler checkbox[name=SharableCheckboxId]')[0].getValue();

        var itemSortByCombo = Ext.ComponentQuery.query('addneweventscheduler combo[itemid=itemSortByCombo]')[0].getValue();
        var itemRadioGroupPositions = Ext.ComponentQuery.query('addneweventscheduler radiogroup[itemid=itemRadioGroupPositions]')[0].getValue();

        var me = _currentApp.getController('bookingwizard.BookingWizardStep4');

        var ROOM_TYPES = [];
        if (IndividualCheckboxId == true) {
            ROOM_TYPES.push('I');
        }
        if (CombinedCheckboxId == true) {
            ROOM_TYPES.push('C');
        }
        if (SharableCheckboxId == true) {
            ROOM_TYPES.push('S');
        }
        var ROOM_TYPES = ROOM_TYPES.toString();
        /*I,C,S checkbox end*/

        var CATEGORY_TYPE = typeof RoomTypeName == "undefined" || RoomTypeName == "" ? null : RoomTypeName;
        var ROOM_SETUP = null;
        var CAPACITY = typeof formObject.NoOfPerson == "undefined" ? null : formObject.NoOfPerson; ;
        var MIN_AREA = typeof min_area == "undefined" || min_area == "" ? null : min_area;
        var ROOM_TYPES = typeof ROOM_TYPES == "undefined" ? null : ROOM_TYPES; //Individual, Sharable, Combined
        // var SORT_BY = null;
        var SORT_BY = itemSortByCombo == "undefined" || itemSortByCombo == 0 ? null : itemSortByCombo;
        var DESCRIPTION = typeof description == "undefined" || description == '' ? null : description;
        var AVAILABLE = typeof itemRadioGroupPositions.Positions == "undefined" ? null : itemRadioGroupPositions.Positions;
        var NULLVALUE = null;
        var FLOOR_ID = null;
        var BookingTrackingId = me.stepFourObject.BookingTrackingId;
        var Booking_ID = me.stepFourObject.BookingId;
        CAPACITY = null;

        var startTime = formObject.StartTime + ':00';
        var endTime = formObject.EndTime + ':00';
        /*Static as in step4 planboard data is only for UI puprose only*/
        //        var startTime = "08:30:00"
        //        var endTime = "10:30:00"

        var isAvailable = false;
        if (AVAILABLE == 1)
            isAvailable = true;
        else
            isAvailable = false;

        var PropertyIds = Utils.RightPanObj.PropertyId; // formObject.PropertyId;
        var dt = formObject.EventDay;
        var planboardBarDate = new Date(dt);
        var viewtype = 'd';

        var searchParam = "PROPERTY_ID?" + PropertyIds + ";DATE?" + dt + ";VIEW_TYPE?" + viewtype + ";LANGUAGE_ID?" + user_language
							+ ";CATEGORY_TYPE?" + CATEGORY_TYPE + ";ROOM_SETUP?" + ROOM_SETUP + ";CAPACITY?" + CAPACITY + ";MIN_AREA?" + MIN_AREA
							+ ";ROOM_TYPES?" + ROOM_TYPES + ";SORT_BY?" + SORT_BY + ";DESCRIPTION?" + DESCRIPTION + ";FLOOR_ID?" + FLOOR_ID
                             + ";FROM_TIME?" + startTime + ";TO_TIME?" + endTime + ";AVAILABLE?" + isAvailable + ";BOOKINGTRACKING_ID?" + BookingTrackingId + "; Booking_ID?" + Booking_ID;


        var searchParamRoomBlock = "PROPERTY_ID:" + PropertyIds + ";DATE:" + dt + ";VIEW_TYPE:" + viewtype + ";LANGUAGE_ID:" + user_language
							+ ";CATEGORY_TYPE:" + CATEGORY_TYPE + ";ROOM_SETUP:" + ROOM_SETUP + ";CAPACITY:" + CAPACITY + ";MIN_AREA:" + MIN_AREA
							+ ";ROOM_TYPES:" + null + ";SORT_BY:" + SORT_BY + ";FLOOR_ID:" + FLOOR_ID
                             + ";FROM_TIME:" + startTime + ";TO_TIME:" + endTime + ";AVAILABLE:" + false;

        var schedGrid = Ext.ComponentQuery.query('addneweventscheduler [itemid=itemschedulerroomselect]')[0];
        schedGrid.resourceStore.proxy.setExtraParam('searchParam', searchParam);
        schedGrid.eventStore.proxy.setExtraParam('searchParam', searchParam);
        var localThis = this;
        /*load data*/
        schedGrid.resourceStore.load({

            callback: function (records, o, success) {

                if (o.response && typeof o.response.data != 'undefined') {
                    var data = o.response.data;
                    var resourcesArr = new Array();

                    var newArr = new Array();
                    var BookingEventWithBuffer = new Array();

                    //if (formObject.bar == '1') {
                    Ext.each(data, function (obj) {
                        var tempobj = $.extend(true, {}, obj);

                        var Slot1Obj = $.extend(true, {}, obj);
                        var Slot2Obj = $.extend(true, {}, obj);
                        var Slot3Obj = $.extend(true, {}, obj);

                        var tmpBookingEventWithBuffer = $.extend(true, {}, obj);

                        resourcesArr.push(obj);

                        if (tempobj.StartDate != null && tempobj.EndDate != null) {

                            /*Start of Event Record*/

                            //Get event start date
                            var initialStart = tempobj.StartDate;
                            //Get event end date
                            var initialEnd = tempobj.EndDate;
                            //Constant
                            var MS_PER_MINUTE = 60000;

                            //Calculate new date
                            /*FF time calculation*/
                            //                                var tmpinitialStartA = new Date (initialStart);
                            //                                var tmpinitialStart = tmpinitialStartA.getTime();
                            //                                var newStartDate = new Date(tmpinitialStart - (tempobj.TurnTimeBuffer * MS_PER_MINUTE));
                            if (Utils.isValid(tempobj.SetupTime) && tempobj.SetupTime > 0) {
                                //     log('tempobj setup time', tempobj.SetupTime);
                                tempobj.TurnTimeBuffer = tempobj.SetupTime;
                            }

                            /*Chrom time calculation*/
                            var tmpinitialStartA = Ext.Date.parse(initialStart, 'c');
                            var tmpinitialStart = tmpinitialStartA.getTime();
                            var newStartDate = new Date(tmpinitialStart - (tempobj.TurnTimeBuffer * MS_PER_MINUTE));

                            tmpBookingEventWithBuffer.ResourceId = tempobj.ResourceId;
                            tmpBookingEventWithBuffer.StartDate = newStartDate;
                            tmpBookingEventWithBuffer.EndDate = tmpinitialStartA;
                            tmpBookingEventWithBuffer.DateStart = newStartDate;
                            tmpBookingEventWithBuffer.DateEnd = tmpinitialStartA;
                            tmpBookingEventWithBuffer.Id = new Date().getTime() + tempobj.ResourceId;

                            // tmpBookingEventWithBuffer.EventId = tempobj.ResourceId;
                            tmpBookingEventWithBuffer.isSetupTime = true;
                            tmpBookingEventWithBuffer.ForEvent = tempobj.ResourceId;

                            tmpBookingEventWithBuffer.TurnTimeBuffer = tempobj.TurnTimeBuffer;
                            tmpBookingEventWithBuffer.CssClass = 'turnTime';
                            tmpBookingEventWithBuffer.Cls = 'turnTime';
                            tmpBookingEventWithBuffer.eventResizeHandles = 'start';
                            tmpBookingEventWithBuffer.enableEventDragDrop = false;
                            tmpBookingEventWithBuffer.IsLoud = false;
                            tmpBookingEventWithBuffer.DoNotMove = false;
                            tmpBookingEventWithBuffer.BookingStatusCode = '';

                            if (Utils.isValid(tmpBookingEventWithBuffer.TurnTimeBuffer) && tmpBookingEventWithBuffer.TurnTimeBuffer > 0) {
                                BookingEventWithBuffer.push(tmpBookingEventWithBuffer);
                            }
                            BookingEventWithBuffer.push(obj);

                            /*End of Event Record*/
                            // bookingArr.push(obj);

                            var ctrl = _currentApp.getController('bookingwizard.BookingWizardStep2');
                            var btid = ctrl.stepTwoObject.BookingTrackingId;
                            if (obj.BookingTrackingId == btid) {
                                Utils.EventCreated = true;
                            }

                            //Bar showing logic
                            /*If from API bar is equals to event bar, like obj.eventBar == obj.bar
                            then apply the available slot for the bar color.
                            right now slot is defined static with time periods
                            */

                            if (obj.yBarId == obj.BarId) {

                                //StartDate from object
                                var d = Ext.Date.parse(tempobj.StartDate, 'c');
                                var StartHour = Ext.util.Format.date(d, 'H:i');
                                var de = Ext.Date.parse(tempobj.EndDate, 'c');
                                var EndHour = Ext.util.Format.date(de, 'H:i');

                                /*Slot 1 time*/
                                var SlotStartHour1 = Ext.util.Format.date(planBoardSlot.Slot1.start, 'H:i');
                                var SlotEndHour1 = Ext.util.Format.date(planBoardSlot.Slot1.end, 'H:i');

                                /*Slot 2 time*/
                                var SlotStartHour2 = Ext.util.Format.date(planBoardSlot.Slot2.start, 'H:i');
                                var SlotEndHour2 = Ext.util.Format.date(planBoardSlot.Slot2.end, 'H:i');

                                /*Slot 3 time*/
                                var d = Ext.Date.parse(planBoardSlot.Slot3.start, 'c');
                                var SlotStartHour3 = Ext.util.Format.date(d, 'H:i');

                                var d = Ext.Date.parse(planBoardSlot.Slot3.end, 'c');
                                var SlotEndHour3 = Ext.util.Format.date(d, 'H:i');


                                var startD = Ext.Date.parse(tempobj.StartDate, 'c');
                                var endD = Ext.Date.parse(tempobj.EndDate, 'c');

                                if (
                                    (StartHour > SlotStartHour1 && StartHour < SlotEndHour1) ||
                                    (EndHour > SlotStartHour1 && EndHour < SlotEndHour1)
                                    ) {


                                    var h = Ext.util.Format.date(planBoardSlot.Slot1.start, 'H');
                                    var m = Ext.util.Format.date(planBoardSlot.Slot1.start, 'i');
                                    startD.setHours(h, m);

                                    var h = Ext.util.Format.date(planBoardSlot.Slot1.end, 'H');
                                    var m = Ext.util.Format.date(planBoardSlot.Slot1.end, 'i');
                                    endD.setHours(h, m);

                                    tempobj.StartDate = startD;
                                    tempobj.EndDate = endD;
                                }
                                else if (
                                    (StartHour > SlotStartHour2 && StartHour < SlotEndHour2) ||
                                    (EndHour > SlotStartHour2 && EndHour < SlotEndHour2)

                                  ) {

                                    var h = Ext.util.Format.date(planBoardSlot.Slot2.start, 'H');
                                    var m = Ext.util.Format.date(planBoardSlot.Slot2.start, 'i');
                                    startD.setHours(h, m);

                                    var h = Ext.util.Format.date(planBoardSlot.Slot2.end, 'H');
                                    var m = Ext.util.Format.date(planBoardSlot.Slot2.end, 'i');
                                    endD.setHours(h, m);

                                    tempobj.StartDate = startD;
                                    tempobj.EndDate = endD;
                                }
                                else if (
                                    (StartHour > SlotStartHour3 && StartHour < SlotEndHour3) ||
                                    (EndHour > SlotStartHour3 && EndHour < SlotEndHour3)
                                    ) {

                                    var h = Ext.util.Format.date(planBoardSlot.Slot3.start, 'H');
                                    var m = Ext.util.Format.date(planBoardSlot.Slot3.start, 'i');
                                    startD.setHours(h, m);

                                    var h = Ext.util.Format.date(planBoardSlot.Slot3.end, 'H');
                                    var m = Ext.util.Format.date(planBoardSlot.Slot3.end, 'i');
                                    endD.setHours(h, m);

                                    tempobj.StartDate = startD;
                                    tempobj.EndDate = endD;
                                }

                                newArr.push(tempobj);
                            }


                        }

                        /*Bar implementation start*/
                        var startDSlt1 = new Date(planboardBarDate);
                        var endDSlt1 = new Date(planboardBarDate);
                        var startDSlt2 = new Date(planboardBarDate);
                        var endDSlt2 = new Date(planboardBarDate);
                        var startDSlt3 = new Date(planboardBarDate);
                        var endDSlt3 = new Date(planboardBarDate);

                        /*Slot 1 bar*/
                        var h = Ext.util.Format.date(planBoardSlot.Slot1.start, 'H');
                        var m = Ext.util.Format.date(planBoardSlot.Slot1.start, 'i');
                        startDSlt1.setHours(h, m);

                        var h = Ext.util.Format.date(planBoardSlot.Slot1.end, 'H');
                        var m = Ext.util.Format.date(planBoardSlot.Slot1.end, 'i');
                        endDSlt1.setHours(h, m);

                        Slot1Obj.StartDate = startDSlt1;
                        Slot1Obj.EndDate = endDSlt1;
                        Slot1Obj.Cls = 'available-bar' + tempobj.yBarId1;
                        // Slot1Obj.Cls = "available";

                        /*Slot 2 bar*/
                        var h = Ext.util.Format.date(planBoardSlot.Slot2.start, 'H');
                        var m = Ext.util.Format.date(planBoardSlot.Slot2.start, 'i');
                        startDSlt2.setHours(h, m);

                        var h = Ext.util.Format.date(planBoardSlot.Slot2.end, 'H');
                        var m = Ext.util.Format.date(planBoardSlot.Slot2.end, 'i');
                        endDSlt2.setHours(h, m);

                        Slot2Obj.StartDate = startDSlt2;
                        Slot2Obj.EndDate = endDSlt2;
                        Slot2Obj.Cls = 'available-bar' + tempobj.yBarId2;

                        /*Slot 3 bar*/
                        var h = Ext.util.Format.date(planBoardSlot.Slot3.start, 'H');
                        var m = Ext.util.Format.date(planBoardSlot.Slot3.start, 'i');
                        startDSlt3.setHours(h, m);

                        var h = Ext.util.Format.date(planBoardSlot.Slot3.end, 'H');
                        var m = Ext.util.Format.date(planBoardSlot.Slot3.end, 'i');
                        endDSlt3.setHours(h, m);

                        Slot3Obj.StartDate = startDSlt3;
                        Slot3Obj.EndDate = endDSlt3;
                        Slot3Obj.Cls = 'available-bar' + tempobj.yBarId3;

                        newArr.push(Slot1Obj);
                        newArr.push(Slot2Obj);
                        newArr.push(Slot3Obj);
                        /*Bar implementation end*/

                    });
                    // }

                    localThis.setBlockingRoom(resourcesArr, BookingEventWithBuffer, searchParamRoomBlock);
                    //schedGrid.eventStore.loadData(BookingEventWithBuffer);

                    var startTime = formObject.StartTime
                    var endTime = formObject.EndTime
                    var arrStart = formObject.StartTime.split(":");
                    var arrEnd = formObject.EndTime.split(":");

                    var startDate = dt;
                    var endDate = dt;

                    var lineStart = new Date(startDate);
                    var lineEnd = new Date(endDate);
                    lineStart.setHours(arrStart[0], arrStart[1]);
                    lineEnd.setHours(arrEnd[0], arrEnd[1]);

                    schedGrid.items.items[1].plugins[1].store.removeAll();
                    schedGrid.items.items[1].plugins[1].store.insert(0, { "Date": lineStart, "Text": 'Start time'.l('SC50400'), "Cls": ' orange-line' });
                    schedGrid.items.items[1].plugins[1].store.insert(0, { "Date": lineEnd, "Text": 'End time'.l('SC50400'), "Cls": ' orange-line' });

                    schedGrid.resourceZones.removeAll();
                    // Ext.getStore('operations.AvailabilityStore').removeAll();

                    /*set slider to given time*/
                    var startTimeSlider = parseInt(lineStart.getHours() * 12) + parseInt(lineStart.getMinutes() / 5);
                    var endTimeSlider = parseInt(lineEnd.getHours() * 12) + parseInt(lineEnd.getMinutes() / 5);
                    
                    var slider = Ext.ComponentQuery.query('addneweventscheduler multislider[itemid="itemHoursSlider"]')[0];
                    slider.setValue(0, startTimeSlider);
                    slider.setValue(1, endTimeSlider);

                    var barObj = Ext.ComponentQuery.query('addneweventscheduler radiofield[itemid=BarShow]')[0].getValue();

                    if (barObj == true) {
                        //Ext.getStore('operations.AvailabilityStore').loadData(newArr);
                        schedGrid.resourceZones.loadData(newArr);
                    }
                }
            }
        });
        /*end load data*/

    },

    setBlockingRoom: function (data, bookingArr, searchParamRoomBlock) {
        /*Block Room Detail*/
        Ext.data.JsonP.request({
            url: webAPI_path + 'api/Planboard/GetBlockRoomforPlanboard',
            type: "GET",
            params: {
                searchParam: searchParamRoomBlock
            },
            success: function (response) {


                if (response.data.length > 0) {
                    Ext.each(response.data, function (d) {
                        Ext.each(data, function (tempobj) {
                            //ResourceId          
                            var tmpdata = $.extend(true, {}, tempobj);
                            tmpdata.IsROP = d.IsROP;
                            tmpdata.IsLinkedEvent = d.IsLinkedEvent;

                            if (d.IsROP == true) {
                                tmpdata.BookingName = "ROP";
                                tmpdata.Description = "ROP";
                            }
                            else {
                                //                                tmpdata.BookingName = "Block Room (" + d.Comment + ")";
                                //                                tmpdata.Description = "Block Room (" + d.Comment + ")";
                                tmpdata.BookingName = "Block Room".l('SC50400');
                                tmpdata.Description = "Block Room".l('SC50400');
                            }
                            if (tmpdata.ResourceId == d.RoomId && d.insertedRecord != true) {

                                //var StartDate = Ext.util.Format.date(d.StartDate, 'Y-m-d');
                                var StartDate = d.StartDate
                                StartDate = new Date(StartDate);
                                var StartTime = d.FromTime.split(":");
                                StartDate.setHours(StartTime[0], StartTime[1]);

                                // var EndDate = Ext.util.Format.date(d.EndDate, 'Y-m-d');
                                var EndDate = d.EndDate
                                EndDate = new Date(EndDate);
                                var ToTime = d.ToTime.split(":");
                                EndDate.setHours(ToTime[0], ToTime[1]);

                                tmpdata.DateEnd = EndDate;
                                tmpdata.EndDate = EndDate;
                                tmpdata.StartDate = StartDate;
                                tmpdata.DateStart = StartDate;

                                tmpdata.ISBlockRoom = true;
                                tmpdata.RoomAvailabilityBlockId = d.RoomAvailabilityBlockId;
                                d.insertedRecord = true;

                                bookingArr.push(tmpdata);

                            }
                        });
                    });

                }
                var schedGrid = Ext.ComponentQuery.query('addneweventscheduler [itemid=itemschedulerroomselect]')[0];
                schedGrid.eventStore.loadData(bookingArr);
            },
            failure: function () {
            }
        });

        /*End of Block room detail*/
    },

    openRoomWindow: function (record) {
        var window = Ext.WindowManager.get('idroomdetailwindow');
        if (!Utils.isValid(window)) {
            window = Ext.create('widget.roomdetailwindow');
        }
        window.show();
        window.center();

        var txtExternalName = Ext.ComponentQuery.query('[itemid="txtExternalName"]')[0];
        var txtInternalName = Ext.ComponentQuery.query('[itemid="txtInternalName"]')[0];
        var txtArea = Ext.ComponentQuery.query('[itemid="txtArea"]')[0];
        var txtLength = Ext.ComponentQuery.query('[itemid="txtLength"]')[0];
        var txtHeight = Ext.ComponentQuery.query('[itemid="txtHeight"]')[0];
        var txtWidth = Ext.ComponentQuery.query('[itemid="txtWidth"]')[0];
        var labelRoomDescription = Ext.ComponentQuery.query('[itemid="roomDescriptionLabel"]')[0];

        var store = Ext.getStore('bookingwizard.RoomDetailsStore');
        var roomSetupStore = Ext.getStore('bookingwizard.RoomSetupListStore');

        roomSetupStore.proxy.setExtraParam('id', record.data.Id);
        roomSetupStore.proxy.setExtraParam('languageId', user_language);
        roomSetupStore.load();


        txtExternalName.setValue(record.data.ExternalName);
        txtInternalName.setValue(record.data.RoomName);
        txtArea.setValue(Ext.util.Format.number(record.data.Width * record.data.Length, '00.00'));
        txtLength.setValue(record.data.Length);
        txtWidth.setValue(record.data.Width);
        txtHeight.setValue(record.data.Height);



        store.proxy.setExtraParam('id', record.data.Id);
        store.load(function (st) {
            var el = st[0];
            var tmp = "";

            tmp = el.getExternalName();
            if (Utils.isValid(tmp)) {
                txtExternalName.setValue(tmp);
            }

            tmp = el.getInternalName();
            if (Utils.isValid(tmp)) {
                txtInternalName.setValue(tmp);
            }

            tmp = el.getLenght();
            if (Utils.isValid(tmp)) {
                txtLength.setValue(tmp);
            }
            tmp = el.getWidth();
            if (Utils.isValid(tmp)) {
                txtWidth.setValue(tmp);
            }
            tmp = el.getHeight();
            if (Utils.isValid(tmp)) {
                txtHeight.setValue(tmp);
            }
            txtArea.setValue(Math.round((txtLength.getValue() * txtWidth.getValue())) + ' m2');


            tmp = el.getDescription();
            if (Utils.isValid(tmp)) {
                labelRoomDescription.setText(tmp);
            }


        });


        var photos = Ext.getStore('property.RoomPhotoListStore');
        photos.removeAll();
        photos.proxy.setExtraParam('id', record.data.Id);
        photos.proxy.setExtraParam('languageId', user_language);
        photos.proxy.setExtraParam('searchParam', '');
        photos.on('load', function () {
            log("photos", photos);
        });
        photos.load();

        var floors = Ext.getStore('bookingwizard.RoomFloorPlanStore');
        floors.removeAll();
        floors.proxy.setExtraParam('id', record.data.PropertyId);
        floors.proxy.setExtraParam('languageId', user_language);
        //floors.proxy.setExtraParam('searchParam', '');
        floors.on('load', function () {
            log("floors", floors);
        });
        floors.load();
    },
    openPlanboardWindow: function () {
        Ext.create('widget.addneweventscheduler');
    },

    setVerticleLine: function () {

        /*Start: Verticle Line showing code*/
        try {
            var form = Utils.getFirstComp(Ext.ComponentQuery.query('addnewevent form[itemid="formAddEvent"]'));
            var formObject = form.getForm().getValues();
            var d1 = formObject.EventDay;

            /*Get the start time and end time from multislider*/
            var slider = Ext.ComponentQuery.query('addneweventscheduler multislider[itemid="itemHoursSlider"]')[0];
            values = slider.getValues();

            /*Get Start Hourmin*/
            if (values[0]) {
                var modular = parseInt(values[0]) % (12);
                var newValue = parseInt(values[0]) - modular;
                var startHour = parseInt(newValue) / 12;
                var startMinute = parseInt(modular) * 5;
            }

            /*Get Start Hourmin*/
            if (values[1]) {
                var modular = parseInt(values[1]) % (12);
                var newValue = parseInt(values[1]) - modular;
                var endHour = parseInt(newValue) / 12;
                var endMinute = parseInt(modular) * 5;
            }


            var lineStart = new Date(d1);
            var lineEnd = new Date(d1);
            lineStart.setHours(startHour, startMinute);
            lineEnd.setHours(endHour, endMinute);

            var schedGrid = Ext.ComponentQuery.query('addneweventscheduler [itemid=itemschedulerroomselect]')[0];
            schedGrid.items.items[1].plugins[1].store.removeAll();
            schedGrid.items.items[1].plugins[1].store.insert(0, { "Date": lineStart, "Text": 'Start time'.l('SC50400'), "Cls": ' orange-line' });
            schedGrid.items.items[1].plugins[1].store.insert(0, { "Date": lineEnd, "Text": 'End time'.l('SC50400'), "Cls": ' orange-line' });
        } catch (e) {

        }
        /*End: Verticle Line showing code*/
    }

});

