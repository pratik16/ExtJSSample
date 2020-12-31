Ext.define('Regardz.controller.configuration.AdvancePaymentManage', {
    extend: 'Ext.app.Controller',
    views: ['configuration.AdvancePaymentManageList', 'configuration.AdvancePaymenManage'],
    stores: ['configuration.AdvancePaymentManageStore'],

    init: function () {
        this.control({
            'advancepaymentmanagelist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'AdvancePaymentEdit')
                        this.AdvancePaymentEdit(zRec);
                    else if (fieldName == 'AdvancePaymentDelete')
                        this.AdvancePaymentDelete(zRec);
                }
            },
            //AdvancePaymentEdit
            'button[action="addAdvancePayment"]': {
                click: function () {
                    var advancePaymenManage = Ext.create('widget.advancepaymenmanage', { AdvancePaymentRuleId: 0 });
                }
            }, //saveAdvancePayment
            'button[action="saveAdvancePayment"]': {
                click: function () {
                    if (Ext.getCmp('addAdvancePayment').getForm().isValid()) {
                        var advancePaymentId = Ext.getCmp('addAdvancePayment').getForm().findField('AdvancePaymentRuleId').getValue();
                        var urlAdvancePayment = webAPI_path + 'api/AdvancePaymentRule/ManageAdvancePaymentRule';
                        if (advancePaymentId == 0) {
                            Ext.getCmp('addAdvancePayment').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addAdvancePayment').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            Ext.getCmp('addAdvancePayment').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addAdvancePayment').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('addAdvancePayment').getForm().submit({
                            url: urlAdvancePayment,
                            actionMethods: 'POST',
                            params: Ext.getCmp('addAdvancePayment').getForm().getValues(),
                            success: function (form, response) {
                                var r = response.response.responseText;
                                r = Ext.decode(r);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == true) {
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        win.close();
                                    }
                                    //display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully');
                                    Ext.getStore('configuration.AdvancePaymentManageStore').reload();
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
                        });

                    }
                }
            }

        });
    },
    AdvancePaymentEdit: function (rec) {
        var addAdvancePayment = Ext.create('widget.advancepaymenmanage', { advancePaymentId: rec.data.AdvancePaymentRuleId });
        addAdvancePayment.setTitle('Update Advance Payment_Title'.l('SC23810')); //.l('RAP-A05-02'));

        Ext.getCmp('addAdvancePayment').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/AdvancePaymentRule/GetAdvancePaymentRulebyId',
            params: {
                id: rec.data.AdvancePaymentRuleId
            }
        });
    },
    AdvancePaymentDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/AdvancePaymentRule/RemoveAdvancePaymentRule',
                    type: "GET",
                    params: { id: rec.data.AdvancePaymentRuleId },
                    success: function (response) {
                        var r = response;
                        if (r.success == true) {
                            //display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted successfully');
                            //Ext.getStore('configuration.AdvancePaymentManageStore').loadPage(1);
                            var grid = Ext.ComponentQuery.query('[itemid="advancepaymentmanagelistgrid"]')[0];
                            Utils.RefreshGridonDelete(grid, grid.getStore());
                        }
                        else {
                            var ResultText = r.data;
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
    }
});