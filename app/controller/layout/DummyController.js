Ext.define('Regardz.controller.layout.DummyController', {
    extend: 'Ext.app.Controller',
    views: ['layout.DummyLayout'],
    stores: ['property.PropertyListStore', 'property.PropertyFeatureTypeStore', 'property.VideoLibraryListStore'],    
    requires: ['Regardz.view.property.PropertyMap'],
    mixins: {
        'propertyEdit': 'Regardz.view.property.PropertyEdit'
    },
    PropertyEditController: false,
    refs: [{
        ref: 'PropertyEdit tabpanel',
        selector: 'tabpanel'
    }
    ],
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
            'dummylayout': {
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
                },
                afterrender: function () {
                    alert("enters here");
                    Ext.getStore('property.PropertyListStore').load();
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
                            display_alert('MG00030');
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
            }
        });

        //		Ext.getStore('property.VideoLibraryListStore').load({
        //			params : {
        //				id : rec.data.PropertyId,
        //				languageId : user_language
        //			},
        //			callback : function (records, o, success) {}
        //		})
    }
    //init: function () {

    //    var me = this;

    //  //  var store = 




    //    //alert('dsd');
    //    //var c = me.getController('tempmodule.RoomAvailabilityBlock');
    //    //var cv = c.getView('tempmodule.RoomAvailabilityBlockList');

    //    //if (this.RoomAvailabilityBlock == false) {
    //    //    c.init();
    //    //    this.RoomAvailabilityBlock = true;
    //    //}

    //    //var ws = Ext.getCmp('simplePanel');

    //    //ws.removeAll();

    //    //ws.add(cv);

    //    //ws.doLayout();
    //    //me.control({
    //    //    'label[name=lbl]': {

    //    //        load: function (t, r, i) {

    //    //            var c = me.getController('tempmodule.RoomAvailabilityBlock');
    //    //            var cv = c.getView('tempmodule.RoomAvailabilityBlockList');

    //    //            if (this.RoomAvailabilityBlock == false) {
    //    //                c.init();
    //    //                this.RoomAvailabilityBlock = true;
    //    //            }

    //    //            var ws = Ext.getCmp('right_regionTempmodule');

    //    //            ws.removeAll();

    //    //            ws.add(cv);

    //    //            ws.doLayout();
    //    //        }
    //    //    }
    //    //}
    //    //)
    //},


});

