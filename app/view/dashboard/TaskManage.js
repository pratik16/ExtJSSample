Ext.define('Regardz.view.dashboard.TaskManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.taskmanage',
    modal: true,
    initComponent: function () {
        var me = this;
        me.itemid;
        log('me item id', me.itemid);
        me.autoScroll = true;
        me.height = parseInt(Ext.getBody().getViewSize().height * (0.78));
        me.width = parseInt(Ext.getBody().getViewSize().width * (0.85));

        var startDate = new Date();
        startDate = Ext.util.Format.date(startDate, 'Y-m-d');

        me.priorityData = new Ext.data.SimpleStore({
            fields: ['PriorityName', 'PriorityId'],
            data: [['Low'.l('SC81000'), 1], ['Normal'.l('SC81000'), 2], ['High'.l('SC81000'), 3]]
        });

        me.CompanyId = (me.CompanyId > 0) ? me.CompanyId : 0;
        me.IndividualId = (me.IndividualId > 0) ? me.IndividualId : 0;

        me.TaskId = (me.TaskId > 0) ? me.TaskId : 0;
        me.isClone = (me.isClone > 0) ? me.isClone : 0;
        var Initial = '';
        if (CurrentSessionUserInitial.length > 0)
            Initial = ' (' + CurrentSessionUserInitial + ')';

        me.autoShow = true;

        me.leftSection = {
            xtype: 'container',
            width: '60%',
            height: parseInt(me.height * (0.85)),
            padding: '10 10 0 10',
            layout: 'form',
            defaults: {
                padding: '0 0 0 0'
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                defaults: {
                    padding: '0 5 5 0',
                    width: '15%'
                },
                items: [{
                    xtype: 'datefield',
                    fieldLabel: 'Date'.l('SC81000') + '*',
                    itemid: 'Date',
                    name: 'DueDate',
                    labelWidth: 70,
                    width: '35%',
                    itemid: 'Date',
                    format: usr_dateformat,
                    submitFormat: 'Y-m-d',
                    value: startDate,
                    allowBlank: false
                }, {
                    xtype: 'tbspacer',
                    width: 5
                }, {
                    xtype: 'timefield',
                    name: 'StartTime',
                    selectOnFocus: true,
                    format: 'H:i',
                    width: '12%',
                    increment: 30,
                    value: '00:00',
                    //allowBlank: false,
                    listeners: {
                        'change': function () {
                            //alert('l');
                            var form = Ext.ComponentQuery.query('taskmanage [itemid="taskmangeid"]')[0];
                            var s = form.getForm().findField('StartTime').getValue();

                            form.getForm().findField('EndTime').setMinValue(s);
                        }
                    }
                }, {
                    xtype: 'timefield',
                    padding: '0 10 0 0',
                    name: 'EndTime',
                    selectOnFocus: true,
                    format: 'H:i',
                    width: '12%',
                    increment: 30,
                    value: '00:00',
                    //allowBlank: false,
                    listeners: {
                        'change': function () {
                            var form = Ext.ComponentQuery.query('taskmanage [itemid="taskmangeid"]')[0];
                            var s = form.getForm().findField('StartTime').getValue();
                            form.getForm().findField('EndTime').setMinValue(s);
                        }
                    }
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Priority'.l('SC81000') + '*',
                    name: 'PriorityId',
                    width: '40%',
                    labelWidth: 80,
                    store: me.priorityData,
                    allowBlank: false,
                    emptyText: 'Select Priority'.l('SC81000'),
                    valueField: 'PriorityId',
                    displayField: 'PriorityName'

                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                defaults: {
                    padding: '0 5 5 0'
                },
                items: [
                //                {
                //                    xtype: 'textfield',
                //                    labelWidth: 70,
                //                    name: 'Location',
                //                    fieldLabel: 'Location'.l('SC81000'),
                //                    //                allowBlank: false,
                //                    width: '60%'
                //                },
                {
                xtype: 'combo',
                name: 'PropertyId',
                fieldLabel: 'Location'.l('SC81000'),
                labelWidth: 70,
                itemid: 'propertycombo',
                displayField: 'PropertyName',
                valueField: 'PropertyId',
                width: '60%',
                action: 'select_property',
                store: 'common.PropertyForNamesStore',
                emptyText: 'Select Property'.l('SC73000')
            }, {
                xtype: 'tbspacer',
                width: 5
            }, {
                xtype: 'combo',
                fieldLabel: 'Type'.l('SC81000') + '*',
                itemid: 'taskType',
                name: 'TaskTypeId',
                width: '40%',
                emptyText: 'Select Task Type'.l('SC81000'),
                labelWidth: 60,
                allowBlank: false,
                store: Ext.getStore('dashboard.TaskTypeStore'),
                valueField: 'TaskTypeId',
                displayField: 'Name'
                //                listeners: {
                //                    'change': function (combo, newValue) {
                //                        try {
                //                            var formHolder = Ext.ComponentQuery.query('taskmanage [itemid="taskmangeid"]')[0];
                //                            var form = formHolder.getForm();
                //                            var st = combo.getStore();
                //                            var itemIndex = st.findExact('TaskTypeId', newValue);
                //                            var item = st.getAt(itemIndex);
                //                            log('item valuye', item.get('DefaultSubject'));
                //                            form.findField('Subject').setValue(item.get('DefaultSubject'));
                //                            form.findField('Description').setValue(item.get('DefaultContent'));
                //                        } catch (e) {
                //                            log('Exception ex', e);
                //                        }
                //                    }
                //                }
            }]
        }, {
            xtype: 'textfield',
            fieldLabel: 'Purpose'.l('SC81000'),
            name: 'Purpose',
            labelWidth: 70,
            anchor: '80%',
            //        allowBlank: false,
            padding: '20 0 5 0'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Result'.l('SC81000'),
            name: 'Result',
            labelWidth: 70,
            //      allowBlank: false,
            anchor: '80%',
            padding: '20 0 0 0'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Subject'.l('SC81000') + '*',
            name: 'Subject',
            labelWidth: 70,
            allowBlank: false,
            anchor: '80%',
            padding: '20 0 0 0'
        }, {
            xtype: 'textarea',
            name: 'Description',
            width: 580,
            height: 205,
            //  allowBlank: false,
            padding: '10 0 0 0'
        }]
    };
    //GetSubjectbyTaskType
    me.rightSection = {
        xtype: 'container',
        width: '40%',
        padding: '10 0 0 0',
        items: [{
            xtype: 'radiogroup',
            fieldLabel: 'Action'.l('SC81000') + '*',
            //name: 'ActionType',
            columns: 1,
            vertical: true,
            items: [{ boxLabel: '&nbsp;<img src="public/icons/phone.png"/>&nbsp;Call', name: 'ActionType', inputValue: 1 },
                        { boxLabel: '&nbsp;<img src="public/icons/groups.png"/>&nbsp;Appointment', name: 'ActionType', inputValue: 2, checked: true },
                        { boxLabel: '&nbsp;<img src="public/icons/mail_open.png"/>&nbsp;Letter/Mail', name: 'ActionType', inputValue: 3}]
        }, {
            xtype: 'radiogroup',
            fieldLabel: 'Status'.l('SC81000') + '*',
            columns: 1,
            allowBlank: false,
            // name: 'StatusId',
            vertical: true,
            items: [{ boxLabel: 'Open'.l('SC81000'), name: 'StatusId', inputValue: 1, checked: true },
                        { boxLabel: 'Deactivate'.l('SC81000'), name: 'StatusId', inputValue: 2 },
                        { boxLabel: 'Done'.l('SC81000'), name: 'StatusId', inputValue: 3}]
        }, {
            xtype: 'combo',
            fieldLabel: 'Business Type'.l('SC81000') + '*',
            itemid: 'businesstype',
            name: 'BusinessTypeId',
            store: Ext.getStore('common.BusinessTypeStore'),
            valueField: 'BusinessTypeId',
            displayField: 'BusinessTypeName',
            emptyText: 'Select Business Type'.l('SC81000')
            //allowBlank: false
        }, {
            xtype: 'fieldset',
            width: '85%',
            height: '85%',
            title: 'Settings'.l('SC81000'),
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Staff'.l('SC81000') + '*',
                    itemid: 'staffDisplay',
                    value: me.TaskId > 0 ? '' : CurrentSessionUserFName + ' ' + CurrentSessionUserLName + Initial,
                    width: '90%'
                }, {
                    xtype: 'button',
                    action: 'searchUser',
                    iconCls: 'searchIcon',
                    tooltip: "Select User".l('SC81000')
                }]
            }, {
                xtype: 'hidden',
                name: 'AssignedTo',
                value: CurrentSessionUserId
                //  allowBlank: false
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Booking'.l('SC81000'),
                    itemid: 'taskBooking',
                    name: 'BookingDateAndNumber',
                    width: '90%'
                }, {
                    xtype: 'button',
                    action: 'searchBooking',
                    itemid: 'btnSearchBooking',
                    iconCls: 'searchIcon',
                    tooltip: "Select Booking".l('SC81000')
                }]
            }, {
                xtype: 'displayfield',
                fieldLabel: '',
                hideEmptyLabel: false,
                itemid: 'taskMeeting',
                name: 'BookingMeetingType',
                width: '90%'
            }, {
                xtype: 'displayfield',
                fieldLabel: '',
                hideEmptyLabel: false,
                itemid: 'taskLocation',
                name: 'BookingLocation',
                width: '90%'
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Company'.l('SC81000'),
                    itemid: 'taskCompany',
                    name: 'CompanyName',
                    value: me.CompanyName,
                    width: '90%'
                }, {
                    xtype: 'button',
                    action: 'searchCompany',
                    itemid: 'btnSearchCompany',
                    iconCls: 'searchIcon',
                    tooltip: "Select Company".l('SC81000')
                }]
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Contact'.l('SC81000'),
                name: 'ContactName',
                itemid: 'taskContact',
                value: me.IndividualName
            }, {
                xtype: 'displayfield',
                fieldLabel: '',
                hideEmptyLabel: false,
                itemid: 'taskPhone',
                name: 'ContactNumber',
                width: '90%'
            }, {
                xtype: 'displayfield',
                fieldLabel: '',
                hideEmptyLabel: false,
                itemid: 'taskEmail',
                name: 'ContactEmail',
                width: '90%'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Created By'.l('SC81000'),
                itemid: 'createdByName',
                name: 'CreatedByuserName',
                value: me.TaskId > 0 ? '' : CurrentSessionUserFName + ' ' + CurrentSessionUserLName + ' (' + Ext.util.Format.date(new Date(), usr_dateformat) + ')'
            }, {
                xtype: 'hidden',
                name: 'IndividualId',
                itemid: 'individualId',
                value: me.IndividualId
            }, {
                xtype: 'hidden',
                name: 'CompanyId',
                itemid: 'companyId',
                value: me.CompanyId
            }, {
                xtype: 'hidden',
                name: 'BookingId',
                itemid: 'bookingId'
            }, {
                xtype: 'hidden',
                name: 'BookingTrackingId',
                itemid: 'bookingTrackingId'
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
                name: 'TaskId',
                itemid: 'taskId',
                value: me.TaskId
            }, {
                xtype: 'hidden',
                name: 'isClone',
                value: me.isClone
            }, {
                xtype: 'hidden',
                itemid: 'windowType',
                name: 'WindowType',
                value: me.WindowType
            }]
        }]
    };

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
            text: 'Save'.l('g'),
            action: 'taskmanagesaveAction',
            formBind: true
        }]

    }];

    Ext.apply(me, {
        title: 'Task Manage_Title'.l('SC81000'),
        items: {
            xtype: 'form',
            itemid: 'taskmangeid',
            layout: 'hbox',
            border: false,
            padding: 5,
            buttonAlign: 'center',
            items: [
                    me.leftSection, me.rightSection
                ]
        }
    });
    me.callParent();
}
});