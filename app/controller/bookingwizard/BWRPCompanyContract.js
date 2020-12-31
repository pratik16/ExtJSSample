Ext.define('Regardz.controller.bookingwizard.BWRPCompanyContract', {
    extend: 'Ext.app.Controller',
    views: ['bookingwizard.RightSide.Windows.CompanyContract.CompanyContractWindow', 'bookingwizard.RightSide.Windows.CompanyContract.FixedPackageDetailsWindow',
    'bookingwizard.RightSide.Windows.CompanyContract.FixedPriceItemsWindow', 'bookingwizard.RightSide.Windows.CompanyContract.KickBackDetailsWindow', 'bookingwizard.RightSide.Windows.CompanyContract.CommissionDetailsWindow', 'bookingwizard.RightSide.Windows.CompanyContract.FixedBarDetailsWindow',
    'bookingwizard.RightSide.Windows.CompanyContract.PurchaseConditionsList', 'bookingwizard.RightSide.Windows.CompanyContract.PaymentConditionsList',
    'bookingwizard.RightSide.Windows.CompanyContract.CancelationConditionsList', 'bookingwizard.RightSide.Windows.CompanyContract.FixedRoomPriceWindow'],

    stores: ['bookingwizard.RightSide.Windows.CompanyContract.PurchaseConditionsStore', 'bookingwizard.RightSide.Windows.CompanyContract.PaymentConditionsStore', 'bookingwizard.RightSide.Windows.CompanyContract.CancelationConditionsStore',
    'bookingwizard.RightSide.Windows.CompanyContract.KickBackStore', 'bookingwizard.RightSide.Windows.CompanyContract.FixedPackageDetailsStore', 'bookingwizard.RightSide.Windows.CompanyContract.CommissionDetailsStore', 'bookingwizard.RightSide.Windows.CompanyContract.FixedBarDetailsStore',
    'bookingwizard.RightSide.Windows.CompanyContract.FixedPriceItemsStore', 'bookingwizard.RightSide.Windows.CompanyContract.FixedRoomPriceStore'],

    thisController: false,
    contractObj: {},
    reservationId: null,
    paramCompanyId: null,

    init: function () {
        var me = this;
        me.TimePeriod = 0;
        me.CurrentTab = 0;
        this.control({
            'purchaseconditionslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'fixedbardetailswindow')
                        this.fixedbardetailswindow(zRec);
                    else if (fieldName == 'commissiondetailswindow')
                        this.commissiondetailswindow(zRec);
                    else if (fieldName == 'kickbackdetailswindow')
                        this.kickbackdetailswindow(zRec);
                    else if (fieldName == 'fixedpriceitemswindow')
                        this.fixedpriceitemswindow(zRec);
                    else if (fieldName == 'fixedpackagedetailswindow')
                        this.fixedpackagedetailswindow(zRec);
                    else if (fieldName == 'fixedroompricedetailswindow')
                        this.fixedroompricedetailswindow(zRec);
                }
            },
            'companycontractwindow tabpanel': {
                tabchange: function (tPanel, newCard, oldCard, eOpt) {// tabPanel, newCard, oldCard, eOpts                    
                    if (newCard.name == "nextTab") {
                        me.TimePeriod = 1;
                        me.getContract(me, me.paramCompanyId, 1); // next contract
                    }
                    else if (newCard.name == "previousTab") {
                        me.TimePeriod = -1;
                        me.getContract(me, me.paramCompanyId, -1); // previus contract
                    }
                    else {
                        me.TimePeriod = 0;
                        me.getContract(me, me.paramCompanyId, 0); // Current contract
                    }
                }
            },
            'companycontractwindow': {
                beforerender: function (t, eOpt) {
                    var intakeNoteForm = Ext.ComponentQuery.query('rightintakenotes form[itemid="intakeNoteCompDetails"]')[0];
                    var companyGeneralInfoForm = Ext.ComponentQuery.query('companyoverview form[itemid="CompanyGeneralInfo"]')[0];
                    me.contractObj.ContractId = 0;

                    if (Utils.isValid(intakeNoteForm)) {
                        var companyName = intakeNoteForm.getForm().findField('CompanyNameDisplay').getValue();
                        t.title = 'Company Contract_Title'.l('SC50300') + ' - ' + companyName;
                        me.paramCompanyId = Utils.RightPanObj.CompanyId;
                    }

                    if (Utils.isValid(companyGeneralInfoForm)) {
                        var companyName = companyGeneralInfoForm.getForm().findField('CompanyName').getValue();
                        t.title = 'Company Contract_Title'.l('SC50300') + ' - ' + companyName;
                        me.paramCompanyId = companyGeneralInfoForm.getForm().findField('CompanyId').getValue();
                    }

                    me.contractObj.CompanyId = me.paramCompanyId;
                    me.CurrentTab = 0;
                    me.getContract(me, me.paramCompanyId, 0, true);
                    //alert('Check log of me.contractObj');
                    log('me.contractObj', me.contractObj);

                }
                //                afterrender: function (t, eOpt) {
                //                    alert('Check log of me.contractObj');
                //                    log('me.contractObj', me.contractObj);
                //                    if (!Utils.isEmpty(Utils.RightPanObj)) {
                //                        me.loadStores(me, me.contractObj.ContractId, me.contractObj.CompanyId, me.contractObj.BookingDate, null);
                //                    }
                //                    else {
                //                        me.loadStores(me, me.contractObj.ContractId, me.contractObj.CompanyId, me.contractObj.BookingDate, null);
                //                    }
                //                }
            },
            'kickbackdetailswindow': {
                beforerender: function (t, eOpt) {
                    var intakeNoteForm = Ext.ComponentQuery.query('rightintakenotes form[itemid="intakeNoteCompDetails"]')[0];
                    var companyGeneralInfoForm = Ext.ComponentQuery.query('companyoverview form[itemid="CompanyGeneralInfo"]')[0];
                    if (Utils.isValid(intakeNoteForm)) {
                        var companyName = intakeNoteForm.getForm().findField('CompanyNameDisplay').getValue();
                        t.title = 'Kick Back Details_Title'.l('SC50320') + ' - ' + companyName;
                    }
                    if (Utils.isValid(companyGeneralInfoForm)) {
                        var companyName = companyGeneralInfoForm.getForm().findField('CompanyName').getValue();
                        t.title = 'Kick Back Details_Title'.l('SC50320') + ' - ' + companyName;
                    }

                    var kickBackStore = Ext.getStore('bookingwizard.RightSide.Windows.CompanyContract.KickBackStore');

                    kickBackStore.proxy.setExtraParam('id', me.contractObj.CompanyId); //CompanyId
                    kickBackStore.proxy.setExtraParam('languageId', t.PropertyId); //PropertyId
                    kickBackStore.load();
                }
            },
            'commissiondetailswindow': {
                beforerender: function (t, eOpt) {
                    var intakeNoteForm = Ext.ComponentQuery.query('rightintakenotes form[itemid="intakeNoteCompDetails"]')[0];
                    var companyGeneralInfoForm = Ext.ComponentQuery.query('companyoverview form[itemid="CompanyGeneralInfo"]')[0];
                    if (Utils.isValid(intakeNoteForm)) {
                        var companyName = intakeNoteForm.getForm().findField('CompanyNameDisplay').getValue();
                        t.title = 'Commission Details_Title'.l('SC50330') + ' - ' + companyName;
                    }
                    if (Utils.isValid(companyGeneralInfoForm)) {
                        var companyName = companyGeneralInfoForm.getForm().findField('CompanyName').getValue();
                        t.title = 'Commission Details_Title'.l('SC50330') + ' - ' + companyName;
                    }

                    var commissionDetailsStore = Ext.getStore('bookingwizard.RightSide.Windows.CompanyContract.CommissionDetailsStore');

                    commissionDetailsStore.proxy.setExtraParam('id', me.contractObj.ContractId); //CompanyId
                    commissionDetailsStore.proxy.setExtraParam('languageId', t.PropertyId); //PropertyId
                    commissionDetailsStore.load();
                }
            },
            'fixedbardetailswindow': {
                beforerender: function (t, eOpt) {
                    log('ttt', t);
                    var intakeNoteForm = Ext.ComponentQuery.query('rightintakenotes form[itemid="intakeNoteCompDetails"]')[0];
                    var companyGeneralInfoForm = Ext.ComponentQuery.query('companyoverview form[itemid="CompanyGeneralInfo"]')[0];
                    if (Utils.isValid(intakeNoteForm)) {
                        var companyName = intakeNoteForm.getForm().findField('CompanyNameDisplay').getValue();
                        t.title = 'Fixed Bar Details_Title'.l('SC50340') + ' - ' + companyName;
                    }
                    if (Utils.isValid(companyGeneralInfoForm)) {
                        var companyName = companyGeneralInfoForm.getForm().findField('CompanyName').getValue();
                        t.title = 'Fixed Bar Details_Title'.l('SC50340') + ' - ' + companyName;
                    }

                    var fixedBarDetailsStore = Ext.getStore('bookingwizard.RightSide.Windows.CompanyContract.FixedBarDetailsStore');
                    fixedBarDetailsStore.proxy.setExtraParam('id', me.contractObj.ContractId); //ContractId
                    fixedBarDetailsStore.proxy.setExtraParam('id1', t.PropertyId); //PropertyId
                    fixedBarDetailsStore.proxy.setExtraParam('languageId', user_language); //languageId
                    fixedBarDetailsStore.load();
                }
            },
            'fixedpackagedetailswindow': {
                beforerender: function (t, eOpt) {
                    var intakeNoteForm = Ext.ComponentQuery.query('rightintakenotes form[itemid="intakeNoteCompDetails"]')[0];
                    var companyGeneralInfoForm = Ext.ComponentQuery.query('companyoverview form[itemid="CompanyGeneralInfo"]')[0];
                    if (Utils.isValid(intakeNoteForm)) {
                        var companyName = intakeNoteForm.getForm().findField('CompanyNameDisplay').getValue();
                        t.title = 'Fixed Package Details_Title'.l('SC50310') + ' - ' + companyName;
                    }
                    if (Utils.isValid(companyGeneralInfoForm)) {
                        var companyName = companyGeneralInfoForm.getForm().findField('CompanyName').getValue();
                        t.title = 'Fixed Package Details_Title'.l('SC50310') + ' - ' + companyName;
                    }

                    var fixedPackDetailsStore = Ext.getStore('bookingwizard.RightSide.Windows.CompanyContract.FixedPackageDetailsStore');

                    fixedPackDetailsStore.proxy.setExtraParam('id', me.contractObj.ContractId); //ContractId
                    fixedPackDetailsStore.proxy.setExtraParam('id1', t.PropertyId); //PropertyId
                    fixedPackDetailsStore.proxy.setExtraParam('languageId', user_language); // languageId
                    fixedPackDetailsStore.load();
                }
            },
            'fixedpriceitemswindow': {
                beforerender: function (t, eOpt) {
                    var intakeNoteForm = Ext.ComponentQuery.query('rightintakenotes form[itemid="intakeNoteCompDetails"]')[0];
                    var companyGeneralInfoForm = Ext.ComponentQuery.query('companyoverview form[itemid="CompanyGeneralInfo"]')[0];
                    if (Utils.isValid(intakeNoteForm)) {
                        var companyName = intakeNoteForm.getForm().findField('CompanyNameDisplay').getValue();
                        t.title = 'Fixed Item Details_Title'.l('SC50350') + ' - ' + companyName;
                    }
                    if (Utils.isValid(companyGeneralInfoForm)) {
                        var companyName = companyGeneralInfoForm.getForm().findField('CompanyName').getValue();
                        t.title = 'Fixed Item Details_Title'.l('SC50350') + ' - ' + companyName;
                    }

                    var fixedPriceItemsStore = Ext.getStore('bookingwizard.RightSide.Windows.CompanyContract.FixedPriceItemsStore');

                    fixedPriceItemsStore.proxy.setExtraParam('id', me.contractObj.ContractId); //ContractId 171
                    fixedPriceItemsStore.proxy.setExtraParam('id1', null); //PropertyId 75
                    fixedPriceItemsStore.proxy.setExtraParam('languageId', user_language); // languageId
                    fixedPriceItemsStore.load();

                }
            },
            'fixedroompricewindow': {
                beforerender: function (t, eOpt) {
                    var intakeNoteForm = Ext.ComponentQuery.query('rightintakenotes form[itemid="intakeNoteCompDetails"]')[0];
                    var companyGeneralInfoForm = Ext.ComponentQuery.query('companyoverview form[itemid="CompanyGeneralInfo"]')[0];
                    if (Utils.isValid(intakeNoteForm)) {
                        var companyName = intakeNoteForm.getForm().findField('CompanyNameDisplay').getValue();
                        t.title = 'FixedRoomPriceWindow_Title_Window'.l('SC50300') + ' - ' + companyName;
                    }
                    if (Utils.isValid(companyGeneralInfoForm)) {
                        var companyName = companyGeneralInfoForm.getForm().findField('CompanyName').getValue();
                        t.title = 'FixedRoomPriceWindow_Title_Window'.l('SC50300') + ' - ' + companyName;
                    }

                    var fixedRoomPriceStore = Ext.getStore('bookingwizard.RightSide.Windows.CompanyContract.FixedRoomPriceStore');
                    fixedRoomPriceStore.proxy.setExtraParam('id', me.contractObj.ContractId); //ContractId
                    fixedRoomPriceStore.proxy.setExtraParam('id1', t.PropertyId); //PropertyId
                    fixedRoomPriceStore.proxy.setExtraParam('languageId', user_language); // languageId
                    fixedRoomPriceStore.load();
                }
            },
            'button[action="downloadCompanyContract"]': {
                click: function () {
                   
                    var DocumentPath = image_path + Ext.ComponentQuery.query('companycontractwindow [itemid="ContractDocumentPath"]')[0].getValue();
                    //var URL = "PDFViewer.aspx?type=bc&file=" + DocumentPath;
                    window.open(DocumentPath, '_blank');
                }
            }
        });
    },
    /// TimePeriod=-1 for PREVIOUS Contract
    /// TimePeriod=0 for CURRUNT Contract
    /// TimePeriod=1 for NEXT Contract
    getContract: function (me, CompanyId, TimePeriod, isRender) {
        Ext.data.JsonP.request({
            url: webAPI_path + 'api/Contract/GetContractDetails',
            type: "GET",
            params: {
                id: CompanyId,
                languageId: TimePeriod
            },
            success: function (response) {
                var r = response;
                log('Comapny Contract response', r);
                if (r.success == true) {
                    me.CurrentTab = TimePeriod;
                    me.contractObj = r.data;

                    var fromDate = Ext.ComponentQuery.query('companycontractwindow displayfield[itemid="contractFromDate-' + TimePeriod + '"]')[0];
                    var toDate = Ext.ComponentQuery.query('companycontractwindow displayfield[itemid="contractToDate-' + TimePeriod + '"]')[0];
                    var contractValue = Ext.ComponentQuery.query('companycontractwindow displayfield[itemid="contractValue-' + TimePeriod + '"]')[0];
                    var contractContact = Ext.ComponentQuery.query('companycontractwindow displayfield[itemid="contractContact-' + TimePeriod + '"]')[0];
                    var contractDocumentPath = Ext.ComponentQuery.query('companycontractwindow [itemid="ContractDocumentPath"]')[0];
                    var contractDocumentBtn = Ext.ComponentQuery.query('companycontractwindow button[itemid="ContractDocumentIcon"]')[0];
                  
                    var fromDt = Ext.Date.parse(r.data.StartDate, 'c');
                    var toDt = Ext.Date.parse(r.data.EndDate, 'c');

                    fromDate.setValue(Ext.util.Format.date(fromDt, usr_dateformat));
                    toDate.setValue(Ext.util.Format.date(toDt, usr_dateformat));
                    contractValue.setValue(r.data.ContractedNetPrice + " EURO");
                    contractContact.setValue(r.data.AuthorizedSignee);
                    contractDocumentPath.setValue(r.contractPath);
                    if (r.contractPath == '')
                        contractDocumentBtn.setDisabled(1);
                    me.loadStores(me, r.data.ContractId, r.data.CompanyId, null, null)

                } else {
                    var contractAllTab = Ext.ComponentQuery.query('companycontractwindow tabpanel[itemid="contractAllTab"]')[0];

                    if (TimePeriod == 0) {
                        contractAllTab.setActiveTab(0);
                        contractAllTab.setActiveTab('currentTab');
                        me.contractObj.ContractId = 0;

                        if (isRender || TimePeriod != me.CurrentTab) {
                            me.TimePeriod = 0;
                            var companyId = me.contractObj == null ? 0 : me.contractObj.CompanyId;
                            var contractId = me.contractObj == null ? 0 : me.contractObj.ContractId;
                            me.loadStores(me, contractId, companyId, null, null)
                        }
                        me.CurrentTab = 0;
                    }
                    else {
                        var currentT = me.CurrentTab;

                        contractAllTab.setActiveTab(currentT == -1 ? 1 : (currentT == 1 ? 2 : 0));
                        contractAllTab.setActiveTab(currentT == -1 ? 'previousTab' : (currentT == 1 ? 'nextTab' : 'currentTab'));

                        if (TimePeriod == -1)
                            Ext.Msg.alert('Error'.l('g'), "No data available in previous contract.")
                        else if (TimePeriod == 1)
                            Ext.Msg.alert('Error'.l('g'), "No data available in next contract.")
                    }
                }
            },
            failure: function () {
            }
        })
    },
    // para list
    // Utils.RightPanObj.ContractId
    // Utils.RightPanObj.CompanyId
    // Utils.RightPanObj.BookingDate (Start Date)
    // Utils.RightPanObj.PropertyId
    loadStores: function (me, ContractId, CompanyId, BookingDate, PropertyId) {
        log('ContractId', ContractId);
        log('CompanyId', CompanyId);
        log('BookingDate', BookingDate);
        log('PropertyId', PropertyId);
        log('me.contractObj', me.contractObj);
        log('Utils.RightPanObj', Utils.RightPanObj);

        var purchaseCondiStore = Ext.getStore('bookingwizard.RightSide.Windows.CompanyContract.PurchaseConditionsStore');
        var paymentCondiStore = Ext.getStore('bookingwizard.RightSide.Windows.CompanyContract.PaymentConditionsStore');
        var cancelationConditionsStore = Ext.getStore('bookingwizard.RightSide.Windows.CompanyContract.CancelationConditionsStore');
        //var fixedPackDetailsStore = Ext.getStore('bookingwizard.RightSide.Windows.CompanyContract.FixedPackageDetailsStore');

        //var kickBackStore = Ext.getStore('bookingwizard.RightSide.Windows.CompanyContract.KickBackStore');
        //var commissionDetailsStore = Ext.getStore('bookingwizard.RightSide.Windows.CompanyContract.CommissionDetailsStore');
        //var fixedBarDetailsStore = Ext.getStore('bookingwizard.RightSide.Windows.CompanyContract.FixedBarDetailsStore');
        //var fixedPriceItemsStore = Ext.getStore('bookingwizard.RightSide.Windows.CompanyContract.FixedPriceItemsStore');

        //var cancelationConditionsStore = Ext.getStore('bookingwizard.RightSide.Windows.CompanyContract.CancelationConditionsStore');

        purchaseCondiStore.proxy.setExtraParam('id', CompanyId); //CompanyId
        purchaseCondiStore.proxy.setExtraParam('id1', Ext.Date.format(new Date(BookingDate), 'Y-m-d')); ///??? BookingDate
        purchaseCondiStore.proxy.setExtraParam('languageId', user_language); // Booking Date
        purchaseCondiStore.proxy.setExtraParam('id2', this.TimePeriod); // Booking Date
        purchaseCondiStore.load();

        paymentCondiStore.proxy.setExtraParam('id', CompanyId); //CompanyId
        paymentCondiStore.proxy.setExtraParam('languageId', ContractId); //Contract id
        paymentCondiStore.load();

        cancelationConditionsStore.proxy.setExtraParam('id', CompanyId); //CompanyId
        cancelationConditionsStore.proxy.setExtraParam('languageId', Ext.Date.format(new Date(BookingDate), 'Y-m-d')); //Booking Date
        cancelationConditionsStore.proxy.setExtraParam('contractId', ContractId); //ContractId
        cancelationConditionsStore.proxy.setExtraParam('id2', this.TimePeriod); // Booking Date
        cancelationConditionsStore.load();

        //        fixedPackDetailsStore.proxy.setExtraParam('id', ContractId); //ContractId
        //        fixedPackDetailsStore.proxy.setExtraParam('id1', PropertyId); //PropertyId
        //        fixedPackDetailsStore.proxy.setExtraParam('languageId', user_language); // languageId
        //        fixedPackDetailsStore.load();

        //        fixedPriceItemsStore.proxy.setExtraParam('id', ContractId); //ContractId 171
        //        fixedPriceItemsStore.proxy.setExtraParam('id1', PropertyId); //PropertyId 75
        //        fixedPriceItemsStore.proxy.setExtraParam('languageId', user_language); // languageId
        //        fixedPriceItemsStore.load();

        //        kickBackStore.proxy.setExtraParam('id', CompanyId); //CompanyId
        //        kickBackStore.proxy.setExtraParam('languageId', PropertyId); //PropertyId
        //        kickBackStore.load();

        //        commissionDetailsStore.proxy.setExtraParam('id', CompanyId); //CompanyId
        //        commissionDetailsStore.proxy.setExtraParam('languageId', PropertyId); //PropertyId
        //        commissionDetailsStore.load();


        //        fixedBarDetailsStore.proxy.setExtraParam('id', ContractId); //ContractId
        //        fixedBarDetailsStore.proxy.setExtraParam('id1', PropertyId); //PropertyId
        //        fixedBarDetailsStore.proxy.setExtraParam('languageId', user_language); //languageId
        //        fixedBarDetailsStore.load();
    },
    fixedbardetailswindow: function (rec) {
        if (rec.data.IsFixedBarPrice == 1) {
            Utils.ShowWindow('widget.fixedbardetailswindow', { propertyId: rec.data.PropertyIdValue });
        }
    },
    commissiondetailswindow: function (rec) {
        if (rec.data.IsComission == 1) {
            Utils.ShowWindow('widget.commissiondetailswindow', { propertyId: rec.data.PropertyIdValue });
        }
    },
    kickbackdetailswindow: function (rec) {
        if (rec.data.IsKickBack == 1) {
            Utils.ShowWindow('widget.kickbackdetailswindow', { propertyId: rec.data.PropertyIdValue });
        }
    },
    fixedpriceitemswindow: function (rec) {
        if (rec.data.IsFixedPriceItems == 1) {
            Utils.ShowWindow('widget.fixedpriceitemswindow', { propertyId: rec.data.PropertyIdValue });
        }
    },
    fixedpackagedetailswindow: function (rec) {
        if (rec.data.IsFixedPackage == 1) {
            Utils.ShowWindow('widget.fixedpackagedetailswindow', { propertyId: rec.data.PropertyIdValue });
        }
    },
    fixedroompricedetailswindow: function (rec) {
        if (rec.data.IsFixedRoomPrice == 1) {
            Utils.ShowWindow('widget.fixedroompricewindow', { propertyId: rec.data.PropertyIdValue });
        }
    }
});