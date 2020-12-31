Ext.define('Regardz.controller.dashboard.DashboardItem', {
    extend: 'Ext.app.Controller',
    views: ['dashboard.DashboardItem', 'dashboard.TaskList', 'dashboard.TaskManage', 'dashboard.OutgoingTraceList', 'dashboard.IncomingTraceList',
            'usermanage.SelectUserWindow', 'usermanage.SelectFromUserList', 'dashboard.TraceManage', 'dashboard.TaskBookingList', 'dashboard.TaskCompanyContactListWindow', 'dashboard.TaskCompanySearchContactList', 'dashboard.TaskCompanyContactList', 'dashboard.DashboardView',
            'dashboard.TaskView', 'dashboard.TraceView', 'dashboard.AlertList', 'dashboard.AlertView', 'dashboard.DraftQuatationList', 'dashboard.DraftQuatationView'],
    stores: ['dashboard.TaskStore', 'dashboard.TaskTypeStore', 'common.BusinessTypeStore', 'dashboard.IncomingTracesStore', 'dashboard.OutgoingTracesStore', 'common.PropertyForNamesStore', 'dashboard.TracesSubDepartmentStore',
            'dashboard.TracesUserStore', 'bookingwizard.CompanySearchListStore', 'bookingwizard.CompanyContactListStore',
            'dashboard.AlertStore', 'dashboard.DraftQuatationStore', 'operations.OperationsInhouseBookingChanges', 'dashboard.BookingListForDashboardStore', 'usermanage.UserlistStore'],
    thisController: false,
    CustomerManageController: false,
    refs: [{
        ref: 'taskmanage',
        selector: 'taskmanage'
    }, {
        ref: 'tracemanage',
        selector: 'tracemanage'
    }, {
        ref: 'selectuserwindow',
        selector: 'selectuserwindow'
    }],

    init: function () {
        var me = this;
        this.control(
        {
            'dashboarditem': {
                afterrender: function (t, e, eo) {//t => this, e => event, eo => Eoptional

                    var tasklistGrid = Ext.ComponentQuery.query('[itemid="tasklistgrid"]')[0];
                    obj = new Object();
                    obj.UserId = CurrentSessionUserId;
                    obj.TaskAllOrOpen = 2
                    obj.searchParam = null;
                    obj = Ext.encode(obj);
                    tasklistGrid.getStore().proxy.setExtraParam('param', obj);
                    tasklistGrid.getStore().load();

                    /*Drafts & Quatations*/
                    var draftQuatatiobGrid = Ext.ComponentQuery.query('[itemid=draftquatationlist]')[0];
                    draftQuatatiobGrid.getStore().proxy.setExtraParam('userId', CurrentSessionUserId);
                    draftQuatatiobGrid.getStore().proxy.setExtraParam('languageId', user_language);
                    draftQuatatiobGrid.getStore().load();

                    /*Incoming Traces*/
                    var incomingTracesGrid = Ext.ComponentQuery.query('[itemid=incomingtracelist]')[0];
                    incomingTracesGrid.getStore().proxy.setExtraParam('id', CurrentSessionUserId);
                    incomingTracesGrid.getStore().proxy.setExtraParam('id1', 3);
                    incomingTracesGrid.getStore().proxy.setExtraParam('id2', 2);
                    incomingTracesGrid.getStore().proxy.setExtraParam('searchParam', null);
                    incomingTracesGrid.getStore().load();

                    /*Outgoing Traces*/
                    var outgoingtracelistGrid = Ext.ComponentQuery.query('[itemid=outgoingtracelistgrid]')[0];
                    outgoingtracelistGrid.getStore().proxy.setExtraParam('id', CurrentSessionUserId);
                    outgoingtracelistGrid.getStore().proxy.setExtraParam('id1', 3);
                    outgoingtracelistGrid.getStore().proxy.setExtraParam('id2', 2);
                    outgoingtracelistGrid.getStore().proxy.setExtraParam('searchParam', null);
                    outgoingtracelistGrid.getStore().load();

                    /*Alerts*/
                    var alertlistGrid = Ext.ComponentQuery.query('[itemid=alertlist]')[0];
                    alertlistGrid.getStore().load();
                }
            },
            'draftquatationlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'editDQ')
                        me.EditDrafts(me, zRec.data);
                    else {
                        var dashboardView = Ext.ComponentQuery.query('dashboarditem container[itemid=dashboard_view]')[0];
                        if (dashboardView.isHidden() == true)
                            return false;
                        me.DraftsView(zRec);
                    }
                }
            },
            'tasklist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'deleteTask')
                        me.deleteTask(zRec.data);
                    else if (fieldName == 'editTaskAction')
                        me.editTaskAction(zRec.data);
                    else if (fieldName == 'cloneTaskAction')
                        me.cloneTaskAction(zRec.data);
                    else if (fieldName == 'taskDoneAction' && zRec.data.StatusId == '1')
                        me.taskDoneAction(zRec.data);
                    else {
                        var dashboardView = Ext.ComponentQuery.query('dashboarditem container[itemid=dashboard_view]')[0];
                        if (dashboardView.isHidden() == true)
                            return false;
                        me.TaskView(zRec);
                    }
                }
            },
            'tasklist radiogroup[itemid=is_open_all]': {
                change: function (t, n, o, eo) {
                    var user = Ext.ComponentQuery.query('dashboarditem hidden[itemid=userId]')[0];
                    var tasklistGrid = Ext.ComponentQuery.query('[itemid="tasklistgrid"]')[0];
                    //                    obj = new Object();
                    //                    obj.UserId = user.getValue();
                    //                    obj.TaskAllOrOpen = n.status;
                    //                    obj.searchParam = null;
                    //                    obj = Ext.encode(obj);
                    //                    tasklistGrid.getStore().proxy.setExtraParam('param', obj);
                    tasklistGrid.getStore().proxy.setExtraParam('TaskAllOrOpen', n.status);
                    tasklistGrid.getStore().load();
                }
            },
            'tasklist button[action=searchTasks]': {
                click: function () {
                    me.searchTaskListFilter();
                }
            },
            'tasklist textfield[itemid=searchString]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        me.searchTaskListFilter(null);
                    }
                }
            },
            'tasklist button[action="clearTaskFilter"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
                    me.clearsearchTaskListFilter();
                }
            },
            'tasklist button[action=tasklistaction]': {
                click: function () {
                    Ext.create('widget.taskmanage', { itemid: 'taskmanageDB' });
                }
            },
            //            'taskmanage': {
            //                afterrender: function (t, e, eo) {
            //                    debugger;
            //                    /*Get type combobox*/
            //                    if (t.itemid != 'taskmanageDB')
            //                        return;

            //                    //                    Ext.getStore('common.PropertyForNamesStore').proxy.setExtraParam('id', user_language);
            //                    //                    Ext.getStore('common.PropertyForNamesStore').load({});

            //                    var propertyList = Ext.ComponentQuery.query('taskmanage combo[itemid=propertycombo]')[0];
            //                    propertyList.getStore().proxy.setExtraParam('activityCode', 'DASH004');
            //                    propertyList.getStore().load({
            //                        callback: function (records, o, success) {
            //                            propertyList.getStore().insert(0, { "PropertyName": 'None' }, true);
            //                            propertyList.getStore().insert(1, { "PropertyName": '-External-', "PropertyId": -1 }, true);
            //                        }
            //                    });

            //                    var taskTypeCombo = Ext.ComponentQuery.query('[itemid=taskType]')[0];
            //                    taskTypeCombo.getStore().load();

            //                    var businessTypeCombo = Ext.ComponentQuery.query('[itemid=businesstype]')[0];
            //                    businessTypeCombo.getStore().load();

            //                    var form = Ext.ComponentQuery.query('taskmanage [itemid=taskmangeid]')[0];
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
            //                                var form = Ext.ComponentQuery.query('taskmanage [itemid=taskmangeid]')[0];

            //                                var resp = Ext.decode(action.response.responseText);
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

            //                                var staff = Ext.ComponentQuery.query('taskmanage hidden[name=AssignedTo]')[0];
            //                                var staffDisplay = Ext.ComponentQuery.query('taskmanage displayfield[itemid=staffDisplay]')[0];

            //                                if (staff != null && staff != undefined && parseInt(staff.value) > 0) {
            //                                    staff.setValue(resp.data.AssignedTo);
            //                                    staffDisplay.setValue(resp.data.UserName);
            //                                }
            //                            }
            //                        });
            //                    }
            //                    else {
            //                        var priorityCombo = Ext.ComponentQuery.query('taskmanage combo[name=PriorityId]')[0];
            //                        priorityCombo.setValue(priorityCombo.getStore().getAt(1));
            //                    }

            //                }
            //            },
            'taskmanage datefield[itemid=Date]': {
                change: function () {
                    var duedate = Ext.ComponentQuery.query('taskmanage datefield[itemid=Date]')[0];
                    //console.log(duedate);
                }
            },
            //            'taskmanage button[action=searchUser]': {
            //                click: function (t, e, eo) {                    
            //                    Ext.getStore('company.SalesUserStore').proxy.setExtraParam('searchString', '');
            //                    
            //                    Ext.create('widget.salesuserwindow', { userId: 0 }).center();
            //                }
            //            },
            'dashboarditem button[action=searchUser]': {
                click: function (t, e, eo) {
                    Ext.getStore('usermanage.UserlistStore').proxy.setExtraParam('propertyId', -1);
                    Ext.getStore('usermanage.UserlistStore').proxy.setExtraParam('isVerified', true);
                    Ext.getStore('usermanage.UserlistStore').proxy.setExtraParam('searchString', '');
                    //Ext.getStore('usermanage.UserlistStore').load();
                    Ext.create('widget.selectuserwindow', { userId: 0, ModuleIdentity: 'DashboardUserFilter' }).center();
                }
            },
            'selectuserwindow': {
                resize: function (t, w, h, eOpts) {
                    //  alert(w + ' = ' + h)//selectfromuserlist

                    var allItemsGrid = Ext.ComponentQuery.query('additems > [itemid=allItemsGrid]')[0];
                    if (allItemsGrid) {
                        allItemsGrid.noResize = false;
                        allItemsGrid.setHeight(h);
                    }
                },
                afterrender: function () {
                    var selectfromuserlist = Ext.ComponentQuery.query('selectfromuserlist')[0];
                    selectfromuserlist.noResize = false;
                }
            },
            //            'taskmanage button[action=searchBooking]': {
            //                click: function (t, e, eo) {
            //                    Ext.getStore('dashboard.TaskBookingStore').proxy.setExtraParam('id', 0);
            //                    Ext.getStore('dashboard.TaskBookingStore').proxy.setExtraParam('languageId', user_language);
            //                    Ext.getStore('dashboard.TaskBookingStore').proxy.setExtraParam('searchParam', '');
            //                    //Ext.getStore('dashboard.TaskBookingStore').load();
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
                    //                    console.log('1');
                    //                    return;
                    if (Ext.getCmp('btnSelectBookingCompanyContactWin'))
                        Ext.getCmp('btnSelectBookingCompanyContactWin').destroy();

                    Ext.create('widget.taskcompanycontactlistwindow', { itemid: 'companySearchContactWindowDB' });
                }
            },
            'taskcompanycontactlistwindow': {
                afterrender: function (t, e, eo) {
                    console.log(t.itemid);
                    if (t.itemid != 'companySearchContactWindowDB')
                        return;

                    var companyId = Ext.ComponentQuery.query('taskmanage hidden[itemid=companyId]')[0].getValue();
                    var taskCompany = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskCompany]')[0].getValue();

                    var individualId = Ext.ComponentQuery.query('taskmanage hidden[itemid=individualId]')[0].getValue();
                    var taskContact = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskContact]')[0].getValue();

                    var fieldFilterTaskObj = Ext.ComponentQuery.query('taskcompanysearchcontactlist textfield[itemid="fieldFilterCompanies"]')[0];
                    fieldFilterTaskObj.setValue(taskCompany);

                    Utils.MangageCompanyContact(1, Number(companyId), taskCompany, Number(individualId), '');
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
                    //console.log(selectedCompnayContact.data);
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
            'outgoingtracelist button[action=traceadd]': {
                click: function () {
                    Ext.create('widget.tracemanage');
                }
            },
            'tracemanage': {
                beforerender: function (t, e, eo) {
                    Ext.getStore('common.PropertyForNamesStore').proxy.setExtraParam('activityCode', 'DASH005');
                },
                afterrender: function (t, e, eo) {
                    var subDeptGrid = Ext.ComponentQuery.query('tracemanage grid[itemid=TraceDepartment]')[0];
                    //Ext.getStore('common.PropertyForNamesStore').clearFilter();
                    Ext.getStore('dashboard.TracesSubDepartmentStore').clearFilter();
                    Ext.getStore('dashboard.TracesUserStore').clearFilter();
                    subDeptGrid.getStore().removeAll();
                    var userGrid = Ext.ComponentQuery.query('tracemanage grid[itemid="TraceUser"]')[0];
                    userGrid.getStore().removeAll();
                    //var TraceProeprtyStore = Ext.ComponentQuery.query('grid[itemid="TraceProeprty"]')[0];
                    //console.log(TraceProeprtyStore);

                }
            },
            'tracemanage button[action="searchProperties"]': {
                click: function () {

                    var r = Ext.getCmp('searchProperty').getValue();

                    Ext.getStore('common.PropertyForNamesStore').clearFilter();
                    var regex = new RegExp(".*" + r + ".*", "i");
                    Ext.getStore('common.PropertyForNamesStore').filter("PropertyName", regex, true, true);

                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearProperties"]')[0];
                        clearIcon.show();
                    }
                }
            },
            'tracemanage button[action="clearProperties"]': {
                click: function () {

                    Ext.getCmp('searchProperty').setValue('');
                    Ext.getStore('common.PropertyForNamesStore').clearFilter();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearProperties"]')[0];
                    clearIcon.hide();
                }
            },
            'tracemanage button[action="searchSubDept"]': {
                click: function () {

                    var r = Ext.getCmp('searchSubDept').getValue();

                    Ext.getStore('dashboard.TracesSubDepartmentStore').clearFilter();
                    var regex = new RegExp(".*" + r + ".*", "i");
                    Ext.getStore('dashboard.TracesSubDepartmentStore').filter("SubDepartmentName", regex, true, true);

                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearSubDept"]')[0];
                        clearIcon.show();
                    }
                }
            },
            'tracemanage button[action="clearSubDept"]': {
                click: function () {

                    Ext.getCmp('searchSubDept').setValue('');
                    Ext.getStore('dashboard.TracesSubDepartmentStore').clearFilter();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearSubDept"]')[0];
                    clearIcon.hide();
                }
            },
            'tracemanage button[action="searchUser"]': {
                click: function () {

                    var r = Ext.getCmp('searchUser').getValue();

                    Ext.getStore('dashboard.TracesUserStore').clearFilter();
                    var regex = new RegExp(".*" + r + ".*", "i");
                    Ext.getStore('dashboard.TracesUserStore').filter("Name", regex, true, true);

                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearUser"]')[0];
                        clearIcon.show();
                    }
                }
            },
            'tracemanage button[action="clearUser"]': {
                click: function () {

                    Ext.getCmp('searchUser').setValue('');
                    Ext.getStore('dashboard.TracesUserStore').clearFilter();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearUser"]')[0];
                    clearIcon.hide();
                }
            },
            'tracemanage grid[itemid="TraceProeprty"]  [xtype="radiorow"]': {
                checkchange: function (t, rowIndex, eo) {//t => this, e => event, eo => Eoptional      

                    var grid = Ext.ComponentQuery.query('tracemanage grid[itemid="TraceProeprty"]')[0];
                    var alldata = grid.getStore().getRange();

                    if (alldata) {
                        var i = 0;
                        Ext.each(alldata, function (d) {
                            var record = d.data;
                            alldata[i].set('checked', false);
                            i++;
                        })
                    }

                    alldata[rowIndex].set('checked', true);

                    var propertyId = alldata[rowIndex].data.PropertyId;
                    var propId = Ext.ComponentQuery.query('tracemanage hidden[name="PropertyId"]')[0];
                    propId.setValue(propertyId);

                    var TraceDepartmentGrid = Ext.ComponentQuery.query('tracemanage grid[itemid="TraceDepartment"]')[0];

                    TraceDepartmentGrid.getStore().proxy.setExtraParam('id', propertyId);
                    TraceDepartmentGrid.getStore().load();

                    /*Traces userlist*/
                    var TraceUserGrid = Ext.ComponentQuery.query('tracemanage grid[itemid="TraceUser"]')[0];

                    TraceUserGrid.getStore().proxy.setExtraParam('id', propertyId);
                    TraceUserGrid.getStore().proxy.setExtraParam('languageId', null);
                    TraceUserGrid.getStore().load();
                }
            },
            'tracemanage grid[itemid="TraceDepartment"]  [xtype="radiorow"]': {
                checkchange: function (t, rowIndex, eo) {//t => this, e => event, eo => Eoptional  
                    var grid = Ext.ComponentQuery.query('tracemanage grid[itemid="TraceDepartment"]')[0];
                    var alldata = grid.getStore().getRange();

                    if (alldata) {
                        var i = 0;
                        Ext.each(alldata, function (d) {
                            var record = d.data;
                            alldata[i].set('checked', false);
                            i++;
                        })
                    }

                    alldata[rowIndex].set('checked', true);

                    var SubDepartmentId = alldata[rowIndex].data.SubDepartmentId;
                    var deptId = Ext.ComponentQuery.query('tracemanage hidden[name="SubDepartmentId"]')[0];
                    deptId.setValue(SubDepartmentId);

                    /*Traces userlist*/
                    var TraceUserGrid = Ext.ComponentQuery.query('tracemanage grid[itemid="TraceUser"]')[0];

                    //  TraceUserGrid.getStore().proxy.setExtraParam('id', propertyId);
                    TraceUserGrid.getStore().proxy.setExtraParam('languageId', SubDepartmentId);
                    TraceUserGrid.getStore().load();
                }
            },
            'tracemanage grid[itemid="TraceUser"]  [xtype="radiorow"]': {
                checkchange: function (t, rowIndex, eo) {//t => this, e => event, eo => Eoptional  
                    var grid = Ext.ComponentQuery.query('tracemanage grid[itemid="TraceUser"]')[0];
                    var alldata = grid.getStore().getRange();

                    if (alldata) {
                        var i = 0;
                        Ext.each(alldata, function (d) {
                            var record = d.data;
                            alldata[i].set('checked', false);
                            i++;
                        })
                    }
                    alldata[rowIndex].set('checked', true);

                    var UserId = alldata[rowIndex].data.UserId;

                    var usrId = Ext.ComponentQuery.query('tracemanage hidden[name="AssignedToUserId"]')[0];
                    usrId.setValue(UserId);
                }
            },
            'outgoingtracelist radiogroup[itemid=is_status]': {
                change: function (t, n, o, eo) {
                    var statusRadio = Ext.ComponentQuery.query('outgoingtracelist radiogroup[itemid=is_open_all]')[0].getValue();
                    var user = Ext.ComponentQuery.query('dashboarditem hidden[itemid=userId]')[0];

                    var outgoingtracelistGrid = Ext.ComponentQuery.query('[itemid=outgoingtracelistgrid]')[0];
                    outgoingtracelistGrid.getStore().proxy.setExtraParam('id', user.getValue());
                    outgoingtracelistGrid.getStore().proxy.setExtraParam('id1', n.tracetype_out);
                    //outgoingtracelistGrid.getStore().proxy.setExtraParam('id2', statusRadio.status_out);
                    //outgoingtracelistGrid.getStore().proxy.setExtraParam('searchParam', null);
                    outgoingtracelistGrid.getStore().load();
                }
            },
            'outgoingtracelist radiogroup[itemid=is_open_all]': {
                change: function (t, n, o, eo) {
                    var traceRadio = Ext.ComponentQuery.query('outgoingtracelist radiogroup[itemid=is_status]')[0].getValue();
                    var user = Ext.ComponentQuery.query('dashboarditem hidden[itemid=userId]')[0];

                    var outgoingtracelistGrid = Ext.ComponentQuery.query('[itemid=outgoingtracelistgrid]')[0];
                    outgoingtracelistGrid.getStore().proxy.setExtraParam('id', user.getValue());
                    //outgoingtracelistGrid.getStore().proxy.setExtraParam('id1', traceRadio.tracetype_out);
                    outgoingtracelistGrid.getStore().proxy.setExtraParam('id2', n.status_out);
                    //outgoingtracelistGrid.getStore().proxy.setExtraParam('searchParam', null);
                    outgoingtracelistGrid.getStore().load();
                }
            },
            'incomingtracelist radiogroup[itemid=is_status]': {
                change: function (t, n, o, eo) {
                    var statusRadio = Ext.ComponentQuery.query('incomingtracelist radiogroup[itemid=is_open_all]')[0].getValue();
                    var user = Ext.ComponentQuery.query('dashboarditem hidden[itemid=userId]')[0];

                    var incomingtracelistGrid = Ext.ComponentQuery.query('[itemid=incomingtracelist]')[0];
                    incomingtracelistGrid.getStore().proxy.setExtraParam('id', user.getValue());
                    incomingtracelistGrid.getStore().proxy.setExtraParam('id1', n.tracetype_in);
                    //                    incomingtracelistGrid.getStore().proxy.setExtraParam('id2', statusRadio.status_in);
                    //                    incomingtracelistGrid.getStore().proxy.setExtraParam('searchParam', null);
                    incomingtracelistGrid.getStore().load();
                }
            },
            'incomingtracelist radiogroup[itemid=is_open_all]': {
                change: function (t, n, o, eo) {
                    var traceRadio = Ext.ComponentQuery.query('incomingtracelist radiogroup[itemid=is_status]')[0].getValue();
                    var user = Ext.ComponentQuery.query('dashboarditem hidden[itemid=userId]')[0];

                    var incomingtracelistGrid = Ext.ComponentQuery.query('[itemid=incomingtracelist]')[0];
                    incomingtracelistGrid.getStore().proxy.setExtraParam('id', user.getValue());
                    //incomingtracelistGrid.getStore().proxy.setExtraParam('id1', traceRadio.tracetype_in);
                    incomingtracelistGrid.getStore().proxy.setExtraParam('id2', n.status_in);
                    //incomingtracelistGrid.getStore().proxy.setExtraParam('searchParam', null);
                    incomingtracelistGrid.getStore().load();
                }
            },
            'outgoingtracelist button[action=searchTrace]': {
                click: function () {
                    me.searchOutTraceListFilter();
                }
            },
            'outgoingtracelist textfield[itemid="searchString"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        me.searchOutTraceListFilter(null);
                    }
                }
            },
            'outgoingtracelist button[action="clearOutTraceFilter"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
                    me.clearsearchOutTraceListFilter();
                }
            },
            'incomingtracelist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'traceDoneAction' && zRec.data.FinishedDate == null)
                        me.traceDoneAction(zRec.data);
                    else {
                        var zRec = iView.getRecord(iRowEl);
                        var dashboardView = Ext.ComponentQuery.query('dashboarditem container[itemid=dashboard_view]')[0];
                        if (dashboardView.isHidden() == true)
                            return false;
                        me.TraceViewIn(zRec);
                    }
                }
            },
            'incomingtracelist button[action=searchTrace]': {
                click: function () {
                    me.searchInTraceListFilter();
                }
            },
            'incomingtracelist textfield[itemid="searchString"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        me.searchInTraceListFilter(null);
                    }
                }
            },
            'incomingtracelist button[action="clearInTraceFilter"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
                    me.clearsearchInTraceListFilter();
                }
            },
            'tracemanage radio[action="radioChange"]': {
                change: function (t, n, o, eo) {
                    var date = Ext.ComponentQuery.query('tracemanage datefield[itemid=trcdate]')[0];
                    var time = Ext.ComponentQuery.query('tracemanage timefield[itemid=trctime]')[0];
                    //var isInstant = Ext.ComponentQuery.query('tracemanage radio[name=IsInstant]')[0];

                    if (n == true) {
                        date.disable();
                        time.disable();

                        //isInstant.setValue(true);
                        date.setValue(null);
                        time.setValue(null);
                    } else {
                        date.enable();
                        time.enable();

                        var startDate = new Date();
                        startDate = Ext.util.Format.date(startDate, usr_dateformat);
                        date.setValue(startDate);
                        //isInstant.setValue(false);
                    }
                }
            },
            'tracemanage button[action=traceSave]': {
                click: function (t, e, eo) {
                    var form = Ext.ComponentQuery.query('tracemanage [itemid="tracemangeid"]')[0];
                    var date = form.getForm().findField('TraceDate').getValue();
                    var time = form.getForm().findField('TraceTime').getValue();
                    var currentdate = new Date();
                    var isTimeValid = true;
                    if (time != '') {
                        if (Ext.Date.format(date, 'Y-m-d') == Ext.Date.format(currentdate, 'Y-m-d')) {

                            if (time.getHours() <= currentdate.getHours()) {
                                if (time.getHours() == currentdate.getHours()) {
                                    if (time.getMinutes() < currentdate.getMinutes()) {
                                        isTimeValid = false;
                                    }
                                }
                                else {
                                    isTimeValid = false;
                                }
                            }
                        }
                    }
                    form.getForm().findField('TraceNotificationId').setValue(0);
                    form.getForm().findField('TraceType').setValue(2);
                    form.getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                    form.getForm().findField('CreatedBy').setValue(CurrentSessionUserId);


                    if (form.getForm().isValid()) {
                        var propertyId = form.getForm().findField('PropertyId').getValue();

                        if (isTimeValid) {
                            if (propertyId != '') {
                                var subDepartmentId = form.getForm().findField('SubDepartmentId').getValue();
                                var userId = form.getForm().findField('AssignedToUserId').getValue();
                                if (userId != '' || subDepartmentId != '') {

                                    form.getForm().submit({
                                        url: webAPI_path + "api/Trace/AddTraceNotification",
                                        method: 'POST',
                                        success: function (form, response) {

                                            var r = response.response.responseText;
                                            var r = Ext.decode(r);

                                            /*Commented as response text not came from API*/
                                            if (r.success == true) {
                                                me.getTracemanage().close();
                                                var tracelistGrid = Ext.ComponentQuery.query('[itemid=outgoingtracelistgrid]')[0];
                                                tracelistGrid.getStore().reload();
                                                var inTracelistGrid = Ext.ComponentQuery.query('[itemid=incomingtracelist]')[0];
                                                inTracelistGrid.getStore().reload();
                                            } else {

                                            }
                                        },
                                        failure: function (form, response) {

                                        }
                                    })
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), 'Selection of Department or User is mandatory.'.l('g'));
                                }
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), 'Property selection is mandatory.'.l('g'));
                            }
                        } else {
                            Ext.Msg.alert('Error'.l('g'), 'Previous time is not allowed.'.l('g'));
                        }
                    }
                    else {
                        Ext.Msg.alert('Error'.l('g'), 'Some fields are requred, check all fields.'.l('g'));
                    }
                }
            },
            'outgoingtracelist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var zRec = iView.getRecord(iRowEl);
                    var dashboardView = Ext.ComponentQuery.query('dashboarditem container[itemid=dashboard_view]')[0];
                    if (dashboardView.isHidden() == true)
                        return false;
                    me.TraceViewOut(zRec);
                }
            },
            'taskview button[action=viewCompany]': {
                click: function (t, e, eo) {
                    var c = me.getController('customer.CustomerManage');
                    if (me.CustomerManageController == false) {
                        c.init();
                        me.CustomerManageController = true;
                    }
                    var form = Ext.ComponentQuery.query('taskview [itemid=taskviewid]')[0];
                    obj = new Object();
                    obj.data = new Object();
                    obj.data.CompanyId = form.getForm().findField('CompanyId').getValue();
                    obj.data.IndividualId = form.getForm().findField('IndividualId').getValue();
                    obj.data.HasParent = form.getForm().findField('HasParent').getValue();
                    obj.data.HasChild = form.getForm().findField('HasChild').getValue();
                    c.Company(obj);
                }
            },
            'taskview button[action=viewContact]': {
                click: function (t, e, eo) {
                    var c = me.getController('customer.CustomerManage');
                    if (me.CustomerManageController == false) {
                        c.init();
                        me.CustomerManageController = true;
                        var form = Ext.ComponentQuery.query('taskview [itemid=taskviewid]')[0];
                        obj = new Object();
                        obj.data = new Object();
                        obj.data.CompanyId = form.getForm().findField('CompanyId').getValue();
                        obj.data.IndividualId = form.getForm().findField('IndividualId').getValue();
                        c.ContactEdit(obj);
                    }
                }
            },
            'alertlist button[action="searchAlert"]': {
                click: function () {
                    me.searchAlertFilter();
                }
            },
            'alertlist button[action="clearAlertFilter"]': {
                click: function () {
                    me.clearSearchAlertFilter();
                }
            },
            'alertlist textfield[itemid="searchStringAlert"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        me.searchAlertFilter();
                    }
                }
            },
            'alertlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    var dashboardView = Ext.ComponentQuery.query('dashboarditem container[itemid=dashboard_view]')[0];
                    if (dashboardView.isHidden() == true)
                        return false;

                    if (fieldName == 'editAlert') {
                        me.EditAlerts(me, zRec.data);
                    }

                    me.alertView(zRec);
                }
            },
            'button[action=refreshDashboard]': {
                click: function () {
                    me.refreshDashboard(null, me, null)
                }
            },
            'button[action=showAllTab]': {
                click: function () {
                    var p = Ext.ComponentQuery.query('dashboarditem container[itemid=dashboard_view]')[0];
                    p.show();
                    var chk = Ext.ComponentQuery.query('dashboarditem [name=dashboard_view]')[0];
                    chk.setChecked(true);

                    var dashObj = new Object();

                    dashObj.moduleName = 'DASH006';
                    var p = Ext.ComponentQuery.query('dashboarditem container[itemid=dashboard_intraces]')[0];
                    var chk = Ext.ComponentQuery.query('dashboarditem [name=dashboard_intraces]')[0];



                    if (!Utils.ValidateUserAccess(dashObj)) {
                        //Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.');
                        chk.setChecked(false);
                        p.hide();
                        //return false;
                    }
                    else {
                        p.show();
                        chk.setChecked(true);
                    }


                    dashObj.moduleName = 'DASH005';
                    var p = Ext.ComponentQuery.query('dashboarditem container[itemid=dashboard_outtraces]')[0];
                    var chk = Ext.ComponentQuery.query('dashboarditem [name=dashboard_outtraces]')[0];

                    if (!Utils.ValidateUserAccess(dashObj)) {
                        //Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.');
                        chk.setChecked(false);
                        p.hide();
                    }
                    else {
                        chk.setChecked(true);
                        p.show();
                    }


                    dashObj.moduleName = 'DASH003';
                    var p = Ext.ComponentQuery.query('dashboarditem container[itemid=dashboard_alerts]')[0];
                    var chk = Ext.ComponentQuery.query('dashboarditem [name=dashboard_alerts]')[0];


                    if (!Utils.ValidateUserAccess(dashObj)) {
                        //Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.');
                        chk.setChecked(false);
                        p.hide();
                    }
                    else {
                        chk.setChecked(true);
                        p.show();
                    }

                    dashObj.moduleName = 'DASH004';
                    var p = Ext.ComponentQuery.query('dashboarditem container[itemid=dashboard_tasks]')[0];
                    var chk = Ext.ComponentQuery.query('dashboarditem [name=dashboard_tasks]')[0];


                    if (!Utils.ValidateUserAccess(dashObj)) {
                        //Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.');
                        chk.setChecked(false);
                        p.hide();
                    }
                    else {
                        chk.setChecked(true);
                        p.show();
                    }

                    dashObj.moduleName = 'DASH002';
                    var p = Ext.ComponentQuery.query('dashboarditem container[itemid=dashboard_draftQuatation]')[0];
                    var chk = Ext.ComponentQuery.query('dashboarditem [name=dashboard_draftQuatation]')[0];

                    if (!Utils.ValidateUserAccess(dashObj)) {
                        //Ext.Msg.alert('Error'.l('g'), 'You dont have rights to access this module.');
                        chk.setChecked(false);
                        p.hide();
                    }
                    else {
                        chk.setChecked(true);
                        p.show();
                    }
                }
            }
            //            'selectfromuserlist': {
            //                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
            //                    var fieldName = iView.getGridColumns()[iColIdx].name;
            //                    var zRec = iView.getRecord(iRowEl);
            //                    if (fieldName == 'SelectedUser')
            //                        me.selectStaffUser(zRec.data, me);
            //                }
            //            }
        })
    },
    searchTaskListFilter: function () {
        var searchString = Ext.ComponentQuery.query('tasklist textfield[itemid=searchString]')[0];
        var statusId = Ext.ComponentQuery.query('tasklist radiogroup[action=is_open_all]')[0];
        var statusData = statusId.getValue()
        var user = Ext.ComponentQuery.query('dashboarditem hidden[itemid=userId]')[0];


        obj = new Object();
        obj.UserId = user.getValue();
        obj.TaskAllOrOpen = statusData.status;
        obj.searchParam = searchString.getValue();
        obj = Ext.encode(obj);

        var clearIcon = Ext.ComponentQuery.query('tasklist [action="clearTaskFilter"]')[0];
        clearIcon.show();

        var tasklistGrid = Ext.ComponentQuery.query('[itemid="tasklistgrid"]')[0];
        tasklistGrid.getStore().proxy.setExtraParam('param', obj);
        tasklistGrid.getStore().load();
    },
    clearsearchTaskListFilter: function () {
        var searchString = Ext.ComponentQuery.query('tasklist textfield[itemid=searchString]')[0];
        searchString.setValue(null);
        var statusId = Ext.ComponentQuery.query('tasklist radiogroup[action=is_open_all]')[0];
        var user = Ext.ComponentQuery.query('dashboarditem hidden[itemid=userId]')[0];

        statusId.setValue('status', 1);
        var statusData = statusId.getValue()
        obj = new Object();
        obj.UserId = user.getValue(); ;
        obj.TaskAllOrOpen = statusData.status;
        obj.searchParam = searchString.getValue();
        obj = Ext.encode(obj);

        var clearIcon = Ext.ComponentQuery.query('tasklist [action="clearTaskFilter"]')[0];
        clearIcon.hide();

        var tasklistGrid = Ext.ComponentQuery.query('[itemid="tasklistgrid"]')[0];
        tasklistGrid.getStore().proxy.setExtraParam('param', obj);
        tasklistGrid.getStore().load();
    },
    deleteTask: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                if (rec.TaskId > 0) {
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/task/DeleteTask',
                        type: "GET",
                        params: { id: rec.TaskId },
                        success: function (response) {
                            var r = response;
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                //display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Room deleted successfully.');
                                //Ext.getStore('dashboard.TaskStore').load();
                                var grid = Ext.ComponentQuery.query('[itemid="tasklistgrid"]')[0];
                                Utils.RefreshGridonDelete(grid, grid.getStore());
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function () { }
                    })
                }
            }
        })
    },
    taskDoneAction: function (rec) {
        Ext.data.JsonP.request({
            url: webAPI_path + 'api/task/MarkTaskAsDone',
            type: "GET",
            params: { id: rec.TaskId, id1: CurrentSessionUserId },
            success: function (response) {
                var r = response;
                var ResultText = r.result;
                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                    ResultText = ResultText.l("SP_DynamicCode");
                if (r.success == true) {
                    //Ext.Msg.alert('Success'.l('g'), 'Task Done Successfully');
                    Ext.getStore('dashboard.TaskStore').load();
                }
                else {
                    Ext.Msg.alert('Error'.l('g'), ResultText);
                }
            },
            failure: function () { }
        })
    },
    editTaskAction: function (rec) {
        Ext.create('widget.taskmanage', { TaskId: rec.TaskId, itemid: 'taskmanageDB' });
    },
    cloneTaskAction: function (rec) {
        Ext.create('widget.taskmanage', { TaskId: rec.TaskId, isClone: true, itemid: 'taskmanageDB' });
    },
    //    selectStaffUser: function (rec, me) {

    //        me.getSelectuserwindow().close();

    //        var staffDisplay = Ext.ComponentQuery.query('taskmanage displayfield[itemid=staffDisplay]')[0];
    //        var Initial = rec.Initial;
    //        if (Initial && Initial.length > 0)
    //            Initial = ' (' + rec.Initial + ')';
    //        else
    //            Initial = "";

    //        if (staffDisplay != undefined) {
    //            staffDisplay.setValue(rec.FirstName + ' ' + rec.LastName + Initial);
    //            var staff = Ext.ComponentQuery.query('taskmanage hidden[name=AssignedTo]')[0];
    //            staff.setValue(rec.UserId);
    //        }
    //        else {
    //            me.refreshDashboard(rec, me, Initial);
    //        }

    //    },
    //    selectTaskBooking: function (rec) {
    //        var bookingId = Ext.ComponentQuery.query('taskmanage hidden[itemid=bookingId]')[0];
    //        bookingId.setValue(rec.BookingId);

    //        var taskBooking = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskBooking]')[0];
    //        var bDate = Ext.util.Format.date(Ext.Date.parse(rec.BookingDate, 'c'), usr_dateformat);
    //        var bNumber = rec.BookingNumber;
    //        taskBooking.setValue(bDate + ' (' + bNumber + ')');

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
    traceDoneAction: function (rec) {
        Ext.data.JsonP.request({
            url: webAPI_path + 'api/Trace/MarkTraceAsDone',
            type: "GET",
            params: { id: CurrentSessionUserId, languageId: rec.TraceNotificationId },
            success: function (response) {
                var r = response;
                var ResultText = r.result;
                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                    ResultText = ResultText.l("SP_DynamicCode");
                if (r.success == true) {
                    var incomingTracesGrid = Ext.ComponentQuery.query('[itemid=incomingtracelist]')[0];
                    incomingTracesGrid.getStore().reload();
                }
                else {
                    Ext.Msg.alert('Error'.l('g'), ResultText);
                }
            },
            failure: function () { }
        })
    },
    searchOutTraceListFilter: function () {
        var searchString = Ext.ComponentQuery.query('outgoingtracelist textfield[itemid=searchString]')[0];
        var traceTypeId = Ext.ComponentQuery.query('outgoingtracelist radiogroup[action=is_status]')[0];
        var statusId = Ext.ComponentQuery.query('outgoingtracelist radiogroup[action=is_open_all]')[0];
        var statusData = statusId.getValue();
        var traceTypeData = traceTypeId.getValue();


        var clearIcon = Ext.ComponentQuery.query('[action="clearOutTraceFilter"]')[0];
        clearIcon.show();
        var user = Ext.ComponentQuery.query('dashboarditem hidden[itemid=userId]')[0];
        var tasklistGrid = Ext.ComponentQuery.query('[itemid=outgoingtracelistgrid]')[0];
        tasklistGrid.getStore().proxy.setExtraParam('id', user.getValue());
        tasklistGrid.getStore().proxy.setExtraParam('id1', traceTypeData.tracetype_out);
        tasklistGrid.getStore().proxy.setExtraParam('id2', statusData.status_out);
        tasklistGrid.getStore().proxy.setExtraParam('searchParam', searchString.getValue());
        tasklistGrid.getStore().load();
    },
    clearsearchOutTraceListFilter: function () {
        var searchString = Ext.ComponentQuery.query('outgoingtracelist textfield[itemid=searchString]')[0];
        searchString.setValue(null);
        var traceTypeId = Ext.ComponentQuery.query('outgoingtracelist radiogroup[action=is_status]')[0];
        var statusId = Ext.ComponentQuery.query('outgoingtracelist radiogroup[action=is_open_all]')[0];
        var user = Ext.ComponentQuery.query('dashboarditem hidden[itemid=userId]')[0];

        statusId.setValue('status_out', 1);
        traceTypeId.setValue('tracetype_out', 3);

        var statusData = statusId.getValue();
        var traceTypeData = traceTypeId.getValue();


        var clearIcon = Ext.ComponentQuery.query('[action="clearOutTraceFilter"]')[0];
        clearIcon.hide();

        var tasklistGrid = Ext.ComponentQuery.query('[itemid=outgoingtracelistgrid]')[0];
        tasklistGrid.getStore().proxy.setExtraParam('id', user.getValue());
        tasklistGrid.getStore().proxy.setExtraParam('id1', traceTypeData.tracetype_out);
        tasklistGrid.getStore().proxy.setExtraParam('id2', statusData.status_out);
        tasklistGrid.getStore().proxy.setExtraParam('searchParam', searchString.getValue());
        tasklistGrid.getStore().load();
    },
    searchInTraceListFilter: function () {
        var searchString = Ext.ComponentQuery.query('incomingtracelist textfield[itemid=searchString]')[0];
        var traceTypeId = Ext.ComponentQuery.query('incomingtracelist radiogroup[action=is_status]')[0];
        var statusId = Ext.ComponentQuery.query('incomingtracelist radiogroup[action=is_open_all]')[0];
        var statusData = statusId.getValue();
        var traceTypeData = traceTypeId.getValue();
        var user = Ext.ComponentQuery.query('dashboarditem hidden[itemid=userId]')[0];
        var clearIcon = Ext.ComponentQuery.query('[action="clearInTraceFilter"]')[0];
        clearIcon.show();

        var tasklistGrid = Ext.ComponentQuery.query('[itemid=incomingtracelist]')[0];
        tasklistGrid.getStore().proxy.setExtraParam('id', user.getValue());
        tasklistGrid.getStore().proxy.setExtraParam('id1', traceTypeData.tracetype_in);
        tasklistGrid.getStore().proxy.setExtraParam('id2', statusData.status_in);
        tasklistGrid.getStore().proxy.setExtraParam('searchParam', searchString.getValue());
        tasklistGrid.getStore().load();
    },
    clearsearchInTraceListFilter: function () {
        var searchString = Ext.ComponentQuery.query('incomingtracelist textfield[itemid=searchString]')[0];
        searchString.setValue(null);
        var traceTypeId = Ext.ComponentQuery.query('incomingtracelist radiogroup[action=is_status]')[0];
        var statusId = Ext.ComponentQuery.query('incomingtracelist radiogroup[action=is_open_all]')[0];
        var user = Ext.ComponentQuery.query('dashboarditem hidden[itemid=userId]')[0];

        statusId.setValue('status_in', 1);
        traceTypeId.setValue('tracetype_in', 3);

        var statusData = statusId.getValue();
        var traceTypeData = traceTypeId.getValue();

        var clearIcon = Ext.ComponentQuery.query('[action="clearInTraceFilter"]')[0];
        clearIcon.hide();

        var tasklistGrid = Ext.ComponentQuery.query('[itemid=incomingtracelist]')[0];
        tasklistGrid.getStore().proxy.setExtraParam('id', user.getValue());
        tasklistGrid.getStore().proxy.setExtraParam('id1', traceTypeData.tracetype_in);
        tasklistGrid.getStore().proxy.setExtraParam('id2', statusData.status_in);
        tasklistGrid.getStore().proxy.setExtraParam('searchParam', searchString.getValue());
        tasklistGrid.getStore().load();
    },
    EditDrafts: function (meObj, rec) {
        Ext.getStore('dashboard.BookingListForDashboardStore').load({
            params: { id: rec.ReservationId, languageId: user_language },
            callback: function (records, o, success) {
                //                var stepObject = { Number: 2, BookingId: 0, BookingTrackingId: 1366, Status: null };
                //                Utils.loadWizardStepsFromOutSide(meObj, stepObject, "step2");
                //                return
                if (records == null || records.length == 0 || records[0].data.BookingTrackingId == null || records[0].data.BookingTrackingId == 0) {
                    var stepObject = { Number: 1, BookingId: 0, BookingTrackingId: 0, Status: null, ReservationId: rec.ReservationId };
                    Utils.loadWizardStepsFromOutSide(meObj, stepObject, "step1");
                } else {
                    var stepObject = { Number: records[0].data.StepNumber, BookingId: records[0].data.BookingId, BookingTrackingId: records[0].data.BookingTrackingId, Status: null, ReservationId: rec.ReservationId };
                    Utils.loadWizardStepsFromOutSide(meObj, stepObject, "step" + (records[0].data.StepNumber >= 5 ? records[0].data.StepNumber : records[0].data.StepNumber + 1));
                }
            }
        });
    },
    EditAlerts: function (me, rec) {

        var obj = [];

        obj.BookingTrackingId = (rec.BookingTrackingId > 0) ? rec.BookingTrackingId : 0;
        obj.BookingId = (rec.BookingId > 0) ? rec.BookingId : 0;
        obj.ReservationId = (rec.ReservationId > 0) ? rec.ReservationId : 0;

        log("Alert 1", obj);
        //Utils.loadWizardStepsFromOutSide(me, obj, "step" + rec.StepNumber); //if booking is confirm then open step5 not step6, as in step6 all other booking also comes in picture
        //  Utils.loadWizardStepsFromOutSide(me, obj, "step" + (rec.StepNumber == 6 ? 5 : rec.StepNumber)); //step number is set in the alert configuration, not the latest step
        Utils.loadWizardStepsFromOutSide(me, obj, "step" + rec.StepNumber); //resolved issue for step6 to step5 with maintain bookingid

        //Utils.loadWizardStepsFromOutSide
        //ActiveStepFromRightPanel

    },
    DraftsView: function (rec) {
        this.showHideView('draft');
        var changesStore = Ext.getStore('operations.OperationsInhouseBookingChanges');
        changesStore.proxy.setExtraParam('id', rec.data.ReservationId);
        changesStore.proxy.setExtraParam('id1', 0);
        changesStore.proxy.setExtraParam('LanguageId', user_language);
        changesStore.load();

        var form = Ext.ComponentQuery.query('draftquatationview [itemid=draftview]')[0];
        if (rec.data.ReservationId > 0) {
            form.getForm().load({
                method: 'GET',
                url: webAPI_path + 'api/DraftQuatation/GetContactInformation',
                params: {
                    reservationId: rec.data.ReservationId
                }
            });
        }
    },
    TaskView: function (rec) {
        this.showHideView('task');
        var form = Ext.ComponentQuery.query('taskview [itemid=taskviewid]')[0];
        if (rec.data.TaskId > 0) {
            form.getForm().load({
                method: 'GET',
                url: webAPI_path + 'api/Task/GetTaskById',
                params: {
                    id: rec.data.TaskId,
                    languageId: user_language
                },
                success: function (form, action) {
                    var form = Ext.ComponentQuery.query('taskview [itemid=taskviewid]')[0];
                    var resp = Ext.decode(action.response.responseText);

                    var duedate = Ext.ComponentQuery.query('taskview displayfield[itemid=duedate]')[0];
                    var date = Ext.Date.parse(duedate.getValue(), 'c');

                    //                    //                    var sTime = Ext.Date.parse(resp.data.STime, 'H:i');
                    //                    //                    var eTime = Ext.Date.parse(resp.data.ETIme, 'H:i');
                    //                    var time = Ext.util.Format.date(resp.data.STime, 'H:i')
                    //                    alert(time);

                    duedate.setValue(Ext.util.Format.date(date, usr_dateformat) + ' ' + resp.data.TaskTime);

                    var companyId = resp.data.CompanyId;
                    var btnCompany = Ext.ComponentQuery.query('taskview button[itemid=btnViewCompany]')[0];
                    if (companyId == null) {
                        btnCompany.disable();
                    } else {
                        btnCompany.enable();
                    }

                    var individualId = resp.data.IndividualId;
                    var btnIndividual = Ext.ComponentQuery.query('taskview button[itemid=btnViewContact]')[0];
                    if (individualId == null) {
                        btnIndividual.disable();
                    } else {
                        btnIndividual.enable();
                    }
                }
            });
        }
    },
    TraceViewOut: function (rec) {
        this.showHideView('traceout');
        var form = Ext.ComponentQuery.query('traceview [itemid=traceviewid]')[0];

        var statusRadio = Ext.ComponentQuery.query('outgoingtracelist radiogroup[itemid=is_open_all]')[0].getValue();
        var typeRadio = Ext.ComponentQuery.query('outgoingtracelist radiogroup[itemid=is_status]')[0].getValue();
        var user = Ext.ComponentQuery.query('dashboarditem hidden[itemid=userId]')[0];


        if (rec.data.TraceNotificationId > 0) {
            form.getForm().load({
                method: 'GET',
                url: webAPI_path + 'api/Trace/GetOutGoingTracesForUserbyId',
                params: {
                    id: user.getValue(),
                    id1: typeRadio.tracetype_out,
                    id2: statusRadio.status_out,
                    searchParam: rec.data.TraceNotificationId
                },
                success: function (form, action) {
                    var form = Ext.ComponentQuery.query('traceview [itemid=traceviewid]')[0];
                    var resp = Ext.decode(action.response.responseText);

                    var duedate = Ext.ComponentQuery.query('traceview displayfield[itemid=tracedate]')[0];
                    var date = Ext.Date.parse(duedate.getValue(), 'c');
                    duedate.setValue(Ext.util.Format.date(date, usr_dateformat + ' ' + 'H:i'));

                    var finishdate = Ext.ComponentQuery.query('traceview displayfield[itemid=FinishedDate]')[0];
                    var date = Ext.Date.parse(finishdate.getValue(), 'c');
                    finishdate.setValue(Ext.util.Format.date(date, usr_dateformat + ' ' + 'H:i'));
                }
            });
        }
    },
    TraceViewIn: function (rec) {
        this.showHideView('tracein');
        var form = Ext.ComponentQuery.query('traceview [itemid=traceviewid]')[0];

        var statusRadio = Ext.ComponentQuery.query('incomingtracelist radiogroup[itemid=is_open_all]')[0].getValue();
        var typeRadio = Ext.ComponentQuery.query('incomingtracelist radiogroup[itemid=is_status]')[0].getValue();
        var user = Ext.ComponentQuery.query('dashboarditem hidden[itemid=userId]')[0];


        if (rec.data.TraceNotificationId > 0) {
            form.getForm().load({
                method: 'GET',
                url: webAPI_path + 'api/Trace/GetIncomingTracesForUserbyId',
                params: {
                    id: user.getValue(),
                    id1: typeRadio.tracetype_in,
                    id2: statusRadio.status_in,
                    searchParam: rec.data.TraceNotificationId
                },
                success: function (form, action) {
                    var form = Ext.ComponentQuery.query('traceview [itemid=traceviewid]')[0];
                    var resp = Ext.decode(action.response.responseText);

                    var duedate = Ext.ComponentQuery.query('traceview displayfield[itemid=tracedate]')[0];
                    var date = Ext.Date.parse(duedate.getValue(), 'c');
                    duedate.setValue(Ext.util.Format.date(date, usr_dateformat + ' ' + 'H:i'));

                    var finishdate = Ext.ComponentQuery.query('traceview displayfield[itemid=FinishedDate]')[0];
                    var date = Ext.Date.parse(finishdate.getValue(), 'c');
                    finishdate.setValue(Ext.util.Format.date(date, usr_dateformat + ' ' + 'H:i'));
                }
            });
        }
    },
    searchAlertFilter: function () {
        //var r = Ext.getCmp('searchStringRoomSetup').getValue();
        var r = Ext.ComponentQuery.query('[itemid="searchStringAlert"]')[0].getValue();
        Ext.getStore('dashboard.AlertStore').clearFilter();

        ////       var filters = [
        ////                new Ext.util.Filter({
        ////                    property: "AlertMessage", value: r
        ////                }, {
        ////                    property: "BookingNumber", value: r
        ////                })
        ////            ];
        //Ext.getStore('dashboard.AlertStore').filter('AlertMessage', r, true, true);
        Ext.getStore('dashboard.AlertStore').filter([
            Ext.create('Ext.util.Filter', { property: "BookingNumber", value: r, root: 'data' }),
            Ext.create('Ext.util.Filter', { property: "AlertMessage", value: r, root: 'data' })
        ]);
        //var regex = new RegExp(".*" + r + ".*", "i");        

        if (r.length > 0) {
            var clearIcon = Ext.ComponentQuery.query('[action="clearAlertFilter"]')[0];
            clearIcon.show();
        }
    },
    clearSearchAlertFilter: function () {
        var r = Ext.ComponentQuery.query('[itemid="searchStringAlert"]')[0].setValue('');
        Ext.getStore('dashboard.AlertStore').clearFilter();
        var clearIcon = Ext.ComponentQuery.query('[action="clearAlertFilter"]')[0];
        clearIcon.hide();
    },
    alertView: function (rec) {
        this.showHideView('alert');
        var form = Ext.ComponentQuery.query('alertview [itemid=alertviewid]')[0];
        form.getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/Alert/GetBookingOverviewDetail',
            params: {
                id: rec.data.BookingId, //45
                id1: rec.data.BookingTrackingId,
                languageId: user_language
            },
            success: function (f, action) {
                var resp = Ext.decode(action.response.responseText);
                var d = resp.data;

                for (var key in d) { /*Where d is object*/
                    if (!d[key] || form.getForm().findField(key) == null) continue;
                    if (d[key].length == 0 || d[key] == "")
                        form.getForm().findField(key).hide();
                    else
                        form.getForm().findField(key).show();

                    /*Due date is not definded throwing error so uncommented below code by PV*/
                    //                    var date = Ext.Date.parse(duedate.getValue(), 'c');
                    //                    duedate.setValue(Ext.util.Format.date(date, usr_dateformat + ' ' + 'H:i'));

                }
            }
        })
    },
    showHideView: function (type) {

        var taskview = Ext.ComponentQuery.query('dashboardview [itemid=dashboardtaskview]')[0];
        var traceview = Ext.ComponentQuery.query('dashboardview [itemid=dashboardtraceview]')[0];
        var alertview = Ext.ComponentQuery.query('dashboardview [itemid=dashboardalertview]')[0];
        var draftview = Ext.ComponentQuery.query('dashboardview [itemid=dashboarddraftview]')[0];

        if (type == 'draft') {
            taskview.hide();
            traceview.hide();
            alertview.hide();
            draftview.show();
        }
        else if (type == 'alert') {
            taskview.hide();
            traceview.hide();
            alertview.show();
            draftview.hide();
        }
        else if (type == 'task') {
            taskview.show();
            traceview.hide();
            alertview.hide();
            draftview.hide();
        }
        else if (type == 'traceout' || type == 'tracein') {
            taskview.hide();
            traceview.show();
            alertview.hide();
            draftview.hide();
        }
        else {
            taskview.hide();
            traceview.hide();
            alertview.hide();
            draftview.hide();
        }
    },
    refreshDashboard: function (rec, me, Initial) {
        var user = Ext.ComponentQuery.query('dashboarditem hidden[itemid=userId]')[0];
        if (rec != null) {
            var dashboardUser = Ext.ComponentQuery.query('dashboarditem displayfield[itemid=dashboardUser]')[0];
            dashboardUser.setValue(rec.FirstName + ' ' + rec.LastName + Initial);
            user.setValue(rec.UserId);
        }

        var tasklistGrid = Ext.ComponentQuery.query('[itemid="tasklistgrid"]')[0];
        //var TaskOpenOrAll = Ext.ComponentQuery.query('tasklist radiogroup[itemid=is_open_all]')[0].getValue().status;
        //var TaskSearch = Ext.ComponentQuery.query('tasklist textfield[itemid=searchString]')[0].getValue();
        //obj = new Object();
        //obj.UserId = user.getValue();
        //obj.TaskAllOrOpen = TaskOpenOrAll
        //obj.searchParam = TaskSearch;
        //obj = Ext.encode(obj);
        //tasklistGrid.getStore().proxy.setExtraParam('param', obj);
        tasklistGrid.getStore().proxy.setExtraParam('UserId', user.getValue());
        tasklistGrid.getStore().load();

        /*Drafts & Quatations*/
        var draftQuatatiobGrid = Ext.ComponentQuery.query('[itemid=draftquatationlist]')[0];
        draftQuatatiobGrid.getStore().proxy.setExtraParam('userId', user.getValue());
        draftQuatatiobGrid.getStore().proxy.setExtraParam('languageId', user_language);
        draftQuatatiobGrid.getStore().load();

        /*Incoming Traces*/
        var incomingTracesGrid = Ext.ComponentQuery.query('[itemid=incomingtracelist]')[0];
        //var IncomingTracesOpenOrAll = Ext.ComponentQuery.query('incomingtracelist radiogroup[itemid=is_open_all]')[0].getValue().status_in;
        //var IncomingTracesSearch = Ext.ComponentQuery.query('incomingtracelist textfield[itemid="searchString"]')[0].getValue();
        incomingTracesGrid.getStore().proxy.setExtraParam('id', user.getValue());
        //incomingTracesGrid.getStore().proxy.setExtraParam('id1', 3);
        //incomingTracesGrid.getStore().proxy.setExtraParam('id2', IncomingTracesOpenOrAll);
        //incomingTracesGrid.getStore().proxy.setExtraParam('searchParam', IncomingTracesSearch);
        incomingTracesGrid.getStore().load();

        /*Outgoing Traces*/
        var outgoingtracelistGrid = Ext.ComponentQuery.query('[itemid=outgoingtracelistgrid]')[0];
        //var outgoingtraceOpenOrAll = Ext.ComponentQuery.query('outgoingtracelist radiogroup[itemid=is_open_all]')[0].getValue().status_out;
        //var outgoingtraceSearch = Ext.ComponentQuery.query('outgoingtracelist textfield[itemid="searchString"]')[0].getValue();
        outgoingtracelistGrid.getStore().proxy.setExtraParam('id', user.getValue());
        //outgoingtracelistGrid.getStore().proxy.setExtraParam('id1', 3);
        //outgoingtracelistGrid.getStore().proxy.setExtraParam('id2', outgoingtraceOpenOrAll);
        //outgoingtracelistGrid.getStore().proxy.setExtraParam('searchParam', outgoingtraceSearch);
        outgoingtracelistGrid.getStore().load();

        var alertlistGrid = Ext.ComponentQuery.query('[itemid=alertlist]')[0];
        alertlistGrid.getStore().proxy.setExtraParam('id', user.getValue());
        alertlistGrid.getStore().load();

    }
});