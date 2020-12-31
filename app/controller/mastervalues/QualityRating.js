Ext.define('Regardz.controller.mastervalues.QualityRating', {
    extend: 'Ext.app.Controller',
    views: ['mastervalues.QualityRatingList', 'mastervalues.QualityRatingManage', 'mastervalues.QualityRatingLang'],
    stores: ['mastervalues.QualityRatingStore', 'common.LanguageListStore'],

    refs: [{
        ref: 'QualityRatingManage',
        selector: 'QualityRatingManage'
    }, {
        ref: 'QualityRatingLang',
        selector: 'QualityRatingLang'
    }],

    init: function () {

        this.control(
        {
            'qualityratinglist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'QualityRatingEdit')
                        this.QualityRatingEdit(zRec);
                    else if (fieldName == 'QualityRatingDelete')
                        this.QualityRatingDelete(zRec);
                }
            },
            'qualityratingmanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var me = this;
                   // var qualityRatingId = Ext.getCmp('addQualityRating').getForm().findField('QualityRatingId').getValue();
                    var qualRating = Ext.getCmp('addQualityRating').getForm().findField('Rating').getValue();
                    Ext.create('widget.qualityratinglang', { rating: qualRating });
//                    Ext.getCmp('qualityRatingLang').getForm().load({
//                        method: 'GET',
//                        url: webAPI_path + 'api/MasterValue/GetQualityRatingForMultiLingUpdate',
//                        params: {
//                            id: qualityRatingId,
//                            languageId: user_language
//                        }
//                    });
                }
            },
            'button[action="addQualityRating"]': {
                click: function () {
                    Ext.create('widget.qualityratingmanage', { qualityRatingId: 0 });
                }
            },
            'button[action="saveQualityRating"]': {
                click: function () {
                    if (Ext.getCmp('addQualityRating').getForm().isValid()) {
                        var qualityRatingId = Ext.getCmp('addQualityRating').getForm().findField('QualityRatingId').getValue();

                        var urlQualityRating = "";
                        if (qualityRatingId == 0) {
                            urlQualityRating = webAPI_path + 'api/MasterValue/AddQualityRating';
                            Ext.getCmp('addQualityRating').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addQualityRating').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            urlQualityRating = webAPI_path + 'api/MasterValue/UpdateQualityRating';
                            Ext.getCmp('addQualityRating').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addQualityRating').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('addQualityRating').getForm().submit({
                            url: urlQualityRating,
                            type: 'POST',
                            params: Ext.getCmp('addQualityRating').getForm().getValues(),
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
                                    Ext.getStore('mastervalues.QualityRatingStore').reload();
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
            'qualityratinglang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {
                    var qualityRatingId = Ext.getCmp('addQualityRating').getForm().findField('QualityRatingId').getValue();
                    Ext.getCmp('qualityRatingLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/MasterValue/GetQualityRatingForMultiLingUpdate',
                        params: {
                            id: qualityRatingId,
                            languageId: records[0].data.LanguageId
                        }
                    });
                }
            },
            'qualityratinglang button[action="saveQualityRatingLang"]': {
                click: function () {
                    if (Ext.getCmp('qualityRatingLang').getForm().isValid()) {
                        //var QualityRatingId = Ext.getCmp('addQualityRating').getForm().findField('QualityRatingId').getValue();
                        Ext.getCmp('qualityRatingLang').getForm().submit({
                            url: webAPI_path + 'api/MasterValue/UpdateQualityRatingMultiLangDetail',
                            type: 'POST',
                            params: Ext.getCmp('qualityRatingLang').getForm().getValues(),
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
                                            Ext.getStore('mastervalues.QualityRatingStore').reload();
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
    QualityRatingEdit: function (rec) {
        var editQualityRating = Ext.create('widget.qualityratingmanage', { qualityRatingId: rec.data.QualityRatingId });
        editQualityRating.setTitle('Update Quality Rating_Title'.l('SC21610'));

        Ext.getCmp('addQualityRating').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/MasterValue/GetQualityRatingForUpdate',
            params: {
                id: rec.data.QualityRatingId,
                languageId: user_language
            }
        });
    },
    QualityRatingDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/MasterValue/RemoveQualityRating',
                    type: "GET",
                    params: { id: rec.data.QualityRatingId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            Ext.getStore('mastervalues.QualityRatingStore').loadPage(1);
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