Ext.define('Regardz.view.bookingwizard.RightSide.Windows.CompanyContract.FixedRoomPriceWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.fixedroompricewindow',
    modal: true,
    border: false,
    title: 'FixedRoomPriceWindow_Title_Window'.l('SC50300'),
    iconCls: 'contract',
    width: '40%',
    companyName: null,
    initComponent: function () {

        var me = this;
        me.itemid = 'fixedroompriceitems';
        me.PropertyId = me.propertyId;
        me.width = '40%';

        me.fixedRoomPriceDetails = Ext.create('Ext.grid.Panel', {
            store: 'bookingwizard.RightSide.Windows.CompanyContract.FixedRoomPriceStore',
            itemid: "fixedRoomPriceGrid",
            title: "FixedRoomPriceWindow_Title".l("SC50300"),
            height: 200,
            width: '96%',
            margin: '10',
            noResize: true,
            columns: [
                { baseCls: '', header: 'RoomTypeName'.l('SC50300'), dataIndex: 'RoomTypeName', flex: 1, align: 'left' },
                { baseCls: '', header: 'Slot1'.l('SC50300'), dataIndex: 'PriceSlot1', flex: 1, renderer: this.renderFormat, align: 'right' },
                { baseCls: '', header: 'Slot2'.l('SC50300'), dataIndex: 'PriceSlot2', flex: 1, renderer: this.renderFormat, align: 'right' },
                { baseCls: '', header: 'Slot3'.l('SC50300'), dataIndex: 'PriceSlot3', flex: 1, renderer: this.renderFormat, align: 'right' }
            ]
        });

        me.items = [me.fixedRoomPriceDetails];

        me.dockedItems = [{
            dock: 'bottom',
            buttonAlign: 'right',
            buttons: [
                {
                    text: 'Close'.l('w'),
                    handler: function () {
                        me.destroy();
                    }
                }
            ]
        }];
        me.callParent(arguments);
    },
    renderFormat: function (value, metadata, record, rowIndex, colIndex, store) {
        return Ext.util.Format.number(value, '0,000.00'); ;
    }
});