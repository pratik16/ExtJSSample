Ext.define('Regardz.controller.mastervalues.MarketSource', {
    extend: 'Ext.app.Controller',
    views: ['mastervalues.MarketSourceList', 'mastervalues.MarketSourceManage', 'mastervalues.MarketSourceLang'],
    stores: ['mastervalues.MarketSourceStore', 'common.LanguageListStore'],

    refs: [{
        ref: 'MarketSourceManage',
        selector: 'MarketSourceManage'
    }, {
        ref: 'MarketSourceLang',
        selector: 'MarketSourceLang'
    }],

    init: function () {

        this.control(
        {
            'marketsourcelist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'MarketSourceEdit')
                        this.MarketSourceEdit(zRec);
                    else if (fieldName == 'MarketSourceDelete')
                        this.MarketSourceDelete(zRec);
                }
            },
            'marketsourcemanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var me = this;
                   // var marketSourceId = Ext.getCmp('addMarketSource').getForm().findField('MarketSourceId').getValue();
                    Ext.create('widget.marketsourcelang');
//                    Ext.getCmp('marketSourceLang').getForm().load({
//                        method: 'GET',
//                        url: webAPI_path + 'api/MasterValue/GetMarketSourceForMultiLingUpdate',
//                        params: {
//                            id: marketSourceId,
//                            languageId: user_language
//                        }
//                    });
                }
            },
            'button[action="addMarketSource"]': {
                click: function () {
                    Ext.create('widget.marketsourcemanage', { marketSourceId: 0 });
                }
            },
            'button[action="saveMarketSource"]': {
                click: function () {
                    if (Ext.getCmp('addMarketSource').getForm().isValid()) {
                        var marketSourceId = Ext.getCmp('addMarketSource').getForm().findField('MarketSourceId').getValue();

                        var urlMarketSource = "";
                        if (marketSourceId == 0) {
                            urlMarketSource = webAPI_path + 'api/MasterValue/AddMarketSource';
                            Ext.getCmp('addMarketSource').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addMarketSource').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            urlMarketSource = webAPI_path + 'api/MasterValue/UpdateMarketSource';
                            Ext.getCmp('addMarketSource').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addMarketSource').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('addMarketSource').getForm().submit({
                            url: urlMarketSource,
                            type: 'POST',
                            params: Ext.getCmp('addMarketSource').getForm().getValues(),

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
                                    Ext.getStore('mastervalues.MarketSourceStore').reload();
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
            'marketsourcelang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {
                    var marketSourceId = Ext.getCmp('addMarketSource').getForm().findField('MarketSourceId').getValue();
                    Ext.getCmp('marketSourceLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/MasterValue/GetMarketSourceForMultiLingUpdate',
                        params: {
                            id: marketSourceId,
                            languageId: records[0].data.LanguageId
                        }
                    });
                }
            },
            'marketsourcelang button[action="saveMarketSourceLang"]': {
                click: function () {
                    if (Ext.getCmp('marketSourceLang').getForm().isValid()) {
                        //var marketSourceId = Ext.getCmp('addMarketSource').getForm().findField('MarketSourceId').getValue();
                        Ext.getCmp('marketSourceLang').getForm().submit({
                            url: webAPI_path + 'api/MasterValue/UpdateMarketSourceMultiLangDetail',
                            type: 'POST',
                            params: Ext.getCmp('marketSourceLang').getForm().getValues(),
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
                                            Ext.getStore('mastervalues.MarketSourceStore').reload();
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
    MarketSourceEdit: function (rec) {
        var editMarketSource = Ext.create('widget.marketsourcemanage', { marketSourceId: rec.data.MarketSourceId });
        editMarketSource.setTitle('Add Market Source_Title'.l('SC21210'));

        Ext.getCmp('addMarketSource').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/MasterValue/GetMarketSourceForUpdate',
            params: {
                id: rec.data.MarketSourceId,
                languageId: user_language
            }
        });
    },
    MarketSourceDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/MasterValue/RemoveMarketSource',
                    type: "GET",
                    params: { id: rec.data.MarketSourceId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            Ext.getStore('mastervalues.MarketSourceStore').loadPage(1);
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