Ext.define('Regardz.controller.extraz.Webshop', {
    extend: 'Ext.app.Controller',
    views: ['extraz.WebshopProductList', 'extraz.ExtrazCategoriesWindow', 'extraz.ExtrazCategoriesList', 'extraz.ExtrazCategoriesManage',
    'extraz.ExtrazCategoriesLang', 'extraz.WebshopProductManage', 'extraz.WebshopProductLang', 'extraz.WebshopProductLang'],

    stores: ['extraz.WebshopProductStore', 'extraz.ExtrazCategoriesListStore', 'common.LanguageListStore', 'extraz.WebshopCategoriesListProductStore'],

    refs: [{
        ref: 'WebshopProductList',
        selector: 'WebshopProductList'
    }, {
        ref: 'webshopCategories',
        selector: '[itemid=WebshopCategories]'
    }],

    init: function () {

        var me = this;
        this.control({
            'webshopproductlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'WebShopEdit')
                        this.WebShopEdit(zRec);
                    else if (fieldName == 'WebShopDelete')
                        this.WebShopDelete(zRec);
                }
            },
            'webshopproductmanage': {
                afterrender: function (rec) {
                    Ext.getStore('extraz.WebshopCategoriesListProductStore').clearFilter();
                    Ext.getStore('extraz.WebshopCategoriesListProductStore').proxy.setExtraParam('id', 0);
                    Ext.getStore('extraz.WebshopCategoriesListProductStore').proxy.setExtraParam('languageId', user_language);
                    Ext.getStore('extraz.WebshopCategoriesListProductStore').load();
                }
            },
            'webshopproductlist button[action="addWebshopProduct"]': {
                click: function () {

                    //                    var newObj = new Object();
                    //                    newObj.moduleName = 'AEXW0002';

                    //                    if (Utils.ValidateUserAccess(newObj)) {                        
                    //                        return false;
                    //                    }

                    Ext.create('widget.webshopproductmanage', { webShopId: 0 });
                    var path = 'public/images/No_Image.png';
                    var webshopProductImage = Ext.ComponentQuery.query('[itemid="ImageDisplay"]')[0];
                    webshopProductImage.setSrc(path);
                }
            },
            'webshopproductmanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {
                    var me = this;
                    var btnCmp = Ext.ComponentQuery.query('[itemid="langButton"]')[0];
                    var WebShopId = Ext.getCmp('addWebshopProduct').getForm().findField('WebShopId').getValue();
                    var langWin = Ext.create('widget.webshopproductlang', { webShopId: WebShopId });
                    langWin.alignTo(btnCmp, "br?", [-5, -5]);
                }
            },
            'webshopproductmanage button[action="saveWebshopProduct"]': {
                click: function (t, e) {

                    /*WebshopCategories Ids*/

                    var webshopCatIds = '';
                    var WebshopCategories = me.getWebshopCategories().store.data;
                    if (WebshopCategories != null && WebshopCategories.length > 0) {
                        for (var i = 0; i < WebshopCategories.length; i++) {
                            if (WebshopCategories.items[i].data.Checked == "1")
                                webshopCatIds += WebshopCategories.items[i].data.WebShopCategoryId + ",";
                        }
                    }

                    webshopCatIds = webshopCatIds.replace(/\,$/, '');

                    /*WebshopCategories Ids*/

                    var webshopProduct = Ext.ComponentQuery.query('[itemid="addWebshopProduct"]')[0];
                    var webshopDescription = Ext.ComponentQuery.query('[itemid="WebshopDescription"]')[0];

                    //webshopProduct.webshopCatIds = webshopCatIds;
                    webshopProduct.Description = Ext.util.Format.htmlEncode(webshopDescription.getForm().findField('Description').getValue());
                    //                    console.log(Ext.util.Format.htmlEncode(webshopProduct.getForm().findField('Description').getValue()));

                    webshopProduct.getForm().findField('webshopCatIds').setValue(webshopCatIds);
                    webshopProduct.getForm().findField('Description').setValue(webshopProduct.Description);

                    console.log(webshopCatIds);
                    console.log(webshopCatIds.length);

                    if (webshopProduct.getForm().isValid() && webshopDescription.getForm().isValid()) {
                        if (webshopCatIds.length > 0 && webshopCatIds != null) {
                            var webshopId = webshopProduct.getForm().findField('WebShopId').getValue();
                            var urlItemType = webAPI_path + 'api/ExtrazWebshop/ManageWebshopProduct'; ;
                            if (webshopId == 0) {
                                webshopProduct.getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                                webshopProduct.getForm().findField('CreatedBy').setValue(CurrentSessionUserId)
                            } else {
                                webshopProduct.getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                                webshopProduct.getForm().findField('UpdatedBy').setValue(CurrentSessionUserId)
                            }

                            webshopProduct.getForm().submit({
                                url: urlItemType,
                                method: 'POST',
                                data: webshopProduct,
                                success: function (form, response) {
                                    //var r = response.result;
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        win.close()
                                    }
                                    Ext.getStore('extraz.WebshopProductStore').reload();
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
                        else {
                            Ext.Msg.alert('Error'.l('g'), 'You must select atleast one category.'.l('g'));
                        }
                    }
                }
            },
            'webshopproductlang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {
                    var webShopId = Ext.getCmp('addWebshopProduct').getForm().findField('WebShopId').getValue();
                    Ext.getCmp('addWebshopProductLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/ExtrazWebshop/GetWebshopForMultiLingUpdate',
                        params: {
                            id: webShopId,
                            languageId: records[0].data.LanguageId
                        },
                        success: function (form, response) {
                            var r = response.result;
                            var webshopDescription = Ext.ComponentQuery.query('[itemid="WebshopDescriptionLang"]')[0];
                            webshopDescription.getForm().findField('Description').setValue(r.data.Description);
                            Ext.getCmp('addWebshopProductLang').getForm().findField('WebShopId').setValue(webShopId);
                        }
                    })
                }
            },
            'webshopproductlang button[action="saveWebshopProductLang"]': {
                click: function () {

                    var webshopProductLang = Ext.ComponentQuery.query('[itemid="addWebshopProductLang"]')[0];
                    var webshopDescriptionLang = Ext.ComponentQuery.query('[itemid="WebshopDescriptionLang"]')[0];


                    webshopProductLang.Description = Ext.util.Format.htmlEncode(webshopDescriptionLang.getForm().findField('Description').getValue());
                    webshopProductLang.getForm().findField('Description').setValue(webshopProductLang.Description);

                    if (Ext.getCmp('addWebshopProductLang').getForm().isValid()) {
                        Ext.getCmp('addWebshopProductLang').getForm().submit({
                            url: webAPI_path + 'api/ExtrazWebshop/UpdateWebshopProductMultiLangDetail',
                            type: 'POST',
                            params: webshopProductLang,
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
                                            Ext.getStore('extraz.ExtrazCategoriesListStore').reload()
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
            },
            'webshopproductlist button[action="extrazcategroy"]': {
                click: function () {
                    Ext.create('widget.extrazcategorieswindow', {}).center();
                }
            },
            'extrazcategorieslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'WebShopCategoryEdit')
                        this.WebShopCategoryEdit(zRec);
                    else if (fieldName == 'WebShopCategoryDelete')
                        this.WebShopCategoryDelete(zRec);
                }
            },
            'extrazcategorieslist button[action="addNewWebshopCategory"]': {
                click: function () {
                    Ext.create('widget.extrazcategoriesmanage').center();
                }
            },
            'extrazcategoriesmanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {
                    var me = this;
                    var btnCmp = Ext.ComponentQuery.query('[itemid="langButton"]')[0];
                    var WebShopCategoryId = Ext.getCmp('addwebshopcategroy').getForm().findField('WebShopCategoryId').getValue();
                    var langWin = Ext.create('widget.extrazcategorieslang', { webShopCategoryId: WebShopCategoryId });
                    langWin.alignTo(btnCmp, "br?", [-5, -5]);
                }
            },
            'extrazcategoriesmanage button[action="saveWebshopCategory"]': {
                click: function () {
                    if (Ext.getCmp('addwebshopcategroy').getForm().isValid()) {
                        var webshopCategotyId = Ext.getCmp('addwebshopcategroy').getForm().findField('WebShopCategoryId').getValue();
                        var urlItemType = "";
                        if (webshopCategotyId == 0) {
                            urlItemType = webAPI_path + 'api/ExtrazWebshop/AddWebshopCategory';
                            //Ext.getCmp('addwebshopcategroy').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            //Ext.getCmp('addwebshopcategroy').getForm().findField('CreatedBy').setValue(CurrentSessionUserId)
                        } else {
                            urlItemType = webAPI_path + 'api/ExtrazWebshop/UpdateWebshopCategory';
                            //Ext.getCmp('addwebshopcategroy').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            //Ext.getCmp('addwebshopcategroy').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId)
                        }
                        Ext.getCmp('addwebshopcategroy').getForm().submit({
                            url: urlItemType,
                            type: 'POST',
                            params: Ext.getCmp('addwebshopcategroy').getForm().getValues(),
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
                                    Ext.getStore('extraz.ExtrazCategoriesListStore').reload()
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
            'extrazcategorieslang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {
                    var webShopCategoryId = Ext.getCmp('addwebshopcategroy').getForm().findField('WebShopCategoryId').getValue();
                    Ext.getCmp('webshopCategroyLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/ExtrazWebshop/GetWebshopCategoryForMultiLingUpdate',
                        params: {
                            id: webShopCategoryId,
                            languageId: records[0].data.LanguageId
                        }
                    })
                }
            },
            'extrazcategorieslang button[action="saveWebshopCategoryLang"]': {
                click: function () {
                    if (Ext.getCmp('webshopCategroyLang').getForm().isValid()) {
                        Ext.getCmp('webshopCategroyLang').getForm().submit({
                            url: webAPI_path + 'api/ExtrazWebshop/UpdateWebshopCategoryMultiLangDetail',
                            type: 'POST',
                            params: Ext.getCmp('webshopCategroyLang').getForm().getValues(),
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
                                            Ext.getStore('extraz.ExtrazCategoriesListStore').reload()
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
            },
            'webshopproductmanage button[action="searchCategory"]': {
                click: function () {
                    var r = Ext.ComponentQuery.query('[itemid="searchStringCategory"]')[0].getValue();
                    Ext.getStore('extraz.WebshopCategoriesListProductStore').clearFilter();
                    var regex = new RegExp(".*" + r + ".*", "i");
                    Ext.getStore('extraz.WebshopCategoriesListProductStore').filter('Name', regex, true, true);

                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearCategory"]')[0];
                        clearIcon.show();
                    }
                }
            },
            'webshopproductmanage button[action="clearCategory"]': {
                click: function () {
                    var r = Ext.ComponentQuery.query('[itemid="searchStringCategory"]')[0].setValue('');
                    Ext.getStore('extraz.WebshopCategoriesListProductStore').clearFilter();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearCategory"]')[0];
                    clearIcon.hide();
                }
            },
            'webshopproductmanage textfield[itemid="searchStringCategory"]': {
                specialkey: function (f, eventObject) {
                    if (eventObject.getKey() == eventObject.ENTER) {
                        if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                            var r = Ext.ComponentQuery.query('[itemid="searchStringCategory"]')[0].getValue();
                            Ext.getStore('extraz.WebshopCategoriesListProductStore').clearFilter();
                            var regex = new RegExp(".*" + r + ".*", "i");
                            Ext.getStore('extraz.WebshopCategoriesListProductStore').filter('Name', regex, true, true);

                            if (r.length > 0) {
                                var clearIcon = Ext.ComponentQuery.query('[action="clearCategory"]')[0];
                                clearIcon.show();
                            }
                        }
                    }
                }
            }
            /*
            'button[action="imageeditor"]': {
            click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
            Ext.create('widget.webshopimageuploadeditor', { section: t.scope.section }).show();
            }
            },
            'webshopimageuploadeditor button[action="htmleditor_imginsert"]': {
            click: function (t, e, eo) {//t => this, e => event, eo => Eoptional

            var c = Ext.ComponentQuery.query('webshopimageuploadhtmleditor [itemid=webshopimageuploadhtmleditor]')[0];

            var section = c.isContained.section;

            var POSTURL = webAPI_path + 'api/property/PostImageForPropertyContent';

            var currTimeStamp = new Date().getTime();

            var uploadedFileName = Ext.getCmp('webshopimageuploadhtmleditor').getForm().findField('postedFile').getValue();

            Ext.getCmp('webshopimageuploadhtmleditor').getForm().findField('newFileName').setValue(currTimeStamp);
            var uploadedFileName = Ext.getCmp('webshopimageuploadhtmleditor').getForm().findField('postedFile').getValue();
            var extension = uploadedFileName.split('.').pop();

            var fileName = Ext.getCmp('webshopimageuploadhtmleditor').getForm().findField('newFileName').getValue();

            if (Ext.getCmp('webshopimageuploadhtmleditor').getForm().isValid()) {
            Ext.getCmp('webshopimageuploadhtmleditor').getForm().submit({
            url: POSTURL,
            params: Ext.getCmp('webshopimageuploadhtmleditor').getForm().getValues(),
            waitMsg: 'Uploading file please wait.'.l('g'),
            success: function (form, response) {

            var newFile = PropertyContentImages + fileName + "." + extension;
            //    var newFile = PropertyContentImages + "eced543d-013d-4ff4-a25e-1ef7d83a0cd8.png";
            if (section == "WebshopProductLang") {
            var c = Ext.ComponentQuery.query('webshopproductlang [itemid=webshoplangdescriptioneditor]')[0];
            }
            if (section == "WebshopProductManage") {
            var c = Ext.ComponentQuery.query('webshopproductmanage [itemid=webshopdescriptioneditor]')[0];
            }

            if (Ext.isIE) c.insertAtCursor('<img src="' + newFile + '" alt="" title="" >');
            else c.insertAtCursor('<img src="' + newFile + '" alt="" title="" >');

            me.getImageuploadeditor().close();

            },
            failure: function (form, response) {
            var r = response.response.responseText;
            var r = jsonDecode(r);
            Ext.Msg.alert('Error'.l('g'), r.result); // 'Information not saved.');
            }
            })
            }
            }
            }*/
        })
    },
    WebShopCategoryEdit: function (rec) {
        var edit = Ext.create('widget.extrazcategoriesmanage', {
            webShopCategoryId: rec.data.WebShopCategoryId
        });
        edit.setTitle('Update Category_Title'.l('SC37110'));
        Ext.getCmp('addwebshopcategroy').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/ExtrazWebshop/GetWebshopCategoryForUpdate',
            params: {
                id: rec.data.WebShopCategoryId,
                languageId: user_language
            }
        })
    },
    WebShopCategoryDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/ExtrazWebshop/RemoveWebShopCategory',
                    type: "GET",
                    params: {
                        id: rec.data.WebShopCategoryId
                    },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            var grid = Ext.ComponentQuery.query('[itemid="extrazcategorieslistgrid"]')[0];
                            Utils.RefreshGridonDelete(grid, grid.getStore());
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
    },
    WebShopEdit: function (rec) {
        var edit = Ext.create('widget.webshopproductmanage', {
            webShopId: rec.data.WebShopId
        });

        var webshopProductImage = Ext.ComponentQuery.query('[itemid="ImageDisplay"]')[0];
        webshopProductImage.setSrc('');

        edit.setTitle('Extraaz Product Edit_Title'.l('SC37120'));
        Ext.getCmp('addWebshopProduct').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/ExtrazWebshop/GetWebshopForUpdate',
            params: {
                id: rec.data.WebShopId,
                languageId: user_language
            },
            success: function (form, response) {
                var r = response.result;

                var path = image_path + r.data.Image;

                var webshopProductImage = Ext.ComponentQuery.query('[itemid="ImageDisplay"]')[0];
                webshopProductImage.setSrc(path);

                var webshopProduct = Ext.ComponentQuery.query('[itemid="addWebshopProduct"]')[0];

                webshopProduct.getForm().findField('postedFile').allowBlank = true;
                var webshopDescription = Ext.ComponentQuery.query('[itemid="WebshopDescription"]')[0];
                webshopDescription.getForm().findField('Description').setValue(r.data.Description);

                Ext.getStore('extraz.WebshopCategoriesListProductStore').clearFilter();
                Ext.getStore('extraz.WebshopCategoriesListProductStore').proxy.setExtraParam('id', rec.data.WebShopId);
                Ext.getStore('extraz.WebshopCategoriesListProductStore').proxy.setExtraParam('languageId', user_language);
                Ext.getStore('extraz.WebshopCategoriesListProductStore').load();

            }
        })
    },
    WebShopDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/ExtrazWebshop/RemoveWebShopProduct',
                    type: "GET",
                    params: {
                        id: rec.data.WebShopId
                    },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {                            
                            var grid = Ext.ComponentQuery.query('[itemid="webshopproductlistgrid"]')[0];
                            Utils.RefreshGridonDelete(grid, grid.getStore());
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
    //     index: function (propertyId) {
    //        var me = this;

    //        Ext.getStore('property.OutletGlobalListPropertyStore').proxy.setExtraParam('id', propertyId);
    //        }
});