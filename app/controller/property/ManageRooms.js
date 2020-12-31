Ext.define('Regardz.controller.property.ManageRooms', {
    extend: 'Ext.app.Controller',
    views: ['property.RoomList', 'property.RoomEdit', 'property.ManageBlockedLinkedRooms', 'property.RoomGeneralInfo',
        'property.RoomClassification', 'property.RoomPhotos', 'property.RoomPhotoAdd', 'property.RoomPhotoManageLang', 'property.RoomEditLang'],
    stores: ['property.RoomListStore', 'property.PropertyListComboStore', 'property.RoomTypeComboStore', 'property.OutletsListByPropertyStore',
        'property.RoomListCheckboxStore', 'property.RoomSetupStore', 'property.RoomSetupEditPageStore',
        'property.RoomClasificationStore', 'property.RoomPhotoListStore', 'operations.PlanboardFloorsStore'],

    isSharableData: null,

    CapacitiesData: {
        xtype: 'numberfield',
        fieldLabel: 'Capacity'.l('SC33100'),
        name: 'MaxSharingCapacity',
        allowBlank: false,
        maxValue: 25000,
        minValue: 0
    },

    refs: [{
        ref: 'roomphotoadd',
        selector: 'roomphotoadd'
    },
    {
        ref: 'roomphotomanagelang',
        selector: 'roomphotomanagelang'

    },
    {
        ref: 'roomclassification',
        selector: 'roomclassification grid'
    }, {
        ref: 'roomedit',
        selector: 'roomedit'

    },
    {
        ref: 'roomeditlang',
        selector: 'roomeditlang'
    },
    {
        ref: 'roomlist',
        selector: 'roomlist'
    
    }
    ],

    init: function () {
        var me = this;

        this.control(
			{
			    'roomlist': {
			        cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
			            var fieldName = iView.getGridColumns()[iColIdx].name;
			            var zRec = iView.getRecord(iRowEl);
			            me.roomData = zRec;
			            if (fieldName == 'editRoom')
			                this.editRoomWindow(zRec, null);
			            else if (fieldName == 'cloneRoom')
			                this.cloneRoomWindow(zRec);
			            else if (fieldName == 'changestatusRoom')
			                this.RoomStatusChange(zRec);
			            else if (fieldName == 'deleteRoom')
			                this.deleteRoom(zRec);
			        },

			        afterrender: function (t, eOpt) {
			            var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
			            //Ext.getStore('property.RoomTypeComboStore').proxy.setExtraParam('id', PropertyId);
			            //Ext.getStore('property.RoomTypeComboStore').proxy.setExtraParam('languageId', user_language);
			            //Ext.getStore('property.RoomTypeComboStore').load({});

			            Ext.getStore('property.RoomListStore').proxy.setExtraParam('id', PropertyId);
			            Ext.getStore('property.RoomListStore').proxy.setExtraParam('languageId', user_language);
			            Ext.getStore('property.RoomListStore').proxy.setExtraParam('searchString', null);
			            Ext.getStore('property.RoomListStore').proxy.setExtraParam('id1', null);
			            Ext.getStore('property.RoomListStore').proxy.setExtraParam('id2', null);
			            Ext.getStore('property.RoomListStore').proxy.setExtraParam('flag', false);
			            Ext.getStore('property.RoomListStore').load({});
			            //Ext.getStore('property.RoomListStore').loadPage(1); //loaded from resize event
			            Ext.getStore('property.RoomTypeComboStore').load({
			                params: { 'id': PropertyId, 'languageId': user_language },
			                callback: function (records, o, success) {
			                    var obj = Ext.ComponentQuery.query('roomlist [itemid="roomTypeId"]')[0];
			                    var store = obj.getStore();
			                    var index = store.findExact('RoomTypeId', -1);

			                    if (index == -1) {
			                        store.add({
			                            RoomTypeId: -1,
			                            RoomTypeName: "All Categories".l('SC33000')
			                        });

			                        store.sort('RoomTypeId', 'ASC');
			                        store.commitChanges();
			                        store.loadData(store.data.items);
			                    }

			                    obj.setValue(-1);
			                }
			            });

			            Ext.getStore('operations.PlanboardFloorsStore').load({
			                params: { 'id': PropertyId },
			                callback: function (records, o, success) {
			                    var obj = Ext.ComponentQuery.query('roomlist [itemid="floorid"]')[0];
			                    var store = obj.getStore();
			                    var index = store.findExact('FloorId', -1);

			                    if (index == -1) {
			                        store.add({
			                            FloorId: -1,
			                            FloorName: "All Floors".l('SC33000')
			                        });

			                        store.sort('FloorId', 'ASC');
			                        store.commitChanges();
			                        store.loadData(store.data.items);
			                    }

			                    obj.setValue(-1);
			                }
			            });
			        }
			    },

			    'roomlist button[action="add_room"]': {
			        click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
			            this.editRoomWindow(null);
			            var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
			            Ext.getCmp('room_edit_geninfo').getForm().findField('PropertyId').setValue(PropertyId);
			        }
			    },

			    'roomlist button[action="clearRoomFilter"]': {
			        click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
			            me.clearsearchRoomListFilter();
			        }
			    },

			    'roomlist button[action="searchRooms"]': {
			        click: function (t, e, eo) {//t => this, e => event, eo => Eoptional

			            me.searchRoomListFilter(t);

			        }
			    },

			    'roomedit numberfield[action="room_length"]': {
			        change: function (t, n, o, eo) {//Ext.form.field.Field this, Object newValue, Object oldValue, Object eOpts 
			            var width = Ext.getCmp('room_edit_geninfo').getForm().findField('Width').getValue();
			            //Ext.util.Format.decimalSeparator = ',';
			            if (n != null && typeof n != 'undefined') {
			                var surface = Ext.util.Format.number(width * n, '00.00');
			                Ext.getCmp('room_edit_geninfo').getForm().findField('Surface').setValue(surface);
			            }
			        }
			    },

			    'roomedit numberfield[action="room_width"]': {
			        change: function (t, n, o, eo) {//Ext.form.field.Field this, Object newValue, Object oldValue, Object eOpts 
			            var length = Ext.getCmp('room_edit_geninfo').getForm().findField('Length').getValue();
			            if (n != null && typeof n != 'undefined') {
			                var surface = Ext.util.Format.number(length * n, '00.00');
			                Ext.getCmp('room_edit_geninfo').getForm().findField('Surface').setValue(surface);
			            }
			        }
			    },

			    'roomedit radiogroup[action="is_sharable_checked"]': {
			        change: function (t, n, o, eo) {//Ext.form.field.Field this, Object newValue, Object oldValue, Object eOpts 
			            var roomSetup = Ext.ComponentQuery.query('grid[itemid=roomsetup]')[0];
			            var capacity = Ext.ComponentQuery.query('textfield[itemid=capacities]')[0];
			            var outlet = Ext.ComponentQuery.query('textfield[itemid=outlet]')[0];

			            if (n.IsSharable == 'false') {
			                capacity.disable(true);
			                roomSetup.enable(true);
			                outlet.disable(true);
			            }
			            else {
			                capacity.enable(true);
			                roomSetup.disable(true);
			                outlet.enable(true);
			            }
			        },
			        afterrender: function (t, eOpt) {
			            var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
			            Ext.getStore('property.RoomTypeComboStore').proxy.setExtraParam('id', PropertyId);
			            Ext.getStore('property.RoomTypeComboStore').proxy.setExtraParam('languageId', user_language);
			            Ext.getStore('property.RoomTypeComboStore').load({
			            });

			            /*Some times form not filled and did not get the actual result so get the roomid from the page itself*/
			            // var roomEditData = Ext.getCmp('room_edit_geninfo').getForm().getValues();
			            var roomEditObject = me.getRoomedit();

			            var RoomID = 0;

			            //			            if (roomEditData.RoomId > 0) {
			            //			                RoomID = roomEditData.RoomId;
			            //			            }

			            if (roomEditObject.roomId > 0) {
			                RoomID = roomEditObject.roomId;
			            }

			            Ext.getStore('property.RoomSetupEditPageStore').clearFilter();
			            Ext.getStore('property.RoomSetupEditPageStore').proxy.setExtraParam('id', RoomID);
			            Ext.getStore('property.RoomSetupEditPageStore').proxy.setExtraParam('languageId', user_language);
			            Ext.getStore('property.RoomSetupEditPageStore').load({
			            });
			        }
			    },

			    'roomedit checkbox[action="is_virtual_checked"]': {
			        change: function (t, n, o, eo) {
			            var linkedRooms = Ext.ComponentQuery.query('grid[itemid=linkedroom]')[0];
			            if (n == false) {
			                linkedRooms.disable(true);
			            }
			            else {
			                linkedRooms.enable(true);
			            }
			        },
			        afterrender: function (t, eOpt) {

			            me.loadLinkedRoomGrid();
			        }
			    },

			    'roomedit button[action="room_save"]': {
			        click: function (t, e, eo) {//t => this, e => event, eo => Eoptional			    
			            if (Ext.getCmp('room_edit_geninfo').getForm().isValid()) {

			                var roomEditData = Ext.getCmp('room_edit_geninfo').getForm().getValues();

			                var roomEditURL = webAPI_path + "api/room/ManageRoom";
			                var roomEditCapacitiesURL = webAPI_path + "api/room/ManageRoomCapacities";

			                var clone = Ext.getCmp('room_edit_geninfo').getForm().findField('isClone').getValue();

			                if (roomEditData.isClone == 'true') {
			                    Ext.getCmp('room_edit_geninfo').getForm().findField('RoomId').setValue('0');
			                    roomEditData.RoomId = 0;
			                }

			                if (roomEditData.RoomId > 0) {
			                    Ext.getCmp('room_edit_geninfo').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
			                    Ext.getCmp('room_edit_geninfo').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
			                }
			                else {
			                    Ext.getCmp('room_edit_geninfo').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
			                    Ext.getCmp('room_edit_geninfo').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
			                }

			                var roomsetup = Ext.ComponentQuery.query('grid[itemid=roomsetup]')[0];
			                //   var updatedData = roomsetup.getStore().getUpdatedRecords();
			                var updatedData = roomsetup.getStore().getRange();

			                var strSetup = "";

			                if (updatedData.length > 0) {
			                    Ext.each(updatedData, function (d) {
			                        if (d.data.Capacity != null) {
			                            var Capacity = (d.data.Capacity >= 0) ? d.data.Capacity : 0;
			                            // strSetup = strSetup + Capacity +',';
			                            strSetup = strSetup + d.data.RoomSetupId + ':' + Capacity + ',';
			                        }
			                    });
			                }

			                strSetup = strSetup.replace(/\,$/, '');

			                /*Room Classification ids*/
			                var ClassificationIds = '';
			                if (typeof me.getRoomclassification() != 'undefined') {
			                    var Classification = me.getRoomclassification().store.data;
			                    if (Classification != null && Classification.length > 0) {
			                        for (var i = 0; i < Classification.length; i++) {
			                            if (Classification.items[i].data.Checked == "1")
			                                ClassificationIds += Classification.items[i].data.RoomClassificationId + ",";
			                        }
			                    }
			                }

			                ClassificationIds = ClassificationIds.replace(/\,$/, '');


			                var ChildRoomIds = "";

			                var linkedRooms = Ext.ComponentQuery.query('grid[itemid=linkedroom]')[0];
			                var LinkRoomIds = linkedRooms.getStore().data.items;

			                if (LinkRoomIds.length > 0) {
			                    Ext.each(LinkRoomIds, function (d) {
			                        if (d.data.IsBlocked == true)
			                            ChildRoomIds = ChildRoomIds + d.data.RoomId + ',';
			                    });
			                }

			                ChildRoomIds = ChildRoomIds.replace(/\,$/, '');
			                var isLinkedRoom = Ext.getCmp('room_edit_geninfo').getForm().findField('IsVirtual').getValue();

			                if (ChildRoomIds.length == 0 && isLinkedRoom == true) {
			                    display_alert('MG33150');
			                    return;
			                }
			                /*ENd child room*/
			                Ext.getCmp('room_edit_geninfo').getForm().findField('RoomClassificationIds').setValue(ClassificationIds);
			                Ext.getCmp('room_edit_geninfo').getForm().findField('ChildRoomIds').setValue(ChildRoomIds);

			                Ext.getCmp('room_edit_geninfo').getForm().submit({
			                    url: roomEditURL,
			                    actionMethods: 'POST',
			                    //   waitMsg: 'save_data_message'.l('g'),
			                    // params: Ext.getCmp('room_edit_geninfo').getForm().getValues(),
			                    success: function (form, response) {
			                        var RoomId = null;

			                        if (response.response.responseText != "") {
			                            var response = Ext.decode(response.response.responseText);
			                            RoomId = response.result.RoomId;
			                        }
			                        if (RoomId > 0) {
			                            Ext.Ajax.request({
			                                url: roomEditCapacitiesURL,
			                                type: 'GET',
			                                method: 'GET',
			                                params: {
			                                    id: RoomId,
			                                    id1: strSetup
			                                },
			                                success: function () {
			                                    //me.getRoomedit().close();
			                                    //Ext.getStore('property.RoomListStore').reload();
			                                    /*Not required alert*/
			                                    //			                                    Ext.data.JsonP.request({
			                                    //			                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
			                                    //			                                        success: function () {
			                                    //			                                            display_alert('MG00000');
			                                    //			                                            Ext.getStore('property.RoomListStore').reload();
			                                    //			                                        }
			                                    //			                                    });
			                                }
			                            })
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
			            else {
			                Ext.Msg.alert('Error'.l('g'), 'Some fields are requred, check all tabs.'.l('g'));
			            }
			        }
			    },

			    'roomedit button[action="room_save_close"]': {
			        click: function (t, e, eo) {//t => this, e => event, eo => Eoptional
			            if (Ext.getCmp('room_edit_geninfo').getForm().isValid()) {

			                var roomEditData = Ext.getCmp('room_edit_geninfo').getForm().getValues();

			                var roomEditURL = webAPI_path + "api/room/ManageRoom";
			                var roomEditCapacitiesURL = webAPI_path + "api/room/ManageRoomCapacities";

			                var clone = Ext.getCmp('room_edit_geninfo').getForm().findField('isClone').getValue();

			                if (roomEditData.isClone == 'true') {
			                    Ext.getCmp('room_edit_geninfo').getForm().findField('RoomId').setValue('0');
			                    roomEditData.RoomId = 0;
			                }

			                if (roomEditData.RoomId > 0) {
			                    Ext.getCmp('room_edit_geninfo').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
			                    Ext.getCmp('room_edit_geninfo').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
			                }
			                else {
			                    Ext.getCmp('room_edit_geninfo').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
			                    Ext.getCmp('room_edit_geninfo').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
			                }

			                var roomsetup = Ext.ComponentQuery.query('grid[itemid=roomsetup]')[0];

			                //   var updatedData = roomsetup.getStore().getUpdatedRecords();
			                var updatedData = roomsetup.getStore().getRange();

			                var strSetup = "";
			                if (updatedData.length > 0) {
			                    Ext.each(updatedData, function (d) {
			                        if (d.data.Capacity != null) {
			                            var Capacity = (d.data.Capacity > 0) ? d.data.Capacity : 0;
			                            //strSetup = strSetup + Capacity + ',';
			                            strSetup = strSetup + d.data.RoomSetupId + ':' + Capacity + ',';
			                        }
			                    });
			                }

			                strSetup = strSetup.replace(/\,$/, '');

			                /*Room Classification ids*/
			                var ClassificationIds = '';
			                if (typeof me.getRoomclassification() != 'undefined') {
			                    var Classification = me.getRoomclassification().store.data;
			                    if (Classification != null && Classification.length > 0) {
			                        for (var i = 0; i < Classification.length; i++) {
			                            if (Classification.items[i].data.Checked == "1")
			                                ClassificationIds += Classification.items[i].data.RoomClassificationId + ",";
			                        }
			                    }
			                }

			                ClassificationIds = ClassificationIds.replace(/\,$/, '');


			                var ChildRoomIds = "";

			                var linkedRooms = Ext.ComponentQuery.query('grid[itemid=linkedroom]')[0];
			                var LinkRoomIds = linkedRooms.getStore().data.items;

			                if (LinkRoomIds.length > 0) {
			                    Ext.each(LinkRoomIds, function (d) {
			                        if (d.data.IsBlocked == true)
			                            ChildRoomIds = ChildRoomIds + d.data.RoomId + ',';
			                    });
			                }

			                ChildRoomIds = ChildRoomIds.replace(/\,$/, '');
			                var isLinkedRoom = Ext.getCmp('room_edit_geninfo').getForm().findField('IsVirtual').getValue();

			                if (ChildRoomIds.length == 0 && isLinkedRoom == true) {
			                    display_alert('MG33150');
			                    return;
			                }
			                /*ENd child room*/
			                Ext.getCmp('room_edit_geninfo').getForm().findField('RoomClassificationIds').setValue(ClassificationIds);
			                Ext.getCmp('room_edit_geninfo').getForm().findField('ChildRoomIds').setValue(ChildRoomIds);

			                Ext.getCmp('room_edit_geninfo').getForm().submit({
			                    url: roomEditURL,
			                    actionMethods: 'POST',
			                    waitMsg: 'save_data_message'.l('g'),
			                    // params: Ext.getCmp('room_edit_geninfo').getForm().getValues(),
			                    success: function (form, response) {
			                        var RoomId = null;
			                        if (response.response.responseText != "") {
			                            var response = Ext.decode(response.response.responseText);
			                            RoomId = response.result.RoomId;
			                        }
			                        if (RoomId > 0) {
			                            Ext.Ajax.request({
			                                url: roomEditCapacitiesURL,
			                                type: 'GET',
			                                method: 'GET',
			                                params: {
			                                    id: RoomId,
			                                    id1: strSetup
			                                },
			                                success: function () {
			                                    me.getRoomedit().close();
			                                    Ext.getStore('property.RoomListStore').reload();
			                                    /*Not required alert*/
			                                    //			                                    Ext.data.JsonP.request({
			                                    //			                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
			                                    //			                                        success: function () {
			                                    //			                                            display_alert('MG00000');
			                                    //			                                            Ext.getStore('property.RoomListStore').reload();
			                                    //			                                        }
			                                    //			                                    });
			                                }
			                            })
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
			            else {
			                Ext.Msg.alert('Error'.l('g'), 'Some fields are requred, check all tabs.'.l('g'));
			            }
			        }
			    },

			    'roomedit tabpanel tab': {
			        activate: function (t, eo, c) {//t => this, e => event, eo => Eoptional			            
			            if (t.card.itemid == 'roomphotos') {

			                var roomId = Ext.getCmp('room_edit_geninfo').getForm().findField('RoomId').getValue();

			                Ext.getStore('property.RoomPhotoListStore').proxy.setExtraParam('id', roomId);
			                Ext.getStore('property.RoomPhotoListStore').proxy.setExtraParam('languageId', user_language);
			                Ext.getStore('property.RoomPhotoListStore').proxy.setExtraParam('searchParam', '');
			                Ext.getStore('property.RoomPhotoListStore').load();
			            }
			        }
			    },

			    'roomphotos grid': {
			        cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
			            var fieldName = iView.getGridColumns()[iColIdx].name;

			            var zRec = iView.getRecord(iRowEl);
			            if (fieldName == 'RoomPhotoEdit')
			                me.RoomPhotoManage(zRec);
			            else if (fieldName == 'RoomPhotoDelete')
			                me.RoomPhotoDelete(zRec);
			            else if (fieldName == 'RoomPhotoPreview')
			                me.previewPhoto(zRec);
			        }
			    },

			    'roomphotos button[action="addRoomPhoto"]': {
			        click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                        

			            me.RoomPhotoManage(null);
			        }
			    },

			    'roomphotoadd button[action="roomPhotoAdd"]': {
			        click: function (t, e, eo) {//t => this, e => event, eo => Eoptional	
			            var roomId = Ext.getCmp('room_edit_geninfo').getForm().findField('RoomId').getValue();
			            var form = Ext.ComponentQuery.query('[itemid="roomphotomanage"]')[0];
			            form.getForm().findField('LanguageId').setValue(user_language);

			            form.getForm().findField('RoomId').setValue(roomId);
			            if (form.getForm().isValid()) {
			                var RoomPhotosId = form.getForm().findField('RoomPhotosId').getValue();

			                if (RoomPhotosId == 0) {
			                    form.getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
			                    form.getForm().findField('CreatedBy').setValue(CurrentSessionUserId);

			                    var POSTURL = webAPI_path + 'api/room/PostRoomPhotos';
			                }
			                else {
			                    form.getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
			                    form.getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));

			                    var POSTURL = webAPI_path + 'api/room/UpdateRoomPhotos';
			                }
			                form.getForm().submit({
			                    url: POSTURL,
			                    nMactioethods: 'POST',
			                    waitMsg: 'Uploading file please wait.'.l('g'),
			                    success: function (form, response) {

			                        me.getRoomphotoadd().close();

			                        Ext.data.JsonP.request({
			                            url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',

			                            success: function () {
			                                display_alert('MG00000');
			                            }
			                        });
			                        //  display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
			                        Ext.getStore('property.RoomPhotoListStore').reload();
			                        var r = response.response.responseText;
			                        var r = jsonDecode(r);

			                        /*Commented as response text not came from API*/
			                        if (r.success == true) {

			                        }
			                        else {

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

			    'roomphotoadd button[action="addRoomPhotoLanguage"]': {
			        click: function (t) {

			            var form = Ext.ComponentQuery.query('[itemid="roomphotomanage"]')[0];
			            var RoomPhotosId = form.getForm().findField('RoomPhotosId').getValue();
			            var RoomId = form.getForm().findField('RoomId').getValue();

			            var window = Ext.create('widget.roomphotomanagelang', { RoomPhotosId: RoomPhotosId, RoomId: RoomId }).alignTo(t);
			        }
			    },

			    'roomphotomanagelang combo[name="LanguageId"]': {
			        select: function (combo, records, eOpt) {
			            var languageId = records[0].data.LanguageId;

			            var form = Ext.ComponentQuery.query('[itemid="roomphotomanage"]')[0];
			            var RoomPhotosId = form.getForm().findField('RoomPhotosId').getValue();

			            var form = Ext.ComponentQuery.query('[itemid="roomphotomanagelang"]')[0];
			            form.getForm().load({
			                method: 'GET',
			                url: webAPI_path + 'api/Room/GetRoomPhotosLang',
			                params: {
			                    id: RoomPhotosId,
			                    languageId: languageId
			                }
			            })
			        }
			    },

			    'roomphotomanagelang button[action="roomPhotoLangMang"]': {
			        click: function () {

			            var form = Ext.ComponentQuery.query('[itemid="roomphotomanagelang"]')[0];
			            var formurl = webAPI_path + 'api/room/ManageLangRoomPhotos';

			            var roomId = Ext.getCmp('room_edit_geninfo').getForm().findField('RoomId').getValue();

			            var formManage = Ext.ComponentQuery.query('[itemid="roomphotomanage"]')[0];
			            var RoomPhotosId = formManage.getForm().findField('RoomPhotosId').getValue();

			            form.getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
			            form.getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
			            form.getForm().findField('RoomId').setValue(roomId);
			            form.getForm().findField('RoomPhotosId').setValue(RoomPhotosId);

			            form.getForm().submit({
			                method: 'POST',
			                url: formurl,
			                waitMsg: 'save_data_message'.l('g'),
			                success: function (form, response) {
			                    me.getRoomphotomanagelang().close();

			                    Ext.data.JsonP.request({
			                        url: webAPI_path + 'api/Designation/BlankRequest',
			                        success: function () {
			                            display_alert('MG00000');
			                        }
			                    })
			                },
			                failure: function (form, response) {
			                    Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
			                }
			            })
			        }
			    },

			    'roomclassification textfield[itemid="searchString"]': {
			        specialkey: function (t, eventObject) {
			            if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {

			                var r = Ext.getCmp('searchString').getValue();
			                Ext.getStore('property.RoomClasificationStore').clearFilter();
			                var regex = new RegExp(".*" + r + ".*", "i");
			                Ext.getStore('property.RoomClasificationStore').filter("Classification", regex, true, true);

			                if (r.length > 0) {
			                    var clearIcon = Ext.ComponentQuery.query('[action="clearRoomClassification"]')[0];
			                    clearIcon.show();
			                }
			            }
			        }
			    },

			    'roomclassification button[action="searchRoomsClassification"]': {
			        click: function () {
			            var r = Ext.getCmp('searchString').getValue();
			            Ext.getStore('property.RoomClasificationStore').clearFilter();
			            var regex = new RegExp(".*" + r + ".*", "i");
			            Ext.getStore('property.RoomClasificationStore').filter("Classification", regex, true, true);

			            if (r.length > 0) {
			                var clearIcon = Ext.ComponentQuery.query('[action="clearRoomClassification"]')[0];
			                clearIcon.show();
			            }
			        }
			    },
			    'roomclassification button[action="clearRoomClassification"]': {
			        click: function () {
			            Ext.getCmp('searchString').setValue('');
			            Ext.getStore('property.RoomClasificationStore').clearFilter();
			            var clearIcon = Ext.ComponentQuery.query('[action="clearRoomClassification"]')[0];
			            clearIcon.hide();
			        }
			    },

			    'roomgeneralinfo textfield[itemid="searchStringRoomSetup"]': {
			        specialkey: function (t, eventObject) {
			            if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {

			                //var r = Ext.getCmp('searchStringRoomSetup').getValue();
			                var r = Ext.ComponentQuery.query('[itemid="searchStringRoomSetup"]')[0].getValue();
			                Ext.getStore('property.RoomSetupEditPageStore').clearFilter();
			                Ext.getStore('property.RoomSetupEditPageStore').filter('Arrangement', r, true, true);

			                if (r.length > 0) {
			                    var clearIcon = Ext.ComponentQuery.query('[action="clearRoomSetUp"]')[0];
			                    clearIcon.show();
			                }
			            }
			        }
			    },

			    'roomgeneralinfo button[action="searchRoomSetUp"]': {
			        click: function () {
			            //var r = Ext.getCmp('searchStringRoomSetup').getValue();
			            var r = Ext.ComponentQuery.query('[itemid="searchStringRoomSetup"]')[0].getValue();
			            Ext.getStore('property.RoomSetupEditPageStore').clearFilter();
			            Ext.getStore('property.RoomSetupEditPageStore').filter('Arrangement', r, true, true);

			            if (r.length > 0) {
			                var clearIcon = Ext.ComponentQuery.query('[action="clearRoomSetUp"]')[0];
			                clearIcon.show();
			            }
			        }
			    },
			    'roomgeneralinfo button[action="clearRoomSetUp"]': {
			        click: function () {
			            var r = Ext.ComponentQuery.query('[itemid="searchStringRoomSetup"]')[0].setValue('');
			            Ext.getStore('property.RoomSetupEditPageStore').clearFilter();
			            var clearIcon = Ext.ComponentQuery.query('[action="clearRoomSetUp"]')[0];
			            clearIcon.hide();
			        }
			    },

			    'roomgeneralinfo textfield[itemid="searchStringLinkRoom"]': {
			        specialkey: function (t, eventObject) {
			            if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {

			                //var r = Ext.getCmp('searchStringRoomSetup').getValue();
			                var r = Ext.ComponentQuery.query('[itemid="searchStringLinkRoom"]')[0].getValue();
			                Ext.getStore('property.RoomListCheckboxStore').clearFilter();
			                Ext.getStore('property.RoomListCheckboxStore').filter('RoomName', r, true, true);

			                if (r.length > 0) {
			                    var clearIcon = Ext.ComponentQuery.query('[action="clearLinkRoomFilter"]')[0];
			                    clearIcon.show();
			                }
			            }
			        }
			    },

			    'roomgeneralinfo button[action="searchLinkRoomFilter"]': {
			        click: function () {
			            //var r = Ext.getCmp('searchStringRoomSetup').getValue();
			            var r = Ext.ComponentQuery.query('[itemid="searchStringLinkRoom"]')[0].getValue();
			            Ext.getStore('property.RoomListCheckboxStore').clearFilter();
			            Ext.getStore('property.RoomListCheckboxStore').filter('RoomName', r, true, true);

			            if (r.length > 0) {
			                var clearIcon = Ext.ComponentQuery.query('[action="clearLinkRoomFilter"]')[0];
			                clearIcon.show();
			            }
			        }
			    },
			    'roomgeneralinfo button[action="clearLinkRoomFilter"]': {
			        click: function () {
			            var r = Ext.ComponentQuery.query('[itemid="searchStringLinkRoom"]')[0].setValue('');
			            Ext.getStore('property.RoomListCheckboxStore').clearFilter();
			            var clearIcon = Ext.ComponentQuery.query('[action="clearLinkRoomFilter"]')[0];
			            clearIcon.hide();
			        }
			    },

			    'roomedit button[action="roomEditLanguage"]': {
			        click: function (t) {
			            var me = this;
			            var window = Ext.create('widget.roomeditlang').alignTo(t);
			        }
			    },

			    'roomeditlang button[action="saveRoomEditMultiLing"]': {
			        click: function (t) {
			            var me = this;

			            var formurl = webAPI_path + 'api/room/ManageLangRooms';
			            var form = Ext.ComponentQuery.query('[itemid="RoomEditLang"]')[0];

			            var roomId = Ext.getCmp('room_edit_geninfo').getForm().findField('RoomId').getValue();
			            form.getForm().findField('RoomId').setValue(roomId);
			            if (form.getForm().isValid()) {
			                form.getForm().submit({
			                    method: 'POST',
			                    url: formurl,
			                    waitMsg: 'save_data_message'.l('g'),
			                    success: function (form, response) {
			                        me.getRoomeditlang().close();

			                        Ext.data.JsonP.request({
			                            url: webAPI_path + 'api/Designation/BlankRequest',
			                            success: function () {
			                                display_alert('MG00000');
			                            }
			                        })
			                    },
			                    failure: function (form, response) {
			                        Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
			                    }
			                })
			            }
			        }
			    },

			    'roomeditlang combo[name="LanguageId"]': {
			        select: function (combo, records, eOpt) {
			            var languageId = records[0].data.LanguageId;
			            var RoomId = Ext.getCmp('room_edit_geninfo').getForm().findField('RoomId').getValue();

			            var form = Ext.ComponentQuery.query('[itemid="RoomEditLang"]')[0];

			            form.getForm().load({
			                method: 'GET',
			                url: webAPI_path + 'api/Room/GetRoomsLang',
			                params: {
			                    id: RoomId,
			                    languageId: languageId
			                }
			            })
			        }
			    },

			    'roomlist checkbox[itemid="combinedRoom"]': {
			        change: function (t, n, o, Opt) {
			            me.searchRoomListFilter(null);
			        }
			    },

			    'roomlist combo[itemid="roomTypeId"]': {
			        select: function (t, n, o, Opt) {
			            me.searchRoomListFilter(null);
			        }
			    },

			    'roomlist combo[itemid="floorid"]': {
			        select: function (t, n, o, Opt) {
			            me.searchRoomListFilter(null);
			        }
			    },

			    'roomlist textfield[itemid="searchString"]': {
			        specialkey: function (t, eventObject) {
			            if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
			                me.searchRoomListFilter(null);
			            }
			        }
			    }
			}
		)
    },

    searchRoomListFilter: function (rec) {
        var floorid = Ext.ComponentQuery.query('combo[itemid=floorid]')[0];
        var roomTypeId = Ext.ComponentQuery.query('combo[itemid=roomTypeId]')[0];
        var combinedRoom = Ext.ComponentQuery.query('checkbox[itemid=combinedRoom]')[0];
        var searchString = Ext.ComponentQuery.query('textfield[itemid=searchString]')[0];

        var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
        var obj = Ext.getStore('property.RoomListStore').proxy.extraParams;
        //if (obj.id == PropertyId)
        //return true;
        var clearIcon = Ext.ComponentQuery.query('[action="clearRoomFilter"]')[0];
        clearIcon.show();

        Ext.getStore('property.RoomListStore').proxy.setExtraParam('id', PropertyId);
        Ext.getStore('property.RoomListStore').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('property.RoomListStore').proxy.setExtraParam('searchString', searchString.getValue());
        Ext.getStore('property.RoomListStore').proxy.setExtraParam('id1', roomTypeId.getValue());
        Ext.getStore('property.RoomListStore').proxy.setExtraParam('id2', floorid.getValue());
        Ext.getStore('property.RoomListStore').proxy.setExtraParam('flag', combinedRoom.getValue());
        Ext.getStore('property.RoomListStore').load({});
    },

    clearsearchRoomListFilter: function () {
        var floorid = Ext.ComponentQuery.query('combo[itemid=floorid]')[0];
        var roomTypeId = Ext.ComponentQuery.query('combo[itemid=roomTypeId]')[0];
        var combinedRoom = Ext.ComponentQuery.query('checkbox[itemid=combinedRoom]')[0];
        var searchString = Ext.ComponentQuery.query('textfield[itemid=searchString]')[0];

        floorid.setValue(-1);
        roomTypeId.setValue(-1);
        combinedRoom.setValue(null);
        searchString.setValue(null);

        var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
        var obj = Ext.getStore('property.RoomListStore').proxy.extraParams;

        var clearIcon = Ext.ComponentQuery.query('[action="clearRoomFilter"]')[0];
        clearIcon.hide();

        Ext.getStore('property.RoomListStore').proxy.setExtraParam('id', PropertyId);
        Ext.getStore('property.RoomListStore').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('property.RoomListStore').proxy.setExtraParam('searchString', searchString.getValue());
        Ext.getStore('property.RoomListStore').proxy.setExtraParam('id1', roomTypeId.getValue());
        Ext.getStore('property.RoomListStore').proxy.setExtraParam('id2', floorid.getValue());
        Ext.getStore('property.RoomListStore').proxy.setExtraParam('flag', combinedRoom.getValue());
        Ext.getStore('property.RoomListStore').load({});
    },

    editRoomWindow: function (rec, isClone) {

        var roomID = null;
        if (rec == null) {
            roomedit = Ext.create('widget.roomedit').show();
        }
        else {

            roomID = rec.data.RoomId;
            roomedit = Ext.create('widget.roomedit', { roomId: roomID, 'isClone': isClone }).show();
            //roomedit.setTitle('Update Room_Title'.l('SC33100'));
        }
        //this.loadPropertyComboForUser(rec);  

        var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
        Ext.getCmp('room_edit_geninfo').getForm().findField('PropertyId').setValue(PropertyId);

//        Ext.getStore('property.AllpropertyListComboStore').load({
//            params: {
//                'limit': 0,
//                'languageId': user_language
//            }
//        });

        Ext.getStore('property.OutletsListByPropertyStore').load({
            params: {
                'id': PropertyId,
                'id1': user_language
            }
        });
        //        
        //        Ext.getStore('property.RoomTypeComboStore').load({
        //            params: {
        //                'languageId': user_language
        //            }
        //        });

        Ext.getStore('operations.PlanboardFloorsStore').load({
            params: {
                'id': PropertyId
            }
        });

        Ext.getStore('property.RoomClasificationStore').clearFilter();
        Ext.getStore('property.RoomClasificationStore').proxy.setExtraParam('id', roomID);
        Ext.getStore('property.RoomClasificationStore').proxy.setExtraParam('languageId', null);
        Ext.getStore('property.RoomClasificationStore').load({});


        if (rec == null) {
            // this.loadLinkedRoomGrid();
            this.loadRoomType();
        }
        else {
            this.loadRoomData(rec, isClone);
            this.loadRoomTypeEditPage(rec);
        }
    },

    cloneRoomWindow: function (rec) {
        var me = this;
        Ext.MessageBox.confirm('Clone Room'.l('SC33000'), 'Are you sure you want to clone this room?'.l('SC33000'), function (btn) {
            if (btn == 'yes')
                me.editRoomWindow(rec, 'clone');
        })
    },

    loadRoomType: function () {
        var me = this;
        Ext.getStore('property.RoomSetupStore').load({
            params: {
                'id': user_language
            },
            callback: function (records, o, success) {
            }
        })
    },

    loadRoomTypeEditPage: function (rec) {
        var me = this;
        Ext.getStore('property.RoomSetupEditPageStore').clearFilter();
        Ext.getStore('property.RoomSetupEditPageStore').load({
            params: {
                'languageId': user_language,
                'id': rec.data.RoomId
            },
            callback: function (records, o, success) {
                //                var items = [];
                //                Ext.each(records, function (r) {
                //                    items.push({ xtype: 'numberfield', name: r.data.RoomSetupId, fieldLabel: r.data.Arrangement, value: r.data.Capacity, allowBlank: false, maxValue: 25000,
                //                        minValue: 0//, vtype: 'numeric' 
                //                    });
                //                });
                //                me.isSharableData = items;
                //                me.roomTypeIdsData();
            }
        })
    },

    loadRoomData: function (rec, isClone) {
        var local = this;
        Ext.getCmp('room_edit_geninfo').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/Room/GetRoomById',
            params: {
                id: rec.data.RoomId,
                'languageId': user_language
            },
            success: function (form, action) {

                if (action.result.data.IsSharable == true)
                    Ext.getCmp('room_edit_geninfo').getForm().findField('IsSharable').setValue('true');
                else {
                    Ext.getCmp('room_edit_geninfo').getForm().findField('IsSharable').setValue('false');
                }

                if (action.result.data.IsVirtual == true)
                    Ext.getCmp('room_edit_geninfo').getForm().findField('IsVirtual').setValue('true');
                else {
                    Ext.getCmp('room_edit_geninfo').getForm().findField('IsVirtual').setValue('false');
                }

                if (isClone == 'clone') {
                    var RoomName = Ext.getCmp('room_edit_geninfo').getForm().findField('RoomName').getValue();
                    var Description = Ext.getCmp('room_edit_geninfo').getForm().findField('Description').getValue();

                    Ext.getCmp('room_edit_geninfo').getForm().findField('RoomName').setValue('Clone of ' + RoomName);
                    Ext.getCmp('room_edit_geninfo').getForm().findField('Description').setValue('Clone of ' + Description);
                    Ext.getCmp('room_edit_geninfo').getForm().findField('isClone').setValue('true');
                }
                var width = Ext.getCmp('room_edit_geninfo').getForm().findField('Width').getValue();
                var length = Ext.getCmp('room_edit_geninfo').getForm().findField('Length').getValue();
                if (width != null && length != null) {
                    var surface = Ext.util.Format.number(width * length, '00.00');
                    Ext.getCmp('room_edit_geninfo').getForm().findField('Surface').setValue(surface);
                }
                local.loadLinkedRoomGrid();
            }
        })
    },

    loadLinkedRoomGrid: function () {
        var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();

        var roomEditData = Ext.getCmp('room_edit_geninfo').getForm().getValues();
        var RoomID = 0;

        if (roomEditData.RoomId > 0) {
            RoomID = roomEditData.RoomId;
        }
        Ext.getStore('property.RoomListCheckboxStore').clearFilter();
        Ext.getStore('property.RoomListCheckboxStore').proxy.setExtraParam('id', RoomID);
        Ext.getStore('property.RoomListCheckboxStore').proxy.setExtraParam('id1', PropertyId);
        Ext.getStore('property.RoomListCheckboxStore').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('property.RoomListCheckboxStore').load({});
    },

    //    roomTypeIdsData: function () {
    //        if (Ext.getCmp('capacities')) {
    //            Ext.getCmp('capacities').removeAll(true);
    //            Ext.getCmp('capacities').add(this.isSharableData);
    //            Ext.getCmp('capacities').doLayout();
    //        }
    //    },

    RoomStatusChange: function (rec) {
        display_alert("MG00010", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/room/DeactivteActivateRoom',
                    type: "GET",
                    params: { id: rec.data.RoomId },
                    success: function (r) {
                        // var r = jsonDecode(response);
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00030'); //Ext.Msg.alert('Success'.l('g'), 'Status updated successfully.');
                            Ext.getStore('property.RoomListStore').reload();
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () { }
                })
            }
        })
    },

    deleteRoom: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/room/DeleteRoom',
                    type: "GET",
                    params: { id: rec.data.RoomId },
                    success: function (response) {
                        var r = response;
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Room deleted successfully.');

                            var grid = me.getRoomlist();
                            var store = Ext.getStore('property.RoomListStore');
                            Utils.RefreshGridonDelete(grid, store);
                            //Ext.getStore('property.RoomListStore').loadPage(1);
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
        })
    },

    RoomPhotoManage: function (rec) {
        if (rec == null)
            var roomedit = Ext.create('widget.roomphotoadd').show();
        else {
            var roomedit = Ext.create('widget.roomphotoadd', { RoomPhotosId: rec.data.RoomPhotosId }).show();

            var form = Ext.ComponentQuery.query('[itemid="roomphotomanage"]')[0];
            form.getForm().load({
                method: 'GET',
                url: webAPI_path + 'api/Room/GetRoomPhotosLang',
                params: {
                    id: rec.data.RoomPhotosId,
                    languageId: user_language
                },
                success: function (form, action) {
                }
            });
        }
    },

    RoomPhotoDelete: function (rec) {

        display_alert("MG00020", '', 'C', function (btn) {
            if (btn == "yes") {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/room/RemoveRoomPhotos',
                    type: "GET",
                    params: {
                        id: rec.data.RoomPhotosId
                    },
                    success: function (r) {
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        // var r = jsonDecode(response);
                        if (r.success == true) {
                            display_alert('MG00040');
                            //Ext.Msg.alert('Success'.l('g'), 'Status updated successfully.');
                            Ext.getStore('property.RoomPhotoListStore').reload();
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
        })
    },

    previewPhoto: function (rec) {

        var actualLogo = Ext.ComponentQuery.query('[itemid="roomPhotoThumb"]')[0];
        var path = image_path + rec.data.OriginalFullImagePath;
        actualLogo.setSrc(path);

    }
}); 
