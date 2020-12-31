Ext.define('Regardz.controller.mastervalues.CompanyStatus', {
    extend: 'Ext.app.Controller',
    views: ['mastervalues.CompanyStatusList', 'mastervalues.CompanyStatusManage', 'mastervalues.CompanyStatusLang'],
    stores: ['mastervalues.CompanyStatusStore', 'common.LanguageListStore'],

    refs: [{
        ref: 'CompanyStatusManage',
        selector: 'CompanyStatusManage'
    }, {
        ref: 'CompanyStatusLang',
        selector: 'CompanyStatusLang'
    }],

    init: function () {

        this.control(
        {
            'companystatuslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'CompanyStatusEdit')
                        this.CompanyStatusEdit(zRec);
                }
            },
            'companystatusmanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var me = this;
                    //var CompanyStatusId = Ext.getCmp('editCompanyStatus').getForm().findField('CompanyStatusId').getValue();
                    Ext.create('widget.companystatuslang');
//                    Ext.getCmp('companyStatusLang').getForm().load({
//                        method: 'GET',
//                        url: webAPI_path + 'api/MasterValue/GetCompanyStatusForMultiLingUpdate',
//                        params: {
//                            id: CompanyStatusId,
//                            languageId: user_language
//                        }
//                    });
                }
            },

            'button[action="saveCompanyStatus"]': {
                click: function () {
                    if (Ext.getCmp('editCompanyStatus').getForm().isValid()) {
                        Ext.getCmp('editCompanyStatus').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        Ext.getCmp('editCompanyStatus').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);

                        Ext.getCmp('editCompanyStatus').getForm().submit({
                            url: webAPI_path + 'api/MasterValue/UpdateCompanyStatus',
                            type: 'POST',
                            params: Ext.getCmp('editCompanyStatus').getForm().getValues(),
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
                                    Ext.getStore('mastervalues.CompanyStatusStore').reload();
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
            'companystatuslang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {
                    var CompanyStatusId = Ext.getCmp('editCompanyStatus').getForm().findField('CompanyStatusId').getValue();
                    Ext.getCmp('companyStatusLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/MasterValue/GetCompanyStatusForMultiLingUpdate',
                        params: {
                            id: CompanyStatusId,
                            languageId: records[0].data.LanguageId
                        }
                    });
                }
            },
            'companystatuslang button[action="saveCompanyStatusLang"]': {
                click: function () {
                    if (Ext.getCmp('companyStatusLang').getForm().isValid()) {
                        Ext.getCmp('companyStatusLang').getForm().submit({
                            url: webAPI_path + 'api/MasterValue/UpdateCompanyStatusMultiLangDetail',
                            type: 'POST',
                            params: Ext.getCmp('companyStatusLang').getForm().getValues(),
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
                                            Ext.getStore('mastervalues.CompanyStatusStore').reload();
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
    CompanyStatusEdit: function (rec) {
        var cs = Ext.create('widget.companystatusmanage', { companyStatusId: rec.data.CompanyStatusId });
        cs.setTitle('Update Company Status_Title'.l('SC21710'));
        Ext.getCmp('editCompanyStatus').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/MasterValue/GetCompanyStatusForUpdate',
            params: {
                id: rec.data.CompanyStatusId,
                languageId: user_language
            }
        });
    }
});