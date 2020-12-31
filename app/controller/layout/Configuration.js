Ext.define('Regardz.controller.layout.Configuration', {
    extend: 'Ext.app.Controller',

    views: ['layout.Configuration'],

    roomTypeController: false,
    roomAvailabilityStatusController: false,
    roomClassificationController: false,
    itemCategoryController: false,
    itemTypeController: false,
    itemController: false,
    cancellationPenaltyTypeController: false,
    eventsController: false,
    outletController: false,
    ccardTypeController: false,
    originController: false,
    marketSourceController: false,
    bookingStatusController: false,
    taskTypeController: false,
    addressTypeController: false,
    qualityRatingController: false,
    companyStatusController: false,
    contractStatusController: false,
    itemGroupController: false,
    programDefinitionController: false,
    yieldTemplateController: false,
    discountManageController: false,
    DesignationManageController: false,
    fixedPriceManageController: false,
    advancePaymentManageController: false,
    departmentManageController: false,
    fixedPricePackagesController: false,
    manageRolesRightsController: false,
    reportsMainCategories: false,
    reportsCategoriesStructure: false,
    reportsMaintainance: false,
    init: function () {

        var me = this;

        this.control({
            'treepanel[name=configurationManagement]': {
                itemclick: function (t, r, i) {

                    try {
                        //Load desktop if login successed

                        if (r.raw.itemId == "automatedTraces") {
                            var rightList = new Object();
                            rightList.moduleName = 'CONF005';

                            if (Utils.ValidateUserAccess(rightList)) {
                                var c = me.getController('configuration.AutomatedTrace');
                                var cv = me.getView('configuration.AutomatedTraceList');

                                if (c.thisController == false) {
                                    c.init();
                                    c.thisController = true;
                                }
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.')
                            }
                        }
                        else if (r.raw.itemId == "businessAlert") {
                            var rightList = new Object();
                            rightList.moduleName = 'CONF005';

                            if (Utils.ValidateUserAccess(rightList)) {
                                var c = me.getController('configuration.BusinessAlert');
                                var cv = me.getView('configuration.BusinessAlert');

                                if (c.thisController == false) {
                                    c.init();
                                    c.thisController = true;
                                }
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.')
                            }
                        }
                        else if (r.raw.itemId == 'roomType') {
                            var rightList = new Object();
                            rightList.moduleName = 'CONF007';

                            if (Utils.ValidateUserAccess(rightList)) {
                                var c = me.getController('configuration.RoomType');
                                var cv = me.getView('configuration.RoomTypeList');

                                if (this.roomTypeController == false) {
                                    c.init();
                                    this.roomTypeController = true;
                                }
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.')
                            }
                        }
                        else if (r.raw.itemId == 'designationManagement') {
                            var rightList = new Object();
                            rightList.moduleName = 'CONF002';

                            if (Utils.ValidateUserAccess(rightList)) {
                                var c = me.getController('configuration.DesignationManage');
                                var cv = me.getView('configuration.DesignationManageList');

                                if (this.DesignationManageController == false) {
                                    c.init();
                                    this.DesignationManageController = true;
                                }
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.')
                            }
                        }
                        else if (r.raw.itemId == 'manageroles&rights') {
                            var rightList = new Object();
                            rightList.moduleName = 'CONF001';

                            if (Utils.ValidateUserAccess(rightList)) {
                                var c = me.getController('configuration.ManageRolesRights');
                                var cv = me.getView('configuration.ManageRolesRights');
                                if (this.manageRolesRightsController == false) {
                                    c.init();
                                    this.manageRolesRightsController = true;
                                }
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.')
                            }
                        }
                        else if (r.raw.itemId == 'manageAdvancePayments') {
                            var rightList = new Object();
                            rightList.moduleName = 'CONF004';

                            if (Utils.ValidateUserAccess(rightList)) {
                                var c = me.getController('configuration.AdvancePaymentManage');
                                var cv = me.getView('configuration.AdvancePaymentManageList');
                                if (this.advancePaymentManageController == false) {
                                    c.init();
                                    this.advancePaymentManageController = true;
                                }
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.')
                            }
                        }
                        else if (r.raw.itemId == 'reportMainCategories') {
                            var rightList = new Object();
                            rightList.moduleName = 'CONF001';

                            if (Utils.ValidateUserAccess(rightList)) {
                                var c = me.getController('configuration.ReportsManage');
                                var cv = me.getView('configuration.ReportsMainCategoriesList');
                                if (this.reportsMaintainance == false) {
                                    c.init();
                                    this.reportsMaintainance = true;
                                }
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.')
                            }
                        } else if (r.raw.itemId == 'reportCategoryStructure') {
                            var rightList = new Object();
                            rightList.moduleName = 'CONF001';

                            if (Utils.ValidateUserAccess(rightList)) {
                                var c = me.getController('configuration.ReportsManage');
                                var cv = me.getView('configuration.ReportsCategoryStructure');

                                if (this.reportsMaintainance == false) {
                                    c.init();
                                    this.reportsMaintainance = true;
                                }
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.')
                            }
                        } else if (r.raw.itemId == 'reportMaintenance') {
                            var rightList = new Object();
                            rightList.moduleName = 'CONF001';

                            if (Utils.ValidateUserAccess(rightList)) {
                                var c = me.getController('configuration.ReportsManage');
                                var cv = me.getView('configuration.ReportsMaintainance');
                                if (this.reportsMaintainance == false) {
                                    c.init();
                                    this.reportsMaintainance = true;
                                }
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.')
                            }
                        }

                        /*
                        else if (r.raw.itemId == 'roomAvailabilityStatus') {
                        var c = me.getController('configuration.RoomAvailabilityStatus');

                        var cv = me.getView('configuration.RoomAvailabilityStatusList');
                        if (this.roomAvailabilityStatusController == false) {
                        c.init();
                        this.roomAvailabilityStatusController = true;
                        }
                        }
                        else if (r.raw.itemId == 'roomClassification') {
                        var c = me.getController('configuration.RoomClassification');
                        var cv = me.getView('configuration.RoomClassificationList');

                        if (this.roomClassificationController == false) {
                        c.init();
                        this.roomClassificationController = true;
                        }
                        }
                        else if (r.raw.itemId == 'itemCategory') {
                        var c = me.getController('configuration.ItemCategory');
                        var cv = me.getView('configuration.ItemCategoryList');

                        if (this.itemCategoryController == false) {
                        c.init();
                        this.itemCategoryController = true;
                        }
                        }
                        else if (r.raw.itemId == 'itemType') {
                        var c = me.getController('configuration.ItemType');
                        var cv = me.getView('configuration.ItemTypeList');

                        if (this.itemTypeController == false) {
                        c.init();
                        this.itemTypeController = true;
                        }
                        }
                        else if (r.raw.itemId == 'itemManagement') {
                        var c = me.getController('configuration.Item');
                        var cv = me.getView('configuration.ItemList');

                        if (this.itemController == false) {
                        c.init();
                        this.itemController = true;
                        }
                        }
                        else if (r.raw.itemId == 'cancellationpenalty') {
                        var c = me.getController('configuration.CancellationPenalty');
                        var cv = me.getView('configuration.CancellationPenaltyList');

                        if (this.cancellationPenaltyTypeController == false) {
                        c.init();
                        this.cancellationPenaltyTypeController = true;
                        }
                        }
                        else if (r.raw.itemId == 'eventsManagement') {
                        var c = me.getController('configuration.Events');
                        var cv = me.getView('configuration.EventsList');

                        if (this.eventsController == false) {
                        c.init();
                        this.eventsController = true;
                        }
                        }
                        else if (r.raw.itemId == 'outletManagement') {
                        var c = me.getController('configuration.Outlet');
                        var cv = me.getView('configuration.OutletList');

                        if (this.outletController == false) {
                        c.init();
                        this.outletController = true;
                        }
                        }
                        else if (r.raw.itemId == 'ccardType') {
                        var c = me.getController('mastervalues.CcardType');
                        var cv = me.getView('mastervalues.CcardTypeList');

                        if (this.ccardTypeController == false) {
                        c.init();
                        this.ccardTypeController = true;
                        }
                        }
                        else if (r.raw.itemId == 'origin') {
                        var c = me.getController('mastervalues.Origin');
                        var cv = me.getView('mastervalues.OriginList');

                        if (this.originController == false) {
                        c.init();
                        this.originController = true;
                        }
                        }
                        else if (r.raw.itemId == 'marketSource') {
                        var c = me.getController('mastervalues.MarketSource');
                        var cv = me.getView('mastervalues.MarketSourceList');

                        if (this.marketSourceController == false) {
                        c.init();
                        this.marketSourceController = true;
                        }
                        }
                        else if (r.raw.itemId == 'bookingStatus') {
                        var c = me.getController('mastervalues.BookingStatus');
                        var cv = me.getView('mastervalues.BookingStatusList');

                        if (this.bookingStatusController == false) {
                        c.init();
                        this.bookingStatusController = true;
                        }
                        }
                        else if (r.raw.itemId == 'tasktype') {
                        var c = me.getController('mastervalues.TaskType');
                        var cv = me.getView('mastervalues.TaskTypeList');

                        if (this.taskTypeController == false) {
                        c.init();
                        this.taskTypeController = true;
                        }
                        }
                        else if (r.raw.itemId == 'addresstype') {
                        var c = me.getController('mastervalues.AddressType');
                        var cv = me.getView('mastervalues.AddressTypeList');

                        if (this.addressTypeController == false) {
                        c.init();
                        this.addressTypeController = true;
                        }
                        }
                        else if (r.raw.itemId == 'qualityrating') {
                        var c = me.getController('mastervalues.QualityRating');
                        var cv = me.getView('mastervalues.QualityRatingList');

                        if (this.qualityRatingController == false) {
                        c.init();
                        this.qualityRatingController = true;
                        }
                        }
                        else if (r.raw.itemId == 'companystatus') {
                        var c = me.getController('mastervalues.CompanyStatus');
                        var cv = me.getView('mastervalues.CompanyStatusList');

                        if (this.companyStatusController == false) {
                        c.init();
                        this.companyStatusController = true;
                        }
                        }
                        else if (r.raw.itemId == 'contractstatus') {
                        var c = me.getController('mastervalues.ContractStatus');
                        var cv = me.getView('mastervalues.ContractStatusList');

                        if (this.contractStatusController == false) {
                        c.init();
                        this.contractStatusController = true;
                        }
                        }
                        else if (r.raw.itemId == 'itemGroupManagement') {
                        var c = me.getController('configuration.ItemGroup');
                        var cv = me.getView('configuration.ItemGroupList');

                        if (this.itemGroupController == false) {
                        c.init();
                        this.itemGroupController = true;
                        }
                        }
                        else if (r.raw.itemId == 'programDefinitionManagement') {
                        var c = me.getController('configuration.ProgramDefinition');
                        var cv = me.getView('configuration.ProgramDefinitionList');

                        if (this.programDefinitionController == false) {
                        c.init();
                        this.programDefinitionController = true;
                        }
                        }
                        else if (r.raw.itemId == 'yieldtemplate') {
                        var c = me.getController('yield.YieldTemplate');
                        var cv = me.getView('yield.YieldTemplate');

                        if (this.yieldTemplateController == false) {
                        c.init();
                        this.yieldTemplateController = true;
                        }
                        }

                        else if (r.raw.itemId == 'fixedPriceManagement') {

                        var c = me.getController('configuration.FixedPriceManage');
                        var cv = me.getView('configuration.FixedPriceManageList');

                        if (this.fixedPriceManageController == false) {
                        c.init();
                        this.fixedPriceManageController = true;
                        }
                        }
                        else if (r.raw.itemId == 'departmentManagement') {
                        var c = me.getController('configuration.DepartmentManage');
                        var cv = me.getView('configuration.DepartmentManageList');
                        if (this.departmentManageController == false) {
                        c.init();
                        this.departmentManageController = true;
                        }
                        }

                        else if (r.raw.itemId == 'discountManagement') {
                        var c = me.getController('configuration.DiscountManage');
                        var cv = me.getView('configuration.DiscountManageList');
                        if (this.discountManageController == false) {
                        c.init();
                        this.discountManageController = true;
                        }
                        }
                        else if (r.raw.itemId == 'FixedPricePackages') {
                        var c = me.getController('configuration.FixedPricePackages');
                        var cv = me.getView('configuration.FixedPricePackages');
                        if (this.fixedPricePackagesController == false) {
                        c.init();
                        this.fixedPricePackagesController = true;
                        }
                        }
                        */


                        var ws = Ext.getCmp('right_regionConfiguration');
                        ws.removeAll();
                        ws.add(cv);
                        ws.doLayout();

                    } catch (e) {
                        console.log(e);
                        throw new Error('[' + Ext.getDisplayName(e.callee) + '] controller');
                    }
                }

            }
        });
    }
});