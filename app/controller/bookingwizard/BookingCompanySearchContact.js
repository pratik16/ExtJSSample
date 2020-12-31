Ext.define('Regardz.controller.bookingwizard.BookingCompanySearchContact', {
    extend: 'Ext.app.Controller',
    views: ['bookingwizard.CompanySearchContactListWindow', 'bookingwizard.BookingContactListWindow', 'bookingwizard.BookingCompanySearchContactList', 'bookingwizard.BookingCompanyContactList', 'bookingwizard.CompanyContactManage'],
    stores: ['bookingwizard.CompanySearchListStore', 'bookingwizard.CompanyContactListStore'],
    companyController: false,
    thisController: false,
    refs: [{
        ref: 'companycontactmanage',
        selector: 'companycontactmanage'
    }, {
        ref: 'bookingcontactlistwindow',
        selector: 'bookingcontactlistwindow'
    }],
    init: function () {
        var me = this;

        this.control({
            'bookingcompanysearchcontactlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //alert('bookingcompanysearchcontactlist');                    
                    setDefaultBookingCompany(iRowIdx, 'bookingwizard.CompanySearchListStore');
                }
            },
            'bookingcompanycontactlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    setDefaultBookingCompanyContact(iRowIdx, 'bookingwizard.CompanyContactListStore');
                },
                afterrender: function (t) {
                    var contactName = Ext.ComponentQuery.query('form[itemid="contactInformation"]')[0].getForm().findField('IndividualName').getValue();

                    if (contactName == null || contactName == undefined) {
                        contactName = '';
                    }
                    var filterContactName = Ext.ComponentQuery.query('bookingcompanycontactlist textfield[itemid="fieldFilterIndividual"]')[0];
                    filterContactName.setValue(contactName);
                }
            },
            'bookcompanysearchcontactlistwindow': {
                afterrender: function (t) {
                    try {
                        me.isFilterCompany = false;
                        me.isFilterIndividual = false;
                        var from = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="contactInformation"]')[0];
                        var cId = from.getForm().findField('CompanyId').getValue();
                        var fieldFilterContactsObj = Ext.ComponentQuery.query('textfield[itemid="fieldFilterCompanies"]')[0];

                        /*if filter is set then passed it to by PV for prevent multiple calls from step1*/
                        var searchString = '';
                        if (t.searchString) {
                            searchString = t.searchString;
                        }
                        else {
                            searchString = fieldFilterContactsObj.getValue()
                        }

                    }
                    catch (e) { }

                    var c = me.getController('bookingwizard.BookingCompany');
                    if (c.companyController == false) {
                        c.init();
                        c.companyController = true;
                    }
                }
            },
            'bookcompanysearchcontactlistwindow button[action="selectCompanyContact"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
                    this.SelectCompanyContact();
                }
            },
            'bookingcontactlistwindow button[action="selectIndividual"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
                    this.SelectIndividual(me);
                }
            },
            'button[action="addIndividual"]': {
                click: function () {
                    Ext.create('widget.companycontactmanage', { companyId: 0 }).show();
                }
            },
            'companycontactmanage button[action="saveIndividual"]': {
                click: function () {
                    var formContacts = Ext.ComponentQuery.query('form[itemid="manageCompanyContacts"]')[0].getForm();
                    if (formContacts.isValid()) {
                        var addIndividualObj = formContacts.getValues();

                        var selectedCompnay = Ext.getStore('bookingwizard.CompanySearchListStore').findRecord('Checked', true);

                        if (Utils.isValid(selectedCompnay) && Utils.isValid(selectedCompnay.data)) {
                            var addSimpleIndividualWindow = Ext.WindowMgr.get('companySearchContactWindow');

                            if (Utils.isValid(addSimpleIndividualWindow) && addSimpleIndividualWindow.isVisible()) {

                                addIndividualObj.CompanyId = selectedCompnay.data.CompanyId;

                            } else {
                                addIndividualObj.CompanyId = null;
                            }
                        }
                        formContacts.findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        formContacts.findField('CreatedBy').setValue(CurrentSessionUserId);
                        formContacts.findField('languageId').setValue(user_language);
                        var urlItem = webAPI_path + 'api/individual/AddIndividual';
                        formContacts.submit({
                            //Ext.getCmp('manageCompany').getForm().submit({
                            url: urlItem,
                            type: 'POST',
                            waitMsg: 'save_data_message'.l('g'),
                            params: addIndividualObj,
                            success: function (form, response) {
                                var r = response.result;
                                if (r.success == true) {
                                    me.getCompanycontactmanage().close();
                                    //Ext.getStore('bookingwizard.CompanyContactListStore').load();

                                    var formType = Ext.ComponentQuery.query('bookcompanysearchcontactlistwindow [itemid="FormType"]')[0];
                                    if (!Utils.isValid(formType))
                                        formType = Ext.ComponentQuery.query('bookingcontactlistwindow [itemid="FormType"]')[0];

                                    formType.setValue(11);

                                    var IndividualId = r.data[0];

                                    var contactName = addIndividualObj.FirstName + " " + addIndividualObj.LastName;
                                    var filterContactName = Ext.ComponentQuery.query('bookingcompanycontactlist textfield[itemid="fieldFilterIndividual"]')[0];
                                    filterContactName.setValue(contactName);
                                    Utils.ManageContact(1, addIndividualObj.CompanyId, '', Number(IndividualId), contactName);
                                }
                            },
                            failure: function (form, response) {
                                r = response.result;
                                console.log(response);
                                if (r.success == false) {
                                    Ext.MessageBox.show({
                                        title: 'Error'.l('SC51120'),
                                        msg: 'Duplicate individual'.l('SC51120'),
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                }
                            }
                        });
                    } else {
                        console.log('Is invalid');
                    }
                }
            },
            'button[action="searchCompanyButtonAction"]': {
                click: function () {
                    this.FilterCompanies();
                }
            },
            'button[action="searchIndividualButtonAction"]': {
                click: function () {
                    me.FilterIndividuals();
                }
            },
            'bookingcompanysearchcontactlist textfield[itemid="fieldFilterCompanies"]': {
                render: function (cmp) {
                    cmp.getEl().on('keypress', function (e) {
                        if (e.getKey() == e.ENTER) {
                            me.FilterCompanies();
                        }
                    });
                },
                change: function (field, newVal, oldVal) {
                    if (newVal.length > 2) {
                        me.FilterCompanies();
                    }
                }
            },
            'textfield[itemid="fieldFilterIndividual"]': {
                render: function (cmp) {
                    cmp.getEl().on('keypress', function (e) {
                        if (e.getKey() == e.ENTER) {
                            me.FilterIndividuals();
                        }
                    });
                }
            },
            '[itemid="radioAgency"]': {
                change: function (t, e, o) {
                    if (e) { //Checked
                        var btnSearchCompanyAgency = Ext.ComponentQuery.query('[itemid="btnSearchCompanyAgency"]')[0];
                        btnSearchCompanyAgency.setDisabled(true);
                    }

                }
            },
            '[itemid="radioAgencySelectCompany"]': {
                change: function (t, e, o) {
                    if (e) { //Checked
                        var btnSearchCompanyAgency = Ext.ComponentQuery.query('[itemid="btnSearchCompanyAgency"]')[0];
                        btnSearchCompanyAgency.setDisabled(false);
                    }
                }
            },
            'companycontactmanage checkbox[name="NoEmail"]': {
                change: function (t, n, o) {//this, new, old
                    var mainEmailTextField = Ext.ComponentQuery.query('companycontactmanage textfield[name="Email"]')[0];
                    if (n == true)
                        mainEmailTextField.disable();
                    else
                        mainEmailTextField.enable();
                }
            }
        });
    },
    SelectCompanyContact: function () {
        var obj;
        try {
            var itemNo = Ext.ComponentQuery.query('[itemid=ItemNo]')[0].getValue();
            var fromAgency = false;
            var exit = false;
            //log('itemno is', itemNo);
            if (itemNo == '') {

                var location = Ext.ComponentQuery.query('[itemid="itemCompanySearchContactWindow"]')[0];
                fromAgency = location.FromAgency;

            }
            var selectedCompnay = Ext.getStore('bookingwizard.CompanySearchListStore').findRecord('Checked', true);
            var selectedCompnayContact = Ext.getStore('bookingwizard.CompanyContactListStore').findRecord('Checked', true);
            if (itemNo == 2) { //From step 5 column 2
                var companyId2 = Ext.ComponentQuery.query('[itemid="CompanyId2"]')[0];
                var contactId2 = Ext.ComponentQuery.query('[itemid="ContactId2"]')[0];
                companyId2.setValue(selectedCompnay.data.CompanyId);
                contactId2.setValue(selectedCompnayContact.data.IndividualId);

                var CompanyName2 = Ext.ComponentQuery.query('[itemid="CompanyName2"]')[0];
                var ContactName2 = Ext.ComponentQuery.query('[itemid="ContactName2"]')[0];
                CompanyName2.setValue(selectedCompnay.data.CompanyName);
                ContactName2.setValue(selectedCompnayContact.data.IndividualName);

                exit = true;
                var w = Ext.WindowManager.get('companySearchContactWindow');
                w.hide();
                Ext.ComponentQuery.query('[itemid="invoicesettingslist2"]')[0].enable();
            }
            if (itemNo == 3) {//From step 5 column 3


                var companyId3 = Ext.ComponentQuery.query('[itemid="CompanyId3"]')[0];
                var contactId3 = Ext.ComponentQuery.query('[itemid="ContactId3"]')[0];
                companyId3.setValue(selectedCompnay.data.CompanyId);
                contactId3.setValue(selectedCompnayContact.data.IndividualId);

                var CompanyName3 = Ext.ComponentQuery.query('[itemid="CompanyName3"]')[0];
                var ContactName3 = Ext.ComponentQuery.query('[itemid="ContactName3"]')[0];
                CompanyName3.setValue(selectedCompnay.data.CompanyName);
                ContactName3.setValue(selectedCompnayContact.data.IndividualName);

                exit = true;
                var w = Ext.WindowManager.get('companySearchContactWindow');
                w.hide();
                Ext.ComponentQuery.query('[itemid="invoicesettingslist3"]')[0].enable();

            }
        } catch (e) {

        }

        if (exit)
            return;

        var win = Ext.WindowManager.getActive();
        if (win) { win.close(); }
        var ctrl = _currentApp.getController('bookingwizard.BookingWizardStep1');
        ctrl.FilterAppliedIndividual = true;
        ctrl.FilterApplied = true;
        if (!fromAgency) {
            var selectedCompnay = Ext.getStore('bookingwizard.CompanySearchListStore').findRecord('Checked', true);
            var selectedCompnayContact = Ext.getStore('bookingwizard.CompanyContactListStore').findRecord('Checked', true);
            if (selectedCompnay != null && typeof selectedCompnay != undefined) {
                if (itemNo == '') {
                    Ext.getCmp('lblSelectedCompany').setValue(selectedCompnay.data.CompanyName);
                    //Ext.getCmp('intakeNotes').getForm().findField('bookingwizard').setValue(selectedCompnay.data.CompanyName);
                    var fieldSetAgency = Utils.getFirstComp(Ext.ComponentQuery.query('fieldset[itemid="itemAgencyFieldSet"]'));
                    if (Utils.isValid(fieldSetAgency)) {
                        var isAgency = selectedCompnay.data.IsAgency;

                        if (Utils.isValid(isAgency) && isAgency) {
                            fieldSetAgency.setDisabled(false);
                        } else {
                            fieldSetAgency.setDisabled(true);
                        }
                    }
                    Ext.getCmp('contactInformation').getForm().findField('CompanyId').setValue(selectedCompnay.data.CompanyId);
                    Ext.getCmp('contactInformation').getForm().findField('CompanyName').setValue(selectedCompnay.data.CompanyName);
                    if (Ext.getCmp('bookingInformation').getForm().findField('BookingName').getValue() == '')
                        Ext.getCmp('bookingInformation').getForm().findField('BookingName').setValue(selectedCompnay.data.CompanyName);
                } else if (itemNo == '2') {
                    obj = Ext.ComponentQuery.query('[itemid=CompanyName2]')[0];
                    obj.setValue(selectedCompnay.data.CompanyName);
                    obj = Ext.ComponentQuery.query('[itemid=CompanyId2]')[0];
                    obj.setValue(selectedCompnay.data.CompanyId);
                    Ext.ComponentQuery.query('[itemid="invoicesettingslist2"]')[0].enable();
                } else if (itemNo == '3') {
                    obj = Ext.ComponentQuery.query('[itemid=CompanyName3]')[0]
                    obj.setValue(selectedCompnay.data.CompanyName);
                    obj = Ext.ComponentQuery.query('[itemid=CompanyId3]')[0];
                    obj.setValue(selectedCompnay.data.CompanyId);
                    Ext.ComponentQuery.query('[itemid="invoicesettingslist3"]')[0].enable();
                }
            }
            else {
                if (itemNo == '') {
                    Ext.getCmp('lblSelectedCompany').setValue('');
                    Ext.getCmp('contactInformation').getForm().findField('CompanyId').setValue(0);
                    Ext.getCmp('contactInformation').getForm().findField('CompanyName').setValue('');
                } else if (itemNo == '2') {
                    obj = Ext.ComponentQuery.query('[itemid=CompanyName2]')[0];
                    obj.setValue('');
                    obj = Ext.ComponentQuery.query('[itemid=CompanyId2]')[0];
                    obj.setValue(0);
                } else if (itemNo == '3') {
                    obj = Ext.ComponentQuery.query('[itemid=CompanyName3]')[0]
                    obj.setValue('');
                    obj = Ext.ComponentQuery.query('[itemid=CompanyId3]')[0]
                    obj.setValue(0);
                }
            }

            if (selectedCompnayContact != null && typeof selectedCompnayContact != undefined) {
                if (itemNo == '') {
                    Ext.getCmp('lblSelectedCompanyContact').setValue(selectedCompnayContact.data.IndividualName);
                    var phoneField = Ext.getCmp('contactInformation').getForm().findField('ContactPhoneNumber');
                    var PhoneType = Ext.getCmp('bookingInformation').getForm().findField('PhoneType').getValue();
                    if (Utils.isValid(selectedCompnayContact.data.Phone) && Utils.isValid(phoneField) && PhoneType == 'Phone') {
                        phoneField.setValue(selectedCompnayContact.data.Phone);
                    }
                    else if (Utils.isValid(selectedCompnayContact.data.Direct) && Utils.isValid(phoneField) && PhoneType == 'Direct') {
                        phoneField.setValue(selectedCompnayContact.data.Direct);
                    }
                    else if (Utils.isValid(selectedCompnayContact.data.Mobile) && Utils.isValid(phoneField) && PhoneType == 'Mobile') {
                        phoneField.setValue(selectedCompnayContact.data.Mobile);
                    }
                    else {
                        phoneField.markInvalid('');
                        phoneField.setValue('');
                    }

                    Ext.getCmp('contactInformation').getForm().findField('IndividualId').setValue(selectedCompnayContact.data.IndividualId);
                    Ext.getCmp('contactInformation').getForm().findField('IndividualName').setValue(selectedCompnayContact.data.IndividualName);
                } else if (itemNo == '2') {
                    obj = Ext.ComponentQuery.query('[itemid=ContactId2]')[0];
                    obj.setValue(selectedCompnayContact.data.IndividualId);
                    obj = Ext.ComponentQuery.query('[itemid=ContactName2]')[0];
                    obj.setValue(selectedCompnayContact.data.IndividualName);
                    Ext.ComponentQuery.query('[itemid="invoicesettingslist2"]')[0].enable();
                } else if (itemNo == '3') {
                    obj = Ext.ComponentQuery.query('[itemid=ContactId3]')[0];
                    obj.setValue(selectedCompnayContact.data.IndividualId);
                    obj = Ext.ComponentQuery.query('[itemid=ContactName3]')[0];
                    obj.setValue(selectedCompnayContact.data.IndividualName);
                    Ext.ComponentQuery.query('[itemid="invoicesettingslist3"]')[0].enable();
                }
            }
            else {
                if (itemNo == '') {
                    Ext.getCmp('lblSelectedCompanyContact').setValue('');
                    Ext.getCmp('contactInformation').getForm().findField('IndividualId').setValue(0);
                    Ext.getCmp('contactInformation').getForm().findField('IndividualName').setValue('');
                } else if (itemNo == '2') {
                    obj = Ext.ComponentQuery.query('[itemid=ContactName2]')[0];
                    obj.setValue('');
                    obj = Ext.ComponentQuery.query('[itemid=ContactId2]')[0];
                    obj.setValue(0);
                } else if (itemNo == '3') {
                    obj = Ext.ComponentQuery.query('[itemid=ContactName3]')[0];
                    obj.setValue('');
                    obj = Ext.ComponentQuery.query('[itemid=ContactId3]')[0];
                    obj.setValue(0);
                }
            }
            Utils.loadIntakeNoteData();
        } else { //From Agency
            //  log('agency');            
            var selectedCompnay = Ext.getStore('bookingwizard.CompanySearchListStore').findRecord('Checked', true);
            var selectedCompnayContact = Ext.getStore('bookingwizard.CompanyContactListStore').findRecord('Checked', true);

            // log('selected companuy', selectedCompnay);
            //  log('selected contact', selectedCompnayContact);

            if (Utils.isValid(selectedCompnay)) {
                Ext.getCmp('agencySettings').getForm().findField('AgencyCompanyId').setValue(selectedCompnay.data.CompanyId);

                var agencyFormWin = Ext.getCmp('agencySettingsWin');
                if (Utils.isValid(agencyFormWin))
                    agencyFormWin.getForm().findField('AgencyCompanyId').setValue(selectedCompnay.data.CompanyId);

                Ext.ComponentQuery.query('[itemid="radioAgencySelectCompany"]')[0].boxLabelEl.update(selectedCompnay.data.CompanyName);

                if (Utils.isValid(agencyFormWin))
                    Ext.ComponentQuery.query('companyagencywindow radiofield[itemid="radioAgencySelectCompany"]')[0].boxLabelEl.update(selectedCompnay.data.CompanyName);

                var OtherAgencyCompanyId = Utils.getFirstComp(Ext.ComponentQuery.query('hidden[name="OtherAgencyCompanyId"]'));
                OtherAgencyCompanyId.setValue(selectedCompnay.data.CompanyId);
            }

            if (Utils.isValid(selectedCompnayContact)) {
                Ext.getCmp('agencySettings').getForm().findField('AgencyIndividualId').setValue(selectedCompnayContact.data.IndividualId);
                var agencyFormWin = Ext.getCmp('agencySettingsWin');
                if (Utils.isValid(agencyFormWin))
                    agencyFormWin.getForm().findField('AgencyIndividualId').setValue(selectedCompnayContact.data.IndividualId);
            }
            //log('AgencyCompanyId', Ext.getCmp('agencySettings').getForm().findField('AgencyCompanyId').getValue());
            //log('Indv ', Ext.getCmp('agencySettings').getForm().findField('AgencyIndividualId').getValue());
        }
        var compContactPhoneField = Ext.getCmp('contactInformation').getForm().findField('ContactPhoneNumber');
        compContactPhoneField.focus();
    },
    SelectIndividual: function (me) {
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
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
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
                            Ext.Msg.alert('Error'.l('g'), ResultText)
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

    },
    FilterCompanies: function () {
        var formType = Ext.ComponentQuery.query('bookcompanysearchcontactlistwindow [itemid="FormType"]')[0];
        log('FilterCompanies' + '-' + new Date().getTime(), 'formType.value:' + formType.value + 'isFilterCompany:' + this.isFilterCompany);
        if (formType.value != 11 || this.isFilterCompany) {
            this.isFilterIndividual = false;
            var fieldFilterContactsObj = Ext.ComponentQuery.query('textfield[itemid="fieldFilterCompanies"]');
            var fieldFilterContacts = ((fieldFilterContactsObj.length > 0) ? fieldFilterContactsObj[0] : null);
            var cId = 0;
            var from = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="contactInformation"]')[0];
            if (from != null)
                cId = from.getForm().findField('CompanyId').getValue();
            if (Utils.isValid(fieldFilterContacts)) {
                Utils.MangageCompanyContact(1, Number(cId), fieldFilterContacts.getValue(), 0, '', true, true);
            }
        } else {
            formType.setValue(1);
            this.isFilterCompany = true;
        }
    },
    FilterIndividuals: function () {
        log("FilterIndividuals" + '-' + new Date().getTime());
        var isCompanySearchWindow = true;
        var formType = Ext.ComponentQuery.query('bookcompanysearchcontactlistwindow [itemid="FormType"]')[0];
        if (formType == undefined || formType == null) {
            formType = Ext.ComponentQuery.query('bookingcontactlistwindow [itemid="FormType"]')[0];
            isCompanySearchWindow = false;
        }

        if (formType == undefined || formType == null || formType.value != 11 || this.isFilterIndividual) {
            this.isFilterIndividual = false;
            var fieldFilterIndividualObj = Ext.ComponentQuery.query('textfield[itemid="fieldFilterIndividual"]');
            var fieldFilterIndividual = ((fieldFilterIndividualObj.length > 0) ? fieldFilterIndividualObj[0] : null);
            if (Utils.isValid(fieldFilterIndividual)) {
                var companyId = Ext.getCmp('contactInformation').getForm().findField('CompanyId');
                if (companyId == null || companyId == undefined)
                    companyId = 0;
                else
                    companyId = companyId.value;

                var biForm = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="bookingInformation"]')[0];

                if (biForm)
                    var biCompanyId = biForm.getForm().findField('CompanyId').getValue();

                if (companyId == "" || companyId != biCompanyId)
                    companyId = Number(biCompanyId) > 0 ? Number(biCompanyId) : 0;

                Utils.ManageContact(1, isCompanySearchWindow ? companyId : 0, '', 0, fieldFilterIndividual.getValue(), true);
            }
        } else {
            formType.setValue(1);
            this.isFilterIndividual = true;
        }
    }
});