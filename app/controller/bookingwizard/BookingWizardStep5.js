Ext.define('Regardz.controller.bookingwizard.BookingWizardStep5', {
    extend: 'Ext.app.Controller',
    views: ['bookingwizard.BookingWizardStep5', 'bookingwizard.MeetingItemsShort', 'bookingwizard.ContactOnLocationWindow',
            'bookingwizard.BookingCompanySearchContactList', 'bookingwizard.AdvancedPaymentWindow', 'bookingwizard.ChangeBookingStatus',
            'bookingwizard.ContactOnLocationList'],
    stores: ['configuration.ItemStore', 'bookingwizard.ReservationDetails', 'bookingwizard.CompanySearchListStore', 'bookingwizard.CompanyContactListStore',
             'configuration.ItemTypeStore', 'bookingwizard.AllAttendeesStore', 'bookingwizard.AllAttendeesRoleStore', 'bookingwizard.BookingItemsListStepFiveStore',
             'bookingwizard.ChangeBookingStatusStore', 'bookingwizard.AttendeesPagingStore'],
    thisController: false,
    stepFiveObject: {},
    externalBookingTrackingId: null,
    externalBookingId: null,
    init: function () {
        var me = this;


        this.control({
            'panel [itemid="stepfive"]': {
                activate: function (t, e) {

                    /*@PV: Below code was in init directly so need to relocate as init calls only at once*/
                    me.BookingId = Utils.RightPanObj.BookingId;
                    me.BookingTrackingId = Utils.RightPanObj.BookingTrackingId;
                    if (me.BookingId == null || me.BookingId == undefined) me.BookingId = 0;
                    if (me.BookingTrackingId == null || me.BookingTrackingId == undefined) me.BookingTrackingId = 0;

                    try {
                        Ext.getCmp('move-prev').show();
                        Ext.getCmp('move-prev').getEl().show();
                        Ext.getCmp('move-prev').setDisabled(false);
                    } catch (e) {

                    }
                    /*End of init code*/

                    this.loadStore();
                    //                    Ext.getCmp('move-next').setText("Next");
                    //                    Ext.getCmp('move-next').setDisabled(false);
                    //                    Ext.getCmp('skip-button').hide();                    
                    me.loadStepFiveObject(me);
                    me.BookingId = Utils.RightPanObj.BookingId;
                    me.BookingTrackingId = Utils.RightPanObj.BookingTrackingId;
                    if (me.BookingId == null || me.BookingId == undefined) me.BookingId = 0;
                    if (me.BookingTrackingId == null || me.BookingTrackingId == undefined) me.BookingTrackingId = 0;
                    var changeAdvancePayment = Ext.ComponentQuery.query('bookingwizardstep5 button[action="changeAdvancePayment"]')[0];
                    //                    if (changeAdvancePayment)
                    //                        changeAdvancePayment.disable();


                    var paymentMethodObj = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="paymentMethodGroup"]')[0]
                    var paymentMethod = null;
                    if (paymentMethodObj) {
                        paymentMethod = paymentMethodObj.getValue().PaymentMethod;
                    }

                    Ext.Ajax.request({
                        url: webAPI_path + 'api/booking/GetBookingAdvancePaymentDetails',
                        method: 'GET',
                        //params: { bookingId: 0, bookingTrackingId: 84, languageId: user_language },
                        params: { bookingId: me.BookingId, bookingTrackingId: me.BookingTrackingId, languageId: user_language, payMethod: paymentMethod },
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            //console.log('Advance payment log:');
                            //console.log(r);
                            if (r != null && r.data.length > 0) {
                                //                                if (r.data[0].IsValidAmount != null && r.data[0].IsValidAmount) {
                                //                                    Ext.ComponentQuery.query('bookingwizardstep5 button[action="changeAdvancePayment"]')[0].enable();
                                //                                }
                                var element = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="fieldAdvencePaymentLabel"]')[0];
                                if (element) {
                                    //alert("2"+ r.data[0].DownPayment);
                                    element.setValue(Ext.util.Format.number(r.data[0].DownPayment, '0,000.00'));
                                    //                                    if (paymentMethod == 1) {
                                    //                                        element.setValue(Ext.util.Format.number(r.data[0].BookingAmount, '0,000.00'));
                                    //                                    }
                                    //                                    else {
                                    //                                        element.setValue(Ext.util.Format.number(r.data[0].DownPayment, '0,000.00'));
                                    //                                    }
                                }
                            }
                        }
                    });

                    var checkOk = Ext.ComponentQuery.query('bookingwizardstep5 checkbox[itemid="statusOkCheck"]')[0];
                    if (checkOk)
                        checkOk.setValue(false);
                },
                afterrender: function () {
                    //                    Ext.getCmp('move-next').setText("Next");
                    //                    Ext.getCmp('move-next').setDisabled(false);
                    //                    Ext.getCmp('skip-button').hide();

                    me.loadStepFiveObject(me);
                }
            },
            'button[action="changeContactOnLocation"]': {
                click: function (t, e, o) {
                    var cw = Ext.create('widget.contactonlocationlist');
                    cw.show();
                    cw.center();
                }
            },
            'contactonlocationlist': {
                afterrender: function () {
                    var allAtt = Ext.getStore('bookingwizard.AttendeesPagingStore');
                    var indId = Ext.ComponentQuery.query('bookingwizardstep5 hidden[itemid="individualId"]')[0].getValue();
                    allAtt.proxy.setExtraParam('id', indId);
                    allAtt.proxy.setExtraParam('languageId', user_language);
                    allAtt.proxy.setExtraParam('searchParam', null);
                    allAtt.load({});
                }
            },
            'contactonlocationlist grid[itemid="conatactlist"] ': {
                beforeedit: function (editor, e) {
                    var allAttRole = Ext.getStore('bookingwizard.AllAttendeesRoleStore');
                    allAttRole.proxy.setExtraParam('id', user_language);
                    allAttRole.load();
                },
                edit: function (editor, e) {
                    e.newValues.InvitedByIndividualId = me.stepFiveObject.IndividualId;
                    e.newValues.InvitedByCompanyId = me.stepFiveObject.CompanyId;
                    e.newValues.AttendeeRoleId = e.newValues.AttendeesRole > 0 ? e.newValues.AttendeesRole : e.record.data.AttendeeRoleId;
                    e.newValues.AttendeeID = e.originalValues.AttendeeID;
                    Ext.Ajax.request({
                        url: webAPI_path + "api/BookingAttendee/AddAttendee",
                        type: 'POST',
                        params: e.newValues,
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                Ext.getStore('bookingwizard.AttendeesPagingStore').reload();
                                //Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                                Ext.getStore('bookingwizard.AttendeesPagingStore').reload();
                            }
                        },
                        failure: function () {
                            Ext.getStore('company.DomainListStore').reload();
                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        }
                    });
                },
                canceledit: function () {
                    Ext.getStore('bookingwizard.AttendeesPagingStore').reload();
                }
            },
            'contactonlocationlist button[action="saveContactOnLocation"]': {
                click: function (t, e, o) {
                    var allAtt = Ext.getStore('bookingwizard.AllAttendeesStore');
                    //var indId = formBooking.findField('individualId').getValue();                    
                    var indId = Ext.ComponentQuery.query('[itemid="individualId"]')[0].getValue();

                    //var form = Ext.ComponentQuery.query('contactonlocationwindow [itemid="contactLocationWindow"]')[0];
                    var attendeesGrid = Ext.ComponentQuery.query('contactonlocationlist [itemid="conatactlist"]')[0];

                    //form.getForm().findField('InvitedByIndividualId').setValue(me.stepFiveObject.IndividualId);
                    //form.getForm().findField('InvitedByCompanyId').setValue(me.stepFiveObject.CompanyId);

                    var allAttRole = Ext.getStore('bookingwizard.AllAttendeesRoleStore');
                    allAttRole.proxy.setExtraParam('id', user_language);
                    allAttRole.load();

                    var r = Ext.create('Regardz.model.bookingwizard.Attendees', {
                        Name: '',
                        AttendeeID: 0,
                        Salutation: '',
                        LastSendDate: Ext.Date.format(new Date(), 'Y-m-d H:i:s'),
                        CreatedBy: CurrentSessionUserId
                    });

                    editor = attendeesGrid.editingPlugin;
                    editor.cancelEdit();
                    attendeesGrid.getStore().insert(0, r);

                    editor.startEdit(0, 0);

                    //for testing
                    //indId = 2; 
                    //                    allAtt.proxy.setExtraParam('id', indId);
                    //                    allAtt.proxy.setExtraParam('languageId', user_language);
                    //                    allAtt.load();                    

                    //                    Utils.ShowWindow('widget.contactonlocationwindow', null);
                }
            },
            'contactonlocationlist button[action=searchParam]': {
                click: function () {
                    me.searchAttendeeFilter();
                }
            },
            'contactonlocationlist textfield[itemid=searchParam]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        me.searchAttendeeFilter(null);
                    }
                }
            },
            'contactonlocationlist button[action="clearAttendeeFilter"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
                    me.clearsearchAttendeeFilter();
                }
            },
            'contactonlocationlist grid[itemid=conatactlist]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'selectAttendee')
                        me.selectAttendee(zRec.data);
                }
            },
            'button[action="changeAdvancePayment"]': {
                click: function (t, e, o) {
                    var cw = Ext.create('widget.advancedpayment');
                    cw.show();
                    cw.center();
                }
            },
            'bookingwizardstep5 radiogroup[action="paymentMethodChange"]': {
                change: function (t, newValue, oldValue, eOpts) {
                    Ext.Ajax.request({
                        url: webAPI_path + 'api/booking/GetBookingAdvancePaymentDetails',
                        method: 'GET',
                        params: { bookingId: me.BookingId, bookingTrackingId: me.BookingTrackingId, languageId: user_language, payMethod: newValue.PaymentMethod },
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            if (r != null && r.data.length > 0) {

                                var element = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="fieldAdvencePaymentLabel"]')[0];
                                if (element) {
                                    element.setValue(Ext.util.Format.number(r.data[0].DownPayment, '0,000.00'));
                                }
                                /*reload step5*/
                                var c = me.getController('bookingwizard.BookingWizardPanel');
                                c.saveStepFive(c, null, true); //controller object, not required, true means not laod do after save lines                   
                                /*end code*/
                            }
                        }
                    });
                }
            },
            'bookingwizardstep5 radiogroup[action="purchaseOrderChange"]': {
                change: function (t, newValue, oldValue, eOpts) {
                    Ext.Ajax.request({
                        url: webAPI_path + 'api/booking/GetBookingAdvancePaymentDetails',
                        method: 'GET',
                        params: { bookingId: me.BookingId, bookingTrackingId: me.BookingTrackingId, languageId: user_language, payMethod: newValue.PaymentMethod },
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            //                            if (r != null && r.data.length > 0 && r.data[0].IsValidAmount != null && r.data[0].IsValidAmount) {
                            //                                Ext.ComponentQuery.query('bookingwizardstep5 button[action="changeAdvancePayment"]')[0].enable();
                            //                            } else {
                            //                                Ext.ComponentQuery.query('bookingwizardstep5 button[action="changeAdvancePayment"]')[0].disable();
                            //                            }
                            /*reload step5*/
                            var c = me.getController('bookingwizard.BookingWizardPanel');
                            c.saveStepFive(c, null, true); //controller object, not required, true means not laod do after save lines                   
                            /*end code*/
                        }
                    });
                }
            },
            'bookingwizardstep5 numberfield[itemid="txtDiscountInv"]': {
                blur: function () {
                    /*reload step5*/
                    var c = me.getController('bookingwizard.BookingWizardPanel');
                    c.saveStepFive(c, null, true); //controller object, not required, true means not laod do after save lines                   
                    /*end code*/
                }
            },
            'bookingwizardstep5 radio[name="rdPO"]': {
                blur: function (t) {
                    /*reload step5*/
                    if (t.inputValue == 3) return true;
                    var c = me.getController('bookingwizard.BookingWizardPanel');
                    c.saveStepFive(c, null, true); //controller object, not required, true means not laod do after save lines                   
                    /*end code*/
                }
            },
            'bookingwizardstep5 radio[itemid="purchaseOrdertextId"]': {
                blur: function () {
                    /*reload step5*/
                    var c = me.getController('bookingwizard.BookingWizardPanel');
                    c.saveStepFive(c, null, true); //controller object, not required, true means not laod do after save lines                   
                    /*end code*/
                }
            },
            'bookingwizardstep5 textareafield[name="ExternalRemark"]': {
                blur: function () {

                    /*reload step5*/
                    var c = me.getController('bookingwizard.BookingWizardPanel');
                    c.saveStepFive(c, null, true); //controller object, not required, true means not laod do after save lines                   
                    /*end code*/
                }
            },
            'bookingwizardstep5 textareafield[name="InternalRemark"]': {
                blur: function () {

                    /*reload step5*/
                    var c = me.getController('bookingwizard.BookingWizardPanel');
                    c.saveStepFive(c, null, true); //controller object, not required, true means not laod do after save lines                   
                    /*end code*/
                }
            },
            'bookingwizardstep5 textfield[name="BookingName"]': {
                blur: function () {

                    /*reload step5*/
                    var c = me.getController('bookingwizard.BookingWizardPanel');
                    c.saveStepFive(c, null, true); //controller object, not required, true means not laod do after save lines                   
                    /*end code*/
                }
            },
            'bookingwizardstep5 radio[name="rdInfoBoard"]': {
                blur: function (t) {
                    if (t.inputValue == 3) return true;
                    /*reload step5*/
                    var c = me.getController('bookingwizard.BookingWizardPanel');
                    c.saveStepFive(c, null, true); //controller object, not required, true means not laod do after save lines                   
                    /*end code*/
                }
            },
            'bookingwizardstep5 combo[name="MeetingTypeId"]': {
                blur: function (t) {
                    /*reload step5*/
                    var c = me.getController('bookingwizard.BookingWizardPanel');
                    c.saveStepFive(c, null, true); //controller object, not required, true means not laod do after save lines                   
                    /*end code*/
                }
            },
            'bookingwizardstep5 radiofield[name="ExtraOptionsOnLocation"]': {
                blur: function (t) {
                    /*reload step5*/
                    var c = me.getController('bookingwizard.BookingWizardPanel');
                    c.saveStepFive(c, null, true); //controller object, not required, true means not laod do after save lines                   
                    /*end code*/
                }
            },
            'bookingwizardstep5 radiofield[name="ContactOnLocationOptions"]': {
                blur: function (t) {

                    var valueField = Ext.ComponentQuery.query('bookingwizardstep5 hidden[itemid="individualId"]')[0].getValue();
                    if (t.inputValue == 3 && valueField.length <= 0) return true;
                    /*reload step5*/
                    var c = me.getController('bookingwizard.BookingWizardPanel');
                    c.saveStepFive(c, null, true); //controller object, not required, true means not laod do after save lines                   
                    /*end code*/
                }
            },
            'advancedpayment': {
                afterrender: function () {
                    me.BookingId = Utils.RightPanObj.BookingId;
                    me.BookingTrackingId = Utils.RightPanObj.BookingTrackingId;
                    if (me.BookingId == null || me.BookingId == undefined) me.BookingId = 0;
                    if (me.BookingTrackingId == null || me.BookingTrackingId == undefined) me.BookingTrackingId = 0;
                    var paymentMethod = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="paymentMethodGroup"]')[0].getValue().PaymentMethod;
                    Ext.Ajax.request({
                        url: webAPI_path + 'api/booking/GetBookingAdvancePaymentDetails',
                        method: 'GET',
                        //params: { bookingId: 0, bookingTrackingId: 84, languageId: user_language },
                        params: { bookingId: me.BookingId, bookingTrackingId: me.BookingTrackingId, languageId: user_language, payMethod: paymentMethod, ADPaypop: true },
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            //if (r != null && r.data.length > 0 && r.data[0].IsValidAmount != null && r.data[0].IsValidAmount)
                            if (r != null && r.data.length > 0) {
                                var element = Ext.ComponentQuery.query('advancedpayment [itemid="approvalCode"]')[0];
                                element.setValue(r.data[0].ApprovalCode);
                                /////
                                Ext.ComponentQuery.query('advancedpayment [name="clientagrees"]')[0].setValue(r.data[0].AdvancePaymentStatus);
                                /////
                                element = Ext.ComponentQuery.query('advancedpayment [itemid="reqtBookingAmt"]')[0];
                                element.setValue(Ext.util.Format.number(r.data[0].BookingAmount, '0,000.00'));
                                element = Ext.ComponentQuery.query('advancedpayment [itemid="reqtAdvancePerc"]')[0];
                                element.setValue(Ext.util.Format.number(r.data[0].DefaultDownPaymentPercentage, '0,000.00'));
                                element = Ext.ComponentQuery.query('advancedpayment [itemid="reqtAdvanceAmt"]')[0];
                                element.setValue(Ext.util.Format.number(r.data[0].DefaultDownPayment, '0,000.00'));
                                //Ext.ComponentQuery.query('advancedpayment [itemid="apprCode"]')[0].setValue(r.data[0].ApprovalCode);
                                element = Ext.ComponentQuery.query('advancedpayment [itemid="apprBookingAmnt"]')[0];
                                element.setValue(Ext.util.Format.number(r.data[0].BookingAmount, '0,000.00'));
                                element = Ext.ComponentQuery.query('advancedpayment [itemid="apprAdvancePerc"]')[0];
                                element.setValue(Ext.util.Format.number(r.data[0].DownPaymentPercentage, '0,000.00'));
                                element = Ext.ComponentQuery.query('advancedpayment [itemid="apprAdvanceAmnt"]')[0];
                                element.setValue(r.data[0].DownPayment);
                                //////
                                element = Ext.ComponentQuery.query('advancedpayment [itemid="totalBookingAmt"]')[0];
                                element.setValue(Ext.util.Format.number(r.data[0].BookingAmount, '0,000.00'));
                            }
                        }
                    });
                }
            },
            'advancedpayment button[action="requestAdvancedPaymentButton"], button[action="approvedAdvancedPaymentButton"], button[action="agreedAdvancedPaymentButton"]': {
                click: function (t, e, o) {
                    //var status = Ext.ComponentQuery.query('advancedpayment [name="clientagrees"]')[0].inputValue;
                    var newObj = new Object();
                    var element;
                    newObj.BookingId = Utils.RightPanObj.BookingId;
                    newObj.BookingTrackingId = Utils.RightPanObj.BookingTrackingId;
                    newObj.UserId = CurrentSessionUserId;

                    var statusAgree = Ext.ComponentQuery.query('advancedpayment [itemid="rdClientAgrees"]')[0].value;
                    var statusRequest = Ext.ComponentQuery.query('advancedpayment [itemid="rdRequestDiscard"]')[0].value;
                    var statusApprove = Ext.ComponentQuery.query('advancedpayment [itemid="rdManagerApproves"]')[0].value;

                    if (statusAgree) {
                        newObj.AdvancePaymentStatus = 1;
                        element = Ext.ComponentQuery.query('advancedpayment [itemid="reqtAdvanceAmt"]')[0];
                        newObj.DownPayment = parseFloat(element.getValue().replace(/[\.,]/g, function (m) { return m == '.' ? ',' : '.' }).replace(",", ""));
                    } else if (statusRequest) {
                        newObj.AdvancePaymentStatus = 2;
                        element = Ext.ComponentQuery.query('advancedpayment [itemid="reasonTextArea"]')[0];
                        newObj.Reason = element.getValue();
                    } else if (statusApprove) {
                        newObj.AdvancePaymentStatus = 3;
                        element = Ext.ComponentQuery.query('advancedpayment [itemid="apprAdvanceAmnt"]')[0];
                        //newObj.DownPayment = parseFloat(element.getValue().replace(",", "."));
                        //newObj.DownPayment = parseFloat(element.getValue().replace(/[\.,]/g, function (m) { return m == '.' ? ',' : '.' }).replace(",", ""));
                        newObj.DownPayment = element.getValue();
                    }

                    var newpaymentMethodObj = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="paymentMethodGroup"]')[0]
                    if (newpaymentMethodObj) {
                        newObj.PaymentMethod = newpaymentMethodObj.getValue().PaymentMethod;
                    }


                    Ext.Ajax.request({
                        url: webAPI_path + 'api/booking/SaveBookingAdvancePayment',
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

                                    if (newObj.AdvancePaymentStatus != 2) {
                                        element = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="fieldAdvencePaymentLabel"]')[0];
                                        //alert("4" + newObj.DownPayment)
                                        element.setValue(Ext.util.Format.number(newObj.DownPayment, '0,000.00'));
                                    }
                                }
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
            'button[action="btnSelectCompany"], button[action="btnSelectCompany2"]': {
                click: function (t, e, o) {
                    var c = me.getController('bookingwizard.BookingCompanySearchContact');
                    if (c.thisController == false) {
                        c.init();
                        c.thisController = true;
                    }

                    Ext.getStore('bookingwizard.CompanySearchListStore').proxy.setExtraParam('filter', '');
                    Ext.getStore('bookingwizard.CompanySearchListStore').load();
                    Ext.create('widget.bookcompanysearchcontactlistwindow').center();
                    Ext.getStore('bookingwizard.CompanyContactListStore').removeAll();
                }
            },

            'button[action="changeInvoiceSettings"]': {
                click: function (t, e, o) {//t => this, e => event, eo => Eoptional   
                    /*Get Controller*/
                    var me = this;
                    var cr = me.getController('bookingwizard.BookingInvoiceSettings');
                    if (cr.thisController == false) {
                        cr.init();
                        cr.thisController = true;
                    }
                    /*Get container*/
                    //Ext.create('widget.invoicesettings', { BookingId: 0, BookingTrackingId: 28 }).show();
                    console.log(Utils.RightPanObj.BookingId);
                    console.log(Utils.RightPanObj.BookingTrackingId);
                    Ext.create('widget.invoicesettings', { BookingId: Utils.RightPanObj.BookingId, BookingTrackingId: Utils.RightPanObj.BookingTrackingId }).show();
                }
            },
            'button[action="selectContact"]': {
                click: function (t, e, o) {

                    //                    var contactText = Ext.ComponentQuery.query('[itemid="selectedContactText"]')[0];
                    //                    var sRadio = Ext.ComponentQuery.query('[itemid="itemRadioSelectContact"]')[0];

                    //                    if (sRadio.getValue() == true) { //Get from select combo
                    //                        var comboSelectContact = Ext.ComponentQuery.query('[itemid="comboSelectContact"]')[0];
                    //                        contactText.setValue(comboSelectContact.getRawValue());
                    //                    } else { //get from write combo and text

                    //                        var comboWriteContact = Ext.ComponentQuery.query('[itemid="comboWriteContact"]')[0];
                    //                        var contactField = Ext.ComponentQuery.query('[itemid="contactField"]')[0];
                    //                        contactText.setValue(contactField.getValue() + " - " + comboWriteContact.getRawValue());

                    var form = Ext.ComponentQuery.query('contactonlocationwindow [itemid="contactLocationWindow"]')[0];
                    form.getForm().findField('InvitedByIndividualId').setValue(me.stepFiveObject.IndividualId);
                    form.getForm().findField('InvitedByCompanyId').setValue(me.stepFiveObject.CompanyId);

                    if (form.getForm().isValid()) {
                        form.getForm().submit({
                            url: webAPI_path + "api/BookingAttendee/AddAttendee",
                            method: 'POST',
                            success: function (form, response) {
                                var r = response.response.responseText;
                                var r = Ext.decode(r);
                                /*Commented as response text not came from API*/
                                if (r.success == true) {
                                    var allAtt = Ext.getStore('bookingwizard.AttendeesPagingStore');
                                    var indId = Ext.ComponentQuery.query('bookingwizardstep5 hidden[itemid="individualId"]')[0].getValue();

                                    //for testing
                                    //indId = 2; 
                                    allAtt.proxy.setExtraParam('id', indId);
                                    allAtt.proxy.setExtraParam('languageId', user_language);
                                    allAtt.proxy.setExtraParam('searchParam', null);
                                    allAtt.load({});
                                }
                                else {
                                }
                            },
                            failure: function (form, response) {
                            }
                        })
                    }
                    //                    }
                    var win = Ext.WindowManager.getActive();
                    if (win) {
                        win.close();
                    }
                }
            },
            '[itemid="txtDiscountInv"]': {
                blur: function (el, event, eOpts) {
                    this.addInvoiceDiscount(el.getValue(), me.stepFiveObject.BookingId, me.stepFiveObject.BookingTrackingId);
                    var paymentMethodObj = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="paymentMethodGroup"]')[0]
                    var paymentMethod = null;
                    if (paymentMethodObj) {
                        paymentMethod = paymentMethodObj.getValue().PaymentMethod;
                    }

                    Ext.Ajax.request({
                        url: webAPI_path + 'api/booking/GetBookingAdvancePaymentDetails',
                        method: 'GET',
                        //params: { bookingId: 0, bookingTrackingId: 84, languageId: user_language },
                        params: { bookingId: me.BookingId, bookingTrackingId: me.BookingTrackingId, languageId: user_language, payMethod: paymentMethod },
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            //console.log('Advance payment log:');
                            //console.log(r);
                            if (r != null && r.data.length > 0) {
                                var element = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="fieldAdvencePaymentLabel"]')[0];
                                if (element) {
                                    //alert("5" + r.data[0].DownPayment);
                                    element.setValue(Ext.util.Format.number(r.data[0].DownPayment, '0,000.00'));
                                    //                                    if (paymentMethod == 1) {
                                    //                                        element.setValue(Ext.util.Format.number(r.data[0].BookingAmount, '0,000.00'));
                                    //                                    }
                                    //                                    else {
                                    //                                        element.setValue(Ext.util.Format.number(r.data[0].DownPayment, '0,000.00'));
                                    //                                    }
                                }
                            }
                        }
                    });


                }
            },
            'bookingwizardstep5 button[action="changeStatus"]': {
                click: function (t, e, o) {
                    var bookingId = me.stepFiveObject.BookingId;
                    if (!Utils.isValid(bookingId)) {
                        bookingId = 0;
                    }
                    var bookingTrackingId = me.stepFiveObject.BookingTrackingId;
                    var cw = Ext.create('widget.changebookingstatus', { BookingId: bookingId, BookingTrackingId: bookingTrackingId });
                    cw.show();
                    cw.center();
                    //return;

                    //var checkOk = Ext.ComponentQuery.query('bookingwizardstep5 checkbox[itemid="statusOkCheck"]')[0];
                    //if (checkOk.getValue() == true) {
                    ////    var bookingId = me.stepFiveObject.BookingId;
                    ////    if (!Utils.isValid(bookingId)) {
                    ////        bookingId = 0;
                    ////    }
                    ////    var bookingTrackingId = me.stepFiveObject.BookingTrackingId;
                    //    Ext.data.JsonP.request({
                    //        url: webAPI_path + 'api/Booking/UpdateBookingStatus',
                    //        type: "GET",
                    //        params: {
                    //            id: bookingId, //BookingId
                    //            id1: bookingTrackingId, //BookingTracking Id
                    //            id2: 5, //Booking Status Id
                    //            id3: CurrentSessionUserId //Updated By                                
                    //        },
                    //        success: function (response) {
                    //            var r = response;
                    //            if (r.success == true) {
                    //                if (r.data > 0)
                    //                    me.stepFiveObject.BookingTrackingId = data;
                    //            }
                    //            else {
                    //                Ext.Msg.alert('Error'.l('g'), r.result);
                    //            }
                    //        },
                    //        failure: function () { }
                    //    })
                    //}
                }
            },
            'bookingwizardstep5 radio[name=rdPO]': {
                change: function (t, n, o, eo) {
                    var radioNameA = Ext.ComponentQuery.query('fieldcontainer radio[itemid=aaa]')[0];
                    var radioNameB = Ext.ComponentQuery.query('fieldcontainer radio[itemid=bbb]')[0];
                    var radioNameC = Ext.ComponentQuery.query('fieldcontainer radio[itemid=ccc]')[0];
                    var textfield = Ext.ComponentQuery.query('textfield[itemid=purchaseOrdertextId]')[0];

                    if (t.itemid == "aaa" && radioNameA.getValue() == true) {
                        textfield.disable();
                        Ext.ComponentQuery.query('hiddenfield[name=IsPurchaseOrderNotApplicable]')[0].setValue(true);
                        Ext.ComponentQuery.query('hiddenfield[name=IsPurchaseOrderWillBeGivenLater]')[0].setValue(false);
                        me.stepFiveObject.IsPurchaseOrderNotApplicable = true;
                        me.stepFiveObject.IsPurchaseOrderWillBeGivenLater = false;
                    }
                    else if (t.itemid == "bbb" && radioNameB.getValue() == true) {
                        textfield.disable();
                        var isNotApp = Ext.ComponentQuery.query('hiddenfield[name=IsPurchaseOrderNotApplicable]')[0].setValue(false);
                        var isGiveName = Ext.ComponentQuery.query('hiddenfield[name=IsPurchaseOrderWillBeGivenLater]')[0].setValue(true);
                        me.stepFiveObject.IsPurchaseOrderNotApplicable = false;
                        me.stepFiveObject.IsPurchaseOrderWillBeGivenLater = true;
                    }
                    else if (t.itemid == "ccc" && radioNameC.getValue() == true) {
                        textfield.enable();
                        var isNotApp = Ext.ComponentQuery.query('hiddenfield[name=IsPurchaseOrderNotApplicable]')[0].setValue(false);
                        var isGiveName = Ext.ComponentQuery.query('hiddenfield[name=IsPurchaseOrderWillBeGivenLater]')[0].setValue(false);
                        me.stepFiveObject.IsPurchaseOrderNotApplicable = false;
                        me.stepFiveObject.IsPurchaseOrderWillBeGivenLater = false;
                        me.stepFiveObject.PurchaseOrderNumber = textfield.value;
                    }
                }
            },
            'bookingwizardstep5 radio[name=rdInfoBoard]': {
                change: function (t, n, o, eo) {
                    var radioIB1 = Ext.ComponentQuery.query('fieldcontainer radio[itemid=ib1]')[0];
                    var radioIB2 = Ext.ComponentQuery.query('fieldcontainer radio[itemid=ib2]')[0];
                    var radioIB3 = Ext.ComponentQuery.query('fieldcontainer radio[itemid=informationBoardIdRadio]')[0];
                    var textfield = Ext.ComponentQuery.query('textfield[itemid=informationBoardId]')[0];

                    if (t.itemid == "ib1" && radioIB1.getValue() == true) {
                        textfield.disable();
                        Ext.ComponentQuery.query('hiddenfield[name=IsCompany]')[0].setValue(true);
                        Ext.ComponentQuery.query('hiddenfield[name=IsIBCompanyName]')[0].setValue(true);
                        Ext.ComponentQuery.query('hiddenfield[name=IsFollowLater]')[0].setValue(false);
                    }
                    else if (t.itemid == "ib2" && radioIB2.getValue() == true) {
                        textfield.disable();
                        var isNotApp = Ext.ComponentQuery.query('hiddenfield[name=IsCompany]')[0].setValue(false);
                        Ext.ComponentQuery.query('hiddenfield[name=IsIBCompanyName]')[0].setValue(false);
                        var isGiveName = Ext.ComponentQuery.query('hiddenfield[name=IsFollowLater]')[0].setValue(true);
                    }
                    else if (t.itemid == "informationBoardIdRadio" && radioIB3.getValue() == true) {
                        textfield.enable();
                        var isNotApp = Ext.ComponentQuery.query('hiddenfield[name=IsCompany]')[0].setValue(false);
                        Ext.ComponentQuery.query('hiddenfield[name=IsIBCompanyName]')[0].setValue(false);
                        var isGiveName = Ext.ComponentQuery.query('hiddenfield[name=IsFollowLater]')[0].setValue(false);
                    }
                }

            },
            'bookingwizardstep5 radio[name=ContactOnLocationOptions]': {
                change: function (t, n, o, eo) {
                    if (t.checked == true) {
                        var BTNAttendee = Ext.ComponentQuery.query('button[itemid=COLBTNAttendee]')[0];
                        var ContactOnLocType = Ext.ComponentQuery.query('bookingwizardstep5 hiddenfield[itemid="ContactOnLocationType"]')[0];
                        ContactOnLocType.setValue(t.inputValue);
                        if (t.inputValue == 3) {
                            BTNAttendee.enable();
                        }
                        else {
                            BTNAttendee.disable();
                        }
                    }
                }
            },
            'changebookingstatus': {
                afterrender: function () {
                    var bookingId = Ext.ComponentQuery.query('changebookingstatus hidden[itemid=bookingId]')[0].getValue();
                    var bookingTrackingId = Ext.ComponentQuery.query('changebookingstatus hidden[itemid=bookingTrackingId]')[0].getValue();

                    var bookingStatusList = Ext.ComponentQuery.query('changebookingstatus gridpanel[itemid=changebookingstatus]')[0];
                    bookingStatusList.getStore().proxy.setExtraParam('id', bookingId);
                    bookingStatusList.getStore().proxy.setExtraParam('id1', bookingTrackingId);
                    bookingStatusList.getStore().load();
                }
            },
            'changebookingstatus button[action="draft"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional      
                    var grid = Ext.ComponentQuery.query('changebookingstatus gridpanel[itemid=changebookingstatus]')[0];
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
            'changebookingstatus button[action="off"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional      
                    var grid = Ext.ComponentQuery.query('changebookingstatus gridpanel[itemid=changebookingstatus]')[0];
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
                            alldata[i].set('IsOptional2', false);
                            alldata[i].set('StatusId', 1);
                            record.BookingStatusCode = 'OFF';
                            i++;
                        })
                    }
                }
            },
            'changebookingstatus button[action="optional2"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional      
                    var grid = Ext.ComponentQuery.query('changebookingstatus gridpanel[itemid=changebookingstatus]')[0];
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
            'changebookingstatus button[action="onf"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional      
                    var grid = Ext.ComponentQuery.query('changebookingstatus gridpanel[itemid=changebookingstatus]')[0];
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
            'changebookingstatus button[action="optional"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional      
                    var grid = Ext.ComponentQuery.query('changebookingstatus gridpanel[itemid=changebookingstatus]')[0];
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
            'changebookingstatus button[action="tentitive"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                         
                    var grid = Ext.ComponentQuery.query('changebookingstatus gridpanel[itemid=changebookingstatus]')[0];
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
            'changebookingstatus button[action="definete"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional      
                    var grid = Ext.ComponentQuery.query('changebookingstatus gridpanel[itemid=changebookingstatus]')[0];
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
                            alldata[i].set('IsOptional2', false);
                            alldata[i].set('StatusId', 6);
                            record.BookingStatusCode = 'DEF';
                            i++;
                        })
                    }
                }
            },
            'changebookingstatus button[action="saveBookingStatus"]': {
                click: function (t, e, o) {
                    //var resStatusGrid = Ext.ComponentQuery.query('changebookingstatus grid[itemid="reservationStatusGrid"]')[0];
                    var grid = Ext.ComponentQuery.query('changebookingstatus gridpanel[itemid=changebookingstatus]')[0];

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
                    var alldata = grid.getStore().getRange();

                    var gotoStep2 = false;
                    if (alldata.length > 0) {
                        Ext.each(alldata, function (rec) {
                            if (!gotoStep2) gotoStep2 = rec.data.IsOffStatus && rec.data.StatusId > 1;
                            recordsToSend.push(rec.data);
                        });
                    }


                    log('recordsToSend', recordsToSend);




                    var bookingId = me.stepFiveObject.BookingId;
                    if (!Utils.isValid(bookingId)) {
                        bookingId = 0;
                    }
                    var bookingTrackingId = me.stepFiveObject.BookingTrackingId;
                    if (!Utils.isValid(bookingTrackingId)) {
                        bookingTrackingId = 0;
                    }

                    var newObj = new Object();
                    newObj.BookingId = bookingId;
                    newObj.BookingTrackingId = bookingTrackingId;
                    newObj.UpdatedBy = CurrentSessionUserId;
                    newObj.LanguageId = user_language;
                    newObj.ChangeBookingStatusList = Ext.encode(recordsToSend);

                    log('newObj', newObj);


                    Ext.Ajax.request({
                        url: webAPI_path + 'api/booking/SaveBookingStatus',
                        method: 'POST',
                        params: newObj,
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                if (r.data > 0) {
                                    me.stepFiveObject.BookingTrackingId = r.data;
                                    bookingTrackingId = r.data;
                                }
                                me.stepFiveObject.DefaultStatus = r.newBookingStatus;
                                Ext.ComponentQuery.query('[itemid="DefaultStatus"]')[0].setValue(r.newBookingStatus);

                                Utils.LoadBookingInformationForRightPane(bookingId, bookingTrackingId, user_language, 0, Utils.RightPanObj.ReservationId)
                                var obj = {};
                                obj.BookingTrackingId = Utils.RightPanObj.BookingTrackingId
                                obj.BookingId = Utils.RightPanObj.BookingId
                                /*reload step5 if offer*/
                                var stepFiveLayout = Ext.ComponentQuery.query('bookingwizardpanel panel[itemid="stepfive"] > panel')[0];
                                stepFiveLayout.StatusId = 0; /*PV: add correct statusID, if not then 0 is also fine in logic as in not matched need to reload the step specifically in offer state*/
                                isRquiredReloadStep = true;
                                Utils.ActiveStepFromRightPanel(me, obj, 'step5');

                                var c = me.getController('bookingwizard.BookingWizardStep5');
                                if (c.thisController == false) {
                                    c.init();
                                    c.thisController = true;
                                }
                                //c.loadMultiDayLeftPanel();
                                //                                if (gotoStep2) {
                                //                                    var obj = {};
                                //                                    obj.BookingTrackingId = Utils.RightPanObj.BookingTrackingId
                                //                                    obj.BookingId = Utils.RightPanObj.BookingId
                                //                                    /*reload step5 if offer*/
                                //                                    Utils.ActiveStepFromRightPanel(me, obj, 'step5');

                                //                                    var c = me.getController('bookingwizard.BookingWizardStep5');
                                //                                    if (c.thisController == false) {
                                //                                        c.init();
                                //                                        c.thisController = true;
                                //                                    }
                                //                                    //c.loadMultiDayLeftPanel();
                                //                                }
                                //                                else {
                                //                                    Ext.getStore('bookingwizard.RightSide.RequiredActionsListStore').load({
                                //                                        params: {
                                //                                            'languageId': user_language,
                                //                                            'id': me.stepFiveObject.ReservationId
                                //                                        }
                                //                                    });
                                //                                }
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
            }
        });
    },
    loadStore: function () {
        Ext.getStore('configuration.ItemTypeStore').proxy.setExtraParam('id', 13);
        Ext.getStore('configuration.ItemTypeStore').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('configuration.ItemTypeStore').proxy.setExtraParam('limit', 10);
        Ext.getStore('configuration.ItemTypeStore').load();

    },
    loadReservationDetails: function (me) {
        this.loadReservationDetailsForm(me.stepFiveObject);

        var title = 'Booking Confirmation - Step 5 of 6_Title'.l('SC55000');
        var sd = Ext.Date.format(new Date(me.stepFiveObject.StartDate), 'Y-m-d');
        if (Utils.isValid(sd)) {
            title += " - " + sd + " : ";
        }
        var bn = me.stepFiveObject.BookingName;
        if (Utils.isValid(bn)) {
            title += " " + bn;
        }

        var bookingNumber = me.stepFiveObject.BookingNumber;
        if (Utils.isValid(bookingNumber)) {
            title += " <span style='float:right'><span id='spReservationId'>" + bookingNumber + "</span></div>";
        }
        var panel = Ext.ComponentQuery.query('panel[itemid="bookingwizardstep5"]')[0];
        panel.setTitle(title);

        var detailsTitle = "";
        if (Utils.isValid(sd)) {
            detailsTitle += sd + " - ";
        }
        if (Utils.isValid(bn)) {
            detailsTitle += " " + bn + " : ";
        }
        var panelDetails = Ext.ComponentQuery.query('panel[itemid="meetingdetailstable"]')[0];
        panelDetails.setTitle(detailsTitle);

        var statusText = "";
        switch (me.stepFiveObject.StatusId) {
            case 5: //Tentitive => Disable Optional 
                statusText = 'Tentitive'.l('SC55000');
                break;
            case 6: //Def => Disable Optional and Tentitive
                statusText = 'Definite'.l('SC55000');
                break;
            case 7: //Cancel => Disable all
                statusText = 'Cancel'.l('SC55000');
                break;
            case 3: //Optional
                statusText = 'Optional'.l('SC55000');
                break;
            case 10: //Draft
                statusText = 'Draft'.l('SC55000');
                break;
            case 1:
                statusText = 'Off'.l('SC55000');
                break;
            default:
                break;

        }
        panelDetails.setTitle(detailsTitle + statusText);

        //var store = panelDetails.getStore();
        var store = Ext.getStore('bookingwizard.BookingItemsListStepFiveStore');

        var bookingId = 0;
        if (Utils.isValid(me.stepFiveObject.BookingId)) {
            bookingId = me.stepFiveObject.BookingId;
        }

        store.proxy.setExtraParam('id', user_language);
        store.proxy.setExtraParam('id1', bookingId);
        store.proxy.setExtraParam('id2', me.stepFiveObject.BookingTrackingId);

        //        store.on('load', function () {
        //            panelDetails.reconfigure(store);
        //        });

        store.load({
            callback: function (records, o, success) {
                panelDetails.reconfigure(store);
            }
        });
        this.validate(me.stepFiveObject.StatusId);

        Utils.ShowRightPanel(2);
        var bookingId = 0;
        if (Utils.isValid(me.stepFiveObject.BookingId)) {
            bookingId = me.stepFiveObject.BookingId;
        }
        //Utils.LoadBookingInformationForRightPane(bookingId, me.stepFiveObject.BookingTrackingId, user_language);
    },
    loadReservationDetailsForm: function (dataObj) {
        var formBooking = Ext.ComponentQuery.query('form[itemid="bookingdetailsform"]')[0].getForm();
        if (!formBooking)
            return;
        var bookingName = formBooking.findField('BookingName');
        bookingName.setValue(dataObj.BookingName);
        if (Utils.isValid(dataObj.InvoiceDiscountPercentage)) {
            Ext.ComponentQuery.query('[itemid="txtDiscountInv"]')[0].setValue(dataObj.InvoiceDiscountPercentage);
        }
        if (Utils.isValid(dataObj.IndividualId)) {
            Ext.ComponentQuery.query('[itemid="individualId"]')[0].setValue(dataObj.IndividualId);
        }
        //        if (Utils.isValid(dataObj.ContactOnLocation)) {
        //            Ext.ComponentQuery.query('[itemid="selectedContactText"]')[0].setValue(dataObj.ContactOnLocation);
        //            var ContactOnLoc = Ext.ComponentQuery.query('bookingwizardstep5 hiddenfield[itemid="ContactOnLocationId"]')[0];
        //            ContactOnLoc.setValue(dataObj.ContactOnLocationId);
        //        }
        if (Utils.isValid(dataObj.DefaultStatus)) {
            Ext.ComponentQuery.query('[itemid="DefaultStatus"]')[0].setValue(dataObj.DefaultStatus);
        }

        if (Utils.isValid(dataObj.StatusId)) {
            Ext.ComponentQuery.query('[name="StatusId"]')[0].setValue(dataObj.StatusId);
        }

        var t = Ext.ComponentQuery.query('[itemid="extraOnLocationRadioGroup"]')[0];
        if (Utils.isValid(dataObj.ExtraOptionsOnLocation)) {
            t.items.items[dataObj.ExtraOptionsOnLocation - 1].setValue(true);
        }
        else {
            t.items.items[0].setValue(true);
        }

        { // Contact On Location
            var COLocationRadio = Ext.ComponentQuery.query('radiogroup[itemid="ContactOnLocationRadioGroup"]')[0];
            if (Utils.isValid(dataObj.COLBooker)) {
                document.getElementById("COLRDBooker-boxLabelEl").innerHTML = dataObj.COLBooker;
            }
            var BTNAttendee = Ext.ComponentQuery.query('button[itemid=COLBTNAttendee]')[0];
            var ContactOnLocType = Ext.ComponentQuery.query('bookingwizardstep5 hiddenfield[itemid="ContactOnLocationType"]')[0];
            ContactOnLocType.setValue(dataObj.ContactOnLocationType);
            if (dataObj.ContactOnLocationType == 3) {
                COLocationRadio.items.items[2].setValue(true);
                BTNAttendee.enable();
                document.getElementById("COLRDAttendee-boxLabelEl").innerHTML = dataObj.COLAttendee;
                var ContactOnLoc = Ext.ComponentQuery.query('bookingwizardstep5 hiddenfield[itemid="ContactOnLocationId"]')[0];
                ContactOnLoc.setValue(dataObj.ContactOnLocationId);
            }
            else if (dataObj.ContactOnLocationType == 2) {
                COLocationRadio.items.items[1].setValue(true);
                BTNAttendee.disable();
            }
            else {
                COLocationRadio.items.items[0].setValue(true);
                BTNAttendee.disable();
            }

        }
        { // Load meeting type
            var meetingType = formBooking.findField('MeetingTypeId');
            var meetingTypeStore = meetingType.getStore();

            //            meetingTypeStore.on('load', function () {
            //                var myMask = new Ext.LoadMask(Ext.ComponentQuery.query('[itemid="meetingdetailstable"]')[0], { msg: "Please wait..." }).show();
            //                var meetingTypeValue = dataObj.MeetingTypeId;
            //                meetingType.setValue(meetingTypeValue);
            //                setTimeout(function () {
            //                    myMask.hide();
            //                }, 10);
            //            }, this, { single: true });

            meetingTypeStore.load({
                callback: function () {
                    var myMask = new Ext.LoadMask(Ext.ComponentQuery.query('[itemid="meetingdetailstable"]')[0], { msg: "Please wait..." }).show();
                    var meetingTypeValue = dataObj.MeetingTypeId;
                    meetingType.setValue(meetingTypeValue);
                    setTimeout(function () {
                        myMask.hide();
                    }, 10);
                }
            });


        }

        { // Load information board
            var ib = Ext.ComponentQuery.query('[itemid="itemRadioGroup"]')[0];
            var isCompany = dataObj.IsCompany || !(this.stepFiveObject.CompanyId == undefined || this.stepFiveObject.CompanyId == null || this.stepFiveObject.CompanyId == 0);
            var isFollowLater = dataObj.IsFollowLater; //|| !(this.stepFiveObject.IndividualId == undefined || this.stepFiveObject.IndividualId == null || this.stepFiveObject.IndividualId == 0);
            var IsIBCompanyName = dataObj.IsIBCompanyName;
            var informationBoard = dataObj.InformationBoard;
            var textfield = Ext.ComponentQuery.query('textfield[itemid=informationBoardId]')[0];

            if (isFollowLater) {
                ib.items.items[1].setValue(true);
                textfield.disable();
            }
            else if (isCompany && IsIBCompanyName) {
                ib.items.items[0].setValue(true);
                textfield.disable();
            }
            else {
                textfield.enable();
            }

            //            if (!isCompany && !isFollowLater) {
            //                ib.items.items[2].items.items[0].setValue(true);
            //                if (Utils.isValid(informationBoard)) {
            //                    Ext.ComponentQuery.query('[itemid="informationBoardId"]')[0].setValue(informationBoard);
            //                }
            //            }
            //ABove code is commented as error occured "TypeError: ib.items.items[2].items is undefined" while load step5 from sequence

            var ibInformationRadio = Ext.ComponentQuery.query('radio[itemid="informationBoardIdRadio"]')[0];
            Ext.ComponentQuery.query('bookingwizardstep5 hiddenfield[itemid="IsIBCompanyName"]')[0].setValue(IsIBCompanyName);

            if (isFollowLater) {
                ib.items.items[1].setValue(true);
            }
            else if (isCompany) {
                ib.items.items[0].setValue(true);
            }

            if (!isCompany && !isFollowLater) {
                if (ibInformationRadio)
                    ibInformationRadio.setValue(true);

                if (Utils.isValid(informationBoard)) {
                    Ext.ComponentQuery.query('[itemid="informationBoardId"]')[0].setValue(informationBoard);
                }
            }
        }

        { // Load purchase order

            var po = Ext.ComponentQuery.query('[itemid="purchaseOrderGroup"]')[0];
            var IB = Ext.ComponentQuery.query('[itemid="InformationitemRadioGroup"]')[0];
            var isNotApplicable = dataObj.IsPurchaseOrderNotApplicable;
            var isWillBeGivenLater = dataObj.IsPurchaseOrderWillBeGivenLater;
            var IsCom = dataObj.IsCompany;
            var IsCompany = dataObj.IsIBCompanyName;
            var IsFollowLater = dataObj.IsFollowLater;
            var IBName = dataObj.InformationBoard;
            var poNumber = dataObj.PurchaseOrderNumber;


            if (typeof (isNotApplicable) == "undefined" || isNotApplicable) {
                po.items.items[0].setValue(true);
            }
            if (isWillBeGivenLater) {
                po.items.items[1].setValue(true);
            }
            var poText = Ext.ComponentQuery.query('[itemid="purchaseOrdertextId"]')[0];
            if ((typeof (isNotApplicable) != "undefined" && !isNotApplicable) && !isWillBeGivenLater) {
                po.items.items[2].items.items[0].setValue(true);
                poText.setDisabled(false);
                poText.setValue(poNumber);
            }
            else
                poText.setValue(null);

            var IBText = Ext.ComponentQuery.query('[itemid="informationBoardId"]')[0];
            if (IsFollowLater) {
                IB.items.items[1].setValue(true);
            }
            else if (typeof (IsCompany) == "undefined" || IsCompany || (IsCom && (IBName == "" || IBName == null))) {
                IB.items.items[0].setValue(true);
                IBText.setValue(null);
            }
            else if ((typeof (IsCompany) != "undefined" && !IsCompany) && !IsFollowLater) {
                if (!IsCom && (IBName == "" || IBName == null)) {
                    IB.items.items[0].setDisabled(true);
                }
                IB.items.items[2].items.items[0].setValue(true);
                IBText.setDisabled(false);
                IBText.setValue(IBName);
            }
        }

        { // Load payment method
            if (Utils.isValid(dataObj.PaymentMethod)) {
                var paymentMethod = Ext.ComponentQuery.query('[itemid="paymentMethodGroup"]')[0];
                paymentMethod.items.items[dataObj.PaymentMethod - 1].setValue(true);
            }
        }

        { // Load remarks
            var external = formBooking.findField('ExternalRemark');
            external.setValue(dataObj.ExternalRemark)

            var internal = formBooking.findField('InternalRemark');
            internal.setValue(dataObj.InternalRemark)
        }

        /*Added moved code from getstepdata function*/
        var invoiceset = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="invoiceSettingStatusLabel"]')[0];
        if (dataObj.IsMultipleInvoiceSetting) {
            invoiceset.setText('Multiple'.l('SC55000'));
        }
        else {
            invoiceset.setText('Single'.l('SC55000'));
        }

        var objIsCompany = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="ib1"]')[0];
        if (dataObj.CompanyId == undefined || dataObj.CompanyId == null || dataObj.CompanyId == 0) {
            objIsCompany.checked = false;
            objIsCompany.disabled = true;
        } else {
            objIsCompany.disabled = false;
            objIsCompany.checked = true;
        }

        //        var advPayment = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="fieldAdvencePaymentLabel"]')[0];
        //        alert("1" + dataObj.AdvancePayment);
        //        advPayment.setValue(Ext.util.Format.number(dataObj.AdvancePayment, '0,000.00'));


    },
    addInvoiceDiscount: function (discountValue, bId, bTId) {
        log('Data in function', discountValue + '-' + bId + '-' + bTId);
        var bookingId = 0;
        if (Utils.isValid(bId) && bId > 0) {
            bookingId = bId;
        }
        var urlItem = webAPI_path + 'api/booking/CalculateInvoiceDiscountAndVatForBookingItem';

        var obj = new Object;
        obj.id = bookingId;
        obj.id1 = bTId;
        obj.id2 = discountValue;
        obj.id3 = CurrentSessionUserId;
        obj.languageId = user_language;

        /*  $.get(urlItem, { id: bookingId, id1: bTId, id2: discountValue, id3: CurrentSessionUserId, languageId: user_language },*/
        $.get(urlItem, { param: Ext.encode(obj) },
               function (response) {
                   log('response is', response);
                   if (response.success) {
                       //display_alert('MG00000');
                       Utils.LoadBookingInformationForRightPane(bookingId, bTId, user_language);
                       var panelDetails = Ext.ComponentQuery.query('panel[itemid="meetingdetailstable"]')[0];
                       panelDetails.store.reload();
                   } else {
                       var ResultText = response.result;
                       if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                           ResultText = ResultText.l("SP_DynamicCode");
                       Ext.Msg.alert('Error'.l('g'), ResultText);
                   }
               }
               );
    },
    validate: function (bookingStatus) {

        if (bookingStatus == 1 || bookingStatus == 2) { //Quatation or Quatation with date
            /* Disable fields */

            //Status
            this.disableField('fieldStatus');

            // Payment
            this.disableField('paymentMethodGroup');

            // Advance payment
            this.disableField('fieldAdvencePayment');

            // Purchase order
            this.disableField('purchaseOrderGroup');

            // Invoice settings
            this.disableField('fieldInvoiceSettings');
        }
    },
    disableField: function (itemId) {
        var field = Ext.ComponentQuery.query('[itemid="' + itemId + '"]')[0];
        field.setDisabled(true);
    },
    loadStepFiveObject: function (me) {
        /* Check if from Step 4 */
        if (!Utils.isEmpty(Utils.StepFourObj)) {

            me.stepFiveObject = Utils.StepFourObj;

            // Do logic from step four
            log("Utils object", Utils.StepFourObj);
            var isNotApplicable = me.stepFiveObject.IsPurchaseOrderNotApplicable;
            var isWillBeGivenLater = me.stepFiveObject.IsPurchaseOrderWillBeGivenLater;
            var purchaseOrderNumber = me.stepFiveObject.PurchaseOrderNumber;



            me.stepFiveObject.IsPurchaseOrderNotApplicable = isNotApplicable;
            me.stepFiveObject.IsPurchaseOrderWillBeGivenLater = isWillBeGivenLater;
            me.stepFiveObject.PurchaseOrderNumber = purchaseOrderNumber;

            me.checkIfObjectValid(me);

            var objIsCompany = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="ib1"]')[0];
            if (me.stepFiveObject.CompanyId == undefined || me.stepFiveObject.CompanyId == null || me.stepFiveObject.CompanyId == 0) {
                objIsCompany.checked = false;
                objIsCompany.disabled = true;
            } else {
                objIsCompany.disabled = false;
                objIsCompany.checked = true;
            }
        } else {
            // Load from server
            if (me.externalBookingTrackingId > 0 || me.externalBookingId > 0) {// Check if we have reservationId
                if (!Utils.isValid(me.externalBookingTrackingId))
                    me.externalBookingTrackingId = Utils.RightPanObj.BookingTrackingId;

                if (!Utils.isValid(me.externalBookingId))
                    me.externalBookingId = Utils.RightPanObj.BookingId;

                urlItem = webAPI_path + 'api/booking/GetStepData';
                Ext.data.JsonP.request({
                    url: urlItem,
                    type: 'GET',
                    params: {
                        id: user_language,
                        id1: me.externalBookingTrackingId,
                        id2: me.externalBookingId,
                        id3: 5
                    },
                    success: function (response) {
                        me.stepFiveObject = response.data;
                        Utils.RightPanObj.StatusId = me.stepFiveObject.StatusId;
                        log("loaded step object", me.stepFiveObject);
                        me.checkIfObjectValid(me);

                        /*below code moved loadReservationDetailsForm function*/
                        //                        if (response.data.IsMultipleInvoiceSetting) {
                        //                            var invoiceset = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="invoiceSettingStatusLabel"]')[0];
                        //                            invoiceset.setText('Multiple'.l('SC55000'));
                        //                        }

                        //                        var objIsCompany = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="ib1"]')[0];
                        //                        if (me.stepFiveObject.CompanyId == undefined || me.stepFiveObject.CompanyId == null || me.stepFiveObject.CompanyId == 0) {
                        //                            objIsCompany.checked = false;
                        //                            objIsCompany.disabled = true;
                        //                        } else {
                        //                            objIsCompany.disabled = false;
                        //                            objIsCompany.checked = true;
                        //                        }

                        //                        var advPayment = Ext.ComponentQuery.query('bookingwizardstep5 [itemid="fieldAdvencePaymentLabel"]')[0];
                        //                        advPayment.setValue(Ext.util.Format.number(response.data.AdvancePayment, '0,000.00'));
                    },
                    failure: function (response) {
                        //Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                    }
                });
            }
        }


    },
    checkIfObjectValid: function (me) {
        if (!Utils.isEmpty(me.stepFiveObject)) {

            /*Start Update rightpanel*/
            var obj = new Object;
            obj.BookingTrackingId = me.stepFiveObject.BookingTrackingId;
            obj.BookingId = me.stepFiveObject.BookingId;
            obj.ReservationId = me.stepFiveObject.ReservationId;

            Utils.UpdateRightPanObj(obj, 5);
            /*End of update rightpanel*/

            me.loadReservationDetails(me);
            if (me.stepFiveObject.StatusId == 7 || me.stepFiveObject.StatusId == 8 || me.stepFiveObject.StatusId == 9)
                Ext.getCmp('move-prev').setDisabled(true);
            // Utils.UpdateRightPanObj(me.stepFiveObject, 2); //Update R;panel - PV-MM
        }
    },
    searchAttendeeFilter: function () {
        var allAtt = Ext.getStore('bookingwizard.AttendeesPagingStore');
        var indId = Ext.ComponentQuery.query('bookingwizardstep5 hidden[itemid="individualId"]')[0].getValue();
        var searchParam = Ext.ComponentQuery.query('contactonlocationlist textfield[itemid=searchParam]')[0].getValue();

        //for testing
        //indId = 2; 
        allAtt.proxy.setExtraParam('id', indId);
        allAtt.proxy.setExtraParam('languageId', user_language);
        allAtt.proxy.setExtraParam('searchParam', searchParam);
        allAtt.load({});

        var clearIcon = Ext.ComponentQuery.query('[action="clearAttendeeFilter"]')[0];
        clearIcon.show();
    },
    clearsearchAttendeeFilter: function () {
        var allAtt = Ext.getStore('bookingwizard.AttendeesPagingStore');
        var indId = Ext.ComponentQuery.query('bookingwizardstep5 hidden[itemid="individualId"]')[0].getValue();
        var searchParam = Ext.ComponentQuery.query('contactonlocationlist textfield[itemid=searchParam]')[0];
        searchParam.setValue(null);
        //for testing
        //indId = 2; 
        allAtt.proxy.setExtraParam('id', indId);
        allAtt.proxy.setExtraParam('languageId', user_language);
        allAtt.proxy.setExtraParam('searchParam', searchParam.getValue());
        allAtt.load({});

        var clearIcon = Ext.ComponentQuery.query('[action="clearAttendeeFilter"]')[0];
        clearIcon.show();
    },
    selectAttendee: function (rec) {
        var ContactOnLoc = Ext.ComponentQuery.query('bookingwizardstep5 hiddenfield[itemid="ContactOnLocationId"]')[0];
        ContactOnLoc.setValue(rec.AttendeeID);
        //var contactText = Ext.ComponentQuery.query('[itemid="selectedContactText"]')[0];
        //                    var sRadio = Ext.ComponentQuery.query('[itemid="itemRadioSelectContact"]')[0];

        //                    if (sRadio.getValue() == true) { //Get from select combo
        //                        var comboSelectContact = Ext.ComponentQuery.query('[itemid="comboSelectContact"]')[0];
        //                        contactText.setValue(comboSelectContact.getRawValue());
        //                    } else { //get from write combo and text

        //                        var comboWriteContact = Ext.ComponentQuery.query('[itemid="comboWriteContact"]')[0];
        //                        var contactField = Ext.ComponentQuery.query('[itemid="contactField"]')[0];
        //                        contactText.setValue(contactField.getValue() + " - " + comboWriteContact.getRawValue());
        //contactText.setValue(rec.Name + " - " + rec.AttendeesRole);

        //document.getElementById("COLRDAttendee-boxLabelEl").innerHTML = rec.Name + " - " + rec.AttendeesRole;
        var win = Ext.WindowManager.getActive();
        if (win) {
            //close the add window popup
            win.close();
        }
        document.getElementById("COLRDAttendee-boxLabelEl").innerHTML = rec.Name + " - " + rec.AttendeesRole;
    }


});
