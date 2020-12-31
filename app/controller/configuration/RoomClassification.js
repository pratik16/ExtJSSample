Ext.define('Regardz.controller.configuration.RoomClassification', {
    extend: 'Ext.app.Controller',
    views: ['configuration.RoomClassificationList', 'configuration.RoomClassificationManage'],
    stores: ['configuration.RoomClassificationStore'],

    refs: [{
        ref: 'RoomClassificationList',
        selector: 'RoomClassificationList'
    }],

    init: function () {

        this.control(
        {
            'roomclassificationlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'RoomClassEdit')
                        this.RoomClassEdit(zRec);
                    else if (fieldName == 'RoomClassDelete')
                        this.RoomClassDelete(zRec);
                    else if (fieldName == 'RoomClassStatus')
                        this.RoomClassStatus(zRec);
                }
            },
            'button[action="addRoomClass"]': {
                click: function () {
                    Ext.create('widget.roomclassificationmanage', { roomClassificationId: 0 })
                }
            },
            'button[action="saveRoomClass"]': {
                click: function () {
                    if (Ext.getCmp('manageRoomClass').getForm().isValid()) {
                        var RoomClassificationId = Ext.getCmp('manageRoomClass').getForm().findField('RoomClassificationId').getValue();

                        var urlVideo = webAPI_path + 'api/ConfigRoomClassification/ManageRoomClassification'; ;
                        if (RoomClassificationId == 0) {
                            Ext.getCmp('manageRoomClass').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('manageRoomClass').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            Ext.getCmp('manageRoomClass').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('manageRoomClass').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('manageRoomClass').getForm().submit({
                            url: urlVideo,
                            type: 'POST',
                            params: Ext.getCmp('manageRoomClass').getForm().getValues(),
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
                                    display_alert('MG00000');// Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                    Ext.getStore('configuration.RoomClassificationStore').reload();
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
                        });
                    }
                }
            }
        })

    },
    RoomClassEdit: function (rec) {
        var roomType = Ext.create('widget.roomclassificationmanage', { roomClassificationId: rec.data.RoomClassificationId });
        roomType.setTitle('Update Room Classification_Title'.l('SC20310'));

        Ext.getCmp('manageRoomClass').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/ConfigRoomClassification/GetRoomClassificationById',
            params: {
                id: rec.data.RoomClassificationId
            }
        });
    },
    RoomClassDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            
            if (btn === 'yes') {

                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/ConfigRoomClassification/DeleteRoomClassification',
                    type: "GET",
                    params: { id: rec.data.RoomClassificationId },
                    success: function (r) {
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");                
                        if (r.success == true) {
                            display_alert('MG00040');// Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            Ext.getStore('configuration.RoomClassificationStore').loadPage(1);
                        }
                        else {
                            Ext.Msg.alert('Error', ResultText);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Record not deleted.'.l('g'));
                    }
                });
            }
        });
    },
    RoomClassStatus: function (rec) {
        display_alert("MG00010", '', 'C', function (btn) {
            
            if (btn === 'yes') {
                var newStatus = true;
                if (rec.data.IsActive)
                    newStatus = false;
                else
                    newStatus = true;
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/ConfigRoomClassification/UpdateRoomClassificationStatus',
                    type: "GET",
                    params: { id: rec.data.RoomClassificationId, status: newStatus },
                    success: function (r) {
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");                  
                        if (r.success == true) {
                            display_alert('MG00030');// Ext.Msg.alert('Success'.l('g'), 'Status changed successfully.'.l('g'));
                            Ext.getStore('configuration.RoomClassificationStore').reload();
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Status not changed.'.l('g'));
                    }
                })
            }
        });
    }
});
