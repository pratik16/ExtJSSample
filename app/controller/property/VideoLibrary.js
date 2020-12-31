Ext.define('Regardz.controller.property.VideoLibrary', {
    extend: 'Ext.app.Controller',
    views: ['property.VideoLibraryList', 'property.VideoLibraryManage', 'property.VideoLibraryLang'],
    stores: ['property.VideoLibraryListStore', 'common.LanguageListStore'],

    refs: [{
        ref: 'VideoLibraryManage',
        selector: 'VideoLibraryManage'
    }, {
        ref: 'VideoLibraryLang',
        selector: 'VideoLibraryLang'
    }
	],

    init: function () {

        this.control({
            'videolibrarylist grid': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'VideoLibraryEdit')
                        this.VideoLibraryEdit(zRec);
                    else if (fieldName == 'VideoLibraryDelete')
                        this.VideoLibraryDelete(zRec);
                    else if (fieldName == 'VideoStatusChange')
                        this.VideoStatusChange(zRec);
                    else if (fieldName == 'VideoName' || fieldName == 'youtubeIFramURL' || fieldName == 'VideoLibraryPreview')
                        this.VideoLibraryPreview(zRec);
                    else if (fieldName == 'UpdateVideoSequance') {
                        if (iColIdx == 0) {
                            this.UpdateVideoSequance(zRec, -1);
                        } else if (iColIdx == 1) {
                            this.UpdateVideoSequance(zRec, 1);
                        }
                    }
                }
            },
            'videolibrarymanage button[action="LanguageContent"]': {
                click: function (t, e, eo) { //t => this, e => event, eo => Eoptional                    
                    var me = this;
                    var btnCmp = Ext.ComponentQuery.query('[itemid="langButton"]')[0];
                    var langWin = Ext.create('widget.videolibrarylang');
                    langWin.alignTo(btnCmp, "br?", [-5, -5]);
                }
            },
            'button[action="addVideoLibrary"]': {
                click: function () {
                    var propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    var videolibrarymanage = Ext.create('widget.videolibrarymanage', {
                        propertyId: propertyId,
                        videoDetailId: 0
                    });
                }
            },
            'button[action="saveVideoLibrary"]': {
                click: function () {
                    if (Ext.getCmp('addvideolibform').getForm().isValid()) {
                        var videodetailId = Ext.getCmp('addvideolibform').getForm().findField('VideoDetailId').getValue();

                        var urlVideo = "";
                        if (videodetailId == 0) {
                            urlVideo = webAPI_path + 'api/propertyvideodetail/AddPropertyVideoDetail';
                            Ext.getCmp('addvideolibform').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addvideolibform').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        } else {
                            urlVideo = webAPI_path + 'api/propertyvideodetail/UpdatePropertyVideoDetail';
                            Ext.getCmp('addvideolibform').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addvideolibform').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('addvideolibform').getForm().submit({
                            url: urlVideo,
                            method: 'POST',
                            //  data: Ext.getCmp('addvideolibform').getForm().getValues(),
                            success: function (form, response) {

                                var r = response.response.responseText;
                                var r = Ext.decode(r);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == true) {
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        win.close();
                                    }
                                    //                                    Ext.data.JsonP.request({
                                    //                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',

                                    //                                        success: function () {
                                    //                                            display_alert('MG00000');
                                    //                                        }
                                    //                                    });
                                    //display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                    Ext.getStore('property.VideoLibraryListStore').reload();
                                } else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function (err) {
                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                            }
                        })
                    }
                }
            },
            'videolibrarylang combobox[name=LanguageId]': {
                // change: function (t, newValue, oldValue) {//t => this
                select: function (combo, records, eOpt) {
                    var videodetailId = Ext.getCmp('addvideolibform').getForm().findField('VideoDetailId').getValue();
                    Ext.getCmp('videolibMultiLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/propertyvideodetail/GetPropertyVideoForMultiLingUpdate',
                        params: {
                            id: videodetailId,
                            languageId: records[0].data.LanguageId
                        }
                    });
                }
            },
            'videolibrarylang button[action="saveVideoLibraryMultiLing"]': {
                click: function () {
                    if (Ext.getCmp('videolibMultiLang').getForm().isValid()) {

                        Ext.getCmp('videolibMultiLang').getForm().submit({
                            url: webAPI_path + 'api/propertyvideodetail/UpdatePropertyVideoMultiLangDetail',
                            method: 'POST',
                            // data: Ext.getCmp('videolibMultiLang').getForm().getValues(),
                            success: function (form, response) {

                                var r = response.response.responseText;
                                var r = Ext.decode(r);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                /*Commented as response text not came from API*/
                                if (r.success == true) {
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        win.close();
                                    }
                                    // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));


                                } else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function () {
                                // Ext.Msg.alert('Error', 'Information not saved.');
                            }
                        })
                    }
                }
            }
        })
    },
    VideoLibraryEdit: function (rec) {
        var addvideolibrary = Ext.create('widget.videolibrarymanage', {
            propertyId: rec.data.PropertyId,
            videoDetailId: rec.data.VideoDetailId
        });
        addvideolibrary.setTitle('Update Video_Title'.l('SC31310'));
        Ext.getCmp('addvideolibform').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/propertyvideodetail/GetPropertyVideoForUpdate',
            params: {
                id: rec.data.VideoDetailId,
                languageId: user_language
            }
        });
    },
    UpdateVideoSequance: function (rec, langId) {

        Ext.data.JsonP.request({
            url: webAPI_path + 'api/PropertyVideoDetail/UpdateVideoSequance',
            type: "GET",
            params: {
                id: rec.data.VideoDetailId,
                languageId: langId
            },
            success: function (r) {
                var ResultText = r.result;
                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                    ResultText = ResultText.l("SP_DynamicCode");
                // var r = jsonDecode(response);
                if (r.success == true) {
                    Ext.getStore('property.VideoLibraryListStore').reload();
                } else {
                    Ext.Msg.alert('Error'.l('g'), ResultText);
                }
            },
            failure: function () { }
        })
    },
    VideoStatusChange: function (rec) {
        //alert(rec);
        display_alert("MG00010", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/PropertyVideoDetail/ActivateDeactivateVideo',
                    type: "GET",
                    params: {
                        id: rec.data.VideoDetailId
                    },
                    success: function (r) {
                        //  var r = jsonDecode(response);
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            //display_alert('MG00030'); // Ext.Msg.alert('Success'.l('g'), 'Status updated successfully.');
                            Ext.getStore('property.VideoLibraryListStore').reload();
                        } else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), "Video Status not changed!".l('SC31300'));
                    }
                })
            }
        })
    },
    VideoLibraryDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {

                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/propertyvideodetail/RemovePropertyVideoDetail',
                    type: "GET",
                    params: {
                        id: rec.data.VideoDetailId
                    },
                    success: function (r) {
                        //var r = jsonDecode(response);
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            //display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Information deleted successfully.');
                            //Ext.getStore('property.VideoLibraryListStore').loadPage(1);

                            var grid = Ext.ComponentQuery.query('videolibrarylist [itemid=videolibrarygrid]')[0];
                            var store = Ext.getStore('property.VideoLibraryListStore');
                            Utils.RefreshGridonDelete(grid, store);

                        } else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), "Record not deleted.".l('g'));
                    }
                })
            }
        })
    },
    VideoLibraryPreview: function (rec) {

        var YoutubeURL = rec.data.youtubeIFramURL;
        var c = Ext.ComponentQuery.query('container [itemid=youtubeViewer]')[0];

        var v = this.getList(YoutubeURL, "v");

        if (v != null) {
            var html = Pohon.ux.YouTubeUtils.embedCode(v, c.width, c.height);
            //console.log(html)
            c.update(html);
        }
        else {
            Ext.Msg.alert('Error'.l('g'), "Video cannot play".l('SC31310')); 
        }
    },

    getList: function (url, gkey) {

        var returned = null;

        if (url.indexOf("?") != -1) {

            var list = url.split("?")[1].split("&"),
                      gets = [];

            for (var ind in list) {
                var kv = list[ind].split("=");
                if (kv.length > 0)
                    gets[kv[0]] = kv[1];
            }

            returned = gets;

            if (typeof gkey != "undefined")
                if (typeof gets[gkey] != "undefined")
                    returned = gets[gkey];


        }

        if (returned == null) {
            var reg = new RegExp('(?:https?://)?(?:www\\.)?(?:youtu\\.be/|youtube\\.com(?:/embed/|/v/|/watch\\?v=))([\\w-]{10,12})', 'g');
            returned = reg.exec(url)[1];
        }

        return returned;

    }
});