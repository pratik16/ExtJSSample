Ext.define('Regardz.view.bookingwizard.RightSide.Windows.BookingNavigation.CopyReservationBooking', {
    extend: 'Ext.window.Window',
    alias: 'widget.bookingnavigationcopyreservationbooking',
    modal: true,
    border: false,
    title: "Copy Booking_Title".l('SC50700'),
    width: 400,
    bookingData: null,
    initComponent: function () {
        var me = this;
        me.localStore = new Ext.data.SimpleStore({
            fields: ['text', 'isDisabled', 'BookingTrackingId', 'BookingId', 'BookingEventId', 'BookingEventTrackingId', 'BookingEventDate']
            , data: me.bookingData.children
        });
        log("local store", me.localStore);
        log("booking data", me.bookingData);
        me.gridPanel = {
            xtype: 'gridpanel',
            store: me.localStore,
            title: 'Object to copy'.l('SC50700'),
            border: true,
            frame: false,
            noResize: true,
            cls: 'groupingNoBorders',
            viewConfig: {
                getRowClass: function (record, rowIndex, rowParams, store) {
                    return " group-css ";
                }
            },
            columns: [{
                text: me.bookingData.bookingName,
                dataIndex: 'text',
                flex: 1
            }, {
                dataIndex: 'isDisabled',
                renderer: this.renderCheckbox,
                width: 30
            },
            {
                hidden: true,
                dataIndex: 'BookingEventId'
            },
            {
                hidden: true,
                dataIndex: 'BookingEventTrackingId'
            }
            ],
            //features: [
            //   {
            //       ftype: 'grouping',
            //       groupHeaderTpl: '{name}',
            //       hideGroupedHeader: false,
            //       enableGroupingMenu: false
            //   }
            //],
            width: '100%'
        };

        me.DatesDisplay = {
            margin: '10 0 10 0',
            layout: 'vbox',
            border: false,
            items: [

            {
                xtype: 'hidden',
                itemid: 'CopyBookingId',
                value: me.bookingData.BookingId,
                dataIndex: 'BookingId'
            },
            {
                xtype: 'hidden',
                itemid: 'CopyBookingTrackingId',
                value: me.bookingData.BookingTrackingId,
                dataIndex: 'BookingTrackingId'
            },
                {
                    layout: 'hbox',
                    flex: 1,
                    border: false,
                    items: [{
                        xtype: 'datefield',
                        fieldLabel: 'Start Date'.l('SC50700'),
                        name: 'StartDate',
                        margin: 5,
                        itemid: 'copystartdateid',
                        allowBlank: false,
                        format: usr_dateformat,
                        submitFormat: 'Y-m-d',
                        minValue: new Date(),
                        selectOnFocus: true,
                        layout: 'form',
                        value: me.bookingData.bookingStartDate,
                        flex: 1
                    }, {
                        xtype: 'displayfield',
                        width: 10
                    }, {
                        xtype: 'label',
                        name: 'StartTime',
                        margin: 10,
                        text: me.bookingData.bookingStartTime
                    }
                    ]
                },
                {
                    layout: 'hbox',
                    flex: 1,
                    border: false,
                    items: [/*{
                        xtype: 'datefield',
                        fieldLabel: 'End Date'.l('SC50700'),
                        margin: 5,
                        name: 'EndDate',
                        itemid: 'enddateid',
                        minValue: new Date(),
                        allowBlank: false,
                        selectOnFocus: true,
                        format: usr_dateformat,
                        submitFormat: 'Y-m-d',
                        forceSelection: false,
                        layout: 'form',
                        hidden: false,
                        value: me.bookingData.bookingEndDate,
                        flex: 1
                    },*/{
                    xtype: 'displayfield',
                    itemid: 'EndDateLabel',
                    fieldLabel: 'End Date'.l('SC50700'),
                    margin: 5,
                    value: me.bookingData.bookingEndDate,
                    flex: 1
                }, {
                    xtype: 'displayfield',
                    width: 10
                }, {
                    xtype: 'label',
                    name: 'EndTime',
                    margin: '10 10 10 95',
                    text: me.bookingData.bookingEndTime
                }, {
                    xtype: 'hidden',
                    itemid: 'dayDifference',
                    value: me.bookingData.dayDifference
                }]
            }
            ]
        };
        me.bottomFields = {
            xtype: 'fieldcontainer',
            fieldLabel: 'Prices'.l('SC50700'),
            defaultType: 'radiofield',
            allowBlank: false,
            margin: 5,
            itemid: "itemRadioGroupCopy",
            // defaults: { flex: 1 },
            layout: 'vbox',
            items: [
            {
                boxLabel: 'Recalculate when dates become known'.l('SC50700'),
                name: 'priceFlag',
                inputValue: true
            }, {
                boxLabel: 'Keep the current prices'.l('SC50700'),
                name: 'priceFlag',
                inputValue: false,
                checked: true
            }]
        };
        me.panel = {
            xtype: 'panel',
            itmeid: 'CopyBookingWindows',
            margin: 10,
            width: '95%',
            frame: false,
            border: false,
            items: [me.gridPanel, me.DatesDisplay, me.bottomFields],

            buttons: [{
                text: 'Close'.l('w'),
                handler: function () {
                    me.close();
                }
            },
           {
               text: 'Save'.l('w'),
               action: 'copyBookingAction',
               handler: function () {
                   me.close();
               }
           }]
        }
        me.items = [me.panel];
        me.callParent();
    },
    renderCheckbox: function (value, metadata, record, rowIndex, colIndex, store) {
        //if (Utils.isValid(value)) {        
        if (value) {
            return "<input id='eventcheck_'" + record.data.BookingEventId + " data-eventid='" + record.data.BookingEventId + "' data-eventtrackingid='" + record.data.BookingEventTrackingId + "' type='checkbox' disabled='disabled' checked='checked'/>";
        }
        else
            return "<input id='eventcheck_'" + record.data.BookingEventId + " data-eventid='" + record.data.BookingEventId + "' data-eventtrackingid='" + record.data.BookingEventTrackingId + "' type='checkbox' checked='checked'/>";
        //}
    }
});
