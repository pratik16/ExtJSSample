Ext.namespace("Ext.ux");
Ext.require(['Ext.ux.CheckColumn']);

Ext.define('Regardz.view.company.CompanySMFinancials', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.companysmfinancials',
    id: 'companysmfinancials',
    store: 'company.CompanySalesDetailStore',
    loadMask: true,
    columnLines: false,
    selType: 'rowmodel',
    viewConfig: { forceFit: true },
    requires: ['Ext.ux.form.SearchField'],
    plugins: [Ext.create('Ext.grid.plugin.RowEditing', { clicksToEdit: 1 })],
    title: 'Targets'.l('SC61100'),
    frame: true,
    initComponent: function () {

        var me = this;
        if (Ext.getCmp('companysmfinancials')) {
            Ext.getCmp('companysmfinancials').destroy();
        }

        me.yearCombo = new Ext.form.ComboBox({
            store: Ext.getStore('company.WeightedTargetPercentageStore'),
            valueField: "Year",
            displayField: "Year",
            allowBlank: false,
            emptyText: 'Select Year'.l('SC61100')
        });

        me.noResize = true;
        me.columns =
            [{
                header: 'Year'.l('SC61100'),
                dataIndex: 'Year',
                sortable: true,
                forceSelection: true,
                align: 'center',
                width: 90,
                flex: 1,
                maxLength: 4,
                editor: me.yearCombo
            }, {
                xtype: 'numbercolumn',
                header: 'Target'.l('SC61100'),
                dataIndex: 'Target',
                format: '0.000',
                sortable: true,
                width: 90,
                flex: 1,
                align: 'right',
                renderer: this.formatRender,
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    decimalPrecision: 0,
                    format: '0',
                    minValue: 1,
                    maxValue: 100000
                }
            }, { 
                xtype: 'numbercolumn',
                header: 'Reached'.l('SC61100'),
                dataIndex: 'Reached',
                align: 'center',
                renderer: this.percentRender,
                sortable: true,
                width: 90,
                flex: 1,
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    minValue: 1,
                    maxValue: 100
                }
            }, {
                xtype: 'numbercolumn',
                header: 'Weighted<br/>target'.l('SC61100'),
                dataIndex: 'WTarget',
                sortable: true,
                format: '0.000',
                align: 'right',
                renderer: this.formatRender,
                width: 90,
                flex: 1
            }, {
                xtype: 'numbercolumn',
                header: 'Weighted<br/>target+'.l('SC61100'),
                dataIndex: 'WTargetPlus',
                sortable: true,
                format: '0.000',
                align: 'right',
                renderer: this.formatRender,
                width: 90,
                flex: 1
            }, {
                text: 'Client Target'.l('SC61100'),
                columns: [{
                    xtype: 'numbercolumn',
                    header: 'Q1'.l('SC61100'),
                    dataIndex: 'ClientTargetQ1',
                    format: '0',
                    sortable: true,
                    width: 80,
                    align: 'right',
                    renderer: this.formatRender,
                    flex: 1,
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: true,
                        decimalPrecision: 0,
                        format: '0',
                        minValue: 1,
                        maxValue: 100000
                    }
                }, {
                    xtype: 'numbercolumn',
                    header: 'Q2'.l('SC61100'),
                    dataIndex: 'ClientTargetQ2',
                    format: '0',
                    sortable: true,
                    width: 80,
                    align: 'right',
                    renderer: this.formatRender,
                    flex: 1,
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: true,
                        decimalPrecision: 0,
                        minValue: 1,
                        maxValue: 100000
                    }
                }, {
                    xtype: 'numbercolumn',
                    header: 'Q3'.l('SC61100'),
                    dataIndex: 'ClientTargetQ3',
                    format: '0',
                    sortable: true,
                    width: 80,
                    align: 'right',
                    renderer: this.formatRender,
                    flex: 1,
                    editor: {
                        xtype: 'numberfield',
                        decimalPrecision: 0,
                        allowBlank: true,
                        minValue: 1,
                        maxValue: 100000
                    }
                }, {
                    xtype: 'numbercolumn',
                    header: 'Q4'.l('SC61100'),
                    dataIndex: 'ClientTargetQ4',
                    sortable: true,
                    format: '0.000',
                    align: 'right',
                    renderer: this.formatRender,
                    width: 80,
                    flex: 1
                }]
            }, {
                text: 'New Business Revenue'.l('SC61100'),
                columns: [{
                    xtype: 'numbercolumn',
                    header: 'Q1'.l('SC61100'),
                    dataIndex: 'NewBusinessRevenueQ1',
                    format: '0',
                    sortable: true,
                    width: 80,
                    align: 'right',
                    renderer: this.formatRender,
                    flex: 1,
                    editor: {
                        xtype: 'numberfield',
                        decimalPrecision: 0,
                        allowBlank: true,
                        minValue: 1,
                        maxValue: 100000
                    }
                }, {
                    xtype: 'numbercolumn',
                    header: 'Q2'.l('SC61100'),
                    dataIndex: 'NewBusinessRevenueQ2',
                    format: '0',
                    sortable: true,
                    width: 80,
                    align: 'right',
                    renderer: this.formatRender,
                    flex: 1,
                    editor: {
                        xtype: 'numberfield',
                        decimalPrecision: 0,
                        allowBlank: true,
                        minValue: 1,
                        maxValue: 100000
                    }
                }, {
                    xtype: 'numbercolumn',
                    header: 'Q3'.l('SC61100'),
                    dataIndex: 'NewBusinessRevenueQ3',
                    //format: '0',
                    align: 'right',
                    renderer: this.formatRender,
                    sortable: true,
                    width: 80,
                    flex: 1,
                    editor: {
                        xtype: 'numberfield',
                        decimalPrecision: 0,
                        allowBlank: true,
                        minValue: 1,
                        maxValue: 100000
                    }
                }, {
                    xtype: 'numbercolumn',
                    header: 'Q4'.l('SC61100'),
                    dataIndex: 'NewBusinessRevenueQ4',
                    //format: '0',
                    align: 'right',
                    renderer: this.formatRender,
                    sortable: true,
                    width: 80,
                    flex: 1,
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: true,
                        decimalPrecision: 0,
                        minValue: 1,
                        maxValue: 100000
                    }
                }]
            }, {
                text: 'Deepening Revenue'.l('SC61100'),
                columns: [{
                    xtype: 'numbercolumn',
                    header: 'Q1'.l('SC61100'),
                    dataIndex: 'DeepeningRevenueQ1',
                    //format: '0',
                    renderer: this.formatRender,
                    sortable: true,
                    width: 80,
                    align: 'right',
                    flex: 1,
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: true,
                        decimalPrecision: 0,
                        minValue: 1,
                        maxValue: 100000
                    }
                }, {
                    xtype: 'numbercolumn',
                    header: 'Q2'.l('SC61100'),
                    dataIndex: 'DeepeningRevenueQ2',
                    //format: '0',
                    renderer: this.formatRender,
                    sortable: true,
                    width: 80,
                    align: 'right',
                    flex: 1,
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: true,
                        decimalPrecision: 0,
                        minValue: 1,
                        maxValue: 100000
                    }
                }, {
                    xtype: 'numbercolumn',
                    header: 'Q3'.l('SC61100'),
                    dataIndex: 'DeepeningRevenueQ3',
                    //format: '0',
                    renderer: this.formatRender,
                    sortable: true,
                    align: 'right',
                    width: 80,
                    flex: 1,
                    editor: {
                        xtype: 'numberfield',
                        decimalPrecision: 0,
                        allowBlank: true,
                        minValue: 1,
                        maxValue: 100000
                    }
                }, {
                    xtype: 'numbercolumn',
                    header: 'Q4'.l('SC61100'),
                    dataIndex: 'DeepeningRevenueQ4',
                    //format: '0',
                    renderer: this.formatRender,
                    sortable: true,
                    align: 'right',
                    width: 80,
                    flex: 1,
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: true,
                        decimalPrecision: 0,
                        minValue: 1,
                        maxValue: 100000
                    }
                }, {
                    hidden: true,
                    dataIndex: 'CompanyId',
                    hideable: false
                }, {
                    hidden: true,
                    dataIndex: 'CompanySalesDetailId',
                    hideable: false
                }]
            }];

        me.tbar = [{
            xtype: 'button',
            action: 'addCompanySales',
            iconCls: 'new',
            text: 'Add Financials'.l('SC61100'),
            tooltip: 'Add Financials ToolTip'.l('SC61100')
        }];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: me.store,
            displayInfo: true,
            emptyMsg: "No data to display".l("g")
        };

        me.callParent();
    }, 
    formatRender: function (value, metadata, record, rowIndex, colIndex, store) {
        return Ext.util.Format.number(value, '0.00');
    },
    percentRender: function (value, metadata, record, rowIndex, colIndex, store) {
        return Ext.util.Format.number(value, '0.00 %');
    }
});