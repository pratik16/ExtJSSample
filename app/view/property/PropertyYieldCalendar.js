Ext.define('Regardz.view.property.PropertyYieldCalendar', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.propertyyieldcalendar',
    store: 'property.YieldCalendarStore',
    itemId: 'propertyyieldcalendar',
    loadMask: true,
    initComponent: function () {
        var me = this;


        var currentYear = Ext.util.Format.date(new Date(), 'Y');


        var arrYear = new Array();
        for (i = -1; i <= 6; i++) {
            arrYear.push([parseInt(currentYear) - i, parseInt(currentYear) - i]);
        }

        me.yearCombo = new Ext.data.SimpleStore({
            fields: ['Year', 'Year'],
            data: arrYear
        });

        var columnWidth = 200;

        var month = Ext.util.Format.date(new Date());


        me.monthCombo = new Ext.data.SimpleStore({
            fields: ["Month", "MonthName"],
            data: [
			[1, "January".l('g')],
			[2, "February".l('g')],
			[3, "March".l('g')],
			[4, "April".l('g')],
            [5, "May".l('g')],
            [6, "June".l('g')],
            [7, "July".l('g')],
            [8, "August".l('g')],
            [9, "September".l('g')],
            [10, "October".l('g')],
            [11, "November".l('g')],
            [12, "December".l('g')],
            ]
        });


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


        me.noResize = true;
        me.layout = "fit";
        me.frame = true;
        var isDisable = false;
        me.viewConfig =
        {
            forceFit: true,
            markDirty: false
        };
        me.autoExpandColumn = 'RoomTypeName';
        me.columnLines = 1;
        me.padding = 20;
        me.defaults = {
            width: 100
        };
        me.selType = 'cellmodel';
        me.plugins = [
		    Ext.create('Ext.grid.plugin.CellEditing', {
		        clicksToEdit: 2
		    })
	    ];

        me.tbar = [{
            xtype: 'button',
            iconCls: 'new',
            text: '',
            width: 25,
            tooltip: 'Add a new year'.l('SC31100'),
            margin: 0,
            action: 'ImportYearlyYeildDetailData'
        }, {
            xtype: 'button',
            iconCls: 'setBar_yield',
            text: '',
            width: 25,
            tooltip: 'Set bar'.l('SC31100'),
            margin: 0,
            action: 'addBarForYield'
        }, {
            xtype: 'combo',
            name: 'Year',
            itemId: 'yearCombo',
            fieldLabel: 'Year'.l('SC31100'),
            forceSelection: true,
            labelAlign: 'right',
            labelWidth: 75,
            displayField: 'Year',
            valueField: 'Year',
            selectOnFocus: true,
            store: me.yearCombo,
            margin: 0,
            width: 150
        }, {
            xtype: 'combo',
            name: 'Month',
            itemId: 'monthCombo',
            fieldLabel: 'Month'.l('SC31100'),
            forceSelection: true,
            labelAlign: 'right',
            labelWidth: 75,
            displayField: 'MonthName',
            margin: 0,
            valueField: 'Month',
            store: me.monthCombo,
            width: 150
        }, '->', {
            xtype: 'label',
            text: 'Exceptions'.l('SC31100') + ':',
            width: 80,
            margin: 0

        }, {
            xtype: 'combo',
            name: 'RoomTypeId',
            displayField: 'RoomTypeName',
            forceSelection: true,
            valueField: 'RoomTypeId',
            fieldLabel: 'Room type'.l('SC31100'),
            margin: 0,
            anchor: '100%',
            itemId: 'roomType',
            labelAlign: 'right',
            labelWidth: 75,
            store: Ext.getStore('property.RoomTypeComboStore'),
            width: 175
        }, {
            xtype: 'combo',
            name: 'RoomId',
            labelAlign: 'right',
            forceSelection: true,
            labelWidth: 75,
            fieldLabel: 'Room'.l('SC31100'),
            emptyText: '('+'empty'.l('SC31100')+')',
            displayField: 'RoomName',
            itemId: 'roomList',
            valueField: 'RoomId',
            margin: 0,
            disabled: true,
            store: Ext.getStore('property.RoomListComboStore'),
            width: 150
        }];

        me.columns = [
            {
                header: 'Weekday'.l('SC31100'),
                sortable: false,
                dataIndex: 'WeekDayNo',
                renderer: this.weekDay,
                width: 100
            },
            {
                header: 'Dates'.l('SC31100'),
                columns: [
                    {
                        ///header: '',
                        dataIndex: 'SecPrevYearDate',
                        align: 'center',
                        width: 50
                    },
                    {
                        //header: '',
                        dataIndex: 'PrevYearDate',
                        align: 'center',
                        width: 50
                    },
                    {
                        //header: '',
                        dataIndex: 'CurrentDate',
                        renderer: this.CustomiseYieldCalendar,
                        align: 'center',
                        width: 50
                    }
                ]
            },
            {
                width: 15
            },
            {
                header: 'Slot 1'.l('SC31100'),
                columns: [
                    {
                        //header: '',
                        dataIndex: 'SecPrevYearSlot1Bar',
                        renderer: this.barRendering,
                        name: 'OpenException',
                        align: 'center',
                        width: 50
                    },
                    {
                        //header: '',
                        dataIndex: 'PrevYearSlot1Bar',
                        renderer: this.barRendering,
                        name: 'OpenException',
                        align: 'center',
                        width: 50
                    },
                    {
                        //header: '',
                        dataIndex: 'CurrentYearSlot1Bar',
                        renderer: this.barRendering,
                        name: 'OpenException',
                        align: 'center',
                        width: 50,
                        editor: {
                            xtype: 'combo',
                            itemId: 'barCombo',
                            width: 49,
                            name: 'BarName',
                            displayField: 'BarName',
                            valueField: 'BarId',
                            store: me.slotCombo
                        }
                    }
                ]
            },
            {
                width: 15
            },
            {
                header: 'Slot 2'.l('SC31100'),
                columns: [
                    {
                        //header: '',
                        dataIndex: 'SecPrevYearSlot2Bar',
                        renderer: this.barRendering,
                        name: 'OpenException',
                        align: 'center',
                        width: 50
                    },
                    {
                        //header: '',
                        dataIndex: 'PrevYearSlot2Bar',
                        renderer: this.barRendering,
                        name: 'OpenException',
                        align: 'center',
                        width: 50
                    },
                    {
                        //header: '',
                        dataIndex: 'CurrentYearSlot2Bar',
                        renderer: this.barRendering,
                        name: 'OpenException',
                        width: 50,
                        align: 'center',
                        editor: {
                            xtype: 'combo',
                            itemId: 'barCombo',
                            width: '100%',
                            name: 'BarName',
                            displayField: 'BarName',
                            valueField: 'BarId',
                            store: me.slotCombo
                        }
                    }
                ]
            },
            {
                width: 15
            },
            {
                header: 'Slot 3'.l('SC31100'),
                columns: [
                    {
                        //header: '',
                        dataIndex: 'SecPrevYearSlot3Bar',
                        renderer: this.barRendering,
                        name: 'OpenException',
                        align: 'center',
                        width: 50
                    }, {
                        //header: '',
                        dataIndex: 'PrevYearSlot3Bar',
                        renderer: this.barRendering,
                        name: 'OpenException',
                        align: 'center',
                        width: 50
                    }, {
                        //header: '',
                        dataIndex: 'CurrentYearSlot3Bar',
                        renderer: this.barRendering,
                        name: 'OpenException',
                        align: 'center',
                        width: 50,
                        editor: {
                            xtype: 'combo',
                            itemId: 'barCombo',
                            width: '100%',
                            name: 'BarName',
                            displayField: 'BarName',
                            valueField: 'BarId',
                            store: me.slotCombo
                        }
                    }
                ]
            }, {
                hidden: true,
                dataIndex: 'CurrentFullDate'
            }];
        me.callParent(arguments);
    },

    barRendering: function (value, metadata, record, rowIdx, colIndex, store) {
      
        var selectedCurYear = Ext.ComponentQuery.query('combo[itemId=yearCombo]')[0].getValue();
        var prevYear = selectedCurYear - 1;
        var secPreYear = prevYear - 1;

        var currentYearInRec = Ext.util.Format.date(record.data.CurrentFullDate, 'Y');

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


        if (record.data.CurrentYearSlot1IsExemption == true && (colIndex == 7 || (colIndex == 6 && selectedCurYear == prevYear) || (colIndex == 5 && selectedCurYear == secPreYear))) {
            console.log(colIndex);
            console.log(record);
            var properytID = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
            return '<div style="vertical-align: middle;" >' + value + '<img src="public/icons/exceptions_yield.png" onclick="getExemptionDetailYield(\'' + record.data.CurrentFullDate + '\',\'' + record.data.PrevYearFullDate + '\',\'' + record.data.SecPrevYearFullDate + '\',' + colIndex + ',' + properytID + ',\'' + value + '\')" style="cursor:pointer; margin-left: 4px; position: absolute;"></div>';
        }
        else if (record.data.CurrentYearSlot2IsExemption == true && (colIndex == 11 || (colIndex == 10 && selectedCurYear == prevYear) || (colIndex == 9 && selectedCurYear == secPreYear))) {
            console.log(colIndex);
            console.log(record);
            var properytID = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
            return '<div style="vertical-align: middle;" >' + value + '<img src="public/icons/exceptions_yield.png" onclick="getExemptionDetailYield(\'' + record.data.CurrentFullDate + '\',\'' + record.data.PrevYearFullDate + '\',\'' + record.data.SecPrevYearFullDate + '\',' + colIndex + ',' + properytID + ',\'' + value + '\')" style="cursor:pointer; margin-left: 4px; position: absolute;"></div>';
        }
        else if (record.data.CurrentYearSlot3IsExemption == true && (colIndex == 15 || (colIndex == 14 && selectedCurYear == prevYear) || (colIndex == 13 && selectedCurYear == secPreYear))) {
            console.log(colIndex);
            console.log(record);
            var properytID = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
            return '<div style="vertical-align: middle;" >' + value + '<img src="public/icons/exceptions_yield.png" onclick="getExemptionDetailYield(\'' + record.data.CurrentFullDate + '\',\'' + record.data.PrevYearFullDate + '\',\'' + record.data.SecPrevYearFullDate + '\',' + colIndex + ',' + properytID + ',\'' + value + '\')" style="cursor:pointer; margin-left: 4px; position: absolute;"></div>';
        }
        else if (record.data.PrevYearSlot1IsExemption == true && (colIndex == 6 || (colIndex == 5 && selectedCurYear == prevYear) || (colIndex == 4 && selectedCurYear == secPreYear))) {
            console.log(colIndex);
            console.log(record);
            var properytID = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
            return '<div style="vertical-align: middle;" >' + value + '<img src="public/icons/exceptions_yield.png" onclick="getExemptionDetailYield(\'' + record.data.CurrentFullDate + '\',\'' + record.data.PrevYearFullDate + '\',\'' + record.data.SecPrevYearFullDate + '\',' + colIndex + ',' + properytID + ',\'' + value + '\')" style="cursor:pointer; margin-left: 4px; position: absolute;"></div>';
        }
        else if (record.data.PrevYearSlot2IsExemption == true && (colIndex == 10 || (colIndex == 9 && selectedCurYear == prevYear) || (colIndex == 8 && selectedCurYear == secPreYear))) {
            console.log(colIndex);
            console.log(record);
            var properytID = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
            return '<div style="vertical-align: middle;" >' + value + '<img src="public/icons/exceptions_yield.png" onclick="getExemptionDetailYield(\'' + record.data.CurrentFullDate + '\',\'' + record.data.PrevYearFullDate + '\',\'' + record.data.SecPrevYearFullDate + '\',' + colIndex + ',' + properytID + ',\'' + value + '\')" style="cursor:pointer; margin-left: 4px; position: absolute;"></div>';
        }
        else if (record.data.PrevYearSlot3IsExemption == true && (colIndex == 14 || (colIndex == 13 && selectedCurYear == prevYear) || (colIndex == 12 && selectedCurYear == secPreYear))) {
            var properytID = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
            return '<div style="vertical-align: middle;" >' + value + '<img src="public/icons/exceptions_yield.png" onclick="getExemptionDetailYield(\'' + record.data.CurrentFullDate + '\',\'' + record.data.PrevYearFullDate + '\',\'' + record.data.SecPrevYearFullDate + '\',' + colIndex + ',' + properytID + ',\'' + value + '\')" style="cursor:pointer; margin-left: 4px; position: absolute;"></div>';
        }
        else if (record.data.SecYearSlot1IsExemption == true && (colIndex == 5 || (colIndex == 4 && selectedCurYear == prevYear) || (colIndex == 3 && selectedCurYear == secPreYear))) {
            console.log(colIndex);
            console.log(record);
            var properytID = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
            return '<div style="vertical-align: middle;" >' + value + '<img src="public/icons/exceptions_yield.png" onclick="getExemptionDetailYield(\'' + record.data.CurrentFullDate + '\',\'' + record.data.PrevYearFullDate + '\',\'' + record.data.SecPrevYearFullDate + '\',' + colIndex + ',' + properytID + ',\'' + value + '\')" style="cursor:pointer; margin-left: 4px; position: absolute;"></div>';
        }
        else if (record.data.SecYearSlot2IsExemption == true && (colIndex == 9 || (colIndex == 8 && selectedCurYear == prevYear) || (colIndex == 7 && selectedCurYear == secPreYear))) {
            var properytID = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
            return '<div style="vertical-align: middle;" >' + value + '<img src="public/icons/exceptions_yield.png" onclick="getExemptionDetailYield(\'' + record.data.CurrentFullDate + '\',\'' + record.data.PrevYearFullDate + '\',\'' + record.data.SecPrevYearFullDate + '\',' + colIndex + ',' + properytID + ',\'' + value + '\')" style="cursor:pointer; margin-left: 4px; position: absolute;"></div>';
        }
        else if (record.data.SecYearSlot3IsExemption == true && (colIndex == 13 || (colIndex == 12 && selectedCurYear == prevYear) || (colIndex == 11 && selectedCurYear == secPreYear))) {
            console.log(colIndex);
            console.log(record);
            var properytID = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
            return '<div style="vertical-align: middle;" >' + value + '<img src="public/icons/exceptions_yield.png" onclick="getExemptionDetailYield(\'' + record.data.CurrentFullDate + '\',\'' + record.data.PrevYearFullDate + '\',\'' + record.data.SecPrevYearFullDate + '\',' + colIndex + ',' + properytID + ',\'' + value + '\')" style="cursor:pointer; margin-left: 4px; position: absolute;"></div>';
        }

        return value;
    },

    CustomiseYieldCalendar: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.IsHoliday == 1) {
            metadata.tdCls = 'yield_Holiday';
            var tooltipText = record.data.HolidayName;
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        }
        return value;
    },
    weekDay: function (value, metadata, record, rowIndex, colIndex, store) {
        var dayName = '';
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
    }
})