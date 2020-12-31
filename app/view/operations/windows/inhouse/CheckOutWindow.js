Ext.define('Regardz.view.operations.windows.inhouse.CheckOutWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.inhousecheckoutwindow',
    modal: true,
    border: false,
    title: 'Check-Out_Title'.l('SC71400'),
    width: 600,
    padding: 10,
    BookingId: 0,
    initComponent: function () {
        var me = this;


        me.itemsGrid = {
            xtype: 'gridpanel',
            border: true,
            width: '100%',
            title: 'Rooms'.l('SC71400'),
            itemid: 'inhouseCheckOutGrid',
             noResize: true,
            store: Ext.getStore('operations.InhouseCheckInOutStore'),
            viewConfig: {
                forceFit: true,
                emptyText: 'No records'.l('SC71400')
            },
            columns: [
            { text: 'Name'.l('SC71400'), dataIndex: 'RoomName', flex: 2 },
            { text: 'Start'.l('SC71400'), dataIndex: 'FromTime', flex: 1 },
            { text: 'End'.l('SC71400'), dataIndex: 'ToTime', flex: 1 },
            { text: 'Event name'.l('SC71400'), dataIndex: 'EventName', flex: 2 },
            { text: '', dataIndex: 'CheckOutDateTime', width: 25, renderer: this.iconsRenderer }
            ],
            bbar: [{
                xtype: 'pagingtoolbar',
                store: Ext.getStore('operations.InhouseCheckInOutStore'),
                displayInfo: true,
                emptyMsg: "No data to display".l("g")
            }]
        };
        me.items = [me.itemsGrid, { xtype: 'textfield', hidden: true, itemid: 'inhouseCheckOutBookingId', value: me.BookingId }];
        me.buttons = [
            {
                text: 'Close'.l('g'),
                handler: function () {
                    me.close();
                }
            }];
        me.callParent();
    },
    iconsRenderer: function (value, metaData, record, row, col, store, gridView) {
        if (!Utils.isValid(value)) {
            metaData.css = metaData.css + ' icon-approve ';
        }


    }
});