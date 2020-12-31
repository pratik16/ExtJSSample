Ext.define('Regardz.controller.bookingwizard.ManageBookingSearch', {
    extend: 'Ext.app.Controller',
    views: ['bookingwizard.BookingSearch', 'operations.windows.inhouse.BookingViewWindow', 'bookingwizard.RightSide.BookingInformation'],
    stores: ['bookingwizard.BookingSearchListStore', 'common.BookingStatusListStore', 'common.PropertyForNamesStore',
     'common.CancellationReasonStore', 'mastervalues.MarketSourceStore', 'common.MeetingTypeStore', 'operations.OperationsInhouseBookingChanges', 
     'operations.OperationsBookingEventItemStore'],
    refs: [{
        ref: 'bookingStatusList',
        selector: '[itemid=bookingStatusList]'
    }],

    init: function () {
        var me = this;
        this.control({
            'bookingrsearch': {
                afterrender: function () {
                    this.ResetSearch();

                    Ext.getStore('common.BookingStatusListStore').proxy.setExtraParam('id', user_language);
                    //Ext.getStore('common.BookingStatusListStore').load({});

                    Ext.getStore('common.MeetingTypeStore').proxy.setExtraParam('id', user_language);
                    Ext.getStore('common.MeetingTypeStore').proxy.setExtraParam('propertyId', 0);
                    //Ext.getStore('common.MeetingTypeStore').load({});

                    Ext.getStore('common.CancellationReasonStore').proxy.setExtraParam('id', user_language);
                    Ext.getStore('common.CancellationReasonStore').load({});

                    var combo = Ext.ComponentQuery.query('bookingrsearch combo[itemid="propertycombo"]')[0];
                    combo.getStore().proxy.setExtraParam('activityCode', 'OPER002');
                    combo.getStore().load();
                },
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'editBookingAction') {
                        me.EditBookingOpen(zRec.data);
                    }
                    else if (fieldName == 'viewBookingAction') {
                        me.ViewBooking(zRec.data);
                    }
                }
            },
            'button[action="searchBooking"]': {
                click: function () {
                    this.CallSearchMethod(me);
                }
            },
            'button[action="resetSearchBooking"]': {
                click: function () {
                    this.CallResetSearchMethod(me);
                }
            },
            //Search booking on enter key - START
            'bookingrsearch textfield[itemid="txtCompanyName"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(me);
                    }
                }
            },
            'bookingrsearch checkbox[itemid="chkCompanyName"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'bookingrsearch datefield[itemid="bookingdate1"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(me);
                    }
                }
            },
            'bookingrsearch datefield[itemid="bookingdate2"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(me);
                    }
                }
            },
            'bookingrsearch textfield[itemid="txtContactName"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(me);
                    }
                }
            },
            'bookingrsearch checkbox[itemid="chkContactSearch"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'bookingrsearch datefield[itemid="arrivaldate1"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(me);
                    }
                }
            },
            'bookingrsearch datefield[itemid="arrivaldate2"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(me);
                    }
                }
            },
            'bookingrsearch textfield[itemid="txtBookingName"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(me);
                    }
                }
            },
            'bookingrsearch checkbox[itemid="chkBookingName"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'bookingrsearch combo[itemid="marketSourcecombo"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'bookingrsearch textfield[itemid="txtBookingId"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(me);
                    }
                }
            },
            'bookingrsearch combo[itemid="propertyFeaturecombo"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'bookingrsearch combo[itemid="propertycombo"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'bookingrsearch combo[itemid="cancellationReasoncombo"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'bookingrsearch textfield[itemid="txtBookedbyPerson"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(me);
                    }
                }
            }
            //Search booking on enter key - END
        });
    },
    CallSearchMethod: function (me) {
        var formData = Ext.ComponentQuery.query('bookingrsearch [itemid=bookingSearch]')[0];

        if (formData.getForm().isValid()) {
            var companyName = formData.getForm().findField('CompanyName').getValue();
            var companyNameSrc = formData.getForm().findField('CompanyNameSrc').getValue();
            companyName = companyName.length > 0 ? (companyNameSrc == true ? '%' + companyName + '%' : companyName + '%') : '';

            var contactName = formData.getForm().findField('Contact').getValue();
            var contactSrc = formData.getForm().findField('ContactSrc').getValue();
            contactName = contactName.length > 0 ? (contactSrc == true ? '%' + contactName + '%' : contactName + '%') : '';

            var bookName = formData.getForm().findField('BookingName').getValue();
            var bookNameSrc = formData.getForm().findField('BookingNameSrc').getValue();
            bookName = bookName.length > 0 ? (bookNameSrc == true ? '%' + bookName + '%' : bookName + '%') : '';

            var bookId = formData.getForm().findField('BookingId').getValue();
            bookId = bookId.length > 0 ? bookId + '%' : '';


            var bookDate1 = formData.getForm().findField('BookingFromDate').getValue();
            var bookDate2 = formData.getForm().findField('BookingToDate').getValue();

            var arrDate1 = formData.getForm().findField('ArrivalFromDate').getValue();
            var arrDate2 = formData.getForm().findField('ArrivalToDate').getValue();

            var statusIds = '';
            var bookingStatusList = me.getBookingStatusList().store.data;
            if (bookingStatusList != null && bookingStatusList.length > 0) {
                for (var i = 0; i < bookingStatusList.length; i++) {
                    if (bookingStatusList.items[i].data.Checked == "1")
                        statusIds += bookingStatusList.items[i].data.BookingStatusId + ",";
                }
            }
            statusIds = statusIds.replace(/\,$/, '');

            var BookedbyPerson = formData.getForm().findField('BookedbyPerson').getValue();
            BookedbyPerson = BookedbyPerson.length > 0 ? ('%' + BookedbyPerson + '%') : '';


            var propertyId = Ext.ComponentQuery.query('bookingrsearch combo[itemid=propertycombo]')[0].getValue();
            var marketSourceId = Ext.ComponentQuery.query('bookingrsearch combo[itemid=marketSourcecombo]')[0].getValue();
            var meetingTypeId = Ext.ComponentQuery.query('bookingrsearch combo[itemid=propertyFeaturecombo]')[0].getValue();
            var cancellationReasonId = Ext.ComponentQuery.query('bookingrsearch combo[itemid=cancellationReasoncombo]')[0].getValue();

            Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('userId', CurrentSessionUserId);
            Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('languageId', user_language);
            Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('companyName', companyName == null ? '' : companyName);
            Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('contactName', contactName == null ? '' : contactName);
            Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('bookingName', bookName == null ? '' : bookName);
            Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('bookingNumber', bookId == null ? '' : bookId);
            Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('BookDate1', bookDate1 == null ? null : bookDate1);
            Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('BookDate2', bookDate2 == null ? null : bookDate2);
            Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('ArrDate1', arrDate1 == null ? null : arrDate1);
            Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('ArrDate2', arrDate2 == null ? null : arrDate2);
            Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('propertyId', propertyId == null ? 0 : propertyId);
            Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('marketSourceId', marketSourceId == null ? 0 : marketSourceId);
            Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('cancellationReasonId', cancellationReasonId == null ? 0 : cancellationReasonId);
            Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('meetingTypeId', meetingTypeId == null ? 0 : meetingTypeId);
            Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('statusIds', statusIds == null ? '' : statusIds);
            Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('BookedbyPerson', BookedbyPerson == null ? '' : BookedbyPerson);

            Ext.getStore('bookingwizard.BookingSearchListStore').load({});
        }
    },
    CallResetSearchMethod: function (me) {
        var formData = Ext.ComponentQuery.query('bookingrsearch [itemid=bookingSearch]')[0];
        if (formData.getForm().isValid()) {
            formData.getForm().findField('CompanyName').setValue('');
            formData.getForm().findField('CompanyNameSrc').setValue('0');
            formData.getForm().findField('BookingName').setValue('');
            formData.getForm().findField('BookingNameSrc').setValue('0');
            formData.getForm().findField('Contact').setValue('');
            formData.getForm().findField('ContactSrc').setValue('0');
            formData.getForm().findField('BookingId').setValue('');
            formData.getForm().findField('BookingFromDate').setValue('');
            formData.getForm().findField('BookingToDate').setValue('');
            formData.getForm().findField('ArrivalFromDate').setValue('');
            formData.getForm().findField('ArrivalToDate').setValue('');
            formData.getForm().findField('PropertyCombo').setValue('0');
            formData.getForm().findField('MarketSourceCombo').setValue('0');
            formData.getForm().findField('PropertyFeatureCombo').setValue('0');
            formData.getForm().findField('ReasonCombo').setValue('0');
            formData.getForm().findField('BookedbyPerson').setValue('');
            Ext.getStore('common.BookingStatusListStore').proxy.setExtraParam('id', user_language);
            Ext.getStore('common.BookingStatusListStore').load({});

            this.ResetSearch();
            return;
        }
    },
    ResetSearch: function () {
        Ext.getStore('bookingwizard.BookingSearchListStore').sorters.clear();
        Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('userId', 0);
        Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('languageId', 0);
        Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('companyName', '');
        Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('contactName', '');
        Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('bookingName', '');
        Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('bookingNumber', '');
        Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('BookDate1', null);
        Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('BookDate2', null);
        Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('ArrDate1', null);
        Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('ArrDate2', null);
        Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('propertyId', null);
        Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('marketSourceId', null);
        Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('cancellationReasonId', null);
        Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('meetingTypeId', null);
        Ext.getStore('bookingwizard.BookingSearchListStore').proxy.setExtraParam('BookedbyPerson', null);

        Ext.getStore('bookingwizard.BookingSearchListStore').load({});
    },

    EditBookingOpen: function (r) {
        //if (r.BookingId > 0) {
        var step = "step6";
        if (r.StepNumber < 5) {
            step = "step" + (r.StepNumber + 1).toString();
        }

        var obj = new Object;
        obj.BookingId = r.BookingId;
        obj.BookingTrackingId = r.BookingTrackingId;
        obj.ReservationId = r.ReservationId;
        obj.Status = r.StatusId;
        obj.StepNumber = r.StepNumber;

        Utils.loadWizardStepsFromOutSide(this, obj, step);
        //}
    },
    ViewBooking: function (r) {
        //if (r.BookingId > 0) {
        Utils.ShowWindow('widget.inhousebookingview', { BookingId: r.BookingId, ReservationId: r.ReservationId });
        var res = Utils.LoadBookingInformationForRightPane(r.BookingId > 0 ? r.BookingId : 0, r.BookingTrackingId > 0 ? r.BookingTrackingId : 0, user_language, 1, r.ReservationId); //paramType=1 for BookingView in popup
        //}
    }
});
