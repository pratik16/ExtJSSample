Ext.define('Regardz.controller.mastervalues.TaskType', {
    extend: 'Ext.app.Controller',
    views: ['mastervalues.TaskTypeList', 'mastervalues.TaskTypeManage', 'mastervalues.TaskTypeLang'],
    stores: ['mastervalues.TaskTypeStore', 'common.LanguageListStore'],

    refs: [{
        ref: 'TaskTypeManage',
        selector: 'TaskTypeManage'
    }, {
        ref: 'TaskTypeLang',
        selector: 'TaskTypeLang'
    }],

    init: function () {

        this.control(
        {
            'tasktypelist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'TaskTypeEdit')
                        this.TaskTypeEdit(zRec);
                    else if (fieldName == 'TaskTypeDelete')
                        this.TaskTypeDelete(zRec);
                }
            },
            'tasktypemanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var me = this;
                   // var taskTypeId = Ext.getCmp('addTaskType').getForm().findField('TaskTypeId').getValue();
                    Ext.create('widget.tasktypelang');
//                    Ext.getCmp('taskTypeLang').getForm().load({
//                        method: 'GET',
//                        url: webAPI_path + 'api/MasterValue/GetTaskTypeForMultiLingUpdate',
//                        params: {
//                            id: taskTypeId,
//                            languageId: user_language
//                        }
//                    });
                }
            },
            'button[action="addTaskType"]': {
                click: function () {
                    Ext.create('widget.tasktypemanage', { taskTypeId: 0 });
                }
            },
            'button[action="saveTaskType"]': {
                click: function () {
                    if (Ext.getCmp('addTaskType').getForm().isValid()) {
                        var taskTypeId = Ext.getCmp('addTaskType').getForm().findField('TaskTypeId').getValue();

                        var urlTaskType = "";
                        if (taskTypeId == 0) {
                            urlTaskType = webAPI_path + 'api/MasterValue/AddTaskType';
                            Ext.getCmp('addTaskType').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addTaskType').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            urlTaskType = webAPI_path + 'api/MasterValue/UpdateTaskType';
                            Ext.getCmp('addTaskType').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addTaskType').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('addTaskType').getForm().submit({
                            url: urlTaskType,
                            type: 'POST',
                            params: Ext.getCmp('addTaskType').getForm().getValues(),
                            success: function (form, response) {
                                var r = response.result;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                ////Get Active Window and close It first
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    //close the add window popup
                                    win.close();
                                }
                                if (r.success == true) {
                                    Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                    Ext.getStore('mastervalues.TaskTypeStore').reload();
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function (form, response) {
                                var r = response.result;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == false) {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                }
                            }
                        })
                    }
                }
            },
            'tasktypelang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {
                    var taskTypeId = Ext.getCmp('addTaskType').getForm().findField('TaskTypeId').getValue();
                    Ext.getCmp('taskTypeLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/MasterValue/GetTaskTypeForMultiLingUpdate',
                        params: {
                            id: taskTypeId,
                            languageId: records[0].data.LanguageId
                        }
                    });
                }
            },
            'tasktypelang button[action="saveTaskTypeLang"]': {
                click: function () {
                    if (Ext.getCmp('taskTypeLang').getForm().isValid()) {
                        //var TaskTypeId = Ext.getCmp('addTaskType').getForm().findField('TaskTypeId').getValue();
                        Ext.getCmp('taskTypeLang').getForm().submit({
                            url: webAPI_path + 'api/MasterValue/UpdateTaskTypeMultiLangDetail',
                            type: 'POST',
                            params: Ext.getCmp('taskTypeLang').getForm().getValues(),
                            success: function (form, response) {
                                var r = response.result;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                ////Get Active Window and close It first
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close();
                                }
                                if (r.success == true) {
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                            Ext.getStore('mastervalues.TaskTypeStore').reload();
                                        }
                                    });
                                }
                                else {
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            Ext.Msg.alert('Error'.l('g'), ResultText);
                                        }
                                    });
                                }
                            },
                            failure: function (form, response) {
                                var r = response.result;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == false) {
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            Ext.Msg.alert('Error'.l('g'), ResultText);
                                        }
                                    });
                                }
                                else {
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                        }
                                    });
                                }
                            }
                        })
                    }
                }
            }
        })

    },
    TaskTypeEdit: function (rec) {
        var editTaskType = Ext.create('widget.tasktypemanage', { taskTypeId: rec.data.TaskTypeId });
        editTaskType.setTitle('Update TaskType_Title'.l('SC21410'));

        Ext.getCmp('addTaskType').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/MasterValue/GetTaskTypeForUpdate',
            params: {
                id: rec.data.TaskTypeId,
                languageId: user_language
            }
        });
    },
    TaskTypeDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/MasterValue/RemoveTaskType',
                    type: "GET",
                    params: { id: rec.data.TaskTypeId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            Ext.getStore('mastervalues.TaskTypeStore').loadPage(1);
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Record not deleted.'.l('g'));
                    }
                })
            }
        })
    }
});