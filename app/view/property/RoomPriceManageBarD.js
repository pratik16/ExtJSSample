Ext.define('Regardz.view.property.RoomPriceManageBarD', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.roompricemanagebarD',
    //store: 'property.PropertyRoomPriceManageStore',
    itemid: 'roompricemanagebarD',
    loadMask: true,
    initComponent: function () {
        var me = this;
        me.noResize = true;
        me.layout = "fit";
        me.frame = true;
        var isDisable = false;
        me.store = Ext.create("Regardz.store.property.PropertyRoomPriceManageStore");
        me.viewConfig =
        {
            forceFit: true,
            markDirty: false
        };
        me.autoExpandColumn = 'RoomTypeName';
        me.columnLines = 1;
        me.defaults = {
            width: 150
        };
        me.plugins = [
		    Ext.create('Ext.grid.plugin.CellEditing', {
		        clicksToEdit: 2
		    })
	    ],
        me.columns = [
            {
                header: 'Room type'.l('SC31071'),
                dataIndex: 'RoomTypeName',
                flex: 1
            },
            {
                header: '1 Slots'.l('SC31071'),
                columns: [
                    {
                        header: '',
                        dataIndex: 'M2TS1',
                        renderer: this.SlotOneDateOne,
                        width: 80
                    },
                    {
                        header: '',
                        dataIndex: 'M1TS1',
                        renderer: this.decimalComma,
                        width: 80
                    },
                    {
                        header: '',
                        dataIndex: 'TS1',
                        renderer: this.decimalComma,
                        width: 80,
                        editor: {
                            xtype: 'numberfield',
                            decimalPrecision: 2,
                            allowBlank: false,
                            maxLength: 120,
                            disabled: isDisable
                        }
                    }
                ]
            },
            {
                header: '',
                width: 15
            },
            {
                header: '2 Slots'.l('SC31071'),
                columns: [
                    {
                        header: '',
                        dataIndex: 'M2TS2',
                        renderer: this.decimalComma,
                        width: 80
                    },
                    {
                        header: '',
                        dataIndex: 'M1TS2',
                        renderer: this.decimalComma,
                        width: 80
                    },
                    {
                        header: '',
                        dataIndex: 'TS2',
                        renderer: this.decimalComma,
                        width: 80,
                        editor: {
                            xtype: 'numberfield',
                            decimalPrecision: 2,
                            allowBlank: false,
                            maxLength: 120,
                            disabled: isDisable
                        }
                    }
                ]
            },
            {
                header: '',
                width: 15
            },
            {
                header: '3 Slots'.l('SC31071'),
                columns: [
                    {
                        header: '',
                        dataIndex: 'M2TS3',
                        renderer: this.decimalComma,
                        width: 80
                    },
                    {
                        header: '',
                        dataIndex: 'M1TS3',
                        renderer: this.decimalComma,
                        width: 80
                    },
                    {
                        header: '',
                        dataIndex: 'TS3',
                        renderer: this.decimalComma,
                        width: 80,
                        editor: {
                            xtype: 'numberfield',
                            decimalPrecision: 2,
                            allowBlank: false,
                            maxLength: 120,
                            disabled: isDisable
                        }
                    }
                ]
            }
		];
        me.callParent(arguments);
    },

    decimalComma: function (value, metadata, record, rowIndex, colIndex, store) {

        return String(value).replace('.', Ext.util.Format.decimalSeparator);
        //    return 1;
    },

    SlotOneDateOne: function (value, metadata, record, rowIndex, colIndex, store) {
        if (this.getView().getHeaderAtIndex(1).text == '' && record.data.M2StartDate != null) {
            var startDate = Ext.util.Format.date(record.data.M2StartDate, usr_dateformat);
            this.getView().getHeaderAtIndex(1).setText(startDate);
            this.getView().getHeaderAtIndex(5).setText(startDate);
            this.getView().getHeaderAtIndex(9).setText(startDate);
        }
        if (this.getView().getHeaderAtIndex(2).text == '' && record.data.M1StartDate != null) {
            var startDate = Ext.util.Format.date(record.data.M1StartDate, usr_dateformat);
            this.getView().getHeaderAtIndex(2).setText(startDate);
            this.getView().getHeaderAtIndex(6).setText(startDate);
            this.getView().getHeaderAtIndex(10).setText(startDate);
        }
        if (this.getView().getHeaderAtIndex(3).text == '' && record.data.StartDate != null) {
            var startDate = Ext.util.Format.date(record.data.StartDate, usr_dateformat);
            this.getView().getHeaderAtIndex(3).setText(startDate);
            this.getView().getHeaderAtIndex(7).setText(startDate);
            this.getView().getHeaderAtIndex(11).setText(startDate);
        }

        return String(value).replace('.', Ext.util.Format.decimalSeparator);

        // return value;
    }
})