Ext.define('Regardz.controller.configuration.DesignationManage', {
    extend: 'Ext.app.Controller',
    views: ['configuration.DesignationManageList'],
    stores: ['configuration.DesignationManageStore', 'configuration.DepartmentStore', 'configuration.SubDepartmentStore',
                'configuration.SubDepartmentAllStore', 'configuration.RoleStore'],

    init: function () {

        this.control(
        {
            'designationmanagelist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'deleteDesignation')
                        this.deleteDesignation(zRec);
                    else if (fieldName == 'manageDesignation')
                        this.manageDesignation(zRec);

                },
                afterrender: function () {
                    //Ext.getCmp('designationmanagelist').getStore().reload();
                    Ext.getStore('configuration.DesignationManageStore').proxy.setExtraParam('searchString', '');
                    Ext.getStore('configuration.DepartmentStore').load({
                        callback: function (records, o, success) {
                            ///
                        }
                    });

                    Ext.getStore('configuration.SubDepartmentAllStore').load();
                },

                edit: function (editor, e) {
                    Ext.Ajax.request({
                        url: webAPI_path + 'api/Designation/ManageDesignation',
                        type: 'POST',
                        //params: obj.newValues, //obj.originalValues
                        params: e.newValues, //obj.originalValues
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            //var r = jsonDecode(response);  
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                Ext.getStore('configuration.DesignationManageStore').reload();
                                //Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                            }
                            else {
                                Ext.getStore('configuration.DesignationManageStore').reload();
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                            // deptCombo.clearValue();
                            //roleCombo.clearValue();
                        },
                        failure: function () {
                            Ext.getStore('configuration.DesignationManageStore').reload();
                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                            // deptCombo.clearValue();
                            //roleCombo.clearValue();
                        }
                    });
                },

                beforeedit: function (editor, e, eOpts) {
                    //Load SubDept-combo if not loaded
                    var storeSubDept = Ext.getCmp('subdeptComboid').getStore();
                    if (storeSubDept == null || storeSubDept == undefined || storeSubDept.data.items.length == 0) {
                        Ext.getStore('configuration.SubDepartmentAllStore').load();
                    }                    
                    //Load Role combo if not loaded
                    var storeRole = Ext.getCmp('roleComboid').getStore().load();
                    //                    if (storeRole == null || storeRole == undefined || storeRole.data.items.length == 0) {
                    //                        Ext.getStore('configuration.RoleStore').load();
                    //                    }
                    //                    //Set SubDeptId
                    //                    var index = storeSubDept.findExact('SubDepartmentId', e.record.data.SubDepartmentId);
                    //                    if (index >= 0) {
                    //                        Ext.getCmp('subdeptComboid').setValue(143);
                    //                    }
                    //                    //Set RoleId
                    //                    index = storeRole.findExact('RoleId', e.record.data.RoleId);
                    //                    if (index >= 0) {
                    //                        Ext.getCmp('roleComboid').setValue(69);
                    //                    }
                    //configuration.RoleStore
                    //Ext.getStore('configuration.SubDepartmentAllStore').load();
                },

                canceledit: function () {
                    Ext.getStore('configuration.DesignationManageStore').reload();
                }
            },
            'designationmanagelist button[action="addDMEvents"]': {
                click: function () {
                    var designationID = Ext.getCmp('DesignationID').value;
                    Ext.create('widget.designationaddevent', { designationId: designationId });
                }
            },
            'designationeventlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'DMEventsDelete')
                        this.DMEventsDelete(zRec);
                },
                afterrender: function () {
                    var designationId = Ext.getCmp('DesignationID').value;

                    Ext.getStore('configuration.DesignationManageStore').proxy.setExtraParam('searchString', '');
                    Ext.getStore('configuration.DesignationManageStore').proxy.setExtraParam('id', designationId);
                    Ext.getStore('configuration.DesignationManageStore').load();
                }

            },

            'designationmanagelist button[action="adddesignationaction"]': {
                click: function () {

                    var r = Ext.create('Regardz.model.configuration.DesignationManage', {
                        DesignationId: 0,
                        DepartmentId: '',
                        SubDepartmentId: '',
                        DesignationName: '',
                        RoleId: '',
                        IsActive: true
                    });

                    editor = Ext.getCmp('designationmanagelist').editingPlugin;
                    editor.cancelEdit();
                    Ext.getCmp('designationmanagelist').getStore().insert(0, r);
                    editor.startEdit(0, 0);
                }
            },

            'designationaddevent button[action="saveDesignationAddEvent"]': {
                click: function () {
                    if (Ext.getCmp('designationAddEvent').getForm().isValid()) {
                        if (endValue > startValue && endValue != startValue) {
                            Ext.getCmp('designationAddEvent').getForm().submit({
                                url: webAPI_path + 'api/Designation/ManageDesignation',
                                type: 'POST',
                                data: Ext.getCmp('designationAddEvent').getForm().getValues(),
                                success: function (response) {
                                    var res = Ext.decode(response.responseText);
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        win.close();
                                    }
                                    var r = jsonDecode(response);
                                    var ResultText = r.result;
                                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                        ResultText = ResultText.l("SP_DynamicCode");
                                    if (r.success == true) {
                                        Ext.getStore('configuration.DesignationManageStore').reload();
                                        //                                        Ext.data.JsonP.request({
                                        //                                            url: webAPI_path + 'api/Designation/BlankRequest',
                                        //                                            success: function () {
                                        //                                                display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                        //                                            }
                                        //                                        });
                                    }
                                    else {
                                        Ext.data.JsonP.request({
                                            url: webAPI_path + 'api/Designation/BlankRequest',
                                            success: function () {
                                                Ext.Msg.alert('Error'.l('g'), ResultText);
                                            }
                                        });
                                    }
                                },
                                failure: function (form, response) {
                                    var r = jsonDecode(response);
                                    var ResultText = r.result;
                                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                        ResultText = ResultText.l("SP_DynamicCode");
                                    if (r.success == false) {
                                        Ext.getStore('configuration.DesignationManageStore').reload();

                                        Ext.data.JsonP.request({
                                            url: webAPI_path + 'api/Designation/BlankRequest',
                                            success: function () {
                                                Ext.Msg.alert('Error'.l('g'), ResultText);
                                            }
                                        });
                                    }
                                    else {
                                        Ext.data.JsonP.request({
                                            url: webAPI_path + 'api/Designation/BlankRequest',
                                            success: function () {
                                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                            }
                                        });
                                    }
                                }
                            });
                        }
                        else {
                            Ext.data.JsonP.request({
                                url: webAPI_path + 'api/Designation/BlankRequest',
                                success: function () {
                                    //validation
                                }
                            });
                        }
                    }
                }
            }
        })
    },
    deleteDesignation: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/Designation/RemoveDesignation',
                    type: "GET",
                    params: { id: rec.data.DesignationId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            //display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            //Ext.getStore('configuration.DesignationManageStore').reload();
                            //Ext.getStore('configuration.DesignationManageStore').loadPage(1);
                            var grid = Ext.ComponentQuery.query('[itemid="designationmanagelist"]')[0];
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
    manageDesignation: function (rec) {
        Ext.create('widget.designationmanagelist', { designationId: rec.data.designationId });
    }
});
