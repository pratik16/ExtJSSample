Ext.define('Regardz.view.dashboard.TaskList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.tasklist',
    store: 'dashboard.TaskStore',
    height: parseInt(Ext.getBody().getViewSize().height * (0.27)),
    modal: true,
    requires: [
		'Ext.ux.form.SearchField'
	],
    initComponent: function () {
        var me = this;
        me.title = 'Tasks'.l('SC80000');
        me.collapsible = true;
        me.noResize = true;
        me.itemid = 'tasklistgrid';
        me.frame = true;

        me.columns = [{
            header: 'Date'.l('SC80000'),
            dataIndex: 'DueDate',
            width: '13%',
            align: 'center',
            renderer: this.dateRenderer
        }, {
            header: 'Time'.l('SC80000'),
            dataIndex: 'TaskTime',
            width: '13%',
            align: 'center',
            renderer: this.colorRender
        }, {
            //header: '',
            dataIndex: 'ActionType',
            width: 25,
            align: 'center',
            renderer: this.statusIdRenderer
        }, {
            header: 'Subject'.l('SC80000'),
            dataIndex: 'Subject',
            width: '20%',
            align: 'left',
            renderer: this.colorRender
        }, {
            header: 'Company'.l('SC80000'),
            dataIndex: 'CompanyName',
            align: 'left',
            width: '15%',
            renderer: this.colorRender
        }, {
            header: 'User'.l('SC80000'),
            dataIndex: 'userShortName',
            align: 'center',
            width: '15%',
            renderer: this.colorRender
        }, {
            dataIndex: 'TaskId',
            renderer: this.deleteTaskIcon,
            align: 'center',
            width: 25,
            name: 'deleteTask',
            sortable: false
        }, {
            dataIndex: 'TaskId',
            renderer: this.cloneTaskIcon,
            name: 'cloneTaskAction',
            align: 'center',
            width: 25,
            sortable: false
        }, {
            dataIndex: 'StatusId',
            name: 'taskDoneAction',
            renderer: this.isStatusTrueIcon,
            align: 'center',
            width: 25,
            sortable: false
        }, {
            dataIndex: 'TaskId',
            renderer: this.editTasksIcon,
            name: 'editTaskAction',
            align: 'center',
            width: 25,
            sortable: false
        }];
        me.tbar = [{
            xtype: 'button',
            iconCls: 'new',
            action: 'tasklistaction',
            tooltip: 'Add Task'.l('SC80000')
            //text: 'Add new'.l('SC33000')
        }, '->', {
            xtype: 'radiogroup',
            allowBlank: false,
            columns: 2,
            itemid: 'is_open_all',
            width: '33%',
            action: 'is_open_all',
            items: [{
                boxLabel: 'Open'.l('SC80000'),
                inputValue: 2,
                name: 'status',
                checked: true
            }, {
                boxLabel: 'All'.l('SC80000'),
                inputValue: 1,
                name: 'status'
            }]
        }, {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'textfield',
            name: 'searchString',
            itemid: 'searchString',
            enableKeyEvents: true
        }, {
            xtype: 'button',
            iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
            action: 'clearTaskFilter',
            hidden: true
        }, {
            xtype: 'button',
            action: 'searchTasks',
            iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
        }];
        me.layout = 'fit';
        me.callParent();
    },
    editTasksIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        //this.colorRender(value, metadata, record, rowIndex, colIndex, store);
        var tooltipText = "Edit Task".l('SC80000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';
    },
    isStatusTrueIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        //this.colorRender(value, metadata, record, rowIndex, colIndex, store);
        if (value == '1') {
            var tooltipText = "Click to change status Done".l('SC80000');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
            metadata.tdCls = 'icon-yes-pointer';
        }
        else if (value == '2') {
            var tooltipText = "Deactivated".l('SC80000');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
            metadata.tdCls = 'icon-deactivate-pointer';
        }
        else {

            var tooltipText = "Done".l('SC80000');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
            metadata.tdCls = 'icon-yes-disable';
        }
    },
    cloneTaskIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Clone Task".l('SC80000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-copy';
        //this.colorRender(value, metadata, record, rowIndex, colIndex, store);
    },
    deleteTaskIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        //this.colorRender(value, metadata, record, rowIndex, colIndex, store);
        var tooltipText = "Delete Task".l('SC80000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-delete';
    },
    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        this.colorRender(value, metadata, record, rowIndex, colIndex, store);
        var d = Ext.Date.parse(value, 'c');
        return Ext.util.Format.date(d, usr_dateformat);
    },
    statusIdRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        //this.colorRender(value, metadata, record, rowIndex, colIndex, store);   
        if (value == 1) {
            metadata.tdCls = 'callIcon';
        }
        else if (value == 2) {
            metadata.tdCls = 'appointmentIcon';
        }
        else if (value == 3) {
            metadata.tdCls = 'mailIcon';
        }
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
