Ext.define('Regardz.controller.usermanage.User', {
    extend: 'Ext.app.Controller',
    views: ['usermanage.UserRegistration', 'usermanage.Userlist', 'usermanage.UserOverview', 'usermanage.RolesList', 'usermanage.RolesTree',
            'usermanage.UserEdit', 'common.CheckboxRow', 'configuration.RightsTree', 'usermanage.AccessTree', 'usermanage.GlobalActivitiesList', 'usermanage.ChangePasswordWin'],
    stores: ['usermanage.UserlistStore', 'usermanage.AddPropertyForUserStore', 'common.PropertyForNamesStore', 'usermanage.RolesListStore', 'usermanage.ActivitiesOnRoleStore',
            'configuration.DesignationManageStore', 'configuration.DepartmentStore', 'usermanage.PropertyStore', 'common.LanguageListStore',
            'usermanage.UserPropertyRoleListStore', 'usermanage.UserRoleListStore', 'usermanage.UserActivityAssociationsStore', 'usermanage.GlobalActivitiesStore',
            'configuration.SubDepartmentAllStore', 'configuration.DesignationBySubDepartmentStore'],
    manageActivityContoller: false,

    refs: [{
        ref: 'Userlist',
        selector: 'userlist'
    }, {
        ref: 'UserPropertylist',
        selector: '[itemid=UserPropertylist]'
    }, {
        ref: 'rightstree',
        selector: 'rightstree'
    }, {
        ref: 'rolestree',
        selector: 'rolestree'
    }, {
        ref: 'accesstree',
        selector: 'accesstree'
    }, {
        ref: 'useredit',
        selector: 'useredit'
    }],

    init: function () {
        var me = this;
        me.OpenEditWindow = false;

        this.control({
            //User registration grid
            'userlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName;
                    if (typeof iView.getGridColumns()[iColIdx] == 'undefined')
                        return true;

                    fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'EditUser') {
                        me.OpenEditWindow = true;
                        this.EditUserWindow(zRec);
                    }
                    else if (fieldName == 'DeleteUser')
                        this.DeleteUser(zRec);
                },
                afterrender: function (t, eOpt) {
                    //t.getStore().reload();
                    Ext.getStore('usermanage.UserlistStore').removeAll();
                    Ext.getStore('usermanage.UserlistStore').proxy.setExtraParam('propertyId', -1);
                    Ext.getStore('usermanage.UserlistStore').proxy.setExtraParam('isVerified', false);
                    Ext.getStore('usermanage.UserlistStore').proxy.setExtraParam('searchString', '');
                    Ext.getStore('usermanage.UserlistStore').load();
                    Ext.getStore('usermanage.PropertyStore').load({
                        params: { 'id': 0, 'languageId': user_language, 'searchString': '' },
                        callback: function (response, o, success) {
                            if (response != null && response.length > 0) {
                                var propertyCombo = Ext.ComponentQuery.query('[itemid="comboPropertyList"]')[0];
                                if (propertyCombo != null)
                                    propertyCombo.setValue(0);
                            }
                        }
                    });
                }
            },
            'combo[action="DesignationChange"]': {
                select: function (combo, records, Opts) {
                    
                    var userid = Ext.ComponentQuery.query('[itemid="UserIdEdit"]')[0].getValue();

                    Ext.getStore('usermanage.UserRoleListStore').load({
                        params: { 'languageId': user_language, 'id': userid, 'id2': combo.getValue() }
                    });

                    if (userid != null && userid > 0) {
                        var propertyIds = '';
                        var isAllProp = 0;
                        var Propertylist = me.getUserPropertylist().store.data;
                        if (Propertylist != null && Propertylist.length > 0) {
                            for (var i = 0; i < Propertylist.length; i++) {
                                if (Propertylist.items[0].data.Checked == true) {
                                    //propertyIds += (i > 0 ? Propertylist.items[i].data.PropertyId + "," : '');
                                    isAllProp = 1;
                                }
                                if (Propertylist.items[i].data.Checked == true) {
                                    if (Propertylist.items[i].data.PropertyId != 0)
                                        propertyIds += Propertylist.items[i].data.PropertyId + ",";
                                }
                            }
                        }
                        propertyIds = propertyIds.replace(/\,$/, '');

                        Ext.data.JsonP.request({
                            url: webAPI_path + 'api/User/UpdateUserDesignation',
                            type: "GET",
                            params: {
                                userId: userid,
                                desigId: combo.getValue(),
                                propertyIds: propertyIds,
                                IsAllProperty: isAllProp,
                                currentUserId: CurrentSessionUserId
                            },
                            success: function (response) {
                                var r = response;
                                if (r.success == true) {

                                    Ext.getStore('usermanage.UserActivityAssociationsStore').load({
                                        params: { 'userId': userid, 'desgId': combo.getValue(), 'propertyIds': propertyIds, 'languageId': user_language, 'isAllproperty': isAllProp }
                                    });
                                }
                                else
                                    Ext.Msg.alert('Error'.l('g'), r.result);
                            },
                            failure: function () {
                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                            }
                        });


                    }
                }
            },
            'combo[action="comboPropertyList"]': {
                select: function (combo, records, Opts) {
                    var comboValue = combo.getValue();
                    if (comboValue == 0)
                        comboValue = -1
                    Ext.getStore('usermanage.UserlistStore').removeAll();
                    Ext.getStore('usermanage.UserlistStore').proxy.setExtraParam('propertyId', comboValue);
                    Ext.getStore('usermanage.UserlistStore').proxy.setExtraParam('searchString', '');
                    Ext.getStore('usermanage.UserlistStore').proxy.setExtraParam('isVerified', false);
                    Ext.getStore('usermanage.UserlistStore').load();
                }
            },
            'checkboxrow[itemid="PropertyCheckbox"]': {
                checkchange: function (column, rowIndex, checked) {
                    if (newVal == true) {
                        me.GetSelectedPropertyIds();
                    }
                }
            },
            'useredit combo[name="SubDepartmentId"]': {
                select: function (combo, records, Opts) {

                    var c = Ext.ComponentQuery.query('useredit [name="DesignationId"]')[0]
                    var v = combo.getValue();
                    c.setValue(null);
                    c.getStore().proxy.setExtraParam('id', v);
                    c.getStore().load();
                    
                }
            },
            'useredit grid[itemid="UserPropertylist"]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    var isAllProp = 0;
                    if (fieldName == 'PropertyChecked') {

                        //                        var userid = Ext.ComponentQuery.query('[itemid="UserIdEdit"]')[0].getValue();
                        //                        var desgid = Ext.ComponentQuery.query('[itemid="DesignationCombo"]')[0].getValue();
                        //                        var propertyIds = '';
                        //                        var Propertylist = me.getUserPropertylist().store.data;
                        //                        if (Propertylist.items[iRowIdx].data.Checked == true) Propertylist.items[iRowIdx].data.Checked = false; else Propertylist.items[iRowIdx].data.Checked = true;
                        //                        if (Propertylist != null && Propertylist.length > 0) {
                        //                            for (var i = 0; i < Propertylist.length; i++) {
                        //                                if (Propertylist.items[0].data.Checked == true) {
                        //                                    //propertyIds += (i > 0 ? Propertylist.items[i].data.PropertyId + "," : '');
                        //                                    isAllProp = 1;
                        //                                }
                        //                                if (Propertylist.items[i].data.Checked == true) {
                        //                                    if (Propertylist.items[i].data.PropertyId != 0)
                        //                                        propertyIds += Propertylist.items[i].data.PropertyId + ",";
                        //                                }
                        //                            }
                        //                        }
                        //                        propertyIds = propertyIds.replace(/\,$/, '');
                        //                        if (userid != null && userid > 0) {
                        //                            Ext.getStore('usermanage.UserActivityAssociationsStore').load({
                        //                                params: { 'userId': userid, 'desgId': desgid, 'propertyIds': propertyIds, 'languageId': user_language, 'isAllproperty': isAllProp }
                        //                            });
                        //                        }
                    }
                },
                checkchange: function (column, rowIndex, checked, eOpts) {


                }
            },
            'accesstree': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'deleteAccess')
                        this.deleteAccess(zRec);
                }
            },
            //User Overview grid
            'roleslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName;
                    if (typeof iView.getGridColumns()[iColIdx] == 'undefined')
                        return true;

                    fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'EditUser') {
                        me.OpenEditWindow = true;
                        this.EditUserWindow(zRec);
                    }
                    else if (fieldName == 'DeleteUser')
                        this.DeleteUser(zRec);
                },
                afterrender: function (t, eOpt) {
                    Ext.getStore('usermanage.UserlistStore').removeAll();
                    Ext.getStore('usermanage.UserlistStore').proxy.setExtraParam('propertyId', -1);
                    Ext.getStore('usermanage.UserlistStore').proxy.setExtraParam('searchString', '');
                    Ext.getStore('usermanage.UserlistStore').proxy.setExtraParam('isVerified', true);
                    //Ext.getStore('usermanage.UserlistStore').load();
                }
            },
            'changepasswordwin button[action="ChangeUserPassword"]': {
                click: function () {
                    var obj = new Object();
                    obj.UserId = CurrentSessionUserId;
                    obj.PasswordOld = Ext.ComponentQuery.query('changepasswordwin [itemid="oldPassword"]')[0].value;
                    obj.PasswordNew = Ext.ComponentQuery.query('changepasswordwin [itemid="newPassword"]')[0].value;
                    var cPassword = Ext.ComponentQuery.query('changepasswordwin [itemid="confirmPassword"]')[0].value;

                    if (obj.PasswordNew != cPassword) {
                        Ext.Msg.alert('Error'.l('g'), "New passwords do not match!".l('SC_ChangePassword'));
                        return;
                    }

                    var saveUserURL = webAPI_path + "api/user/UpdatePassword";
                    Ext.ComponentQuery.query('changepasswordwin [itemid="frmChangePassword"]')[0].getForm().submit({
                        url: saveUserURL,
                        type: 'POST',
                        params: obj,
                        success: function (form, response) {
                            var r = response.response.responseText;
                            var r = Ext.decode(r);
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                var win = Ext.WindowManager.getActive();
                                if (win) win.close();
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function (form, response) {
                            r = response.result;
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
                    });
                }
            },
            //Property
            'button[action="searchProperty"]': {
                click: function () {
                    var r = Ext.ComponentQuery.query('[itemid="searchStringUser"]')[0].getValue();
                    Ext.getStore('company.PropertyStore').clearFilter();
                    var regex = new RegExp(".*" + r + ".*", "i");
                    Ext.getStore('company.PropertyStore').filter("PropertyName", regex, true, true);

                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearPotentialProperty"]')[0];
                        clearIcon.show();
                    }
                }
            },
            'button[action="clearProperty"]': {
                click: function () {
                    Ext.ComponentQuery.query('[itemid="searchStringUser"]')[0].setValue('');
                    Ext.getStore('company.PropertyStore').clearFilter();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearPotentialProperty"]')[0];
                    clearIcon.hide();
                }
            },
            //UpdateAccessTree
            'button[action="UpdateAccessTree"]': {
                click: function () {
                    var userid = Ext.ComponentQuery.query('[itemid="UserIdEdit"]')[0].getValue();
                    var isAllProp = 0;
                    if (userid != null && userid > 0) {
                        var desgid = Ext.ComponentQuery.query('[itemid="DesignationCombo"]')[0].getValue();
                        var propertyIds = '';
                        var Propertylist = me.getUserPropertylist().store.data;
                        if (Propertylist != null && Propertylist.length > 0) {
                            for (var i = 0; i < Propertylist.length; i++) {
                                if (Propertylist.items[0].data.Checked == true) {
                                    //propertyIds += (i > 0 ? Propertylist.items[i].data.PropertyId + "," : '');
                                    isAllProp = 1;
                                }
                                if (Propertylist.items[i].data.Checked == true) {
                                    if (Propertylist.items[i].data.PropertyId != 0)
                                        propertyIds += Propertylist.items[i].data.PropertyId + ",";
                                }
                            }
                        }
                        propertyIds = propertyIds.replace(/\,$/, '');

                        Ext.getStore('usermanage.UserActivityAssociationsStore').load({
                            params: { 'userId': userid, 'desgId': desgid, 'propertyIds': propertyIds, 'languageId': user_language, 'isAllproperty': isAllProp }
                        });
                    }
                }
            },
            //Rights tree
            'rightstree button[action="searchRights"]': {
                click: function (comp, opt) {
                    var r = Ext.ComponentQuery.query('[itemid="searchStringRights"]')[0].getValue();
                    var regex = new RegExp(".*" + r + ".*", "i");
                    me.filterTree('rightTreeId', r);
                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearRights"]')[0];
                        clearIcon.show();
                    }
                }
            },
            'rightstree button[action="clearRights"]': {
                click: function () {
                    var r = Ext.ComponentQuery.query('[itemid="searchStringRights"]')[0].setValue('');
                    Ext.getStore('usermanage.UserPropertyRoleListStore').reload();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearRights"]')[0];
                    clearIcon.hide();
                }
            },
            'rightstree textfield[itemid="searchStringRights"]': {
                specialkey: function (f, eventObject) {
                    if (eventObject.getKey() == eventObject.ENTER) {
                        if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                            var r = Ext.ComponentQuery.query('[itemid="searchStringRights"]')[0].getValue();
                            var regex = new RegExp(".*" + r + ".*", "i");
                            me.filterTree('rightTreeId', r);
                            if (r.length > 0) {
                                var clearIcon = Ext.ComponentQuery.query('[action="clearRights"]')[0];
                                clearIcon.show();
                            }
                        }
                    }
                }
            },
            //Roles tree
            'rolestree button[action="searchRoles"]': {
                click: function (comp, opt) {
                    var r = Ext.ComponentQuery.query('[itemid="searchStringRoles"]')[0].getValue();
                    var regex = new RegExp(".*" + r + ".*", "i");
                    me.filterTree('roleTreeId', r);
                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearRoles"]')[0];
                        clearIcon.show();
                    }
                }
            },
            'rolestree button[action="clearRoles"]': {
                click: function () {
                    var r = Ext.ComponentQuery.query('[itemid="searchStringRoles"]')[0].setValue('');

                    Ext.getStore('usermanage.UserRoleListStore').reload();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearRoles"]')[0];
                    clearIcon.hide();
                }
            },
            'rolestree textfield[itemid="searchStringRoles"]': {
                specialkey: function (f, eventObject) {
                    if (eventObject.getKey() == eventObject.ENTER) {
                        if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                            var r = Ext.ComponentQuery.query('[itemid="searchStringRoles"]')[0].getValue();
                            var regex = new RegExp(".*" + r + ".*", "i");
                            me.filterTree('roleTreeId', r);
                            if (r.length > 0) {
                                var clearIcon = Ext.ComponentQuery.query('[action="clearRoles"]')[0];
                                clearIcon.show();
                            }
                        }
                    }
                }
            },
            //Access tree
            'accesstree button[action="searchAccess"]': {
                click: function (comp, opt) {
                    var r = Ext.ComponentQuery.query('[itemid="searchStringAccess"]')[0].getValue();
                    var regex = new RegExp(".*" + r + ".*", "i");
                    me.filterTree('accessTreeId', r);
                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearAccess"]')[0];
                        clearIcon.show();
                    }
                }
            },
            'accesstree button[action="clearAccess"]': {
                click: function () {
                    var r = Ext.ComponentQuery.query('[itemid="searchStringAccess"]')[0].setValue('');

                    Ext.getStore('usermanage.UserActivityAssociationsStore').reload();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearAccess"]')[0];
                    clearIcon.hide();
                }
            },
            'accesstree textfield[itemid="searchStringAccess"]': {
                specialkey: function (f, eventObject) {
                    if (eventObject.getKey() == eventObject.ENTER) {
                        if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                            var r = Ext.ComponentQuery.query('[itemid="searchStringAccess"]')[0].getValue();
                            var regex = new RegExp(".*" + r + ".*", "i");
                            me.filterTree('accessTreeId', r);
                            if (r.length > 0) {
                                var clearIcon = Ext.ComponentQuery.query('[action="clearAccess"]')[0];
                                clearIcon.show();
                            }
                        }
                    }
                }
            },
            //Save user
            'useredit button[action="saveUser"]': {
                click: function (t, e, eo) {
                    var userid = Ext.ComponentQuery.query('[itemid="usermanageform"]')[0].getForm().findField('UserId').getValue();
                    if (Ext.ComponentQuery.query('[itemid="usermanageform"]')[0].getForm().isValid()) {
                        var saveUserURL = webAPI_path + "api/user/ManageUser";
                        var addUsrForm = Ext.ComponentQuery.query('[itemid="usermanageform"]')[0].getForm().getValues();
                        addUsrForm.Phone = CurrentSessionUserId;

                        var propertyIds = '';
                        var isAllProp = 0;
                        var Propertylist = me.getUserPropertylist().store.data;
                        if (Propertylist != null && Propertylist.length > 0) {
                            for (var i = 0; i < Propertylist.length; i++) {
                                if (Propertylist.items[0].data.Checked == true) {
                                    //propertyIds += (i > 0 ? Propertylist.items[i].data.PropertyId + "," : '');
                                    isAllProp = 1;
                                }
                                if (Propertylist.items[i].data.Checked == true) {
                                    if (Propertylist.items[i].data.PropertyId != 0)
                                        propertyIds += Propertylist.items[i].data.PropertyId + ",";
                                }
                            }
                        }
                        addUsrForm.PropertyIds = propertyIds.replace(/\,$/, '');

                        if ((addUsrForm.PropertyIds == null || addUsrForm.PropertyIds == '') && isAllProp == 0) {
                            Ext.Msg.alert('Error'.l('g'), "Please select any property.".l("SC32210"));
                            return;
                        }

                        if (isAllProp == 1) {
                            Ext.ComponentQuery.query('[itemid="usermanageform"]')[0].getForm().findField("isAllProp").setValue(true)
                        }
                        else {
                            Ext.ComponentQuery.query('[itemid="usermanageform"]')[0].getForm().findField("isAllProp").setValue(false)
                        }

                        var userEditpanel = Ext.ComponentQuery.query('useredit panel[itemid="usereditPanel"]')[0];

                        userEditpanel.setLoading(true, true);

                        Ext.ComponentQuery.query('[itemid="usermanageform"]')[0].getForm().submit({
                            url: saveUserURL,
                            type: 'POST',
                            params: addUsrForm,
                            success: function (form, response) {
                                var r = response.response.responseText;
                                var r = Ext.decode(r);
                                var ResultText = r.result;
                                //if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                //   ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == true) {
                                    Ext.ComponentQuery.query('[itemid="accessTreeId"]')[0].enable();
                                    Ext.ComponentQuery.query('form[itemid="usermanageform"]')[0].getForm().load({
                                        method: 'GET',
                                        url: webAPI_path + 'api/User/GetUserByUserId',
                                        params: { id: r.result[0] },
                                        success: function (form, action) {
                                            Ext.getStore('configuration.DepartmentStore').load();

                                            Ext.getStore('usermanage.UserRoleListStore').load({
                                                params: {
                                                    'languageId': user_language,
                                                    'id': action.result.data.UserId,
                                                    'id2': action.result.data.DesignationId
                                                }
                                            });

                                            Ext.getStore('usermanage.UserActivityAssociationsStore').load({
                                                params: {
                                                    'userId': action.result.data.UserId,
                                                    'desgId': action.result.data.DesignationId,
                                                    'propertyIds': addUsrForm.PropertyIds,
                                                    'languageId': user_language,
                                                    'isAllproperty': isAllProp
                                                }
                                            });
                                        }
                                    });
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                                userEditpanel.setLoading(false);
                            },
                            failure: function (form, response) {
                                r = response.result;
                                var ResultText = r.result;
                                //if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                //   ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == false) {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                }
                                userEditpanel.setLoading(false);
                            }
                        })
                    }
                }
            },
            //saveCloseUser user
            'useredit button[action="saveCloseUser"]': {
                click: function (t, e, eo) {
                    var userid = Ext.ComponentQuery.query('[itemid="usermanageform"]')[0].getForm().findField('UserId').getValue();
                    if (Ext.ComponentQuery.query('[itemid="usermanageform"]')[0].getForm().isValid()) {
                        var saveUserURL = webAPI_path + "api/user/ManageUser";
                        var addUsrForm = Ext.ComponentQuery.query('[itemid="usermanageform"]')[0].getForm().getValues();
                        addUsrForm.Phone = CurrentSessionUserId;

                        var propertyIds = '';
                        var isAllProp = 0;
                        var Propertylist = me.getUserPropertylist().store.data;
                        if (Propertylist != null && Propertylist.length > 0) {
                            for (var i = 0; i < Propertylist.length; i++) {
                                if (Propertylist.items[0].data.Checked == true) {
                                    //propertyIds += (i > 0 ? Propertylist.items[i].data.PropertyId + "," : '');
                                    isAllProp = 1;
                                }
                                if (Propertylist.items[i].data.Checked == true) {
                                    if (Propertylist.items[i].data.PropertyId != 0)
                                        propertyIds += Propertylist.items[i].data.PropertyId + ",";
                                }
                            }
                        }
                        addUsrForm.PropertyIds = propertyIds.replace(/\,$/, '');

                        if ((addUsrForm.PropertyIds == null || addUsrForm.PropertyIds == '') && isAllProp == 0) {
                            Ext.Msg.alert('Error'.l('g'), "Please select any property.".l("SC32210"));
                            return;
                        }

                        if (isAllProp == 1) {
                            Ext.ComponentQuery.query('[itemid="usermanageform"]')[0].getForm().findField("isAllProp").setValue(true)
                        }
                        else {
                            Ext.ComponentQuery.query('[itemid="usermanageform"]')[0].getForm().findField("isAllProp").setValue(false)
                        }

                        Ext.ComponentQuery.query('[itemid="usermanageform"]')[0].getForm().submit({
                            url: saveUserURL,
                            type: 'POST',
                            params: addUsrForm,
                            success: function (form, response) {
                                var r = response.response.responseText;
                                var r = Ext.decode(r);
                                var ResultText = r.result;
                                //if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                //    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == true) {
                                    me.getUseredit().close();
                                    Ext.getStore('usermanage.UserlistStore').reload();
                                }
                                else {
                                    Ext.Msg.alert('Error', l('g'), ResultText);
                                }
                            },
                            failure: function (form, response) {
                                r = response.result;
                                var ResultText = r.result;
                                // if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                //   ResultText = ResultText.l("SP_DynamicCode");
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
            //Open add user window
            'roleslist button[action="add_User"]': {
                click: function () {
                    me.OpenEditWindow = true;
                    Ext.create('widget.useredit', { UserId: 0 }).show();
                    Ext.getStore('configuration.DepartmentStore').load();
                    //                    Ext.getStore('usermanage.GlobalActivitiesStore').load({
                    //                        params: { 'id': 0 }
                    //                    });
                    //                    Ext.getStore('usermanage.PropertyStore').load({
                    //                        params: { 'id': 0, 'languageId': user_language, 'searchString': '' }
                    //                    });

                    //                    Ext.getStore('usermanage.UserRoleListStore').load({
                    //                        params: { 'languageId': user_language, 'id': 0, 'id2': 0 }
                    //                    });
                    //                    Ext.getStore('usermanage.UserActivityAssociationsStore').load({
                    //                        params: { 'userId': 0, 'desgId': 0, 'propertyIds': '', 'languageId': user_language, 'isAllproperty': 0 }
                    //                    });
                }
            },
            'useredit': {
                afterrender: function (t, eOpt) {
                    if (me.OpenEditWindow && t.UserId > 0) {
                        Ext.getStore('usermanage.GlobalActivitiesStore').load({
                            params: { 'id': t.UserId }
                        });
                        Ext.getStore('usermanage.PropertyStore').load({
                            params: {
                                'id': t.UserId,
                                'languageId': user_language,
                                'searchString': ''
                            }
                        });
                        Ext.ComponentQuery.query('[itemid="accessTreeId"]')[0].enable();

                        Ext.ComponentQuery.query('form[itemid="usermanageform"]')[0].getForm().load({
                            method: 'GET',
                            url: webAPI_path + 'api/User/GetUserByUserId',
                            params: {
                                id: t.UserId
                            },
                            success: function (form, action) {
                                // Ext.getStore('configuration.SubDepartmentAllStore').load();
                                var subdeptStore = Ext.ComponentQuery.query('useredit [name="SubDepartmentId"]')[0];
                                subdeptStore.getStore().load({
                                    callback: function (response, o, success) {
                                        subdeptStore.setValue(action.result.data.SubDepartmentId);
                                    }
                                });

                                var designStore = Ext.ComponentQuery.query('useredit [name="DesignationId"]')[0];
                                designStore.getStore().load({
                                    params: {
                                        'id': action.result.data.SubDepartmentId
                                    },
                                    callback: function (response, o, success) {
                                        designStore.setValue(action.result.data.DesignationId);
                                    }
                                });

                                Ext.getStore('usermanage.UserRoleListStore').load({
                                    params: {
                                        'languageId': user_language,
                                        'id': action.result.data.UserId,
                                        'id2': action.result.data.DesignationId
                                    }
                                });
                                var propertyIds = '';
                                var isAllProp = 0;
                                var Propertylist = Ext.ComponentQuery.query('[itemid="UserPropertylist"]')[0].store.data;
                                if (Propertylist != null && Propertylist.length > 0) {
                                    for (var i = 0; i < Propertylist.length; i++) {
                                        if (Propertylist.items[0].data.Checked == true) {
                                            //propertyIds += (i > 0 ? Propertylist.items[i].data.PropertyId + "," : '');
                                            isAllProp = 1;
                                        }
                                        if (Propertylist.items[i].data.Checked == true) {
                                            if (Propertylist.items[i].data.PropertyId != 0)
                                                propertyIds += Propertylist.items[i].data.PropertyId + ",";
                                        }
                                    }
                                }
                                propertyIds = propertyIds.replace(/\,$/, '');

                                Ext.getStore('usermanage.UserActivityAssociationsStore').load({
                                    params: {
                                        'userId': action.result.data.UserId,
                                        'desgId': action.result.data.DesignationId,
                                        'propertyIds': propertyIds,
                                        'languageId': user_language,
                                        'isAllproperty': isAllProp
                                    }
                                });
                            }
                        });
                    }
                    else {/*Add time form*/

                        //Ext.getStore('configuration.DepartmentStore').load();

                        Ext.getStore('configuration.SubDepartmentAllStore').load();
                        Ext.getStore('usermanage.GlobalActivitiesStore').load({
                            params: { 'id': t.UserId }
                        });
                        Ext.getStore('usermanage.PropertyStore').load({
                            params: { 'id': 0, 'languageId': user_language, 'searchString': '' }
                        });
                        Ext.getStore('usermanage.UserRoleListStore').load({
                            params: { 'languageId': user_language, 'id': 0, 'id2': 0 }
                        });

                        Ext.getStore('usermanage.UserActivityAssociationsStore').load({
                            params: { 'userId': -1, 'desgId': -1, 'propertyIds': '', 'languageId': user_language, 'isAllproperty': 0 }
                        });
                    }
                }
            }
        })
    },
    EditUserWindow: function (rec) {
        if (rec != null) {
            if (Ext.getCmp('usermanageform')) {
                Ext.getCmp('usermanageform').destroy();
            }
            Ext.create('widget.useredit', { UserId: rec.data.UserId }).show();
        }
    },
    DeleteUser: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/User/DeleteUser',
                    type: "GET",
                    params: { id: rec.data.UserId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            //Ext.getStore('usermanage.UserlistStore').loadPage(1);
                            var grid = Ext.ComponentQuery.query('[itemid="adminuserlistgrid"]')[0];
                            if (grid == undefined || grid == null)
                                grid = Ext.ComponentQuery.query('[itemid="roleslist"]')[0];
                            Utils.RefreshGridonDelete(grid, grid.getStore());
                        }
                        else
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Record not deleted.'.l('g'));
                    }
                });
            }
        });
    },
    filterTree: function (TreeId, aText) {
        if (TreeId == 'rightTreeId') {
            var aTree = this.getRightstree();
        } else if (TreeId == 'roleTreeId') {
            var aTree = this.getRolestree();
        } else if (TreeId == 'accessTreeId') {
            var aTree = this.getAccesstree();
        }

        if (!aText) {
            return;
        }
        // Regular expression to find a word in a text
        //var lRegExp = new RegExp(Ext.escapeRe(aText), 'i');
        var lRegExp = new RegExp(".*" + aText + ".*", "i");
        // Recursive function to search inside the tree
        var lRecursiveFindChildren = function (aInputTree) {
            if (aInputTree.isLeaf()) {
                return lRegExp.test(aInputTree.data.text);
                // Remove this condition if you only want to search in the leafs
            } else if (lRegExp.test(aInputTree.data.text)) {
                return true;
            } else {
                var lChildren = aInputTree.childNodes;
                var lLength = lChildren.length - 1;
                var lMatch = null;
                var lCMatch = false;
                for (var i = lLength; i >= 0; i--) {
                    // Calling again the function to find if children match
                    lMatch = lRecursiveFindChildren(lChildren[i]);
                    if (!lMatch && lMatch != undefined) {
                        lChildren[i].remove();
                    } else {
                        lChildren[i].expand();
                        lCMatch = true;
                    }
                }
                return lCMatch;
            }
        }
        lRecursiveFindChildren(aTree.getRootNode());
    },
    deleteAccess: function (rec) {
        var itemid = rec.data.itemid;
        if (itemid == 'GlobalPropertyItem' || itemid == 'IndividualRightId' || itemid == 'RoleId') {
            display_alert("MG00020", '', 'C', function (btn) {
                if (btn === 'yes') {
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/User/DeleteRoleRight',
                        type: "GET",
                        params: {
                            propertyId: rec.data.PropertyId,
                            roleId: rec.data.RoleId == null ? 0 : rec.data.RoleId,
                            activityId: rec.data.ActivityId == null ? 0 : rec.data.ActivityId,
                            languageId: user_language,
                            userId: rec.data.UserId,
                            isGlobal: rec.data.IsGlobal
                        },
                        success: function (response) {
                            var r = response;
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                Ext.getStore('usermanage.GlobalActivitiesStore').load({
                                    params: { 'id': rec.data.UserId }
                                });
                            } else {
                                Ext.Msg.alert('Error'.l('g'), ResultText)
                            }
                            Ext.getStore('usermanage.UserActivityAssociationsStore').reload();
                            Utils.GetActivitiesListForUser();
                        },
                        failure: function () {
                            Ext.getStore('usermanage.UserActivityAssociationsStore').reload();
                            Utils.GetActivitiesListForUser();
                            Ext.Msg.alert('Error'.l('g'), 'Record not deleted.'.l('g'))
                        }
                    })
                }
            });
        }
    },
    testmethod: function () {
        alert('successs');
    }
});