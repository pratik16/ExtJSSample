Ext.define('Regardz.controller.company.Company', {
    extend: 'Ext.app.Controller',
    views: ['company.CCompanyManage', 'company.CompanyProfile', 'company.Overview_I', 'company.GeneralInfo'],
    stores: ['common.QualityRatingStore'],
    companyController: false,

    init: function () {

        this.control(
        {
            //            'roomtypelist': {
            //                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
            //                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
            //                    var fieldName = iView.getGridColumns()[iColIdx].name;

            //                    var zRec = iView.getRecord(iRowEl);

            //                    if (fieldName == 'RoomTypeEdit')
            //                        this.RoomTypeEdit(zRec);
            //                    else if (fieldName == 'RoomTypePrice')
            //                        this.RoomTypePrice(zRec);
            //                }
            //            },
            'button[action="addCompany"]': {
                click: function () {
                    //Ext.create('widget.companymanage', { companyId: 0 })
                }
            },
            'button[action="saveCompany"]': {
                click: function () {
                    if (Ext.getCmp('manageRoomType').getForm().isValid()) {
                        var RoomTypeId = Ext.getCmp('manageRoomType').getForm().findField('RoomTypeId').getValue();

                        var urlVideo = webAPI_path + 'api/ConfigRoomType/ManageRoomType'; ;
                        if (RoomTypeId == 0) {
                            Ext.getCmp('manageRoomType').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('manageRoomType').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            Ext.getCmp('manageRoomType').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('manageRoomType').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        $.ajax({
                            url: urlVideo,
                            type: 'POST',
                            data: Ext.getCmp('manageRoomType').getForm().getValues(),
                            success: function (response) {
                                var res = Ext.decode(response.responseText);
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close();

                                }
                                var r = jsonDecode(response);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == true) {
                                    //display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                    Ext.getStore('configuration.RoomTypeStore').reload();
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
            }
        })
    }

});
