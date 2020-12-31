Ext.define('Regardz.controller.configuration.ManageRolesRights', {
    extend: 'Ext.app.Controller',
    views: ['configuration.ManageRolesRights', 'configuration.ManageRoles', 'configuration.RolesList', 'configuration.RightsTree',
            'configuration.RightsPerRole', 'configuration.RoleLang'],

    stores: ['configuration.RolesListStore', 'usermanage.UserPropertyRoleListStore', 'common.LanguageListStore', 'configuration.RightsPerRoleStore', 'configuration.RoleCodeStore'],

    refs: [{
        ref: 'rightstree',
        selector: 'rightstree'
    }, {
        ref: 'rightsperrole',
        selector: 'rightsperrole'
    }],

    init: function () {
        var me = this;
        var varIndividualId = 0;
        this.control({
            'managerolesrights': {
                beforerender: function (panel, eOpts) {
                    me.loadStores();
                },
                resize: function (panel, adjWidth, adjHeight, eOpts) {

                    var gridHeaderHeight = 30;
                    var newHeight = adjHeight - gridHeaderHeight;
                    var rolesView = panel.items.items[0].items.items[0];
                    var rightsView = panel.items.items[0].items.items[1];
                    var rightsPerRoleView = panel.items.items[1];

                    if (rolesView.viewType == 'gridview') {
                        rolesView.setHeight(newHeight / 2);
                    }

                    if (rightsView.viewType == 'treeview') {
                        rightsView.setHeight(newHeight / 2);
                    }

                    if (rightsPerRoleView.viewType == 'treeview') {
                        rightsPerRoleView.setHeight(newHeight);
                    }
                }
            },
            'manageroles': {
                afterrender: function (panel, eOpts) {
                    var roleCombo = Ext.ComponentQuery.query('manageroles combo[itemid=roleCodeCombo]')[0];
                    Ext.getStore('configuration.RoleCodeStore').load({
                        callback: function (response, o, success) {

                            var store = roleCombo.getStore();
                            var index = store.findExact('RoleCodeId', '-1');

                            if (index == -1) {
                                store.insert(0, {
                                    RoleCodeId: -1,
                                    RoleCodeName: 'Select Role Code'.l('SC34100')
                                });
                                // store.sort('BusinessTypeId', 'ASC');
                                store.commitChanges();
                                store.loadData(store.data.items);
                            }

                        }
                    });
                }
            },
            'configroleslist button[action="addRole"]': {
                click: function () {
                    Ext.create('widget.manageroles', { roleId: 0 }).center();
                }
            },
            'configroleslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'editRole')
                        this.editRole(zRec);
                    else if (fieldName == 'deleteRole')
                        this.deleteRole(zRec);
                    else
                        this.loadRightsPerRole(zRec);
                }
            },
            'manageroles button[action="LanguageContent"]': {
                click: function (t, e, eo) {
                    var me = this;
                    var btnCmp = Ext.ComponentQuery.query('[itemid="langButton"]')[0];
                    var RoleId = Ext.getCmp('roleManageForm').getForm().findField('RoleId').getValue();
                    Ext.getStore('common.LanguageListStore').load();
                    var langWin = Ext.create('widget.rolelang', { roleId: RoleId, langRoleId: 0 });
                    langWin.alignTo(btnCmp, "br?", [-5, -5]);
                }
            },
            'manageroles button[action="saveRole"]': {
                click: function () {
                    if (Ext.getCmp('roleManageForm').getForm().isValid()) {
                        var roleId = Ext.getCmp('roleManageForm').getForm().findField('RoleId').getValue();

                        var roleCode = Ext.getCmp('roleManageForm').getForm().findField('roleCode').getValue();
                        if (roleCode == 'Select Role Code'.l('SC34100'))
                            Ext.getCmp('roleManageForm').getForm().findField('roleCode').setValue(null);
                        var url = "";
                        if (roleId == 0) {
                            url = webAPI_path + 'api/RoleRight/AddRole';
                            Ext.getCmp('roleManageForm').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('roleManageForm').getForm().findField('CreatedBy').setValue(CurrentSessionUserId)
                        } else {
                            url = webAPI_path + 'api/RoleRight/UpdateRole';
                            Ext.getCmp('roleManageForm').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            Ext.getCmp('roleManageForm').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId)
                        }
                        Ext.getCmp('roleManageForm').getForm().submit({
                            url: url,
                            type: 'POST',
                            success: function (form, response) {
                                var r = response.result;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close()
                                }
                                if (r.success == true) {
                                    Ext.getStore('configuration.RolesListStore').reload()
                                } else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText)
                                }
                            },
                            failure: function (form, response) {
                                var r = response.result;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close()
                                }
                                if (r.success == false) {
                                    Ext.Msg.alert('Error'.l('g'), ResultText)
                                } else {
                                    Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'))
                                }
                            }
                        })
                    }
                }
            },
            'rolelang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {
                    var roleId = Ext.getCmp('roleManageForm').getForm().findField('RoleId').getValue();
                    Ext.getCmp('roleLang').getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/RoleRight/GetRolesForMultiLingUpdate',
                        params: {
                            id: roleId,
                            languageId: records[0].data.LanguageId
                        }
                    })
                }
            },
            'rolelang button[action="saveRoleLang"]': {
                click: function () {
                    if (Ext.getCmp('roleLang').getForm().isValid()) {
                        Ext.getCmp('roleLang').getForm().submit({
                            url: webAPI_path + 'api/RoleRight/UpdateRoleMultiLangDetail',
                            type: 'POST',
                            success: function (form, response) {
                                var r = response.result;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close()
                                }
                                if (r.success == true) {
                                    Ext.getStore('configuration.RolesListStore').reload();
                                } else {
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            Ext.Msg.alert('Error'.l('g'), ResultText)
                                        }
                                    })
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
                                            Ext.Msg.alert('Error'.l('g'), ResultText)
                                        }
                                    })
                                } else {
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'))
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            },
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
                    //Ext.getStore('usermanage.UserPropertyRoleListStore').load();
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
            'rightstree': {
                afterrender: function (tree, opt) {
                    this.expandTree('rightTreeId');
                }
            },
            'rightsperrole': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'deleteRightsPerRole')
                        this.deleteRightsPerRole(zRec);
                    //                    else
                    //                        this.loadRightsPerRole(zRec);
                }
            },
            'rightsperrole button[action="searchRightsPerRole"]': {
                click: function (comp, opt) {
                    var r = Ext.ComponentQuery.query('[itemid="searchStringRightsPerRole"]')[0].getValue();
                    var regex = new RegExp(".*" + r + ".*", "i");
                    me.filterTree('rightPerRoleTreeId', r);
                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearRightsPerRole"]')[0];
                        clearIcon.show();
                    }
                }
            },
            'rightsperrole button[action="clearRightsPerRole"]': {
                click: function () {
                    var r = Ext.ComponentQuery.query('[itemid="searchStringRightsPerRole"]')[0].setValue('');
                    Ext.getStore('configuration.RightsPerRoleStore').reload();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearRightsPerRole"]')[0];
                    clearIcon.hide();
                }
            },
            'rightsperrole textfield[itemid="searchStringRightsPerRole"]': {
                specialkey: function (f, eventObject) {
                    if (eventObject.getKey() == eventObject.ENTER) {
                        if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                            var r = Ext.ComponentQuery.query('[itemid="searchStringRightsPerRole"]')[0].getValue();
                            var regex = new RegExp(".*" + r + ".*", "i");
                            me.filterTree('rightPerRoleTreeId', r);
                            if (r.length > 0) {
                                var clearIcon = Ext.ComponentQuery.query('[action="clearRightsPerRole"]')[0];
                                clearIcon.show();
                            }
                        }
                    }
                }
            }
        })
    },

    loadStores: function () {
        Ext.getStore('configuration.RolesListStore').proxy.setExtraParam('searchString', '');        
        Ext.getStore('configuration.RolesListStore').load({});

        this.expandTree('rightTreeId');
    },
    loadRightsPerRole: function (rec) {
        Ext.ComponentQuery.query('[itemid="roleNameInTbar"]')[0].setValue(rec.data.RoleName);
        Ext.ComponentQuery.query('[itemid="roleIdInTbar"]')[0].setValue(rec.data.RoleId);
        Ext.ComponentQuery.query('[itemid="searchStringRightsPerRole"]')[0].enable(1);
        Ext.getStore('configuration.RightsPerRoleStore').load({
            params: {
                'languageId': user_language,
                'id': rec.data.RoleId //RoleId
            }
        });

        this.expandTree('rightPerRoleTreeId');
    },
    editRole: function (rec) {
        var edit = Ext.create('widget.manageroles', {
            roleId: rec.data.RoleId
        });
        edit.setTitle('Edit roles');
        Ext.getCmp('roleManageForm').getForm().load({
            method: 'GET',
            url: webAPI_path + 'api/RoleRight/GetRolesForUpdate',
            params: {
                id: rec.data.RoleId,
                languageId: user_language
            },
            success: function (form, action) {

                var r = Ext.decode(action.response.responseText);
                if (r.success == true) {
                    //Ext.getCmp('addRoomTypePrice').getForm().findField('PropertyId').setValue(PropertyId);
                    Ext.getCmp('roleManageForm').getForm().findField('roleCode').setValue(r.data.RoleCode);
                }
            },
            failure: function (err) {

                //  Ext.Msg.alert('Error'.l('g'), 'Information loading error'.l('g'));
            }
        })
    },
    deleteRole: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/RoleRight/DeleteRole',
                    type: "GET",
                    params: {
                        id: rec.data.RoleId
                    },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            //Ext.getStore('configuration.RolesListStore').loadPage(1)
                            var grid = Ext.ComponentQuery.query('[itemid="configroleslistgrid"]')[0];
                            Utils.RefreshGridonDelete(grid, grid.getStore());
                        } else {
                            Ext.Msg.alert('Error'.l('g'), ResultText)
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Record not deleted.'.l('g'))
                    }
                })
            }
        });
    },
    deleteRightsPerRole: function (rec) {
        if (rec.isLeaf()) {
            display_alert("MG00020", '', 'C', function (btn) {
                if (btn === 'yes') {
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/RoleRight/DeleteRightAssociationWithRole',
                        type: "GET",
                        params: {
                            id: rec.raw.RoleId,
                            languageId: rec.raw.ActivityId
                        },
                        success: function (response) {
                            var r = response;
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                Ext.getStore('configuration.RightsPerRoleStore').load({
                                    params: {
                                        'languageId': user_language,
                                        'id': rec.raw.RoleId //RoleId
                                    }
                                });
                            } else {
                                Ext.Msg.alert('Error'.l('g'), ResultText)
                            }
                        },
                        failure: function () {
                            Ext.Msg.alert('Error'.l('g'), 'Record not deleted.'.l('g'))
                        }
                    });
                }
            });
        }
    },
    expandTree: function (TreeId) {
        if (TreeId == 'rightTreeId') {
            this.getRightstree().expandAll();
        }
        else if (TreeId == 'rightPerRoleTreeId') {
            this.getRightsperrole().expandAll();
        }
    },
    filterTree: function (TreeId, aText) {

        if (TreeId == 'rightTreeId') {
            var aTree = this.getRightstree();
        }
        else if (TreeId == 'rightPerRoleTreeId') {
            var aTree = this.getRightsperrole();
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
    }
});