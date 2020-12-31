Ext.define('Regardz.controller.property.PhotoGallery', {
    extend: 'Ext.app.Controller',
    views: ['property.PhotoGalleryList', 'property.PhotoGalleryManage', 'property.PhotoGalleryLang'],
    stores: ['property.PhotoGalleryListStore'],

    refs: [{
        ref: 'photogallerymanage',
        selector: 'photogallerymanage'
    }, {
        ref: 'PhotoGalleryLang',
        selector: 'PhotoGalleryLang'
    }],

    init: function () {
        var me = this;
        this.control(
        {
            'photogallerylist grid': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    
                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'PhotoGalleryEdit')
                        this.PhotoGalleryEdit(zRec);
                    else if (fieldName == 'PhotoGalleryDelete') {
                        if (zRec.data.IsCoverPhoto == true) {
                            Ext.Msg.alert('Error'.l('g'), 'Cover Photo Can not be deleted.'.l('SC31100'));
                            return false;
                        }
                        this.PhotoGalleryDelete(zRec);
                    }
                    else if (fieldName == 'PhotoStatusChange')
                        this.PhotoStatusChange(zRec); else if (fieldName == 'UpdatePhotoSequance') {
                        if (iColIdx == 0) { this.UpdatePhotoSequance(zRec, -1); }
                        else if (iColIdx == 1) { this.UpdatePhotoSequance(zRec, 1); }
                    }
                    else if (fieldName == 'PhotoPreview' || fieldName == 'PhotoTitle' || fieldName == 'Description'
                                 || fieldName == 'IsCoverPhoto' || fieldName == 'IsRotate') {

                        this.previewPhoto(zRec);
                    }
                }
            },

            'photogallerymanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var me = this;
                    var btnCmp = Ext.ComponentQuery.query('[itemid="langButton"]')[0];
                    var langWin = Ext.create('widget.photogallerylang');
                    langWin.alignTo(btnCmp, "br?", [-5, -5]);

                }
            },
            'button[action="addPhotoGallery"]': {
                click: function () {
                    var propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();

                    Ext.create('widget.photogallerymanage', { propertyId: propertyId, photoGalleryId: 0 });
                }
            },
            'button[action="savePhotoGal"]': {
                click: function () {
                    if (Ext.getCmp('managePhotoGal').getForm().isValid()) {
                        var photoGalleryId = Ext.getCmp('managePhotoGal').getForm().findField('PhotoGalleryId').getValue();

                        if (photoGalleryId == 0) {
                            Ext.getCmp('managePhotoGal').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('managePhotoGal').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);

                            var POSTURL = webAPI_path + 'api/photogallery/PostPhotoGallery';
                        }
                        else {
                            Ext.getCmp('managePhotoGal').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                            Ext.getCmp('managePhotoGal').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));

                            var POSTURL = webAPI_path + 'api/photogallery/PostPhotoGallery'; //UpdatePhotoGallery
                        }
                        
                        Ext.getCmp('managePhotoGal').getForm().submit({
                            url: POSTURL,
                            nMactioethods: 'POST',
                            waitMsg: 'Uploading file please wait.'.l('g'),
                            params: Ext.getCmp('managePhotoGal').getForm().getValues(),
                            success: function (form, response) {

                                me.getPhotogallerymanage().close();

                                Ext.data.JsonP.request({
                                    url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',

                                    success: function () {
                                        display_alert('MG00000');
                                    }
                                });
                                //  display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                Ext.getStore('property.PhotoGalleryListStore').reload();
                                var r = response.response.responseText;
                                var r = jsonDecode(r);

                                /*Commented as response text not came from API*/
                                if (r.success == true) {
                                    //  Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                    //  Ext.getStore('property.PhotoGalleryListStore').reload();
                                }
                                else {
                                    //  Ext.Msg.alert('Error', r.result);
                                }
                            },
                            failure: function (form, response) {
                                var r = response.response.responseText;
                                var r = jsonDecode(r);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.Msg.alert('Error'.l('g'), ResultText); // 'Information not saved.');
                            }
                        })
                    }
                }
            },
            'photogallerylang combobox[name=LanguageId]': {
                //change: function (t, newValue, oldValue) {//t => this 
                select: function (combo, records, eOpt) {
                    var photoGalleryId = Ext.getCmp('managePhotoGal').getForm().findField('PhotoGalleryId').getValue();
                    Ext.getCmp('photoGalleryLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/photogallery/GetPhotoGalleryMultiLang',
                        params: {
                            id: photoGalleryId,
                            languageId: records[0].data.LanguageId
                        }
                    })
                }
            },
            'photogallerylang button[action="savePhotoGalleryLang"]': {
                click: function () {
                    if (Ext.getCmp('photoGalleryLang').getForm().isValid()) {

                        Ext.getCmp('photoGalleryLang').getForm().submit({
                            url: webAPI_path + 'api/photogallery/UpdatePhotoGalleryMultiLang',
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
            },

            'photogallerylist > [itemid=ProeprtyPhotoGallery] [xtype="radiorow"]': {
                checkchange: function (t, rowIndex, eo) {//t => this, e => event, eo => Eoptional    

                    var grid = Ext.ComponentQuery.query('gridpanel[itemid="ProeprtyPhotoGallery"]')[0];
                    var alldata = grid.getStore().getRange();

                    Ext.each(alldata, function (data) {

                        alldata[data.index].set('IsCoverPhoto', false);
                    });
                    //alldata[rowIndex].set('IsCoverPhoto', false);
                    alldata[rowIndex].set(t.dataIndex, true);

                }
            },

            'photogallerylist [action=searchString]': {
                click: function () {
                    var grid = Ext.ComponentQuery.query('gridpanel[itemid="ProeprtyPhotoGallery"]')[0];
                    var filters = [
                        new Ext.util.Filter({
                            property: "", value: 'T'
                        })
                    ];
                    grid.getStore().filter(filters);
                }
            }
        })
    },
    PhotoStatusChange: function (rec) {
        //alert(rec.data.PhotoGalleryId);
        display_alert("MG00010", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/photogallery/ActivateDeactivatePhoto',
                    type: "GET",
                    params: { id: rec.data.PhotoGalleryId },
                    success: function (r) {
                        //  var r = jsonDecode(response);
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            //display_alert('MG00030'); // Ext.Msg.alert('Success'.l('g'), 'Status updated successfully.');
                            Ext.getStore('property.PhotoGalleryListStore').load();
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Error occured while updating status'.l('SC31100'));
                    }
                })
            }
        });
    },

    UpdatePhotoSequance: function (rec, langId) {
        //UpdatePhotoSequance (int id, int languageId)
        //alert(user_language);
        //alert(rec.data.PhotoGalleryId + ' ' + langId + ' ' + rec.data.Sequnce);
        Ext.data.JsonP.request({

            url: webAPI_path + 'api/photogallery/UpdatePhotoSequance',
            type: "GET",
            params: {
                id: rec.data.PhotoGalleryId,
                languageId: langId
            },
            success: function (response) {
                Ext.getStore('property.PhotoGalleryListStore').load();
            },
            failure: function () {

            }
        })
    },

    PhotoGalleryEdit: function (rec) {
        var managePhotoGall = Ext.create('widget.photogallerymanage', { propertyId: rec.data.PropertyId, photoGalleryId: rec.data.PhotoGalleryId });
        managePhotoGall.setTitle('Update Photo_Title'.l('SC31510'));
        Ext.getCmp('managePhotoGal').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/photogallery/GetPhotoGallery',
            params: {
                id: rec.data.PhotoGalleryId,
                languageId: user_language
            },
            success: function (form, action) {
                //console.log(action.response.responseText);
                var r = jsonDecode(action.response.responseText);
                if (r.data.IsCoverPhoto == true) {
                    var field = Ext.ComponentQuery.query('[itemid="coverphoto"]')[0];
                    field.readOnly = true;
                    field.addClass('icon-disable');
                }
            }
        });
    },
    PhotoGalleryDelete: function (rec) {

        display_alert("MG00020", '', 'C', function (btn) {
            if (btn == 'yes') {

                //Ext.Ajax.request({
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/photogallery/RemovePhotoGallery',
                    type: "GET",
                    params: { id: rec.data.PhotoGalleryId },
                    success: function (r) {
                        // var r = jsonDecode(response);
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            //display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Photo deleted successfully.');
                            Ext.getStore('property.PhotoGalleryListStore').loadPage(1);
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Photo not deleted.'.l('SC31100'));
                    }
                })
            }
        })
    },

    previewPhoto: function (rec) {

        var actualLogo = Ext.ComponentQuery.query('[itemid="imageThumb"]')[0];
        var path = image_path + rec.data.OriginalFullImagePath;
        actualLogo.setSrc('');

        actualLogo.setSrc(path);

        var desc = Ext.ComponentQuery.query('container fieldset displayfield[name="description"]')[0];
        desc.setValue(rec.data.Description)
        actualLogo.doComponentLayout();
    }
});