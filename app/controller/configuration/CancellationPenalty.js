Ext.define('Regardz.controller.configuration.CancellationPenalty', {
    extend: 'Ext.app.Controller',
    views: ['configuration.CancellationPenaltyList', 'configuration.CancellationPenaltyManage', 'configuration.CancellationPenaltyUpdate'],
    stores: ['configuration.CancellationPenaltyStore'],

    refs: [{
        ref: 'CancellationPenaltyList',
        selector: 'CancellationPenaltyList'
    }],

    init: function () {

        this.control(
        {
            'cancellationpenaltylist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'CancellationPenaltyEdit')
                        this.CancellationPenaltyEdit(zRec);
                    else if (fieldName == 'CancellationPenaltyDelete')
                        this.CancellationPenaltyDelete(zRec);
                }
            },
            'button[action="addCancellationPenalty"]': {
                click: function () {
                    Ext.create('widget.cancellationpenaltymanage', { cancellationRuleId: 0 })
                }
            },
            'cancellationpenaltymanage button[action="manageCancellationPenalty"]': {
                click: function () {
                    //var cancellationRuleId = Ext.getCmp('manageCancellationPenalty').getForm().findField('CancellationRuleId').getValue();

                    if (Ext.getCmp('manageCancellationPenalty').getForm().isValid()) {

                        Ext.getCmp('manageCancellationPenalty').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        Ext.getCmp('manageCancellationPenalty').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);

                        Ext.getCmp('manageCancellationPenalty').getForm().submit({
                            url: webAPI_path + 'api/CancellationPenalty/AddCancellationPenalty',
                            type: 'POST',
                            params: Ext.getCmp('manageCancellationPenalty').getForm().getValues(),
                            success: function (form, response) {
                                var r = response;
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
                                    Ext.getStore('configuration.CancellationPenaltyStore').reload();
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function (form, response) {
                                r = response;
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
            'cancellationpenaltyupdate button[action="updateCancellationPenalty"]': {
                click: function () {
                    if (Ext.getCmp('updateCancellationPenalty').getForm().isValid()) {
                        Ext.getCmp('updateCancellationPenalty').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        Ext.getCmp('updateCancellationPenalty').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);

                        Ext.getCmp('updateCancellationPenalty').getForm().submit({
                            url: webAPI_path + 'api/CancellationPenalty/UpdateCancellationPenalty',
                            type: 'POST',
                            params: Ext.getCmp('updateCancellationPenalty').getForm().getValues(),
                            success: function (form, response) {
                                var r = response;
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
                                    Ext.getStore('configuration.CancellationPenaltyStore').reload();
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function (form, response) {
                                r = response;
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
    CancellationPenaltyEdit: function (rec) {

        var c = Ext.create('widget.cancellationpenaltyupdate', { cancellationRuleId: rec.data.CancellationRuleId, maxDays: rec.data.MaxDays, minDays: rec.data.MinDays, rules: rec.data.Rules });

        c.setTitle('Update Cancellation Penalty_Title'.l('SC20610'));

        Ext.getCmp('updateCancellationPenalty').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/CancellationPenalty/GetCancellationPenaltyById',
            params: {
                id: rec.data.CancellationRuleId
            }
        });
    },
    CancellationPenaltyDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {

                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/CancellationPenalty/DeleteCancellationPenalty',
                    type: "GET",
                    params: { id: rec.data.CancellationRuleId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            Ext.getStore('configuration.CancellationPenaltyStore').loadPage(1);
                        }
                        else {
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
