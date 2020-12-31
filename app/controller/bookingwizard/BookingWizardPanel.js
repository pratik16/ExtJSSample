Ext.define('Regardz.controller.bookingwizard.BookingWizardPanel', {
    extend: 'Ext.app.Controller',
    views: ['bookingwizard.NoConfirmationWindow'],
    stores: ['common.SearchLocationRangeStore', 'common.RoomSetupStore', 'yield.RoomTypeStore', 'common.MeetingTypeStore', 'property.FloorPropertyStore', 'common.PropertyForNamesStore', 'bookingwizard.PackageListStore', 'bookingwizard.SchedulerEventStore', 'bookingwizard.SchedulerResourceStore', 'operations.RoomTypeStore', 'operations.RoomSetupStore', 'common.PropertyForIdAndDistanceStore', 'property.BWPropertyMeetingTypeStore', 'property.PropertyAtmosphereListStore', 'property.PhotoGalleryListStore', 'property.BWPropertyFacilityIcons', 'property.RoomPhotoListStore', 'property.VideoLibraryListStore', 'property.FloorPlanStore', 'bookingwizard.RoomFloorPlanStore', 'property.PropertyDetails', 'bookingwizard.RoomDetailsStore', 'bookingwizard.RoomSetupListStore', 'property.FloorPlanStore', 'bookingwizard.InfoLeftPanelStore', 'common.PropertyForPropertyIdAndDistanceStore'],

    BWStep1Controller: false,
    BWStep2Controller: false,
    BWStep3Controller: false,
    BWStep4Controller: false,
    BWStep5Controller: false,
    BWStep6Controller: false,
    thisController: false,
    doNextStep1: false,

    doNextStep2: false,
    doNextStep4: false,
    doNextStep5: false,
    doNextStep6: false,
    currrentStepNo: 1,

    refs: [{
        ref: 'bookingwizardpanel',
        selector: 'bookingwizardpanel'
    }, {
        ref: 'bookingwizard',
        selector: 'bookingwizard'
    }],

    init: function () {

        var me = this;

        this.control(
            {

                'bookingwizardpanel': {
                    activate: function () {
                        var panelSteps = Ext.ComponentQuery.query('bookingwizardpanel')[0];
                        var layout = panelSteps.getLayout();

                        var cardPanel = Ext.ComponentQuery.query('bookingwizardpanel panel[itemid="stepone"]')[0];
                        layout.setActiveItem(cardPanel);

                        me.doNextStep1 = false;
                        me.doNextStep2 = false;
                        me.doNextStep4 = false;
                        me.doNextStep5 = false;
                        me.doNextStep6 = false;

                        Utils.isEventCheck = false;

                        for (var key in Utils.Planboard) {
                            if (key == 'undefined')
                                break;
                            if (key > 0)
                                Utils.Planboard[key].AllowCreate = true;
                        }

                    }
                },
                'bookingwizardpanel [itemid="stepone"]': {
                    afterrender: function (t, e) {
                        Ext.getCmp('wizard-close').getEl().show();
                        //return;
                        var c1 = me.getController('bookingwizard.BookingWizardStep1');
                        var myWindow = _myDesktopApp.getModule('bookingWiz-win');
                        me.BWStep1Controller = true;
                        me.BWStep2Controller = false;
                        me.BWStep3Controller = false;
                        me.BWStep4Controller = false;
                        me.BWStep5Controller = false;
                        me.BWStep6Controller = false;
                        Ext.getCmp('move-prev').hide();

                        /*Left panel only available on step2*/
                        var componentLeft = Ext.ComponentQuery.query('bookingwizard panel [itemid="west-regionBookingWizard"]')[0];
                        if (componentLeft)
                            componentLeft.hide();

                        if ((myWindow.stepObject == null) || (myWindow.stepObject && myWindow.stepObject.Number == 1)) {
                            if (c1.thisController == false) {
                                c1.init();
                                c1.thisController = true;
                            }
                        }
                    },
                    activate: function (t, e) {

                        Ext.getCmp('skip-button').hide(); //pratik
                        Ext.getCmp('wizard-close').getEl().show();
                        Ext.getCmp('move-next').setText("Next".l('w'));
                        Ext.getCmp('move-prev').hide();
                        Ext.getCmp('wizard-no-confirmation').show();
                        me.NoConfirmationButton(1);

                        /*Left panel only available on step2*/
                        var componentLeft = Ext.ComponentQuery.query('bookingwizard panel [itemid="west-regionBookingWizard"]')[0];
                        if (componentLeft)
                            componentLeft.hide();
                    }
                },
                'panel [itemid="steptwo"]': {
                    afterrender: function (t, e) {
                        var c2 = me.getController('bookingwizard.BookingWizardStep2');
                        var myWindow = _myDesktopApp.getModule('bookingWiz-win');
                        if (myWindow.stepObject == null) {
                            if (c2.thisController == false) {
                                c2.init();
                                c2.thisController = true;
                            }
                        }
                        else {
                            if (myWindow.stepObject.Number == 2) {
                                if (this.BWStep2Controller == false) {
                                    c2.init();
                                    this.BWStep2Controller = true;
                                }
                            }
                        }
                    },
                    activate: function (t, e) {
                        //Start of wizard buttons logic
                        Ext.getCmp('move-prev').hide();
                        Ext.getCmp('skip-button').hide(); //pratik
                        Ext.getCmp('wizard-close').getEl().hide();
                        Ext.getCmp('move-next').setDisabled(false);
                        Ext.getCmp('move-next').setText("Next".l('w'));
                        //End of wizard buttons logic

                        var c2 = me.getController('bookingwizard.BookingWizardStep2');
                        if (c2.externalBookingTrackingId > 0 || c2.externalBookingId > 0) {
                            /*Start Refresh all Utils variable*/

                            Utils.StepOneObj = {};
                            Utils.StepTwoObj = {};
                            Utils.StepThreeObj = {};
                            Utils.StepFourObj = {};
                            Utils.StepFiveObj = {};
                            Utils.StepSixObj = {};
                            Utils.RightPanObj = {};
                            Utils.SelectedFixedPriceId = 0;
                            Utils.SelectedBarStep3 = "A";
                            Utils.SelectedSharableRoomId = 0;
                            Utils.tmpEvent = {};
                            Utils.AllowCreate = true;
                            Utils.ActivateStepTwo = false;
                            Utils.EventCreated = false;
                            Utils.Planboard = [];
                            Utils.BookingObject = {};
                            //Utils.ActivitiesList = [];
                            //updated by Pratik moved object defination at the top
                            Utils.LoadedController = false;
                            Utils.GlobalPropertyID = 0;
                            /*End Utils*/

                            c2.loadMultiDayLeftPanel();
                            c2.loadStepTwoObject(c2);

                            /*It will be used for prev. button while step is not loaded*/
                            Utils.RightPanObj.BookingTrackingId = c2.externalBookingTrackingId;
                            Utils.RightPanObj.BookingId = c2.externalBookingId;

                            /*@Pratik*/
                            /*Added this code, because step3 loadstep is done in that way, it causes issue in multiple booking*/
                            var c3 = me.getController('bookingwizard.BookingWizardStep3');
                            c3.externalBookingTrackingId = c2.externalBookingTrackingId;
                            c2.externalBookingTrackingId = null;

                            c3.externalBookingId = c2.externalBookingId;
                            c2.externalBookingId = null;
                        }
                        Ext.getCmp('move-next').setDisabled(false);
                        Ext.getCmp('confirm-save').setDisabled(false);
                        Ext.getCmp('wizard-no-confirmation').show();
                        me.NoConfirmationButton(2);

                        /*Left panel only available on step2*/
                        //code writen in step2 with store load
                    }
                },
                'panel [itemid="stepthree"]': {
                    afterrender: function (t, e) {
                        me.BWStep1Controller = false;
                        me.BWStep2Controller = false;
                        me.BWStep3Controller = true;
                        me.BWStep4Controller = false;
                        me.BWStep5Controller = false;
                        me.BWStep6Controller = false;
                    },
                    activate: function (t, e) {
                        //Start of wizard buttons logic                        
                        Ext.getCmp('skip-button').show(); //pratik       
                        Ext.getCmp('wizard-close').getEl().hide();
                        Ext.getCmp('confirm-save').setDisabled(false);
                        Ext.getCmp('move-prev').show();
                        Ext.getCmp('move-next').setText("Next".l('w'));
                        Ext.getCmp('wizard-no-confirmation').show();
                        Ext.getCmp('move-prev').setDisabled(false);
                        Ext.getCmp('move-next').setDisabled(true);

                        //End of wizard buttons logic

                        var c3 = me.getController('bookingwizard.BookingWizardStep3');
                        if (c3.externalBookingTrackingId > 0 || c3.externalBookingId > 0) {
                            /*Start Refresh all Utils variable*/

                            Utils.StepOneObj = {};
                            Utils.StepTwoObj = {};
                            Utils.StepThreeObj = {};
                            Utils.StepFourObj = {};
                            Utils.StepFiveObj = {};
                            Utils.StepSixObj = {};
                            Utils.RightPanObj = {};
                            Utils.SelectedFixedPriceId = 0;
                            Utils.SelectedBarStep3 = "A";
                            Utils.SelectedSharableRoomId = 0;
                            Utils.tmpEvent = {};
                            Utils.AllowCreate = true;
                            Utils.ActivateStepTwo = false;
                            Utils.EventCreated = false;
                            Utils.Planboard = [];
                            Utils.BookingObject = {};
                            //Utils.ActivitiesList = [];
                            //updated by Pratik moved object defination at the top
                            Utils.LoadedController = false;
                            Utils.GlobalPropertyID = 0;
                            /*End Utils*/

                            /*It will be used for prev. button while step is not loaded*/
                            Utils.RightPanObj.BookingTrackingId = c3.externalBookingTrackingId;
                            Utils.RightPanObj.BookingId = c3.externalBookingId;

                            //c3.loadStepThreeObject(c3);
                            //c3.externalBookingTrackingId = null;
                        }

                        me.NoConfirmationButton(3);

                        /*Left panel only available on step2*/
                        var componentLeft = Ext.ComponentQuery.query('bookingwizard panel [itemid="west-regionBookingWizard"]')[0];
                        if (componentLeft)
                            componentLeft.hide();
                    }
                },
                'panel [itemid="stepfour"]': {
                    afterrender: function (t, e) {
                        me.BWStep1Controller = false;
                        me.BWStep2Controller = false;
                        me.BWStep3Controller = false;
                        me.BWStep4Controller = true;
                        me.BWStep5Controller = false;
                        me.BWStep6Controller = false;
                    },
                    activate: function (t, e) {
                        //Start of wizard buttons logic
                        Ext.getCmp('skip-button').hide(); //pratik
                        Ext.getCmp('wizard-close').getEl().hide();
                        Ext.getCmp('move-next').setText("Next".l('w'));
                        Ext.getCmp('move-prev').show();
                        Ext.getCmp('move-prev').setDisabled(false);
                        Ext.getCmp('move-next').setDisabled(false);
                        Ext.getCmp('confirm-save').setDisabled(false);
                        Ext.getCmp('wizard-no-confirmation').show();
                        //End of wizard buttons logic

                        var c4 = me.getController('bookingwizard.BookingWizardStep4');
                        if (c4.externalBookingTrackingId > 0 || c4.externalBookingId > 0) {
                            /*Start Refresh all Utils variable*/

                            Utils.StepOneObj = {};
                            Utils.StepTwoObj = {};
                            Utils.StepThreeObj = {};
                            Utils.StepFourObj = {};
                            Utils.StepFiveObj = {};
                            Utils.StepSixObj = {};
                            Utils.RightPanObj = {};
                            Utils.SelectedFixedPriceId = 0;
                            Utils.SelectedBarStep3 = "A";
                            Utils.SelectedSharableRoomId = 0;
                            Utils.tmpEvent = {};
                            Utils.AllowCreate = true;
                            Utils.ActivateStepTwo = false;
                            Utils.EventCreated = false;
                            Utils.Planboard = [];
                            Utils.BookingObject = {};
                            //Utils.ActivitiesList = [];
                            //updated by Pratik moved object defination at the top
                            Utils.LoadedController = false;
                            Utils.GlobalPropertyID = 0;
                            /*End Utils*/

                            /*It will be used for prev. button while step is not loaded*/
                            Utils.RightPanObj.BookingTrackingId = c4.externalBookingTrackingId;
                            Utils.RightPanObj.BookingId = c4.externalBookingId;

                            c4.loadStepFourObject(c4);
                            c4.externalBookingTrackingId = null;
                            c4.externalBookingId = null;
                        }
                        me.NoConfirmationButton(4);

                        /*Left panel only available on step2*/
                        var componentLeft = Ext.ComponentQuery.query('bookingwizard panel [itemid="west-regionBookingWizard"]')[0];
                        if (componentLeft)
                            componentLeft.hide();
                    }
                },
                'panel [itemid="stepfive"]': {
                    afterrender: function (t, e) {
                        me.BWStep1Controller = false;
                        me.BWStep2Controller = false;
                        me.BWStep3Controller = false;
                        me.BWStep4Controller = false;
                        me.BWStep5Controller = true;
                        me.BWStep6Controller = false;
                    },
                    activate: function (t, e) {

                        //Start of wizard buttons logic
                        Ext.getCmp('skip-button').hide(); //pratik
                        Ext.getCmp('wizard-close').getEl().hide();
                        Ext.getCmp('move-next').setDisabled(false);
                        Ext.getCmp('confirm-save').setDisabled(false);
                        Ext.getCmp('move-next').setText("Next".l('w'));
                        Ext.getCmp('wizard-no-confirmation').show();
                        Ext.getCmp('move-prev').show();
                        Ext.getCmp('move-prev').setDisabled(false);
                        //End of wizard buttons logic

                        var c5 = me.getController('bookingwizard.BookingWizardStep5');

                        if (c5.thisController == false) {
                            c5.init();
                            c5.thisController = true;
                        }

                        if (c5.externalBookingTrackingId > 0 || c5.externalBookingId > 0) {
                            /*Start Refresh all Utils variable*/
                            Utils.StepOneObj = {};
                            Utils.StepTwoObj = {};
                            Utils.StepThreeObj = {};
                            Utils.StepFourObj = {};
                            Utils.StepFiveObj = {};
                            Utils.StepSixObj = {};
                            Utils.RightPanObj = {};
                            Utils.SelectedFixedPriceId = 0;
                            Utils.SelectedBarStep3 = "A";
                            Utils.SelectedSharableRoomId = 0;
                            Utils.tmpEvent = {};
                            Utils.AllowCreate = true;
                            Utils.ActivateStepTwo = false;
                            Utils.EventCreated = false;
                            Utils.Planboard = [];
                            Utils.BookingObject = {};
                            //Utils.ActivitiesList = [];
                            //updated by Pratik moved object defination at the top
                            Utils.LoadedController = false;
                            Utils.GlobalPropertyID = 0;
                            /*End Utils*/

                            /*It will be used for prev. button while step is not loaded*/
                            Utils.RightPanObj.BookingTrackingId = c5.externalBookingTrackingId;
                            Utils.RightPanObj.BookingId = c5.externalBookingId;

                            c5.loadStepFiveObject(c5);
                            c5.externalBookingTrackingId = null;
                            c5.externalBookingId = null;
                        }
                        me.NoConfirmationButton(5);

                        /*Left panel only available on step2*/
                        var componentLeft = Ext.ComponentQuery.query('bookingwizard panel [itemid="west-regionBookingWizard"]')[0];
                        if (componentLeft)
                            componentLeft.hide();
                    }
                },
                'panel [itemid="stepsix"]': {
                    afterrender: function (t, e) {
                        me.BWStep6Controller = true;
                        me.BWStep1Controller = false;
                        me.BWStep2Controller = false;
                        me.BWStep3Controller = false;
                        me.BWStep4Controller = false;
                        me.BWStep5Controller = false;
                        //                        Ext.getCmp('move-next').setDisabled(false);
                        //                        Ext.getCmp('move-next').setText("Send confirmation");
                    },
                    activate: function (t, e) {
                        me.doNextStep6 = false;
                        //Start of wizard buttons logic
                        Ext.getCmp('skip-button').hide();
                        Ext.getCmp('wizard-close').getEl().hide();
                        Ext.getCmp('move-next').setText("Send confirmation".l('w'));
                        Ext.getCmp('move-next').setDisabled(false);
                        Ext.getCmp('wizard-no-confirmation').show();
                        Ext.getCmp('move-prev').show();
                        Ext.getCmp('move-prev').setDisabled(false);
                        //End of wizard buttons logic

                        me.NoConfirmationButton(6);

                        /*Left panel only available on step2*/
                        var componentLeft = Ext.ComponentQuery.query('bookingwizard panel [itemid="west-regionBookingWizard"]')[0];
                        if (componentLeft)
                            componentLeft.hide();

                        var URLAddresCheck = webAPI_path + 'api/booking/CheckedInvoiceAddressForCustermer';
                        if (Utils.RightPanObj.ReservationId > 0) {
                            $.get(URLAddresCheck, { id: Utils.RightPanObj.ReservationId },
                                       function (response) {
                                           if (!response.success) {
                                               //e.style = "background-image:none;background-color:#ff4f60;"
                                               Ext.ComponentQuery.query('bookingwizardstep6 button[itemid="btnChangeProfile"]')[0].addClass('redbutton');
                                               //$(Ext.ComponentQuery.query('bookingwizardstep6 button[itemid="btnChangeProfile"]')[0].el.dom).find('.x-btn-default-small').addClass('redbutton');
                                           }
                                       });
                        }
                    }
                },
                'button[action="saveBWStep1"]': {
                    click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                        
                        /* Hardcoded */
                        //me.loadStepTwoFiles(me);
                        //Validate form                       

                        //if (me.BWStep1Controller) {
                        //    me.saveStepOne(me);
                        //}
                        //else if (me.BWStep2Controller) {
                        //    me.saveStepTwo2(me, 0); //multiday it will pass 0
                        //}
                        //else if (me.BWStep3Controller) {
                        //    me.saveStepThree(me, 0);
                        //}
                        //else if (me.BWStep4Controller) {
                        //    me.saveStepFour(me, 0);
                        //}
                        //else if (me.BWStep5Controller) {
                        //    me.saveStepFive(me, 0);
                        //}
                        //else if (me.BWStep6Controller) {
                        //    me.saveStepSix(me, 0);
                        //}
                        var panelSteps = Ext.ComponentQuery.query('bookingwizardpanel')[0];
                        var layout = panelSteps.getLayout();
                        if (layout.activeItem.itemid == "stepone") {
                            var bookingInformationForm = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="bookingInformation"]')[0].getForm();
                            var reservationId = bookingInformationForm.findField('ReservationId').getValue();
                            if (reservationId > 0)
                                me.saveStepOne(me, true);
                        }
                        else if (layout.activeItem.itemid == "steptwo") {
                            // me.saveStepTwo2(me, 0); //multiday it will pass 0                            
                            /*Step2 is planboard, save button doent call any API*/
                            if (Ext.getCmp('bookingWiz-win'))
                                Ext.getCmp('bookingWiz-win').close();
                        }
                        else if (layout.activeItem.itemid == "stepthree") {
                            //me.saveStepThree(me, 0);
                            if (Ext.getCmp('bookingWiz-win'))
                                Ext.getCmp('bookingWiz-win').close();
                        }
                        else if (layout.activeItem.itemid == "stepfour") {
                            me.saveStepFour(me, 0);
                        }
                        else if (layout.activeItem.itemid == "stepfive") {
                            me.saveStepFive(me, 0);

                        }
                        else if (layout.activeItem.itemid == "stepsix") {
                            me.saveStepSix(me, 0);
                        }
                    }
                },
                'button[action="noConfirmation"]': {
                    click: function (t, e, eo) {//t => this, e => event, eo => Eoptional   
                        var cw = Ext.create('widget.noconfirmationwindow');
                        cw.show();
                        cw.center();
                        return;
                        var stepNumber = 2;
                        var panelSteps = Ext.ComponentQuery.query('bookingwizardpanel')[0];
                        var layout = panelSteps.getLayout();
                        if (layout.activeItem.itemid == "steptwo") {
                            stepNumber = 2;
                        }
                        else if (layout.activeItem.itemid == "stepthree") {
                            stepNumber = 3;
                        }
                        else if (layout.activeItem.itemid == "stepfour") {
                            stepNumber = 4;
                        }
                        else if (layout.activeItem.itemid == "stepfive") {
                            stepNumber = 5;

                        }
                        else if (layout.activeItem.itemid == "stepsix") {
                            stepNumber = 6;
                        }

                        this.noConfirmation(stepNumber);

                    }
                },
                'noconfirmationwindow': {
                    afterrender: function () {
                        //Ext.getStore('common.CancellationReasonStore').load();
                        var combo = Ext.ComponentQuery.query('noconfirmationwindow combo[itemid="unccancellationStore"]')[0];
                        combo.getStore().load({
                            callback: function (records, o, success) {
                                combo.getStore().insert(0, { "CancellationReasonId": 0, "Reason": "Other Reason".l('SC50610') }, true);
                            }
                        });
                    }
                },
                //                'noconfirmationwindow combo[action="cancellationreasonChange"]': {
                //                    select: function (combo, records, Opts) {
                //                        if (combo.getValue() == 0)
                //                            Ext.ComponentQuery.query('noconfirmationwindow [itemid="reasonTextArea"]')[0].enable();
                //                        else {
                //                            Ext.ComponentQuery.query('noconfirmationwindow [itemid="reasonTextArea"]')[0].disable();
                //                        }
                //                    }
                //                },
                'noconfirmationwindow button[action="saveBookingUNC"]': {
                    click: function (t, e, eo) {//t => this, e => event, eo => Eoptional    
                        var cancelId = Ext.ComponentQuery.query('noconfirmationwindow [itemid="unccancellationStore"]')[0].value;
                        var reason = Ext.ComponentQuery.query('noconfirmationwindow [itemid="reasonTextArea"]')[0].value;

                        if (cancelId != null && cancelId != undefined && parseInt(cancelId) >= 0) {
                            cancelId = parseInt(cancelId);
                        } else {
                            Ext.Msg.alert('Error'.l('g'), 'Please select cancellation reason'.l('SC50610'));
                            return;
                        }

                        if (parseInt(cancelId) == 0 && (reason == null || reason == undefined || reason == "")) {
                            Ext.Msg.alert('Error'.l('g'), 'Please select cancellation remark'.l('SC50610'));
                            return;
                        }

                        var newObj = new Object();
                        newObj.BookingId = Utils.RightPanObj.BookingId;
                        newObj.BookingTrackingId = Utils.RightPanObj.BookingTrackingId;
                        newObj.ReservationId = Utils.RightPanObj.ReservationId;
                        newObj.CancellationReasonId = cancelId;
                        newObj.OtherCancellationReason = reason;
                        newObj.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                        newObj.CreatedBy = CurrentSessionUserId;
                        newObj.Step6 = me.currrentStepNo == 6 ? true : false;

                        Ext.Ajax.request({
                            url: webAPI_path + 'api/Booking/SaveBookingUNC',
                            method: 'POST',
                            params: newObj,
                            success: function (response) {
                                var r = Ext.decode(response.responseText);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == true) {
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        win.close();
                                        Ext.ComponentQuery.query('bookingwizardpanel button[action="noConfirmation"]')[0].disable();
                                    }
                                    Ext.getCmp('bookingWiz-win').close();
                                    //me.getBookingwizard().close();
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
                'button[action="saveBWStep2"]': {
                    click: function (t, e, eo) {//t => this, e => event, eo => Eoptional    

                        /* Hardcoded */
                        //me.loadStepTwoFiles(me);
                        //Validate form
                        //if (Ext.getCmp('contactInformation').getForm().isValid()) {
                        //    //Ext.MessageBox.confirm('Alert', 'Are you sure to save contact information?', function (btn) {
                        //    //    if (btn === 'yes') {

                        //    var bookingWizardId = Ext.getCmp('contactInformation').getForm().findField('BookingWizardId').getValue();
                        //    console.log(bookingWizardId);
                        //    var reservationId = Ext.getCmp('bookingInformation').getForm().findField('ReservationId').getValue();
                        //    console.log(reservationId);
                        //    var urlItem = "";
                        //    if (bookingWizardId == 0) {
                        //        urlItem = webAPI_path + 'api/booking/AddBookingWizard';
                        //        console.log('add new booking wizard + reservation');
                        //        Ext.getCmp('contactInformation').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        //        Ext.getCmp('contactInformation').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        //        // console.log(Ext.getCmp('contactInformation').getForm().findField('CreatedDate').getValue());
                        //    }
                        //    else {
                        //        urlItem = webAPI_path + 'api/booking/UpdateStep1';
                        //        console.log('update reservation + booking wizard');
                        //        Ext.getCmp('contactInformation').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        //        Ext.getCmp('contactInformation').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        //    }

                        //    try {


                        //        var CIobj = Ext.getCmp('contactInformation').getForm().getValues();

                        //        CIobj.ReservationId = reservationId;
                        //        CIobj.BookingWizardId = bookingWizardId;

                        //        //Old changed Mihai - wrong view name
                        //        // var from = Ext.ComponentQuery.query('bookinginformation [itemid="bookingInformation"]');
                        //        var fromList = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="bookingInformation"]');

                        //        var from = ((fromList.length > 0) ? fromList[0] : null);

                        //        //Used to check if is property and also to pass data
                        //        var locationNameIsProperty = from.getForm().findField('LocationName').getValue();

                        //        CIobj.BookingName = from.getForm().findField('BookingName').getValue();
                        //        CIobj.LocationName = locationNameIsProperty;
                        //        CIobj.NumberOfPeople = from.getForm().findField('NumberOfPeople').getValue();
                        //        CIobj.PropertyFeatureId = from.getForm().findField('PropertyFeatureId').getValue();
                        //        if (locationNameIsProperty > 0) {
                        //            CIobj.PropertyId = from.getForm().findField('LocationName').getValue();
                        //        }
                        //        else {
                        //            CIobj.PropertyId = null;
                        //        }
                        //        CIobj.RoomSetupId = from.getForm().findField('RoomSetupId').getValue();
                        //        CIobj.Distance = from.getForm().findField('Distance').getValue();
                        //        CIobj.StartDate = Ext.Date.format(from.getForm().findField('StartDate').getValue(), 'Y-m-d H:i:s');
                        //        CIobj.StartTime = Ext.Date.format(from.getForm().findField('StartTime').getValue(), 'H:i');

                        //        CIobj.EndDate = Ext.Date.format(from.getForm().findField('EndDate').getValue(), 'Y-m-d H:i:s');
                        //        CIobj.EndTime = Ext.Date.format(from.getForm().findField('EndTime').getValue(), 'H:i');



                        //        //alert(Ext.getCmp('bookingInformation').getForm().findField('Wizard').getValue());

                        //        var bookingTypeSelection = Ext.getCmp('bookingInformation').getForm().findField('Wizard').getGroupValue();
                        //        if (bookingTypeSelection != 1 || bookingTypeSelection != 2 || bookingTypeSelection != 3) {
                        //            bookingTypeSelection == 1;
                        //        }
                        //        CIobj.Wizard = bookingTypeSelection;

                        //        // var contactPhone = .getValue();

                        //        var fromContactList = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="contactInformation"]');

                        //        var fromContact = ((fromContactList.length > 0) ? fromContactList[0] : null);
                        //        CIobj.ContactPhone = fromContact.getForm().findField('ContactPhoneNumber').getValue();

                        //        //Sergiu. Commentet this because time is set to null
                        //        //from.getForm().setValues(CIobj);

                        //        /* Agency seetings */

                        //        var fieldSetAgency = Utils.getFirstComp(Ext.ComponentQuery.query('fieldset[itemid="itemAgencyFieldSet"]'));
                        //        if (Utils.isValid(fieldSetAgency) && fieldSetAgency.isVisible()) {
                        //            var agency = Ext.getCmp('agencySettings').getForm();
                        //            if (agency.isValid()) {
                        //                CIobj.AccountName = agency.findField('accountName').getValue();
                        //            } else {
                        //                return;
                        //            }
                        //        }
                        //    } catch (e) {
                        //        console.log('Exception in Controller/BookingWizard/BookingWizardPanel.js Ex is:' + e);
                        //    }
                        //    //alert(Ext.getCmp('contactInformation').getForm().findField('CreatedDate'));
                        //    console.log(CIobj);
                        //    Ext.getCmp('contactInformation').getForm().submit({
                        //        url: urlItem,
                        //        type: 'POST',
                        //        params: CIobj,
                        //        success: function (form, response) {
                        //            var r = response.result;
                        //            if (r.success == true) {
                        //                var win = Ext.WindowManager.getActive();
                        //                if (win) {
                        //                    win.close();
                        //                }

                        //                //Ext.getCmp('contactInformation').getForm().findField('BookingWizardId').setValue(r.bookingWId);
                        //                display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));                                        
                        //                //me.loadStepTwoFiles(me);
                        //            }
                        //            else {
                        //                Ext.Msg.alert('Error'.l('g'), r.result);
                        //            }
                        //        },
                        //        failure: function (form, response) {
                        //            r = response.result;
                        //            if (r.success == false) {
                        //                Ext.Msg.alert('Error'.l('g'), r.result);
                        //            }
                        //            else {
                        //                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        //            }
                        //        }
                        //    })

                        //    //    }
                        //    //})
                        //}
                        //else {
                        //    Ext.Msg.alert('Alert', 'Please, fill the Contact informations');
                        //}
                    }
                },

                'bookingwizard button[action="doNextCardLayout"]': {
                    click: function (t, e, eOpts) {//this, e, eOpts
                        var panelSteps = Ext.ComponentQuery.query('bookingwizardpanel')[0];
                        var layout = panelSteps.getLayout();
                        var flag = false;
                        if (layout.activeItem.itemid == "stepone") {
                            var response = this.stepOneSubmit();
                            //if (response != false && response != undefined) {
                            //    flag = true;
                            //    me.loadStepTwoFiles(me);
                            //}
                        }
                        else if (layout.activeItem.itemid == "steptwo") {
                            this.stepTwoSubmit();
                            //me.loadStepThreeFiles(me);
                            flag = true;
                        }
                        else if (layout.activeItem.itemid == "stepthree") {

                            this.stepThreeSubmit();
                            // me.loadStepFourFiles(me);
                            flag = true;

                        }
                        else if (layout.activeItem.itemid == "stepfour") {

                            this.stepFourSubmit();
                            // me.loadStepFourFiles(me);
                            flag = true;

                        }
                        else if (layout.activeItem.itemid == "stepfive") {

                            this.stepFiveSubmit();
                            // me.loadStepFourFiles(me);
                            flag = true;

                        }
                        else if (layout.activeItem.itemid == "stepsix") {

                            this.stepSixSubmit();
                            // me.loadStepFourFiles(me);
                            flag = true;

                        }
                    }
                },

                'bookingwizard button[action="doPreviousCardLayout"]': {
                    click: function (t, e, eOpts) {//this, e, eOpts
                        var panelSteps = Ext.ComponentQuery.query('bookingwizardpanel')[0];
                        var layout = panelSteps.getLayout();
                        if (layout.activeItem.itemid == "stepfive") {
                            var ctrl = _currentApp.getController('bookingwizard.BookingWizardStep4');
                            ctrl.externalBookingTrackingId = null;
                            ctrl.externalBookingId = null;
                            me.previousLevelofWizard();
                            // me.loadStepFourFiles(me);
                            flag = true;
                        }
                        else if (layout.activeItem.itemid == "stepthree") {
                            try {
                                Ext.getCmp('move-prev').hide();
                                Ext.getCmp('move-prev').getEl().hide();
                                Ext.getCmp('wizard-no-confirmation').getEl().show();
                                Ext.getCmp('wizard-close').getEl().hide();
                                Ext.getCmp('skip-button').hide();
                                me.previousLevelofWizard();
                            } catch (e) {

                            }
                        }
                        else {
                            me.previousLevelofWizard();
                        }
                    }
                },
                'bookingwizard button[action="skipAction"]': {
                    click: function () {
                        var panelSteps = Ext.ComponentQuery.query('bookingwizardpanel')[0];
                        var layout = panelSteps.getLayout();
                        if (layout.activeItem.itemid == "stepthree") {
                            var step = layout.activeItem.items.items[0];

                            if (step.getXType() == "bookingwizardstep3checkbox") {
                                display_alert('MG53000');
                                return true;
                            }
                            this.skipStepThree(me);
                        }
                    }
                },
                //                'bookingwizardstep1 textfield[itemid=txtIndividualName]': {
                //                    focus: function (tb, eOpt) {
                //                        alert('indi focus');
                //                    },
                //                    blur: function (tb, eOpt) {
                //                        alert('indi blur');
                //                    }
                //                },
                'bookingwizardstep1 textfield[itemid=txtContactPhoneNum]': {
                    blur: function (tb, eOpt) {
                        me.saveStepOne(me, false);
                    }
                },
                'bookingwizardstep1 textfield[itemid=txtAgencyAccountName]': {
                    blur: function (tb, eOpt) {
                        me.saveStepOne(me, false);
                    }
                }
            }
        )
    },

    noConfirmation: function (stepNumber) {
        var reservationId = 0;
        var controllerString = 'bookingwizard.BookingWizardStep' + stepNumber;

        var ctrl = this.getController(controllerString);

        switch (stepNumber) {
            case 2:
                reservationId = ctrl.stepTwoObject.ReservationId;
                break;
            case 3:
                reservationId = ctrl.stepThreeObject.ReservationId;
                break;
            case 4:
                reservationId = ctrl.stepFourObject.ReservationId;
                break;
            case 5:
                reservationId = ctrl.stepFiveObject.ReservationId;
                break;
            case 6:
                reservationId = ctrl.stepSixObject.ReservationId;
                break;
            default:
                reservationId = 0;
                break;

        }
        //log("reservationid", reservationId);
        var urlItem = webAPI_path + 'api/booking/NoConfirmation';
        var BIobj = {};
        //var reservationId = $("#spReservationId").html();        
        var currentUserId = CurrentSessionUserId;
        BIobj.ReservationId = reservationId;
        BIobj.UpdatedBy = currentUserId;

        $.ajax({
            url: urlItem,
            type: 'POST',
            data: BIobj,
            success: function (response) {
                if (response.Status == "OK") {
                    //var win = Ext.WindowManager.getActive();
                    //if (win) {
                    //    win.close();
                    //}
                } else {
                    var ResultText = response.Message;
                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                        ResultText = ResultText.l("SP_DynamicCode");
                    Ext.Msg.alert('Error'.l('g'), ResultText);
                    return false;
                }
            },
            failure: function (form, response) {

                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));

                return false;
            }
        });
    },

    stepOneSubmit: function () {
        var me = this;
        //Uncomment when next step is needed . Testing purposes
        //me.loadStepTwoFiles(me);

        var propertiesFound = true;
        var propertiesList = new Array();

        var bookingInformationForm = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="bookingInformation"]')[0].getForm();
        var contactInformationForm = Ext.getCmp('contactInformation').getForm();

        if (!bookingInformationForm.isValid() || !contactInformationForm.isValid()) {
            Ext.Msg.alert('Error'.l('g'), 'Please, fill the required informations'.l('g'));
            return false;
        }

        var bookingWizardId = contactInformationForm.findField('BookingWizardId').getValue();
        var reservationId = bookingInformationForm.findField('ReservationId').getValue();
        var urlItem = "";

        if (bookingWizardId == 0) {
            urlItem = webAPI_path + 'api/booking/CreateReservationAndTracking';

            contactInformationForm.findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
            contactInformationForm.findField('CreatedBy').setValue(CurrentSessionUserId);
        }
        else {
            urlItem = webAPI_path + 'api/booking/UpdateReservationAndTracking';

            bookingInformationForm.findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
            bookingInformationForm.findField('UpdatedBy').setValue(CurrentSessionUserId);
            var updateDate = bookingInformationForm.findField('UpdatedDate').getValue();
            var updateBy = bookingInformationForm.findField('UpdatedBy').getValue();
        }

        var BIobj = contactInformationForm.getValues();
        BIobj.ReservationId = reservationId;
        BIobj.UpdatedDate = updateDate;
        BIobj.UpdatedBy = updateBy;

        var createdDate = contactInformationForm.findField('CreatedDate').getValue();
        var createdBy = contactInformationForm.findField('CreatedBy').getValue();
        BIobj.CreatedDate = createdDate;
        BIobj.CreatedBy = createdBy;

        //@Modified by Sergiu to allow Property selection and free text
        var locationName = bookingInformationForm.findField('LocationName');
        var locationValue = locationName.value;
        var distance = bookingInformationForm.findField('Distance').getValue();

        if (locationValue == null) {
            var locationRawValue = locationName.rawValue;
            if (Utils.isValid(locationRawValue)) {
                if (distance != null) {
                    //Means we do not have a property selected and distance is allowed
                    BIobj.LocationName = locationRawValue;
                    BIobj.Distance = distance;
                    BIobj.PropertyId = null;
                    propertiesFound = false;
                }
                else {
                    // Ext.Msg.alert('Error', 'Distance is not selected');
                    display_alert('MG51018');
                    return false;
                }
            }
            else {
                //  Ext.Msg.alert('Error', 'Property or city or postcode not selected');
                display_alert('MG51019');
                return false;
            }
        }
        else {
            //Means we have selected a property and distance is set to null
            BIobj.PropertyId = locationValue; //Property ID
            BIobj.LocationName = locationName.rawValue; // Property Name
            BIobj.Distance = locationValue > 0 ? null : distance; //if locationValue have Id then Distance will null else distance will pass to API
            propertiesFound = true;
            propertiesList.push(locationValue);
        }

        BIobj.BookingWizardId = contactInformationForm.findField('BookingWizardId').getValue();
        BIobj.BookingTrackingId = bookingInformationForm.findField('BookingTrackingId').getValue();

        BIobj.CompanyId = contactInformationForm.findField('CompanyId').getValue();
        BIobj.IndividualId = contactInformationForm.findField('IndividualId').getValue();

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
            //var sdMonth = Ext.Date.format(sdFieldValue, 'm');
            //var sdYear = Ext.Date.format(sdFieldValue, 'Y');
            //var sdDay = Ext.Date.format(sdFieldValue, 'd');
            var sdJs = new Date(sdFieldValue);
            var edJs = new Date(edFieldValue);
            var diffHoursDate = (edJs - sdJs);
            if (diffHoursDate < 0) {
                //Ext.Msg.alert('Error', 'End date must be later than start date');
                display_alert('MG51014');

                return false;
            }

            var diffHrs = (endValue - startValue) / 3600000;
            if (diffHoursDate <= 0 && diffHrs <= 0) {
                //Ext.Msg.alert('Error', 'End time must be after start time');
                display_alert('MG51015');
                return false;
            }

            //            if (diffHrs > 14) {
            //                Ext.Msg.alert('Error', 'Time difference should be less then 12 hours.');
            //                return false;
            //            }

            BIobj.StartDate = sd;
            BIobj.StartTime = Ext.Date.format(bookingInformationForm.findField('StartTime').getValue(), 'H:i');

            BIobj.EndDate = ed;
            BIobj.EndTime = Ext.Date.format(bookingInformationForm.findField('EndTime').getValue(), 'H:i');
        }

        BIobj.BookingName = bookingInformationForm.findField('BookingName').getValue();
        BIobj.NumberOfPeople = bookingInformationForm.findField('NumberOfPeople').getValue();
        BIobj.IsTrainerIncluded = bookingInformationForm.findField('IsTrainerIncluded').getValue();
        var bookingTypeSelection = bookingInformationForm.findField('Wizard').getGroupValue();
        if (bookingTypeSelection != 1 || bookingTypeSelection != 2 || bookingTypeSelection != 3) {
            bookingTypeSelection == 1;
        }
        BIobj.Wizard = bookingTypeSelection;
        BIobj.ContactPhone = contactInformationForm.findField('ContactPhoneNumber').getValue();
        BIobj.RoomSetupId = bookingInformationForm.findField('RoomSetupId').getValue();
        //BIobj.Distance = bookingInformationForm.findField('Distance').getValue();        
        BIobj.PropertyFeatureId = bookingInformationForm.findField('PropertyFeatureId').getValue();

        //from.getForm().setValues(CIobj);

        /* Agency seetings */

        var agencySelectCompany = Utils.getFirstComp(Ext.ComponentQuery.query('radiofield[itemid="radioAgencySelectCompany"]'));
        var agency = Ext.getCmp('agencySettings').getForm();
        var OtherAgencyCompanyId = agency.findField('OtherAgencyCompanyId').getValue();
        if (agencySelectCompany.getValue() == true && OtherAgencyCompanyId <= 0) {
            Ext.Msg.alert('Error'.l('g'), 'Please, select the company for invoice'.l('g'));
            return false;
        }

        var fieldSetAgency = Utils.getFirstComp(Ext.ComponentQuery.query('fieldset[itemid="itemAgencyFieldSet"]'));
        if (Utils.isValid(fieldSetAgency) && fieldSetAgency.isVisible()) {
            var agency = Ext.getCmp('agencySettings').getForm();
            if (agency.isValid()) {
                BIobj.AccountName = agency.findField('accountName').getValue();
                var agencyCompanyId = agency.findField('AgencyCompanyId').getValue();
                BIobj.InvoiceTo = agencyCompanyId;
                var agencyIndividualId = agency.findField('AgencyIndividualId').getValue();
                BIobj.InvoiceToIndividualId = agencyIndividualId;
            } else {
                return;
            }
        }
        /* Agency seetings End */
        //var BIobj = from.getForm().getValues();

        if (!bookingInformationForm.isValid() || !contactInformationForm.isValid()) {
            Ext.Msg.alert('Error'.l('g'), 'Please, fill the required informations'.l('g'));
            return false;
        }


        if (BIobj.IndividualId == "") {
            Ext.Msg.alert('Error'.l('g'), 'Please, fill the contact informations'.l('g')); ///MESSAGE IS NOT PROPER HERE
            return false;
        }
        BIobj.LanguageID = user_language;
        BIobj.PropertyIds = '';
        localthis = this;
        if (!propertiesFound) {
            var urllocationSearch = webAPI_path + 'api/booking/GetLocationsByDistanceAndOtherParams';
            //$.when(
            $.ajax({
                url: urllocationSearch,
                type: 'GET',
                data: {
                    distance: BIobj.Distance,
                    languageId: user_language,
                    locationName: BIobj.LocationName,
                    userId: CurrentSessionUserId
                },
                //params: { bookingWizard: BIobj, bookingTracking: BIobj },
                success: function (response) {
                    if (response.success == true) {
                        propertiesFound = true;
                        propertiesList = response.result;
                        me.stepOneCall(me, urlItem, BIobj);
                    } else {
                        Ext.Msg.alert('Error'.l('g'), 'Location not found'.l('g'));
                        //return false;
                    }
                },
                failure: function (form, response) {
                    Ext.Msg.alert('Error'.l('g'), 'Location not found'.l('g'));
                    //return false;
                }
            });
            //        .then(function (data, textStatus, jqXHR) {
            //    if (data.success) {
            //        propertiesFound = true;
            //        propertiesList = data.result;
            //        alert("success");
            //        this.stepOneCall(me, urlItem, BIobj);
            //    }
            //    else {
            //        Ext.Msg.alert('Error'.l('g'), 'Location not found'.l('g'));
            //        return false;
            //    }
            //}));

        }
        else {
            this.stepOneCall(me, urlItem, BIobj);
        }


    },

    stepOneCall: function (me, urlItem, BIobj) {
        $.ajax({
            url: urlItem,
            type: 'POST',
            data: BIobj,
            success: function (response) {
                if (response.success == true) {
                    /*If booking come from operation-> planboard then skip to step2 and save it here*/
                    if (!Utils.isEmpty(Utils.BookingObject)) {
                        response.result.StartTime = BIobj.StartTime;
                        response.result.EndTime = BIobj.EndTime;
                        localthis.savePlanboardEventDirect(response.result);
                        return;
                    }
                    /*End of operation -> planboard code*/

                    /*@PV: Update current id for booking or tracking */
                    CurrentBookingTrackingId = (response.result.BookingTrackingId > 0) ? response.result.BookingTrackingId : 0;
                    CurrentBookingId = (BIobj.BookingId > 0) ? BIobj.BookingId : 0;

                    var grossPrice = true;

                    //if (response.result != null && response.Message.indexOf(',') >= 0) {
                    //    var items = response.Message.split(',');
                    //    BIobj.PropertyIds = items[1];
                    //    BIobj.ReservationId = items[0];
                    //} else BIobj.ReservationId = response.Message;
                    //log("response.result step 1s", response.result);
                    me.BWStep1Controller = false;
                    BIobj = response.result;

                    BIobj.GrossPrice = grossPrice;
                    if (BIobj.PropertyIds != null) {

                    }
                    Utils.StepOneObj = BIobj;
                    Utils.StepTwoObj = BIobj;
                    Utils.RightPanObj = BIobj; // Update RightPanel object
                    //log("BIobj", BIobj);
                    me.loadStepTwoFiles(me);
                    Utils.LoadBookingInformationForRightPane(BIobj.BookingId, response.result.BookingTrackingId, user_language);

                } else {
                    var ResultText = response.Message;
                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                        ResultText = ResultText.l("SP_DynamicCode");
                    Ext.Msg.alert('Error'.l('g'), ResultText);
                    return false;
                }
                //log("Utils.StepOneObj", Utils.StepOneObj);
            },
            failure: function (form, response) {
                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                return false;
            }
        });
    },

    stepTwoSubmit: function () {
        var me = this;
        //me.BWStep1Controller = false;
        //me.BWStep2Controller = false;
        //me.loadStepThreeFiles(me);
        //var BIobj = from.getForm().getValues();

        this.saveStepTwo2(me, 1);
    },

    stepThreeSubmit: function () {
        var me = this;
        //me.BWStep1Controller = false;
        //me.BWStep2Controller = false;
        //me.loadStepThreeFiles(me);
        //var BIobj = from.getForm().getValues();

        this.saveStepThree(me, 1);
        //var step3 = Ext.ComponentQuery.query('panel [itemid="bookingwizardstep3"]')[0];

    },

    stepFourSubmit: function () {
        var me = this;
        //me.BWStep1Controller = false;
        //me.BWStep2Controller = false;
        //me.loadStepThreeFiles(me);
        //var BIobj = from.getForm().getValues();

        this.saveStepFour(me, 1);
        //var step3 = Ext.ComponentQuery.query('panel [itemid="bookingwizardstep3"]')[0];

    },

    stepFiveSubmit: function () {
        var me = this;
        //me.BWStep1Controller = false;
        //me.BWStep2Controller = false;
        //me.loadStepThreeFiles(me);
        //var BIobj = from.getForm().getValues();

        //Commented as not working on multibooking
        //        if (this.doNextStep5 == true) {
        //            me.loadStepSixFiles(me);
        //            return;
        //        }
        //        else {
        //            this.saveStepFive(me, 1);            
        //        }
        this.saveStepFive(me, 1);

    },

    /* Code by MM*/
    stepSixSubmit: function () {
        var me = this;
        //alert('send conf');
        this.saveStepSix(me, 1);
    },
    /* End of Code by MM*/

    nextLevelofWizard: function (flag) {//when step is last then pass true in flag so last button will be disable from here

        var panelSteps = Ext.ComponentQuery.query('bookingwizardpanel')[0];

        var layout = panelSteps.getLayout();

        layout['next']();

        var items = layout.getActiveItem();

        if (flag) {
            setTimeout(function () {
                Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
                Ext.getCmp('move-next').setDisabled(!layout.getNext());

                /*@PV: step6 next button will always enable-sendconfirmation */
                if (items.itemid == 'stepsix') {
                    Ext.getCmp('move-next').setDisabled(false);
                }

            }, disableBtnTime);
        }
        else {
            Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
            Ext.getCmp('move-next').setDisabled(!layout.getNext());

            /*@PV: step6 next button will always enable- sendconfirmation */
            if (items.itemid == 'stepsix') {
                Ext.getCmp('move-next').setDisabled(false);
            }
        }
    },

    previousLevelofWizard: function () {

        var panelSteps = Ext.ComponentQuery.query('bookingwizardpanel')[0];

        var layout = panelSteps.getLayout();

        layout['prev']();

        Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
        Ext.getCmp('move-next').setDisabled(!layout.getNext());

        var items = layout.getActiveItem();

        /*@Pratik: on previous button is card is not loaded then external load*/
        var stepLayout = Ext.ComponentQuery.query('bookingwizardpanel panel[itemid=' + items.itemid + '] > panel')[0];
        if (!stepLayout) {
            var obj = {};
            obj.BookingTrackingId = Utils.RightPanObj.BookingTrackingId
            obj.BookingId = Utils.RightPanObj.BookingId
            obj.ReservationId = Utils.RightPanObj.ReservationId;
            obj.StatusId = Utils.RightPanObj.StatusId
            var step = 'step1';
            if (items.itemid == 'steptwo') {
                step = 'step2';
                isRquiredReloadStep = true;
            }
            else if (items.itemid == 'stepthree')
                step = 'step3';
            else if (items.itemid == 'stepfour')
                step = 'step4';
            else if (items.itemid == 'stepfive')
                step = 'step5';
            else if (items.itemid == 'stepsix')
                step = 'step6';

            Utils.ActiveStepFromRightPanel(this, obj, step);
        }

        /*End code*/

        /*added this condition as on previous activate event does not called*/
        if (items.itemid == 'steptwo') {
            var c = this.getController('bookingwizard.BookingWizardStep2');
            c.loadMultiDayLeftPanel();
        }
        else if (items.itemid == 'stepfour') {
            step = 'step4';
            isRquiredReloadStep = true;
            var obj = {};
            obj.BookingTrackingId = Utils.RightPanObj.BookingTrackingId
            obj.BookingId = Utils.RightPanObj.BookingId
            obj.ReservationId = Utils.RightPanObj.ReservationId
            if (stepLayout)
                Utils.ActiveStepFromRightPanel(this, obj, step);
        }
        else if (items.itemid == 'stepfour') {
            isRquiredReloadStep = true;
            if (stepLayout)
                Utils.ActiveStepFromRightPanel(this, obj, step);
        }
        /*setTimeout(function () {
            
        }, disableBtnTime);*/

    },

    loadStepTwoFiles: function (me) {

        //        ///Code for load Booking Information by MM - india
        //        if (Utils.isValid(Utils.RightPanObj)) {
        //            Utils.EnablingRPanleAllPanels();
        //            Utils.LoadBookingInformationForRightPane(0, Utils.RightPanObj.BookingTrackingId, user_language);
        //        }
        //        else {
        //            /*@PV: for set object*/
        //            var obj = new Object;
        //            obj.BookingTrackingId = Utils.StepTwoObj.BookingTrackingId;
        //            obj.BookingId = Utils.StepTwoObj.BookingId;
        //            Utils.UpdateRightPanObj(obj, 2);
        //        }

        /// End of Code for load Booking Information by MM - india
        /*check for existence of step two*/
        //var stepTwoLayout = Ext.ComponentQuery.query('panel > panel [itemid="steptwo"]')[0];
        /*Updated by Pratik- all step parent panel is already loaded, then inner step will be load as required
        reason: maintain card sequence from outer side load
        */
        var stepTwoLayout = Ext.ComponentQuery.query('bookingwizardpanel panel[itemid="steptwo"] > panel')[0];

        if (stepTwoLayout) {
            me.nextLevelofWizard();
            return true;
        }

        var c2 = me.getController('bookingwizard.BookingWizardStep2');

        if (c2.thisController == false) {

            c2.init();
            c2.thisController = true;
        }

        var cardLayout = Ext.ComponentQuery.query('bookingwizardpanel panel[itemid="steptwo"]')[0];

        //        cardLayout.add({
        //            layout: 'fit',
        //            itemid: 'steptwo',
        //            items: {
        //                xtype: 'bookingwizardstep2'
        //            }
        //        });

        cardLayout.add({
            xtype: 'bookingwizardstep2'
        });
        cardLayout.doLayout();

        me.nextLevelofWizard();


        return true;
    },

    loadStepThreeFiles: function (me) {

        ///Code for load Booking Information by MM - india
        /*Updated at specific controller*/
        //        if (!Utils.isEmpty(Utils.RightPanObj)) {

        //            Utils.LoadBookingInformationForRightPane(0, Utils.RightPanObj.BookingTrackingId, user_language);
        //            Utils.EnablingRPanleAllPanels();
        //        }
        //        else {

        //            Utils.UpdateRightPanObj(Utils.StepThreeObj, 3);
        //        }

        /// End of Code for load Booking Information by MM - india

        var componentLeft = Ext.ComponentQuery.query('bookingwizard panel [itemid="west-regionBookingWizard"]')[0];

        if (componentLeft) {
            componentLeft.hide();
        }

        /*check for existence of step three*/
        var stepThreeLayout = Ext.ComponentQuery.query('bookingwizardpanel panel[itemid="stepthree"] > panel')[0];

        if (stepThreeLayout) {
            if (stepThreeLayout.StatusId == Utils.StepTwoObj.StatusId) {
                me.nextLevelofWizard();
                return true;
            }
        }

        var c3 = me.getController('bookingwizard.BookingWizardStep3');

        if (c3.thisController == false) {
            c3.init();
            c3.thisController = true;
        }

        var cardLayout = Ext.ComponentQuery.query('bookingwizardpanel panel[itemid="stepthree"]')[0];
        var defaultXtype = 'bookingwizardstep3';

        if (Utils.isValid(Utils.StepTwoObj)) {
            var BTobj = Utils.StepTwoObj;
            //log('Biopbj si', BTobj);
            if (Utils.isValid(BTobj.StatusId)) {

                if (BTobj.StatusId == 1 || BTobj.StatusId == 2) {
                    defaultXtype = 'bookingwizardstep3checkbox';
                }

            }
            cardLayout.removeAll();

            cardLayout.add({
                xtype: defaultXtype
            });


            cardLayout.doLayout();

            var stepThreeLayout = Ext.ComponentQuery.query('bookingwizardpanel panel[itemid="stepthree"] > panel')[0];
            if (Utils.isValid(Utils.StepTwoObj.StatusId)) {
                stepThreeLayout.StatusId = Utils.StepTwoObj.StatusId
            }

            me.nextLevelofWizard();

            return true;
        }

        return false;
    },

    loadStepFourFiles: function (me) {

        ///Code for load Booking Information by MM - india
        /*Updated at specific controller*/
        //        if (Utils.isValid(Utils.RightPanObj)) {
        //            Utils.LoadBookingInformationForRightPane(0, Utils.RightPanObj.BookingTrackingId, user_language);
        //            Utils.EnablingRPanleAllPanels();
        //        }
        //        else {
        //            /*@PV: for set object*/
        //            var obj = new Object;
        //            obj.BookingTrackingId = Utils.StepFourObj.BookingTrackingId;
        //            obj.BookingId = Utils.StepFourObj.BookingId;

        //            Utils.UpdateRightPanObj(obj, 4);
        //        }
        /// End of Code for load Booking Information by MM - india

        /*check for existence of step four*/
        var stepFourLayout = Ext.ComponentQuery.query('bookingwizardpanel panel[itemid="stepfour"] > panel')[0];
        if (stepFourLayout) {
            me.nextLevelofWizard();
            return true;
        }

        var c4 = me.getController('bookingwizard.BookingWizardStep4');

        if (c4.thisController == false) {
            c4.init();
            c4.thisController = true;
        }

        var cardLayout = Ext.ComponentQuery.query('bookingwizardpanel panel[itemid="stepfour"]')[0];

        //        cardLayout.add({
        //            layout: 'fit',
        //            itemid: 'stepfour',
        //            items: {
        //                xtype: 'bookingwizardstep4'
        //            }
        //        });

        cardLayout.add({
            xtype: 'bookingwizardstep4'
        });

        cardLayout.doLayout();

        me.nextLevelofWizard();

        return true;
    },

    loadStepFiveFiles: function (me) {

        ///Code for load Booking Information by MM - india
        /*Updated at specific controller*/
        //        if (Utils.isValid(Utils.RightPanObj)) {
        //            Utils.LoadBookingInformationForRightPane(0, Utils.RightPanObj.BookingTrackingId, user_language);
        //            Utils.EnablingRPanleAllPanels();
        //        }
        //        else {
        //            /*@PV: for set object*/
        //            var obj = new Object;
        //            obj.BookingTrackingId = Utils.StepFiveObj.BookingTrackingId;
        //            obj.BookingId = Utils.StepFiveObj.BookingId;
        //            Utils.UpdateRightPanObj(obj, 5);
        //        }
        /// End of Code for load Booking Information by MM - india

        /*check for existence of step five*/
        var stepFiveLayout = Ext.ComponentQuery.query('bookingwizardpanel panel[itemid="stepfive"] > panel')[0];

        if (stepFiveLayout) {
            if (stepFiveLayout.StatusId == Utils.StepFourObj.StatusId) {
                me.nextLevelofWizard();
                return true;
            }
        }

        var c5 = me.getController('bookingwizard.BookingWizardStep5');

        if (c5.thisController == false) {
            c5.init();
            c5.thisController = true;
        }

        var cardLayout = Ext.ComponentQuery.query('bookingwizardpanel panel[itemid="stepfive"]')[0];

        //        cardLayout.add({
        //            layout: 'fit',
        //            itemid: 'stepfive',
        //            items: {
        //                xtype: 'bookingwizardstep5'
        //            }
        //        });
        cardLayout.removeAll();
        cardLayout.add({
            xtype: 'bookingwizardstep5'
        });

        cardLayout.doLayout();

        var stepFiveLayout = Ext.ComponentQuery.query('bookingwizardpanel panel[itemid="stepfive"] > panel')[0];
        if (Utils.isValid(Utils.StepFourObj.StatusId)) {
            stepFiveLayout.StatusId = Utils.StepFourObj.StatusId
        }

        me.nextLevelofWizard();

        return true;
    },

    loadStepSixFiles: function (me) {

        /*Updated at specific controller*/
        //        ///Code for load Booking Information by MM - india
        //        if (Utils.isValid(Utils.RightPanObj)) {
        //            Utils.LoadBookingInformationForRightPane(0, Utils.RightPanObj.BookingTrackingId, user_language);
        //            Utils.EnablingRPanleAllPanels();
        //        }
        //        else {
        //            /*@PV: for set object*/
        //            var obj = new Object;
        //            obj.BookingTrackingId = Utils.StepSixObj.BookingTrackingId;
        //            obj.BookingId = Utils.StepSixObj.BookingId;

        //            Utils.UpdateRightPanObj(obj, 6);
        //        }
        /// End of Code for load Booking Information by MM - india


        /*check for existence of step five*/
        var stepSixLayout = Ext.ComponentQuery.query('bookingwizardpanel panel[itemid="stepsix"] > panel')[0];
        if (stepSixLayout) {

            me.nextLevelofWizard(false);
            return true;
        }

        var c6 = me.getController('bookingwizard.BookingWizardStep6');

        if (c6.thisController == false) {

            c6.init();
            c6.thisController = true;
        }

        var cardLayout = Ext.ComponentQuery.query('bookingwizardpanel panel[itemid="stepsix]')[0];

        //        cardLayout.add({
        //            layout: 'fit',
        //            itemid: 'stepsix',
        //            items: {
        //                xtype: 'bookingwizardstep6'
        //            }
        //        });

        cardLayout.add({
            xtype: 'bookingwizardstep6'
        });

        cardLayout.doLayout();

        me.nextLevelofWizard(false);

        return true;
    },

    saveStepOne: function (me, wizClose) {
        //agencySettings
        if (Ext.getCmp('contactInformation').getForm().isValid()) {

            //Ext.MessageBox.confirm('Alert', 'Are you sure to save contact information?', function (btn) {
            //    if (btn === 'yes') {
            var bookingInformationForm = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="bookingInformation"]')[0].getForm();
            var contactInformationForm = Ext.getCmp('contactInformation').getForm();
            //var fromContact = ((fromContactList.length > 0) ? fromContactList[0] : null);


            var bookingWizardId = contactInformationForm.findField('BookingWizardId').getValue();
            var reservationId = bookingInformationForm.findField('ReservationId').getValue();

            var urlItem = "";
            if (bookingWizardId == 0) {
                urlItem = webAPI_path + 'api/booking/AddBookingWizard';

                contactInformationForm.findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                contactInformationForm.findField('CreatedBy').setValue(CurrentSessionUserId);
            }
            else {
                urlItem = webAPI_path + 'api/booking/UpdateStep1';

                contactInformationForm.findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                contactInformationForm.findField('UpdatedBy').setValue(CurrentSessionUserId);
            }

            try {
                var CIobj = contactInformationForm.getValues();
                CIobj.ReservationId = reservationId;
                CIobj.BookingWizardId = bookingWizardId;

                if (CIobj.CompanyId == null || CIobj.CompanyId == "" || CIobj.CompanyId == undefined)
                    CIobj.CompanyName = null;

                //@Modified by Sergiu to allow Property selection and free text
                var locationName = bookingInformationForm.findField('LocationName');
                var locationValue = locationName.value;
                if (locationValue == null) {
                    var locationRawValue = locationName.rawValue;
                    if (Utils.isValid(locationRawValue)) {
                        //Means we do not have a property selected and distance is allowed
                        CIobj.LocationName = locationRawValue;
                        CIobj.Distance = bookingInformationForm.findField('Distance').getValue();
                        CIobj.PropertyId = null;
                    }
                    //                    else {
                    //                        Ext.Msg.alert('Error', 'Property or city or postcode not selected');
                    //                        return false;
                    //                    }
                }
                else {
                    //Means we have selected a property and distance is set to null
                    CIobj.PropertyId = locationValue > 0 ? locationValue : null; //Property ID
                    CIobj.LocationName = locationName.rawValue; // Property Name
                    CIobj.Distance = bookingInformationForm.findField('Distance').getValue() > 0 ? bookingInformationForm.findField('Distance').getValue() : null;
                }

                //var locationNameIsProperty = bookingInformationForm.findField('LocationName').getValue();
                //CIobj.LocationName = locationNameIsProperty;
                //try {
                //    if (locationNameIsProperty > 0) {
                //        CIobj.PropertyId = bookingInformationForm.findField('LocationName').getValue();
                //    }
                //    else {
                //        CIobj.PropertyId = null;
                //    }
                //} catch (e) {

                //}

                CIobj.BookingName = bookingInformationForm.findField('BookingName').getValue();

                CIobj.NumberOfPeople = bookingInformationForm.findField('NumberOfPeople').getValue();
                CIobj.PropertyFeatureId = bookingInformationForm.findField('PropertyFeatureId').getValue();


                CIobj.RoomSetupId = bookingInformationForm.findField('RoomSetupId').getValue();


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
                    var sdJs = new Date(sdFieldValue);
                    var edJs = new Date(edFieldValue);
                    var diffHoursDate = (edJs - sdJs);
                    if (diffHoursDate < 0) {
                        //Ext.Msg.alert('Error', 'End date must be later than start date');
                        display_alert('MG51014');
                        return false;
                    }

                    var diffHrs = (endValue - startValue) / 3600000;
                    if (diffHoursDate <= 0 && diffHrs <= 0) {
                        //Ext.Msg.alert('Error', 'End time must be after start time');
                        display_alert('MG51015');
                        return false;
                    }


                    //                    if (diffHrs > 12) {
                    //                        Ext.Msg.alert('Error', 'Time difference should be less then 12 hours.');
                    //                        return false;
                    //                    }

                    CIobj.StartDate = sd;
                    CIobj.StartTime = Ext.Date.format(bookingInformationForm.findField('StartTime').getValue(), 'H:i');

                    CIobj.EndDate = ed;
                    CIobj.EndTime = Ext.Date.format(bookingInformationForm.findField('EndTime').getValue(), 'H:i');
                }

                var bookingTypeSelection = bookingInformationForm.findField('Wizard').getGroupValue();
                if (bookingTypeSelection != 1 || bookingTypeSelection != 2 || bookingTypeSelection != 3) {
                    bookingTypeSelection == 1;
                }
                CIobj.Wizard = bookingTypeSelection;

                CIobj.ContactPhone = contactInformationForm.findField('ContactPhoneNumber').getValue();
                CIobj.PhoneType = bookingInformationForm.findField('PhoneType').getValue();
                //Sergiu. Commentet this because time is set to null
                //from.getForm().setValues(CIobj);

                /* Agency seetings */


                var fieldSetAgency = Utils.getFirstComp(Ext.ComponentQuery.query('fieldset[itemid="itemAgencyFieldSet"]'));

                /*PV added, if other agency selected then its a required*/
                var agencySelectCompany = Utils.getFirstComp(Ext.ComponentQuery.query('radiofield[itemid="radioAgencySelectCompany"]'));
                var agency = Ext.getCmp('agencySettings').getForm();
                var OtherAgencyCompanyId = agency.findField('OtherAgencyCompanyId').getValue();

                if (agencySelectCompany.getValue() == true && OtherAgencyCompanyId <= 0) {

                    Ext.Msg.alert('Error'.l('g'), 'Please, select the company for invoice'.l('g'));
                    return false;
                }
                /*PV end*/

                if (Utils.isValid(fieldSetAgency) && fieldSetAgency.isVisible()) {
                    var agency = Ext.getCmp('agencySettings').getForm();
                    if (agency.isValid()) {

                        CIobj.AccountName = agency.findField('accountName').getValue();
                        var agencyCompanyId = agency.findField('AgencyCompanyId').getValue();
                        CIobj.InvoiceTo = agencyCompanyId;
                        var agencyIndividualId = agency.findField('AgencyIndividualId').getValue();
                        CIobj.InvoiceToIndividualId = agencyIndividualId;

                    } else {

                        return;
                    }
                }
            } catch (e) {
                console.log('Exception in Controller/BookingWizard/BookingWizardPanel.js Ex is:' + e);
            }

            //Adde mihai from planboard
            try {
                CIobj.IsQueueBasedBooking = Utils.BookingObject.IsQueueBased;
                var roomId = Utils.BookingObject.ResourceId;
                CIobj.RoomId = roomId;
            } catch (e) {

            }
            //log("Save step one object :", CIobj);

            contactInformationForm.submit({
                url: urlItem,
                type: 'POST',
                submitEmptyText: false,
                params: CIobj,
                success: function (form, response) {
                    var r = response.result;
                    var ResultText = r.result;
                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                        ResultText = ResultText.l("SP_DynamicCode");
                    if (r.success == true) {
                        if (wizClose == true) {
                            if (Ext.getCmp('bookingWiz-win'))
                                Ext.getCmp('bookingWiz-win').close();
                        }
                        else {
                            Utils.StepOneObj = CIobj;
                            Utils.RightPanObj = CIobj;
                            Utils.RightPanObj.ReservationId = r.reservationWId;
                            contactInformationForm.findField('BookingWizardId').setValue(r.bookingWId);
                            bookingInformationForm.findField('ReservationId').setValue(r.reservationWId);
                            CIobj.ReservationId = r.reservationWId;
                            CIobj.BookingWizardId = r.bookingWId;

                            Utils.UpdateBookingNavigationList(r.reservationWId);


                            //Ext.getCmp('contactInformation').getForm().findField('BookingWizardId').setValue(r.bookingWId);
                            // display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));                                        
                            //me.loadStepTwoFiles(me);

                            /*Code by MM*/
                            Utils.EnablingRPanleIntakeNote();
                            /*End on code by MM*/
                        }
                    }
                    else {
                        Ext.Msg.alert('Error'.l('g'), ResultText);
                    }
                    //log("Utils.StepOneObj", Utils.StepOneObj);
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

            //    }
            //})
        }
        else {
            Ext.Msg.alert('Error'.l('g'), 'Please, fill the contact informations'.l('g'));
        }
    },

    saveStepTwo: function (me, type) {
        var formEdit = Ext.getCmp('propertyEditItemsForm').getForm();
        if (!formEdit.isValid()) {
            alert("Invalid form");
            return;
        }

        var bookingTrackingId = formEdit.findField('bookingTrackingId').getValue();
        //var reservationId = Ext.getCmp('bookingInformation').getForm().findField('ReservationId').getValue();

        var urlItem = "";
        if (bookingTrackingId == 0) {
            urlItem = webAPI_path + 'api/booking/UpdateStep2';
            console.log("ALERT !!! Booking tracking not created");
            if (Utils.StepOneObj.BookingTrackingId > 0)
                formEdit.findField('bookingTrackingId').setValue(Utils.StepOneObj.BookingTrackingId);
            //urlItem = webAPI_path + 'api/booking/AddBookingWizard';
            //console.log('add new booking wizard + reservation');
            //Ext.getCmp('contactInformation').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
            //Ext.getCmp('contactInformation').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
            // console.log(Ext.getCmp('contactInformation').getForm().findField('CreatedDate').getValue());
        }
        else {
            urlItem = webAPI_path + 'api/booking/UpdateStep2';
            console.log('Update booking trackingId: ' + bookingTrackingId);
            //Ext.getCmp('contactInformation').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
            //Ext.getCmp('contactInformation').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
        }

        var sd = formEdit.findField('StartDate').getValue();
        var ed = formEdit.findField('EndDate').getValue();

        var reservationStore = Ext.getStore('bookingwizard.ReservationDetails');
        var reservationId = $("#spReservationId").html();
        reservationStore.proxy.setExtraParam('id', reservationId);
        reservationStore.proxy.setExtraParam('fromTable', 0);
        reservationStore.on('load', function () {
            var dataObj = reservationStore.proxy.reader.jsonData.data;
            var BTobj = dataObj;
            BTobj.BookingTrackingId = bookingTrackingId;
            var startInit = BTobj.StartDate;
            var endInit = BTobj.EndDate;
            var formHolder = Utils.getFirstComp(Ext.ComponentQuery.query('panel [itemid="planboardPanel"]'));
            if (formHolder == null) {
                //Show meesage here , error handeling
            }
            var form = formHolder.getForm();

            BTobj.RoomSetupId = form.getValues().RoomSetupId;
            BTobj.NumberOfPeople = form.getValues().NumberOfPeople;

            BTobj.StartDate = Ext.Date.format(new Date(sd), 'Y-m-d H:i:s');
            BTobj.EndDate = Ext.Date.format(new Date(ed), 'Y-m-d H:i:s');

            BTobj.UpdatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
            BTobj.UpdatedBy = CurrentSessionUserId;
            var formEdit = Ext.getCmp('propertyEditItemsForm').getForm();
            var roomId = formEdit.findField('selectedRoomId').getValue();

            BTobj.RoomId = roomId;
            var turnTimeValue = formEdit.findField("setupTimeField").getValue();
            if (turnTimeValue == null)
                turnTimeValue = 0;
            BTobj.SetupTime = turnTimeValue;
            BTobj.LanguageID = user_language;

            try {
                var grid = Ext.ComponentQuery.query('[itemid="itemMultipleDatesGrid"]')[0];
                var gridStore = grid.getStore();
                var elements = gridStore.getRange();

                if (elements.length > 1) {
                    var found = false;
                    for (var i = 0; i < elements.length; i++) {
                        if (elements[i].data.Status == 0) {
                            found = true;
                            break;
                        }
                    }
                    if (found == true && type != 0) {
                        Ext.Msg.alert('Error', 'Please create events for all days'.l('g'));
                        return;
                    }
                }
            } catch (e) {

            }


            $.ajax({
                url: urlItem,
                type: 'POST',
                data: BTobj,
                success: function (response) {

                    if (type == 0) {
                        if (response.Status == "OK") {
                            display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));

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
                            Utils.UpdateBookingNavigationList(reservationId); //call for Update Rightpanle navigation
                            Utils.LoadBookingInformationForRightPane(Utils.RightPanObj.BookingId, Utils.RightPanObj.BookingTrackingId, user_language);
                            Utils.StepTwoObj = BTobj;
                        }
                        else {
                            Ext.Msg.alert('Error', 'Event not selected'.l('g'));
                        }
                    }
                    else {
                        if (response.Status == "OK") {

                            me.BWStep1Controller = false;
                            me.BWStep2Controller = false;

                            Utils.StepTwoObj = BTobj;

                            me.loadStepThreeFiles(me);
                            Utils.UpdateBookingNavigationList(reservationId);
                            Utils.LoadBookingInformationForRightPane(Utils.RightPanObj.BookingId, Utils.RightPanObj.BookingTrackingId, user_language);

                        }
                        else {
                            Ext.Msg.alert('Error', 'Event not selected'.l('g'));
                        }
                    }
                },
                failure: function () {
                    //Ext.Msg.alert('Error', 'Information not saved.');
                    display_alert('MG51011');

                }
            });



        }, this, { single: true });
        //reservationStore.loadsaveBWStep1


    },

    saveStepTwo2: function (me, type) {
        if (Utils.isValid(Utils.StepOneObj)) {
            var stepOneObj = Utils.StepOneObj;
            var panel = Ext.ComponentQuery.query('panel[itemid="planboardPanel"]')[0];
            this.stepTwoCall(stepOneObj, me, type);
        }
        else {
            var loadedReservationId = this.reservationId;
            reservationStore.proxy.setExtraParam('id', loadedReservationId);
            reservationStore.on('load', function () {
                var stepOneObj = reservationStore.proxy.reader.jsonData.data;

                this.stepTwoCall(stepOneObj, me, type);
            }, this, { single: true });
            reservationStore.load();
        }

    },

    saveStepThree: function (me, type) {

        //long Fixedpriceid, bool IsRemovedExistingData, decimal RoomRent, decimal TotalPrice, decimal minimumTurnover, 
        //int Bar, long BookingtrackingId, int Userid, int LanguageID , int TypeId, int? SecondaryBar
        var ctrl = _currentApp.getController('bookingwizard.BookingWizardStep3');
        var localObject = ctrl.stepThreeObject;

        var urlItem = webAPI_path + 'api/booking/ManageBookingWizardStepThree';
        var bpObj = new Array();
        // var grid = Ext.ComponentQuery.query('[itemid="bookingwizardstep3"]')[0]; 
        var grid = Ext.ComponentQuery.query('[itemid="PackageListGrid"]')[0];
        var fixed = Utils.SelectedFixedPriceId;
        var selectedBar = Utils.SelectedBarStep3;
        //log("selected bar", selectedBar);

        var store = grid.getStore();
        var index = store.findExact("FixedPriceId", fixed);
        var selected = store.getAt(index);

        //log("selected", selected);
        if (!Utils.isValid(selected)) {
            Ext.Msg.alert('Error', 'No package selected'.l('g'));
            return false;
        }
        bpObj.Fixedpriceid = fixed;
        bpObj.Userid = CurrentSessionUserId; // int
        bpObj.LanguageID = user_language;
        bpObj.TypeId = selected.data.TypeId; //int
        bpObj.IsRemovedExistingData = false; //bool
        bpObj.IsSkipMininumRevenueCheck = false
        bpObj.RoomRent = selected.data.Price; //decimal Room price
        bpObj.minimumTurnover = selected.data.TurnOver; //decimal      
        bpObj.BookingId = localObject.BookingId;
        var bar = 1;
        var totalPrice = 0;
        selected.data.Selected = Utils.SelectedBarStep3;
        if (selected.data.Selected == "A") {
            bar = 1;
            totalPrice = selected.data.TotalA;
        }
        else if (selected.data.Selected == "B") {
            bar = 2;
            totalPrice = selected.data.TotalB;
        }
        else if (selected.data.Selected == "C") {
            bar = 3;
            totalPrice = selected.data.TotalC;
        }
        else if (selected.data.Selected == "D") {
            bar = 4;
            totalPrice = selected.data.TotalD;
        }
        bpObj.Bar = bar; //int
        bpObj.TotalPrice = totalPrice; //decimal

        bpObj.SecondaryBar = 0; //int?
        //   bpObj.BookingtrackingId = localObject.BookingTrackingId; //long -> changed by Pratik as it is stopped in step4 data load
        bpObj.BookingTrackingId = localObject.BookingTrackingId; //long        
        if (grid != null && grid.ownerCt.xtype == 'bookingwizardstep3checkbox') {

            var groupRowChecked = $("input:checkbox[name='row_" + index + "'][checked]");
            //log('group', groupRowChecked);

            var ck1 = groupRowChecked.first();
            var ck2 = groupRowChecked.last();

            var v1 = ck1.attr('data-value');
            var v2 = ck2.attr('data-value');

            if (v1 > v2) {
                bpObj.Bar = ck1.attr('data-bar');
                bpObj.SecondaryBar = ck2.attr('data-bar');
            } else {
                bpObj.Bar = ck2.attr('data-bar');
                bpObj.SecondaryBar = ck1.attr('data-bar');
            }

        }
        //log("bpObj", bpObj);

        $.ajax({
            url: urlItem,
            type: 'POST',
            //data: bpObj,
            data: {
                Fixedpriceid: bpObj.Fixedpriceid,
                Userid: bpObj.Userid,
                LanguageID: bpObj.LanguageID,
                TypeId: bpObj.TypeId,
                IsRemovedExistingData: bpObj.IsRemovedExistingData,
                IsSkipMininumRevenueCheck: bpObj.IsSkipMininumRevenueCheck,
                RoomRent: bpObj.RoomRent,
                minimumTurnover: bpObj.minimumTurnover,
                Bar: bpObj.Bar,
                TotalPrice: bpObj.TotalPrice,
                SecondaryBar: bpObj.SecondaryBar,
                BookingtrackingId: bpObj.BookingTrackingId,
                BookingId: bpObj.BookingId

            },
            success: function (response) {
                var MSGResult = response.result
                var PackageGROSSPRice = 0;
                var Revenue = 0;
                if (typeof (response.Revenue) != "undefined") {
                    Revenue = response.Revenue;
                }
                Revenue = "€ " + Ext.util.Format.number(Revenue, '0,000.00');
                if (typeof (response.PackageGROSSPRice) != "undefined") {
                    PackageGROSSPRice = response.PackageGROSSPRice;
                }
                PackageGROSSPRice = "€ " + Ext.util.Format.number(PackageGROSSPRice, '0,000.00');
                if (MSGResult.substring(0, 4) == "SPC_") {
                    MSGResult = MSGResult.l("SP_DynamicCode", PackageGROSSPRice, Revenue);
                }
                if (response.success != true && response.MsgType == "Error") {

                    Ext.Msg.alert('Error', MSGResult);
                    return;
                }

                if (response.confirm == true) {
                    Ext.Msg.confirm('Success'.l('g'), MSGResult,
                     function (btn) {
                         if (btn === 'yes') {
                             me.stepThreeCall(bpObj, type, me, response.MsgType);
                         } else {
                             //DO NOTHING. STAY ON SAME PAGE
                         }
                     });
                }
                else {
                    if (type == 0) { // SAVE 

                        Utils.StepThreeObj = response.data;
                        var win = Ext.WindowManager.getActive();
                        if (win) {
                            win.close();
                        }
                    }
                    else { // NEXT
                        Utils.StepThreeObj = response.data;
                        //log("Utils.StepThreeObj", Utils.StepThreeObj);

                        me.BWStep1Controller = false;
                        me.BWStep2Controller = false;
                        me.BWStep3Controller = false;
                        me.loadStepFourFiles(me);
                    }
                    Utils.UpdateBookingNavigationList(localObject.ReservationId); //call for Update Rightpanle navigation
                    Utils.LoadBookingInformationForRightPane(Utils.RightPanObj.BookingId, Utils.RightPanObj.BookingTrackingId, user_language);
                    //   alert("Load step four");
                }


            },
            failure: function () {
                //Ext.Msg.alert('Error', 'Information not saved.');
                display_alert('MG51011');
            }
        });

    },

    skipStepThree: function (me) {

        var ctrl = _currentApp.getController('bookingwizard.BookingWizardStep3');
        //  log("ctrl.stepThreeObject", ctrl.stepThreeObject);
        var urlItem = webAPI_path + 'api/booking/SkipBookingStep3';
        //        if (!Utils.isValid(ctrl.stepThreeObject.BookingId)) {
        //            ctrl.stepThreeObject.BookingId = 0;
        //        }

        var BookingId = (ctrl.stepThreeObject && ctrl.stepThreeObject.BookingId > 0) ? ctrl.stepThreeObject.BookingId : 0;
        var BookingTrackingId = (ctrl.stepThreeObject && ctrl.stepThreeObject.BookingTrackingId > 0) ? ctrl.stepThreeObject.BookingTrackingId : 0;
        var ReservationId = (ctrl.stepThreeObject && ctrl.stepThreeObject.ReservationId > 0) ? ctrl.stepThreeObject.ReservationId : 0;

        Ext.data.JsonP.request({
            url: urlItem,
            type: 'GET',
            params: {
                id: BookingId,
                id1: BookingTrackingId,
                id2: CurrentSessionUserId,
                id3: false
            },
            success: function (response) {
                var ResultText = response.result
                var RoomRent = 0;
                var MinTurnOver = 0;
                if (typeof (response.MinTurnOver) != "undefined") {
                    MinTurnOver = response.MinTurnOver;
                }
                MinTurnOver = "€ " + Ext.util.Format.number(MinTurnOver, '0,000.00');
                if (typeof (response.RoomRent) != "undefined") {
                    RoomRent = response.RoomRent;
                }
                RoomRent = "€ " + Ext.util.Format.number(RoomRent, '0,000.00');

                if (response.success != true) {
                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_") {
                        Ext.Msg.alert('Error', ResultText.l('SP_DynamicCode'), RoomRent, MinTurnOver);
                    }
                    else {
                        Ext.Msg.alert('Error', response.result);
                    }
                    return;
                }

                //                if (response.Confirm) {
                //                    if (confirm(response.data)) {

                if (response.Confirm == true) {
                    var Rdata = response.data;
                    var RoomRent = 0;
                    var MinTurnOver = 0;
                    if (typeof (response.MinTurnOver) != "undefined") {
                        MinTurnOver = response.MinTurnOver;
                    }
                    MinTurnOver = "€ " + Ext.util.Format.number(MinTurnOver, '0,000.00');
                    if (typeof (response.RoomRent) != "undefined") {
                        RoomRent = response.RoomRent;
                    }
                    RoomRent = "€ " + Ext.util.Format.number(RoomRent, '0,000.00');
                    if (Rdata && Rdata.length > 0 && Rdata.substring(0, 4) == "SPC_") {
                        Rdata = Rdata.l("SP_DynamicCode", RoomRent, MinTurnOver);
                    }
                    Ext.Msg.confirm('Success'.l('g'), Rdata,
                     function (btn) {
                         if (btn === 'yes') {

                             Ext.data.JsonP.request({
                                 url: urlItem,
                                 type: 'GET',
                                 params: {
                                     id: BookingId,
                                     id1: BookingTrackingId,
                                     id2: CurrentSessionUserId,
                                     id3: true
                                 },
                                 success: function (response) {
                                     var ResultText = response.result;
                                     var RoomRent = 0;
                                     var MinTurnOver = 0;
                                     if (typeof (response.MinTurnOver) != "undefined") {
                                         MinTurnOver = response.MinTurnOver;
                                     }
                                     MinTurnOver = "€ " + Ext.util.Format.number(MinTurnOver, '0,000.00');
                                     if (typeof (response.RoomRent) != "undefined") {
                                         RoomRent = response.RoomRent;
                                     }
                                     RoomRent = "€ " + Ext.util.Format.number(RoomRent, '0,000.00');
                                     if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                         ResultText = ResultText.l("SP_DynamicCode", RoomRent, MinTurnOver);
                                     if (response.success != true) {
                                         Ext.Msg.alert('Error', ResultText);
                                         return;
                                     }

                                     Utils.StepThreeObj = response.data;
                                     Utils.UpdateBookingNavigationList(ReservationId); //call for Update Rightpanle navigation
                                     Utils.LoadBookingInformationForRightPane(Utils.RightPanObj.BookingId, Utils.RightPanObj.BookingTrackingId, user_language);

                                     me.BWStep1Controller = false;
                                     me.BWStep2Controller = false;
                                     me.BWStep3Controller = false;
                                     //me.BWStep4Controller = true;
                                     me.loadStepFourFiles(me);
                                 },
                                 failure: function () {
                                     //Ext.Msg.alert('Error', 'Information not saved.');
                                     display_alert('MG51011');
                                 }
                             });
                         }
                     });
                }

                else {
                    Utils.StepThreeObj = response.data;
                    Utils.UpdateBookingNavigationList(ReservationId); //call for Update Rightpanle navigation
                    Utils.LoadBookingInformationForRightPane(Utils.RightPanObj.BookingId, Utils.RightPanObj.BookingTrackingId, user_language);

                    me.BWStep1Controller = false;
                    me.BWStep2Controller = false;
                    me.BWStep3Controller = false;
                    //me.BWStep4Controller = true;
                    me.loadStepFourFiles(me);
                }
            },
            failure: function () {
                //Ext.Msg.alert('Error', 'Information not saved.');
                display_alert('MG51011');
            }
        });
    },
    saveStepFour: function (me, type) {
        me.BWStep1Controller = false;
        me.BWStep2Controller = false;
        me.BWStep3Controller = false;
        me.BWStep4Controller = false;

        var ctrl = _currentApp.getController('bookingwizard.BookingWizardStep4');
        var localObj = ctrl.stepFourObject;
        var bookingId = (localObj.BookingId && localObj.BookingId > 0) ? localObj.BookingId : 0;
        var ReservationId = (localObj.ReservationId && localObj.ReservationId > 0) ? localObj.ReservationId : 0;
        //        if (!Utils.isValid(bookingId)) {
        //            bookingId = 0;
        //        }
        var urlItem = webAPI_path + 'api/booking/CalculateInvoiceDiscountAndVatForBookingItem';

        //@Pratk Commented as not worked on multibooking
        //        if (me.doNextStep4 == true && type == 1) {
        //            me.loadStepFiveFiles(me);
        //            return;
        //        }
        //        else 
        if (type == 0) {
            /*@Pratik on save wiard close*/
            if (Ext.getCmp('bookingWiz-win'))
                Ext.getCmp('bookingWiz-win').close();
            return;
        }

        var obj = new Object;
        obj.id = bookingId;
        obj.id1 = localObj.BookingTrackingId;
        obj.id2 = null;
        obj.id3 = CurrentSessionUserId;
        obj.languageId = user_language;

        /* $.get(urlItem, { id: bookingId, id1: localObj.BookingTrackingId, id2: null, id3: CurrentSessionUserId, languageId: user_language },*/
        $.get(urlItem, { param: Ext.encode(obj) },
               function (response) {

                   var ResultText = response.result;
                   if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                       ResultText = ResultText.l("SP_DynamicCode");
                   //console.log('step 4 inner');
                   if (response.success) {
                       if (type == 0) {
                           var win = Ext.WindowManager.getActive();
                           if (win) {
                               win.close();
                           }
                       }
                       else {
                           Utils.StepFourObj = response.data;
                           Utils.UpdateBookingNavigationList(ReservationId); //call for Update Rightpanle navigation
                           Utils.LoadBookingInformationForRightPane(Utils.RightPanObj.BookingId, Utils.RightPanObj.BookingTrackingId, user_language);

                           me.doNextStep4 = true;
                           me.loadStepFiveFiles(me);
                       }
                   } else {
                       //console.log('step 4 inner else');
                       Ext.Msg.alert('Error'.l('g'), ResultText);
                   }
               }
               );
        //console.log('step 4 after');
    },

    saveStepFive: function (me, type, directSave) {
        me.BWStep1Controller = false;
        me.BWStep2Controller = false;
        me.BWStep3Controller = false;
        me.BWStep4Controller = false;
        me.BWStep5Controller = false;

        var ctrl = _currentApp.getController('bookingwizard.BookingWizardStep5');
        var localObj = ctrl.stepFiveObject;

        if (!localObj.BookingTrackingId > 0) {
            localObj.BookingTrackingId = CurrentBookingTrackingId;
        }
        // localObj.BookingTrackingId = CurrentBookingTrackingId;
        if (ctrl.thisController == false) {
            ctrl.init();
            ctrl.thisController = true;
        }

        var urlItem = webAPI_path + 'api/booking/SaveBookingStep5';

        var form = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="bookingdetailsform"]')[0];
        form.getForm().findField('ReservationId').setValue(localObj.ReservationId);
        form.getForm().findField('BookingTrackingId').setValue(localObj.BookingTrackingId);
        form.getForm().findField('BookingId').setValue(localObj.BookingId);
        form.getForm().findField('CompanyId').setValue(localObj.CompanyId);
        form.getForm().findField('IndividualId').setValue(localObj.IndividualId);

        form.getForm().findField('BookingNumber').setValue(localObj.BookingNumber);
        form.getForm().findField('StartDate').setValue(localObj.StartDate);
        //  ContactOnLocationId
        form.getForm().findField('StatusId').setValue(localObj.StatusId);
        form.getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
        var downpayment = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="fieldAdvencePaymentLabel"]')[0].getValue();
        form.getForm().findField('downpayment').setValue(parseFloat(downpayment.replace(/[\.,]/g, function (m) { return m == '.' ? ',' : '.' }).replace(",", "")));
        var paymentMethod = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="paymentMethodGroup"]')[0].getValue().PaymentMethod;
        var ContOnLocationType = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="ContactOnLocationType"]')[0].getValue();
        var ContOnLocationId = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="ContactOnLocationId"]')[0].getValue();
        if (ContOnLocationType == 3 && (ContOnLocationId == '' || ContOnLocationId == null || ContOnLocationId == undefined || ContOnLocationId <= 0)) {
            Ext.Msg.alert('Error'.l('g'), 'Please select the contact on location person name');
            return;
        }
        var ExternalRemarkObj = form.getForm().findField('ExternalRemark');
        var InternalRemarkObj = form.getForm().findField('InternalRemark');


        var ExternalRemarkReplaced = ExternalRemarkObj.getValue().replace(/\n/g, "<br/>");
        var InternalRemarkReplaced = InternalRemarkObj.getValue().replace(/\n/g, "<br/>");

        ExternalRemarkObj.setValue(ExternalRemarkReplaced);
        InternalRemarkObj.setValue(InternalRemarkReplaced);

        var POG_ccc = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="ccc"]')[0].getValue();
        var IB3 = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="informationBoardIdRadio"]')[0].getValue();
        if (IB3) {
            var IBoard = form.getForm().findField('InformationBoard').getValue();
            if (IBoard.trim() == "") {
                Ext.Msg.alert('Error'.l('g'), 'Please insert information board detail'.l('SC55000'));
                return;
            }
        }
        if (POG_ccc) {
            var PONumber = form.getForm().findField('PurchaseOrderNumber').getValue();
            if (PONumber.trim() == "") {
                Ext.Msg.alert('Error'.l('g'), 'Please insert purchase order number'.l('SC55000'));
                return;
            }
        }
        //Open Advance payment window when required
        Ext.Ajax.request({
            url: webAPI_path + 'api/booking/ValidateBookingAdvancePayment',
            method: 'GET',
            params: { bookingId: localObj.BookingId, bookingTrackingId: localObj.BookingTrackingId, languageId: user_language, payMethod: paymentMethod },
            success: function (response) {
                var r = Ext.decode(response.responseText);

                if (r != null && r.data.length > 0 && r.data[0].IsValidAmount) {
                    //Checkbox alert
                    var checkOk = Ext.ComponentQuery.query('bookingwizardstep5 checkbox[itemid="statusOkCheck"]')[0];
                    if (Utils.isValid(checkOk) && (localObj.StatusId != 1 && localObj.StatusId != 2) && directSave != true) {
                        if (!checkOk.getValue()) {
                            Ext.Msg.alert('Error'.l('g'), 'Please agree status'.l('SC55000'));
                            return;
                        }
                    }

                    //Form submission
                    if (form.getForm().isValid()) {
                        form.getForm().submit({
                            url: urlItem,
                            method: 'POST',
                            success: function (form, response) {
                                if (directSave == true) return true;
                                var r = response.response.responseText;
                                var r = Ext.decode(r);
                                /*Commented as response text not came from API*/
                                if (r.success == true) {
                                    this.doNextStep5 = true;
                                    var bid = r.data.NextBookingId;
                                    var btid = r.data.NextBookingTrackingId;
                                    var ns = r.data.NextStep;
                                    CurrentBookingTrackingId = (r.newBookingTrackingId > 0) ? r.newBookingTrackingId : 0;
                                    /*new booking tracking id will generate if booking is confirm and change anything on it*/
                                    if (r.newBookingTrackingId > 0) {
                                        Utils.RightPanObj.BookingTrackingId = r.newBookingTrackingId;
                                        Utils.StepFiveObj.BookingTrackingId = r.newBookingTrackingId;
                                    }

                                    CurrentBookingId = r.bookingId;

                                    if (type == 1) {
                                        if (Utils.isValid(ns) && Utils.isValid(btid)) {
                                            if (ns > 0 && btid > 0) {
                                                //console.log("load from outside");
                                                var stepObject = { Number: ns, BookingTrackingId: btid };
                                                /*
                                                @Commented by Pratik
                                                Desc: its sends error on multiple booking....
                                                */
                                                // Utils.loadWizardStepsFromOutSide(me, stepObject, "step" + ns);  

                                                Utils.ActiveStepFromRightPanel(me, stepObject, "step" + ns);
                                            }
                                            else {
                                                //console.log("load step six 1");
                                                //log("r.data", r.data);
                                                Utils.StepFiveObj = r.data;
                                                Utils.UpdateBookingNavigationList(localObj.ReservationId); //call for Update Rightpanle navigation
                                                Utils.LoadBookingInformationForRightPane(Utils.RightPanObj.BookingId, Utils.RightPanObj.BookingTrackingId, user_language);
                                                me.loadStepSixFiles(me);
                                            }
                                        } else {
                                            //console.log("load step six 2");
                                            //log("r.data", r.data);
                                            Utils.StepFiveObj = r.data;
                                            Utils.StepFiveObj.BookingTrackingId = CurrentBookingTrackingId;
                                            Utils.StepFiveObj.BookingId = CurrentBookingId;
                                            me.loadStepSixFiles(me);
                                        }
                                    }
                                    else {
                                        //log("step 1 saved", r.data);
                                        var bookingId = 0;
                                        if (Utils.isValid(localObj.BookingId)) {
                                            bookingId = localObj.BookingId;
                                        }
                                        //Utils.LoadBookingInformationForRightPane(bookingId, localObj.BookingTrackingId, user_language);
                                        /*@Pratik on save wiard close*/
                                        if (Ext.getCmp('bookingWiz-win'))
                                            Ext.getCmp('bookingWiz-win').close();
                                    }
                                }
                                else {

                                }
                            },
                            failure: function (form, response) {
                            }
                        })
                    }
                }
                else {
                    var cw = Ext.create('widget.advancedpayment');
                    cw.show();
                    cw.center();
                    return;
                }
            }
        });
    },

    saveStepSix: function (me, type) {

        ///API call for Save data for Step6
        var frmResDetailsStep6 = Ext.ComponentQuery.query('bookingwizardstep6 form[itemid="frmResDetailsStep6"]')[0];
        if (frmResDetailsStep6 != null && frmResDetailsStep6.getForm().isValid()) {
            if (type == 0) { //Save
                me.BWStep1Controller = false;
                me.BWStep2Controller = false;
                me.BWStep3Controller = false;
                me.BWStep4Controller = false;
                me.BWStep5Controller = false;
                me.BWStep6Controller = false;
                //log('frmResDetailsStep6', frmResDetailsStep6.getForm());
                if (me.doNextStep6 == true) {
                    return true;
                }
                if (Ext.getCmp('bookingWiz-win'))
                    Ext.getCmp('bookingWiz-win').close();

                var controllerString = 'bookingwizard.BookingWizardStep6';
                var ctrl = this.getController(controllerString);

                var isPrimaryEmail = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="cbMainEmailItemId"]')[0].getValue(); //cbMainEmailItemId //cbSecondaryEmailItemId
                if (!isPrimaryEmail) {
                    var email = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="step6Email"]')[0];
                    email.setValue(Ext.ComponentQuery.query('bookingwizardstep6 [itemid="secondaryEmailText"]')[0].value);

                    var isSecondaryEmail = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="step6IsSecondaryEmail"]')[0];
                    isSecondaryEmail.setValue(true);

                    var indivId = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="step6IndivId"]')[0];
                    indivId.setValue(ctrl.stepSixObject.IndividualId);
                }

                frmResDetailsStep6 = Ext.ComponentQuery.query('bookingwizardstep6 form[itemid="frmResDetailsStep6"]')[0];

                frmResDetailsStep6.getForm().submit({
                    url: webAPI_path + 'api/booking/SaveBookingStep6',
                    type: 'POST',
                    success: function (form, response) {
                        var r = response.result;
                        //log('callback success', r);

                        /*@Pratik on save wiard close*/
                        if (Ext.getCmp('bookingWiz-win'))
                            Ext.getCmp('bookingWiz-win').close();
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            me.doNextStep6 = true;
                            Utils.UpdateBookingNavigationList(Utils.RightPanObj.ReservationId); //call for Update Rightpanle navigation
                            Utils.LoadBookingInformationForRightPane(Utils.RightPanObj.BookingId, Utils.RightPanObj.BookingTrackingId, user_language);
                            if (type == 1) {
                                // Ext.Msg.alert('Success', "Reservation is successfully created.");
                                display_alert('MG51020');
                            }
                            else {
                                ///NEED TO DISCUSS WITH ROMANIAN TEAM - MM
                            }
                        } else {
                            Ext.Msg.alert('Error'.l('g'), ResultText)
                        }
                    },
                    failure: function (form, response) {
                        var r = response.result;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == false) {
                            Ext.Msg.alert('Error'.l('g'), ResultText)
                        } else {
                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'))
                        }
                    }
                });
            }
            else { //Send confirmation
                var items = $('[id^="rowBooking_"]');
                var forServerarray = new Array();
                var arrBookingDate = new Array();

                items.each(function (i) {
                    var el = $(items[i]);
                    if (el.is(':checked')) {
                        var obj = {};
                        obj.BookingTrackingId = el.attr('data-bt');
                        obj.BookingId = el.attr('data-b');
                        obj.BookingName = el.attr('data-bname');
                        obj.BookingDate = el.attr('data-bdate');
                        forServerarray.push(obj);

                    }
                    arrBookingDate.push(el.attr('data-bdate'));
                });
                var formValues = frmResDetailsStep6.getForm().getValues();
                var isConfirmationRequire = 1; //1 means confirmation required

                if (forServerarray.length == 0) {
                    isConfirmationRequire = 0; //0 means confirmation not required

                }
                var responsibleUser = Ext.ComponentQuery.query('[itemid="ResponsibleUserId"]')[0].getValue();
                if (responsibleUser == '') {
                    // Ext.Msg.alert('Error'.l('g'), 'Set Responsible User');
                    display_alert('MG56000');
                    return;
                }
                for (var i = 0; i < arrBookingDate.length; i++) {
                    var el = arrBookingDate[i];
                    var d = new Date(el);
                    //log('d', d);
                    var decisionDate = new Date(Ext.ComponentQuery.query('[itemid="itemDecDate"]')[0].getValue());

                    if (decisionDate.getFullYear() < 1980) {
                        // Ext.Msg.alert('Error'.l('g'), 'Invalid decision date');
                        display_alert('MG56001');
                        return;
                    }
                    if (decisionDate >= d) {
                        //Ext.Msg.alert('Error'.l('g'), 'Decision date must be less than booking date');
                        display_alert('MG56002');
                        return;
                    }
                }

                //1 means confirmation required
                //0 means confirmation not required
                if (isConfirmationRequire == 1) {
                    Ext.Msg.confirm('Warning'.l('g'), 'Are you sure you want to confirm the booking'.l('SC56000'),
                    function (btn) {
                        if (btn === 'yes') {
                            me.finalCallSaveStepSix(formValues, forServerarray, isConfirmationRequire);
                        }
                        else if (btn === 'no') {
                            me.finalCallSaveStepSix(formValues, forServerarray, 0);
                        }
                    })
                }
                else {
                    me.finalCallSaveStepSix(formValues, forServerarray, isConfirmationRequire);
                }
            }
        }
    },

    stepTwoCall: function (stepOneObj, me, type) {
        var localThis = me;
        var dataObj = stepOneObj;
        //log('Step-1 OBJ', dataObj);
        //  var formEdit = Ext.getCmp('propertyEditItemsForm').getForm();
        var panel = Ext.ComponentQuery.query('bookingwizardstep2 form[itemid="itemBigPanelStep2"]')[0];

        var formEdit = panel.getForm();

        if (!formEdit.isValid()) {
            alert("Invalid form");
            return;
        }

        var bookingTrackingId = formEdit.findField('bookingTrackingId').getValue();
        // formEdit.findField('bookingTrackingId').setValue(Utils.StepOneObj.BookingTrackingId);    

        //var reservationId = Ext.getCmp('bookingInformation').getForm().findField('ReservationId').getValue();

        var urlItem = "";
        if (bookingTrackingId == 0) {
            urlItem = webAPI_path + 'api/booking/ManageBookingWizardStep2';
            console.log("ALERT !!! Booking tracking not created");
            //urlItem = webAPI_path + 'api/booking/AddBookingWizard';
            //console.log('add new booking wizard + reservation');
            //Ext.getCmp('contactInformation').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
            //Ext.getCmp('contactInformation').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
            // console.log(Ext.getCmp('contactInformation').getForm().findField('CreatedDate').getValue());
        }
        else {
            urlItem = webAPI_path + 'api/booking/ManageBookingWizardStep2';
            console.log('Update booking trackingId: ' + bookingTrackingId);
            //Ext.getCmp('contactInformation').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
            //Ext.getCmp('contactInformation').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
        }

        var datepicker = Ext.ComponentQuery.query('bookingwizardstep2 [itemid="datepickerfield"]')[0];

        //        var sd = formEdit.findField('StartDate').setValue(datepicker.getValue());
        //        var ed = formEdit.findField('EndDate').setValue(datepicker.getValue());

        var sd = formEdit.findField('StartDate').getValue();
        var ed = formEdit.findField('EndDate').getValue();

        //  var formEdit = Ext.getCmp('propertyEditItemsForm').getForm();
        var roomId = formEdit.findField('selectedRoomId').getValue();
        var turnTimeValue = formEdit.findField("setupTimeField").getValue();
        if (turnTimeValue == null)
            turnTimeValue = 0;

        var locationNameIsProperty = formEdit.findField('propertyId').getValue();

        //log('dataObj ->', dataObj);
        var s2Obj = {};
        var startInit = dataObj.StartDate;
        var endInit = dataObj.EndDate;
        var PropertyFeatureId = dataObj.PropertyFeatureId;
        var formHolder = Utils.getFirstComp(Ext.ComponentQuery.query('panel [itemid="planboardPanel"]'));
        if (formHolder == null) {
            //Show meesage here , error handeling
        }
        var form = formHolder.getForm();


        s2Obj.BookingId = dataObj.BookingId;
        s2Obj.PropertyFeatureId = PropertyFeatureId;
        s2Obj.BookingTrackingId = bookingTrackingId;
        s2Obj.RoomSetupId = formEdit.getValues().RoomSetupId;
        s2Obj.NumberOfPeople = formEdit.getValues().NumberOfPeople;
        s2Obj.ReservationId = dataObj.ReservationId;

        if (locationNameIsProperty > 0) {
            s2Obj.PropertyId = locationNameIsProperty;
        }
        else {
            s2Obj.PropertyId = null;
        }

        //s2Obj.StartDate = Ext.Date.format(new Date(sd), 'Y-m-d H:i:s');
        //s2Obj.EndDate = Ext.Date.format(new Date(ed), 'Y-m-d H:i:s');
        //s2Obj.StartTime = Ext.Date.format(startInit, 'H:i');
        //s2Obj.EndTime = Ext.Date.format(endInit, 'H:i');

        s2Obj.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d');
        s2Obj.BookingEventTrackingId = 0;
        s2Obj.BookingEventDate = Ext.Date.format(datepicker.getValue(), 'Y-m-d');
        try {
            s2Obj.BookingEventStartTime = Ext.Date.format(new Date(sd), 'H:i');
        } catch (e) {
            //log("e", e);
        }

        s2Obj.BookingEventEndTime = Ext.Date.format(new Date(ed), 'H:i');
        s2Obj.UpdatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
        s2Obj.UpdatedBy = CurrentSessionUserId;
        s2Obj.RoomId = roomId;
        s2Obj.TurnTimeBuffer = turnTimeValue;
        s2Obj.LanguageID = user_language;
        s2Obj.StatusId = dataObj.StatusId;
        s2Obj.BookingEventId = formEdit.findField('bookingEventId').getValue(); // 0; //BookingEventID
        s2Obj.BookingEventTrackingId = formEdit.findField('bookingEventTrackingId').getValue(); // 0; //BookingEventTrackingID
        //BTobj.NumberOfPeople = from.getForm().findField('NumberOfPeople').getValue();
        //BTobj.PropertyFeatureId = from.getForm().findField('PropertyFeatureId').getValue();
        //log('formEdit.getValues()', formEdit.getValues());
        Utils.UpdateBookingNavigationList(dataObj.ReservationId);
        Utils.LoadBookingInformationForRightPane(Utils.RightPanObj.BookingId, Utils.RightPanObj.BookingTrackingId, user_language);
        try {
            var grid = Ext.ComponentQuery.query('[itemid="itemMultipleDatesGrid"]')[0];
            var gridStore = grid.getStore();
            var elements = gridStore.getRange();
            var found = false;
            var isDaySelected = false;
            var isRoomSelected = false;


            //            if (elements.length > 1) {

            //                /*Set current booking status*/
            //                for (var i = 0; i < elements.length; i++) {
            //                    var multiDate = elements[i].data.Date;
            //                    if (s2Obj.BookingEventDate == multiDate) {
            //                        elements[i].data.Status = 1;
            //                        break;
            //                    }
            //                }
            //            }    



            //checked for Day is selected from LeftPanel
            for (var i = 0; i < elements.length; i++) {
                var lastClickedEvent = elements[i].data.lastClickedEvent;
                if (lastClickedEvent == true || elements.length == 1 || elements[i].data.IsRoomSelected == true) {
                    isDaySelected = true;
                }
            }

            if (isDaySelected == false) {
                Ext.Msg.alert('Error', 'Please select one of the day from left panel'.l('g'));

                Utils.AllowCreate = true;
                Utils.EventCreated = false;
                var ctrl = _currentApp.getController('bookingwizard.BookingWizardStep2');
                ctrl.applyFilters();

                return;
            }

            /*By PV: commented because same day can have multiple event in current scenario... from copy booking*/
            ///avoid second time event creation
            //            for (var i = 0; i < elements.length; i++) {
            //                var multiDate = Ext.Date.format(new Date(stepOneObj.StartDate), 'Y-m-d');
            //                if (s2Obj.BookingEventDate == multiDate && elements[i].data.IsRoomSelected == true && (elements[i].data.BookingEventID > 0 || elements[i].data.BookingEventTrackingID > 0) && type == 2) {
            //                    Ext.Msg.alert('Error', 'Event already created for this day');

            //                    Utils.AllowCreate = true;
            //                    Utils.EventCreated = false;
            //                    var ctrl = _currentApp.getController('bookingwizard.BookingWizardStep2');
            //                    ctrl.applyFilters();

            //                    return;
            //                }
            //            }


            for (var i = 0; i < elements.length; i++) {
                var lastClickedEvent = elements[i].data.lastClickedEvent;
                if (lastClickedEvent == true || elements.length == 1) {
                    if (elements[i].data.BookingEventID > 0)
                        s2Obj.BookingEventId = elements[i].data.BookingEventID;
                    if (elements[i].data.BookingEventTrackingID > 0)
                        s2Obj.BookingEventTrackingId = elements[i].data.BookingEventTrackingID;
                    break;
                }
            }

        } catch (e) {
        }

        var obj = {};
        obj.sd = sd;
        obj.startInit = startInit;
        obj.endInit = endInit;
        obj.type = type;

        var id = (s2Obj.BookingTrackingId > 0) ? s2Obj.BookingTrackingId : 0;
        var id1 = (s2Obj.BookingId > 0) ? s2Obj.BookingId : 0;
        var id3 = Ext.Date.format(datepicker.getValue(), 'Y-m-d');

        if (type == 1) {
            // Called from next so date should not be passed for correct events created validation
            // #955
            id3 = null;
        }

        Ext.data.JsonP.request({
            url: webAPI_path + 'api/Booking/CheckEventsForBooking',
            type: "GET",
            params: { id: id, id1: id1, id2: CurrentSessionUserId, id3: id3 },
            success: function (r) {

                if (r.success == true) {
                    if (type == 2) {
                        var ctrl = _currentApp.getController('bookingwizard.BookingWizardStep2');
                        Ext.Msg.alert('Error', 'Event already created'.l('g'));
                        ctrl.searchPlanboard();
                        return false;
                    }
                    else
                        localThis.loadStepThreeFiles(me);
                }
                else {
                    if (type == 2) { //0 = save, 1 = next, 2 = dragcreate  

                        var ctrl = _currentApp.getController('bookingwizard.BookingWizardStep2');
                        //log('IsQueueBased', ctrl.IsQueueBased);
                        s2Obj.IsQueueBasedBooking = ctrl.IsQueueBased;
                        s2Obj.IsConfirm = false;
                        localThis.Step2SaveAPICall(s2Obj, obj, localThis);
                    }
                    else if (type == 1) {
                        Ext.Msg.alert('Error', 'Please create events for all days'.l('g'));
                    }
                }
            }
        });

        var localThis = this;

    },

    stepThreeCall: function (bpObj, type, me, msgType) {

        if (msgType == "MinRevChk") {
            bpObj.IsSkipMininumRevenueCheck = true;
            bpObj.IsRemovedExistingData = false;
        } else
            if (msgType == "RmvEvent") {
                bpObj.IsRemovedExistingData = true;
                bpObj.IsSkipMininumRevenueCheck = false;
            }

        //bpObj.BookingId = localObject.BookingId;
        var urlItem = webAPI_path + 'api/booking/ManageBookingWizardStepThree';
        $.ajax({
            url: urlItem,
            type: 'POST',
            //data: bpObj,
            data: {
                Fixedpriceid: bpObj.Fixedpriceid,
                Userid: bpObj.Userid,
                LanguageID: bpObj.LanguageID,
                TypeId: bpObj.TypeId,
                IsRemovedExistingData: bpObj.IsRemovedExistingData,
                IsSkipMininumRevenueCheck: bpObj.IsSkipMininumRevenueCheck,
                RoomRent: bpObj.RoomRent,
                minimumTurnover: bpObj.minimumTurnover,
                Bar: bpObj.Bar,
                TotalPrice: bpObj.TotalPrice,
                SecondaryBar: bpObj.SecondaryBar,
                BookingtrackingId: bpObj.BookingTrackingId,
                BookingId: bpObj.BookingId
            },
            success: function (response) {
                var MSGResult = response.result
                var PackageGROSSPRice = 0;
                var Revenue = 0;
                if (typeof (response.Revenue) != "undefined") {
                    Revenue = response.Revenue;
                }
                Revenue = "€ " + Ext.util.Format.number(Revenue, '0,000.00');
                if (typeof (response.PackageGROSSPRice) != "undefined") {
                    PackageGROSSPRice = response.PackageGROSSPRice;
                }
                PackageGROSSPRice = "€ " + Ext.util.Format.number(PackageGROSSPRice, '0,000.00');
                if (MSGResult.substring(0, 4) == "SPC_") {
                    MSGResult = MSGResult.l("SP_DynamicCode", PackageGROSSPRice, Revenue);
                }
                if (response.success != true && response.MsgType == "Error") {
                    Ext.Msg.alert('Error', MSGResult);
                    return;
                }
                if (response.confirm == true) {
                    Ext.Msg.confirm('Success'.l('g'), MSGResult,
                     function (btn) {
                         if (btn === 'yes') {
                             me.stepThreeCall(bpObj, type, me, response.MsgType);
                         } else {
                             //DO NOTHING. STAY ON SAME PAGE
                             /*@Pratik on save wiard close*/
                             if (Ext.getCmp('bookingWiz-win'))
                                 Ext.getCmp('bookingWiz-win').close();
                         }
                     });
                }
                else {
                    if (type == 0) {//SAVE
                        bpObj.BookingTrackingId = bpObj.bookingTrackingId;
                        Utils.StepThreeObj = response.data;
                        var win = Ext.WindowManager.getActive();
                        if (win) {
                            win.close();
                        }
                    }
                    else {//NEXT
                        Utils.StepThreeObj = response.data;
                        //log("Utils.StepThreeObj", Utils.StepThreeObj);
                        me.BWStep1Controller = false;
                        me.BWStep2Controller = false;
                        me.BWStep3Controller = false;
                        me.loadStepFourFiles(me);
                    }
                }
            },
            failure: function () {
                //Ext.Msg.alert('Error', 'Information not saved.');
                display_alert('MG51011');
            }
        });
    },

    savePlanboardEventDirect: function (data) {

        var localThis = this;
        var s2Obj = {};
        //log('data.StartDate', data.StartDate);
        var StartDate = new Date(data.StartDate);
        //log('StartDate', StartDate);
        var BookingEventDate = Ext.Date.format(StartDate, 'Y-m-d');
        //log('BookingEventDate', BookingEventDate);
        var sd = data.StartDate;
        var ed = data.EndDate;
        var roomId = Utils.BookingObject.ResourceId;
        s2Obj.BookingEventId = 0;
        s2Obj.PropertyFeatureId = data.PropertyFeatureId;
        s2Obj.BookingTrackingId = data.BookingTrackingId;
        s2Obj.RoomSetupId = data.RoomSetupId;
        s2Obj.NumberOfPeople = data.NumberOfPeople;
        s2Obj.ReservationId = data.ReservationId;
        s2Obj.PropertyId = data.PropertyId;
        s2Obj.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d');
        s2Obj.BookingEventTrackingId = data.BookingTrackingId;
        s2Obj.BookingEventDate = BookingEventDate;
        s2Obj.BookingEventStartTime = data.StartTime;
        s2Obj.BookingEventEndTime = data.EndTime;
        s2Obj.UpdatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
        s2Obj.UpdatedBy = CurrentSessionUserId;
        s2Obj.RoomId = roomId;
        s2Obj.TurnTimeBuffer = Utils.BookingObject.TurnTimeBuffer;
        s2Obj.LanguageID = user_language;
        s2Obj.StatusId = data.StatusId;
        s2Obj.StartDate = data.StartDate;
        s2Obj.EndDate = data.EndDate;
        //Adde mihai from planboard

        s2Obj.IsQueueBasedBooking = Utils.BookingObject.IsQueueBased;

        urlItem = webAPI_path + 'api/booking/ManageBookingWizardStep2';
        $.ajax({
            url: urlItem,
            type: 'POST',
            data: s2Obj,
            success: function (response) {

                localThis.BWStep1Controller = false;
                localThis.BWStep2Controller = false;

                Utils.StepTwoObj = s2Obj;


                if (response.success == true) {
                    Utils.StepThreeObj = Utils.StepTwoObj;
                    /*Skip step2 as not needed now*/
                    var panelSteps = Ext.ComponentQuery.query('bookingwizardpanel')[0];
                    var layout = panelSteps.getLayout();
                    layout['next']();
                    /*End of skip step2*/

                    localThis.loadStepThreeFiles(localThis);
                }
                else {

                    Utils.StepOneObj = s2Obj;
                    var ResultText = response.result;
                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                        ResultText = ResultText.l("SP_DynamicCode");
                    Ext.Msg.alert('Error', ResultText);
                    Utils.AllowCreate = true;
                    localThis.loadStepTwoFiles(localThis);
                }

            },
            failure: function () {
                //Ext.Msg.alert('Error', 'Information not saved.');
                display_alert('MG51011');
            }
        });
    },
    Step2SaveAPICall: function (s2Obj, obj, me) {
        var localThis = this;
        //var me = this;
        var urlItem = webAPI_path + 'api/booking/ManageBookingWizardStep2';
        $.ajax({
            url: urlItem,
            type: 'POST',
            data: s2Obj,
            success: function (response) {
                if (response.confirm == true) {
                    Ext.MessageBox.alert('Contract Expiration'.l('SC52000'), 'Booking range is out of contract due to change in date'.l('SC52000'), function () {

                        s2Obj.IsConfirm = true;
                        me.Step2SaveAPICall(s2Obj, obj, me);

                    });
                }
                else {
                    /*Rightpanel update*/
                    Utils.UpdateBookingNavigationList(s2Obj.ReservationId); //call for Update Rightpanle navigation                  
                    /*End of rightpanel*/
                    var storeMultipleDates = Ext.getStore('bookingwizard.InfoLeftPanelStore');
                    storeMultipleDates.reload({
                        callback: function (records, o, success) {
                            var datepicker = Ext.ComponentQuery.query('bookingwizardstep2 datepicker[itemid="datepickerfield"]')[0];
                            if (datepicker & o.response) {
                                if (o.response.isAnyEventExists == true && o.response.IsMultipleDayBooking == true) {
                                    //datepicker.setDisabled(true)
                                    datepicker.setMaxDate(null);
                                    datepicker.setMinDate(null);
                                }
                                else {
                                    //datepicker.setMinDate(null);
                                }
                            }
                        }

                    });

                    if (obj.type == 0) {
                        //alert(response.success);
                        if (response.success == true) {

                            Utils.StepTwoObj = s2Obj;
                            Utils.StepTwoObj.IsMultiday = response.data.IsMultiday;


                            var id = 0;
                            if (Utils.isValid(obj.sd)) {
                                // var sd = new Date(response.data.DateStart);
                                id = Ext.util.Format.date(obj.sd, 'Ymd');
                            }
                            Utils.Planboard.push(id);
                            Utils.Planboard[id] = {};
                            Utils.Planboard[id].AllowCreate = false;
                            Utils.isEventCheck = true;

                        }
                        else {
                            var ResultText = response.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            Ext.Msg.alert('Error', ResultText);
                            Utils.AllowCreate = true;
                            Utils.EventCreated = false;
                            var ctrl = _currentApp.getController('bookingwizard.BookingWizardStep2');
                            ctrl.applyFilters();

                        }
                    }
                    else {

                        if (response.success == true) {

                            me.BWStep1Controller = false;
                            me.BWStep2Controller = false;

                            Utils.StepTwoObj = s2Obj;

                            //  me.loadStepThreeFiles(me);

                        }
                        else {
                            var ResultText = response.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            Ext.Msg.alert('Error', ResultText);
                            Utils.AllowCreate = true;
                            var ctrl = _currentApp.getController('bookingwizard.BookingWizardStep2');
                            ctrl.applyFilters();
                        }
                    }
                    //log("Utils.StepTwoObj", Utils.StepTwoObj);
                    var ctrl = _currentApp.getController('bookingwizard.BookingWizardStep2');

                    ctrl.searchPlanboard();

                }
            },
            failure: function () {
                // Ext.Msg.alert('Error', 'Information not saved.');
                display_alert('MG51011');
            }
        });
    },
    NoConfirmationButton: function (stepNo) {
        this.currrentStepNo = stepNo;
        var reservationId = Utils.RightPanObj.ReservationId;
        reservationId = reservationId == null || reservationId == undefined ? 0 : reservationId;
        var bookingId = (Utils.RightPanObj.BookingId > 0) ? Utils.RightPanObj.BookingId : 0;
        var bookingTrackingId = (Utils.RightPanObj.BookingTrackingId > 0) ? Utils.RightPanObj.BookingTrackingId : 0;
        var comp = Ext.ComponentQuery.query('bookingwizardpanel button[action="noConfirmation"]')[0];
        comp.disable();
        //if (reservationId != undefined && reservationId != null) {
        if (reservationId > 0 || bookingId > 0 || bookingTrackingId > 0) {
            Ext.Ajax.request({
                url: webAPI_path + 'api/booking/GetBookingStatus',
                method: 'GET',
                //params: { bookingId: 0, bookingTrackingId: 84, languageId: user_language },
                params: { reservationId: reservationId, bookingId: bookingId, bookingTrackingId: bookingTrackingId },
                success: function (response) {
                    var r = Ext.decode(response.responseText);
                    if (r != null && r.success) {
                        //var comp = Ext.ComponentQuery.query('bookingwizardpanel button[action="noConfirmation"]')[0];
                        if (comp) comp.enable();
                    }
                }
            });
        }
        //}
    },

    finalCallSaveStepSix: function (formValues, forServerarray, isConfirmationRequire) {
        var me = this;
        var confData = new Object();
        var isPrimaryEmail = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="cbMainEmailItemId"]')[0].getValue(); //cbMainEmailItemId //cbSecondaryEmailItemId
        var controllerString = 'bookingwizard.BookingWizardStep6';
        var ctrl = me.getController(controllerString);

        if (isPrimaryEmail) {
            confData.Email = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="mainEmailText"]')[0].text;
        }
        else {
            confData.Email = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="secondaryEmailText"]')[0].value;

            var email = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="step6Email"]')[0];
            email.setValue(Ext.ComponentQuery.query('bookingwizardstep6 [itemid="secondaryEmailText"]')[0].value);

            var isSecondaryEmail = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="step6IsSecondaryEmail"]')[0];
            isSecondaryEmail.setValue(true);

            var indivId = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="step6IndivId"]')[0];
            indivId.setValue(ctrl.stepSixObject.IndividualId);

            formValues.Email = email.value;
            formValues.IsSecondaryEmail = true;
            formValues.IndividualId = indivId.value;
        }

        if (confData.Email == null || confData.Email == undefined || confData.Email == '') {
            //Ext.Msg.alert('Error'.l('g'), 'Email address is not found. Please enter.');
            display_alert('MG56003');
            return;
        }

        confData.EmailSalutation = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="emailSalutation"]')[0].getValue();
        confData.EmailContent = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="emailContent"]')[0].getValue();
        confData.EmailSignature = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="emailSignature"]')[0].getValue();
        confData.CoverLetter = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="coverLetterContent"]')[0].getValue();
        confData.BCC = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="bccInput"]')[0].getValue();
        confData.CC = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="ccInput"]')[0].getValue();
        confData.LanguageID = user_language;
        clearUtils();

        var urlItem = webAPI_path + 'api/booking/ConfirmBookingAndSave';

        if (!formValues.ReservationId > 0) {
            //Ext.Msg.alert('Error'.l('g'), 'Reservation is not created.');
            display_alert('MG56004');
            return false;
        }

        // formValues = Ext.ComponentQuery.query('bookingwizardstep6 form[itemid="frmResDetailsStep6"]')[0];

        var URLAddresCheck = webAPI_path + 'api/booking/CheckedInvoiceAddressForCustermer';
        var URLSendPDFAndAFASProcess = webAPI_path + 'api/booking/SendPDFAndAFASProcess';
        $.get(URLAddresCheck, { id: ctrl.stepSixObject.ReservationId },
            function (response) {
                if (response.success) {
                    var FullfrmResDetailsStep6 = Ext.ComponentQuery.query('bookingwizardpanel')[0]
                    FullfrmResDetailsStep6.setDisabled(true);

                    $.get(urlItem, { obj: formValues, selectedRecords: forServerarray, userId: CurrentSessionUserId, sendData: confData },
                            function (response) {
                                if (response.success) {
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        win.close();
                                    }

                                    if (response.BTIds.length > 0 && isConfirmationRequire == 1) {
                                        confData.TotalBookings = response.TotalBookings;
                                        confData.SelectedBookings = response.SelectedBookings;
                                        confData.CreatedBy = formValues.CreatedBy;
                                        $.get(URLSendPDFAndAFASProcess,
                                        { ReservationId: ctrl.stepSixObject.ReservationId, CreatedBy: CurrentSessionUserId, bookingIds: response.BTIds, sendData: confData },
                                    function (response) {
                                    });
                                    }
                                } else {
                                    FullfrmResDetailsStep6.setDisabled(false);
                                    Ext.Msg.alert('Error'.l('g'), response.Message);
                                }
                            });
                } else {
                    //Ext.Msg.alert('Add invocie address');
                    Ext.create('widget.completeprofiles').show();
                }
            });
    }
});
