Ext.define('Regardz.view.property.MinimumRevenueManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.minimumrevenuemanage',
    title: 'Mimimum Revenue detail_Title'.l('SC31075'),
    modal: true,
    width: parseInt(Ext.getBody().getViewSize().width * (0.60)),
    height: parseInt(Ext.getBody().getViewSize().height * (0.5)),
    loadMask: true,
    selType: 'rowmodel',
    //border: false,
    initComponent: function (record) {
        var me = this;
        if (me.record == null) {
            me.recordType = 'Add';
            var startDate = new Date();
            startDate = Ext.util.Format.date(startDate, 'Y-m-d');
        }
        else {
            me.recordType = 'Edit';
            var startDate = me.record;
            startDate = Ext.util.Format.date(startDate, 'Y-m-d');
        }
        var isDisable = false;
        me.frame = false;
        me.autoScroll = true;
        //me.layout = 'fit'; 
        me.padding = '15 0 0 0';
        me.items = [
            {
                xtype: 'hidden',
                name: 'saveType',
                itemid: 'saveType',
                value: me.recordType
            },
            {
                xtype: 'hidden',
                name: 'OldDate',
                itemid: 'OldDate'
            },
			{
			    xtype: 'datefield',
			    anchor: '100%',
			    fieldLabel: 'Start Date'.l('SC31075'),
			    itemid: 'StartDate',
			    name: 'StartDate',
			    itemid: 'StartDate',
			    format: usr_dateformat,
			    submitFormat: 'Y-m-d',
			    value: startDate,
			    padding: '20 0 0 10'
			},
            {
                xtype: 'grid',
                //noResize: true,
                padding: '0 10 0 10',
                resizable: true,
                // height: me.height - 25,
                layout: 'fit',
                noResize: true,
                frame: false,
                store: Ext.getStore('property.MinimumRevenuManageStore'),
                autoScroll: true,
                itemid: 'minimumrevenumanagegrid',
                title: 'Minimum Revenue Matrix'.l('SC31075'),
                viewConfig: {
                    forceFit: true,
                    markDirty: false
                },
                plugins: [
		            Ext.create('Ext.grid.plugin.CellEditing', {
		                clicksToEdit: 2
		            })
	            ],
                columns: [
                    {
                        dataIndex: 'RoomTypeRevenueBreakdownId',
                        name: 'RoomTypeRevenueBreakdownId',
                        hidden: true
                    }, {
                        dataIndex: 'RoomTypePropertyAssociationID',
                        name: 'RoomTypePropertyAssociationID',
                        hidden: true
                    }, {
                        dataIndex: 'RoomTypeId',
                        name: 'RoomTypeId',
                        hidden: true
                    }, {
                        header: 'Room type'.l('SC31075'),
                        dataIndex: 'RoomTypeName',
                        flex: 1,
                        name: 'RoomTypeName'
                    }, {
                        header: 'BAR A'.l('SC31075'),
                        dataIndex: 'A',
                        name: 'barA',
                        renderer: this.decimalComma,
                        editor: {
                            xtype: 'numberfield',
                            decimalPrecision: 2,
                            allowBlank: false,
                            maxLength: 120,
                            disabled: isDisable
                        }
                    }, {
                        header: 'BAR B'.l('SC31075'),
                        dataIndex: 'B',
                        name: 'barB',
                        renderer: this.decimalComma,
                        editor: {
                            xtype: 'numberfield',
                            decimalPrecision: 2,
                            allowBlank: false,
                            maxLength: 120,
                            disabled: isDisable
                        }
                    }, {
                        header: 'BAR C'.l('SC31075'),
                        dataIndex: 'C',
                        name: 'barC',
                        renderer: this.decimalComma,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            decimalPrecision: 2,
                            maxLength: 120,
                            disabled: isDisable
                        }
                    }, {
                        header: 'BAR D'.l('SC31075'),
                        dataIndex: 'D',
                        name: 'barD',
                        renderer: this.decimalComma,
                        editor: {
                            xtype: 'numberfield',
                            decimalPrecision: 2,
                            allowBlank: false,
                            maxLength: 120,
                            disabled: isDisable
                        }
                    }
				],
                buttons: [
                {
                    text: 'Cancel'.l('w'),
                    action: 'cancel',
                    handler: function () {
                        me.destroy();
                    }
                }, {
                    text: 'Save'.l('w'),
                    action: 'saveMinimumRevenueManage'
                }]
            }
		];

        me.callParent();
    },
    decimalComma: function (value, metadata, record, rowIndex, colIndex, store) {

        return String(value).replace('.', Ext.util.Format.decimalSeparator);
        //    return 1;
    }
});