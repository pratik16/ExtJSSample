Ext.define('Regardz.controller.configuration.DepartmentManage', {
    extend: 'Ext.app.Controller',
    views: ['configuration.DepartmentManageList', 'configuration.DepartmentEdit', 'configuration.SubDepartmentManage'], //,'configuration.DepartmentEdit'],'configuration.DepartmentManage'
    stores: ['configuration.DepartmentManageStore'],
    SubDepartmentManageController: false,

    init: function () {

        this.control({
            'departmentmanagelist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'DepartmentEdit')
                        this.DepartmentEdit(zRec);
                    if (fieldName == 'DepartmentDelete')
                        this.DepartmentDelete(zRec);
                    if (fieldName == 'DepartmentStatus')
                        this.DepartmentStatus(zRec);

                }
            },
            //addDepartment
            'button[action="addDepartment"]': {
                click: function () {
                    var departmentEdit = Ext.create('widget.departmentEdit', { DepartmentId: 0 });
                }
            },
            'button[action="saveDepartment"]': {
                click: function () {
                    if (Ext.getCmp('departmentEdit').getForm().isValid()) {
                        var departmentId = Ext.getCmp('departmentEdit').getForm().findField('DepartmentId').getValue();
                        var urlDepartment = webAPI_path + 'api/Department/ManageDepartment';
                        var v = Ext.getCmp('departmentEdit').getForm().getValues();
                        if (departmentId == 0) {
                            Ext.getCmp('departmentEdit').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('departmentEdit').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            Ext.getCmp('departmentEdit').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('departmentEdit').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('departmentEdit').getForm().submit({
                            url: urlDepartment,
                            actionMethods: 'POST',
                            params: Ext.getCmp('departmentEdit').getForm().getValues(),
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
                                    display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully');
                                    Ext.getStore('configuration.DepartmentManageStore').reload();
                                }
                                else {
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

                }

            }
        });

    },
    DepartmentEdit: function (rec) {


        var me = this;
        var d = me.getController('configuration.SubDepartmentManage');
        if (me.SubDepartmentManageController == false) {
            d.init();
            me.SubDepartmentManageController = true;
        }

        var c = me.getController('configuration.DepartmentEdit');
        if (me.DepartmentEditController == false) {
            c.init();
            me.DepartmentEditController = true;
        }
        c.index(rec.data.DepartmentId);
        if (rec.data.DepartmentId) {
            this.loadStore(rec, user_language);

        }

    },
    DepartmentDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {

                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/Department/DeleteDepartment',
                    type: "GET",
                    params: { id: rec.data.DepartmentId },
                    success: function (response) {

                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {

                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted successfully');
                            Ext.getStore('configuration.DepartmentManageStore').loadPage(1);
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
    DepartmentStatus: function (rec) {
        display_alert("MG00010", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/Department/ActivateDeactivateDepartment',
                    type: "GET",
                    params: { id: rec.data.DepartmentId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        //var r = jsonDecode(response);
                        if (r.success == true) {
                            display_alert('MG00030'); // Ext.Msg.alert('Success'.l('g'), 'Status updated successfully.');
                            Ext.getStore('configuration.DepartmentManageStore').reload();
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Status not changed.'.l('g'));
                    }
                })
            }
        });
    },
    loadStore: function (rec, user_language) {
        Ext.getCmp('departmentEdit').getForm().load(
			 {
			     method: 'GET',
			     url: webAPI_path + 'api/Department/GetDepartmentbyId',
			     params: {
			         id: rec.data.DepartmentId,
			         languageId: user_language
			     }
			 }
		);
    }
});

 

