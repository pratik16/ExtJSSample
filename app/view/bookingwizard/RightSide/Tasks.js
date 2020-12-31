Ext.define('Regardz.view.bookingwizard.RightSide.Tasks', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tasks',
    tasksObject: {},
    //store: 'bookingwizard.RightSide.WizardTaskListStore',
    initComponent: function () {
        var me = this;
        //me.fieldSetHeight = 300;

        me.ViewDescription = {
            xtype: 'fieldset',
            title: 'View',
            width: '95%',
            margin: '10',
            items: [{
                xtype: 'form',
                itemid: 'taskviewid',
                border: false,
                layout: 'vbox',
                height: me.fieldSetHeight,
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Subject'.l('SC50000'),
                    name: 'Subject'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Date & Time'.l('SC50000'),
                    name: 'DueDate',
                    itemid: 'duedate'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Owner'.l('SC50000'),
                    name: 'AssignedUserName'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Contact'.l('SC50000'),
                    name: 'ContactName'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Content'.l('SC50000'),
                    name: 'Description'
                }]
            }]
        };

        me.tasksPanel = Ext.create('Ext.grid.Panel', {
            store: Ext.getStore('bookingwizard.RightSide.WizardTaskListStore'),
            itemid: "tasklist",
            title: 'Tasks'.l('SC50000'),
            iconCls: 'info_icon',
            height: 200,
            padding: '10',
            width: '95%',
            noResize: true,
            columns: [{
                header: 'Subject'.l('SC50000'),
                dataIndex: 'Subject',
                width: '60%',
                align: 'left',
                renderer: this.colorRender
            }, {
                header: 'User'.l('SC50000'),
                dataIndex: 'userShortName',
                align: 'center',
                width: '30%',
                renderer: this.colorRender
            }, {
                dataIndex: 'TaskId',
                renderer: this.editTasksIcon,
                name: 'editTaskAction',
                align: 'center',
                width: 25,
                sortable: false
            }],
            tbar: [{
                xtype: 'button',
                iconCls: 'new',
                action: 'tasklistaction',
                itemid: 'buttonAddNewTask',
                tooltip: 'Add new'.l('SC50000'),
                tooltip: 'Add Task'.l('SC50000')
            }, '->', {
                xtype: 'radiogroup',
                allowBlank: false,
                columns: 2,
                itemid: 'is_open_all',
                width: '38%',
                action: 'is_open_all',
                items: [{
                    boxLabel: 'Open'.l('SC50000'),
                    inputValue: 2,
                    name: 'status',
                    checked: true
                }, {
                    boxLabel: 'All'.l('SC50000'),
                    inputValue: 1,
                    name: 'status'
                }]
            }, {
                xtype: 'button',
                iconCls: 'filter',
                tooltip: 'Filter'.l('SC50000'),
                disabled: true
            }, {
                xtype: 'textfield',
                width: 100,
                name: 'searchString',
                itemid: 'searchString',
                enableKeyEvents: true
            }, {
                xtype: 'button',
                iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                tooltip: 'Clear filter'.l('SC50000'),
                action: 'clearTaskFilter',
                hidden: true
            }, {
                xtype: 'button',
                action: 'searchTasks',
                tooltip: 'Search'.l('SC50000'),
                iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
            }]
        });

        me.items = [{
            layout: 'vbox',
            xtype: 'fieldcontainer',
            itemid: 'fc',
            width: '100%',
            items: [me.ViewDescription, me.tasksPanel]
        }];
        me.callParent();
    },
    editTasksIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        //this.colorRender(value, metadata, record, rowIndex, colIndex, store);
        var tooltipText = "Edit Task".l('SC50000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';
    },
    colorRender: function (value, metadata, record, rowIndex, colIndex, store) {

        if (record.data.DayDiff == 0 && record.data.TimeDiff > 0 && record.data.StatusId == 1) {
            metadata.style = "background-color: yellow";
        }
        else if (record.data.DayDiff <= 0 && record.data.StatusId == 1) {
            metadata.style = "background-color: pink";
        }
        return value;
    }
});
