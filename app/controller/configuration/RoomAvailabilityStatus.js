Ext.define('Regardz.controller.configuration.RoomAvailabilityStatus', {
    extend: 'Ext.app.Controller',
    views: ['configuration.RoomAvailabilityStatusList', 'configuration.RoomAvailabilityStatusEdit', ],
    stores: ['configuration.RoomAvailabilityStatusStore', ],


    init: function () {

        this.control(
        {
            'roomavailabilitystatuslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'RoomAvailEdit')
                        this.RoomAvailEdit(zRec);
                }
            },


            //            'button[action="saveRoomAvailabilityBlock"]': {
            //                click: function () {
            //                    if (Ext.getCmp('roomAvailabilityBlock').getForm().isValid()) {
            //                        Ext.getCmp('roomAvailabilityBlock').getForm().submit({
            //                            url: webAPI_path + 'api/ConfigRoomAvailability/AddRoomAvailabilityBlock',
            //                            type: 'POST',
            //                            params: Ext.getCmp('roomAvailabilityBlock').getForm().getValues(),
            //                            success: function (form, response) {
            //                                var r = response.result;
            //                                var win = Ext.WindowManager.getActive();
            //                                if (win) {
            //                                    win.close();
            //                                }
            //                                if (r.success == true) {
            //                                    display_alert('MG00000');
            //                                }
            //                                else {
            //                                    Ext.Msg.alert('Error'.l('g'), r.result);
            //                                }
            //                            },
            //                            failure: function (form, response) {
            //                                r = response.result;
            //                                if (r.success == false) {
            //                                    Ext.Msg.alert('Error'.l('g'), r.result);
            //                                }
            //                                else {
            //                                    Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
            //                                }
            //                            }
            //                        });

            //                    }
            //                }
            //            },

            'button[action="saveRoomAvail"]': {
                click: function () {
                    if (Ext.getCmp('editRoomAvailabilityStatus').getForm().isValid()) {
                        var RoomTypeId = Ext.getCmp('editRoomAvailabilityStatus').getForm().findField('RoomAvailabilityId').getValue();

                        Ext.getCmp('editRoomAvailabilityStatus').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        Ext.getCmp('editRoomAvailabilityStatus').getForm().findField('UpdatedBy').setValue(1);


                        Ext.getCmp('editRoomAvailabilityStatus').getForm().submit({
                            url: webAPI_path + 'api/ConfigRoomAvailability/UpdateRoomAvailabilityStatus',
                            type: 'POST',
                            params: Ext.getCmp('editRoomAvailabilityStatus').getForm().getValues(),
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
                                    display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                    Ext.getStore('configuration.RoomAvailabilityStatusStore').reload();
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
            }
        })

    },
    RoomAvailEdit: function (rec) {
        Ext.create('widget.roomavailstedit', { roomAvailabilityId: rec.data.RoomAvailabilityId, availabilityStatus: rec.data.AvailabilityStatus });

        Ext.getCmp('editRoomAvailabilityStatus').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/ConfigRoomAvailability/GetAddRoomAvailabilityStatusById',
            params: {
                roomAvailabilityId: rec.data.RoomAvailabilityId
            }
        });
    }
});
