Ext.define('Regardz.controller.usermanage.ManageActivity', {
    extend: 'Ext.app.Controller',
    views: ['usermanage.ActivitiesList', 'usermanage.ActivitiesListViewWin', 'usermanage.AssignRoles', 'usermanage.AssignActivity'],
    stores: ['usermanage.ActivitiesListStore', 'usermanage.ActivitiesListViewStore', 'usermanage.PropertyListComboStore', 'usermanage.UserPropertyActivityListStore', 'usermanage.UserPropertyRoleListStore', 'property.RoomListCheckboxStore',
                'common.PropertyForNamesStore'],

    init: function (rec) {
        var me = this;

        me.data = rec.data;

        this.control(
			{
			    'activitieslist': {
			        cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

			            var fieldName = iView.getGridColumns()[iColIdx].name;
			            var zRec = iView.getRecord(iRowEl);

			            if (fieldName == 'ActivityView') {
			                this.loadActivityViewStore(zRec);
			                this.ViewActivitiesList(zRec);

			            }
			            else if (fieldName == 'DeleteActivities') {
			                if (zRec.data.DesignationId > 0) {
			                }
			                else {
			                    this.deleteActivities(zRec);
			                }
			            }
			        }
			    },

			    'activitieslist button[action="assign_role"]': {
			        click: function (t, e, eo) {//t => this, e => event, eo => Eoptional

			            this.loadPropertyComboForUser(me.data);


			            Ext.widget('assignroles', { data: me.data }).show();

			            if (Ext.getCmp('treepanelcheckbox'))
			                Ext.getCmp('treepanelcheckbox').getRootNode().removeAll();

			        }
			    },

			    'assignroles button[action="assign_role_save"]': {
			        click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
			            if (Ext.getCmp('assignroleform').getForm().isValid()) {
			                var assignroleform = Ext.getCmp('assignroleform').getForm().getValues();

			                var checkedCheckbox = Ext.getCmp('treepanelcheckbox').getChecked();

			                var assignRoleCheckBoxIds = [];

			                Ext.each(checkedCheckbox, function (record) {
			                    assignRoleCheckBoxIds.push(record.raw.RoleId);
			                });

			                //assignroleform.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
			                //assignroleform.createdBy = CurrentSessionUserId;

			                //assignroleform.activityIds = assignRoleCheckBoxIds.toString();
			                delete assignroleform.activityIds;
			                Ext.getCmp('assignroleform').getForm().findField('activityIds').setValue(assignRoleCheckBoxIds.toString());

			                var assignRoleURL = webAPI_path + "api/roleright/AssignActivitiesToUser";

			                Ext.getCmp('assignroleform').getForm().submit({
			                    url: assignRoleURL,
			                    method: 'POST',
			                    // data: assignroleform,
			                    success: function (form, response) {

			                        var r = response.response.responseText;
			                        var r = Ext.decode(r);
			                        var ResultText = r.result;
			                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
			                            ResultText = ResultText.l("SP_DynamicCode");
			                        /*Commented as response text not came from API*/
			                        if (r.success == true) {
			                            var win = Ext.WindowManager.getActive();
			                            if (win) {
			                                win.close();
			                            }
			                            //display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
			                            Ext.getStore('usermanage.ActivitiesListStore').reload();

			                        }
			                        else {
			                            Ext.Msg.alert('Error'.l('g'), ResultText);
			                        }
			                    },
			                    failure: function () {
			                        Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'))
			                    }
			                })
			            }
			        }
			    },

			    'assignroles combo[action="properties"]': {
			        select: function (combo, records, eOpts) {

			            if (Ext.getCmp('treepanelcheckbox'))
			                Ext.getCmp('treepanelcheckbox').getRootNode().removeAll();

			            Ext.getStore('usermanage.UserPropertyRoleListStore').load({
			                params: {
			                    'languageId': records[0].data.PropertyId,
			                    'id': me.data.UserId
			                },
			                callback: function (records, o, success) {

			                }
			            })
			        }
			    },

			    'assignroles': {
			        afterrender: function (combo, records, eOpts) {
			            if (Ext.getCmp('treepanelcheckbox'))
			                Ext.getCmp('treepanelcheckbox').getRootNode().removeAll();
			        }
			    },

			    'activitieslist button[action="assign_activity"]': {
			        click: function (t, e, eo) {//t => this, e => event, eo => Eoptional            
			            this.loadPropertyComboForUser(me.data);
			            Ext.create('widget.assignactivity', { data: me.data }).show();
			        }
			    },

			    'assignactivity combo[action="properties"]': {
			        select: function (combo, records, eOpts) {

			            Ext.getStore('usermanage.UserPropertyActivityListStore').load({
			                params: {
			                    'languageId': records[0].data.PropertyId,
			                    'id': me.data.UserId
			                },
			                callback: function (records, o, success) {
			                    var items = [];

			                    Ext.each(records, function (r) {
			                        checked = false;

			                        items.push({ name: 'activityIds', inputValue: r.raw.ActivityId, padding: 15,
			                            checked: checked,
			                            boxLabel: r.raw.DisplayName
			                        });

			                        var checkboxes = new Ext.form.CheckboxGroup({
			                            padding: 5,
			                            border: false,
			                            columns: 1,
			                            items: items
			                        });
			                        if (Ext.getCmp('ActivitiesIds')) {
			                            Ext.getCmp('ActivitiesIds').removeAll(true);
			                            Ext.getCmp('ActivitiesIds').add(checkboxes);
			                            Ext.getCmp('ActivitiesIds').doLayout();
			                        }

			                    });
			                }
			            })
			        }
			    },

			    'assignactivity button[action="assign_activities_save"]': {
			        click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
			            if (Ext.getCmp('assignactivitiesform').getForm().isValid()) {
			                var assignroleform = Ext.getCmp('assignactivitiesform').getForm().getValues();

			                var checkedCheckbox = Ext.getCmp('ActivitiesIds').getForm().getValues();

			                var activities = [];
			                Ext.each(checkedCheckbox, function (r) {
			                    activities += r.activityIds;
			                });

			                assignroleform.activityIds = activities;
			                Ext.getCmp('assignactivitiesform').getForm().findField('activityIds').setValue(assignroleform.activityIds);

			                //  assignroleform.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
			                //  assignroleform.createdBy = CurrentSessionUserId;
			                delete assignroleform.activityIds;
			                var assignRoleURL = webAPI_path + "api/roleright/AssignActivitiesToUser";

			                Ext.getCmp('assignactivitiesform').getForm().submit({
			                    url: assignRoleURL,
			                    method: 'POST',
			                    //   data: assignroleform,
			                    success: function (form, response) {

			                        var r = response.response.responseText;
			                        var r = Ext.decode(r);
			                        var ResultText = r.result;
			                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
			                            ResultText = ResultText.l("SP_DynamicCode");
			                        /*Commented as response text not came from API*/
			                        if (r.success == true) {
			                            var win = Ext.WindowManager.getActive();
			                            if (win) {
			                                win.close();
			                            }
			                            //display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
			                            Ext.getStore('usermanage.ActivitiesListStore').reload();

			                        }
			                        else {
			                            Ext.Msg.alert('Error'.l('g'), ResultText);
			                        }
			                    },
			                    failure: function (form, response) {
			                        var r = response.response.responseText;
			                        var r = jsonDecode(r);
			                        var ResultText = r.result;
			                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
			                            ResultText = ResultText.l("SP_DynamicCode");
			                        Ext.Msg.alert('Error'.l('g'), ResultText); // 'Information not saved.');
			                    }
			                })
			            }
			        }
			    }
			}
		)
    },

    index: function (rec) {
        var me = this;

        me.data = rec.data;

        instanceWidget = Ext.widget('activitieslist', { data: me.data });
        var ws = Ext.getCmp('right_regionAdministration');

        ws.removeAll();
        ws.add(instanceWidget);
        ws.doLayout();
        this.getActivityList(me.data);
    },

    //Retrieves an instance of the top-level view
    //If it has not been created yet than one is instantiated
    //Also, overrides the .close() method on the view to
    //null out the instance reference on the controller (very necessary)
    getViewInstance: function () {
        var self = this;

        if (!this.viewInstance) {
            if (this.views && this.views.length) {

                var view = this.getView(this.views[0]);

                this.viewInstance = view.create();

                this.viewInstance.close = function () {
                    view.prototype.close.apply(this, arguments);
                    self.viewInstance = null;
                };

            }
        }

        return this.viewInstance;
    },

    ViewActivitiesList: function (rec) {
        if (rec.data.RoleId > 0)
            Ext.create('widget.activitieslistwin', { rec: rec.data }).show();
    },

    loadPropertyComboForUser: function (rec) {

        if (rec.UserId > 0) {
            Ext.getStore('usermanage.PropertyListComboStore').load({
                params: {
                    'id': rec.UserId,
                    'languageId': user_language
                },
                callback: function (records, o, success) {

                }
            })
        }
    },

    getActivityList: function (rec) {
        Ext.getStore('usermanage.ActivitiesListStore').proxy.setExtraParam('userId', rec.UserId);
        Ext.getStore('usermanage.ActivitiesListStore').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('usermanage.ActivitiesListStore').load({
            /*params: {
            'userId': rec.UserId,
            'languageId': user_language
            },*/
            callback: function (records, o, success) {

            }
        })
    },

    loadActivityViewStore: function (rec) {

        Ext.getStore('usermanage.ActivitiesListViewStore').proxy.setExtraParam('id', rec.data.RoleId);
        Ext.getStore('usermanage.ActivitiesListViewStore').proxy.setExtraParam('languageId', rec.data.UserId); //routing problem

        Ext.getStore('usermanage.ActivitiesListViewStore').load({
            /* params: {
            'id': rec.data.RoleId,
            'languageId': rec.data.UserId
            },*/
            callback: function (records, o, success) {

            }
        })
    },

    deleteActivities: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {

                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/user/DeleteUserAcitivity',
                    type: "GET",
                    params: { roleId: rec.data.RoleId, activityId: rec.data.ActivityId, userId: rec.data.UserId, propertyId: rec.data.PropertyId },
                    success: function (r) {
                        //var r = jsonDecode(response);
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            //display_alert('MG00040'); // Ext.Msg.alert('Success', 'Information deleted successfully.')
                            Ext.getStore('usermanage.ActivitiesListStore').loadPage(1);
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), ResultText)
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