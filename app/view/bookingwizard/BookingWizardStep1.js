Ext.define('Regardz.view.bookingwizard.BookingWizardStep1', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bookingwizardstep1',
    itemid: "bwstep1",
    loadMask: true,
    stepOneObj: null,
    title: 'Contact Information - Step 1 of 6_Title'.l('SC51000'),
    store: 'bookingwizard.ReservationDetails',
    initComponent: function () {
        Ext.apply(Ext.form.field.VTypes, {
            //  vtype validation function
            onlyNumber: function (val, field) {
                var value = /^[0-9]+$/i;
                return value.test(val);
            },
            // vtype Text property to display error Text
            // when the validation function returns false
            onlyNumberText: "Insert proper value for this field".l('g'),
            // vtype Mask property for keystroke filter mask
            onlyNumberMask: /[\d\.]/i
        });
        var me = this;

        me.searchLocationRangeStore = new Ext.data.SimpleStore({
            fields: ["value", "Distance"],
            data: [
					[5, 5],
					[10, 10],
					[15, 15],
					[25, 25],
					[50, 50],
					[75, 75]]
        });
        me.pack = 'end';
        me.frame = true;
        me.contactInformation = {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: none',
            id: 'contactInformation',
            itemid: 'contactInformation',
            cls: 'propertyEdit',
            width: '100%',
            items: [{
                xtype: 'fieldset',
                title: 'Contact Information'.l('SC51000'),
                items: [
                    {
                        layout: 'hbox',
                        flex: 1,
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Company'.l('SC51000'),
                                emptyText: 'Type company'.l('SC51000'),
                                name: 'CompanyName',
                                itemid: 'txtCompanyName',
                                selectOnFocus: true,
                                layout: 'form',
                                flex: 1,
                                enableKeyEvents: true
                            },

                            {
                                xtype: 'displayfield',
                                width: 10
                            },

                            {
                                xtype: 'button',
                                action: 'searchCompany',
                                iconCls: 'icon-company',
                                margin: '0',
                                tooltip: 'Search/Add company'.l('SC51000')
                            }
                        ]
                    },
                     {
                         xtype: 'displayfield',
                         id: 'lblSelectedCompany',
                         hideEmptyLabel: false,
                         fieldLabel: ''
                     },
                     {
                         xtype: 'displayfield',
                         width: 10
                     },
                    {
                        layout: 'hbox',
                        flex: 1,
                        items: [
                            {
                                xtype: 'textfield',
                                layout: 'form',
                                flex: 1,
                                fieldLabel: 'Contact'.l('SC51000') + '*',
                                name: 'IndividualName',
                                itemid: 'txtIndividualName',
                                allowBlank: false,
                                selectOnFocus: true,
                                emptyText: 'Type contact/individual name'.l('SC51000'),
                                enableKeyEvents: true,
                                anchor: '100%'
                            },

                            {
                                xtype: 'displayfield',
                                width: 10
                            },

                            {
                                xtype: 'button',
                                action: 'searchIndividual',
                                iconCls: 'icon-contact',
                                margin: '0',
                                tooltip: 'Search/Add individual'.l('SC51000')
                            }
                        //                            ,{
                        //                                xtype: 'button',
                        //                                action: 'openInvoiceSettings',
                        //                                iconCls: 'icon-contact',
                        //                                itemid: 'btnInvoiceSettings',
                        //                                disabled: false
                        //                            }
                        ]
                    },

                         {
                             xtype: 'displayfield',
                             id: 'lblSelectedCompanyContact',
                             hideEmptyLabel: false,
                             fieldLabel: ''
                         },
                         {
                             xtype: 'displayfield',
                             width: 10
                         },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Contact Phone'.l('SC51000') + '*',
                            itemid: 'txtContactPhoneNum',
                            name: 'ContactPhoneNumber',
                            vtype: 'customPhoneNumber',
                            allowBlank: false,
                            selectOnFocus: true,
                            anchor: '100%'
                        }, {
                            xtype: 'hidden',
                            name: 'CreatedDate'
                        }, {
                            xtype: 'hidden',
                            name: 'CreatedBy'
                        }, {
                            xtype: 'hidden',
                            name: 'UpdatedDate'
                        }, {
                            xtype: 'hidden',
                            name: 'UpdatedBy'
                        },
                        {
                            xtype: 'hidden',
                            name: 'BookingWizardId',
                            value: 0
                        }, {
                            xtype: 'hidden',
                            name: 'CompanyId',
                            itemid: 'lblCompanyId',
                            allowBlank: false,
                            value: me.companyId
                        },
                        {
                            xtype: 'hidden',
                            name: 'IndividualId',
                            allowBlank: false,
                            value: me.individualId
                        }
                ]
            }]
        };

        me.agencySettings = {
            xtype: 'form',
            border: false,
            itemid: 'agencyDetails',
            bodyStyle: 'background: none',
            cls: 'propertyEdit',

            id: 'agencySettings',
            width: '100%',
            //  defaults: { style: "padding: 0 0 45px 0" },

            items: [{
                xtype: 'fieldset',
                disabled: true,
                title: 'Agency Settings'.l('SC51000'),
                itemid: 'itemAgencyFieldSet',
                items: [
                    {
                        xtype: 'hidden',
                        name: 'AgencyIndividualId',
                        value: 0
                    },
                     {
                         xtype: 'hidden',
                         name: 'AgencyCompanyId',
                         value: 0
                     },
                      {
                          xtype: 'hidden',
                          name: 'OtherAgencyCompanyId',
                          value: 0
                      },
                    {
                        xtype: 'panel',
                        items: [
                            {
                                layout: 'hbox',
                                flex: 1,
                                items: [
                                    {
                                        xtype: 'textfield',
                                        name: 'accountName',
                                        itemid: 'txtAgencyAccountName',
                                        fieldLabel: 'Account Name'.l('SC51000') + '*',
                                        allowBlank: false,
                                        layout: 'form',
                                        flex: 1
                                    }
                                ]
                            },
                            {
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'fieldcontainer',
                                        fieldLabel: 'Invoce to'.l('SC51000'),
                                        defaultType: 'radiofield',
                                        allowBlank: false,
                                        anchor: '100%',
                                        //width: '96%',
                                        defaults: { flex: 1 },
                                        layout: 'vbox',
                                        itemid: 'agencyRadioFieldSet',
                                        items: [
                                            {
                                                boxLabel: 'Agency'.l('SC51000'),
                                                name: 'color',
                                                inputValue: 'agency',
                                                checked: true,
                                                id: 'radioagency',
                                                itemid: 'radioAgency'
                                            },
                                            {
                                                boxLabel: '-',
                                                name: 'color',
                                                inputValue: 'grey',
                                                width: 200,
                                                id: 'radio-',
                                                itemid: 'radioAgencySelectCompany'
                                                //listeners: {
                                                //    change: function (cb, nv, ov) {
                                                //        if (nv) {
                                                //            //Ext.getCmp('bookingInformation').getForm().findField('StartDate').disable();
                                                //        }
                                                //        else {
                                                //            //Ext.getCmp('bookingInformation').getForm().findField('StartDate').enable();
                                                //        }
                                                //    }
                                                //}
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'tbfill'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'searchCompany2',
                                        iconCls: 'icon-company',
                                        itemid: 'btnSearchCompanyAgency',
                                        tooltip: 'Search/Add company'.l('SC51000'),
                                        margin: '15 0 0 0',
                                        disabled: true
                                    }
                                ]
                            }
                        ]
                    }

                ]
            }]
        };

        me.bookingInformation = {
            xtype: 'fieldset',
            title: 'Booking Information'.l('SC51000'),
            width: '49%',
            items: [
                {
                    xtype: 'form',
                    id: 'bookingInformation',
                    itemid: 'bookingInformation',
                    // layout: 'form',
                    defaults: { padding: '0 0 15px 0', anchor: '100%' },
                    items: [{
                        xtype: 'radiogroup',
                        fieldLabel: 'Wizard'.l('SC51000') + '*',
                        //defaultType: 'radiofield',
                        allowBlank: false,
                        itemid: "itemRadioGroup",
                        // defaults: { flex: 1 },
                        layout: 'vbox',
                        items: [{
                            boxLabel: 'Booking'.l('SC51000'),
                            name: 'Wizard',
                            inputValue: 1,
                            checked: true,
                            itemid: "wizardBookingId", //to be set in controller the functionlity , also to set the time selects to default there is a method in controller
                            id: 'rdBooking'
                        }, {
                            boxLabel: 'Quotation'.l('SC51000'),
                            name: 'Wizard',
                            inputValue: 2,
                            id: 'rdQuotation'
                        }, {
                            boxLabel: 'Quotation without date'.l('SC51000'),
                            name: 'Wizard',
                            inputValue: 3,
                            id: 'rdQuotationWithoutDate'
                        }
                        ]
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Booking Name'.l('SC51000') + '*',
                        name: 'BookingName',
                        allowBlank: false,
                        selectOnFocus: true
                    }, {
                        layout: 'hbox',
                        flex: 1,
                        items: [
                        {
                            xtype: 'combo',
                            layout: 'form',
                            flex: 1,
                            fieldLabel: 'Location'.l('SC51000') + '*',
                            name: 'LocationName',
                            forceSelection: false,
                            //queryMode: 'remote',
                            displayField: 'PropertyName',
                            allowBlank: false,
                            valueField: 'PropertyId',
                            //width: 75,
                            typeAhead: true,
                            //hideLabel: true,
                            hideTrigger: true,
                            //triggerAction: 'all',
                            hiddenName: 'locationNameFreeText',
                            submitvalue: true,
                            minChars: 1,
                            store: 'common.PropertyForNamesStore'

                        }
                        //{
                        //    xtype: 'textfield',
                        //    fieldLabel: 'Location'.l('SC51000') + '*',
                        //    name: 'LocationName',
                        //    selectOnFocus: true,
                        //    allowBlank: false,
                        //    flex: 1
                        //}
                            , {
                                xtype: 'displayfield',
                                width: 10
                            }, {
                                xtype: 'combo',
                                name: 'Distance',
                                maxLength: 1000,
                                //editable:false,
                                forceSelection: false,
                                displayField: 'Distance',
                                //allowBlank: false,
                                valueField: 'value',
                                width: 75,
                                store: me.searchLocationRangeStore
                            }
                        ]
                    }, {
                        layout: 'hbox',
                        flex: 1,
                        items: [{
                            xtype: 'datefield',
                            fieldLabel: 'Start date'.l('SC51000') + '*',
                            name: 'StartDate',
                            itemid: 'startdateid',
                            allowBlank: false,
                            format: usr_dateformat,
                            submitFormat: 'Y-m-d',
                            minValue: new Date(),
                            selectOnFocus: true,
                            forceSelection: false,
                            layout: 'form',
                            // anyMatch: true,
                            //startDay: 3,
                            flex: 1
                        }, {
                            xtype: 'displayfield',
                            width: 10
                        }, {
                            xtype: 'timefield',
                            name: 'StartTime',
                            itemid: 'starttimeid',
                            allowBlank: false,
                            //minValue: '08:30',
                            //maxValue: '22:00',
                            format: "H:i",
                            selectOnFocus: true,
                            forceSelection: false,
                            pickerMaxHeight: 200,
                            width: 75,
                            increment: 5
                        }
                        ]
                    },
		                {
		                    layout: 'hbox',
		                    flex: 1,
		                    items: [{
		                        xtype: 'datefield',
		                        fieldLabel: 'End date'.l('SC51000') + '*',
		                        name: 'EndDate',
		                        itemid: 'enddateid',
		                        minValue: new Date(),
		                        allowBlank: false,
		                        selectOnFocus: true,
		                        format: usr_dateformat,
		                        forceSelection: false,
		                        submitFormat: 'Y-m-d',
		                        layout: 'form',
		                        flex: 1
		                    }, {
		                        xtype: 'displayfield',
		                        width: 10
		                    }, {
		                        xtype: 'timefield',
		                        name: 'EndTime',
		                        allowBlank: false,
		                        itemid: 'endtimeid',
		                        //minValue: '08:30',
		                        //maxValue: '22:00',
		                        pickerMaxHeight: 200,
		                        format: "H:i",
		                        submitFormat: "H:i",
		                        selectOnFocus: true,
		                        increment: 5,
		                        width: 75

		                    }
		                    ]
		                },
		                {
		                    layout: 'hbox',
		                    flex: 1,
		                    items: [{
		                        xtype: 'textfield',
		                        fieldLabel: 'No of People'.l('SC51000') + '*',
		                        name: 'NumberOfPeople',
		                        selectOnFocus: true,
		                        allowBlank: false,
		                        vtype: 'onlyNumber'
		                    }, {
		                        xtype: 'displayfield',
		                        width: 15
		                    }, {
		                        xtype: 'checkbox',
		                        name: 'IsTrainerIncluded',
		                        itemid: 'IsTrainerIncluded',
		                        boxLabel: 'Trainer Included',
		                        disabled: true
		                    }
                        ]
		                }, {
		                    xtype: 'combo',
		                    name: 'RoomSetupId',
		                    fieldLabel: 'Setup'.l('SC51000') + '*',
		                    forceSelection: true,
		                    displayField: 'Arrangement',
		                    allowBlank: false,
		                    valueField: 'RoomSetupId',
		                    //queryMode: 'remote',
		                    typeAhead: true,
		                    hideTrigger: false,
		                    triggerAction: 'all',
		                    store: Ext.getStore('common.RoomSetupStore'),
		                    listeners: {
		                        afterrender: function () {
		                            Ext.getStore('common.RoomSetupStore').load();
		                        }
		                    }
		                }, {
		                    xtype: 'combo',
		                    name: 'PropertyFeatureId',
		                    fieldLabel: 'Meeting Type'.l('SC51000') + '*',
		                    forceSelection: true,
		                    displayField: 'PropertyFeatureName',
		                    allowBlank: false,
		                    valueField: 'PropertyFeatureId',
		                    // queryMode: 'remote',
		                    typeAhead: true,
		                    hideTrigger: false,
		                    triggerAction: 'all',
		                    store: Ext.getStore('common.MeetingTypeStore'),
		                    listeners: {
		                        afterrender: function () {
		                            // Ext.getStore('common.MeetingTypeStore').load(); //not required to load again as its autoload: true
		                        }
		                    }
		                }, {
		                    xtype: 'hidden',
		                    name: 'PhoneType'
		                }, {
		                    xtype: 'hidden',
		                    name: 'CreatedDate'
		                }, {
		                    xtype: 'hidden',
		                    name: 'CreatedBy'
		                }, {
		                    xtype: 'hidden',
		                    name: 'UpdatedDate'
		                }, {
		                    xtype: 'hidden',
		                    name: 'UpdatedBy'
		                },
		                {
		                    xtype: 'hidden',
		                    name: 'BookingId',
		                    value: 0
		                }, {
		                    xtype: 'hidden',
		                    name: 'ReservationId',
		                    value: 0
		                }, {
		                    xtype: 'hidden',
		                    name: 'PropertyId'
		                },
                        {
                            xtype: 'hidden',
                            name: 'CompanyId'
                        },
                        {
                            xtype: 'hidden',
                            name: 'IndividualId'
                        }, //Sergiu = > Double BookingWizardId declarations. Check if necessary
                        {
                        xtype: 'hidden',
                        name: 'BookingWizardId'
                    },
                        {
                            xtype: 'hidden',
                            name: 'BookingTrackingId'
                        }
                    ]
                }
            ]

        };
        me.cls = 'propertyEdit';

        me.items = [
            {
                layout: 'hbox',
                frame: false,
                width: '100%',
                cls: 'propertyEdit',
                items: [
                    {
                        xtype: 'panel',
                        width: '47%',
                        cls: 'propertyEdit',
                        items: [
                            me.contactInformation, me.agencySettings
                        ]
                    },
                    {
                        xtype: 'displayfield',
                        width: 15
                    },
                    me.bookingInformation
                ]
            }
        ];

        me.callParent();
    },
    listeners: {
        afterrender: function (combo) {
            var from = Ext.ComponentQuery.query('bookingwizardstep1 [itemid="bookingInformation"]')[0];
            from.getForm().findField('CompanyId').setValue('');
            from.getForm().findField('IndividualId').setValue('');
        }
    }

});