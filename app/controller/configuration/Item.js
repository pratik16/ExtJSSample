Ext.define('Regardz.controller.configuration.Item', {
    extend: 'Ext.app.Controller',
    views: ['configuration.ItemList', 'configuration.ItemManage', 'configuration.ItemLang', 'configuration.ItemPriceType', 'configuration.MenuItemList', 'configuration.MenuItemManage', 'configuration.MenuItemLang', 'configuration.MenuItemListWindow'],
    stores: ['configuration.ItemStore', 'common.LanguageListStore', 'configuration.EventsListStore', 'configuration.ItemPriceTypeStore', 'common.ItemTypeStore', 'common.ItemCategoryStore', 'configuration.MenuItemStore', 'common.LanguageListStore'],

    refs: [{
        ref: 'ItemManage',
        selector: 'ItemManage'
    }, {
        ref: 'ItemLang',
        selector: 'ItemLang'
    }],


    MenuItemController: false,

    init: function () {

        this.control(
        {
            'itemlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'ItemEdit')
                        this.ItemEdit(zRec);
                    else if (fieldName == 'ItemDelete')
                        this.ItemDelete(zRec);
                    else if (fieldName == 'AddMenu')
                        this.AddMenu(zRec);
                    else if (fieldName == 'ItemPricetype')
                        this.ItemPricetype(zRec);
                }
            },
            'itemmanage': {
                afterrender: function () {
                    Ext.getStore('common.ItemTypeStore').proxy.setExtraParam('id', user_language);
                    Ext.getStore('common.ItemTypeStore').load();

                    Ext.getStore('common.ItemCategoryStore').proxy.setExtraParam('id', user_language);
                    Ext.getStore('common.ItemCategoryStore').load();
                }
            },
            'itemmanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var me = this;
                    //var itemId = Ext.getCmp('additem').getForm().findField('ItemId').getValue();

                    var btnCmp = Ext.ComponentQuery.query('[itemid="langButton"]')[0];
                    var langWin = Ext.create('widget.itemlang');
                    langWin.alignTo(btnCmp, "br?", [-5, -5]);
                    //.animate({ from: btnCmp, to: btnCmp, duration: 5000, easing: 'elasticOut' })

                    //                    Ext.getCmp('itemLang').getForm().load({
                    //                        method: 'GET',
                    //                        url: webAPI_path + 'api/ConfigItem/GetItemForMultiLingUpdate',
                    //                        params: {
                    //                            id: itemId,
                    //                            languageId: user_language
                    //                        }
                    //                    });
                }
            },
            'button[action="addItem"]': {
                click: function () {
                    Ext.create('widget.itemmanage', { itemId: 0 });
                    this.getEvensList(0);
                }

            },
            'itemmanage checkbox[action="IsSoldPerson"]': {
                change: function (field, newVal, oldVal, eOpts) {
                    if (newVal == false) {
                        Ext.getCmp('additem').getForm().findField('Quantity').show();
                        Ext.getCmp('additem').getForm().findField('Quantity').allowBlank = false;
                        Ext.getCmp('additem').getForm().findField('Quantity').validate();

                    }
                    else {
                        Ext.getCmp('additem').getForm().findField('Quantity').hide();
                        Ext.getCmp('additem').getForm().findField('Quantity').allowBlank = true;

                    }
                }
            },
            'button[action="saveItem"]': {
                click: function () {
                    if (Ext.getCmp('additem').getForm().isValid()) {
                        var itemId = Ext.getCmp('additem').getForm().findField('ItemId').getValue();

                        var eventsList = Ext.getCmp('eventsList').getForm().getValues();

                        //                        var eventIds = [];
                        //                        Ext.each(eventsList, function (r) {
                        //                            eventIds += r.eventIds;
                        //                        });

                        var eventIds = '';
                        Ext.each(eventsList, function (r) {
                            if (eventIds == '') {
                                eventIds = r.eventIds2;
                            }
                            else {
                                eventIds += ',' + r.eventIds2;
                            }
                        });


                        var urlItem = "";
                        if (itemId == 0) {
                            urlItem = webAPI_path + 'api/ConfigItem/AddItem';

                            Ext.getCmp('additem').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('additem').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            urlItem = webAPI_path + 'api/ConfigItem/UpdateItem';
                            Ext.getCmp('additem').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('additem').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('additem').getForm().findField('eventIds').setValue(eventIds);
                        var addItemData = Ext.getCmp('additem').getForm().getValues();



                        Ext.getCmp('additem').getForm().submit({
                            url: urlItem,
                            type: 'POST',
                            params: addItemData,
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
                                    display_alert('MG00000'); //Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                    Ext.getStore('configuration.ItemStore').reload();
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
            'itemlang combobox[name=LanguageId]': {
                //change: function (t, newValue, oldValue) {//t => this                
                select: function (combo, records, eOpt) {
                    var itemId = Ext.getCmp('additem').getForm().findField('ItemId').getValue();
                    Ext.getCmp('itemLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/ConfigItem/GetItemForMultiLingUpdate',
                        params: {
                            id: itemId,
                            languageId: records[0].data.LanguageId
                        }
                    });
                }
            },
            'itemlang button[action="saveItemLang"]': {
                click: function () {
                    if (Ext.getCmp('itemLang').getForm().isValid()) {
                        Ext.getCmp('itemLang').getForm().submit({
                            url: webAPI_path + 'api/ConfigItem/UpdateItemMultiLangDetail',
                            type: 'POST',
                            params: Ext.getCmp('itemLang').getForm().getValues(),
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
                                            Ext.getStore('configuration.ItemStore').reload();
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
            },
            'itempricetype button[action="saveItemPriceType"]': {
                click: function () {
                    if (Ext.getCmp('addItemPriceType').getForm().isValid()) {
                        Ext.getCmp('addItemPriceType').getForm().submit({
                            url: webAPI_path + 'api/ConfigItem/ManageItemPriceType',
                            type: 'POST',
                            params: Ext.getCmp('addItemPriceType').getForm().getValues(),
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
            'menuitemlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'MenuItemEdit')
                        this.MenuItemEdit(zRec);
                    else if (fieldName == 'MenuItemDelete')
                        this.MenuItemDelete(zRec);
                }
            },
            'menuitemmanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var me = this;
                    //var menuItemId = Ext.getCmp('addmenuitem').getForm().findField('MenuItemId').getValue();
                    Ext.create('widget.menuitemlang');
                    //                    Ext.getCmp('menuItemLang').getForm().load({
                    //                        method: 'GET',
                    //                        url: webAPI_path + 'api/ConfigItem/GetMenuItemForMultiLingUpdate',
                    //                        params: {
                    //                            id: menuItemId,
                    //                            languageId: user_language
                    //                        }
                    //                    });
                }
            },
            'button[action="addMenuItem"]': {
                click: function () {
                    var itemID = Ext.getCmp('itemID').value;
                    var itemNAME = Ext.getCmp('itemNAME').value;
                    Ext.create('widget.menuitemmanage', { menuItemId: 0, itemId: itemID, itemName: itemNAME }).center();
                }
            },
            'button[action="saveMenuItem"]': {
                click: function () {
                    if (Ext.getCmp('addmenuitem').getForm().isValid()) {
                        var menuItemId = Ext.getCmp('addmenuitem').getForm().findField('MenuItemId').getValue();

                        var urlMenuItem = "";
                        if (menuItemId == 0) {
                            urlMenuItem = webAPI_path + 'api/ConfigItem/AddMenuItem';
                            Ext.getCmp('addmenuitem').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addmenuitem').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            urlMenuItem = webAPI_path + 'api/ConfigItem/UpdateMenuItem';
                            Ext.getCmp('addmenuitem').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addmenuitem').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('addmenuitem').getForm().submit({
                            url: urlMenuItem,
                            type: 'POST',
                            params: Ext.getCmp('addmenuitem').getForm().getValues(),
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
                                    Ext.getStore('configuration.MenuItemStore').reload();
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
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
                                ////Get Active Window and close It first
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close();
                                }
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
            },
            'menuitemlang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {
                    var menuItemId = Ext.getCmp('addmenuitem').getForm().findField('MenuItemId').getValue();
                    Ext.getCmp('menuItemLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/ConfigItem/GetMenuItemForMultiLingUpdate',
                        params: {
                            id: menuItemId,
                            languageId: records[0].data.LanguageId
                        }
                    });
                }
            },
            'menuitemlang button[action="saveMenuItemLang"]': {
                click: function () {
                    if (Ext.getCmp('menuItemLang').getForm().isValid()) {
                        Ext.getCmp('menuItemLang').getForm().submit({
                            url: webAPI_path + 'api/ConfigItem/UpdateMenuItemMultiLangDetail',
                            type: 'POST',
                            params: Ext.getCmp('menuItemLang').getForm().getValues(),
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
                                            Ext.getStore('configuration.MenuItemStore').reload();
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
                        });
                    }
                }
            }
        })

    },
    ItemEdit: function (rec) {
        var edititem = Ext.create('widget.itemmanage', { itemId: rec.data.ItemId });
        edititem.setTitle('Update Item_Title'.l('SC21910'));

        ///function call for get EventList By ItemId
        this.getEvensList(rec.data.ItemId);

        Ext.getCmp('additem').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/ConfigItem/GetItemForUpdate',
            params: {
                id: rec.data.ItemId,
                languageId: user_language
            }
        });
    },
    ItemDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/ConfigItem/RemoveItem',
                    type: "GET",
                    params: { id: rec.data.ItemId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            Ext.getStore('configuration.ItemStore').loadPage(1);
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Record not deleted.'.l('g'));
                    }
                });
            }
        })
    },
    AddMenu: function (rec) {
        if (rec.data.IsMenuItem == true) {
            this.loadStore(rec.data.ItemId, user_language);
            Ext.create('widget.menuitemlistwindow', { itemId: rec.data.ItemId, itemName: rec.data.ItemName }).center();
        }
    },
    ItemPricetype: function (rec) {

        var varItemId = 0;
        if (rec.data.ItemId > 0) {
            varItemId = rec.data.ItemId;
        }

        Ext.create('widget.itempricetype', { itemId: varItemId });
        Ext.getCmp('addItemPriceType').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/ConfigItem/GetItemPriceTypes',
            params: {
                id: varItemId,
                languageId: user_language
            }
        });
    },
    loadStore: function (ItemId, user_language) {
        Ext.getStore('configuration.MenuItemStore').proxy.setExtraParam('id', ItemId);
        Ext.getStore('configuration.MenuItemStore').load();
    },
    getEvensList: function (itemId) {

        if (typeof itemId == 'undefined')
            itemId = 0;

        Ext.getStore('configuration.EventsListStore').load({
            params: {
                'id': itemId,
                'languageId': user_language
            },
            callback: function (records, o, success) {
                var items = [];
                Ext.each(records, function (r) {
                    if (r.data.Checked == 1)
                        checked = true;
                    else
                        checked = false;

                    items.push({ name: 'eventIds2', style: 'white-space:nowrap', inputValue: r.data.EventId, padding: 5,
                        checked: checked,
                        boxLabel: r.data.EventName
                    })

                });

                ///function call from common file
                //getEvensList: (items);
                // alert(items);
                var checkboxes = new Ext.form.CheckboxGroup({
                    padding: 5,
                    border: false,
                    //layout: 'fit',
                    columns: 2,
                    height: parseInt(Ext.getBody().getViewSize().height * (0.25)),
                    items: items
                });
                Ext.getCmp('eventsList').removeAll(true);
                Ext.getCmp('eventsList').add(checkboxes);
                Ext.getCmp('eventsList').doLayout();
            }
        })
    },
    MenuItemEdit: function (rec) {
        var editMenuItem = Ext.create('widget.menuitemmanage', { menuItemId: rec.data.MenuItemId, itemName: rec.data.ItemName });
        editMenuItem.setTitle('Update Menu Item'.l('SC21900'));
        Ext.getCmp('addmenuitem').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/ConfigItem/GetMenuItemForUpdate',
            params: {
                id: rec.data.MenuItemId,
                languageId: user_language
            }
        });
    },
    MenuItemDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/ConfigItem/RemoveMenuItem',
                    type: "GET",
                    params: { id: rec.data.MenuItemId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            Ext.getStore('configuration.MenuItemStore').loadPage(1);
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Record not deleted.'.l('g'));
                    }
                });
            }
        });
    }
});