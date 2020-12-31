Ext.define('Regardz.view.operations.DirectSales', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.directsales',
    modal: true,
    autoShow: true,
    border: false,
    title: 'DirectSale_Title_SCCODE'.l('SC74000'),
    frame: false,
    itemid: 'directSalesPanel',
    initComponent: function () {
        var me = this;

        me.comboCashRegister = {
            xtype: 'combo',
            width: 200,
            margin: '0 10 0 0',
            itemid: 'CashRegisterCombo',
            displayField: 'CashRegisterName',
            valueField: 'CashRegisterId',
            store: 'property.CashRegisterStore',
            emptyText: 'Select Cash Register'.l('SC74000'),
            allowBlank: true
        };

        me.comboPaymentMethod = {
            xtype: 'combo',
            width: 200,
            itemid: 'PaymentMethodCombo',
            displayField: 'Name',
            valueField: 'CcardTypeId',
            store: 'mastervalues.CcardTypeStore',
            allowBlank: true,
            emptyText: 'Select Payment Method'.l('SC74000')
        };

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
            items: [{ xtype: 'combo', allowBlank: false, itemid: 'referenceCombo', emptyText: 'Select Property'.l('SC74000'), action: 'DSPropertyChange', store: 'property.PropertyListByUserIdStore', fieldLabel: 'Property'.l('SC74000'), displayField: 'PropertyName', valueField: 'PropertyId', width: '100%'}]
        };

        me.bigPanel = {
            border: false,
            frame: false,
            xtype: 'form',
            itemid: 'directsalesform',
            layout: 'column',
            margin: 10,
            align: top,
            items: [{
                border: false,
                columnWidth: .50,
                margin: '5 10 0 0',
                items: [me.leftSide, { xtype: 'directsalesleftitemlist', margin: '10 0 0 0'}]
            }, {
                border: false,
                columnWidth: .50,
                items: [{ xtype: 'directsalesrightitemlist', margin: '42 0 0 0' }, me.invoiceTotalGrid,
                        {
                            padding: '10 0 0 0',
                            border: false,
                            layout: 'hbox',
                            items: [me.comboCashRegister, me.comboPaymentMethod, 
                            {
                                xtype: 'button',
                                text: 'Sale'.l('SC74000'),
                                margin: '0 0 0 10',
                                width: 100,
                                itemid: 'SaveDirectSalesId',
                                action: 'SaveDirectSales'
                            }]
                        }]
            }]
            //buttons: [{ text: 'Sale'.l('SC74000'), action: 'SaveDirectSales'}]
        }
        me.items = [me.bigPanel];
        me.callParent();
    },
    amountRender: function (value, metadata, record, rowIndex, colIndex, store) {
        return Ext.util.Format.number(value, '0.00');
    }
});