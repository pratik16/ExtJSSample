///*Minified by P*/
Ext.define('Regardz.controller.Windesk', {
    extend: 'Ext.app.Controller',
    views: ['Windesk', 'bookingwizard.BookingWizardInfoPanel', 'bookingwizard.RightSide.IntakeNotes', 'bookingwizard.RightSide.BookingNavigation', 'bookingwizard.RightSide.BookingInformation',
            'bookingwizard.RightSide.RequiredActions', 'bookingwizard.RightSide.RequitredActionsTree', 'bookingwizard.RightSide.SentConfirmations', 'bookingwizard.RightSide.Invoices', 'common.QuotationNoti', 'common.TasksNoti', 'common.AlertNoti', 'common.TraceNoti',
            'bookingwizard.LockedReservationWindow'],
    administrationController: false,
    yieldController: false,
    calendarControl: false,
    configurationController: false,
    reportsController: false,
    operationController: false,
    customerController: false,
    wizardController: false,
    BWPanelController: false,
    BWInfoPanelController: false,
    TempModuleController: false,
    DemoController: false,
    DummyController: false,
    InvoiceController: false,
    BookingConfirmationController: false,
    CustomerManageController: false,
    ReservationLockController: false,
    ChangePasswordController: false,
    //stores: ['bookingwizard.RoomDetailsStore', 'bookingwizard.RoomSetupListStore', 'property.RoomPhotoListStore', 'property.FloorPlanStore'],
    //stores: ['bookingwizard.RightSide.BookingInvoiceStore'],
    stores: ['customer.CustomerListStore', 'common.QualityRatingStore', 'company.CompanyQualityRatingStore', 'common.CountryStore', 'customer.EmployeeStore', 'mastervalues.MarketSourceStore', 'configuration.CreditStatusStore',
      'customer.AddressTypeStore', 'company.BookingStore', 'mastervalues.CompanyStatusStore', 'mastervalues.SicCodeStore', 'common.AllLanguageListStore', 'company.ChildCompanyStore',
      'company.AddChildCompanyStore', 'company.GlobalDistributionSystemStore', 'company.CompanyContactListStore', 'company.SalesUserStore', //'company.MergeCompaniesStore'
      'customer.IndividualContactRoleStore', 'customer.IndividualMailingCodeStore', 'customer.IndividualRoomClassificationStore', 'company.DomainListStore',
      'common.BusinessTypeStore', 'common.BehaviouralTypeStore', 'company.TaskStore', 'company.CompanySalesDetailStore', 'common.LeadStatusStore', 'common.LeadSourceStore',
      'company.BuyingReasonListStore', 'company.CompetitorListStore', 'company.PotentialPropertyStore', 'company.PotentialMeetingtypeStore', 'company.CompanywideStore',
      'dashboard.TaskTypeStore', "dashboard.TaskBookingStore", 'bookingwizard.CompanySearchListStore', 'bookingwizard.CompanyContactListStore', 'configuration.ReportsMainCategoriesStore'
      , 'bookingwizard.RightSide.BookingConfirmationStore', 'bookingwizard.RightSide.BookingInvoiceStore', 'bookingwizard.RightSide.INCompanyPreferencesStore',
      'common.SearchLocationRangeStore', 'common.RoomSetupStore', 'yield.RoomTypeStore', 'common.MeetingTypeStore', 'property.FloorPropertyStore', 'common.PropertyForNamesStore', 'bookingwizard.PackageListStore', 'bookingwizard.SchedulerEventStore', 'bookingwizard.SchedulerResourceStore', 'operations.RoomTypeStore', 'operations.RoomSetupStore', 'common.PropertyForIdAndDistanceStore', 'property.BWPropertyMeetingTypeStore', 'property.PropertyAtmosphereListStore', 'property.PhotoGalleryListStore', 'property.BWPropertyFacilityIcons', 'property.RoomPhotoListStore', 'property.VideoLibraryListStore', 'property.FloorPlanStore', 'bookingwizard.RoomFloorPlanStore', 'property.PropertyDetails', 'bookingwizard.RoomDetailsStore', 'bookingwizard.RoomSetupListStore', 'property.FloorPlanStore', 'bookingwizard.InfoLeftPanelStore', 'common.PropertyForPropertyIdAndDistanceStore',
      'bookingwizard.RightSide.SalesInfoBuyingReasonStore', 'bookingwizard.RightSide.SalesInfoCompetitorStore'
    ],

    init: function (application) {
        var me = this;
        _currentApp = me;
        _myDesktopApp = Ext.create('widget.windesk');
        me.DeskTopNotifications();
        var cm = me.getController('common.CommonController');
        if (cm.thisController == false) {
            cm.init();
            cm.thisController = true;
        }
        this.control({
            'windesk': {
                afterrender: function (t, n, o, eo) {

                }
            },
            'administration': {
                afterrender: function (t, n, o, eo) {
                    var c = me.getController('layout.Administration');
                    if (me.administrationController == false) {
                        c.init();
                        me.administrationController = true
                    }
                    c.validateModule(t, n, o);
                }
            },
            'dashboard': {
                afterrender: function (t, n, o, eo) {

                    var c = me.getController('layout.Dashboard');
                    if (c.thisController == false) {
                        c.init();
                        c.thisController = true;
                    }
                    c.index();
                }
            },
            'yield': {
                afterrender: function (t, n, o, eo) {
                    var c = me.getController('layout.Yield');
                    if (me.yieldController == false) {
                        c.init();
                        me.yieldController = true
                    }
                }
            },
            'configuration': {
                afterrender: function (t, n, o, eo) {
                    var c = me.getController('layout.Configuration');
                    if (me.configurationController == false) {
                        c.init();
                        me.configurationController = true
                    }
                }
            },
            'reports': {
                afterrender: function (t, n, o, eo) {
                    var c = me.getController('layout.Reports');
                    if (me.reportsController == false) {
                        c.init();
                        me.reportsController = true
                    }
                }
            },
            'operations': {
                afterrender: function (t, n, o, eo) {
                    var c = me.getController('layout.Operations');
                    if (me.operationController == false) {
                        c.init();
                        me.operationController = true
                    }
                }
            },
            'customersearch': {
                afterrender: function (t, n, o, eo) {
                    var c = me.getController('customer.CustomerManage');
                    if (me.customerController == false) {
                        c.init();
                        me.customerController = true
                    }
                }
            },
            'changepasswordwin': {
                afterrender: function (t, n, o, eo) {
                    var c = me.getController('usermanage.User');
                    if (me.ChangePasswordController == false) {
                        c.init();
                        me.ChangePasswordController = true
                    }
                }
            },
            'tempmodule': {
                afterrender: function (t, n, o, eo) {
                    var c = me.getController('layout.TempModule');
                    if (me.TempModuleController == false) {
                        c.init();
                        me.TempModuleController = true
                    }
                }
            },
            'bookingwizard': {
                afterrender: function (t, n) {

                    var c = me.getController('layout.BookingWizard');
                    if (c.thisController == false) {
                        c.init();
                        c.thisController = true
                    }

                    //Function for load Right panels related controllers - MM
                    me.loadRightPanControllers(me);


                }
            },
            'bookingwizardstep1': {
                afterrender: function (t, n) {
                    var c1 = me.getController('bookingwizard.BookingWizardStep1');
                    c1.index();
                }
            },
            'demolayout': {
                afterrender: function (t, n, o, eo) {
                    var c = me.getController('layout.DemoController');
                    if (me.DemoController == false) {
                        c.init();
                        me.DemoController = true
                    }
                }
            },
            'dummylayout': {
                afterrender: function (t, n, o, eo) {
                    //alert('after render windesk');
                    //var c = me.getController('layout.DummyController');
                    //if (me.DummyController == false) {
                    //    c.init();
                    //    me.DummyController = true
                    //}
                    var c = me.getController('layout.DummyController');
                    var cv = me.getView('layout.DummyLayout');
                    if (this.DummyController == false) {
                        c.init();
                        this.DummyController = true;
                    }
                    //var ws = Ext.getCmp('right_Dummy');
                    //ws.removeAll();
                    //ws.add(cv);
                    //ws.doLayout();
                }
            },
            'invoices': {
                afterrender: function (t, n, o, eo) {
                    var cr = me.getController('bookingwizard.BookingInvoiceSettings');
                    if (cr.thisController == false) {
                        cr.init();
                        cr.thisController = true;
                    }
                }
            },
            'sentconfirmations': {
                afterrender: function (t, n, o, eo) {
                    var c = me.getController('bookingwizard.BookingConfirmations');
                    if (me.BookingConfirmationController == false) {
                        c.init();
                        me.BookingConfirmationController = true
                    }
                }
            },
            'quotationnoti': {
                afterrender: function (panel) {
                    panel.body.on('click', function () {
                        me.OpenDashboardFromNoti(me);
                    });
                },
                beforerender: function (n, eOpt) {
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/MasterValue/GetQuotationsCount',
                        type: 'GET',
                        params: {
                            id: CurrentSessionUserId, //UserId                            
                            languageId: user_language
                        },
                        success: function (response) {
                            if (response.data > 0)
                                n.update('You have a new quotation'.l('g') + ' (' + response.data + ')');
                            else
                                n.destroy();
                        }
                    });
                }
            },
            'tracenoti': {
                afterrender: function (panel) {
                    panel.body.on('click', function () {
                        me.OpenDashboardFromNoti(me);
                    });
                },
                beforerender: function (n, eOpt) {
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/MasterValue/GetTracesCount',
                        type: 'GET',
                        params: {
                            id: CurrentSessionUserId, //UserId                            
                            languageId: user_language
                        },
                        success: function (response) {
                            if (response.data > 0)
                                n.update('You have a new trace'.l('g') + ' (' + response.data + ')');
                            else
                                n.destroy();
                        }
                    });
                }
            },
            'tasksnoti': {
                afterrender: function (panel) {
                    panel.body.on('click', function () {
                        me.OpenDashboardFromNoti(me);
                    });
                },
                beforerender: function (n, eOpt) {
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/MasterValue/GetTasksCount',
                        type: 'GET',
                        params: {
                            id: CurrentSessionUserId, //UserId                            
                            languageId: user_language
                        },
                        success: function (response) {
                            if (response.data > 0)
                                n.update('You have a task due'.l('g') + ' (' + response.data + ')');
                            else
                                n.destroy()
                        }
                    });
                }
            },
            'alertnoti': {
                afterrender: function (panel) {
                    panel.body.on('click', function () {
                        me.OpenDashboardFromNoti(me);
                    });
                },
                beforerender: function (n, eOpt) {
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/MasterValue/GetAlertsCount',
                        type: 'GET',
                        params: {
                            id: CurrentSessionUserId, //UserId                            
                            languageId: user_language
                        },
                        success: function (response) {
                            if (response.data > 0)
                                n.update('You have a new alert'.l('g') + ' (' + response.data + ')');
                            else
                                n.destroy();
                        }
                    });
                }
            }
        });
    },
    onClick: function () { },
    NewRequest: function () { },
    loadRightPanControllers: function (me) {

        var cInfo = me.getController('bookingwizard.BookingWizardInfoPanelController');
        if (cInfo.thisController == false) {
            cInfo.init();
            cInfo.thisController = true
        }

        var cBWRCommon = me.getController('bookingwizard.BWRightPanelCommon');
        if (cBWRCommon.thisController == false) {
            cBWRCommon.init();
            cBWRCommon.thisController = true;
        }


        var cTask = me.getController('bookingwizard.BWRPTaskTrace');
        if (cTask.thisController == false) {
            cTask.init();
            cTask.thisController = true;
        }

    },
    DeskTopNotifications: function () {
        var me = this;
        /*Quotation*/
        var QuoTask = {
            run: function () {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/MasterValue/GetQuotationsCount',
                    type: 'GET',
                    params: {
                        id: CurrentSessionUserId, //UserId                            
                        languageId: user_language
                    },
                    success: function (response) {
                        if (response.data > 0) {
                            var quotNoti = Ext.ComponentQuery.query('quotationnoti[itemid=quotNotificationsId]')[0];
                            if (!quotNoti) {
                                Ext.create('widget.quotationnoti', { closeAction: 'hide' }).show();
                                quotNoti = Ext.ComponentQuery.query('quotationnoti[itemid=quotNotificationsId]')[0];
                            }
                            else
                                quotNoti.show();
                            quotNoti.update('You have a new quotation'.l('g') + ' (' + response.data + ')');
                        }
                    }
                });
            },
            interval: 3600000 // every 1 hour
        };
        var QuitRunner = new Ext.util.TaskRunner();
        QuitRunner.start(QuoTask);
        /*End Quotation*/

        /*Trace*/

        var traceStop = false;

        var TraceTask = {
            run: function () {
                // var traceNoti = Ext.ComponentQuery.query('tracenoti[itemid=traceNotificationsId]')[0];
                //var notiWin = Ext.create('widget.tracenoti');
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/MasterValue/GetTracesCount',
                    type: 'GET',
                    params: {
                        id: CurrentSessionUserId, //UserId                            
                        languageId: user_language
                    },
                    success: function (response) {
                        if (response.data > 0) {
                            var traceNoti = Ext.ComponentQuery.query('tracenoti[itemid=traceNotificationsId]')[0];
                            if (!traceNoti) {
                                Ext.create('widget.tracenoti', { closeAction: 'hide' }).show();
                                traceNoti = Ext.ComponentQuery.query('tracenoti[itemid=traceNotificationsId]')[0];
                            }
                            else
                                traceNoti.show();
                            traceNoti.update('You have a new trace'.l('g') + ' (' + response.data + ')');
                        }
                    }
                });
            },
            interval: 120000 //every 2 min
        };
        var TraceRunner = new Ext.util.TaskRunner();
        TraceRunner.start(TraceTask);
        /*End Trace*/


        /*Alerts*/
        var AlertsTask = {
            run: function () {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/MasterValue/GetAlertsCount',
                    type: 'GET',
                    params: {
                        id: CurrentSessionUserId, //UserId                            
                        languageId: user_language
                    },
                    success: function (response) {
                        if (response.data > 0) {
                            var alertNoti = Ext.ComponentQuery.query('alertnoti[itemid=alertNotificationsId]')[0];
                            if (!alertNoti) {
                                Ext.create('widget.alertnoti', { closeAction: 'hide' }).show();
                                alertNoti = Ext.ComponentQuery.query('alertnoti[itemid=alertNotificationsId]')[0];
                            }
                            else
                                alertNoti.show();

                            alertNoti.update('You have a new alert'.l('g') + ' (' + response.data + ')');
                        }

                    }
                });
            },
            interval: 10800000 // every 3 hours
        };
        var AlertsRunner = new Ext.util.TaskRunner();
        AlertsRunner.start(AlertsTask);
        /*End Alerts*/


        /*UserTasks*/

        var UserTasksTask = {
            run: function () {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/MasterValue/GetTasksCount',
                    type: 'GET',
                    params: {
                        id: CurrentSessionUserId, //UserId                            
                        languageId: user_language
                    },
                    success: function (response) {
                        if (response.data > 0) {
                            var tasksNoti = Ext.ComponentQuery.query('tasksnoti[itemid=tasksNotificationsId]')[0];
                            if (!tasksNoti) {
                                Ext.create('widget.tasksnoti', { closeAction: 'hide' }).show();
                                tasksNoti = Ext.ComponentQuery.query('tasksnoti[itemid=tasksNotificationsId]')[0];
                            }
                            else
                                tasksNoti.show();

                            tasksNoti.update('You have a task due'.l('g') + ' (' + response.data + ')');
                        }
                    }
                });
            },
            interval: 3600000 // every 1 hours            
        };
        var UserTasksRunner = new Ext.util.TaskRunner();
        UserTasksRunner.start(UserTasksTask);
        /*End UserTasks*/

    },
    OpenDashboardFromNoti: function (me) {
        var myWindow = _myDesktopApp.getModule('dashboard-win');
        var createdWindow = myWindow.createWindow();

        var c = me.getController('layout.Dashboard');
        if (c.thisController == false) {
            c.init();
            c.thisController = true
        }
        //***
        var cv = c.getView('layout.Dashboard');
        createdWindow.removeAll();
        createdWindow.add(cv);
        createdWindow.doLayout();
        createdWindow.show();

        var bwc = me.getController('dashboard.DashboardItem');
        if (bwc.thisController == false) {
            bwc.init();
            bwc.thisController = true
        }
    }
});
