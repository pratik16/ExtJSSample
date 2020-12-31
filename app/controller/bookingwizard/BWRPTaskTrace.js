Ext.define('Regardz.controller.bookingwizard.BWRPTaskTrace', {
    extend: 'Ext.app.Controller',
    views: ['bookingwizard.RightSide.Tasks', 'dashboard.TaskManage', 'company.SalesUserWindow', 'company.SalesUserList', 'dashboard.TaskCompanyContactListWindow',
        'dashboard.TaskCompanySearchContactList', 'dashboard.TaskCompanyContactList',
        'bookingwizard.RightSide.Traces', 'dashboard.TraceManage'],
    stores: ['bookingwizard.RightSide.WizardTaskListStore', 'dashboard.TaskTypeStore', 'common.BusinessTypeStore', 'company.SalesUserStore',
        'dashboard.TaskBookingStore', 'bookingwizard.CompanySearchListStore', 'bookingwizard.CompanyContactListStore', 'bookingwizard.RightSide.WizardTraceListStore',
        'common.PropertyForNamesStore', 'dashboard.TracesSubDepartmentStore', 'dashboard.TracesUserStore'],
    thisController: false,
    refs: [{
        ref: 'salesuserwindow',
        selector: 'salesuserwindow'
    }, {
        ref: 'taskmanage',
        selector: 'taskmanage'
    }, {
        ref: 'tracemanage',
        selector: 'tracemanage'
    }],
    init: function () {
        var me = this;
        this.control({
            'tasks grid[itemid="tasklist"]': {
                expand: function (p, opt) {
                    var tasklistGrid = Ext.ComponentQuery.query('tasks grid[itemid=tasklist]')[0];
                    obj = new Object();
                    //obj.BookingId = Utils.StepOneObj.BookingId;
                    //obj.BookingTrackingId = Utils.StepOneObj.BookingTrackingId;
                    obj.TaskAllOrOpen = 2;
                    obj.searchParam = null;

                    var bookingId = Utils.StepOneObj.BookingId;
                    var bookingTrackingId = Utils.StepOneObj.BookingTrackingId;

                    if (!Utils.isValid(bookingId) || bookingId == 0)
                        bookingId = Utils.RightPanObj.BookingId;

                    if (!Utils.isValid(bookingTrackingId) || bookingTrackingId == 0)
                        bookingTrackingId = Utils.RightPanObj.BookingTrackingId;

                    obj.BookingId = bookingId;
                    obj.BookingTrackingId = bookingTrackingId;

                    obj = Ext.encode(obj);
                    tasklistGrid.getStore().proxy.setExtraParam('param', obj);
                    tasklistGrid.getStore().load();
                },
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'editTaskAction')
                        me.editTaskAction(zRec.data);
                    else {
                        me.TaskView(zRec);
                    }
                }
            },
            'tasks radiogroup[itemid=is_open_all]': {
                change: function (t, n, o, eo) {
                    var tasklistGrid = Ext.ComponentQuery.query('tasks grid[itemid=tasklist]')[0];
                    obj = new Object();
                    //obj.BookingId = Utils.StepOneObj.BookingId;
                    //obj.BookingTrackingId = Utils.StepOneObj.BookingTrackingId;
                    obj.TaskAllOrOpen = n.status;
                    obj.searchParam = null;

                    var bookingId = Utils.StepOneObj.BookingId;
                    var bookingTrackingId = Utils.StepOneObj.BookingTrackingId;

                    if (!Utils.isValid(bookingId) || bookingId == 0)
                        bookingId = Utils.RightPanObj.BookingId;

                    if (!Utils.isValid(bookingTrackingId) || bookingTrackingId == 0)
                        bookingTrackingId = Utils.RightPanObj.BookingTrackingId;

                    obj.BookingId = bookingId;
                    obj.BookingTrackingId = bookingTrackingId;

                    obj = Ext.encode(obj);
                    tasklistGrid.getStore().proxy.setExtraParam('param', obj);
                    tasklistGrid.getStore().load();
                }
            },
            'tasks button[action=searchTasks]': {
                click: function () {
                    me.searchTaskListFilter();
                }
            },
            'tasks textfield[itemid=searchString]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        me.searchTaskListFilter(null);
                    }
                }
            },
            'tasks button[action="clearTaskFilter"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
                    me.clearsearchTaskListFilter();
                }
            },
            'tasks button[action=tasklistaction]': {
                click: function () {                    
                    Ext.create('widget.taskmanage', { itemid: 'taskmanageBW' });
                }
            },
            //            'taskmanage': {
            //                afterrender: function (t, e, eo) {
            //                debugger
            //                    /*Get type combobox*/
            //                    if (t.itemid != 'taskmanageBW')
            //                        return;
            //                    else {
            //                        Ext.getStore('common.PropertyForNamesStore').load({});

            //                        var propertyList = Ext.ComponentQuery.query('taskmanage combo[itemid=propertycombo]')[0];
            //                        propertyList.getStore().proxy.setExtraParam('activityCode', 'DASH004');
            //                        propertyList.getStore().load({
            //                            callback: function (records, o, success) {
            //                                propertyList.getStore().insert(0, { "PropertyName": 'None' }, true);
            //                                propertyList.getStore().insert(1, { "PropertyName": '-External-', "PropertyId": -1 }, true);
            //                            }
            //                        });

            //                        var taskTypeCombo = Ext.ComponentQuery.query('taskmanage [itemid=taskType]')[0];
            //                        taskTypeCombo.getStore().load();

            //                        var businessTypeCombo = Ext.ComponentQuery.query('taskmanage [itemid=businesstype]')[0];
            //                        businessTypeCombo.getStore().load();

            //                        var form = Ext.ComponentQuery.query('taskmanage [itemid=taskmangeid]')[0];
            //                        var StartTimeOrigin = form.getForm().findField('StartTime').getValue();
            //                        var EndTimeOrigin = form.getForm().findField('EndTime').getValue();

            //                        var btnBooking = Ext.ComponentQuery.query('taskmanage button[itemid=btnSearchBooking]')[0];
            //                        btnBooking.disable();

            //                        var TaskId = form.getForm().findField('TaskId').getValue();

            //                        if (TaskId > 0) {
            //                            form.getForm().load({
            //                                method: 'GET',
            //                                url: webAPI_path + 'api/WizardRightPanel/GetTaskByIdForWizard',
            //                                params: {
            //                                    id: TaskId,
            //                                    languageId: user_language
            //                                },
            //                                success: function (form, action) {
            //                                    var form = Ext.ComponentQuery.query('taskmanage [itemid=taskmangeid]')[0];
            //                                    var resp = Ext.decode(action.response.responseText);
            //                                    var date = Ext.util.Format.date(resp.data.DueDate, usr_dateformat);
            //                                    form.getForm().findField('DueDate').setValue(date);
            //                                    form.getForm().findField('BusinessTypeId').setValue(resp.data.BusinessTypeId);

            //                                    var EndTime = resp.data.ETime;
            //                                    var StartTime = resp.data.STime;

            //                                    var NewStartTime = "";
            //                                    if (StartTime != "") {
            //                                        var StartTimeOrigin = form.getForm().findField('StartTime').getValue();
            //                                        StartTimeOrigin = new Date(StartTimeOrigin);
            //                                        StartTime = StartTime.split(":");
            //                                        EndTimeOrigin = StartTimeOrigin.setHours(StartTime[0], StartTime[1]);
            //                                        StartTime = new Date(StartTimeOrigin);
            //                                        form.getForm().findField('StartTime').setValue(StartTime);
            //                                    }

            //                                    var NewEndTime = "";
            //                                    if (EndTime != "") {
            //                                        var EndTimeOrigin = form.getForm().findField('EndTime').getValue();
            //                                        EndTimeOrigin = new Date(EndTimeOrigin);
            //                                        EndTime = EndTime.split(":");
            //                                        EndTimeOrigin = EndTimeOrigin.setHours(EndTime[0], EndTime[1]);
            //                                        EndTime = new Date(EndTimeOrigin);
            //                                        form.getForm().findField('EndTime').setValue(EndTime);
            //                                    }

            //                                    var bookingId = resp.data.BookingId;
            //                                    var bookingTrackingId = resp.data.BookingTrackingId;
            //                                    if (bookingId > 0 || bookingTrackingId > 0) {
            //                                        var btnCompany = Ext.ComponentQuery.query('taskmanage button[itemid=btnSearchCompany]')[0];
            //                                        btnCompany.disable();
            //                                    }
            //                                }
            //                            });
            //                        }
            //                        else {
            //                            form.getForm().load({
            //                                method: 'GET',
            //                                url: webAPI_path + 'api/WizardRightPanel/GetBookingDateNumberforTask',
            //                                params: {
            //                                    id: Utils.StepOneObj.BookingId,
            //                                    languageId: Utils.StepOneObj.BookingTrackingId
            //                                }, success: function (form, action) { }
            //                            });
            //                        }
            //                    }
            //                }
            //            },
            'taskmanage datefield[itemid=Date]': {
                change: function () {
                    var duedate = Ext.ComponentQuery.query('taskmanage datefield[itemid=Date]')[0];
                }
            },
            //            'taskmanage button[action=searchUser]': {
            //                click: function (t, e, eo) {
            //                    Ext.getStore('company.SalesUserStore').proxy.setExtraParam('searchString', '');
            //                    Ext.getStore('company.SalesUserStore').load();
            //                    Ext.create('widget.salesuserwindow', { userId: 0 }).center();
            //                }
            //            },
            //            'salesuserlist': {
            //                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

            //                    if (iView.getGridColumns()[iColIdx] == undefined)
            //                        return true;

            //                    var fieldName = iView.getGridColumns()[iColIdx].name;

            //                    var zRec = iView.getRecord(iRowEl);

            //                    if (fieldName == 'SelectSalesUser')
            //                        me.selectStaffUser(zRec.data);
            //                }
            //            },

            'taskmanage button[action=searchCompany]': {
                click: function (t, e, eo) {
                    //                    console.log('2');
                    //                    return;
                    if (Ext.getCmp('btnSelectBookingCompanyContactWin'))
                        Ext.getCmp('btnSelectBookingCompanyContactWin').destroy();

                    Ext.create('widget.taskcompanycontactlistwindow', { itemid: 'companySearchContactWindowBW' });
                }
            },
            'taskcompanycontactlistwindow': {
                afterrender: function (t, e, eo) {
                    console.log(t.itemid);
                    if (t.itemid != 'companySearchContactWindowBW')
                        return;

                    var companyId = Ext.ComponentQuery.query('taskmanage hidden[itemid=companyId]')[0].getValue();
                    var taskCompany = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskCompany]')[0].getValue();

                    var individualId = Ext.ComponentQuery.query('taskmanage hidden[itemid=individualId]')[0].getValue();
                    var taskContact = Ext.ComponentQuery.query('taskmanage displayfield[itemid=taskContact]')[0].getValue();

                    var fieldFilterTaskObj = Ext.ComponentQuery.query('taskcompanysearchcontactlist textfield[itemid="fieldFilterCompanies"]')[0];
                    fieldFilterTaskObj.setValue(taskCompany);

                    Utils.MangageCompanyContact(1, Number(companyId), taskCompany, Number(individualId), '');
                }
            },
            'taskcompanycontactlistwindow button[action=selectCompanyContact]': {
                click: function (t, e, eo) {

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
                    var win = Ext.WindowManager.getActive();
                    if (win) { win.close(); }
                }
            },
            'traces grid[itemid="outgoingtracelist"]': {
                expand: function (p, opt) {
                    var outgoingtracelistGrid = Ext.ComponentQuery.query('traces grid[itemid=outgoingtracelist]')[0];
                    obj = new Object();

                    obj.TraceType = 3;
                    obj.TraceStatus = 2;

                    var bookingId = Utils.StepOneObj.BookingId;
                    var bookingTrackingId = Utils.StepOneObj.BookingTrackingId;

                    if (!Utils.isValid(bookingId) || bookingId == 0)
                        bookingId = Utils.RightPanObj.BookingId;

                    if (!Utils.isValid(bookingTrackingId) || bookingTrackingId == 0)
                        bookingTrackingId = Utils.RightPanObj.BookingTrackingId;

                    obj.BookingId = bookingId;
                    obj.BookingTrackingId = bookingTrackingId;

                    obj = Ext.encode(obj);
                    outgoingtracelistGrid.getStore().proxy.setExtraParam('param', obj);
                    outgoingtracelistGrid.getStore().load();
                },
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'traceDoneAction' && zRec.data.FinishedDate == null)
                        me.traceDoneAction(zRec.data);
                    else {
                        var zRec = iView.getRecord(iRowEl);
                        //                        var dashboardView = Ext.ComponentQuery.query('dashboarditem container[itemid=dashboard_view]')[0];
                        //                        if (dashboardView.isHidden() == true)
                        //                            return false;
                        me.TraceViewOut(zRec);
                    }
                }
            },
            'traces radiogroup[itemid=is_open_all]': {
                change: function (t, n, o, eo) {
                    var outgoingtracelistGrid = Ext.ComponentQuery.query('traces grid[itemid=outgoingtracelist]')[0];
                    obj = new Object();
                    obj.TraceType = 3;
                    obj.TraceStatus = n.status_out;

                    var bookingId = Utils.StepOneObj.BookingId;
                    var bookingTrackingId = Utils.StepOneObj.BookingTrackingId;

                    if (!Utils.isValid(bookingId) || bookingId == 0)
                        bookingId = Utils.RightPanObj.BookingId;

                    if (!Utils.isValid(bookingTrackingId) || bookingTrackingId == 0)
                        bookingTrackingId = Utils.RightPanObj.BookingTrackingId;

                    obj.BookingId = bookingId;
                    obj.BookingTrackingId = bookingTrackingId;

                    obj = Ext.encode(obj);
                    outgoingtracelistGrid.getStore().proxy.setExtraParam('param', obj);
                    outgoingtracelistGrid.getStore().load();
                }
            },
            'traces button[action=traceadd]': {
                click: function () {
                    Ext.create('widget.tracemanage', { BookingId: Utils.RightPanObj.BookingId, BookingTrackingId: Utils.RightPanObj.BookingTrackingId });
                }
            },
            'tracemanage': {
                beforerender: function (t, e, eo) {
                    Ext.getStore('common.PropertyForNamesStore').proxy.setExtraParam('activityCode', 'DASH005');
                },
                afterrender: function (t, e, eo) {
                    var subDeptGrid = Ext.ComponentQuery.query('tracemanage grid[itemid=TraceDepartment]')[0];
                    Ext.getStore('common.PropertyForNamesStore').clearFilter();
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
            'traces button[action=searchTrace]': {
                click: function () {
                    me.searchOutTraceListFilter();
                }
            },
            'traces textfield[itemid="searchString"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        me.searchOutTraceListFilter(null);
                    }
                }
            },
            'traces button[action="clearOutTraceFilter"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
                    me.clearsearchOutTraceListFilter();
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

                    var bookingId = Utils.StepOneObj.BookingId;
                    var bookingTrackingId = Utils.StepOneObj.BookingTrackingId;

                    if (!Utils.isValid(bookingId) || bookingId == 0)
                        bookingId = Utils.RightPanObj.BookingId;

                    if (!Utils.isValid(bookingTrackingId) || bookingTrackingId == 0)
                        bookingTrackingId = Utils.RightPanObj.BookingTrackingId;

                    form.getForm().findField('BookingTrackingId').setValue(bookingTrackingId);
                    form.getForm().findField('BookingId').setValue(bookingId);

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
                                                var outgoingtracelistGrid = Ext.ComponentQuery.query('traces grid[itemid=outgoingtracelist]')[0];
                                                //outgoingtracelistGrid.getStore().reload();
                                                obj = new Object();
                                                obj.TraceType = 3;
                                                obj.TraceStatus = 2;

                                                var bookingId = Utils.StepOneObj.BookingId;
                                                var bookingTrackingId = Utils.StepOneObj.BookingTrackingId;

                                                if (!Utils.isValid(bookingId) || bookingId == 0)
                                                    bookingId = Utils.RightPanObj.BookingId;

                                                if (!Utils.isValid(bookingTrackingId) || bookingTrackingId == 0)
                                                    bookingTrackingId = Utils.RightPanObj.BookingTrackingId;

                                                obj.BookingId = bookingId;
                                                obj.BookingTrackingId = bookingTrackingId;

                                                obj = Ext.encode(obj);
                                                outgoingtracelistGrid.getStore().proxy.setExtraParam('param', obj);
                                                outgoingtracelistGrid.getStore().load();

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
            }
        });
    },
    searchTaskListFilter: function () {
        var searchString = Ext.ComponentQuery.query('tasks textfield[itemid=searchString]')[0];
        var statusId = Ext.ComponentQuery.query('tasks radiogroup[action=is_open_all]')[0];
        var statusData = statusId.getValue()

        obj = new Object();
        //obj.BookingId = Utils.StepOneObj.BookingId;
        obj.TaskAllOrOpen = statusData.status;
        obj.searchParam = searchString.getValue();

        var bookingId = Utils.StepOneObj.BookingId;
        var bookingTrackingId = Utils.StepOneObj.BookingTrackingId;

        if (!Utils.isValid(bookingId) || bookingId == 0)
            bookingId = Utils.RightPanObj.BookingId;

        if (!Utils.isValid(bookingTrackingId) || bookingTrackingId == 0)
            bookingTrackingId = Utils.RightPanObj.BookingTrackingId;

        obj.BookingId = bookingId;
        obj.BookingTrackingId = bookingTrackingId;

        obj = Ext.encode(obj);

        var clearIcon = Ext.ComponentQuery.query('[action="clearTaskFilter"]')[0];
        clearIcon.show();

        var tasklistGrid = Ext.ComponentQuery.query('tasks grid[itemid=tasklist]')[0];
        tasklistGrid.getStore().proxy.setExtraParam('param', obj);
        tasklistGrid.getStore().load();
    },
    clearsearchTaskListFilter: function () {
        var searchString = Ext.ComponentQuery.query('tasks textfield[itemid=searchString]')[0];
        searchString.setValue(null);
        var statusId = Ext.ComponentQuery.query('tasks radiogroup[action=is_open_all]')[0];

        statusId.setValue('status', 1);
        var statusData = statusId.getValue()
        obj = new Object();
        //obj.BookingId = Utils.StepOneObj.BookingId;
        obj.TaskAllOrOpen = statusData.status;
        obj.searchParam = searchString.getValue();

        var bookingId = Utils.StepOneObj.BookingId;
        var bookingTrackingId = Utils.StepOneObj.BookingTrackingId;

        if (!Utils.isValid(bookingId) || bookingId == 0)
            bookingId = Utils.RightPanObj.BookingId;

        if (!Utils.isValid(bookingTrackingId) || bookingTrackingId == 0)
            bookingTrackingId = Utils.RightPanObj.BookingTrackingId;

        obj.BookingId = bookingId;
        obj.BookingTrackingId = bookingTrackingId;

        obj = Ext.encode(obj);

        var clearIcon = Ext.ComponentQuery.query('[action="clearTaskFilter"]')[0];
        clearIcon.hide();

        var tasklistGrid = Ext.ComponentQuery.query('tasks grid[itemid=tasklist]')[0];
        tasklistGrid.getStore().proxy.setExtraParam('param', obj);
        tasklistGrid.getStore().load();
    },
    editTaskAction: function (rec) {
        Ext.create('widget.taskmanage', { TaskId: rec.TaskId, itemid: 'taskmanageBW' });
    },
    TaskView: function (rec) {
        //this.showHideView('task');
        var form = Ext.ComponentQuery.query('tasks [itemid=taskviewid]')[0];
        if (rec.data.TaskId > 0) {
            form.getForm().load({
                method: 'GET',
                url: webAPI_path + 'api/Task/GetTaskById',
                params: {
                    id: rec.data.TaskId,
                    languageId: user_language
                },
                success: function (form, action) {
                    var form = Ext.ComponentQuery.query('tasks [itemid=taskviewid]')[0];
                    var resp = Ext.decode(action.response.responseText);

                    var duedate = Ext.ComponentQuery.query('tasks displayfield[itemid=duedate]')[0];
                    var date = Ext.Date.parse(duedate.getValue(), 'c');

                    duedate.setValue(Ext.util.Format.date(date, usr_dateformat) + ' ' + resp.data.TaskTime);
                }
            });
        }
    },
    //    selectStaffUser: function (rec) {
    //        var staffDisplay = Ext.ComponentQuery.query('taskmanage displayfield[itemid=staffDisplay]')[0];
    //        var Initial = rec.Initial;
    //        if (Initial && Initial.length > 0)
    //            Initial = ' (' + rec.Initial + ')';
    //        else
    //            Initial = "";

    //        if (staffDisplay)
    //            staffDisplay.setValue(rec.FirstName + ' ' + rec.LastName + Initial);

    //        var staff = Ext.ComponentQuery.query('taskmanage hidden[name=AssignedTo]')[0];
    //        if (staff != null)
    //            staff.setValue(rec.UserId);

    //        this.getSalesuserwindow().close();
    //    },
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
    searchOutTraceListFilter: function () {
        var searchString = Ext.ComponentQuery.query('traces textfield[itemid=searchString]')[0];
        var statusId = Ext.ComponentQuery.query('traces radiogroup[action=is_open_all]')[0];
        var statusData = statusId.getValue();

        var clearIcon = Ext.ComponentQuery.query('[action="clearOutTraceFilter"]')[0];
        clearIcon.show();

        var outgoingtracelistGrid = Ext.ComponentQuery.query('traces grid[itemid=outgoingtracelist]')[0];
        obj = new Object();
        obj.TraceType = 3;
        obj.TraceStatus = statusData.status_out;

        var bookingId = Utils.StepOneObj.BookingId;
        var bookingTrackingId = Utils.StepOneObj.BookingTrackingId;

        if (!Utils.isValid(bookingId) || bookingId == 0)
            bookingId = Utils.RightPanObj.BookingId;

        if (!Utils.isValid(bookingTrackingId) || bookingTrackingId == 0)
            bookingTrackingId = Utils.RightPanObj.BookingTrackingId;

        obj.BookingId = bookingId;
        obj.BookingTrackingId = bookingTrackingId;

        obj = Ext.encode(obj);
        outgoingtracelistGrid.getStore().proxy.setExtraParam('param', obj);
        outgoingtracelistGrid.getStore().load();
    },
    clearsearchOutTraceListFilter: function () {
        var searchString = Ext.ComponentQuery.query('traces textfield[itemid=searchString]')[0];
        searchString.setValue(null);

        var statusId = Ext.ComponentQuery.query('traces radiogroup[action=is_open_all]')[0];
        statusId.setValue('status_out', 1);

        var statusData = statusId.getValue();

        var clearIcon = Ext.ComponentQuery.query('[action="clearOutTraceFilter"]')[0];
        clearIcon.hide();

        var outgoingtracelistGrid = Ext.ComponentQuery.query('traces grid[itemid=outgoingtracelist]')[0];
        obj = new Object();
        obj.TraceType = 3;
        obj.TraceStatus = statusData.status_out;

        var bookingId = Utils.StepOneObj.BookingId;
        var bookingTrackingId = Utils.StepOneObj.BookingTrackingId;

        if (!Utils.isValid(bookingId) || bookingId == 0)
            bookingId = Utils.RightPanObj.BookingId;

        if (!Utils.isValid(bookingTrackingId) || bookingTrackingId == 0)
            bookingTrackingId = Utils.RightPanObj.BookingTrackingId;

        obj.BookingId = bookingId;
        obj.BookingTrackingId = bookingTrackingId;

        obj = Ext.encode(obj);
        outgoingtracelistGrid.getStore().proxy.setExtraParam('param', obj);
        outgoingtracelistGrid.getStore().load();
    },
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
                    var outgoingtracelistGrid = Ext.ComponentQuery.query('traces grid[itemid=outgoingtracelist]')[0];
                    outgoingtracelistGrid.getStore().reload();
                    //   Ext.getStore('dashboard.IncomingTracesStore ').reload();
                }
                else {
                    Ext.Msg.alert('Error'.l('g'), ResultText);
                }
            },
            failure: function () { }
        })
    },
    TraceViewOut: function (rec) {
        var form = Ext.ComponentQuery.query('traces [itemid=traceviewid]')[0];

        var statusRadio = Ext.ComponentQuery.query('traces radiogroup[itemid=is_open_all]')[0].getValue();

        if (rec.data.TraceNotificationId > 0) {
            form.getForm().load({
                method: 'GET',
                url: webAPI_path + 'api/WizardRightPanel/GetTraceListForWizardbyId',
                params: {
                    id: rec.data.BookingId,
                    id1: 3,
                    id2: statusRadio.status_out,
                    searchParam: rec.data.TraceNotificationId,
                    id3: Utils.StepOneObj.BookingTrackingId
                },
                success: function (form, action) {
                    var form = Ext.ComponentQuery.query('traces [itemid=traceviewid]')[0];
                    var resp = Ext.decode(action.response.responseText);

                    var duedate = Ext.ComponentQuery.query('traces displayfield[itemid=tracedate]')[0];
                    var date = Ext.Date.parse(duedate.getValue(), 'c');
                    duedate.setValue(Ext.util.Format.date(date, usr_dateformat + ' ' + 'H:i'));

                    var finishdate = Ext.ComponentQuery.query('traces displayfield[itemid=FinishedDate]')[0];
                    var date = Ext.Date.parse(finishdate.getValue(), 'c');
                    finishdate.setValue(Ext.util.Format.date(date, usr_dateformat + ' ' + 'H:i'));
                }
            });
        }
    }
});