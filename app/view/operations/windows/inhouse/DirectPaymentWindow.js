Ext.define('Regardz.view.operations.windows.inhouse.DirectPaymentWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.directpaymentwindow',
    modal: true,
    border: false,
    title: 'Direct Payment_Title'.l('SC71500'),
    width: parseInt(Ext.getBody().getViewSize().width * (0.8)),
    y: 0,
    padding: 10,
    localObject: {},
    ReservationId: 0,
    BookingId: 0,
    initComponent: function () {
        var me = this;

        me.PaymentProofSection = {
            xtype: 'panel',
            itemid: 'paymentProofSection',
            border: false,
            bodyStyle: 'background: none',
            layout: 'vbox',
            width: 300,
            margin: '10',
            align: top,
            items: [
            {
                xtype: 'numberfield',
                decimalPrecision: 2,
                width: 300,
                labelWidth: 150,
                itemid: 'amountPF',
                fieldLabel: 'Amount'.l('SC71500'),
                selectOnFocus: true
            }, {
                layout: 'hbox',
                border: false,
                items: [{ xtype: 'tbspacer', width: 150 },
                {
                    xtype: 'button',
                    align: 'right',
                    text: 'Process'.l('SC71500'),
                    action: 'afasPaymentProof'
                }]
            }]
        };

        me.DownPaymentSection = {
            xtype: 'panel',
            disabled: true,
            itemid: 'downPaymentSection',
            border: false,
            bodyStyle: 'background: none',
            layout: 'vbox',
            width: 300,
            margin: '10',
            defaults: { anchor: '100%' },
            items: [
            {
                xtype: 'displayfield',
                itemid: 'bookingValueDP',
                width: 300,
                labelWidth: 150,
                fieldLabel: 'Booking value'.l('SC71500')
            }, {
                xtype: 'displayfield',
                itemid: 'downPaymentValueDP',
                width: 300,
                labelWidth: 150,
                fieldLabel: 'Downpayment value'.l('SC71500')
            }, {
                xtype: 'displayfield',
                width: 300,
                labelWidth: 150,
                itemid: 'paymentReceivedDP',
                fieldLabel: 'Payment received'.l('SC71500')
            }, {
                xtype: 'numberfield',
                decimalPrecision: 2,
                width: 300,
                labelWidth: 150,
                itemid: 'downPaymentOpenDP',
                fieldLabel: 'Downpayment open'.l('SC71500') + '*',
                selectOnFocus: true
            }, {
                xtype: 'combo',
                width: 300,
                labelWidth: 150,
                fieldLabel: 'Cash register'.l('SC71500') + '*',
                margin: '0 10 0 0',
                itemid: 'CashRegisterComboDP',
                displayField: 'CashRegisterName',
                valueField: 'CashRegisterId',
                store: 'property.CashRegisterStore',
                emptyText: 'Select Cash Register'.l('SC74000'),
                allowBlank: false
            },
            {
                xtype: 'displayfield',
                width: 300,
                labelWidth: 150,
                fieldLabel: 'Payment method'.l('SC71500') + '*'
            },
            {
                xtype: 'form',
                width: 300,
                border: false,
                style: 'background:none; border:0px;',
                autoScroll: false,
                itemid: 'PaymentMethodFormDP',
                id: 'PaymentMethodFormDP'
            },
            {
                layout: 'hbox',
                margin: '10 0 0 0',
                border: false,
                items: [{ xtype: 'displayfield', width: 150, fieldLabel: 'Proforma invoice'.l('SC71500') },
                {
                    xtype: 'button',
                    text: 'Generate'.l('SC71500'),
                    action: 'afasDownPaymentGenerate'
                }]
            }]
        };

        me.FullPaymentSection = {
            xtype: 'panel',
            border: false,
            disabled: true,
            itemid: 'fullPaymentSection',
            bodyStyle: 'background: none',
            layout: 'vbox',
            width: 300,
            margin: '10',
            items: [
            {
                xtype: 'displayfield',
                width: 300,
                labelWidth: 150,
                itemid: 'totalBookingValueFP',
                fieldLabel: 'Total booking value'.l('SC71500')
            }, {
                xtype: 'displayfield',
                width: 300,
                labelWidth: 150,
                itemid: 'paymentReceivedFP',
                fieldLabel: 'Payment received'.l('SC71500')
            }, {
                xtype: 'displayfield',
                itemid: 'paymentOpenFP',
                width: 300,
                labelWidth: 150,
                fieldLabel: 'Payment open'.l('SC71500')
            }, {
                layout: 'hbox',
                border: false,
                items: [{ xtype: 'displayfield', width: 150, fieldLabel: 'Proforma invoice'.l('SC71500') },
                {
                    xtype: 'button',
                    text: 'Generate'.l('SC71500'),
                    action: 'afasFullPaymentPIGenerate'
                }]
            }, {
                xtype: 'combo',
                width: 300,
                labelWidth: 150,
                fieldLabel: 'Cash register'.l('SC71500') + '*',
                margin: '0 10 0 0',
                itemid: 'CashRegisterComboFP',
                displayField: 'CashRegisterName',
                valueField: 'CashRegisterId',
                store: 'property.CashRegisterStore',
                emptyText: 'Select Cash Register'.l('SC74000'),
                allowBlank: false
            }, {
                xtype: 'numberfield',
                decimalPrecision: 2,
                width: 300,
                labelWidth: 150,
                itemid: 'downPaymentOpenFDP',
                hidden: true,
                selectOnFocus: true
            }, {
                xtype: 'numberfield',
                decimalPrecision: 2,
                width: 300,
                labelWidth: 150,
                itemid: 'totalBookingAmFP',
                hidden: true,
                selectOnFocus: true
            },
             {
                 xtype: 'displayfield',
                 width: 300,
                 labelWidth: 150,
                 fieldLabel: 'Payment method'.l('SC71500') + '*'
             }, {
                 xtype: 'form',
                 width: 300,
                 border: false,
                 style: 'background:none; border:0px;',
                 autoScroll: false,
                 itemid: 'PaymentMethodFormFP',
                 id: 'PaymentMethodFormFP'
             },
             {
                 margin: '10 0 0 0',
                 layout: 'hbox',
                 border: false,
                 items: [{ xtype: 'displayfield', width: 150, fieldLabel: 'Invoice'.l('SC71500') },
                {
                    xtype: 'button',
                    text: 'Generate'.l('SC71500'),
                    action: 'afasFullPaymentGenerate'
                }]
             }]
        };

        me.bigPanel = {
            border: false,
            buttonAlign: 'right',
            frame: false,
            align: top,
            width: parseInt(Ext.getBody().getViewSize().width * (0.8)),
            items: [
                {
                    layout: 'hbox',
                    border: false,
                    items: [
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Situation'.l('SC71500')
                            }, {
                                xtype: 'radiogroup',
                                name: 'paymenttype',
                                itemid: 'paymenttype',
                                allowBlank: false,
                                vertical: false,
                                width: 900,
                                items: [{ boxLabel: 'Payment proof'.l('SC71500'), action: 'paymenttypeChange1', itemid: 'paymenttypeChange1', name: 'paymenttype', checked: true, inputValue: '0' },
                                        { boxLabel: 'Downpayment'.l('SC71500'), name: 'paymenttype', action: 'paymenttypeChange2', itemid: 'paymenttypeChange2', inputValue: '1', padding: '0 0 0 20' },
                                        { boxLabel: 'Full Payment'.l('SC71500'), name: 'paymenttype', action: 'paymenttypeChange3', itemid: 'paymenttypeChange3', inputValue: '2', padding: '0 0 0 40'}]
                            }
                        ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    items: [
                        {
                            xtype: 'tbspacer',
                            width: 100
                        }, me.PaymentProofSection, me.DownPaymentSection, me.FullPaymentSection
                ]
                }
         ]
        };
        /* EOF Big panel */
        me.items = [me.bigPanel, { xtype: 'textfield', hidden: true, itemid: 'directPaymentBookingId', value: me.BookingId }, { xtype: 'textfield', hidden: true, itemid: 'directPaymentPropertyId', value: me.PropertyId}];
        me.buttons = [{
            text: 'Cancel'.l('g'),
            handler: function () {
                me.close();
            }
        }
        //        , {
        //            text: 'Ok'.l('SC71500'),
        //            action: 'SaveBookingPayment'
        //        }
        ];
        me.callParent();
    },
    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        var d = Ext.Date.parse(value, 'c');
        return Ext.util.Format.date(d, usr_dateformat);
    }
});