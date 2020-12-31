Ext.define('Regardz.controller.mastervalues.BookingStatus', {
    extend: 'Ext.app.Controller',
    views: ['mastervalues.BookingStatusList', 'mastervalues.BookingStatusManage', 'mastervalues.BookingStatusLang'],
    stores: ['mastervalues.BookingStatusStore', 'common.LanguageListStore'],

    refs: [{
        ref: 'BookingStatusManage',
        selector: 'BookingStatusManage'
    }, {
        ref: 'BookingStatusLang',
        selector: 'BookingStatusLang'
    }],

    init: function () {

        this.control(
        {
            'bookingstatuslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'BookingStatusEdit')
                        this.BookingStatusEdit(zRec);
                }
            },
            'bookingstatusmanage button[action="LanguageContent"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var me = this;
                    //var bookingStatusId = Ext.getCmp('addBookingStatus').getForm().findField('BookingStatusId').getValue();
                    Ext.create('widget.bookingstatuslang');
                    //                    Ext.getCmp('bookingStatusLang').getForm().load({
                    //                        method: 'GET',
                    //                        url: webAPI_path + 'api/MasterValue/GetBookingStatusForMultiLingUpdate',
                    //                        params: {
                    //                            id: bookingStatusId,
                    //                            languageId: user_language
                    //                        }
                    //                    });
                }
            },

            'button[action="saveBookingStatus"]': {
                click: function () {
                    if (Ext.getCmp('addBookingStatus').getForm().isValid()) {
                        //var bookingStatusId = Ext.getCmp('addBookingStatus').getForm().findField('BookingStatusId').getValue();
                        Ext.getCmp('addBookingStatus').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        Ext.getCmp('addBookingStatus').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);

                        Ext.getCmp('addBookingStatus').getForm().submit({
                            url: webAPI_path + 'api/MasterValue/UpdateBookingStatus',
                            type: 'POST',
                            params: Ext.getCmp('addBookingStatus').getForm().getValues(),
                            success: function (form, response) {
                                var r = response.result;
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
                                    //Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                                    display_alert('MG00000');
                                    var newBookingTrackingid = r.data;

                                    if (newBookingTrackingid > 0) {
                                        Utils.UpdateStepFourDataFromRowEdit(newBookingTrackingid);
                                    }
                                    Ext.getStore('mastervalues.BookingStatusStore').reload();
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function (form, response) {
                                var r = response.result;
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
            'bookingstatuslang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {
                    var bookingStatusId = Ext.getCmp('addBookingStatus').getForm().findField('BookingStatusId').getValue();
                    Ext.getCmp('bookingStatusLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/MasterValue/GetBookingStatusForMultiLingUpdate',
                        params: {
                            id: bookingStatusId,
                            languageId: records[0].data.LanguageId
                        }
                    });
                }
            },
            'bookingstatuslang button[action="saveBookingStatusLang"]': {
                click: function () {
                    if (Ext.getCmp('bookingStatusLang').getForm().isValid()) {
                        //var BookingStatusId = Ext.getCmp('addBookingStatus').getForm().findField('BookingStatusId').getValue();
                        Ext.getCmp('bookingStatusLang').getForm().submit({
                            url: webAPI_path + 'api/MasterValue/UpdateBookingStatusMultiLangDetail',
                            type: 'POST',
                            params: Ext.getCmp('bookingStatusLang').getForm().getValues(),
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
                                            Ext.getStore('mastervalues.BookingStatusStore').reload();
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
                                var r = response.result;
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
                        })
                    }
                }
            }
        })

    },
    BookingStatusEdit: function (rec) {
        var editBookingStatus = Ext.create('widget.bookingstatusmanage', { bookingStatusId: rec.data.BookingStatusId });
        //editBookingStatus.setTitle('Update Booking Status'.l('SC21300'));

        Ext.getCmp('addBookingStatus').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/MasterValue/GetBookingStatusForUpdate',
            params: {
                id: rec.data.BookingStatusId,
                languageId: user_language
            }
        });
    }
});