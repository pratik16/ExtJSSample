Ext.define('Regardz.view.company.TasksList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.taskslist',
    store: 'company.TaskStore',
    loadMask: true,

    requires: [
		'Ext.ux.form.SearchField'
	],

    initComponent: function () {

        var me = this;
        //me.autoHeight = true;
        height = 300;
        me.title = "Tasks".l('SC61300');
        me.itemid = 'taskslist';        
        me.layout = "fit";
        me.viewConfig = {
            forceFit: true
        };
        me.frame = true;
        me.columns = [
                { header: 'Date'.l('SC61300'), align: 'left', renderer: this.dateRenderer, dataIndex: 'DueDate', flex: 1 },
                { header: 'Time'.l('SC61300'), align: 'left', dataIndex: 'StartTime', renderer: this.RenderTime, flex: 1 },
                { header: 'Subject'.l('SC61300'), dataIndex: 'Subject', renderer: this.colorRender, flex: 2 },
                { header: 'Contact'.l('SC61300'), dataIndex: 'IndividualName', renderer: this.colorRender, flex: 2 },
                { dataIndex: 'TaskId', align: 'center', width: 25, renderer: this.DeleteTask, name: 'taskDelete' },
                { dataIndex: 'TaskId', align: 'center', width: 25, renderer: this.EditTask, name: 'taskEdit' },
                { hidden: true, dataIndex: 'TaskId' }, { hidden: true, dataIndex: 'CompanyId' }, { hidden: true, dataIndex: 'IndividualId' }
        ];

        me.tbar =
                [{
                    xtype: 'button',
                    action: 'addTask',
                    iconCls: 'new',
                    //text: 'Add New'.l('SC61300'),
                    tooltip: 'Add Task'.l('SC61300'),
                    handler: function () {
                        //Ext.create('widget.contractEdit', { contractId: me.contractId })
                    }
                },
                { xtype: 'tbspacer' },
                {
                    xtype: 'radiogroup',
                    name: 'taskstatus',
                    allowBlank: true,
                    vertical: false,
                    items: [{ boxLabel: 'Open'.l('SC61300'), name: 'Status', action: 'taskStatusChange', checked: true, inputValue: '1', width: 80 }, //.l('SC61300')
                            {boxLabel: 'All'.l('SC61300'), name: 'Status', inputValue: '0'}]
                }, '->', {
                    xtype: 'button',
                    iconCls: 'filter',
                    disabled: true
                }, {
                    xtype: 'searchfield',
                    store: Ext.getStore('company.TaskStore'),
                    iconCls: 'filter',
                    paramName: 'searchString'
                }];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            emptyMsg: "No data to display".l("g")
        };

        me.callParent();
    },
    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        this.colorRender(value, metadata, record, rowIndex, colIndex, store);
        var d = Ext.Date.parse(value, 'c');
        return Ext.util.Format.date(d, usr_dateformat);
    },
    EditTask: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Update Task".l('SC61100');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';
    },
    DeleteTask: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Delete Task".l('SC61100');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-delete';
    },
    RenderTime: function (value, metadata, record, rowIndex, colIndex, store) {
        this.colorRender(value, metadata, record, rowIndex, colIndex, store);
        if (record.data.EndTime != null && record.data.StartTime != null)
            return record.data.StartTime.substring(0, record.data.StartTime.lastIndexOf(":")) + "-" + record.data.EndTime.substring(0, record.data.EndTime.lastIndexOf(":"));
    },
    colorRender: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.DayDiff == 0 && record.data.TimeDiff > 0) {
            metadata.style = "background-color: yellow";
        }
        else if (record.data.DayDiff <= 0) {
            metadata.style = "background-color: red";
        }
        return value;
    }
});