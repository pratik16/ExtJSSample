        var _myDesktopApp;
var _planBoardWizard;

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux.desktop': 'lib/js',
        'Ext.util': 'lib/ExtJS/src/util',
        'Ext.ux': 'lib/ExtJS/examples/ux',
        'Ext.ux.form': 'lib/ExtJS/examples/ux/form',
        'Ext.calendar': 'lib/ExtJS/examples/calendar/src'
    }
});

Ext.onReady(function () {
    _app = Ext.application({
        name: 'Regardz',
        controllers: ['Windesk']
        ,
        launch: function () {
            /*Booking Wizard*/

//            _currentApp.getController('bookingwizard.AddNewEventScheduler');
//            _currentApp.getController('bookingwizard.AddNewEventScheduler');
//            _currentApp.getController('bookingwizard.BookingCompany');
//            _currentApp.getController('bookingwizard.BookingCompanySearchContact');
//            _currentApp.getController('bookingwizard.BookingConfirmations');
//            _currentApp.getController('bookingwizard.BookingInvoiceSettings');
//            _currentApp.getController('bookingwizard.BookingWizardInfoPanelController');
//            _currentApp.getController('bookingwizard.BookingWizardPanel');
//            _currentApp.getController('bookingwizard.BookingWizardStep1');
//            _currentApp.getController('bookingwizard.BookingWizardStep2');
//            _currentApp.getController('bookingwizard.BookingWizardStep3');
//            _currentApp.getController('bookingwizard.BookingWizardStep4');
//            _currentApp.getController('bookingwizard.BookingWizardStep5');
//            _currentApp.getController('bookingwizard.BookingWizardStep6');
//            _currentApp.getController('bookingwizard.BWContactList');
//            _currentApp.getController('bookingwizard.BWRightPanelCommon');
//            _currentApp.getController('bookingwizard.BWRPCompanyContract');
//            _currentApp.getController('bookingwizard.BWRPTaskTrace');
//            _currentApp.getController('bookingwizard.PropertyInformation');


//            /*common controller*/
//            _currentApp.getController('common.CommonController');

//            /*Company*/
//            _currentApp.getController('company.Company');
//            _currentApp.getController('company.CompanySearchContact');
//            _currentApp.getController('company.MergeGeneral');


//            /*configuration*/
//            _currentApp.getController('configuration.AdvancePaymentManage');
//            _currentApp.getController('configuration.AutomatedTrace');
//            _currentApp.getController('configuration.BusinessAlert');
//            _currentApp.getController('configuration.CancellationPenalty');
//            _currentApp.getController('configuration.DepartmentEdit');
//            _currentApp.getController('configuration.DepartmentManage');
//            _currentApp.getController('configuration.DesignationManage');
//            _currentApp.getController('configuration.DiscountManage');
//            _currentApp.getController('configuration.Events');
//            _currentApp.getController('configuration.FixedPriceEventItem');
//            _currentApp.getController('configuration.FixedPriceEventItemAddWin');
//            _currentApp.getController('configuration.FixedPriceManage');
//            _currentApp.getController('configuration.FixedPriceManageEvents');
//            _currentApp.getController('configuration.FixedPricePackages');
//            _currentApp.getController('configuration.Item');
//            _currentApp.getController('configuration.ItemCategory');
//            _currentApp.getController('configuration.ItemGroup');
//            _currentApp.getController('configuration.ItemType');
//            _currentApp.getController('configuration.ManageRolesRights');
//            _currentApp.getController('configuration.MenuItem');
//            _currentApp.getController('configuration.Outlet');
//            _currentApp.getController('configuration.ProgramDefinition');
//            _currentApp.getController('configuration.ReportsManage');
//            _currentApp.getController('configuration.RoomAvailabilityStatus');
//            _currentApp.getController('configuration.RoomClassification');
//            _currentApp.getController('configuration.RoomType');
//            _currentApp.getController('configuration.SubDepartmentManage');


//            /*Customer*/
//            _currentApp.getController('customer.ContractManage');
//            _currentApp.getController('customer.ContractManageWin');
//            _currentApp.getController('customer.CustomerManage');

//            /*Dashboard*/
//            _currentApp.getController('dashboard.DashboardItem');

//            /*extraz*/
//            _currentApp.getController('extraz.Points');
//            _currentApp.getController('extraz.Webshop');

//            /*Layout*/
//            _currentApp.getController('layout.Administration');
//            _currentApp.getController('layout.BookingWizard');
//            _currentApp.getController('layout.Configuration');
//            _currentApp.getController('layout.Customer');
//            _currentApp.getController('layout.Dashboard');
//            _currentApp.getController('layout.Operations');
//            _currentApp.getController('layout.Reports');
//            _currentApp.getController('layout.Yield');

//            /*MasterValues*/
//            _currentApp.getController('mastervalues.AddressType');
//            _currentApp.getController('mastervalues.BookingStatus');
//            _currentApp.getController('mastervalues.CcardType');
//            _currentApp.getController('mastervalues.CompanyStatus');
//            _currentApp.getController('mastervalues.ContractStatus');
//            _currentApp.getController('mastervalues.MarketSource');
//            _currentApp.getController('mastervalues.Origin');
//            _currentApp.getController('mastervalues.QualityRating');
//            _currentApp.getController('mastervalues.TaskType');

//            /*Operation*/
//            _currentApp.getController('operations.CashRegisterController');
//            _currentApp.getController('operations.DirectSalesController');
//            _currentApp.getController('operations.InhouseController');
//            _currentApp.getController('operations.Planboard');

//            /*Property*/
//            _currentApp.getController('property.CashRegister');
//            _currentApp.getController('property.FloorPlan');
//            _currentApp.getController('property.ItemGlobal');
//            _currentApp.getController('property.ManageRooms');
//            _currentApp.getController('property.ManageRoomsType');
//            _currentApp.getController('property.OutletGlobal');
//            _currentApp.getController('property.PhotoGallery');
//            _currentApp.getController('property.PropertyEdit');
//            _currentApp.getController('property.PropertyFacilityIcons');
//            _currentApp.getController('property.PropertyFeatures');
//            _currentApp.getController('property.PropertyList');
//            _currentApp.getController('property.RoomPriceandRevenue');
//            _currentApp.getController('property.VideoLibrary');
//            _currentApp.getController('property.YieldCalendar');
//            _currentApp.getController('property.YieldTemplate');


//            /*Reports*/
//            _currentApp.getController('reports.ReportsList');

//            /*Right Manage*/
//            _currentApp.getController('rightsmanage.ManageRights');

//            /*temp module*/
//            _currentApp.getController('tempmodule.BookingList');
//            _currentApp.getController('tempmodule.RoomAvailabilityBlock');

//            /*UserManage*/
//            _currentApp.getController('usermanage.ManageActivity');
//            _currentApp.getController('usermanage.ManageRoles');
//            _currentApp.getController('usermanage.ManageSalesTarget');
//            _currentApp.getController('usermanage.User');

//            /*Yield*/
//            _currentApp.getController('yield.Calendar');
//            _currentApp.getController('yield.ImportYieldData');
//            _currentApp.getController('yield.ListException');
//            _currentApp.getController('yield.YieldTemplate');
        }
    });
});