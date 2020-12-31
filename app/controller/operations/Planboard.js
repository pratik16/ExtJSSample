Ext.define('Regardz.controller.operations.Planboard', {
    extend: 'Ext.app.Controller',
    stores: ['bookingwizard.SchedulerEventStore', 'bookingwizard.SchedulerResourceStore', 'operations.RoomSetupStore',
    'common.PropertyForNamesStore', 'operations.RoomTypeStore', 'common.PropertyForIdAndDistanceStore', 'property.BWPropertyMeetingTypeStore',
    'property.PropertyAtmosphereListStore', 'property.PhotoGalleryListStore', 'property.BWPropertyFacilityIcons', 'property.RoomPhotoListStore',
    'property.VideoLibraryListStore', 'property.FloorPlanStore', 'bookingwizard.RoomFloorPlanStore', 'property.PropertyDetails',
    'bookingwizard.RoomDetailsStore', 'bookingwizard.RoomSetupListStore',
    'common.PropertyForPropertyIdAndDistanceStore',
     'bookingwizard.PlanboardRoomlistBWStore', 'bookingwizard.PlanboardBookinglistBWStore', 'operations.PlanboardFloorsStore', 'operations.AvailabilityStore', 'common.RoomSetupStore', 'property.FloorPropertyStore'], //, 'usermanage.AllpropertyListComboStore'],
    views: ['operations.Planboard', 'operations.Timeline', 'bookingwizard.RoomDetailWindow', 'bookingwizard.PropertyInformation',
            'operations.BookingRoomBlock', 'operations.BookingRoomBlock', 'operations.windows.inhouse.BufferTimeEditWindow', 'operations.windows.inhouse.BookingViewWindow', 'bookingwizard.RightSide.BookingInformation'],
    planboardController: false,
    bookingwizardController: false,
    IsQueueBased: false,
    refs: [{
        ref: 'planboard',
        selector: 'planboard'
    }, {
        ref: 'buffertimeeditwindow',
        selector: 'buffertimeeditwindow'
    }],

    init: function () {
        var me = this;

        this.control({
            'planboard': {
                beforerender: function () {
                    Ext.getStore('common.PropertyForIdAndDistanceStore').removeAll();
                    Ext.getStore('common.PropertyForNamesStore').proxy.setExtraParam('activityCode', 'OPER001');
                    Ext.getStore('common.PropertyForNamesStore').load();
                },
                afterrender: function () {
                    me.loadRoomType();
                    me.loadPlanboardFloor();

                }
            },

            'planboard button[action="search_event"]': {
                click: function () {
                    me.searchEventPlanboard();
                }
            },

            'bookingroomblock': {
                afterrender: function (t) {

                    var panel = Ext.ComponentQuery.query('bookingroomblock form[itemid="bookingroomblockform"]')[0];
                    var bookingroomblockForm = panel.getForm();
                    var t = Ext.decode(t.RoomAvailabilityBlockId);

                    if (t.RoomAvailabilityBlockId > 0) {

                        bookingroomblockForm.load({
                            method: 'GET',
                            url: webAPI_path + 'api/RoomAvailabilityBlock/GetRoomAvailabilityBlockbyId',
                            params: {
                                id: t.RoomAvailabilityBlockId
                            },
                            success: function (form, action) {

                                if (action.result.data.SlotIds != '') {
                                    var IDs = action.result.data.SlotIds.split(",");
                                    var str = [];
                                    Ext.each(IDs, function (id) {
                                        str.push(id)
                                    });
                                    //bookingroomblockForm.findField('slots').setValue(action.result.data.SlotIds)
                                    var oCheckboxGroup = bookingroomblockForm.findField('slotsaa');
                                    oCheckboxGroup.setValue({
                                        slots: str
                                    });
                                    bookingroomblockForm.findField('StartDate').setValue(Ext.util.Format.date(action.result.data.StartDate, usr_dateformat));
                                    bookingroomblockForm.findField('EndDate').setValue(Ext.util.Format.date(action.result.data.EndDate, usr_dateformat)); ;
                                }
                            }
                        });

                    }

                    var panel = Ext.ComponentQuery.query('planboard form[itemid="propertyEditItemsForm"]')[0];
                    var formEdit = panel.getForm();

                    var StartDate = formEdit.findField('StartDate').getValue();
                    var EndDate = formEdit.findField('EndDate').getValue();
                    var propertyId = formEdit.findField('propertyId').getValue();
                    var RoomId = formEdit.findField('selectedRoomId').getValue();
                    var RoomTypeId = formEdit.findField('RoomTypeId').getValue();

                    StartDate = Ext.util.Format.date(StartDate, usr_dateformat);
                    EndDate = Ext.util.Format.date(EndDate, usr_dateformat);

                    var formpanel = Ext.ComponentQuery.query('bookingroomblock form[itemid="bookingroomblockform"]')[0].getForm();
                    formpanel.findField('PropertyId').setValue(propertyId);
                    formpanel.findField('RoomTypeId').setValue(RoomTypeId);
                    formpanel.findField('RoomId').setValue(RoomId);
                    formpanel.findField('StartDate').setValue(StartDate);
                    formpanel.findField('EndDate').setValue(EndDate);
                    formpanel.findField('slots').setValue();
                    StartDate = Ext.util.Format.date(StartDate, usr_dateformat);


                }
            },

            'bookingroomblock datefield[itemid="startdateid"]': {
                select: function (t, e, o) {//t => this, e => event, eo => Eoptional      
                    var ed = Ext.ComponentQuery.query('bookingroomblock [itemid="enddateid"]')[0];
                    ed.setMinValue(t.getValue());
                },
                blur: function (t, e, o) {
                    //var ed = Ext.ComponentQuery.query('bookingroomblock [itemid="enddateid"]')[0];                                       
                    var ed = Ext.ComponentQuery.query('bookingroomblock [itemid="enddateid"]')[0];
                    ed.setMinValue(t.getValue());
                }
            },

            'bookingroomblock button[action="saveRoomAvailabilityBlock"]': {
                click: function () {
                    var formpanel = Ext.ComponentQuery.query('bookingroomblock form[itemid="bookingroomblockform"]')[0].getForm();

                    var Object = formpanel.getValues()

                    var SlotId = formpanel.findField('slots').getValue();

                    var slotIds = '';
                    if (Object.slots.length > 0) {
                        Ext.each(Object.slots, function (slot) {
                            slotIds += slot + ",";
                        });
                    }

                    slotIds = slotIds.replace(/\,$/, '');

                    formpanel.findField('SlotIds').setValue(slotIds);
                    var c = formpanel.getValues();

                    formpanel.submit({
                        url: webAPI_path + 'api/RoomAvailabilityBlock/AddRoomAvailabilityBlock',
                        actionMethods: 'POST',
                        success: function (form, response) {
                            var r = response.result;
                            //r = Ext.decode(r);
                            if (r.success == true) {
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close();
                                }
                                display_alert('MG00000');
                                me.searchEventPlanboard();
                            }
                            else {
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function (form, response) {
                            var r = response.result;
                            if (r.success == false) {
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                            }
                        }
                    });
                }
            },

            /* Chnage actions for filters */
            'planboard combo[itemid="itemRoomTypeCombo"]': {
                change: function (t, newValue, oldValue, eOpts) {
                    me.searchEventPlanboard();
                }
            },
            'planboard combo[itemid="itemRoomSetupCombo"]': {
                change: function (t, newValue, oldValue, eOpts) {
                    me.searchEventPlanboard();
                }
            },
            //            'planboard textfield[itemid="itemTextNumberOfPeople"]': {
            //                specialkey: function (f, e) {
            //                    if (e.getKey() == e.ENTER || e.getKey() == e.TAB) {
            //                        me.searchEventPlanboard();
            //                    }
            //                }
            //            },
            'planboard textfield[name="MIN_AREA"]': {
                specialkey: function (f, e) {
                    if (e.getKey() == e.ENTER || e.getKey() == e.TAB) {
                        me.searchEventPlanboard();
                    }
                }
            },
            'planboard [itemid="itemDescriptionCombo"]': {
                change: function (t, newValue, oldValue, eOpts) {
                    me.searchEventPlanboard();
                }
            },
            'planboard checkbox[itemid="itemCombinedCheck"]': {
                change: function (t, newValue, oldValue, eOpts) {
                    me.searchEventPlanboard();
                }
            },
            'planboard checkbox[itemid="itemIndividualCheck"]': {
                change: function (t, newValue, oldValue, eOpts) {
                    me.searchEventPlanboard();
                }
            },
            'planboard checkbox[itemid="itemSharableCheck"]': {
                change: function (t, newValue, oldValue, eOpts) {
                    t.setValue(newValue);
                    me.searchEventPlanboard();
                }
            },
            'planboard datepicker[itemid="datepickerfield"]': {
                select: function (t, date, eOpts) {

                    me.searchEventPlanboard();
                }
            },
            'planboard radiofield[itemid="BarHide"]': {
                change: function (t, newValue, oldValue, eOpts) {
                    this.searchEventPlanboard();
                }
            },

            'planboard textfield[name="CAPACITY"]': {
                specialkey: function (t, e) {
                    if (e.getKey() == e.ENTER || e.getKey() == e.TAB) {
                        /*@PV: Business logic:
                        Current Scope: if capacity is blank and roomsetup is selected planboard is blank
                        Solved: if no. of capacity at that time roomsetup should also blank                        
                        */
                        var itemRoomSetupCombo = Ext.ComponentQuery.query('planboard combo[itemid="itemRoomSetupCombo"]')[0];
                        if (t.getValue() == "") {
                            if (itemRoomSetupCombo && (itemRoomSetupCombo.getValue() == 0 || itemRoomSetupCombo.getValue() == null)) {
                                me.searchEventPlanboard();
                            }
                        }
                        else {
                            if (itemRoomSetupCombo && itemRoomSetupCombo.getValue() > 0) {
                                me.searchEventPlanboard();
                            }
                        }
                    }
                }
            },

            'planboard combo[action="ROOM_SETUP"]': {
                select: function (combo, records, eOpt) {
                    if (records[0].data.RoomSetupId) {

                        Ext.getCmp('north-panel-planboard').getForm().findField('CAPACITY').enable();
                    } else
                        Ext.getCmp('north-panel-planboard').getForm().findField('CAPACITY').disable();
                }
            },

            'planboard [itemid="north-panel-planboard"]': {
                collapse: function () {
                    var height = parseInt(me.getPlanboard().getHeight() * 0.90);

                    var sched = Ext.ComponentQuery.query('planboard panel[itemid="schedulargrid"] > [itemid=schedularsection]')[0];
                    sched.setHeight(height);
                },
                expand: function () {
                    var height = parseInt(me.getPlanboard().getHeight() * 0.57);
                    var sched = Ext.ComponentQuery.query('planboard panel[itemid="schedulargrid"] > [itemid=schedularsection]')[0];
                    sched.setHeight(height);
                }
            },

            'planboard panel[itemid="schedulargrid"] > [itemid="schedularsection"]': {
                eventcontextmenu: function (s, obj, e) {
                    e.stopEvent();
                    if (!s.ctx) {
                        s.ctx = new Ext.menu.Menu({
                            items: [{
                                text: 'Book Event'.l('SC73000'),
                                iconCls: 'icon-delete'
                            }]
                        })
                    }
                    s.ctx.showAt(e.getXY());
                },

                eventRenderer: function (item, resourceRec, tplData, row, col, ds) {

                    if (resourceRec.data.Classification == "Floor") {
                        tplData.style = 'color: #FFFFFF; background-color:' + (resourceRec.get('Color') || 'Coral');
                    }

                    var bookingStart = item.getStartDate();
                    tplData.style = 'background-color:' + (resourceRec.get('Color') || 'Coral');

                    return item.getName();

                }
            },

            'planboard panel[itemid="itemScheduler"]': {

                beforeeventadd: function (scheduler, newEventRecord, eOpts) {

                    this.IsQueueBased = Utils.IsQueueBased(newEventRecord, 'sch-grid-planboard');

                    /*Start Event create validation*/
                    var startdatetime = new Date(newEventRecord.data.StartDate);
                    var enddatetime = new Date(newEventRecord.data.EndDate);
                    var diffMs = (enddatetime - startdatetime); // milliseconds between startdatetime & enddatetime                       
                    var actualHours = Math.floor(diffMs / 86400000 * 24); // days

                    var datepicker = Ext.ComponentQuery.query('planboard [itemid="datepickerfield"]')[0];
                    var datePickerDate = Ext.util.Format.date(datepicker.getValue(), 'd');
                    var eventStartDate = Ext.util.Format.date(startdatetime, 'd');
                    var sched = Ext.ComponentQuery.query('planboard [itemid="itemScheduler"]')[0];

                    if (sched.viewPreset != 'hourAndDay') {
                        Ext.Msg.alert('Error'.l('g'), 'Event not allowed to create on week/month view'.l('SC73000'));
                        return false;
                    }
                    else if (actualHours >= 24) {
                        Ext.Msg.alert('Error'.l('g'), 'Event should not longer than 24 hours'.l('SC73000'));
                        return false;
                    }
                    else if (datePickerDate != eventStartDate) {
                        Ext.Msg.alert('Error'.l('g'), 'Event should start on selected date only'.l('SC73000'));
                        return false;
                    }
                    /*End of evnet create validation*/
                    var panel = Ext.ComponentQuery.query('planboard form[itemid="propertyEditItemsForm"]')[0];
                    var formEdit = panel.getForm();

                    var resourceStore = scheduler.resourceStore;
                    var eventStore = scheduler.eventStore;

                    var index = resourceStore.find('Id', newEventRecord.getResourceId());
                    var resourceRecord = resourceStore.getAt(index);

                    formEdit.findField('StartDate').setValue(newEventRecord.data.StartDate);
                    formEdit.findField('EndDate').setValue(newEventRecord.data.EndDate);
                    formEdit.findField('propertyId').setValue(resourceRecord.data.PropertyId);
                    formEdit.findField('selectedRoomId').setValue(resourceRecord.data.ResourceId);
                    formEdit.findField('setupTimeField').setValue(resourceRecord.data.TurnTimeBuffer);
                    formEdit.findField('RoomTypeId').setValue(resourceRecord.data.RoomTypeId);
                    formEdit.findField('IsQueueBased').setValue(this.IsQueueBased);
                    var form = Ext.ComponentQuery.query('planboard form[itemid="plabboard_form_all"]')[0].getForm();
                    formfield = form.getValues();

                    var obj = new Object;
                    obj.StartDate = newEventRecord.data.StartDate;
                    obj.EndDate = newEventRecord.data.EndDate;
                    obj.LocationName = resourceRecord.data.PropertyId;
                    obj.ResourceId = resourceRecord.data.ResourceId;
                    obj.RoomTypeId = resourceRecord.data.RoomTypeId;
                    obj.NumberOfPeople = formfield.CAPACITY;
                    obj.RoomSetupId = formfield.ROOM_SETUP;
                    obj.TurnTimeBuffer = resourceRecord.data.TurnTimeBuffer
                    obj.IsQueueBased = formfield.IsQueueBased;

                    var decodedObj = Ext.encode(obj);

                    formEdit.findField('BookingObject').setValue(decodedObj);
                    return true;

                },
                beforeeventdrag: function (view, record, e, eOpts) {
                    var ev = record;

                    ev.raw.oldProperty = ev.raw.PropertyId;

                },
                //  eventdrop: function (scheduler, records, isCopy, eOpts) {
                eventdrop: function (scheduler, records, isCopy, eOpts) {//view, newEventRecord, resource, e, eOpts

                    var ev = records[0];
                    ev.raw.oldProperty = ev.raw.PropertyId;

                    /*get the property name*/
                    var sch = Ext.getCmp('sch-grid-planboard');
                    var rIndex = sch.resourceStore.findExact('Id', Number(ev.get('ResourceId')));
                    var r = sch.resourceStore.getAt(rIndex);
                    ev.raw.newProperty = r.raw.PropertyId;
                    /*end get the property name*/


                    if (ev.raw.BookingStatusCode != "OP2") {
                        this.IsQueueBased = Utils.IsQueueBased(ev, 'sch-grid-planboard');
                        if (this.IsQueueBased && !r.raw.IsSharable) {
                            this.IsQueueBased = false;
                            me.searchEventPlanboard();
                            // alert('Not allowed to overlap another event');
                            Ext.Msg.alert('Error'.l('g'), 'Not allowed to overlap another event'.l('SC73000'));
                            return;
                        }
                    }
                    if (ev.raw.IsMultipleDayBooking == true && ev.raw.IsFirstDay == false) {
                        //alert('Multiple day booking you can move only the first day');
                        Ext.Msg.alert('Error'.l('g'), 'Multiple day booking you can move only the first day'.l('SC73000'));
                        me.searchEventPlanboard();
                        return;
                    }
                    if (Utils.isValid(records[0].modified.StartDate)) {
                        //alert('Not allowed to drop event to another time interval');
                        Ext.Msg.alert('Error'.l('g'), 'Not allowed to drop event to another time interval'.l('SC73000'));
                        me.searchEventPlanboard();
                        return;
                    }


                    //ProcessEvent
                    var sch = Ext.getCmp('sch-grid-planboard');

                    var evRaw = records[0].raw; // Get raw data (here we have all the details)
                    var pEObj = {};


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
                    var btid = evRaw.BookingTrackingId;
                    if (!Utils.isValid(btid)) {
                        btid = 0;
                    }
                    pEObj.BookingTrackingId = btid;
                    pEObj.BookingId = evRaw.BookingId;
                    pEObj.BookingEventId = evRaw.BookingEventId;
                    pEObj.BookingEventTrackingId = evRaw.BookingEventTrackingId;

                    /*Added propertyId*/
                    pEObj.OldPropertyId = ev.raw.oldProperty;
                    pEObj.NewPropertyId = ev.raw.newProperty;
                    pEObj.IsMainEvent = ev.raw.IsMainEvent;
                    this.ProcessEvent(pEObj, this, 0);
                    var items = '';

                    var newobj = new Object;
                    newobj.RoomAvailabilityBlockId = ev.raw.RoomAvailabilityBlockId;
                    newobj.ResourceId = ev.raw.ResourceId;
                    newobj.PropertyId = ev.raw.PropertyId;
                    newobj.RoomTypeId = ev.raw.RoomTypeId;


                    var objDecode = Ext.encode(newobj);
                    if (ev.raw.ISBlockRoom == true) {
                        var items = [{
                            text: 'Edit Block'.l('SC73000'),
                            action: 'edit_block',
                            iconCls: 'icon-edit',
                            itemid: objDecode

                        }, {
                            text: 'Remove Block'.l('SC73000'),
                            action: 'remove_block',
                            iconCls: 'icon-delete',
                            itemid: ev.raw.RoomAvailabilityBlockId
                        }]
                    }
                    else {
                        var items = [{
                            text: 'Create Booking'.l('SC73000'),
                            action: 'create_booking',
                            iconCls: 'booking_create'
                        }, {
                            text: 'Create Block'.l('SC73000'),
                            action: 'create_block',
                            iconCls: 'icon-edit'
                        }]
                    }

                    // if (!s.ctx) {
                    scheduler.ctx = new Ext.menu.Menu({

                        items: items
                    })
                    //   }
                    $('#schedulergridview-1111-' + ev.internalId).mousedown(function (e) {
                        log('eeeeeeeeeeeee', e);
                        if (e.which == 2) {
                            var a = new Array();
                            //a.push(e.pageY);
                            //a.push(e.pageX);
                            //scheduler.ctx.showAt(a);
                        }
                    });
                    $('#schedulergridview-1111-' + ev.internalId).trigger({
                        type: 'mousedown',
                        which: 2
                    });


                },

                afterdragcreate: function (s, e) {

                    if (!s.ctx) {
                        s.ctx = new Ext.menu.Menu({
                            items: [{
                                text: 'Book Event'.l('SC73000'),
                                iconCls: 'icon-delete'
                            }]
                        })
                    }
                    // s.ctx.showAt(e.getXY());
                },
                eventresizeend: function (scheduler, object, eOpt) { // Resizing the event
                    this.searchEventPlanboard();
                    return;
                },
                eventcontextmenu: function (s, obj, e) {

                    e.stopEvent();

                    var items = '', isCompanyAvail = false, isIndividualAvail = false;

                    var newobj = new Object;

                    newobj.RoomAvailabilityBlockId = obj.raw.RoomAvailabilityBlockId;
                    newobj.ResourceId = obj.raw.ResourceId;
                    newobj.PropertyId = obj.raw.PropertyId;
                    newobj.RoomTypeId = obj.raw.RoomTypeId;
                    newobj.ReservationId = obj.raw.ReservationId;
                    newobj.BookingId = obj.raw.BookingId;
                    newobj.BookingTrackingId = obj.raw.BookingTrackingId;
                    newobj.CompanyId = obj.raw.CompanyId; //27823
                    newobj.IndividualId = obj.raw.IndividualId;
                    newobj.StepNumber = obj.raw.StepNumber;

                    /*@PV: Edit form variable which will be used for the creating block in future*/

                    var panel = Ext.ComponentQuery.query('planboard form[itemid="propertyEditItemsForm"]')[0];
                    var sched = Ext.ComponentQuery.query('planboard [itemid="itemScheduler"]')[0];
                    var resource = sched.resourceStore;
                    var event = sched.eventStore;

                    if (obj.data && obj.data.ResourceId > 0) {
                        var selectedResIndex = resource.findExact('ResourceId', obj.data.ResourceId);
                        var selectedRes = resource.getAt(selectedResIndex);

                        var selectedEventIndex = resource.findExact('ResourceId', obj.data.ResourceId);
                        var selectedEvent = resource.getAt(selectedEventIndex);

                        var panel = Ext.ComponentQuery.query('planboard form[itemid="propertyEditItemsForm"]')[0];
                        var formEdit = panel.getForm();
                        /*@PV: selectedevent does not have startdate nad enddate for due to its a resource Object not an Event Object, but it can get from obj Object 
                        so updated it with obj Object
                        */
                        //formEdit.findField('StartDate').setValue(selectedEvent.data.StartDate);
                        //formEdit.findField('EndDate').setValue(selectedEvent.data.EndDate);
                        formEdit.findField('StartDate').setValue(obj.data.StartDate);
                        formEdit.findField('EndDate').setValue(obj.data.EndDate);
                        formEdit.findField('propertyId').setValue(selectedRes.data.PropertyId);
                        formEdit.findField('selectedRoomId').setValue(selectedRes.data.ResourceId);
                        formEdit.findField('RoomTypeId').setValue(selectedRes.data.RoomTypeId);

                    }
                    /*End of editing*/

                    if (newobj.CompanyId > 0)
                        isCompanyAvail = true;

                    if (newobj.IndividualId > 0)
                        isIndividualAvail = true;

                    if (obj.raw.BookingStatusCode == 'OP2') {
                        var items = [{
                            text: 'Change status'.l('g'),
                            action: 'change_status_qbb',
                            iconCls: 'booking_create',
                            eventObj: obj.raw
                        }];
                    } else {
                        //var items = [];
                        if (obj.IsCreated) {
                            var items = [{
                                text: 'Create Booking'.l('g'),
                                action: 'create_booking',
                                iconCls: 'booking_create'
                            }, {
                                text: 'Create Block'.l('g'),
                                action: 'create_block',
                                iconCls: 'icon-edit'
                            }];
                        }
                        else {
                            var items = [{
                                text: 'View Details'.l('g'),
                                action: 'view_bookingDetails',
                                iconCls: 'search-icon',
                                eventObj: newobj
                            }, {
                                text: 'Edit Booking'.l('g'),
                                action: 'edit_booking',
                                iconCls: 'icon-wizard',
                                eventObj: newobj
                            }, {
                                text: 'Edit Company profile'.l('g'),
                                action: 'edit_CompanyProfile',
                                iconCls: 'Add_Company',
                                disabled: isCompanyAvail == true ? false : true,
                                eventObj: newobj
                            }, {
                                text: 'Edit Individual profile'.l('g'),
                                action: 'edit_IndividualProfile',
                                disabled: (isIndividualAvail == true && isCompanyAvail == false) ? false : true,
                                iconCls: 'Add_Individual',
                                eventObj: newobj
                            }, {
                                text: 'Change turn time buffer'.l('g'),
                                action: 'change_turntimebuffer',
                                iconCls: 'icon-edit',
                                eventObj: obj.raw
                            }];
                        }
                    }

                    var objDecode = Ext.encode(newobj);
                    if (obj.raw.ISBlockRoom == true) {
                        var items = [{
                            text: 'Edit Block'.l('g'),
                            action: 'edit_block',
                            iconCls: 'icon-edit',
                            itemid: objDecode

                        }, {
                            text: 'Remove Block'.l('g'),
                            action: 'remove_block',
                            iconCls: 'icon-delete',
                            itemid: obj.raw.RoomAvailabilityBlockId
                        }]
                    }

                    // if (!s.ctx) {
                    s.ctx = new Ext.menu.Menu({

                        items: items
                    })
                    //   }
                    s.ctx.showAt(e.getXY());
                }

            },

            'menu > menuitem[action="create_block"]': {
                click: function (t, records, eOpt) {

                    var panel = Ext.ComponentQuery.query('planboard form[itemid="propertyEditItemsForm"]')[0];
                    var formEdit = panel.getForm();
                    //  alert(formEdit.findField('RoomTypeId').getValue());

                    Ext.create('widget.bookingroomblock', { RoomAvailabilityBlockId: 0 });
                }

            },

            'menu > menuitem[action="create_booking"]': {
                click: function (t, records, eOpt) {
                    var panel = Ext.ComponentQuery.query('planboard form[itemid="propertyEditItemsForm"]')[0];
                    var formEdit = panel.getForm();
                    var formObj = formEdit.getValues();

                    var BookingObject = Ext.decode(formObj.BookingObject);

                    Utils.BookingObject = BookingObject;
                    //log('Booking Obj iiiiiiiiiii', BookingObject);
                    Utils.loadWizardStepsFromOutSide(me, BookingObject, 'step1');

                }

            },

            'menu > menuitem[action="remove_block"]': {
                click: function (t, records, eOpt) {

                    display_alert("MG00020", '', 'C', function (btn) {
                        if (btn === 'yes') {
                            if (t.itemid > 0) {
                                Ext.data.JsonP.request({
                                    url: webAPI_path + 'api/RoomAvailabilityBlock/RemoveRoomAvailabilityBlock',
                                    type: "GET",
                                    params: { id: t.itemid },
                                    success: function (response) {
                                        var r = response;
                                        if (r.success == true) {
                                            me.searchEventPlanboard();
                                        }
                                        else {

                                        }
                                    },
                                    failure: function () { }
                                })
                            }
                        }
                    })
                }

            },

            'menu > menuitem[action="edit_block"]': {
                click: function (t, records, eOpt) {
                    var panel = Ext.ComponentQuery.query('planboard form[itemid="propertyEditItemsForm"]')[0];
                    var formEdit = panel.getForm();
                    //  alert(formEdit.findField('RoomTypeId').getValue());

                    Ext.create('widget.bookingroomblock', { RoomAvailabilityBlockId: t.itemid });
                }

            },

            'menu > menuitem[action="change_status_qbb"]': {
                click: function (t, records, eOpt) {
                    log('records from item', records);
                    log('t is', t);
                    this.ChangeQBToOPT(t.eventObj, this);
                }
            },


            //New Menu implementations

            'menu > menuitem[action="view_bookingDetails"]': {
                click: function (t, records, eOpt) {
                    var BookingObj = t.eventObj;
                    Utils.ShowWindow('widget.inhousebookingview', { BookingId: BookingObj.BookingId, ReservationId: BookingObj.ReservationId });
                    var res = Utils.LoadBookingInformationForRightPane(BookingObj.BookingId > 0 ? BookingObj.BookingId : 0, BookingObj.BookingTrackingId > 0 ? BookingObj.BookingTrackingId : 0, user_language, 1, BookingObj.ReservationId); //paramType=1 for BookingView in popup
                }

            },

            'menu > menuitem[action="edit_booking"]': {
                click: function (t, records, eOpt) {


                    var BookingObj = t.eventObj;
                    if (BookingObj != null) {
                        BookingObj.BookingTrackingId = (BookingObj.BookingTrackingId > 0) ? BookingObj.BookingTrackingId : 0;
                        BookingObj.BookingId = (BookingObj.BookingId > 0) ? BookingObj.BookingId : 0;
                        /*@PV:
                        if bookingID is numeric then booking is confirmed booking so it send to step5,
                        if bookingID is null then we have step# so send it respective step#                            
                        */
                        if (BookingObj.BookingId > 0) {
                            var stepObject = { Number: 5, BookingId: BookingObj.BookingId, BookingTrackingId: BookingObj.BookingTrackingId, Status: null, ReservationId: BookingObj.ReservationId };
                            Utils.loadWizardStepsFromOutSide(me, stepObject, "step5");
                        } else {
                            var stepObject = { Number: BookingObj.StepNumber, BookingId: BookingObj.BookingId, BookingTrackingId: BookingObj.BookingTrackingId, Status: null, ReservationId: BookingObj.ReservationId };

                            Utils.loadWizardStepsFromOutSide(me, stepObject, "step" + (BookingObj.StepNumber >= 5 ? BookingObj.StepNumber : BookingObj.StepNumber + 1));
                        }
                    }

                }
            },

            'menu > menuitem[action="edit_CompanyProfile"]': {
                click: function (t, records, eOpt) {

                    var CompanyObj = t.eventObj;
                    var me = _currentApp;
                    var c = me.getController('customer.CustomerManage');
                    if (me.CustomerManageController == false) {
                        c.init();
                        me.CustomerManageController = true;
                    }

                    obj = new Object();
                    obj.data = new Object();
                    obj.data.CompanyId = CompanyObj.CompanyId;
                    obj.data.IndividualId = 0;
                    c.Company(obj);

                }
            },

            'menu > menuitem[action="edit_IndividualProfile"]': {
                click: function (t, records, eOpt) {

                    var CompanyObj = t.eventObj;
                    var me = _currentApp;
                    var c = me.getController('customer.CustomerManage');
                    if (me.CustomerManageController == false) {
                        c.init();
                        me.CustomerManageController = true;
                    }

                    obj = new Object();
                    obj.data = new Object();
                    obj.data.CompanyId = 0; //CompanyObj.CompanyId;
                    obj.data.IndividualId = CompanyObj.IndividualId;

                    c.Company(obj);
                }
            },


            'menu > menuitem[action="change_turntimebuffer"]': {
                click: function (t, records, eOpt) {
                    var bookingEventId = t.eventObj.BookingEventId;
                    var bookingEventTrackingId = t.eventObj.BookingEventTrackingId;
                    Utils.ShowWindow('widget.buffertimeeditwindow', { bookingEventId: bookingEventId > 0 ? bookingEventId : 0, bookingEventTrackingId: bookingEventTrackingId > 0 ? bookingEventTrackingId : 0 });

                    var bufferForm = Ext.ComponentQuery.query('buffertimeeditwindow form[itemid="turnTimeBufferForm"]')[0].getForm();
                    bufferForm.findField('SetupTime').setValue(t.eventObj.SetupTime);
                }
            },


            //            '[itemid="multislider"]': {
            //                change: function (slider, newValue, thumb, eOpts) {
            //                    var hour = parseInt(newValue / 60); //.toFixed(2);
            //                    var min = newValue - parseInt(hour * 60);

            //                    var newTime = ("0" + hour).slice(-2) + ':' + ("0" + min).slice(-2);

            //                    if (thumb.index == '0') {
            //                        Ext.getCmp('north-panel-planboard').getForm().findField('VlineStartTime').setValue(newTime);
            //                    }
            //                    else if (thumb.index == '1') {
            //                        Ext.getCmp('north-panel-planboard').getForm().findField('VlineEndTime').setValue(newTime);
            //                    }

            //                }
            //            },

            'buffertimeeditwindow button[action="turnTimeBuffer"]': {
                click: function () {
                    var bufferForm = Ext.ComponentQuery.query('buffertimeeditwindow form[itemid="turnTimeBufferForm"]')[0].getForm();
                    if (bufferForm.isValid()) {

                        var setupTime = bufferForm.findField('SetupTime').getValue();

                        if (setupTime < 0) {
                            Ext.Msg.alert('Error'.l('g'), "Buffer time should be greater then zero".l('SC73200'));
                            return;
                        }

                        bufferForm.findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        bufferForm.findField('UpdatedBy').setValue(CurrentSessionUserId);

                        bufferForm.submit({
                            url: webAPI_path + 'api/booking/ChangeTurnTimeBufferForEvent',
                            actionMethods: 'POST',
                            success: function (form, response) {
                                var r = response;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == true) {
                                    me.getBuffertimeeditwindow().close();
                                    me.searchEventPlanboard();
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function (form, response) {
                                var r = response
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.Msg.alert('Error'.l('g'), ResultText); // 'Information not saved.');
                            }
                        });
                    }


                }
            },

            'planboard combo[itemid="planboardPropertyCombo"]': {
                select: function (combo, records, eOpt) {
                    var propertyId = records[0].data.PropertyId;
                    var PropertyName = records[0].data.PropertyName;

                    var gridPanel = Ext.ComponentQuery.query('[itemid="PlanboardPropertyList"]')[0];

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

                                initialStore.sort({
                                    property: 'PropertyName',
                                    direction: "ASC"
                                });

                                initialStore.commitChanges();


                            }
                            else {
                                console.log("Property already added");
                            }
                        }
                        else {
                            console.log('Maximum size reached');
                        }
                    }
                    me.searchEventPlanboard();
                }
            },

            'planboard grid[itemid=PlanboardPropertyList]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);
                    var gridPanel = Ext.ComponentQuery.query('[itemid="PlanboardPropertyList"]')[0];
                    var initialStore = gridPanel.getStore();
                    var data = initialStore.getRange();
                    if (data.length > 1) {
                        if (fieldName == 'deleteProperty') {
                            initialStore.removeAt(iRowIdx);
                            var combo = Ext.ComponentQuery.query('[itemid="planboardPropertyCombo"]')[0];
                        }
                        initialStore.sort({
                            property: 'PropertyName',
                            direction: "ASC"
                        });

                        initialStore.commitChanges();
                        me.searchEventPlanboard();
                    }
                }

            },

            'planboard [itemid="itemScheduler"]': {

                select: function (el, record, eopts) {

                    var window = Ext.WindowManager.get('idroomdetailwindow');

                    if (!Utils.isValid(window)) {
                        window = Ext.create('widget.roomdetailwindow', { param: 'planboard' });
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

                    var floors = Ext.getStore('property.FloorPlanStore');
                    floors.removeAll();
                    floors.proxy.setExtraParam('id', record.raw.PropertyId);
                    floors.proxy.setExtraParam('languageId', user_language);
                    floors.proxy.setExtraParam('searchParam', '');
                    floors.on('load', function () {
                        log("floors", floors);
                    });
                    floors.load();

                }
            },

            'planboard [itemid="photosList"]': {
                select: function (el, record, index, eOpt) {
                    var photoHolder = Ext.ComponentQuery.query('[itemid="propertyImageHolder"]')[0];
                    var descriptionHolder = Ext.ComponentQuery.query('[itemid="propertyPhotoDescription"]')[0];
                    photoHolder.setSrc(image_path + record.raw.OriginalFullImagePath);
                    descriptionHolder.setText(record.raw.PhotoTitle);
                }
            },
            'planboard [itemid="videoList"]': {
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
            'roomdetailwindow[param="planboard"] [itemid="roomPhotosList"]': {
                select: function (el, record, index, eOpt) {
                    var imageHolder = Ext.ComponentQuery.query('[itemid="roomImageHolder"]')[0];
                    var imageDescription = Ext.ComponentQuery.query('[itemid="roomPhotoDescription"]')[0];
                    imageHolder.setSrc(image_path + record.raw.OriginalFullImagePath);
                    imageDescription.setText(record.raw.PhotoTitle);
                }
            },
            'planboard [itemid="floorPlanList"]': {
                select: function (el, record, index, eOpt) {
                    var mainFloorHolder = Ext.ComponentQuery.query('[itemid="mainFloor"]')[0];

                    // Sample pdf for test http://samplepdf.com/sample.pdf
                    //mainFloorHolder.update('<object width="100%" height="100%" data="http://samplepdf.com/sample.pd"></object>');
                    mainFloorHolder.update('<object width="100%" height="100%" data="' + image_path + record.raw.FilePath + '"></object>');
                }
            },
            'planboard [itemid="propertyFloorPlanList"]': {
                select: function (el, record, index, eOpt) {
                    var mainFloorHolder = Ext.ComponentQuery.query('[itemid="propertyMainFloor"]')[0];

                    // Sample pdf for test http://samplepdf.com/sample.pdf
                    //mainFloorHolder.update('<object width="100%" height="100%" data="http://samplepdf.com/sample.pd"></object>');
                    mainFloorHolder.update('<object width="100%" height="100%" data="' + image_path + record.raw.FilePath + '"></object>');
                }
            },

            'planboard multislider[itemid="itemHoursSlider"]': {
                change: function (s, v) {

                    var showType = Ext.ComponentQuery.query('planboard combo[itemid="comboShowType"]')[0];

                    if (showType.getValue() != 'd') {
                        return false
                    }

                    var start = Ext.ComponentQuery.query('planboard [itemid="itemHourStart"]')[0];
                    var end = Ext.ComponentQuery.query('planboard [itemid="itemHourEnd"]')[0];

                    values = s.getValues();
                    var firstSlider = "00:00";
                    var secondSlider = "24:00";

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
                        secondSlider = "24:00";

                    start.setText(firstSlider);
                    end.setText(secondSlider);

                    // start.setText(values[0] + ":00");
                    //  end.setText(values[1] + ":00");

                    var scheduler = Ext.getCmp('sch-grid-planboard');
                    var datepicker = Ext.ComponentQuery.query('planboard [itemid="datepickerfield"]')[0];
                    var displayStartTime = Ext.ComponentQuery.query('planboard [itemid="planboardstarttime"]')[0];
                    var d = datepicker.getValue();
                    me.setVerticleLine(showType.getValue());

                    //  scheduler.switchViewPreset('hourAndDay', new Date(d.getFullYear(), d.getMonth(), d.getDate(), values[0]), new Date(d.getFullYear(), d.getMonth(), d.getDate(), values[1] + 1));
                }
            },

            'planboard [itemid="comboShowType"]': {
                change: function (t, e, o) {
                    /*Multislider shows only when view type is Day view otherwise disable*/
                    var multislider = Ext.ComponentQuery.query('planboard multislider[itemid="itemHoursSlider"]')[0];

                    var multislidercheckbox = Ext.ComponentQuery.query('planboard checkbox[itemid="multislidecheckbox"]')[0];

                    if (e == 'd' && multislidercheckbox.getValue() == true) {
                        multislider.enable();
                    }
                    else {
                        multislider.disable();
                        //    return false;
                    }
                    //me.setViewResolutionPlanboard(e);
                    me.searchEventPlanboard();
                }
            },
            'planboard combo[itemid="planboardstarttime"]': {
                change: function (t, e, o) {
                    try {
                        var scheduler = Ext.getCmp('sch-grid-planboard');
                        var datepicker = Ext.ComponentQuery.query('planboard [itemid="datepickerfield"]')[0];
                        var displayStartTime = Ext.ComponentQuery.query('planboard [itemid="planboardstarttime"]')[0];

                        var d = datepicker.getValue();
                        var startDate = new Date(d);
                        var endDate = new Date(d);
                        endDate.setDate(startDate.getDate() + 1);
                        log("Pratik = ", new Date(d.getFullYear(), d.getMonth(), d.getDate(), displayStartTime.getValue()) +"========="+ new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23));
                        scheduler.switchViewPreset('hourAndDay', new Date(d.getFullYear(), d.getMonth(), d.getDate(), displayStartTime.getValue()), new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23));
                        scheduler.setTimeSpan(new Date(d.getFullYear(), d.getMonth(), d.getDate(), displayStartTime.getValue()), new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23))

                        var planboardZoomSliderObj = Ext.ComponentQuery.query('planboard [itemid="planboardZoomSlider"]')[0];

                        if (planboardZoomSliderObj) {
                            var v = planboardZoomSliderObj.getValue();

                            var scheduler = Ext.getCmp('sch-grid-planboard');
                            scheduler.setTimeColumnWidth(v);
                        }
                    } catch (e) {

                    }
                }
            },

            'planboard checkbox[itemid="multislidecheckbox"]': {
                change: function (t, n, o) {
                    var showType = Ext.ComponentQuery.query('planboard combo[itemid="comboShowType"]')[0];
                    var multislider = Ext.ComponentQuery.query('planboard multislider[itemid="itemHoursSlider"]')[0];

                    if (showType.getValue() == 'd' && n == true) {
                        multislider.enable();
                        me.setVerticleLine('d');
                    }
                    else {
                        multislider.disable();
                        me.removeVerticleLine();
                    }
                }
            }


        })
    },

    setSchedularTime: function () {
        var start = Ext.ComponentQuery.query('planboard [itemid="itemHourStart"]')[0];
        var end = Ext.ComponentQuery.query('planboard [itemid="itemHourEnd"]')[0];

        start.setText("08:00");
        end.setText("22:00");


        var scheduler = Ext.getCmp('sch-grid-planboard');
        var datepicker = Ext.ComponentQuery.query('planboard [itemid="datepickerfield"]')[0];
        var displayStartTime = Ext.ComponentQuery.query('planboard [itemid="planboardstarttime"]')[0];
        var d = datepicker.getValue();
        scheduler.switchViewPreset('hourAndDay', new Date(d.getFullYear(), d.getMonth(), d.getDate(), 08), new Date(d.getFullYear(), d.getMonth(), d.getDate(), 24));
    },
    searchEventPlanboard: function () {

        var form = Ext.ComponentQuery.query('planboard form[itemid=planboardPanel]')[0];
        var formObject = form.getForm().getValues();

        //d = Ext.util.Format.date(formObject.eventDate, 'Y-m-d');
        var datepicker = Ext.ComponentQuery.query('planboard [itemid="datepickerfield"]')[0];
        var dateE = datepicker.getValue();

        d = Ext.util.Format.date(dateE, 'Y-m-d');
        var planboardBarDate = new Date(d);


        /*Get Property ids in comma seperated*/
        var PropertyIds = this.getPropertyIds();

        if (PropertyIds == 'undefined' || PropertyIds.length <= 0 || Ext.util.Format.trim(PropertyIds) == "") {
            Ext.getStore('bookingwizard.PlanboardBookinglistBWStore').removeAll();
            Ext.getStore('bookingwizard.PlanboardBookinglistBWStore').removeAll();
            this.loadRoomType();
            this.loadPlanboardFloor();
            return false;
        }

        var RoomSetupId = Ext.ComponentQuery.query('planboard combo[name=ROOM_SETUP]')[0].getValue();
        var RoomTypeName = Ext.ComponentQuery.query('planboard combo[name=CATEGORY_TYPE]')[0].getValue();

        var IndividualCheckboxId = Ext.ComponentQuery.query('planboard checkbox[name=IndividualCheckboxId]')[0].getValue();
        var CombinedCheckboxId = Ext.ComponentQuery.query('planboard checkbox[name=CombinedCheckboxId]')[0].getValue();
        var SharableCheckboxId = Ext.ComponentQuery.query('planboard checkbox[name=SharableCheckboxId]')[0].getValue();
        var min_area = Ext.ComponentQuery.query('planboard textfield[name=MIN_AREA]')[0].getValue();
        var CAPACITY = Ext.ComponentQuery.query('planboard textfield[name=CAPACITY]')[0].getValue();
        var viewtype = Ext.ComponentQuery.query('planboard combo[name=viewtype]')[0].getValue();




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

        var description = Ext.ComponentQuery.query('planboard combo[name=description]')[0];
        description = description.getValue();


        var comboShowType = Ext.ComponentQuery.query('planboard combo[itemid=comboShowType]')[0];
        comboShowType = comboShowType.getValue();


        var CATEGORY_TYPE = typeof RoomTypeName == "undefined" || RoomTypeName == "" ? null : RoomTypeName;
        var ROOM_SETUP = typeof RoomSetupId == "undefined" || RoomSetupId == "" || RoomSetupId == -1 ? null : RoomSetupId;
        var CAPACITY = typeof CAPACITY == "undefined" || CAPACITY == "" ? null : CAPACITY;
        var MIN_AREA = typeof min_area == "undefined" || min_area == "" ? null : min_area;
        var ROOM_TYPES = typeof ROOM_TYPES == "undefined" || ROOM_TYPES == -1 ? null : ROOM_TYPES; //Individual, Sharable, Combined
        var SORT_BY = typeof formObject.SORT_BY == "undefined" || formObject.SORT_BY == 0 ? null : formObject.SORT_BY;
        var DESCRIPTION = typeof description == "undefined" || description == '' ? null : description;
        var FLOOR_ID = typeof formObject.FloorId == "undefined" || formObject.FloorId == -1 ? null : formObject.FloorId;
        var AVAILABLE = typeof formObject.Positions == "undefined" ? null : formObject.Positions;
        formObject.viewtype = viewtype == "undefined" ? null : viewtype;

        var isAvailable = false;
        var startTime = '08:30:00';
        var endTime = '10:30:00';

        if (AVAILABLE == 1)
            isAvailable = true;
        else
            isAvailable = false;

        var slider = Ext.ComponentQuery.query('planboard multislider[itemid="itemHoursSlider"]')[0];
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

        if (startMinute == 0)
            startMinute = '00';

        if (endMinute == 0)
            endMinute = '00';

        startTime = startHour + ':' + startMinute + ':00';
        endTime = endHour + ':' + endMinute + ':00';


        var searchParam = "PROPERTY_ID?" + PropertyIds + ";DATE?" + d + ";VIEW_TYPE?" + formObject.viewtype + ";LANGUAGE_ID?" + user_language
							+ ";CATEGORY_TYPE?" + CATEGORY_TYPE + ";ROOM_SETUP?" + ROOM_SETUP + ";CAPACITY?" + CAPACITY + ";MIN_AREA?" + MIN_AREA
							+ ";ROOM_TYPES?" + ROOM_TYPES + ";SORT_BY?" + SORT_BY + ";DESCRIPTION?" + DESCRIPTION + ";FLOOR_ID?" + FLOOR_ID
                            + ";FROM_TIME?" + startTime + ";TO_TIME?" + endTime + ";AVAILABLE?" + isAvailable + ";BOOKINGTRACKING_ID?" + null + "; Booking_ID?" + null;
        ;

        var searchParamRoomBlock = "PROPERTY_ID:" + PropertyIds + ";DATE:" + d + ";VIEW_TYPE:" + formObject.viewtype + ";LANGUAGE_ID:" + user_language
							+ ";CATEGORY_TYPE:" + CATEGORY_TYPE + ";ROOM_SETUP:" + ROOM_SETUP + ";CAPACITY:" + CAPACITY + ";MIN_AREA:" + MIN_AREA
							+ ";ROOM_TYPES:" + null + ";SORT_BY:" + SORT_BY + ";FLOOR_ID:" + FLOOR_ID
                             + ";FROM_TIME:" + startTime + ";TO_TIME:" + endTime + ";AVAILABLE:" + false;
        ;

        var schedGrid = Ext.ComponentQuery.query('planboard [itemid=itemScheduler]')[0];

        schedGrid.eventStore.removeAll();
        schedGrid.resourceStore.removeAll();

        schedGrid.resourceStore.proxy.setExtraParam('searchParam', searchParam);

        this.getPlanboard().disable();
        // Ext.getStore('operations.PlanboardRoomlistStore').load();
        schedGrid.eventStore.proxy.setExtraParam('searchParam', searchParam);
        var localThis = this;
        schedGrid.resourceStore.load({

            callback: function (records, o, success) {
                if (o && o.response && typeof o.response.data != 'undefined') {

                    /*@PV: check if property is available or not*/
                    var arrPropertyIds = PropertyIds.split(',');
                    var planboarPropertyName = '';
                    if (arrPropertyIds.length > 0) {
                        Ext.each(arrPropertyIds, function (d) {

                            var propertyCheck = schedGrid.resourceStore.findRecord('PropertyId', d);
                            var gridPanel = Ext.ComponentQuery.query('[itemid="PlanboardPropertyList"]')[0];

                            if (propertyCheck == null) {
                                var rec = gridPanel.getStore().findRecord('PropertyId', d);
                                if (rec)
                                    planboarPropertyName = planboarPropertyName + rec.data.PropertyName + '<br />';
                            }
                        })

                        if (planboarPropertyName != '') {
                            Ext.Msg.alert('Notification'.l('g'), "No rooms available for below property".l('SC73000') + ":<br />" + planboarPropertyName);
                        }
                    }

                    //

                    /*End proeprty check*/

                    var data = o.response.data;
                    var newArr = new Array();
                    var bookingArr = new Array();
                    var BookingEventWithBuffer = new Array();
                    var resourcesArr = new Array();

                    // if (formObject.bar == '1') {                    
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


                            // if (Utils.isValid(tempobj.SetupTime) && tempobj.SetupTime > 0) {
                            //     log('tempobj setup time', tempobj.SetupTime);
                            tempobj.TurnTimeBuffer = tempobj.SetupTime;
                            // }
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

                            /*if event is linked then buffertime or event should not moved/resized; from call with NS 4th Dec; agreed DS and KB too*/
                            if (obj.IsLinkedEvent == true) {
                                obj.eventResizeHandles = 'none';
                                obj.enableEventDragDrop = false;
                            }

                            if (Utils.isValid(tmpBookingEventWithBuffer.TurnTimeBuffer) && tmpBookingEventWithBuffer.TurnTimeBuffer > 0) {
                                BookingEventWithBuffer.push(tmpBookingEventWithBuffer);
                            }
                            //BookingEventWithBuffer.push(tmpBookingEventWithBuffer);
                            BookingEventWithBuffer.push(obj);
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
                    //}
                    //resourcesArr All rooms
                    //bookingArr Rooms which have booking
                    //searchParamRoomBlock Search param setting

                    localThis.setBlockingRoom(resourcesArr, BookingEventWithBuffer, searchParamRoomBlock);
                    //schedGrid.eventStore.loadData(BookingEventWithBuffer);


                    schedGrid.resourceZones.removeAll();
                    // Ext.getStore('operations.AvailabilityStore').removeAll();

                    if (formObject.bar == '1') {
                        //Ext.getStore('operations.AvailabilityStore').loadData(newArr);
                        schedGrid.resourceZones.loadData(newArr);
                    }
                    var date = Ext.ComponentQuery.query('planboard datepicker[itemid="datepickerfield"]')[0].getValue();
                    var e = Ext.ComponentQuery.query('planboard combo[itemid="comboShowType"]')[0].getValue();

                    localThis.setViewResolutionPlanboard(e);

                    var d1 = datepicker.getValue();
                    /*Orange line added*/
                    var lineStart = new Date(d1);
                    var lineEnd = new Date(d1);

                    /*Default time set as per multislider*/
                    lineStart.setHours(8, 0);
                    lineEnd.setHours(15, 0);

                    schedGrid.items.items[1].plugins[1].store.removeAll();
                    schedGrid.items.items[1].plugins[1].store.insert(0, { "Date": lineStart, "Text": 'Start Time'.l('SC73000'), "Cls": ' orange-line' });
                    schedGrid.items.items[1].plugins[1].store.insert(0, { "Date": lineEnd, "Text": 'End Time'.l('SC73000'), "Cls": ' orange-line' });
                    /*Oragen line end*/

                    // schedGrid.setStart(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 30, 0, 0));
                    // schedGrid.setEnd(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 0, 0, 0));

                }

            }

        });

        //RoomName

        this.loadRoomType();
        this.loadPlanboardFloor();
        // this.setSchedularTime();


    },
    getPropertyIds: function () {

        var gridPanel = Ext.ComponentQuery.query('[itemid="PlanboardPropertyList"]')[0];
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
    loadRoomType: function () {
        var combo = Ext.ComponentQuery.query('planboard combo[itemid=itemRoomTypeCombo]')[0];
        /*Get Property ids in comma seperated*/
        var PropertyIds = this.getPropertyIds();

        if (Ext.util.Format.trim(PropertyIds) == "") {
            combo.getStore().removeAll();
            //combo.setValue(0);
            return false;
        }
        //        combo.getStore().proxy.setExtraParam('id', PropertyIds);
        //        combo.getStore().proxy.setExtraParam('languageId', user_language);
        //        combo.getStore().load({
        //            callback: function (records, o, success) {
        //                alert('loadRoomType');
        //            }
        //        });

        Ext.getStore('operations.RoomTypeStore').load({
            params: { 'id': PropertyIds, 'languageId': user_language },
            callback: function (records, o, success) {
                var combo = Ext.ComponentQuery.query('planboard combo[itemid=itemRoomTypeCombo]')[0];
                var store = combo.getStore();
                var index = store.findExact('RoomTypeId', 0);

                if (index == -1) {
                    store.insert(0, {
                        RoomTypeId: 0,
                        RoomTypeName: 'RoomType'.l('SC73000')
                    });

                    combo.setValue(0);
                    //                    store.sort('RoomTypeId', 'ASC');
                    //                    store.commitChanges();
                    //                    store.loadData(store.data.items);
                }

                //combo.setValue(-1);
            }
        });
    },
    loadPlanboardFloor: function () {
        var combo = Ext.ComponentQuery.query('planboard combo[itemid=flooridCombo]')[0];
        /*Get Property ids in comma seperated*/
        var PropertyIds = this.getPropertyIds();

        if (Ext.util.Format.trim(PropertyIds) == "") {
            combo.getStore().removeAll();
            // combo.setValue(0);
            return false;
        }
        //        combo.getStore().proxy.setExtraParam('id', PropertyIds);
        //        combo.getStore().load({
        //            callback: function (records, o, success) {
        //                alert('loadPlanboardFloor');
        //            }
        //        });

        Ext.getStore('operations.PlanboardFloorsStore').load({
            params: { 'id': PropertyIds },
            callback: function (records, o, success) {
                var combo = Ext.ComponentQuery.query('planboard combo[itemid=flooridCombo]')[0];
                var store = combo.getStore();
                var index = store.findExact('FloorId', 0);

                if (index == -1) {
                    store.insert(0, {
                        FloorId: 0,
                        FloorName: "All Floors".l('SC73000')
                    });

                    combo.setValue(0);
                    //                    store.sort('FloorId', 'ASC');
                    //                    store.commitChanges();
                    //                    store.loadData(store.data.items);
                }
            }
        });
    },

    setBlockingRoom: function (data, bookingArr, searchParamRoomBlock) {
        var localThis = this;
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
                                tmpdata.BookingName = "Block Room".l('SC73000');
                                tmpdata.Description = "Block Room".l('SC73000');
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
                                // tmpdata.BookingName = "Block Room";
                                //tmpdata.Description = "Block Room";

                                tmpdata.RoomAvailabilityBlockId = d.RoomAvailabilityBlockId;
                                d.insertedRecord = true;

                                bookingArr.push(tmpdata);

                            }
                        });
                    });

                    var schedGrid = Ext.ComponentQuery.query('planboard [itemid=itemScheduler]')[0];
                    schedGrid.eventStore.loadData(bookingArr);
                    localThis.getPlanboard().enable();
                }
                else {

                    var schedGrid = Ext.ComponentQuery.query('planboard [itemid=itemScheduler]')[0];
                    schedGrid.eventStore.loadData(bookingArr);
                    localThis.getPlanboard().enable();
                }
            },
            failure: function () {
            }
        });

        /*End of Block room detail*/
    },
    ProcessEvent: function (obj, me) {
        localThis = this;
        obj.IsConfirmed = false;
        obj.LanguageId = user_language;
        me.tmpObj = obj;
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
                                  text = text.l("SP_DynamicCode", MBarName, MPrice, MContractDetail);
                              }
                              display_alert(text, '', '', '', true);
                              //me.searchEventPlanboard();
                          }
                      }
                      else {
                          var text = response.result;
                          //text = str_replace(array("\n", "\r"), array("\\n", "\\r"), text);                              
                          text = text.replace(/\\n\\r/g, '<br />');
                          if (text.substring(0, 4) == "SPC_") {
                              text = text.l("SP_DynamicCode", MBarName, MPrice, MContractDetail);
                          }
                          display_alert(text, '', '', '', true);
                          me.searchEventPlanboard();
                      }
                  }
                  else {
                      var text = response.result;
                      if (text.substring(0, 4) == "SPC_") {
                          Ext.Msg.alert('Error'.l('g'), response.result.l("SP_DynamicCode", MBarName, MPrice, MContractDetail));
                      }
                      else {
                          Ext.Msg.alert('Error'.l('g'), response.result);
                      }
                      me.searchEventPlanboard();
                  }
              });

    },
    SecondAPICall: function (btn) {
        var c = _currentApp.getController('operations.Planboard');
        var obj = c.tmpObj;
        obj.LanguageId = user_language;
        obj.IsConfirmed = true;
        if (btn == "yes") {
            var urlItem = webAPI_path + 'api/Booking/ManageDragAndDropOfEvents';
            $.get(urlItem, //Url from API
              obj, // Pass obj
              function (response) {
                  c.tmpObj = null;
                  c.searchEventPlanboard();
              }
            );
        }
        else {
            c.searchEventPlanboard();
            c.tmpObj = null;
        }
    },
    ChangeQBToOPT: function (obj, me) {
        /// <param name="id">userId</param>
        /// <param name="id1">BookingTrackingId</param>
        /// <param name="id2">BookingEventTrackingId</param>
        /// <param name="id3">BookingEventId</param>
        /// <param name="id4">BookingId</param>
        var bookingTrackingId = obj.BookingTrackingId;
        if (!Utils.isValid(bookingTrackingId)) bookingTrackingId = 0;

        var bookingEventTrackingId = obj.BookingEventTrackingId;
        if (!Utils.isValid(bookingEventTrackingId)) bookingEventTrackingId = 0;

        var bookingEventId = obj.BookingEventId;
        if (!Utils.isValid(bookingEventId)) bookingEventId = 0;

        var bookingId = obj.BookingId;
        if (!Utils.isValid(bookingId)) bookingId = 0;

        var urlItem = webAPI_path + 'api/Planboard/ChangeQueueBaseToOptionalbooking';
        $.get(urlItem, //Url from API
              {
              id: CurrentSessionUserId,
              id1: bookingTrackingId,
              id2: bookingEventTrackingId,
              id3: bookingEventId,
              id4: bookingId
          },
              function (response) {
                  me.searchEventPlanboard();
                  if (!response.success) {
                      var ResultText = response.result;
                      if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                          ResultText = ResultText.l("SP_DynamicCode");
                      Ext.Msg.alert('Error'.l('g'), ResultText);
                  }
              });
    },

    setViewResolutionPlanboard: function (e) {

        var scheduler = Ext.getCmp('sch-grid-planboard');
        var datepicker = Ext.ComponentQuery.query('planboard [itemid="datepickerfield"]')[0];
        var displayStartTime = Ext.ComponentQuery.query('planboard [itemid="planboardstarttime"]')[0];
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
                if (scheduler.viewPreset != 'dayAndWeek')
                    scheduler.switchViewPreset('dayAndWeek');
                scheduler.setTimeSpan(startDate, endDate);
                break;
            case 'm':
                var d = datepicker.getValue();
                var start = Sch.util.Date.add(d, Sch.util.Date.DAY, 0);
                Ext.Date.clearTime(start);
                var end = Sch.util.Date.add(start, Sch.util.Date.DAY, 30);
                if (scheduler.viewPreset != 'weekAndMonth')
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
            var datepicker = Ext.ComponentQuery.query('planboard [itemid="datepickerfield"]')[0];
            var d1 = datepicker.getValue();

            /*Get the start time and end time from multislider*/
            var slider = Ext.ComponentQuery.query('planboard multislider[itemid="itemHoursSlider"]')[0];
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

            var schedGrid = Ext.getCmp('sch-grid-planboard');
            schedGrid.items.items[1].plugins[1].store.removeAll();
            schedGrid.items.items[1].plugins[1].store.insert(0, { "Date": lineStart, "Text": 'Start Time'.l('SC73000'), "Cls": ' orange-line' });
            schedGrid.items.items[1].plugins[1].store.insert(0, { "Date": lineEnd, "Text": 'End Time'.l('SC73000'), "Cls": ' orange-line' });
        } catch (e) {

        }
        /*End: Verticle Line showing code*/
    },

    removeVerticleLine: function () {
        var schedGrid = Ext.getCmp('sch-grid-planboard');
        schedGrid.items.items[1].plugins[1].store.removeAll();
    }
});
