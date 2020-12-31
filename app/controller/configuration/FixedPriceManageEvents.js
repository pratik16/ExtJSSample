Ext.define('Regardz.controller.configuration.FixedPriceManageEvents', {
    extend: 'Ext.app.Controller',
    views: ['configuration.FixedPriceManageList', 'configuration.FixedPriceManageEventsList', 'configuration.FixedPriceManageEvents', 'configuration.FixedPriceManageEventsList',
    'configuration.FixedPriceEventItemWin', 'configuration.FixedPriceEventItemList'],
    stores: ['configuration.FixedPriceManageEventsStore', 'configuration.FixedPriceEventItemStore'],
    FixedPriceEventItemController: false,
    FixedPriceEventItemAddWinController: false,
    refs: [{
        ref: 'FixedPriceManage',
        selector: 'FixedPriceManage'
    }],

    init: function () {

        this.control({
            'fixedpricemanageeventslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'EventEdit')
                        this.EventEdit(zRec);
                    else if (fieldName == 'FixedPriceEventDelete')
                        this.FixedPriceEventDelete(zRec);
                    else if (fieldName == 'ManageItems')
                        this.ManageItems(zRec);
                }
            },



            'button[action="saveFixedPriceEvent"]': {
                click: function () {
                    if (Ext.getCmp('addFixedPriceEvent').getForm().isValid()) {
                        var FixedPriceId = Ext.getCmp('addFixedPriceEvent').getForm().findField('FixedPriceId').getValue();
                        // alert(FixedPriceId);
                        var urlFixedPriceEvent = webAPI_path + 'api/FixedPrice/ManageFixedPriceEvent';
                        Ext.getCmp('addFixedPriceEvent').getForm().submit({
                            url: urlFixedPriceEvent,
                            actionMethods: 'POST',
                            params: Ext.getCmp('addFixedPriceEvent').getForm().getValues(),
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
                                    $.ajax({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                        }
                                    });
                                    display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully');

                                    Ext.getStore('configuration.FixedPriceManageEventsStore').proxy.setExtraParam('id', FixedPriceId);
                                    Ext.getStore('configuration.FixedPriceManageEventsStore').proxy.setExtraParam('languageId', user_language);
                                    Ext.getStore('configuration.FixedPriceManageEventsStore').load({
                                    });

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
    //Ext.create('widget.fixedpricemanageeventslistwin').show();
    ManageItems: function (rec) {
        var me = this;
        var d = me.getController('configuration.FixedPriceEventItem');
        if (me.FixedPriceEventItemController == false) {
            d.init();
            me.FixedPriceEventItemController = true;
        }
        if (rec.data.FixedPriceEventId) {
            Ext.create('widget.fixedpriceeventitemwin', { FixedPriceEventId: rec.data.FixedPriceEventId, FixedPriceId: rec.data.FixedPriceId, EventId: rec.data.EventId }).show();
        }
        var me = this;
        var d = me.getController('configuration.FixedPriceEventItemAddWin');
        if (me.FixedPriceEventItemAddWinController == false) {
            d.init();
            me.FixedPriceEventItemAddWinController = true;
        }
        Ext.getStore('configuration.FixedPriceEventItemStore').proxy.setExtraParam('id', rec.data.FixedPriceEventId);
        //Ext.getStore('configuration.FixedPriceEventItemStore').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('configuration.FixedPriceEventItemStore').load({
        });
        //var fp = Ext.getStore('configuration.FixedPriceManageEventsStore').getAt(0);
        //alert(rec.data.FixedPriceId);
        //alert(fp.data.FixedPriceId);
        Ext.getStore('configuration.FixedPriceEventItemAddStore').proxy.setExtraParam('start', rec.data.FixedPriceEventId);
        Ext.getStore('configuration.FixedPriceEventItemAddStore').proxy.setExtraParam('limit', rec.data.EventId);
        Ext.getStore('configuration.FixedPriceEventItemAddStore').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('configuration.FixedPriceEventItemAddStore').proxy.setExtraParam('id', rec.data.FixedPriceId);
        Ext.getStore('configuration.FixedPriceEventItemAddStore').load({});
        Ext.getStore('configuration.FixedPriceEventItemGroupStore').proxy.setExtraParam('start', rec.data.FixedPriceEventId);
        Ext.getStore('configuration.FixedPriceEventItemGroupStore').proxy.setExtraParam('limit', rec.data.EventId);
        Ext.getStore('configuration.FixedPriceEventItemGroupStore').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('configuration.FixedPriceEventItemGroupStore').load({});

    },
    EventEdit: function (rec) {
        var fixedpricemanageevents = Ext.create('widget.fixedpricemanageevents');
        Ext.getCmp('addFixedPriceEvent').getForm().findField('EventId').setReadOnly(1);
        fixedpricemanageevents.setTitle('Update FixedPrice Event_Title'.l('SC22210')); //.l('RAP-A05-02'));

        Ext.getCmp('addFixedPriceEvent').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/FixedPrice/GetFixedPriceEventbyId', //api/FixedPrice/ManageFixedPrice
            params: {
                id: rec.data.FixedPriceEventId
            },
            success: function (form, action) {

            }

        });

    },
    FixedPriceEventDelete: function (rec) {
        //alert(rec.data.FixedPriceId);
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {

                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/FixedPrice/RemoveFixedPriceEvent',
                    type: "GET",
                    params: { id: rec.data.FixedPriceEventId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            //Ext.getStore('configuration.FixedPriceManageStore').reload();
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted successfully');
                            Ext.getStore('configuration.FixedPriceManageEventsStore').loadPage(1);

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
