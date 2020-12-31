Ext.define('Regardz.controller.bookingwizard.BookingWizardStep2', {
    extend: 'Ext.app.Controller',
    stores: ['bookingwizard.SchedulerEventStore', 'bookingwizard.SchedulerResourceStore', 'operations.RoomTypeStore', 'operations.RoomSetupStore',
    'common.PropertyForNamesStore', 'operations.RoomTypeStore', 'common.PropertyForIdAndDistanceStore', 'property.BWPropertyMeetingTypeStore',
    'property.PropertyAtmosphereListStore', 'property.PhotoGalleryListStore', 'property.BWPropertyFacilityIcons', 'property.RoomPhotoListStore',
    'property.VideoLibraryListStore', 'operations.PlanboardFloorsStore', 'bookingwizard.RoomFloorPlanStore', 'property.PropertyDetails',
    'bookingwizard.RoomDetailsStore', 'bookingwizard.RoomSetupListStore', 'property.FloorPlanStore', 'bookingwizard.InfoLeftPanelStore',
    'common.PropertyForPropertyIdAndDistanceStore', 'bookingwizard.PlanboardRoomlistBWStore', 'bookingwizard.PlanboardBookinglistBWStore', 'operations.PlanboardFloorsStore', 'operations.AvailabilityStore'],
    views: ['bookingwizard.BookingWizardStep2', 'bookingwizard.PropertyInformation', 'bookingwizard.InfoPanelLeftView', 'bookingwizard.RoomDetailWindow'],
    stepTwoObject: {},
    externalBookingTrackingId: null,
    externalBookingId: null,
    thisController: false,
    StartDate: {},
    EndDate: {},
    MultipleDays: false,
    IsQueueBased: false,
    restrictToSetBooking: false,
    CopiedEvent: null,
    refs: [{
        selector: 'bookingwizardstep2',
        ref: 'bookingwizardstep2'
    }],
    init: function () {
        Ext.getCmp('wizard-no-confirmation').getEl().show();
        Ext.getCmp('wizard-close').getEl().hide();
        Ext.getCmp('move-prev').getEl().hide();
        var me = this;
        me.selectedPropertyId = 0;
        //   me.loadStepTwoObject(me);
        try {
            Ext.getCmp('move-prev').hide();
            Ext.getCmp('move-prev').getEl().hide();
            Ext.getCmp('move-prev').setDisabled(true);
        } catch (e) {

        }
        this.control({
            'panel [itemid="steptwo"] > panel': {
                activate: function () {
                    // me.loadMultiDayLeftPanel();

                    //  me.loadStepTwoObject(me);
                    //                    Ext.getCmp('move-next').setDisabled(false);
                    //                    Ext.getCmp('move-next').setText("Next");
                },
                afterrender: function () {

                    var propertyCombo = Ext.ComponentQuery.query('bookingwizardstep2 combo[name="PropertyId"]')[0];
                    if (propertyCombo) {
                        var propertyComboStore = propertyCombo.getStore();
                        var data = propertyComboStore.getRange();
                        propertyComboStore.clearFilter();
                        propertyComboStore.removeAll();
                        propertyComboStore.load();
                    }

                    me.loadStepTwoObject(me);
                    me.externalBookingTrackingId = 0;
                    me.externalBookingId = 0;
                }
            },

            'bookingwizardstep2 multislider[itemid="itemHoursSlider"]': {
                change: function (s, v) {

                    var showType = Ext.ComponentQuery.query('bookingwizardstep2 combo[itemid="comboShowType"]')[0];

                    if (showType && showType.getValue() != 'd') {
                        return false
                    }

                    var start = Ext.ComponentQuery.query('[itemid="itemHourStart"]')[0];
                    var end = Ext.ComponentQuery.query('[itemid="itemHourEnd"]')[0];
                    values = s.getValues();
                    var firstSlider = "00:00";
                    var secondSlider = "00:00";

                    /*Logic of calculation*/
                    // we have 5 min slots; so in 1 hour it will total 12 slots; 
                    //calulation for getting hour
                    //modular = (value % 12) => value - modular = newValue => newValue/12 = Hour;
                    //calculation for getting minue
                    //modular * 5 = number of minute

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
                    if (start)
                        start.setText(firstSlider);
                    if (end)
                        end.setText(secondSlider);

                    me.setVerticleLine(showType.getValue());
                    //scheduler.switchViewPreset('hourAndDay', new Date(d.getFullYear(), d.getMonth(), d.getDate(), values[0]), new Date(d.getFullYear(), d.getMonth(), d.getDate(), values[1] + 1));
                }
            },
            'bookingwizardstep2 [itemid="comboShowType"]': {
                change: function (t, e, o) {

                    /*Multislider shows only when view type is Day view otherwise disable*/
                    var multislider = Ext.ComponentQuery.query('bookingwizardstep2 multislider[itemid="itemHoursSlider"]')[0];

                    var multislidercheckbox = Ext.ComponentQuery.query('bookingwizardstep2 checkbox[itemid="multislidecheckbox"]')[0];
                    if (multislider && multislidercheckbox) {
                        if (e == 'd' && multislidercheckbox.getValue() == true) {
                            multislider.enable();
                        }
                        else {
                            multislider.disable();
                            //return false;
                        }
                    }
                    me.applyFilters();
                    //me.setViewResolutionPlanboard(e);
                }
            },
            'bookingwizardstep2 [itemid="itemDisplayStartTime"]': {
                change: function (t, e, o) {

                    try {
                        var scheduler = Ext.getCmp('sch-grid');
                        var datepicker = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="datepickerfield"]')[0];
                        var displayStartTime = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="itemDisplayStartTime"]')[0];
                        var d = datepicker.getValue();

                        var endDate = new Date(d);
                        endDate.setDate(endDate.getDate() + 1);

                        scheduler.switchViewPreset('hourAndDay', new Date(d.getFullYear(), d.getMonth(), d.getDate(), displayStartTime.getValue()), new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 24));
                        var step2ZoomSliderObj = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="step2ZoomSlider"]')[0];

                        if (step2ZoomSliderObj) {
                            var v = step2ZoomSliderObj.getValue();

                            var scheduler = Ext.getCmp('sch-grid');
                            scheduler.setTimeColumnWidth(v);
                        }
                    } catch (e) {

                    }
                }
            },

            'bookingwizardstep2 [itemid="itemScheduler"]': {
                select: function (el, record, eopts) {

                    this.openRoomWindow(record);
                    return true;

                    switch (record.data.Level) {
                        case 1: //Open Property window

                            Utils.LoadPropertyWindow(null, record.data.PropertyId);

                            break;
                        case 2: //Open Room window
                            this.openRoomWindow(record);

                            break;
                        case 3: //Open sharable Room window 
                            this.openRoomWindow(record);
                            break;
                        default:
                            break;

                    }

                },

                eventdrop: function (scheduler, records, isCopy, eOpts) {

                    var btid = this.stepTwoObject.BookingTrackingId;
                    var bid = this.stepTwoObject.BookingId;


                    //set the latest bookingTrackingid to event row if bookingid is match... as from api its has a null value if booking gets confirmed once..
                    // if we do not assign the the new trackingid is generated
                    if ((bid > 0) && (bid == records[0].raw.BookingId) && btid > 0) {
                        records[0].raw.BookingTrackingId = btid;
                    }
                    if ((bid > 0) && (bid != records[0].raw.BookingId)) { //Another booking dropped

                        if (Utils.isValid(records[0].modified.StartDate)) {
                            //Ext.Msg.alert('Error'.l('g'), 'Not allowed to drop event from another booking to another time interval');
                            display_alert('MG52000');
                            this.applyFilters();
                            // alert('Not allowed to drop event from another booking to another time interval');
                            return;
                        }
                    }
                    else if ((btid > 0) && (btid != records[0].raw.BookingTrackingId)) { //Another booking dropped

                        if (Utils.isValid(records[0].modified.StartDate)) {
                            display_alert('MG52000');
                            //Ext.Msg.alert('Error'.l('g'), 'Not allowed to drop event from another booking to another time interval');
                            this.applyFilters();
                            //alert('Not allowed to drop event from another booking to another time interval');
                            return;
                        }
                    }

                    var ev = records[0];
                    ev.raw.oldProperty = ev.raw.PropertyId;
                    //                    if (ev.raw.BookingStatusCode != "OP2") {
                    //                        this.IsQueueBased = Utils.IsQueueBased(ev, 'sch-grid');
                    //                        if (this.IsQueueBased) {
                    //                            this.IsQueueBased = false;
                    //                            this.applyFilters();
                    //                            alert('Not allowed to overlap another event');
                    //                            return;
                    //                        }
                    //                    }

                    /*get the property name*/
                    var sch = Ext.getCmp('sch-grid');
                    var rIndex = sch.resourceStore.findExact('Id', Number(ev.get('ResourceId')));
                    var r = sch.resourceStore.getAt(rIndex);
                    ev.raw.newProperty = r.raw.PropertyId;
                    /*end get the property name*/


                    var evRaw = records[0].raw; // Get raw data (here we have all the details)


                    var pEObj = {};
                    var sch = Ext.getCmp('sch-grid');
                    //                    if (ev.raw.IsMultipleDayBooking == true && ev.raw.IsFirstDay == false) {
                    //                        this.applyFilters();
                    //                        alert('Multiple dat booking you can move only the first day');
                    //                        return;
                    //                    }

                    // Check if the user moved the event to another day
                    var actualDate = Ext.Date.format(new Date(records[0].get('StartDate')), 'Y-m-d');
                    var prevDate = new Date();

                    if (Utils.isValid(records[0].modified.StartDate)) {
                        prevDate = Ext.Date.format(new Date(records[0].modified.StartDate), 'Y-m-d');
                    } else {
                        prevDate = Ext.Date.format(new Date(records[0].get('StartDate')), 'Y-m-d');
                    }

                    if (actualDate == prevDate) { // Drop in the same day
                        pEObj.RoomId = ev.get('ResourceId');

                        var dateStart = new Date(ev.get('StartDate'));
                        var dateEnd = new Date(ev.get('EndDate'));

                        pEObj.BookingEventDate = Ext.Date.format(dateStart, 'Y-m-d');

                        pEObj.FromTime = Ext.Date.format(dateStart, 'H:i');
                        pEObj.ToTime = Ext.Date.format(dateEnd, 'H:i');

                        /* Get the turntime buffer from resource(room) */
                        var rIndex = sch.resourceStore.findExact('Id', Number(ev.get('ResourceId')));
                        var r = sch.resourceStore.getAt(rIndex);
                        if (Utils.isValid(r)) {
                            pEObj.TurnTimeBuffer = r.get('TurnTimeBuffer');
                        }

                        pEObj.UserId = CurrentSessionUserId;
                        pEObj.BookingTrackingId = evRaw.BookingTrackingId;
                        pEObj.BookingId = evRaw.BookingId;
                        pEObj.BookingEventId = evRaw.BookingEventId;
                        pEObj.BookingEventTrackingId = evRaw.BookingEventTrackingId;

                        /*Added propertyId*/
                        pEObj.OldPropertyId = ev.raw.oldProperty;
                        pEObj.NewPropertyId = ev.raw.newProperty;
                        pEObj.IsMainEvent = evRaw.IsMainEvent;
                        this.ProcessEvent(pEObj, this, 0);

                    } else { //Drop on different day
                        var actualTmp = new Date(records[0].get('StartDate'));
                        var prevTmp = new Date();
                        if (actualTmp.getDay() != prevTmp.getDay() && prevTmp > actualTmp) {
                            this.applyFilters();
                            //alert('Not allowed to move to a passed day');
                            //Ext.Msg.alert('Error'.l('g'), 'Not allowed to move to a passed day');
                            display_alert('MG52001');
                            var datepicker = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="datepickerfield"]')[0];
                            datepicker.setValue(new Date(prevTmp), 'Y-m-d');
                            Ext.ComponentQuery.query('[itemid="comboShowType"]')[0].setValue('d');
                            return;
                        }

                        var dateStart = new Date(ev.get('StartDate'));
                        var dateEnd = new Date(ev.get('EndDate'));

                        pEObj.BookingEventDate = Ext.Date.format(dateStart, 'Y-m-d');
                        pEObj.RoomId = ev.get('ResourceId');
                        // var modifiedStart = new Date(records[0].modified.StartDate);
                        //var modifiedEnd = new Date(records[0].modified.EndDate);
                        var modifiedStart = new Date(dateStart);
                        var modifiedEnd = new Date(dateEnd);

                        pEObj.FromTime = Ext.Date.format(modifiedStart, 'H:i');
                        pEObj.ToTime = Ext.Date.format(modifiedEnd, 'H:i');

                        /* Get the turntime buffer from resource(room) */
                        var rIndex = sch.resourceStore.findExact('Id', Number(ev.get('ResourceId')));
                        var r = sch.resourceStore.getAt(rIndex);
                        if (Utils.isValid(r)) {
                            pEObj.TurnTimeBuffer = r.get('TurnTimeBuffer');
                        }

                        pEObj.UserId = CurrentSessionUserId;
                        pEObj.BookingTrackingId = evRaw.BookingTrackingId;
                        pEObj.BookingId = evRaw.BookingId;
                        pEObj.BookingEventId = evRaw.BookingEventId;
                        pEObj.BookingEventTrackingId = evRaw.BookingEventTrackingId;

                        /*Added propertyId*/
                        pEObj.OldPropertyId = ev.raw.oldProperty;
                        pEObj.NewPropertyId = ev.raw.newProperty;
                        pEObj.IsMainEvent = ev.raw.IsMainEvent;
                        this.ProcessEvent(pEObj, this, 1);
                    }

                },
                // beforeeventresizefinalize: function (scheduler, object, eOpt) { // Resizing the event
                eventresizeend: function (scheduler, object, eOpt) { // Resizing the event
                    var btid = (this.stepTwoObject.BookingTrackingId > 0) ? this.stepTwoObject.BookingTrackingId : 0;
                    var bid = (this.stepTwoObject.BookingId > 0) ? this.stepTwoObject.BookingId : 0;
                    var objBId = object.raw.BookingId;

                    //                    if (bid != objBId || objBId == 0) {
                    //                        if (btid != object.raw.BookingTrackingId) {
                    //                            //alert('Not allowed to resize event from another booking');
                    //                            Ext.Msg.alert('Error'.l('g'), 'Not allowed to resize event from another booking');
                    //                            this.applyFilters();
                    //                            return;
                    //                        }
                    //                    }

                    //set the latest bookingTrackingid to event row if bookingid is match... as from api its has a null value if booking gets confirmed once..
                    // if we do not assign the the new trackingid is generated
                    if ((bid > 0) && (bid == objBId) && btid > 0) {
                        object.raw.BookingTrackingId = btid;
                    }
                    if (bid != objBId && bid > 0) {
                        //alert('Not allowed to resize event from another booking');
                        //  Ext.Msg.alert('Error'.l('g'), 'Not allowed to resize event from another booking');
                        display_alert('MG52002');
                        this.applyFilters();
                        return;
                    }
                    else if (btid > 0 && btid != object.raw.BookingTrackingId) {
                        //   Ext.Msg.alert('Error'.l('g'), 'Not allowed to resize event from another booking');
                        display_alert('MG52002');
                        this.applyFilters();
                        return;
                    }

                    var sch = Ext.getCmp('sch-grid');
                    var ev = object;
                    var evRaw = object.raw; // Get raw data (here we have all the details)

                    var pEObj = {};
                    /* Get the turntime buffer from resource(room) */
                    var rIndex = sch.resourceStore.findExact('Id', Number(ev.get('ResourceId')));
                    var r = sch.resourceStore.getAt(rIndex);

                    if (Utils.isValid(r)) {
                        /*if setup time given then it would be priority: setup time = event setup time:: Turntimebuffer=roomsetup time*/
                        if (r.get('SetupTime') > 0)
                            pEObj.TurnTimeBuffer = r.get('SetupTime');
                        else
                            pEObj.TurnTimeBuffer = r.get('TurnTimeBuffer');
                    }

                    /*Buffer resize*/
                    if (evRaw.isSetupTime == true) {
                        /*24 hour validation*/
                        var startdatetime = new Date(object.data.StartDate);
                        var bufferenddatetime = new Date(object.data.EndDate);
                        var enddatetime = new Date(evRaw.eventEndDate);
                        /*(event end time) - (buffer start time) = total event time*/
                        var diffMs = enddatetime - startdatetime; // milliseconds between startdatetime & enddatetime                       
                        var actualHours = Math.floor(diffMs / 86400000 * 24); // days
                        /*end 24 hour validation*/

                        /*date change validation*/
                        var afterResizeStartDate = Ext.Date.format(startdatetime, 'd');
                        var beforeResizeStartDate = Ext.Date.format(evRaw.StartDate, 'd');
                        /*end date change validation*/

                        if (actualHours >= 24) {
                            Ext.Msg.alert('Error', 'Event should not longer than 24 hours');
                            this.applyFilters();
                            return false;
                        }
                        else if (beforeResizeStartDate != afterResizeStartDate) {
                            Ext.Msg.alert('Error', 'Event should start on selected date only');
                            this.applyFilters();
                            return false;
                        }

                        var newBufferTime = Utils.differeceMinute(bufferenddatetime, startdatetime);

                        pEObj.TurnTimeBuffer = newBufferTime;
                        pEObj.isSetupTime = true; //buffer time resized
                    }
                    /*Event resize*/
                    else {

                        /*24 hour validation*/
                        var startdatetime = new Date(object.data.StartDate);
                        var enddatetime = new Date(object.data.EndDate);

                        /*(event end time) - (event start time) + buffer time of event = total event time*/
                        var diffMs = parseInt(enddatetime - startdatetime) + parseInt(pEObj.TurnTimeBuffer); // milliseconds between startdatetime & enddatetime                       
                        var actualHours = Math.floor(diffMs / 86400000 * 24); // days
                        /*end 24 hour validation*/


                        /*Date change validation*/
                        var startdatetime = new Date(evRaw.StartDate);
                        var newstartdatetime = new Date(object.data.StartDate);

                        //actual startdate = startdate-buffertime 
                        var beforeStartDate = startdatetime - parseInt(pEObj.TurnTimeBuffer);
                        //after resize start date - newstartdate-buffertime
                        var afterStartDate = newstartdatetime - parseInt(pEObj.TurnTimeBuffer);

                        var beforeStartDate = Ext.Date.format(beforeStartDate, 'd');
                        var afterStartDate = Ext.Date.format(afterStartDate, 'd');


                        /*End of date change validation*/

                        if (actualHours >= 24) {
                            //Ext.Msg.alert('Error', 'Event should not longer than 24 hours');
                            display_alert('MG52003');
                            this.applyFilters();
                            return false;
                        }
                        /*start resize moved to other day*/
                        else if (beforeStartDate != afterStartDate) {
                            // Ext.Msg.alert('Error', 'Event should start on selected date only');
                            display_alert('MG52004');
                            this.applyFilters();
                            return false;
                        }
                        pEObj.isSetupTime = false; //event time resized
                    }
                    /*End Event resize*/

                    /*Prepare object for resize*/

                    var dateStart = new Date(object.data.StartDate);
                    var dateEnd = new Date(object.data.EndDate);
                    pEObj.RoomId = ev.get('ResourceId');
                    pEObj.BookingEventDate = Ext.Date.format(dateStart, 'Y-m-d');
                    pEObj.FromTime = Ext.Date.format(dateStart, 'H:i');
                    pEObj.ToTime = Ext.Date.format(dateEnd, 'H:i');

                    pEObj.UserId = CurrentSessionUserId;
                    pEObj.BookingTrackingId = (evRaw.BookingTrackingId > 0) ? evRaw.BookingTrackingId : 0;
                    pEObj.BookingId = evRaw.BookingId;
                    pEObj.BookingEventId = evRaw.BookingEventId;
                    pEObj.BookingEventTrackingId = (evRaw.BookingEventTrackingId > 0) ? evRaw.BookingEventTrackingId : 0;
                    pEObj.IsMainEvent = evRaw.IsMainEvent;

                    this.ProcessEvent(pEObj, this);
                },

                beforeeventadd: function (scheduler1, newEventRecord, eOpts) {

                    var scheduler = Ext.getCmp('sch-grid');
                    this.IsQueueBased = Utils.IsQueueBased(newEventRecord, 'sch-grid');
                    //Get the resource
                    //var rs = scheduler.resourceStore.nodeStore;
                    var rs = scheduler.resourceStore;
                    var ev = scheduler.eventStore;


                    var resourceIndex = rs.findExact('Id', newEventRecord.data.ResourceId);
                    var resourceToTest = rs.getAt(resourceIndex);

                    var turnTimeForRoom = (resourceToTest.data.TurnTimeBuffer > 0) ? resourceToTest.data.TurnTimeBuffer : 0;
                    /*@PV: Below code is commented because validation of event add is done in db level
                    here it should pass the start and end time from drag-drop creation
                    */
                    //                    if (resourceToTest.get('isSharable')) {

                    //                    } else {
                    //                        var index = ev.findExact('ResourceId', newEventRecord.data.ResourceId);
                    //                        //Check if already have an event
                    //                        if (index > -1) {
                    //                            var event = ev.getAt(index);

                    //                            var newCreatedStart = new Date(newEventRecord.data.StartDate);
                    //                            var newCreatedEnd = new Date(newEventRecord.data.EndDate);
                    //                            var evStart = new Date(event.data.StartDate);
                    //                            var evEnd = new Date(event.data.EndDate);

                    //                            if (evStart <= newCreatedStart && newCreatedStart <= evEnd) {
                    //                                return false;
                    //                            }
                    //                            else if (evStart <= newCreatedEnd && newCreatedEnd <= evEnd) {
                    //                                return false;
                    //                            }

                    //                            /*if event is more than 24hours then it should not allowed to create*/
                    //                            
                    //                        }

                    //                    }

                    //                    if (!Utils.AllowCreate)
                    //                        return false;

                    var id = 0;
                    if (Utils.isValid(newEventRecord.data.StartDate)) {
                        var sd = new Date(newEventRecord.data.StartDate);
                        id = Ext.util.Format.date(sd, 'Ymd');
                    }

                    if (Utils.isEventCheck == true && typeof Utils.Planboard[id] != 'undefined' && typeof Utils.Planboard[id].AllowCreate != 'undefined' && Utils.Planboard[id].AllowCreate == false) {


                        return false;
                    }
                    else if (newEventRecord) {

                        var startdatetime = new Date(newEventRecord.data.StartDate);
                        var enddatetime = new Date(newEventRecord.data.EndDate);
                        var diffMs = (enddatetime - startdatetime); // milliseconds between startdatetime & enddatetime           

                        var actualHours = Math.floor(diffMs / 86400000 * 24); // days     

                        if (scheduler.viewPreset != 'hourAndDay') {
                            display_alert('MG52005');
                            //Ext.Msg.alert('Error', 'Event not allowed to create on week/month view');
                            return false;
                        }
                        if (actualHours >= 24) {
                            display_alert('MG52006');
                            //Ext.Msg.alert('Error', 'Event should not longer than 24 hours');
                            return false;
                        }

                        var datepicker = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="datepickerfield"]')[0];

                        var datePickerDate = Ext.util.Format.date(datepicker.getValue(), 'd');
                        var eventStartDate = Ext.util.Format.date(startdatetime, 'd');

                        if (datePickerDate != eventStartDate) {
                            Ext.Msg.alert('Error', 'Event should start on selected date only');
                            display_alert('MG52004');
                            return false;
                        }

                    }

                    var index = rs.find('Id', newEventRecord.getResourceId());
                    var resourceRecord = rs.getAt(index);

                    //Get all the events
                    var events = scheduler.eventStore;

                    //Get event start date
                    var initialStart = newEventRecord.data.StartDate;
                    //Get event end date
                    var initialEnd = newEventRecord.data.EndDate;
                    //Constant
                    var MS_PER_MINUTE = 60000;

                    //Calculate new date
                    var newStartDate = new Date(initialStart - resourceRecord.data.TurnTimeBuffer * MS_PER_MINUTE);
                    var originalStartDate = new Date(initialStart);

                    if (Utils.isValid(resourceRecord.data.TurnTimeBuffer) && resourceRecord.data.TurnTimeBuffer > 0) {
                        //Insert turttime event to index 0
                        scheduler.eventStore.insert(0, {
                            ResourceId: newEventRecord.data.ResourceId,
                            StartDate: newStartDate, EndDate: newEventRecord.data.StartDate,
                            CssClass: "turnTime", Cls: "turnTime", EventId: newEventRecord.id, isSetupTime: true,
                            TurnTimeBuffer: resourceRecord.data.TurnTimeBuffer
                        });
                        scheduler.eventStore.getAt(0).setResizable('start');
                        scheduler.eventStore.getAt(0).setDraggable(false);
                    }

                    var panel = Ext.ComponentQuery.query('bookingwizardstep2 form[itemid="itemBigPanelStep2"]')[0];
                    var formEdit = panel.getForm();


                    var startBuffertMin = newStartDate.getTime();
                    var endBuffertMin = newEventRecord.data.StartDate.getTime();

                    var diff = parseInt(endBuffertMin) - parseInt(startBuffertMin);


                    var date = new Date(diff);
                    var h = date.getHours();
                    var m = date.getMinutes();
                    var min = parseInt(h * 60) + parseInt(m);

                    formEdit.findField('StartDate').setValue(originalStartDate);
                    formEdit.findField('EndDate').setValue(newEventRecord.data.EndDate);
                    formEdit.findField('propertyId').setValue(resourceRecord.data.PropertyId);
                    formEdit.findField('selectedRoomId').setValue(resourceRecord.data.ResourceId);
                    formEdit.findField('setupTimeField').setValue(resourceRecord.data.TurnTimeBuffer);
                    //  formEdit.findField('setupTimeField').setValue(min);
                    // ;
                    me.createEventEntryDB();

                },
                eventcontextmenu: function (s, obj, e) {

                    e.stopEvent();

                    var items = '', isCompanyAvail = false, isIndividualAvail = false;

                    var newobj = new Object;
                    
                    newobj.BookingEventDate = Ext.Date.format(new Date(obj.raw.StartDate), 'Y-m-d');
                    newobj.BookingEventId = obj.raw.BookingEventId;
                    newobj.BookingEventTrackingId = obj.raw.BookingEventTrackingId;
                    newobj.BookingId = obj.raw.BookingId;
                    newobj.BookingTrackingId = obj.raw.BookingTrackingId;
                    newobj.ToTime = Ext.Date.format(new Date(obj.raw.EndDate), 'H:i');
                    newobj.FromTime = Ext.Date.format(new Date(obj.raw.StartDate), 'H:i');
                    newobj.IsConfirmed = obj.raw.IsConfirmed;
                    newobj.IsMainEvent = obj.raw.IsMainEvent;
                    newobj.LanguageId = obj.raw.LanguageId;
                    newobj.NewPropertyId = obj.raw.PropertyId;
                    newobj.OldPropertyId = obj.raw.PropertyId;
                    newobj.RoomId = obj.raw.ResourceId;
                    newobj.TurnTimeBuffer = obj.raw.SetupTime;
                    //newobj.UserId = obj.raw.UserId;
                    newobj.UserId = CurrentSessionUserId;

                    if (obj.raw.ISBlockRoom == true || obj.raw.IsCore || obj.raw.NonEditable || obj.raw.DoNotMove || obj.raw.IsLinkedEvent == true
                        || obj.rawCls == "turnTime") {
                        return true;
                    }

                    var isRequiredCoppied = true;
                    if (me.CopiedEvent == null) {
                        var isRequiredCoppied = false;
                    }
                    var items = [{
                        text: 'Move Event',
                        action: 'copy_event_detail',
                        iconCls: 'icon-copy',
                        eventObj: newobj
                    },
                    {
                        text: 'Cancel Move Event',
                        action: isRequiredCoppied == true ? 'cancel_event_detail' : '',
                        iconCls: 'icon-no',
                        disabled: !isRequiredCoppied,
                        eventObj: newobj
                    }
                    ];

                    s.ctx = new Ext.menu.Menu({
                        items: items
                    })
                    s.ctx.showAt(e.getXY());
                },
                scheduledblclick: function (scheduler, clickedDate, rowIndex, resource, e, eOpts) {
                    if (me.CopiedEvent == null) return false;
                    var vp = scheduler.store.data.items[rowIndex];
                    me.CopiedEvent.NewPropertyId = vp.data.PropertyId;
                    me.CopiedEvent.RoomId = vp.data.ResourceId;
                    me.CopiedEvent.BookingEventDate = Ext.Date.format(clickedDate, 'Y-m-d');
                    Ext.MessageBox.confirm('Warning'.l('g'), 'Are you sure to save copied event here?', function (btn) {
                        if (btn === 'yes') {
                            me.ProcessEvent(me.CopiedEvent, me, 1);
                            me.CopiedEvent = null;
                        }
                    });
                    return false;
                }
            },
            'menu > menuitem[action="copy_event_detail"]': {
                click: function (t, records, eOpt) {
                    me.CopiedEvent = t.eventObj;
                }
            },

            'menu > menuitem[action="cancel_event_detail"]': {
                click: function (t, records, eOpt) {
                    me.CopiedEvent = null;
                }
            },

            '[itemid="photosList"]': {
                select: function (el, record, index, eOpt) {
                    var photoHolder = Ext.ComponentQuery.query('[itemid="propertyImageHolder"]')[0];
                    var descriptionHolder = Ext.ComponentQuery.query('[itemid="propertyPhotoDescription"]')[0];
                    photoHolder.setSrc(image_path + record.raw.OriginalFullImagePath);
                    descriptionHolder.setText(record.raw.PhotoTitle);
                }
            },
            '[itemid="videoList"]': {
                select: function (el, record, index, eOpt) {
                    var videoHolder = Ext.ComponentQuery.query('[itemid="mainVideo"]')[0];
                    var height = 560;
                    var width = 315;
                    if (videoHolder) {
                        height = videoHolder.getHeight() - 5;
                        width = videoHolder.getWidth() - 5;
                    }

                    var url = record.raw.youtubeIFramURL;
                    var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                    if (videoid != null) {
                        var vId = videoid[1].replace('embed/', '');
                        videoHolder.update(' <object width="' + width + '" height="' + height + '"><param name="movie" value="http://www.youtube.com/v/' + vId + '"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + vId + '" type="application/x-shockwave-flash" width="' + width + '" height="' + height + '" allowscriptaccess="always" allowfullscreen="true"></embed></object>');
                    }
                }
            },
            '[itemid="roomPhotosList"]': {
                select: function (el, record, index, eOpt) {
                    var imageHolder = Ext.ComponentQuery.query('[itemid="roomImageHolder"]')[0];
                    var imageDescription = Ext.ComponentQuery.query('[itemid="roomPhotoDescription"]')[0];
                    imageHolder.setSrc(image_path + record.raw.OriginalFullImagePath);
                    imageDescription.setText(record.raw.PhotoTitle);
                }
            },
            '[itemid="floorPlanList"]': {
                select: function (el, record, index, eOpt) {
                    var mainFloorHolder = Ext.ComponentQuery.query('[itemid="mainFloor"]')[0];

                    // Sample pdf for test http://samplepdf.com/sample.pdf
                    //mainFloorHolder.update('<object width="100%" height="100%" data="http://samplepdf.com/sample.pd"></object>');
                    mainFloorHolder.update('<object width="100%" height="100%" data="' + image_path + record.raw.FilePath + '"></object>');
                }
            },
            '[itemid="propertyFloorPlanList"]': {
                select: function (el, record, index, eOpt) {
                    var mainFloorHolder = Ext.ComponentQuery.query('[itemid="propertyMainFloor"]')[0];

                    // Sample pdf for test http://samplepdf.com/sample.pdf
                    //mainFloorHolder.update('<object width="100%" height="100%" data="http://samplepdf.com/sample.pd"></object>');
                    mainFloorHolder.update('<object width="100%" height="100%" data="' + image_path + record.raw.FilePath + '"></object>');
                }
            },
            'bookingwizardstep2 textfield[action="search_action"]': {
                change: function (t, n, old) {

                    Ext.getStore('common.PropertyForNamesStore').filterBy(function (rec) {
                        return rec.get('PropertyName').indexOf(n) > -1;
                    });

                    if (Ext.util.Format.trim(n) == '')
                        n = null;
                    /**
                    * Get the property list
                    **/
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/property/PropertyPaging',
                        type: 'GET',
                        params: {
                            id: 0,
                            start: 0,
                            limit: 0,
                            languageId: user_language,
                            userid: CurrentSessionUserId,
                            searchParam: n
                        },
                        success: function (r) {
                            var data = r.data;
                            var items = [];
                            Ext.each(data, function (record) {
                                items.push({
                                    name: 'PropertyId',
                                    PropertyName: record.PropertyName,
                                    checked: false,
                                    boxLabel: record.PropertyName
                                })
                            });
                        },
                        failure: function () {
                            //Ext.Msg.alert('Error', 'Information not fetched.');
                        }
                    })
                }
            },

            'bookingwizardstep2 combo[action="select_property"]': {
                select: function (combo, records, eOpt) {

                    var propertyId = records[0].data.PropertyId;
                    var PropertyName = records[0].data.PropertyName;

                    var gridPanel = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="PropertyList"]')[0];

                    if (Utils.isValid(gridPanel)) {

                        var initialStore = gridPanel.getStore();
                        var itemsCount = initialStore.data.items.length;

                        var flag = true;

                        if (itemsCount < 3) {
                            Ext.each(initialStore.data.items, function (value) {
                                Ext.each(value, function (val) {
                                    if (propertyId == val.raw.PropertyId) {
                                        flag = false;
                                    }
                                });
                            });
                            if (flag) {
                                initialStore.add({
                                    PropertyName: PropertyName,
                                    PropertyId: propertyId
                                });

                                var d = initialStore.data.items;

                                initialStore.commitChanges();

                                initialStore.sort({
                                    property: 'PropertyName',
                                    direction: "ASC"
                                });
                                if (Utils.PropertyListIDs == null) Utils.PropertyListIDs = [];
                                Utils.PropertyListIDs = Utils.push(Utils.PropertyListIDs, propertyId);

                                this.applyFilters();

                            }
                            else {
                                console.log("Property already added");
                            }
                        }
                        else {
                            console.log('Maximum size reached');
                        }

                        console.log(initialStore);
                    }


                }
            },
            'menu > menuitem[action="dropme"]': {
                click: function (t, e) {

                    //t.destroy();
                }
            },

            'bookingwizardstep2 [name="propertyCheckboxGroup"]': {
                change: function (t, newValue, oldValue, eOpts) {

                    var propertyIds = 0;
                    Ext.each(newValue, function (r) {
                        propertyIds = r.PropertyId;
                    });
                    if (typeof propertyIds != 'undefined')
                        propertyIds = propertyIds.toString();
                    else
                        propertyIds = 0;

                    Ext.getStore('operations.RoomTypeStore').load({
                        params: {
                            'id': propertyIds,
                            'languageId': user_language
                        }
                    });
                    //PropertyId
                }
            },
            'bookingwizardstep2 combo[action="ROOM_SETUP"]': {
                select: function (combo, records, eOpt) {
                    if (records[0].data.RoomSetupId) {
                        if (Ext.getCmp('booking-planboard')) {
                            Ext.getCmp('booking-planboard').getForm().findField('CAPACITY').enable();
                        }
                    } else {
                        if (Ext.getCmp('booking-planboard')) {
                            Ext.getCmp('booking-planboard').getForm().findField('CAPACITY').disable();
                        }
                    }
                }
            },
            /* Chnage actions for filters */
            'bookingwizardstep2 combo[itemid="itemRoomTypeCombo"]': {
                select: function (combo, records, eOpt) {

                    this.applyFilters();
                }
            },
            'bookingwizardstep2 combo[itemid="itemRoomSetupCombo"]': {
                select: function (combo, records, eOpt) {

                    if (!Utils.ActivateStepTwo) {
                        this.applyFilters();
                    } else {
                        Utils.ActivateStepTwo = false;
                    }
                }
            },
            'bookingwizardstep2 textfield[name="NumberOfPeople"]': {
                specialkey: function (t, e) {
                    if (e.getKey() == e.ENTER || e.getKey() == e.TAB) {
                        /*@PV: Business logic:
                        Current Scope: if capacity is blank and roomsetup is selected planboard is blank
                        Solved: if no. of capacity at that time roomsetup should also blank                        
                        */
                        var itemRoomSetupCombo = Ext.ComponentQuery.query('bookingwizardstep2 combo[itemid="itemRoomSetupCombo"]')[0];
                        if (t.getValue() == "") {
                            if (itemRoomSetupCombo && (itemRoomSetupCombo.getValue() == 0 || itemRoomSetupCombo.getValue() == null)) {
                                this.applyFilters();
                            }
                        }
                        else {
                            if (itemRoomSetupCombo && itemRoomSetupCombo.getValue() > 0) {
                                this.applyFilters();
                            }
                        }
                    }
                }
            },
            'bookingwizardstep2 textfield[name="min_area"]': {
                specialkey: function (f, e) {

                    if (e.getKey() == e.ENTER || e.getKey() == e.TAB) {
                        this.applyFilters();
                    }
                }
            },

            'bookingwizardstep2 checkbox[itemid="itemCombinedCheck"]': {
                change: function (t, newValue, oldValue, eOpts) {

                    this.applyFilters();
                }
            },
            'bookingwizardstep2 checkbox[itemid="itemIndividualCheck"]': {
                change: function (t, newValue, oldValue, eOpts) {

                    this.applyFilters();
                }
            },
            'bookingwizardstep2 checkbox[itemid="itemSharableCheck"]': {
                change: function (t, newValue, oldValue, eOpts) {

                    t.setValue(newValue);
                    this.applyFilters();
                }
            },
            'bookingwizardstep2 combo[itemid="itemSortByCombo"]': {
                select: function (t, newValue, oldValue, eOpts) {

                    this.applyFilters();
                }
            },
            'bookingwizardstep2 combo[itemid="itemDescriptionCombo"]': {
                select: function (t, newValue, oldValue, eOpts) {

                    this.applyFilters();
                }
            },
            'bookingwizardstep2 combo[itemid="flooridCombo"]': {
                select: function (t, newValue, oldValue, eOpts) {
                    this.applyFilters();
                }
            },
            'bookingwizardstep2 radiofield[itemid="rdAll"]': {
                dirtychange: function (t, newValue, oldValue, eOpts) {

                    this.applyFilters();
                }
            },

            'bookingwizardstep2 fieldcontainer[itemid="itemFieldsStatus"]': {
                afterrender: function (component) {
                    component.down('radiofield').on('change', function () {
                    });
                }
            },
            'bookingwizardstep2 fieldcontainer radiofield[itemid="bookingitemid"]': {
                change: function (component, newValue, oldValue, eOpt) {
                    if (newValue == true) {
                        component.disable();
                        var quatationRadio = Ext.ComponentQuery.query("radiofield[itemid='quatationitemid']")[0];
                        quatationRadio.disable();

                        Utils.StepTwoObj.BookingId = (Utils.StepTwoObj.BookingId > 0) ? Utils.StepTwoObj.BookingId : 0;
                        Utils.StepTwoObj.BookingTrackingId = (Utils.StepTwoObj.BookingTrackingId > 0) ? Utils.StepTwoObj.BookingTrackingId : 0;

                        /*Switching booking; older is offer and new is booking then restrict to call below API*/
                        if (me.restrictToSetBooking == true) {
                            me.restrictToSetBooking = false;
                            return true;
                        }

                        Ext.data.JsonP.request({
                            url: webAPI_path + 'api/Booking/ConvertQuotationToBooking',
                            type: "GET",
                            params: { id: Utils.StepTwoObj.BookingId, id1: Utils.StepTwoObj.BookingTrackingId, id2: 3, id3: CurrentSessionUserId },
                            success: function (response) {
                                var r = response;
                                if (r.success == true && r.result == 'SUCCESS') {
                                    if (r.data > 0) {

                                        Utils.StepTwoObj.BookingTrackingId = r.data;
                                        Utils.StepTwoObj.StatusId = 3;
                                        me.stepTwoObject.BookingTrackingId = r.data;
                                        me.stepTwoObject.StatusId = 3;
                                        Utils.StepOneObj.BookingTrackingId = r.data;
                                        var panel = Ext.ComponentQuery.query('bookingwizardstep2 form[itemid="itemBigPanelStep2"]')[0];
                                        var formEdit = panel.getForm();
                                        formEdit.findField('bookingTrackingId').setValue(r.data);
                                        Utils.LoadBookingInformationForRightPane(Utils.StepTwoObj.BookingId, Utils.StepTwoObj.BookingTrackingId, user_language);
                                        Utils.UpdateBookingNavigationList(Utils.StepTwoObj.ReservationId);
                                        me.applyFilters();
                                    }
                                }
                                else {
                                    var ResultTest = r.result;
                                    if (ResultTest.substring(0, 4) == "SPC_")
                                        ResultTest = ResultTest.l("SP_DynamicCode");
                                    Ext.Msg.alert('Error'.l('g'), ResultTest);
                                    var quatationRadio = Ext.ComponentQuery.query("radiofield[itemid='quatationitemid']")[0];
                                    quatationRadio.enable();
                                    quatationRadio.setValue(true);
                                }
                            }
                        });
                    }
                }
            },
            'bookingwizardstep2 fieldcontainer radiofield[itemid="quatationitemid"]': {
                change: function (component, newValue, oldValue, eOpt) {
                    if (newValue == true) {
                        component.enable();
                        var quatationRadio = Ext.ComponentQuery.query("radiofield[itemid='bookingitemid']")[0];
                        quatationRadio.enable();
                    }
                }
            },
            'bookingwizardstep2 datepicker[itemid="datepickerfield"]': {
                select: function (t, date, eOpts) {
                    this.applyFilters();
                }
            },
            'infopanelleftview': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {


                    var date = new Date(iRecord.data.Date);
                    /*set start date in calender*/
                    var datepicker = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="datepickerfield"]')[0];
                    datepicker.setValue(date);

                    this.applyFilters();

                    //Code for BEventId and BEventTrackingId of selected leftPanel of planboard
                    var grid = Ext.ComponentQuery.query('[itemid="itemMultipleDatesGrid"]')[0];
                    var gridStore = grid.getStore();
                    var elements = gridStore.getRange();

                    if (elements.length > 1) {
                        for (var i = 0; i < elements.length; i++) {
                            elements[i].data.lastClickedEvent = false;
                        }
                    }

                    iRecord.data.lastClickedEvent = true;
                }
            },
            'bookingwizardstep2 radiofield[itemid="BarHide"]': {
                change: function (t, newValue, oldValue, eOpts) {

                    this.applyFilters();
                }
            },

            'bookingwizardstep2 checkbox[itemid="multislidecheckbox"]': {
                change: function (t, n, o) {
                    var showType = Ext.ComponentQuery.query('bookingwizardstep2 combo[itemid="comboShowType"]')[0];
                    var multislider = Ext.ComponentQuery.query('bookingwizardstep2 multislider[itemid="itemHoursSlider"]')[0];

                    if (showType.getValue() == 'd' && n == true) {
                        multislider.enable();
                    }
                    else {
                        multislider.disable();
                    }
                }
            },

            'bookingwizardstep2 grid[itemid=PropertyList]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);
                    var gridPanel = Ext.ComponentQuery.query('bookingwizardstep2 grid[itemid="PropertyList"]')[0];
                    var initialStore = gridPanel.getStore();
                    var data = initialStore.getRange();
                    if (data.length > 1) {
                        if (fieldName == 'deleteProperty') {
                            initialStore.removeAt(iRowIdx);
                            var combo = Ext.ComponentQuery.query('bookingwizardstep2 grid[itemid="PropertyList"]')[0];
                        }

                        initialStore.sort({
                            property: 'PropertyName',
                            direction: "ASC"
                        });

                        initialStore.commitChanges();

                        this.applyFilters();
                    }
                }

            }
        })
    },

    loadEventStore: function (formObject) {

        var panel = Ext.ComponentQuery.query('bookingwizardstep2 form[itemid="itemBigPanelStep2"]')[0];
        if (!panel) return true;

        var formEdit = panel.getForm();
        var tmpdate = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="datepickerfield"]')[0];
        if (tmpdate)
            var date = tmpdate.getValue();
        if (date) {
            var START_DATE = Ext.util.Format.date(date, 'Y-m-d');
            formEdit.findField('StartDate').setValue(START_DATE);
        }
        formEdit.findField('bookingTrackingId').setValue(Utils.StepOneObj.BookingTrackingId);
        var tmpdate = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="datepickerfield"]')[0];
        if (tmpdate)
            var date = tmpdate.getValue();

        var scheduler = Ext.getCmp('sch-grid');
        if (date) {
            scheduler.setStart(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 30, 0, 0));
            scheduler.setEnd(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 0, 0, 0));
        }

    },

    checkIfObjectValid: function (me) {
        /*Start Update rightpanel*/
        var obj = new Object;
        obj.BookingTrackingId = me.stepTwoObject.BookingTrackingId;
        obj.BookingId = me.stepTwoObject.BookingId;
        Utils.UpdateRightPanObj(obj, 2);
        /*End of update rightpanel*/


        this.loadMultiDayLeftPanel();

        if (!Utils.isEmpty(Utils.StepTwoObj)) {

            Utils.ActivateStepTwo = true;
            var viewObject = Ext.ComponentQuery.query('panel [itemid="bookingwizardstep2"]')[0];
            //var reservationStore = Ext.getStore('bookingwizard.ReservationDetails');
            var gridPanel = Ext.ComponentQuery.query('[itemid="PropertyList"]')[0];

            /*Because of this gridpanel not defined wizard was not opened. so made this condition.Need to double check this @PV*/
            if (gridPanel) {
                gridPanel.getStore().removeAll();


            }

            this.mapStepTwoObject(Utils.StepTwoObj, me);

            Utils.UpdateRightPanObj(Utils.StepTwoObj, 2); //Update R;panel - PV-MM
        }
    },
    applyFilters: function () {

        var formHolder = Utils.getFirstComp(Ext.ComponentQuery.query('panel [itemid="planboardPanel"]'));
        if (formHolder == null) {
            //Show meesage here , error handeling

        }
        var form = formHolder.getForm();

        /* To uncomment this */
        this.loadEventStore(form.getValues());


        this.searchPlanboard();



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

    loadStepTwoObject: function (me) {
        var me = this;

        /*A: If step2 is not active then return; sometimes step1 calls step2's active event*/
        var panelSteps = Ext.ComponentQuery.query('bookingwizardpanel')[0];
        var layout = panelSteps.getLayout();
        var items = layout.getActiveItem();

        if (items.itemid != "steptwo")
            return true;

        /*end of A*/

        var flagFromFirstStep = false;

        /*Default datepicker should be enable, it will be disable only in some condition*/
        var datepicker = Ext.ComponentQuery.query('bookingwizardstep2 datepicker[itemid="datepickerfield"]')[0];
        if (datepicker)
            datepicker.setDisabled(false)


        if (!Utils.isEmpty(Utils.StepOneObj)) {
            log("I have utils", Utils.StepOneObj);
            var stepOneObj = Utils.StepOneObj;
            me.stepTwoObject = stepOneObj;
            //this.externalBookingTrackingId = stepOneObj.BookingTrackingId;
            this.externalBookingTrackingId = null;
            this.externalBookingId = null;
            /*if comes from first step getstep data should not calls*/
            flagFromFirstStep = true;
            me.checkIfObjectValid(me);

        }
        else {
            log("else me", me);
            var w = Ext.getCmp('bookingWiz-win');
            var stepObject = w.stepObject;
            log('Loaded step object', stepObject);
            if (!Utils.isEmpty(stepObject)) {
                if (Utils.isValid(stepObject.Number)) {
                    if (stepObject.Number == 2) {
                        if (Utils.isValid(stepObject.BookingTrackingId)) {
                            if (stepObject.BookingTrackingId > 0) {
                                this.externalBookingTrackingId = stepObject.BookingTrackingId;
                                this.externalBookingId = stepObject.BookingId > 0 ? stepObject.BookingId : 0;
                                log("external id set to", this.externalBookingTrackingId);
                            }
                        }
                    }
                }
            }
        }

        /*Added below code because on previous button when creating a new booking step2 forgot the date and other parameters. so get it new from API*/
        /*From new booking next button it will get the bookingtrackingid*/
        //means non of id is greater than 0
        if (!(this.externalBookingTrackingId > 0 || me.externalBookingId > 0) && flagFromFirstStep == false) {
            this.externalBookingTrackingId = (Utils.RightPanObj.BookingTrackingId > 0) ? Utils.RightPanObj.BookingTrackingId : 0;
            me.externalBookingId = (Utils.RightPanObj.BookingId > 0) ? Utils.RightPanObj.BookingId : 0;
        }

        if (this.externalBookingTrackingId > 0 || me.externalBookingId > 0) {

            urlItem = webAPI_path + 'api/booking/GetStepData';
            Ext.data.JsonP.request({
                url: urlItem,
                type: 'GET',
                params: {
                    id: 0,
                    id1: this.externalBookingTrackingId,
                    id2: me.externalBookingId,
                    id3: 2
                },

                success: function (response) {
                    //me.stepTwoObject = response.data;

                    me.stepTwoObject = $.extend(true, {}, response.data);
                    Utils.StepTwoObj = $.extend(true, {}, response.data);
                    Utils.StepOneObj = $.extend(true, {}, response.data);
                    Utils.RightPanObj.StatusId = me.stepTwoObject.StatusId;
                    me.checkIfObjectValid(me);

                },
                failure: function (response) {
                    //Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                }
            });

            //reservationStore.proxy.setExtraParam('id', this.externalBookingTrackingId);
            //reservationStore.on('load', function () {
            //    var stepOneObj = reservationStore.proxy.reader.jsonData.data;
            //    me.stepTwoObject = stepOneObj;
            //    me.checkIfObjectValid(me);
            //}, this, { single: true });
            //var store = reservationStore.load();
        }

        log('this.externalBookingTrackingId=', this.externalBookingTrackingId)
    },

    mapStepTwoObject: function (stepOneObj, me) {

        var panel = Ext.ComponentQuery.query('bookingwizardstep2 form[itemid="itemBigPanelStep2"]')[0];

        var formEdit = panel.getForm();


        var quatationitemid = Ext.ComponentQuery.query('bookingwizardstep2 radiofield[itemid="quatationitemid"]')[0];
        var bookingitemid = Ext.ComponentQuery.query('bookingwizardstep2 radiofield[itemid="bookingitemid"]')[0];

        if (stepOneObj.StatusId == 2 || stepOneObj.StatusId == 1) {
            /*@PV: for switching booking, if older is booking nd switched booking is offer then allowd to call API for set Booking*/
            me.restrictToSetBooking = false;
            /*End*/
            quatationitemid.setValue(true);
        }
        else {
            /*@PV: for switching booking, if older is offer nd switched booking is booking then restrict to call API for set Booking*/
            me.restrictToSetBooking = true;
            /*End*/

            bookingitemid.setValue(true);
            quatationitemid.disable();
            bookingitemid.disable();
        }

        //statusid 2 3 hoy to quation

        var RoomSetupId = Ext.ComponentQuery.query('bookingwizardstep2 combo[name="RoomSetupId"]')[0];
        RoomSetupId.getStore().load({
            callback: function (records, o, success) {
                RoomSetupId.setValue(Utils.StepTwoObj.RoomSetupId);
            }
        });

        var PropertyId = Ext.ComponentQuery.query('bookingwizardstep2 combo[name="PropertyId"]')[0];
        PropertyId.getStore().load({
            callback: function (records, o, success) {
                //  PropertyId.setValue(Utils.StepTwoObj.RoomSetupId);
                //                var ArrProperty = [];
                //                Ext.each(records.data, function (obj) {
                //                    ArrProperty.push(obj);
                //                });
                //                PropertyId.getStore().loadData(ArrProperty);
            }
        });

        formEdit.setValues(Utils.StepTwoObj);


        // itemBigPanelStep2
        {//Create and set title
            var title = "Planboard_Title".l('SC52000');
            //stepOneObj.StartDate = 'test';
            var sd = Ext.Date.format(new Date(stepOneObj.StartDate), 'Y-m-d');

            if (Utils.isValid(sd) && sd.split('-')[1] != 'NaN') {
                title += " - " + sd + " : ";
            }

            var bn = stepOneObj.BookingName; ;
            if (Utils.isValid(bn)) {
                title += " " + bn;
            }
            var reservationId = stepOneObj.ReservationId;
            if (Utils.isValid(stepOneObj.BookingNumber)) {
                //                title += " <span style='float:right'><span id='spReservationId'>" + stepOneObj.BookingNumber + "</span><span>." + "1</span>" + "</div>";
                title += " <span style='float:right'><span id='spReservationId'>" + stepOneObj.BookingNumber + "</span></div>";
            }

            panel.setTitle(title);
        }

        var d = Ext.Date.parse(stepOneObj.StartDate, 'c');
        var dEnd = Ext.Date.parse(stepOneObj.EndDate, 'c');
        var StartDate = Ext.util.Format.date(d, 'Y-m-d');
        this.StartDate = StartDate;
        var EndDate = Ext.util.Format.date(dEnd, 'Y-m-d');
        this.EndDate = EndDate;
        this.MultipleDays = stepOneObj.MultipleDays;

        /*If start date no defined then use current date*/
        if (StartDate == '' || StartDate == null) {
            var StartDate = new Date();
            d = StartDate;
            StartDate = Ext.util.Format.date(StartDate, 'Y-m-d');
        }

        /*set start date in calender*/
        var datepicker = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="datepickerfield"]')[0];
        datepicker.setValue(d);

        var formpanel = Ext.ComponentQuery.query('panel [itemid="steptwo"] form')[0];

        var distance = stepOneObj.Distance;

        var grid = Ext.ComponentQuery.query('bookingwizardstep2 grid[itemid="PropertyList"]')[0];
        grid.getStore().removeAll();

        if (!Utils.isEmpty(stepOneObj.PropertyIds) || stepOneObj.PropertyId > 0) {

            var grid = Ext.ComponentQuery.query('bookingwizardstep2 grid[itemid="PropertyList"]')[0];

            if (Utils.isValid(stepOneObj.PropertyIds)) {
                grid.getStore().proxy.setExtraParam('id', stepOneObj.PropertyIds);
                grid.getStore().proxy.setExtraParam('distance', stepOneObj.Distance);
            }
            else {
                grid.getStore().proxy.setExtraParam('id', stepOneObj.PropertyId);
                grid.getStore().proxy.setExtraParam('distance', 0);
            }

            var localThis = this;

            grid.getStore().load({
                callback: function (records, o, success) {
                    grid.getStore().sort({
                        property: 'PropertyName',
                        direction: "ASC"
                    });

                    localThis.applyFilters();
                }
            });


        }
        else {
            //alert("No result found on given search criteria, please select property");       
            Ext.data.JsonP.request({
                url: webAPI_path + 'api/Designation/BlankRequest',
                success: function () {
                    var schedGrid = Ext.ComponentQuery.query('bookingwizardstep2 [itemid=itemScheduler]')[0];
                    schedGrid.eventStore.removeAll();
                    schedGrid.resourceStore.removeAll();
                    var noResult = [];
                    noResult.PropertyId = 0;
                    noResult.PropertyName = '';
                    noResult.Id = 0;

                    schedGrid.eventStore.loadData(noResult);
                    schedGrid.resourceStore.loadData(noResult);
                    //Ext.Msg.alert('Error'.l('g'), "No result found on given search criteria, please select property");
                    display_alert('MG52007');
                }
            });

        }

        try {
            if (stepOneObj.PropertyIds != null) {
                var ids = stepOneObj.PropertyIds.split('-');
                Utils.PropertyListIDs = ids;
            }
            else {
                Utils.PropertyListIDs = null;
            }
        } catch (e) {
            //            log("properties not splited", res);
        }

        var roomTypeStore = Ext.getStore('yield.RoomTypeStore');
        roomTypeStore.on("load", function () {
            roomTypeStore.insert(0, {
                RoomTypeId: 0,
                RoomTypeName: 'All'.l('SC51000'),
                Description: ''
            });
            Ext.ComponentQuery.query('bookingwizardstep2 combo[name=RoomTypeName]')[0].setValue(roomTypeStore.getAt(0));
        });

        if (!Utils.isValid(stepOneObj.BookingTrackingId)) {
            stepOneObj.BookingTrackingId = 0;
        }
        var panel = Ext.ComponentQuery.query('bookingwizardstep2 form[itemid="itemBigPanelStep2"]')[0];

        var formEdit = panel.getForm();

        // this.loadMultiDayLeftPanel();

    },

    searchPlanboard: function () {

        var form = Ext.ComponentQuery.query('bookingwizardstep2 form[itemid=itemBigPanelStep2]')[0];
        if (!form) return true;

        var formObject = form.getForm().getValues();

        if (Utils.isEmpty(formObject)) {
            form.getForm().setValues(Utils.StepTwoObj);

            formObject = form.getForm().getValues();
        }

        var localThis = this;

        //d = Ext.util.Format.date(formObject.eventDate, 'Y-m-d');
        var datepicker = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="datepickerfield"]')[0];
        var dateE = datepicker.getValue();
        d = Ext.util.Format.date(dateE, 'Y-m-d');
        var planboardBarDate = new Date(d);

        /*Get Property ids in comma seperated*/
        var PropertyIds = this.getPropertyIds();

        if (PropertyIds == 'undefined' || PropertyIds.length <= 0 || Ext.util.Format.trim(PropertyIds) == "") {
            //            Ext.getStore('bookingwizard.PlanboardBookinglistBWStore').removeAll();
            //            Ext.getStore('bookingwizard.PlanboardBookinglistBWStore').removeAll();

            var schedGrid = Ext.ComponentQuery.query('bookingwizardstep2 [itemid=itemScheduler]')[0];

            schedGrid.eventStore.removeAll();
            schedGrid.resourceStore.removeAll();


            this.loadRoomType();
            this.loadPlanboardFloor();
            return false;
        }

        var RoomSetupId = Ext.ComponentQuery.query('bookingwizardstep2 combo[name=RoomSetupId]')[0].getValue();
        var RoomTypeName = Ext.ComponentQuery.query('bookingwizardstep2 combo[name=RoomTypeName]')[0].getValue();
        var IndividualCheckboxId = Ext.ComponentQuery.query('bookingwizardstep2 checkbox[name=IndividualCheckboxId]')[0].getValue();
        var CombinedCheckboxId = Ext.ComponentQuery.query('bookingwizardstep2 checkbox[name=CombinedCheckboxId]')[0].getValue();
        var SharableCheckboxId = Ext.ComponentQuery.query('bookingwizardstep2 checkbox[name=SharableCheckboxId]')[0].getValue();
        var min_area = Ext.ComponentQuery.query('bookingwizardstep2 textfield[name=min_area]')[0].getValue();



        var ROOM_TYPES = [];
        if (IndividualCheckboxId == true) {
            ROOM_TYPES.push('I');
        }
        if (CombinedCheckboxId == true) {
            ROOM_TYPES.push('C');
        }
        log('Sharable checked is', SharableCheckboxId);
        if (SharableCheckboxId == true) {
            ROOM_TYPES.push('S');
        }
        var ROOM_TYPES = ROOM_TYPES.toString();
        log("ROOM_TYPES=", ROOM_TYPES.toString());
        //   log("RoomTypeName value =", RoomTypeName.getValue());


        var description = Ext.ComponentQuery.query('bookingwizardstep2 combo[name=description]')[0];

        if (description)
            description = description.getValue();
        else
            description = null;

        var CATEGORY_TYPE = typeof RoomTypeName == "undefined" || RoomTypeName == "" ? null : RoomTypeName;
        var ROOM_SETUP = typeof RoomSetupId == "undefined" || RoomSetupId == "" || RoomSetupId == -1 ? null : RoomSetupId;
        var CAPACITY = typeof formObject.NumberOfPeople == "undefined" || formObject.NumberOfPeople == "" ? null : formObject.NumberOfPeople;
        var MIN_AREA = typeof min_area == "undefined" || min_area == "" ? null : min_area;
        var ROOM_TYPES = typeof ROOM_TYPES == "undefined" || ROOM_TYPES == -1 ? null : ROOM_TYPES; //Individual, Sharable, Combined
        var SORT_BY = typeof formObject.SORT_BY == "undefined" || formObject.SORT_BY == 0 ? null : formObject.SORT_BY;
        var DESCRIPTION = typeof description == "undefined" || description == '' ? null : description;
        var FLOOR_ID = typeof formObject.FloorId == "undefined" || formObject.FloorId == -1 ? null : formObject.FloorId;
        var AVAILABLE = typeof formObject.Positions == "undefined" ? 1 : formObject.Positions;
        var VIEW_TYPE = typeof formObject.viewtype == "undefined" ? 'd' : formObject.viewtype;
        var NULLVALUE = null;

        var startTime = typeof Utils.StepTwoObj.StartTime == "undefined" ? "08:30:00" : Utils.StepTwoObj.StartTime;
        var endTime = typeof Utils.StepTwoObj.EndTime == "undefined" ? "10:30:00" : Utils.StepTwoObj.EndTime;


        if (Utils.isEmpty(Utils.StepTwoObj)) {
            var startTime = '08:30:00';
            var endTime = '10:30:00';

        }

        var isAvailable = false;

        if (AVAILABLE == 1)
            isAvailable = true;
        else
            isAvailable = false;

        /*Patch to control second call*/
        if (CAPACITY == null)
            return true;

        /*from response after add booking starttime is not there but BookingEventStartTime is there*/
        //        if (typeof Utils.StepTwoObj.StartTime == "undefined" && Utils.isEmpty(Utils.StepTwoObj.BookingEventStartTime)) {
        //            isAvailable = false
        //        }

        var BookingTrackingId = (typeof Utils.StepTwoObj.BookingTrackingId != 'undefined' && Utils.StepTwoObj.BookingTrackingId > 0) ? Utils.StepTwoObj.BookingTrackingId : null;
        var Booking_ID = (typeof Utils.StepTwoObj.BookingId != 'undefined' && Utils.StepTwoObj.BookingId > 0) ? Utils.StepTwoObj.BookingId : null;

        var searchParam = "PROPERTY_ID?" + PropertyIds + ";DATE?" + d + ";VIEW_TYPE?" + VIEW_TYPE + ";LANGUAGE_ID?" + user_language
							+ ";CATEGORY_TYPE?" + CATEGORY_TYPE + ";ROOM_SETUP?" + ROOM_SETUP + ";CAPACITY?" + CAPACITY + ";MIN_AREA?" + MIN_AREA
							+ ";ROOM_TYPES?" + ROOM_TYPES + ";SORT_BY?" + SORT_BY + ";DESCRIPTION?" + DESCRIPTION + ";FLOOR_ID?" + FLOOR_ID
                             + ";FROM_TIME?" + startTime + ";TO_TIME?" + endTime + ";AVAILABLE?" + isAvailable + ";BOOKINGTRACKING_ID?" + BookingTrackingId + "; Booking_ID?" + Booking_ID;

        var searchParamRoomBlock = "PROPERTY_ID:" + PropertyIds + ";DATE:" + d + ";VIEW_TYPE:" + VIEW_TYPE + ";LANGUAGE_ID:" + user_language
							+ ";CATEGORY_TYPE:" + CATEGORY_TYPE + ";ROOM_SETUP:" + ROOM_SETUP + ";CAPACITY:" + CAPACITY + ";MIN_AREA:" + MIN_AREA
							+ ";ROOM_TYPES:" + null + ";SORT_BY:" + SORT_BY + ";FLOOR_ID:" + FLOOR_ID
                             + ";FROM_TIME:" + startTime + ";TO_TIME:" + endTime + ";AVAILABLE:" + false
        ;

        var schedGrid = Ext.ComponentQuery.query('bookingwizardstep2 [itemid=itemScheduler]')[0];

        schedGrid.resourceStore.proxy.setExtraParam('searchParam', searchParam);

        // Ext.getStore('operations.PlanboardRoomlistStore').load();
        schedGrid.eventStore.proxy.setExtraParam('searchParam', searchParam);

        localThis.getBookingwizardstep2().disable();

        schedGrid.eventStore.removeAll();
        schedGrid.resourceStore.removeAll();


        schedGrid.resourceStore.load({

            callback: function (records, o, success) {

                if (Ext.getCmp('move-next'))
                    Ext.getCmp('move-next').setDisabled(false); //added as sometimes nextbutton showing disabled    

                if (o.response && typeof o.response.data != 'undefined') {

                    /*@PV: check if property is available or not*/
                    var arrPropertyIds = PropertyIds.split(',');
                    var planboarPropertyName = '';
                    if (arrPropertyIds.length > 0) {
                        Ext.each(arrPropertyIds, function (d) {

                            var propertyCheck = schedGrid.resourceStore.findRecord('PropertyId', d);
                            var gridPanel = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="PropertyList"]')[0];

                            if (propertyCheck == null) {
                                var rec = gridPanel.getStore().findRecord('PropertyId', d);
                                if (rec)
                                    planboarPropertyName = planboarPropertyName + rec.data.PropertyName + '<br />';
                            }
                        })

                        if (planboarPropertyName != '') {
                            Ext.Msg.alert('Notification'.l('g'), "No rooms available for below property".l() + ":<br />" + planboarPropertyName);
                        }
                    }

                    //

                    /*End proeprty check*/

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
                            //  if (Utils.isValid(tempobj.SetupTime) && tempobj.SetupTime > 0) {
                            //     log('tempobj setup time', tempobj.SetupTime);
                            tempobj.TurnTimeBuffer = tempobj.SetupTime;
                            //   }

                            /*Chrom time calculation*/
                            var tmpinitialStartA = Ext.Date.parse(initialStart, 'c');
                            var tmpinitialStart = tmpinitialStartA.getTime();
                            var newStartDate = new Date(tmpinitialStart - (tempobj.TurnTimeBuffer * MS_PER_MINUTE));

                            tmpBookingEventWithBuffer.ResourceId = tempobj.ResourceId;
                            tmpBookingEventWithBuffer.StartDate = newStartDate;
                            tmpBookingEventWithBuffer.EndDate = tmpinitialStartA;
                            tmpBookingEventWithBuffer.DateStart = newStartDate;
                            tmpBookingEventWithBuffer.DateEnd = tmpinitialStartA;
                            // tmpBookingEventWithBuffer.Id = new Date().getTime() + tempobj.ResourceId;

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
                            /*start: set related event start and end date*/
                            tmpBookingEventWithBuffer.isTurnTimeBuffer = true;
                            tmpBookingEventWithBuffer.eventStartDate = initialStart;
                            tmpBookingEventWithBuffer.eventEndDate = initialEnd;
                            /*end related event date*/
                            /*if event is linked then buffertime or event should not moved/resized; from call with NS 4th Dec; agreed DS and KB too*/

                            if (tmpBookingEventWithBuffer.IsLinkedEvent == true) {
                                tmpBookingEventWithBuffer.eventResizeHandles = 'none';
                                tmpBookingEventWithBuffer.enableEventDragDrop = false;
                            }

                            /*if event is linked then buffertime or event should not moved/resized; from call with NS 4th Dec; agreed DS and KB too*/
                            if (obj.IsLinkedEvent == true) {
                                obj.eventResizeHandles = 'none';
                                obj.enableEventDragDrop = false;
                            }

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

                        var slider = Ext.ComponentQuery.query('bookingwizardstep2 multislider[itemid="itemHoursSlider"]')[0];

                    });
                    // }

                    localThis.setBlockingRoom(resourcesArr, BookingEventWithBuffer, searchParamRoomBlock);
                    // schedGrid.eventStore.loadData(BookingEventWithBuffer);

                    var e = Ext.ComponentQuery.query('bookingwizardstep2 combo[itemid="comboShowType"]')[0].getValue();

                    localThis.setViewResolutionPlanboard(e);
                    try {

                        var datepicker = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="datepickerfield"]')[0];
                        var d1 = datepicker.getValue();

                        var startDate = Ext.Date.parse(Utils.StepOneObj.StartDate, 'c');
                        var endDate = Ext.Date.parse(Utils.StepOneObj.EndDate, 'c');

                        //var lineStart = new Date(d1);
                        //var lineEnd = new Date(d1);

                        /*if multiple day, then checkbox should be disable as its not effect*/
                        var s = startDate.getFullYear() + startDate.getMonth() + startDate.getDate();
                        var e = endDate.getFullYear() + endDate.getMonth() + endDate.getDate();

                        if (s != e) {
                            var multislidecheckbox = Ext.ComponentQuery.query('bookingwizardstep2 checkbox[itemid="multislidecheckbox"]')[0];
                            multislidecheckbox.setValue(false);
                        }
                        var lineStart = new Date(startDate);
                        var lineEnd = new Date(endDate);
                        lineStart.setHours(startDate.getHours(), startDate.getMinutes());
                        lineEnd.setHours(endDate.getHours(), endDate.getMinutes());


                        schedGrid.items.items[1].plugins[1].store.removeAll();
                        schedGrid.items.items[1].plugins[1].store.insert(0, { "Date": lineStart, "Text": 'Start time', "Cls": ' orange-line' });
                        schedGrid.items.items[1].plugins[1].store.insert(0, { "Date": lineEnd, "Text": 'End time', "Cls": ' orange-line' });

                        /*set slider to given time*/
                        var startTimeSlider = parseInt(startDate.getHours() * 12) + parseInt(startDate.getMinutes() / 5);
                        var endTimeSlider = parseInt(endDate.getHours() * 12) + parseInt(endDate.getMinutes() / 5);

                        if (s != e) {
                            return true;
                        }
                        var slider = Ext.ComponentQuery.query('bookingwizardstep2 multislider[itemid="itemHoursSlider"]')[0];
                        slider.setValue(0, startTimeSlider);
                        slider.setValue(1, endTimeSlider);



                    } catch (e) {

                    }

                    schedGrid.resourceZones.removeAll();
                    // Ext.getStore('operations.AvailabilityStore').removeAll();

                    if (formObject.bar == '1') {
                        //Ext.getStore('operations.AvailabilityStore').loadData(newArr);
                        schedGrid.resourceZones.loadData(newArr);
                    }

                    var step2ZoomSliderObj = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="step2ZoomSlider"]')[0];
                    if (step2ZoomSliderObj) {
                        var v = step2ZoomSliderObj.getValue();
                        var scheduler = Ext.getCmp('sch-grid');
                        scheduler.setTimeColumnWidth(v);
                    }

                }


            }

        });

        //RoomName
        this.loadRoomType();
        this.loadPlanboardFloor();


    },

    loadRoomType: function () {
        var combo = Ext.ComponentQuery.query('bookingwizardstep2 combo[itemid=itemRoomTypeCombo]')[0];
        /*Get Property ids in comma seperated*/
        var PropertyIds = this.getPropertyIds();
        var olderValue = combo.getValue();
        if (Ext.util.Format.trim(PropertyIds) == "") {
            combo.getStore().removeAll();
            combo.setValue(0);
            return false;
        }

        if (combo.getStore().proxy.extraParams.id != PropertyIds) {

            combo.getStore().proxy.setExtraParam('id', PropertyIds);
            combo.getStore().proxy.setExtraParam('languageId', user_language);
            combo.getStore().load({
                callback: function (records, o, success) {
                    combo.setValue(olderValue)
                }
            });
        }

    },

    loadPlanboardFloor: function () {
        var combo = Ext.ComponentQuery.query('bookingwizardstep2 combo[itemid=flooridCombo]')[0];
        /*Get Property ids in comma seperated*/
        var PropertyIds = this.getPropertyIds();
        var olderValue = combo.getValue();
        if (Ext.util.Format.trim(PropertyIds) == "") {
            combo.getStore().removeAll();
            combo.setValue(0);
            return false;
        }
        if (combo.getStore().proxy.extraParams.id != PropertyIds) {
            combo.getStore().proxy.setExtraParam('id', PropertyIds);
            combo.getStore().load({
                callback: function () {
                    combo.getStore().insert(0, { "FloorName": "All Floors".l('SC33000'), "FloorId": 0 }, true);
                    olderValue = olderValue > 0 ? olderValue : 0;
                    combo.setValue(olderValue);
                }

            });
        }
    },

    getPropertyIds: function () {
        var gridPanel = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="PropertyList"]')[0];
        var PropertyIds = '';
        if (Utils.isValid(gridPanel)) {

            var initialStore = gridPanel.getStore();
            var itemsCount = initialStore.data.items.length;

            if (itemsCount > 0) {
                Ext.each(initialStore.data.items, function (value) {
                    Ext.each(value, function (val) {
                        PropertyIds += val.raw.PropertyId + ",";
                    })
                });

                PropertyIds = PropertyIds.replace(/\,$/, '');
            }
        }
        return PropertyIds;
    },

    createEventEntryDB: function () {

        var panel = Ext.ComponentQuery.query('bookingwizardstep2 form[itemid="itemBigPanelStep2"]')[0];
        var formEdit = panel.getForm();

        if (!formEdit.isValid()) {
            alert("Invalid form");
            return;
        }

        var turnTimeValue = formEdit.findField("setupTimeField").getValue();
        if (turnTimeValue == null)
            turnTimeValue = 0;

        //QBB

        var cf = this.getController('bookingwizard.BookingWizardPanel');

        cf.stepTwoCall(Utils.StepOneObj, this, 2); //2 is identification that it is not come from Next button.. its a from dragcreate event

    },
    loadMultiDayLeftPanel: function () {

        var storeMultipleDates = Ext.getStore('bookingwizard.InfoLeftPanelStore');

        var BookingTrackingId = (Utils.StepTwoObj.BookingTrackingId > 0) ? Utils.StepTwoObj.BookingTrackingId : 0;
        var BookingId = (Utils.StepTwoObj.BookingId > 0) ? Utils.StepTwoObj.BookingId : 0;

        storeMultipleDates.proxy.setExtraParam('id', BookingId); //id=bookingid, id1=bookingtrackingid
        storeMultipleDates.proxy.setExtraParam('id1', BookingTrackingId);
        storeMultipleDates.load({
            callback: function (records, o, success) {
                var datepicker = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="datepickerfieldparent"]')[0];
                storeMultipleDates.sort({
                    property: 'Date',
                    direction: "ASC"
                });


                //iRecord.data.lastClickedEvent = true;
                if (records.length > 0) {
                    records[0].data.lastClickedEvent = true;

                    var tmpbookingEventId = (records[0].data.BookingEventID > 0) ? records[0].data.BookingEventID : 0;
                    var tmpbookingEventTrackingId = (records[0].data.BookingEventTrackingID > 0) ? records[0].data.BookingEventTrackingID : 0;

                    var bookingEventId = Ext.ComponentQuery.query('bookingwizardstep2 [name="bookingEventId"]')[0];
                    var bookingEventTrackingId = Ext.ComponentQuery.query('bookingwizardstep2 [name="bookingEventTrackingId"]')[0];

                    if (bookingEventId) bookingEventId.setValue(tmpbookingEventId);
                    if (bookingEventTrackingId) bookingEventId.setValue(tmpbookingEventTrackingId);

                    if (records[0].data.Date) {

                        var d = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="datepickerfield"]')[0];
                        d.setValue(new Date(records[0].data.Date));
                    }

                }

                if (datepicker && o.response) {
                    if (o.response.isAnyEventExists == true && o.response.IsMultipleDayBooking == true) {
                        datepicker.disable()
                    }
                    else {
                        datepicker.enable()
                    }
                }
            }
        });

        /*@Pratik: Found that sometimes startdate is undefined and datestart is filled, it should be same*/
        /*Specifically on case from previous to step2*/
        //        if (typeof Utils.StepTwoObj.StartDate == 'undefined' && typeof Utils.StepTwoObj.DateStart != 'undefined') {
        //            storeMultipleDates.proxy.setExtraParam('date1', Utils.StepTwoObj.DateStart);
        //            storeMultipleDates.proxy.setExtraParam('date2', Utils.StepTwoObj.DateEnd);
        //        }
        //        else {
        //            storeMultipleDates.proxy.setExtraParam('date1', Utils.StepTwoObj.StartDate);
        //            storeMultipleDates.proxy.setExtraParam('date2', Utils.StepTwoObj.EndDate);
        //        }
        //        storeMultipleDates.proxy.setExtraParam('bookingtrackingid', Utils.StepTwoObj.BookingTrackingId);
        //        if ((!Utils.isEmpty(Utils.StepTwoObj.StartDate) && !Utils.isEmpty(Utils.StepTwoObj.EndDate))
        //            ||
        //            (!Utils.isEmpty(Utils.StepTwoObj.DateStart) && !Utils.isEmpty(Utils.StepTwoObj.DateEnd)
        //            )
        //            ) {
        //            storeMultipleDates.load();
        //        }

        var componentLeft = Ext.ComponentQuery.query('bookingwizard panel [itemid="west-regionBookingWizard"]')[0];
        if (componentLeft) {
            var ws = componentLeft;
            ws.removeAll();
            ws.add({
                xtype: 'infopanelleftview'
            });
        }

        /*Left Panel is always available as per new changes for left panel step2: 10/11/2013 by PV*/
        componentLeft.show();

        //        /*@Pratik: IsMultiday is true/false from step2 event created API, daylist was never updated*/
        //        if (Utils.StepTwoObj.IsMultiday == true) {

        //            componentLeft.show();
        //        }
        //        else if (Utils.StepTwoObj && Utils.StepTwoObj.DaysList && Utils.StepTwoObj.DaysList.length > 1) {

        //            componentLeft.show();
        //        }

        if (typeof stepOneObj != 'undefined') {//StepOneObj is not defined error solved

            stepOneObj.MultipleDays = false;
            //Utils.PropertyListIDs = Utils.push(Utils.PropertyListIDs, stepOneObj.PropertyId);
            me.stepTwoObject = stepOneObj;
        }
    },

    setBlockingRoom: function (data, bookingArr, searchParamRoomBlock) {

        var localThis = this;
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
                                tmpdata.BookingName = "Block Room".l('SC52000');
                                tmpdata.Description = "Block Room".l('SC52000');
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

                    var schedGrid = Ext.ComponentQuery.query('bookingwizardstep2 [itemid=itemScheduler]')[0];
                    schedGrid.eventStore.loadData(bookingArr);

                    localThis.getBookingwizardstep2().enable();
                }
                else {
                    var schedGrid = Ext.ComponentQuery.query('bookingwizardstep2 [itemid=itemScheduler]')[0];
                    schedGrid.eventStore.loadData(bookingArr);
                    localThis.getBookingwizardstep2().enable();
                }
            },
            failure: function () {
            }
        });

        /*End of Block room detail*/
    },

    /* Type 0 - Move event same day
    1 - Move event different day
    */
    ProcessEvent: function (obj, me, type) {
        localThis = this;
        obj.IsConfirmed = false;
        obj.LanguageId = user_language;
        me.tmpObj = obj;
        me.type = type;
        var urlItem = webAPI_path + 'api/Booking/ManageDragAndDropOfEvents';
        $.get(urlItem, //Url from API
              obj, // Pass obj
              function (response) {
                  var MBarName = "";
                  var MPrice = 0;
                  var MContractDetail = "";
                  if (typeof (response.BarName) != "undefined") {
                      MBarName = response.BarName;
                  }
                  if (typeof (response.ContractDetail) != "undefined") {
                      MContractDetail = response.ContractDetail;
                  }
                  if (typeof (response.Price) != "undefined") {
                      MPrice = response.Price;
                  }
                  MPrice = "€ " + Ext.util.Format.number(MPrice, '0,000.00');

                  if (response.success == true) {
                      var storeMultipleDates = Ext.getStore('bookingwizard.InfoLeftPanelStore');
                      storeMultipleDates.reload({
                          callback: function (records, o, success) {
                              var datepicker = Ext.ComponentQuery.query('bookingwizardstep2 datepicker[itemid="datepickerfield"]')[0];
                              if (datepicker && o.response) {

                                  if (o.response.isAnyEventExists == true && o.response.IsMultipleDayBooking == true) {
                                      //datepicker.setDisabled(true)
                                      datepicker.setMaxDate(null);
                                      datepicker.setMinDate(null);
                                  }
                                  else {
                                      datepicker.setDisabled(false)
                                  }
                              }
                          }
                      });

                      if (response.BookingTrackingId > 0) {
                          me.stepTwoObject.BookingTrackingId = response.BookingTrackingId;
                          Utils.StepTwoObj.BookingTrackingId = response.BookingTrackingId;
                      }
                      me.loadMultiDayLeftPanel();

                      me.applyFilters();

                      /**/
                      if (obj.NewPropertyId != obj.OldPropertyId) {
                          me.tmpObj = obj;
                          if (response.confirm == true) {
                              var text = response.result;
                              //text = str_replace(array("\n", "\r"), array("\\n", "\\r"), text);                              
                              text = text.replace(/\\n\\r/g, '<br />');
                              if (text.substring(0, 4) == "SPC_") {
                                  text = text.l("SP_DynamicCode", MBarName, MPrice, MContractDetail);
                              }
                              display_alert(text, "", "C", localThis.SecondAPICall, true);
                          }
                          else {
                              var text = response.result;
                              //text = str_replace(array("\n", "\r"), array("\\n", "\\r"), text);                              
                              text = text.replace(/\\n\\r/g, '<br />');
                              if (text.substring(0, 4) == "SPC_") {
                                  text = text.l("SP_DynamicCode");
                              }
                              if (response.success == false)
                                  display_alert(text, '', '', '', true);
                              if (type == 1) {
                                  // Set changed date
                                  // [itemid = "comboShowType"]
                                  var datepicker = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="datepickerfield"]')[0];
                                  datepicker.setValue(new Date(obj.BookingEventDate));
                                  Ext.ComponentQuery.query('[itemid="comboShowType"]')[0].setValue('d');
                              }

                              me.applyFilters();
                          }
                      }
                      else {
                          var text = response.result;
                          //text = str_replace(array("\n", "\r"), array("\\n", "\\r"), text);                              
                          text = text.replace(/\\n\\r/g, '<br />');
                          if (text.substring(0, 4) == "SPC_") {
                              text = text.l("SP_DynamicCode");
                          }
                          if (response.success == false)
                              display_alert(text, '', '', '', true);
                          if (type == 1) {
                              // Set changed date
                              // [itemid = "comboShowType"]
                              var datepicker = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="datepickerfield"]')[0];
                              datepicker.setValue(new Date(obj.BookingEventDate));
                              Ext.ComponentQuery.query('[itemid="comboShowType"]')[0].setValue('d');
                          }

                          me.applyFilters();

                      }
                      /**/

                  } else {
                      var text = response.result;
                      if (text.substring(0, 4) == "SPC_") {
                          Ext.Msg.alert('Error'.l('g'), response.result.l("SP_DynamicCode", MBarName, MPrice, MContractDetail));
                      }
                      else {
                          Ext.Msg.alert('Error'.l('g'), response.result);
                      }

                      me.applyFilters();
                  }
                  // me.applyFilters();
              });

    },
    SecondAPICall: function (btn) {
        var c = _currentApp.getController('bookingwizard.BookingWizardStep2');
        var obj = c.tmpObj;
        obj.LanguageId = user_language;
        obj.IsConfirmed = true;
        if (btn == "yes") {
            var urlItem = webAPI_path + 'api/Booking/ManageDragAndDropOfEvents';
            $.get(urlItem, //Url from API
                      obj, // Pass obj
                      function (response) {
                          var MBarName = "";
                          var MPrice = 0;
                          var MContractDetail = "";
                          if (typeof (response.BarName) != "undefined") {
                              MBarName = response.BarName;
                          }
                          if (typeof (response.ContractDetail) != "undefined") {
                              MContractDetail = response.ContractDetail;
                          }
                          if (typeof (response.Price) != "undefined") {
                              MPrice = response.Price;
                          }
                          MPrice = "€ " + Ext.util.Format.number(MPrice, '0,000.00');
                          c.tmpObj = null;
                          if (c.type == 1) {
                              // Set changed date
                              // [itemid = "comboShowType"]
                              var datepicker = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="datepickerfield"]')[0];
                              datepicker.setValue(new Date(obj.BookingEventDate));
                              Ext.ComponentQuery.query('[itemid="comboShowType"]')[0].setValue('d');
                          }
                          if (Utils.isValid(response.result) && response.result != 'SUCCESS') {
                              if (response.result.substring(0, 4) == "SPC_")
                                  Ext.Msg.alert('Info', response.result.l("SP_DynamicCode", MBarName, MPrice, MContractDetail));
                              else
                                  Ext.Msg.alert('Info', response.result);
                          }
                          if (response.success == true) {
                              if (response.BookingTrackingId > 0) {
                                  c.stepTwoObject.BookingTrackingId = response.BookingTrackingId;
                                  Utils.StepTwoObj.BookingTrackingId = response.BookingTrackingId;
                              }
                              c.loadMultiDayLeftPanel();
                          }


                          c.type = null;

                          c.applyFilters();
                      }
                    );
        }
        else {
            c.applyFilters();
            c.tmpObj = null;
        }
    },

    setViewResolutionPlanboard: function (e) {
        var scheduler = Ext.getCmp('sch-grid');
        var datepicker = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="datepickerfield"]')[0];
        var displayStartTime = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="itemDisplayStartTime"]')[0];

        switch (e) {
            case 'd':
                var d = datepicker.getValue();
                displayStartTime.setDisabled(false);

                var endDate = new Date(d);
                endDate.setDate(endDate.getDate() + 1);
                scheduler.switchViewPreset('hourAndDay', new Date(d.getFullYear(), d.getMonth(), d.getDate(), displayStartTime.getValue()), new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 24));
                break;
            case 'w':
                var d = datepicker.getValue();
                var startDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
                var endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 7);
                displayStartTime.setDisabled(true);
                scheduler.switchViewPreset('dayAndWeek');
                scheduler.setTimeSpan(startDate, endDate);
                break;
            case 'm':
                var d = datepicker.getValue();
                var start = Sch.util.Date.add(d, Sch.util.Date.DAY, 0);
                Ext.Date.clearTime(start);
                var end = Sch.util.Date.add(start, Sch.util.Date.DAY, 30);
                scheduler.switchViewPreset('weekAndMonth');
                scheduler.setTimeSpan(start, end);
                break;

            default:
                break;
        }
    },

    setVerticleLine: function (e) {

        if (e != 'd') return false;

        /*Start: Verticle Line showing code*/
        try {
            var datepicker = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="datepickerfield"]')[0];
            var d1 = datepicker.getValue();

            /*Get the start time and end time from multislider*/
            var slider = Ext.ComponentQuery.query('bookingwizardstep2 multislider[itemid="itemHoursSlider"]')[0];
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

            var schedGrid = Ext.ComponentQuery.query('bookingwizardstep2 [itemid=itemScheduler]')[0];
            schedGrid.items.items[1].plugins[1].store.removeAll();
            schedGrid.items.items[1].plugins[1].store.insert(0, { "Date": lineStart, "Text": 'Start time', "Cls": ' orange-line' });
            schedGrid.items.items[1].plugins[1].store.insert(0, { "Date": lineEnd, "Text": 'End time', "Cls": ' orange-line' });
        } catch (e) {

        }
        /*End: Verticle Line showing code*/
    }


});
