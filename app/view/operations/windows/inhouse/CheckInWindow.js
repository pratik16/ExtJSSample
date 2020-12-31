Ext.define('Regardz.view.operations.windows.inhouse.CheckInWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.inhousecheckinwindow',
    modal: true,
    border: false,
    title: 'Check-In_Title'.l('SC71300'),
    width: 600,
    padding: 10,
    BookingId: 0,
    initComponent: function () {
        var me = this;

        me.itemsGrid = {
            xtype: 'gridpanel',
            border: true,
            width: '100%',
            title: 'Rooms'.l('SC71300'),
            itemid: 'inhouseCheckInGrid',
            noResize: true,
            store: Ext.getStore('operations.InhouseCheckInOutStore'),
            viewConfig: {
                forceFit: true,
                emptyText: 'No records'.l('SC70000')
            },
            columns: [
            { text: 'Name'.l('SC71300'), dataIndex: 'RoomName', flex: 2 },
            { text: 'Start'.l('SC71300'), dataIndex: 'FromTime', flex: 1 },
            { text: 'End'.l('SC71300'), dataIndex: 'ToTime', flex: 1 },
            { text: 'Event name'.l('SC71300'), dataIndex: 'EventName', flex: 2 },
            { text: '', dataIndex: 'CheckInDateTime', width: 25, renderer: this.iconsRenderer }
            ],
            bbar: [{
                xtype: 'pagingtoolbar',
                store: Ext.getStore('operations.InhouseCheckInOutStore'),
                displayInfo: true,
                emptyMsg: "No data to display".l("g")
            }]
        };
        me.items = [me.itemsGrid, {xtype:'textfield',hidden:true,itemid:'inhouseCheckInBookingId',value:me.BookingId}];
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