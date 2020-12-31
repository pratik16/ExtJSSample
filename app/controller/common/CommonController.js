Ext.define('Regardz.controller.common.CommonController', {
    extend: 'Ext.app.Controller',
    views: ['dashboard.TaskManage', 'usermanage.SelectUserWindow', 'usermanage.SelectFromUserList', 'dashboard.TaskBookingListWindow'],
    stores: ['usermanage.UserlistStore', 'dashboard.TaskBookingStore'],
    thisController: false,
    refs: [{
        ref: 'taskmanage',
        selector: 'taskmanage'
    }, {
        ref: 'selectuserwindow',
        selector: 'selectuserwindow'
    }, {
        ref: 'taskbookinglistwindow',
        selector: 'taskbookinglistwindow'
    }],
    init: function () {
        var me = this;
        this.control({
            'taskmanage button[action=taskmanagesaveAction]': {
                click: function (t, e, eo) {
                    var form = Ext.ComponentQuery.query('taskmanage [itemid=taskmangeid]')[0];
                    var date = form.getForm().findField('DueDate').getValue();

                    var date = Ext.util.Format.date(date, 'Y-m-d');
                    form.getForm().findField('DueDate').setValue(date);

                    var isClone = form.getForm().findField('isClone').getValue();

                    if (isClone == 'true') {
                        form.getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        form.getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        form.getForm().findField('TaskId').setValue(0);
                    }
                    else if (form.getForm().findField('TaskId').getValue() > 0) {
                        form.getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        form.getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                    } else {
                        form.getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        form.getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                    }

                    //                    form.getForm().findField('BookingTrackingId').setValue(); //Utils.StepOneObj.BookingTrackingId
                    //                    form.getForm().findField('BookingId').setValue(); //Utils.StepOneObj.BookingId

                    //return;
                    if (form.getForm().isValid()) {
                        if ((form.getForm().getValues()['ActionType'] == 1 || form.getForm().getValues()['ActionType'] == 2) && (form.getForm().findField('BusinessTypeId').getValue() == null || form.getForm().findField('BusinessTypeId').getValue() <= 0)) {
                            Ext.Msg.alert('Error'.l('g'), 'Please Select Business Type'.l('SC81000'));
                            //Ext.Msg.alert('Please select business type');
                        }
                        else {

                            form.getForm().submit({
                                url: webAPI_path + "api/task/ManageTask",
                                method: 'POST',
                                success: function (form, response) {
                                    var r = response.response.responseText;
                                    var r = Ext.decode(r);
                                    
                                    /*Commented as response text not came from API*/
                                    if (r.success == true) {
                                        me.getTaskmanage().close();
                                        var tasklistGrid = Ext.ComponentQuery.query('[itemid=tasklistgrid]')[0];
                                        if (tasklistGrid) {
                                            tasklistGrid.getStore().reload();
                                            return;
                                        }

                                        /*dont found but kept it for time*/
                                        var taskslist = Ext.ComponentQuery.query('[itemid=taskslist]')[0];
                                        if (taskslist) {
                                            taskslist.getStore().reload();
                                            return;
                                        }

                                        var tasklist = Ext.ComponentQuery.query('[itemid=tasklist]')[0];
                                        if (tasklist) {
                                            tasklist.getStore().reload();
                                            return;
                                        }
                                        
                                        /*Commented by PV, code was in BWRPTrace.js controller*/
                                        /* obj = new Object();
                                        obj.BookingId = Utils.StepOneObj.BookingId;
                                        obj.BookingTrackingId = Utils.StepOneObj.BookingTrackingId;
                                        obj.TaskAllOrOpen = 2
                                        obj.searchParam = null;
                                        obj = Ext.encode(obj);
                                        tasklistGrid.getStore().proxy.setExtraParam('param', obj);
                                        tasklistGrid.getStore().load(); */
                                    }
                                },
                                failure: function (form, response) {
                                }
                            })
                        }
                    }
                }
            },

            'taskmanage combo[itemid=taskType]': {
                select: function (combo, records, eOpt) {

                    var taskId = Ext.ComponentQuery.query('taskmanage hidden[itemid=taskId]')[0].getValue();

                    var TaskTypeId = records[0].data.TaskTypeId;

                    Ext.Ajax.request({
                        url: webAPI_path + 'api/task/GetSubjectbyTaskType',
                        method: 'GET',
                        params: { id: TaskTypeId, id1: taskId, languageId: user_language },
                        success: function (response) {
                            var r = jsonDecode(response.responseText);
                            var Subject = Ext.ComponentQuery.query('taskmanage textfield[name="Subject"]')[0];
                            var Description = Ext.ComponentQuery.query('taskmanage textarea[name="Description"]')[0];
                            if (Subject.getValue().length > 0)
                                return;
                            Subject.setValue(r.data.Subject);
                            Description.setValue(r.data.Description);

                        },
                        failure: function () {
                        }
                    });
                }
            },
            'taskmanage button[action=searchUser]': {
                click: function (t, e, eo) {
                    Ext.getStore('usermanage.UserlistStore').proxy.setExtraParam('propertyId', -1);
                    Ext.getStore('usermanage.UserlistStore').proxy.setExtraParam('isVerified', true);
                    Ext.getStore('usermanage.UserlistStore').proxy.setExtraParam('searchString', '');
                    //                    Ext.getStore('usermanage.UserlistStore').load();
                    Ext.create('widget.selectuserwindow', { ModuleIdentity: 'TaskManageStaff' }).center();
                }
            },
            'selectfromuserlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'SelectedUser')
                        me.selectStaffUser(zRec.data, me);
                }
            },
            'taskmanage button[action=searchBooking]': {
                click: function (t, e, eo) {
                    Ext.getStore('dashboard.TaskBookingStore').proxy.setExtraParam('id', 0);
                    Ext.getStore('dashboard.TaskBookingStore').proxy.setExtraParam('languageId', user_language);
                    Ext.getStore('dashboard.TaskBookingStore').proxy.setExtraParam('searchParam', '');
                    Ext.create('widget.taskbookinglistwindow').center();
                }
            },
            'taskbookinglist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'selectTaskBooking')
                        me.selectTaskBooking(zRec.data);
                }
            },
            //Module Identity are
            //t.itemid == 'taskmanageBW', taskManage open from Booking Right panel
            //t.itemid == 'taskmanageDB', taskManage open from Dashboard Task List
            //t.itemid == 'taskmanageCUST', taskManage open from customer(company / individual) task list
            'taskmanage': {
                afterrender: function (t, e, eo) {
                    var taskTypeCombo = Ext.ComponentQuery.query('taskmanage [itemid=taskType]')[0];
                    taskTypeCombo.getStore().load();

                    var businessTypeCombo = Ext.ComponentQuery.query('taskmanage [itemid=businesstype]')[0];
                    businessTypeCombo.getStore().load();

                    var propertyList = Ext.ComponentQuery.query('taskmanage combo[itemid=propertycombo]')[0];
                    propertyList.getStore().proxy.setExtraParam('activityCode', 'DASH004');
                    propertyList.getStore().load({
                        callback: function (records, o, success) {
                            propertyList.getStore().insert(0, { "PropertyName": 'None' }, true);
                            propertyList.getStore().insert(1, { "PropertyName": '-External-', "PropertyId": -1 }, true);
                        }
                    });

                    var form = Ext.ComponentQuery.query('taskmanage [itemid=taskmangeid]')[0];
                    var StartTimeOrigin = form.getForm().findField('StartTime').getValue();
                    var EndTimeOrigin = form.getForm().findField('EndTime').getValue();
                    var TaskId = form.getForm().findField('TaskId').getValue();
                    if (t.itemid == 'taskmanageCUST' || t.itemid == 'taskmanageDB') {
                        if (TaskId > 0) {
                            form.getForm().load({
                                method: 'GET',
                                url: webAPI_path + 'api/task/GetTaskById',
                                params: {
                                    id: TaskId,
                                    languageId: user_language
                                },
                                success: function (form, action) {
                                    var form = Ext.ComponentQuery.query('taskmanage [itemid="taskmangeid"]')[0];
                                    var resp = Ext.decode(action.response.responseText);

                                    var staff = Ext.ComponentQuery.query('taskmanage hidden[name=AssignedTo]')[0];
                                    var staffDisplay = Ext.ComponentQuery.query('taskmanage displayfield[itemid=staffDisplay]')[0];

                                    if (staff != null && staff != undefined && parseInt(staff.value) > 0) {
                                        staff.setValue(resp.data.AssignedTo);
                                        staffDisplay.setValue(resp.data.UserName);
                                    }

                                    var date = Ext.util.Format.date(resp.data.DueDate, usr_dateformat);
                                    form.getForm().findField('DueDate').setValue(date);
                                    form.getForm().findField('BusinessTypeId').setValue(resp.data.BusinessTypeId);

                                    var EndTime = resp.data.ETime;
                                    var StartTime = resp.data.STime;

                                    var NewStartTime = "";

                                    if (StartTime != "") {
                                        var StartTimeOrigin = form.getForm().findField('StartTime').getValue();
                                        StartTimeOrigin = new Date(StartTimeOrigin);

                                        StartTime = StartTime.split(":");

                                        EndTimeOrigin = StartTimeOrigin.setHours(StartTime[0], StartTime[1]);
                                        StartTime = new Date(StartTimeOrigin);

                                        form.getForm().findField('StartTime').setValue(StartTime);

                                    }
                                    var NewEndTime = "";
                                    if (EndTime != "") {
                                        var EndTimeOrigin = form.getForm().findField('EndTime').getValue();
                                        EndTimeOrigin = new Date(EndTimeOrigin);

                                        EndTime = EndTime.split(":");

                                        EndTimeOrigin = EndTimeOrigin.setHours(EndTime[0], EndTime[1]);
                                        EndTime = new Date(EndTimeOrigin);

                                        form.getForm().findField('EndTime').setValue(EndTime);
                                    }

                                    var bookingId = resp.data.BookingId;
                                    if (bookingId > 0) {
                                        var btnCompany = Ext.ComponentQuery.query('taskmanage button[itemid=btnSearchCompany]')[0];
                                        btnCompany.disable();
                                    }
                                }
                            });
                        }
                        else {
                            var priorityCombo = Ext.ComponentQuery.query('taskmanage combo[name=PriorityId]')[0];
                            priorityCombo.setValue(priorityCombo.getStore().getAt(1));
                        }
                    }


                    if (t.itemid == 'taskmanageBW') {

                        var btnBooking = Ext.ComponentQuery.query('taskmanage button[itemid=btnSearchBooking]')[0];
                        btnBooking.disable();
                        Utils.SetFieldsRightSide();

                        if (TaskId > 0) {
                            form.getForm().load({
                                method: 'GET',
                                url: webAPI_path + 'api/WizardRightPanel/GetTaskByIdForWizard',
                                params: {
                                    id: TaskId,
                                    languageId: user_language
                                },
                                success: function (form, action) {
                                                                        
                                    var form = Ext.ComponentQuery.query('taskmanage [itemid=taskmangeid]')[0];
                                    var resp = Ext.decode(action.response.responseText);
                                    var date = Ext.util.Format.date(resp.data.DueDate, usr_dateformat);
                                    form.getForm().findField('DueDate').setValue(date);
                                    form.getForm().findField('BusinessTypeId').setValue(resp.data.BusinessTypeId);

                                    var staff = Ext.ComponentQuery.query('taskmanage hidden[name=AssignedTo]')[0];
                                    var staffDisplay = Ext.ComponentQuery.query('taskmanage displayfield[itemid=staffDisplay]')[0];                                    

                                    if (staff != null && staff != undefined && parseInt(staff.value) > 0) {
                                        staff.setValue(resp.data.AssignedTo);
                                        staffDisplay.setValue(resp.data.UserName);                                        
                                    }


                                    var EndTime = resp.data.ETime;
                                    var StartTime = resp.data.STime;

                                    var NewStartTime = "";
                                    if (StartTime != "") {
                                        var StartTimeOrigin = form.getForm().findField('StartTime').getValue();
                                        StartTimeOrigin = new Date(StartTimeOrigin);
                                        StartTime = StartTime.split(":");
                                        EndTimeOrigin = StartTimeOrigin.setHours(StartTime[0], StartTime[1]);
                                        StartTime = new Date(StartTimeOrigin);
                                        form.getForm().findField('StartTime').setValue(StartTime);
                                    }

                                    var NewEndTime = "";
                                    if (EndTime != "") {
                                        var EndTimeOrigin = form.getForm().findField('EndTime').getValue();
                                        EndTimeOrigin = new Date(EndTimeOrigin);
                                        EndTime = EndTime.split(":");
                                        EndTimeOrigin = EndTimeOrigin.setHours(EndTime[0], EndTime[1]);
                                        EndTime = new Date(EndTimeOrigin);
                                        form.getForm().findField('EndTime').setValue(EndTime);
                                    }

                                    var bookingId = resp.data.BookingId;
                                    var bookingTrackingId = resp.data.BookingTrackingId;
                                    if (bookingId > 0 || bookingTrackingId > 0) {
                                        var btnCompany = Ext.ComponentQuery.query('taskmanage button[itemid=btnSearchCompany]')[0];
                                        btnCompany.disable();
                                    }
                                }
                            });
                        }
                        else {
                            form.getForm().load({
                                method: 'GET',
                                url: webAPI_path + 'api/WizardRightPanel/GetBookingDateNumberforTask',
                                params: {
                                    id: Utils.StepOneObj.BookingId,
                                    languageId: Utils.StepOneObj.BookingTrackingId
                                }, success: function (form, action) { }
                            });
                        }

                    }

                }
            }
        });
    },
    ///////////////////////////////////////////////////////////////////////////////
    /// Module Identity are                                                      ///
    /// 'TaskManageStaff'= open from taskManage(Add/edit task) popup            ///
    /// 'DashboardUserFilter' = open from dashboard complete filter             ///
    ///////////////////////////////////////////////////////////////////////////////
    selectStaffUser: function (rec, me) {
        var ModuleIdentity = Ext.ComponentQuery.query('selectuserwindow hidden[itemid=ModuleIdentity]')[0].getValue();
        var Initial = rec.Initial;
        if (Initial && Initial.length > 0)
            Initial = ' (' + rec.Initial + ')';
        else
            Initial = "";

        if (ModuleIdentity == 'TaskManageStaff') {

            var staffDisplay = Ext.ComponentQuery.query('taskmanage displayfield[itemid=staffDisplay]')[0];
            staffDisplay.setValue(rec.FirstName + ' ' + rec.LastName + Initial);
            var staff = Ext.ComponentQuery.query('taskmanage hidden[name=AssignedTo]')[0];
            staff.setValue(rec.UserId);

        }
        else if (ModuleIdentity == 'DashboardUserFilter') {

            var dtc = me.getController('dashboard.DashboardItem');
            if (dtc.thisController == false) {
                dtc.init();
                dtc.thisController = true
            }
            dtc.refreshDashboard(rec, me, Initial);
        }

        me.getSelectuserwindow().close();
    },
    selectTaskBooking: function (rec) {
        var bookingId = Ext.ComponentQuery.query('taskmanage hidden[itemid=bookingId]')[0];
        bookingId.setValue(rec.BookingId);

        var taskBooking = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskBooking]')[0];
        var bDate = Ext.util.Format.date(Ext.Date.parse(rec.BookingDate, 'c'), usr_dateformat);
        var bNumber = rec.BookingNumber;
        taskBooking.setValue(bDate + ' (' + bNumber + ')');

        var taskMeeting = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskMeeting]')[0];
        taskMeeting.setValue(rec.BookingMeetingType);

        var taskLocation = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskLocation]')[0];
        taskLocation.setValue(rec.BookingLocation);

        var companyId = Ext.ComponentQuery.query('taskmanage hidden[itemid=companyId]')[0];
        companyId.setValue(rec.CompanyId);

        var taskCompany = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskCompany]')[0];
        taskCompany.setValue(rec.CompanyName);

        var individualId = Ext.ComponentQuery.query('taskmanage hidden[itemid=individualId]')[0];
        individualId.setValue(rec.IndividualId);

        var taskContact = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskContact]')[0];
        taskContact.setValue(rec.IndividualName);

        var taskPhone = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskPhone]')[0];
        taskPhone.setValue(rec.Phone);

        var taskEmail = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskEmail]')[0];
        taskEmail.setValue(rec.Email);

        var bookingId = rec.BookingId;
        if (bookingId > 0) {
            var btnCompany = Ext.ComponentQuery.query('taskmanage button[itemid=btnSearchCompany]')[0];
            btnCompany.disable();
        }

        this.getTaskbookinglistwindow().close();

    }
});