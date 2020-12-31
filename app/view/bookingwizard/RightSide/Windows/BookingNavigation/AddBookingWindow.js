Ext.define('Regardz.view.bookingwizard.RightSide.Windows.BookingNavigation.AddBookingWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.bookingnavigationaddbookingwindow',
    modal: true,
    border: false,
    title: 'Add Booking_Title'.l('SC50100'),
    width: 500,
    companyName: "",
    initComponent: function () {
        var me = this;

        var searchLocationRangeStore = new Ext.data.SimpleStore({
            fields: ["value", "Distance"],
            data: [
                    [5, 5],
                    [10, 10],
                    [15, 15],
                    [25, 25],
                    [50, 50],
                    [75, 75]]
        });

        me.bookingInformation = {
            xtype: 'panel',
            margin: 10,
            width: '95%',
            frame: false,
            border: false,

            items: [
                {
                    xtype: 'form',
                    //  id: 'bookingInformation',
                    itemid: 'bookingInformationRightSide',
                    // layout: 'form',
                    defaults: { padding: '0 0 15px 0', anchor: '100%' },
                    frame: false,
                    border: false,

                    items: [{
                        xtype: 'radiogroup',
                        fieldLabel: 'Wizard'.l('SC51000') + '*',
                        allowBlank: false,
                        itemid: "itemRadioGroupRightSide",
                        layout: 'vbox',
                        items: [{
                            boxLabel: 'Booking'.l('SC51000'),
                            name: 'Wizard',
                            inputValue: 1,
                            checked: true
                        }, {
                            boxLabel: 'Quotation'.l('SC51000'),
                            name: 'Wizard',
                            inputValue: 2
                        }, {
                            boxLabel: 'Quotation without date'.l('SC51000'),
                            name: 'Wizard',
                            inputValue: 3
                        }
                        ]
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Booking Name'.l('SC51000') + '*',
                        name: 'BookingName',
                        allowBlank: false,
                        selectOnFocus: true,
                        value: me.companyName
                    }, {
                        layout: 'hbox',
                        flex: 1,
                        border: false,
                        frame: false,
                        items: [{
                            xtype: 'combo',
                            layout: 'form',
                            itemid: 'AddBookingFromNavigationPropCombo',
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
                            store: Ext.create('Regardz.store.common.PropertyForNamesStore')

                        }, {
                            xtype: 'displayfield',
                            width: 10
                        }, {
                            xtype: 'combo',
                            name: 'Distance',
                            forceSelection: true,
                            displayField: 'Distance',
                            //allowBlank: false,
                            valueField: 'value',
                            width: 75,
                            store: searchLocationRangeStore
                        }
                        ]
                    }, {
                        layout: 'hbox',
                        flex: 1,
                        border: false,
                        frame: false,
                        items: [{
                            xtype: 'datefield',
                            fieldLabel: 'Start date'.l('SC51000') + '*',
                            name: 'StartDate',
                            itemid: 'startdateidnav',
                            allowBlank: false,
                            format: usr_dateformat,
                            submitFormat: 'Y-m-d',
                            minValue: new Date(),
                            selectOnFocus: true,
                            layout: 'form',
                            flex: 1
                        }, {
                            xtype: 'displayfield',
                            width: 10
                        }, {
                            xtype: 'timefield',
                            name: 'StartTime',
                            itemid: 'starttimeidnav',
                            allowBlank: false,
                            //minValue: '8:30',
                            //maxValue: '22:00',
                            format: "H:i",
                            selectOnFocus: true,
                            width: 75,
                            increment: 5,
                            value: '08:30'
                        }
                        ]
                    },
		                {
		                    layout: 'hbox',
		                    flex: 1,
		                    border: false,
		                    frame: false,
		                    items: [{
		                        xtype: 'datefield',
		                        fieldLabel: 'End date'.l('SC51000') + '*',
		                        name: 'EndDate',
		                        itemid: 'enddateidnav',
		                        minValue: new Date(),
		                        allowBlank: false,
		                        selectOnFocus: true,
		                        format: usr_dateformat,
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
		                        itemid: 'endtimeidnav',
		                        //minValue: '8:30',
		                        //maxValue: '22:00',
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
		                    border: false,
		                    frame: false,
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
		                        itemId: 'IsTrainerIncluded',
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
		                    typeAhead: true,
		                    hideTrigger: false,
		                    triggerAction: 'all',
		                    store: Ext.getStore('common.RoomSetupStore')
		                }, {
		                    xtype: 'combo',
		                    name: 'PropertyFeatureId',
		                    fieldLabel: 'Meeting Type'.l('SC51000') + '*',
		                    //forceSelection: true,
		                    displayField: 'PropertyFeatureName',
		                    allowBlank: false,
		                    valueField: 'PropertyFeatureId',
		                    typeAhead: true,
		                    hideTrigger: false,
		                    triggerAction: 'all',
		                    store: Ext.getStore('common.MeetingTypeStore')
		                },

		                {
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
                },

            ],
            buttons: [{
                text: 'Close'.l('w'),
                handler: function () {
                    me.close();
                }
            },
            {
                text: 'Save'.l('w'),
                action: 'addNewBookingRightSide'
                //handler: function () {
                //    me.close();
                //}
            }]

        };


        me.items = [me.bookingInformation],
         me.callParent();
    }
});