Ext.define('Regardz.controller.customer.ContractManageWin', {
    extend: 'Ext.app.Controller',
    views: ['customer.ContractManageWin', 'customer.ContractDiscount', 'customer.ContractBedroom', 'customer.ContractCommision', 'customer.ContractKickBack', 'customer.ContractFixedPriceBar'
    , 'customer.AddContractWin'],
    stores: ['customer.ContractManageStore'],
    init: function () {

        this.control({
            'contractmanagelistwin': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'AddFPContract')
                        this.AddFPContract(zRec);
                }
            },
            'contractbedroomlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'ContractBREdit')
                        this.ContractBREdit(zRec);
                    if (fieldName == 'ContractBRDelete')
                        this.ContractBRDelete(zRec);
                    if (fieldName == 'ManageContracts')
                        this.ManageContracts(zRec);
                }
            },
            'contractcommisionlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'ContractCommissionEdit')
                        this.ContractCommissionEdit(zRec);
                    if (fieldName == 'ContractCommisionDelete')
                        this.ContractCommisionDelete(zRec);
                    if (fieldName == 'ManageContracts')
                        this.ManageContracts(zRec);

                }
            }, 'conractkickbacklist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'ContractKBEdit')
                        this.ContractKBEdit(zRec);
                    if (fieldName == 'ContractKickbackDelete')
                        this.ContractKickbackDelete(zRec);
                    if (fieldName == 'ManageContracts')
                        this.ManageContracts(zRec);

                }

            },
            'contractfixedpricelist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'ContractEdit')
                        this.ContractEdit(zRec);
                    if (fieldName == 'ContractFPDelete')
                        this.ContractFPDelete(zRec);
                    if (fieldName == 'ManageContracts')
                        this.ManageContracts(zRec);
                }
            },
            'contractfixedpricebarlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'ContractFPBEdit')
                        this.ContractFPBEdit(zRec);
                    if (fieldName == 'ContractFPBarDelete')
                        this.ContractFPBarDelete(zRec);
                    if (fieldName == 'ManageContracts')
                        this.ManageContracts(zRec);
                }
            },
            'contractdiscountlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'ContractDiscountEdit')
                        this.ContractDiscountEdit(zRec);
                    if (fieldName == 'ContractDiscountDelete')
                        this.ContractDiscountDelete(zRec);
                    if (fieldName == 'ManageContracts')
                        this.ManageContracts(zRec);
                }

            },
            'button[action="saveContractBedroom"]': {
                click: function () {
                    if (Ext.getCmp('addContractBedroom').getForm().isValid()) {
                        var urlBedroom = webAPI_path + 'api/Contract/ManageContractBedroom';
                        Ext.getCmp('addContractBedroom').getForm().submit({
                            url: urlBedroom,
                            actionMethods: 'POST',
                            params: Ext.getCmp('addContractBedroom').getForm().getValues(),
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
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            display_alert('MG00000');
                                        }
                                    });
                                    display_alert('MG00000');
                                    Ext.getStore('customer.ContractBedroomStore').reload();
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
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }


                        });
                    }
                }
            },
            'button[action="saveContractFixedPriceBar"]': {
                click: function () {
                    if (Ext.getCmp('addContractFixedPriceBar').getForm().isValid()) {
                        var discountId = Ext.getCmp('addContractFixedPriceBar').getForm().findField('ContractFixedPriceBarId').getValue();
                        if (discountId == 0) {
                            Ext.getCmp('addContractFixedPriceBar').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addContractFixedPriceBar').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            Ext.getCmp('addContractFixedPriceBar').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addContractFixedPriceBar').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }
                        var urlFPBar = webAPI_path + 'api/Contract/ManageContractFixedPriceBar';
                        Ext.getCmp('addContractFixedPriceBar').getForm().submit({
                            url: urlFPBar,
                            actionMethods: 'POST',
                            params: Ext.getCmp('addContractFixedPriceBar').getForm().getValues(),
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
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            display_alert('MG00000');
                                        }
                                    });
                                    display_alert('MG00000');
                                    Ext.getStore('customer.ContractFixedPriceBarStore').reload();
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
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }


                        });
                    }

                }
            },
            'button[action="saveContractCommision"]': {
                click: function () {
                    var RevenueFrom = parseInt(Ext.getCmp('addContractCommision').getForm().findField('RevenueFrom').getValue());
                    var RevenueTo = parseInt(Ext.getCmp('addContractCommision').getForm().findField('RevenueTo').getValue());

                    if (RevenueFrom > RevenueTo) {
                        Ext.Msg.alert('Warning'.l('SC61200'), 'Value of RevenueFrom should be less than RevenueTo'.l('SC61200'));
                        return;
                    }
                    else {
                        if (Ext.getCmp('addContractCommision').getForm().isValid()) {
                            var discountId = Ext.getCmp('addContractCommision').getForm().findField('ContractCommissionId').getValue();
                            if (discountId == 0) {
                                Ext.getCmp('addContractCommision').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                                Ext.getCmp('addContractCommision').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                            }
                            else {
                                Ext.getCmp('addContractCommision').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                                Ext.getCmp('addContractCommision').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                            }
                            var urlKickBack = webAPI_path + 'api/Contract/ManageContractCommission';

                            Ext.getCmp('addContractCommision').getForm().submit({
                                url: urlKickBack,
                                actionMethods: 'POST',
                                params: Ext.getCmp('addContractCommision').getForm().getValues(),
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
                                        Ext.data.JsonP.request({
                                            url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                            success: function () {
                                                display_alert('MG00000');
                                            }
                                        });
                                        display_alert('MG00000');
                                        Ext.getStore('customer.ContractCommisionStore').reload();
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
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }


                            });
                        }
                    }
                }
            },
            'button[action="saveContractKickBack"]': { click: function () {
                // alert('k');
                var RevenueFrom = parseInt(Ext.getCmp('addContractKickBack').getForm().findField('RevenueFrom').getValue());
                var RevenueTo = parseInt(Ext.getCmp('addContractKickBack').getForm().findField('RevenueTo').getValue());
                if (RevenueFrom > RevenueTo) {
                    Ext.Msg.alert('Warning'.l('SC61200'), 'Value of RevenueFrom should be less than RevenueTo'.l('SC61200'));
                    return;
                }
                else {
                    if (Ext.getCmp('addContractKickBack').getForm().isValid()) {
                        var discountId = Ext.getCmp('addContractKickBack').getForm().findField('ContractCommissionId').getValue();
                        if (discountId == 0) {
                            Ext.getCmp('addContractKickBack').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addContractKickBack').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            Ext.getCmp('addContractKickBack').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addContractKickBack').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }
                        var urlKickBack = webAPI_path + 'api/Contract/ManageContractCommission';
                        //$.ajax({
                        Ext.getCmp('addContractKickBack').getForm().submit({
                            url: urlKickBack,
                            actionMethods: 'POST',
                            params: Ext.getCmp('addContractKickBack').getForm().getValues(),
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
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {

                                            display_alert('MG00000');
                                        }
                                    });
                                    display_alert('MG00000');
                                    Ext.getStore('customer.ContractKickBackStore').reload();
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
            },
            'button[action="saveContractDiscount"]': {
                click: function () {

                    if (Ext.getCmp('addContractDiscount').getForm().isValid()) {
                        var discountId = Ext.getCmp('addContractDiscount').getForm().findField('ContractDiscountId').getValue();

                        if (discountId == 0) {
                            Ext.getCmp('addContractDiscount').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addContractDiscount').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            Ext.getCmp('addContractDiscount').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addContractDiscount').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }
                        var urlDiscount = webAPI_path + 'api/Contract/ManageContractDiscount';


                        Ext.getCmp('addContractDiscount').getForm().submit({
                            url: urlDiscount,
                            actionMethods: 'POST',
                            params: Ext.getCmp('addContractDiscount').getForm().getValues(),
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
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            display_alert('MG00000');
                                        }
                                    });
                                    display_alert('MG00000');
                                    Ext.getStore('customer.ContractDiscountStore').reload();
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

            }
        });

    },


    ContractKickbackDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {

                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/Contract/RemoveContractCommission',
                    type: "GET",
                    params: { id: rec.data.ContractCommissionId },
                    success: function (response) {
                        var res = Ext.decode(response.responseText);
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040');
                            Ext.getStore('customer.ContractKickBackStore').loadPage(1);
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
    },
    ContractCommisionDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {

                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/Contract/RemoveContractCommission',
                    type: "GET",
                    params: { id: rec.data.ContractCommissionId },
                    success: function (response) {
                        var res = Ext.decode(response.responseText);
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040');
                            Ext.getStore('customer.ContractCommisionStore').loadPage(1);
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
    },
    ContractFPBarDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/Contract/RemoveContractFixedPriceBar',
                    type: "GET",
                    params: { id: rec.data.ContractFixedPriceBarId },
                    success: function (response) {
                        var res = Ext.decode(response.responseText);
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040');
                            Ext.getStore('customer.ContractFixedPriceBarStore').loadPage(1);
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
    },
    ContractFPDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {

                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/Contract/RemoveContractFixedPrice',
                    type: "GET",
                    params: { id: rec.data.ContractFixedPriceId },
                    success: function (response) {
                        var res = Ext.decode(response.responseText);
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040');

                            Ext.getStore('customer.ContractFixedPriceStore').loadPage(1);
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
    },
    ContractBRDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {

                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/Contract/RemoveContractBedroom',
                    type: "GET",
                    params: { id: rec.data.ContractBedroomId },
                    success: function (response) {
                        var res = Ext.decode(response.responseText);
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040');

                            Ext.getStore('customer.ContractBedroomStore').loadPage(1);
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
    },
    ContractDiscountDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/Contract/RemoveContractDiscount',
                    type: "GET",
                    params: { id: rec.data.ContractDiscountId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040');

                            Ext.getStore('customer.ContractDiscountStore').loadPage(1);
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
    },
    ContractDiscountEdit: function (rec) {

        var contractDiscount = Ext.create('widget.contractdiscount', { ContractDiscountId: rec.data.ContractDiscountId, ContractId: rec.data.ContractId });
        contractDiscount.setTitle('Update Discount_Title'.l('SC61210'));

        Ext.getCmp('addContractDiscount').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/Contract/GetContractDiscountbyId',
            params: {
                id: rec.data.ContractDiscountId
            }
        });

    },
    ContractCommissionEdit: function (rec) {
        var contractCommission = Ext.create('widget.contractcommision', { ContractCommissionId: rec.data.ContractCommissionId, ContractId: rec.data.ContractId });
        contractCommission.setTitle('Update Commission_Title'.l('SC61220'));

        Ext.getCmp('addContractCommision').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/Contract/GetContractCommissionbyId',
            params: {
                id: rec.data.ContractCommissionId
            }
        });
    },
    ContractKBEdit: function (rec) {
        var contractKickBack = Ext.create('widget.contractkickback', { ContractCommissionId: rec.data.ContractCommissionId, ContractId: rec.data.ContractId });
        contractKickBack.setTitle('Update Kickback_Title'.l('SC61230'));

        Ext.getCmp('addContractKickBack').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/Contract/GetContractCommissionbyId',
            params: {
                id: rec.data.ContractCommissionId
            }
        });
    },
    ContractBREdit: function (rec) {
        var contractBedroom = Ext.create('widget.contractbedroom', { ContractBedroomId: rec.data.ContractBedroomId, ContractId: rec.data.ContractId });
        contractBedroom.setTitle('Update Bedroom_Title'.l('SC61260'));

        Ext.getCmp('addContractBedroom').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/Contract/GetContractBedroombyId',
            params: {
                id: rec.data.ContractBedroomId
            }
        });
    },
    AddFPContract: function (rec) {


        var FPContrct = new Object();
        FPContrct.ContractFixedPriceId = 0;
        FPContrct.FixedPriceId = rec.data.FixedPriceId;
        FPContrct.PropertyId = Ext.getCmp('contractFP').getForm().findField('PropertyId').getValue();
        FPContrct.RevenueRange = Ext.getCmp('contractFP').getForm().findField('RevenueRange').getValue(); ;
        FPContrct.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
        FPContrct.CreatedBy = CurrentSessionUserId;
        FPContrct.UpdatedDate = '';
        FPContrct.UpdatedBy = '';
        FPContrct.ContractId = Ext.getCmp('contractFP').getForm().findField('ContractId').getValue();

        var contractFP = webAPI_path + 'api/Contract/ManageContractFixedPrice';
        if (Ext.getCmp('contractFP').getForm().isValid()) {
            Ext.Ajax.request({
                url: contractFP,
                actionMethods: 'POST',
                params: FPContrct,
                success: function (response) {
                    var r = Ext.decode(response.responseText);
                    var ResultText = r.result;
                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                        ResultText = ResultText.l("SP_DynamicCode");
                    if (r.success == true) {
                        Ext.data.JsonP.request({
                            url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                            success: function () {
                                display_alert('MG00000');
                            }
                        });
                        display_alert('MG00000');
                        Ext.getStore('customer.ContractFixedPriceAddStore').reload();
                        Ext.getStore('customer.ContractFixedPriceStore').reload();
                        //Ext.getStore('
                    }

                    else {
                        Ext.Msg.alert('Error'.l('g'), ResultText);
                    }
                },
                failure: function () {
                    Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                }
            });
        }



    },
    ContractFPBEdit: function (rec) {
        var contractBedroom = Ext.create('widget.contractfixedpricebar', { ContractFixedPriceBarId: rec.data.ContractFixedPriceBarId, ContractId: rec.data.ContractId });
        contractBedroom.setTitle('Update FixedPriceBar_Title'.l('SC61240'));

        Ext.getCmp('addContractFixedPriceBar').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/Contract/GetContractFixedPriceBarbyId',
            params: {
                id: rec.data.ContractFixedPriceBarId
            }
        });
    },


    index: function (contractId) {
    }
});

 

