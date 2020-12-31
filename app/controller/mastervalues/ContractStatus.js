Ext.define('Regardz.controller.mastervalues.ContractStatus', {
    extend: 'Ext.app.Controller',
    views: ['mastervalues.ContractStatusList', 'mastervalues.ContractStatusManage', 'mastervalues.ContractStatusLang'],
    stores: ['mastervalues.ContractStatusStore', 'common.LanguageListStore'],

    refs: [{
        ref: 'ContractStatusManage',
        selector: 'ContractStatusManage'
    }, {
        ref: 'ContractStatusLang',
        selector: 'ContractStatusLang'
    }],

    init: function () {

        this.control(
        {
            'contractstatuslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'ContractStatusEdit')
                        this.ContractStatusEdit(zRec);
                }
            },
            'contractstatusmanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var me = this;
                   // var contractStatusId = Ext.getCmp('editContractStatus').getForm().findField('ContractStatusId').getValue();
                    Ext.create('widget.contractstatuslang');
//                    Ext.getCmp('contractStatusLang').getForm().load({
//                        method: 'GET',
//                        url: webAPI_path + 'api/MasterValue/GetContractStatusForMultiLingUpdate',
//                        params: {
//                            id: contractStatusId,
//                            languageId: user_language
//                        }
//                    });
                }
            },

            'button[action="saveContractStatus"]': {
                click: function () {
                    if (Ext.getCmp('editContractStatus').getForm().isValid()) {
                        Ext.getCmp('editContractStatus').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        Ext.getCmp('editContractStatus').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);

                        Ext.getCmp('editContractStatus').getForm().submit({
                            url: webAPI_path + 'api/MasterValue/UpdateContractStatus',
                            type: 'POST',
                            params: Ext.getCmp('editContractStatus').getForm().getValues(),
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
                                    Ext.getStore('mastervalues.ContractStatusStore').reload();
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
            'contractstatuslang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {
                    var contractStatusId = Ext.getCmp('editContractStatus').getForm().findField('ContractStatusId').getValue();
                    Ext.getCmp('contractStatusLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/MasterValue/GetContractStatusForMultiLingUpdate',
                        params: {
                            id: contractStatusId,
                            languageId: records[0].data.LanguageId
                        }
                    });
                }
            },
            'contractstatuslang button[action="saveContractStatusLang"]': {
                click: function () {
                    if (Ext.getCmp('contractStatusLang').getForm().isValid()) {
                        Ext.getCmp('contractStatusLang').getForm().submit({
                            url: webAPI_path + 'api/MasterValue/UpdateContractStatusMultiLangDetail',
                            type: 'POST',
                            params: Ext.getCmp('contractStatusLang').getForm().getValues(),
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
                                            Ext.getStore('mastervalues.ContractStatusStore').reload();
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
    ContractStatusEdit: function (rec) {
        var cd = Ext.create('widget.contractstatusmanage', { contractStatusId: rec.data.ContractStatusId });
        cd.setTitle('Update Contract Status_Title'.l('SC21810'));
        Ext.getCmp('editContractStatus').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/MasterValue/GetContractStatusForUpdate',
            params: {
                id: rec.data.ContractStatusId,
                languageId: user_language
            }
        });
    }
});