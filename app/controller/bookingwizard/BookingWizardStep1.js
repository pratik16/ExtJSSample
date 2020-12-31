Ext.define('Regardz.controller.bookingwizard.BookingWizardStep1', {
    extend: 'Ext.app.Controller',

    views: ['bookingwizard.BookingWizardStep1', 'bookingwizard.BookingWizardInfoPanel'], //, 'bookingwizard.InvoiceSettings'
    stores: ['bookingwizard.ReservationDetails', 'bookingwizard.CompanySearchListStore', 'bookingwizard.CompanyContactListStore'],

    BookingCompanySearchContactController: false,
    FilterApplied: false,
    FilterAppliedIndividual: false,
    reservationId: null,
    noBookingFound: null,
    newBookingItems: null,
    thisController: false,
    fromCustomerNewBooking: false,
    init: function () {
        var me = this;
        me.initialTimeStore = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="starttimeid"]')[0].store;
        this.control({
            'combo[name="LocationName"]': {
                change: function (field, newVal, oldVal) {
                    var bookingInformationForm = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="bookingInformation"]')[0].getForm();
                    bookingInformationForm.findField('Distance').setDisabled(false);
                    if (Utils.isValid(newVal)) {
                        if (field.rawValue != newVal && newVal > 0) {
                            bookingInformationForm.findField('Distance').setDisabled(true);
                        }
                    }
                }
            },
            'bookingwizardstep1': {
                afterrender: function (t) {
                    var contactInformationForm = Ext.getCmp('contactInformation').getForm();
                    var agencySettingsForm = Ext.getCmp('agencySettings').getForm();
                    var bookingInformationForm = Ext.getCmp('bookingInformation').getForm();

                    contactInformationForm.reset();
                    agencySettingsForm.reset();
                    bookingInformationForm.reset();

                    Ext.getCmp('move-next').setText('Next'.l('w'));

                    //bookingInformation
                    var form = Ext.ComponentQuery.query('bookingwizardstep1 form[itemid="bookingInformation"]')[0].getForm();


                    var s = Ext.Date.parse(Utils.BookingObject.StartDate, 'c');
                    var StartTime = Ext.util.Format.date(s, "H:i");

                    var e = Ext.Date.parse(Utils.BookingObject.EndDate, 'c');
                    var EndTime = Ext.util.Format.date(e, "H:i");


                    var StartDate = Ext.util.Format.date(Utils.BookingObject.StartDate, usr_dateformat);
                    var EndDate = Ext.util.Format.date(Utils.BookingObject.EndDate, usr_dateformat);

                    //------
                    form.findField('StartDate').setValue(StartDate);
                    form.findField('EndDate').setValue(EndDate);
                    form.findField('NumberOfPeople').setValue(Utils.BookingObject.NumberOfPeople);


                    var startTime = Ext.ComponentQuery.query('[itemid="bookingInformation"]')[0].getForm().findField('StartTime');
                    var startTimeStore = startTime.getStore();


                    startTimeStore.on('load', function () {
                        var startTimeJson = StartTime;
                        //log('startTimeJson', startTimeJson);
                        var selected = startTimeStore.find('disp', startTimeJson);
                        startTime.setValue(startTimeStore.getAt(selected));

                    });

                    var sts = startTimeStore.load();

                    var endTime = form.findField('EndTime');
                    var endTimeStore = endTime.getStore();
                    endTimeStore.on('load', function () {
                        // console.log(endTimeStore);
                        var endTimeJson = EndTime;
                        var selectedEnd = endTimeStore.find('disp', endTimeJson);
                        endTime.setValue(endTimeStore.getAt(selectedEnd));
                    });

                    var stsEnd = endTimeStore.load();
                    form.findField('LocationName').setValue(Utils.BookingObject.LocationName);

                    var roomSetupTable = form.findField('RoomSetupId');
                    var roomSetupStore = roomSetupTable.getStore();

                    if (me.newBookingItems != null) {
                        /*Add new booking pre-load information from outer modules*/
                        /*Company Name*/
                        var i = me.newBookingItems;
                        if (i.CompanyId && i.CompanyId > 0) {
                            Ext.getCmp('contactInformation').getForm().findField('CompanyId').setValue(i.CompanyId);
                            Ext.getCmp('lblSelectedCompany').setValue(i.CompanyName);
                        }
                        if (i.CompanyName && i.CompanyName.length > 0) {
                            Ext.getCmp('contactInformation').getForm().findField('CompanyName').setValue(i.CompanyName);
                        }
                        var contactNumber;
                        if (i.Mobile && i.Mobile.length > 0)
                            contactNumber = i.Mobile;
                        else if (i.Direct && i.Direct.length > 0)
                            contactNumber = i.Direct;
                        else if (i.Phone && i.Phone.length > 0)
                            contactNumber = i.Phone;

                        Ext.getCmp('contactInformation').getForm().findField('ContactPhoneNumber').setValue(contactNumber);

                        if (i.IndividualId && i.IndividualId > 0) {
                            Ext.getCmp('contactInformation').getForm().findField('IndividualId').setValue(i.IndividualId);
                            Ext.getCmp('lblSelectedCompanyContact').setValue(i.IndividualName);
                        }

                        //var individualNameField = Ext.getCmp('lblSelectedCompanyContact');

                        if (i.IndividualName && i.IndividualName.length > 0) {
                            //individualNameField.setValue(i.IndividualName);

                            var bigIndividualField = Utils.getFirstComp(Ext.ComponentQuery.query('textfield[name="IndividualName"]'));
                            if (Utils.isValid(bigIndividualField)) {
                                bigIndividualField.setValue(i.IndividualName);
                            }
                        }
                        me.newBookingItems = null; //once information load object would be null or it will load again from other section too...
                        Ext.getCmp('contactInformation').getForm().findField('ContactPhoneNumber').focus();
                    }
                    /*end of pre-load information*/

                    //    Utils.BookingObject = null; //once information load object would be null or it will load again from other section too...
                }
            },
            'bookingwizardstep1 textfield[itemid="txtCompanyName"]': {
                //change: function (field, newVal, oldVal) {
                keyup: function (t, e, eOpt) {
                    var newVal = t.getValue();

                    //                    if (this.fromCustomerNewBooking) {
                    //                        this.fromCustomerNewBooking = false;
                    //                        return;
                    //                    }
                    //if (this.noBookingFound != null && this.noBookingFound > 0) return;
                    if (newVal.length > 2 && !this.FilterApplied) {
                        var c = me.getController('bookingwizard.BookingCompanySearchContact');
                        if (c.thisController == false) {
                            c.init();
                            c.thisController = true;
                        }

                        Ext.create('widget.bookcompanysearchcontactlistwindow', { searchString: newVal });
                        //Process the store data
                        //                        var companyListStore = Ext.getStore('bookingwizard.CompanySearchListStore');
                        //                        companyListStore.proxy.setExtraParam('filter', newVal);
                        //                        companyListStore.proxy.setExtraParam('searchParam', newVal);
                        //                        companyListStore.load();
                        //Get the typed filter and put in the field from window
                        var filterBehindFieldObj = Ext.ComponentQuery.query('bookingwizardstep1 textfield[itemid="txtCompanyName"]');
                        var filterBehindField = ((filterBehindFieldObj.length > 0) ? filterBehindFieldObj[0] : null);
                        var fieldFilterContactsObj = Ext.ComponentQuery.query('textfield[itemid="fieldFilterCompanies"]');
                        var fieldFilterContacts = ((fieldFilterContactsObj.length > 0) ? fieldFilterContactsObj[0] : null);
                        fieldFilterContacts.setValue(filterBehindField.getValue());
                        this.FilterApplied = true;
                    } else {
                        this.FilterApplied = false;
                    }
                }
            },
            'bookingwizardstep1 textfield[itemid="txtIndividualName"]': {
                //change: function (field, newVal, oldVal) {
                keyup: function (t, e, eOpt) {
                    var newVal = t.getValue();
                    log('FilterAppliedIndividual', this.FilterAppliedIndividual);
                    //if (this.noBookingFound != null && this.noBookingFound > 0) return;
                    if (newVal.length > 2 && !this.FilterAppliedIndividual) {
                        var c = me.getController('bookingwizard.BookingCompanySearchContact');
                        if (c.thisController == false) {
                            c.init();
                            c.thisController = true;
                        }
                        //if (this.BookingCompanySearchContactController) {
                        this.FilterAppliedIndividual = true;
                        //                            Ext.getStore('bookingwizard.CompanyContactListStore').proxy.setExtraParam('id', 0);
                        //                            Ext.getStore('bookingwizard.CompanyContactListStore').proxy.setExtraParam('limit', 10);
                        //                            Ext.getStore('bookingwizard.CompanyContactListStore').proxy.setExtraParam('searchParam', newVal);
                        //                            var store = Ext.getStore('bookingwizard.CompanyContactListStore').load();

                        Ext.create('widget.bookingcontactlistwindow');
                        var compId = Ext.getCmp('contactInformation').getForm().findField('CompanyId').getValue();
                        var indiId = Ext.getCmp('contactInformation').getForm().findField('IndividualId').getValue();
                        log('compId', compId + "IndiId : " + indiId);

                        Utils.ManageContact(1, null, compId > 0 ? compId : null, indiId > 0 ? indiId : null, newVal, true);


                        var fieldFilterIndividualObj = Ext.ComponentQuery.query('textfield[itemid="fieldFilterIndividual"]');
                        var fieldFilterIndividual = ((fieldFilterIndividualObj.length > 0) ? fieldFilterIndividualObj[0] : null);
                        fieldFilterIndividual.setValue(newVal);


                    } else {
                        this.FilterAppliedIndividual = false;
                    }
                }
            },
            'bookingwizardstep1 button[action="searchCompany"]': {
                click: function (t, e, o) {//t => this, e => event, eo => Eoptional 

                    var c = me.getController('bookingwizard.BookingCompanySearchContact');
                    if (c.thisController == false) {
                        c.init();
                        c.thisController = true;
                    }
                    if (c.thisController) {
                        this.FilterApplied = true;
                        Ext.create('widget.bookcompanysearchcontactlistwindow');

                        /*Added by P*/
                        //Get the typed filter and put in the field from window
                        //                        var filterBehindFieldObj = Ext.ComponentQuery.query('bookingwizardstep1 textfield[itemid="txtCompanyName"]');
                        //                        var filterBehindField = ((filterBehindFieldObj.length > 0) ? filterBehindFieldObj[0] : null);
                        //                        var fieldFilterContactsObj = Ext.ComponentQuery.query('textfield[itemid="fieldFilterCompanies"]');
                        //                        var fieldFilterContacts = ((fieldFilterContactsObj.length > 0) ? fieldFilterContactsObj[0] : null);
                        //                        fieldFilterContacts.setValue(filterBehindField.getValue());
                        /*End by P*/
                        Ext.getStore('bookingwizard.CompanyContactListStore').removeAll();
                        Ext.getStore('bookingwizard.CompanySearchListStore').removeAll();
                        //var addIndButton = Ext.ComponentQuery.query('[itemid="buttonAddIndividual"]')[0];

                        //var filter = Ext.ComponentQuery.query('[itemid="fieldFilterIndividual"]')[0];
                        //var searchIndividualButtonAction = Ext.ComponentQuery.query('[itemid="buttonSearchIndividual"]')[0];

                        //addIndButton.setDisabled(true);
                        //searchIndividualButtonAction.setDisabled(true);
                        //filter.setDisabled(true);

                        var grid = Ext.ComponentQuery.query('[itemid="gridCompanyContact"]')[0];
                        grid.getDockedItems()[3].hide();

                        //Process the store data
                        var companyName = Ext.ComponentQuery.query('bookingwizardstep1 textfield[itemid="txtCompanyName"]')[0].value;

                        var existingCompanyId = Ext.ComponentQuery.query('form[itemid="contactInformation"]')[0].getForm().findField('CompanyId').getValue();
                        var existingIndividualId = Ext.ComponentQuery.query('form[itemid="contactInformation"]')[0].getForm().findField('IndividualId').getValue();
                        var existingIndividualName = Ext.ComponentQuery.query('form[itemid="contactInformation"]')[0].getForm().findField('IndividualName').getValue();

                        if (Utils.isValid(companyName) || Utils.isValid(existingIndividualName)) {
                            var formType = Ext.ComponentQuery.query('bookcompanysearchcontactlistwindow [itemid="FormType"]')[0];
                            formType.setValue(11);
                            this.FilterApplied = true;
                        }

                        var filterBehindFieldObj = Ext.ComponentQuery.query('bookingwizardstep1 textfield[itemid="txtCompanyName"]');
                        var filterBehindField = ((filterBehindFieldObj.length > 0) ? filterBehindFieldObj[0] : null);
                        var fieldFilterContactsObj = Ext.ComponentQuery.query('textfield[itemid="fieldFilterCompanies"]');
                        var fieldFilterContacts = ((fieldFilterContactsObj.length > 0) ? fieldFilterContactsObj[0] : null);
                        fieldFilterContacts.setValue(filterBehindField.getValue());

                        Utils.MangageCompanyContact(1, existingCompanyId, companyName, existingIndividualId, existingIndividualName, false, false);
                    }
                }
            },
            'button[action="searchCompany2"]': {
                click: function (t, e, o) {
                    var c = me.getController('bookingwizard.BookingCompanySearchContact');
                    if (c.thisController == false) {
                        c.init();
                        c.thisController = true;
                    }
                    this.FilterApplied = true;
                    /*store load on after render of that file*/

                    Ext.create('widget.bookcompanysearchcontactlistwindow', { FromAgency: true });

                    Ext.getStore('bookingwizard.CompanyContactListStore').removeAll();

                    var addIndButton = Ext.ComponentQuery.query('[itemid="buttonAddIndividual"]')[0];
                    var filter = Ext.ComponentQuery.query('[itemid="fieldFilterIndividual"]')[0];
                    var searchIndividualButtonAction = Ext.ComponentQuery.query('[itemid="buttonSearchIndividual"]')[0];

                    addIndButton.setDisabled(true);
                    searchIndividualButtonAction.setDisabled(true);
                    filter.setDisabled(true);

                    var grid = Ext.ComponentQuery.query('[itemid="gridCompanyContact"]')[0];
                    grid.getDockedItems()[3].hide();

                    var agencyCompanyId = Ext.ComponentQuery.query('form[itemid="agencyDetails"]')[0].getForm().findField('AgencyCompanyId').getValue();
                    var agencyIndividualId = Ext.ComponentQuery.query('form[itemid="agencyDetails"]')[0].getForm().findField('AgencyIndividualId').getValue();
                    var companyName = Ext.ComponentQuery.query('[itemid="radioAgencySelectCompany"]')[0].boxLabelEl.dom.textContent;

                    var filterCompanyName = Ext.ComponentQuery.query('textfield[itemid="fieldFilterCompanies"]')[0];
                    filterCompanyName.setValue(companyName == "-" ? "" : companyName);

                    var fieldFilterIndividualObj = Ext.ComponentQuery.query('textfield[itemid="fieldFilterIndividual"]');
                    var fieldFilterIndividual = ((fieldFilterIndividualObj.length > 0) ? fieldFilterIndividualObj[0] : null);
                    fieldFilterIndividual.setValue("");

                    Utils.MangageCompanyContact(1, agencyCompanyId, companyName == "-" ? "" : companyName, agencyIndividualId, "", false, false);
                }
            },
            'radiogroup[itemid="itemRadioGroup"]': {
                change: function (field, newValue, oldValue) {
                    var value = field.getValue().Wizard;
                    if (value == 1 || value == 2) {
                        var from = Ext.ComponentQuery.query('[itemid="bookingInformation"]')[0];
                        var startDate = from.getForm().findField('StartDate');
                        var fixDate = new Date('2050-12-31');
                        fixDate = Ext.Date.format(fixDate, 'Y-m-d');
                        if (Ext.Date.format(startDate.getValue(), 'Y-m-d') == fixDate) {
                            startDate.setValue('');
                            from.getForm().findField('StartTime').setValue(null);
                        }
                        startDate.enable();
                        var endDate = from.getForm().findField('EndDate');
                        if (Ext.Date.format(endDate.getValue(), 'Y-m-d') == fixDate) {
                            endDate.setValue('');
                            from.getForm().findField('EndTime').setValue(null);
                        }
                        endDate.enable();
                        var endTime = from.getForm().findField('EndTime');
                        var endTimeStore = endTime.getStore();
                        if (typeof endTimeStore.lastOptions !== "undefined") {
                            // Grab the first value from the store
                            //endTime.setValue(endTimeStore.last().get(endTime.valueField));
                            //endTime.setValue(null);
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
                            var from = Ext.ComponentQuery.query('[itemid="bookingInformation"]')[0];
                            var startDate = from.getForm().findField('StartDate');
                            startDate.setValue('2050-12-31');

                            var startTime = from.getForm().findField('StartTime');
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
                            var endDate = from.getForm().findField('EndDate');
                            endDate.setValue('2050-12-31');

                            var endTime = from.getForm().findField('EndTime');
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
            'button[action="searchIndividual"]': {
                click: function (t, e, o) {//t => this, e => event, eo => Eoptional      
                    var c = me.getController('bookingwizard.BookingCompanySearchContact');
                    this.FilterApplied = true;
                    if (c.thisController == false) {
                        c.init();
                        c.thisController = true;
                    }

                    var contactName = Ext.ComponentQuery.query('form[itemid="contactInformation"]')[0].getForm().findField('IndividualName').getValue();

                    if (contactName == null || contactName == undefined) {
                        contactName = '';
                    }

                    //                    Ext.getStore('bookingwizard.CompanyContactListStore').proxy.setExtraParam('id', 0);
                    //                    Ext.getStore('bookingwizard.CompanyContactListStore').proxy.setExtraParam('limit', 10);
                    //                    Ext.getStore('bookingwizard.CompanyContactListStore').proxy.setExtraParam('searchParam', contactName);
                    //                    Ext.getStore('bookingwizard.CompanyContactListStore').load({
                    //                        callback: function (response, o, success) {
                    //                            var existingIndividualId = Ext.ComponentQuery.query('form[itemid="contactInformation"]')[0].getForm().findField('IndividualId').getValue();
                    //                            if (existingIndividualId != null && existingIndividualId != undefined && existingIndividualId > 0) {
                    //                                var store = Ext.getStore('bookingwizard.CompanyContactListStore');
                    //                                var index = store.findExact('IndividualId', parseInt(existingIndividualId));

                    //                                if (index >= 0) {
                    //                                    store.data.items[index].set('Checked', true);
                    //                                    store.commitChanges();
                    //                                    store.loadData(store.data.items);
                    //                                }
                    //                            }
                    //                        }
                    //                    });

                    //  console.log(store);
                    //var store = Ext.getStore('bookingwizard.CompanyContactListStore').load();
                    //console.log(store);
                    Ext.create('widget.bookingcontactlistwindow');

                    if (Utils.isValid(contactName)) {
                        var formType = Ext.ComponentQuery.query('bookingcontactlistwindow [itemid="FormType"]')[0];
                        formType.setValue(11);
                    }

                    var existingIndividualId = Ext.ComponentQuery.query('form[itemid="contactInformation"]')[0].getForm().findField('IndividualId').getValue();
                    Utils.ManageContact(1, 0, '', existingIndividualId, contactName, true);
                }
            },
            //            'button[action="openInvoiceSettings"]': {
            //                click: function (t, e, o) {//t => this, e => event, eo => Eoptional   
            //                    /*Get Controller*/
            //                    var me = this;
            //                    var cr = me.getController('bookingwizard.BookingInvoiceSettings');
            //                    if (cr.thisController == false) {
            //                        cr.init();
            //                        cr.thisController = true;
            //                    }
            //                    /*Get container*/
            //                    Ext.create('widget.invoicesettings', { BookingId: 304, BookingTrackingId: 0 }).show();
            //                }
            //            },
            'bookingwizardstep1 datefield[itemid="startdateid"]': {
                select: function (t, e, o) {//t => this, e => event, eo => Eoptional  
                    // this.StartDateInsert(t, e, o);/*blur is enough for call */
                },
                blur: function (t, e, o) {
                    var sdValue = new Date(Ext.ComponentQuery.query('bookingwizardstep1 [itemid="startdateid"]')[0].getValue());
                    e = sdValue;
                    this.StartDateInsert(t, e, o);
                    this.Endtimefieldcall(e);
                }

            },
            'timefield[itemid="starttimeid"]': {
                blur: function (t, e, o) {//t => this, e => event, eo => Eoptional     
                    this.Endtimefieldcall(e);
                }
            },
            'bookingwizardstep1 datefield[itemid="enddateid"]': {
                select: function (t, e, o) {
                    this.Endtimefieldcall(e);
                }
            }

        });

    },
    index: function () {
        Ext.getStore('common.PropertyForNamesStore').proxy.setExtraParam('activityCode', 'WIZA001');
        Ext.getStore('common.PropertyForNamesStore').load();
    },
    StartDateInsert: function (t, e, o) {
        var edv = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="enddateid"]')[0];
        var startTime = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="starttimeid"]')[0];
        var startTimeStore = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="starttimeid"]')[0].store;
        //var sdValue = new Date(Ext.ComponentQuery.query('bookingwizardstep1 [itemid="startdateid"]')[0].getValue());
        // for (var i = 0; i < edv.length; i++) {
        if (isNaN(e.getTime())) { edv.setValue(''); return true; }

        edv.setMinValue(e);
        edv.setValue(e);
        startTime.setValue('08:30'); //data.items[index]

        //----- Call to check Company Contract and Trainer Included Flag-------------------------

        var companyId = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="lblCompanyId"]')[0].getValue();
        var chkIsTrainerIncluded = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="IsTrainerIncluded"]')[0];

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
        // }
        //var ed = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="enddateid"]')[0];
        //ed.minValue = e;
        //ed.setValue(e);
    },
    Endtimefieldcall: function (e) {
             
        var edValue = new Date(Ext.ComponentQuery.query('bookingwizardstep1 [itemid="enddateid"]')[0].getValue());
        var sdValue = new Date(Ext.ComponentQuery.query('bookingwizardstep1 [itemid="startdateid"]')[0].getValue());
        // var etObj = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="endtimeid"]')[0];
        //   var stObj = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="starttimeid"]')[0].getValue();
        var difference = sdValue - edValue
        if (difference === 0) {

            var etObj = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="endtimeid"]')[0];
            var stObj = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="starttimeid"]')[0]
            etObj.setValue(null);
            etObj.setMinValue(stObj.getValue());  

           // this.loadInitialTimeStore(etObj);
