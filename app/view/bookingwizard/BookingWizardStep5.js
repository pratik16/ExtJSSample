Ext.define('Regardz.view.bookingwizard.BookingWizardStep5', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bookingwizardstep5',
    views: ['bookingwizard.MeetingItemsShort'],
    loadMask: true,
    padding: '10',

    initComponent: function () {
        var me = this;
        me.title = 'Booking Confirmation - Step 5 of 6_Title'.l('SC55000');
        me.itemid = 'bookingwizardstep5';
        me.frame = true;
        me.layout = 'fit';
        Ext.getCmp('move-prev').show();
        me.BookingDetailsForm = {
            xtype: 'form',
            title: 'Booking Details'.l('SC55000'),
            cls: 'bookingdetailsEdit',
            itemid: 'bookingdetailsform',
            collapsible: true,
            // split: true,
            region: 'south',
            //id: 'bookingdetailsform',
            anchor: '100%',
            width: '100%',
            margin: '10 10 10 10',
            frame: true,
            layout: 'hbox',
            items: [{
                layout: 'vbox',
                padding: '0 10 0 0',
                xtype: 'fieldcontainer',
                width: '33%',
                items: [{
                    xtype: 'hiddenfield',
                    name: 'ReservationId'
                }, {
                    xtype: 'hiddenfield',
                    name: 'BookingTrackingId'
                }, {
                    xtype: 'hiddenfield',
                    name: 'BookingId'
                }, {
                    xtype: 'hiddenfield',
                    name: 'CompanyId'
                }, {
                    xtype: 'hiddenfield',
                    name: 'BookingNumber'
                }, {
                    xtype: 'hiddenfield',
                    name: 'downpayment'
                }, {
                    xtype: 'hiddenfield',
                    name: 'StartDate'
                }, {
                    xtype: 'hiddenfield',
                    name: 'IsFollowLater',
                    value: false
                }, {
                    xtype: 'hiddenfield',
                    itemid: 'IsIBCompanyName',
                    name: 'IsIBCompanyName'
                }, {
                    xtype: 'hiddenfield',
                    name: 'NoteID'
                }, {
                    xtype: 'hiddenfield',
                    name: 'IsCompany',
                    value: true
                }, {
                    xtype: 'hiddenfield',
                    name: 'UpdatedBy'
                }, {
                    xtype: 'hiddenfield',
                    name: 'IsPurchaseOrderNotApplicable',
                    value: true
                }, {
                    xtype: 'hiddenfield',
                    name: 'IsPurchaseOrderWillBeGivenLater',
                    value: false
                }, {
                    xtype: 'hiddenfield',
                    name: 'ContactOnLocationId',
                    itemid: 'ContactOnLocationId'
                }, {
                    xtype: 'hiddenfield',
                    name: 'ContactOnLocationType',
                    itemid: 'ContactOnLocationType'
                }, {
                    xtype: 'hiddenfield',
                    name: 'StatusId',
                    itemid: 'StatusId'
                },
                 {
                     xtype: 'textfield',
                     fieldLabel: 'Booking Name'.l('SC51000') + '*',
                     name: 'BookingName',
                     allowBlank: false,
                     selectOnFocus: true,
                     width: 300
                 }, {
                     xtype: 'fieldcontainer',
                     fieldLabel: 'Information board'.l('SC55000') + '*',
                     //defaultType: 'radiofield',
                     allowBlank: false,
                     itemid: "InformationitemRadioGroup",
                     layout: 'vbox',
                     items: [{
                         boxLabel: 'Company Name'.l('SC55000'),
                         name: 'rdInfoBoard',
                         itemid: 'ib1',
                         inputValue: 1,
                         checked: true,
                         xtype: 'radio'
                         //id: 'rdInfoBoard',                        
                     }, {
                         boxLabel: 'Follows later'.l('SC55000'),
                         name: 'rdInfoBoard',
                         itemid: 'ib2',
                         inputValue: 2,
                         xtype: 'radio'
                         //id: 'rdFollowsLater'
                     }, {
                         layout: 'hbox',
                         border: false,
                         items: [{
                             name: 'rdInfoBoard',
                             itemid: 'informationBoardIdRadio',
                             inputValue: 3,
                             // itemid: 'ib3',
                             xtype: 'radio'
                             //id: 'rdEmptyTextBox'
                         }, {
                             xtype: 'textfield',
                             width: 180,
                             itemid: 'informationBoardId',
                             name: 'InformationBoard'
                         }]
                     }]
                 }, {
                     xtype: 'combo',
                     name: 'MeetingTypeId',
                     fieldLabel: 'Meeting Type'.l('SC51000') + '*',
                     valueField: 'PropertyFeatureId',
                     displayField: 'PropertyFeatureName',
                     store: 'common.MeetingTypeStore',
                     //forceSelection: true,
                     allowBlank: false,
                     //queryMode: 'remote',
                     typeAhead: true,
                     hideTrigger: false,
                     triggerAction: 'all'
                 }, {
                     xtype: 'radiogroup',
                     fieldLabel: 'Extra on location'.l('SC55000') + '*',
                     defaultType: 'radiofield',
                     allowBlank: false,
                     name: "ExtraOptionsOnLocation",
                     itemid: "extraOnLocationRadioGroup",
                     layout: 'vbox',
                     items: [{
                         boxLabel: 'No'.l('SC55000'),
                         name: 'ExtraOptionsOnLocation',
                         inputValue: 1,
                         checked: true
                         //id: 'rdNo',                        
                     }, {
                         boxLabel: 'Yes'.l('SC55000'),
                         name: 'ExtraOptionsOnLocation',
                         inputValue: 2
                         //id: 'rdYes'
                     }, {
                         boxLabel: 'Yes, contact on loc.'.l('SC55000'),
                         name: 'ExtraOptionsOnLocation',
                         inputValue: 3
                         //id: 'rdYesContact'
                     }, {
                         boxLabel: 'Yes, agreement booker'.l('SC55000'),
                         name: 'ExtraOptionsOnLocation',
                         inputValue: 4
                         //id: 'rdYesBooker'
                     }]
                 }
                 , {
                     layout: 'vbox',
                     xtype: 'radiogroup',
                     fieldLabel: 'Contact on location'.l('SC55000'),
                     defaultType: 'radiofield',
                     allowBlank: false,
                     name: "ContactOnLocationOptions",
                     itemid: "ContactOnLocationRadioGroup",
                     //name: 'contactOnLocation',
                     items: [{
                         boxLabel: ' ',
                         name: 'ContactOnLocationOptions',
                         inputValue: 1,
                         width: 200,
                         checked: true,
                         id: 'COLRDBooker'
                     }, {
                         boxLabel: 'Follows later'.l('SC55000'),
                         name: 'ContactOnLocationOptions',
                         inputValue: 2,
                         width: 200,
                         id: 'COLRDFollowsLater'
                     }, {
                         boxLabel: '-',
                         name: 'ContactOnLocationOptions',
                         inputValue: 3,
                         width: 200,
                         id: 'COLRDAttendee'
                     }, {
                         xtype: 'hidden',
                         name: 'IndividualId',
                         itemid: 'individualId'
                     }, {
                         xtype: 'button',
                         itemid: 'COLBTNAttendee',
                         action: 'changeContactOnLocation',
                         margin: '0',
                         text: 'Change'.l('SC55000')
                     }]
                 }


                 ]
            }, {
                layout: 'vbox',
                padding: '0 10 0 0',
                xtype: 'fieldcontainer',
                width: '33%',
                items: [{
                    xtype: 'numberfield',
                    fieldLabel: 'Discount on inv.'.l('SC55000') + '*',
                    name: 'InvoiceDiscountPercentage',
                    itemid: 'txtDiscountInv',
                    minValue: 0,
                    maxValue: 100,
                    selectOnFocus: true
                }, {
                    xtype: 'radiogroup',
                    fieldLabel: 'Payment method'.l('SC55000') + '*',
                    //defaultType: 'radiofield',
                    allowBlank: false,
                    name: 'PaymentMethod',
                    action: 'paymentMethodChange',
                    itemid: "paymentMethodGroup",
                    layout: 'vbox',
                    items: [{
                        boxLabel: 'Direct Payment'.l('SC55000'),
                        name: 'PaymentMethod',
                        inputValue: 1,
                        checked: true
                        //id: 'rdDirectPayment',                        
                    }, {
                        boxLabel: 'Request to become deb.'.l('SC55000'),
                        name: 'PaymentMethod',
                        inputValue: 2
                        //id: 'rdRequestToBecomeDebt'
                    }, {
                        boxLabel: 'Debtor'.l('SC55000'),
                        name: 'PaymentMethod',
                        //action: 'paymentMethodChange',
                        inputValue: 3
                        //id: 'rdDebtor'
                    }]
                }, {
                    layout: 'vbox',
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Advance paym.'.l('SC55000'),
                    name: 'contactAdvancedPayment',
                    itemid: 'fieldAdvencePayment',
                    items: [{
                        xtype: 'displayfield',
                        allowBlank: false,
                        itemid: 'fieldAdvencePaymentLabel',
                        name: 'AdvancePayment',
                        text: '0,00',
                        margins: '0 0 0 2'
                    }, {
                        xtype: 'button',
                        action: 'changeAdvancePayment',
                        margin: '2 0 0 0',
                        text: 'Change'.l('SC55000')
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Purchase order'.l('SC55000') + '*',
                    //defaultType: 'radiofield',
                    allowBlank: false,
                    itemid: "purchaseOrderGroup",
                    name: 'rdPO',
                    layout: 'vbox',
                    items: [{
                        boxLabel: 'Not Applicable'.l('SC55000'),
                        name: 'rdPO',
                        itemid: 'aaa',
                        inputValue: 1,
                        xtype: 'radio',
                        checked: true
                        //id: 'rdNotApplicable',
                    }, {
                        boxLabel: 'Will be given later'.l('SC55000'),
                        name: 'rdPO',
                        xtype: 'radio',
                        itemid: 'bbb',
                        inputValue: 2
                        //id: 'rdWillBeGivenLater'
                    }, {
                        layout: 'hbox',
                        border: false,
                        items: [{
                            inputValue: 3,
                            xtype: 'radio',
                            itemid: 'ccc',
                            name: 'rdPO'
                        }, {
                            xtype: 'textfield',
                            width: 100,
                            disabled: true,
                            itemid: 'purchaseOrdertextId',
                            name: 'PurchaseOrderNumber'
                        }]
                    }]
                }, {
                    layout: 'vbox',
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Invoice settings'.l('SC55000'),
                    name: 'invoiceSettings',
                    itemid: 'fieldInvoiceSettings',
                    items: [{
                        xtype: 'label',
                        allowBlank: false,
                        text: 'Single'.l('SC55000'),
                        itemid: 'invoiceSettingStatusLabel',
                        margins: '0 0 0 2'
                    }, {
                        xtype: 'button',
                        action: 'changeInvoiceSettings',
                        margin: '2 0 0 0',
                        text: 'Change'.l('SC55000')
                    }]
                }]
            }, {
                layout: 'vbox',
                padding: '0 10 0 0',
                xtype: 'fieldcontainer',
                width: '33%',
                items: [{
                    layout: 'vbox',
                    padding: '0 10 0 0',
                    xtype: 'fieldcontainer',
                    width: '100%',
                    items: [{
                        xtype: 'label',
                        text: 'External Remark'.l('SC55000')
                    }, {
                        xtype: 'textareafield',
                        grow: true,
                        name: 'ExternalRemark',
                        //labelSeparator: '<br />',                            
                        height: 100,
                        anchor: '100%',
                        width: '100%'
                    }, {
                        xtype: 'label',
                        text: 'Internal Remark'.l('SC55000')
                    }, {
                        xtype: 'textareafield',
                        grow: true,
                        name: 'InternalRemark',
                        fieldLabel: '',
                        anchor: '100%',
                        height: 100,
                        width: '100%'
                    }]
                }, {
                    layout: 'vbox',
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Status'.l('SC55000'),
                    name: 'status',
                    itemid: 'fieldStatus',
                    items: [{
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        items: [{
                            xtype: 'displayfield',
                            allowBlank: false,
                            name: 'DefaultStatus',
                            itemid: 'DefaultStatus',
                            //text: 'Tentitive',
                            width: 60,
                            padding: '5 5 0 5'
                        }, {
                            xtype: 'checkbox',
                            name: 'statusOk',
                            displayField: 'OK',
                            labelWidth: 5,
                            itemid: 'statusOkCheck',
                            boxLabel: 'OK',
                            checked: false,
                            padding: '3 5 0 5'
                        }]
                    }, {
                        xtype: 'button',
                        action: 'changeStatus',
                        margin: '0',
                        text: 'Change'.l('SC55000')
                    }]
                }]
            }]
        };
        me.items = {
            // layout: 'vbox',
            layout: 'border',
            frame: false,
            width: '100%',
            autoScroll: true,
            loadMask: true,
            items: [{
                title: 'Meeting details'.l('SC53000'),
                itemid: 'meetingdetailstable',
                margin: '10',
                layout: 'fit',
                region: 'center',
                xtype: 'meetingitemsshort'
            }, me.BookingDetailsForm]
        };
        me.callParent();
    }
    //editItem: function (value, metadata, record, rowIndex, colIndex, store) {
    //    var tooltipText = "Update Item".l('SC21900');
    //    metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
    //    metadata.tdCls = 'icon-documentadd';
    //},

    //deteleItem: function (value, metadata, record, rowIndex, colIndex, store) {
    //    var tooltipText = "Delete Item".l('SC21900');
    //    metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
    //    metadata.tdCls = 'icon-delete';
    //}
});