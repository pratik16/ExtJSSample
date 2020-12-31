Ext.define('Regardz.controller.configuration.SubDepartmentManage', {
    extend: 'Ext.app.Controller',
    views: ['configuration.SubDepartmentManageList', 'configuration.SubDepartmentManage', 'configuration.DepartmentEdit'],
    stores: ['configuration.SubDepartmentManageStore'],

    //SubDepartmentManageController: false,
    init: function () {

        this.control({
            'subdepartmentmanagelist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'SubDepartmentEdit')
                        this.SubDepartmentEdit(zRec);
                    if (fieldName == 'SubDepartmentDelete')
                        this.SubDepartmentDelete(zRec);

                }
            },
            //addSubDepartment
            'button[action="addSubDepartment"]': {
                click: function () {
                    //var rec = Ext.getStore('configuration.SubDepartmentManageStore').getAt(0);
                    var detptId = Ext.getCmp('departmentEdit').getForm().findField('DepartmentId').getValue();
                    var subDepartmentManage = Ext.create('widget.subdepartmentmanage', { SubDepartmentId: 0, DepartmentId: detptId }); //rec.data.DepartmentId });
                }
            },
            'button[action="saveSubDepartment"]': {
                click: function () {
                    //alert('s');

                    if (Ext.getCmp('addSubDepartment').getForm().isValid()) {
                        var subDepartmentId = Ext.getCmp('addSubDepartment').getForm().findField('SubDepartmentId').getValue();
                        var urlSubDepartment = webAPI_path + 'api/SubDepartment/ManageSubDepartment';
                        //alert(subDepartmentId);
                        var v = Ext.getCmp('addSubDepartment').getForm().getValues();
                        if (subDepartmentId == 0) {
                            Ext.getCmp('addSubDepartment').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addSubDepartment').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            Ext.getCmp('addSubDepartment').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addSubDepartment').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('addSubDepartment').getForm().submit({
                            url: urlSubDepartment,
                            actionMethods: 'POST',
                            params: Ext.getCmp('addSubDepartment').getForm().getValues(),
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
                                    Ext.getStore('configuration.SubDepartmentManageStore').reload();
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
    index: function (departmentId) {
        //alert(departmentId);
    },
    SubDepartmentEdit: function (rec) {
        var subdepartmentmanage = Ext.create('widget.subdepartmentmanage', { SubDepartmentId: rec.data.SubDepartmentId });
        subdepartmentmanage.setTitle('Update SubDepartment_Title'.l('SC23110'));

        Ext.getCmp('addSubDepartment').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/SubDepartment/GetSubDepartmentbyId', //api/FixedPrice/ManageFixedPrice
            params: {
                id: rec.data.SubDepartmentId//, languageId: rec.data.LanguageId
            }
        });

    },
    SubDepartmentDelete: function (rec) {
        //alert(rec.data.SubDepartmentId);

        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {

                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/SubDepartment/RemoveSubDepartment',
                    type: "GET",
                    params: { id: rec.data.SubDepartmentId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted successfully');
                            Ext.getStore('configuration.SubDepartmentManageStore').loadPage(1);
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

    }

});