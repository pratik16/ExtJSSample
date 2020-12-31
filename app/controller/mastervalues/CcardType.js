Ext.define('Regardz.controller.mastervalues.CcardType', {
    extend: 'Ext.app.Controller',
    views: ['mastervalues.CcardTypeList', 'mastervalues.CcardTypeManage', 'mastervalues.CcardTypeLang'],
    stores: ['mastervalues.CcardTypeStore', 'common.LanguageListStore'],

    refs: [{
        ref: 'CcardTypeManage',
        selector: 'CcardTypeManage'
    }, {
        ref: 'CcardTypeLang',
        selector: 'CcardTypeLang'
    }],

    init: function () {

        this.control(
        {
            'ccardtypelist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'CcardTypeEdit')
                        this.CcardTypeEdit(zRec);
                    else if (fieldName == 'CcardTypeDelete')
                        this.CcardTypeDelete(zRec);
                }
            },
            'ccardtypemanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var me = this;
                    //var ccardTypeId = Ext.getCmp('addCcardType').getForm().findField('CcardTypeId').getValue();
                    Ext.create('widget.ccardtypelang');
//                    Ext.getCmp('ccardTypeLang').getForm().load({
//                        method: 'GET',
//                        url: webAPI_path + 'api/MasterValue/GetCcardTypeForMultiLingUpdate',
//                        params: {
//                            id: ccardTypeId,
//                            languageId: user_language
//                        }
//                    });
                }
            },
            'button[action="addCcardType"]': {
                click: function () {
                    Ext.create('widget.ccardtypemanage', { ccardTypeId: 0 });
                }
            },
            'button[action="saveCcardType"]': {
                click: function () {
                    if (Ext.getCmp('addCcardType').getForm().isValid()) {
                        var ccardTypeId = Ext.getCmp('addCcardType').getForm().findField('CcardTypeId').getValue();

                        var urlCcardType = "";
                        if (ccardTypeId == 0) {
                            urlCcardType = webAPI_path + 'api/MasterValue/AddCcardType';
                            Ext.getCmp('addCcardType').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addCcardType').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            urlCcardType = webAPI_path + 'api/MasterValue/UpdateCcardType';
                            Ext.getCmp('addCcardType').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addCcardType').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('addCcardType').getForm().submit({
                            url: urlCcardType,
                            type: 'POST',
                            params: Ext.getCmp('addCcardType').getForm().getValues(),
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
                                    Ext.getStore('mastervalues.CcardTypeStore').reload();
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
            'ccardtypelang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {
                    var ccardTypeId = Ext.getCmp('addCcardType').getForm().findField('CcardTypeId').getValue();
                    Ext.getCmp('ccardTypeLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/MasterValue/GetCcardTypeForMultiLingUpdate',
                        params: {
                            id: ccardTypeId,
                            languageId: records[0].data.LanguageId
                        }
                    });
                }
            },
            'ccardtypelang button[action="saveCcardTypeLang"]': {
                click: function () {
                    if (Ext.getCmp('ccardTypeLang').getForm().isValid()) {
                        var ccardTypeId = Ext.getCmp('addCcardType').getForm().findField('CcardTypeId').getValue();
                        Ext.getCmp('ccardTypeLang').getForm().submit({
                            url: webAPI_path + 'api/MasterValue/UpdateCcardTypeMultiLangDetail',
                            type: 'POST',
                            params: Ext.getCmp('ccardTypeLang').getForm().getValues(),
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
                                            Ext.getStore('mastervalues.CcardTypeStore').reload();
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
    CcardTypeEdit: function (rec) {
        var editCcardType = Ext.create('widget.ccardtypemanage', { ccardTypeId: rec.data.CcardTypeId });
        editCcardType.setTitle('Update Ccard_Title'.l('SC20910'));

        Ext.getCmp('addCcardType').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/MasterValue/GetCcardTypeForUpdate',
            params: {
                id: rec.data.CcardTypeId,
                languageId: user_language
            }
        });
    },
    CcardTypeDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/MasterValue/RemoveCcardType',
                    type: "GET",
                    params: { id: rec.data.CcardTypeId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            Ext.getStore('mastervalues.CcardTypeStore').loadPage(1);
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