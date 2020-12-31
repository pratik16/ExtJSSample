Ext.define('Regardz.controller.property.FloorPlan', {
    extend: 'Ext.app.Controller',
    views: ['property.FloorPlan', 'property.AddFloorPlan', 'property.FloorPlanManageLang'],
    stores: ['property.FloorPlanStore', 'common.LanguageListStore', 'property.PropertyFloorComboStore'],

    refs: [{
        ref: 'addfloorplan',
        selector: 'addfloorplan'
    },
     {
         ref: 'floorplanmanagelang',
         selector: 'floorplanmanagelang'
     }
    ],

    init: function () {
        var me = this;
        me.propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
        this.control(
        {
            'floorplan grid': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'FloorPlanDelete')
                        this.FloorPlanDelete(zRec, me.propertyId);
                    else if (fieldName == 'DisplayName' || fieldName == 'FloorName' || fieldName == 'Category' || fieldName == 'FloorPlanPreview')
                        this.FloorPlanPreview(zRec, me.propertyId);
                    else if (fieldName == 'FloorPlanEdit')
                        this.EditFloorPlan(zRec, me.propertyId);
                },
                afterrender: function () {
                    if (Ext.getCmp('propertyBasicInfoEdit')) {
                        me.propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();

                        Ext.getStore('property.PropertyFloorComboStore').load({
                            params: {
                                'id': me.propertyId
                            }
                        });
                    }
                }
            },
            'button[action="addFloorPlan"]': {
                click: function () {

                    //var propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    var addFloorPlan = Ext.create('widget.addfloorplan', { propertyId: me.propertyId, propertyFloorPlanId: 0 }).show();
                }
            },
            'button[action="addFloorPlanLanguage"]': {
                click: function (t) {

                    var propertyId = Ext.getCmp('addFloorPlanform').getForm().findField('PropertyId').getValue();
                    var PropertyFloorPlanId = Ext.getCmp('addFloorPlanform').getForm().findField('PropertyFloorPlanId').getValue();

                    var window = Ext.create('widget.floorplanmanagelang', { propertyId: propertyId, propertyFloorPlanId: PropertyFloorPlanId }).alignTo(t);
                    // var btnCmp = Ext.ComponentQuery.query('[action="addFloorPlanLanguageItem"]')[0];
                }
            },

            'button[action="saveFloorPlan"]': {
                click: function () {
                    if (Ext.getCmp('addFloorPlanform').getForm().isValid()) {
                        var propertyFloorPlanId = Ext.getCmp('addFloorPlanform').getForm().findField('PropertyFloorPlanId').getValue();
                        var urlVideo = "";

                        if (propertyFloorPlanId == 0) {
                            urlVideo = webAPI_path + 'api/propertyfloorplan/PostPropertyFloorPlan';
                            Ext.getCmp('addFloorPlanform').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addFloorPlanform').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            urlVideo = webAPI_path + 'api/propertyfloorplan/PostPropertyFloorPlan'; //UpdatePropertyFloorPlan
                            Ext.getCmp('addFloorPlanform').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addFloorPlanform').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('addFloorPlanform').getForm().submit({
                            method: 'POST',
                            url: urlVideo,
                            // loadMask: true,
                            // jsonSubmit: true,
                            data: Ext.getCmp('addFloorPlanform').getForm().getValues(),
                            waitMsg: 'Uploading file please wait.'.l('g'),
                            success: function (form, response) {

                                Ext.getStore('property.FloorPlanStore').reload();

                                me.getAddfloorplan().close();

                                Ext.getStore('property.FloorPlanStore').reload();
//                                Ext.data.JsonP.request({
//                                    url: webAPI_path + 'api/Designation/BlankRequest',
//                                    success: function () {
//                                        display_alert('MG00000');
//                                    }
//                                })
                            },
                            failure: function (form, response) {
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close();
                                }
                                Ext.Msg.alert('Error'.l('g'), 'File not saved.'.l('SC31510'));
                                return;
                                var r = Ext.decode(response.responseText);
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

            'floorplanmanagelang combo[name="LanguageId"]': {
                select: function (combo, records, eOpt) {
                    var languageId = records[0].data.LanguageId;

                    var form = Ext.ComponentQuery.query('[itemid="floorplanmanagelangform"]')[0];
                    var PropertyFloorPlanId = form.getForm().findField('PropertyFloorPlanId').getValue();

                    form.getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/PropertyFloorPlan/GetPropertyFloorPlanLang',
                        params: {
                            id: PropertyFloorPlanId,
                            languageId: languageId
                        }
                    })
                }
            },

            'floorplanmanagelang button[action="saveFloorPlanLang"]': {
                click: function () {

                    var form = Ext.ComponentQuery.query('[itemid="floorplanmanagelangform"]')[0];
                    var formurl = webAPI_path + 'api/PropertyFloorPlan/ManagePropertyFloorPlanLang';

                    form.getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                    form.getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);

                    form.getForm().submit({
                        method: 'POST',
                        url: formurl,
                        waitMsg: 'save_data_message'.l('g'),
                        success: function (form, response) {
                            me.getFloorplanmanagelang().close();

//                            Ext.data.JsonP.request({
//                                url: webAPI_path + 'api/Designation/BlankRequest',
//                                success: function () {
//                                    display_alert('MG00000');
//                                }
//                            })
                        },
                        failure: function (form, response) {
                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        }
                    })
                }
            }

        })
    },
    FloorPlanDelete: function (rec, propertyId) {

        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/propertyfloorplan/RemovePropertyFloorPlan',
                    type: "GET",
                    params: { id: rec.data.PropertyFloorPlanId },
                    success: function (r) {
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        //  var r = jsonDecode(response);
                        if (r.success == true) {
                            //display_alert('MG00040'); //Ext.Msg.alert('Success'.l('g'), 'Item deleted successfully.');

                            var grid = Ext.ComponentQuery.query('floorplan [itemid=floorplangrid]')[0];
                            var store = Ext.getStore('property.FloorPlanStore');
                            Utils.RefreshGridonDelete(grid, store);
                            //Ext.getStore('property.FloorPlanStore').loadPage(1);
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Item not deleted.'.l('SC31510'));
                    }
                })
            }
        })
    },
    FloorPlanPreview: function (rec, propertyId) {
        var c = Ext.ComponentQuery.query('[itemid=florPlanPreview]')[0];
        var URL = "PDFViewer.aspx?id=" + propertyId + "&file=" + rec.data.FileName;
        c.load(URL);
    },

    EditFloorPlan: function (rec, propertyId) {
        Ext.create('widget.addfloorplan', { propertyId: propertyId, propertyFloorPlanId: rec.data.PropertyFloorPlanId }).show();

        Ext.getCmp('addFloorPlanform').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/propertyfloorplan/GetPropertyFloorPlan',
            params: {
                id: rec.data.PropertyFloorPlanId,
                languageId: user_language
            }
        });

    }
});