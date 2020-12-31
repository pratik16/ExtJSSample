Ext.define('Regardz.view.configuration.RightsPerRole', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.rightsperrole',
    store: 'configuration.RightsPerRoleStore',
    rootVisible: true,
    itemid: 'rightPerRoleTreeId',
    requires: ['Ext.ux.form.SearchField'],
    initComponent: function () {
        var me = this;

        me.title = 'Rights per Role'.l('SC22100');
        me.layout = 'fit';

        me.viewConfig = {
            plugins: {
                ptype: 'treeviewdragdrop',
                itemid: 'RRPlug',
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
                    console.log(data.records[0].data);
                    console.log(data.records[0].raw);
                    console.log(dropRec);

                    if (dropRec.childNodes == null && dropRec.childNodes.length <= 0) {
                        Ext.Msg.alert('Error'.l('g'), 'Please select Role for add Rights.');
                        return false;
                    }

                    ///Need to revised as validation use IconCls - MM
                    if (data.records[0].raw.iconCls == dropRec.data.iconCls) {
                        Ext.Msg.alert('Error'.l('g'), 'Rights-Code can not add under other Rights-Code');
                        return false;
                    }



                    var rightsList = dropRec.data.children;
                    if (rightsList != null && rightsList.length > 0) {
                        for (var i = 0; i < rightsList.length; i++) {
                            if (data.records[0].data.text == rightsList[i].text) {
                                Ext.Msg.alert('Error'.l('g'), 'Rights already available.');
                                return false;
                            }
                        }
                    }

                    
                    ///Need to revised as validation use IconCls - MM
                    if (data.records[0].data.parentId != 'root') {
                        if (data.records[0].raw.text != dropRec.data.text && (data.records[0].raw.iconCls != "icon-rights" && data.records[0].raw.iconCls != "icon-rights-g")) {
                            Ext.Msg.alert('Error'.l('g'), 'Rights is not belongs to this Rights-Code. Add new rights to top most Root Node');
                            return false;
                        }
                    }
                    else {
                        //console.log('root: ' + data.records[0].data.parentId);
                        var rootList = dropRec.childNodes;
                        //console.log(rootList);
                        if (rootList != null && rootList.length > 0) {
                            for (var i = 0; i < rootList.length; i++) {
                                //alert(data.records[0].data.text + '=' + rootList[i].data.text);
                                if (data.records[0].data.text == rootList[i].data.text) {
                                    Ext.Msg.alert('Error'.l('g'), 'Rights-Code already available.You can add seprate Rights for under this Rights-Code.');
                                    return false;
                                }
                            }
                        }
                    }

                },
                //node, data, overModel, dropPosition, eOpts
                drop: function (node, data, dropRec, dropPosition, eOpts) {
                    Ext.getStore('usermanage.UserPropertyRoleListStore').reload();
                    //console.log(data.records[0].data);                    
                    var rightsIds = '';
                    var roleId = Ext.ComponentQuery.query('[itemid="roleIdInTbar"]')[0].getValue();
                    if (data.records[0].data.parentId == 'root') {
                        var rightsList = data.records[0].data.children; //dropRec.data.children;
                        if (rightsList != null && rightsList.length > 0) {
                            for (var i = 0; i < rightsList.length; i++) {
                                console.log(rightsList[i].ActivityId);
                                rightsIds += rightsList[i].ActivityId + ",";
                            }
                            rightsIds = rightsIds.replace(/\,$/, '');
                        }
                        else {
                            rightsIds = data.records[0].raw.ActivityId;
                        }
                    }
                    else {
                        rightsIds = data.records[0].raw.ActivityId;
                    }

                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/RoleRight/AssightRightsToRole',
                        type: "GET",
                        params: {
                            id: roleId,
                            languageId: rightsIds
                        },
                        success: function (response) {
                            Ext.getStore('configuration.RightsPerRoleStore').load({
                                params: {
                                    'languageId': user_language,
                                    'id': roleId //RoleId
                                }
                            });

                            var r = response;
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {

                            } else {
                                Ext.Msg.alert('Error'.l('g'), ResultText)
                            }
                        },
                        failure: function () {

                            Ext.getStore('configuration.RightsPerRoleStore').load({
                                params: {
                                    'languageId': user_language,
                                    'id': roleId //RoleId
                                }
                            });

                            Ext.Msg.alert('Error'.l('g'), 'Select Role first, Rights is not assign.')
                        }
                    });
                }
            }
        };

        me.tbar = [{
            xtype: 'displayfield',
            itemid: 'roleNameInTbar',
            fieldLabel: 'Selected role',
            labelAlign: 'right',
            labelWidth: 75,
            name: 'role'
        }, {
            xtype: 'hidden',
            itemid: 'roleIdInTbar',
            name: 'RoleId'
        }, '->', {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'textfield',
            itemid: 'searchStringRightsPerRole',
            name: 'searchStringRightsPerRole',
            disabled: true,
            enableKeyEvents: false
        }, {
            xtype: 'button',
            iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
            action: 'clearRightsPerRole',
            hidden: true
        }, {
            xtype: 'button',
            action: 'searchRightsPerRole',
            iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
        }];

        me.columns = [{
            xtype: 'treecolumn', //this is so we know which column will show the tree
            text: 'Name',
            flex: 2,
            sortable: true,
            dataIndex: 'text'
        }, {
            dataIndex: 'text',
            align: 'center',
            width: 25,
            name: 'deleteRightsPerRole',
            renderer: this.deleteRoleIcon
        }, {
            hidden: true,
            dataIndex: 'ActivityId',
            hideable: false
        }];

        me.callParent();

    },
    deleteRoleIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.isLeaf()) {
            var tooltipText = "Delete Role".l('SC34000');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
            metadata.tdCls = 'icon-delete';
        }
    }
});