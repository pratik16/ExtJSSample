Ext.define('Regardz.controller.customer.ContractManage', {
    extend: 'Ext.app.Controller',
    views: ['customer.ContractManageList', 'customer.ContractManage', 'customer.ContractManageWin', 'customer.ContractDiscount', 'customer.ContractDiscountList', 'customer.ContractFixedPriceList'
    , 'customer.ContractCommisionList', 'customer.ConractKickBackList', 'customer.ContractFixedPriceBarList', 'customer.ContractBedroomList', 'customer.ContractBedroom'
    , 'customer.ContractCommision', 'customer.CompanyManage', 'company.Overview_I', 'company.Edit', 'customer.CustomerBookingsList', 'customer.CCompanyOverview', 'customer.CustomerContactsList'
    , 'company.GeneralInfo', 'company.ChildCompanyList' //, 'company.TaskList'
    ],
    stores: ['customer.ContractManageStore', 'customer.ContractDiscountStore', 'customer.ContractFixedPriceStore', 'customer.ContractCommisionStore', 'customer.ContractKickBackStore',
    'customer.ContractFixedPriceBarStore', 'customer.ContractBedroomStore', 'customer.ContractFixedPriceAddStore', 'customer.CountryStore', 'configuration.AddressTypeStore'],
    ContractManageWinController: false,
    init: function () {

        this.control({
            'contractmanagelist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'ContractEdit')
                        this.ContractEdit(zRec);
                    if (fieldName == 'ContractDelete')
                        this.DiscountDelete(zRec);
                    if (fieldName == 'ManageContracts')
                        this.ManageContracts(zRec);

                }
            },

            'contractmanage': {
                afterrender: function () {
                   // alert('tets')
                }
            },

            'button[action="saveCompany"]': {
                click: function () {
                    var a = Ext.getCmp('addCompany').getForm().findField('Gender').getValue(); alert(a);

                    // if (Ext.getCmp('addCompany').getForm().isValid()) {

                    //}
                }
            },

            'companymanage textfield[name=MainEmail]': {
                //    listeners: {
                'blur': function () {
                    //alert('blur');
                }


                //  }
            },
            'button[action="saveContract"]': {
                click: function () {

                    if (Ext.getCmp('addContract').getForm().isValid()) {
                        var discountId = Ext.getCmp('addContract').getForm().findField('ContractId').getValue();

                        if (discountId > 0) {
                            Ext.getCmp('addContract').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addContract').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            Ext.getCmp('addContract').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addContract').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        var urlContract = webAPI_path + 'api/Contract/ManageContract';
                        Ext.getCmp('addContract').getForm().submit({
                            url: urlContract,
                            actionMethods: 'POST',
                            params: Ext.getCmp('addContract').getForm().getValues(),
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
                                    display_alert('MG00000');
                                    //Ext.Msg.alert('Success'.l('g'), 'Information saved successfully');
                                    Ext.getStore('customer.ContractManageStore').reload();
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
    ManageContracts: function (rec) {
        //alert(rec.data.ContractId);
        var me = this;
        var d = me.getController('customer.ContractManageWin');
        if (me.ContractManageWinController == false) {
            d.init();
            me.ContractManageWinController = true;
        }
        //d.index();
        //ContractDiscountStore
        Ext.getStore('customer.ContractDiscountStore').proxy.setExtraParam('id', rec.data.ContractId);
        Ext.getStore('customer.ContractDiscountStore').load({
        });
        Ext.getStore('customer.ContractKickBackStore').proxy.setExtraParam('id', rec.data.ContractId);
        Ext.getStore('customer.ContractKickBackStore').proxy.setExtraParam('searchParam', true);
        Ext.getStore('customer.ContractKickBackStore').load({
        });
        Ext.getStore('customer.ContractFixedPriceBarStore').proxy.setExtraParam('id', rec.data.ContractId);
        Ext.getStore('customer.ContractFixedPriceBarStore').load({
        });
        Ext.getStore('customer.ContractCommisionStore').proxy.setExtraParam('id', rec.data.ContractId);
        Ext.getStore('customer.ContractCommisionStore').proxy.setExtraParam('searchParam', false);
        Ext.getStore('customer.ContractCommisionStore').load({
        });
        Ext.getStore('customer.ContractBedroomStore').proxy.setExtraParam('id', rec.data.ContractId);
        Ext.getStore('customer.ContractBedroomStore').load({
        });
        Ext.getStore('customer.ContractFixedPriceStore').proxy.setExtraParam('id', rec.data.ContractId);
        Ext.getStore('customer.ContractFixedPriceStore').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('customer.ContractFixedPriceStore').load({
        });
        Ext.getStore('customer.ContractFixedPriceAddStore').proxy.setExtraParam('id', 0); // me.PropertyId);
        Ext.getStore('customer.ContractFixedPriceAddStore').proxy.setExtraParam('id1', rec.data.ContractId);
        Ext.getStore('customer.ContractFixedPriceAddStore').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('customer.ContractFixedPriceAddStore').load({
        });
        Ext.create('widget.contractManageWin', { contractId: rec.data.ContractId }); //, { contractId: rec.data.ContractId }//, { contractId: rec.data.ContractId }
        //Ext.getCmp('addContractDiscount').getForm().findField('ContractId').setValue(rec.data.ContractId);
    },
    ContractEdit: function (rec) {

        var addContract = Ext.create('widget.contractmanage'); //, { advancePaymentId: rec.data.AdvancePaymentRuleId });
        addContract.setTitle('Update Contract_Title'.l('SC61100')); //.l('SC61100');
        Ext.getCmp('addContract').getForm().findField('StartDate').setReadOnly(1);
        Ext.getCmp('addContract').getForm().findField('StartDate').addClass('x-item-disabled');
        Ext.getCmp('addContract').getForm().findField('EndDate').setReadOnly(1);
        Ext.getCmp('addContract').getForm().findField('EndDate').addClass('x-item-disabled');
        Ext.getCmp('addContract').getForm().findField('ContractName').setReadOnly(1); //.setDisabled(1);
        Ext.getCmp('addContract').getForm().findField('ContractName').addClass('x-item-disabled');

        Ext.getCmp('addContract').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/Contract/GetContractId',
            params: {
                id: rec.data.ContractId
            },
            success: function (form, action) {
                var StartDate = Ext.Date.parse(action.result.data.StartDate, 'c');
                var EndDate = Ext.Date.parse(action.result.data.EndDate, 'c');

                StartDate = Ext.util.Format.date(StartDate, usr_dateformat);
                EndDate = Ext.util.Format.date(EndDate, usr_dateformat);
                //  var StartDate = Ext.Date.format(new Date(action.result.data.StartDate), usr_dateformat)
                // var EndDate = Ext.Date.format(new Date(action.result.data.EndDate), usr_dateformat)

                Ext.getCmp('addContract').getForm().findField('StartDate').setValue(StartDate);
                Ext.getCmp('addContract').getForm().findField('EndDate').setValue(EndDate);
            }
        });
    },
    DiscountDelete: function (rec) {

        //Ext.MessageBox.confirm('Delete', 'Are you sure ?', function (btn) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/Contract/RemoveContract',
                    type: "GET",
                    params: { id: rec.data.ContractId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            //Ext.Msg.alert('Success', 'Record Deleted successfully'); //.'.l('g'));
                            display_alert('MG00040');

                            Ext.getStore('customer.ContractManageStore').loadPage(1);
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

 

