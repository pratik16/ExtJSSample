Ext.define('Regardz.view.bookingwizard.RightSide.Windows.BookingNavigation.BookingHistory', {
    extend: 'Ext.window.Window',
    alias: 'widget.bookingnavigationbookinghistory',
    //store: Ext.getStore('bookingwizard.infopanel.BookingHistoryStore'),
    modal: true,
    border: false,
    title: 'Booking History_Title_SCCODE'.l('SC50200'),
    width: 700,
    height: parseInt(Ext.getBody().getViewSize().height * (0.7)),
    autoScroll: true,
    initComponent: function () {
        var me = this;
        me.gridPanel = {
            itemid: 'historygrid',
            xtype: 'gridpanel',
            title: 'Changes'.l('SC50200'),
            border: true,
            autoScroll: true,
            width: "100%",
            height: parseInt(me.height * 0.75),
            store: Ext.getStore('bookingwizard.infopanel.BookingHistoryStore'),
            columns: [{
                text: 'Date'.l('SC50200'),
                dataIndex: 'TrackDate',
                flex: 1,
                renderer: this.daterenderer
            }, {
                text: 'Description'.l('SC50200'),
                dataIndex: 'Description',
                flex: 5
            }, {
                text: 'Changed by'.l('SC50200'),
                dataIndex: 'ChangedBy',
                flex: 1
            }]
        };

        me.topPanel = {
            border: false,
            frame: false,
            layout: 'column',

            items: [{
                border: false,
                columnWidth: .50,
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Booking number'.l('SC50200'),
                    labelWidth: 130,
                    layout: 'vbox',
                    name: 'BookingNumber',
                    itemid: 'bookingnumber'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Booking date'.l('SC50200'),
                    labelWidth: 130,
                    layout: 'vbox',
                    name: 'BookingDate',
                    itemid: 'bookingdate'
                }]
            }, {
                border: false,
                columnWidth: .50,
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Booking name'.l('SC50200'),
                    labelWidth: 130,
                    layout: 'vbox',
                    name: 'BookingName',
                    itemid: 'bookingname'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Booker name'.l('SC50200'),
                    labelWidth: 130,
                    layout: 'vbox',
                    name: 'Name',
                    itemid: 'bookername'
                }]
            }, {
                xtype: 'hidden',
                name: 'BookingId',
                itemid: 'bookingId',
                value: me.BookingId
            }]
        }
        me.bigPanel = {
            xtype: 'panel',

            border: false,
            frame: false,
            margin: 10,
            items: [me.topPanel, me.gridPanel],
            buttons: [{
                text: 'Close'.l('w'),
                handler: function () {
                    me.close();
                }
            }]

        }
        me.items = [me.bigPanel];
        me.callParent();
    },
    daterenderer: function (value) {
        var date = new Date(value);
        return Ext.Date.format(date, 'd-m-Y');
    }
});
