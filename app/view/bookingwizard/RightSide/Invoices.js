Ext.define('Regardz.view.bookingwizard.RightSide.Invoices', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.invoices',
    initComponent: function () {
        var buttonAddInvoice = Ext.create('Ext.Button', {
            iconCls: 'new',
            width: 20,
            itemid: 'AddInviceRightPanelButton',
            action: 'bnAddInvoice',
            tooltip: 'Add invoice'.l('SC50000')
        });
        var panel = Ext.create('Ext.grid.Panel', {
            store: 'bookingwizard.RightSide.BookingInvoiceStore',
            title: 'Invoices'.l('SC50000'),
            itemid: 'gridInvoices',
            border: false,
            frame: false,
            noResize: true,
            columns: [{
                text: 'Booking'.l('SC50000'),
                dataIndex: 'BookingNumber',
                flex: 1,
                renderer: this.SetBookingNumber
            }, {
                text: 'Number'.l('SC50000'),
                dataIndex: 'AFASInvoiceId',
                flex: 1
            },
            {
                text: 'Date'.l('SC50000'),
                dataIndex: 'CreatedDate',
                flex: 1,
                renderer: this.dateRenderer
            },
            { hidden: true, dataIndex: 'BookingCreditDebitInvoiceId' },
            {
                renderer: this.renderIcon,
                width: 25
            },
            {
                renderer: this.renderIcon2,
                width: 25,
                name: 'downloadItem'
            }],
            width: '100%',
            tbar: [buttonAddInvoice]
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
        metadata.css = metadata.css + ' icon-refresh';
        var tooltipText = 'Refresh'.l('SC50000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
    },
    renderIcon2: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.InvoiceFileName==null || record.data.InvoiceFileName.trim() == "") {
            metadata.css = metadata.css + ' icon-download-disable';
        }
        else {
            metadata.css = metadata.css + ' icon-download';
            var tooltipText = 'Download'.l('SC50000');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        }
    },
    SetBookingNumber: function (value, metadata, record, rowIndex, colIndex, store) {
        return value;
        return store.data.items[rowIndex].data.ReservationId + ':' + store.data.items[rowIndex].data.BookingId;
    },
    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        var d = Ext.Date.parse(value, 'c');
        return Ext.util.Format.date(d, usr_dateformat);
    }
});