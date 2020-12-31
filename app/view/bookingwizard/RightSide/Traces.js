Ext.define('Regardz.view.bookingwizard.RightSide.Traces', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.traces',
    localObject: {},
    initComponent: function () {
        var me = this;

        me.ViewDescription = {
            xtype: 'fieldset',
            title: 'View'.l('SC50000'),
            width: '95%',
            margin: '10',
            items: [{
                xtype: 'form',
                itemid: 'traceviewid',
                border: false,
                layout: 'vbox',
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: '',
                    name: 'TraceMessage',
                    labelWidth: '100%'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Created by'.l('SC50000'),
                    name: 'CreatedByUserShortName'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Due Date'.l('SC50000'),
                    name: 'TraceDate',
                    itemid: 'tracedate'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Handled by'.l('SC50000'),
                    name: 'FinishedByuserShortName'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Finished'.l('SC50000'),
                    name: 'FinishedDate',
                    itemid: 'FinishedDate'
                }]
            }]

        };
    
        me.tracesPanel = Ext.create('Ext.grid.Panel', {
            store: Ext.getStore('bookingwizard.RightSide.WizardTraceListStore'),
            itemid: 'outgoingtracelist',
            title: 'Outgoing Traces'.l('SC50000'),
            iconCls: 'info_icon',
            height: 200,
            padding: '10',
            width: '95%',
            noResize: true,     
            columns: [{
                hidden: true,
                name: 'BookingId',
                dataIndex: 'BookingId'
            }, {
                header: 'Message'.l('SC50000'),
                dataIndex: 'TraceMessage',
                //flex: 1,
                width: '65%',
                align: 'left',
                name: 'TraceMessage',
                renderer: this.colorRender
            }, {
                header: 'Cre.'.l('SC50000'),
                dataIndex: 'CreatedByUserShortName',
                width: '23%',
                align: 'center',
                name: 'CreatedByUserShortName',
                renderer: this.colorRender
            }, {
                dataIndex: 'FinishedDate',
                renderer: this.isStatusTrueIcon,
                align: 'center',
                width: '10%',
                name: 'traceDoneAction'
            }],
            tbar: [{
                xtype: 'button',
                iconCls: 'new',
                action: 'traceadd',
                tooltip: 'Add Trace'.l('SC50000'),
                tooltip: 'Add new'.l('SC50000')
                //text: 'Add new'.l('SC33000')
            }, '->', {
                xtype: 'radiogroup',
                allowBlank: false,
                columns: 2,
                width: '38%',
                itemid: 'is_open_all',
                action: 'is_open_all',
                items: [{
                    boxLabel: 'Open'.l('SC50000'),
                    inputValue: 2,
                    name: 'status_out',
                    checked: true
                }, {
                    boxLabel: 'All'.l('SC50000'),
                    inputValue: 1,
                    name: 'status_out'
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
                action: 'clearOutTraceFilter',
                hidden: true
            }, {
                xtype: 'button',
                action: 'searchTrace',
                tooltip: 'Search'.l('SC50000'),
                iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
            }]
        });

        me.items = [{
            layout: 'vbox',
            xtype: 'fieldcontainer',
            width: '100%',
            items: [
                me.ViewDescription,
                me.tracesPanel
            ]
        }];
        me.callParent();
    },
    colorRender: function (value, metadata, record, rowIndex, colIndex, store) {

        if (record.data.DayDiff == 0 && record.data.TimeDiff > 0) {
            metadata.style = "background-color: yellow";
        }
        else if (record.data.DayDiff <= 0) {
            metadata.style = "background-color: pink";
        }
        return value;
    },
    isStatusTrueIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        //this.colorRender(value, metadata, record, rowIndex, colIndex, store);
        if (value == null) {
            var tooltipText = "Click to change status Done".l('SC50000');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
            metadata.tdCls = 'icon-yes-pointer';
        }
        else {
            metadata.tdCls = 'icon-yes-disable';
        }
    }
});
