Ext.define('Regardz.view.dashboard.TraceManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.tracemanage',
    uses: ['Regardz.view.common.RadioRow'],
    modal: true,
    initComponent: function () {

        var me = this;
        me.autoScroll = true;
        me.height = parseInt(Ext.getBody().getViewSize().height * (0.85));
        me.width = parseInt(Ext.getBody().getViewSize().width * (0.9));
        me.gridHeight = parseInt(me.height * (0.35));

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
                xtype: 'radiorow',
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
            },
                 {
                     xtype: 'button',
                     action: 'searchProperties',
                     iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
                 }
            ]
        };
        me.SubDepartment = {
            xtype: 'grid',
            title: 'Sub-Departments'.l('SC82000'),
            store: Ext.getStore('dashboard.TracesSubDepartmentStore'),
            itemid: 'TraceDepartment',
            noResize: true,
            cls: 'gridwhitebackground',
            height: parseInt(me.height * (0.44)),
            frame: false,
            autoScroll: true,
            columns: [{
                hidden: true,
                dataIndex: 'PropertyId',
                name: 'PropertyId'
            }, {
                header: 'Sub-Department'.l('SC82000'),
                flex: 1,
                dataIndex: 'SubDepartmentName'
            }, {
                width: 30,
                dataIndex: 'checked',
                xtype: 'radiorow'
            }],
            tbar: ['->', {
                xtype: 'button',
                iconCls: 'filter',
                disabled: true
            }, {
                xtype: 'textfield',
                id: 'searchSubDept',
                itemid: 'searchSubDept',
                name: 'searchSubDept',
                enableKeyEvents: false
            }, {
                xtype: 'button',
                iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                action: 'clearSubDept',
                hidden: true
            },
                 {
                     xtype: 'button',
                     action: 'searchSubDept',
                     iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
                 }
            ]
        };

        me.User = {
            xtype: 'grid',
            title: 'Users'.l('SC82000'),
            noResize: true,
            store: Ext.getStore('dashboard.TracesUserStore'),
            itemid: 'TraceUser',
            cls: 'gridwhitebackground',
            height: me.gridHeight,
            frame: false,
            autoScroll: true,
            columns: [{
                hidden: true,
                dataIndex: 'UserId',
                name: 'UserId'
            }, {
                header: 'User'.l('SC82000'),
                flex: 1,
                dataIndex: 'Name'
            }, {
                header: 'User',
                dataIndex: 'DesignationName'
            }, {
                width: 30,
                dataIndex: 'checked',
                xtype: 'radiorow'
            }],
            tbar: ['->', {
                xtype: 'button',
                iconCls: 'filter',
                disabled: true
            }, {
                xtype: 'textfield',
                id: 'searchUser',
                itemid: 'searchUser',
                name: 'searchUser',
                enableKeyEvents: false
            }, {
                xtype: 'button',
                iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                action: 'clearUser',
                hidden: true
            },
                 {
                     xtype: 'button',
                     action: 'searchUser',
                     iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
                 }
            ]
        };

        me.leftSection = {
            xtype: 'container',
            width: '45%',
            padding: '10 15 0 10',

            items: [{
                xtype: 'textareafield',
                grow: true,
                name: 'TraceMessage',
                width: '100%',
                height: parseInt(me.height * (0.35)),
                padding: '0 0 5 0',
                labelWidth: '20%',
                allowBlank: false,
                fieldLabel: 'Message'.l('SC82000') + '*',
                anchor: '100%'
            }, {
                xtype: 'radio',
                fieldLabel: 'Due time'.l('SC82000'),
                boxLabel: 'Immediately'.l('SC82000'),
                name: 'IsInstant',
                inputValue: true,
                checked: true,
                width: '55%',
                action: 'radioChange'
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'radio',
                    hideEmptyLabel: false,
                    fieldLabel: '',
                    boxLabel: 'Delayed'.l('SC82000'),
                    name: 'IsInstant',
                    inputValue: false,
                    width: '45%'
                }, {
                    xtype: 'displayfield',
                    width: 15
                }, {
                    xtype: 'datefield',
                    name: 'TraceDate',
                    itemid: 'trcdate',
                    minValue: new Date(),
                    format: usr_dateformat,
                    submitFormat: 'Y-m-d',
                    width: '22%',
                    disabled: true
                }, {
                    xtype: 'displayfield',
                    width: 10
                }, {
                    xtype: 'timefield',
                    name: 'TraceTime',
                    itemid: 'trctime',
                    selectOnFocus: true,
                    format: 'H:i',
                    increment: 30,
                    width: '20%',
                    disabled: true
                }]
            }, {
                xtype: 'hidden',
                name: 'TraceNotificationId'
            },
            {
                xtype: 'hidden',
                name: 'TraceType'
            }, {
                xtype: 'hidden',
                name: 'PropertyId',
                allowBlank: false
            }, {
                xtype: 'hidden',
                name: 'SubDepartmentId',
                allowBlank: false
            }, {
                xtype: 'hidden',
                name: 'AssignedToUserId'
            }, {
                xtype: 'hidden',
                name: 'BookingId',
                value: me.BookingId
            }, {
                xtype: 'hidden',
                name: 'BookingTrackingId',
                itemid: 'bookingTrackingId',
                value: me.BookingTrackingId
            }, {
                xtype: 'hidden',
                name: 'FinishedDate'
            }, {
                xtype: 'hidden',
                name: 'FinishedBy'
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
                xtype: "container",
                items: [me.Property],
                padding: '10 0 0 0',
                width: '100%'
            }]
        };

        me.rightSection = {
            xtype: 'container',
            width: '50%',

            items: [{
                xtype: "container",
                items: [me.SubDepartment],
                padding: '10 0 0 0',
                width: '100%'
            }, {
                xtype: "container",
                items: [me.User],
                padding: '10 0 0 0',
                width: '100%'
            }]
        };

        Ext.apply(me, {
            title: 'Create Trace_Title'.l('SC82000'),
            layout: 'fit',
            items: {
                xtype: 'form',
                itemid: 'tracemangeid',
                layout: 'hbox',
                border: false,
                margin: 5,
                buttonAlign: 'center',
                items: [
                    me.leftSection, me.rightSection
			    ]
            }
        });

        me.dockedItems = [{
            dock: 'bottom',
            align: 'right',
            buttonAlign: 'right',
            buttons: [{
                text: 'Cancel'.l('g'),
                action: 'cancel',
                handler: function () {
                    me.destroy();
                }
            }, {
                text: 'Send'.l('g'),
                action: 'traceSave'
            }]
        }];

        me.callParent();
    }
});