Ext.define('Regardz.controller.mastervalues.Origin', {
    extend: 'Ext.app.Controller',
    views: ['mastervalues.OriginList', 'mastervalues.OriginManage', 'mastervalues.OriginLang'],
    stores: ['mastervalues.OriginStore', 'common.LanguageListStore'],

    refs: [{
        ref: 'OriginManage',
        selector: 'OriginManage'
    }, {
        ref: 'OriginLang',
        selector: 'OriginLang'
    }],

    init: function () {

        this.control(
        {
            'originlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'OriginEdit')
                        this.OriginEdit(zRec);
                    else if (fieldName == 'OriginDelete')
                        this.OriginDelete(zRec);
                }
            },
            'originmanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var me = this;
                    // var originId = Ext.getCmp('addOrigin').getForm().findField('OriginId').getValue();

                    var langWin = Ext.create('widget.originlang');
                    var btnCmp = Ext.ComponentQuery.query('[itemid="langButton"]')[0];
                    langWin.alignTo(btnCmp, "br?", [-5, -5]);
                    //                    Ext.getCmp('originLang').getForm().load({
                    //                        method: 'GET',
                    //                        url: webAPI_path + 'api/MasterValue/GetOriginForMultiLingUpdate',
                    //                        params: {
                    //                            id: originId,
                    //                            languageId: user_language
                    //                        }
                    //                    });
                }
            },
            'button[action="addOrigin"]': {
                click: function () {
                    Ext.create('widget.originmanage', { originId: 0 });
                }
            },
            'button[action="saveOrigin"]': {
                click: function () {
                    if (Ext.getCmp('addOrigin').getForm().isValid()) {
                        var originId = Ext.getCmp('addOrigin').getForm().findField('OriginId').getValue();

                        var urlOrigin = "";
                        if (originId == 0) {
                            urlOrigin = webAPI_path + 'api/MasterValue/AddOrigin';
                            Ext.getCmp('addOrigin').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addOrigin').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            urlOrigin = webAPI_path + 'api/MasterValue/UpdateOrigin';
                            Ext.getCmp('addOrigin').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addOrigin').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('addOrigin').getForm().submit({
                            url: urlOrigin,
                            type: 'POST',
                            params: Ext.getCmp('addOrigin').getForm().getValues(),
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
                                    display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                    Ext.getStore('mastervalues.OriginStore').reload();
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
                        });
                    }
                }
            },
            'originlang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {
                    var originId = Ext.getCmp('addOrigin').getForm().findField('OriginId').getValue();
                    Ext.getCmp('originLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/MasterValue/GetOriginForMultiLingUpdate',
                        params: {
                            id: originId,
                            languageId: records[0].data.LanguageId
                        }
                    });
                }
            },
            'originlang button[action="saveOriginLang"]': {
                click: function () {
                    if (Ext.getCmp('originLang').getForm().isValid()) {
                        var OriginId = Ext.getCmp('addOrigin').getForm().findField('OriginId').getValue();
                        Ext.getCmp('originLang').getForm().submit({
                            url: webAPI_path + 'api/MasterValue/UpdateOriginMultiLangDetail',
                            type: 'POST',
                            params: Ext.getCmp('originLang').getForm().getValues(),
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
                                            Ext.getStore('mastervalues.OriginStore').reload();
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
    OriginEdit: function (rec) {
        var editOrigin = Ext.create('widget.originmanage', { originId: rec.data.OriginId });
        editOrigin.setTitle('Update Origin_Title'.l('SC21110'));

        Ext.getCmp('addOrigin').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/MasterValue/GetOriginForUpdate',
            params: {
                id: rec.data.OriginId,
                languageId: user_language
            }
        });
    },
    OriginDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/MasterValue/RemoveOrigin',
                    type: "GET",
                    params: { id: rec.data.OriginId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            Ext.getStore('mastervalues.OriginStore').loadPage(1);
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
    }
});