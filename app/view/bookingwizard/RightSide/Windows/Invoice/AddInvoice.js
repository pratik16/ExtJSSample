Ext.define('Regardz.view.bookingwizard.RightSide.Windows.Invoice.AddInvoice', {
    extend: 'Ext.window.Window',
    alias: 'widget.invoiceaddinvoice',
    modal: true,
    border: false,
    title: 'Create invoice'.l('SC55500'),
    width: 900,
    initComponent: function () {
        var me = this;

        me.invoiceTotalGrid = {
            xtype: 'gridpanel',
            hideHeader: true,
            border: true,
            width: "100%",
            autoScroll: true,
            noResize: true,
            itemid: 'invoiceTotalGrid',
            store: 'bookingwizard.BookingInvoiceItemsTotalStore',
            margin: '10 0 0 0',
            cls: 'hide-column-header',
            columns: [{ dataIndex: 'Description', flex: 8, align: 'right' }, { dataIndex: 'Value', flex: 2, align: 'right', renderer: this.amountRender }, { width: 30}]
        };

        me.leftSide = {
            layout: 'vbox', border: false, frame: false,
            items: [{ xtype: 'combo', allowBlank: false, itemid: 'referenceCombo', store: 'bookingwizard.BookingComboStore', fieldLabel: 'Reference'.l('SC55500'), displayField: 'Description', valueField: 'BookingId', width: '100%'}]
        };

        me.bigPanel = {
            border: false,
            frame: false,
            layout: 'column',
            margin: 10,
            align: top,
            items: [{
                border: false,
                columnWidth: .50,
                margin: '10 10 0 0',
                items: [me.leftSide, { xtype: 'invoiceleftitemlist'}]
            }, {
                border: false,
                columnWidth: .50,
                items: [{ xtype: 'invoicerightitemlist' }, me.invoiceTotalGrid]
            }],
            buttons: [{ text: 'Close'.l('w'), handler: function () { me.close(); } },
                      { text: 'Create'.l('w'), action: 'SaveBookingCreditDebitInvoice'}]
        }
        me.items = [me.bigPanel,
            { xtype: 'hidden', itemid: 'reservationId', value: me.ReservationId }, { xtype: 'hidden', itemid: 'bookingId', value: me.BookingId },
            { xtype: 'hidden', itemid: 'bookingTrackingId', value: me.BookingTrackingId}];
        me.callParent();
    },
    amountRender: function (value, metadata, record, rowIndex, colIndex, store) {
        return Ext.util.Format.number(value, '0.00');
    }
});