//            var timeStore = etObj.store.getRange();
//            e = new Date(stObj);
//            var dateToCompare = new Date(e);
//            var newStore = [];
//            for (var i = 0; i < timeStore.length; i++) {
//                var currDate = new Date(timeStore[i].data.date);
//                if (currDate > dateToCompare) {
//                    newStore.push(timeStore[i]);
//                }
//            }
//            etObj.getStore().loadData(newStore);
        }
        else {
            var etObj = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="endtimeid"]')[0];
            this.loadInitialTimeStore(etObj);
        }
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

    /*old init code moved here*/
    reservationDetailLoad: function () {
        var me = this;

        Utils.ShowRightPanel(0);

        try {
            /*@PV: dont know why it was hide in step1 its always showing*/
            // Ext.getCmp('wizard-no-confirmation').getEl().hide();
        }
        catch (e) { return; }

        var w = Ext.getCmp('bookingWiz-win');
        var stepObject = w.stepObject;

        if (Utils.isValid(stepObject)) {
            if (Utils.isValid(stepObject.Number)) {
                if (stepObject.Number == 1) {
                    if (Utils.isValid(stepObject.ReservationId)) {
                        if (stepObject.ReservationId > 0) {
                            this.reservationId = stepObject.ReservationId;
                        }
                    }
                }
            }
        }

        var me = this;
        this.FilterApplied = false;
        //this.reservationId = 365;
        //me.initialTimeStore = Ext.data.StoreManager.lookup(Ext.ComponentQuery.query('bookingwizardstep1 [itemid="endtimeid"]')[0].store);
        me.initialTimeStore = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="starttimeid"]')[0].store;

        if (this.reservationId != null) {
            var reservationStore = Ext.getStore('bookingwizard.ReservationDetails');
            reservationStore.proxy.setExtraParam('id', this.reservationId);
            //This means I get the reservation + booking wizard entries
            reservationStore.proxy.setExtraParam('fromTable', this.noBookingFound == null ? 1 : 3);
            //this.noBookingFound = null;
            //This means I get the reservation + booking tracking entries. In this case we don't have booking tracking yet
            //reservationStore.proxy.setExtraParam('fromTable', 0);

            var BWObj;
            reservationStore.on('load', function () {
                BWObj = store.proxy.reader.jsonData.data;
                BWObj.ResourceId = BWObj.RoomId;

                /*Code by MM*/
                Utils.RightPanObj = BWObj;
                Utils.EnablingRPanleIntakeNote();
                /*End on code by MM*/

                /*Agency setting*/
                if (BWObj.IsAgency == true || BWObj.InvoiceTo > 0) {
                    var fieldSetAgency = Utils.getFirstComp(Ext.ComponentQuery.query('fieldset[itemid="itemAgencyFieldSet"]'));
                    fieldSetAgency.setDisabled(false);
                    Ext.getCmp('agencySettings').getForm().findField('AgencyIndividualId').setValue(BWObj.InvoiceToIndividualId);
                    Ext.getCmp('agencySettings').getForm().findField('AgencyCompanyId').setValue(BWObj.InvoiceTo);
                    if (BWObj.CompanyId != BWObj.InvoiceTo) {
                        Ext.getCmp('agencySettings').getForm().findField('OtherAgencyCompanyId').setValue(BWObj.InvoiceTo);
                        Ext.ComponentQuery.query('[itemid="radioAgencySelectCompany"]')[0].setValue(true);
                        Ext.ComponentQuery.query('[itemid="radioAgencySelectCompany"]')[0].boxLabelEl.update(BWObj.InvoiceToCompanyName);

                        var btnSearchCompanyAgency = Ext.ComponentQuery.query('[itemid="btnSearchCompanyAgency"]')[0];
                        btnSearchCompanyAgency.setDisabled(false);

                    }
                }

                /*Company Name*/
                Ext.getCmp('contactInformation').getForm().findField('CompanyId').setValue(BWObj.CompanyId);
                Ext.getCmp('contactInformation').getForm().findField('CompanyName').setValue(BWObj.CompanyName);
                Ext.getCmp('lblSelectedCompany').setValue(BWObj.CompanyName);
                Ext.getCmp('contactInformation').getForm().findField('ContactPhoneNumber').setValue(BWObj.ContactPhone);

                /*Contact Name*/
                Ext.getCmp('contactInformation').getForm().findField('IndividualId').setValue(BWObj.IndividualId);
                Ext.getCmp('contactInformation').getForm().findField('IndividualName').setValue(BWObj.IndividualName);
                Ext.getCmp('lblSelectedCompanyContact').setValue(BWObj.IndividualName);

                var bookingInformationForm = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="bookingInformation"]')[0].getForm();
                var contactInformationForm = Ext.getCmp('contactInformation').getForm();

                var title = 'Contact Information - Step 1 of 6_Title'.l('SC51000');
                var createdDate = BWObj.CreatedDate.replace("T", " "); // Ext.Date.format(BWObj.CreatedDate, 'Y-m-d H:i:s');                
                Ext.getCmp('contactInformation').getForm().findField('CreatedDate').setValue(createdDate);
                Ext.getCmp('contactInformation').getForm().findField('CreatedBy').setValue(BWObj.CreatedBy);

                var sd = null;
                var ed = null;

                var bookingInformationForm = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="bookingInformation"]')[0].getForm();
                if (BWObj.StartDate != null) {
                    var sd = Ext.Date.format(new Date(BWObj.StartDate), 'Y-m-d');
                    bookingInformationForm.findField('StartDate').setValue(sd);
                }

                if (BWObj.EndDate != null) {
                    var ed = Ext.Date.format(new Date(BWObj.EndDate), 'Y-m-d');
                    bookingInformationForm.findField('EndDate').setValue(ed);
                }



                if (Utils.isValid(sd)) {
                    title += " - " + sd + " : ";
                }
                var bn = BWObj.BookingName;
                if (Utils.isValid(bn)) {
                    title += " " + bn;
                    var bookingName = Ext.getCmp('bookingInformation').getForm().findField('BookingName');
                    bookingName.setValue(bn);
                }

                var reservationId = BWObj.ReservationId;

                if (Utils.isValid(reservationId)) {
                    title += " <span style='float:right'>" + reservationId + "</div>";
                    Ext.getCmp('bookingInformation').getForm().findField('ReservationId').setValue(reservationId);
                }

                bookingInformationForm.findField('BookingTrackingId').setValue(BWObj.BoookingTrackingId);


                var bookingWizardId = BWObj.BookingWizardId;
                if (Utils.isValid(bookingWizardId)) {
                    Ext.getCmp('contactInformation').getForm().findField('BookingWizardId').setValue(bookingWizardId);
                }
                //console.log(BWObj);
                var bookingTrackingId = BWObj.BookingTrackingId;
                if (Utils.isValid(bookingTrackingId)) {
                    Ext.getCmp('bookingInformation').getForm().findField('BookingTrackingId').setValue(bookingTrackingId);
                }


                var panel = Ext.ComponentQuery.query('panel[itemid="bwstep1"]')[0];
                panel.setTitle(title);

                var wizardType = BWObj.Wizard;

                if (Utils.isValid(wizardType)) {
                    var radioG = Ext.ComponentQuery.query('fieldcontainer[itemid="itemRadioGroup"]')[0];
                    //log("radio", radioG);
                    var rdBook = Ext.getCmp("rdBooking");
                    var rdQuotation = Ext.getCmp("rdQuotation");
                    var rdQuotationWithoutDate = Ext.getCmp("rdQuotationWithoutDate");
                    switch (wizardType) {
                        case 1:
                            rdBook.setValue(true);
                            rdQuotation.setValue(false);
                            rdQuotationWithoutDate.setValue(false);
                            break;
                        case 2:
                            rdBook.setValue(false);
                            rdQuotation.setValue(true);
                            rdQuotationWithoutDate.setValue(false);
                            break;
                        case 3:
                            rdBook.setValue(true);
                            rdQuotation.setValue(false);
                            rdQuotationWithoutDate.setValue(true);
                            break;
                        default:
                            rdBook.setValue(true);
                            rdQuotation.setValue(false);
                            rdQuotationWithoutDate.setValue(false);
                            break;
                    }
                    //console.log(radioG);
                }

                var from = Ext.ComponentQuery.query('[itemid="bookingInformation"]')[0];
                var locatioName = from.getForm().findField('LocationName');
                if (BWObj.PropertyId != undefined && BWObj.PropertyId != null)
                    locatioName.setValue(BWObj.PropertyId);
                else
                    locatioName.setValue(BWObj.LocationName);

                {//Distance functionality
                    var distanceName = from.getForm().findField('Distance');
                    var distanceStore = distanceName.getStore();

                    distanceStore.on('load', function () {
                        //console.log('store.proxy.reader.jsonData');
                        //console.log(store.proxy.reader.jsonData);
                        var distance = BWObj.Distance;
                        distanceName.setValue(distance);
                    }, this, { single: true });

                    var distanceS = distanceStore.load();

                }

                {// Dates functionality
                    var startDate = from.getForm().findField('StartDate');
                    //alert(BWObj.StartDate.replace("T", " "));                    
                    if (sd != null)
                        startDate.setValue(sd);

                    var endDate = from.getForm().findField('EndDate');

                    if (ed != null)
                        endDate.setValue(ed);


                    var startTime = Ext.ComponentQuery.query('[itemid="bookingInformation"]')[0].getForm().findField('StartTime');
                    var startTimeStore = startTime.getStore();
                    //log("start time store", startTimeStore);
                    startTimeStore.on('load', function () {
                        /*Error updates on step1 load*/
                        if (BWObj && BWObj.StartTime) {
                            var startTimeJson = BWObj.StartTime.replace(":00", "");
                            var selected = startTimeStore.find('disp', startTimeJson);
                            startTime.setValue(startTimeStore.getAt(selected));
                        }

                    });

                    var sts = startTimeStore.load();

                    var endTime = from.getForm().findField('EndTime');
                    var endTimeStore = endTime.getStore();
                    endTimeStore.on('load', function () {
                        if (BWObj && BWObj.EndTime) {
                            var endTimeJson = BWObj.EndTime.replace(":00", "");
                            var selectedEnd = endTimeStore.find('disp', endTimeJson);
                            endTime.setValue(endTimeStore.getAt(selectedEnd));
                        }


                    });

                    var stsEnd = endTimeStore.load();
                }


                var noOfPeople = from.getForm().findField('NumberOfPeople');
                noOfPeople.setValue(BWObj.NumberOfPeople);

                {
                    var roomSetupTable = from.getForm().findField('RoomSetupId');
                    var roomSetupStore = roomSetupTable.getStore();

                    roomSetupStore.on('load', function () {
                        var roomSetupValue = BWObj.RoomSetupId;
                        roomSetupTable.setValue(roomSetupValue);
                    }, this, { single: true });

                    var roomS = roomSetupStore.load();

                }

                {
                    var meetingType = from.getForm().findField('PropertyFeatureId');
                    var meetingTypeStore = meetingType.getStore();

                    meetingTypeStore.on('load', function () {
                        //console.log('store.proxy.reader.jsonData');
                        //console.log(meetingTypeStore);
                        var meetingTypeValue = BWObj.PropertyFeatureId;
                        meetingType.setValue(meetingTypeValue);
                    }, this, { single: true });

                    meetingTypeStore.load();

                }
                {//Company load

                    var companyStore = Ext.getStore('bookingwizard.CompanySearchListStore');

                    companyStore.proxy.setExtraParam('limit', 0);

                    companyStore.on('load', function () {
                        var companyId = BWObj.CompanyId;
                        //log('BWObj is', BWObj);
                        if (Utils.isValid(companyId)) {
                            //log('Company id is', companyId);
                            var selectedCompany = companyStore.findRecord('CompanyId', companyId);
                            var companyNameField = Ext.getCmp('lblSelectedCompany');
                            //log('selected company is', selectedCompany);

                            //Check if is agency
                            var fieldSetAgency = Utils.getFirstComp(Ext.ComponentQuery.query('fieldset[itemid="itemAgencyFieldSet"]'));
                            if (Utils.isValid(fieldSetAgency)) {
                                var isAgency = selectedCompany.data.IsAgency;
                                if (Utils.isValid(isAgency) && isAgency) {
                                    fieldSetAgency.setDisabled(false);
                                    var bigAgencyField = Utils.getFirstComp(Ext.ComponentQuery.query('textfield[name="accountName"]'));
                                    if (Utils.isValid(bigAgencyField)) {
                                        var accName = BWObj.AccountName;

                                        if (Utils.isValid(accName)) {
                                            bigAgencyField.setValue(accName);

                                            var invoiceToCompanyId = BWObj.InvoiceTo;
                                            // log('Invoice to comp id', invoiceToCompanyId);
                                            if (Utils.isValid(invoiceToCompanyId) && invoiceToCompanyId > 0) {

                                                var invoiceToCompany = companyStore.findRecord('CompanyId', invoiceToCompanyId);
                                                //log('InvoiceToCompany', invoiceToCompany);
                                                Ext.getCmp('agencySettings').getForm().findField('AgencyCompanyId').setValue(invoiceToCompany.data.CompanyId);

                                                Ext.ComponentQuery.query('[itemid="radioAgencySelectCompany"]')[0].setValue(true);
                                                Ext.ComponentQuery.query('[itemid="radioAgencySelectCompany"]')[0].boxLabelEl.update(invoiceToCompany.data.CompanyName);

                                                var contactsStoreAll = Ext.getStore('bookingwizard.CompanyContactListStore');
                                                contactsStoreAll.proxy.setExtraParam('limit', 0);

                                                contactsStoreAll.proxy.setExtraParam('id', BWObj.InvoiceTo);

                                                var agencyIndividualId = BWObj.InvoiceToIndividualId;

                                                if (Utils.isValid(agencyIndividualId) && agencyIndividualId > 0) {
                                                    contactsStoreAll.on('load', function () {
                                                        var selectedIndividual = contactsStoreAll.findRecord('IndividualId', agencyIndividualId);
                                                        if (Ext.getCmp('agencySettings'))
                                                            Ext.getCmp('agencySettings').getForm().findField('AgencyIndividualId').setValue(selectedIndividual.data.IndividualId);
                                                    });
                                                    contactsStoreAll.load();
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    fieldSetAgency.setDisabled(true);
                                }
                            }
                            if (companyNameField)
                                companyNameField.setValue(selectedCompany.data.CompanyName);

                            me.FilterApplied = true;
                            var bigCompanyField = Utils.getFirstComp(Ext.ComponentQuery.query('bookingwizardstep1 textfield[itemid="txtCompanyName"]'));
                            if (Utils.isValid(bigCompanyField)) {
                                bigCompanyField.setValue(selectedCompany.data.CompanyName);
                            }

                            var contactForm = Ext.getCmp('contactInformation').getForm();
                            contactForm.findField('CompanyId').setValue(selectedCompany.data.CompanyId);

                            var from = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="bookingInformation"]')[0];
                            from.getForm().findField('CompanyId').setValue(selectedCompany.data.CompanyId);


                        }
                        else {
                            var bigCompanyField = Utils.getFirstComp(Ext.ComponentQuery.query('bookingwizardstep1 textfield[itemid="txtCompanyName"]'));
                            if (Utils.isValid(bigCompanyField)) {
                                bigCompanyField.setValue(BWObj.CompanyName);
                            }
                        }
                    }, this, { single: true });

                    /*it will load on after render of bookcompanysearchcontactlistwindow page*/
                    // companyStore.load();

                }
                { // Individual load
                    var contactsStore = Ext.getStore('bookingwizard.CompanyContactListStore');
                    if (BWObj.CompanyId > 0) {
                        contactsStore.proxy.setExtraParam('id', BWObj.CompanyId);
                    }
                    contactsStore.on('load', function () {
                        var individualId = BWObj.IndividualId;
                        if (Utils.isValid(individualId)) {
                            //log("store contacts", contactsStore);
                            var selectedIndividual = contactsStore.findRecord('IndividualId', individualId);
                            //log("sel ind", selectedIndividual);
                            var individualNameField = Ext.getCmp('lblSelectedCompanyContact');

                            if (selectedIndividual != null && selectedIndividual.data != null) {
                                individualNameField.setValue(selectedIndividual.data.IndividualName);

                                var bigIndividualField = Utils.getFirstComp(Ext.ComponentQuery.query('textfield[name="IndividualName"]'));
                                if (Utils.isValid(bigIndividualField)) {
                                    bigIndividualField.setValue(selectedIndividual.data.IndividualName);
                                }

                                var from = Utils.getFirstComp(Ext.ComponentQuery.query('bookingwizardstep1 [itemid="bookingInformation"]'));
                                if (Utils.isValid(from)) {
                                    from.getForm().findField('IndividualId').setValue(selectedIndividual.data.IndividualId);
                                }

                                var contactForm = Ext.getCmp('contactInformation').getForm();

                                if (Utils.isValid(selectedIndividual.data.Phone)) {
                                    contactForm.findField('ContactPhoneNumber').setValue(selectedIndividual.data.Phone);
                                }
                                contactForm.findField('IndividualId').setValue(selectedIndividual.data.IndividualId);
                            }
                        }
                        else {
                            var bigIndividualField = Utils.getFirstComp(Ext.ComponentQuery.query('textfield[name="IndividualName"]'));
                            if (Utils.isValid(bigIndividualField)) {
                                bigIndividualField.setValue(BWObj.IndividualName);
                            }
                        }

                    }, this, { single: true });
                    //contactsStore.load();
                }

                if (this.noBookingFound != null && BWObj.RoomId != undefined && BWObj.RoomId != null)
                    Utils.BookingObject = BWObj;
            }, this, { single: true });

            var store = reservationStore.load();
            //console.log(store);

        }
    }
});