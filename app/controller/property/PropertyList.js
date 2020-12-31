Ext.define('Regardz.controller.property.PropertyList', {
    extend: 'Ext.app.Controller',
    views: ['property.PropertyList'],
    stores: ['property.PropertyListStore', 'property.PropertyFeatureTypeStore', 'property.VideoLibraryListStore'],
    requires: ['Regardz.view.property.PropertyMap'],
    mixins: {
        'propertyEdit': 'Regardz.view.property.PropertyEdit'
    },
    PropertyEditController: false,
    refs: [{
        ref: 'PropertyEdit tabpanel',
        selector: 'tabpanel'
    },
    {
        ref: 'propertylist',
        selector: 'propertylist'
    }],

    init: function () {

        var me = this;

        me.control({
            'button[action="addNewProperty"]': {
                click: function () {

                    //var c = me.getController('property.PropertyEdit').index();
                    var c = me.getController('property.PropertyEdit');
                    if (me.PropertyEditController == false) {
                        c.init();
                        me.PropertyEditController = true;
                    }

                    c.index();
                    //this.getFacilitiesIcons(0);
                    // this.getFeatureType(0);

                }
            }
        });

        this.control({
            'propertylist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'PropertyName')
                        this.PropertyName(zRec);
                    else if (fieldName == 'PropertyEdit') {
                        this.PropertyEdit(zRec);
                    } else if (fieldName == 'PropertyMap')
                        this.PropertyMap(zRec);
                    /*else if (fieldName == 'PropertyVideos')
                    this.PropertyVideos(zRec);
                    else if (fieldName == 'PropertyFloorPlan')
                    this.PropertyFloorPlan(zRec);
                    else if (fieldName == 'PropertyPhotos')
                    this.PropertyPhotos(zRec);*/
                    else if (fieldName == 'PropertyStatusChange')
                        this.PropertyStatusChange(zRec);
                    else if (fieldName == 'deleteProperty')
                        this.DeletePropertyAction(zRec);
                }
            }
        });

        this.control({
            '#propertyEditWindow': {
                activate: function (window, e) { }
            }
        })
    },

    PropertyName: function (rec) {
        //alert(rec.data.PropertyName);
    },

    PropertyEdit: function (rec) {
        //alert('u');

        var me = this;

        //alert(rec.data.PropertyId);
        //Ext.create('widget.propertyedit', {propertyId: rec.data.PropertyId});
        var c = me.getController('property.PropertyEdit');
        if (me.PropertyEditController == false) {
            c.init();
            me.PropertyEditController = true;
        }
        c.index(rec.data.PropertyId);

        if (rec.data.PropertyId > 0) {
            //this.getFacilitiesIcons(rec.data.PropertyId);
            //this.getFeatureType(rec.data.PropertyId);
            this.loadStore(rec, user_language);
            //this.floorPlanStore(rec, user_language);
        } else {
            //this.getFacilitiesIcons(0);
            //this.getFeatureType(0);
        }
    },

    PropertyMap: function (rec) {
        var d = Ext.create('widget.propertymap', {
            propertyAddress: rec.data.Address + ', ' + rec.data.Postalcode + ', NL',
            PropertyName: rec.data.PropertyName
        }).show();
        //console.log(d)
    },

    PropertyVideos: function (rec) {
        //alert(rec.data.PropertyName);
    },

    PropertyFloorPlan: function (rec) {
        //alert(rec.data.PropertyName);
    },

    PropertyPhotos: function (rec) {
        //alert(rec.data.PropertyName);
    },

    PropertyStatusChange: function (rec) {

        display_alert("MG00010", '', 'C', function (btn) {
            if (btn == "yes") {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/property/ActivateDeactivateProperty',
                    type: "GET",
                    params: {
                        id: rec.data.PropertyId
                    },
                    success: function (r) {
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        // var r = jsonDecode(response);
                        if (r.success == true) {
                            //display_alert('MG00030');
                            //Ext.Msg.alert('Success'.l('g'), 'Status updated successfully.');
                            Ext.getStore('property.PropertyListStore').reload();
                        } else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
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
        });

    },

    getFacilitiesIcons: function (propertyId) {
        if (typeof propertyId == 'undefined')
            propertyId = 0;

        Ext.getStore('property.PropertyFacilityIcons').load({
            params: {
                'id': propertyId,
                'languageId': user_language
            },
            callback: function (records, o, success) {

                var items = [];
                Ext.each(records, function (r) {
                    if (r.data.Checked == 1)
                        checked = true;
                    else
                        checked = false;

                    var newpath = image_path + '/' + escape(r.data.IconPath);
                    items.push({
                        name: 'facilityIconIds',
                        inputValue: r.data.FacilityIconId,
                        padding: 15,
                        checked: checked,
                        boxLabel: '<div style="background-image:url(' + newpath + ');  background-repeat:no-repeat; height:35px;width:35px; display:inline-block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>'
                    })

                });

                getIconFacilities(items);
            }
        })
    },

    getFeatureType: function (propertyId) {
        var me = this;
        if (typeof me.mixins.propertyEdit.windowWidth == 'undefined')
            var passedWidhtforChkGrp = 650;
        else {
            var passedWidhtforChkGrp = me.mixins.propertyEdit.windowWidth;
        }

        if (typeof propertyId == 'undefined')
            propertyId = 0;

        Ext.getStore('property.PropertyFeatureTypeStore').load({
            params: {
                'id': propertyId,
                'languageId': user_language
            },
            callback: function (response, o, success) {

                var finalData = new Object;
                var parentIds = [];

                Ext.each(response, function (r) {
                    var rdata = r.data;
                    var checked;
                    if (rdata.Checked == 1)
                        checked = true;
                    else
                        checked = false;

                    parentIds.push(rdata.PropertyFeatureTypeId);
                    if (typeof finalData[rdata.PropertyFeatureTypeId] == 'undefined')
                        finalData[rdata.PropertyFeatureTypeId] = new Object;

                    finalData[rdata.PropertyFeatureTypeId]['name'] = rdata.TypeName;
                    finalData[rdata.PropertyFeatureTypeId]['id'] = rdata.PropertyFeatureTypeId;

                    if (typeof finalData[rdata.PropertyFeatureTypeId][rdata.PropertyFeatureId] == 'undefined')
                        finalData[rdata.PropertyFeatureTypeId][rdata.PropertyFeatureId] = new Object;

                    finalData[rdata.PropertyFeatureTypeId][rdata.PropertyFeatureId].name = rdata.PropertyFeatureName;
                    finalData[rdata.PropertyFeatureTypeId][rdata.PropertyFeatureId].id = rdata.PropertyFeatureId;
                    finalData[rdata.PropertyFeatureTypeId][rdata.PropertyFeatureId].pid = rdata.PropertyFeatureTypeId;
                    finalData[rdata.PropertyFeatureTypeId][rdata.PropertyFeatureId].checked = checked;
                    finalData[rdata.PropertyFeatureTypeId][rdata.PropertyFeatureId].count = rdata.Count;
                });
                getFeatureTypeOne(finalData, passedWidhtforChkGrp)
            }
        })
    },

    loadStore: function (rec, user_language) {
        Ext.getCmp('propertyBasicInfoEdit').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/property/GetProperty',
            params: {
                id: rec.data.PropertyId,
                languageId: user_language
            },
            success: function (form, action) {
                var flag = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('IsPartner').getValue();
                if (flag == true) {
                    Ext.getCmp('propertyBasicInfoEdit').getForm().findField('AFASId').disable();
                }

                var propertyName = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyName').getValue();
                var title = 'Manage Property_Title'.l('SC31100') + ' - ' + propertyName;
                Ext.getCmp('propertyEditWindow').setTitle(title);
            }
        });

        //		Ext.getStore('property.VideoLibraryListStore').load({
        //			params : {
        //				id : rec.data.PropertyId,
        //				languageId : user_language
        //			},
        //			callback : function (records, o, success) {}
        //		})
    },

    DeletePropertyAction: function (rec) {
        display_alert("MG00080", '', 'C', function (btn) {
            if (btn === 'yes') {
                if (rec.data.PropertyId > 0) {
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/property/DeleteProperty',
                        type: "GET",
                        params: { id: rec.data.PropertyId },
                        success: function (response) {
                            var r = response;
                            if (r.success == true) {
                                //display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Room deleted successfully.');
                                //Ext.getStore('property.PropertyListStore').loadPage(1);
                                var grid = me.getPropertylist();
                                var store = grid.getStore();
                                Utils.RefreshGridonDelete(grid, store);
                            }
                            else {
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function () { }
                    })
                }
            }
        })
    }

});