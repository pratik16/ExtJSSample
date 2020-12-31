Ext.define('Regardz.view.bookingwizard.BookingSearch', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bookingrsearch',
    //    itemid: 'bookingrsearch',
    store: 'bookingwizard.BookingSearchListStore',
    requires: ['Ext.ux.IFrame', 'Ext.ux.form.SearchField', 'Regardz.view.common.CheckboxRow', 'Regardz.view.common.ExtendedCheckboxRow'],
    features: Ext.create('Ext.grid.feature.Grouping', { groupHeaderTpl: '{name}  ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})' }),
    initComponent: function () {
        var me = this;
        me.noResize = true;
        me.title = 'Search Booking_Title'.l('SC72000');
        me.frame = true;
        me.collapsible = true,
        me.border = 0,
        me.columns = [{
            header: 'Arrival'.l('SC72000'),
            dataIndex: 'BookingDate',
            name: 'BookingDate',
            width: 80,
            align: 'center',
            renderer: this.dateRenderer
        }, {
            header: 'Departure'.l('SC72000'),
            dataIndex: 'BookingEndDate',
            name: 'BookingEndDate',
            width: 85,
            align: 'center',
            renderer: this.dateRenderer
        }, {
            header: 'Booking'.l('SC50000'),
            dataIndex: 'CreatedDate',
            name: 'CreatedDate',
            width: 80,
            align: 'center',
            renderer: this.dateRenderer
        }, {
            header: 'Status'.l('SC60000'),
            dataIndex: 'BookingStatusCode',
            name: 'BookingStatusCode',
            width: 75,
            align: 'center'
        }, {
            header: 'Persons'.l('SC54100'),
            dataIndex: 'NoOfPeople',
            width: 40,
            align: 'center'
        }, {
            header: 'Booking ID'.l('SC72000'),
            dataIndex: 'BookingNumber',
            align: 'right',
            width: 90
        }, {
            header: 'Booking Name'.l('SC50000'),
            dataIndex: 'BookingName',
            align: 'left',
            flex: 1
        }, {
            header: 'Company'.l('SC61000'),
            dataIndex: 'CompanyName',
            flex: 1
        }, {
            header: 'Contact'.l('SC61000'),
            width: '12%',
            dataIndex: 'IndividualName',
            width: 150
        }, {
            header: 'By'.l('SC72000'),
            dataIndex: 'Initial',
            align: 'center',
            width: 85
        }, {
            dataIndex: 'BookingId',
            width: 25,
            name: 'viewBookingAction',
            renderer: this.ViewBooking
        }, {
            dataIndex: 'BookingId',
            width: 25,
            name: 'editBookingAction',
            renderer: this.Booking
        }, {
            hidden: true,
            dataIndex: 'ReservationId'
        }, {
            hidden: true,
            dataIndex: 'PropertyId'
        }];
        //icon-tick
        me.tbar = [{
            xtype: 'form',
            buttonAlign: 'left',
            minButtonWidth: 10,
            itemid: 'bookingSearch',
            width: '100%',
            border: 0,
            items: [{ xtype: 'container',
                width: '100%',
                layout: 'hbox',
                items: [{ xtype: 'container',
                    width: '74%',
                    defaults: {
                        //padding: '5 5 0 0'
                        border: 0
                    },
                    items: [{
                        xtype: 'container',
                        layout: 'hbox',
                        align: 'middle',
                        defaults: {
                            //padding: '5 5 0 0'
                        },
                        items: [{
                            xtype: 'textfield',
                            itemid: 'txtCompanyName',
                            name: 'CompanyName',
                            width: '50%',
                            fieldLabel: 'Company'.l('SC61000'),
                            allowBlank: true,
                            enableKeyEvents: true
                        }, {
                            xtype: 'checkbox',
                            itemid: 'chkCompanyName',
                            name: 'CompanyNameSrc',
                            padding: '2 0 5 5',
                            inputValue: 'true',
                            enableKeyEvents: true
                        }, {
                            xtype: 'tbspacer',
                            width: 30
                        }, {
                            xtype: 'datefield',
                            fieldLabel: 'Booking date'.l('SC50200'),
                            itemid: 'bookingdate1',
                            name: 'BookingFromDate',
                            width: '25.5%',
                            //width: 245,
                            format: usr_dateformat,
                            submitFormat: 'Y-m-d',
                            allowBlank: true,
                            enableKeyEvents: true
                        }, {
                            xtype: 'tbspacer',
                            width: 5
                        }, {
                            xtype: 'datefield',
                            itemid: 'bookingdate2',
                            name: 'BookingToDate',
                            width: '15%',
                            format: usr_dateformat,
                            submitFormat: 'Y-m-d',
                            allowBlank: true,
                            enableKeyEvents: true
                        }]
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaults: {
                            //padding: '5 5 5 0'
                        },
                        items: [{
                            xtype: 'textfield',
                            itemid: 'txtContactName',
                            padding: '5 0 5 0',
                            name: 'Contact',
                            width: '50%',
                            fieldLabel: 'Contact'.l('SC61000'),
                            allowBlank: true,
                            enableKeyEvents: true
                        }, {
                            xtype: 'checkbox',
                            inputValue: 'true',
                            padding: '6 0 5 5',
                            itemid: 'chkContactSearch',
                            name: 'ContactSrc',
                            enableKeyEvents: true
                        }, {
                            xtype: 'tbspacer',
                            width: 30
                        }, {
                            xtype: 'datefield',
                            fieldLabel: 'Arrival Date'.l('SC72000'),
                            itemid: 'arrivaldate1',
                            name: 'ArrivalFromDate',
                            width: '25.5%',
                            //width: 245,
                            padding: '5 0 0 0',
                            format: usr_dateformat,
                            submitFormat: 'Y-m-d',
                            allowBlank: true,
                            enableKeyEvents: true
                        }, {
                            xtype: 'tbspacer',
                            width: 5
                        }, {
                            xtype: 'datefield',
                            itemid: 'arrivaldate2',
                            name: 'ArrivalToDate',
                            width: '15%',
                            //width: 140,
                            padding: '5 0 0 0',
                            format: usr_dateformat,
                            submitFormat: 'Y-m-d',
                            allowBlank: true,
                            enableKeyEvents: true
                        }]
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaults: {
                            padding: '0 0 0 0'
                        },
                        items: [{
                            xtype: 'textfield',
                            name: 'BookingName',
                            itemid: 'txtBookingName',
                            padding: '0 0 5 0',
                            width: '50%',
                            fieldLabel: 'Booking Name'.l('SC50000'),
                            allowBlank: true,
                            enableKeyEvents: true
                        }, {
                            xtype: 'checkbox',
                            inputValue: 'true',
                            padding: '2 0 5 5',
                            itemid: 'chkBookingName',
                            name: 'BookingNameSrc',
                            enableKeyEvents: true
                        }, {
                            xtype: 'tbspacer',
                            width: 30
                        }, {
                            xtype: 'combo',
                            name: 'MarketSourceCombo',
                            itemid: 'marketSourcecombo',
                            fieldLabel: 'Market segment'.l('SC61000'),
                            emptyText: 'Select Market segment'.l('SC61000'),
                            allowBlank: true,
                            width: '41%',
                            store: 'mastervalues.MarketSourceStore',
                            displayField: 'Name',
                            valueField: 'MarketSourceId',
                            enableKeyEvents: true
                        }]
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaults: {
                            padding: '0 3 0 0'
                        },
                        items: [{
                            xtype: 'textfield',
                            name: 'BookingId',
                            itemid: 'txtBookingId',
                            width: '50%',
                            fieldLabel: 'Booking ID'.l('SC72000'),
                            allowBlank: true,
                            enableKeyEvents: true
                        }, {
                            xtype: 'tbspacer',
                            width: 45
                        }, {
                            xtype: 'combo',
                            name: 'PropertyFeatureCombo',
                            itemid: 'propertyFeaturecombo',
                            fieldLabel: 'Meeting Type'.l('SC51000'),
                            displayField: 'PropertyFeatureName',
                            valueField: 'PropertyFeatureId',
                            allowBlank: true,
                            width: '41%',
                            store: 'common.MeetingTypeStore',
                            emptyText: 'Select Meeting Type'.l('SC72000'),
                            enableKeyEvents: true
                        }]
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaults: {
                            padding: '5 3 0 0'
                        },
                        items: [{
                            xtype: 'combo',
                            name: 'PropertyCombo',
                            fieldLabel: 'Property'.l('SC73000'),
                            itemid: 'propertycombo',
                            displayField: 'PropertyName',
                            valueField: 'PropertyId',
                            width: '50%',
                            action: 'select_property',
                            store: Ext.create('Regardz.store.common.PropertyForNamesStore'),
                            emptyText: 'Select Property'.l('SC73000'),
                            enableKeyEvents: true
                        }, {
                            xtype: 'tbspacer',
                            width: 45
                        }, {
                            xtype: 'combo',
                            name: 'ReasonCombo',
                            fieldLabel: 'Cancellation Res.'.l('SC72000'),
                            itemid: 'cancellationReasoncombo',
                            displayField: 'Reason',
                            valueField: 'CancellationReasonId',
                            width: '41%',
                            action: 'select_reason',
                            store: 'common.CancellationReasonStore',
                            emptyText: 'Select Reason'.l('SC72000'),
                            enableKeyEvents: true
                        }]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        defaults: {
                            padding: '5 3 5 0'
                        },
                        items: [{
                            xtype: 'textfield',
                            itemid: 'txtBookedbyPerson',
                            name: 'BookedbyPerson',
                            width: '50%',
                            fieldLabel: 'Booked by person',
                            allowBlank: true
                        }, {
                            xtype: 'tbspacer',
                            width: 35
                        }]
                    }

                    ]
                }, { xtype: 'container',
                    width: '25%',
                    defaults: {
                        padding: '0 5 0 0'
                        //margin: '0 0 0 -10'
                    },
                    items: [{
                        xtype: 'grid',
                        title: 'Status'.l('SC60000'),
                        width: '100%',
                        store: Ext.getStore('common.BookingStatusListStore'),
                        itemid: 'bookingStatusList',
                        height: 130,
                        frame: false,
                        autoScroll: true,
                        columns: [{
                            flex: 1,
                            dataIndex: 'Status'
                        }, {
                            hidden: true,
                            dataIndex: 'BookingStatusId'
                        }, {
                            width: 30,
                            dataIndex: 'Checked',
                            xtype: 'checkboxrow'
                        }]
                    }, {
                        xtype: 'button',
                        margin: '5 0 5 0',
                        padding: '2 3 2 3',
                        width: '10%',
                        text: 'Search'.l('w'),
                        action: 'searchBooking'
                    }, {
                        xtype: 'button',
                        margin: '5 5 5 5',
                        padding: '2 3 2 3',
                        width: '10%',
                        text: 'Reset'.l('w'),
                        action: 'resetSearchBooking'
                    }]
                }]
            }]
        }];

        me.layout = 'fit';
        me.autoScroll = true;

        me.height = 250;
        me.viewConfig = {
            forceFit: true
        };

        me.callParent();
    },

    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        var d = Ext.Date.parse(value, 'c');
        return Ext.util.Format.date(d, usr_dateformat);
    },
    Booking: function (value, metadata, record, rowIndex, colIndex, store) {
      //  if (value > 0) {
            var tooltipText = "Edit Booking".l('SC72000');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
            metadata.tdCls = 'icon-wizard';
       // }
    },
    ViewBooking: function (value, metadata, record, rowIndex, colIndex, store) {

        if (value > 0) {
            var tooltip = 'View Booking'.l('SC72000');
            return "<img src='public/icons/Company_Indiv.png' title='" + tooltip + "' style='cursor:pointer'>";
        }
    }
});