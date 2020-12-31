Ext.define('Regardz.controller.mastervalues.AddressType', {
    extend: 'Ext.app.Controller',
    views: ['mastervalues.AddressTypeList', 'mastervalues.AddressTypeManage', 'mastervalues.AddressTypeLang'],
    stores: ['mastervalues.AddressTypeStore', 'common.LanguageListStore'],

    refs: [{
        ref: 'AddressTypeManage',
        selector: 'AddressTypeManage'
    }, {
        ref: 'AddressTypeLang',
        selector: 'AddressTypeLang'
    }],

    init: function () {

        this.control(
        {
            'addresstypelist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'AddressTypeEdit')
                        this.AddressTypeEdit(zRec);
                    else if (fieldName == 'AddressTypeDelete')
                        this.AddressTypeDelete(zRec);
                }
            },
            'addresstypemanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var me = this;
                  //  var addressTypeId = Ext.getCmp('addAddressType').getForm().findField('AddressTypeId').getValue();
                    Ext.create('widget.addresstypelang');
//                    Ext.getCmp('addressTypeLang').getForm().load({
//                        method: 'GET',
//                        url: webAPI_path + 'api/MasterValue/GetAddressTypeForMultiLingUpdate',
//                        params: {
//                            id: addressTypeId,
//                            languageId: user_language
//                        }
//                    });
                }
            },
            'button[action="addAddressType"]': {
                click: function () {
                    Ext.create('widget.addresstypemanage', { addressTypeId: 0 });
                }
            },
            'button[action="saveAddressType"]': {
                click: function () {
                    if (Ext.getCmp('addAddressType').getForm().isValid()) {
                        var addressTypeId = Ext.getCmp('addAddressType').getForm().findField('AddressTypeId').getValue();

                        var urlAddressType = "";
                        if (addressTypeId == 0) {
                            urlAddressType = webAPI_path + 'api/MasterValue/AddAddressType';
                            Ext.getCmp('addAddressType').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addAddressType').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            urlAddressType = webAPI_path + 'api/MasterValue/UpdateAddressType';
                            Ext.getCmp('addAddressType').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addAddressType').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('addAddressType').getForm().submit({
                            url: urlAddressType,
                            type: 'POST',
                            params: Ext.getCmp('addAddressType').getForm().getValues(),
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
                                    Ext.getStore('mastervalues.AddressTypeStore').reload();
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
            'addresstypelang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {
                    var addressTypeId = Ext.getCmp('addAddressType').getForm().findField('AddressTypeId').getValue();
                    Ext.getCmp('addressTypeLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/MasterValue/GetAddressTypeForMultiLingUpdate',
                        params: {
                            id: addressTypeId,
                            languageId: records[0].data.LanguageId
                        }
                    });
                }
            },
            'addresstypelang button[action="saveAddressTypeLang"]': {
                click: function () {
                    if (Ext.getCmp('addressTypeLang').getForm().isValid()) {
                        //var AddressTypeId = Ext.getCmp('addAddressType').getForm().findField('AddressTypeId').getValue();
                        Ext.getCmp('addressTypeLang').getForm().submit({
                            url: webAPI_path + 'api/MasterValue/UpdateAddressTypeMultiLangDetail',
                            type: 'POST',
                            params: Ext.getCmp('addressTypeLang').getForm().getValues(),
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
                                            Ext.getStore('mastervalues.AddressTypeStore').reload();
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
    AddressTypeEdit: function (rec) {
        var editAddressType = Ext.create('widget.addresstypemanage', { addressTypeId: rec.data.AddressTypeId });
        editAddressType.setTitle('Update AddressType_Title'.l('SC21510'));

        Ext.getCmp('addAddressType').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/MasterValue/GetAddressTypeForUpdate',
            params: {
                id: rec.data.AddressTypeId,
                languageId: user_language
            }
        });
    },
    AddressTypeDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/MasterValue/RemoveAddressType',
                    type: "GET",
                    params: { id: rec.data.AddressTypeId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            Ext.getStore('mastervalues.AddressTypeStore').loadPage(1);
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