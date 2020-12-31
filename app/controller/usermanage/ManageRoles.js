Ext.define('Regardz.controller.usermanage.ManageRoles', {
    extend: 'Ext.app.Controller',
    views: ['usermanage.RolesList', 'usermanage.RolesEdit'],
    stores: ['usermanage.RolesListStore', 'usermanage.ActivitiesOnRoleStore'],

    init: function () {
        var me = this;
        this.control(
			{
			    'roleslist': {
			        cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
			            var fieldName = iView.getGridColumns()[iColIdx].name;
			            var zRec = iView.getRecord(iRowEl);
			            
			            me.RoleId = zRec.data.RoleId;

			            if (fieldName == 'editRole')
			                this.editRoleWindow(zRec, null);
			            else if (fieldName == 'cloneRole')
			                this.editRoleWindow(zRec, 'true');
			            else if (fieldName == 'deleteRole')
			                this.deleteRole(zRec);
			            else if (fieldName == 'changestatusRole')
			                this.updateStatusRole(zRec);
			        }
			    },

			    'roleslist button[action="assign_role"]': {
			        click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
			            this.editRoleWindow(null, null);
			        }
			    },

			    'rolesedit': {
			        afterrender: function (t, eOpt) {

			            //this.editRoleWindow(null);
			        }
			    },

			    'rolesedit button[action="role_save"]': {
			        click: function (t, e, eo) {//t => this, e => event, eo => Eoptional

			            if (Ext.getCmp('roleManageForm').getForm().isValid()) {

			                var clone = Ext.getCmp('roleManageForm').getForm().findField('clone').getValue();
			                var RoleId = Ext.getCmp('roleManageForm').getForm().findField('RoleId').getValue();

			                if (RoleId == 0) {
			                    Ext.getCmp('roleManageForm').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
			                    Ext.getCmp('roleManageForm').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
			                }

			                var checkedCheckbox = Ext.getCmp('activitesOnRole').getForm().getValues();

			                var ActivitiyIds = '';
			                Ext.each(checkedCheckbox, function (r) {
			                    if (ActivitiyIds == '') {
			                        ActivitiyIds = r.ActivitiyIds2;
			                    }
			                    else {
			                        ActivitiyIds += ',' + r.ActivitiyIds2;
			                    }
			                });

			                Ext.getCmp('roleManageForm').getForm().findField('ActivitiyIds').setValue(ActivitiyIds);

			                var addroleform = Ext.getCmp('roleManageForm').getForm().getValues();


			                if (clone == 'true') {
			                    var assignRoleURL = webAPI_path + "api/roleright/AddRole";
			                }
			                else if (RoleId > 0) {
			                    var assignRoleURL = webAPI_path + "api/roleright/UpdateRole";
			                    addroleform.UpdatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
			                    addroleform.UpdatedBy = CurrentSessionUserId;
			                }
			                else {
			                    var assignRoleURL = webAPI_path + "api/roleright/AddRole";
			                }

			                Ext.getCmp('roleManageForm').getForm().submit({
			                    url: assignRoleURL,
			                    type: 'POST',
			                    params: addroleform,
			                    success: function (form, response) {
			                        r = response.result;

			                        var ResultText = r.result;
			                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
			                            ResultText = ResultText.l("SP_DynamicCode");

			                        if (r.success == true) {
			                            ////Get Active Window and close It first
			                            var win = Ext.WindowManager.getActive();
			                            if (win) {
			                                win.close();
			                            }
			                            ///display_alert('MG00000'); // Ext.Msg.alert('success', 'Information saved successfully.');
			                            Ext.getStore('usermanage.RolesListStore').reload();
			                        }
			                        else {
			                            Ext.Msg.alert('Error', l('g'), ResultText);
			                        }
			                    },
			                    failure: function (form, response) {
			                        r = response.result;
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
			    }
			}
		)
    },

    editRoleWindow: function (rec, clone) {
        if (rec == null) {

            Ext.create('widget.rolesedit').show();
            this.renderActivitiesForRole('0');
        }
        else {
            Ext.create('widget.rolesedit', { roleId: rec.data.RoleId, 'clone': clone }).show();
            this.loadDataToForm(rec, clone);
            this.renderActivitiesForRole(rec.data.RoleId);
        }
    },

    cloneRoleWindow: function (rec) {

        Ext.MessageBox.confirm('Clone Role'.l('SC24000'), 'Are you sure you want to clone this role?'.l('SC24000'), function (btn) {
            if (btn == 'yes')
                Ext.create('widget.rolesedit', { roleId: rec.data.RoleId, 'clone': true }).show();
        }
		)
    },

    renderActivitiesForRole: function (roleId) {

        Ext.getStore('usermanage.ActivitiesOnRoleStore').load({
            params: {
                'id': roleId
            },
            callback: function (records, o, success) {

                var items = [];
                Ext.each(records, function (r) {
                    if (r.data.Checked == 1)
                        checked = true;
                    else
                        checked = false;

                    items.push({ name: 'ActivitiyIds2', inputValue: r.data.ActivityId,
                        checked: checked,
                        boxLabel: r.data.DisplayName
                    })
                });

                var checkboxes = new Ext.form.CheckboxGroup({
                    //padding : 5,
                    border: false,
                    fieldLabel: 'Role Activities'.l('SC34100'),
                    allowBlank: false,
                    columns: 3,
                    items: items
                });

                if (Ext.getCmp('activitesOnRole')) {
                    Ext.getCmp('activitesOnRole').removeAll(true);
                    Ext.getCmp('activitesOnRole').add(checkboxes);
                    Ext.getCmp('activitesOnRole').doLayout();
                }
            }
        })
    },

    loadDataToForm: function (rec, clone) {

        Ext.getCmp('roleManageForm').getForm().load(
             {
                 method: 'GET',
                 url: webAPI_path + 'api/RoleRight/GetRoleById',
                 params: {
                     id: rec.data.RoleId
                 },
                 success: function (form, action) {

                     if (clone == 'true') {
                         var RoleName = Ext.getCmp('roleManageForm').getForm().findField('RoleName').getValue();
                         var DisplayName = Ext.getCmp('roleManageForm').getForm().findField('DisplayName').getValue();

                         Ext.getCmp('roleManageForm').getForm().findField('RoleName').setValue('Clone of ' + RoleName);
                         Ext.getCmp('roleManageForm').getForm().findField('DisplayName').setValue('Clone of ' + DisplayName);
                         Ext.getCmp('roleManageForm').getForm().findField('clone').setValue('true');
                     }
                 }

             }
            )
    },

    deleteRole: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/RoleRight/DeleteRole',
                    type: "GET",
                    params: { id: rec.data.RoleId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            //display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully'.l('g'));
                            //Ext.getStore('usermanage.RolesListStore').loadPage(1);
                            var grid = Ext.ComponentQuery.query('[itemid="adminroleslistgrid"]')[0];
                            Utils.RefreshGridonDelete(grid, grid.getStore());
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
        });
    },

    updateStatusRole: function (rec) {
        display_alert("MG00010", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/RoleRight/DeactivateActivateRole',
                    type: "GET",
                    params: { id: rec.data.RoleId },
                    success: function (r) {
                        // var r = jsonDecode(response);
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            //display_alert('MG00030'); // Ext.Msg.alert('Success'.l('g'), 'Status updated successfully.');
                            Ext.getStore('usermanage.RolesListStore').reload();
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }

                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                    }
                })
            }
        })
    }
});
