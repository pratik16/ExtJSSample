///*Minified by P*/
Ext.define('Regardz.controller.configuration.ItemType', {
    extend: 'Ext.app.Controller',
    views: ['configuration.ItemTypeList', 'configuration.ItemTypeManage', 'configuration.ItemTypeLang'],
    stores: ['configuration.ItemTypeStore', 'common.LanguageListStore', 'configuration.SubDepartmentManageStore'],
    refs: [{
        ref: 'ItemTypeManage',
        selector: 'ItemTypeManage'
    }, {
        ref: 'ItemTypeLang',
        selector: 'ItemTypeLang'
    }
	],
    init: function () {
        this.control({
            'itemtypelist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'ItemTypeEdit')
                        this.ItemTypeEdit(zRec);
                    else if (fieldName == 'ItemTypeDelete')
                        this.ItemTypeDelete(zRec)
                }
            },
            'itemtypemanage': {
                afterrender: function () {
                    var c = Ext.ComponentQuery.query('combo[action="ItemTypeManage_VatRateId"]')[0];
                    c.getStore().load();

                    var c = Ext.ComponentQuery.query('combo[action="ItemTypeManage_DepartmentId"]')[0];
                    c.getStore().load();

                    var departmentId = Ext.getCmp('additemtype').getForm().findField('DepartmentId').getValue();
                    Ext.getStore('configuration.SubDepartmentManageStore').proxy.setExtraParam('id', departmentId);
                    Ext.getStore('configuration.SubDepartmentManageStore').proxy.setExtraParam('languageId', user_language);
                    if (departmentId > 0)
                        Ext.getStore('configuration.SubDepartmentManageStore').load()
                }
            },
            'itemtypemanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {
                    var me = this;
                    Ext.create('widget.itemtypelang');
                }
            },
            'button[action="addItemType"]': {
                click: function () {
                    Ext.create('widget.itemtypemanage', {
                        itemTypeId: 0
                    });
                    Ext.getStore('configuration.SubDepartmentManageStore').removeAll()
                }
            },
            'button[action="saveItemType"]': {
                click: function () {
                    if (Ext.getCmp('additemtype').getForm().isValid()) {
                        var itemTypeId = Ext.getCmp('additemtype').getForm().findField('ItemTypeId').getValue();
                        var urlItemType = "";
                        if (itemTypeId == 0) {
                            urlItemType = webAPI_path + 'api/ConfigItem/AddItemType';
                            Ext.getCmp('additemtype').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('additemtype').getForm().findField('CreatedBy').setValue(CurrentSessionUserId)
                        } else {
                            urlItemType = webAPI_path + 'api/ConfigItem/UpdateItemType';
                            Ext.getCmp('additemtype').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('additemtype').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId)
                        }
                        Ext.getCmp('additemtype').getForm().submit({
                            url: urlItemType,
                            type: 'POST',
                            params: Ext.getCmp('additemtype').getForm().getValues(),
                            success: function (form, response) {
                                var r = response.result;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close()
                                }
                                if (r.success == true) {
                                    display_alert('MG00000');
                                    Ext.getStore('configuration.ItemTypeStore').reload()
                                } else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText)
                                }
                            },
                            failure: function (form, response) {
                                var r = response.result;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == false) {
                                    Ext.Msg.alert('Error'.l('g'), ResultText)
                                } else {
                                    Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'))
                                }
                            }
                        })
                    }
                }
            },
            'itemtypelang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {
                    var itemTypeId = Ext.getCmp('additemtype').getForm().findField('ItemTypeId').getValue();
                    Ext.getCmp('itemTypeLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/ConfigItem/GetItemTypeForMultiLingUpdate',
                        params: {
                            id: itemTypeId,
                            languageId: records[0].data.LanguageId
                        }
                    })
                }
            },
            'itemtypemanage combobox[name=DepartmentId]': {
                change: function (t, newValue, oldValue) {
                    var departmentId = Ext.getCmp('additemtype').getForm().findField('DepartmentId').getValue();
                    Ext.getStore('configuration.SubDepartmentManageStore').proxy.setExtraParam('id', departmentId);
                    Ext.getStore('configuration.SubDepartmentManageStore').proxy.setExtraParam('languageId', user_language);
                    Ext.getStore('configuration.SubDepartmentManageStore').load()
                }
            },
            'itemtypelang button[action="saveItemTypeLang"]': {
                click: function () {
                    if (Ext.getCmp('itemTypeLang').getForm().isValid()) {
                        Ext.getCmp('itemTypeLang').getForm().submit({
                            url: webAPI_path + 'api/ConfigItem/UpdateItemTypeMultiLangDetail',
                            type: 'POST',
                            params: Ext.getCmp('itemTypeLang').getForm().getValues(),
                            success: function (form, response) {
                                var r = response.result;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close()
                                }
                                if (r.success == true) {
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            display_alert('MG00000');
                                            Ext.getStore('configuration.ItemTypeStore').reload()
                                        }
                                    })
                                } else {
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            Ext.Msg.alert('Error'.l('g'), ResultText)
                                        }
                                    })
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
                                            Ext.Msg.alert('Error'.l('g'), ResultText)
                                        }
                                    })
                                } else {
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'))
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            }
        })
    },
    ItemTypeEdit: function (rec) {
        var edititem = Ext.create('widget.itemtypemanage', {
            itemTypeId: rec.data.ItemTypeId
        });
        edititem.setTitle('Update Item Type_Title'.l('SC20510'));
        Ext.getCmp('additemtype').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/ConfigItem/GetItemTypeForUpdate',
            params: {
                id: rec.data.ItemTypeId,
                languageId: user_language
            }
        })
    },
    ItemTypeDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/ConfigItem/RemoveItemType',
                    type: "GET",
                    params: {
                        id: rec.data.ItemTypeId
                    },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040');
                            Ext.getStore('configuration.ItemTypeStore').loadPage(1)
                        } else {
                            Ext.Msg.alert('Error'.l('g'), ResultText)
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Record not deleted.'.l('g'))
                    }
                })
            }
        })
    }
});