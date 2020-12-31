Ext.define('Regardz.controller.configuration.RoomType', {
    extend: 'Ext.app.Controller',
    views: ['configuration.RoomTypeList', 'configuration.RoomTypeManage', 'configuration.RoomTypePrice', 'configuration.RoomTypeLang'],
    stores: ['configuration.RoomTypeStore', 'common.LanguageListStore'],

    refs: [{
        ref: 'roomtypelist',
        selector: 'roomtypelist'
    }, {
        ref: 'roomtypelang',
        selector: 'roomtypelang'
    }],

    init: function () {

        this.control(
        {
            'roomtypelist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'RoomTypeEdit')
                        this.RoomTypeEdit(zRec);
                    else if (fieldName == 'RoomTypeDelete')
                        this.RoomTypeDelete(zRec);
                    else if (fieldName == 'RoomTypeStatus')
                        this.RoomTypeStatus(zRec);
                    else if (fieldName == 'RoomTypePrice')
                        this.RoomTypePrice(zRec);
                }
            },

            'roomtypemanage': {
                afterrender: function () {

                    //PropertyID
                }
            },

            'roomtypemanage button[action="saveRoomTypeLang"]': {
                click: function (t) {//t => this
                    var roomTypeId = Ext.getCmp('manageRoomType').getForm().findField('RoomTypeId').getValue()
                    var window = Ext.create('widget.roomtypelang', { roomTypeId: roomTypeId }).alignTo(t);
                }
            },
            'roomtypelang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {
                    var roomTypeId = Ext.getCmp('manageRoomType').getForm().findField('RoomTypeId').getValue();
                    var form = Ext.ComponentQuery.query('[itemid="RoomTypeEditLang"]')[0];
                    form.getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/ConfigRoomType/GetRoomTypeMultiLingUpdate',
                        params: {
                            id: roomTypeId,
                            languageId: records[0].data.LanguageId
                        }
                    });
                }
            },

            'roomtypelang button[action="saveRoomTypeLang"]': {
                click: function (t) {
                    var me = this;

                    var formurl = webAPI_path + 'api/ConfigRoomType/UpdateRoomTypeMultiLangDetail';
                    var form = Ext.ComponentQuery.query('[itemid="RoomTypeEditLang"]')[0];

                    var roomTypeId = Ext.getCmp('manageRoomType').getForm().findField('RoomTypeId').getValue();
                    form.getForm().findField('RoomTypeId').setValue(roomTypeId);
                    if (form.getForm().isValid()) {
                        form.getForm().submit({
                            method: 'POST',
                            url: formurl,
                            waitMsg: 'save_data_message'.l('g'),
                            success: function (form, response) {
                                me.getRoomtypelang().close();

                            },
                            failure: function (form, response) {
                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                            }
                        })
                    }
                }

            },
            'button[action="addRoomType"]': {
                click: function () {
                    Ext.create('widget.roomtypemanage', { roomTypeId: 0 })
                }
            },
            'button[action="saveRoomType"]': {
                click: function () {
                    if (Ext.getCmp('manageRoomType').getForm().isValid()) {
                        var RoomTypeId = Ext.getCmp('manageRoomType').getForm().findField('RoomTypeId').getValue();


                        Ext.getCmp('manageRoomType').getForm().submit({
                            method: 'POST',
                            url: webAPI_path + 'api/ConfigRoomType/ManageRoomType',
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
                                    //display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                    Ext.getStore('configuration.RoomTypeStore').reload();
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function (form, response) {
                                r = response.result;
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
            'roomtypeprice button[action="saveRoomTypePrice"]': {
                click: function () {
                    if (Ext.getCmp('addRoomTypePrice').getForm().isValid()) {
                        Ext.getCmp('addRoomTypePrice').getForm().submit({
                            url: webAPI_path + 'api/ConfigRoomType/ManageRoomTypePrice',
                            type: 'POST',
                            params: Ext.getCmp('addRoomTypePrice').getForm().getValues(),
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
                                    //display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                    Ext.getStore('configuration.RoomTypeStore').reload();
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function (form, response) {
                                r = response.result;
                                if (r.success == false) {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                }
                            }
                        });
                    }
                }
            }
        })

    },
    RoomTypeEdit: function (rec) {
        var roomType = Ext.create('widget.roomtypemanage', { roomTypeId: rec.data.RoomTypeId });
        roomType.setTitle('Update Room Type_Title'.l('SC20110'));

        Ext.getCmp('manageRoomType').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/ConfigRoomType/GetRoomTypeById',
            params: {
                id: rec.data.RoomTypeId,
                languageId: user_language
            },
            success: function (form, action) {
                var resp = Ext.decode(action.response.responseText);

            }
        });
    },
    RoomTypeDelete: function (rec) {
        var localThis = this;
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/ConfigRoomType/DeleteRoomType',
                    type: "GET",
                    params: { id: rec.data.RoomTypeId },
                    success: function (response) {
                        var r = response;
                        if (r.success == true) {
                            //display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record deleted successfully.');
                            var store = Ext.getStore('configuration.RoomTypeStore');
                            var grid = localThis.getRoomtypelist();
                            Utils.RefreshGridonDelete(grid, store);
                            //Ext.getStore('configuration.RoomTypeStore').loadPage(1);
                            //Ext.getStore('configuration.RoomTypeStore').load();
                        }
                        else {
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Record not deleted.'.l('g'));
                    }
                });
            }
        });
    },
    RoomTypeStatus: function (rec) {
        display_alert("MG00010", '', 'C', function (btn) {

            if (btn === 'yes') {
                var newStatus = true;
                if (rec.data.IsActive)
                    newStatus = false;
                else
                    newStatus = true;
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/ConfigRoomType/UpdateRoomTypeStatus',
                    type: "GET",
                    params: { id: rec.data.RoomTypeId, status: newStatus },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00030'); // Ext.Msg.alert('Success'.l('g'), 'Status updated successfully.');
                            Ext.getStore('configuration.RoomTypeStore').reload();
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Status not changed.'.l('g'));
                    }
                });
            }
        });
    },
    RoomTypePrice: function (rec) {

        var varRoomTypeId = 0;
        if (rec.data.RoomTypeId > 0) {
            varItemId = rec.data.RoomTypeId;
        }

        Ext.create('widget.roomtypeprice', { roomTypeId: rec.data.RoomTypeId });
        Ext.getCmp('addRoomTypePrice').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/ConfigRoomType/GetRoomTypePrice',
            params: {
                id: rec.data.RoomTypeId,
                languageId: user_language
            },
            success: function (response) {
                Ext.getCmp('addRoomTypePrice').getForm().findField('RoomTypeId').setValue(rec.data.RoomTypeId);
            }
        });
    }
});
