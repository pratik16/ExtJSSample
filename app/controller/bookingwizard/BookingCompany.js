Ext.define('Regardz.controller.bookingwizard.BookingCompany', {
    extend: 'Ext.app.Controller',
    views: ['bookingwizard.BookingCompanyManage', 'bookingwizard.CompanyContactManage'],
    stores: ['common.QualityRatingStore'],
    companyController: false,
    refs: [{
        ref: 'bookingcompanymanage',
        selector: 'bookingcompanymanage'
    }],
    init: function () {
        var me = this;

        this.control(
        {
            'button[action="addCompany"]': {
                click: function () {                    
                    Ext.create('widget.bookingcompanymanage', { companyId: 0 }).show();
                }
            },
            'bookingcompanymanage textfield[itemid="companyEmail"]': {
                blur: function (field, eOpts) {
                    if (field.getValue() != '' && field.validate()) {
                        var btn = Ext.ComponentQuery.query('bookingcompanymanage [itemid="saveCompany"]')[0];
                        btn.enable();
                        var url = 'api/company/CompanyDomainExist';
                        Ext.Ajax.request({
                            url: webAPI_path + url,
                            method: 'GET',
                            params: { email: field.value },
                            success: function (response) {
                                var r = Ext.decode(response.responseText);
                                if (r.result == true) {
                                    Ext.Msg.alert('Error'.l('g'), 'SPC_S_DEW'.l('SP_DynamicCode', r.domainCompanies));
                                    btn.disable();
                                }
                            }
                        });
                    }
                }
            },
            'bookingcompanymanage button[action="saveCompanyBooking"]': {
                click: function () {
                    var form = Ext.ComponentQuery.query('form[itemid="manageCompanyItem"]')[0].getForm();
                    if (form.isValid()) {
                        //Get values if valid
                        var addCompanyObj = form.getValues();
                        form.findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        form.findField('CreatedBy').setValue(CurrentSessionUserId);
                        form.findField('languageId').setValue(user_language);
                        addCompanyObj.NoEmail = Ext.ComponentQuery.query('[name="NoEmail"]')[0].value;

                        var urlItem = webAPI_path + 'api/company/AddCompanyFromWizard';
                        form.submit({
                            url: urlItem,
                            type: 'POST',
                            waitMsg: 'save_data_message'.l('g'),
                            params: addCompanyObj,
                            success: function (form, response) {
                                var r = response.result;
                                if (r.success == true) {
                                    me.getBookingcompanymanage().close();

                                    var formType = Ext.ComponentQuery.query('bookcompanysearchcontactlistwindow [itemid="FormType"]')[0];
                                    formType.setValue(11);

                                    var filterCompanyName = Ext.ComponentQuery.query('bookingcompanysearchcontactlist textfield[itemid="fieldFilterCompanies"]')[0];
                                    filterCompanyName.setValue(addCompanyObj.CompanyName);

                                    var contactName = addCompanyObj.FirstName + " " + addCompanyObj.LastName;
                                    var filterContactName = Ext.ComponentQuery.query('bookingcompanycontactlist textfield[itemid="fieldFilterIndividual"]')[0];
                                    filterContactName.setValue(contactName);
                                    var cId = r.data[0];
                                    var indId = r.data[2];

                                    ///Load Company and individual with newly added
                                    Utils.MangageCompanyContact(1, Number(cId), addCompanyObj.CompanyName, Number(indId), contactName);
                                    Ext.getCmp('btnSelectBookingCompanyContact').enable();
                                }
                            },
                            failure: function (form, response) {
                                r = response.result;
                                var ResultText = r.data;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == false) {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            }
                        })
                    } else {
                        console.log('Is invalid');
                    }
                }
            },
            //'button[action="addIndividual"]': {
            //    click: function () {
            //        alert('add');
            //        Ext.create('widget.companycontactmanage', { companyId: 0 }).show();
            //    }
            //},

            'bookingcompanymanage checkbox[name="NoEmail"]': {
                change: function (t, n, o) {//this, new, old
                    var mainEmailTextField = Ext.ComponentQuery.query('textfield[name="Email"]')[0];
                    if (n == true)
                        mainEmailTextField.disable();
                    else
                        mainEmailTextField.enable();

                    //mainEmailTextField.readOnly = false;
                    //mainEmailTextField.removeClass('icon-disable');
                }
            },

            'companycontactmanage checkbox[name="NoEmail"]': {
                change: function (t, n, o) {//this, new, old

                    var mainEmailTextField = Ext.ComponentQuery.query('textfield[name="Email"]')[0];
                    if (n == true)
                        mainEmailTextField.disable();
                    else
                        mainEmailTextField.enable();
                }
            },

            'companycontactmanage textfield[name="Email"]': {
                blur: function (tf, n, o) {//this, new, old
                    if (tf.getValue() != '' && tf.validate()) {
                        var selectedCompnay = Ext.getStore('bookingwizard.CompanySearchListStore').findRecord('Checked', true);
                        var VarCompanyId;
                        if (Utils.isValid(selectedCompnay) && Utils.isValid(selectedCompnay.data)) {
                            var addSimpleIndividualWindow = Ext.WindowMgr.get('companySearchContactWindow');

                            if (Utils.isValid(addSimpleIndividualWindow) && addSimpleIndividualWindow.isVisible()) {
                                VarCompanyId = selectedCompnay.data.CompanyId;

                            } else {
                                VarCompanyId = null;
                            }
                        }
                        var emailDomain = tf.getValue().toString().split('@')[1].toString();
                        if (emailDomain == '') {
                            tf.focus();
                            return;
                        }
                        Ext.data.JsonP.request({
                            url: webAPI_path + 'api/company/CheckValidDomainforcontact',
                            type: "GET",
                            params: { id: tf.getValue(), id1: 0, languageId: VarCompanyId },
                            success: function (response) {
                                var r = response;
                                if (r.success == true && r.result == 'DOMAINNOTVALID') {
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            Ext.Msg.alert('Error'.l('g'), 'This domain is not valid'.l('SC61120'));
                                        }
                                    });
                                }
                                else if (r.success == true && r.result == 'DUPLICATEEMAIL') {
                                    tf.setValue('');

                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            Ext.Msg.alert('Error'.l('g'), 'This Email-Id already registered.'.l('SC61120'));

                                        }
                                    });
                                    tf.focus();
                                }
                                else if (r.success == true && r.result == 'SPC_S_DEW') {

                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {

                                            Ext.Msg.confirm('Warning'.l('g'), 'SPC_S_DEW'.l('SP_DynamicCode', r.domainCompanies),
                                                function (btn) {
                                                    if (btn === 'yes') {

                                                        var objCompanyDomain = new Object();
                                                        objCompanyDomain.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                                                        objCompanyDomain.CreatedBy = CurrentSessionUserId;
                                                        objCompanyDomain.CompanyId = VarCompanyId;
                                                        objCompanyDomain.DomainName = emailDomain;
                                                        Ext.Ajax.request({
                                                            url: webAPI_path + 'api/company/AddNewCompanyDomain',
                                                            type: 'POST',
                                                            params: objCompanyDomain,
                                                            success: function (response) {
                                                                var r = Ext.decode(response.responseText);
                                                                var ResultText = r.result;
                                                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                                                    ResultText = ResultText.l("SP_DynamicCode");
                                                                if (r.success == false)
                                                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                                            },
                                                            failure: function () {

                                                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                                            }
                                                        });
                                                        Ext.Msg.alert('Domain Adding Call');
                                                    }
                                                    else {
                                                        tf.setValue('');
                                                        tf.focus();
                                                    }
                                                });
                                        }
                                    });
                                }
                                else if (r.success == true && r.result == 'SPC_S_DYWTATD') {

                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {

                                            Ext.Msg.confirm('Warning'.l('g'), 'SPC_S_DYWTATD'.l('SP_DynamicCode'),
                                                function (btn) {
                                                    if (btn === 'yes') {

                                                        var objCompanyDomain = new Object();
                                                        objCompanyDomain.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                                                        objCompanyDomain.CreatedBy = CurrentSessionUserId;
                                                        objCompanyDomain.CompanyId = VarCompanyId;
                                                        objCompanyDomain.DomainName = emailDomain;
                                                        Ext.Ajax.request({
                                                            url: webAPI_path + 'api/company/AddNewCompanyDomain',
                                                            type: 'POST',
                                                            params: objCompanyDomain,
                                                            success: function (response) {
                                                                var r = Ext.decode(response.responseText);
                                                                var ResultText = r.result;
                                                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                                                    ResultText = ResultText.l("SP_DynamicCode");
                                                                if (r.success == false)
                                                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                                            },
                                                            failure: function () {

                                                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                                            }
                                                        });

                                                    }

                                                });


                                        }
                                    });
                                }
                            }
                        });
                    }
                    //                    Ext.data.JsonP.request({
                    //                        url: webAPI_path + 'api/Company/IsDuplicateCompanyDomain',
                    //                        type: "GET",
                    //                        params: { email: n },
                    //                        success: function (r) {

                    //                            // var r = jsonDecode(response);
                    //                            if (r.success == true) {
                    //                                console.log('valid');
                    //                            }
                    //                            else {
                    //                                console.log('not valid');
                    //                                var mainEmailTextField = Ext.ComponentQuery.query('textfield[name="Email"]')[0];
                    //                                mainEmailTextField.markInvalid('');
                    //                            }
                    //                        }
                    //                    })
                }
            }
        });
    }

});
