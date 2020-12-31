Ext.define('Regardz.view.bookingwizard.BookingWizardStep6', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bookingwizardstep6',
    itemid: 'bookingwizardstep6',
    modal: true,
    border: false,
    title: 'Reservarion Confirmation- Step 6 of 6_Title'.l('SC56000'),
    layout: 'fit',
    initComponent: function () {

        var me = this;
        me.BookingList = {
            xtype: 'grid',
            title: 'Bookings'.l('SC56000'),
            itemid: 'bookingtable',
            margin: '10',
            width: '100%',
            noResize: true,
            viewConfig: {
                forceFit: true
            },
            height: 200,
            frame: false,
            autoScroll: true,
            loadMask: true,
            store: Ext.data.StoreManager.lookup('bookingwizard.BookingListStepSixStore'),
            columns: [{
                width: 30,
                sortable: false,
                renderer: this.checkboxrenderer
            }, {
                dataIndex: 'BookingId',
                hidden: true
            }, {
                dataIndex: 'BookingTrackingId',
                hidden: true
            }, {
                header: "Date".l('SC56000'),
                sortable: true,
                dataIndex: 'BookingDate',
                flex: 1,
                renderer: this.daterenderer
            }, {
                header: "Name".l('SC56000'),
                sortable: true,
                dataIndex: 'BookingName',
                flex: 3
            }, {
                header: "Location".l('SC56000'),
                sortable: true,
                dataIndex: 'Location',
                flex: 3
            }, {
                header: "Net Price".l('SC56000'),
                sortable: true,
                dataIndex: 'NetPrice',
                flex: 1,
                renderer: this.priceRenderer
            }, {
                header: "VAT".l('SC56000'),
                sortable: true,
                dataIndex: 'Vat',
                flex: 1,
                renderer: this.priceRenderer
            }, {
                header: "Gross Price".l('SC56000'),
                sortable: true,
                dataIndex: 'GrossPrice',
                flex: 1,
                renderer: this.priceRenderer
            }, {
                width: 30,
                renderer: this.renderIcon
            }],
            bbar: {
                xtype: 'pagingtoolbar',
                store: Ext.getStore('bookingwizard.BookingListStepSixStore'), // Ext.getStore('bookingwizard.MeetingBookinglistStore'),
                displayInfo: true,
                emptyMsg: "No data to display".l('g')
            }
        };

        me.ReservationDetails = {
            xtype: 'form',
            itemid: 'frmResDetailsStep6',
            layout: 'hbox',
            frame: true,
            margin: '10',
            width: '100%',
            items: [{
                layout: 'vbox',
                frame: false,
                xtype: 'fieldcontainer',
                width: '33%',
                items: [{
                    xtype: 'datefield',
                    fieldLabel: 'Decision date'.l('SC56000'),
                    name: 'DecisionDate',
                    itemid: 'itemDecDate',
                    //allowBlank: true,
                    format: usr_dateformat,
                    submitFormat: 'Y-m-d',
                    selectOnFocus: true,
                    layout: 'form',
                    flex: 1
                }, {
                    layout: 'hbox',
                    frame: false,
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Complete profiles'.l('SC56000'),
                    //labelWidth: '130',
                    items: [{
                        xtype: 'button',
                        viewConfig: {
                            ctCls: 'red-btn'
                        },
                        itemid: 'btnChangeProfile',
                        action: 'changeCompleteProfiles',
                        margin: '0',
                        text: 'Edit'.l('SC56000')
                    }]
                }]
            }, {
                layout: 'vbox',
                frame: false,
                xtype: 'fieldcontainer',
                width: '33%',
                items: [{
                    layout: 'vbox',
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Sales actions'.l('SC56000'),
                    name: 'salesActions',
                    items: [{
                        xtype: 'checkbox',
                        name: 'IsGetDeal',
                        //displayField: 'Get the deal',
                        itemid: 'getTheDealCheck',
                        valueField: 'getTheDealId',
                        inputValue: 'true',
                        boxLabel: 'Get the deal'.l('SC56000'),
                        checked: false
                    }, {
                        xtype: 'checkbox',
                        name: 'IsAfterSales',
                        //displayField: 'After sales',
                        itemid: 'afterSalesCheck',
                        valueField: 'afterSalesId',
                        inputValue: 'true',
                        boxLabel: 'After sales'.l('SC56000'),
                        checked: false
                    }, {
                        xtype: 'checkbox',
                        name: 'IsWelcomeContact',
                        //displayField: 'After sales',
                        itemid: 'welcomContactCheck',
                        //valueField: 'welcomContactId',
                        inputValue: 'true',
                        boxLabel: 'Welcome contact'.l('SC56000'),
                        checked: false,
                        padding: '5 0 0 0'
                    }]
                }]
            }, {
                layout: 'vbox',
                frame: false,
                xtype: 'fieldcontainer',
                width: '33%',
                items: [{
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Creator'.l('SC56000'),
                    labelWidth: 120,
                    //name: 'creatorField',
                    items: [{
                        xtype: 'displayfield',
                        name: 'CreatedByName',
                        margin: '0'
                    }, {
                        xtype: 'hidden',
                        name: 'CreatedBy'
                    }]
                }, {
                    layout: 'hbox',
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Responsible'.l('SC56000'),
                    labelWidth: 120,
                    name: 'responsibleField',
                    items: [{
                        xtype: 'displayfield',
                        name: 'ResponsibleUser',
                        margin: '0'
                    }, {
                        xtype: 'button',
                        action: 'searchResponsible',
                        iconCls: 'search-icon',
                        margin: '0 0 0 20',
                        tooltip: 'Search responsible'.l('SC56000')
                    }, {
                        xtype: 'hidden',
                        name: 'ResponsibleUserId',
                        itemid: 'ResponsibleUserId'
                    }, {
                        xtype: 'hidden',
                        name: 'ReservationId'
                    }, { xtype: 'hidden', itemid: 'step6IndivId', name: 'IndividualId' },
                        { xtype: 'hidden', itemid: 'step6IsSecondaryEmail', name: 'IsSecondaryEmail' },
                        { xtype: 'hidden', itemid: 'step6Email', name: 'Email' }
                    ]
                }, {
                    xtype: 'checkbox',
                    name: 'IsSendMyzone',
                    //displayField: 'After sales',
                    itemid: 'sendMyZoneCheck',
                    inputValue: 'true',
                    //valueField: 'afterSalesId',
                    boxLabel: 'MyZone Notifications'.l('SC56000'),
                    checked: false
                }]
            }]
        };
        me.EmailTabs = {
            xtype: 'tabpanel',
            itemid: 'tabPanelBookingWizardStep6',
            activeTab: 0,
            width: '100%',
            plain: false,
            border: false,
            //frame: true,
            bodyPadding: 1,
            padding: 5,
            layout: 'form',
            flex: 1,
            style: 'background:none; border:0px;',
            items: [{
                title: 'Mail Text'.l('SC56000'),
                name: 'emailTextContentTab',
                layout: 'form',                
                autoScroll: true,
                items: [{
                    layout: 'vbox',
                    xtype: 'fieldcontainer',
                    height: '100%',                    
                    frame: true,
                    items: [{
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        frame: true,
                        width: '90%',
                        margin: "10",
                        items: [{
                            xtype: 'button',
                            action: 'recreatePersonalisedTextFromTemp',
                            margin: '0 10 0 0',
                            iconCls: 'refreshBtnicon'
                        }, {
                            xtype: 'label',
                            name: 'sendToLabel',
                            text: 'Send to'.l('SC56000'),
                            margin: '0 10 0 0'
                        }, {
                            xtype: 'radiofield',
                            name: 'cbEmail',
                            itemid: 'cbMainEmailItemId',
                            boxLabel: 'Main'.l('SC56000'),
                            margin: '0 10 0 0',
                            inputValue: 1
                        }, {
                            xtype: 'label',
                            name: 'mainEmailText',
                            itemid: 'mainEmailText',
                            //text: 'email@test.com',
                            margin: '0 10 0 0'
                        }, {
                            xtype: 'radiofield',
                            name: 'cbEmail',
                            itemid: 'cbSecondaryEmailItemId',
                            boxLabel: 'Secondary'.l('SC56000'),
                            //checked: false,
                            margin: '0 10 0 0',
                            inputValue: 2
                        }, {
                            xtype: 'textfield',
                            itemid: 'secondaryEmailText',
                            allowBlank: true,
                            selectOnFocus: true,
                            margin: '0 10 0 0',
                            width: '200px',
                            vtype: 'email'
                            //value: 'jan.dekker@hotmail.com'
                        }
                        ]
                    }, {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        frame: false,
                        margin: "0 5",
                        width: '90%',
                        items: [{
                            layout: 'vbox',
                            xtype: 'fieldcontainer',
                            frame: false,                            
                            width: '75%',
                            items: [{
                                xtype: 'label',
                                padding: '0 0 5 0',
                                text: 'Salutation'.l('SC56000')
                            }, {
                                xtype: 'textfield',
                                grow: false,
                                itemid: 'emailSalutation',
                                height: '20%',
                                anchor: '100%',
                                width: '50%'
                            }, {
                                xtype: 'label',
                                padding: '0 0 5 0',
                                text: 'Content'.l('SC56000')
                            }, {
                                xtype: 'htmleditor',
                                grow: false,
                                itemid: 'emailContent',
                                height: '25%',
                                enableFormat: false,
                                enableAlignments: false,
                                enableColors: false,
                                enableFont: false,
                                enableFont: false,
                                enableFontSize: false,
                                enableLinks: false,
                                enableLists: false,
                                enableSourceEdit: false,                                
                                width: '85%'
                            }, {
                                xtype: 'label',
                                padding: '10 0 5 0',
                                text: 'Signature'.l('SC56000')
                            }, {
                                xtype: 'htmleditor',
                                grow: false,
                                height: '25%',
                                padding: '0 0 10 0',
                                enableFormat: false,
                                enableAlignments: false,
                                enableColors: false,
                                enableFont: false,
                                enableFont: false,
                                enableFontSize: false,
                                enableLinks: false,
                                enableLists: false,
                                enableSourceEdit: false,
                                itemid: 'emailSignature',
                                // anchor: '100%',
                                width: '50%'
                            }, {
                                xtype: 'tbspacer',
                                height:10
                            }]
                        }, {
                            layout: 'vbox',
                            xtype: 'fieldcontainer',
                            frame: false,
                            width: '25%',                            
                            items: [/*{
                                xtype: 'label',
                                text: 'CC'
                            },*/{
                            xtype: 'panel',
                            border: false,
                            style: 'background:none; border:0px;',
                            layout: 'hbox',                            
                            width: '100%',
                            items: [{
                                xtype: 'label',
                                text: 'CC'.l('SC56000'),
                                flex: 1
                            }, {
                                xtype: 'button',
                                action: 'openContactScreenForCC',
                                iconCls: 'searchIcon',
                                margin: '0 0 5 0'
                            }]
                        }, {
                            xtype: 'textareafield',
                            grow: false,
                            itemid: 'ccInput',                            
                            height: '40%',
                            width: '100%'
                        }, {
                            xtype: 'panel',
                            border: false,
                            width: '100%',
                            style: 'background:none; border:0px;',
                            layout: 'hbox',
                            items: [{
                                xtype: 'label',
                                text: 'BCC'.l('SC56000'),
                                flex: 1
                            }, {
                                xtype: 'button',
                                action: 'openContactScreenForBCC',
                                margin: '0 0 5 0',
                                iconCls: 'searchIcon'
                            }]
                        }, {
                            xtype: 'textareafield',
                            grow: false,
                            itemid: 'bccInput',                            
                            height: '40%',
                            width: '100%'
                        }]
                    }]
                }]
            }]
        }, //end tab 1
               {
               title: 'Cover Letter Text'.l('SC56000'),
               name: 'coverLetterContentTab',
               layout: 'form',
               autoScroll: true,
               items: [{
                   xtype: 'fieldcontainer',
                   frame: true,
                   width: '100%',
                   height: '95%',                   
                   items: [{
                       xtype: 'button',
                       action: 'recreatePersonalisedTextFromTemp',
                       margin: '0',
                       iconCls: 'refreshBtnicon'
                   }, {
                       xtype: 'textareafield',
                       grow: true,
                       itemid: 'coverLetterContent',
                       height: '90%',
                       width: '100%'
                   }]
               }]
           }]
    };

    me.items = [{
        layout: 'vbox',
        layoutConfig: {
            align: 'stretch',
            pack: 'start'
        },
        frame: false,
        width: '100%',
        items: [
                    me.BookingList,
                    me.ReservationDetails,
                    me.EmailTabs
                ]
    }];

    me.callParent(arguments);
},
renderIcon: function (value, metadata, record, rowIndex, colIndex, store) {
    log("meta", metadata);
    metadata.css = metadata.css + ' selectUser';
},
checkboxrenderer: function (value, metadata, record, rowIdx, colIndex, store) {
    return '<input  data-bdate="' + record.data.BookingDate + '" data-bname="' + record.data.BookingName + '" data-b="' + record.data.BookingId + '"  data-bt="' + record.data.BookingTrackingId + '" id="rowBooking_' + rowIdx + '"' + (record.data.Checked == true ? 'checked=checked' : '') + ' type=checkbox name="rgrp">';
},
daterenderer: function (value) {
    var date = new Date(value);
    return Ext.Date.format(date, 'd-m-Y');
},
priceRenderer: function (value) {
    return Ext.util.Format.number(value, '0,000.00');
}
});