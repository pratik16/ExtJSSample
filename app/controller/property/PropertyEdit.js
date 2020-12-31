Ext.define('Regardz.controller.property.PropertyEdit', {
    extend: 'Ext.app.Controller',
    views: ['property.PropertyEdit', 'property.PropertyEditLang', 'Regardz.view.property.PropertyContentLang', 'property.OutletGlobalList',
            'property.MeetingTypesList', 'property.AtmosphereList', 'property.FacilitiesList', 'common.ImageUploadEditor'],
    stores: ['property.PropertyFacilityIcons', 'property.PropertyEditLangStore', 'property.PropertyFeatureTypeStore', 'property.PropertyFeatureType2Store', 'common.LanguageListStore',
                'property.OutletGlobalListPropertyStore', 'property.RoomTypePropertyStore', 'property.DepartmentPropertyStore', 'property.FloorPropertyStore', 'property.PhotoGalleryListStore'],

    refs: [{
        ref: 'imageuploadeditor',
        selector: 'imageuploadeditor'
    }, {
        ref: 'propertyedit',
        selector: 'propertyedit'
    }, {
        ref: 'proeprtyRoomType',
        selector: '[itemid=ProeprtyRoomType]'
    }, {
        ref: 'proeprtyOutlets',
        selector: '[itemid=ProeprtyOutlets]'
    }, {
        ref: 'proeprtyDepartment',
        selector: '[itemid=ProeprtyDepartment]'
    },
    {
        ref: 'PropertyFloors',
        selector: '[itemid=PropertyFloors]'
    },
    {
        ref: 'ProeprtyPhotoGallery',
        selector: '[itemid=ProeprtyPhotoGallery]'
    }
    ],

    FloorPlanController: false,
    VideoLibraryController: false,
    PhotoGalleryController: false,
    OutletGlobalController: false,
    ItemGlobalController: false,
    ManageRoomsController: false,
    MeetingTypesController: false,
    AtmosphereController: false,
    PropertyFacilityIconsController: false,
    //Window
    init: function () {
        var me = this;

        this.control(
        {
            'propertylist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'PropertyName')
                        this.PropertyName(zRec);
                    else if (fieldName == 'PropertyEdit')
                        this.PropertyEdit(zRec);
                    else if (fieldName == 'PropertyMap')
                        this.PropertyMap(zRec);
                    //                    else if (fieldName == 'PropertyVideos')
                    //                        this.PropertyVideos(zRec);
                    //                    else if (fieldName == 'PropertyFloorPlan')
                    //                        this.PropertyFloorPlan(zRec);
                    //                    else if (fieldName == 'PropertyPhotos')
                    //                        this.PropertyPhotos(zRec);
                    else if (fieldName == 'PropertyStatusChange')
                        this.PropertyStatusChange(zRec);
                }
            },

            'propertyedit': {
                afterrender: function (t, e, eo) {//t => this, e => event, eo => Eoptional



                    /*
                    debugger;
                    //var basicInformationPan = Ext.ComponentQuery.query('panel[itemid=basicinformation]')[0];
                    var basicInformationPan = Ext.ComponentQuery.query('propertyedit tabpanel panel[itemid=basicinformation]')[0];
                    var propertyContentPan = Ext.ComponentQuery.query('propertyedit tabpanel panel[itemid=propertyContent]')[0];
                    var propertyfeaturePan = Ext.ComponentQuery.query('propertyedit tabpanel panel[itemid=propertyfeature]')[0];
                    var floorPlanPan = Ext.ComponentQuery.query('propertyedit tabpanel panel[itemid=floorPlan]')[0];
                    var videolibraryPan = Ext.ComponentQuery.query('propertyedit tabpanel panel[itemid=videolibrary]')[0];
                    var photogalleryPan = Ext.ComponentQuery.query('propertyedit tabpanel panel[itemid=photogallery]')[0];
                    var itemGlobalPan = Ext.ComponentQuery.query('propertyedit tabpanel panel[itemid=item]')[0];
                    var roominventoryPan = Ext.ComponentQuery.query('propertyedit tabpanel panel[itemid=roominventory]')[0];
                    var roomPriceRevenuePan = Ext.ComponentQuery.query('propertyedit tabpanel panel[itemid=roomPriceRevenue]')[0];
                    var yieldCalendarPan = Ext.ComponentQuery.query('propertyedit tabpanel panel[itemid=yieldCalendar]')[0];
                    var yieldTemplatePan = Ext.ComponentQuery.query('propertyedit tabpanel panel[itemid=yieldTemplate]')[0];
                    //c.getStore().load({ params: { 'id': PropertyId} });
                    
                    propertyContentPan.disabled = true;
                    propertyfeaturePan.disabled = true;
                    floorPlanPan.disabled = true;
                    videolibraryPan.disabled = true;
                    photogalleryPan.disabled = true;
                    itemGlobalPan.disabled = true;
                    roominventoryPan.disabled = true;
                    roomPriceRevenuePan.disabled = true;
                    yieldCalendarPan.disabled = true;
                    yieldTemplatePan.disabled = true;

                    var propBasicInfo = new Object();
                    propBasicInfo.moduleName = 'PROP002';

                    if (Utils.ValidateUserAccess(propBasicInfo)) {
                    basicInformationPan.disabled = true;
                    }

                    var propContent = new Object();
                    propContent.moduleName = 'PROP002';

                    if (Utils.ValidateUserAccess(propContent)) {
                    propContent.disabled = true;
                    }

                    var propFeaturePan = new Object();
                    propFeaturePan.moduleName = 'PROP004';

                    if (Utils.ValidateUserAccess(propFeaturePan)) {
                    propFeaturePan.disabled = true;
                    }

                    var floorPlan = new Object();
                    floorPlan.moduleName = 'PROP005';

                    if (Utils.ValidateUserAccess(floorPlan)) {
                    floorPlanPan.disabled = true;
                    }

                    var videolibrary = new Object();
                    videolibrary.moduleName = 'PROP006';

                    if (Utils.ValidateUserAccess(videolibrary)) {
                    videolibrary.disabled = true;
                    }

                    */
                }
            },

            'propertyedit button[action="propertyEdit"]': {

                click: function (t, e) {
                    var local = t;

                    if (Ext.getCmp('propertyBasicInfoEdit').getForm().isValid() &&
						Ext.getCmp('propertyContent').getForm().isValid()) {
                        var propertyEdit = Ext.getCmp('propertyBasicInfoEdit').getForm().getValues();

                        if (propertyEdit.IsActive == 'on')
                            propertyEdit.IsActive = true;
                        else
                            propertyEdit.IsActive = false;

                        if (propertyEdit.IsPartner == 'on')
                            propertyEdit.IsPartner = true;
                        else
                            propertyEdit.IsPartner = false;

                        propertyEdit.id = propertyEdit.PropertyId;

                        propertyEdit.PropertyContent = Ext.util.Format.htmlEncode(Ext.getCmp('propertyContent').getForm().findField('PropertyContent').getValue());

                        if (propertyEdit.PropertyId > 0) {
                            // propertyEdit.UpdatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                            //  propertyEdit.UpdatedBy = CurrentSessionUserId;

                            Ext.getCmp('propertyBasicInfoEdit').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('propertyBasicInfoEdit').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);

                            var propertyEditURL = webAPI_path + "api/property/UpdateProperty";

                        } else {
                            //  propertyEdit.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                            //  propertyEdit.CreatedBy = CurrentSessionUserId;
                            Ext.getCmp('propertyBasicInfoEdit').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('propertyBasicInfoEdit').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                            var propertyEditURL = webAPI_path + "api/property/AddProperty";
                        }

                        var meetingIds = '';
                        if (typeof Ext.getCmp('meetingtypes') != 'undefined') {
                            var meetingtypes = Ext.getCmp('meetingtypes').store.data;
                            if (meetingtypes != null && meetingtypes.length > 0) {
                                for (var i = 0; i < meetingtypes.length; i++) {
                                    if (meetingtypes.items[i].data.Checked == "1")
                                        meetingIds += meetingtypes.items[i].data.PropertyFeatureId + ",";
                                }
                            }
                        }

                        var atmosphereIds = '';
                        if (typeof Ext.getCmp('atmospheres') != 'undefined') {
                            var atmospheres = Ext.getCmp('atmospheres').store.data;
                            if (atmospheres != null && atmospheres.length > 0) {
                                for (var i = 0; i < atmospheres.length; i++) {
                                    if (atmospheres.items[i].data.Checked == "1")
                                        atmosphereIds += atmospheres.items[i].data.PropertyFeatureId + ",";
                                }
                            }
                        }

                        var facilityIconIds = '';
                        if (typeof Ext.getCmp('facilities') != 'undefined') {
                            var facilities = Ext.getCmp('facilities').store.data;
                            if (facilities != null && facilities.length > 0) {
                                for (var i = 0; i < facilities.length; i++) {
                                    if (facilities.items[i].data.Checked == "1")
                                        facilityIconIds += facilities.items[i].data.FacilityIconId + ",";
                                }
                            }
                        }

                        //Property Profile Edit page

                        /*Department Ids*/
                        var DepartmentIds = '';
                        if (typeof me.getProeprtyDepartment() != 'undefined') {
                            var ProeprtyDepartment = me.getProeprtyDepartment().store.data;
                            if (ProeprtyDepartment != null && ProeprtyDepartment.length > 0) {
                                for (var i = 0; i < ProeprtyDepartment.length; i++) {
                                    if (ProeprtyDepartment.items[i].data.Checked == "1")
                                        DepartmentIds += ProeprtyDepartment.items[i].data.SubDepartmentId + ",";
                                }
                            }
                        }
                        DepartmentIds = DepartmentIds.replace(/\,$/, '');


                        /*RoomType Ids*/
                        var RoomTypeIds = '';
                        if (typeof me.getProeprtyRoomType() != 'undefined') {
                            var RoomTypes = me.getProeprtyRoomType().store.data;
                            if (RoomTypes != null && RoomTypes.length > 0) {
                                for (var i = 0; i < RoomTypes.length; i++) {
                                    if (RoomTypes.items[i].data.Checked == "1" && RoomTypes.items[i].data.BreakDown != 1)
                                        RoomTypeIds += RoomTypes.items[i].data.RoomTypeId + ",";
                                }
                            }
                        }

                        RoomTypeIds = RoomTypeIds.replace(/\,$/, '');

                        /*Outlet Ids*/
                        var OutletIds = '';
                        if (typeof me.getProeprtyOutlets() != 'undefined') {
                            var Outlets = me.getProeprtyOutlets().store.data;
                            if (Outlets != null && Outlets.length > 0) {
                                for (var i = 0; i < Outlets.length; i++) {
                                    if (Outlets.items[i].data.Checked == "1")
                                        OutletIds += Outlets.items[i].data.OutletId + ",";
                                }
                            }
                        }

                        OutletIds = OutletIds.replace(/\,$/, '');

                        /*Floors Ids*/
                        var FloorIds = '';
                        if (typeof me.getPropertyFloors() != 'undefined') {
                            var PropertyFloors = me.getPropertyFloors().store.data;
                            if (PropertyFloors != null && PropertyFloors.length > 0) {
                                for (var i = 0; i < PropertyFloors.length; i++) {
                                    if (PropertyFloors.items[i].data.Checked == "1")
                                        FloorIds += PropertyFloors.items[i].data.FloorId + ",";
                                }
                            }
                        }

                        FloorIds = FloorIds.replace(/\,$/, '');

                        /*Photo section*/
                        var RotateIds = '';
                        var CoverId = 0;
                        if (typeof me.getProeprtyPhotoGallery() != 'undefined') {
                            var PropertyPhotos = me.getProeprtyPhotoGallery().store.data;
                            if (PropertyPhotos != null && PropertyPhotos.length > 0) {
                                for (var i = 0; i < PropertyPhotos.length; i++) {
                                    if (PropertyPhotos.items[i].data.IsRotate == true)
                                        RotateIds += PropertyPhotos.items[i].data.PhotoGalleryId + ",";

                                    if (PropertyPhotos.items[i].data.IsCoverPhoto == true)
                                        CoverId = PropertyPhotos.items[i].data.PhotoGalleryId;
                                }
                            }
                            RotateIds = RotateIds.replace(/\,$/, '');
                        }
                        //------

                        propertyEdit.featureIds = meetingIds + atmosphereIds;
                        propertyEdit.facilityIconIds = facilityIconIds;

                        Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyContent').setValue(propertyEdit.PropertyContent);
                        Ext.getCmp('propertyBasicInfoEdit').getForm().findField('featureIds').setValue(propertyEdit.featureIds); ////////////////////
                        Ext.getCmp('propertyBasicInfoEdit').getForm().findField('facilityIconIds').setValue(propertyEdit.facilityIconIds);

                        /*Property Profile Page Grid*/
                        Ext.getCmp('propertyBasicInfoEdit').getForm().findField('DepartmentIds').setValue(DepartmentIds);
                        Ext.getCmp('propertyBasicInfoEdit').getForm().findField('RoomTypeIds').setValue(RoomTypeIds);
                        Ext.getCmp('propertyBasicInfoEdit').getForm().findField('OutletIds').setValue(OutletIds);
                        Ext.getCmp('propertyBasicInfoEdit').getForm().findField('FloorIds').setValue(FloorIds);
                        Ext.getCmp('propertyBasicInfoEdit').getForm().findField('RotateIds').setValue(RotateIds);
                        Ext.getCmp('propertyBasicInfoEdit').getForm().findField('RotateIds').setValue(RotateIds);
                        Ext.getCmp('propertyBasicInfoEdit').getForm().findField('CoverId').setValue(CoverId);


                        var Postcode = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('Postalcode').getValue();

                        if (!Utils.ValidatePostCodeFormate(1, Postcode)) {
                            return false;
                        }
                        var propEditForm = Ext.getCmp('propertyBasicInfoEdit').getForm();
                        var PropertyDebtorId = propEditForm.findField('DebtorId').getValue();
                        var PropertyABPCommission = propEditForm.findField('ABPcommission').getValue();
                        var PropertyisPartnereChecked = propEditForm.findField('IsPartner').checked;
                        if (PropertyisPartnereChecked && PropertyABPCommission.length <= 0 && PropertyABPCommission == "") {
                            Ext.Msg.alert('Error'.l('g'), 'Please insert the ABP Commission'.l('SC31100'));
                            return false;
                        }
                        if (PropertyisPartnereChecked && PropertyDebtorId.length <= 0 && PropertyDebtorId == "") {
                            Ext.Msg.alert('Error'.l('g'), 'Please insert the property debtor id'.l('SC31100'));
                            return false;
                        }
                        Ext.getCmp('propertyBasicInfoEdit').getForm().submit({
                            url: propertyEditURL,
                            method: 'POST',
                            //  data: propertyEdit,
                            success: function (form, response) {

                                var r = response.response.responseText;
                                var r = Ext.decode(r);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                /*Commented as response text not came from API*/
                                if (r.success == true) {

                                    if (local.itemid == "saveandclose") {
                                        var win = Ext.WindowManager.getActive();
                                        if (win) {
                                            win.close();
                                        }
                                    }
                                    //display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                    Ext.getStore('property.PropertyListStore').reload()
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
                }
            },

            'propertyedit button[action="basicPropertyLanguage"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
                    var me = this;
                    var window = Ext.create('widget.propertyeditlang');
                    var btnCmp = Ext.ComponentQuery.query('[itemid="basicPropertyLanguage"]')[0];
                    window.alignTo(btnCmp, "br?", [-5, -5]);
                    window.show();
                }
            },

            'propertyedit tabpanel tab': {
                activate: function (t, eo, c) {//t => this, e => event, eo => Eoptional

                    if (t.card.itemid == "floorPlan") {
                        me.loadFloarPlan(me, me.propertyId)
                    }
                    else if (t.card.itemid == "videolibrary") {
                        me.loadVideoLibrary(me, me.propertyId)
                    }
                    else if (t.card.itemid == "photogallery") {
                        me.loadPhotoGallery(me, me.propertyId)
                    }
                    else if (t.card.itemid == "item") {
                        me.loadItem(me, me.propertyId)
                    }
                    else if (t.card.itemid == "outlet") {
                        me.loadOutlet(me, me.propertyId)
                    }
                    else if (t.card.itemid == "roominventory") {
                        me.loadRoomInventory(me, me.propertyId)
                    }
                    else if (t.card.itemid == "roomtype") {
                        me.loadPropertyRoomType(me, me.propertyId)
                    }
                    else if (t.card.itemid == "propertyfeature") {
                        me.loadPropertyfeature(me, me.propertyId)
                    }
                    else if (t.card.itemid == "roomPriceRevenue") {
                        me.loadRoomPriceRevenue(me, me.propertyId)
                    }
                    else if (t.card.itemid == "yieldCalendar") {
                        me.loadYieldCalendar(me, me.propertyId)
                    }
                    else if (t.card.itemid == "yieldTemplate") {
                        me.loadYieldTemplate(me, me.propertyId)
                    }
                    else if (t.card.itemid == "cashRegister") {
                        me.loadCashRegister(me, me.propertyId)
                    }
                }
            },

            'propertyedit button[action="basicPropertyContentLanguage"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
                    var window = Ext.create('widget.propertycontentlang');
                    var btnCmp = Ext.ComponentQuery.query('[itemid="basicPropertyContentLanguage"]')[0];
                    window.alignTo(btnCmp, "br?", [-5, -5]);
                    window.show();
                }
            },

            'propertyedit checkbox[action="isPartnere"]': {
                change: function (field, newVal, oldVal, eOpts) {
                    var propEditForm = Ext.getCmp('propertyBasicInfoEdit').getForm();
                    if (newVal == false) {
                        // Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PartnerLevel').hide();                        
                        propEditForm.findField('AFASId').enable();
                        propEditForm.findField('ABPEmail').setValue('');
                        propEditForm.findField('ABPEmail').disable();
                        propEditForm.findField('ABPcommission').setValue('');
                        propEditForm.findField('ABPcommission').disable();
                        propEditForm.findField('DebtorId').setValue('');
                        propEditForm.findField('DebtorId').disable();
                    }
                    else {
                        //  Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PartnerLevel').show();
                        propEditForm.findField('AFASId').disable();
                        propEditForm.findField('ABPcommission').enable();
                        propEditForm.findField('ABPEmail').enable();
                        propEditForm.findField('DebtorId').enable();
                    }
                }
            },

            'propertyeditlang': {
                afterrender: function (t, eOpt) {

                    // var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    // var languageId = user_language;

                    // this.languageBasicFormLoad(PropertyId, languageId)
                }
            },

            'propertyeditlang button[action="propertyEditLang"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
                    if (Ext.getCmp('propertyEditLng').getForm().isValid()) {

                        var propertyEditLngURL = webAPI_path + "api/property/UpdatePropertyMultiLang";

                        Ext.getCmp('propertyEditLng').getForm().submit({
                            url: propertyEditLngURL,
                            method: 'POST',
                            //  data: Ext.getCmp('propertyEditLng').getForm().getValues(),
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
                                    //                                            display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));                                            
                                    //                                        }
                                    //                                    });
                                    Ext.getStore('property.PropertyListStore').reload();

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
                                var r = response.response.responseText;
                                r = Ext.decode(r);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.data.JsonP.request({
                                    url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                    success: function () {
                                        Ext.Msg.alert('Error'.l('g'), ResultText);
                                    }
                                });
                            }
                        })
                    }
                }
            },

            'propertycontentlang': {
                afterrender: function (t, eOpt) {
                    //var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    //var languageId = user_language;

                    // this.languageContentFormLoad(PropertyId, languageId)
                }
            },

            'propertycontentlang button[action="propertyContentEditLang"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
                    if (Ext.getCmp('propertyEditContentLng').getForm().isValid()) {

                        var propertyEditLngURL = webAPI_path + "api/property/UpdatePropertyMultiLang";
                        var formData = Ext.getCmp('propertyEditContentLng').getForm().getValues();
                        formData.PropertyContent = Ext.util.Format.htmlEncode(formData.PropertyContent);

                        Ext.getCmp('propertyEditContentLng').getForm().findField('PropertyContent').setValue(formData.PropertyContent);

                        Ext.getCmp('propertyEditContentLng').getForm().submit({
                            url: propertyEditLngURL,
                            method: 'POST',
                            //  data: formData,
                            success: function (form, response) {

                                var r = response.response.responseText;
                                var r = Ext.decode(r);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close();
                                }

                                /*Commented as response text not came from API*/
                                if (r.success == true) {
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            //display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                            Ext.getStore('property.PropertyListStore').reload();
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
                                var r = response.response.responseText;
                                var r = jsonDecode(r);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.data.JsonP.request({
                                    url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                    success: function () {
                                        Ext.Msg.alert('Error'.l('g'), ResultText);
                                    }
                                });
                            }
                        })
                    }
                }
            },

            'propertycontentlang button[action="propertyEditLang"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
                    if (Ext.getCmp('propertyEditLng').getForm().isValid()) {

                        var propertyEditLngURL = webAPI_path + "api/property/UpdatePropertyMultiLang";

                        Ext.getCmp('propertyEditLng').getForm().submit({
                            url: propertyEditLngURL,
                            method: 'POST',
                            // data: Ext.getCmp('propertyEditLng').getForm().getValues(),
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
                                    //display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));

                                }
                                else {
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
                }
            },

            'propertyeditlang combo[name="LanguageId"]': {
                //change: function (t, newV, oldV, eOpt) {
                select: function (combo, records, eOpt) {

                    var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    var languageId = records[0].data.LanguageId;

                    this.languageBasicFormLoad(PropertyId, languageId)
                }
            },

            'propertycontentlang combo[name="LanguageId"]': {
                //change: function (t, newV, oldV, eOpt) {
                select: function (combo, records, eOpt) {

                    var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    var languageId = records[0].data.LanguageId;

                    this.languageContentFormLoad(PropertyId, languageId)
                }
            },

            'button[action="imageeditor"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    Ext.create('widget.imageuploadeditor', { section: t.scope.section }).show();
                }
            },

            'imageuploadeditor button[action="htmleditor_imginsert"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional

                    var c = Ext.ComponentQuery.query('imageuploadeditor [itemid=imageuploadhtmleditor]')[0];

                    var section = c.isContained.section;

                    var POSTURL = webAPI_path + 'api/property/PostImageForPropertyContent';

                    var currTimeStamp = new Date().getTime();

                    var uploadedFileName = Ext.getCmp('imageuploadhtmleditor').getForm().findField('postedFile').getValue();

                    Ext.getCmp('imageuploadhtmleditor').getForm().findField('newFileName').setValue(currTimeStamp);
                    var uploadedFileName = Ext.getCmp('imageuploadhtmleditor').getForm().findField('postedFile').getValue();
                    var extension = uploadedFileName.split('.').pop();

                    var fileName = Ext.getCmp('imageuploadhtmleditor').getForm().findField('newFileName').getValue();

                    if (Ext.getCmp('imageuploadhtmleditor').getForm().isValid()) {
                        Ext.getCmp('imageuploadhtmleditor').getForm().submit({
                            url: POSTURL,
                            params: Ext.getCmp('imageuploadhtmleditor').getForm().getValues(),
                            waitMsg: 'Uploading file please wait.'.l('g'),
                            success: function (form, response) {

                                var newFile = PropertyContentImages + fileName + "." + extension;
                                //    var newFile = PropertyContentImages + "eced543d-013d-4ff4-a25e-1ef7d83a0cd8.png";
                                if (section == "PropertyEditLang") {
                                    var c = Ext.ComponentQuery.query('propertycontentlang [itemid=propertycontenteditorlang]')[0];
                                }
                                else
                                    var c = Ext.ComponentQuery.query('propertyedit [itemid=propertycontenteditor]')[0];

                                if (Ext.isIE) c.insertAtCursor('<img src="' + newFile + '" alt="" title="" >');
                                else c.insertAtCursor('<img src="' + newFile + '" alt="" title="" >');

                                me.getImageuploadeditor().close();

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

            'button[action="targetLink"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
                    var c = Ext.ComponentQuery.query('propertyedit [itemid=propertycontenteditor]')[0];
                    var e = c.textareaEl.dom;
                }
            }
        })
    },

    PropertyName: function (rec) {
        //alert(rec.data.PropertyName);
    },

    PropertyEdit: function (rec) {
        // alert(rec.data.PropertyName);
    },

    PropertyMap: function (rec) {

    },

    PropertyVideos: function (rec) {
        //alert(rec.data.PropertyName);
    },

    PropertyFloorPlan: function (rec) {
        ///alert(rec.data.PropertyName);
    },

    PropertyPhotos: function (rec) {
        //alert(rec.data.PropertyName);
    },

    PropertyStatusChange: function (rec) {

    },

    index: function (propertyId) {
        var me = this;

        if (propertyId > 0) {
        }
        else
            propertyId = 0;

        Ext.getStore('property.OutletGlobalListPropertyStore').proxy.setExtraParam('id', propertyId);
        Ext.getStore('property.RoomTypePropertyStore').proxy.setExtraParam('id', propertyId);
        Ext.getStore('property.DepartmentPropertyStore').proxy.setExtraParam('id', propertyId);
        Ext.getStore('property.FloorPropertyStore').proxy.setExtraParam('id', propertyId);
        this.loadPropertyfeature(me, propertyId);
        Ext.create('widget.propertyedit', { propertyId: propertyId });
        me.propertyId = propertyId;

    },

    languageContentFormLoad: function (PropertyId, languageId) {
        Ext.getStore('property.PropertyEditLangStore').load({
            params: {
                'id': PropertyId,
                'languageId': languageId
            },
            callback: function (records, o, success) {
                if (typeof o.response.data != 'undefined') {
                    var data = o.response.data;
                    Ext.getCmp('propertyEditContentLng').getForm().setValues(data);
                    Ext.getCmp('propertyEditContentLng').getForm().findField('PropertyContent').setValue(Ext.util.Format.htmlDecode(data.PropertyContent));
                }
            }
        })
    },

    languageBasicFormLoad: function (PropertyId, languageId) {
        Ext.getStore('property.PropertyEditLangStore').load({
            params: {
                'id': PropertyId,
                'languageId': languageId
            },
            callback: function (records, o, success) {
                if (typeof o.response.data != 'undefined') {
                    var data = o.response.data;
                    Ext.getCmp('propertyEditLng').getForm().setValues(data);
                }
            }
        })
    },

    loadFloarPlan: function (me, propertyId) {

        var cf = me.getController('property.FloorPlan');

        if (me.FloorPlanController == false && typeof cf != 'undefined') {
            cf.init();
            me.FloorPlanController = true;
        }

        if (propertyId > 0) {
        }
        else
            propertyId = 0;

        var obj = Ext.getStore('property.FloorPlanStore').proxy.extraParams;
        Ext.getStore('property.FloorPlanStore').proxy.setExtraParam('searchParam', null);
        if (obj.id != propertyId) {
            Ext.getStore('property.FloorPlanStore').proxy.setExtraParam('id', propertyId);
            Ext.getStore('property.FloorPlanStore').proxy.setExtraParam('languageId', user_language);
            Ext.getStore('property.FloorPlanStore').proxy.setExtraParam('searchParam', '');

            Ext.getStore('property.FloorPlanStore').loadPage(1);
        }

        /*Get container*/
        var c = Ext.ComponentQuery.query('tabpanel [itemid=floorPlan]')[0];

        var floorPlan = Ext.create('widget.floorplan');
        var floorplangrid = Ext.ComponentQuery.query('[itemid=floorplangrid]')[0];
        var floorplanpdfPreview = Ext.ComponentQuery.query('[itemid=florPlanPreview]')[0];

        me.getPropertyedit().fireEvent('resize', me.getPropertyedit(), me.getPropertyedit().getWidth(), me.getPropertyedit().getHeight());

        var childHeight = parseInt(me.getPropertyedit().getHeight() - gridHeaderHeight);
        // var childHeight = parseInt(me.getPropertyedit().getHeight() * (0.77));

        floorPlan.setHeight(childHeight);
        if (floorPlan && floorPlan.items && floorPlan.items.items[0]) {
            floorPlan.items.items[0].setHeight(childHeight - 35);
        }
        if (floorPlan && floorPlan.items && floorPlan.items.items[1] && floorPlan.items.items[1].items && floorPlan.items.items[1].items.items[1]) {
            floorPlan.items.items[1].items.items[1].setHeight(childHeight - 80);
        }

        c.removeAll(true);
        c.add(floorPlan);
        c.doLayout();
    },

    loadVideoLibrary: function (me, propertyId) {

        var cv = me.getController('property.VideoLibrary');
        if (me.VideoLibraryController == false && typeof cv != 'undefined') {
            cv.init();
            me.VideoLibraryController = true;
        }

        var obj = Ext.getStore('property.VideoLibraryListStore').proxy.extraParams;
        if (obj.id != propertyId) {
            //Load video store as edit form
            Ext.getStore('property.VideoLibraryListStore').proxy.setExtraParam('id', propertyId);
            Ext.getStore('property.VideoLibraryListStore').proxy.setExtraParam('languageId', user_language);
            Ext.getStore('property.VideoLibraryListStore').proxy.setExtraParam('searchParam', '');
            Ext.getStore('property.VideoLibraryListStore').load();
        }

        /*Get container*/
        var c = Ext.ComponentQuery.query('tabpanel [itemid=videolibrary]')[0];

        var videolibrary = Ext.create('widget.videolibrarylist');

        me.getPropertyedit().fireEvent('resize', me.getPropertyedit(), me.getPropertyedit().getWidth(), me.getPropertyedit().getHeight());
        var childHeight = parseInt(me.getPropertyedit().getHeight() - gridHeaderHeight);

        videolibrary.setHeight(childHeight);
        if (videolibrary && videolibrary.items && videolibrary.items.items[0]) {
            videolibrary.items.items[0].setHeight(childHeight - 35);
        }
        if (videolibrary && videolibrary.items && videolibrary.items.items[1] && videolibrary.items.items[1].items && videolibrary.items.items[1].items.items[1]) {
            videolibrary.items.items[1].items.items[1].setHeight(childHeight - 80);
        }

        c.removeAll(true);
        c.add(videolibrary);
        c.doLayout();

    },

    loadPhotoGallery: function (me, propertyId) {
        var cp = me.getController('property.PhotoGallery');

        if (me.PhotoGalleryController == false && typeof cp != 'undefined') {
            cp.init();
            me.PhotoGalleryController = true;
        }

        var obj = Ext.getStore('property.PhotoGalleryListStore').proxy.extraParams;
        if (obj.id != propertyId) {
            /*Load photo album at edit section*/
            Ext.getStore('property.PhotoGalleryListStore').proxy.setExtraParam('id', propertyId);
            Ext.getStore('property.PhotoGalleryListStore').proxy.setExtraParam('languageId', user_language);
            //  Ext.getStore('property.PhotoGalleryListStore').loadPage(1);
        }

        /*Get container*/
        var c = Ext.ComponentQuery.query('tabpanel [itemid=photogallery]')[0];

        var photogallery = Ext.create('widget.photogallerylist');

        me.getPropertyedit().fireEvent('resize', me.getPropertyedit(), me.getPropertyedit().getWidth(), me.getPropertyedit().getHeight());

        var childHeight = parseInt(me.getPropertyedit().getHeight() - gridHeaderHeight);
        // var childHeight = parseInt(me.getPropertyedit().getHeight() * (0.77));
        photogallery.setHeight(childHeight);

        c.removeAll(true);
        c.add(photogallery);
        c.doLayout();
    },

    loadItem: function (me, propertyId) {
        var ci = me.getController('property.ItemGlobal');

        if (me.ItemGlobalController == false && typeof ci != 'undefined') {
            ci.init();
            me.ItemGlobalController = true;
        }


        /*Get container*/
        var c = Ext.ComponentQuery.query('tabpanel [itemid=item]')[0];

        var item = Ext.create('widget.itemgloballist');
        var itemObject = new Object();
        itemObject.categoryId = 0;
        ci.filterItemPrice(itemObject);

        me.getPropertyedit().fireEvent('resize', me.getPropertyedit(), me.getPropertyedit().getWidth(), me.getPropertyedit().getHeight());

        var childHeight = parseInt(me.getPropertyedit().getHeight() - gridHeaderHeight);

        item.setHeight(childHeight);
        // me.getPropertyedit().fireEvent('resize');

        c.removeAll(true);
        c.add(item);
        c.doLayout();
    },

    loadOutlet: function (me, propertyId) {
        var co = me.getController('property.OutletGlobal');

        if (me.OutletGlobalController == false && typeof co != 'undefined') {
            co.init();
            me.OutletGlobalController = true;
        }

        var obj = Ext.getStore('property.OutletGlobalListStore').proxy.extraParams;
        if (obj.id != propertyId) {
            Ext.getStore('property.OutletGlobalListStore').proxy.setExtraParam('id', propertyId);
            Ext.getStore('property.OutletGlobalListStore').proxy.setExtraParam('languageId', user_language);
            //Ext.getStore('property.OutletGlobalListStore').loadPage(1);
        }

        /*Get container*/
        var c = Ext.ComponentQuery.query('tabpanel [itemid=outlet]')[0];

        var item = Ext.create('widget.outletgloballist');

        me.getPropertyedit().fireEvent('resize', me.getPropertyedit(), me.getPropertyedit().getWidth(), me.getPropertyedit().getHeight());
        var childHeight = parseInt(me.getPropertyedit().getHeight() - gridHeaderHeight);
        item.setHeight(childHeight);

        c.removeAll(true);
        c.add(item);
        c.doLayout();
    },

    loadRoomInventory: function (me, propertyId) {
        var cr = me.getController('property.ManageRooms');

        if (me.ManageRoomsController == false && typeof cr != 'undefined') {
            cr.init();
            me.ManageRoomsController = true;
        }

        /*Get container*/
        var c = Ext.ComponentQuery.query('tabpanel [itemid=roominventory]')[0];

        var roomInventory = Ext.create('widget.roomlist');

        me.getPropertyedit().fireEvent('resize', me.getPropertyedit(), me.getPropertyedit().getWidth(), me.getPropertyedit().getHeight());
        var childHeight = parseInt(me.getPropertyedit().getHeight() - gridHeaderHeight);
        roomInventory.setHeight(childHeight);

        c.removeAll(true);
        c.add(roomInventory);
        c.doLayout();
    },

    loadPropertyRoomType: function (me, propertyId) {
        var cr = me.getController('property.ManageRoomsType');

        if (cr.thisController == false && typeof cr != 'undefined') {
            cr.init();
            cr.thisController = true;
        }

        /*Get container*/
        var c = Ext.ComponentQuery.query('tabpanel [itemid=roomtype]')[0];

        var view = Ext.create('widget.propertyroomtypelist');

        me.getPropertyedit().fireEvent('resize', me.getPropertyedit(), me.getPropertyedit().getWidth(), me.getPropertyedit().getHeight());
        var childHeight = parseInt(me.getPropertyedit().getHeight() - gridHeaderHeight);
        view.setHeight(childHeight);

        c.removeAll(true);
        c.add(view);
        c.doLayout();
    },

    loadPropertyfeature: function (me, propertyId) {
        if (typeof propertyId == 'undefined')
            propertyId = 0;

        ///// This code will change, stores will load on tab-click
        Ext.getStore('property.PropertyFeatureTypeStore').proxy.setExtraParam('id', propertyId);
        Ext.getStore('property.PropertyFeatureTypeStore').proxy.setExtraParam('id1', user_language);
        Ext.getStore('property.PropertyFeatureTypeStore').proxy.setExtraParam('id2', 2);
        Ext.getStore('property.PropertyFeatureTypeStore').proxy.setExtraParam('languageId', '');
        Ext.getStore('property.PropertyFeatureTypeStore').load();

        Ext.getStore('property.PropertyFeatureType2Store').proxy.setExtraParam('id', propertyId);
        Ext.getStore('property.PropertyFeatureType2Store').proxy.setExtraParam('id1', user_language);
        Ext.getStore('property.PropertyFeatureType2Store').proxy.setExtraParam('id2', 1);
        Ext.getStore('property.PropertyFeatureType2Store').proxy.setExtraParam('languageId', '');
        Ext.getStore('property.PropertyFeatureType2Store').load();

        Ext.getStore('property.PropertyFacilityIcons').proxy.setExtraParam('id', propertyId);
        Ext.getStore('property.PropertyFacilityIcons').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('property.PropertyFacilityIcons').load();
        ////// end of This code will change, stores will load on tab-click
    },

    loadRoomPriceRevenue: function (me, propertyId) {
        var cr = me.getController('property.RoomPriceandRevenue');

        if (cr.thisController == false && typeof cr != 'undefined') {
            cr.init();
            cr.thisController = true;
        }

        /*Get container*/
        var c = Ext.ComponentQuery.query('tabpanel [itemid=roomPriceRevenue]')[0];

        var view = Ext.create('widget.roompriceandrevenuelist');

        me.getPropertyedit().fireEvent('resize', me.getPropertyedit(), me.getPropertyedit().getWidth(), me.getPropertyedit().getHeight());
        var childHeight = parseInt(me.getPropertyedit().getHeight() - gridHeaderHeight);
        view.setHeight(childHeight);

        c.removeAll(true);
        c.add(view);
        c.doLayout();
    },
    loadYieldCalendar: function (me, propertyId) {
        var cr = me.getController('property.YieldCalendar');

        if (cr.thisController == false && typeof cr != 'undefined') {
            cr.init();
            cr.thisController = true;
        }

        /*Get container*/
        var c = Ext.ComponentQuery.query('tabpanel [itemid=yieldCalendar]')[0];

        var view = Ext.create('widget.propertyyieldcalendar', { PropertyId: propertyId });

        Ext.data.JsonP.request({
            url: webAPI_path + 'api/yield/CheckYieldTemplateForProperty',
            type: "GET",
            params: { id: propertyId },
            success: function (response) {
                var r = response;
                if (r.success == true && r.result == 'SUCCESS') {
                    var toolbar = view.getDockedItems()[0]; //.getXType();             
                    toolbar.enable(1);
                }
                else {
                    var toolbar = view.getDockedItems()[0]; //.getXType();                    
                    toolbar.disable(1);
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                        success: function () {
                            Ext.Msg.alert('Error'.l('g'), 'There is NO YIELD TEMPLATE defined for this property.'.l('g'));
                        }
                    });
                }
            }
        });

        me.getPropertyedit().fireEvent('resize', me.getPropertyedit(), me.getPropertyedit().getWidth(), me.getPropertyedit().getHeight());
        var childHeight = parseInt(me.getPropertyedit().getHeight() - gridHeaderHeight);
        view.setHeight(childHeight);

        c.removeAll(true);
        c.add(view);
        c.doLayout();
    },
    loadYieldTemplate: function (me, propertyId) {
        var cr = me.getController('property.YieldTemplate');

        if (cr.thisController == false && typeof cr != 'undefined') {
            cr.init();
            cr.thisController = true;
        }

        /*Get container*/
        var c = Ext.ComponentQuery.query('tabpanel [itemid=yieldTemplate]')[0];

        var view = Ext.create('widget.propertyyieldtemplate', { PropertyId: propertyId });

        me.getPropertyedit().fireEvent('resize', me.getPropertyedit(), me.getPropertyedit().getWidth(), me.getPropertyedit().getHeight());
        var childHeight = parseInt(me.getPropertyedit().getHeight() - gridHeaderHeight);
        view.setHeight(childHeight);

        c.removeAll(true);
        c.add(view);
        c.doLayout();
    },
    loadCashRegister: function (me, propertyId) {
        var cr = me.getController('property.CashRegister');

        if (cr.thisController == false && typeof cr != 'undefined') {
            cr.init();
            cr.thisController = true;
        }

        /*Get container*/
        var c = Ext.ComponentQuery.query('tabpanel [itemid=cashRegister]')[0];

        var view = Ext.create('widget.cashregisterlist', { PropertyId: propertyId });

        me.getPropertyedit().fireEvent('resize', me.getPropertyedit(), me.getPropertyedit().getWidth(), me.getPropertyedit().getHeight());
        var childHeight = parseInt(me.getPropertyedit().getHeight() - gridHeaderHeight);
        view.setHeight(childHeight);

        c.removeAll(true);
        c.add(view);
        c.doLayout();
    }
});