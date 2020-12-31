Ext.define('Regardz.controller.configuration.BusinessAlert', {
    extend: 'Ext.app.Controller',
    views: ['configuration.BusinessAlert', 'configuration.BusinessAlertTriggerManage', 'configuration.BusinessAlertTriggerManageLang'],
    stores: ['configuration.TriggerListStore', 'configuration.BusinessAlertDepartmentStore', 'configuration.BusinessAlertActionStore',
				'configuration.BusinessAlertRAPRoleStore', 'common.LanguageListStore'],
    thisController: false,
    refs: [{
        ref: 'businessalerttriggermanage',
        selector: 'businessalerttriggermanage'
    },
	{
	    ref: 'businessalerttriggermanagelang',
	    selector: 'businessalerttriggermanagelang'
	}],
    init: function () {
        var me = this;
        this.control({
            'businessalert': {
                afterrender: function (t, e, eo) {//t => this, e => event, eo => Eoptional
                    //Ext.getStore('configuration.TriggerListStore').load();
                },
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'editBusinessAlert')
                        this.editBusinessAlert(zRec);
                    else if (fieldName == 'deleteBusinessAlert')
                        this.deleteBusinessAlert(zRec);
                }
            },
            'businessalert button[action=addNewAlert]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
                    Ext.create('widget.businessalerttriggermanage').show();
                }
            },
            'businessalerttriggermanage': {
                afterrender: function (t, e, eo) {//t => this, e => event, eo => Eoptional

                    var RAPActionStore = Ext.ComponentQuery.query('[itemid="BusinessAlertActionRAP"]')[0];
                    RAPActionStore.getStore().proxy.setExtraParam('id', 0); // 0 for RAP; 1 for ROP
                    RAPActionStore.getStore().load();

                    var ROPActionStore = Ext.ComponentQuery.query('[itemid="BusinessAlertActionROP"]')[0];
                    ROPActionStore.getStore().proxy.setExtraParam('id', 1); // 0 for RAP; 1 for ROP
                    ROPActionStore.getStore().load();

                    var BusinessAlertRAPRoleStore = Ext.ComponentQuery.query('[itemid="BusinessAlertRAPRole"]')[0];
                    BusinessAlertRAPRoleStore.getStore().load();


                    var BusinessAlertDepartmentStore = Ext.ComponentQuery.query('[itemid="BusinessAlertDepartment"]')[0];
                    BusinessAlertDepartmentStore.getStore().load();

                    if (t.AlertId > 0) {
                        var form = Ext.ComponentQuery.query('[itemid="businessalerttriggermanage"]')[0];

                        form.getForm().load({
                            method: 'GET',
                            url: webAPI_path + 'api/Alert/GetBusinessAlertById',
                            params: {
                                id: t.AlertId,
                                languageId: user_language
                            },
                            success: function (form, action) {

                            }
                        });

                    }

                }
            },
            'businessalerttriggermanage radio[name=ApplyTo]': {
                change: function (t, n, o, eo) {
                    /*radio*/
                    var ApplyToROPcontactRadio = Ext.ComponentQuery.query('[itemid="ApplyToROPcontact"]')[0].getValue();
                    var ApplyToRAPactionRadio = Ext.ComponentQuery.query('[itemid="ApplyToRAPaction"]')[0].getValue();
                    var ApplyToRAProleRadio = Ext.ComponentQuery.query('[itemid="ApplyToRAProle"]')[0].getValue();
                    var ApplyToRAPdepartmentRadio = Ext.ComponentQuery.query('[itemid="ApplyToRAPdepartment"]')[0].getValue();

                    /*combo*/
                    var BusinessAlertActionROPFieldCombo = Ext.ComponentQuery.query('[itemid="BusinessAlertActionROP"]')[0];
                    var BusinessAlertActionRAPFieldCombo = Ext.ComponentQuery.query('[itemid="BusinessAlertActionRAP"]')[0];

                    /*combo*/
                    var BusinessAlertRAPRoleCombo = Ext.ComponentQuery.query('[itemid="BusinessAlertRAPRole"]')[0];
                    var BusinessAlertDepartmentCombo = Ext.ComponentQuery.query('[itemid="BusinessAlertDepartment"]')[0];

                    if (ApplyToROPcontactRadio == true) {
                        BusinessAlertActionROPFieldCombo.enable(true);
                        BusinessAlertActionRAPFieldCombo.disable();
                    }
                    else if (ApplyToRAPactionRadio == true || ApplyToRAProleRadio == true) {
                        BusinessAlertActionROPFieldCombo.disable();
                        BusinessAlertActionRAPFieldCombo.enable(true);
                    }

                    if (ApplyToRAProleRadio == true) {
                        BusinessAlertRAPRoleCombo.enable(true);
                    }
                    else
                        BusinessAlertRAPRoleCombo.disable();

                    if (ApplyToRAPdepartmentRadio == true) {
                        BusinessAlertDepartmentCombo.enable(true);
                    }
                    else
                        BusinessAlertDepartmentCombo.disable();

                }
            },
            'businessalerttriggermanage button[action=saveBusinessAlert]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
                    var form = Ext.ComponentQuery.query('[itemid="businessalerttriggermanage"]')[0];

                    if (form.getForm().isValid()) {
                        var formValues = form.getForm().getValues();
                        var submitURL = webAPI_path + "api/Alert/ManageBusinessAlert";

                        if (formValues.AlertId > 0) {
                            form.getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            form.getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);

                        } else {
                            form.getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            form.getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        form.getForm().findField('LanguageId').setValue(user_language);

                        form.getForm().submit({
                            url: submitURL,
                            method: 'POST',
                            success: function (form, response) {

                                var r = response.response.responseText;
                                var r = Ext.decode(r);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                /*Commented as response text not came from API*/
                                if (r.success == true) {
                                    me.getBusinessalerttriggermanage().close();
                                    //display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                    Ext.getStore('configuration.TriggerListStore').reload();
                                } else {
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
                        })
                    }
                }
            },

            'businessalerttriggermanage button[action="saveBusinessAlertLang"]': {
                click: function (t) {

                    var form = Ext.ComponentQuery.query('[itemid="businessalerttriggermanage"]')[0];

                    var AlertId = form.getForm().findField('AlertId').getValue();

                    var window = Ext.create('widget.businessalerttriggermanagelang', { AlertId: AlertId }).alignTo(t);
                }
            },

            'businessalerttriggermanagelang': {
                afterrender: function (t, e, eo) {//t => this, e => event, eo => Eoptional					
                    Ext.getStore('common.LanguageListStore').load();
                }
            },

            'businessalerttriggermanagelang button[action="businessAlertLangMang"]': {
                click: function (t) {
                    var form = Ext.ComponentQuery.query('[itemid="businessalerttriggermanagelang"]')[0];
                    var formurl = webAPI_path + "api/Alert/UpdateAlertMultiLangDetail";
                    form.getForm().submit({
                        method: 'POST',
                        url: formurl,
                        waitMsg: 'save_data_message'.l('g'),
                        success: function (form, response) {
                            me.getBusinessalerttriggermanagelang().close();
                        },
                        failure: function (form, response) {
                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        }
                    })
                }
            },

            'businessalerttriggermanagelang combo[name="LanguageId"]': {
                select: function (combo, records, eOpt) {
                    var languageId = records[0].data.LanguageId;

                    var form = Ext.ComponentQuery.query('[itemid="businessalerttriggermanagelang"]')[0];
                    var AlertId = form.getForm().findField('AlertId').getValue();

                    form.getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/Alert/GetBusinessAlertLanguageDetailById',
                        params: {
                            id: AlertId,
                            languageId: languageId
                        }
                    })
                }
            }

        });
    },
    deleteBusinessAlert: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                if (rec.data.AlertId > 0) {
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/Alert/DeleteBusinessAlert',
                        type: "GET",
                        params: { id: rec.data.AlertId },
                        success: function (response) {
                            var r = response;
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                //display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Room deleted successfully.');
                                //Ext.getStore('configuration.TriggerListStore').loadPage(1);
                                var grid = Ext.ComponentQuery.query('[itemid="businessalertsgrid"]')[0];
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
    editBusinessAlert: function (rec) {
        Ext.create('widget.businessalerttriggermanage', { AlertId: rec.data.AlertId }).show();
    }
});