Ext.define('Regardz.view.bookingwizard.AdvancedPaymentWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.advancedpayment',
    modal: true,
    border: false,
    width: 550,
    title: 'Mandatory Advance Payment_Title'.l('SC55300'),
    initComponent: function () {

        var me = this;
        me.itemid = 'advancedpaymentid';
        me.leftMargin = '0 0 0 100';
        me.leftMarginLabel = '5 10 5 140';

        me.cancelButton = {
            xtype: 'button',
            width: 100,
            //action: 'cancelAdvancedPaymentButton',
            margin: '10',
            text: 'Cancel'.l('SC55300'),
            handler: function () {
                me.close();
            }
        };

        me.requestButton = {
            xtype: 'button',
            width: 100,
            itemid: 'btnRequest',
            action: 'requestAdvancedPaymentButton',
            margin: '10',
            text: 'Request'.l('SC55300'),
            disabled: true
        };

        me.approvedButton = {
            xtype: 'button',
            width: 100,
            itemid: 'btnApproved',
            action: 'approvedAdvancedPaymentButton',
            margin: '10',
            text: 'Approved'.l('SC55300'),
            disabled: true
        };

        me.agreedButton = {
            xtype: 'button',
            width: 100,
            itemid: 'btnAgreed',
            action: 'agreedAdvancedPaymentButton',
            margin: '10',
            text: 'Agreed'.l('SC55300'),
            disabled: true
        };

        me.items = [
            { xtype: 'hidden', itemid: 'approvalCode' },
            { xtype: 'hidden', itemid: 'totalBookingAmt', value: 0 },
            { xtype: 'hidden', itemid: 'valueChanged', value: 0 },
            {
                layout: 'vbox',
                xtype: 'fieldcontainer',
                items: [
            {
                xtype: "label",
                text: 'This booking requires an advance payment.'.l('SC55300'),
                margin: '10 10 10 10'
            },
            {
                layout: 'vbox',
                xtype: 'fieldcontainer',
                fieldLabel: 'Status'.l('SC55300'),
                defaultType: 'radiofield',
                margin: '0 0 0 10',
                name: 'status',
                items: [
                        {
                            boxLabel: 'Client agrees to the advance payment'.l('SC55300'),
                            name: 'clientagrees',
                            inputValue: 1,
                            itemid: 'rdClientAgrees',
                            //checked: true,
                            listeners: {
                                change: function (cb, nv, ov) {
                                    if (nv) {
                                        Ext.ComponentQuery.query('advancedpayment [itemid="btnRequest"]')[0].disable();
                                        Ext.ComponentQuery.query('advancedpayment [itemid="btnApproved"]')[0].disable();
                                        Ext.ComponentQuery.query('advancedpayment [itemid="btnAgreed"]')[0].enable();
                                    }
                                }
                            }
                        }]
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'Booking amount'.l('SC55300'),
                labelWidth: 150,
                margin: me.leftMarginLabel,
                items: [{
                    xtype: 'displayfield',
                    width: 150,
                    itemid: 'reqtBookingAmt',
                    align: 'right'
                }]
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Advance percentage'.l('SC55300'),
                labelWidth: 150,
                margin: me.leftMarginLabel,
                items: [{
                    xtype: 'displayfield',
                    width: 150,
                    itemid: 'reqtAdvancePerc',
                    align: 'right'
                }]
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Advance amount'.l('SC55300'),
                labelWidth: 150,
                margin: me.leftMarginLabel,
                items: [{
                    xtype: 'displayfield',
                    itemid: 'reqtAdvanceAmt'
                }]
            },
            {
                layout: 'vbox',
                xtype: 'fieldcontainer',
                defaultType: 'radiofield',
                name: 'status',
                margin: me.leftMargin,
                items: [
                      {
                          boxLabel: 'Request to discard or change advance. Reason'.l('SC55300'),
                          name: 'clientagrees',
                          inputValue: 2,
                          itemid: 'rdRequestDiscard',
                          listeners: {
                              change: function (cb, nv, ov) {
                                  if (nv) {
                                      Ext.ComponentQuery.query('advancedpayment [itemid="reasonTextArea"]')[0].enable();
                                      Ext.ComponentQuery.query('advancedpayment [itemid="apprCode"]')[0].disable();
                                      Ext.ComponentQuery.query('advancedpayment [itemid="btnRequest"]')[0].enable();
                                      Ext.ComponentQuery.query('advancedpayment [itemid="btnApproved"]')[0].disable();
                                      Ext.ComponentQuery.query('advancedpayment [itemid="btnAgreed"]')[0].disable();
                                  }
                              }
                          }
                      }]
            },
             {
                 xtype: 'textareafield',
                 itemid: 'reasonTextArea',
                 width: 300,
                 disabled: true,
                 margin: me.leftMarginLabel
             },

             {
                 layout: 'vbox',
                 xtype: 'fieldcontainer',
                 defaultType: 'radiofield',
                 name: 'status',
                 margin: me.leftMargin,
                 items: [
                      {
                          boxLabel: 'The manager approved to the discard or change'.l('SC55300'),
                          name: 'clientagrees',
                          inputValue: 3,
                          itemid: 'rdManagerApproves',
                          listeners: {
                              change: function (cb, nv, ov) {
                                  if (nv) {
                                      Ext.ComponentQuery.query('advancedpayment [itemid="apprCode"]')[0].enable();
                                      Ext.ComponentQuery.query('advancedpayment [itemid="reasonTextArea"]')[0].disable();
                                      Ext.ComponentQuery.query('advancedpayment [itemid="btnRequest"]')[0].disable();
                                      //Ext.ComponentQuery.query('advancedpayment [itemid="btnApproved"]')[0].enable();
                                      Ext.ComponentQuery.query('advancedpayment [itemid="btnAgreed"]')[0].disable();
                                  }
                              }
                          }
                      }]
             },
             {
                 xtype: 'fieldcontainer',
                 fieldLabel: 'Approval code'.l('SC55300'),
                 labelWidth: 150,
                 margin: me.leftMarginLabel,
                 items: [{
                     xtype: 'textfield',
                     width: 150,
                     itemid: 'apprCode',
                     maxLength: 4,
                     disabled: true,
                     listeners: {
                         change: function (cb, nv, ov) {
                             var code = Ext.ComponentQuery.query('advancedpayment [itemid="approvalCode"]')[0].value;
                             if (code != null && code != '' && nv == code) {
                                 Ext.ComponentQuery.query('advancedpayment [itemid="apprAdvancePerc"]')[0].enable();
                                 Ext.ComponentQuery.query('advancedpayment [itemid="apprAdvanceAmnt"]')[0].enable();
                                 Ext.ComponentQuery.query('advancedpayment [itemid="btnApproved"]')[0].enable();
                             }
                             else {
                                 Ext.ComponentQuery.query('advancedpayment [itemid="btnApproved"]')[0].disable();
                             }
                         }
                     }
                 }]
             },
             {
                 xtype: 'fieldcontainer',
                 fieldLabel: 'Booking amount'.l('SC55300'),
                 labelWidth: 150,
                 margin: me.leftMarginLabel,
                 items: [{
                     xtype: 'displayfield',
                     width: 150,
                     align: 'right',
                     itemid: 'apprBookingAmnt'
                 }]
             },
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Advance percentage'.l('SC55300'),
                labelWidth: 150,
                margin: me.leftMarginLabel,
                items: [{
                    xtype: 'numberfield',
                    width: 150,
                    decimalPrecision: 2,
                    itemid: 'apprAdvancePerc',
                    disabled: true,
                    listeners: {
                        change: function (cb, nv, ov) {
                            var isValueChanged = Ext.ComponentQuery.query('advancedpayment [itemid="valueChanged"]')[0];
                           
                            if (isValueChanged.value == 0) {
                                var ba = Ext.ComponentQuery.query('advancedpayment [itemid="totalBookingAmt"]')[0].value;
                               
                                    var tempPrice = String(ba).replace(Ext.util.Format.thousandSeparator, '');
                                    ba = String(tempPrice).replace(Ext.util.Format.decimalSeparator, '.');
                                
                               // ba = parseFloat(ba);

                                if (nv != null && ba != null && ba > 0) {
                                    isValueChanged.setValue(1);

                                    var amt = (nv * ba) / 100;
                                    var element = Ext.ComponentQuery.query('advancedpayment [itemid="apprAdvanceAmnt"]')[0];
                                    element.setValue(amt.toFixed(2));
                                    isValueChanged.setValue(0);
                                }
                            }
                        }
                    }
                }]
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Advance amount'.l('SC55300'),
                labelWidth: 150,
                margin: me.leftMarginLabel,
                items: [{
                    xtype: 'numberfield',
                    decimalPrecision: 2,
                    //xtype: 'textfield',
                    width: 150,
                    itemid: 'apprAdvanceAmnt',
                    disabled: true,
                    listeners: {
                        change: function (cb, nv, ov) {
                            var isValueChanged = Ext.ComponentQuery.query('advancedpayment [itemid="valueChanged"]')[0];
                          
                            if (isValueChanged.value == 0) {
                                var ba = Ext.ComponentQuery.query('advancedpayment [itemid="totalBookingAmt"]')[0].value;
                                //ba = parseFloat(ba);
                                var tempPrice = String(ba).replace(Ext.util.Format.thousandSeparator, '');
                                ba = String(tempPrice).replace(Ext.util.Format.decimalSeparator, '.');
                                
                                if (nv != null && ba != null && ba > 0) {
                                    isValueChanged.setValue(1);
                                    var per = (nv / ba)*100 ;
                                    var element = Ext.ComponentQuery.query('advancedpayment [itemid="apprAdvancePerc"]')[0];
                                    element.setValue(per.toFixed(2));
                                    isValueChanged.setValue(0);
                                }
                            }
                        }
                    }
                }]
            },
            {
                layout: 'hbox',
                xtype: 'fieldcontainer',
                align: 'right',
                margin: '10,10,10,40',
                items: [
                    me.cancelButton, me.requestButton, me.approvedButton, me.agreedButton
                ]
            }]
            }
        ];


        me.callParent(arguments);
    },
    loadData: function (me) {
    }

});