Ext.define('Regardz.view.configuration.AutomatedTraceManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.automatedTracemanage',
    requires: ['Regardz.view.common.CheckboxRow', 'Regardz.view.common.RadioRow'],
    modal: true,
    initComponent: function () {

        var me = this;
        me.autoScroll = true;
        me.height = parseInt(Ext.getBody().getViewSize().height * (0.85));
        me.width = parseInt(Ext.getBody().getViewSize().width * (0.6));
        me.gridHeight = parseInt(me.height * (0.55));

        me.AutomatedTraceId = (me.AutomatedTraceId > 0) ? me.AutomatedTraceId : 0;

        me.disableitems = true;
        me.langClass = 'languagebutton-disable';
        if (me.AutomatedTraceId > 0) {
            me.disableitems = false;
            me.langClass = 'languagebutton';
        }
        me.autoShow = true;

        me.Property = {
            xtype: 'grid',
            title: 'Properties'.l('SC82000') + '*',
            store: Ext.getStore('common.PropertyForNamesStore'),
            itemid: 'TraceProeprty',
            cls: 'gridwhitebackground',
            height: me.gridHeight,
            frame: false,
            autoScroll: true,
            columns: [{
                hidden: true,
                dataIndex: 'PropertyId',
                name: 'PropertyId'
            }, {
                header: 'Property'.l('SC82000'),
                flex: 1,
                dataIndex: 'PropertyName'
            }, {
                width: 30,
                xtype: 'checkboxrow',
                dataIndex: 'checked'
            }],
            tbar: ['->', {
                xtype: 'button',
                iconCls: 'filter',
                disabled: true
            }, {
                xtype: 'textfield',
                id: 'searchProperty',
                itemid: 'searchProperty',
                name: 'searchProperty',
                enableKeyEvents: false
            }, {
                xtype: 'button',
                iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                action: 'clearProperties',
                hidden: true
            }, {
                xtype: 'button',
                action: 'searchProperties',
                iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
            }]
        };
        me.SubDepartment = {
            xtype: 'grid',
            features: Ext.create('Ext.grid.feature.Grouping', { groupHeaderTpl: '{name}' }),
            title: 'Sub-Departments'.l('SC82000'),
            store: Ext.getStore('configuration.PropertywiseSubDepartmentStore'),
            itemid: 'TraceDepartment',
            noResize: true,
            cls: 'gridwhitebackground',
            height: parseInt(me.height * (0.82)),
            frame: false,
            autoScroll: true,
            collapsible: true,
            viewConfig: {
                markDirty: false
            },
            columns: [{
                hidden: true,
                dataIndex: 'PropertyId',
                name: 'PropertyId'
            }, {
                hidden: true,
                dataIndex: 'SubDepartmentId',
                name: 'SubDepartmentId'
            }, {
                header: 'Sub-Department'.l('SC82000'),
                flex: 1,
                dataIndex: 'SubDepartmentName'
            }, {
                width: 30,
                dataIndex: 'checked',
                xtype: 'radiorow'
            }]
        };

        //        me.User = {
        //            xtype: 'grid',
        //            title: 'Users'.l('SC82000'),
        //            noResize: true,
        //            store: Ext.getStore('dashboard.TracesUserStore'),
        //            itemid: 'TraceUser',
        //            cls: 'gridwhitebackground',
        //            height: me.gridHeight,
        //            frame: false,
        //            autoScroll: true,
        //            columns: [{
        //                hidden: true,
        //                dataIndex: 'UserId',
        //                name: 'UserId'
        //            }, {
        //                header: 'User'.l('SC82000'),
        //                flex: 1,
        //                dataIndex: 'Name'
        //            }, {
        //                header: 'User',
        //                dataIndex: 'DesignationName'
        //            }, {
        //                width: 30,
        //                dataIndex: 'checked',
        //                xtype: 'radiorow'
        //            }],
        //            tbar: ['->', {
        //                xtype: 'button',
        //                iconCls: 'filter',
        //                disabled: true
        //            }, {
        //                xtype: 'textfield',
        //                id: 'searchUser',
        //                itemid: 'searchUser',
        //                name: 'searchUser',
        //                enableKeyEvents: false
        //            }, {
        //                xtype: 'button',
        //                iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
        //                action: 'clearUser',
        //                hidden: true
        //            },
        //                 {
        //                     xtype: 'button',
        //                     action: 'searchUser',
        //                     iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
        //                 }
        //            ]
        //        };

        me.leftSection = {
            xtype: 'container',
            width: '55%',
            padding: '10 15 0 10',
            items: [{
                xtype: 'fieldset',
                //                width: '85%',
                height: '85%',
                title: 'Trigger'.l('SC20900') + 's',
                items: [{
                    xtype: 'radiogroup',
                    allowBlank: false,
                    columns: 1,
                    itemid: 'triggerlist',
                    width: '33%',
                    action: 'triggerSelect',
                    fieldLabel: 'Trigger'.l('SC20900') + '*',
                    labelWidth: '30%',
                    items: [{
                        boxLabel: 'Check In'.l('SC20910'),
                        inputValue: 1,
                        name: 'TriggerAction',
                        checked: true
                    }, {
                        boxLabel: 'Check Out'.l('SC20910'),
                        inputValue: 2,
                        name: 'TriggerAction'
                    }, {
                        boxLabel: 'Book Item'.l('SC20910'),
                        inputValue: 3,
                        name: 'TriggerAction'
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        xtype: 'displayfield',
                        fieldLabel: 'Item'.l('SC20900'),
                        itemid: 'itemName',
                        name: 'ItemName',
                        disabled: true,
                        //value: CurrentSessionUserFName + ' ' + CurrentSessionUserLName + Initial,
                        labelWidth: '30%',
                        width: '95%',
                        align: 'left'
                    }, {
                        xtype: 'button',
                        action: 'searchItem',
                        itemid: 'searchItem',
                        iconCls: 'searchIcon',
                        disabled: true,
                        tooltip: "Select Item".l('SC20910')
                    }, {
                        xtype: 'hidden',
                        name: 'ItemId',
                        itemid: 'ItemId'
                    }, {
                        xtype: 'hidden',
                        name: 'ItemGroupId',
                        itemid: 'ItemGroupId'
                    }]
                }, {
                    xtype: 'textfield',
                    name: 'Message',
                    width: '80%',
                    padding: '10 0 5 0',
                    labelWidth: '30%',
                    allowBlank: false,
                    fieldLabel: 'Message'.l('SC20900') + '*',
                    anchor: '100%'
                }, {
                    xtype: 'hidden',
                    name: 'AutomatedTraceId',
                    itemid: 'AutomatedTraceId',
                    value: me.AutomatedTraceId
                }, {
                    xtype: 'hidden',
                    name: 'PropertyId'
                }, {
                    xtype: 'hidden',
                    name: 'SubDepartmentId'
                }, {
                    xtype: 'hidden',
                    name: 'PropSubDeptIds',
                    itemid: 'PropSubDeptIds'
                }, {
                    xtype: 'hidden',
                    name: 'CreatedDate'
                }, {
                    xtype: 'hidden',
                    name: 'CreatedBy'
                }, {
                    xtype: 'hidden',
                    name: 'UpdatedDate'
                }, {
                    xtype: 'hidden',
                    name: 'UpdatedBy'
                }, {
                    xtype: 'hidden',
                    name: 'LanguageId'
                }]
            }, {
                xtype: "container",
                items: [me.Property],
                padding: '10 0 0 0',
                width: '100%'
            }]
        };

        me.rightSection = {
            xtype: 'container',
            width: '45%',
            padding: '10 10 0 0',
            items: [{
                xtype: "container",
                items: [me.SubDepartment],
                padding: '10 0 0 0'
            }]
        };

        Ext.apply(me, {
            title: 'Automated Traces Edit_Title'.l('SC20910'),
            layout: 'fit',
            items: {
                xtype: 'form',
                itemid: 'automatedTraceform',
                layout: 'hbox',
                border: false,
                margin: 5,
                buttonAlign: 'center',
                items: [
                    me.leftSection, me.rightSection
			    ],
                tbar: ['->', {
                    xtype: 'button',
                    itemid: 'automatedTraceLanguage',
                    action: 'automatedTraceLang',
                    tooltip: 'Update multilingual contents'.l('g'),
                    disabled: me.disableitems,
                    iconCls: me.langClass
                }]
            }
        });

        me.dockedItems = [{
            dock: 'bottom',
            align: 'right',
            buttonAlign: 'right',
            buttons: [{
                text: 'Cancel'.l('w'),
                action: 'cancel',
                handler: function () {
                    me.destroy();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'traceSave'
            }]
        }];

        me.callParent();
    }
});