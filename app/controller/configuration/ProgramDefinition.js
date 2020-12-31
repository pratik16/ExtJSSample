Ext.define('Regardz.controller.configuration.ProgramDefinition', {
    extend: 'Ext.app.Controller',
    views: ['configuration.ProgramDefinitionList', 'configuration.ProgramDefinitionAddEvent', 'configuration.ProgramDefinitionEventList', 'configuration.ProgramDefinitionEventListWindow'],
    stores: ['configuration.ProgramDefinitionStore', 'configuration.ProgramDefinitionEventListStore', 'common.EventListForProgramDefinitionStore', 'configuration.SlotStore', 'configuration.DurationStore'],

    refs: [{
        ref: 'ProgramDefinitionList',
        selector: 'ProgramDefinitionList'
    }],

    init: function () {

        this.control(
        {
            'programdefinitionlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'ProgDefiDelete')
                        this.ProgDefiDelete(zRec);
                    else if (fieldName == 'manageEvent')
                        this.manageEvent(zRec);

                },
                afterrender: function () {
                    Ext.getCmp('programdefinitionlist').getStore().reload();

                    //                    Ext.getStore('configuration.DurationStore').load({
                    //                        callback: function (records, o, success) {

                    //                        }
                    //                    })
                },

                edit: function (editor, e) {
                    e.newValues.StartingSlotId = e.newValues.TimeSlotId;
                    Ext.Ajax.request({
                        url: webAPI_path + 'api/configProgramDefinition/ManageProgramDefinition',
                        type: 'POST',
                        //params: obj.newValues, //obj.originalValues
                        params: e.newValues, //obj.originalValues
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            //var r = jsonDecode(response);  
                            if (r.success == true) {
                                Ext.getStore('configuration.ProgramDefinitionStore').reload();
                                Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                            }
                            else {
                                Ext.getStore('configuration.ProgramDefinitionStore').reload();
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                            // deptCombo.clearValue();
                            //roleCombo.clearValue();
                        },
                        failure: function () {
                            Ext.getStore('configuration.ProgramDefinitionStore').reload();
                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                            // deptCombo.clearValue();
                            //roleCombo.clearValue();
                        }
                    });
                },

                beforeedit: function (editor, e, eOpts) {
                    Ext.getCmp('slotComboId').getStore().load({
                        params: {
                            id: e.record.data.Duration
                        },
                        callback: function (records, o, success) {
                            Ext.getCmp('slotComboId').setValue(e.record.data.TimeSlotId);
                            Ext.getCmp('durationId').setValue(e.record.data.Duration);

                        }
                    })
                },

                canceledit: function () {
                    Ext.getStore('configuration.ProgramDefinitionStore').reload();
                    //Ext.getStore('configuration.ProgramDefinitionStore').rejectChanges();
                }
            },
            'programdefinitioneventlist button[action="addPDEvents"]': {
                click: function () {
                    var programDefinitionID = Ext.getCmp('programDefinitionID').value;
                    var DurationVALUE = Ext.getCmp('DurationVALUE').value;
                    var startingSlotID = Ext.getCmp('startingSlotID').value;
                    Ext.create('widget.programdefinitionaddevent', { programDefinitionId: programDefinitionID, duration: DurationVALUE, startingSlotId: startingSlotID });
                }
            },
            'programdefinitioneventlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'PDEventsDelete')
                        this.PDEventsDelete(zRec);

                },
                afterrender: function () {
                    var programDefinitionID = Ext.getCmp('programDefinitionID').value;

                    Ext.getStore('configuration.ProgramDefinitionEventListStore').proxy.setExtraParam('id', programDefinitionID);
                    Ext.getStore('configuration.ProgramDefinitionEventListStore').proxy.setExtraParam('languageId', user_language);
                    Ext.getStore('configuration.ProgramDefinitionEventListStore').load();
                }

            },
            'programdefinitionaddevent button[action="saveProgDefiAddEvent"]': {
                click: function () {
                    if (Ext.getCmp('progDefiAddEvent').getForm().isValid()) {
                        var DurationVALUE = Ext.getCmp('DurationVALUE').value;
                        var startingSlotID = Ext.getCmp('startingSlotID').value;

                        var eventId = Ext.getCmp('progDefiAddEvent').getForm().findField('EventId').getValue();

                        if (Ext.getCmp('progDefiAddEvent').getForm().findField('IsAntSlot').getValue() == true) {
                            Ext.getCmp('progDefiAddEvent').getForm().findField('StartTime').setValue(null);
                            Ext.getCmp('progDefiAddEvent').getForm().findField('EndTime').setValue(null);
                        }


                        var startValue = Ext.Date.format(Ext.getCmp('progDefiAddEvent').getForm().findField('StartTime').getValue(), ' H:i:s');
                        var endValue = Ext.Date.format(Ext.getCmp('progDefiAddEvent').getForm().findField('EndTime').getValue(), ' H:i:s');

                        if (startValue == '' || endValue == '' || (endValue > startValue && endValue != startValue)) {

                            Ext.getCmp('progDefiAddEvent').getForm().submit({
                                url: webAPI_path + 'api/ConfigProgramDefinition/ManageProgramDefinitionDetail',
                                type: 'POST',
                               // params: Ext.getCmp('progDefiAddEvent').getForm().getValues(),
                                success: function (form, response) {
                                    var r = response.result;
                                    var win = Ext.WindowManager.getActive();
                                    var ResultText = r.result;
                                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                        ResultText = ResultText.l("SP_DynamicCode");
                                    if (win) {
                                        win.close();
                                    }
                                    if (r.success == true) {
                                        Ext.getStore('configuration.ProgramDefinitionEventListStore').reload();
                                        Ext.data.JsonP.request({
                                            url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                            success: function () {
                                                display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
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
                                        Ext.getStore('configuration.ProgramDefinitionEventListStore').reload();

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
                            });

                        }
                        else {
                            Ext.data.JsonP.request({
                                url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                success: function () {
                                    if (endValue == startValue) {
                                        Ext.Msg.alert('Error'.l('g'), 'Start time and End time should not be same.'.l('g'));
                                    }
                                    else if (endValue < startValue) {
                                        Ext.Msg.alert('Error'.l('g'), 'End time should be greater than Start time.'.l('g'));
                                    }
                                    else {
                                        Ext.Msg.alert('Error'.l('g'), 'Start Time or End Time is not valid.'.l('g'));
                                    }
                                }
                            });
                        }
                    }
                }
            },
            'programdefinitionlist button[action="addProgramDefinition"]': {
                click: function () {

                    var r = Ext.create('Regardz.model.configuration.ProgramDefinition', {
                        Name: 'New Program Defination'.l('SC23600'),
                        IsActive: true,
                        Duration: 0,
                        ProgramDefinitionId: 0
                        //StartingSlotId: slotCombo.getValue()
                    });

                    editor = Ext.getCmp('programdefinitionlist').editingPlugin;
                    editor.cancelEdit();
                    Ext.getCmp('programdefinitionlist').getStore().insert(0, r);
                    editor.startEdit(0, 0);
                }
            }
        })

    },
    ProgDefiDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/ConfigProgramDefinition/RemoveProgramDefinition',
                    type: "GET",
                    params: { id: rec.data.ProgramDefinitionId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            Ext.getStore('configuration.ProgramDefinitionStore').loadPage(1);
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
    PDEventsDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/ConfigProgramDefinition/RemoveProgramDefinitionDetail',
                    type: "GET",
                    params: { id: rec.data.ProgramDefinitionDetailId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            Ext.getStore('configuration.ProgramDefinitionEventListStore').loadPage(1);
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
    manageEvent: function (rec) {
        Ext.create('widget.programdefinitioneventlistwindow', { programDefinitionId: rec.data.ProgramDefinitionId, duration: rec.data.Duration, startingSlotId: rec.data.StartingSlotId });
    }


});
