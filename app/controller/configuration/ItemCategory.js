Ext.define('Regardz.controller.configuration.ItemCategory', {
    extend: 'Ext.app.Controller',
    views: ['configuration.ItemCategoryList', 'configuration.ItemCategoryManage', 'configuration.ItemCategoryLang'],
    stores: ['configuration.ItemCategoryStore', 'common.LanguageListStore'],

    refs: [{
        ref: 'ItemCategoryManage',
        selector: 'ItemCategoryManage'
    }, {
        ref: 'ItemCategoryLang',
        selector: 'ItemCategoryLang'
    }],

    init: function () {

        this.control(
        {
            'itemcategorylist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'ItemCategoryEdit')
                        this.ItemCategoryEdit(zRec);
                    else if (fieldName == 'ItemCategoryDelete')
                        this.ItemCategoryDelete(zRec);
                }
            },
            'itemcategorymanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var me = this;
                    //var itemCategoryId = Ext.getCmp('additemcategory').getForm().findField('ItemCategoryId').getValue();
                    Ext.create('widget.itemcategorylang');
//                    Ext.getCmp('itemCategoryLang').getForm().load({
//                        method: 'GET',
//                        url: webAPI_path + 'api/ConfigItem/GetItemCategoryForMultiLingUpdate',
//                        params: {
//                            id: itemCategoryId,
//                            languageId: user_language
//                        }
//                    });
                }
            },
            'button[action="addItemCategory"]': {
                click: function () {
                    Ext.create('widget.itemcategorymanage', { itemCategoryId: 0 });
                }
            },
            'button[action="saveItemCategory"]': {
                click: function () {
                    if (Ext.getCmp('additemcategory').getForm().isValid()) {
                        var itemCategoryId = Ext.getCmp('additemcategory').getForm().findField('ItemCategoryId').getValue();

                        var urlItemCat = "";
                        if (itemCategoryId == 0) {
                            urlItemCat = webAPI_path + 'api/ConfigItem/AddItemCategory';
                            Ext.getCmp('additemcategory').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('additemcategory').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            urlItemCat = webAPI_path + 'api/ConfigItem/UpdateItemCategory';
                            Ext.getCmp('additemcategory').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('additemcategory').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('additemcategory').getForm().submit({
                            url: urlItemCat,
                            type: 'POST',
                            params: Ext.getCmp('additemcategory').getForm().getValues(),
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
                                    Ext.getStore('configuration.ItemCategoryStore').reload();
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function (form, response) {
                                r = response.result;
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
            'itemcategorylang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {               
                    var itemCategoryId = Ext.getCmp('additemcategory').getForm().findField('ItemCategoryId').getValue();
                    Ext.getCmp('itemCategoryLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/ConfigItem/GetItemCategoryForMultiLingUpdate',
                        params: {
                            id: itemCategoryId,
                            languageId: records[0].data.LanguageId
                        }
                    });
                }
            },
            'itemcategorylang button[action="saveItemCategoryLang"]': {
                click: function () {
                    if (Ext.getCmp('itemCategoryLang').getForm().isValid()) {
                        Ext.getCmp('itemCategoryLang').getForm().submit({
                            url: webAPI_path + 'api/ConfigItem/UpdateItemCategoryMultiLangDetail',
                            type: 'POST',
                            data: Ext.getCmp('itemCategoryLang').getForm().getValues(),
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
                                            Ext.getStore('configuration.ItemCategoryStore').reload();
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
                                r = response.result;
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
    ItemCategoryEdit: function (rec) {
        var edititemcategory = Ext.create('widget.itemcategorymanage', { itemCategoryId: rec.data.ItemCategoryId });
        edititemcategory.setTitle('Update Item Category_Title'.l('SC20410'));
        Ext.getCmp('additemcategory').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/ConfigItem/GetItemCategoryForUpdate',
            params: {
                id: rec.data.ItemCategoryId,
                languageId: user_language
            }
        });
    },
    ItemCategoryDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/ConfigItem/RemoveItemCategory',
                    type: "GET",
                    params: { id: rec.data.ItemCategoryId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            Ext.getStore('configuration.ItemCategoryStore').loadPage(1);
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