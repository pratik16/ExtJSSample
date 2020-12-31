Ext.define('Regardz.controller.configuration.DiscountManage', {
    extend: 'Ext.app.Controller',
    views: ['configuration.DiscountManageList', 'configuration.DiscountManage'], // 'configuration.DepartmentEdit', 'configuration.SubDepartmentManage'], //,'configuration.DepartmentEdit'],'configuration.DepartmentManage'
    stores: ['configuration.DiscountManageStore'],
    init: function () {

        this.control({
            'discountmanagelist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'DiscountEdit')
                        this.DiscountEdit(zRec);
                    if (fieldName == 'DiscountDelete')
                        this.DiscountDelete(zRec);

                }
            },
            //addDepartment
            'button[action="addDiscount"]': {
                click: function () {
                    var addDiscount = Ext.create('widget.discountmanage', { DepartmentId: 0 });
                }
            },
            'button[action="saveDiscount"]': {
                click: function () {
                    if (Ext.getCmp('addDiscount').getForm().isValid()) {
                        var discountId = Ext.getCmp('addDiscount').getForm().findField('DiscountId').getValue();
                        var urlDiscount = webAPI_path + 'api/Discount/ManageDiscount';
                        if (discountId == 0) {
                            Ext.getCmp('addDiscount').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addDiscount').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            Ext.getCmp('addDiscount').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addDiscount').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('addDiscount').getForm().submit({
                            url: urlDiscount,
                            actionMethods: 'POST',
                            params: Ext.getCmp('addDiscount').getForm().getValues(),
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
                                    display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully');
                                    Ext.getStore('configuration.DiscountManageStore').reload();
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
    DiscountEdit: function (rec) {

        var addDiscount = Ext.create('widget.discountmanage', { advancePaymentId: rec.data.AdvancePaymentRuleId });
        addDiscount.setTitle('Update Discount_Title'.l('SC23410')); //; //.l('RAP-A05-02'));

        Ext.getCmp('addDiscount').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/Discount/GetDiscountbyId',
            params: {
                id: rec.data.DiscountId
            }
        });


    },
    DiscountDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {

                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/Discount/RemoveDiscount',
                    type: "GET",
                    params: { id: rec.data.DiscountId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted successfully');
                            //Ext.getStore('configuration.DiscountManageStore').reload();
                            Ext.getStore('configuration.DiscountManageStore').loadPage(1);
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

 

