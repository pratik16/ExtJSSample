Ext.define('Regardz.controller.bookingwizard.BookingWizardStep3', {
    extend: 'Ext.app.Controller',
    views: ['bookingwizard.BookingWizardStep3', 'bookingwizard.BookingWizardStep3Checkbox'],
    stores: ['bookingwizard.PackageListStore', 'bookingwizard.ReservationDetails', 'common.MeetingTypeNewStore', 'common.PackageDurationStore'],
    stepThreeObject: {},
    thisController: false,
    //Needed data in object
    //ReservationId
    //cellclick ==>fixedPriceId,selectedBar
    //load ==>GrossPrice(true / false ),DateStart,DateEnd or Duration ( if possible - else I'll calculate on Ext.JS side from datestart and date end),MeetingType
    //loadStoe ==> BookingTrackingId
    externalBookingTrackingId: null,
    externalBookingId: null,
    init: function () {
        var me = this;

        // this.loadStepThreeObject(me);
        //log(' step 2 obj from utils', Utils.StepTwoObj);
        try {
            //            Ext.getCmp('move-prev').show();
            //            Ext.getCmp('move-next').setText("Next");
            //            Ext.getCmp('move-prev').getEl().show();
            //            Ext.getCmp('move-prev').setDisabled(false);
            //            Ext.getCmp('move-next').setDisabled(true);
            //            //Ext.getCmp('move-next').setDisabled(false); //test
        } catch (e) {

        }
        this.control({

            'panel [itemid="stepthree"]': {
                activate: function (t, e) {
                    //    me.checkIfObjectValid(me);
                    this.loadStepThreeObject(me);
                    me.externalBookingTrackingId = null;
                    me.externalBookingId = null;
                    //                    Ext.getCmp('move-next').setText("Next");
                    //                    Ext.getCmp('move-next').setDisabled(true);
                },
                afterrender: function () {
                    //                    Ext.getCmp('move-next').setDisabled(true);
                    //                    Ext.getCmp('move-next').setText("Next");
                    this.loadStepThreeObject(me);
                    me.externalBookingTrackingId = null;
                    me.externalBookingId = null;
                }

            },

            'combo[action="comboDuration"]': {
                select: function (combo, records, Opts) {

                    var duration = combo.getValue();

                    var property_Feature = Ext.getCmp('PropertyFeatureID').getValue();

                    if (property_Feature == null || property_Feature == undefined) {
                        property_Feature = 0;
                    }

                    var price_flag = Ext.getCmp('PriceID').getValue();
                    var package_advice_flag = Ext.getCmp('AdvicedPackagesID').getValue();

                    //load store with latest filter values
                    var searchParam = "DURATION:" + duration + ";MEETING_TYPE:" + property_Feature + ";PACKAGE_ADVICE_FLAG:" + package_advice_flag.package + ";PRICE_FLAG:" + price_flag.price;
                    this.loadStore(searchParam, me);
                }
            },
            'combo[action="comboPropertyFeature"]': {
                select: function (combo, records, Opts) {

                    var property_Feature = combo.getValue();

                    var duration = Ext.getCmp('DuarationID').getValue();

                    if (duration == null || duration == undefined) {
                        duration = 0;
                    }

                    var price_flag = Ext.getCmp('PriceID').getValue();
                    var package_advice_flag = Ext.getCmp('AdvicedPackagesID').getValue();

                    //load store with latest filter values
                    var searchParam = "DURATION:" + duration + ";MEETING_TYPE:" + property_Feature + ";PACKAGE_ADVICE_FLAG:" + package_advice_flag.package + ";PRICE_FLAG:" + price_flag.price;
                    this.loadStore(searchParam, me);
                }
            },
            'radiogroup[action="AllAdvicedPackage"]': {
                change: function (radio, newValue, oldValue, Opts) {
                    var duration = Ext.getCmp('DuarationID').getValue();
                    var property_Feature = Ext.getCmp('PropertyFeatureID').getValue();

                    if (duration == null || duration == undefined) {
                        duration = 0;
                        if (Utils.isValid(me.stepThreeObject.Duration)) {
                            duration = me.stepThreeObject.Duration;
                        }
                    }
                    if (property_Feature == null || property_Feature == undefined) {
                        property_Feature = 0;
                        if (Utils.isValid(me.stepThreeObject.MeetingTypeId)) {
                            property_Feature = me.stepThreeObject.MeetingTypeId;
                        }
                    }

                    var price_flag = Ext.getCmp('PriceID').getValue();
                    if (newValue.package == 1) {

                        if (Utils.isValid(me.stepThreeObject.MeetingTypeId)) {
                            if (Ext.getCmp('PropertyFeatureID'))
                                Ext.getCmp('PropertyFeatureID').setValue(me.stepThreeObject.MeetingTypeId);

                            property_Feature = me.stepThreeObject.MeetingTypeId;
                        }

                        if (me.stepThreeObject.Duration >= 0) {
                            var range = Ext.getCmp('DuarationID').getStore().getRange();
                            if (range.length > 0) {
                                Ext.getCmp('DuarationID').setValue(me.stepThreeObject.Duration);
                            }
                            else {
                                Ext.getCmp('DuarationID').getStore().load({
                                    callback: function () {
                                        Ext.getCmp('DuarationID').setValue(me.stepThreeObject.Duration);
                                    }
                                })
                            }


                            duration = me.stepThreeObject.Duration;
                        }

                        Ext.getCmp('PropertyFeatureID').disable();
                        Ext.getCmp('DuarationID').disable();
                    }
                    else {
                        Ext.getCmp('PropertyFeatureID').enable();
                        Ext.getCmp('DuarationID').enable();
                    }
                    //load store with latest filter values
                    var searchParam = "DURATION:" + duration + ";MEETING_TYPE:" + property_Feature + ";PACKAGE_ADVICE_FLAG:" + newValue.package + ";PRICE_FLAG:" + price_flag.price;
                    this.loadStore(searchParam, me);
                }
            },
            'radiogroup[action="NetGrossPrice"]': {
                change: function (radio, newValue, oldValue, Opts) {
                    var duration = Ext.getCmp('DuarationID').getValue();
                    var property_Feature = Ext.getCmp('PropertyFeatureID').getValue();

                    if (duration == null || duration == undefined) {
                        duration = 0;
                        if (Utils.isValid(me.stepThreeObject.Duration)) {
                            duration = me.stepThreeObject.Duration;
                        }
                    }

                    if (property_Feature == null || property_Feature == undefined) {
                        property_Feature = 0;
                        if (Utils.isValid(me.stepThreeObject.MeetingTypeId)) {
                            property_Feature = me.stepThreeObject.MeetingTypeId;
                        }
                    }

                    var package_advice_flag = Ext.getCmp('AdvicedPackagesID').getValue();

                    //load store with latest filter values
                    var searchParam = "DURATION:" + duration + ";MEETING_TYPE:" + property_Feature + ";PACKAGE_ADVICE_FLAG:" + package_advice_flag.package + ";PRICE_FLAG:" + newValue.price;
                    this.loadStore(searchParam, me);
                }
            },

            'bookingwizardstep3': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var zRec = iView.getRecord(iRowEl);
                    me.stepThreeObject.fixedPriceId = zRec.data.FixedPriceId;
                    me.stepThreeObject.selectedBar = zRec.data.Selected;
                    //this.setNextButtonDisable(false);

                    /*get view section*/
                    var step3 = Ext.ComponentQuery.query('panel [itemid="bookingwizardstep3"]')[0];
                    step3.stepThreeObject = me.stepThreeObject;

                }
            }
        });
    },
    checkIfObjectValid: function (me) {

        /*Start Update rightpanel*/
        var obj = new Object;
        obj.BookingTrackingId = me.stepThreeObject.BookingTrackingId;
        obj.BookingId = me.stepThreeObject.BookingId;
        obj.ReservationId = me.stepThreeObject.ReservationId;
        Utils.UpdateRightPanObj(obj, 3);
        /*End of update rightpanel*/

        if (!Utils.isEmpty(me.stepThreeObject)) {

            var duration = 0;
            if (Utils.isValid(me.stepThreeObject.Duration)) {
                duration = me.stepThreeObject.Duration;
            }

            if (me.stepThreeObject.GrossPrice) {
                me.stepThreeObject.PriceFlag = 1;
                Ext.getCmp('PriceID').items.items[0].setValue(true);
            }
            else {
                me.stepThreeObject.PriceFlag = 2;
                Ext.getCmp('PriceID').items.items[1].setValue(true);
            }

            /*Get adviced package selected*/

            Ext.getCmp('AdvicedPackagesID').items.items[0].setValue(true);

            var meetingTypeDefault = 0;
            if (Utils.isValid(me.stepThreeObject.MeetingTypeId)) {
                meetingTypeDefault = me.stepThreeObject.MeetingTypeId;
                if (Ext.getCmp('PropertyFeatureID'))
                    Ext.getCmp('PropertyFeatureID').setValue(meetingTypeDefault);
            }
            if (Ext.getCmp('PriceID'))
                Ext.getCmp('PriceID').setValue(me.stepThreeObject.PriceFlag);
            var searchParam = "DURATION:" + duration + ";MEETING_TYPE:" + meetingTypeDefault + ";PACKAGE_ADVICE_FLAG:" + 1 + ";PRICE_FLAG:" + me.stepThreeObject.PriceFlag;
            this.loadStore(searchParam, me);
            Ext.getCmp('skip-button').show();
            this.loadReservationDetails(me);
            Utils.StepTwoObj = me.stepThreeObject;

            // Utils.UpdateRightPanObj(me.stepThreeObject, 2); //Update R;panel PV-MM
        }
    },
    loadStore: function (searchParam, me) {
        var btid = (me.stepThreeObject.BookingTrackingId > 0) ? me.stepThreeObject.BookingTrackingId : 0;
        var bid = (me.stepThreeObject.BookingId > 0) ? me.stepThreeObject.BookingId : 0;

        var grid = Ext.ComponentQuery.query('grid[itemid="PackageListGrid"]')[0];
        if (grid) {
            grid.getStore().proxy.setExtraParam('id', btid);
            grid.getStore().proxy.setExtraParam('id1', user_language);
            grid.getStore().proxy.setExtraParam('id2', searchParam);
            grid.getStore().proxy.setExtraParam('id3', bid); //booking id nullable

            var localThis = this;
            grid.getStore().load({
                callback: function (records, o, success) {

                    //localThis.setNextButtonDisable(false);
                    Ext.getCmp('move-next').setDisabled(true);
                    //                    var cmboduration = Ext.ComponentQuery.query('combo[itemid="cmbDuaration"]')[0];
                    //                    cmboduration.setValue(o.response.duration);
                    if (Ext.getCmp('DuarationID')) {
                        /*of duration call not done then reload it*/
                        var range = Ext.getCmp('DuarationID').getStore().getRange();
                        if (range.length > 0) {
                            Ext.getCmp('DuarationID').setValue(o.response.duration);
                        }
                        else {
                            Ext.getCmp('DuarationID').getStore().load({
                                callback: function () {
                                    Ext.getCmp('DuarationID').setValue(o.response.duration);
                                }
                            })
                        }

                    }
                    //grid.doLayout();
                }
            });
        }

        Ext.getCmp('move-next').setDisabled(true);
    },

    loadStepThreeObject: function (me) {
        Ext.getStore('common.PackageDurationStore').load();
        var cmbPropertyFeatureStore = Ext.getStore('common.MeetingTypeNewStore');
        cmbPropertyFeatureStore.load({
            callback: function (records, o, success) {
                cmbPropertyFeatureStore.insert(0, { PropertyFeatureId: 0, PropertyFeatureName: "ALL", PropertyFeatureDescription: '' }, true);
            }
        });

        me.stepThreeObject.Duration = 0;
        me.stepThreeObject.MeetingTypeId = 0;
        me.stepThreeObject.GrossPrice = true;
        //me.externalBookingTrackingId = Utils.StepThreeObj.BookingTrackingId;

        if (!Utils.isEmpty(Utils.StepTwoObj)) {

            me.stepThreeObject = Utils.StepTwoObj;
            var localStepOne = Utils.StepTwoObj;
            me.stepThreeObject.MeetingTypeId = localStepOne.MeetingTypeId;
            me.stepThreeObject.GrossPrice = localStepOne.GrossPrice;
            me.stepThreeObject.ReservationId = localStepOne.ReservationId;
            me.stepThreeObject.BookingTrackingId = localStepOne.BookingTrackingId;

            var bookingId = localStepOne.BookingId;
            if (bookingId == null || bookingId == undefined || bookingId == "") {
                bookingId = 0;
            }

            this.externalBookingTrackingId = localStepOne.BookingTrackingId;
            this.externalBookingId = (localStepOne.BookingId > 0) ? localStepOne.BookingId : 0;

        }

        ////     else {
        if (me.externalBookingTrackingId > 0 || me.externalBookingId > 0) {
            urlItem = webAPI_path + 'api/booking/GetStepData';
            Ext.data.JsonP.request({
                url: urlItem,
                type: 'GET',
                params: {
                    id: 0,
                    id1: me.externalBookingTrackingId,
                    id2: me.externalBookingId,
                    id3: 3
                },

                success: function (response) {
                    me.stepThreeObject = response.data;

                    /*Because in step3 required Utils step3 object at common.js file*/
                    Utils.StepThreeObj = me.stepThreeObject;
                    Utils.RightPanObj.StatusId = (me.stepThreeObject.StatusId > 0) ? me.stepThreeObject.StatusId : 0;

                    var bookingId = me.stepThreeObject.BookingId;
                    if (bookingId == null || bookingId == undefined || bookingId == "") {
                        bookingId = 0;
                    }

                    me.stepThreeObject.BookingId = bookingId;
                    log("loaded step object", me.stepThreeObject);

                    if (me.stepThreeObject.isDisabledStep3Selection == true) {
                        /*Commented as it can show in bookingwizardstep3 and bookingwizardstep3checkbox conditionally*/
                        //var g = Ext.ComponentQuery.query('bookingwizardstep3 radiogroup[action="AllAdvicedPackage"]')[0].setDisabled(true);
                        var g = Ext.ComponentQuery.query('radiogroup[action="AllAdvicedPackage"]')[0];
                        if (g)
                            g.setDisabled(true);

                        //Ext.ComponentQuery.query('bookingwizardstep3 radiogroup[action="NetGrossPrice"]')[0].setDisabled(true);
                        var n = Ext.ComponentQuery.query('radiogroup[action="NetGrossPrice"]')[0];
                        if (n)
                            n.setDisabled(true);
                        Ext.getCmp('move-next').setDisabled(true);
                        Ext.getCmp('confirm-save').setDisabled(true);
                    }
                    else {
                        /*Commented as it can show in bookingwizardstep3 and bookingwizardstep3checkbox conditionally*/
                        //var g = Ext.ComponentQuery.query('bookingwizardstep3 radiogroup[action="AllAdvicedPackage"]')[0].setDisabled(false); ;
                        var g = Ext.ComponentQuery.query('radiogroup[action="AllAdvicedPackage"]')[0];
                        if (g)
                            g.setDisabled(false);


                        //Ext.ComponentQuery.query('bookingwizardstep3 radiogroup[action="NetGrossPrice"]')[0].setDisabled(false);
                        var n = Ext.ComponentQuery.query('radiogroup[action="NetGrossPrice"]')[0];
                        if (n)
                            n.setDisabled(false);

                        if (me.stepThreeObject.GrossPrice) {
                            me.stepThreeObject.PriceFlag = 1;
                            Ext.getCmp('PriceID').items.items[0].setValue(true);
                        }
                        else {
                            me.stepThreeObject.PriceFlag = 2;
                            Ext.getCmp('PriceID').items.items[1].setValue(true);
                        }

                        Ext.getCmp('move-next').setDisabled(false);
                        Ext.getCmp('confirm-save').setDisabled(false);
                        //                        Ext.getCmp('move-next').setDisabled(false);
                        //                        Ext.getCmp('confirm-save').setDisabled(false);
                    }
                    me.checkIfObjectValid(me);

                    //try {

                    //    var dur = Utils.CalculateDuration(me.stepThreeObject.DateStart, me.stepThreeObject.DateEnd);
                    //    if (Utils.isValid(dur)) {
                    //        me.stepThreeObject.Duration = dur;
                    //    }
                    //} catch (e) {
                    //    console.log("Error on calculating the duration from step 2");
                    //}

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

        //var reservationStore = Ext.getStore('bookingwizard.ReservationDetails');
        //reservationStore.proxy.setExtraParam('id', me.externalReservationId);
        //reservationStore.proxy.setExtraParam('fromTable', 0);
        //reservationStore.on('load', function () {
        //    var reservationObject = reservationStore.proxy.reader.jsonData.data;;
        //    me.stepThreeObject = reservationObject;
        //    me.stepThreeObject.MeetingType = reservationObject.PropertyFeatureId;
        //    //me.stepThreeObject.GrossPrice = reservationObject.GrossPrice;                    
        //}, this, { single: true });
        //var store = reservationStore.load();
        ////  }

    },

    loadReservationDetails: function (me) {

        var localObject = me.stepThreeObject;
        var title = 'Select Package_Title'.l('SC53000');

        var sd = Ext.Date.format(new Date(localObject.DateStart), 'Y-m-d');
        if (Utils.isValid(sd)) {
            title += " - " + sd + " : ";
        }
        var bn = localObject.BookingName; ;
        if (Utils.isValid(bn)) {
            title += " " + bn;
        }
        if (Utils.isValid(localObject.BookingNumber)) {
            title += " <span style='float:right'><span id='spReservationId'>" + localObject.BookingNumber + "</span></div>";
        }
        var panel = Ext.ComponentQuery.query('panel[itemid="bookingwizardstep3"]')[0];
        panel.setTitle(title);

        localObject.FixedPriceId = 0;
        localObject.BarId = null;

        if (Utils.isValid(me.stepThreeObject.FixedPriceId) && Utils.isValid(me.stepThreeObject.SelectedBar) && Utils.isValid(me.stepThreeObject.alternateBarId)) {
            document.getElementById('rd_' + me.stepThreeObject.FixedPriceId + '_' + me.stepThreeObject.SelectedBar).checked = true;
            document.getElementById('rd_' + me.stepThreeObject.FixedPriceId + '_' + me.stepThreeObject.alternateBarId).checked = true;
        }
        if (Utils.isValid(me.stepThreeObject.FixedPriceId) && Utils.isValid(me.stepThreeObject.SelectedBar)) {
            document.getElementById('rd_' + me.stepThreeObject.FixedPriceId + '_' + me.stepThreeObject.SelectedBar).checked = true;
        }
        Ext.getCmp('move-next').setDisabled(true);

        //var fixedIndex = store.findExact('FixedPriceId', me.stepThreeObject.fixedPriceId);

        //var row = store.getAt(fixedIndex);

        //document.getElementById('rd_' + me.stepThreeObject.fixedPriceId + '_' + me.stepThreeObject.selectedBar).checked = true;


    }
    //,

    //setNextButtonDisable: function (state) {
    //    Ext.getCmp('move-next').setDisabled(state);
    //}

});

