
Ext.define('Regardz.view.bookingwizard.MeetingItemsShort', {
    extend: 'Ext.grid.Panel',
    itemid: 'meetingitemsshortId',
    alias: 'widget.meetingitemsshort',
    //width: '100%',
    // autoScroll: true,
    //height: 300,
    store: Ext.getStore('bookingwizard.BookingItemsListStepFiveStore'),
    loadMask: true,

    viewConfig: {
        markDirty: false,
        forceFit: true,
        getRowClass: function (record) {
            if (record.data.IsCanceled) {
                return " row-Cancel ";
            }
            else if (record.data.IsRoomRent && record.data.DataType == 1) {
                return " row-rent ";
            }

            switch (record.data.DataType) {
                case 1:
                    return " row-item ";
                    break;
                case 2:
                    return " row-discount ";
                    break;
                case 3:
                    return " row-discount ";
                    break;
            }
            return record.get('Class');
        }
    },
    padding: '10px 0 0 0',
    features: [
            {
                ftype: 'grouping',
                groupHeaderTpl: '{name}'
            }
    ],
    initComponent: function () {
        var me = this;

        me.noResize = true;
        me.frame = true;
        me.loadMask = true;
        me.columns = [
                    { header: "Item".l('SC55000'), dataIndex: 'DisplyItemName', name: 'DisplyItemName', flex: 1 },
					{ header: "Start".l('SC55000'), sortable: true, dataIndex: 'StartTime', width: 80, align: 'center' },
					{ header: "End".l('SC55000'), sortable: true, dataIndex: 'EndTime', width: 80, align: 'center' },
                    {
                        header: "Price".l('SC55000'), sortable: true, align: 'right',
                        style: 'text-align:right', renderer: this.renderPrice, width: 120
                    },
                    { header: "Quantity".l('SC55000'), sortable: true, dataIndex: 'Quantity', width: 80, align: 'center' },
                    { header: "Group name".l('SC55000'), sortable: true, dataIndex: 'groupName', flex: 1 },
                    {
                        header: "Total".l('SC55000'), sortable: true, align: 'right',
                        style: 'text-align:right', renderer: this.renderTotal, width: 120
                    },
                    { dataIndex: 'invoicename', width: 100 }
        ];
        me.callParent();
    },
    renderPrice: function (value, metadata, record, rowIdx, colIndex, store) {
        return Ext.util.Format.number(record.data.Price, '0,000.00');
    },
    renderTotal: function (value, metadata, record, rowIdx, colIndex, store) {
        return Ext.util.Format.number(record.data.Total, '0,000.00');
    }
});