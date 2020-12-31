Ext.define('Regardz.controller.bookingwizard.BookingWizardStep6', {
    extend: 'Ext.app.Controller',
    views: ['bookingwizard.BookingWizardStep6', 'bookingwizard.CompleteProfiles', 'bookingwizard.SalesResponsibleUserWindow', 'bookingwizard.SalesResponsibleUserList'],
    stores: ['bookingwizard.ReservationDetails', 'bookingwizard.BookingListStepSixStore', 'usermanage.UserlistStore'],
    thisController: false,
    externalReservationId: null,
    stepSixObject: {},
    maxDate: new Date(),
    refs: [{
        ref: 'salesresponsibleuserwindow',
        selector: 'salesresponsibleuserwindow'
    }],
    init: function () {
        var me = this;
        //WARNING NEEDS to be uncommented once 
        //this.reservationId = 829;
        Ext.getCmp('skip-button').hide();
        Ext.getCmp('move-prev').setDisabled(false);
        Ext.getCmp('move-next').setText("Send confirmation");
        Ext.getCmp('move-next').setDisabled(false);
        Utils.ShowRightPanel(3);
        // this.loadStepSixObject(me);
        this.control({
            'panel[itemid="stepsix"]': {
                activate: function (t, e) {
                    //this.loadStore();
                    //                    Ext.getCmp('skip-button').hide();
                    //                    Ext.getCmp('move-next').setText("Send confirmation");
                    //                    Ext.getCmp('move-next').setDisabled(false);

                    //me.checkIfObjectValid(me);
                    this.loadStepSixObject(me); //From Pratik:

                },
                afterrender: function () {
                    //                    Ext.getCmp('move-next').setDisabled(false);
                    //                    Ext.getCmp('move-next').setText("Send confirmation");
                    this.loadStepSixObject(me);

                }

            },
            'button[action="changeCompleteProfiles"]': {
                click: function (t, e, o) {
                    Ext.create('widget.completeprofiles').show();
                    //Ext.create('widget.completeprofiles').center();
                }
            },
            'button[action="searchResponsible"]': {
                click: function (t, e, o) {

                    Ext.getStore('usermanage.UserlistStore').proxy.setExtraParam('propertyId', -1);
                    Ext.getStore('usermanage.UserlistStore').proxy.setExtraParam('isVerified', true);
                    Ext.getStore('usermanage.UserlistStore').proxy.setExtraParam('searchString', '');
                    Ext.getStore('usermanage.UserlistStore').load();
                    Ext.create('widget.salesresponsibleuserwindow', { userId: 0, userIdentity: t.itemId }).center();

                }
            },
            'salesresponsibleuserlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'SelectResponsibleUser')
                        this.SelectResponsibleUser(zRec, me);
                }
            },
            'completeprofiles': {
                afterrender: function () {

                    var form = Ext.ComponentQuery.query('completeprofiles [itemid="completeprofilesId"]')[0];
                    //var CompanyId = form.getForm().findField('CompanyId').getValue();
                    //var IndividualId = form.getForm().findField('IndividualId').getValue();
                    var CompanyId = me.stepSixObject.CompanyId;
                    var IndividualId = me.stepSixObject.IndividualId;

                    if (CompanyId == null || CompanyId == '' || CompanyId == undefined) {
                        var radioGroup = Ext.ComponentQuery.query('completeprofiles [itemid="InvoiceEmailRadioStep6"]')[0];
                        var emailText = Ext.ComponentQuery.query('completeprofiles [itemid="InvoiceEmailTextFieldStep6"]')[0];
                        radioGroup.disable(1);
                        emailText.disable(1);
                    }

                    form.getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/Address/GetInvoiceAddress',
                        params: {
                            id: CompanyId,
                            id1: IndividualId,
                            languageId: user_language
                        }
                    })
                }
            },
            'completeprofiles button[action="saveCompleteProfiles"]': {
                click: function (t, e, o) {
                    //                    var comboWriteContact = Ext.ComponentQuery.query('[itemid="comboWriteContact"]')[0];
                    //                    var contactField = Ext.ComponentQuery.query('[itemid="contactField"]')[0];
                    //                    contactText.setText(contactField.getValue() + " - " + comboWriteContact.getRawValue());
                    var form = Ext.ComponentQuery.query('completeprofiles [itemid="completeprofilesId"]')[0];



                    form.getForm().findField('CompanyId').setValue(me.stepSixObject.CompanyId);
                    form.getForm().findField('IndividualId').setValue(me.stepSixObject.IndividualId);

                    if (form.getForm().isValid()) {
                        var Pincode = form.getForm().findField('Pincode').getValue();
                        var CountryId = form.getForm().findField('CountryId').getValue();
                        if (!Utils.ValidatePostCodeFormate(CountryId, Pincode)) {
                            return false;
                        }
                        //                        if (form.getForm().findField('InvoicedBy').getValue() == 0) {
                        //                            form.getForm().findField('InvoiceEmail').setValue(null)
                        //                        }
                        form.getForm().submit({
                            url: webAPI_path + "api/Address/SaveInvoiceAddress",
                            method: 'POST',
                            success: function (form, response) {
                                var r = response.response.responseText;
                                var r = Ext.decode(r);
                                /*Commented as response text not came from API*/
                                if (r.success == true) {
                                    Ext.ComponentQuery.query('bookingwizardstep6 button[itemid="btnChangeProfile"]')[0].removeClass('redbutton');
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        win.close();
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
            },
            '[itemid="bookingtable"]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    if (iColIdx == 9) { // Open right panel
                        var bookingId = 0;
                        if (Utils.isValid(iRecord.data.BookingId)) {
                            bookingId = iRecord.data.BookingId;
                        }
                        Utils.LoadBookingInformationForRightPane(bookingId, iRecord.data.BookingTrackingId, user_language);
                        Utils.ShowRightPanel(2);
                    }
                }
            },
            'bookingwizardstep6 button[action="recreatePersonalisedTextFromTemp"]': {
                click: function (t, e, o) {
                    var activeTab = Ext.ComponentQuery.query('bookingwizardstep6 tabpanel[itemid="tabPanelBookingWizardStep6"]')[0].getActiveTab();
                    var loginUsername = CurrentSessionUserFName + " " + CurrentSessionUserLName;
                    var coverLetterContent = '';
                    Ext.Ajax.request({
                        url: webAPI_path + 'api/Booking/GetBookingConformationContain',
                        method: 'GET',
                        params: { id: me.stepSixObject.ReservationId,
                            languageId: user_language,
                            loginUsername: loginUsername
                        },
                        success: function (response) {
                            var r = response.responseText;
                            var r = Ext.decode(r);
                            if (activeTab.name == "coverLetterContentTab") {
                                coverLetterContent = r.CoverLetter;
                                Ext.ComponentQuery.query('bookingwizardstep6 [itemid="coverLetterContent"]')[0].setValue(coverLetterContent);
                            }
                            else if (activeTab.name == "emailTextContentTab") {
                                Salutation = r.Salutation;
                                EmailContent = r.EmailContent;
                                Signature = r.Signature;

                                Ext.ComponentQuery.query('bookingwizardstep6 [itemid="emailSalutation"]')[0].setValue(Salutation);
                                Ext.ComponentQuery.query('bookingwizardstep6 [itemid="emailContent"]')[0].setValue(EmailContent);
                                Ext.ComponentQuery.query('bookingwizardstep6 [itemid="emailSignature"]')[0].setValue(Signature);
                            }
                        }
                    });
                }
            }
        });
    },
    loadStepSixObject: function (me) {
        /* Check if from Step 4 */
        if (!Utils.isEmpty(Utils.StepFiveObj)) {
            // Do logic from step four
            log("Utils object", Utils.StepFiveObj);
            log("Alert 3", Utils.StepFiveObj);
            me.stepSixObject = Utils.StepFiveObj;
            me.checkIfObjectValid(me);

        } else {
            // Load from server
            if (Utils.isValid(me.externalReservationId)) {// Check if we have reservationId
                urlItem = webAPI_path + 'api/booking/GetStepData';
                Ext.data.JsonP.request({
                    url: urlItem,
                    type: 'GET',
                    params: {
                        id: me.externalReservationId,
                        id1: 0,
                        id2: 0,
                        id3: 6 //Step-6
                    },

                    success: function (response) {
                        me.stepSixObject = response.data;
                        me.stepSixObject.BookingId = me.externalBookingId;
                        me.stepSixObject.BookingTrackingId = me.externalBookingTrackingId;

                        Utils.RightPanObj.BookingId = me.externalBookingId;
                        Utils.RightPanObj.BookingTrackingId = me.externalBookingTrackingId;
                        log("Alert 4", Utils.RightPanObj);
                        me.checkIfObjectValid(me);
                        if (me.stepSixObject.BookingId > 0)
                            Utils.ShowRightPanel(2);

                    },
                    failure: function (response) {
                        //Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                    }
                });
            }
        }


    },
    loadReservationDetails: function (me) {
        var title = 'Reservarion Confirmation- Step 6 of 6_Title'.l('SC56000');
        var rid = me.stepSixObject.ReservationId;
        if (Utils.isValid(rid)) {
            title += " <span style='float:right'><span id='spReservationId'>" + rid + "</span></div>";
        }

        var panel = Ext.ComponentQuery.query('panel[itemid="bookingwizardstep6"]')[0];

        panel.setTitle(title);

        var panelDetails = Ext.ComponentQuery.query('panel[itemid="bookingtable"]')[0];
        panelDetails.setTitle('Bookings'.l('SC56000'));

        var obj = new Object;
        obj.user_language = user_language;
        obj.ReservationId = me.stepSixObject.ReservationId;

        this.updateBookingListGrid(obj);

        //        var store = Ext.getStore('bookingwizard.BookingListStepSixStore');

        //        store.proxy.setExtraParam('id', user_language);
        //        store.proxy.setExtraParam('id1', me.stepSixObject.ReservationId);
        //        store.load();

        /*Code by MM*/
        ///loading Reservation Details in step 6 View
        var frmResDetailsStep6 = Ext.ComponentQuery.query('bookingwizardstep6 form[itemid="frmResDetailsStep6"]')[0].getForm();

        if (frmResDetailsStep6 != null) {
            frmResDetailsStep6.findField('IsGetDeal').setValue(me.stepSixObject.IsGetDeal);
            frmResDetailsStep6.findField('IsWelcomeContact').setValue(me.stepSixObject.IsWelcomeContact);
            frmResDetailsStep6.findField('IsSendMyzone').setValue(me.stepSixObject.IsSendMyzone);
            frmResDetailsStep6.findField('DecisionDate').setValue(Ext.Date.format(new Date(me.stepSixObject.DecisionDate), 'Y-m-d'));
            frmResDetailsStep6.findField('IsAfterSales').setValue(me.stepSixObject.IsAfterSales);
            frmResDetailsStep6.findField('CreatedByName').setValue(me.stepSixObject.CreatedByName);
            frmResDetailsStep6.findField('CreatedBy').setValue(me.stepSixObject.CreatedBy);
            if (me.stepSixObject.ResponsibleUser != null)
                frmResDetailsStep6.findField('ResponsibleUser').setValue(columnWrap(me.stepSixObject.ResponsibleUser));
            if (me.stepSixObject.ResponsibleUserId != null)
                frmResDetailsStep6.findField('ResponsibleUserId').setValue(me.stepSixObject.ResponsibleUserId);
            frmResDetailsStep6.findField('ReservationId').setValue(me.stepSixObject.ReservationId);
        }

        var tabPanelBookingWizardStep6 = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="tabPanelBookingWizardStep6"]')[0];

        if (me.stepSixObject.IndividualId != null && tabPanelBookingWizardStep6 != undefined && tabPanelBookingWizardStep6 != null) {
            Ext.Ajax.request({
                url: webAPI_path + 'api/Individual/GetIndividualbyId',
                method: 'GET',
                params: { id: me.stepSixObject.IndividualId },
                success: function (response) {
                    var r = jsonDecode(response.responseText);
                    if (r.data.Email == undefined || r.data.Email == null || r.data.Email == '') {
                        var label = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="mainEmailText"]')[0].setText(r.data.Email);
                        //Ext.ComponentQuery.query('bookingwizardstep6 [itemid="cbMainEmailItemId"]')[0].setValue(1);
                        Ext.ComponentQuery.query('bookingwizardstep6 [itemid="secondaryEmailText"]')[0].setValue(r.data.SecondaryEmail);
                        Ext.ComponentQuery.query('bookingwizardstep6 [itemid="cbSecondaryEmailItemId"]')[0].setValue(2);
                    } else {
                        var label = Ext.ComponentQuery.query('bookingwizardstep6 [itemid="mainEmailText"]')[0].setText(r.data.Email);
                        Ext.ComponentQuery.query('bookingwizardstep6 [itemid="cbMainEmailItemId"]')[0].setValue(1);
                        Ext.ComponentQuery.query('bookingwizardstep6 [itemid="secondaryEmailText"]')[0].setValue(r.data.SecondaryEmail);
                        //Ext.ComponentQuery.query('bookingwizardstep6 [itemid="cbSecondaryEmailItemId"]')[0].setValue(2);
                    }

                    var loginUsername = CurrentSessionUserFName + " " + CurrentSessionUserLName;
                    var emailBody = '';
                    var coverLetterContent = '';

                    Ext.Ajax.request({
                        url: webAPI_path + 'api/Booking/GetBookingConformationContain',
                        method: 'GET',
                        params: { id: me.stepSixObject.ReservationId,
                            languageId: user_language,
                            loginUsername: loginUsername
                        },
                        success: function (response) {
                            var r = response.responseText;
                            var r = Ext.decode(r);
                            coverLetterContent = r.CoverLetter;
                            Salutation = r.Salutation;
                            EmailContent = r.EmailContent;
                            Signature = r.Signature;
                            Ext.ComponentQuery.query('bookingwizardstep6 [itemid="coverLetterContent"]')[0].setValue(coverLetterContent);
                            Ext.ComponentQuery.query('bookingwizardstep6 [itemid="emailSalutation"]')[0].setValue(Salutation);
                            Ext.ComponentQuery.query('bookingwizardstep6 [itemid="emailContent"]')[0].setValue(EmailContent);
                            Ext.ComponentQuery.query('bookingwizardstep6 [itemid="emailSignature"]')[0].setValue(Signature);
                        }
                    });


                    //Ext.ComponentQuery.query('bookingwizardstep6 [itemid="emailContent"]')[0].setValue(emailBody);

                },
                failure: function () {

                }
            });
        }
        /*End of code by MM*/
    },
    checkIfObjectValid: function (me) {
        if (!Utils.isEmpty(me.stepSixObject)) {
            me.loadReservationDetails(me);

            /*Start Update rightpanel*/
            var obj = new Object;
            obj.BookingTrackingId = me.stepSixObject.BookingTrackingId;
            obj.BookingId = me.stepSixObject.BookingId;
            obj.ReservationId = me.stepSixObject.ReservationId;
            log("Alert 7", obj);
            Utils.UpdateRightPanObj(obj, 6);
            /*End of update rightpanel*/

            // Utils.UpdateRightPanObj(me.stepSixObject, 2); //Update R;panel - PV-MM
        }
    },
    SelectResponsibleUser: function (rec, me) {
        var frmResDetailsStep6 = Ext.ComponentQuery.query('bookingwizardstep6 form[itemid="frmResDetailsStep6"]')[0].getForm();
        if (frmResDetailsStep6 != null) {
            frmResDetailsStep6.findField('ResponsibleUser').setValue(columnWrap(rec.data.FirstName + ' ' + rec.data.LastName + ' (' + rec.data.Initial + ')'));
            frmResDetailsStep6.findField('ResponsibleUserId').setValue(rec.data.UserId);
        }
        me.getSalesresponsibleuserwindow().close();
    },

    updateBookingListGrid: function (obj) {
        var store = Ext.getStore('bookingwizard.BookingListStepSixStore');
        if (obj.user_language && obj.user_language > 0 && obj.ReservationId && obj.ReservationId > 0) {
            store.proxy.setExtraParam('id', obj.user_language);
            store.proxy.setExtraParam('id1', obj.ReservationId);
        }
        store.load();
    }
});
