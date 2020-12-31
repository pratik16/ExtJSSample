Ext.define('Regardz.view.property.PropertyYieldTemplate', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.propertyyieldtemplate',
    itemId: 'propertyyieldtemplate',
    loadMask: true,
    layout: 'hbox',
    viewConfig: {
        forceFit: true
    },
    padding: '10',
    initComponent: function () {

        var me = this;

        me.slotCombo = new Ext.data.SimpleStore({
            fields: ["BarName", "BarId"],
            data: [
			['A', 'A'],
			['B', 'B'],
			['C', 'C'],
			['D', 'D'],
            ['X', 'X']
            ]
        });

        me.YieldTemplateWeek1to18 = {
            xtype: 'grid',
            title: 'Yield template: Week 1 - 18'.l('SC31100'),
            store: Ext.getStore('property.YieldTemplateStore1'),
            plugins: [
		    Ext.create('Ext.grid.plugin.CellEditing', {
		        clicksToEdit: 2
		    })],
            itemId: 'YieldTemplateWeek1to18',
            viewConfig: {
                markDirty: false,
                forceFit: true,
                stripeRows: false
            },
            height: parseInt(Ext.getBody().getViewSize().height * (0.83)),
            noResize: true,
            columnLines: 1,
            cls: 'grid-row-span',
            selType: 'cellmodel',
            frame: true,
            columns: [{
                header: 'Weeks'.l('SC31100'),
                sortable: false,
                dataIndex: 'WeekNo',
                align: 'center',
                flex: 1,
                renderer: this.rawSpan
            }, {
                header: 'Weekday'.l('SC31100'),
                sortable: false,
                dataIndex: 'Day',
                align: 'center',
                flex: 1,
                renderer: this.weekDay
            }, {
                header: 'Slot 1'.l('SC31100'),
                sortable: false,
                dataIndex: 'Slot1Bar',
                align: 'center',
                flex: 1,
                renderer: this.barRendering,
                editor: {
                    xtype: 'combo',
                    itemId: 'barTempCombo',
                    width: '100%',
                    name: 'BarName',
                    displayField: 'BarName',
                    valueField: 'BarId',
                    store: me.slotCombo
                }
            }, {
                header: 'Slot 2'.l('SC31100'),
                sortable: false,
                dataIndex: 'Slot2Bar',
                align: 'center',
                flex: 1,
                renderer: this.barRendering,
                editor: {
                    xtype: 'combo',
                    itemId: 'barTempCombo',
                    width: '100%',
                    name: 'BarName',
                    displayField: 'BarName',
                    valueField: 'BarId',
                    store: me.slotCombo
                }
            }, {
                header: 'Slot 3'.l('SC31100'),
                sortable: false,
                dataIndex: 'Slot3Bar',
                align: 'center',
                flex: 1,
                renderer: this.barRendering,
                editor: {
                    xtype: 'combo',
                    itemId: 'barTempCombo',
                    width: '100%',
                    name: 'BarName',
                    displayField: 'BarName',
                    valueField: 'BarId',
                    store: me.slotCombo
                }
            }]
        };

        me.YieldTemplateWeek19to36 = {
            xtype: 'grid',
            title: 'Yield template: Week 19 - 36'.l('SC31100'),
            store: Ext.getStore('property.YieldTemplateStore2'),
            plugins: [
		    Ext.create('Ext.grid.plugin.CellEditing', {
		        clicksToEdit: 2
		    })],
            itemId: 'YieldTemplateWeek19to36',
            viewConfig: {
                markDirty: false,
                forceFit: true,
                stripeRows: false
            },
            height: parseInt(Ext.getBody().getViewSize().height * (0.83)),
            noResize: true,
            columnLines: 1,
            selType: 'cellmodel',
            cls: 'grid-row-span',
            frame: true,
            columns: [{
                header: 'Weeks'.l('SC31100'),
                sortable: false,
                dataIndex: 'WeekNo',
                align: 'center',
                flex: 1,
                renderer: this.rawSpan
            }, {
                header: 'Weekday'.l('SC31100'),
                sortable: false,
                dataIndex: 'Day',
                align: 'center',
                flex: 1,
                renderer: this.weekDay
            }, {
                header: 'Slot 1'.l('SC31100'),
                sortable: false,
                dataIndex: 'Slot1Bar',
                align: 'center',
                flex: 1,
                renderer: this.barRendering,
                editor: {
                    xtype: 'combo',
                    itemId: 'barTempCombo',
                    width: '100%',
                    name: 'BarName',
                    displayField: 'BarName',
                    valueField: 'BarId',
                    store: me.slotCombo
                }
            }, {
                header: 'Slot 2'.l('SC31100'),
                sortable: false,
                dataIndex: 'Slot2Bar',
                align: 'center',
                flex: 1,
                renderer: this.barRendering,
                editor: {
                    xtype: 'combo',
                    itemId: 'barTempCombo',
                    width: '100%',
                    name: 'BarName',
                    displayField: 'BarName',
                    valueField: 'BarId',
                    store: me.slotCombo
                }
            }, {
                header: 'Slot 3'.l('SC31100'),
                sortable: false,
                dataIndex: 'Slot3Bar',
                align: 'center',
                flex: 1,
                renderer: me.barRendering,
                editor: {
                    xtype: 'combo',
                    itemId: 'barTempCombo',
                    width: '100%',
                    name: 'BarName',
                    displayField: 'BarName',
                    valueField: 'BarId',
                    store: me.slotCombo
                }
            }]
        };

        me.YieldTemplateWeek37to53 = {
            xtype: 'grid',
            title: 'Yield template: Week 37 - 53'.l('SC31100'),
            store: Ext.getStore('property.YieldTemplateStore3'),
            plugins: [
		    Ext.create('Ext.grid.plugin.CellEditing', {
		        clicksToEdit: 2
		    })],
            itemId: 'YieldTemplateWeek37to53',
            viewConfig: {
                markDirty: false,
                forceFit: true,
                stripeRows: false
            },
            height: parseInt(Ext.getBody().getViewSize().height * (0.83)),
            noResize: true,
            columnLines: 1,
            cls: 'grid-row-span',
            selType: 'cellmodel',
            frame: true,
            columns: [{
                header: 'Weeks'.l('SC31100'),
                sortable: false,
                dataIndex: 'WeekNo',
                align: 'center',
                flex: 1,
                renderer: this.rawSpan
            }, {
                header: 'Weekday'.l('SC31100'),
                sortable: false,
                dataIndex: 'Day',
                align: 'center',
                flex: 1,
                renderer: this.weekDay
            }, {
                header: 'Slot 1'.l('SC31100'),
                sortable: false,
                dataIndex: 'Slot1Bar',
                align: 'center',
                flex: 1,
                renderer: this.barRendering,
                editor: {
                    xtype: 'combo',
                    itemId: 'barTempCombo',
                    width: '100%',
                    name: 'BarName',
                    displayField: 'BarName',
                    valueField: 'BarId',
                    store: me.slotCombo
                }
            }, {
                header: 'Slot 2'.l('SC31100'),
                sortable: false,
                dataIndex: 'Slot2Bar',
                align: 'center',
                flex: 1,
                renderer: this.barRendering,
                editor: {
                    xtype: 'combo',
                    itemId: 'barTempCombo',
                    width: '100%',
                    name: 'BarName',
                    displayField: 'BarName',
                    valueField: 'BarId',
                    store: me.slotCombo
                }
            }, {
                header: 'Slot 3'.l('SC31100'),
                sortable: false,
                dataIndex: 'Slot3Bar',
                align: 'center',
                flex: 1,
                renderer: this.barRendering,
                editor: {
                    xtype: 'combo',
                    itemId: 'barTempCombo',
                    width: '100%',
                    name: 'BarName',
                    displayField: 'BarName',
                    valueField: 'BarId',
                    store: me.slotCombo
                }
            }]
        };

        me.items = [{
            frame: false,
            items: [me.YieldTemplateWeek1to18],
            padding: '0 5 0 0',
            width: '33%'
        }, {
            frame: false,
            items: [me.YieldTemplateWeek19to36],
            padding: '0 5 0 5',
            width: '33%'
        }, {
            frame: false,
            items: [me.YieldTemplateWeek37to53],
            padding: '0 0 0 5',
            width: '33%'
        }];

        me.callParent(arguments);
    },
    barRendering: function (value, metadata, record, rowIdx, colIndex, store) {

        if (value == null)
            return value = '';

        if (value == 'A')
            metadata.tdCls = 'yield_BarA';
        else if (value == 'B')
            metadata.tdCls = 'yield_BarB';
        else if (value == 'C')
            metadata.tdCls = 'yield_BarC';
        else if (value == 'D')
            metadata.tdCls = 'yield_BarD';
        else
            metadata.tdCls = 'yield_BarX';
        return value;
    },
    weekDay: function (value, metadata, record, rowIndex, colIndex, store) {
        var dayName = '';

        if (rowIndex % 2 == 0) {
            metadata.tdCls = 'gt_grid_day';
        }


        if (value == 1) {
            dayName = "Monday".l('g');
        }
        if (value == 2) {
            dayName = "Tuesday".l('g');
        }
        if (value == 3) {
            dayName = "Wednesday".l('g');
        }
        else if (value == 4) {
            dayName = "Thursday".l('g');
        }
        else if (value == 5) {
            dayName = "Friday".l('g');
        }
        else if (value == 6) {
            dayName = "Saturday".l('g');
        }
        else if (value == 7) {
            dayName = "Sunday".l('g');
        }
        return dayName;
    },
    rawSpan: function (value, meta, record, rowIndex, colIndex, store) {

        var first = !rowIndex || value !== store.getAt(rowIndex - 1).get('WeekNo'),
                        last = rowIndex >= store.getCount() - 1 || value !== store.getAt(rowIndex + 1).get('WeekNo');
        meta.tdCls += 'row-span' + (first ? ' row-span-first' : '') + (last ? ' row-span-last' : '');

        if (first) {
            var i = rowIndex + 1;
            while (i < store.getCount() && value === store.getAt(i).get('WeekNo')) {
                i++;
            }
            var rowHeight = 20, padding = 6,
                            height = (rowHeight * (i - rowIndex) - padding) + 'px';
            meta.attr = 'style="height:' + height + ';line-height:' + height + ';"';
        }

        if (record.data.Day == 4) {
            return value;
        }
        else {
            return '';
        }
    }
});