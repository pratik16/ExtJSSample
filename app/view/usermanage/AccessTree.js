Ext.define('Regardz.view.usermanage.AccessTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.accesstree',
    store: 'usermanage.UserActivityAssociationsStore',
    rootVisible: false,
    itemid: 'accessTreeId',
    expanded: true,
    requires: ['Ext.ux.form.SearchField'],
    disabled: true,

    initComponent: function () {
        var me = this;
        me.title = 'Access'.l('SC22100');
        me.layout = 'fit';
        me.viewConfig = {
            plugins: {
                ptype: 'treeviewdragdrop',
                ddGroup: 'R&R',
                allowParentInserts: false,
                allowParentInsert: false,
                enableDrag: false,
                enableDrop: true,
                appendOnly: true
            },
            listeners: {
                // node, data, overModel, dropPosition, dropFunction, eOpt
                beforedrop: function (node, data, dropRec, dropPosition, dropFunction, eOpt) {
                    var dragItem = data.records[0];
                    console.log(dragItem.data);
                    console.log(dragItem.raw);
                    console.log(dropRec);
                    //Role Validations
                    if (dragItem.raw.leaf == true && dragItem.raw.itemid == "Role-RightId") {
                        Ext.Msg.alert('Error'.l('g'), 'Individual Right of Role cannot be added. Drag whole Role.'.l('SC22100'));
                        return false;
                    } else if (dropRec.data.ActivityId != null && dropRec.data.ActivityId > 0) {
                        Ext.Msg.alert('Error'.l('g'), 'Role / Right cannot be dropped to Activity level.'.l('SC22100'));
                        return false;
                    } else if (dropRec.data.itemid == "GlobalPropertyGroup" && dragItem.raw.itemid == "RoleId") {
                        Ext.Msg.alert('Error'.l('g'), 'Role cannot be dropped to Global Property.'.l('SC22100'));
                        return false;
                    } else if (dragItem.raw.itemid == 'RoleId' && dropRec.data.RoleId > 0) {
                        Ext.Msg.alert('Error'.l('g'), 'Role cannot be dropped to Role, it should be dropped to Property.'.l('SC22100'));
                        return false;
                    } else if (dragItem.raw.itemid == 'RoleId' && dropRec.data.itemid == "IndividualRight") {
                        Ext.Msg.alert('Error'.l('g'), 'Role cannot be dropped to Individual Rights, it should be dropped to Property.'.l('SC22100'));
                        return false;
                    } else if (dragItem.raw.itemid == 'RoleId' && dropRec.data.itemid == "MainProperty") {
                        var childList = dropRec.data.children;
                        if (childList != null && childList.length > 0) {
                            for (var i = 0; i < childList.length; i++) {
                                console.log(data.records[0].data.text + '==' + childList[i].text);
                                if (data.records[0].data.text == childList[i].text) {
                                    Ext.Msg.alert('Error'.l('g'), 'Role / Rights already available.'.l('SC22100'));
                                    return false;
                                }
                            }
                        }
                    }
                    // Rights validations
                    if (dragItem.raw.itemid == "RightsCodeId") {
                        Ext.Msg.alert('Error'.l('g'), 'RightsCode cannot be moved, please drag individual.'.l('SC22100'));
                        return false;
                    } else if (dragItem.raw.itemid == 'RightsId' && dropRec.data.RoleId > 0) {
                        Ext.Msg.alert('Error'.l('g'), 'Right cannot be moved to Role.'.l('SC22100'));
                        return false;
                    }
                    /*end of final validations fo access grid*/
                },
                //node, data, overModel, dropPosition, eOpts
                drop: function (node, data, dropRec, dropPosition, eOpts) {
                    Ext.getStore('usermanage.UserPropertyRoleListStore').reload();
                    Ext.getStore('usermanage.UserRoleListStore').reload();
                    var dragItem = data.records[0];

                    log('dropRec', dropRec);
                    log('dragItem', dragItem);

                    var isAllProp = false;
                    var pID = dropRec.data.PropertyId;
                    if (dropRec.data.itemid == "All_Property") {
                        isAllProp = true;
                        pID = 1000;
                    }


                    log('isAllProp', isAllProp);
                    log('pID', pID);


                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/User/AddRoleRight',
                        type: "GET",
                        params: {
                            propertyId: pID,
                            roleId: dragItem.data.RoleGroupCode == undefined || dragItem.data.RoleGroupCode == null ? 0 : dragItem.data.RoleGroupCode,
                            activityId: dragItem.raw.ActivityId == undefined || dragItem.raw.ActivityId == null ? 0 : dragItem.raw.ActivityId,
                            languageId: user_language,
                            userId: dropRec.data.UserId,
                            currentUserId: CurrentSessionUserId,
                            IsAllProperty: isAllProp
                        },
                        success: function (response) {
                            Ext.getStore('usermanage.UserActivityAssociationsStore').reload();
                            Utils.GetActivitiesListForUser();

                            var r = response;
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                Ext.getStore('usermanage.GlobalActivitiesStore').load({
                                    params: { 'id': dropRec.data.UserId }
                                });
                            } else {
                                Ext.Msg.alert('Error'.l('g'), ResultText)
                            }                            
                        },
                        failure: function () {
                            Ext.getStore('usermanage.UserActivityAssociationsStore').reload();
                            Ext.Msg.alert('Error'.l('g'), 'Select Role first, Rights is not assign.'.l('SC22100'))
                        }
                    });
                }
            }
        };

        me.tbar = ['->', {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'textfield',
            itemid: 'searchStringAccess',
            name: 'searchStringAccess',
            enableKeyEvents: false
        }, {
            xtype: 'button',
            iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
            action: 'clearAccess',
            hidden: true
        }, {
            xtype: 'button',
            action: 'searchAccess',
            iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
        }];

        me.columns = [{
            xtype: 'treecolumn',
            flex: 1,
            sortable: true,
            dataIndex: 'text'
        }, {
            dataIndex: 'text',
            align: 'center',
            width: 25,
            name: 'deleteAccess',
            renderer: this.deleteIcon
        }, {
            hidden: true,
            dataIndex: 'ActivityId',
            hideable: false
        }];

        me.callParent(arguments);
    },
    deleteIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        var itemid = record.data.itemid;
        if (itemid == 'GlobalPropertyItem' || itemid == 'IndividualRightId' || itemid == 'RoleId') {
            var tooltipText = "Delete".l('g');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
            metadata.tdCls = 'icon-delete';
        }
    }
});