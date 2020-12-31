Ext.define('Regardz.controller.company.MergeGeneral', {
    extend: 'Ext.app.Controller',
    views: ['company.MergeCompanies', 'company.MergeGeneral', 'company.AddCompanyToMerge', 'company.MergeChildCompanyList', 'company.MergeChildCompanyList2', 'company.MergeAddress', 'company.MergeSales',
        'company.MergeLogo', 'company.MergeChildCompanyList', 'company.MergeRelations', 'company.MergeCompanyContactsList', 'company.MergeParentContactsList', 'company.MergeContacts', 'company.MergeOverview',
        'company.MergeAddressManage', 'company.ContactManageTabs'],
    stores: [//'company.MergeCompaniesStore',
             'company.AddChildCompanyStore', 'company.MergeChildCompany1Store', 'company.MergeChildCompanyStore', 'company.CompanyContactListStore', 'company.MergeCompanyContactListStore'],
    refs: [{
        ref: 'addChildCompany',
        selector: '[itemid=AddChildCompany]'
    }],
    thisController: false,
    init: function () {
        var me = this;
        this.control(
        {
            'mergegeneral': {
                afterrender: function () {
                    me.companyId = Ext.getCmp('MergeCompanyWinForm').getForm().findField('CompanyId').getValue();
                    me.mergeCompanyId = 0;
                    this.LoadMergeDetails(me.companyId, 0, '');
                    //alert(me.companyId);
                }
            },

            'mergegeneral checkbox[itemid=generalTabAccept]': {
                change: function (t, n, o, eOp) {
                    if (n == true) {
                        if (me.mergeCompanyId > 0) {
                            var addressTab = Ext.ComponentQuery.query('tabpanel [itemid="addresses"]')[0];
                            addressTab.enable();

                            var btnMergedCompany = Ext.ComponentQuery.query('[itemid="btnMergedCompany"]')[0];
                            btnMergedCompany.disable();
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), 'Please select MergeTo company.'.l('SC61140'));
                            Ext.ComponentQuery.query('[itemid="generalTabAccept"]')[0].setValue(0);
                        }
                    }
                }
            },

            'mergeaddress checkbox[itemid=addressTabAccept]': {
                change: function (t, n, o, eOp) {
                    if (n == true) {
                        var contactsTab = Ext.ComponentQuery.query('tabpanel [itemid="contacts"]')[0];
                        contactsTab.enable();
                    }
                }
            },

            'mergecontacts checkbox[itemid=contactsTabAccept]': {
                change: function (t, n, o, eOp) {
                    if (n == true) {
                        var salesTab = Ext.ComponentQuery.query('tabpanel [itemid="sales"]')[0];
                        salesTab.enable();
                    }
                }
            },

            'mergesales checkbox[itemid=salesTabAccept]': {
                change: function (t, n, o, eOp) {
                    if (n == true) {
                        var relationsTab = Ext.ComponentQuery.query('tabpanel [itemid="relations"]')[0];
                        relationsTab.enable();
                    }
                }
            },

            'mergerelations checkbox[itemid=relationTabAccept]': {
                change: function (t, n, o, eOp) {
                    if (n == true) {
                        var logoTab = Ext.ComponentQuery.query('tabpanel [itemid="logo"]')[0];
                        logoTab.enable();
                    }
                }
            },

            'mergelogo checkbox[itemid=logoTabAccept]': {
                change: function (t, n, o, eOp) {
                    if (n == true) {
                        var overviewTab = Ext.ComponentQuery.query('tabpanel [itemid="overview"]')[0];
                        overviewTab.enable();
                    }
                }
            },

            'mergeparentcontactslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var obj = iView.getRecord(iRowEl);
                    this.ContactViewPrimary(obj.data.IndividualId);
                }
            },
            'mergecompanycontactslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    Ext.ComponentQuery.query('[itemid="moveItem"]')[0].setValue(0);
                    Ext.ComponentQuery.query('[itemid="mergeItem"]')[0].setValue(0);
                    Ext.ComponentQuery.query('[itemid="primarycompanycontactlist"]')[0].setValue('');
                    this.ContactViewSecondary(iView.getRecord(iRowEl));
                }
            },
            'radiogroup [action="companycontactstatusmove"]': {
                change: function (radio, newValue, oldValue, Opts) {
                    if (me.mergeCompanyId > 0) {
                        if (newValue) { //move
                            Ext.ComponentQuery.query('panel [itemid="primarycompanycontactlist"]')[0].disable();
                            //update store
                            var contactid = Ext.ComponentQuery.query('[itemid="secondarycontactid"]')[0].getValue();
                            if (contactid != null && contactid > 0) {
                                var obj = Ext.ComponentQuery.query('[itemid="mergecompanycontactslist"]')[0];
                                var store = obj.getStore();
                                if (store != null && store.data.items.length > 0) {
                                    var summaryRecord = null;
                                    for (var i = 0; i < store.data.items.length; i++) {
                                        summaryRecord = store.getAt(i);
                                        if (summaryRecord.data.IndividualId == parseInt(contactid)) {
                                            summaryRecord.set('Action', 1);
                                            summaryRecord.set('ActionName', "Move".l('SC61140'));
                                            summaryRecord.set('MergeIndividualId', 0);
                                            summaryRecord.set('MergeIndividualName', '');
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            'radiogroup [action="companycontactstatusmerge"]': {
                change: function (radio, newValue, oldValue, Opts) {
                    if (me.mergeCompanyId > 0) {
                        if (newValue) { //move
                            Ext.ComponentQuery.query('panel [itemid="primarycompanycontactlist"]')[0].enable();
                            Ext.ComponentQuery.query('[itemid="primarycompanycontactlist"]')[0].setValue('');
                        }
                    }
                }
            },
            'combo[action="comboMergeContact"]': {
                select: function (combo, records, Opts) {
                    var contactid = Ext.ComponentQuery.query('[itemid="secondarycontactid"]')[0].getValue();
                    if (contactid != null && contactid > 0) {
                        var obj = Ext.ComponentQuery.query('[itemid="mergecompanycontactslist"]')[0];
                        var store = obj.getStore();

                        var obj2 = Ext.ComponentQuery.query('[itemid="mergeparentcontactslistL"]')[0];
                        var store2 = obj2.getStore();

                        if (store != null && store.data.items.length > 0) {
                            var summaryRecord = null;
                            for (var i = 0; i < store.data.items.length; i++) {
                                summaryRecord = store.getAt(i);
                                if (summaryRecord.data.IndividualId == parseInt(contactid)) {
                                    summaryRecord.set('Action', 2);
                                    summaryRecord.set('ActionName', combo.rawValue);
                                    summaryRecord.set('MergeIndividualId', combo.getValue());
                                    summaryRecord.set('MergeIndividualName', combo.rawValue);

                                    if (store2 != null && store.data != null) {
                                        var index = store2.findExact('IndividualId', combo.value);
                                        if (index > -1) {
                                            var title = store2.data.items[index].data.Title;
                                            summaryRecord.set('ActionFullName', combo.rawValue + (title == null || title == '' ? '' : ', ' + title));
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            },
            'mergecompanies button[action="btnMergedCompany"]': {
                click: function () {
                    //                        Ext.getStore('company.AddChildCompanyStore').proxy.setExtraParam('id', me.companyId);
                    //                        Ext.getStore('company.AddChildCompanyStore').proxy.setExtraParam('languageId', user_language);
                    //                        Ext.getStore('company.AddChildCompanyStore').proxy.setExtraParam('id1', 4);
                    //                        Ext.getStore('company.AddChildCompanyStore').proxy.setExtraParam('searchString', '');
                    //                        Ext.getStore('company.AddChildCompanyStore').load();
                    Ext.create('widget.addcompanytomerge').show();
                }
            },
            'addcompanytomerge': {
                resize: function (window, adjWidth, adjHeight, eOpts) {
                    var grid = Ext.ComponentQuery.query('grid[itemid=AddChildCompany]')[0];
                    //console.log(grid);
                    var newHeight = adjHeight - gridHeaderHeight;
                    grid.setHeight(newHeight);
                },
                afterrender: function () {
                    var grid = Ext.ComponentQuery.query('grid[itemid=AddChildCompany]')[0];
                    grid.getStore().load({
                        params: { 'id': me.companyId, 'languageId': user_language, 'id1': 4, searchString: '' }
                    });
                }
            },
            'button[action="saveCompanyRelationsMerge"]': {
                click: function (r) {
                    var rec;
                    var AddChildCompany = me.getAddChildCompany().store.data;
                    if (AddChildCompany != null && AddChildCompany.length > 0) {
                        for (var i = 0; i < AddChildCompany.length; i++) {
                            if (AddChildCompany.items[i].data.Checked == "1") {
                                rec = AddChildCompany.items[i];
                            }
                        }
                    }

                    me.mergeCompanyId = rec.data.CompanyId;
                    //alert(me.mergeCompanyId);
                    //this.AddCompany(rec);
                    Ext.ComponentQuery.query('[itemid="generalTabAccept"]')[0].setValue(0);

                    var cid = rec.data.CompanyId;
                    var ccid = user_language;
                    var url = 'api/company/AddParentCompany';
                    Ext.Ajax.request({
                        url: webAPI_path + url,
                        method: 'GET',
                        params: {
                            id: cid,
                            languageId: ccid
                        },
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            if (r.success == true) {
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close();

                                    try {
                                        me.LoadMergeDetails(me.mergeCompanyId, me.companyId, '2');
                                        me.LoadAddressDetails(me.mergeCompanyId, me.companyId, '2');
                                        me.LoadSalesDetails(me.mergeCompanyId, me.companyId, '2');
                                        me.LoadRelationsDetails(me.mergeCompanyId, me.companyId, '2');

                                        Ext.Ajax.request({
                                            url: webAPI_path + 'api/Company/HasContractFinanceDetails',
                                            method: 'GET',
                                            params: { id: me.mergeCompanyId },
                                            success: function (response) {
                                                var r = response.responseText;
                                                r = Ext.decode(r);
                                                if (r.success == true) {
                                                    Ext.Msg.alert('Error'.l('g'), "We do not merge contracts and finacials.".l('SC61140'));
                                                }
                                            }
                                        });
                                    } catch (e) { }
                                }
                            } else {
                                try {
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        win.close();
                                        //Ext.Msg.alert('Error'.l('g'), r.result);
                                        me.LoadMergeDetails(me.mergeCompanyId, me.companyId, '2');
                                        me.LoadAddressDetails(me.mergeCompanyId, me.companyId, '2');
                                        me.LoadSalesDetails(me.mergeCompanyId, me.companyId, '2');
                                        me.LoadRelationsDetails(me.mergeCompanyId, me.companyId, '2');

                                        Ext.Ajax.request({
                                            url: webAPI_path + 'api/Company/HasContractFinanceDetails',
                                            method: 'GET',
                                            params: { id: me.mergeCompanyId },
                                            success: function (response) {
                                                var r = response.responseText;
                                                r = Ext.decode(r);
                                                if (r.success == true) {
                                                    Ext.Msg.alert('Error'.l('g'), "We do not merge contracts and finacials.".l('SC61140'));
                                                }
                                            }
                                        });
                                    }
                                } catch (e) { }
                            }
                        },
                        failure: function (e) {
                            try {
                                me.LoadMergeDetails(me.mergeCompanyId, me.companyId, '2');
                                me.LoadAddressDetails(me.mergeCompanyId, me.companyId, '2');
                                me.LoadSalesDetails(me.mergeCompanyId, me.companyId, '2');
                                me.LoadRelationsDetails(me.mergeCompanyId, me.companyId, '2');

                                Ext.Ajax.request({
                                    url: webAPI_path + 'api/Company/HasContractFinanceDetails',
                                    method: 'GET',
                                    params: { id: me.mergeCompanyId },
                                    success: function (response) {
                                        var r = response.responseText;
                                        r = Ext.decode(r);
                                        if (r.success == true) {
                                            Ext.Msg.alert('Error'.l('g'), "We do not merge contracts and finacials.".l('SC61140'));
                                        }
                                    }
                                });
                            } catch (e) { }
                        }
                    });
                }
            },
            'mergesales panel[itemid=salesitemidL] button': {
                click: function (t) {
                    console.log(t);
                }
            },
            'mergesales panel[itemid=salesitemidR] button': {
                click: function (t) {
                    console.log(t);
                }
            },
            //////////////////////////////////////////////////////////////////////////////////
            /*                   code for load add data in view area                        */
            /* (Company Profile -> Overview -> Gen Info-fieldset -> Add visit addr  link )  */
            //////////////////////////////////////////////////////////////////////////////////
            'mergeaddress button[itemid="addVisitAddrMerge"]': {
                click: function () {
                    Ext.create('widget.mergeaddressmanage', {
                        CompanyId: me.companyId,
                        AddressType: 'VISIT',
                        AddressTypeId: 20
                    }).show();
                    var radioGrp = Ext.ComponentQuery.query('mergeaddressmanage radiogroup[itemid="addressTypeRadio"]')[0];
                    console.log(radioGrp.items.items[1]);
                    radioGrp.items.items[1].setValue(true);
                    radioGrp.disable(1);

                    var addrid = Ext.ComponentQuery.query('[itemid="VisitingAddressId1"]')[0].value;
                    Ext.getCmp('mergeAddressManage').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/address/getaddressbyid',
                        params: {
                            id: addrid,
                            languageId: user_language
                        }
                    });
                }
            },
            //////////////////////////////////////////////////////////////////////////////////
            /*                   code for load add data in view area                        */
            /* (Company Profile -> Overview -> Gen Info-fieldset -> Add postal add link )   */
            //////////////////////////////////////////////////////////////////////////////////
            'mergeaddress button[itemid="addPostAddrMerge"]': {
                click: function () {
                    Ext.create('widget.mergeaddressmanage', {
                        CompanyId: me.companyId,
                        //AddressType: 'PostalAddress',
                        AddressType: 'POST',
                        AddressTypeId: 4
                    }).show();
                    var radioGrp = Ext.ComponentQuery.query('mergeaddressmanage radiogroup[itemid="addressTypeRadio"]')[0];
                    radioGrp.items.items[0].setValue(true);
                    radioGrp.disable(1);

                    var addrid = Ext.ComponentQuery.query('[itemid="PostalAddressId1"]')[0].value;
                    Ext.getCmp('mergeAddressManage').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/address/getaddressbyid',
                        params: {
                            id: addrid,
                            languageId: user_language
                        }
                    });
                }
            },
            //////////////////////////////////////////////////////////////////////////////////
            /*                   code for load add data in view area                        */
            /* (Company Profile -> Overview -> Gen Info-fieldset -> Add invoic addr link )  */
            //////////////////////////////////////////////////////////////////////////////////
            'mergeaddress button[itemid="addInvoAddrMerge"]': {
                click: function () {
                    Ext.create('widget.mergeaddressmanage', {
                        CompanyId: me.companyId,
                        //AddressType: 'InvoiceAddress',
                        AddressType: 'INVOICE',
                        AddressTypeId: 5
                    }).show();

                    var radioGrp = Ext.ComponentQuery.query('mergeaddressmanage radiogroup[itemid="addressTypeRadio"]')[0];
                    radioGrp.items.items[2].setValue(true);
                    radioGrp.disable(1);

                    Ext.ComponentQuery.query('mergeaddressmanage [itemid="attentiontoText"]')[0].enable();
                    Ext.ComponentQuery.query('mergeaddressmanage [itemid="attentiontoValue"]')[0].enable();

                    var addrid = Ext.ComponentQuery.query('[itemid="InvoiceAddressId1"]')[0].value;
                    Ext.getCmp('mergeAddressManage').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/address/getaddressbyid',
                        params: {
                            id: addrid,
                            languageId: user_language
                        }
                    });
                }
            },
            //////////////////////////////////////////////////////////////////////////////////
            /*  code for load add data in view area   Company Profile -> Overview ->        */
            /*  (Gen Info-fieldset -> Add link -> save Company Address )                    */
            //////////////////////////////////////////////////////////////////////////////////
            'button[action="saveCompanyAddressMerge"]': {
                click: function () {
                    CompId = me.companyId;
                    Ext.getCmp('mergeAddressManage').getForm().findField('CompanyId').setValue(CompId);

                    if (Ext.getCmp('mergeAddressManage').getForm().isValid()) {
                        urlAddr = webAPI_path + 'api/Address/AddAddress';
                        addrData = Ext.getCmp('mergeAddressManage').getForm().getValues();

                        Ext.getCmp('mergeAddressManage').getForm().submit({
                            url: urlAddr,
                            type: 'POST',
                            data: addrData,
                            success: function (form, response) {
                                var r = response.response.responseText;
                                r = Ext.decode(r);
                                if (r.success == true) {
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        //close the add window popup
                                        win.close();
                                    }

                                    try {
                                        me.LoadAddressDetails(me.companyId, me.mergeCompanyId, '');

                                        if (parseInt(addrData.AddressTypeId) == 5) {
                                            $(Ext.ComponentQuery.query('[itemid="InvoiceAddressL"]')[0].el.dom).find('.x-form-display-field').addClass('colorRed');
                                            $(Ext.ComponentQuery.query('[itemid="InvoicePostalCodeL"]')[0].el.dom).find('.x-form-display-field').addClass('colorRed');
                                            $(Ext.ComponentQuery.query('[itemid="InvoiceCityL"]')[0].el.dom).find('.x-form-display-field').addClass('colorRed');
                                            $(Ext.ComponentQuery.query('[itemid="InvoiceCountryL"]')[0].el.dom).find('.x-form-display-field').addClass('colorRed');
                                        } else if (parseInt(addrData.AddressTypeId) == 20) {
                                            $(Ext.ComponentQuery.query('[itemid="VisitingAddressL"]')[0].el.dom).find('.x-form-display-field').addClass('colorRed');
                                            $(Ext.ComponentQuery.query('[itemid="VisitingPostalCodeL"]')[0].el.dom).find('.x-form-display-field').addClass('colorRed');
                                            $(Ext.ComponentQuery.query('[itemid="VisitingCityL"]')[0].el.dom).find('.x-form-display-field').addClass('colorRed');
                                            $(Ext.ComponentQuery.query('[itemid="VisitingCountryL"]')[0].el.dom).find('.x-form-display-field').addClass('colorRed');
                                        } else if (parseInt(addrData.AddressTypeId) == 4) {
                                            $(Ext.ComponentQuery.query('[itemid="PostalAddressL"]')[0].el.dom).find('.x-form-display-field').addClass('colorRed');
                                            $(Ext.ComponentQuery.query('[itemid="PostalPostalCodeL"]')[0].el.dom).find('.x-form-display-field').addClass('colorRed');
                                            $(Ext.ComponentQuery.query('[itemid="PostalCityL"]')[0].el.dom).find('.x-form-display-field').addClass('colorRed');
                                            $(Ext.ComponentQuery.query('[itemid="PostalCountryL"]')[0].el.dom).find('.x-form-display-field').addClass('colorRed');
                                        }
                                    } catch (e) { }
                                }
                            },
                            failure: function (form, response) {
                                r = response;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == false) {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                } else {
                                    Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                }
                            }
                        })
                    }
                }
            },
            ////////////////////////////////////////////////////////
            /*          code for load open contact edit           */
            /*    Company Profile-> OverView -> contact grid      */
            ////////////////////////////////////////////////////////
            'button[action="editCompanyContact"]': {
                click: function () {
                    var VarCompanyId = Ext.getCmp('MergeCompanyWinForm').getForm().findField('CompanyId').getValue();
                    var VarIndId = Ext.ComponentQuery.query('[itemid="primarycontactid"]')[0].value;

                    if (VarIndId == null || VarIndId == undefined || VarIndId == 0) {
                        Ext.Msg.alert('Error'.l('g'), 'Please select contact.'.l('SC61140'));
                        return;
                    }
                    Ext.create('widget.contactmanagetabs', { IndividualId: VarIndId, CompanyId: VarCompanyId }).show();
                    var me = this;
                    Ext.getCmp('contactManage').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/Individual/GetIndividualDetailbyId',
                        params: {
                            id: VarIndId
                        },
                        success: function (form, action) {
                            var formSales_C = Ext.getCmp('Sales_C');
                            var formIndividual = Ext.getCmp('contactManage').getForm(); ///CONTEDIT                
                            //alert(formIndividual.findField('SalesManagerName').getValue());
                            formSales_C.getForm().findField('SalesManagerName').setValue(formIndividual.findField('SalesManagerName').getValue());
                            formSales_C.getForm().findField('Interests').setValue(formIndividual.findField('Interests').getValue());
                            formSales_C.getForm().findField('RegardzGimmickReceived').setValue(formIndividual.findField('RegardzGimmickReceived').getValue());
                            formSales_C.getForm().findField('DelphiID').setValue(formIndividual.findField('DelphiID').getValue());
                            formSales_C.getForm().findField('ChildrenName').setValue(formIndividual.findField('ChildrenName').getValue());
                            formSales_C.getForm().findField('Hobbies').setValue(formIndividual.findField('Hobbies').getValue());
                            formSales_C.getForm().findField('FavoriteHoliday').setValue(formIndividual.findField('FavoriteHoliday').getValue());
                            me.loadSalesGrids(VarIndId);
                        }
                    });
                }
            },
            //////////////////////////////////////////////////////////////
            /*         code for save contact Add/Edit on                */
            /*       Company Profile-> OverView -> contact grid         */
            //////////////////////////////////////////////////////////////
            'button[action="saveContact"]': {
                click: function () {
                    if (Ext.getCmp('contactManage').getForm().isValid()) {
                        var individualId = Ext.getCmp('contactManage').getForm().findField('IndividualId').getValue();
                        /*IndividualMailingCode Ids*/
                        var mailingCodeIds = '';
                        try {
                            var IndividualMailingCode = me.getIndividualMailingCode().store.data;
                            if (IndividualMailingCode != null && IndividualMailingCode.length > 0) {
                                for (var i = 0; i < IndividualMailingCode.length; i++) {
                                    if (IndividualMailingCode.items[i].data.Checked == "1")
                                        mailingCodeIds += IndividualMailingCode.items[i].data.MailingCodeID + ",";
                                }
                            }
                        } catch (e) { }
                        mailingCodeIds = mailingCodeIds.replace(/\,$/, '');
                        /*IndividualMailingCode Ids*/

                        /*IndividualContactRole Ids*/
                        var contactRoleIds = '';
                        try {
                            var IndividualContactRole = me.getIndividualContactRole().store.data;
                            if (IndividualContactRole != null && IndividualContactRole.length > 0) {
                                for (var i = 0; i < IndividualContactRole.length; i++) {
                                    if (IndividualContactRole.items[i].data.Checked == "1")
                                        contactRoleIds += IndividualContactRole.items[i].data.ContactRoleId + ",";
                                }
                            }
                        } catch (e) { }
                        contactRoleIds = contactRoleIds.replace(/\,$/, '');
                        /*IndividualContactRole Ids*/

                        /*IndividualRoomClassification Ids*/
                        var classificationIds = '';
                        try {
                            var IndividualRoomClassification = me.getIndividualRoomClassification().store.data;
                            if (IndividualRoomClassification != null && IndividualRoomClassification.length > 0) {
                                for (var i = 0; i < IndividualRoomClassification.length; i++) {
                                    if (IndividualRoomClassification.items[i].data.Checked == "1")
                                        classificationIds += IndividualRoomClassification.items[i].data.RoomClassificationId + ",";
                                }
                            }
                        } catch (e) { }
                        classificationIds = classificationIds.replace(/\,$/, '');
                        /*IndividualRoomClassification Ids*/

                        var formSales_I = Ext.getCmp('Sales_C');
                        var formIndividual = Ext.getCmp('contactManage').getForm();

                        formIndividual.findField('MailingCodeIds').setValue(mailingCodeIds);
                        formIndividual.findField('ContactRoleIds').setValue(contactRoleIds);
                        formIndividual.findField('RoomClassificationIds').setValue(classificationIds);
                        formIndividual.findField('BusinessTypeId').setValue(formSales_I.getForm().findField('BusinessTypeId').getValue());
                        formIndividual.findField('BehaviouralTypeId').setValue(formSales_I.getForm().findField('BehaviouralTypeId').getValue());
                        formIndividual.findField('WeddingAnniversary').setValue(Ext.Date.format(formSales_I.getForm().findField('WeddingAnniversary').getValue(), 'Y-m-d'));
                        formIndividual.findField('Interests').setValue(formSales_I.getForm().findField('Interests').getValue());
                        formIndividual.findField('RegardzGimmickReceived').setValue(formSales_I.getForm().findField('RegardzGimmickReceived').getValue());
                        formIndividual.findField('DelphiID').setValue(formSales_I.getForm().findField('DelphiID').getValue());

                        formIndividual.findField('ChildrenName').setValue(formSales_I.getForm().findField('ChildrenName').getValue());
                        formIndividual.findField('Hobbies').setValue(formSales_I.getForm().findField('Hobbies').getValue());
                        formIndividual.findField('FavoriteHoliday').setValue(formSales_I.getForm().findField('FavoriteHoliday').getValue());

                        if (individualId > 0) {
                            var urlContract = webAPI_path + 'api/Individual/UpdateIndividual';
                            Ext.getCmp('contactManage').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('contactManage').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
                        } else {
                            var urlContract = webAPI_path + 'api/Individual/AddIndividual';
                            Ext.getCmp('contactManage').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('contactManage').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                        }

                        Ext.getCmp('contactManage').getForm().submit({
                            url: urlContract,
                            type: 'POST',
                            //params: Ext.getCmp('contactManage').getForm().getValues(),
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
                                    //display_alert('MG00000');
                                    Ext.getStore('company.CompanyContactListStore').proxy.setExtraParam('id', me.companyId);
                                    Ext.getStore('company.CompanyContactListStore').proxy.setExtraParam('status', 0);
                                    Ext.getStore('company.CompanyContactListStore').load();
                                    //me.ContactViewPrimary(individualId);
                                    Ext.getCmp('contactviewleft').getForm().load({
                                        method: 'GET',
                                        url: webAPI_path + 'api/Individual/GetIndividualDetailbyId',
                                        params: {
                                            id: individualId
                                        }
                                    });
                                } else {
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
                    else {
                        Ext.Msg.alert('Error'.l('g'), 'Some fields are requred, check all tabs.'.l('g'));
                    }
                }
            },
            'button[action="ButtonPressed"]': {
                click: function (e) {
                    //General
                    if (e.toggleGroup == "General1") Ext.ComponentQuery.query('[itemid="MergeGeneralBtn1"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "General2") Ext.ComponentQuery.query('[itemid="MergeGeneralBtn2"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "General3") Ext.ComponentQuery.query('[itemid="MergeGeneralBtn3"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "General4") Ext.ComponentQuery.query('[itemid="MergeGeneralBtn4"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "General5") Ext.ComponentQuery.query('[itemid="MergeGeneralBtn5"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "General6") Ext.ComponentQuery.query('[itemid="MergeGeneralBtn6"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "General7") Ext.ComponentQuery.query('[itemid="MergeGeneralBtn7"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "General8") Ext.ComponentQuery.query('[itemid="MergeGeneralBtn8"]')[0].setValue(e.value);
                    //Address
                    else if (e.toggleGroup == "Address1") Ext.ComponentQuery.query('[itemid="MergeAddressBtn1"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "Address2") Ext.ComponentQuery.query('[itemid="MergeAddressBtn2"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "Address3") Ext.ComponentQuery.query('[itemid="MergeAddressBtn3"]')[0].setValue(e.value);
                    //Sales
                    else if (e.toggleGroup == "Sales1") Ext.ComponentQuery.query('[itemid="MergeSalesBtn1"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "Sales2") Ext.ComponentQuery.query('[itemid="MergeSalesBtn2"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "Sales3") Ext.ComponentQuery.query('[itemid="MergeSalesBtn3"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "Sales4") Ext.ComponentQuery.query('[itemid="MergeSalesBtn4"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "Sales5") Ext.ComponentQuery.query('[itemid="MergeSalesBtn5"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "Sales6") Ext.ComponentQuery.query('[itemid="MergeSalesBtn6"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "Sales7") Ext.ComponentQuery.query('[itemid="MergeSalesBtn7"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "Sales8") Ext.ComponentQuery.query('[itemid="MergeSalesBtn8"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "Sales9") Ext.ComponentQuery.query('[itemid="MergeSalesBtn9"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "Sales10") Ext.ComponentQuery.query('[itemid="MergeSalesBtn10"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "Sales11") Ext.ComponentQuery.query('[itemid="MergeSalesBtn11"]')[0].setValue(e.value);
                    else if (e.toggleGroup == "Sales12") Ext.ComponentQuery.query('[itemid="MergeSalesBtn12"]')[0].setValue(e.value);
                    //Logo
                    else if (e.toggleGroup == "Logo1") Ext.ComponentQuery.query('[itemid="MergeLogoBtn1"]')[0].setValue(e.value);
                    //Relations
                    else if (e.toggleGroup == "Relations1") Ext.ComponentQuery.query('[itemid="MergeRelationsBtn1"]')[0].setValue(e.value);
                }
            },
            'image[itemid="imageThumbL"]': {
                render: function (c) {
                    var thumbLogo = Ext.ComponentQuery.query('[itemid="LogoValue1"]')[0].value;
                    if (thumbLogo != null && thumbLogo.length > 0) {
                        var thumbLogoPath = image_path + 'RAP/Asset/Company/' + me.companyId + '/Original/' + thumbLogo;
                        var thumbImg = Ext.ComponentQuery.query('[itemid="imageThumbL"]')[0];
                        thumbImg.setSrc(thumbLogoPath);
                        thumbImg.doComponentLayout();
                    }
                    else {
                        var thumbLogoPath = 'public/images/No_Image.png';
                        var thumbImg = Ext.ComponentQuery.query('[itemid="imageThumbL"]')[0];
                        thumbImg.setSrc(thumbLogoPath);
                        thumbImg.doComponentLayout();
                    }
                }
            },
            'image[itemid="imageThumbR"]': {
                render: function (c) {
                    var thumbLogo = Ext.ComponentQuery.query('[itemid="LogoValue2"]')[0].value;
                    if (thumbLogo != null && thumbLogo.length > 0) {
                        var thumbLogoPath = image_path + 'RAP/Asset/Company/' + me.mergeCompanyId + '/Original/' + thumbLogo;
                        var thumbImg = Ext.ComponentQuery.query('[itemid="imageThumbR"]')[0];
                        thumbImg.setSrc(thumbLogoPath);
                        thumbImg.doComponentLayout();
                    }
                    else {
                        var thumbLogoPath = 'public/images/No_Image.png';
                        var thumbImg = Ext.ComponentQuery.query('[itemid="imageThumbR"]')[0];
                        thumbImg.setSrc(thumbLogoPath);
                        thumbImg.doComponentLayout();
                    }
                }
            },
            /* START - filter search for merge to company */
            'addchildcompany textfield[itemid=searchStringCompany]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        var r = Ext.ComponentQuery.query('addchildcompany [itemid="searchStringCompany"]')[0].getValue();
                        Ext.getStore('company.AddChildCompanyStore').clearFilter();

                        var grid = Ext.ComponentQuery.query('grid[itemid=AddChildCompany]')[0];
                        grid.getStore().load({
                            params: { 'id': me.companyId, 'languageId': user_language, 'id1': 4, searchString: r }
                        });

                        if (r.length > 0) {
                            var clearIcon = Ext.ComponentQuery.query('[action="clearCompany"]')[0];
                            clearIcon.show();
                        }
                    }
                }
            },
            'addchildcompany button[action=searchCompany]': {
                click: function () {
                    var r = Ext.ComponentQuery.query('addchildcompany [itemid="searchStringCompany"]')[0].getValue();
                    Ext.getStore('company.AddChildCompanyStore').clearFilter();

                    var grid = Ext.ComponentQuery.query('grid[itemid=AddChildCompany]')[0];
                    grid.getStore().load({
                        params: { 'id': me.companyId, 'languageId': user_language, 'id1': 4, searchString: r }
                    });

                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearCompany"]')[0];
                        clearIcon.show();
                    }
                }
            },
            'addchildcompany button[action="clearCompany"]': {
                click: function () {
                    var grid = Ext.ComponentQuery.query('grid[itemid=AddChildCompany]')[0];
                    grid.getStore().load({
                        params: { 'id': me.companyId, 'languageId': user_language, 'id1': 4, searchString: '' }
                    });

                    Ext.ComponentQuery.query('addchildcompany [itemid="searchStringCompany"]')[0].setValue('');
                    Ext.getStore('company.AddChildCompanyStore').clearFilter();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearCompany"]')[0];
                    clearIcon.hide();
                }
            },
            /* END - filter search for merge to company */
            'button[action="mergeBothCompanies"]': {
                click: function () {
                    var companyObj = new Object(); //Ext.getCmp('MergeGeneral').getForm().getValues();
                    companyObj.MergeCompanyId = me.companyId;
                    companyObj.CompanyIdToMerge = me.mergeCompanyId;
                    companyObj.MergedToCompanyId = me.companyId;
                    companyObj.CompanyId = me.companyId;

                    if (companyObj.CompanyIdToMerge == null || companyObj.CompanyIdToMerge <= 0) {
                        Ext.Msg.alert('Error'.l('g'), 'Please select MergeTo company.'.l('SC61140'));
                        return;
                    }

                    var mergecontactid = Ext.ComponentQuery.query('[itemid="secondarycontactid"]')[0].getValue();
                    var mergecontactcombo = Ext.ComponentQuery.query('[itemid="primarycompanycontactlist"]')[0];

                    if (mergecontactid != null && mergecontactid != '' && mergecontactid != '0' && !mergecontactcombo.disabled && (mergecontactcombo.value == null || mergecontactcombo.value == '' || mergecontactcombo.value == '0')) {
                        Ext.Msg.alert('Error'.l('g'), 'Select contact to merge.'.l('SC61140'));
                        return;
                    }

                    var accbtn1 = Ext.ComponentQuery.query('[itemid="generalTabAccept"]')[0].value;
                    var accbtn2 = Ext.ComponentQuery.query('[itemid="contactsTabAccept"]')[0].value;
                    var accbtn3 = Ext.ComponentQuery.query('[itemid="relationTabAccept"]')[0].value;
                    var accbtn4 = Ext.ComponentQuery.query('[itemid="salesTabAccept"]')[0].value;
                    var accbtn5 = Ext.ComponentQuery.query('[itemid="generalTabAccept"]')[0].value;
                    var accbtn6 = Ext.ComponentQuery.query('[itemid="addressTabAccept"]')[0].value;

                    if (!accbtn1 || !accbtn2 || !accbtn3 || !accbtn4 || !accbtn5 || !accbtn6) {
                        Ext.Msg.alert('Error'.l('g'), 'Please accept all checkbox to proceed.'.l('SC61140'));
                        return;
                    }

                    //General
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn1"]')[0].value) == 1) companyObj.Phone = Ext.ComponentQuery.query('[itemid="Phone1"]')[0].value; else companyObj.Phone = Ext.ComponentQuery.query('[itemid="Phone2"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn2"]')[0].value) == 1) companyObj.Fax = Ext.ComponentQuery.query('[itemid="Fax1"]')[0].value; else companyObj.Fax = Ext.ComponentQuery.query('[itemid="Fax2"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn3"]')[0].value) == 1) companyObj.MarketSourceId = Ext.ComponentQuery.query('[itemid="MarketSourceIdL"]')[0].value; else companyObj.MarketSourceId = Ext.ComponentQuery.query('[itemid="MarketSourceIdR"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn4"]')[0].value) == 1) companyObj.SicId = Ext.ComponentQuery.query('[itemid="SicIdL"]')[0].value; else companyObj.SicId = Ext.ComponentQuery.query('[itemid="SicIdR"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn5"]')[0].value) == 1) companyObj.Website = Ext.ComponentQuery.query('[itemid="Website1"]')[0].value; else companyObj.Website = Ext.ComponentQuery.query('[itemid="Website2"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn6"]')[0].value) == 1) companyObj.Twitter = Ext.ComponentQuery.query('[itemid="Twitter1"]')[0].value; else companyObj.Twitter = Ext.ComponentQuery.query('[itemid="Twitter2"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn7"]')[0].value) == 1) companyObj.Facebook = Ext.ComponentQuery.query('[itemid="Facebook1"]')[0].value; else companyObj.Facebook = Ext.ComponentQuery.query('[itemid="Facebook2"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn8"]')[0].value) == 1) companyObj.LinkedIn = Ext.ComponentQuery.query('[itemid="LinkedIn1"]')[0].value; else companyObj.LinkedIn = Ext.ComponentQuery.query('[itemid="LinkedIn2"]')[0].value;
                    //Address
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeAddressBtn1"]')[0].value) == 1) companyObj.InvoiceAddressId = Ext.ComponentQuery.query('[itemid="InvoiceAddressId1"]')[0].value; else companyObj.InvoiceAddressId = Ext.ComponentQuery.query('[itemid="InvoiceAddressId2"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeAddressBtn2"]')[0].value) == 1) companyObj.VisitingAddressId = Ext.ComponentQuery.query('[itemid="VisitingAddressId1"]')[0].value; else companyObj.VisitingAddressId = Ext.ComponentQuery.query('[itemid="VisitingAddressId2"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeAddressBtn3"]')[0].value) == 1) companyObj.PostalAddressId = Ext.ComponentQuery.query('[itemid="PostalAddressId1"]')[0].value; else companyObj.PostalAddressId = Ext.ComponentQuery.query('[itemid="PostalAddressId2"]')[0].value;
                    //Sales
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn1"]')[0].value) == 1) companyObj.SalesManagerId = Ext.ComponentQuery.query('[itemid="SalesManagerId1"]')[0].value; else companyObj.SalesManagerId = Ext.ComponentQuery.query('[itemid="SalesManagerId2"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn2"]')[0].value) == 1) companyObj.SalesManagerAssistantId = Ext.ComponentQuery.query('[itemid="SalesManagerAssistantId1"]')[0].value; else companyObj.SalesManagerAssistantId = Ext.ComponentQuery.query('[itemid="SalesManagerAssistantId2"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn3"]')[0].value) == 1) companyObj.LeadSourceId = Ext.ComponentQuery.query('[itemid="LeadSourceId1"]')[0].value; else companyObj.LeadSourceId = Ext.ComponentQuery.query('[itemid="LeadSourceId2"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn4"]')[0].value) == 1) companyObj.StatusId = Ext.ComponentQuery.query('[itemid="CompanyStatusId1"]')[0].value; else companyObj.StatusId = Ext.ComponentQuery.query('[itemid="CompanyStatusId2"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn5"]')[0].value) == 1) companyObj.QualityRating = Ext.ComponentQuery.query('[itemid="QualityRating1"]')[0].value; else companyObj.QualityRating = Ext.ComponentQuery.query('[itemid="QualityRating2"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn6"]')[0].value) == 1) companyObj.BusinessTypeId = Ext.ComponentQuery.query('[itemid="BusinessTypeId1"]')[0].value; else companyObj.BusinessTypeId = Ext.ComponentQuery.query('[itemid="BusinessTypeId2"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn7"]')[0].value) == 1) companyObj.CreditStatusId = Ext.ComponentQuery.query('[itemid="CreditStatusId1"]')[0].value; else companyObj.CreditStatusId = Ext.ComponentQuery.query('[itemid="CreditStatusId2"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn8"]')[0].value) == 1) companyObj.NoOfEmployees = Ext.ComponentQuery.query('[itemid="NoOfEmployeesL"]')[0].value; else companyObj.NoOfEmployees = Ext.ComponentQuery.query('[itemid="NoOfEmployeesR"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn9"]')[0].value) == 1) companyObj.NoOfBookingAYear = Ext.ComponentQuery.query('[itemid="NoOfBookingAYearL"]')[0].value; else companyObj.NoOfBookingAYear = Ext.ComponentQuery.query('[itemid="NoOfBookingAYearR"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn10"]')[0].value) == 1) companyObj.GroupSize = Ext.ComponentQuery.query('[itemid="GroupSizeL"]')[0].value; else companyObj.GroupSize = Ext.ComponentQuery.query('[itemid="GroupSizeR"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn11"]')[0].value) == 1) companyObj.NoOfRoomNightsAYear = Ext.ComponentQuery.query('[itemid="NoOfRoomNightsAYearL"]')[0].value; else companyObj.NoOfRoomNightsAYear = Ext.ComponentQuery.query('[itemid="NoOfRoomNightsAYearR"]')[0].value;
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn12"]')[0].value) == 1) companyObj.LeadStatusId = Ext.ComponentQuery.query('[itemid="LeadStatusId1"]')[0].value; else companyObj.LeadStatusId = Ext.ComponentQuery.query('[itemid="LeadStatusId2"]')[0].value;
                    //Logo
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeLogoBtn1"]')[0].value) == 1) companyObj.Logo = Ext.ComponentQuery.query('[itemid="LogoValue1"]')[0].value; else companyObj.Logo = Ext.ComponentQuery.query('[itemid="LogoValue2"]')[0].value;
                    //Relations
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeRelationsBtn1"]')[0].value) == 1) companyObj.ParentCompanyId = Ext.ComponentQuery.query('[itemid="ParentCompanyIdL"]')[0].value; else companyObj.ParentCompanyId = Ext.ComponentQuery.query('[itemid="ParentCompanyIdR"]')[0].value;
                    companyObj.UpdatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                    companyObj.UpdatedBy = CurrentSessionUserId;

                    if (companyObj.GroupSize != null && companyObj.GroupSize.indexOf('-') >= 0) {
                        companyObj.GroupSizeMin = trim(companyObj.GroupSize.substring(0, companyObj.GroupSize.indexOf('-')));
                        companyObj.GroupSizeMax = trim(companyObj.GroupSize.substring(companyObj.GroupSize.indexOf('-') + 1));
                    }

                    var cotactIds = '';
                    var obj = Ext.ComponentQuery.query('[itemid="mergecompanycontactslist"]')[0];
                    var store = obj.getStore();
                    if (store != null && store.data.items.length > 0) {
                        var summaryRecord = null;
                        for (var i = 0; i < store.data.items.length; i++) {
                            summaryRecord = store.getAt(i);
                            if (summaryRecord.data.Action == 1) { //move
                                cotactIds += summaryRecord.data.IndividualId + ',0' + '|';
                            } else if (summaryRecord.data.Action == 2) { //merge
                                cotactIds += summaryRecord.data.IndividualId + ',' + summaryRecord.data.MergeIndividualId + '|';
                            }
                        }
                    }
                    companyObj.ContactToMoveOrMergeIds = cotactIds.replace(/\|$/, '');

                    var childCompanyIds = '';
                    var obj = Ext.ComponentQuery.query('[itemid="mergechildcompanylist2"]')[0];
                    var store = obj.getStore();
                    if (store != null && store.data.items.length > 0) {
                        var summaryRecord = null;
                        for (var i = 0; i < store.data.items.length; i++) {
                            summaryRecord = store.getAt(i);
                            if (summaryRecord.data.Checked == 1 || summaryRecord.data.Checked == '1') { //move
                                childCompanyIds += summaryRecord.data.CompanyId + ',';
                            }
                        }
                    }
                    companyObj.ChildCompanyIds = childCompanyIds.replace(/\,$/, '');
                    /////////////////////////////////////////////////////
                    Ext.Ajax.request({
                        url: webAPI_path + 'api/Company/MergeTwoCompany',
                        type: 'POST',
                        params: companyObj,
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            if (r.success == true) {
                                //display_alert('MG00000');
                                var win = Ext.WindowManager.getActive();

                                if (win) {
                                    win.close();
                                    Ext.getStore('customer.CustomerListStore').reload();
                                }
                            }
                            else {
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function (form, response) {
                            r = response.result;
                            if (r.success == false) {
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                            }
                        }
                    });
                }
            },

            'mergecompanies tabpanel tab': {
                activate: function (t, eo, c) {
                    if (t.card.itemid == "addresses") {
                        this.LoadAddressDetails(me.companyId, me.mergeCompanyId, '');
                        if (me.mergeCompanyId > 0) this.LoadAddressDetails(me.mergeCompanyId, me.companyId, '2');
                    } else if (t.card.itemid == "sales") {
                        this.LoadSalesDetails(me.companyId, me.mergeCompanyId, '');
                        if (me.mergeCompanyId > 0) this.LoadSalesDetails(me.mergeCompanyId, me.companyId, '2');
                    } else if (t.card.itemid == "relations") {
                        this.LoadRelationsDetails(me.companyId, me.mergeCompanyId, '');
                        if (me.mergeCompanyId > 0) this.LoadRelationsDetails(me.mergeCompanyId, me.companyId, '2');
                    }

                    if (t.card.itemid != "overview") {
                        return false;
                    }

                    me.fillOverviewForm();
                    /*General fieldset*/
                    var generalinfoGroup = Ext.ComponentQuery.query('mergeoverview form[itemid="generalinfoGroup"]')[0];
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn1"]')[0].value) == 2 ||
                            parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn2"]')[0].value) == 2 ||
                                parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn3"]')[0].value) == 2 ||
                                    parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn4"]')[0].value) == 2
                        ) {
                        generalinfoGroup.show();

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn1"]')[0].value) == 2) {
                            Ext.ComponentQuery.query('[name="PhoneL"]')[0].show();
                            Ext.ComponentQuery.query('[name="PhoneR"]')[0].show();
                        } else {
                            Ext.ComponentQuery.query('[name="PhoneL"]')[0].hide();
                            Ext.ComponentQuery.query('[name="PhoneR"]')[0].hide();
                        }

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn2"]')[0].value) == 2) {
                            Ext.ComponentQuery.query('[name="FaxL"]')[0].show();
                            Ext.ComponentQuery.query('[name="FaxR"]')[0].show();
                        } else {
                            Ext.ComponentQuery.query('[name="FaxL"]')[0].hide();
                            Ext.ComponentQuery.query('[name="FaxR"]')[0].hide();
                        }

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn3"]')[0].value) == 2) {
                            Ext.ComponentQuery.query('[name="MarketSegmentL"]')[0].show();
                            Ext.ComponentQuery.query('[name="MarketSegmentR"]')[0].show();
                        } else {
                            Ext.ComponentQuery.query('[name="MarketSegmentL"]')[0].hide();
                            Ext.ComponentQuery.query('[name="MarketSegmentR"]')[0].hide();
                        }

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn4"]')[0].value) == 2) {
                            Ext.ComponentQuery.query('[name="SICCL"]')[0].show();
                            Ext.ComponentQuery.query('[name="SICCR"]')[0].show();
                        } else {
                            Ext.ComponentQuery.query('[name="SICCL"]')[0].hide();
                            Ext.ComponentQuery.query('[name="SICCR"]')[0].hide();
                        }
                    } else generalinfoGroup.hide();

                    /*Internet Info fieldset*/
                    var InternetInfoGroup = Ext.ComponentQuery.query('mergeoverview form[itemid="InternetInfoGroup"]')[0];
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn5"]')[0].value) == 2 ||
                            parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn6"]')[0].value) == 2 ||
                                parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn7"]')[0].value) == 2 ||
                                    parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn8"]')[0].value) == 2
                     ) {
                        InternetInfoGroup.show();

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn5"]')[0].value) == 2) {
                            Ext.ComponentQuery.query('[name="webaddressL"]')[0].show();
                            Ext.ComponentQuery.query('[name="webaddressR"]')[0].show();
                        } else {
                            Ext.ComponentQuery.query('[name="webaddressL"]')[0].hide();
                            Ext.ComponentQuery.query('[name="webaddressR"]')[0].hide();
                        }

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn6"]')[0].value) == 2) {
                            Ext.ComponentQuery.query('[name="TwitterL"]')[0].show();
                            Ext.ComponentQuery.query('[name="TwitterR"]')[0].show();
                        } else {
                            Ext.ComponentQuery.query('[name="TwitterL"]')[0].hide();
                            Ext.ComponentQuery.query('[name="TwitterR"]')[0].hide();
                        }

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn7"]')[0].value) == 2) {
                            Ext.ComponentQuery.query('[name="FacebookL"]')[0].show();
                            Ext.ComponentQuery.query('[name="FacebookR"]')[0].show();
                        } else {
                            Ext.ComponentQuery.query('[name="FacebookL"]')[0].hide();
                            Ext.ComponentQuery.query('[name="FacebookR"]')[0].hide();
                        }

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeGeneralBtn8"]')[0].value) == 2) {
                            Ext.ComponentQuery.query('[name="LinkedInL"]')[0].show();
                            Ext.ComponentQuery.query('[name="LinkedInR"]')[0].show();
                        } else {
                            Ext.ComponentQuery.query('[name="LinkedInL"]')[0].hide();
                            Ext.ComponentQuery.query('[name="LinkedInR"]')[0].hide();
                        }
                    } else InternetInfoGroup.hide();

                    /*Invoice Address fieldset*/
                    var InvoiceAddressGroup = Ext.ComponentQuery.query('mergeoverview form[itemid="InvoiceAddressGroup"]')[0];
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeAddressBtn1"]')[0].value) == 2) {
                        InvoiceAddressGroup.show();
                        Ext.ComponentQuery.query('[name="AddressInvoiceL"]')[0].show();
                        Ext.ComponentQuery.query('[name="PostalcodeInvoiceL"]')[0].show();
                        Ext.ComponentQuery.query('[name="CityInvoiceL"]')[0].show();
                        Ext.ComponentQuery.query('[name="CountryInvoiceL"]')[0].show();

                        Ext.ComponentQuery.query('[name="AddressInvoiceR"]')[0].show();
                        Ext.ComponentQuery.query('[name="PostalcodeInvoiceR"]')[0].show();
                        Ext.ComponentQuery.query('[name="CityInvoiceR"]')[0].show();
                        Ext.ComponentQuery.query('[name="CountryInvoiceR"]')[0].show();
                    } else InvoiceAddressGroup.hide();

                    /*Visiting Address fieldset*/
                    var VisitingAddressGroup = Ext.ComponentQuery.query('mergeoverview form[itemid="VisitingAddressGroup"]')[0];
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeAddressBtn2"]')[0].value) == 2) {
                        VisitingAddressGroup.show();
                        Ext.ComponentQuery.query('[name="AddressVistingL"]')[0].show();
                        Ext.ComponentQuery.query('[name="PostalcodeVistingL"]')[0].show();
                        Ext.ComponentQuery.query('[name="CityVistingL"]')[0].show();
                        Ext.ComponentQuery.query('[name="CountryVistingL"]')[0].show();

                        Ext.ComponentQuery.query('[name="AddressVistingR"]')[0].show();
                        Ext.ComponentQuery.query('[name="PostalcodeVistingR"]')[0].show();
                        Ext.ComponentQuery.query('[name="CityVistingR"]')[0].show();
                        Ext.ComponentQuery.query('[name="CountryVistingR"]')[0].show();
                    } else VisitingAddressGroup.hide();

                    /*Postal Address fieldset*/
                    var PostalAddressGroup = Ext.ComponentQuery.query('mergeoverview form[itemid="PostalAddressGroup"]')[0];
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeAddressBtn3"]')[0].value) == 2) {
                        PostalAddressGroup.show();
                        Ext.ComponentQuery.query('[name="AddressPostalL"]')[0].show();
                        Ext.ComponentQuery.query('[name="PostalcodePostalL"]')[0].show();
                        Ext.ComponentQuery.query('[name="CityPostalL"]')[0].show();
                        Ext.ComponentQuery.query('[name="CountryPostalL"]')[0].show();

                        Ext.ComponentQuery.query('[name="AddressPostalR"]')[0].show();
                        Ext.ComponentQuery.query('[name="PostalcodePostalR"]')[0].show();
                        Ext.ComponentQuery.query('[name="CityPostalR"]')[0].show();
                        Ext.ComponentQuery.query('[name="CountryPostalR"]')[0].show();
                    } else PostalAddressGroup.hide();

                    var SalesGroup = Ext.ComponentQuery.query('mergeoverview form[itemid="SalesGroup"]')[0];
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn1"]')[0].value) == 2 ||
                            parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn2"]')[0].value) == 2 ||
                                parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn3"]')[0].value) == 2 ||
                                    parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn4"]')[0].value) == 2 ||
                                        parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn5"]')[0].value) == 2 ||
                                            parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn6"]')[0].value) == 2 ||
                                                parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn7"]')[0].value) == 2 ||
                                                    parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn8"]')[0].value) == 2 ||
                                                        parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn9"]')[0].value) == 2 ||
                                                            parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn10"]')[0].value) == 2 ||
                                                                parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn11"]')[0].value) == 2 ||
                                                                    parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn12"]')[0].value) == 2
                    ) {
                        SalesGroup.show();
                        //Sales fields
                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn1"]')[0].value) == 2) {
                            SalesGroup.getForm().findField('SalesManageL').show();
                            SalesGroup.getForm().findField('SalesManageR').show();
                        } else {
                            SalesGroup.getForm().findField('SalesManageL').hide();
                            SalesGroup.getForm().findField('SalesManageR').hide();
                        }

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn2"]')[0].value) == 2) {
                            SalesGroup.getForm().findField('SalesManagerAssistantL').show();
                            SalesGroup.getForm().findField('SalesManagerAssistantR').show();
                        } else {
                            SalesGroup.getForm().findField('SalesManagerAssistantL').hide();
                            SalesGroup.getForm().findField('SalesManagerAssistantR').hide();
                        }

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn3"]')[0].value) == 2) {
                            SalesGroup.getForm().findField('LeadSourceL').show();
                            SalesGroup.getForm().findField('LeadSourceR').show();
                        } else {
                            SalesGroup.getForm().findField('LeadSourceL').hide();
                            SalesGroup.getForm().findField('LeadSourceR').hide();
                        }

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn4"]')[0].value) == 2) {
                            SalesGroup.getForm().findField('CompanyStatusL').show();
                            SalesGroup.getForm().findField('CompanyStatusR').show();
                        } else {
                            SalesGroup.getForm().findField('CompanyStatusL').hide();
                            SalesGroup.getForm().findField('CompanyStatusR').hide();
                        }

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn5"]')[0].value) == 2) {
                            SalesGroup.getForm().findField('QualityRatingL').show();
                            SalesGroup.getForm().findField('QualityRatingR').show();
                        } else {
                            SalesGroup.getForm().findField('QualityRatingL').hide();
                            SalesGroup.getForm().findField('QualityRatingR').hide();
                        }

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn6"]')[0].value) == 2) {
                            SalesGroup.getForm().findField('BusinessTypeL').show();
                            SalesGroup.getForm().findField('BusinessTypeR').show();
                        } else {
                            SalesGroup.getForm().findField('BusinessTypeL').hide();
                            SalesGroup.getForm().findField('BusinessTypeR').hide();
                        }

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn7"]')[0].value) == 2) {
                            SalesGroup.getForm().findField('CreditStatusL').show();
                            SalesGroup.getForm().findField('CreditStatusR').show();
                        } else {
                            SalesGroup.getForm().findField('CreditStatusL').hide();
                            SalesGroup.getForm().findField('CreditStatusR').hide();
                        }

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn8"]')[0].value) == 2) {
                            SalesGroup.getForm().findField('NumberOfEmployeesL').show();
                            SalesGroup.getForm().findField('NumberOfEmployeesR').show();
                        } else {
                            SalesGroup.getForm().findField('NumberOfEmployeesL').hide();
                            SalesGroup.getForm().findField('NumberOfEmployeesR').hide();
                        }

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn9"]')[0].value) == 2) {
                            SalesGroup.getForm().findField('BookingsPerYearL').show();
                            SalesGroup.getForm().findField('BookingsPerYearR').show();
                        } else {
                            SalesGroup.getForm().findField('BookingsPerYearL').hide();
                            SalesGroup.getForm().findField('BookingsPerYearR').hide();
                        }

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn10"]')[0].value) == 2) {
                            SalesGroup.getForm().findField('GroupSizeL').show();
                            SalesGroup.getForm().findField('GroupSizeR').show();
                        } else {
                            SalesGroup.getForm().findField('GroupSizeL').hide();
                            SalesGroup.getForm().findField('GroupSizeR').hide();
                        }

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn11"]')[0].value) == 2) {
                            SalesGroup.getForm().findField('RoomnightsPerYearL').show();
                            SalesGroup.getForm().findField('RoomnightsPerYearR').show();
                        } else {
                            SalesGroup.getForm().findField('RoomnightsPerYearL').hide();
                            SalesGroup.getForm().findField('RoomnightsPerYearR').hide();
                        }

                        if (parseInt(Ext.ComponentQuery.query('[itemid="MergeSalesBtn12"]')[0].value) == 2) {
                            SalesGroup.getForm().findField('LeadStatusL').show();
                            SalesGroup.getForm().findField('LeadStatusR').show();
                        } else {
                            SalesGroup.getForm().findField('LeadStatusL').hide();
                            SalesGroup.getForm().findField('LeadStatusR').hide();
                        }
                    } else SalesGroup.hide();
                    /*Parent company fieldset*/
                    var ParentGroup = Ext.ComponentQuery.query('mergeoverview form[itemid="ParentGroup"]')[0];
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeRelationsBtn1"]')[0].value) == 2) {
                        ParentGroup.show();
                        Ext.ComponentQuery.query('[name="ParentL"]')[0].show();
                        Ext.ComponentQuery.query('[name="ParentR"]')[0].show();
                    } else ParentGroup.hide();

                    /*Parent company fieldset*/
                    var LogoGroup = Ext.ComponentQuery.query('mergeoverview form[itemid="LogoGroup"]')[0];
                    if (parseInt(Ext.ComponentQuery.query('[itemid="MergeLogoBtn1"]')[0].value) == 2) {
                        LogoGroup.show();
                    } else LogoGroup.hide();
                    /*Contacts fieldset*/

                    var contacts = '', contactsL = '';
                    var obj = Ext.ComponentQuery.query('[itemid="mergecompanycontactslist"]')[0];
                    var store = obj.getStore();
                    if (store != null && store.data.items.length > 0) {
                        var summaryRecord = null;
                        for (var i = 0; i < store.data.items.length; i++) {
                            summaryRecord = store.getAt(i);
                            if (summaryRecord.data.Action == null || summaryRecord.data.Action == 0) continue;
                            if (i > 0) {
                                contacts += "<br /><br />";
                                contactsL += "<br /><br />";
                            }
                            if (summaryRecord.data.Action == 2)
                                contactsL += summaryRecord.data.ActionFullName;
                            else
                                contactsL += "&nbsp;&nbsp;&nbsp;";

                            contacts += summaryRecord.data.IndividualName + (summaryRecord.data.Title == null || summaryRecord.data.Title == '' ? '' : ', ' + summaryRecord.data.Title);
                        }
                    }
                    ////////////////////
                    var ContactGroup = Ext.ComponentQuery.query('mergeoverview form[itemid="ContactGroup"]')[0];
                    if (contacts != '') {
                        ContactGroup.show();
                        Ext.ComponentQuery.query('[name="UsersL"]')[0].setValue(contactsL);
                        Ext.ComponentQuery.query('[name="UsersR"]')[0].setValue(contacts);
                        Ext.ComponentQuery.query('[name="UsersL"]')[0].show();
                        Ext.ComponentQuery.query('[name="UsersR"]')[0].show();
                    } else ContactGroup.hide();
                    /* Child compnies */
                    var childCompanies = '', childCompaniesL = '';
                    var obj = Ext.ComponentQuery.query('[itemid="mergechildcompanylist2"]')[0];
                    var store = obj.getStore();
                    if (store != null && store.data.items.length > 0) {
                        var summaryRecord = null;
                        for (var i = 0; i < store.data.items.length; i++) {
                            summaryRecord = store.getAt(i);
                            if (summaryRecord.data.Checked == 1 || summaryRecord.data.Checked == '1') { //move
                                if (i > 0) {
                                    childCompanies += "<br /><br />";
                                    childCompaniesL += "<br /><br />";
                                }
                                childCompaniesL += "&nbsp;&nbsp;&nbsp;";
                                childCompanies += summaryRecord.data.CompanyName + (summaryRecord.data.PinCode == null || summaryRecord.data.PinCode == '' ? '' : ', ' + summaryRecord.data.PinCode) + ' ' + summaryRecord.data.City;
                            }
                        }
                    }
                    ///////////////////
                    var ChildrenGroup = Ext.ComponentQuery.query('mergeoverview form[itemid="ChildrenGroup"]')[0];
                    if (childCompanies != '') {
                        ChildrenGroup.show();
                        Ext.ComponentQuery.query('[name="ChildrenL"]')[0].setValue(childCompaniesL);
                        Ext.ComponentQuery.query('[name="ChildrenR"]')[0].setValue(childCompanies);
                        Ext.ComponentQuery.query('[name="ChildrenL"]')[0].show();
                        Ext.ComponentQuery.query('[name="ChildrenR"]')[0].show();
                    } else ChildrenGroup.hide();
                }
            }
        })
    },
    ContactViewPrimary: function (rec) {
        if (rec > 0) {
            Ext.getCmp('contactviewleft').getForm().load({
                method: 'GET',
                url: webAPI_path + 'api/Individual/GetIndividualDetailbyId',
                params: {
                    id: rec
                }
            });
        }
    },
    ContactViewSecondary: function (rec) {
        if (rec.data.IndividualId > 0) {
            Ext.getCmp('contactviewright').getForm().load({
                method: 'GET',
                url: webAPI_path + 'api/Individual/GetIndividualDetailbyId',
                params: {
                    id: rec.data.IndividualId
                }
            });
        }
    },
    LoadMergeDetails: function (rec, id2, formNo) {
        Ext.getCmp('MergeGeneral' + formNo).getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/company/GetCompanyDetailForMerging',
            params: {
                id: rec, id2: id2, languageId: user_language
            },
            success: function (form, action) {
                try {
                    if (formNo == '') {
                        Ext.ComponentQuery.query('[itemid="CompanyName"]')[0].setValue(action.result.data.CompanyName);
                        Ext.ComponentQuery.query('[itemid="TotalBookings"]')[0].setValue(action.result.data.NoOfBookings);
                        Ext.ComponentQuery.query('[itemid="MergedCompanyName"]')[0].setValue('&nbsp;');
                    } else {
                        Ext.ComponentQuery.query('[itemid="MergedCompanyName"]')[0].setValue(action.result.data.CompanyName);
                        Ext.ComponentQuery.query('[itemid="MergeTotalBookings"]')[0].setValue(action.result.data.NoOfBookings);
                        Ext.ComponentQuery.query('[itemid="MergeCompanyId"]')[0].setValue(action.result.data.CompanyId);
                    }

                    if (formNo == '')
                        Ext.ComponentQuery.query('[itemid="LogoValue1"]')[0].setValue(action.result.data.Logo);
                    else
                        Ext.ComponentQuery.query('[itemid="LogoValue2"]')[0].setValue(action.result.data.Logo);

                    if (rec > 0 && id2 > 0 && action.result.data != null) {
                        //Phone
                        $(Ext.ComponentQuery.query('[itemid="Phone1"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.PhoneDiff == null || action.result.data.PhoneDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="Phone2"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.PhoneDiff == null || action.result.data.PhoneDiff == true ? 'colorRed' : 'colorBlack');
                        //Fax
                        $(Ext.ComponentQuery.query('[itemid="Fax1"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.FaxDiff == null || action.result.data.FaxDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="Fax2"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.FaxDiff == null || action.result.data.FaxDiff == true ? 'colorRed' : 'colorBlack');
                        //MarketSource
                        $(Ext.ComponentQuery.query('[itemid="MarketSourceId1"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.MarketSourceIdDiff == null || action.result.data.MarketSourceIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="MarketSourceId2"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.MarketSourceIdDiff == null || action.result.data.MarketSourceIdDiff == true ? 'colorRed' : 'colorBlack');
                        //SIcId
                        $(Ext.ComponentQuery.query('[itemid="SicId1"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.SicIdDiff == null || action.result.data.SicIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="SicId2"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.SicIdDiff == null || action.result.data.SicIdDiff == true ? 'colorRed' : 'colorBlack');
                        //Website
                        $(Ext.ComponentQuery.query('[itemid="Website1"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.WebsiteDiff == null || action.result.data.WebsiteDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="Website2"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.WebsiteDiff == null || action.result.data.WebsiteDiff == true ? 'colorRed' : 'colorBlack');
                        //Twitter
                        $(Ext.ComponentQuery.query('[itemid="Twitter1"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.TwitterDiff == null || action.result.data.TwitterDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="Twitter2"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.TwitterDiff == null || action.result.data.TwitterDiff == true ? 'colorRed' : 'colorBlack');
                        //Facebook
                        $(Ext.ComponentQuery.query('[itemid="Facebook1"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.FacebookDiff == null || action.result.data.FacebookDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="Facebook2"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.FacebookDiff == null || action.result.data.FacebookDiff == true ? 'colorRed' : 'colorBlack');
                        //LinkedIn
                        $(Ext.ComponentQuery.query('[itemid="LinkedIn1"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.LinkedInDiff == null || action.result.data.LinkedInDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="LinkedIn2"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.LinkedInDiff == null || action.result.data.LinkedInDiff == true ? 'colorRed' : 'colorBlack');
                    }
                } catch (e) { }
            }
        });

        if (id2 == 0 && formNo == '') {
            Ext.getStore('company.MergeChildCompany1Store').proxy.setExtraParam('languageId', user_language);
            Ext.getStore('company.MergeChildCompany1Store').proxy.setExtraParam('id', formNo == '' ? rec : id2);
            Ext.getStore('company.MergeChildCompany1Store').proxy.setExtraParam('id2', formNo == '' ? id2 : id2);
            Ext.getStore('company.MergeChildCompany1Store').load();

            Ext.getStore('company.CompanyContactListStore').proxy.setExtraParam('id', formNo == '' ? rec : id2);
            Ext.getStore('company.CompanyContactListStore').proxy.setExtraParam('status', 0);
            Ext.getStore('company.CompanyContactListStore').load();
        }

        if ((id2 == 0 && formNo == '') || formNo != '') {
            Ext.getStore('company.MergeChildCompanyStore').proxy.setExtraParam('languageId', user_language);
            Ext.getStore('company.MergeChildCompanyStore').proxy.setExtraParam('id', formNo == '' ? 0 : rec);
            Ext.getStore('company.MergeChildCompanyStore').proxy.setExtraParam('id2', formNo == '' ? id2 : id2);
            Ext.getStore('company.MergeChildCompanyStore').load();

            Ext.getStore('company.MergeCompanyContactListStore').proxy.setExtraParam('id', formNo == '' ? 0 : rec);
            Ext.getStore('company.MergeCompanyContactListStore').proxy.setExtraParam('status', 0);
            Ext.getStore('company.MergeCompanyContactListStore').load();
        }
    },
    LoadAddressDetails: function (rec, id2, formNo) {
        Ext.getCmp('MergeAddress' + formNo).getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/company/GetCompanyDetailForMerging',
            params: {
                id: rec, id2: id2, languageId: user_language
            },
            success: function (form, action) {
                if (rec > 0 && id2 > 0 && action.result.data != null) {
                    try {
                        $(Ext.ComponentQuery.query('[itemid="InvoiceAddressL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.InvoiceAddressIdDiff == null || action.result.data.InvoiceAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="InvoiceAddressR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.InvoiceAddressIdDiff == null || action.result.data.InvoiceAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="InvoicePostalCodeL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.InvoiceAddressIdDiff == null || action.result.data.InvoiceAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="InvoicePostalCodeR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.InvoiceAddressIdDiff == null || action.result.data.InvoiceAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="InvoiceCityL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.InvoiceAddressIdDiff == null || action.result.data.InvoiceAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="InvoiceCityR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.InvoiceAddressIdDiff == null || action.result.data.InvoiceAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="InvoiceCountryL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.InvoiceAddressIdDiff == null || action.result.data.InvoiceAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="InvoiceCountryR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.InvoiceAddressIdDiff == null || action.result.data.InvoiceAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        //// 
                        $(Ext.ComponentQuery.query('[itemid="VisitingAddressL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.VisitingAddressIdDiff == null || action.result.data.VisitingAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="VisitingAddressR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.VisitingAddressIdDiff == null || action.result.data.VisitingAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="VisitingPostalCodeL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.VisitingAddressIdDiff == null || action.result.data.VisitingAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="VisitingPostalCodeR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.VisitingAddressIdDiff == null || action.result.data.VisitingAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="VisitingCityL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.VisitingAddressIdDiff == null || action.result.data.VisitingAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="VisitingCityR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.VisitingAddressIdDiff == null || action.result.data.VisitingAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="VisitingCountryL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.VisitingAddressIdDiff == null || action.result.data.VisitingAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="VisitingCountryR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.VisitingAddressIdDiff == null || action.result.data.VisitingAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        ////
                        $(Ext.ComponentQuery.query('[itemid="PostalAddressL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.PostalAddressIdDiff == null || action.result.data.PostalAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="PostalAddressR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.PostalAddressIdDiff == null || action.result.data.PostalAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="PostalPostalCodeL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.PostalAddressIdDiff == null || action.result.data.PostalAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="PostalPostalCodeR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.PostalAddressIdDiff == null || action.result.data.PostalAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="PostalCityL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.PostalAddressIdDiff == null || action.result.data.PostalAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="PostalCityR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.PostalAddressIdDiff == null || action.result.data.PostalAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="PostalCountryL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.PostalAddressIdDiff == null || action.result.data.PostalAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="PostalCountryR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.PostalAddressIdDiff == null || action.result.data.PostalAddressIdDiff == true ? 'colorRed' : 'colorBlack');
                    } catch (e) { }
                }
            }
        });
    },
    LoadSalesDetails: function (rec, id2, formNo) {
        Ext.getCmp('MergeSales' + formNo).getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/company/GetCompanyDetailForMerging',
            params: {
                id: rec, id2: id2, languageId: user_language
            },
            success: function (form, action) {
                if (rec > 0 && id2 > 0 && action.result.data != null) {
                    try {
                        $(Ext.ComponentQuery.query('[itemid="SalesManagerNameL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.SalesManagerIdDiff == null || action.result.data.SalesManagerIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="SalesManagerNameR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.SalesManagerIdDiff == null || action.result.data.SalesManagerIdDiff == true ? 'colorRed' : 'colorBlack');

                        $(Ext.ComponentQuery.query('[itemid="SalesManagerAssistantNameL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.SalesManagerAssistantIdDiff == null || action.result.data.SalesManagerAssistantIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="SalesManagerAssistantNameR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.SalesManagerAssistantIdDiff == null || action.result.data.SalesManagerAssistantIdDiff == true ? 'colorRed' : 'colorBlack');

                        $(Ext.ComponentQuery.query('[itemid="LeadSourceNameL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.LeadSourceIdDiff == null || action.result.data.LeadSourceIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="LeadSourceNameR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.LeadSourceIdDiff == null || action.result.data.LeadSourceIdDiff == true ? 'colorRed' : 'colorBlack');

                        $(Ext.ComponentQuery.query('[itemid="CompanyStatusName1"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.CompanyStatusIdDiff == null || action.result.data.CompanyStatusIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="CompanyStatusName2"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.CompanyStatusIdDiff == null || action.result.data.CompanyStatusIdDiff == true ? 'colorRed' : 'colorBlack');

                        $(Ext.ComponentQuery.query('[itemid="QualityRating1"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.QualityRatingDiff == null || action.result.data.QualityRatingDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="QualityRating2"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.QualityRatingDiff == null || action.result.data.QualityRatingDiff == true ? 'colorRed' : 'colorBlack');

                        $(Ext.ComponentQuery.query('[itemid="BusinessTypeNameL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.BusinessTypeIdDiff == null || action.result.data.BusinessTypeIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="BusinessTypeNameR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.BusinessTypeIdDiff == null || action.result.data.BusinessTypeIdDiff == true ? 'colorRed' : 'colorBlack');

                        $(Ext.ComponentQuery.query('[itemid="CreditStatusIdL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.CreditStatusIdDiff == null || action.result.data.CreditStatusIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="CreditStatusIdR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.CreditStatusIdDiff == null || action.result.data.CreditStatusIdDiff == true ? 'colorRed' : 'colorBlack');

                        $(Ext.ComponentQuery.query('[itemid="NoOfEmployeesL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.NoOfEmployeesDiff == null || action.result.data.NoOfEmployeesDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="NoOfEmployeesR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.NoOfEmployeesDiff == null || action.result.data.NoOfEmployeesDiff == true ? 'colorRed' : 'colorBlack');

                        $(Ext.ComponentQuery.query('[itemid="NoOfBookingAYearL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.NoOfBookingAYearDiff == null || action.result.data.NoOfBookingAYearDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="NoOfBookingAYearR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.NoOfBookingAYearDiff == null || action.result.data.NoOfBookingAYearDiff == true ? 'colorRed' : 'colorBlack');

                        $(Ext.ComponentQuery.query('[itemid="GroupSizeL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.GroupSizeDiff == null || action.result.data.GroupSizeDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="GroupSizeR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.GroupSizeDiff == null || action.result.data.GroupSizeDiff == true ? 'colorRed' : 'colorBlack');

                        $(Ext.ComponentQuery.query('[itemid="NoOfRoomNightsAYearL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.NoOfRoomNightsAYearDiff == null || action.result.data.NoOfRoomNightsAYearDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="NoOfRoomNightsAYearR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.NoOfRoomNightsAYearDiff == null || action.result.data.NoOfRoomNightsAYearDiff == true ? 'colorRed' : 'colorBlack');

                        $(Ext.ComponentQuery.query('[itemid="LeadStatusNameL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.LeadStatusIdDiff == null || action.result.data.LeadStatusIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="LeadStatusNameR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.LeadStatusIdDiff == null || action.result.data.LeadStatusIdDiff == true ? 'colorRed' : 'colorBlack');
                    } catch (e) { }
                }
            }
        });
    },
    LoadRelationsDetails: function (rec, id2, formNo) {
        Ext.getCmp('MergeRelations' + formNo).getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/company/GetCompanyDetailForMerging',
            params: {
                id: rec, id2: id2, languageId: user_language
            },
            success: function (form, action) {
                if (rec > 0 && id2 > 0 && action.result.data != null) {
                    try {
                        $(Ext.ComponentQuery.query('[itemid="ParentCompanyIdL"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.ParentCompanyIdDiff == null || action.result.data.ParentCompanyIdDiff == true ? 'colorRed' : 'colorBlack');
                        $(Ext.ComponentQuery.query('[itemid="ParentCompanyIdR"]')[0].el.dom).find('.x-form-display-field').addClass(action.result.data.ParentCompanyIdDiff == null || action.result.data.ParentCompanyIdDiff == true ? 'colorRed' : 'colorBlack');
                    } catch (e) { }

                    var primaryParentCmpId = Ext.ComponentQuery.query('[itemid="ParentCompanyIdL"]')[0].value;
                    var secondaryParentCmpId = Ext.ComponentQuery.query('[itemid="ParentCompanyIdR"]')[0].value;
                    Ext.ComponentQuery.query('[itemid="btnParentCompanyR"]')[0].disable();

                    if (primaryParentCmpId != null && primaryParentCmpId != '' && primaryParentCmpId > 0) {
                        Ext.ComponentQuery.query('[itemid="btnParentCompanyR"]')[0].disable();
                    } else if (secondaryParentCmpId != null && secondaryParentCmpId != '' && secondaryParentCmpId > 0) {
                        Ext.ComponentQuery.query('[itemid="btnParentCompanyR"]')[0].enable();
                    }
                }
            }
        });
    },
    fillOverviewForm: function () {
        var addressFormL = Ext.ComponentQuery.query('mergeaddress form[itemid="MergeAddress"]')[0];
        var addressFormR = Ext.ComponentQuery.query('mergeaddress form[id="MergeAddress2"]')[0];
        //--- General Info
        var form = Ext.ComponentQuery.query('mergeoverview form[itemid="generalinfoGroup"]')[0];
        form.getForm().findField('PhoneL').setValue(Ext.ComponentQuery.query('[itemid="Phone1"]')[0].value);
        form.getForm().findField('FaxL').setValue(Ext.ComponentQuery.query('[itemid="Fax1"]')[0].value);
        form.getForm().findField('MarketSegmentL').setValue(Ext.ComponentQuery.query('[itemid="MarketSourceId1"]')[0].value);
        form.getForm().findField('SICCL').setValue(Ext.ComponentQuery.query('[itemid="SicId1"]')[0].value);

        form.getForm().findField('PhoneR').setValue(Ext.ComponentQuery.query('[itemid="Phone2"]')[0].value);
        form.getForm().findField('FaxR').setValue(Ext.ComponentQuery.query('[itemid="Fax2"]')[0].value);
        form.getForm().findField('MarketSegmentR').setValue(Ext.ComponentQuery.query('[itemid="MarketSourceId2"]')[0].value);
        form.getForm().findField('SICCR').setValue(Ext.ComponentQuery.query('[itemid="SicId2"]')[0].value);
        //---------
        //--- Internet Info
        var form = Ext.ComponentQuery.query('mergeoverview form[itemid="InternetInfoGroup"]')[0];
        form.getForm().findField('webaddressL').setValue(Ext.ComponentQuery.query('[itemid="Website1"]')[0].value);
        form.getForm().findField('TwitterL').setValue(Ext.ComponentQuery.query('[itemid="Twitter1"]')[0].value);
        form.getForm().findField('FacebookL').setValue(Ext.ComponentQuery.query('[itemid="Facebook1"]')[0].value);
        form.getForm().findField('LinkedInL').setValue(Ext.ComponentQuery.query('[itemid="LinkedIn1"]')[0].value);

        form.getForm().findField('webaddressR').setValue(Ext.ComponentQuery.query('[itemid="Website2"]')[0].value);
        form.getForm().findField('TwitterR').setValue(Ext.ComponentQuery.query('[itemid="Twitter2"]')[0].value);
        form.getForm().findField('FacebookR').setValue(Ext.ComponentQuery.query('[itemid="Facebook2"]')[0].value);
        form.getForm().findField('LinkedInR').setValue(Ext.ComponentQuery.query('[itemid="LinkedIn2"]')[0].value);
        //---------
        //--- Invoice Address
        var form = Ext.ComponentQuery.query('mergeoverview form[itemid="InvoiceAddressGroup"]')[0];
        form.getForm().findField('AddressInvoiceL').setValue(Ext.ComponentQuery.query('[itemid="InvoiceAddressL"]')[0].value);
        form.getForm().findField('PostalcodeInvoiceL').setValue(Ext.ComponentQuery.query('[itemid="InvoicePostalCodeL"]')[0].value);
        form.getForm().findField('CityInvoiceL').setValue(Ext.ComponentQuery.query('[itemid="InvoiceCityL"]')[0].value);
        form.getForm().findField('CountryInvoiceL').setValue(Ext.ComponentQuery.query('[itemid="InvoiceCountryL"]')[0].value);

        form.getForm().findField('AddressInvoiceR').setValue(Ext.ComponentQuery.query('[itemid="InvoiceAddressR"]')[0].value);
        form.getForm().findField('PostalcodeInvoiceR').setValue(Ext.ComponentQuery.query('[itemid="InvoicePostalCodeR"]')[0].value);
        form.getForm().findField('CityInvoiceR').setValue(Ext.ComponentQuery.query('[itemid="InvoiceCityR"]')[0].value);
        form.getForm().findField('CountryInvoiceR').setValue(Ext.ComponentQuery.query('[itemid="InvoiceCountryR"]')[0].value);
        //---------
        //--- Visiting Address
        var form = Ext.ComponentQuery.query('mergeoverview form[itemid="VisitingAddressGroup"]')[0];
        form.getForm().findField('AddressVistingL').setValue(Ext.ComponentQuery.query('[itemid="VisitingAddressL"]')[0].value);
        form.getForm().findField('PostalcodeVistingL').setValue(Ext.ComponentQuery.query('[itemid="VisitingPostalCodeL"]')[0].value);
        form.getForm().findField('CityVistingL').setValue(Ext.ComponentQuery.query('[itemid="VisitingCityL"]')[0].value);
        form.getForm().findField('CountryVistingL').setValue(Ext.ComponentQuery.query('[itemid="VisitingCountryL"]')[0].value);

        form.getForm().findField('AddressVistingR').setValue(Ext.ComponentQuery.query('[itemid="VisitingAddressR"]')[0].value);
        form.getForm().findField('PostalcodeVistingR').setValue(Ext.ComponentQuery.query('[itemid="VisitingPostalCodeR"]')[0].value);
        form.getForm().findField('CityVistingR').setValue(Ext.ComponentQuery.query('[itemid="VisitingCityR"]')[0].value);
        form.getForm().findField('CountryVistingR').setValue(Ext.ComponentQuery.query('[itemid="VisitingCountryR"]')[0].value);
        //---------
        //--- Postal Address
        var form = Ext.ComponentQuery.query('mergeoverview form[itemid="PostalAddressGroup"]')[0];
        form.getForm().findField('AddressPostalL').setValue(Ext.ComponentQuery.query('[itemid="PostalAddressL"]')[0].value);
        form.getForm().findField('PostalcodePostalL').setValue(Ext.ComponentQuery.query('[itemid="PostalPostalCodeL"]')[0].value);
        form.getForm().findField('CityPostalL').setValue(Ext.ComponentQuery.query('[itemid="PostalCityL"]')[0].value);
        form.getForm().findField('CountryPostalL').setValue(Ext.ComponentQuery.query('[itemid="PostalCountryL"]')[0].value);

        form.getForm().findField('AddressPostalR').setValue(Ext.ComponentQuery.query('[itemid="PostalAddressR"]')[0].value);
        form.getForm().findField('PostalcodePostalR').setValue(Ext.ComponentQuery.query('[itemid="PostalPostalCodeR"]')[0].value);
        form.getForm().findField('CityPostalR').setValue(Ext.ComponentQuery.query('[itemid="PostalCityR"]')[0].value);
        form.getForm().findField('CountryPostalR').setValue(Ext.ComponentQuery.query('[itemid="PostalCountryR"]')[0].value);
        //---------
        //--- Sales Info
        var form = Ext.ComponentQuery.query('mergeoverview form[itemid="SalesGroup"]')[0];
        form.getForm().findField('SalesManageL').setValue(Ext.ComponentQuery.query('[itemid="SalesManagerNameL"]')[0].value);
        form.getForm().findField('SalesManagerAssistantL').setValue(Ext.ComponentQuery.query('[itemid="SalesManagerAssistantNameL"]')[0].value);
        form.getForm().findField('LeadSourceL').setValue(Ext.ComponentQuery.query('[itemid="LeadSourceNameL"]')[0].value);
        form.getForm().findField('CompanyStatusL').setValue(Ext.ComponentQuery.query('[itemid="CompanyStatusName1"]')[0].value);
        form.getForm().findField('QualityRatingL').setValue(Ext.ComponentQuery.query('[itemid="QualityRating1"]')[0].value);
        form.getForm().findField('BusinessTypeL').setValue(Ext.ComponentQuery.query('[itemid="BusinessTypeNameL"]')[0].value);
        form.getForm().findField('CreditStatusL').setValue(Ext.ComponentQuery.query('[itemid="CreditStatusIdL"]')[0].value);
        form.getForm().findField('NumberOfEmployeesL').setValue(Ext.ComponentQuery.query('[itemid="NoOfEmployeesL"]')[0].value);
        form.getForm().findField('BookingsPerYearL').setValue(Ext.ComponentQuery.query('[itemid="NoOfBookingAYearL"]')[0].value);
        form.getForm().findField('GroupSizeL').setValue(Ext.ComponentQuery.query('[itemid="GroupSizeL"]')[0].value);
        form.getForm().findField('RoomnightsPerYearL').setValue(Ext.ComponentQuery.query('[itemid="NoOfRoomNightsAYearL"]')[0].value);
        form.getForm().findField('LeadStatusL').setValue(Ext.ComponentQuery.query('[itemid="LeadStatusNameL"]')[0].value);

        form.getForm().findField('SalesManageR').setValue(Ext.ComponentQuery.query('[itemid="SalesManagerNameR"]')[0].value);
        form.getForm().findField('SalesManagerAssistantR').setValue(Ext.ComponentQuery.query('[itemid="SalesManagerAssistantNameR"]')[0].value);
        form.getForm().findField('LeadSourceR').setValue(Ext.ComponentQuery.query('[itemid="LeadSourceNameR"]')[0].value);
        form.getForm().findField('CompanyStatusR').setValue(Ext.ComponentQuery.query('[itemid="CompanyStatusName2"]')[0].value);
        form.getForm().findField('QualityRatingR').setValue(Ext.ComponentQuery.query('[itemid="QualityRating2"]')[0].value);
        form.getForm().findField('BusinessTypeR').setValue(Ext.ComponentQuery.query('[itemid="BusinessTypeNameR"]')[0].value);
        form.getForm().findField('CreditStatusR').setValue(Ext.ComponentQuery.query('[itemid="CreditStatusIdR"]')[0].value);
        form.getForm().findField('NumberOfEmployeesR').setValue(Ext.ComponentQuery.query('[itemid="NoOfEmployeesR"]')[0].value);
        form.getForm().findField('BookingsPerYearR').setValue(Ext.ComponentQuery.query('[itemid="NoOfBookingAYearR"]')[0].value);
        form.getForm().findField('GroupSizeR').setValue(Ext.ComponentQuery.query('[itemid="GroupSizeR"]')[0].value);
        form.getForm().findField('RoomnightsPerYearR').setValue(Ext.ComponentQuery.query('[itemid="NoOfRoomNightsAYearR"]')[0].value);
        form.getForm().findField('LeadStatusR').setValue(Ext.ComponentQuery.query('[itemid="LeadStatusNameR"]')[0].value);
        //---------
        //--- Parent
        var form = Ext.ComponentQuery.query('mergeoverview form[itemid="ParentGroup"]')[0];
        form.getForm().findField('ParentL').setValue(Ext.ComponentQuery.query('[itemid="ParentCompanyNameL"]')[0].value);
        form.getForm().findField('ParentR').setValue(Ext.ComponentQuery.query('[itemid="ParentCompanyNameR"]')[0].value);
        //---------
        //--- Logo
        var thumbLogo = Ext.ComponentQuery.query('[itemid="LogoValue1"]')[0].value;
        if (thumbLogo != null && thumbLogo.length > 0) {
            var thumbLogoPath = image_path + 'RAP/Asset/Company/' + this.companyId + '/Original/' + thumbLogo;
            var thumbImg = Ext.ComponentQuery.query('[itemid="LogoOverviewL"]')[0];
            thumbImg.setSrc(thumbLogoPath);
            thumbImg.doComponentLayout();
        }
        else {
            var thumbLogoPath = 'public/images/No_Image.png';
            var thumbImg = Ext.ComponentQuery.query('[itemid="LogoOverviewL"]')[0];
            thumbImg.setSrc(thumbLogoPath);
            thumbImg.doComponentLayout();
        }
        //////////////
        var thumbLogo = Ext.ComponentQuery.query('[itemid="LogoValue2"]')[0].value;
        if (thumbLogo != null && thumbLogo.length > 0) {
            var thumbLogoPath = image_path + 'RAP/Asset/Company/' + this.mergeCompanyId + '/Original/' + thumbLogo;
            var thumbImg = Ext.ComponentQuery.query('[itemid="LogoOverviewR"]')[0];
            thumbImg.setSrc(thumbLogoPath);
            thumbImg.doComponentLayout();
        }
        else {
            var thumbLogoPath = 'public/images/No_Image.png';
            var thumbImg = Ext.ComponentQuery.query('[itemid="LogoOverviewR"]')[0];
            thumbImg.setSrc(thumbLogoPath);
            thumbImg.doComponentLayout();
        }
    }
});