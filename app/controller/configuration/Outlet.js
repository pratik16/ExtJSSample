Ext.define('Regardz.controller.configuration.Outlet', {
    extend: 'Ext.app.Controller',
    views: ['configuration.OutletList', 'configuration.OutletManage', 'configuration.OutletLang'],
    stores: ['configuration.OutletStore'],

    refs: [{
        ref: 'OutletManage',
        selector: 'OutletManage'
    }, {
        ref: 'OutletLang',
        selector: 'OutletLang'
    }],

    init: function () {

        this.control(
        {
            'outletlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'OutletEdit')
                        this.OutletEdit(zRec);
                    else if (fieldName == 'OutletDelete')
                        this.OutletDelete(zRec);
                }
            },
            'outletmanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var me = this;
                    //var outletId = Ext.getCmp('addOutlet').getForm().findField('OutletId').getValue();
                    Ext.create('widget.outletlang');
//                    Ext.getCmp('outletLang').getForm().load({
//                        method: 'GET',
//                        url: webAPI_path + 'api/ConfigOutlet/GetOutletForMultiLingUpdate',
//                        params: {
//                            id: outletId,
//                            languageId: user_language
//                        }
//                    });
                }
            },
            'button[action="addOutlet"]': {
                click: function () {
                    Ext.create('widget.outletmanage', { outletId: 0 });
                }
            },
            'button[action="saveOutlet"]': {
                click: function () {
                    if (Ext.getCmp('addOutlet').getForm().isValid()) {
                        var outletId = Ext.getCmp('addOutlet').getForm().findField('OutletId').getValue();

                        var urlOutlet = "";
                        if (outletId == 0) {
                            urlOutlet = webAPI_path + 'api/ConfigOutlet/AddOutlet';
                            Ext.getCmp('addOutlet').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addOutlet').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            urlOutlet = webAPI_path + 'api/ConfigOutlet/UpdateOutlet';
                            Ext.getCmp('addOutlet').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addOutlet').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('addOutlet').getForm().submit({
                            url: urlOutlet,
                            type: 'POST',
                            params: Ext.getCmp('addOutlet').getForm().getValues(),
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
                                    Ext.getStore('configuration.OutletStore').reload();
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
            'outletlang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {               
                    var outletId = Ext.getCmp('addOutlet').getForm().findField('OutletId').getValue();
                    Ext.getCmp('outletLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/ConfigOutlet/GetOutletForMultiLingUpdate',
                        params: {
                            id: outletId,
                            languageId: records[0].data.LanguageId
                        }
                    });
                }
            },
            'outletlang button[action="saveOutletLang"]': {
                click: function () {
                    if (Ext.getCmp('outletLang').getForm().isValid()) {
                        Ext.getCmp('outletLang').getForm().submit({
                            url: webAPI_path + 'api/ConfigOutlet/UpdateOutletMultiLangDetail',
                            type: 'POST',
                            params: Ext.getCmp('outletLang').getForm().getValues(),
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
                                            Ext.getStore('configuration.OutletStore').reload();
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
    OutletEdit: function (rec) {
        var outletMgt = Ext.create('widget.outletmanage', { outletId: rec.data.OutletId });
        outletMgt.setTitle('Update Outlet_Title'.l('SC20810'));
        Ext.getCmp('addOutlet').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/ConfigOutlet/GetOutletForUpdate',
            params: {
                id: rec.data.OutletId,
                languageId: user_language
            }
        });
    },
    OutletDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/ConfigOutlet/RemoveOutlet',
                    type: "GET",
                    params: { id: rec.data.OutletId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            Ext.getStore('configuration.OutletStore').loadPage(1);
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