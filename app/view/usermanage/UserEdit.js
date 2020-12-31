Ext.require([
    'Ext.selection.CellModel',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.form.*',
    'Ext.ux.CheckColumn'
]);

Ext.define('Regardz.view.usermanage.UserEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.useredit',
    modal: true,
    width: parseInt(Ext.getBody().getViewSize().width * (0.95)),
    //y: 0,
    //height: 650,
    border: false,
    title: "User Edit_Title".l('SC32210'),
    autoShow: false,
    autoScroll: true,
    id: 'usermanageform',

    initComponent: function () {
        var me = this;
        //me.windowHeight = 650;

        if (Ext.getCmp('usermanageform')) {
            Ext.getCmp('usermanageform').destroy();
        }

        me.UserPropertylist = {
            xtype: 'grid',
            title: 'Properties'.l('SC32210'),
            store: Ext.getStore('usermanage.PropertyStore'),
            itemid: 'UserPropertylist',
            cls: 'gridwhitebackground',
            height: 225,
            noResize: true,
            width: '100%',
            frame: false,
            autoScroll: true,
            columns: [{
                flex: 1,
                header: 'PropertyName'.l('SC32210'),
                dataIndex: 'PropertyName'
                //            }, {
                //                width: 30,
                //                dataIndex: 'Checked',
                //                itemid: 'PropertyChecked',
                //                action: 'PropertyChecked',
                //                xtype: 'checkcolumn'//,
                //                //                listeners: {
                //                //                    checkchange: function (column, rowIndex, checked) {
                //                //                        //code for whatever on checkchange here
                //                //                        debugger;
                //                //                    }
                //                //                }
                //            }],
            }, { dataIndex: 'Checked', name: 'PropertyChecked', itemid: 'PropertyChecked', action: 'PropertyChecked', renderer: this.radioColumn, align: 'center', width: 22}],
            tbar: [{
                xtype: 'button',
                action: 'UpdateAccessTree',
                iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
            }, '->', {
                xtype: 'button',
                iconCls: 'filter',
                disabled: true
            }, {
                xtype: 'textfield',
                itemid: 'searchStringUser',
                name: 'searchStringUser',
                enableKeyEvents: false
            }, {
                xtype: 'button',
                iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                action: 'clearProperty',
                hidden: true
            },
            {
                xtype: 'button',
                action: 'searchProperty',
                iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
            }]
        };

        me.items = [
            {
                xtype: 'panel',
                itemid:'usereditPanel',
                border: false,
                layout: 'hbox',
                items: [
                {
                    xtype: 'form',
                    itemid: 'usermanageform',

                    border: false,
                    bodyStyle: 'padding:5px 5px 0',
                    fieldDefaults: { msgTarget: 'side', labelWidth: 100 },
                    defaults: { anchor: '100%' },
                    width: '33%',
                    fileUpload: true,
                    items: [{
                        xtype: 'fieldset',
                        title: 'User information'.l('SC32210'),
                        width: '100%',
                        layout: 'anchor',
                        defaults: { anchor: '100%' },
                        items:
                        [{
                            xtype: 'textfield',
                            name: 'FirstName',
                            labelWidth: 100,
                            fieldLabel: 'First name'.l('SC32210') + '*',
                            allowBlank: false,
                            maxLength: 100
                        }, {
                            xtype: 'textfield',
                            name: 'LastName',
                            labelWidth: 100,
                            fieldLabel: 'Surname'.l('SC32210') + '*',
                            allowBlank: false,
                            maxLength: 100
                        }, {
                            xtype: 'radiogroup',
                            fieldLabel: 'Gender'.l('SC32210') + '*',
                            columns: 2,
                            labelWidth: 100,
                            allowBlank: false,
                            width: 220,
                            items: [
                                { boxLabel: 'Male'.l('SC32210'), name: 'Gender', inputValue: '1' },
                                { boxLabel: 'Female'.l('SC32210'), name: 'Gender', inputValue: '2'}]
                        }, {
                            xtype: 'textfield',
                            name: 'Initial',
                            labelWidth: 100,
                            fieldLabel: 'Abbriviation'.l('SC32210') + '*',
                            allowBlank: false,
                            maxLength: 10
                        }, {
                            xtype: 'textfield',
                            name: 'Email',
                            vtype: 'email',
                            labelWidth: 100,
                            fieldLabel: 'E-mail address'.l('SC32210') + '*',
                            allowBlank: false,
                            maxLength: 200
                        }, {
                            xtype: 'textfield',
                            name: 'BookingAddress',
                            labelWidth: 100,
                            fieldLabel: 'Booking address'.l('SC32210'),
                            allowBlank: true,
                            maxLength: 200
                        }, {
                            xtype: 'combo',
                            name: 'SubDepartmentId',
                            labelWidth: 100,
                            fieldLabel: 'Sub Department'.l('SC32210') + '*',
                            emptyText: 'Select Sub Department'.l('SC32210'),
                            allowBlank: false,
                            store: 'configuration.SubDepartmentAllStore',
                            queryMode: 'local',
                            displayField: 'SubDepartmentName',
                            valueField: 'SubDepartmentId'
                        }, {
                            xtype: 'combo',
                            name: 'DesignationId',
                            labelWidth: 100,
                            fieldLabel: 'Designation'.l('SC32210') + '*',
                            emptyText: 'Select Designation'.l('SC32210'),
                            allowBlank: false,
                            store: 'configuration.DesignationBySubDepartmentStore',
                            queryMode: 'local',
                            displayField: 'DesignationName',
                            valueField: 'DesignationId',
                            action: 'DesignationChange',
                            itemid: 'DesignationCombo'
                        }, {
                            xtype: 'combo',
                            name: 'LanguageId',
                            fieldLabel: 'Language'.l('SC32210') + '*',
                            emptyText: 'Select Language'.l('SC32210'),
                            allowBlank: false,
                            store: 'common.AllLanguageListStore',
                            queryMode: 'local',
                            displayField: 'Name',
                            valueField: 'LanguageId'
                        }, {
                            xtype: 'checkbox',
                            fieldLabel: 'Active'.l('SC32210'),
                            name: 'IsActive',
                            inputValue: 'true'
                        }, {
                            xtype: 'hidden',
                            name: 'UserId',
                            itemid: 'UserIdEdit',
                            value: me.UserId
                        }, {
                            xtype: 'hidden',
                            name: 'RoleId',
                            itemid: 'UserRoleId'
                        }, {
                            xtype: 'hidden',
                            name: 'isAllProp',
                            value: false
                        }]
                    },
                    {
                        xtype: "container",
                        items: [me.UserPropertylist],
                        padding: '0 0 0 0',
                        width: '100%'
                    }]
                }, {
                    xtype: 'panel',
                    border: false,
                    width: '33%',
                    items:
                        [{
                            xtype: 'rolestree',
                            iconCls: 'icon-roles',
                            padding: '5px',
                            width: '100%',
                            height: 275
                        }, {
                            xtype: 'rightstree',
                            iconCls: 'icon-rights',
                            padding: '5px',
                            width: '100%',
                            height: 275
                        }]
                }, {
                    xtype: 'panel',
                    border: false,
                    width: '33%',
                    items:
                        [{
                            xtype: 'accesstree',
                            iconCls: 'icon-veri-mail',
                            padding: '5px',
                            width: '100%',
                            height: 325
                        }, {
                            xtype: 'globalactivitieslist',
                            iconCls: 'tree_folder',
                            padding: '5px',
                            width: '100%',
                            height: 225
                        }]
                }],
                buttons: [{
                    text: 'Cancel'.l('w'),
                    handler: function () {
                        me.close();
                    }
                }, {
                    text: 'Save'.l('w'),
                    action: 'saveUser',
                    itemid: 'saveUser'
                }, {
                    text: 'Save and Close'.l('w'),
                    action: 'saveCloseUser',
                    itemid: 'saveCloseUser'
                }]
            }];

        me.callParent(arguments);
    },
    radioColumn: function (v, meta, record, rowIdx, col_idx, store) {
        //return '<input ' + (record.data.Checked == true ? 'checked=checked' : '') + ' type=checkbox name="rgrp' + this.body.id + '">'//myEl //
        return '<input ' + (record.data.Checked == true ? 'checked=checked' : '') + ' onclick="loadUserActivityAssoTree(this,' + rowIdx + ',\'' + store.storeId + '\')" type=checkbox>';
        //return '<input ' + (record.data.Checked == true ? 'checked=checked' : '') + ' onclick="loadUserActivityAssoTree(' + rowIdx + ',\'' + store.storeId + '\')" type=checkbox name="rgrp' + this.body.id + '">'//myEl //
        //return '<input ' + (record.data.Checked == true ? 'checked=checked' : '') + ' onclick="Ext.getStore(\'' + store.storeId + '\').data.items[' + rowIdx + '].set(''Checked'', true);" type=checkbox name="rgrp' + this.body.id + '">';
    }
});