Ext.define('Regardz.controller.configuration.FixedPriceEventItem', {
    extend: 'Ext.app.Controller',
    views: ['configuration.FixedPriceEventItemList', 'configuration.FixedPriceEventItem', 'configuration.FixedPriceEventItemWin',
    'configuration.FixedPriceEventItem', 'configuration.FixedPriceEventItemGroup', 'configuration.FixedPriceEventItemAddWin', 'configuration.FixedPriceEventItemPrice'],
    stores: ['configuration.FixedPriceEventItemStore', 'configuration.FixedPriceEventItemAddStore', 'configuration.FixedPriceEventItemGroupStore'],

    refs: [{
        ref: 'FixedPriceManage',
        selector: 'FixedPriceManage'
    }],
    FixedPriceEventItemAddWinController: false,

    init: function () {

        this.control({
            'fixedpriceeventitemlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'FixedPriceItemEdit')
                        this.FixedPriceItemEdit(zRec);
                    if (fieldName == 'RoomRentPrice')
                        this.RoomRentPrice(zRec);
                    else if (fieldName == 'FixedPriceItemDelete')
                        this.FixedPriceItemDelete(zRec);
                }
            },
            'button[action="saveFixedPriceEventItemPrice"]': {
                click: function () {
                    if (Ext.getCmp('addFixedPriceEventItemPrice').getForm().isValid()) {
                        var obj = new Object();
                        obj.FixedPriceDetailId = Ext.getCmp('addFixedPriceEventItemPrice').getForm().findField('FixedPriceDetailId').getValue();
                        obj.A = Ext.getCmp('addFixedPriceEventItemPrice').getForm().findField('A').getValue();
                        obj.B = Ext.getCmp('addFixedPriceEventItemPrice').getForm().findField('B').getValue();
                        obj.C = Ext.getCmp('addFixedPriceEventItemPrice').getForm().findField('C').getValue();
                        obj.D = Ext.getCmp('addFixedPriceEventItemPrice').getForm().findField('D').getValue();

                        var flag = Ext.getCmp('addFixedPriceEventItemPrice').getForm().findField('flag').getValue();
                        if (flag == 'false') {
                            var urlFixedPriceItemPrice = webAPI_path + 'api/FixedPrice/UpdateFixedPriceYieldPrice';
                        }
                        else {
                            var urlFixedPriceItemPrice = webAPI_path + 'api/FixedPrice/AddFixedPriceYieldPrice';
                        }
                        Ext.Ajax.request({
                            url: urlFixedPriceItemPrice,
                            actionMethods: 'POST',
                            params: obj,
                            success: function (response) {
                                var r = Ext.decode(response.responseText);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == true) {
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        win.close();
                                    }
                                    //Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/Designation/BlankRequest',
                                        success: function () {
                                            display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                        }
                                    });
                                    //display_alert('MG00000');
                                    //Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                    //Ext.getStore('configuration.FixedPriceManageStore').reload();
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
                }
            },
            'button[action="addFixpriceEventItem"]': {
                click: function () {

                }
            },
            'button[action="saveFixedPriceEventItem"]': {
                click: function () {

                    if (Ext.getCmp('addFixedPrice').getForm().isValid()) {
                        var FixedPriceId = Ext.getCmp('addFixedPrice').getForm().findField('FixedPriceId').getValue();
                        var urlFixedPrice = webAPI_path + 'api/FixedPrice/ManageFixedPrice';
                        if (FixedPriceId == 0) {
                            Ext.getCmp('addFixedPrice').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addFixedPrice').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            Ext.getCmp('addFixedPrice').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addFixedPrice').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }


                        Ext.getCmp('addFixedPrice').getForm().submit({
                            url: urlFixedPrice,
                            actionMethods: 'POST',
                            params: Ext.getCmp('addFixedPrice').getForm().getValues(),
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
                                    Ext.getStore('configuration.FixedPriceManageStore').reload();
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
                }
            }

        });
    },
    FixedPriceItemDelete: function (rec) {

        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {

                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/FixedPrice/RemoveFixedPriceDetail',
                    type: "GET",
                    params: { id: rec.data.FixedPriceDetailId },
                    success: function (response) {
                        var res = Ext.decode(response.responseText);
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted successfully');
                            Ext.getStore('configuration.FixedPriceEventItemStore').loadPage(1);

                            var eventId = Ext.getCmp('fixedPriceEventItemListForm').getForm().findField('EventId').getValue();
                            Ext.getStore('configuration.FixedPriceEventItemAddStore').proxy.setExtraParam('start', rec.data.FixedPriceEventId); //ok
                            Ext.getStore('configuration.FixedPriceEventItemAddStore').proxy.setExtraParam('limit', eventId);
                            Ext.getStore('configuration.FixedPriceEventItemAddStore').proxy.setExtraParam('languageId', user_language); //ok
                            Ext.getStore('configuration.FixedPriceEventItemAddStore').proxy.setExtraParam('id', rec.data.FixedPriceId); //ok
                            Ext.getStore('configuration.FixedPriceEventItemAddStore').load({});
                            Ext.getStore('configuration.FixedPriceEventItemGroupStore').proxy.setExtraParam('start', rec.data.FixedPriceEventId); //ok
                            Ext.getStore('configuration.FixedPriceEventItemGroupStore').proxy.setExtraParam('limit', eventId);
                            Ext.getStore('configuration.FixedPriceEventItemGroupStore').proxy.setExtraParam('languageId', user_language); //ok
                            Ext.getStore('configuration.FixedPriceEventItemGroupStore').load({});
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

    RoomRentPrice: function (rec) {
        if (rec.data.IsItemOrRoomRent == 0) {

            var fixedpriceeventitemprice = Ext.create('widget.fixedpriceeventitemprice');

            Ext.getCmp('addFixedPriceEventItemPrice').getForm().findField('FixedPriceDetailId').setValue(rec.data.FixedPriceDetailId);

            Ext.getCmp('addFixedPriceEventItemPrice').getForm().load({
                method: 'GET',
                url: webAPI_path + 'api/FixedPrice/GetFixedPriceYieldPricebyId', //api/FixedPrice/ManageFixedPrice
                params: {
                    id: rec.data.FixedPriceDetailId
                },
                success: function (form, action) {

                    var val = Ext.getCmp('addFixedPriceEventItemPrice').getForm().findField('A').getValue();
                    if (val != null || val != undefined) {
                        Ext.getCmp('addFixedPriceEventItemPrice').getForm().findField('flag').setValue(false);
                        fixedpriceeventitemprice.setTitle('Update RoomRent Price_Title'.l('SC22222'));
                    }
                    else {
                        Ext.getCmp('addFixedPriceEventItemPrice').getForm().findField('flag').setValue(true);

                    }

                }
            });
        }
    }

});
