Ext.define('Regardz.controller.customer.CustomerManage', {
    extend: 'Ext.app.Controller',
    views: ['customer.CustomerSearch', 'customer.CompanyManage', 'company.CompanyProfile', 'company.SalesandMarketing', 'company.GeneralInfo', 'company.Overview_I', 'company.Sales_I', 'company.Sales_C', 'company.BookingsList', 'company.ChildCompanyList',
		'customer.CustomerContactsList', 'company.CompanyOverview', 'company.Edit', 'company.ContactEdit', 'company.AddChildCompanyWin', 'company.AddChildCompany', 'company.GlobalDistributionSystem',
		'company.IndividualProfile', 'company.UploadLogo', 'company.ContactManage', 'company.BookingView', 'company.AddressManage', 'company.ContactsList', 'company.CompanySMGeneric',
        'company.SalesUserWindow', 'company.SalesUserList', 'company.PotentialMeetingTypeList', 'company.PotentialPropertyList', 'company.CompanySMFinancials', 'customer.BusinessAddressManage', 'company.TasksList',
        'company.ContactManageTabs', 'company.TaskView', 'company.ContactView', 'company.CompanySMCompanyWide', 'company.DomainListForCompany', 'company.AddMultiChildCompanyWin', 'company.AddMultiChildCompany',
        'dashboard.TaskManage', 'dashboard.TaskCompanyContactListWindow', 'dashboard.TaskCompanySearchContactList', 'dashboard.TaskCompanyContactList',
        'bookingwizard.RightSide.Windows.CompanyContract.CompanyContractWindow', 'company.Comments_C'
	],
    stores: ['customer.CustomerListStore', 'common.QualityRatingStore', 'company.CompanyQualityRatingStore', 'common.CountryStore', 'customer.EmployeeStore', 'mastervalues.MarketSourceStore', 'configuration.CreditStatusStore',
		'customer.AddressTypeStore', 'company.BookingStore', 'common.CompanyStatusComboStore', 'mastervalues.SicCodeStore', 'common.AllLanguageListStore', 'company.ChildCompanyStore',
		'company.AddChildCompanyStore', 'company.GlobalDistributionSystemStore', 'company.CompanyContactListStore', 'company.SalesUserStore', //'company.MergeCompaniesStore'
        'customer.IndividualContactRoleStore', 'customer.IndividualMailingCodeStore', 'customer.IndividualRoomClassificationStore', 'company.DomainListStore',
        'common.BusinessTypeStore', 'common.BehaviouralTypeStore', 'company.TaskStore', 'company.CompanySalesDetailStore', 'common.LeadStatusStore', 'common.LeadSourceStore',
        'company.BuyingReasonListStore', 'company.CompetitorListStore', 'company.PotentialPropertyStore', 'company.PotentialMeetingtypeStore', 'company.CompanywideStore',
        'dashboard.TaskTypeStore', 'bookingwizard.CompanySearchListStore', 'bookingwizard.CompanyContactListStore', 'common.PropertyForNamesStore', 'company.WeightedTargetPercentageStore'
	],

    refs: [{
        ref: 'individualContactRole',
        selector: '[itemid=IndividualContactRole]'
    }, {
        ref: 'individualMailingCode',
        selector: '[itemid=IndividualMailingCode]'
    }, {
        ref: 'individualRoomClassification',
        selector: '[itemid=IndividualRoomClassification]'
    }, {
        ref: 'buyingReasonList',
        selector: '[itemid=BuyingReasonList]'
    }, {
        ref: 'competitorsList',
        selector: '[itemid=CompetitorsList]'
    }, {
        ref: 'potentialPropertylist',
        selector: '[itemid=PotentialPropertylist]'
    }, {
        ref: 'potentialMeetingtypelist',
        selector: '[itemid=PotentialMeetingtypelist]'
    }, {
        ref: 'addChildCompany',
        selector: '[itemid=AddChildCompany]'
    }, {
        ref: 'addMultiChildCompany',
        selector: '[itemid=AddMultiChildCompany]'
    }, {
        ref: 'uploadlogo',
        selector: 'uploadlogo'
    }, {
        ref: 'taskmanage',
        selector: 'taskmanage'
    }, {
        ref: 'bookingslist',
        selector: 'bookingslist'
    }, {
        ref: 'salesuserwindow',
        selector: 'salesuserwindow'
    }, {
        ref: 'companymanage',
        selector: 'companymanage'
    }, {
        ref: 'contactmanagetabs',
        selector: 'contactmanagetabs'
    }, {
        ref: 'individualprofile',
        selector: 'individualprofile'
    }],
    thisController: false,
    isCompanySMTabOpen: false,
    isStoreloaded: {},
    init: function () {
        var me = this;

        try {
            if (!me.thisController) {
                me.LoadCombosOnSearchCustomer();
            }
            me.thisController = true;
        } catch (e) { }

        this.control({
            'companyprofile ': {
                close: function () {
                    me.isCompanySMTabOpen = false;
                }
            },
            'customersearch': {
                afterrender: function () {
                    me.CompanySelectionType = 0;
                    me.LoadCombosOnSearchCustomer();
                    me.LoadBlankSearchGrid(null);
                },
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'Company')
                        this.Company(zRec);
                    else if (fieldName == 'Indiv_Overview')
                        this.Indiv_Overview(zRec);
                    else if (fieldName == 'mergeCompanies')
                        this.mergeCompanies(zRec);
                    else
                        this.Company(zRec);
                    //if (zRec.data.CompanyId == null || zRec.data.CompanyId == undefined || zRec.data.CompanyId == 0)
                }
            },
            'companyprofile tabpanel': {
                tabchange: function (tPanel, newCard, oldCard, eOpt) {// tabPanel, newCard, oldCard, eOpts                    
                    //var tbp_companyProfile = Ext.ComponentQuery.query('companyprofile tabpanel[itemid=tbp_companyProfile]')[0];
                    if (newCard.name == "salesmarketing") {
                        var salesObj = new Object();
                        salesObj.moduleName = 'CUST004';
                        if (!Utils.ValidateUserAccess(salesObj)) {
                            tPanel.setActiveTab(0);
                            Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.')
                        }
                    }

                    if (newCard.name == "generalinfo") {
                        //var overviewObj = new Object();
                        //overviewObj.moduleName = 'CUST002';
                        //if (!Utils.ValidateUserAccess(overviewObj)) {
                        //tPanel.setActiveTab(0);
                        //Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.')
                        //}
                    }
                }
            },
            'individualprofile tabpanel': {
                tabchange: function (tPanel, newCard, oldCard, eOpt) {// tabPanel, newCard, oldCard, eOpts                    
                    if (newCard.name == "sales") {
                        var salesObj = new Object();
                        salesObj.moduleName = 'CUST004';
                        if (!Utils.ValidateUserAccess(salesObj)) {
                            tPanel.setActiveTab(0);
                            Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.')
                        }
                    }

                    //newCard.name == "individualoverview" || 
                    if (newCard.name == "indivedit") {
                        //                        var overviewObj = new Object();
                        //                        overviewObj.moduleName = 'CUST002';
                        //                        if (!Utils.ValidateUserAccess(overviewObj)) {
                        //tPanel.setActiveTab(0);
                        //                            Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.')
                        //                        }
                    }
                },
                beforerender: function () {
                    var companyOverviewTab = Ext.ComponentQuery.query('companyprofile tabpanel panel[itemid=companyOverviewTab]')[0];
                    var companyGenInfoTab = Ext.ComponentQuery.query('companyprofile tabpanel panel[itemid=companyGenInfoTab]')[0];
                    var companySalesMarkTab = Ext.ComponentQuery.query('companyprofile tabpanel panel[itemid=companySalesMarkTab]')[0];

                    //var formSales_I = Ext.getCmp('Sales_I');
                    var formIndividual = Ext.getCmp('addIndividual').getForm();

                    //Overview
                    var overviewObj = new Object();
                    overviewObj.moduleName = 'CUST001';
                    if (!Utils.ValidateUserAccess(overviewObj)) {
                        if (companyOverviewTab != null)
                            companyGenInfoTab.disabled = true;

                        if (companyOverviewTab != null)
                            companyOverviewTab.disabled = true;

                        formIndividual.findField('Surname').allowBlank = true;
                        formIndividual.findField('LastName').allowBlank = true;
                        formIndividual.findField('FirstName').allowBlank = true;
                        formIndividual.findField('Email').allowBlank = true;

                        formIndividual.findField('InvoicedBy').allowBlank = true;
                        formIndividual.findField('Address1_Postal').allowBlank = true;
                        formIndividual.findField('CountryId_Postal').allowBlank = true;
                        formIndividual.findField('Pincode_Invoice').allowBlank = true;
                        formIndividual.findField('CountryId_Invoice').allowBlank = true;
                        formIndividual.findField('CountryId_Invoice').allowBlank = true;
                        formIndividual.findField('PricesValue').allowBlank = true;

                    }

                    //sales
                    var salesObj = new Object();
                    salesObj.moduleName = 'CUST004';

                    if (!Utils.ValidateUserAccess(salesObj)) {
                        if (companySalesMarkTab != null)
                            companySalesMarkTab.disabled = true;

                        //formSales_I.findField('PaymentMode').allowBlank = true;
                    }
                    var companyOverviewTab = Ext.ComponentQuery.query('companyprofile tabpanel panel[itemid=companyOverviewTab]')[0];
                    //companyOverviewTab.disabled = true;
                }
            },
            'contactslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'ContactEdit')
                        this.ContactEdit(zRec);
                    else if (fieldName == 'VerificationMail')
                        this.SendVerificationEmail(zRec);
                    else if (fieldName == 'ResetPwd')
                        this.ResetPasswordEmail(zRec);

                    this.ContactView(zRec);
                }
            },
            'companysmgeneric grid[itemid="BuyingReasonList"]': {
                afterrender: function (g, eOpt) {
                    var localThis = g;
                    var companysmgeneric = Ext.ComponentQuery.query('companysmgeneric')[0];
                    // CompanyId
                    //var vm = Ext.ComponentQuery.query('[itemid=buyingreasonselectionmodel]')[0];
                    var vm = localThis.getSelectionModel();

                    var BuyingReasonList = Ext.ComponentQuery.query('grid[itemid=BuyingReasonList]')[0];

                    var store = BuyingReasonList.getStore();
                    store.clearFilter();
                    store.proxy.setExtraParam('id', user_language);
                    store.proxy.setExtraParam('id1', companysmgeneric.CompanyId);
                    store.load({
                        callback: function (records, operation, success) {
                            if (records != null && records.length > 0) {
                                var newRecordsToSelect = [];

                                for (var i = 0; i < records.length; i++) {
                                    if (records[i].data.Checked == true) {
                                        newRecordsToSelect.push(records[i]);
                                        //vm.select(records[i], true, true);
                                    }
                                }
                                vm.select(newRecordsToSelect, true, true);
                                //  vm.selectAll();
                                //vm1.select(newRecords2ToSelect, true, true);
                            }
                        }
                    });
                }
            },
            'companysmgeneric grid[itemid="CompetitorsList"]': {
                afterrender: function (g, eOpt) {
                    var localThis = g;
                    var companysmgeneric = Ext.ComponentQuery.query('companysmgeneric')[0];
                    // CompanyId
                    var vm = localThis.getSelectionModel();

                    var CompetitorsList = Ext.ComponentQuery.query('grid[itemid=CompetitorsList]')[0];
                    var store = CompetitorsList.getStore();
                    store.clearFilter();
                    store.proxy.setExtraParam('id', companysmgeneric.CompanyId);
                    store.proxy.setExtraParam('languageId', user_language);
                    store.proxy.setExtraParam('searchString', '');

                    store.load({
                        callback: function (records, operation, success) {
                            if (records != null && records.length > 0) {
                                var newRecordsToSelect = [];
                                for (var i = 0; i < records.length; i++) {
                                    if (records[i].data.Checked == true) {
                                        newRecordsToSelect.push(records[i]);
                                        // vm.select(records[i], true, true);
                                    }
                                }
                                vm.select(newRecordsToSelect, true, true);
                                // vm.selectAll();
                                //vm1.select(newRecords2ToSelect, true, true);
                            }
                        }
                    });
                }
            },
            'companysmgeneric grid[itemid="PotentialPropertylist"]': {
                afterrender: function (g, eOpt) {
                    var localThis = g;
                    var companysmgeneric = Ext.ComponentQuery.query('companysmgeneric')[0];
                    // CompanyId
                    var vm = localThis.getSelectionModel();

                    var PotentialPropertylist = Ext.ComponentQuery.query('grid[itemid=PotentialPropertylist]')[0];
                    var store = PotentialPropertylist.getStore();
                    store.clearFilter();
                    store.proxy.setExtraParam('id', companysmgeneric.CompanyId);
                    store.proxy.setExtraParam('languageId', user_language);
                    store.proxy.setExtraParam('searchString', '');
                    store.load({
                        callback: function (records, operation, success) {
                            if (records != null && records.length > 0) {
                                var newRecordsToSelect = [];

                                for (var i = 0; i < records.length; i++) {
                                    if (records[i].data.Checked == true) {
                                        newRecordsToSelect.push(records[i]);
                                        //  vm.select(records[i], true, true);
                                    }
                                }

                                vm.select(newRecordsToSelect, true, true);
                                // vm.selectAll();
                                //vm1.select(newRecords2ToSelect, true, true);
                            }
                        }
                    });
                }
            },

            'companysmgeneric grid[itemid="PotentialMeetingtypelist"]': {
                afterrender: function (g, eOpt) {
                    var localThis = g;
                    var vm = localThis.getSelectionModel();

                    var companysmgeneric = Ext.ComponentQuery.query('companysmgeneric')[0];
                    var PotentialMeetingtypelist = Ext.ComponentQuery.query('grid[itemid=PotentialMeetingtypelist]')[0];
                    var store = PotentialMeetingtypelist.getStore();
                    // CompanyId
                    store.clearFilter();
                    store.proxy.setExtraParam('id', companysmgeneric.CompanyId);
                    store.proxy.setExtraParam('languageId', user_language);
                    store.proxy.setExtraParam('searchString', '');
                    store.load({
                        callback: function (records, operation, success) {
                            if (records != null && records.length > 0) {

                                var newRecordsToSelect = [];
                                //var vm2 = localThis.getSelectionModel();
                                for (var i = 0; i < records.length; i++) {
                                    if (records[i].data.Checked == true) {
                                        newRecordsToSelect.push(records[i])
                                        //vm.select(records[i], true);
                                    }
                                }

                                vm.select(newRecordsToSelect, true, true);
                                //vm.selectAll();

                            }
                        }
                    });

                }
            },
            'companysmcompanywide': {
                afterrender: function () {
                    var existingCompanyId = Ext.getCmp('CompanyProileWinForm').getForm().findField('CompanyId').getValue();
                    Ext.getStore('company.CompanywideStore').proxy.setExtraParam('languageId', user_language);
                    Ext.getStore('company.CompanywideStore').proxy.setExtraParam('id', existingCompanyId); //21266
                    Ext.getStore('company.CompanywideStore').load({
                        callback: function (response, o, success) {
                            if (response != null && response.length > 0) {
                                Ext.getCmp('companysmcompanywide').columns[1].setText(response[0].data.FirstYear);
                                Ext.getCmp('companysmcompanywide').columns[2].setText(response[0].data.SecondYear);
                                Ext.getCmp('companysmcompanywide').columns[3].setText(response[0].data.ThirdYear);
                            }
                        }
                    });
                }
            },
            'sales_c': {
                afterrender: function () {
                    //alert('afterrend');
                    var businessTypeCombo = Ext.ComponentQuery.query('sales_c combo[itemid=BusinessTypeId]')[0];
                    businessTypeCombo.getStore().proxy.setExtraParam('id', user_language);
                    businessTypeCombo.getStore().load({
                        callback: function (response, o, success) {
                            businessTypeCombo.getStore().insert(0, {
                                BusinessTypeId: 0,
                                BusinessTypeName: 'Select bussiness type'.l('SC61300')
                            });

                            var varBusinessTypeId = Ext.getCmp('contactManage').getForm().findField('BusinessTypeId').getValue();
                            Ext.getCmp('Sales_C').getForm().findField('BusinessTypeId').setValue(parseInt(varBusinessTypeId));

                            var varWeddingAnniversary = Ext.Date.format(Ext.getCmp('contactManage').getForm().findField('WeddingAnniversary').getValue(), usr_dateformat);
                            Ext.getCmp('Sales_C').getForm().findField('WeddingAnniversary').setValue(varWeddingAnniversary);
                            //                            var varJoinedTheCompany = Ext.Date.format(Ext.getCmp('contactManage').getForm().findField('JoinedTheCompany').getValue(), usr_dateformat);
                            //                            Ext.getCmp('Sales_C').getForm().findField('JoinedTheCompany').setValue(varJoinedTheCompany);
                        }
                    });
                    var behaviouralTypeCombo = Ext.ComponentQuery.query('sales_c combo[itemid=BehaviouralTypeId]')[0];
                    behaviouralTypeCombo.getStore().proxy.setExtraParam('id', user_language);
                    behaviouralTypeCombo.getStore().load({
                        callback: function (response, o, success) {

                            behaviouralTypeCombo.getStore().insert(0, {
                                BehaviouralTypeId: 0,
                                TypeName: 'Select behavioural type'.l('SC61300')
                            });

                            var varBehaviouralTypeId = Ext.getCmp('contactManage').getForm().findField('BehaviouralTypeId').getValue();
                            Ext.getCmp('Sales_C').getForm().findField('BehaviouralTypeId').setValue(parseInt(varBehaviouralTypeId));
                        }
                    });
                }
            },
            'sales_i': {
                afterrender: function () {
                    //alert('afterrend i');
                    //                    Ext.getStore('common.BusinessTypeStore').proxy.setExtraParam('id', user_language);
                    //                    Ext.getStore('common.BusinessTypeStore').load({
                    //                        callback: function (response, o, success) {
                    //                            var varBusinessTypeId = Ext.getCmp('addIndividual').getForm().findField('BusinessTypeId').getValue();
                    //                            Ext.getCmp('Sales_I').getForm().findField('BusinessTypeId').setValue(parseInt(varBusinessTypeId));
                    //                            var varWeddingAnniversary = Ext.Date.format(Ext.getCmp('addIndividual').getForm().findField('WeddingAnniversary').getValue(), usr_dateformat);
                    //                            Ext.getCmp('Sales_I').getForm().findField('WeddingAnniversary').setValue(varWeddingAnniversary);
                    //                        }
                    //                    });

                    Ext.getStore('common.BehaviouralTypeStore').proxy.setExtraParam('id', user_language);
                    Ext.getStore('common.BehaviouralTypeStore').load({
                        callback: function (response, o, success) {


                            var varBehaviouralTypeId = Ext.getCmp('addIndividual').getForm().findField('BehaviouralTypeId').getValue();
                            var varWeddingAnniversary = Ext.Date.format(Ext.getCmp('addIndividual').getForm().findField('WeddingAnniversary').getValue(), usr_dateformat);
                            Ext.getCmp('Sales_I').getForm().findField('WeddingAnniversary').setValue(varWeddingAnniversary);
                            Ext.getCmp('Sales_I').getForm().findField('BehaviouralTypeId').setValue(parseInt(varBehaviouralTypeId));
                        }
                    });
                }
            },
            'addmultichildcompanywin': {
                resize: function (window, adjWidth, adjHeight, eOpts) {
                    var grid = Ext.ComponentQuery.query('grid[itemid=AddMultiChildCompany]')[0];
                    var newHeight = adjHeight - gridHeaderHeight;
                    grid.setHeight(newHeight);
                    //resizeWindow(v, newHeight);
                }
            },
            'addchildcompanywin': {
                resize: function (window, adjWidth, adjHeight, eOpts) {

                    var grid = Ext.ComponentQuery.query('grid[itemid=AddChildCompany]')[0];
                    var newHeight = adjHeight - gridHeaderHeight;
                    grid.setHeight(newHeight);
                    //resizeWindow(v, newHeight);
                }
            },
            'companysmgeneric': {
                afterrender: function (t) {
                    //me.LoadCompanyOverviewDetails(t);                    
                    var businessTypeCombo = Ext.ComponentQuery.query('companysmgeneric combo[itemid=businessTypeComboSMG]')[0];
                    Ext.getStore('common.BusinessTypeStore').proxy.setExtraParam('id', user_language);
                    Ext.getStore('common.BusinessTypeStore').load({
                        callback: function (response, o, success) {
                            var store = businessTypeCombo.getStore();
                            var index = store.findExact('BusinessTypeId', -1);

                            if (index == -1) {
                                store.insert(0, {
                                    BusinessTypeId: 0,
                                    BusinessTypeName: 'Select bussiness type'.l('SC61300')
                                });
                            }
                            var varBusinessTypeId = Ext.getCmp('generalInfo').getForm().findField('BusinessTypeId').getValue();
                            log('businessTypeCombo', parseInt(varBusinessTypeId));
                            Ext.getCmp('Sales_Generic').getForm().findField('BusinessTypeId').setValue(parseInt(varBusinessTypeId));

                        }
                    });

                    //Quality rating
                    var qualityRatingCombo = Ext.ComponentQuery.query('companysmgeneric combo[itemid=qualityRatingComboSMG]')[0];
                    qualityRatingCombo.getStore().load({
                        callback: function (response, o, success) {
                            var store = qualityRatingCombo.getStore();
                            var index = store.findExact('QualityRatingId', -1);

                            if (index == -1) {
                                store.insert(0, {
                                    QualityRatingId: 0,
                                    Description: 'Select Quality rating'.l('SC61100')
                                });
                                var QualityRating = Ext.getCmp('generalInfo').getForm().findField('QualityRating').getValue();
                                log('qualityRatingCombo', parseInt(QualityRating));
                                Ext.getCmp('Sales_Generic').getForm().findField('QualityRating').setValue(parseInt(QualityRating));
                            }
                        }
                    });
                    //Ext.getStore('common.QualityRatingStore').proxy.setExtraParam('id', user_language);
                    //Ext.getStore('common.QualityRatingStore').load();
                    var leasSourceCombo = Ext.ComponentQuery.query('companysmgeneric combo[itemid=leadSourceComboSMG]')[0];

                    Ext.getStore('common.LeadSourceStore').proxy.setExtraParam('id', user_language);
                    Ext.getStore('common.LeadSourceStore').load({
                        callback: function (response, o, success) {
                            var store = leasSourceCombo.getStore();
                            var index = store.findExact('LeadSourceId', -1);

                            if (index == -1) {
                                store.insert(0, {
                                    LeadSourceId: 0,
                                    Name: 'Select Lead Source'.l('SC61100')
                                });
                            }
                            var varLeadSourceId = Ext.getCmp('generalInfo').getForm().findField('LeadSourceId').getValue();
                            log('leasSourceCombo', parseInt(varLeadSourceId));
                            Ext.getCmp('Sales_Generic').getForm().findField('LeadSourceId').setValue(parseInt(varLeadSourceId));
                        }
                    });

                    var leadStatusCombo = Ext.ComponentQuery.query('companysmgeneric combo[itemid=leadStatusComboSMG]')[0];
                    Ext.getStore('common.LeadStatusStore').proxy.setExtraParam('id', user_language);
                    Ext.getStore('common.LeadStatusStore').load({
                        callback: function (response, o, success) {
                            var store = leadStatusCombo.getStore();
                            var index = store.findExact('LeadStatusId', -1);

                            if (index == -1) {
                                store.insert(0, {
                                    LeadStatusId: 0,
                                    Name: 'Select Lead status'.l('SC61100')
                                });
                            }
                            var varLeadStatusId = Ext.getCmp('generalInfo').getForm().findField('LeadStatusId').getValue();
                            log('leadStatusCombo', parseInt(varLeadStatusId == '' ? 0 : varLeadStatusId));
                            Ext.getCmp('Sales_Generic').getForm().findField('LeadStatusId').setValue(parseInt(varLeadStatusId == '' ? 0 : varLeadStatusId));
                        }
                    });

                    //Company Status
                    var companyStatusComboSMG = Ext.ComponentQuery.query('companysmgeneric combo[itemid=genericCompanyStatus]')[0];
                    companyStatusComboSMG.getStore().load({
                        callback: function (records, o, success) {
                            var varCompanyStatusId = Ext.getCmp('generalInfo').getForm().findField('StatusId').getValue();
                            log('companyStatusComboSMG', parseInt(varCompanyStatusId));
                            Ext.getCmp('Sales_Generic').getForm().findField('StatusId').setValue(parseInt(varCompanyStatusId));
                            me.isCompanySMTabOpen = true;
                        }
                    });

                }
            },
            'sales_i button[action="searchSalesUsers"]': {
                click: function () {
                    Ext.getStore('company.SalesUserStore').proxy.setExtraParam('searchString', '');
                    ///Ext.getStore('company.SalesUserStore').load();
                    Ext.create('widget.salesuserwindow', { userId: 0 }).center();
                }
            },
            'sales_c button[action="searchSalesUsers"]': {
                click: function () {
                    Ext.getStore('company.SalesUserStore').clearFilter();
                    Ext.create('widget.salesuserwindow', { userId: 0 }).center();
                }
            },
            'companysmgeneric button[action="searchSalesUsers"]': {
                click: function (t) {
                    Ext.getStore('company.SalesUserStore').proxy.setExtraParam('searchString', '');
                    //Ext.getStore('company.SalesUserStore').load();
                    Ext.create('widget.salesuserwindow', { userId: 0, userIdentity: t.itemId }).center();
                }
            },
            'companysmgeneric button[action="searchPotentialProperty"]': {
                click: function () {
                    var r = Ext.getCmp('searchString').getValue();
                    Ext.getStore('company.PotentialPropertyStore').clearFilter();
                    var regex = new RegExp(".*" + r + ".*", "i");
                    Ext.getStore('company.PotentialPropertyStore').filter("PropertyName", regex, true, true);

                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearPotentialProperty"]')[0];
                        clearIcon.show();
                    }

                    /*checkbox selection model code*/
                    var store = Ext.getStore('company.PotentialPropertyStore');
                    var grid = Ext.ComponentQuery.query('grid[itemid=PotentialPropertylist]')[0];
                    me.setSelectionModel(store, grid);
                    /*end checkbox selection model code*/
                }
            },
            'companysmgeneric button[action="clearPotentialProperty"]': {
                click: function () {
                    Ext.getCmp('searchString').setValue('');
                    Ext.getStore('company.PotentialPropertyStore').clearFilter();

                    var clearIcon = Ext.ComponentQuery.query('[action="clearPotentialProperty"]')[0];
                    clearIcon.hide();

                    /*checkbox selection model code*/
                    var store = Ext.getStore('company.PotentialPropertyStore');
                    var grid = Ext.ComponentQuery.query('grid[itemid=PotentialPropertylist]')[0];
                    me.setSelectionModel(store, grid);
                    /*end checkbox selection model code*/
                }
            },
            'companysmgeneric button[action="searchPotentialMeetingtype"]': {
                click: function () {

                    var r = Ext.getCmp('searchString1').getValue();

                    Ext.getStore('company.PotentialMeetingtypeStore').clearFilter();
                    var regex = new RegExp(".*" + r + ".*", "i");
                    Ext.getStore('company.PotentialMeetingtypeStore').filter("Name", regex, true, true);

                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearPotentialMeetingtype"]')[0];
                        clearIcon.show();
                    }

                    /*checkbox selection model code*/
                    var store = Ext.getStore('company.PotentialMeetingtypeStore');
                    var grid = Ext.ComponentQuery.query('grid[itemid=PotentialMeetingtypelist]')[0];
                    me.setSelectionModel(store, grid);
                    /*end checkbox selection model code*/
                }
            },
            'companysmgeneric button[action="clearPotentialMeetingtype"]': {
                click: function () {
                    Ext.getCmp('searchString1').setValue('');
                    Ext.getStore('company.PotentialMeetingtypeStore').clearFilter();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearPotentialMeetingtype"]')[0];
                    clearIcon.hide();

                    /*checkbox selection model code*/
                    var store = Ext.getStore('company.PotentialMeetingtypeStore');
                    var grid = Ext.ComponentQuery.query('grid[itemid=PotentialMeetingtypelist]')[0];
                    me.setSelectionModel(store, grid);
                    /*end checkbox selection model code*/
                }
            },
            'companysmgeneric button[action="searchCompetitors"]': {
                click: function () {

                    var r = Ext.getCmp('searchString2').getValue();

                    Ext.getStore('company.CompetitorListStore').clearFilter();
                    var regex = new RegExp(".*" + r + ".*", "i");
                    Ext.getStore('company.CompetitorListStore').filter("Name", regex, true, true);

                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearCompetitors"]')[0];
                        clearIcon.show();
                    }

                    /*checkbox selection model code*/
                    var store = Ext.getStore('company.CompetitorListStore');
                    var grid = Ext.ComponentQuery.query('grid[itemid=CompetitorsList]')[0];
                    me.setSelectionModel(store, grid);
                    /*end checkbox selection model code*/
                }
            },

            'companysmgeneric button[action="clearCompetitors"]': {
                click: function () {
                    Ext.getCmp('searchString2').setValue('');
                    Ext.getStore('company.CompetitorListStore').clearFilter();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearCompetitors"]')[0];
                    clearIcon.hide();

                    /*checkbox selection model code*/
                    var store = Ext.getStore('company.CompetitorListStore');
                    var grid = Ext.ComponentQuery.query('grid[itemid=CompetitorsList]')[0];
                    me.setSelectionModel(store, grid);
                    /*end checkbox selection model code*/
                }
            },
            'salesuserlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'SelectSalesUser')
                        this.SelectSalesUser(zRec, me);
                }
            },
            'bookingslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'businessTypeEdit')
                        this.BusinessTypeEdit(zRec);
                    else if (fieldName == 'ManageBooking') {
                        //this.BusinessTypeEdit(zRec);
                        if (!zRec.data.IsDisable)
                            this.BookingEditWindow(zRec, me);
                    }
                    else {
                        if (Ext.getCmp('Overview_I') != null)
                            Ext.getCmp('Overview_I').getForm().findField('Notes').hide();
                        else {
                            Ext.getCmp('CompanyGeneralInfo').getForm().findField('Notes').hide();
                            Ext.getCmp('imagetempView').hide();
                            Ext.getCmp('contactviewid').hide();
                            Ext.getCmp('commentsView').hide();
                        }
                        Ext.getCmp('taskviewid').hide();
                    }
                    if (fieldName != 'ManageBooking') {
                        Ext.getCmp('bookingviewid').show();
                        this.BookingView(zRec);
                    }
                }
            },
            'bookingslist button[action=addBooking]': {
                click: function (t) {
                    var wizObj = new Object();
                    wizObj.moduleName = 'WIZA001';
                    if (!Utils.ValidateUserAccess(wizObj)) {
                        Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.');
                    }
                    else {
                        var data = me.getBookingslist().CompanyData;
                        var obj = Ext.decode(data);
                        obj.fromCustomerNewBooking = true;
                        Utils.loadWizardStepsFromOutSide(me, obj, 'step1');
                    }
                }
            },
            'taskslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'taskDelete')
                        this.TaskDelete(zRec);
                    else if (fieldName == 'taskEdit')
                        this.taskEdit(zRec);
                    else {
                        if (Ext.getCmp('Overview_I') != null)
                            Ext.getCmp('Overview_I').getForm().findField('Notes').hide();
                        else {
                            Ext.getCmp('CompanyGeneralInfo').getForm().findField('Notes').hide();
                            Ext.getCmp('imagetempView').hide();
                        }

                        Ext.getCmp('bookingviewid').hide();
                        Ext.getCmp('taskviewid').show();
                        Ext.getCmp('commentsView').hide();
                        this.TaskView(zRec);
                    }
                }
            },
            'taskslist button[action=addTask]': {
                click: function () {
                    if (Ext.getCmp('CompanyGeneralInfo')) {
                        var companyName = Ext.getCmp('CompanyGeneralInfo').getForm().findField('CompanyName').getValue();
                        var existingCompanyId = Ext.getCmp('CompanyProileWinForm').getForm().findField('CompanyId').getValue();
                        Ext.create('widget.taskmanage', { CompanyId: existingCompanyId, CompanyName: companyName, itemid: 'taskmanageCUST' });
                    } else {
                        var individualName = Ext.getCmp('Overview_I').getForm().findField('IndividualName').getValue();
                        var existingIndividualId = Ext.getCmp('IndividualProileWinForm').getForm().findField('IndividualId').getValue();
                        Ext.create('widget.taskmanage', { IndividualId: existingIndividualId, IndividualName: individualName, itemid: 'taskmanageCUST' });
                    }
                }
            },
            //            'taskmanage': {
            //                afterrender: function (t, e, eo) {
            //                    debugger;
            //                    /*Get type combobox*/
            //                    var taskTypeCombo = Ext.ComponentQuery.query('[itemid="taskType"]')[0];
            //                    taskTypeCombo.getStore().load();

            //                    var businessTypeCombo = Ext.ComponentQuery.query('[itemid="businesstype"]')[0];
            //                    businessTypeCombo.getStore().load();

            //                    var form = Ext.ComponentQuery.query('taskmanage [itemid="taskmangeid"]')[0];
            //                    var StartTimeOrigin = form.getForm().findField('StartTime').getValue();
            //                    var EndTimeOrigin = form.getForm().findField('EndTime').getValue();

            //                    var TaskId = form.getForm().findField('TaskId').getValue();

            //                    if (TaskId > 0) {
            //                        form.getForm().load({
            //                            method: 'GET',
            //                            url: webAPI_path + 'api/task/GetTaskById',
            //                            params: {
            //                                id: TaskId,
            //                                languageId: user_language
            //                            },
            //                            success: function (form, action) {
            //                                var form = Ext.ComponentQuery.query('taskmanage [itemid="taskmangeid"]')[0];
            //                                var resp = Ext.decode(action.response.responseText);
            //                                /**/
            //                                var staff = Ext.ComponentQuery.query('taskmanage hidden[name=AssignedTo]')[0];
            //                                var staffDisplay = Ext.ComponentQuery.query('taskmanage displayfield[itemid=staffDisplay]')[0];

            //                                if (staff != null && staff != undefined && parseInt(staff.value) > 0) {
            //                                    staff.setValue(resp.data.AssignedTo);
            //                                    staffDisplay.setValue(resp.data.UserName);
            //                                }
            //                                //                                else {
            //                                //                                    staff.setValue(resp.data.AssignedTo);
            //                                //                                    staffDisplay.setValue(resp.data.UserName);
            //                                //                                }
            //                                /**/
            //                                var date = Ext.util.Format.date(resp.data.DueDate, usr_dateformat);
            //                                form.getForm().findField('DueDate').setValue(date);
            //                                form.getForm().findField('BusinessTypeId').setValue(resp.data.BusinessTypeId);

            //                                var EndTime = resp.data.ETime;
            //                                var StartTime = resp.data.STime;

            //                                var NewStartTime = "";

            //                                if (StartTime != "") {
            //                                    var StartTimeOrigin = form.getForm().findField('StartTime').getValue();
            //                                    StartTimeOrigin = new Date(StartTimeOrigin);

            //                                    StartTime = StartTime.split(":");

            //                                    EndTimeOrigin = StartTimeOrigin.setHours(StartTime[0], StartTime[1]);
            //                                    StartTime = new Date(StartTimeOrigin);

            //                                    form.getForm().findField('StartTime').setValue(StartTime);

            //                                }
            //                                var NewEndTime = "";
            //                                if (EndTime != "") {
            //                                    var EndTimeOrigin = form.getForm().findField('EndTime').getValue();
            //                                    EndTimeOrigin = new Date(EndTimeOrigin);

            //                                    EndTime = EndTime.split(":");

            //                                    EndTimeOrigin = EndTimeOrigin.setHours(EndTime[0], EndTime[1]);
            //                                    EndTime = new Date(EndTimeOrigin);

            //                                    form.getForm().findField('EndTime').setValue(EndTime);
            //                                }

            //                                var bookingId = resp.data.BookingId;
            //                                if (bookingId > 0) {
            //                                    var btnCompany = Ext.ComponentQuery.query('taskmanage button[itemid=btnSearchCompany]')[0];
            //                                    btnCompany.disable();
            //                                }
            //                            }
            //                        });
            //                    }
            //                }
            //            },
            //            'taskmanage button[action=searchUser]': {
            //                click: function (t, e, eo) {
            //                    Ext.create('widget.salesuserwindow').show();
            //                }
            //            },
            //            'taskmanage button[action=searchBooking]': {
            //                click: function (t, e, eo) {
            //                    Ext.create('widget.taskbookinglistwindow').show();
            //                }
            //            },
            //            'taskbookinglistwindow': {
            //                afterrender: function (t, e, eo) {
            //                    Ext.getStore('dashboard.TaskBookingStore').load({});
            //                }
            //            },
            //            'taskbookinglist': {
            //                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
            //                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
            //                    var fieldName = iView.getGridColumns()[iColIdx].name;
            //                    var zRec = iView.getRecord(iRowEl);

            //                    if (fieldName == 'selectTaskBooking')
            //                        me.selectTaskBooking(zRec.data);
            //                }
            //            },
            'taskmanage button[action=searchCompany]': {
                click: function (t, e, eo) {
                    if (Ext.getCmp('btnSelectBookingCompanyContactWin'))
                        Ext.getCmp('btnSelectBookingCompanyContactWin').destroy();
                    Ext.create('widget.taskcompanycontactlistwindow', { itemid: 'companySearchContactWindowCS' });
                }
            },
            'taskcompanycontactlistwindow': {
                afterrender: function (t, e, eo) {
                    //                    Ext.getStore('dashboard.TaskBookingStore').proxy.setExtraParam('id', user_language);
                    //                    Ext.getStore('dashboard.TaskBookingStore').proxy.setExtraParam('languageId', user_language);
                    if (t.itemid != 'companySearchContactWindowCS')
                        return;

                    var companyName = '';
                    var existingCompanyId = 0;
                    if (Ext.getCmp('CompanyGeneralInfo')) {
                        companyName = Ext.getCmp('CompanyGeneralInfo').getForm().findField('CompanyName').getValue();
                        //var filterCompanyName = Ext.ComponentQuery.query('bookingcompanysearchcontactlist textfield[itemid="fieldFilterCompanies"]')[0];
                        //filterCompanyName.setValue(addCompanyObj.CompanyName);
                        existingCompanyId = Ext.getCmp('CompanyProileWinForm').getForm().findField('CompanyId').getValue();
                    }


                    var companyId = Number(Ext.ComponentQuery.query('taskmanage hidden[itemid=companyId]')[0].getValue());
                    if (companyId > 0) {
                        companyName = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskCompany]')[0].getValue();
                        var individualId = Ext.ComponentQuery.query('taskmanage hidden[itemid=individualId]')[0].getValue();
                        var taskContact = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskContact]')[0].getValue();
                    }
                    else {
                        companyId = existingCompanyId;
                    }

                    var fieldFilterTaskObj = Ext.ComponentQuery.query('taskcompanysearchcontactlist textfield[itemid="fieldFilterCompanies"]')[0];
                    fieldFilterTaskObj.setValue(companyName);

                    Utils.MangageCompanyContact(1, Number(companyId), companyName, Number(individualId), '');
                    Ext.ComponentQuery.query('taskcompanycontactlistwindow [itemid=btnSelectTaskCompanyContact]')[0].enable();
                }
            },
            'taskcompanycontactlistwindow button[action=selectCompanyContact]': {
                click: function (t, e, eo) {
                    var win = Ext.WindowManager.getActive();
                    if (win) { win.close(); }

                    var selectedCompnay = Ext.getStore('bookingwizard.CompanySearchListStore').findRecord('Checked', true);
                    if (selectedCompnay != null && typeof selectedCompnay != undefined) {
                        var companyId = Ext.ComponentQuery.query('taskmanage hidden[itemid=companyId]')[0];
                        companyId.setValue(selectedCompnay.data.CompanyId);

                        var taskCompany = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskCompany]')[0];
                        taskCompany.setValue(selectedCompnay.data.CompanyName);
                    }
                    else {
                        var companyId = Ext.ComponentQuery.query('taskmanage hidden[itemid=companyId]')[0];
                        companyId.setValue(0);

                        var taskCompany = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskCompany]')[0];
                        taskCompany.setValue('-');
                    }

                    var selectedCompnayContact = Ext.getStore('bookingwizard.CompanyContactListStore').findRecord('Checked', true);
                    if (selectedCompnayContact != null && typeof selectedCompnayContact != undefined) {
                        var individualId = Ext.ComponentQuery.query('taskmanage hidden[itemid=individualId]')[0];
                        individualId.setValue(selectedCompnayContact.data.IndividualId);

                        var taskContact = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskContact]')[0];
                        taskContact.setValue(selectedCompnayContact.data.IndividualName);

                        var taskPhone = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskPhone]')[0];
                        if (Utils.isValid(selectedCompnayContact.data.Phone) && Utils.isValid(taskPhone)) {
                            taskPhone.setValue(selectedCompnayContact.data.Phone);
                        } else {
                            taskPhone.setValue('');
                        }

                        var taskEmail = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskEmail]')[0];
                        taskEmail.setValue(selectedCompnayContact.data.Email);
                    }
                    else {
                        var individualId = Ext.ComponentQuery.query('taskmanage hidden[itemid=individualId]')[0];
                        individualId.setValue(0);

                        var taskContact = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskContact]')[0];
                        taskContact.setValue('-');
                    }
                }
            },
            'companysmfinancials': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                },
                afterrender: function () {
                    var existingCompanyId = Ext.getCmp('CompanyProileWinForm').getForm().findField('CompanyId').getValue();
                    Ext.getStore('company.CompanySalesDetailStore').proxy.setExtraParam('languageId', user_language);
                    Ext.getStore('company.CompanySalesDetailStore').proxy.setExtraParam('id', existingCompanyId);
                    Ext.getStore('company.CompanySalesDetailStore').load();
                },
                beforeedit: function (editor, e, eOpts) {
                    //
                },
                edit: function (editor, e) {
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/CompanySales/IsWeightedTargetPercentageExist',
                        type: 'GET',
                        params: { year: e.newValues.Year },
                        success: function (res) {
                            if (res.success) {
                                Ext.Ajax.request({
                                    url: webAPI_path + 'api/CompanySales/ManageCompanySales',
                                    type: 'POST',
                                    params: e.newValues,
                                    success: function (response) {
                                        var r = Ext.decode(response.responseText);
                                        var ResultText = r.result;
                                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                            ResultText = ResultText.l("SP_DynamicCode");
                                        if (r.success == true) {
                                            Ext.getStore('company.CompanySalesDetailStore').proxy.setExtraParam('languageId', user_language);
                                            Ext.getStore('company.CompanySalesDetailStore').proxy.setExtraParam('id', e.newValues.CompanyId);
                                            Ext.getStore('company.CompanySalesDetailStore').load();

                                            var existingCompanyId = Ext.getCmp('CompanyProileWinForm').getForm().findField('CompanyId').getValue();
                                            Ext.getStore('company.CompanywideStore').proxy.setExtraParam('languageId', user_language);
                                            Ext.getStore('company.CompanywideStore').proxy.setExtraParam('id', existingCompanyId); //21266
                                            Ext.getStore('company.CompanywideStore').load({
                                                callback: function (response, o, success) {
                                                    if (response != null && response.length > 0) {
                                                        Ext.getCmp('companysmcompanywide').columns[1].setText(response[0].data.FirstYear);
                                                        Ext.getCmp('companysmcompanywide').columns[2].setText(response[0].data.SecondYear);
                                                        Ext.getCmp('companysmcompanywide').columns[3].setText(response[0].data.ThirdYear);
                                                    }
                                                }
                                            });
                                        }
                                        else {
                                            //Ext.getCmp('companysmfinancials').getStore().reload();
                                            Ext.getStore('company.CompanySalesDetailStore').proxy.setExtraParam('languageId', user_language);
                                            Ext.getStore('company.CompanySalesDetailStore').proxy.setExtraParam('id', e.newValues.CompanyId);
                                            Ext.getStore('company.CompanySalesDetailStore').load();
                                            Ext.Msg.alert('Error'.l('g'), ResultText);
                                        }
                                    },
                                    failure: function () {
                                        //Ext.getStore('company.CompanySalesDetailStore').reload();
                                        Ext.getStore('company.CompanySalesDetailStore').proxy.setExtraParam('languageId', user_language);
                                        Ext.getStore('company.CompanySalesDetailStore').proxy.setExtraParam('id', e.newValues.CompanyId);
                                        Ext.getStore('company.CompanySalesDetailStore').load();
                                        Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                    }
                                });
                            } else {
                                Ext.Msg.alert('Error'.l('g'), 'Please select available year'.l('SC61100'));
                                Ext.getStore('company.CompanySalesDetailStore').proxy.setExtraParam('languageId', user_language);
                                Ext.getStore('company.CompanySalesDetailStore').proxy.setExtraParam('id', e.newValues.CompanyId);
                                Ext.getStore('company.CompanySalesDetailStore').load();
                                return false;
                            }
                        },
                        failure: function () {
                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        }
                    });
                },
                canceledit: function () {
                    var existingCompanyId = Ext.getCmp('CompanyProileWinForm').getForm().findField('CompanyId').getValue();
                    Ext.getStore('company.CompanySalesDetailStore').proxy.setExtraParam('languageId', user_language);
                    Ext.getStore('company.CompanySalesDetailStore').proxy.setExtraParam('id', existingCompanyId);
                    Ext.getStore('company.CompanySalesDetailStore').load();
                }
            },
            'companysmfinancials button[action="addCompanySales"]': {
                click: function () {
                    var r = Ext.create('Regardz.model.company.CompanySalesDetail', {
                        CompanySalesDetailId: 0,
                        CompanyId: Ext.getCmp('CompanyProileWinForm').getForm().findField('CompanyId').getValue(),
                        Year: '',
                        ClientTargetQ1: '', ClientTargetQ2: '', ClientTargetQ3: '', ClientTargetQ4: '',
                        NewBusinessRevenueQ1: '', NewBusinessRevenueQ2: '', NewBusinessRevenueQ3: '', NewBusinessRevenueQ4: '',
                        DeepeningRevenueQ1: '', DeepeningRevenueQ2: '', DeepeningRevenueQ3: '', DeepeningRevenueQ4: '',
                        Reached: '', Target: '', WTarget: '', WTargetPlus: ''
                    });

                    editor = Ext.getCmp('companysmfinancials').editingPlugin;
                    editor.cancelEdit();
                    Ext.getCmp('companysmfinancials').getStore().insert(0, r);
                    editor.startEdit(0, 0);
                }
            },
            'button[action="saveBusinessAddress"]': {
                click: function () {

                    var bookingId = Ext.getCmp('manageBusinessType').getForm().findField('BookingId').getValue();
                    var bookingTrackingId = Ext.getCmp('manageBusinessType').getForm().findField('BookingTrackingId').getValue();
                    var businessTypeId = Ext.getCmp('manageBusinessType').getForm().findField('BusinessTypeId').getValue();

                    if (Ext.getCmp('manageBusinessType').getForm().isValid()) {
                        Ext.data.JsonP.request({
                            url: webAPI_path + 'api/MasterValue/UpdateBusinessTypeIdInBooking',
                            type: "GET",
                            params: {
                                bookingId: bookingId,
                                bookingTrackingId: bookingTrackingId,
                                businessTypeId: businessTypeId
                            },
                            success: function (response) {
                                var res = Ext.decode(response.responseText);
                                var r = response;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == true) {
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        var existingCompanyId = Ext.getCmp('CompanyProileWinForm').getForm().findField('CompanyId').getValue();
                                        //alert(existingCompanyId);
                                        Ext.getStore('company.BookingStore').proxy.setExtraParam('languageId', user_language);
                                        Ext.getStore('company.BookingStore').proxy.setExtraParam('id', existingCompanyId); //34 //rec
                                        Ext.getStore('company.BookingStore').proxy.setExtraParam('searchString', '');
                                        Ext.getStore('company.BookingStore').proxy.setExtraParam('id1', 0);
                                        Ext.getStore('company.BookingStore').load();
                                        //display_alert('MG00000');
                                        //close the add window popup
                                        win.close();
                                    }
                                } else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function () {
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        });
                    }
                }
            },
            'globaldistributionsystem': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'ChildCompanyDelete')
                        this.ChildCompanyDelete(zRec);
                }
            },
            'radiogroup [action="contactStatusChange"]': {
                change: function (a, newValue, oldValue, eOpts) {
                    if (newValue == true) {
                        CompanyId = Ext.getCmp('CompanyProileWinForm').getForm().findField('CompanyId').getValue();
                        Ext.getStore('company.CompanyContactListStore').proxy.setExtraParam('id', CompanyId);
                        Ext.getStore('company.CompanyContactListStore').proxy.setExtraParam('status', 1);
                        Ext.getStore('company.CompanyContactListStore').load();
                    } else {
                        CompanyId = Ext.getCmp('CompanyProileWinForm').getForm().findField('CompanyId').getValue();
                        Ext.getStore('company.CompanyContactListStore').proxy.setExtraParam('id', CompanyId);
                        Ext.getStore('company.CompanyContactListStore').proxy.setExtraParam('status', 0);
                        Ext.getStore('company.CompanyContactListStore').load();
                    }
                }
            },
            'radiogroup [action="taskStatusChange"]': {
                change: function (a, newValue, oldValue, eOpts) {
                    CompanyId = null;
                    IndividualId = null;

                    if (Ext.getCmp('CompanyProileWinForm') != null)
                        CompanyId = Ext.getCmp('CompanyProileWinForm').getForm().findField('CompanyId').getValue();
                    else
                        IndividualId = Ext.getCmp('IndividualProileWinForm').getForm().findField('IndividualId').getValue();

                    if (newValue == true) {
                        Ext.getStore('company.TaskStore').proxy.setExtraParam('languageId', user_language);
                        Ext.getStore('company.TaskStore').proxy.setExtraParam('id', CompanyId == null ? IndividualId : CompanyId); //34 //rec
                        Ext.getStore('company.TaskStore').proxy.setExtraParam('id1', CompanyId == null ? 22 : 21);
                        Ext.getStore('company.TaskStore').proxy.setExtraParam('searchString', '');
                        Ext.getStore('company.TaskStore').currentPage = 1;
                        Ext.getStore('company.TaskStore').load();
                    } else {
                        Ext.getStore('company.TaskStore').proxy.setExtraParam('languageId', user_language);
                        Ext.getStore('company.TaskStore').proxy.setExtraParam('id', CompanyId == null ? IndividualId : CompanyId); //34 //rec
                        Ext.getStore('company.TaskStore').proxy.setExtraParam('id1', CompanyId == null ? 12 : 11);
                        Ext.getStore('company.TaskStore').proxy.setExtraParam('searchString', '');
                        Ext.getStore('company.TaskStore').currentPage = 1;
                        Ext.getStore('company.TaskStore').load();
                    }
                }
            },
            //            'generalinfo': {
            //                afterrender: function (t) {
            //                    me.LoadCompanyOverviewDetails(t);
            //                }
            //            },
            'companyoverview': {
                afterrender: function (t) {
                    Ext.getCmp('CompanyGeneralInfo').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/company/GetCompanyProfile',
                        params: {
                            id: t.CompanyId,
                            languageId: user_language
                        },
                        success: function (form, action) {
                            var r = action.response.responseText;
                            r = Ext.decode(r);
                            var CompanyData = r.data;
                            me.getBookingslist().CompanyData = Ext.encode(CompanyData);
                            var thumbLogo = Ext.getCmp('CompanyGeneralInfo').getForm().findField('ThumbLogo').getValue();
                            if (thumbLogo != null && thumbLogo.length > 0) {
                                var thumbLogoPath = image_path + 'RAP/Asset/Company/' + thumbLogo;
                                var thumbImg = Ext.ComponentQuery.query('[itemid="imageThumb"]')[0];
                                thumbImg.setSrc(thumbLogoPath);
                                thumbImg.doComponentLayout();
                            }
                            else {
                                var thumbLogoPath = 'public/images/No_Image.png';
                                var thumbImg = Ext.ComponentQuery.query('[itemid="imageThumb"]')[0];
                                thumbImg.setWidth(50);
                                //  thumbImg.setHeight(50);
                                thumbImg.setSrc(thumbLogoPath);
                                thumbImg.doComponentLayout();
                            }

                            var statusCode = Ext.getCmp('CompanyGeneralInfo').getForm().findField('CompanyStatusCode').getValue(); ;
                            var colorPanel = Ext.ComponentQuery.query('panel [itemid="colorPanel"]')[0]; //console.log(p);

                            Utils.SetCompanyStatusColor(statusCode, colorPanel);

                            var ContractId = Ext.getCmp('CompanyGeneralInfo').getForm().findField('ContractId').getValue();
                            if (ContractId > 0) {
                                var contractButton = Ext.ComponentQuery.query('companyoverview button[itemid="showCompanyContractId"]')[0];
                                log('contractButton', contractButton);
                                contractButton.enable();
                            }


                            var visitAddrId = Ext.getCmp('CompanyGeneralInfo').getForm().findField('VisitingAddress').getValue(); //alert(v);

                            if (visitAddrId > 0) {
                                var btn = Ext.ComponentQuery.query('[action="addVisitAddr"]')[0];
                                btn.hide();

                                var btn = Ext.ComponentQuery.query('[action="viewVisitAddr"]')[0];
                                btn.addClass('webkit-any-link');
                                btn.show();
                            } else {
                                var btn = Ext.ComponentQuery.query('[action="viewVisitAddr"]')[0];
                                btn.hide();

                                var btn = Ext.ComponentQuery.query('[action="addVisitAddr"]')[0];
                                btn.show();
                            }

                            var postlAddrId = Ext.getCmp('CompanyGeneralInfo').getForm().findField('PostalAddress').getValue(); //alert(p);
                            if (postlAddrId > 0) {
                                var btn = Ext.ComponentQuery.query('[action="addPostAddr"]')[0];
                                btn.hide();

                                var btn = Ext.ComponentQuery.query('[action="viewPostAddr"]')[0];
                                btn.show();
                            } else {
                                var btn = Ext.ComponentQuery.query('[action="viewPostAddr"]')[0];
                                btn.hide();

                                var btn = Ext.ComponentQuery.query('[action="addPostAddr"]')[0];
                                btn.show();
                            }

                            var invoAddrId = Ext.getCmp('CompanyGeneralInfo').getForm().findField('InvoiceAddress').getValue(); //alert(i);
                            if (invoAddrId > 0) {
                                var btn = Ext.ComponentQuery.query('[action="addInvoAddr"]')[0];
                                btn.hide();

                                var btn = Ext.ComponentQuery.query('[action="viewInvoAddr"]')[0];
                                btn.show();
                            } else {
                                var btn = Ext.ComponentQuery.query('[action="viewInvoAddr"]')[0];
                                btn.hide();

                                var btn = Ext.ComponentQuery.query('[action="addInvoAddr"]')[0];
                                btn.show();
                            }
                        }
                    });
                    me.LoadCompanyOverviewDetails(t);
                    //this.loadCompSalesGrids(t.CompanyId);
                }
            },
            'companyoverview button[action="showCompanyContract"]': {
                click: function (t, e, o) {

                    var ContractId = Ext.getCmp('CompanyGeneralInfo').getForm().findField('ContractId').getValue();

                    if (ContractId > 0) {
                        var c = me.getController('bookingwizard.BWRPCompanyContract');
                        if (c.thisController == false) {
                            c.init();
                            c.thisController = true;
                        }
                        Utils.ShowWindow('widget.companycontractwindow', null);
                    }
                }
            },
            //////////////////////////////////////////////////////////////////////////////////
            /*  code for load add data in view area   Company Profile -> Overview ->        */
            /*  (Gen Info-fieldset -> Add link -> save Company Address )                    */
            //////////////////////////////////////////////////////////////////////////////////
            'button[action="saveCompanyAddress"]': {
                click: function () {
                    CompId = Ext.getCmp('CompanyProileWinForm').getForm().findField('CompanyId').getValue();

                    Ext.getCmp('addressManage').getForm().findField('CompanyId').setValue(CompId);

                    if (Ext.getCmp('addressManage').getForm().isValid()) {
                        var Postcode = Ext.getCmp('addressManage').getForm().findField('Pincode').getValue();
                        var CountryId = Ext.getCmp('addressManage').getForm().findField('CountryId').getValue();

                        if (!Utils.ValidatePostCodeFormate(CountryId, Postcode)) {
                            return false;
                        }

                        urlAddr = webAPI_path + 'api/Address/AddAddress';
                        addrData = Ext.getCmp('addressManage').getForm().getValues();

                        Ext.getCmp('addressManage').getForm().submit({
                            url: urlAddr,
                            type: 'POST',
                            data: addrData,
                            success: function (form, response) {
                                var r = response.response.responseText;
                                r = Ext.decode(r);

                                if (r.success == true) {
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/Company/BlankRequest',
                                        success: function () {
                                            //display_alert('MG00000');
                                        }
                                    });
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        //close the add window popup
                                        win.close();
                                    }

                                    //display_alert('MG00000');

                                    var addrid = Ext.getCmp('addressView').getForm().findField('AddressId').getValue(); //alert(addrid);                                    
                                    var addrtpCode = Ext.getCmp('addressView').getForm().findField('Code').getValue();

                                    if (addrtpCode == 'INVOICE') {
                                        //var addressIdv = Ext.getCmp('CCompanyOverview').getForm().findField('VisitingAddress').getValue(); //alert(addressId);
                                        Ext.getCmp('addressView').getForm().load({
                                            method: 'GET',
                                            url: webAPI_path + 'api/address/getaddressbyid',
                                            params: {
                                                id: addrid,
                                                languageId: user_language
                                            }
                                        });
                                    } else if (addrtpCode == 'POST') {

                                        // var addressIdp = Ext.getCmp('CCompanyOverview').getForm().findField('PostalAddress').getValue(); //alert(addressId);
                                        Ext.getCmp('addressView').getForm().load({
                                            method: 'GET',
                                            url: webAPI_path + 'api/address/getaddressbyid',
                                            params: {
                                                id: addrid,
                                                languageId: user_language
                                            }
                                        });
                                    } else if (addrtpCode == 'VISIT') {
                                        //var addressIdi = Ext.getCmp('CCompanyOverview').getForm().findField('InvoiceAddress').getValue(); //alert(addressId);
                                        Ext.getCmp('addressView').getForm().load({
                                            method: 'GET',
                                            url: webAPI_path + 'api/address/getaddressbyid',
                                            params: {
                                                id: addrid,
                                                languageId: user_language
                                            }
                                        });
                                    }

                                    //Ext.getCmp('addressView').show();

                                    Ext.getCmp('CompanyGeneralInfo').getForm().load({
                                        method: 'GET',
                                        url: webAPI_path + 'api/company/GetCompanyProfile',
                                        params: {
                                            id: CompId,
                                            languageId: user_language
                                        },
                                        success: function (form, action) {
                                            var v = Ext.getCmp('CompanyGeneralInfo').getForm().findField('VisitingAddress').getValue(); //alert(v);
                                            if (v > 0) {
                                                var btn = Ext.ComponentQuery.query('[action="addVisitAddr"]')[0];
                                                btn.hide();

                                                var btn = Ext.ComponentQuery.query('[action="viewVisitAddr"]')[0];
                                                btn.show();
                                            } else {
                                                var btn = Ext.ComponentQuery.query('[action="viewVisitAddr"]')[0];
                                                btn.hide();

                                                var btn = Ext.ComponentQuery.query('[action="addVisitAddr"]')[0];
                                                btn.show();
                                            }
                                            var p = Ext.getCmp('CompanyGeneralInfo').getForm().findField('PostalAddress').getValue(); //alert(p);
                                            if (p > 0) {
                                                var btn = Ext.ComponentQuery.query('[action="addPostAddr"]')[0];
                                                btn.hide();

                                                var btn = Ext.ComponentQuery.query('[action="viewPostAddr"]')[0];
                                                btn.show();
                                            } else {
                                                var btn = Ext.ComponentQuery.query('[action="viewPostAddr"]')[0];
                                                btn.hide();

                                                var btn = Ext.ComponentQuery.query('[action="addPostAddr"]')[0];
                                                btn.show();
                                            }
                                            var i = Ext.getCmp('CompanyGeneralInfo').getForm().findField('InvoiceAddress').getValue(); //alert(i);
                                            if (i > 0) {
                                                var btn = Ext.ComponentQuery.query('[action="addInvoAddr"]')[0];
                                                btn.hide();

                                                var btn = Ext.ComponentQuery.query('[action="viewInvoAddr"]')[0];
                                                btn.show();
                                            } else {
                                                var btn = Ext.ComponentQuery.query('[action="viewInvoAddr"]')[0];
                                                btn.hide();

                                                var btn = Ext.ComponentQuery.query('[action="addInvoAddr"]')[0];
                                                btn.show();
                                            }

                                            //var SMAN = Ext.getCmp('Sales_Generic').getForm().findField('HiddenSMAN').getValue(); alert(SMAN);
                                        }
                                    });
                                } else {
                                    //Ext.Msg.alert('Error'.l('g'), r.result);
                                }
                            },
                            failure: function (form, response) {
                                r = response.result;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == false) {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                } else {
                                    Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                }
                            }
                        })
                    }
                }
            },
            //////////////////////////////////////////////////////////////////////////////////
            /*                   code for load add data in view area                        */
            /* (Company Profile -> Overview -> Gen Info-fieldset -> Add visit addr  link )  */
            //////////////////////////////////////////////////////////////////////////////////
            'button[action="addVisitAddr"]': {
                click: function () {
                    Ext.create('widget.addressmanage', {
                        IndividualId: null,
                        AddressType: 'VISIT',
                        AddressTypeId: 20
                    }).show();

                    var radioGrp = Ext.ComponentQuery.query('addressmanage radiogroup[itemid="addressTypeRadio"]')[0];
                    radioGrp.items.items[1].setValue(true);
                    radioGrp.disable(1);
                }
            },
            //////////////////////////////////////////////////////////////////////////////////
            /*                   code for load add data in view area                        */
            /* (Company Profile -> Overview -> Gen Info-fieldset -> Add postal add link )   */
            //////////////////////////////////////////////////////////////////////////////////
            'button[action="addPostAddr"]': {
                click: function () {
                    Ext.create('widget.addressmanage', {
                        IndividualId: null,
                        //AddressType: 'PostalAddress',
                        AddressType: 'POST',
                        AddressTypeId: 4
                    }).show();
                    var radioGrp = Ext.ComponentQuery.query('addressmanage radiogroup[itemid="addressTypeRadio"]')[0];
                    radioGrp.items.items[0].setValue(true);
                    radioGrp.disable(1);
                }
            },
            /* START - filter search for merge to company */
            'addchildcompany textfield[itemid=searchStringCompany]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        var r = Ext.ComponentQuery.query('addchildcompany [itemid="searchStringCompany"]')[0].getValue();
                        Ext.getStore('company.AddChildCompanyStore').clearFilter();

                        var grid = Ext.ComponentQuery.query('grid[itemid=AddChildCompany]')[0];
                        grid.getStore().load({
                            params: { 'id': me.companyId, 'languageId': user_language, 'id1': me.CompanySelectionType, searchString: r }
                        });

                        if (r.length > 0) {
                            var clearIcon = Ext.ComponentQuery.query('[action="clearCompany"]')[0];
                            clearIcon.show();
                        }
                    }
                }
            },
            'addchildcompany button[action=searchCompany]': {
                click: function () {
                    var r = Ext.ComponentQuery.query('addchildcompany [itemid="searchStringCompany"]')[0].getValue();
                    Ext.getStore('company.AddChildCompanyStore').clearFilter();

                    var grid = Ext.ComponentQuery.query('grid[itemid=AddChildCompany]')[0];
                    grid.getStore().load({
                        params: { 'id': me.companyId, 'languageId': user_language, 'id1': me.CompanySelectionType, searchString: r }
                    });

                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearCompany"]')[0];
                        clearIcon.show();
                    }
                }
            },
            'addchildcompany button[action="clearCompany"]': {
                click: function () {
                    var grid = Ext.ComponentQuery.query('grid[itemid=AddChildCompany]')[0];
                    grid.getStore().load({
                        params: { 'id': me.companyId, 'languageId': user_language, 'id1': me.CompanySelectionType, searchString: '' }
                    });

                    Ext.ComponentQuery.query('addchildcompany [itemid="searchStringCompany"]')[0].setValue('');
                    Ext.getStore('company.AddChildCompanyStore').clearFilter();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearCompany"]')[0];
                    clearIcon.hide();
                }
            },
            /* END - filter search for merge to company */
            //////////////////////////////////////////////////////////////////////////////////
            /*                   code for load add data in view area                        */
            /* (Company Profile -> Overview -> Gen Info-fieldset -> Add invoic addr link )  */
            //////////////////////////////////////////////////////////////////////////////////
            'button[action="addInvoAddr"]': {
                click: function () {
                    Ext.create('widget.addressmanage', {
                        IndividualId: null,
                        //AddressType: 'InvoiceAddress',
                        AddressType: 'INVOICE',
                        AddressTypeId: 5
                    }).show();
                    var radioGrp = Ext.ComponentQuery.query('addressmanage radiogroup[itemid="addressTypeRadio"]')[0];
                    radioGrp.items.items[2].setValue(true);
                    radioGrp.disable(1);

                    Ext.ComponentQuery.query('addressmanage [itemid="attentiontoText"]')[0].enable();
                    Ext.ComponentQuery.query('addressmanage [itemid="attentiontoValue"]')[0].enable();
                }
            },
            'button[action="addAddress"]': {
                click: function () {
                    Ext.create('widget.addressmanage', {
                        IndividualId: 0
                    }).show();
                    me.AddressTypesStore(0);
                }
            },
            'radiogroup [action="addressTypesValue"]': {
                change: function (a, newValue, oldValue, eOpts) {
                    if (newValue == true) {
                        Ext.getCmp('addCompany').getForm().findField('AddressTypeId').setValue(Ext.getCmp('addCompany').getForm().findField(a.id).inputValue);
                    }
                }
            },
            'companyoverview image[itemid="imageThumb"]': {
                render: function (c) {
                    c.getEl().on('click', function (e) {
                        Ext.getCmp('commentsView').hide();
                        Ext.getCmp('addressView').hide();
                        Ext.getCmp('contactviewid').hide();
                        Ext.getCmp('bookingviewid').hide();
                        Ext.getCmp('taskviewid').hide();
                        Ext.getCmp('imagetempView').show();

                        var originalLogo = Ext.getCmp('CompanyGeneralInfo').getForm().findField('OriginalLogo').getValue();
                        if (originalLogo != null && originalLogo.length > 0) {
                            var originalLogoPath = image_path + 'RAP/Asset/Company/' + originalLogo;
                            var actualLogo = Ext.ComponentQuery.query('companyoverview image[itemid="actualLogo"]')[0];
                            actualLogo.setSrc(originalLogoPath);
                            actualLogo.doComponentLayout();
                        }
                        else {
                            var originalLogoPath = 'public/images/No_Image.png';
                            var actualLogo = Ext.ComponentQuery.query('companyoverview image[itemid="actualLogo"]')[0];
                            actualLogo.setSrc(originalLogoPath);
                            actualLogo.doComponentLayout();
                        }

                    }, c);
                }
            },
            'radiogroup [action="StatusIdValue"]': {
                change: function (a, newValue, oldValue, eOpts) {
                    if (newValue == true) {
                        //alert(Ext.getCmp('addCompany').getForm().findField(a.id).inputValue);
                        Ext.getCmp('addCompany').getForm().findField('StatusId').setValue(Ext.getCmp('addCompany').getForm().findField(a.id).inputValue);
                    }
                }
            },
            //////////////////////////////////////////////////////////////////////////
            /* code for Add Contact from Company Profile-> OverView -> contact grid */
            //////////////////////////////////////////////////////////////////////////
            'button[action="addContact"]': {
                click: function () {
                    var conpanyId = Ext.getCmp('CompanyProileWinForm').getForm().findField('CompanyId').getValue(); // CompanyProileWinForm
                    Ext.create('widget.contactmanagetabs', {
                        IndividualId: 0,
                        CompanyId: conpanyId
                    }).show();

                    this.loadSalesGrids(0);
                    var checkbox = Ext.ComponentQuery.query('contactmanage checkbox[itemid=isNewsletterSubsCM]')[0];
                    checkbox.disable(1);
                }
            },
            'ccompanyoverview [itemid="imageThumb"]': {
                render: function (c) {
                    c.getEl().on('click', function (e) {
                        Ext.getCmp('commentsView').hide();
                        Ext.getCmp('addressView').hide();

                        var originalLogo = Ext.getCmp('CompanyGeneralInfo').getForm().findField('OriginalLogo').getValue();
                        if (originalLogo != null && originalLogo.length > 0) {
                            var originalLogoPath = image_path + 'RAP/Asset/Company/' + originalLogo;
                            var actualLogo = Ext.ComponentQuery.query('[itemid="actualLogo"]')[0];
                            actualLogo.setSrc(originalLogoPath);
                            actualLogo.doComponentLayout();
                        }
                        else {
                            var originalLogoPath = 'public/images/No_Image.png';
                            var actualLogo = Ext.ComponentQuery.query('[itemid="actualLogo"]')[0];
                            actualLogo.setSrc(originalLogoPath);
                            actualLogo.doComponentLayout();
                        }

                        Ext.getCmp('imagetempView').show();

                    }, c);
                }
            },
            'panel [itemid="globaldistributionsystem"]': {
                activate: function (t, e) {

                    Ext.ComponentQuery.query('panel [itemid="globaldistributionsystem"]')[0].disable();

                }
            },
            'button[action="UploadLogo"]': {
                click: function () {
                    var comapnyId = Ext.getCmp('generalInfo').getForm().findField('CompanyId').getValue();
                    Ext.create('widget.uploadlogo', {
                        CompanyId: comapnyId
                    }).show();
                }
            },

            ///NOT IN USE NOW
            'button[action="ConfirmDomainChangeOther"]': {
                click: function () {

                    //                    var CName = Ext.getCmp('generalInfo').getForm().findField('CompanyName').getValue();
                    //                    var DName = Ext.getCmp('generalInfo').getForm().findField('CompanyDomain').getValue();

                    //                    Ext.data.JsonP.request({
                    //                        url: webAPI_path + 'api/company/IsDuplicateCompany',
                    //                        type: "GET",
                    //                        params: {
                    //                            id: CName,
                    //                            languageId: DName
                    //                        },
                    //                        success: function (response) {
                    //                            var res = Ext.decode(response.responseText);
                    //                            var r = response;
                    //                            if (r.success == true) {
                    //                                Ext.Msg.alert('Success'.l('g'), 'Domain Name is Available'.l('SC60000'));
                    //                                Ext.getCmp('generalInfo').getForm().findField('CompanyDomain').setReadOnly(1);
                    //                                Ext.getCmp('generalInfo').getForm().findField('CompanyDomain').addClass('x-item-disabled');

                    //                                var btnOther = Ext.ComponentQuery.query('[itemid="btn_DomainOther"]')[0];
                    //                                btnOther.hide();

                    //                                var btn = Ext.ComponentQuery.query('[itemid="btn_Domain"]')[0];
                    //                                btn.show();
                    //                            } else {
                    //                                Ext.Msg.alert('Error'.l('g'), r.result);
                    //                            }
                    //                        },
                    //                        failure: function () {
                    //                            Ext.Msg.alert('Error'.l('g'), 'Record not deleted.'.l('g'));
                    //                        }
                    //                    });

                }
            },
            //NEW-DOMAIN
            'domainlistforcompany': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'CompDomainDelete')
                        this.CompDomainDelete(zRec);
                },
                afterrender: function () {
                    var comapnyId = Ext.getCmp('generalInfo').getForm().findField('CompanyId').getValue();
                    Ext.getStore('company.DomainListStore').proxy.setExtraParam('id', comapnyId);
                    Ext.getStore('company.DomainListStore').load();
                    //Ext.getCmp('domainlistforcompany').getStore().reload();

                },
                edit: function (editor, e) {
                    var CompanyId = Ext.getCmp('generalInfo').getForm().findField('CompanyId').getValue();
                    e.newValues.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                    e.newValues.CreatedBy = CurrentSessionUserId;
                    e.newValues.CompanyId = CompanyId;
                    Ext.Ajax.request({
                        url: webAPI_path + 'api/company/AddNewCompanyDomain',
                        type: 'POST',
                        params: e.newValues,
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                Ext.getStore('company.DomainListStore').reload();
                                Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                                Ext.getStore('company.DomainListStore').reload();

                            }
                        },
                        failure: function () {
                            Ext.getStore('company.DomainListStore').reload();
                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        }
                    });
                },
                canceledit: function () {
                    Ext.getStore('company.DomainListStore').reload();
                }
            },
            'domainlistforcompany button[action="addCompanyDomain"]': {
                click: function () {
                    var comapnyId = Ext.getCmp('generalInfo').getForm().findField('CompanyId').getValue();
                    var r = Ext.create('Regardz.model.company.CompanyDomain', {
                        DomainName: '',
                        CompanyDomainId: 0,
                        CompanyId: comapnyId,
                        CreatedDate: Ext.Date.format(new Date(), 'Y-m-d H:i:s'),
                        CreatedBy: CurrentSessionUserId
                    });

                    editor = Ext.getCmp('domainlistforcompany').editingPlugin;
                    editor.cancelEdit();
                    Ext.getCmp('domainlistforcompany').getStore().insert(0, r);
                    editor.startEdit(0, 0);
                }
            },
            'button[action="btnParentCompany"]': {
                click: function () {
                    Ext.getCmp('CompanyProileWinForm').getForm().findField('ChildCompanyFlag').setValue(1);
                    Ext.getStore('company.AddChildCompanyStore').proxy.setExtraParam('languageId', user_language);
                    Ext.getStore('company.AddChildCompanyStore').proxy.setExtraParam('id1', 3); // For All companies which can be parent
                    Ext.getStore('company.AddChildCompanyStore').proxy.setExtraParam('searchString', '');
                    Ext.getStore('company.AddChildCompanyStore').load();
                    me.CompanySelectionType = 3;
                    Ext.create('widget.addchildcompanywin').show();

                }
            },
            'button[action="btnAgency"]': {
                click: function () {
                    Ext.getCmp('CompanyProileWinForm').getForm().findField('ChildCompanyFlag').setValue(3);
                    Ext.getStore('company.AddChildCompanyStore').proxy.setExtraParam('languageId', user_language);
                    Ext.getStore('company.AddChildCompanyStore').proxy.setExtraParam('id1', 2); //For IsAgency=true
                    Ext.getStore('company.AddChildCompanyStore').proxy.setExtraParam('searchString', '');
                    Ext.getStore('company.AddChildCompanyStore').load();
                    me.CompanySelectionType = 2;
                    Ext.create('widget.addchildcompanywin').show();
                }
            },
            'addchildcompanywin button[action="saveCompanyRelations"]': {
                click: function (r) {
                    var rec;
                    var AddChildCompany = me.getAddChildCompany().store.data;
                    if (AddChildCompany != null && AddChildCompany.length > 0) {
                        for (var i = 0; i < AddChildCompany.length; i++) {
                            if (AddChildCompany.items[i].data.Checked == "1") {
                                rec = AddChildCompany.items[i];
                            }
                        }
                    }
                    this.AddCompany(rec);
                }
            },
            'addmultichildcompanywin button[action="saveCompanyRelations"]': {
                click: function (r) {
                    var rec;
                    //ROCK        
                    var cmpIds = '';
                    var AddMultiChildCompany = me.getAddMultiChildCompany().store.data;
                    if (AddMultiChildCompany != null && AddMultiChildCompany.length > 0) {
                        for (var i = 0; i < AddMultiChildCompany.length; i++) {
                            if (AddMultiChildCompany.items[i].data.Checked == "1") {
                                cmpIds += AddMultiChildCompany.items[i].data.CompanyId + ",";
                            }
                        }
                    }
                    cmpIds = cmpIds.replace(/\,$/, '');

                    this.AddCompany(cmpIds);
                }
            },
            //Not in Use - MM
            'button[action="ConfirmDomainChange"]': {
                click: function () {

                    //                    Ext.MessageBox.confirm('Domain Change'.l('SC60000'), 'Are you sure to Change the Domain ?'.l('SC60000'), function (btn) {
                    //                        if (btn === 'yes') {

                    //                            Ext.getCmp('generalInfo').getForm().findField('CompanyDomain').setReadOnly(0);
                    //                            Ext.getCmp('generalInfo').getForm().findField('CompanyDomain').removeCls('x-item-disabled');

                    //                            var btn = Ext.ComponentQuery.query('[action="ConfirmDomainChange"]')[0];
                    //                            btn.hide();
                    //                            var btn = Ext.ComponentQuery.query('[action="ConfirmDomainChangeOther"]')[0];
                    //                            btn.show();
                    //                        }

                    //                    });
                }
            },
            'companyprofile button[action="saveCompanyProfile"]': {
                click: function () {
                    //Company Profile Save                    
                    /*BuyingReasonList Ids*/
                    var buyingReasonIds = '';
                    var isOtherBuyingReason = false;
                    var isOtherCompetitor = false;
                    var isAllProperties = false;
                    var isAllMeetingTypes = false;
                    var BuyingReasonList = me.getBuyingReasonList().store.data;
                    if (BuyingReasonList != null && BuyingReasonList.length > 0) {
                        for (var i = 0; i < BuyingReasonList.length; i++) {
                            if (BuyingReasonList.items[i].data.Checked == "1") {
                                if (BuyingReasonList.items[i].data.BuyingReasonId != 0) {
                                    buyingReasonIds += BuyingReasonList.items[i].data.BuyingReasonId + ",";
                                }
                                else
                                    isOtherBuyingReason = true;
                            }
                        }
                    }
                    buyingReasonIds = buyingReasonIds.replace(/\,$/, '');
                    /*BuyingReasonList Ids*/

                    /*CompetitorsList Ids*/
                    var competitorsIds = '';
                    var CompetitorsList = me.getCompetitorsList().store.data;
                    if (CompetitorsList != null && CompetitorsList.length > 0) {
                        for (var i = 0; i < CompetitorsList.length; i++) {
                            if (CompetitorsList.items[i].data.Checked == "1") {
                                if (CompetitorsList.items[i].data.CompetitorId != 0) {
                                    competitorsIds += CompetitorsList.items[i].data.CompetitorId + ",";
                                }
                                else
                                    isOtherCompetitor = true;
                            }
                        }
                    }
                    competitorsIds = competitorsIds.replace(/\,$/, '');
                    /*CompetitorsList Ids*/

                    /*PotentialPropertylist Ids*/
                    var potentialPropertyIds = '';
                    var PotentialPropertylist = me.getPotentialPropertylist().store.data;
                    if (PotentialPropertylist != null && PotentialPropertylist.length > 0) {
                        for (var i = 0; i < PotentialPropertylist.length; i++) {
                            if (PotentialPropertylist.items[i].data.Checked == "1") {
                                if (PotentialPropertylist.items[i].data.PropertyId != 0) {
                                    potentialPropertyIds += PotentialPropertylist.items[i].data.PropertyId + ",";
                                }
                                else
                                    isAllProperties = true;
                            }
                        }
                    }
                    potentialPropertyIds = potentialPropertyIds.replace(/\,$/, '');
                    /*PotentialPropertylist Ids*/


                    /*PotentialMeetingtypelist Ids*/
                    var potentialSegmentIds = '';
                    var PotentialMeetingtypelist = me.getPotentialMeetingtypelist().store.data;
                    if (PotentialMeetingtypelist != null && PotentialMeetingtypelist.length > 0) {
                        for (var i = 0; i < PotentialMeetingtypelist.length; i++) {
                            if (PotentialMeetingtypelist.items[i].data.Checked == "1") {
                                if (PotentialMeetingtypelist.items[i].data.PotentialSegmentId != 0) {
                                    potentialSegmentIds += PotentialMeetingtypelist.items[i].data.PotentialSegmentId + ",";
                                }
                                else
                                    isAllMeetingTypes = true;
                            }
                        }
                    }
                    potentialSegmentIds = potentialSegmentIds.replace(/\,$/, '');
                    /*PotentialMeetingtypelist Ids*/
                    /////////////////////////
                    //                    var formSales_I = Ext.getCmp('Sales_I');
                    //                    var formIndividual = Ext.getCmp('addIndividual').getForm();
                    //formIndividual.findField('BusinessTypeId').setValue(formSales_I.getForm().findField('BusinessTypeId').getValue());

                    var formSales_G = Ext.getCmp('Sales_Generic');
                    var formSales_GInfo = Ext.getCmp('generalInfo').getForm();

                    //                    console.log(buyingReasonIds);
                    //                    console.log(competitorsIds);
                    //                    console.log(potentialPropertyIds);
                    //                    console.log(potentialMeetingtypeIds);                    

                    ///Set IDs
                    formSales_GInfo.findField('BuyingReasonIds').setValue(buyingReasonIds);
                    formSales_GInfo.findField('CompetitorsIds').setValue(competitorsIds);
                    formSales_GInfo.findField('PotentialPropertyIds').setValue(potentialPropertyIds);
                    formSales_GInfo.findField('PotentialMeetingtypeIds').setValue(potentialSegmentIds);

                    if (isOtherBuyingReason) {
                        formSales_G.getForm().findField('BuyingReasonOther').allowBlank = false;
                        formSales_GInfo.findField('BuyingReasonOther').setValue(formSales_G.getForm().findField('BuyingReasonOther').getValue());
                    }
                    else {
                        formSales_G.getForm().findField('BuyingReasonOther').allowBlank = true;
                        formSales_G.getForm().findField('BuyingReasonOther').setValue('')
                        formSales_GInfo.findField('BuyingReasonOther').setValue('');
                    }

                    if (isOtherCompetitor) {
                        formSales_G.getForm().findField('CompetitorsOther').allowBlank = false;
                        formSales_GInfo.findField('CompetitorsOther').setValue(formSales_G.getForm().findField('CompetitorsOther').getValue());
                    }
                    else {
                        formSales_G.getForm().findField('CompetitorsOther').allowBlank = true;
                        formSales_G.getForm().findField('CompetitorsOther').setValue('')
                        formSales_GInfo.findField('CompetitorsOther').setValue('');
                    }
                    formSales_GInfo.findField('IsAllProperties').setValue(isAllProperties);
                    formSales_GInfo.findField('IsAllMeetingTypes').setValue(isAllMeetingTypes);

                    //debugger;
                    if (me.isCompanySMTabOpen == true) {
                        ///End of Set IDs
                        formSales_GInfo.findField('SalesManagerId').setValue(formSales_G.getForm().findField('SalesManagerId').getValue());
                        formSales_GInfo.findField('SalesManagerAssistantId').setValue(formSales_G.getForm().findField('SalesManagerAssistantId').getValue());
                        formSales_GInfo.findField('LeadSourceId').setValue(formSales_G.getForm().findField('LeadSourceId').getValue());
                        formSales_GInfo.findField('StatusId').setValue(formSales_G.getForm().findField('StatusId').getValue());
                        formSales_GInfo.findField('QualityRating').setValue(formSales_G.getForm().findField('QualityRating').getValue());
                        formSales_GInfo.findField('BusinessTypeId').setValue(formSales_G.getForm().findField('BusinessTypeId').getValue());
                        formSales_GInfo.findField('CreditStatusId').setValue(formSales_G.getForm().findField('CreditStatusId').getValue());
                        formSales_GInfo.findField('NoOfEmployees').setValue(formSales_G.getForm().findField('NoOfEmployees').getValue());
                        formSales_GInfo.findField('NoOfBookingAYear').setValue(formSales_G.getForm().findField('NoOfBookingAYear').getValue());

                        var revenueTotalInNL = formSales_G.getForm().findField('RevenueTotalInNL').getValue();
                        if (revenueTotalInNL != null || revenueTotalInNL != undefined) formSales_GInfo.findField('RevenueTotalInNL').setValue(revenueTotalInNL);
                        var potentialRevenue = formSales_G.getForm().findField('PotentialRevenue').getValue();
                        if (potentialRevenue != null || potentialRevenue != undefined) formSales_GInfo.findField('PotentialRevenue').setValue(potentialRevenue);
                        formSales_GInfo.findField('GroupSizeMin').setValue(formSales_G.getForm().findField('GroupSizeMin').getValue());
                        formSales_GInfo.findField('GroupSizeMax').setValue(formSales_G.getForm().findField('GroupSizeMax').getValue());
                        formSales_GInfo.findField('NoOfRoomNightsAYear').setValue(formSales_G.getForm().findField('NoOfRoomNightsAYear').getValue());
                        formSales_GInfo.findField('LeadStatusId').setValue(formSales_G.getForm().findField('LeadStatusId').getValue());
                        formSales_GInfo.findField('Clientpagelink').setValue(formSales_G.getForm().findField('Clientpagelink').getValue());
                        formSales_GInfo.findField('ClientpageLogin').setValue(formSales_G.getForm().findField('ClientpageLogin').getValue());
                        formSales_GInfo.findField('Clientpagelink').setValue(formSales_G.getForm().findField('Clientpagelink').getValue());
                        formSales_GInfo.findField('ClientpagePwd').setValue(formSales_G.getForm().findField('ClientpagePwd').getValue());
                        formSales_GInfo.findField('PaymentMode').setValue(formSales_G.getForm().findField('PaymentMode').getValue());
                    }

                    /////////////////////////
                    //debugger;
                    if (Ext.getCmp('generalInfo').getForm().isValid() && (Ext.getCmp('Sales_Generic').getForm().isValid() || me.isCompanySMTabOpen == false)) {
                        //GDS Save
                        var agencyStatus = Ext.getCmp('generalInfo').getForm().findField('IsAgency').getValue(); //alert(agenSts);
                        if (agencyStatus == true) {
                            var comapnyId = Ext.getCmp('generalInfo').getForm().findField('CompanyId').getValue();
                            var gdsData = new Object();
                            gdsData.CompanyId = comapnyId;

                            var gdsIds = '';
                            var gds = Ext.getCmp('gds').store.data;
                            if (gds != null && gds.length > 0) {
                                for (var i = 0; i < gds.length; i++) {
                                    if (gds.items[i].data.Checked == "1")
                                        gdsIds += gds.items[i].data.GlobalDistributionId + ",";
                                }
                            }
                            gdsData.GDSIds = gdsIds;
                            if (gdsIds.length > 0) {
                                Ext.Ajax.request({
                                    url: webAPI_path + 'api/company/UpdateCompanyGDS',
                                    actionMethods: 'POST',
                                    params: gdsData,
                                    success: function (response) {
                                        var r = Ext.decode(response.responseText);
                                        var ResultText = r.result;
                                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                            ResultText = ResultText.l("SP_DynamicCode");
                                        if (r.success == true) {
                                            //Ext.Msg.alert('Success', 'Domain Name is Available');
                                            //Ext.getCmp('generalInfo').getForm().findField('CompanyDomain').setReadOnly(1);
                                            //Ext.getCmp('generalInfo').getForm().findField('CompanyDomain').addClass('x-item-disabled');
                                        } else {
                                            Ext.Msg.alert('Error'.l('g'), ResultText);
                                        }
                                    },
                                    failure: function () {
                                        Ext.Msg.alert('Error'.l('g'), 'GDS not Saved.'.l('SC60000'));
                                    }
                                });
                            }
                        }

                        var comapnyId = Ext.getCmp('generalInfo').getForm().findField('CompanyId').getValue();
                        if (comapnyId > 0) {
                            Ext.getCmp('generalInfo').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('generalInfo').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        } else {
                            Ext.getCmp('generalInfo').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('generalInfo').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        var urlCompany = webAPI_path + 'api/company/UpdateCompany';
                        Ext.getCmp('generalInfo').getForm().submit({
                            url: urlCompany,
                            actionMethods: 'POST',
                            params: Ext.getCmp('generalInfo').getForm().getValues(),
                            success: function (form, response) {
                                var r = response.response.responseText;
                                r = Ext.decode(r);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == true) {
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        win.close();
                                    }
                                    Ext.getStore('customer.CustomerListStore').reload();
                                    //display_alert('MG00000');
                                    //                                    Ext.getCmp('CompanyGeneralInfo').getForm().load({
                                    //                                        method: 'GET',
                                    //                                        url: webAPI_path + 'api/company/GetCompanyProfile',
                                    //                                        params: {
                                    //                                            id: comapnyId, //rec.data.CompanyId,
                                    //                                            languageId: user_language
                                    //                                        }
                                    //                                    });
                                } else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function (form, response) {
                                var r = response.response.responseText;
                                r = Ext.decode(r);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.Msg.alert('Error'.l('g'), ResultText); // 'Information not saved.');
                            }
                        });
                    }
                    else {
                        Ext.Msg.alert('Error'.l('g'), 'Some fields are requred, check all tabs.'.l('g'));
                    }
                }
            },
            'button[action="saveLogo"]': {
                click: function () {
                    if (Ext.getCmp('uploadLogo').getForm().isValid()) {
                        var urlCompanyLogo = webAPI_path + 'api/company/PostCompanyLogo';

                        Ext.getCmp('uploadLogo').getForm().submit({
                            url: urlCompanyLogo,
                            waitMsg: 'Uploading file please wait.'.l('g'),
                            nMactioethods: 'POST',
                            params: Ext.getCmp('uploadLogo').getForm().getValues(),
                            success: function (form, response) {
                                me.getUploadlogo().close();

                                var VarCompanyId = Ext.getCmp('CompanyGeneralInfo').getForm().findField('CompanyId').getValue();
                                Ext.getCmp('generalInfo').getForm().load({
                                    method: 'GET',
                                    url: webAPI_path + 'api/company/GetCompanyProfile',
                                    params: {
                                        id: VarCompanyId,
                                        languageId: user_language
                                    },
                                    success: function (form, r) {
                                        //console.log(r);
                                        var thumbLogo = r.result.data.ThumbLogo;
                                        if (thumbLogo != null && thumbLogo.length > 0) {
                                            var thumbLogoPath = image_path + 'RAP/Asset/Company/' + thumbLogo;
                                            var thumbImg = Ext.ComponentQuery.query('[itemid="imageThumb"]')[0];
                                            thumbImg.setSrc(thumbLogoPath);
                                            thumbImg.doComponentLayout();
                                            Ext.getCmp('CompanyGeneralInfo').getForm().findField('PreviewLogo').setValue(r.result.data.PreviewLogo);
                                            Ext.getCmp('CompanyGeneralInfo').getForm().findField('OriginalLogo').setValue(r.result.data.OriginalLogo);
                                        }
                                        else {
                                            var thumbLogoPath = 'public/images/No_Image.png';
                                            var thumbImg = Ext.ComponentQuery.query('[itemid="imageThumb"]')[0];
                                            thumbImg.setSrc(thumbLogoPath);
                                            thumbImg.doComponentLayout();
                                        }
                                    }
                                });

                            },
                            failure: function (form, response) {
                                r = response.result;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == false) {
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        win.close();
                                    }
                                    Ext.Msg.alert('Error'.l('g'), ResultText); // 'Information not saved.');
                                }
                            }
                        });

                    }
                }
            },
            'uploadlogo': {
                afterrender: function () {
                    var previewLogo = Ext.getCmp('CompanyGeneralInfo').getForm().findField('PreviewLogo').getValue();
                    if (previewLogo != null && previewLogo.length > 0) {
                        var previewLogoPath = image_path + 'RAP/Asset/Company/' + previewLogo;
                        var thumbImg = Ext.ComponentQuery.query('[itemid="previewLogo"]')[0];
                        thumbImg.setSrc(previewLogoPath);
                        thumbImg.doComponentLayout();
                    }
                    else {
                        var previewLogoPath = 'public/images/No_Image.png';
                        var thumbImg = Ext.ComponentQuery.query('[itemid="previewLogo"]')[0];
                        thumbImg.setSrc(previewLogoPath);
                        thumbImg.doComponentLayout();
                    }

                }
            },
            'generalinfo checkbox[action="Agency_GI"]': {
                change: function (field, newVal, oldVal, eOpts) {
                    if (newVal == false) {
                        Ext.ComponentQuery.query('panel [itemid="globaldistributionsystem"]')[0].disable(1); // stepOneObj = null;
                        Ext.ComponentQuery.query('panel [itemid="btnParentCompany"]')[0].enable(1);
                        Ext.ComponentQuery.query('panel [itemid="btnAgency"]')[0].enable(1);
                    } else {
                        Ext.ComponentQuery.query('panel [itemid="globaldistributionsystem"]')[0].enable(1); // stepOneObj = null;
                        Ext.ComponentQuery.query('panel [itemid="btnParentCompany"]')[0].disable(1);
                        Ext.ComponentQuery.query('panel [itemid="btnAgency"]')[0].disable(1);
                    }
                },
                afterrender: function () {

                    //                    Ext.getCmp('generalInfo').getForm().findField('CompanyDomain').setReadOnly(1);
                    //                    Ext.getCmp('generalInfo').getForm().findField('CompanyDomain').addClass('x-item-disabled');

                    LanguageId = Ext.getCmp('CompanyGeneralInfo').getForm().findField('IsAgency').getValue(); // CompanyProfileWinForm//alert(LanguageId);

                    if (LanguageId == 'false') {

                        Ext.ComponentQuery.query('panel [itemid="globaldistributionsystem"]')[0].disable(1);
                    } else
                        Ext.ComponentQuery.query('panel [itemid="globaldistributionsystem"]')[0].enable(1);
                }
            },
            'button[action="addGDS"]': {
                click: function () {
                    Ext.create('widget.overview_I').show();
                }
            },
            'overview_I': {
                afterrender: function () {
                    //                    var grid = Ext.ComponentQuery.query('taskslist grid[itemid="taskslist"]')[0];
                    //                    grid.getStore().reload();
                }
            },
            'childcompanylist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'ChildCompanyDelete')
                        this.ChildCompanyDelete(zRec);
                }
            },
            'customerbookingslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    Ext.getCmp('Overview_I').getForm().findField('Notes').hide();
                    //Ext.getCmp('Overview_I').getForm().findField('bookingviewid').show();
                    Ext.getCmp('bookingviewid').show();
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    this.BookingView(zRec);
                }
            },
            'addchildcompany': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'AddCompany')
                        this.AddCompany(zRec);
                }
            },
            'button[action="AddChildCompany"]': {
                click: function () {
                    //ROCK
                    Ext.getCmp('CompanyProileWinForm').getForm().findField('ChildCompanyFlag').setValue(0);
                    Ext.getStore('company.AddChildCompanyStore').proxy.setExtraParam('languageId', user_language);
                    Ext.getStore('company.AddChildCompanyStore').proxy.setExtraParam('id1', 0); //For IsAgency=true
                    Ext.getStore('company.AddChildCompanyStore').proxy.setExtraParam('searchString', '');
                    Ext.getStore('company.AddChildCompanyStore').load();
                    me.CompanySelectionType = 0;
                    Ext.create('widget.addmultichildcompanywin').show();

                }
            },
            'button[action="addrEdit"]': {
                click: function () {
                    var addressId = Ext.getCmp('addressView').getForm().findField('AddressId').getValue(); //alert(addressId);
                    Ext.create('widget.addressmanage').show();
                    //Ext.getCmp('addressManage').show();
                    Ext.getCmp('addressManage').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/address/getaddressbyid',
                        params: {
                            id: addressId,
                            languageId: user_language
                        },
                        success: function (form, action) {
                            var resp = Ext.decode(action.response.responseText);
                            var radioGrp = Ext.ComponentQuery.query('addressmanage radiogroup[itemid="addressTypeRadio"]')[0];
                            if (resp.data.IsMainAddress == true) {
                                Ext.ComponentQuery.query('addressmanage checkbox[itemid="IsMainAddress"]')[0].disable(1);
                            }
                            if (resp.data.Code == 'INVOICE') {
                                radioGrp.items.items[2].setValue(true);
                                Ext.ComponentQuery.query('addressmanage [itemid="attentiontoText"]')[0].enable();
                                Ext.ComponentQuery.query('addressmanage [itemid="attentiontoValue"]')[0].enable();
                            }
                            else if (resp.data.Code == 'VISIT') {
                                radioGrp.items.items[1].setValue(true);
                            }
                            else if (resp.data.Code == 'POST') {
                                radioGrp.items.items[0].setValue(true);
                            }
                            radioGrp.disable(1);
                        }
                    });
                }
            },
            //////////////////////////////////////////////////////////////////////////////////
            /*                   code for load add data in view area                        */
            /* (Company Profile -> Overview -> Gen Info-fieldset -> view visit addr link )  */
            //////////////////////////////////////////////////////////////////////////////////
            'button[action="viewVisitAddr"]': {
                click: function () {

                    var addressId = Ext.getCmp('CompanyGeneralInfo').getForm().findField('VisitingAddress').getValue(); //alert(addressId);
                    Ext.getCmp('addressView').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/address/getaddressbyid',
                        params: {
                            id: addressId,
                            languageId: user_language
                        }
                    });
                    Ext.getCmp('commentsView').hide();
                    Ext.getCmp('imagetempView').hide();
                    Ext.getCmp('contactviewid').hide();
                    Ext.getCmp('bookingviewid').hide();
                    Ext.getCmp('taskviewid').hide();
                    Ext.getCmp('addressView', { addrTypeId: addressId }).show();
                }
            },
            //////////////////////////////////////////////////////////////////////////////////
            /*                   code for load add data in view area                        */
            /* (Company Profile -> Overview -> Gen Info-fieldset -> view post addr link )  */
            //////////////////////////////////////////////////////////////////////////////////
            'button[action="viewPostAddr"]': {
                click: function () {
                    var addressId = Ext.getCmp('CompanyGeneralInfo').getForm().findField('PostalAddress').getValue(); //alert(addressId);
                    Ext.getCmp('addressView').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/address/getaddressbyid',
                        params: {
                            id: addressId,
                            languageId: user_language
                        }
                    });
                    Ext.getCmp('commentsView').hide();
                    Ext.getCmp('imagetempView').hide();
                    Ext.getCmp('contactviewid').hide();
                    Ext.getCmp('bookingviewid').hide();
                    Ext.getCmp('taskviewid').hide();
                    Ext.getCmp('addressView', { addrTypeId: addressId }).show();
                }
            },
            //////////////////////////////////////////////////////////////////////////////////
            /*                   code for load add data in view area                        */
            /* (Company Profile -> Overview -> Gen Info-fieldset -> view invoicaddr link )  */
            //////////////////////////////////////////////////////////////////////////////////
            'button[action="viewInvoAddr"]': {
                click: function () {

                    var addressId = Ext.getCmp('CompanyGeneralInfo').getForm().findField('InvoiceAddress').getValue(); //alert(addressId);
                    Ext.getCmp('addressView').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/address/getaddressbyid',
                        params: {
                            id: addressId,
                            languageId: user_language
                        }
                    });
                    Ext.getCmp('commentsView').hide();
                    Ext.getCmp('imagetempView').hide();
                    Ext.getCmp('contactviewid').hide();
                    Ext.getCmp('bookingviewid').hide();
                    Ext.getCmp('taskviewid').hide();
                    Ext.getCmp('addressView', { addrTypeId: addressId }).show();
                }
            },
            'button[action="searchCustomer"]': {
                click: function () {
                    this.CallSearchMethod(null);
                }
            },
            'button[action="ClearSMAN"]': {
                click: function () {
                    var formSales_G = Ext.getCmp('Sales_Generic');
                    formSales_G.getForm().findField('SalesManagerAssistantName').setValue('-');
                    Ext.ComponentQuery.query('[action="ClearSMAN"]')[0].hide();
                    formSales_G.getForm().findField('SalesManagerAssistantId').setValue(null);
                    Ext.getCmp('generalInfo').getForm().findField('SalesManagerAssistantId').setValue(null);
                }
            },
            //            'button[action="ClearSMN"]': {
            //                click: function () {
            //                    var formSales_G = Ext.getCmp('Sales_Generic');
            //                    formSales_G.getForm().findField('SalesManagerName').setValue('-');
            //                    Ext.ComponentQuery.query('[action="ClearSMN"]')[0].hide();
            //                    formSales_G.getForm().findField('SalesManagerId').setValue(null);
            //                    Ext.getCmp('generalInfo').getForm().findField('SalesManagerId').setValue(null);

            //                }
            //            },
            //Search customers on enter - START
            'customersearch textfield[itemid="txtCompanyName"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch checkbox[itemid="chkCompanyName"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch combo[itemid="companyStatusCombo"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch checkbox[itemid="chkInActive"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch textfield[itemid="txtAbbreviation"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch checkbox[itemid="chkAbbreviation"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch combo[itemid="qualityRatingCombo"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch checkbox[itemid="chkIncludeMerged"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch textfield[itemid="txtContact"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch checkbox[itemid="chkContact"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch combo[itemid="salesManagerCombo"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch checkbox[itemid="chkHasParent"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch textfield[itemid="txtCity"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch combo[itemid="marketSegmentCombo"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch checkbox[itemid="chkHasChild"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch combo[itemid="countryCombo"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch combo[itemid="countryCombo"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch combo[itemid="industrySICCombo"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch checkbox[itemid="chkContract"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            'customersearch combo[itemid="creditStatusCombo"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.CallSearchMethod(null);
                    }
                }
            },
            //Search customers on enter - END
            'button[action="resetSearchCustomer"]': {
                click: function () {
                    me.CallResetSearchMethod();
                    me.LoadBlankSearchGrid(null);
                }
            },
            'button[action="IndividualProfile"]': {
                click: function () {
                    Ext.create('widget.edit');
                }
            },
            'companymanage textfield[itemid="emailfield"]': {
                blur: function (field, eOpts) {
                    if (field.getValue() != '' && field.validate()) {
                        var btn = Ext.ComponentQuery.query('[itemid="saveCompany"]')[0];
                        btn.enable();
                        var url = 'api/company/CompanyDomainExist';
                        Ext.Ajax.request({
                            url: webAPI_path + url,
                            method: 'GET',
                            params: { email: field.value },
                            success: function (response) {
                                var r = Ext.decode(response.responseText);
                                if (r.result == true) {
                                    Ext.Msg.alert('Error'.l('g'), 'SPC_S_DEW'.l('SP_DynamicCode', r.domainCompanies));
                                    btn.disable();
                                }
                            }
                        });
                    }
                }
            },
            'companymanage checkbox[action="hasEMail"]': {
                change: function (field, newVal, oldVal, eOpts) {
                    if (newVal == true) {
                        Ext.getCmp('addCompany').getForm().findField('Email').setReadOnly(1);
                        Ext.getCmp('addCompany').getForm().findField('Email').addClass('x-item-disabled');
                    } else {

                        Ext.getCmp('addCompany').getForm().findField('Email').setReadOnly(0);
                        Ext.getCmp('addCompany').getForm().findField('Email').enable(); //.addClass('x-form-text'); //.x-form-text

                    }
                }
            },
            'contactmanage checkbox[action="hasEMail"]': {
                change: function (field, newVal, oldVal, eOpts) {
                    if (newVal == true) {
                        Ext.getCmp('contactManage').getForm().findField('Email').setValue(null); ;
                        Ext.getCmp('contactManage').getForm().findField('Email').setReadOnly(1);
                        Ext.getCmp('contactManage').getForm().findField('Email').addClass('x-item-disabled');
                        Ext.getCmp('contactManage').getForm().findField('Email').allowBlank = true;
                    } else {

                        Ext.getCmp('contactManage').getForm().findField('Email').setReadOnly(0);
                        Ext.getCmp('contactManage').getForm().findField('Email').enable(); //.addClass('x-form-text'); //.x-form-text
                        Ext.getCmp('contactManage').getForm().findField('Email').allowBlank = false;
                    }
                }
            },
            'contactmanage textfield[itemid="contactMainEmail"]': {
                blur: function (tf, eOpts) {
                    if (tf.getValue() != '' && tf.validate()) {
                        var VarCompanyId = Ext.getCmp('CompanyGeneralInfo').getForm().findField('CompanyId').getValue();
                        var individualId = Ext.getCmp('contactManage').getForm().findField('IndividualId').getValue();
                        var emailDomain = tf.getValue().toString().split('@')[1].toString();

                        Ext.data.JsonP.request({
                            url: webAPI_path + 'api/company/CheckValidDomainforcontact',
                            type: "GET",
                            params: { id: tf.getValue(), id1: individualId, languageId: VarCompanyId },
                            success: function (response) {
                                var r = response;
                                if (r.success == true && r.result == 'DOMAINNOTVALID') {
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            Ext.Msg.alert('Error'.l('g'), 'This domain is not valid'.l('SC61120'));
                                        }
                                    });
                                }
                                else if (r.success == true && r.result == 'DUPLICATEEMAIL') {
                                    tf.setValue('');

                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            Ext.Msg.alert('Error'.l('g'), 'This Email-Id already registered.'.l('SC61120'));

                                        }
                                    });
                                    tf.focus();
                                }
                                else if (r.success == true && r.result == 'SPC_S_DEW') {

                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {

                                            Ext.Msg.confirm('Warning'.l('g'), 'SPC_S_DEW'.l('SP_DynamicCode', r.domainCompanies),
                                                function (btn) {
                                                    if (btn === 'yes') {

                                                        var objCompanyDomain = new Object();
                                                        objCompanyDomain.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                                                        objCompanyDomain.CreatedBy = CurrentSessionUserId;
                                                        objCompanyDomain.CompanyId = VarCompanyId;
                                                        objCompanyDomain.DomainName = emailDomain;
                                                        Ext.Ajax.request({
                                                            url: webAPI_path + 'api/company/AddNewCompanyDomain',
                                                            type: 'POST',
                                                            params: objCompanyDomain,
                                                            success: function (response) {
                                                                var r = Ext.decode(response.responseText);
                                                                var ResultText = r.result;
                                                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                                                    ResultText = ResultText.l("SP_DynamicCode");
                                                                if (r.success == false)
                                                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                                            },
                                                            failure: function () {

                                                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                                            }
                                                        });
                                                        Ext.Msg.alert('Domain Adding Call');
                                                    }
                                                    else {
                                                        tf.setValue('');
                                                        tf.focus();
                                                    }
                                                });
                                        }
                                    });
                                }
                                else if (r.success == true && r.result == 'SPC_S_DYWTATD') {

                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {

                                            Ext.Msg.confirm('Warning'.l('g'), 'SPC_S_DYWTATD'.l('SP_DynamicCode'),
                                                function (btn) {
                                                    if (btn === 'yes') {

                                                        var objCompanyDomain = new Object();
                                                        objCompanyDomain.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                                                        objCompanyDomain.CreatedBy = CurrentSessionUserId;
                                                        objCompanyDomain.CompanyId = VarCompanyId;
                                                        objCompanyDomain.DomainName = emailDomain;
                                                        Ext.Ajax.request({
                                                            url: webAPI_path + 'api/company/AddNewCompanyDomain',
                                                            type: 'POST',
                                                            params: objCompanyDomain,
                                                            success: function (response) {
                                                                var r = Ext.decode(response.responseText);
                                                                var ResultText = r.result;
                                                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                                                    ResultText = ResultText.l("SP_DynamicCode");
                                                                if (r.success == false)
                                                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                                            },
                                                            failure: function () {

                                                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                                            }
                                                        });

                                                    }

                                                });


                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            },
            'edit button[action="copyAddress"]': {
                click: function () {
                    Ext.getCmp('addIndividual').getForm().findField('Address1_Invoice').setValue(Ext.getCmp('addIndividual').getForm().findField('Address1_Postal').getValue());
                    Ext.getCmp('addIndividual').getForm().findField('City_Invoice').setValue(Ext.getCmp('addIndividual').getForm().findField('City_Postal').getValue());
                    Ext.getCmp('addIndividual').getForm().findField('Pincode_Invoice').setValue(Ext.getCmp('addIndividual').getForm().findField('Pincode_Postal').getValue());
                    Ext.getCmp('addIndividual').getForm().findField('CountryId_Invoice').setValue(Ext.getCmp('addIndividual').getForm().findField('CountryId_Postal').getValue());
                }
            },
            'edit checkbox[action="hasEMail"]': {
                change: function (field, newVal, oldVal, eOpts) {
                    if (newVal == true) {

                        Ext.getCmp('addIndividual').getForm().findField('Email').setReadOnly(1);
                        Ext.getCmp('addIndividual').getForm().findField('Email').allowBlank = true;
                        Ext.getCmp('addIndividual').getForm().findField('Email').addClass('x-item-disabled');
                        var Radiogroup = Ext.ComponentQuery.query('edit [itemid=radiogroupEmail]')[0];
                        Radiogroup.setValue({ InvoicedBy: null });
                        var Radiobutton = Ext.ComponentQuery.query('edit [itemid=RadioButtonEmail]')[0];
                        Radiobutton.setValue(false);
                        Ext.ComponentQuery.query('edit [itemid=RadioButtonRegularMail]')[0].setValue(true);
                        Radiobutton.setReadOnly(1);
                        Radiobutton.allowBlank = true;
                        Radiobutton.addClass('x-item-disabled');

                    } else {
                        Ext.getCmp('addIndividual').getForm().findField('Email').setReadOnly(0);
                        Ext.getCmp('addIndividual').getForm().findField('Email').allowBlank = false;
                        Ext.getCmp('addIndividual').getForm().findField('Email').enable();

                        var Radiobutton = Ext.ComponentQuery.query('edit [itemid=RadioButtonEmail]')[0];
                        Radiobutton.setReadOnly(0);
                        Radiobutton.allowBlank = false;
                        Radiobutton.enable();
                    }
                }
            },
            'customersearch button[action="addNewCompany"]': {
                //AddOne
                click: function () {
                    var addContract = Ext.create('widget.companymanage', {
                        IndividualId: 0
                    });

                    me.AddressTypesStore(0);

                    //Company Status
                    var companyStatusComboNC = Ext.ComponentQuery.query('companymanage combo[itemid=companyStatusComboNewComp]')[0];
                    companyStatusComboNC.getStore().load({
                        callback: function (records, o, success) {
                            var items = [];
                            Ext.each(records, function (r) {
                                items.push({
                                    name: 'companyStatus',
                                    style: 'white-space:nowrap',
                                    inputValue: r.data.CompanyStatusId,
                                    //padding: 5,
                                    //checked: checked,
                                    action: 'StatusIdValue',
                                    boxLabel: r.data.Status
                                })
                            });

                            var companyStatus = new Ext.form.RadioGroup({
                                fieldLabel: 'Status'.l('SC61200') + '*',
                                border: false,
                                columns: 1,
                                vertical: true,
                                allowBlank: false,
                                items: items
                            });

                            var formCmpStatus = Ext.ComponentQuery.query('companymanage form[itemid=addCompCmpSts]')[0];
                            formCmpStatus.removeAll(true);
                            formCmpStatus.add(companyStatus);
                            formCmpStatus.doLayout();
                        }
                    });
                }
            },
            'button[action="indvProfile"]': {
                click: function () {
                    me.Open_Individual_Profile(0);
                }
            },
            'button[action="exprtExcel"]': {
                click: function () {
                    this.CallSearchMethod("1");
                }
            },
            //            'button[action="manageBusinessTypes"]': {
            //                click: function () {
            //                    Ext.create('widget.businessaddressmanage');
            //                }
            //            },
            ' button[action="saveCompany"]': {
                click: function () {
                    var name = Ext.getCmp('addCompany').getForm().findField('CompanyName').getValue();
                    Ext.getCmp('addCompany').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                    Ext.getCmp('addCompany').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                    Ext.getCmp('addCompany').getForm().findField('LanguageId').setValue(user_language);

                    if (Ext.getCmp('addCompany').getForm().isValid()) {

                        var Postcode = Ext.getCmp('addCompany').getForm().findField('Pincode').getValue();
                        var CountryId = Ext.getCmp('addCompany').getForm().findField('CountryId').getValue();
                        if (!Utils.ValidatePostCodeFormate(CountryId, Postcode)) {
                            return false;
                        }

                        var noemail = Ext.getCmp('addCompany').getForm().findField('NoEmail').getValue();
                        var email = Ext.getCmp('addCompany').getForm().findField('Email').getValue();
                        var addrData = Ext.getCmp('addCompany').getForm().getValues();
                        Ext.getCmp('addCompany').getForm().findField('AddressTypeId').setValue(addrData.addressTypes);

                        if (noemail == false && email == '') {
                            display_alert('Please enter email.');
                            return;
                        }

                        if (name.length > 0) {
                            Ext.getCmp('addCompany').getForm().submit({
                                url: webAPI_path + 'api/Company/AddCompany',
                                type: 'POST',
                                waitMsg: 'save_data_message'.l('g'),
                                data: Ext.getCmp('addCompany').getForm().getValues(),
                                success: function (form, response) {
                                    var r = response.response.responseText;
                                    var r = Ext.decode(r);
                                    /*Commented as response text not came from API*/
                                    if (r.success == true) {
                                        me.getCompanymanage().close();
                                        me.AddCompanyMethod(r.data[0], false);
                                    } else {
                                        Ext.data.JsonP.request({
                                            url: webAPI_path + 'api/Company/BlankRequest',
                                            success: function () {
                                                var ResultText = r.data[1];
                                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                                    ResultText = ResultText.l("SP_DynamicCode");
                                                //Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                                Ext.Msg.alert('Error'.l('g'), ResultText);
                                            }
                                        });
                                    }
                                },
                                failure: function (form, response) {
                                    var r = response.response.responseText;
                                    var r = Ext.decode(r);
                                    /*Commented as response text not came from API*/
                                    if (r.success == false) {
                                        Ext.data.JsonP.request({
                                            url: webAPI_path + 'api/Company/BlankRequest',
                                            success: function () {
                                                var ResultText = r.data[1];
                                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                                    ResultText = ResultText.l("SP_DynamicCode");
                                                //Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                                Ext.Msg.alert('Error'.l('g'), ResultText);
                                            }
                                        });
                                    }
                                    else {
                                        Ext.data.JsonP.request({
                                            url: webAPI_path + 'api/Company/BlankRequest',
                                            success: function () {
                                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            Ext.data.JsonP.request({
                                url: webAPI_path + 'api/Company/BlankRequest',
                                success: function () {
                                    //validation
                                }
                            });
                        }
                    }
                }
            },
            //////////////////////////////////////////////////////////////
            /*         code for save contact Add/Edit on                */
            /*       Company Profile-> OverView -> contact grid         */
            //////////////////////////////////////////////////////////////
            'contactmanagetabs button[action="saveContact"]': {
                click: function () {
                    if (Ext.getCmp('contactManage').getForm().isValid()) {
                        var Pincode = Ext.getCmp('contactManage').getForm().findField('Pincode_Postal').getValue();
                        var CountryId = Ext.getCmp('contactManage').getForm().findField('CountryId_Postal').getValue();
                        if (!Utils.ValidatePostCodeFormate(CountryId, Pincode)) {
                            return false;
                        }

                        var individualId = Ext.getCmp('contactManage').getForm().findField('IndividualId').getValue();
                        /*IndividualMailingCode Ids*/
                        var mailingCodeIds = '';
                        var IndividualMailingCode = me.getIndividualMailingCode().store.data;
                        if (IndividualMailingCode != null && IndividualMailingCode.length > 0) {
                            for (var i = 0; i < IndividualMailingCode.length; i++) {
                                if (IndividualMailingCode.items[i].data.Checked == "1")
                                    mailingCodeIds += IndividualMailingCode.items[i].data.MailingCodeID + ",";
                            }
                        }
                        mailingCodeIds = mailingCodeIds.replace(/\,$/, '');
                        /*IndividualMailingCode Ids*/

                        /*IndividualContactRole Ids*/
                        var contactRoleIds = '';
                        var IndividualContactRole = me.getIndividualContactRole().store.data;
                        if (IndividualContactRole != null && IndividualContactRole.length > 0) {
                            for (var i = 0; i < IndividualContactRole.length; i++) {
                                if (IndividualContactRole.items[i].data.Checked == "1")
                                    contactRoleIds += IndividualContactRole.items[i].data.ContactRoleId + ",";
                            }
                        }
                        contactRoleIds = contactRoleIds.replace(/\,$/, '');
                        /*IndividualContactRole Ids*/

                        /*IndividualRoomClassification Ids*/
                        var classificationIds = '';
                        var IndividualRoomClassification = me.getIndividualRoomClassification().store.data;

                        if (IndividualRoomClassification != null && IndividualRoomClassification.length > 0) {
                            for (var i = 0; i < IndividualRoomClassification.length; i++) {
                                if (IndividualRoomClassification.items[i].data.Checked == "1")
                                    classificationIds += IndividualRoomClassification.items[i].data.RoomClassificationId + ",";
                            }
                        }
                        classificationIds = classificationIds.replace(/\,$/, '');
                        /*IndividualRoomClassification Ids*/

                        var formSales_I = Ext.getCmp('Sales_C');
                        var formIndividual = Ext.getCmp('contactManage').getForm();
                        var BehaviouralTypeId = formSales_I.getForm().findField('BehaviouralTypeId').getValue();
                        var BusinessTypeId = formSales_I.getForm().findField('BusinessTypeId').getValue();
                        if (BehaviouralTypeId == 0) {
                            BehaviouralTypeId = null;
                        }
                        if (BusinessTypeId == 0) {
                            BusinessTypeId = null;
                        }
                        formIndividual.findField('MailingCodeIds').setValue(mailingCodeIds);
                        formIndividual.findField('ContactRoleIds').setValue(contactRoleIds);
                        formIndividual.findField('RoomClassificationIds').setValue(classificationIds);
                        formIndividual.findField('BusinessTypeId').setValue(BusinessTypeId);
                        formIndividual.findField('BehaviouralTypeId').setValue(BehaviouralTypeId);
                        formIndividual.findField('WeddingAnniversary').setValue(Ext.Date.format(formSales_I.getForm().findField('WeddingAnniversary').getValue(), 'Y-m-d'));
                        formIndividual.findField('JoinedTheCompany').setValue(Ext.Date.format(formSales_I.getForm().findField('JoinedTheCompany').getValue(), 'Y-m-d'));
                        formIndividual.findField('Interests').setValue(formSales_I.getForm().findField('Interests').getValue());
                        formIndividual.findField('RegardzGimmickReceived').setValue(formSales_I.getForm().findField('RegardzGimmickReceived').getValue());
                        formIndividual.findField('DelphiID').setValue(formSales_I.getForm().findField('DelphiID').getValue());

                        formIndividual.findField('ChildrenName').setValue(formSales_I.getForm().findField('ChildrenName').getValue());
                        formIndividual.findField('Hobbies').setValue(formSales_I.getForm().findField('Hobbies').getValue());
                        formIndividual.findField('FavoriteHoliday').setValue(formSales_I.getForm().findField('FavoriteHoliday').getValue());

                        var formComm_C = Ext.getCmp('Comments_C');
                        formIndividual.findField('Notes').setValue(formComm_C.getForm().findField('Notes').getValue());
                        formIndividual.findField('LocationNotes').setValue(formComm_C.getForm().findField('LocationNotes').getValue());

                        if (individualId > 0) {
                            var urlContract = webAPI_path + 'api/Individual/UpdateIndividual';
                            Ext.getCmp('contactManage').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('contactManage').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        } else {
                            var urlContract = webAPI_path + 'api/Individual/AddIndividual';
                            Ext.getCmp('contactManage').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('contactManage').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('contactManage').getForm().submit({
                            url: urlContract,
                            type: 'POST',
                            waitMsg: 'save_data_message'.l('g'),
                            //params: Ext.getCmp('contactManage').getForm().getValues(),
                            success: function (form, response) {
                                var r = response.response.responseText;
                                r = Ext.decode(r);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.getStore('company.CompanyContactListStore').load();
                                if (r.success == true) {
                                    me.getContactmanagetabs().close();
                                    Ext.getStore('customer.CustomerListStore').reload();
                                } else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function (form, response) {
                                var r = response.response.responseText;
                                r = Ext.decode(r);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.Msg.alert('Error'.l('g'), ResultText); // 'Information not saved.');
                            }
                        });
                    }
                    else {
                        Ext.Msg.alert('Error'.l('g'), 'Some fields are requred, check all tabs.'.l('g'));
                    }
                }
            },
            //////////////////////////////////////////////////////////////
            /*         code for save Individual Add/Edit on             */
            /*          Individual Profile-> Edit and Sales tab         */
            //////////////////////////////////////////////////////////////
            'individualprofile button[action="saveIndividual"]': {
                click: function () {
                    /*IndividualMailingCode Ids*/
                    var mailingCodeIds = '';
                    var IndividualMailingCode = me.getIndividualMailingCode().store.data;
                    if (IndividualMailingCode != null && IndividualMailingCode.length > 0) {
                        for (var i = 0; i < IndividualMailingCode.length; i++) {
                            if (IndividualMailingCode.items[i].data.Checked == "1")
                                mailingCodeIds += IndividualMailingCode.items[i].data.MailingCodeID + ",";
                        }
                    }
                    mailingCodeIds = mailingCodeIds.replace(/\,$/, '');
                    /*IndividualMailingCode Ids*/

                    /*IndividualContactRole Ids*/
                    //var contactRoleIds = '';
                    //                    var IndividualContactRole = me.getIndividualContactRole().store.data;
                    //                    if (IndividualContactRole != null && IndividualContactRole.length > 0) {
                    //                        for (var i = 0; i < IndividualContactRole.length; i++) {
                    //                            if (IndividualContactRole.items[i].data.Checked == "1")
                    //                                contactRoleIds += IndividualContactRole.items[i].data.ContactRoleId + ",";
                    //                        }
                    //                    }
                    //contactRoleIds = contactRoleIds.replace(/\,$/, '');
                    /*IndividualContactRole Ids*/

                    /*IndividualRoomClassification Ids*/
                    var classificationIds = '';
                    var IndividualRoomClassification = me.getIndividualRoomClassification().store.data;

                    if (IndividualRoomClassification != null && IndividualRoomClassification.length > 0) {
                        for (var i = 0; i < IndividualRoomClassification.length; i++) {
                            if (IndividualRoomClassification.items[i].data.Checked == "1")
                                classificationIds += IndividualRoomClassification.items[i].data.RoomClassificationId + ",";
                        }
                    }
                    classificationIds = classificationIds.replace(/\,$/, '');
                    /*IndividualRoomClassification Ids*/


                    var individualId = Ext.getCmp('addIndividual').getForm().findField('IndividualId').getValue();
                    var name = Ext.getCmp('addIndividual').getForm().findField('LastName').getValue();

                    if (individualId != null && individualId > 0) {
                        Ext.getCmp('addIndividual').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        Ext.getCmp('addIndividual').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                    } else {
                        Ext.getCmp('addIndividual').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        Ext.getCmp('addIndividual').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                    }

                    var formSales_I = Ext.getCmp('Sales_I');
                    var formIndividual = Ext.getCmp('addIndividual').getForm();

                    formIndividual.findField('MailingCodeIds').setValue(mailingCodeIds);
                    //                    formIndividual.findField('ContactRoleIds').setValue(contactRoleIds);
                    formIndividual.findField('RoomClassificationIds').setValue(classificationIds);
                    //                    formIndividual.findField('BusinessTypeId').setValue(formSales_I.getForm().findField('BusinessTypeId').getValue());
                    formIndividual.findField('BehaviouralTypeId').setValue(formSales_I.getForm().findField('BehaviouralTypeId').getValue());
                    formIndividual.findField('WeddingAnniversary').setValue(Ext.Date.format(formSales_I.getForm().findField('WeddingAnniversary').getValue(), 'Y-m-d'));
                    //formIndividual.findField('JoinedTheCompany').setValue(Ext.Date.format(formSales_I.getForm().findField('JoinedTheCompany').getValue(), 'Y-m-d'));
                    formIndividual.findField('Interests').setValue(formSales_I.getForm().findField('Interests').getValue());
                    formIndividual.findField('RegardzGimmickReceived').setValue(formSales_I.getForm().findField('RegardzGimmickReceived').getValue());
                    formIndividual.findField('DelphiID').setValue(formSales_I.getForm().findField('DelphiID').getValue());

                    formIndividual.findField('ChildrenName').setValue(formSales_I.getForm().findField('ChildrenName').getValue());
                    formIndividual.findField('Hobbies').setValue(formSales_I.getForm().findField('Hobbies').getValue());
                    formIndividual.findField('FavoriteHoliday').setValue(formSales_I.getForm().findField('FavoriteHoliday').getValue());

                    if (Ext.getCmp('addIndividual').getForm().isValid()) {

                        var Pincode_Postal = Ext.getCmp('addIndividual').getForm().findField('Pincode_Postal').getValue();
                        var CountryId_Postal = Ext.getCmp('addIndividual').getForm().findField('CountryId_Postal').getValue();
                        if (!Utils.ValidatePostCodeFormate(CountryId_Postal, Pincode_Postal)) {
                            return false;
                        }


                        var Pincode_Invoice = Ext.getCmp('addIndividual').getForm().findField('Pincode_Invoice').getValue();
                        var CountryId_Invoice = Ext.getCmp('addIndividual').getForm().findField('CountryId_Invoice').getValue();
                        if (!Utils.ValidatePostCodeFormate(CountryId_Invoice, Pincode_Invoice)) {
                            return false;
                        }

                        var noemail = Ext.getCmp('addIndividual').getForm().findField('NoEmail').getValue();
                        var email = Ext.getCmp('addIndividual').getForm().findField('Email').getValue();

                        if (noemail == false && email == '') {
                            display_alert('Please enter email.');
                            return;
                        }

                        if (name.length > 0) {
                            Ext.getCmp('addIndividual').getForm().submit({
                                url: webAPI_path + (individualId != null && individualId > 0 ? 'api/Individual/UpdateIndividual' : 'api/Individual/AddIndividual'),
                                method: 'POST',
                                waitMsg: 'save_data_message'.l('g'),
                                data: formIndividual,
                                success: function (form, response) {
                                    var r = response.response.responseText;
                                    var r = Ext.decode(r);
                                    var ResultText = r.result;
                                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                        ResultText = ResultText.l("SP_DynamicCode");
                                    Ext.getStore('customer.CustomerListStore').reload();

                                    if (r.success == true) {
                                        me.getIndividualprofile().close();
                                        Ext.getCmp('customersearch').getStore().reload();
                                    } else {
                                        Ext.Msg.alert('Error'.l('g'), ResultText);
                                    }
                                },
                                failure: function (form, response) {
                                    var r = response.response.responseText;
                                    r = Ext.decode(r);
                                    var ResultText = r.result;
                                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                        ResultText = ResultText.l("SP_DynamicCode");
                                    Ext.Msg.alert('Error'.l('g'), ResultText); // 'Information not saved.');
                                }
                            });
                        } else {
                            Ext.data.JsonP.request({
                                url: webAPI_path + 'api/Company/BlankRequest',
                                success: function () {
                                    //validation
                                }
                            });
                        }
                    }
                    else {
                        Ext.Msg.alert('Error'.l('g'), 'Some fields are requred, check all tabs.'.l('g'));
                    }
                }
            },
            ///////////////////////////////////////////////////////////////
            /* code for show comment Icon click (Comp Profile ->overview */
            /*     Gen Infor fieldset Comment show Icon                  */
            ///////////////////////////////////////////////////////////////
            'button[action="showCompanyComment"]': {
                click: function () {
                    Ext.getCmp('taskviewid').hide();
                    Ext.getCmp('contactviewid').hide();
                    Ext.getCmp('bookingviewid').hide();
                    Ext.getCmp('imagetempView').hide();
                    Ext.getCmp('commentsView').show();
                    Ext.getCmp('addressView').hide();
                }
            },
            'overview_I button[action="sendVeriMailtoIndi"]': {
                click: function () {
                    var individualId = Ext.getCmp('IndividualProileWinForm').getForm().findField('IndividualId').getValue();
                    this.SendVerificationEmail(individualId);
                }
            },
            'overview_I button[action="sendMailforResetPassToIndi"]': {
                click: function () {
                    var individualId = Ext.getCmp('IndividualProileWinForm').getForm().findField('IndividualId').getValue();
                    this.ResetPasswordEmail(individualId);
                }
            },
            'overview_I button[action="showIndiComment"]': {
                click: function () {
                    Ext.getCmp('taskviewid').hide();
                    Ext.getCmp('contactviewid').hide();
                    Ext.getCmp('bookingviewid').hide();

                    var Notes = Ext.getCmp('Overview_I').getForm().findField('Notes').getValue();
                    Ext.getCmp('Overview_I').getForm().findField('Notes').setValue(Notes);
                }
            }
        });
    },
    AddressTypesStore: function (rec) {
        Ext.getStore('customer.AddressTypeStore').load({
            params: {
                'languageId': user_language
            },
            callback: function (records, o, success) {
                var items = [];
                Ext.each(records, function (r) {
                    items.push({
                        name: 'addressTypes',
                        style: 'white-space:nowrap',
                        inputValue: r.data.AddressTypeId,
                        //padding: 5,
                        //action: 'addressTypesValue',
                        //checked: checked,
                        boxLabel: r.data.Name
                    })
                });

                var addressTypes = new Ext.form.RadioGroup({
                    padding: 0,
                    fieldLabel: 'Address type'.l('SC61200') + '*',
                    border: false,
                    columns: 1,
                    vertical: true,
                    allowBlank: false,
                    items: items
                });

                Ext.getCmp('addressTypes').removeAll(true);
                Ext.getCmp('addressTypes').add(addressTypes);
                Ext.getCmp('addressTypes').doLayout();
            }
        });
    },
    //////////////////////////////////////////////////////////////
    /*         below code is in use?                            */
    //////////////////////////////////////////////////////////////
    Indiv: function (rec) {
        if (rec.data.IndividualId != null && rec.data.IndividualId > 0) {
            Ext.create('widget.edit', {
                IndividualId: rec.data.IndividualId
            });
            Ext.getCmp('addIndividual').getForm().load({
                method: 'GET',
                url: webAPI_path + 'api/Individual/GetIndividualDetailbyId',
                params: {
                    id: rec.data.IndividualId
                },
                success: function (form, action) {
                    Ext.getCmp('addIndividual').getForm().findField('Email').setReadOnly(1);
                    Ext.getCmp('addIndividual').getForm().findField('Email').addClass('x-item-disabled');
                    Ext.getCmp('addIndividual').getForm().findField('NoEmail').setReadOnly(1);
                    Ext.getCmp('addIndividual').getForm().findField('NoEmail').addClass('x-item-disabled');
                }
            });
        }
    },
    //////////////////////////////////////////////////////////////
    /*         Add new Indi                            */
    //////////////////////////////////////////////////////////////
    Indiv_Overview: function (rec) {
        this.Open_Individual_Profile(rec.data.IndividualId);
    },
    //////////////////////////////////////////////////////////////
    /*         Add New Indi                        */
    //////////////////////////////////////////////////////////////
    Open_Individual_Profile: function (rec) {

        Ext.create('widget.individualprofile');
        Ext.getCmp('individual_overview').setActiveTab(1);
        Ext.getCmp('individual_overview').getActiveTab().setTitle('Add');

        //individual_overview

        this.loadSalesGrids(rec);

        if (rec != null && rec > 0) {
            //            Ext.getStore('company.BookingStore').proxy.setExtraParam('languageId', user_language);
            //            Ext.getStore('company.BookingStore').proxy.setExtraParam('id', rec);
            //            Ext.getStore('company.BookingStore').proxy.setExtraParam('id1', 1);
            //            Ext.getStore('company.BookingStore').load();

            //            Ext.getStore('company.TaskStore').proxy.setExtraParam('languageId', user_language);
            //            Ext.getStore('company.TaskStore').proxy.setExtraParam('id', rec); //34 //rec
            //            Ext.getStore('company.TaskStore').proxy.setExtraParam('id1', 22);
            //            Ext.getStore('company.TaskStore').load();

            //            Ext.getCmp('Overview_I').getForm().load({
            //                method: 'GET',
            //                url: webAPI_path + 'api/Individual/GetIndividualDetailbyId',
            //                params: {
            //                    id: rec
            //                }
            //            });

            //            Ext.getCmp('bookingview').getForm().load({
            //                method: 'GET',
            //                url: webAPI_path + 'api/Booking/GetBookingOverview',
            //                params: {
            //                    id: 3,
            //                    languageId: user_language
            //                }
            //            });

            //            Ext.getCmp('addIndividual').getForm().load({
            //                method: 'GET',
            //                url: webAPI_path + 'api/Individual/GetIndividualDetailbyId',
            //                params: {
            //                    id: rec
            //                },
            //                success: function (form, action) {
            //                    Ext.getCmp('addIndividual').getForm().findField('Email').setReadOnly(1);
            //                    Ext.getCmp('addIndividual').getForm().findField('Email').addClass('x-item-disabled');
            //                    Ext.getCmp('addIndividual').getForm().findField('NoEmail').setReadOnly(1);
            //                    Ext.getCmp('addIndividual').getForm().findField('NoEmail').addClass('x-item-disabled');

            //                    //////////////// INDIOPEN                    
            //                    var formSales_I = Ext.getCmp('Sales_I');
            //                    var formIndividual = Ext.getCmp('addIndividual').getForm();
            //                    //var varBusinessTypeId = Ext.getCmp('addIndividual').getForm().findField('BusinessTypeId').getValue();
            //                    //formSales_I.getForm().findField('BusinessTypeId').setValue(varBusinessTypeId);
            //                    //formSales_I.getForm().findField('BehaviouralTypeId').setValue(formIndividual.findField('BehaviouralTypeId').getValue());
            //                    //formSales_I.getForm().findField('WeddingAnniversary').setValue(Ext.Date.format(formIndividual.findField('WeddingAnniversary').getValue(), 'Y-m-d'));
            //                    formSales_I.getForm().findField('Interests').setValue(formIndividual.findField('Interests').getValue());
            //                    formSales_I.getForm().findField('RegardzGimmickReceived').setValue(formIndividual.findField('RegardzGimmickReceived').getValue());
            //                    formSales_I.getForm().findField('DelphiID').setValue(formIndividual.findField('DelphiID').getValue());
            //                    formSales_I.getForm().findField('ChildrenName').setValue(formIndividual.findField('ChildrenName').getValue());
            //                    formSales_I.getForm().findField('Hobbies').setValue(formIndividual.findField('Hobbies').getValue());
            //                    formSales_I.getForm().findField('FavoriteHoliday').setValue(formIndividual.findField('FavoriteHoliday').getValue());
            //                    //////
            //                }
            //            });
        }
    },
    AddCompany: function (rec) {
        //ROCK     
        var flag = Ext.getCmp('CompanyProileWinForm').getForm().findField('ChildCompanyFlag').getValue(); //alert(f);
        LanguageId = Ext.getCmp('CompanyProileWinForm').getForm().findField('CompanyId').getValue(); // CompanyProileWinForm  


        if (flag == 0) {
            var cid = LanguageId;
            var ccid = rec;
            var url = 'api/company/AddMultipleChildCompany';
        } else if (flag == 1) {
            var cid = rec.data.CompanyId;
            var ccid = LanguageId;
            var url = 'api/company/AddParentCompany';
        } else if (flag == 3) {
            var cid = LanguageId;
            var ccid = rec.data.CompanyId; ///AgencyID
            var url = 'api/company/AddAgencyForCompany';
        }


        Ext.Ajax.request({
            url: webAPI_path + url,
            //actionMethods: 'POST',
            method: 'GET',
            params: {
                id: cid,
                languageId: ccid
            }, //rec.data.CompanyId
            success: function (response) {
                var r = Ext.decode(response.responseText);
                var ResultText = r.result;
                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                    ResultText = ResultText.l("SP_DynamicCode");
                if (r.success == true) {
                    var win = Ext.WindowManager.getActive();
                    if (win) {
                        win.close();
                    }
                    //display_alert('MG00000');
                    Ext.getStore('company.ChildCompanyStore').proxy.setExtraParam('languageId', user_language);
                    Ext.getStore('company.ChildCompanyStore').proxy.setExtraParam('id', LanguageId); // rec.data.CompanyId);
                    Ext.getStore('company.ChildCompanyStore').load();
                    //                    Ext.getStore('company.AddChildCompanyStore').proxy.setExtraParam('languageId', user_language);
                    //                    Ext.getStore('company.AddChildCompanyStore').proxy.setExtraParam('id', rec.data.CompanyId);
                    //                    Ext.getStore('company.AddChildCompanyStore').load();
                    if (flag == 1) {
                        Ext.getCmp('generalInfo').getForm().findField('ParentCompanyName').setValue(rec.data.CompanyName);
                        Ext.getCmp('generalInfo').getForm().findField('ParentCompanyId').setValue(cid);
                    }
                    if (flag == 3) {
                        Ext.getCmp('generalInfo').getForm().findField('AgencyName').setValue(rec.data.CompanyName);
                    }

                } else {
                    Ext.Msg.alert('Error'.l('g'), ResultText);
                }
            },
            failure: function (e) {
                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g') + e);
            }
        });
    },
    ChildCompanyDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/company/DeleteChildCompany',
                    type: "GET",
                    params: {
                        id: rec.data.CompanyId
                    },
                    success: function (response) {
                        var res = Ext.decode(response.responseText);
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            //display_alert('MG00040');
                            //Ext.getStore('company.ChildCompanyStore').loadPage(1);
                            var grid = Ext.ComponentQuery.query('[itemid="childcompanylistgrid"]')[0];
                            Utils.RefreshGridonDelete(grid, grid.getStore());
                        } else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Record not deleted.'.l('g'));
                    }
                });
            }
        });
    },
    ////////////////////////////////////////////////////////
    /*          code for load open contact edit           */
    /*    Company Profile-> OverView -> contact grid      */
    ////////////////////////////////////////////////////////
    ContactEdit: function (rec) {
        if (rec.data.CompanyId == undefined)
            var VarCompanyId = Ext.getCmp('CompanyGeneralInfo').getForm().findField('CompanyId').getValue();
        else
            var VarCompanyId = rec.data.CompanyId;

        Ext.create('widget.contactmanagetabs', { IndividualId: rec.data.IndividualId, CompanyId: VarCompanyId }).show();
        var me = this;
        Ext.getCmp('contactManage').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/Individual/GetIndividualDetailbyId',
            params: {
                id: rec.data.IndividualId
            },
            success: function (form, action) {
                var r = action.response.responseText;
                r = Ext.decode(r);
                var IndividualData = r.data;
                var formSales_C = Ext.getCmp('Sales_C');
                var formIndividual = Ext.getCmp('contactManage').getForm(); ///CONTEDIT       
                //alert(formIndividual.findField('SalesManagerName').getValue());
                formSales_C.getForm().findField('SalesManagerName').setValue(formIndividual.findField('SalesManagerName').getValue());
                formSales_C.getForm().findField('Interests').setValue(formIndividual.findField('Interests').getValue());
                formSales_C.getForm().findField('RegardzGimmickReceived').setValue(formIndividual.findField('RegardzGimmickReceived').getValue());
                if (IndividualData.JoinedTheCompany != null) {
                    formSales_C.getForm().findField('JoinedTheCompany').setValue(Ext.Date.format(new Date(IndividualData.JoinedTheCompany), 'Y-m-d'));
                }
                formSales_C.getForm().findField('DelphiID').setValue(formIndividual.findField('DelphiID').getValue());
                formSales_C.getForm().findField('ChildrenName').setValue(formIndividual.findField('ChildrenName').getValue());
                formSales_C.getForm().findField('Hobbies').setValue(formIndividual.findField('Hobbies').getValue());
                formSales_C.getForm().findField('FavoriteHoliday').setValue(formIndividual.findField('FavoriteHoliday').getValue());
                me.loadSalesGrids(rec.data.IndividualId);

                var formComments_C = Ext.getCmp('Comments_C');
                formComments_C.getForm().findField('Notes').setValue(formIndividual.findField('Notes').getValue());
                formComments_C.getForm().findField('LocationNotes').setValue(formIndividual.findField('LocationNotes').getValue());

                if (IndividualData.Email != null || IndividualData.Email.length > 0) {
                    formIndividual.findField('NoEmail').disable();
                }

                var combo = Ext.ComponentQuery.query('contactmanage combo[itemid=cmLangCombo]')[0];
                combo.getStore().load({
                    callback: function (records, o, success) {
                        if (combo.value == undefined || combo.value == null)
                            combo.setValue(1043);
                    }
                });

                var checkbox = Ext.ComponentQuery.query('contactmanage checkbox[itemid=isNewsletterSubsCM]')[0];
                if (!checkbox.value)
                    checkbox.disable(1);
                else
                    checkbox.enable(1);
            }
        });
    },
    ////////////////////////////////////////////////////////
    /*  code for call WebApi of Send verification email   */
    /*    Company Profile-> OverView -> contact grid      */
    ////////////////////////////////////////////////////////
    SendVerificationEmail: function (rec) {
        var Indiid;
        if (typeof rec === 'object') {
            Indiid = rec.data.IndividualId;
        }
        else {
            Indiid = rec;
        }

        Ext.data.JsonP.request({
            url: webAPI_path + 'api/Individual/SentVerificationEmail',
            actionMethods: 'GET',
            params: {
                id: Indiid,
                id1: user_language
            },
            success: function (r) {
                var ResultText = r.result;
                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                    ResultText = ResultText.l("SP_DynamicCode");
                if (r.success == true) { //r.data
                    Ext.getStore('company.CompanyContactListStore').load();
                } else {
                    Ext.Msg.alert('Error'.l('g'), ResultText);
                }
            }
        });
    },
    ////////////////////////////////////////////////////////
    /*           code for reset password email            */
    /*    Company Profile-> OverView -> contact grid      */
    ////////////////////////////////////////////////////////
    ResetPasswordEmail: function (rec) {
        var Indiid;
        if (typeof rec === 'object') {
            Indiid = rec.data.IndividualId;
        }
        else {
            Indiid = rec;
        }
        Ext.data.JsonP.request({
            url: webAPI_path + 'api/Individual/ResetPassword',
            actionMethods: 'GET',
            params: {
                id: Indiid,
                id1: user_language
            },
            success: function (r) {
                var ResultText = r.result;
                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                    ResultText = ResultText.l("SP_DynamicCode");
                if (r.result == 'DNN_Message') {
                    Ext.Msg.alert('Password sent', 'DNN_Message'.l('g'));
                }
                else {
                    if (r.success == true) { //r.data
                        Ext.Msg.alert('Password sent', ResultText);
                    } else {
                        Ext.Msg.alert('Error'.l('g'), ResultText);
                    }
                }
            }
        });
    },
    BookingView: function (rec) {
        var type;
        if (rec.data.CompanyId > 0)
            type = 2;
        else
            type = 3;

        if (rec.data.BookingId > 0 || rec.data.BookingTrackingId > 0) {
            //            Ext.getCmp('bookingview').getForm().load({
            //                method: 'GET',
            //                url: webAPI_path + 'api/Booking/GetBookingOverview',
            //                params: {
            //                    id: rec.data.BookingId,
            //                    languageId: user_language
            //                }
            //            });
            Utils.LoadBookingInformationForRightPane(rec.data.BookingId, rec.data.BookingTrackingId, user_language, type, rec.data.ReservationId); //2 from company overview, 3 from individual overview 
        }
    },
    ///////////////////////////////////////////////////////////////////////
    /*   Method fot update company profile with sales and marketing      */
    ///////////////////////////////////////////////////////////////////////
    AddCompanyMethod: function (rec, isHierarchy) {
        this.loadCompSalesGrids(rec);
        Ext.getStore('company.ChildCompanyStore').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('company.ChildCompanyStore').proxy.setExtraParam('id', rec);
        Ext.getStore('company.ChildCompanyStore').proxy.setExtraParam('id2', 0);
        Ext.getStore('company.ChildCompanyStore').load();

        Ext.getStore('company.AddChildCompanyStore').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('company.AddChildCompanyStore').proxy.setExtraParam('id', rec);
        //Ext.getStore('company.AddChildCompanyStore').load();

        Ext.getStore('company.GlobalDistributionSystemStore').proxy.setExtraParam('id', rec);
        Ext.getStore('company.GlobalDistributionSystemStore').load();

        Ext.getStore('company.BookingStore').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('company.BookingStore').proxy.setExtraParam('id', rec);
        Ext.getStore('company.BookingStore').proxy.setExtraParam('id1', 0);
        Ext.getStore('company.BookingStore').proxy.setExtraParam('searchString', '');
        Ext.getStore('company.BookingStore').load();

        Ext.getStore('company.TaskStore').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('company.TaskStore').proxy.setExtraParam('id', rec);
        Ext.getStore('company.TaskStore').proxy.setExtraParam('id1', 21);
        Ext.getStore('company.TaskStore').load();

        Ext.getStore('company.CompanyContactListStore').proxy.setExtraParam('id', rec);
        Ext.getStore('company.CompanyContactListStore').proxy.setExtraParam('status', 1);
        Ext.getStore('company.CompanyContactListStore').load();

        Ext.create('widget.companyprofile', {
            CompanyId: rec,
            IsHierarchy: isHierarchy
        });
    },
    BusinessTypeEdit: function (rec) {
        Ext.create('widget.businessaddressmanage', {
            BusinessTypeId: rec.data.BusinessTypeId,
            BookingId: rec.data.BookingId,
            BookingTrackingId: rec.data.BookingTrackingId
        });

        Ext.getStore('common.BusinessTypeStore').proxy.setExtraParam('id', user_language);
        Ext.getStore('common.BusinessTypeStore').load({
            callback: function (response, o, success) {
                Ext.getCmp('manageBusinessType').getForm().findField('BusinessTypeId').setValue(rec.data.BusinessTypeId);
            }
        });
    },
    TaskView: function (rec) {
        if (rec.data.TaskId > 0) {
            Ext.getCmp('taskview').getForm().load({
                method: 'GET',
                url: webAPI_path + 'api/Task/GetTasksForCustomerById',
                params: {
                    id: rec.data.TaskId,
                    languageId: user_language
                }
            });
        }
    },
    TaskDelete: function (rec) {
        display_alert("mg00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/Task/DeleteTask',
                    type: "GET",
                    params: {
                        id: rec.data.TaskId
                    },
                    success: function (response) {
                        var res = Ext.decode(response.responseText);
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            //display_alert('MG00040');
                            //Ext.getStore('company.TaskStore').loadPage(1);
                            var grid = Ext.ComponentQuery.query('[itemid="taskslist"]')[0];
                            Utils.RefreshGridonDelete(grid, grid.getStore());
                        } else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Record not deleted.'.l('g'));
                    }
                });
            }
        });
    },
    taskEdit: function (rec) {
        Ext.create('widget.taskmanage', { TaskId: rec.data.TaskId, itemid: 'taskmanageCUST' });
    },
    mergeCompanies: function (rec) {
        /*Get Controller*/
        var me = this;
        var c = me.getController('company.MergeGeneral');

        if (c.thisController == false) {
            c.init();
            c.thisController = true;
        }

        /*Get container*/
        Ext.create('widget.mergecompanies', { CompanyId: rec.data.CompanyId });
    },
    ContactView: function (rec) {
        if (rec.data.IndividualId > 0) {
            Ext.getCmp('bookingviewid').hide();
            Ext.getCmp('taskviewid').hide();
            Ext.getCmp('imagetempView').hide();
            Ext.getCmp('commentsView').hide();
            Ext.getCmp('addressView').hide();
            Ext.getCmp('imageView').hide();
            Ext.getCmp('contactviewid').show();

            Ext.getCmp('contactview').getForm().load({
                method: 'GET',
                url: webAPI_path + 'api/Individual/GetIndividualDetailbyId',
                params: {
                    id: rec.data.IndividualId
                }
            });
        }
    },
    ///////////////////////////////////////////////////////////////////////
    /*   code for edit company and Individual from customer search grid  */
    /*    Customer search grid -> edit company   or edit individual      */
    ///////////////////////////////////////////////////////////////////////
    Company: function (rec) {
        var me = this;
        //alert("Company grid click : " + rec.data.CompanyId);                
        if (rec.data.CompanyId > 0) {
            this.AddCompanyMethod(rec.data.CompanyId, rec.data.HasParent == true || rec.data.HasChild == true ? true : false);
        } else if (rec.data.CompanyId == null) {
            if (rec.data.IndividualId != null && rec.data.IndividualId > 0) {
                Ext.create('widget.individualprofile', { IndividualId: rec.data.IndividualId });

                Ext.getStore('company.BookingStore').proxy.setExtraParam('languageId', user_language);
                Ext.getStore('company.BookingStore').proxy.setExtraParam('id', rec.data.IndividualId); //34
                Ext.getStore('company.BookingStore').proxy.setExtraParam('id1', 1); //0=company, 1=individual
                Ext.getStore('company.BookingStore').proxy.setExtraParam('searchString', '');
                Ext.getStore('company.BookingStore').load();

                Ext.getStore('company.TaskStore').proxy.setExtraParam('languageId', user_language);
                Ext.getStore('company.TaskStore').proxy.setExtraParam('id', rec.data.IndividualId); //34 //rec
                Ext.getStore('company.TaskStore').proxy.setExtraParam('id1', 22);
                Ext.getStore('company.TaskStore').load();

                this.loadSalesGrids(rec.data.IndividualId);

                Ext.getCmp('Overview_I').getForm().load({
                    method: 'GET',
                    url: webAPI_path + 'api/Individual/GetIndividualDetailbyId',
                    params: {
                        id: rec.data.IndividualId
                    }
                });

                Ext.getCmp('addIndividual').getForm().load({
                    method: 'GET',
                    url: webAPI_path + 'api/Individual/GetIndividualDetailbyId',
                    params: {
                        id: rec.data.IndividualId
                    },
                    success: function (form, action) {
                        var r = action.response.responseText;
                        r = Ext.decode(r);
                        var CompanyData = r.data;

                        me.getBookingslist().CompanyData = Ext.encode(CompanyData);
                        if (CompanyData.NoEmail) {
                            Ext.getCmp('addIndividual').getForm().findField('Email').setReadOnly(1);
                            Ext.getCmp('addIndividual').getForm().findField('Email').addClass('x-item-disabled');
                            //                            Ext.getCmp('addIndividual').getForm().findField('NoEmail').setReadOnly(1);
                            //                            Ext.getCmp('addIndividual').getForm().findField('NoEmail').addClass('x-item-disabled');
                            var Radiobutton = Ext.ComponentQuery.query('edit [itemid=RadioButtonEmail]')[0];
                            Radiobutton.setReadOnly(1);
                            Radiobutton.allowBlank = true;
                            Radiobutton.addClass('x-item-disabled');
                        }
                        if (CompanyData.Email != null || CompanyData.Email.length > 0) {
                            Ext.getCmp('addIndividual').getForm().findField('NoEmail').disable();
                        }
                        ////////////////
                        var formSales_I = Ext.getCmp('Sales_I');
                        var formIndividual = Ext.getCmp('addIndividual').getForm();
                        formSales_I.getForm().findField('SalesManagerName').setValue(formIndividual.findField('SalesManagerName').getValue());
                        formSales_I.getForm().findField('Interests').setValue(formIndividual.findField('Interests').getValue());
                        formSales_I.getForm().findField('RegardzGimmickReceived').setValue(formIndividual.findField('RegardzGimmickReceived').getValue());
                        formSales_I.getForm().findField('DelphiID').setValue(formIndividual.findField('DelphiID').getValue());
                        formSales_I.getForm().findField('ChildrenName').setValue(formIndividual.findField('ChildrenName').getValue());
                        formSales_I.getForm().findField('Hobbies').setValue(formIndividual.findField('Hobbies').getValue());
                        formSales_I.getForm().findField('FavoriteHoliday').setValue(formIndividual.findField('FavoriteHoliday').getValue());

                        ////////////////
                    }
                });

                Ext.getCmp('Sales_I').getForm().findField('BehaviouralTypeId').setValue(1);
            }
        }
    },

    CallSearchMethod: function (rec) {
        if (Ext.getCmp('searchCustomer').getForm().isValid()) {
            var formData = Ext.getCmp('searchCustomer').getForm();
            //var urlSearchCustomer = webAPI_path + 'api/Company/CustomerPaging';
            var companyName = formData.findField('CompanyName').getValue();
            var companyNameSrc = formData.findField('CompanyNameSrc').getValue();
            companyName = companyName.length > 0 ? (companyNameSrc == true ? '%' + companyName + '%' : companyName + '%') : '';
            var abbr = formData.findField('Abbreviation').getValue();
            var abbreviationSrc = formData.findField('AbbreviationSrc').getValue();
            abbr = abbr.length > 0 ? (abbreviationSrc == true ? '%' + abbr + '%' : abbr + '%') : '';
            var contactName = formData.findField('Contact').getValue();
            var contactSrc = formData.findField('ContactSrc').getValue();
            contactName = contactName.length > 0 ? (contactSrc == true ? '%' + contactName + '%' : contactName + '%') : '';
            var city = formData.findField('City').getValue();
            city = city.length > 0 ? city + '%' : '';
            var countryId = formData.findField('Country').getValue();
            var qualityRatingId = formData.findField('QualityRating').getValue();
            var salesManagerId = formData.findField('SalesManager').getValue();
            var marketSegmentId = formData.findField('MarketSegment').getValue();
            var industryId = formData.findField('IndustrySIC').getValue();
            var creditStatusId = formData.findField('CreditStatus').getValue();
            var includeInActive = formData.findField('InActive').getValue();
            var hasParent = formData.findField('HasParent').getValue();
            var hasChild = formData.findField('HasChild').getValue();
            var hasContract = formData.findField('Contract').getValue();
            var includeMerged = formData.findField('IncludeMerged').getValue();
            var companyStatusId = formData.findField('CompanyStatusId').getValue();

            if (rec == "1") {
                var c = Ext.ComponentQuery.query('[itemid=excelPreview]')[0];
                var URL = "ExcelViewer.aspx?lid=" + user_language + "&cmname=" + (companyName == null ? '' : companyName) + "&abbr=" + (abbr == null ? '' : abbr) + "&cnname=" + (contactName == null ? '' : contactName) +
                    "&city=" + (city == null ? '' : city) + "&cntId=" + (countryId == null ? -1 : countryId) + "&qrId=" + (qualityRatingId == null ? -1 : qualityRatingId) + "&sid=" + (salesManagerId == null ? -1 : salesManagerId) +
                    "&mId=" + (marketSegmentId == null ? -1 : marketSegmentId) + "&iId=" + (industryId == null ? -1 : industryId) + "&cId=" + (creditStatusId == null ? -2 : creditStatusId) +
                    "&inactive=" + (includeInActive == null ? false : includeInActive) + "&hasParent=" + (hasParent == null ? false : hasParent) +
                    "&hasChild=" + (hasChild == null ? false : hasChild) + "&hasContract=" + (hasContract == null ? false : hasContract) + "&merge=" + (includeMerged == null ? false : includeMerged) +
                    "&csid=" + (companyStatusId == null ? -1 : companyStatusId) + "&rnd=" + new Date().getTime();
                window.location = URL;
                // c.load(URL);
                return;
            }

            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('languageId', user_language);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('companyName', companyName == null ? '' : companyName);
            //Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('companyName', '& samhoud');
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('abbr', abbr == null ? '' : abbr);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('contactName', contactName == null ? '' : contactName);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('city', city == null ? '' : city);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('countryId', countryId == null ? -1 : countryId);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('qualityRatingId', qualityRatingId == null ? -1 : qualityRatingId);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('salesManagerId', salesManagerId == null ? -1 : salesManagerId);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('marketSegmentId', marketSegmentId == null ? -1 : marketSegmentId);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('industryId', industryId == null ? -1 : industryId);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('creditStatusId', creditStatusId == null ? -2 : creditStatusId);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('includeInActive', includeInActive == null ? false : includeInActive);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('hasParent', hasParent == null ? false : hasParent);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('hasChild', hasChild == null ? false : hasChild);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('hasContract', hasContract == null ? false : hasContract);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('includeMerged', includeMerged == null ? false : includeMerged);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('companyStatusId', companyStatusId == null ? -1 : companyStatusId);
            Ext.getStore('customer.CustomerListStore').load();
        }
    },
    CallResetSearchMethod: function () {
        if (Ext.getCmp('searchCustomer').getForm().isValid()) {

            var formData = Ext.getCmp('searchCustomer').getForm();
            formData.findField('CompanyName').setValue('');
            formData.findField('CompanyNameSrc').setValue('0');
            formData.findField('Abbreviation').setValue('');
            formData.findField('AbbreviationSrc').setValue('0');
            formData.findField('Contact').setValue('');
            formData.findField('ContactSrc').setValue('0');
            formData.findField('City').setValue('');
            formData.findField('Country').setValue(-1);
            formData.findField('QualityRating').setValue(-1);
            formData.findField('SalesManager').setValue(-1);
            formData.findField('MarketSegment').setValue(-1);
            formData.findField('IndustrySIC').setValue(-1);
            formData.findField('CreditStatus').setValue(-2);
            formData.findField('InActive').setValue('0');
            formData.findField('HasParent').setValue('0');
            formData.findField('HasChild').setValue('0');
            formData.findField('Contract').setValue('0');
            formData.findField('IncludeMerged').setValue('0');
            formData.findField('CompanyStatusId').setValue(-1);
            return;
        }
    },
    ///////////////////////////////////////////////////////////////////////////////
    /* code for Select sales user from search poup (Individual Profile -> Sales) */
    /*   Company Profile-> OverView -> contact grid  -> sales info tab           */
    ///////////////////////////////////////////////////////////////////////////////
    SelectSalesUser: function (rec, me) {
        var fromSales_I = Ext.getCmp('Sales_I');
        var fromSales_C = Ext.getCmp('Sales_C');
        var fromSales_G = Ext.getCmp('Sales_Generic');

        var fullUserName = rec.data.FirstName == null || rec.data.FirstName == '' ? '' : rec.data.FirstName;
        fullUserName += rec.data.LastName == null || rec.data.LastName == '' ? '' : ' ' + rec.data.LastName;
        fullUserName += rec.data.Initial == null || rec.data.Initial == '' ? '' : ' (' + rec.data.Initial + ')';

        if (fromSales_I != null) {
            fromSales_I.getForm().findField('SalesManagerName').setValue(fullUserName);
            Ext.getCmp('addIndividual').getForm().findField('SalesManagerId').setValue(rec.data.UserId);
        }
        if (fromSales_C != null) {
            fromSales_C.getForm().findField('SalesManagerName').setValue(fullUserName);
            Ext.getCmp('contactManage').getForm().findField('SalesManagerId').setValue(rec.data.UserId);
        }
        if (fromSales_G != null) {
            var varUserIdentity = Ext.getCmp('SalesUserWindow').getForm().findField('UserIdentity').getValue();
            if (varUserIdentity == 'SaleManager') {
                fromSales_G.getForm().findField('SalesManagerName').setValue(fullUserName);
                //Ext.ComponentQuery.query('[action="ClearSMN"]')[0].show();
                Ext.getCmp('Sales_Generic').getForm().findField('SalesManagerId').setValue(rec.data.UserId);
                Ext.getCmp('generalInfo').getForm().findField('SalesManagerId').setValue(rec.data.UserId);
            }
            if (varUserIdentity == 'SaleManagerAssist') {
                fromSales_G.getForm().findField('SalesManagerAssistantName').setValue(fullUserName);
                Ext.ComponentQuery.query('[action="ClearSMAN"]')[0].show();
                Ext.getCmp('Sales_Generic').getForm().findField('SalesManagerAssistantId').setValue(rec.data.UserId);
                Ext.getCmp('generalInfo').getForm().findField('SalesManagerAssistantId').setValue(rec.data.UserId);
            }
        }

        me.getSalesuserwindow().close();
    },
    //////////////////////////////////////////////////////////////////
    /* code for load sales tabs grid (Individual Profile -> Sales)  */
    /*       and Company Profile-> OverView -> contact grid         */
    //////////////////////////////////////////////////////////////////
    loadSalesGrids: function (id) {
        Ext.getStore('customer.IndividualContactRoleStore').proxy.setExtraParam('id', user_language);
        Ext.getStore('customer.IndividualContactRoleStore').proxy.setExtraParam('id1', id);
        Ext.getStore('customer.IndividualContactRoleStore').load();

        Ext.getStore('customer.IndividualMailingCodeStore').proxy.setExtraParam('id', user_language);
        Ext.getStore('customer.IndividualMailingCodeStore').proxy.setExtraParam('id1', id);
        Ext.getStore('customer.IndividualMailingCodeStore').load();

        Ext.getStore('customer.IndividualRoomClassificationStore').proxy.setExtraParam('id', user_language);
        Ext.getStore('customer.IndividualRoomClassificationStore').proxy.setExtraParam('id1', id);
        Ext.getStore('customer.IndividualRoomClassificationStore').load();
    },
    ///////////////////////////////////////////////////////////////////////////
    /* code for load sales tabs grid (Company Profile -> Sales & Markrting)  */
    ///////////////////////////////////////////////////////////////////////////
    loadCompSalesGrids: function (id) {

        var tabpanel = Ext.ComponentQuery.query('companyprofile [itemid="companySalesMarkTab"]')[0];

        Ext.getStore('company.BuyingReasonListStore').proxy.setExtraParam('id', user_language);
        Ext.getStore('company.BuyingReasonListStore').proxy.setExtraParam('id1', id);
        Ext.getStore('company.BuyingReasonListStore').load({
            callback: function () {

            }
        });

        var PotentialPropertySearchBox = Ext.getCmp('searchString');
        if (PotentialPropertySearchBox != null)
            PotentialPropertySearchBox.setValue('');

        var PropertyFeatureNameSearchBox = Ext.getCmp('searchString1');
        if (PropertyFeatureNameSearchBox != null)
            PropertyFeatureNameSearchBox.setValue('');

        var competitirSearchBox = Ext.getCmp('searchString2');
        if (competitirSearchBox != null)
            competitirSearchBox.setValue('');

        Ext.getStore('company.CompetitorListStore').clearFilter();
        Ext.getStore('company.CompetitorListStore').proxy.setExtraParam('id', id);
        Ext.getStore('company.CompetitorListStore').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('company.CompetitorListStore').proxy.setExtraParam('searchString', '');
        Ext.getStore('company.CompetitorListStore').load({
            callback: function () {

            }
        });

        Ext.getStore('company.PotentialPropertyStore').clearFilter();
        Ext.getStore('company.PotentialPropertyStore').proxy.setExtraParam('id', id);
        Ext.getStore('company.PotentialPropertyStore').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('company.PotentialPropertyStore').proxy.setExtraParam('searchString', '');
        Ext.getStore('company.PotentialPropertyStore').load({
            callback: function () {

            }
        });

        Ext.getStore('company.PotentialMeetingtypeStore').clearFilter();
        Ext.getStore('company.PotentialMeetingtypeStore').proxy.setExtraParam('id', id);
        Ext.getStore('company.PotentialMeetingtypeStore').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('company.PotentialMeetingtypeStore').proxy.setExtraParam('searchString', '');
        Ext.getStore('company.PotentialMeetingtypeStore').load({
            callback: function () {

            }
        });
    },

    CompDomainDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/company/DeleteCompanyDomain',
                    type: "GET",
                    params: { id: rec.data.CompanyDomainId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            //display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            //Ext.getStore('company.DomainListStore').loadPage(1);
                            var grid = Ext.ComponentQuery.query('[itemid="domainlistforcompanygrid"]')[0];
                            Utils.RefreshGridonDelete(grid, grid.getStore());
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Record not deleted.'.l('g'));
                    }
                });
            }
        });
    },
    //    selectTaskBooking: function (rec) {
    //        var bookingId = Ext.ComponentQuery.query('taskmanage hidden[itemid=bookingId]')[0];
    //        bookingId.setValue(rec.BookingId);

    //        var taskBooking = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskBooking]')[0];
    //        var bDate = rec.BookingDate;
    //        var bNumber = rec.BookingNumber;
    //        taskBooking.setValue(bDate + '(' + bNumber + ')');

    //        var taskMeeting = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskMeeting]')[0];
    //        taskMeeting.setValue(rec.BookingMeetingType);

    //        var taskLocation = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskLocation]')[0];
    //        taskLocation.setValue(rec.BookingLocation);

    //        var companyId = Ext.ComponentQuery.query('taskmanage hidden[itemid=companyId]')[0];
    //        companyId.setValue(rec.CompanyId);

    //        var taskCompany = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskCompany]')[0];
    //        taskCompany.setValue(rec.CompanyName);

    //        var individualId = Ext.ComponentQuery.query('taskmanage hidden[itemid=individualId]')[0];
    //        individualId.setValue(rec.IndividualId);

    //        var taskContact = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskContact]')[0];
    //        taskContact.setValue(rec.IndividualName);

    //        var taskPhone = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskPhone]')[0];
    //        taskPhone.setValue(rec.Phone);

    //        var taskEmail = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskEmail]')[0];
    //        taskEmail.setValue(rec.Email);

    //        var bookingId = rec.BookingId;
    //        if (bookingId > 0) {
    //            var btnCompany = Ext.ComponentQuery.query('taskmanage button[itemid=btnSearchCompany]')[0];
    //            btnCompany.disable();
    //        }

    //        this.getTaskbookinglistwindow().close();
    //    },
    BookingEditWindow: function (rec, me) {
        var r = rec.data;
        /*
        if bookingID is numeric then booking is confirmed booking so it send to step5,
        if bookingID is null then we have step# so send it respective step#                            
        */
        var wizObj = new Object();
        wizObj.moduleName = 'WIZA001';
        if (!Utils.ValidateUserAccess(wizObj)) {
            Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.');
        }
        else {
            var BookingTrackingId = (r.BookingTrackingId > 0) ? r.BookingTrackingId : 0;
            var BookingId = (r.BookingId > 0) ? r.BookingId : 0;
            if (BookingTrackingId == 0 && BookingId == 0) {
                var StepNumber = 1;
            }
            else {
                var StepNumber = r.StepNumber + 1;
            }
            var stepObject = { Number: StepNumber, BookingId: BookingId, BookingTrackingId: BookingTrackingId, Status: null, ReservationId: r.ReservationId };
            Utils.loadWizardStepsFromOutSide(me, stepObject, "step" + StepNumber);
        }

        //        if (r.BookingId > 0) {
        //            var stepObject = { Number: 5, BookingId: r.BookingId, BookingTrackingId: r.BookingTrackingId, Status: null, ReservationId: r.ReservationId };
        //            Utils.loadWizardStepsFromOutSide(me, stepObject, "step5");
        //        } else {
        //            var stepObject = { Number: r.StepNumber, BookingId: r.BookingId, BookingTrackingId: r.BookingTrackingId, Status: null, ReservationId: r.ReservationId };

        //            Utils.loadWizardStepsFromOutSide(me, stepObject, "step" + r.StepNumber);
        //        }
    },
    LoadCombosOnSearchCustomer: function () {
        //Company Status
        var companyStatusCombo = Ext.ComponentQuery.query('customersearch combo[itemid=companyStatusCombo]')[0];
        companyStatusCombo.getStore().load({
            callback: function (records, o, success) {
                companyStatusCombo.getStore().insert(0, { "Status": 'Select Company status'.l('SC61000'), "CompanyStatusId": -1 }, true);
                companyStatusCombo.setValue(-1);
            }
        });
        //Quality rating
        var qualityRatingCombo = Ext.ComponentQuery.query('customersearch combo[itemid=qualityRatingCombo]')[0];
        qualityRatingCombo.getStore().load({
            callback: function (records, o, success) {
                qualityRatingCombo.getStore().insert(0, { "Description": 'Select Quality rating'.l('SC61000'), "QualityRatingId": -1 }, true);
                qualityRatingCombo.setValue(-1);
            }
        });
        //Sales manager
        var salesManagerCombo = Ext.ComponentQuery.query('customersearch combo[itemid=salesManagerCombo]')[0];
        salesManagerCombo.getStore().load({
            callback: function (records, o, success) {
                salesManagerCombo.getStore().insert(0, { "FirstName": 'Select Sales manager'.l('SC61000'), "UserId": -1 }, true);
                salesManagerCombo.setValue(-1);
            }
        });
        //Market segment
        var marketSegmentCombo = Ext.ComponentQuery.query('customersearch combo[itemid=marketSegmentCombo]')[0];
        marketSegmentCombo.getStore().load({
            callback: function (records, o, success) {
                marketSegmentCombo.getStore().insert(0, { "Name": 'Select Market segment'.l('SC61000'), "MarketSourceId": -1 }, true);
                marketSegmentCombo.setValue(-1);
            }
        });
        //Country
        var countryCombo = Ext.ComponentQuery.query('customersearch combo[itemid=countryCombo]')[0];
        countryCombo.getStore().load({
            callback: function (records, o, success) {
                countryCombo.getStore().insert(0, { "CountryName": 'Select Country'.l('SC61000'), "CountryId": -1 }, true);
                countryCombo.setValue(-1);
            }
        });
        //Industry-SIC
        var industrySICCombo = Ext.ComponentQuery.query('customersearch combo[itemid=industrySICCombo]')[0];
        industrySICCombo.getStore().load({
            callback: function (records, o, success) {
                industrySICCombo.getStore().insert(0, { "Name": 'Select Industry-SIC'.l('SC61000'), "SicId": -1 }, true);
                industrySICCombo.setValue(-1);
            }
        });
        //Credit Status
        var creditStatusCombo = Ext.ComponentQuery.query('customersearch combo[itemid=creditStatusCombo]')[0];
        creditStatusCombo.getStore().load({
            callback: function (records, o, success) {
                creditStatusCombo.getStore().insert(0, { "CreditStatus": 'Select Credit status'.l('SC61000'), "Value": -2 }, true);
                creditStatusCombo.setValue(-2);
            }
        });
    },
    LoadBlankSearchGrid: function (t) {
        var customersearchGrid = Ext.ComponentQuery.query('[itemid="customersearch"]')[0];
        var gridStore = customersearchGrid.getStore();

        if (gridStore.data.items.length > 0) {
            gridStore.sorters.clear();
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('languageId', user_language);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('companyName', 'SHOWBLANKLIST');
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('abbr', '');
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('contactName', '');
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('city', '');
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('countryId', -1);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('qualityRatingId', -1);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('salesManagerId', -1);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('marketSegmentId', -1);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('industryId', -1);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('creditStatusId', -2);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('includeInActive', false);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('hasParent', false);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('hasChild', false);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('hasContract', false);
            Ext.getStore('customer.CustomerListStore').proxy.setExtraParam('includeMerged', false);
            Ext.getStore('customer.CustomerListStore').load();
        }
    },
    LoadCompanyOverviewDetails: function (t) {


        var custProfTabpanel = Ext.ComponentQuery.query('companyprofile tabpanel[itemid="tbp_companyProfile"]')[0];
        var custProfTabpanelSave = Ext.ComponentQuery.query('companyprofile button[action="saveCompanyProfile"]')[0];
        custProfTabpanel.setLoading(true, true);
        custProfTabpanelSave.disable();

        Ext.getCmp('generalInfo').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/company/GetCompanyProfile',
            params: {
                id: t.CompanyId,
                languageId: user_language
            },
            success: function (form, r) {
                var formSales_G = Ext.getCmp('Sales_Generic');
                var res = r.result.data;
                var btnSMAN = Ext.ComponentQuery.query('[action="ClearSMAN"]')[0];
                //var btnSMN = Ext.ComponentQuery.query('[action="ClearSMN"]')[0];
                if (res.SalesManagerAssistantName.trim() == '-') {
                    btnSMAN.hide();
                }
                else {
                    btnSMAN.show();
                }

                formSales_G.getForm().findField('SalesManagerName').setValue(res.SalesManagerName);
                formSales_G.getForm().findField('SalesManagerAssistantName').setValue(res.SalesManagerAssistantName);
                formSales_G.getForm().findField('CreditStatusId').setValue(res.CreditStatusId);
                formSales_G.getForm().findField('NoOfEmployees').setValue(res.NoOfEmployees);
                formSales_G.getForm().findField('NoOfBookingAYear').setValue(res.NoOfBookingAYear);
                formSales_G.getForm().findField('RevenueTotalInNL').setValue(res.RevenueTotalInNL);
                formSales_G.getForm().findField('PotentialRevenue').setValue(res.PotentialRevenue);
                formSales_G.getForm().findField('GroupSizeMin').setValue(res.GroupSizeMin);
                formSales_G.getForm().findField('GroupSizeMax').setValue(res.GroupSizeMax);
                formSales_G.getForm().findField('NoOfRoomNightsAYear').setValue(res.NoOfRoomNightsAYear);
                formSales_G.getForm().findField('LeadStatusId').setValue(res.LeadStatusId);
                formSales_G.getForm().findField('Clientpagelink').setValue(res.Clientpagelink);
                formSales_G.getForm().findField('ClientpageLogin').setValue(res.ClientpageLogin);
                formSales_G.getForm().findField('Clientpagelink').setValue(res.Clientpagelink);
                formSales_G.getForm().findField('ClientpagePwd').setValue(res.ClientpagePwd);
                formSales_G.getForm().findField('SalesManagerId').setValue(res.SalesManagerId);
                formSales_G.getForm().findField('SalesManagerAssistantId').setValue(res.SalesManagerAssistantId);
                formSales_G.getForm().findField('CompetitorsOther').setValue(res.CompetitorsOther);
                formSales_G.getForm().findField('BuyingReasonOther').setValue(res.BuyingReasonOther);
                if (res.PaymentMode)
                    formSales_G.getForm().findField('PaymentMode').setValue(res.PaymentMode);
                else
                    formSales_G.getForm().findField('PaymentMode').setValue(1);

                custProfTabpanel.setLoading(false);
                custProfTabpanelSave.enable();
            },
            failure: function (form, response) {
                custProfTabpanel.setLoading(false);
            }

        });
    },
    setSelectionModel: function (store, grid) {
        var vm = grid.getSelectionModel();
        var records = store.getRange();
        if (records != null && records.length > 0) {
            var newRecordsToSelect = [];
            for (var i = 0; i < records.length; i++) {
                if (records[i].data.Checked == true) {
                    newRecordsToSelect.push(records[i]);
                }
            }
            vm.select(newRecordsToSelect, true, true);
        }
    }
});
