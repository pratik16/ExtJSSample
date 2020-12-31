Ext.define('Regardz.controller.configuration.FixedPriceManage', {
    extend: 'Ext.app.Controller',
    views: ['configuration.FixedPriceManageList', 'configuration.FixedPriceManage', 'configuration.FixedPriceManageEventsListWin', 'configuration.FixedPriceManageEvents',
    'configuration.FixedPriceLang'],
    stores: ['configuration.FixedPriceManageStore', 'configuration.FixedPriceManageEventsStore', 'configuration.StartingSlotStore', 'configuration.EventsListStore', 'configuration.FixedPricePropertyFeatureStore'],

    refs: [{
        ref: 'FixedPriceManage',
        selector: 'FixedPriceManage'
    }],
    FixedPriceManageEventsController: false,

    init: function () {

        this.control({
            'fixedpricemanagelist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'FixedPriceEdit')
                        this.FixedPriceEdit(zRec);
                    else if (fieldName == 'FixedPriceDelete')
                        this.FixedPriceDelete(zRec);
                    else if (fieldName == 'FixedPriceStatus')
                        this.FixedPriceStatus(zRec);
                    else if (fieldName == 'ManageEvents')
                        this.ManageEvents(zRec);
                }
            },

            'button[action="addfixedprice"]': {
                click: function () {
                    var fixedpricemanage = Ext.create('widget.fixedpricemanage', { FixedPriceId: 0, LangFixedPriceId: 0 });
                    this.getEvensList(0);
                }
            },
            'fixedpricelang button[action="saveFPLang"]': {
                click: function (t, e, eo) {
                    // alert('s');
                    if (Ext.getCmp('fixedPriceLang').getForm().isValid()) {
                        Ext.getCmp('fixedPriceLang').getForm().submit({
                            url: webAPI_path + 'api/FixedPrice/ManageFixedPriceLang',
                            type: 'POST',
                            params: Ext.getCmp('fixedPriceLang').getForm().getValues(),
                            success: function (form, response) {
                                var r = response.result;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                ////Get Active Window and close It first
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close();
                                }
                                if (r.success == true) {
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                            Ext.getStore('configuration.FixedPriceManageStore').reload();
                                        }
                                    });
                                }
                                else {
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            Ext.Msg.alert('Error'.l('g'), ResultText);
                                        }
                                    });
                                }
                            },
                            failure: function (form, response) {
                                r = response.result;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == false) {
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            Ext.Msg.alert('Error'.l('g'), ResultText);
                                        }
                                    });
                                }
                                else {
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                        }
                                    });
                                }
                            }
                        });
                    }

                }
            },
            'fixedpricemanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional      
                    // alert('s');

                    var me = this;
                    var FixedPriceId = Ext.getCmp('addFixedPrice').getForm().findField('FixedPriceId').getValue();
                    //alert(FixedPriceId);
                    Ext.create('widget.fixedpricelang');
                    Ext.getCmp('fixedPriceLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/FixedPrice/GetFixedPriceMultiLang',
                        params: {
                            id: FixedPriceId,
                            languageId: user_language
                        }
                    });
                }
            },
            'button[action="saveFixedPrice"]': {
                click: function () {

                    if (Ext.getCmp('addFixedPrice').getForm().isValid()) {
                        var FixedPriceId = Ext.getCmp('addFixedPrice').getForm().findField('FixedPriceId').getValue();

                        var propertyFeatureIds = Ext.getCmp('proprertyFeature').getForm().getValues(); //
                        var selectedPropertyFeatureIds = '';

                        Ext.each(propertyFeatureIds, function (r) {
                            if (selectedPropertyFeatureIds == '') {
                                selectedPropertyFeatureIds = r.propertyids;
                            }
                            else {
                                selectedPropertyFeatureIds += ',' + r.propertyids;
                            }
                        });
                        if (selectedPropertyFeatureIds == undefined) { selectedPropertyFeatureIds = ''; }
                        Ext.getCmp('addFixedPrice').getForm().findField('PropertyFeatureIds').setValue(selectedPropertyFeatureIds);

                        if (FixedPriceId == 0) {
                            Ext.getCmp('addFixedPrice').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addFixedPrice').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }
                        else {
                            Ext.getCmp('addFixedPrice').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('addFixedPrice').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        }
                        var urlFixedPrice = webAPI_path + 'api/FixedPrice/AddFixedPrice';
                        Ext.getCmp('addFixedPrice').getForm().submit({
                            url: urlFixedPrice,
                            actionMethods: 'POST',
                            params: Ext.getCmp('addFixedPrice').getForm().getValues(),
                            success: function (form, response) {
                                var r = response.result;
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
    ManageEvents: function (rec) {
        var me = this;
        var d = me.getController('configuration.FixedPriceManageEvents');
        if (me.FixedPriceManageEventsController == false) {
            d.init();
            me.FixedPriceManageEventsController = true;
        }
        if (rec.data.FixedPriceId) {
            Ext.getStore('configuration.FixedPriceManageEventsStore').proxy.setExtraParam('id', rec.data.FixedPriceId);
            Ext.getStore('configuration.FixedPriceManageEventsStore').proxy.setExtraParam('languageId', rec.data.LanguageId);
            Ext.getStore('configuration.FixedPriceManageEventsStore').load({
            });
            Ext.create('widget.fixedpricemanageeventslistwin', { FixedPriceId: rec.data.FixedPriceId, PropertyId: rec.data.PropertyId }).show();
        }

    },
    FixedPriceEdit: function (rec) {
        var FixedPrice = Ext.create('widget.fixedpricemanage', { FixedPriceId: rec.data.FixedPriceId });
        FixedPrice.setTitle('Update Fixed Price_Title'.l('SC22100'));

        this.getEvensList(rec.data.FixedPriceId);

        Ext.getCmp('addFixedPrice').getForm().findField('PropertyId').setReadOnly(1);
        Ext.getCmp('addFixedPrice').getForm().findField('PropertyId').addClass('x-item-disabled');
        Ext.getCmp('addFixedPrice').getForm().findField('Duration').setReadOnly(1);
        Ext.getCmp('addFixedPrice').getForm().findField('Duration').addClass('x-item-disabled');
        Ext.getCmp('addFixedPrice').getForm().findField('StartingSlotId').setReadOnly(1);
        Ext.getCmp('addFixedPrice').getForm().findField('StartingSlotId').addClass('x-item-disabled');
        Ext.getCmp('addFixedPrice').getForm().findField('TypeId').setReadOnly(1);
        Ext.getCmp('addFixedPrice').getForm().findField('TypeId').addClass('x-item-disabled');
        Ext.getCmp('addFixedPrice').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/FixedPrice/GetFixedPricebyId', //api/FixedPrice/ManageFixedPrice
            params: {
                id: rec.data.FixedPriceId, languageId: rec.data.LanguageId
            },
            success: function (form, action) {
                var duration = Ext.getCmp('addFixedPrice').getForm().findField('Duration').getValue();
                var TimeSlotcode = Ext.getCmp('addFixedPrice').getForm().findField('TimeSlotcode').getValue();

                Ext.getStore('configuration.FixedPriceManageStore').load({
                    params: {
                        'id': duration
                    }
                });
                var resp = Ext.decode(action.response.responseText);

                Ext.getCmp('addFixedPrice').getForm().findField('StartingSlotId').setValue(resp.data.StartingSlotId);



            }
        });

    },
    FixedPriceDelete: function (rec) {

        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {

                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/FixedPrice/RemoveFixedPrice',
                    type: "GET",
                    params: { id: rec.data.FixedPriceId, languageId: rec.data.LanguageId },
                    success: function (response) {

                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {

                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted successfully');
                            Ext.getStore('configuration.FixedPriceManageStore').loadPage(1);
                        }
                        else {
                            Ext.Msg.alert('Message', ResultText);
                        }
                    },

                    failure: function () {
                        Ext.Msg.alert('Error', 'Record not deleted.');
                    }
                });
            }
        });

    },
    getEvensList: function (fixedPriceId) {

        if (typeof fixedPriceId == 'undefined')
            fixedPriceId = 0;

        Ext.getStore('configuration.FixedPricePropertyFeatureStore').load({
            params: {
                'id': fixedPriceId,
                'languageId': user_language
            },
            callback: function (records, o, success) {
                var items = [];
                Ext.each(records, function (r) {
                    if (r.data.Checked == 1)
                        checked = true;
                    else
                        checked = false;

                    items.push({ name: 'propertyids', style: 'white-space:nowrap', inputValue: r.data.PropertyFeatureId, padding: 5,
                        checked: checked,
                        boxLabel: r.data.PropertyFeatureName
                    })

                });

                var checkboxes = new Ext.form.CheckboxGroup({
                    padding: 5,
                    border: false,
                    columns: 2,
                    items: items
                });
                Ext.getCmp('proprertyFeature').removeAll(true);
                Ext.getCmp('proprertyFeature').add(checkboxes);
                Ext.getCmp('proprertyFeature').doLayout();
            }
        })
    },
    FixedPriceStatus: function (rec) {
        //alert('s');
        display_alert("MG00010", '', 'C', function (btn) {

            if (btn === 'yes') {

                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/FixedPrice/ChangeFixedPriceStatus',
                    type: "GET",
                    params: { id: rec.data.FixedPriceId, languageId: rec.data.LanguageId },
                    success: function (response) {
                        var r = response;
                        //var r = jsonDecode(response);
                        if (r.success == true) {
                            display_alert('MG00030'); // Ext.Msg.alert('Success'.l('g'), 'Status updated successfully.');
                            Ext.getStore('configuration.FixedPriceManageStore').reload();
                        }
                        else {
                            Ext.Msg.alert('Message', 'Status is not changed, because price is not set for Roomrent!'); // r.result);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error', 'FixedPrice Status is not changed!');
                    }
                })
            }
        });

    }

});
