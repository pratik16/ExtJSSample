Ext.define('Regardz.controller.bookingwizard.BWRightPanelCommon', {
    extend: 'Ext.app.Controller',
    views: ['bookingwizard.RightSide.CommunicationNotes', 'common.CheckboxRow'],
    stores: ['bookingwizard.RightSide.CommunicationNoteListStore', 'bookingwizard.RightSide.SalesInfoBuyingReasonStore', 'bookingwizard.RightSide.SalesInfoCompetitorStore', 'common.LeadSourceStore'],
    thisController: false,
    init: function () {
        var me = this;
        this.control({
            'rightcommunicationnotes': {
                expand: function (p, opt) {

                    var radioGroup = Ext.ComponentQuery.query('rightcommunicationnotes radiogroup[itemid="itemRadioGroupFilter"]')[0];
                    radioGroup.items.items[0].setValue(true);
                    me.loadCommuNoteStores(0); // 0 for all record flag
                }
            },
            'rightsalesinfo': {
                expand: function (p, opt) {
                    me.loadSalesIntoStores(Utils.RightPanObj.ReservationId);
                }
            },
            'rightsalesinfo button[action="searchCompetitors"]': {
                click: function () {

                    var r = Ext.getCmp('searchString2').getValue();

                    Ext.getStore('bookingwizard.RightSide.SalesInfoCompetitorStore').clearFilter();
                    var regex = new RegExp(".*" + r + ".*", "i");
                    Ext.getStore('bookingwizard.RightSide.SalesInfoCompetitorStore').filter("Name", regex, true, true);

                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearCompetitors"]')[0];
                        clearIcon.show();
                    }
                }
            },
            'rightsalesinfo textfield[itemid="searchString2"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        var r = Ext.getCmp('searchString2').getValue();
                        Ext.getStore('bookingwizard.RightSide.SalesInfoCompetitorStore').clearFilter();
                        var regex = new RegExp(".*" + r + ".*", "i");
                        Ext.getStore('bookingwizard.RightSide.SalesInfoCompetitorStore').filter("Name", regex, true, true);
                        if (r.length > 0) {
                            var clearIcon = Ext.ComponentQuery.query('[action="clearCompetitors"]')[0];
                            clearIcon.show();
                        }
                    }
                }
            },
            'rightsalesinfo button[action="clearCompetitors"]': {
                click: function () {
                    Ext.getCmp('searchString2').setValue('');
                    Ext.getStore('bookingwizard.RightSide.SalesInfoCompetitorStore').clearFilter();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearCompetitors"]')[0];
                    clearIcon.hide();
                }
            },
            'rightcommunicationnotes radiogroup[itemid="itemRadioGroupFilter"]': {
                change: function (a, newValue, oldValue, eOpts) {
                    me.loadCommuNoteStores(newValue);
                }
            },
            'rightcommunicationnotes button[action="addCommunicationNote"]': {
                click: function () {
                    var formAddNote = Ext.ComponentQuery.query('rightcommunicationnotes form[itemid="formCommuNote"]')[0];

                    formAddNote.getForm().findField('NoteDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                    formAddNote.getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                    formAddNote.getForm().findField('ReservationId').setValue(Utils.RightPanObj.ReservationId);
                    //debugger;
                    if (formAddNote.getForm().findField('IsReservationNote').getValue() == 1) {
                        formAddNote.getForm().findField('BookingId').setValue(null);
                        formAddNote.getForm().findField('BookingTrackingId').setValue(null);
                        formAddNote.getForm().findField('ReservationId').setValue(Utils.RightPanObj.ReservationId);
                        formAddNote.getForm().findField('IsReservationNote').setValue(true);
                    }
                    else {
                        formAddNote.getForm().findField('ReservationId').setValue(Utils.RightPanObj.ReservationId);
                        formAddNote.getForm().findField('BookingId').setValue(Utils.RightPanObj.BookingId);
                        formAddNote.getForm().findField('BookingTrackingId').setValue(Utils.RightPanObj.BookingTrackingId);
                        formAddNote.getForm().findField('IsReservationNote').setValue(false);
                    }

                    if (formAddNote.getForm().isValid()) {
                        formAddNote.getForm().submit({
                            url: webAPI_path + 'api/WizardRightPanel/AddCommunicationNote',
                            type: 'POST',
                            success: function (form, response) {
                                // var r = response;                               
                               var r = Ext.decode(response.response.responseText);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == true) {
                                    log('AddCommunicationNote', Ext.ComponentQuery.query('rightcommunicationnotes radiogroup[itemid="itemRadioGroupFilter"]')[0]);
                                    var AllCheckbox = Ext.ComponentQuery.query('rightcommunicationnotes radiogroup[itemid="itemRadioGroupFilter"]')[0].items.items[0];
                                    log('cj', AllCheckbox);
                                    if (AllCheckbox != null) {
                                        AllCheckbox.checked = true;
                                    }
                                    me.loadCommuNoteStores(0);
                                    formAddNote.getForm().findField('Note').setValue(null);
                                } else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText)
                                }
                            },
                            failure: function (form, response) {
                                var r = response;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == false) {
                                    Ext.Msg.alert('Error'.l('g'), ResultText)
                                } else {
                                    Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'))
                                }
                            }
                        });
                    }
                }
            },

            /*Methods for sales into*/
            'rightsalesinfo combo[itemid="salesInfoLeadSource"]': {
                select: function (a, newValue, oldValue, eOpts) {
                    var me = this;
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/WizardRightPanel/SaveLeadStourceIdForReservaton',
                        type: "GET",
                        params: {
                            id: Utils.RightPanObj.ReservationId, //reservation Id
                            languageId: newValue[0].data.LeadSourceId
                        },
                        success: function (response) {
                            var r = response;
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                Utils.RightPanObj.LeadSourceId = newValue[0].data.LeadSourceId;
                                me.loadSalesIntoStores(Utils.RightPanObj.ReservationId);
                            } else {
                                Ext.getStore('common.LeadSourceStore').load();
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function () {
                            Ext.getStore('common.LeadSourceStore').load();
                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'))
                        }
                    })
                }
            },
            'rightsalesinfo textfield[itemid="salesInfoBudget"]': {
                blur: function (t, eOpts) {
                    var me = this;
                    if (t.getValue() > 0) {
                        Ext.data.JsonP.request({
                            url: webAPI_path + 'api/WizardRightPanel/SaveBudgetForReservaton',
                            type: "GET",
                            params: {
                                id: Utils.RightPanObj.ReservationId, //reservation Id
                                languageId: t.getValue()
                            },
                            success: function (response) {
                                var r = response;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == true) {
                                    Utils.RightPanObj.Budget = t.getValue();
                                    me.loadSalesIntoStores(Utils.RightPanObj.ReservationId);
                                } else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText)
                                }
                            },
                            failure: function () {
                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                            }
                        });
                    }
                }
            },
            'rightsalesinfo grid[itemid="BuyingReasonList"] checkboxrow': {
                checkchange: function (cb, rowInd, isChecked) {
                    var buyIds = '';
                    var buyReason = Ext.getStore('bookingwizard.RightSide.SalesInfoBuyingReasonStore').data;

                    if (buyReason != null && buyReason.length > 0) {
                        for (var i = 0; i < buyReason.length; i++) {
                            if (buyReason.items[i].data.Checked == true)
                                buyIds += buyReason.items[i].data.BuyingReasonId + ",";
                        }
                    }

                    buyIds = buyIds.replace(/\,$/, '');

                    if (buyIds.length > 0) {

                        Ext.data.JsonP.request({
                            url: webAPI_path + 'api/WizardRightPanel/ManageBuyingReasonIds',
                            type: "GET",
                            params: {
                                id: Utils.RightPanObj.ReservationId, //reservation Id
                                languageId: buyIds
                            },
                            success: function (response) {
                                var r = response;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success != true) {
                                    Ext.getStore('bookingwizard.RightSide.SalesInfoBuyingReasonStore').load();
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function () {
                                Ext.getStore('bookingwizard.RightSide.SalesInfoBuyingReasonStore').load();
                                Ext.Msg.alert('Error'.l('g'), 'lead source not saved');
                            }
                        })
                    }
                }
            },
            'rightsalesinfo grid[itemid="CompetitorsList"] checkboxrow': {
                checkchange: function (cb, rowInd, isChecked) {
                    var compIds = '';
                    var compStoreData = Ext.getStore('bookingwizard.RightSide.SalesInfoCompetitorStore').data;

                    if (compStoreData != null && compStoreData.length > 0) {
                        for (var i = 0; i < compStoreData.length; i++) {
                            if (compStoreData.items[i].data.Checked == true)
                                compIds += compStoreData.items[i].data.CompetitorId + ",";
                        }
                    }

                    compIds = compIds.replace(/\,$/, '');

                    if (compIds.length > 0) {

                        Ext.data.JsonP.request({
                            url: webAPI_path + 'api/WizardRightPanel/ManageCompetitorsIds',
                            type: "GET",
                            params: {
                                id: Utils.RightPanObj.ReservationId, //reservation Id
                                languageId: compIds
                            },
                            success: function (response) {
                                var r = response;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success != true) {
                                    Ext.getStore('bookingwizard.RightSide.SalesInfoCompetitorStore').load();
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function () {
                                Ext.getStore('bookingwizard.RightSide.SalesInfoCompetitorStore').load();
                                Ext.Msg.alert('Error'.l('g'), 'Competitors not saved');
                            }
                        })
                    }
                }
            }
        });
    },
    loadCommuNoteStores: function (flag) {
        log('loadCommuNoteStores', Utils.RightPanObj);
        var communiNoteStore = Ext.getStore('bookingwizard.RightSide.CommunicationNoteListStore');
        communiNoteStore.proxy.setExtraParam('id', Utils.RightPanObj.ReservationId); //ReservationId
        communiNoteStore.proxy.setExtraParam('id1', Utils.RightPanObj.BookingTrackingId); //ReservationId
        communiNoteStore.proxy.setExtraParam('id2', Utils.RightPanObj.BookingId); //BookingId (Set 0 when null)
        communiNoteStore.proxy.setExtraParam('languageId', flag); //flag for Fill grid for All/Booking/Reservation
        communiNoteStore.load();
    },
    loadSalesIntoStores: function (id) {
        Ext.getStore('common.LeadSourceStore').proxy.setExtraParam('id', user_language);
        Ext.getStore('common.LeadSourceStore').load({
            callback: function (response, o, success) {
                var salesInfoLeadSource = Ext.ComponentQuery.query('rightsalesinfo textfield[itemid="salesInfoLeadSource"]')[0];
                if (salesInfoLeadSource != null)
                    salesInfoLeadSource.setValue(Utils.RightPanObj.LeadSourceId);
            }
        });

        var salesInfoBudget = Ext.ComponentQuery.query('rightsalesinfo textfield[itemid="salesInfoBudget"]')[0];
        if (salesInfoBudget != null)
            salesInfoBudget.setValue(Utils.RightPanObj.Budget);


        var salesInfoGrid = Ext.ComponentQuery.query('rightsalesinfo grid[itemid="BuyingReasonList"]')[0];

        var BuyReasonStore = salesInfoGrid.getStore();
        BuyReasonStore.proxy.setExtraParam('id', user_language);
        BuyReasonStore.proxy.setExtraParam('id1', id);
        BuyReasonStore.load();

        var competitorGrid = Ext.ComponentQuery.query('rightsalesinfo grid[itemid="CompetitorsList"]')[0];
        var CompetitorsStore = competitorGrid.getStore();
        CompetitorsStore.proxy.setExtraParam('id', id);
        CompetitorsStore.proxy.setExtraParam('languageId', user_language);
        CompetitorsStore.proxy.setExtraParam('searchString', '');
        CompetitorsStore.load();
    }
});