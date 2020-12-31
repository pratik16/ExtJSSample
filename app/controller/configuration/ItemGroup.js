var isSoldPerPersonBit = false;
Ext.define('Regardz.controller.configuration.ItemGroup', {
    extend: 'Ext.app.Controller',
    views: ['configuration.ItemGroupList', 'configuration.ItemGroupManage', 'configuration.ItemGroupLang'],
    stores: ['configuration.ItemGroupStore', 'common.LanguageListStore', 'configuration.ItemListStore', 'configuration.EventsListForItemGroupStore', 'common.ItemCategoryStore'],

    refs: [{
        ref: 'ItemGroupManage',
        selector: 'ItemGroupManage'
    }, {
        ref: 'ItemGroupLang',
        selector: 'ItemGroupLang'
    }],

    init: function () {

        this.control(
        {
            'itemgrouplist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'ItemGroupEdit')
                        this.ItemGroupEdit(zRec);
                    else if (fieldName == 'ItemGroupDelete')
                        this.ItemGroupDelete(zRec);
                }
            },
            'itemgroupmanage': {
                afterrender: function () {
                    Ext.getStore('common.ItemCategoryStore').proxy.setExtraParam('id', user_language);
                    Ext.getStore('common.ItemCategoryStore').load();
                }
            },
            'itemgroupmanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var me = this;
                    //var ItemGroupId = Ext.getCmp('addItemGroup').getForm().findField('ItemGroupId').getValue();
                    Ext.create('widget.itemgrouplang');
                    //                    Ext.getCmp('itemGroupLang').getForm().load({
                    //                        method: 'GET',
                    //                        url: webAPI_path + 'api/ConfigItemGroup/GetItemGroupForMultiLingUpdate',
                    //                        params: {
                    //                            id: ItemGroupId,
                    //                            languageId: user_language
                    //                        }
                    //                    });
                }
            },
            'button[action="addItemGroup"]': {
                click: function () {
                    Ext.create('widget.itemgroupmanage', { ItemGroupId: 0 });

                    this.getItemList(0, false);
                    this.getEventList(0);
                }
            },
            'itemgroupmanage checkbox[action="is_checked"]': {
                change: function (t, n, o, eo) {//Ext.form.field.Field this, Object newValue, Object oldValue, Object eOpts 
                    //if (Ext.getCmp('addItemGroup').getForm().findField('ItemGroupId').getValue() > 0) return;
                    if (isSoldPerPersonBit) { isSoldPerPersonBit = false; return; }

                    if (n == true)
                        this.getItemList(0, true);
                    else
                        this.getItemList(0, false);
                }
            },
            'button[action="saveItemGroup"]': {
                click: function () {
                    if (Ext.getCmp('addItemGroup').getForm().isValid()) {
                        var ItemGroupId = Ext.getCmp('addItemGroup').getForm().findField('ItemGroupId').getValue();
                        var eventsList = Ext.getCmp('eventsList').getForm().getValues();

                        var eventIds = '';
                        Ext.each(eventsList, function (r) {
                            if (eventIds == '') {
                                eventIds = r.eventIds2;
                            }
                            else {
                                eventIds += ',' + r.eventIds2;
                            }
                        });

                        var itemList = Ext.getCmp('itemList').getForm().getValues();

                        var itemIds = '';
                        Ext.each(itemList, function (r) {
                            if (itemIds == '') {
                                itemIds = r.itemIds2;
                            }
                            else {
                                itemIds += ',' + r.itemIds2;
                            }
                        });


                        var urlItemGroup = "";
                        if (ItemGroupId == 0) {
                            urlItemGroup = webAPI_path + 'api/ConfigItemGroup/AddItemGroup';
                            Ext.getCmp('addItemGroup').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addItemGroup').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            urlItemGroup = webAPI_path + 'api/ConfigItemGroup/UpdateItemGroup';
                            Ext.getCmp('addItemGroup').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addItemGroup').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('addItemGroup').getForm().findField('eventIds').setValue(eventIds);
                        Ext.getCmp('addItemGroup').getForm().findField('itemIds').setValue(itemIds);

                        var itemGroup = Ext.getCmp('addItemGroup').getForm().getValues();


                        Ext.getCmp('addItemGroup').getForm().submit({
                            url: urlItemGroup,
                            type: 'POST',
                            params: itemGroup,
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
                                    Ext.getStore('configuration.ItemGroupStore').reload();
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
            'itemgrouplang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {
                    var ItemGroupId = Ext.getCmp('addItemGroup').getForm().findField('ItemGroupId').getValue();
                    Ext.getCmp('itemGroupLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/ConfigItemGroup/GetItemGroupForMultiLingUpdate',
                        params: {
                            id: ItemGroupId,
                            languageId: records[0].data.LanguageId
                        }
                    });
                }
            },
            'itemgrouplang button[action="saveItemGroupLang"]': {
                click: function () {
                    if (Ext.getCmp('itemGroupLang').getForm().isValid()) {
                        Ext.getCmp('itemGroupLang').getForm().submit({
                            url: webAPI_path + 'api/ConfigItemGroup/UpdateItemGroupMultiLangDetail',
                            type: 'POST',
                            params: Ext.getCmp('itemGroupLang').getForm().getValues(),
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
                                            Ext.getStore('configuration.ItemGroupStore').reload();
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
    ItemGroupEdit: function (rec) {
        var edititem = Ext.create('widget.itemgroupmanage', { ItemGroupId: rec.data.ItemGroupId });
        edititem.setTitle('Update Item Group_Title'.l('SC23510'));

        if (rec.data.IsSoldPerPersonOrQuantity) isSoldPerPersonBit = true;
        this.getItemList(rec.data.ItemGroupId, rec.data.IsSoldPerPersonOrQuantity);
        this.getEventList(rec.data.ItemGroupId);

        Ext.getCmp('addItemGroup').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/ConfigItemGroup/GetItemGroupForUpdate',
            params: {
                id: rec.data.ItemGroupId,
                languageId: user_language
            }
        });
    },
    ItemGroupDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/ConfigItemGroup/RemoveItemGroup',
                    type: "GET",
                    params: { id: rec.data.ItemGroupId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            Ext.getStore('configuration.ItemGroupStore').loadPage(1);
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
    },
    getItemList: function (itemGroupId, isSoldPerPersonOrQuantity) {
        if (typeof itemGroupId == 'undefined')
            itemGroupId = 0;

        Ext.getStore('configuration.ItemListStore').load({
            params: {
                'id': itemGroupId,
                'languageId': user_language,
                'isSoldPerPerson': isSoldPerPersonOrQuantity
            },
            callback: function (records, o, success) {
                var items = [];
                Ext.each(records, function (r) {
                    if (r.data.Checked == 1)
                        checked = true;
                    else
                        checked = false;

                    items.push({ name: 'itemIds2', style: 'white-space:nowrap', inputValue: r.data.ItemId, padding: 5,
                        checked: checked,
                        boxLabel: r.data.ItemName
                    })
                });

                var checkboxes = new Ext.form.CheckboxGroup({
                    padding: 5,
                    allowBlank: false,
                    border: false,
                    columns: 2,
                    height: parseInt(Ext.getBody().getViewSize().height * (0.20)),
                    items: items
                });

                Ext.getCmp('itemList').removeAll(true);
                Ext.getCmp('itemList').add(checkboxes);
                Ext.getCmp('itemList').doLayout();
            }
        })
    },
    getEventList: function (ItemGroupId) {
        if (typeof ItemGroupId == 'undefined')
            ItemGroupId = 0;

        Ext.getStore('configuration.EventsListForItemGroupStore').load({
            params: {
                'id': ItemGroupId,
                'languageId': user_language
            },
            callback: function (records, o, success) {
                var items = [];
                Ext.each(records, function (r) {
                    if (r.data.Checked == 1)
                        checked = true;
                    else
                        checked = false;

                    items.push({ name: 'eventIds2', inputValue: r.data.EventId, padding: 5,
                        checked: checked,
                        boxLabel: r.data.EventName
                    })

                });

                ///function call from common file
                //getEvensList: (items);

                var checkboxes = new Ext.form.CheckboxGroup({
                    padding: 5,
                    allowBlank: false,
                    border: false,
                    columns: 2,
                    height: parseInt(Ext.getBody().getViewSize().height * (0.20)),
                    items: items
                });
                Ext.getCmp('eventsList').removeAll(true);
                Ext.getCmp('eventsList').add(checkboxes);
                Ext.getCmp('eventsList').doLayout();
            }
        })
    }

});