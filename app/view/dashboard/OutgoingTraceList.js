Ext.define('Regardz.view.dashboard.OutgoingTraceList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.outgoingtracelist',
    height: parseInt(Ext.getBody().getViewSize().height * (0.27)),
    store: 'dashboard.OutgoingTracesStore',
    modal: true,
    requires: [
		'Ext.ux.form.SearchField'
	],
    initComponent: function () {
        var me = this;
        me.title = 'Outgoing Traces'.l('SC80000');
        me.collapsible = true;
        me.itemid = 'outgoingtracelistgrid';
        me.noResize = true;
        me.columns = [{
            header: 'Date'.l('SC80000'),
            dataIndex: 'TraceDate',
            width: '20%',
            align: 'center',
            name: 'TraceDate',
            renderer: this.dateRenderer
        }, {
            header: 'Message'.l('SC80000'),
            dataIndex: 'TraceMessage',
            flex: 1,
            align: 'left',
            name: 'TraceMessage',
            renderer: this.colorRender
        }, {
            header: 'Cre.'.l('SC80000'),
            dataIndex: 'CreatedByUserShortName',
            width: '10%',
            align: 'center',
            name: 'CreatedByUserShortName',
            renderer: this.colorRender
        }, {
            header: 'Han.'.l('SC80000'),
            dataIndex: 'AssignedTouserShortName', //FinishedByuserShortName
            align: 'center',
            width: '10%',
            name: 'FinishedByuserShortName',
            renderer: this.colorRender
        }, {
            header: 'Finished'.l('SC80000'),
            dataIndex: 'FinishedDate',
            align: 'center',
            width: '25%',
            name: 'FinishedDate',
            renderer: this.dateRenderer
        }];
        me.tbar = [{
            xtype: 'button',
            iconCls: 'new',
            action: 'traceadd',
            tooltip: 'Add Trace'.l('SC80000')
            //text: 'Add new'.l('SC33000')
        }, '->', {
            xtype: 'radiogroup',
            allowBlank: false,
            columns: 3,
            itemid: 'is_status',
            action: 'is_status',
            width: '35%',
            items: [{
                boxLabel: 'Both'.l('SC80000'),
                inputValue: 3,
                name: 'tracetype_out',
                checked: true
            }, {
                boxLabel: 'Auto'.l('SC80000'),
                inputValue: 1,
                name: 'tracetype_out'
            }, {
                boxLabel: 'Manual'.l('SC80000'),
                inputValue: 2,
                name: 'tracetype_out'
            }]
        }, {
            xtype: 'tbspacer',
            width: 10
        }, {
            xtype: 'radiogroup',
            allowBlank: false,
            columns: 2,
            width: '21%',
            itemid: 'is_open_all',
            action: 'is_open_all',
            items: [{
                boxLabel: 'Open'.l('SC80000'),
                inputValue: 2,
                name: 'status_out',
                checked: true
            }, {
                boxLabel: 'All'.l('SC80000'),
                inputValue: 1,
                name: 'status_out'
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
            action: 'clearOutTraceFilter',
            hidden: true
        }, {
            xtype: 'button',
            action: 'searchTrace',
            iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
        }];
        me.layout = 'fit';
        me.autoScroll = true;
        me.frame = true;

        me.viewConfig = {
            forceFit: true
        };
        me.callParent();
    },
    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        this.colorRender(value, metadata, record, rowIndex, colIndex, store);
        var d = Ext.Date.parse(value, 'c');
        return Ext.util.Format.date(d, usr_dateformat + ' ' + 'H:i');
    },
    colorRender: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.IsTraceDone == 1) {
            metadata.style = "background-color: white";
        }
        else if (record.data.DayDiff == 0 && record.data.TimeDiff > 0) {
            metadata.style = "background-color: yellow";
        }
        else if (record.data.DayDiff <= 0) {
            metadata.style = "background-color: pink";
        }
        return value;
    }
});