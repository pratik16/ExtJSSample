Ext.define('Regardz.controller.configuration.Events', {
    extend: 'Ext.app.Controller',
    views: ['configuration.EventsList', 'configuration.EventsManage', 'configuration.EventsLang'],
    stores: ['configuration.EventsStore'],

    refs: [{
        ref: 'EventsManage',
        selector: 'EventsManage'
    }, {
        ref: 'EventsEventsLang',
        selector: 'EventsLang'
    }],

    init: function () {

        this.control(
        {
            'eventslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'EventsEdit')
                        this.EventsEdit(zRec);
                    else if (fieldName == 'EventsDelete')
                        this.EventsDelete(zRec);
                }
            },
            'eventsmanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var me = this;
                    //var eventId = Ext.getCmp('addEvents').getForm().findField('EventId').getValue();
                    Ext.create('widget.eventslang');
                    //                    Ext.getCmp('eventsLang').getForm().load({
                    //                        method: 'GET',
                    //                        url: webAPI_path + 'api/ConfigEvents/GetEventsForMultiLingUpdate',
                    //                        params: {
                    //                            id: eventId,
                    //                            languageId: user_language
                    //                        }
                    //                    });
                }
            },
            'button[action="addEvents"]': {
                click: function () {
                    Ext.create('widget.eventsmanage', { eventId: 0 });
                }
            },
            'button[action="saveEvents"]': {
                click: function () {
                    if (Ext.getCmp('addEvents').getForm().isValid()) {
                        var eventId = Ext.getCmp('addEvents').getForm().findField('EventId').getValue();

                        var urlEvents = "";
                        if (eventId == 0) {
                            urlEvents = webAPI_path + 'api/ConfigEvents/AddEvents';
                            Ext.getCmp('addEvents').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addEvents').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            urlEvents = webAPI_path + 'api/ConfigEvents/UpdateEvents';
                            Ext.getCmp('addEvents').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addEvents').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('addEvents').getForm().submit({
                            url: urlEvents,
                            type: 'POST',
                            params: Ext.getCmp('addEvents').getForm().getValues(),
                            success: function (form, response) {
                                var r = response;
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
                                    display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                    Ext.getStore('configuration.EventsStore').reload();
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function (form, response) {
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
                        });
                    }
                }
            },
            'eventslang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {
                    var eventId = Ext.getCmp('addEvents').getForm().findField('EventId').getValue();
                    Ext.getCmp('eventsLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/ConfigEvents/GetEventsForMultiLingUpdate',
                        params: {
                            id: eventId,
                            languageId: records[0].data.LanguageId
                        }
                    });
                }
            },
            'eventslang button[action="saveEventsLang"]': {
                click: function () {
                    if (Ext.getCmp('eventsLang').getForm().isValid()) {
                        Ext.getCmp('eventsLang').getForm().submit({
                            url: webAPI_path + 'api/ConfigEvents/UpdateEventsMultiLangDetail',
                            type: 'POST',
                            params: Ext.getCmp('eventsLang').getForm().getValues(),
                            success: function (form, response) {
                                var r = response;
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
                                            Ext.getStore('configuration.EventsStore').reload();
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
                                r = response;
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
                        });
                    }
                }
            }
        })

    },
    EventsEdit: function (rec) {
        var eventMgt = Ext.create('widget.eventsmanage', { eventId: rec.data.EventId, isOnline: rec.data.IsOnline });
        eventMgt.setTitle('Update Event_Title'.l('SC20710'));
        Ext.getCmp('addEvents').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/ConfigEvents/GetEventsForUpdate',
            params: {
                id: rec.data.EventId,
                languageId: user_language
            }
        });
    },
    EventsDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/ConfigEvents/RemoveEvents',
                    type: "GET",
                    params: { id: rec.data.EventId },
                    success: function (response) {
                        var r = response;
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            Ext.getStore('configuration.EventsStore').loadPage(1);
                        }
                        else {
                            if (r.result == "Default Event Deletion Message") Ext.Msg.alert('Error'.l('g'), 'Default Event Deletion Message'.l('SC20710'));
                            else {
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
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