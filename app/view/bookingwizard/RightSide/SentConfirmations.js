Ext.define('Regardz.view.bookingwizard.RightSide.SentConfirmations', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sentconfirmations',
    initComponent: function () {
        var panel = Ext.create('Ext.grid.Panel', {
            store: 'bookingwizard.RightSide.BookingConfirmationStore',
            title: 'Confirmations',
            itemid: 'sendconfirmationgrid',
            border: false,
            frame: false,
            noResize: true,
            columns: [{
                text: 'Version'.l('SC50000'),
                dataIndex: 'VersionNo',
                flex: 5
            }, {
                text: 'Date'.l('SC50000'),
                dataIndex: 'CreatedDate',
                flex: 5,
                renderer: this.dateRenderer
            }, {
                text: 'Bookings'.l('SC50000'),
                dataIndex: 'TotalBookings',
                flex: 3
            }, {
                text: 'Details'.l('SC50000'),
                dataIndex: 'PrintBookings',
                flex: 3
            }, {
                renderer: this.uploadIcon,
                width: 30
            }, {
                renderer: this.renderIcon,
                width: 35
                //align: 'left',
                //padding: '0 0 0 5'
            }, { hidden: true, dataIndex: 'BookingConfirmationId' }, { hidden: true, dataIndex: 'ReservationId'}],
            width: '100%'
        });

        var me = this;

        var holder = Ext.create('Ext.Panel', {
            border: false,
            frame: false,
            items: [panel]
        });

        me.items = [holder]
        me.callParent();
    },
    renderIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.css = metadata.css + ' icon-downloadSC';
        var tooltipText = 'Details'.l('SC50000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        //metadata.style = "padding-left: 5px !important; text-align: left";
    },
    uploadIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.css = metadata.css + ' arrow_up';
        var tooltipText = 'Details'.l('SC50000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
    },
    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        var d = Ext.Date.parse(value, 'c');
        return Ext.util.Format.date(d, usr_dateformat);
    }
});