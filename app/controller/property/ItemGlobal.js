Ext.define('Regardz.controller.property.ItemGlobal', {
    extend: 'Ext.app.Controller',
    views: ['property.ItemGlobalList', 'property.ItemExemptionPriceManage', 'property.PropertyGroupItemManage', 'property.ItemMenuList', 'property.ItemMenuManage', 'property.ItemMenuLang'],
    stores: ['property.ItemGlobalListStore', 'property.ItemCategoryComboListStore', 'property.PropertyGroupItemPriceListStore', 'property.ItemMenuListStore', 'common.LanguageListStore'],

    refs: [{
        ref: 'itemexemptionpricemanage',
        selector: 'itemexemptionpricemanage'
    }, {
        ref: 'propertygroupitemmanage',
        selector: 'propertygroupitemmanage'
    }, {
        ref: 'itemmenumanage',
        selector: 'itemmenumanage'
    }, {
        ref: 'propertyedit',
        selector: 'propertyedit'
    }, {
        ref: 'itemgloballist',
        selector: 'itemgloballist'
    }],
    init: function () {
        var me = this;

        this.control(
        {
            'itemgloballist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'addDeleteItem') { // add and delete icon is in same column
                        if (zRec.data.itemAction == "addnew") { //Add window action
                            if (zRec.data.ItemGroupId > 0) {
                                me.addNewGroupPrice(zRec.data, 'add');
                            }
                            else {
                                me.addNewItemPrice(zRec.data, 'add');
                            }
                        }
                        else if (zRec.data.itemAction == "delete") {
                            if (zRec.data.ItemGroupId > 0) {
                                me.deleteGroupItemPrice(zRec.data);  //group delete
                            }
                            else {
                                me.deleteItemPrice(zRec.data);  //item delete
                            }
                        }
                    }
                    else if (fieldName == 'editItem') {
                        if (zRec.data.ItemGroupId > 0 && zRec.data.StartDate != null) {
                            me.addNewGroupPrice(zRec.data, 'edit'); //group edit 
                        }
                        else if (zRec.data.StartDate == null) {
                            me.addItemMenu(zRec.data); // item edit 
                        }
                        else {
                            me.addNewItemPrice(zRec.data, 'edit'); // item edit 
                        }
                    }
                    else if (fieldName == 'cloneItem') {
                        if (zRec.data.ItemGroupId > 0) {
                            me.addNewGroupPrice(zRec.data, 'clone'); // group clone ////1 is for edit group; 2 is for clone group
                        }
                        else {
                            me.addNewItemPrice(zRec.data, 'clone'); // item clone
                        }
                    }
                    else if (fieldName == 'itemMenu') {
                        if (zRec.data.ItemGroupId > 0) {
                            me.addItemMenu(zRec.data);
                        }
                    }
                },
                afterrender: function () {
                    var categoryId = Ext.ComponentQuery.query('itemgloballist combo[name=categoryId]')[0];
                    categoryId.getStore().load({
                        callback: function (records, o, success) {
                            categoryId.getStore().insert(0, { "Name": "All Categories".l('SC33000'), "Id": 0 }, true);
                            categoryId.setValue(0);
                        }
                    });

                }
            },

            'itemgloballist button[action=searchItemList]': {
                click: function (t, e) {
                    me.filterItemPrice();

                }
            },

            'itemgloballist button[action=clearItemListFilter]': {
                click: function (t, e) {
                    me.clearItemListFilter();
                }
            },

            'itemgloballist checkbox[itemid=IsWithOutPrice]': {
                change: function (t, n, o, eo) {
                    me.filterItemPrice();
                }
            },

            'itemgloballist radiogroup[itemid=item_type]': {
                change: function (t, n, o, eo) {
                    me.filterItemPrice();
                }
            },

            'itemgloballist datefield[itemid=FromDate]': {
                change: function (t, n, o, eo) {
                    me.filterItemPrice();
                }
            },

            'itemgloballist datefield[itemid=ToDate]': {
                change: function (t, n, o, eo) {
                    me.filterItemPrice();
                }
            },

            'itemgloballist combo[itemid=categoryId]': {
                select: function (combo, records, eOpt) {
                    var Id = records[0].data.Id;

                    if (Id >= 0)
                        me.filterItemPrice();
                }
            },

            'itemgloballist textfield[itemid="SearchText"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {

                        var r = t.getValue();
                        me.filterItemPrice();
                    }
                }
            },
            'itemexemptionpricemanage button[action=saveItemExemptionPrice]': {
                click: function (t, e) {

                    var form = Ext.ComponentQuery.query('itemexemptionpricemanage form[itemid=manageItemExemption]')[0];

                    if (form.getForm().isValid()) {
                        var startDate = Ext.util.Format.date(form.getForm().findField('StartDate').getValue(), 'Y-m-d');
                        form.getForm().findField('StartDate').setValue(startDate);

                        var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();

                        form.getForm().findField('PropertyId').setValue(PropertyId);

                        var SubmitType = form.getForm().findField('SubmitType').getValue();

                        var posturl = null;
                        if (SubmitType == 'add' || SubmitType == 'clone') {
                            posturl = webAPI_path + 'api/ItemExemption/AddItemExceptionDetail';
                            form.getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            form.getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else if (SubmitType == 'edit') {
                            posturl = webAPI_path + 'api/ItemExemption/UpdateItemExceptionDetail';
                            form.getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            form.getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), 'Action is not identified!'.l('g'));
                            return false;
                        }
                        //t.rec.ExemptionIds

                        form.getForm().submit({
                            url: posturl,
                            method: 'POST',
                            //  data: propertyEdit,
                            success: function (form, response) {
                                var r = response.response.responseText;
                                var r = Ext.decode(r);

                                /*Commented as response text not came from API*/
                                if (r.success == true) {
                                    me.getItemexemptionpricemanage().close();
                                    Ext.getStore('property.ItemGlobalListStore').reload();
                                } else {
                                    if (r.result.substring(0, 4) == "SPC_")
                                        Ext.Msg.alert('Error'.l('g'), r.result.l("SP_DynamicCode"));
                                    else
                                        Ext.Msg.alert('Error'.l('g'), r.result);
                                }
                            },
                            failure: function (form, response) {
                                var r = response.response.responseText;
                                r = Ext.decode(r);
                                if (r.result.substring(0, 4) == "SPC_")
                                    Ext.Msg.alert('Error'.l('g'), r.result.l("SP_DynamicCode")); // 'Information not saved.');
                                else
                                    Ext.Msg.alert('Error'.l('g'), r.result); // 'Information not saved.');
                            }
                        })
                    }
                }
            },

            'propertygroupitemmanage': {
                afterrender: function (t, e) {

                    var StartDate = Ext.ComponentQuery.query('propertygroupitemmanage datefield[itemid="StartDate"]')[0];
                    StartDate = Ext.util.Format.date(StartDate.getValue(), 'Y-m-d');
                    var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    var grid = Ext.ComponentQuery.query('propertygroupitemmanage grid[itemid=ItemGroupGlobalList]')[0];
                    grid.getStore().proxy.setExtraParam('id', CurrentSessionUserId); //id = userid
                    grid.getStore().proxy.setExtraParam('id1', t.rec.ExemptionIds); //id1 = ItemGroupExemptionIds
                    grid.getStore().proxy.setExtraParam('id2', t.rec.ItemGroupId); //id2 = ItemGroupId
                    grid.getStore().proxy.setExtraParam('id3', PropertyId); //id3 = PropertyId
                    grid.getStore().proxy.setExtraParam('id4', null); //id4 = StartDate
                    grid.getStore().proxy.setExtraParam('id5', user_language); //id4 = StartDate

                    grid.getStore().removeAll();

                    if (t.type == 'add') {
                        // me.setItemGroupSummaryGrid();
                        // return false;
                        grid.getStore().proxy.setExtraParam('id4', null); //id4 = StartDate
                    }
                    else if (t.type == 'edit') {
                        grid.getStore().proxy.setExtraParam('id4', StartDate); //id4 = StartDate
                    }
                    else if (t.type == 'clone') {
                        grid.getStore().proxy.setExtraParam('id4', null); //id4 = StartDate
                    }

                    grid.getStore().load({
                        callback: function (records, o, success) {
                            me.setItemGroupSummaryGrid();

                        }
                    });
                }
            },

            'propertygroupitemmanage grid[itemid=ItemGroupGlobalList]': {
                edit: function (editor, e) {
                    me.setItemGroupSummaryGrid();
                }
            },
            'propertygroupitemmanage button[action=property_item_group_action]': {
                click: function (t, e) {
                    var grid = Ext.ComponentQuery.query('propertygroupitemmanage grid[itemid="ItemGroupGlobalList"]')[0];

                    //  var updatedData = grid.getStore().getUpdatedRecords();
                    var isFlag = false;
                    var alldata = grid.getStore().getRange();
                    var recordsToSend = [];

                    if (alldata.length > 0 && isFlag == false) {
                        Ext.each(alldata, function (rec) {
                            recordsToSend.push(rec.data);
                            if (rec.data.BarA <= 0 || rec.data.BarB <= 0 || rec.data.BarC <= 0 || rec.data.BarD <= 0) {
                                isFlag = true;
                                return false;
                            }
                        });
                    }

                    if (isFlag == true) {
                        display_alert('MG31147');
                        return false;
                    }
                    var StartDate = Ext.ComponentQuery.query('propertygroupitemmanage datefield[itemid="StartDate"]')[0];
                    startDate = Ext.util.Format.date(StartDate.getValue(), 'Y-m-d');

                    var ItemGroupId = Ext.ComponentQuery.query('propertygroupitemmanage hidden[itemid="ItemGroupId"]')[0];
                    ItemGroupId = ItemGroupId.getValue();

                    var ExemptionIds = Ext.ComponentQuery.query('propertygroupitemmanage hidden[itemid="ExemptionIds"]')[0];
                    ExemptionIds = ExemptionIds.getValue();

                    var newObj = new Object();
                    newObj.UserId = CurrentSessionUserId;
                    newObj.PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    newObj.ItemGroupId = ItemGroupId;
                    newObj.StartDate = startDate;
                    newObj.ExemptionIds = (ExemptionIds.length > 0) ? ExemptionIds : 0;
                    newObj.ItemGroupExemptionPriceDetailList = Ext.encode(recordsToSend);

                    //if clone or add then call add API otherwise call update API
                    var SubmitType = Ext.ComponentQuery.query('propertygroupitemmanage hidden[itemid="SubmitType"]')[0];
                    SubmitType = SubmitType.getValue();

                    var posturl = null;
                    if (SubmitType == 'add' || SubmitType == 'clone') {
                        posturl = webAPI_path + 'api/ItemExemption/AddItemGroupExemptionPrice';
                    }
                    else if (SubmitType == 'edit') {
                        posturl = webAPI_path + 'api/ItemExemption/UpdateItemGroupExemptionPrice';
                    }
                    else {
                        Ext.Msg.alert('Error'.l('g'), 'Action is not identified!'.l('g'));
                        return false;
                    }

                    Ext.Ajax.request({
                        url: posturl,
                        method: 'POST',
                        params: newObj,
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                me.getPropertygroupitemmanage().close();

                                Ext.getStore('property.ItemGlobalListStore').reload();
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function () {
                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        }
                    });
                }
            },

            'propertygroupitemmanage datefield[itemid=StartDate]': {
                change: function (t, n, o, eop) {
                    var SubmitType = Ext.ComponentQuery.query('propertygroupitemmanage hidden[itemid=SubmitType]')[0];
                    var SubmitType = SubmitType.getValue();

                    if (o == null && SubmitType == 'add') {
                        me.loadGroupItemData(n);
                    }
                    else {
                        me.loadOnlyGreyItems(n);
                    }
                }
            },

            'itemmenulist grid[itemid=menulist]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    //console.log(zRec.data);
                    if (fieldName == 'deleteMenuItem' && zRec.data.PropertyId != null)
                        me.deleteMenuItem(zRec.data);
                    else if (fieldName == 'editMenuItem' && zRec.data.PropertyId != null)
                        me.editMenuItem(zRec.data);
                    else if (fieldName == 'menuStatusChange')
                        me.menuStatusChange(zRec.data);

                },
                afterrender: function () {
                    var propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    var itemGroupId = Ext.ComponentQuery.query('itemmenulist hidden[itemid=itemGroupId]')[0];

                    Ext.getStore('property.ItemMenuListStore').proxy.setExtraParam('id', itemGroupId.getValue());
                    Ext.getStore('property.ItemMenuListStore').proxy.setExtraParam('id1', propertyId);
                    Ext.getStore('property.ItemMenuListStore').proxy.setExtraParam('languageId', user_language);
                    //Ext.getStore('property.ItemMenuListStore').load();
                }
            },
            'itemmenulist button[action=menuItemAdd]': {
                click: function () {
                    var itemGroupId = Ext.ComponentQuery.query('itemmenulist hidden[itemid=itemGroupId]')[0].getValue();
                    Ext.create('widget.itemmenumanage', { itemGroupId: itemGroupId }).show();
                }
            },
            'itemmenumanage': {
                afterrender: function (t, e, eo) {
                    var form = Ext.ComponentQuery.query('itemmenumanage [itemid="itemMenuManage"]')[0];
                    var menuItemId = form.getForm().findField('MenuItemId').getValue();
                    if (menuItemId > 0) {
                        form.getForm().load({
                            method: 'GET',
                            url: webAPI_path + 'api/ItemMenu/GetMenuItemForUpdate',
                            params: {
                                id: menuItemId,
                                languageId: user_language
                            },
                            success: function (form, action) {
                                var form = Ext.ComponentQuery.query('itemmenumanage [itemid="itemMenuManage"]')[0];

                                //alert(form.getForm().findField('ItemGroupId').getValue());
                            }
                        });
                    }
                }
            },
            'itemmenumanage button[action=saveItemMenu]': {
                click: function (t, e, eo) {
                    var form = Ext.ComponentQuery.query('itemmenumanage [itemid="itemMenuManage"]')[0];

                    form.getForm().findField('IsActive').setValue(true);
                    form.getForm().findField('LanguageId').setValue(user_language);

                    if (form.getForm().findField('MenuItemId').getValue() > 0) {
                        form.getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        form.getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                    }
                    else {
                        var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                        form.getForm().findField('PropertyId').setValue(PropertyId);

                        form.getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        form.getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                    }

                    if (form.getForm().isValid()) {
                        form.getForm().submit({
                            url: webAPI_path + "api/ItemMenu/ManageMenuItem",
                            method: 'POST',
                            success: function (form, response) {

                                var r = response.response.responseText;
                                var r = Ext.decode(r);

                                /*Commented as response text not came from API*/
                                if (r.success == true) {
                                    me.getItemmenumanage().close();
                                    var menuItemGrid = Ext.ComponentQuery.query('[itemid=menulist]')[0];
                                    menuItemGrid.getStore().reload();
                                } else {

                                }
                            },
                            failure: function (form, response) {
                                var r = response.response.responseText;
                                r = Ext.decode(r);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.Msg.alert('Error'.l('g'), ResultText); // 'Information not saved.');
                            }
                        })
                    }
                    else {
                        Ext.Msg.alert('Error'.l('g'), 'Some fields are requred, check all fields.'.l('g'));
                    }
                }
            },
            'itemmenumanage button[action=saveMenuItemLang]': {
                click: function (t) {
                    var form = Ext.ComponentQuery.query('itemmenumanage [itemid="itemMenuManage"]')[0];
                    var menuItemId = form.getForm().findField('MenuItemId').getValue();
                    var window = Ext.create('widget.itemmenulang', { menuItemId: menuItemId }).alignTo(t);
                }
            },
            'itemmenulang combo[name="LanguageId"]': {
                select: function (combo, records, eOpt) {
                    var languageId = records[0].data.LanguageId;

                    var form = Ext.ComponentQuery.query('[itemid="menuItemLang"]')[0];
                    var menuItemId = form.getForm().findField('MenuItemId').getValue();

                    form.getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/ItemMenu/GetLangMenuItemForUpdate',
                        params: {
                            id: menuItemId,
                            languageId: languageId
                        }
                    })
                }
            },
            'itemmenulang button[action="saveMenuItemLang"]': {
                click: function () {
                    var form = Ext.ComponentQuery.query('itemmenulang [itemid="menuItemLang"]')[0];
                    if (form.getForm().isValid()) {

                        form.getForm().submit({
                            url: webAPI_path + 'api/ItemMenu/ManageLangMenuItem',
                            method: 'POST',
                            success: function (form, response) {

                                var r = response.response.responseText;
                                var r = Ext.decode(r);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                //   var r = jsonDecode(response);
                                if (r.success == true) {
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        win.close();
                                    }
                                    //display_alert('MG00040');
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function () {
                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                            }
                        })
                    }
                }
            }


        })
    },

    filterItemPrice: function (obj) {
        var IsWithOutPriceObject = Ext.ComponentQuery.query('itemgloballist [itemid=IsWithOutPrice]')[0];
        var ITemDispayTypeGroup = Ext.ComponentQuery.query('itemgloballist [name=ITemDispayTypeGroup]')[0];
        var ITemDispayType = ITemDispayTypeGroup.getValue().ITemDispayType;

        /*Category*/
        var categoryId = Ext.ComponentQuery.query('itemgloballist combo[name=categoryId]')[0];

        /*Start Date*/
        var FromDate = Ext.ComponentQuery.query('itemgloballist datefield[itemid=FromDate]')[0];
        FromDate = Ext.util.Format.date(FromDate.getValue(), 'Y-m-d');

        /*End Date*/
        var ToDate = Ext.ComponentQuery.query('itemgloballist datefield[itemid=ToDate]')[0];
        ToDate = Ext.util.Format.date(ToDate.getValue(), 'Y-m-d');

        /*Search Text*/
        var textfield = Ext.ComponentQuery.query('itemgloballist textfield[itemid=SearchText]')[0];

        if (obj != null)
            categoryId = obj.categoryId;
        else {
            categoryId = categoryId.getValue();
        }

        var clearIcon = Ext.ComponentQuery.query('itemgloballist [action="clearItemListFilter"]')[0];
        clearIcon.show();

        var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
        var itemObject = new Object();
        itemObject.PropertyId = PropertyId;
        itemObject.LanguageId = user_language;
        itemObject.IsWithOutPrice = IsWithOutPriceObject.getValue();
        itemObject.ITemDispayType = ITemDispayType;
        itemObject.categoryId = categoryId;
        itemObject.FromDate = (FromDate == "") ? null : FromDate;
        itemObject.ToDate = (ToDate == "") ? null : ToDate;
        itemObject.SearchText = (textfield.getValue() == "") ? null : textfield.getValue();

        var itemObject = Ext.encode(itemObject);
        Ext.getStore('property.ItemGlobalListStore').proxy.setExtraParam('id', itemObject);
        Ext.getStore('property.ItemGlobalListStore').loadPage(1);
    },
    clearItemListFilter: function () {

        var IsWithOutPriceObject = Ext.ComponentQuery.query('itemgloballist [itemid=IsWithOutPrice]')[0];
        var ITemDispayTypeGroup = Ext.ComponentQuery.query('itemgloballist [name=ITemDispayTypeGroup]')[0];
        var ITemDispayType = ITemDispayTypeGroup.getValue().ITemDispayType;
        /*Category*/
        var categoryId = Ext.ComponentQuery.query('itemgloballist combo[name=categoryId]')[0];

        /*Start Date*/
        var FromDate = Ext.ComponentQuery.query('itemgloballist datefield[itemid=FromDate]')[0];
        //  FromDate = Ext.util.Format.date(FromDate.getValue(), 'Y-m-d');

        /*End Date*/
        var ToDate = Ext.ComponentQuery.query('itemgloballist datefield[itemid=ToDate]')[0];
        // ToDate = Ext.util.Format.date(ToDate.getValue(), 'Y-m-d');

        /*Search Text*/
        var textfield = Ext.ComponentQuery.query('itemgloballist textfield[itemid=SearchText]')[0];

        categoryId.setValue(0);
        FromDate.setValue(null);
        ToDate.setValue(null);
        textfield.setValue(null);


        var clearIcon = Ext.ComponentQuery.query('itemgloballist [action="clearItemListFilter"]')[0];
        clearIcon.hide();
        var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
        var itemObject = new Object();
        itemObject.PropertyId = PropertyId;
        itemObject.LanguageId = user_language;
        itemObject.IsWithOutPrice = IsWithOutPriceObject.getValue();
        itemObject.ITemDispayType = ITemDispayType;
        itemObject.categoryId = 0;
        itemObject.FromDate = null;
        itemObject.ToDate = null;
        itemObject.SearchText = null;

        var itemObject = Ext.encode(itemObject);
        Ext.getStore('property.ItemGlobalListStore').proxy.setExtraParam('id', itemObject);
        Ext.getStore('property.ItemGlobalListStore').loadPage(1);
    },
    addNewItemPrice: function (rec, type) {
        Ext.create('widget.itemexemptionpricemanage', { rec: rec, type: type });
    },
    addNewGroupPrice: function (rec, type) {
        Ext.create('widget.propertygroupitemmanage', { rec: rec, type: type }).show();
    },
    deleteItemPrice: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                var ExemptionIds = rec.ExemptionIds;
                if (ExemptionIds.length > 0) {
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/ItemExemption/DeleteItemExceptionDetail',
                        type: "GET",
                        params: { id: ExemptionIds },
                        success: function (response) {
                            var r = response;
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                Ext.Msg.alert('Success'.l('g'), 'Item deleted successfully.');

                                var grid = me.getItemgloballist(); ;
                                var store = Ext.getStore('property.ItemGlobalListStore');
                                Utils.RefreshGridonDelete(grid, store);
                                //Ext.getStore('property.ItemGlobalListStore').reload();
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function () { }
                    })
                }
            }
        })
    },
    deleteGroupItemPrice: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                var ExemptionIds = rec.ExemptionIds;
                if (ExemptionIds.length > 0) {
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/ItemExemption/DeleteItemGroupExceptionDetail',
                        type: "GET",
                        params: { id: ExemptionIds },
                        success: function (response) {
                            var r = response;
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                Ext.Msg.alert('Success'.l('g'), 'Item group deleted successfully.');

                                var grid = me.getItemgloballist(); ;
                                var store = Ext.getStore('property.ItemGlobalListStore');
                                Utils.RefreshGridonDelete(grid, store);
                                // Ext.getStore('property.ItemGlobalListStore').reload();
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function () { }
                    })
                }
            }
        })
    },
    addItemMenu: function (rec) {
        Ext.create('widget.itemmenulist', { itemGroupId: rec.ItemGroupId }).show();
    },
    setItemGroupSummaryGrid: function () {
        var grid = Ext.ComponentQuery.query('propertygroupitemmanage grid[itemid=ItemGroupGlobalList]')[0];
        var records = grid.getStore().getRange();

        var grid = Ext.ComponentQuery.query('propertygroupitemmanage grid[itemid=ItemGroupGlobalListSummary]')[0];
        var summaryRecord = grid.getStore().getAt(0);
        summaryRecord.set('BarA', 0);
        summaryRecord.set('ItemA', 0);
        summaryRecord.set('BarB', 0);
        summaryRecord.set('ItemB', 0);
        summaryRecord.set('BarC', 0);
        summaryRecord.set('ItemC', 0);
        summaryRecord.set('BarD', 0);
        summaryRecord.set('ItemD', 0);
        var BarA = 0;
        var ItemA = 0;
        var BarB = 0;
        var ItemB = 0;
        var BarC = 0;
        var ItemC = 0;
        var BarD = 0;
        var ItemD = 0;

        if (records.length > 0) {
            Ext.each(records, function (r) {
                var renderBarA = (r.data.BarA > 0) ? r.data.BarA : 0;
                var renderItemA = (r.data.ItemA > 0) ? r.data.ItemA : 0;
                var renderBarB = (r.data.BarB > 0) ? r.data.BarB : 0;
                var renderItemB = (r.data.ItemB > 0) ? r.data.ItemB : 0;
                var renderBarC = (r.data.BarC > 0) ? r.data.BarC : 0;
                var renderItemC = (r.data.ItemC > 0) ? r.data.ItemC : 0;
                var renderBarD = (r.data.BarD > 0) ? r.data.BarD : 0;
                var renderItemD = (r.data.ItemD > 0) ? r.data.ItemD : 0;

                BarA = parseFloat(BarA) + parseFloat(renderBarA);
                ItemA = parseFloat(ItemA) + parseFloat(renderItemA);
                BarB = parseFloat(BarB) + parseFloat(renderBarB);
                ItemB = parseFloat(ItemB) + parseFloat(renderItemB);
                BarC = parseFloat(BarC) + parseFloat(renderBarC);
                ItemC = parseFloat(ItemC) + parseFloat(renderItemC);
                BarD = parseFloat(BarD) + parseFloat(renderBarD);
                ItemD = parseFloat(ItemD) + parseFloat(renderItemD);
            });
        }

        summaryRecord.set('BarA', BarA);
        summaryRecord.set('ItemA', ItemA);
        summaryRecord.set('BarB', BarB);
        summaryRecord.set('ItemB', ItemB);
        summaryRecord.set('BarC', BarC);
        summaryRecord.set('ItemC', ItemC);
        summaryRecord.set('BarD', BarD);
        summaryRecord.set('ItemD', ItemD);
    },
    loadGroupItemData: function (n) {
        var local = this;
        var StartDate = Ext.Date.format(n, 'Y-m-d');

        var grid = Ext.ComponentQuery.query('propertygroupitemmanage grid[itemid=ItemGroupGlobalList]')[0];
        grid.getStore().proxy.setExtraParam('id4', StartDate); //id4 = StartDate
        grid.getStore().load({
            callback: function (records, o, success) {
                local.setItemGroupSummaryGrid();
            }

        });
    },
    loadOnlyGreyItems: function (n) {

        var local = this;

        var ExemptionIds = Ext.ComponentQuery.query('propertygroupitemmanage hidden[itemid=ExemptionIds]')[0];
        ExemptionIds = ExemptionIds.getValue();

        var ItemGroupId = Ext.ComponentQuery.query('propertygroupitemmanage hidden[itemid=ItemGroupId]')[0];
        ItemGroupId = ItemGroupId.getValue();

        var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();

        var StartDate = Ext.Date.format(n, 'Y-m-d');

        Ext.data.JsonP.request({
            url: webAPI_path + 'api/ItemExemption/GetItemGroupExemptionPriceDetail',
            type: "GET",
            params: { id: CurrentSessionUserId, id1: ExemptionIds, id2: ItemGroupId, id3: PropertyId, id4: StartDate, id5: user_language },
            success: function (response) {

                var grid = Ext.ComponentQuery.query('grid[itemid=ItemGroupGlobalList]')[0];

                var r = response.data;

                if (r.length > 0) {
                    var i = 0;
                    Ext.each(r, function (d) {
                        var record = grid.getStore().getAt(i);
                        record.set('ItemA', d.ItemA);
                        record.set('ItemB', d.ItemB);
                        record.set('ItemC', d.ItemC);
                        record.set('ItemD', d.ItemD);
                        i++;
                    });
                }

                local.setItemGroupSummaryGrid();
            },
            failure: function () { }
        });

    },
    deleteMenuItem: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                if (rec.MenuItemId > 0) {
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/ItemMenu/RemoveMenuItem',
                        type: "GET",
                        params: { id: rec.MenuItemId },
                        success: function (response) {
                            var r = response;
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                //display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Room deleted successfully.');
                                Ext.getStore('property.ItemMenuListStore').load();
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function () { }
                    })
                }
            }
        })
    },
    editMenuItem: function (rec) {
        Ext.create('widget.itemmenumanage', { MenuItemId: rec.MenuItemId });
    },
    menuStatusChange: function (rec) {
        Ext.data.JsonP.request({
            url: webAPI_path + 'api/ItemMenu/ChangeMenuItemStatus',
            type: "GET",
            params: { id: rec.MenuItemId, languageId: user_language },
            success: function (response) {
                var r = response;
                var ResultText = r.result;
                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                    ResultText = ResultText.l("SP_DynamicCode");
                if (r.success == true) {
                    //Ext.Msg.alert('Success'.l('g'), 'Task Done Successfully');
                    Ext.getStore('property.ItemMenuListStore').load();
                }
                else {
                    Ext.Msg.alert('Error'.l('g'), ResultText);
                }
            },
            failure: function () { }
        })
    }
});
